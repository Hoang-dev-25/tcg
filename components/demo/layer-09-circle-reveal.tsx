"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { LayerLabel } from "@/components/demo/layer-label";
import { useParallaxFactor } from "@/hooks/useParallaxFactor";

/**
 * LỚP 09 — Vòng tròn mở màn: một đĩa gradient scale từ chấm nhỏ
 * phủ kín màn hình, nội dung mới hiện dần bên trên nó.
 * Chỉ dùng transform scale — không animate clip-path hay layout.
 */
export function Layer09CircleReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const factor = useParallaxFactor();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const circleScale = useTransform(
    scrollYProgress,
    [0.05, 0.55],
    [factor === 0 ? 22 : 0.15, 22]
  );
  const contentOpacity = useTransform(scrollYProgress, [0.5, 0.7], [factor === 0 ? 1 : 0, 1]);
  const contentY = useTransform(scrollYProgress, [0.5, 0.7], [40 * factor, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  return (
    <section id="layer-09" aria-label="Lớp 9: vòng tròn mở màn">
      <div ref={ref} className="relative h-[260vh] bg-ink-950">
        <div className="sticky top-0 flex h-dvh items-center justify-center overflow-hidden">
          <motion.div className="absolute text-center" style={{ opacity: hintOpacity }}>
            <LayerLabel index={9} technique="Scale reveal" className="justify-center" />
            <p className="text-sm text-muted-foreground">Cuộn để vòng tròn nuốt trọn màn hình…</p>
          </motion.div>

          {/* Đĩa gradient scale lên phủ màn hình */}
          <motion.div
            className="h-40 w-40 rounded-full bg-gradient-to-br from-neon-amber via-neon-amber to-neon-cyan will-change-transform"
            style={{ scale: circleScale }}
            aria-hidden="true"
          />

          {/* Nội dung hiện trên nền sáng */}
          <motion.div
            className="absolute z-10 px-6 text-center will-change-transform"
            style={{ opacity: contentOpacity, y: contentY }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-ink-950/70">Lớp 09 — Scale reveal</p>
            <h2 className="mt-3 font-heading text-5xl font-bold uppercase text-ink-950 sm:text-7xl">
              Đổi cảnh không cần chuyển trang
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm font-medium text-ink-950/70">
              Một phần tử tròn scale 0.15 → 22 tạo cú chuyển nền toàn màn hình
              mà vẫn chỉ tốn một phép transform trên GPU.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
