"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import { LayerLabel } from "@/components/demo/layer-label";
import { useParallaxFactor } from "@/hooks/useParallaxFactor";

/**
 * LỚP 16 — Mouse parallax: các lớp trôi theo vị trí con trỏ thay vì thanh cuộn.
 * Con trỏ lệch tâm bao nhiêu, mỗi lớp dịch theo "độ sâu" riêng bấy nhiêu,
 * kèm nghiêng 3D nhẹ cho cả khung. Trên cảm ứng / reduced-motion: đứng yên.
 */
export function Layer16MouseParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const factor = useParallaxFactor();

  const mx = useMotionValue(0); // -0.5 → 0.5
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  const rotateY = useTransform(sx, (v) => v * 14 * factor);
  const rotateX = useTransform(sy, (v) => -v * 10 * factor);
  const skylineX = useTransform(sx, (v) => v * -26 * factor);
  const skylineY = useTransform(sy, (v) => v * -14 * factor);
  const boardX = useTransform(sx, (v) => v * 34 * factor);
  const boardY = useTransform(sy, (v) => v * 22 * factor);
  const glowX = useTransform(sx, (v) => v * 60 * factor);
  const glowY = useTransform(sy, (v) => v * 40 * factor);

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((event.clientX - rect.left) / rect.width - 0.5);
    my.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      id="layer-16"
      className="overflow-hidden bg-ink-900 py-28 sm:py-36"
      aria-label="Lớp 16: parallax theo con trỏ chuột"
    >
      <div className="container">
        <div className="mb-10 text-center">
          <LayerLabel index={16} technique="Mouse parallax" className="justify-center" />
          <h2 className="font-heading text-4xl font-bold uppercase sm:text-5xl">
            Trôi theo <span className="text-neon-cyan text-glow-cyan">con trỏ</span>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            Di chuột quanh khung bên dưới — mỗi lớp có một &quot;độ sâu&quot; riêng,
            lớp càng gần trôi càng mạnh, kèm nghiêng 3D toàn khung.
          </p>
        </div>

        <div style={{ perspective: 1100 }} className="mx-auto w-full max-w-2xl">
          <motion.div
            ref={ref}
            onPointerMove={onPointerMove}
            onPointerLeave={reset}
            className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-ink-800 to-ink-950 shadow-billboard will-change-transform"
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          >
            {/* Lớp xa: quầng sáng */}
            <motion.div
              className="absolute left-1/4 top-1/4 h-48 w-48 rounded-full bg-neon-cyan/15 blur-3xl will-change-transform"
              style={{ x: glowX, y: glowY }}
              aria-hidden="true"
            />
            {/* Lớp giữa: đường chân trời */}
            <motion.div className="absolute inset-x-[-6%] bottom-0 will-change-transform" style={{ x: skylineX, y: skylineY }} aria-hidden="true">
              <div className="flex items-end gap-2 px-8">
                {[38, 64, 46, 84, 56, 72, 44, 92, 60, 50].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm bg-ink-700/90"
                    style={{ height }}
                  />
                ))}
              </div>
            </motion.div>
            {/* Lớp gần: tấm biển */}
            <motion.div
              className="absolute left-1/2 top-[16%] w-[46%] -translate-x-1/2 will-change-transform"
              style={{ x: boardX, y: boardY }}
            >
              <div className="rounded-md border-4 border-ink-600 bg-gradient-to-br from-neon-amber to-[#ff8a2a] p-6 text-center shadow-glow-amber">
                <p className="font-heading text-2xl font-bold uppercase tracking-widest text-ink-950 sm:text-3xl">
                  Lớp gần nhất
                </p>
                <p className="text-xs font-semibold text-ink-950/70">độ sâu ×34</p>
              </div>
              <div className="mx-auto h-12 w-3 bg-ink-600" />
            </motion.div>

            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.3em] text-white/40">
              di chuột quanh khung
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
