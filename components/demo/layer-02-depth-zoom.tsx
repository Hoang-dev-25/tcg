"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { LayerLabel } from "@/components/demo/layer-label";
import { useParallaxFactor } from "@/hooks/useParallaxFactor";

/**
 * LỚP 02 — Depth zoom: khối trung tâm phóng to dần khi cuộn,
 * nền lùi về sau theo hướng ngược lại, tạo cảm giác lao vào chiều sâu.
 */
export function Layer02DepthZoom() {
  const ref = useRef<HTMLDivElement>(null);
  const factor = useParallaxFactor();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const cardScale = useTransform(scrollYProgress, [0, 1], [1 - 0.32 * factor, 1 + 0.22 * factor]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1 + 0.7 * factor]);
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [0.5, 0.15]);
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.55], [factor === 0 ? 1 : 0, 1]);
  const percent = useTransform(scrollYProgress, (v) => `${Math.round(v * 100)}%`);

  return (
    <section id="layer-02" aria-label="Lớp 2: depth zoom">
      <div ref={ref} className="relative h-[250vh] bg-ink-950">
        <div className="sticky top-0 flex h-dvh items-center justify-center overflow-hidden">
          {/* Nền lùi về sau */}
          <motion.div
            className="absolute inset-0 will-change-transform"
            style={{ scale: bgScale, opacity: bgOpacity }}
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-grid-faint" />
            <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-neon-cyan/10 blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-neon-amber/10 blur-3xl" />
          </motion.div>

          {/* Khối trung tâm phóng to */}
          <motion.div
            className="relative z-10 w-[min(84vw,30rem)] rounded-2xl border border-white/10 bg-ink-900/90 p-8 shadow-billboard will-change-transform sm:p-10"
            style={{ scale: cardScale }}
          >
            <LayerLabel index={2} technique="Depth zoom" />
            <h2 className="font-heading text-4xl font-bold uppercase leading-none sm:text-5xl">
              Lao vào <span className="text-neon-cyan text-glow-cyan">chiều sâu</span>
            </h2>
            <motion.p className="mt-4 text-sm text-muted-foreground" style={{ opacity: textOpacity }}>
              Khối này scale từ 0.68 lên 1.22 theo tiến độ cuộn, trong khi lớp nền
              scale ngược hướng và mờ dần — hai chuyển động đối nghịch tạo hiệu ứng zoom.
            </motion.p>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Tiến độ lớp</span>
              <motion.span className="font-heading text-3xl font-bold text-neon-amber">{percent}</motion.span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
