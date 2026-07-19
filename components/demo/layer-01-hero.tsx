"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { useParallaxFactor } from "@/hooks/useParallaxFactor";

/**
 * LỚP 01 — Đa lớp tốc độ (classic multi-speed parallax).
 * 4 tầng chuyển động với tốc độ khác nhau khi cuộn ra khỏi hero:
 * nền sao (chậm) → dãy núi xa → tiêu đề → hình khối tiền cảnh (nhanh).
 */
export function Layer01Hero() {
  const ref = useRef<HTMLElement>(null);
  const factor = useParallaxFactor();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const starsY = useTransform(scrollYProgress, [0, 1], [0, 80 * factor]);
  const farY = useTransform(scrollYProgress, [0, 1], [0, -60 * factor]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -160 * factor]);
  const nearY = useTransform(scrollYProgress, [0, 1], [0, -340 * factor]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, factor === 0 ? 1 : 0]);

  const dots = [
    [8, 12], [18, 30], [27, 8], [36, 22], [48, 10], [57, 28], [66, 6],
    [74, 18], [84, 30], [92, 12], [12, 45], [30, 52], [52, 42], [70, 50], [88, 44],
  ];

  return (
    <section
      id="layer-01"
      ref={ref}
      className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-ink-950"
      aria-label="Lớp 1: parallax đa lớp tốc độ"
    >
      {/* Tầng 1 — nền sao, trôi chậm nhất */}
      <motion.div className="absolute inset-0 will-change-transform" style={{ y: starsY }} aria-hidden="true">
        <div className="absolute inset-0 bg-grid-faint opacity-60" />
        {dots.map(([x, y], i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white/40 animate-pulse-soft motion-reduce:animate-none"
            style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${(i % 6) * 0.5}s` }}
          />
        ))}
      </motion.div>

      {/* Tầng 2 — dãy núi xa */}
      <motion.svg
        className="absolute inset-x-0 bottom-0 h-[46vh] w-full will-change-transform"
        style={{ y: farY }}
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 400 L0 260 L180 150 L340 250 L520 90 L720 230 L900 130 L1100 260 L1280 170 L1440 250 L1440 400 Z" fill="#0d1527" />
        <path d="M0 400 L0 320 L240 220 L430 310 L640 190 L860 300 L1060 210 L1260 320 L1440 240 L1440 400 Z" fill="#121d36" />
      </motion.svg>

      {/* Tầng 3 — tiêu đề */}
      <motion.div className="relative z-10 px-6 text-center will-change-transform" style={{ y: titleY, opacity: fade }}>
        <p className="mb-4 text-xs uppercase tracking-[0.5em] text-neon-cyan">Demo scrollytelling</p>
        <h1 className="font-heading text-7xl font-bold uppercase leading-[0.9] tracking-tight sm:text-9xl">
          Parallax
          <span className="block text-neon-amber text-glow-amber">Lab</span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-sm text-muted-foreground sm:text-base">
          12 lớp hiệu ứng cuộn — mỗi lớp trình diễn một kỹ thuật chuyển tiếp.
          Cuộn chậm để cảm nhận từng tầng chuyển động.
        </p>
      </motion.div>

      {/* Tầng 4 — hình khối tiền cảnh, trôi nhanh nhất */}
      <motion.div className="pointer-events-none absolute inset-0 z-20 will-change-transform" style={{ y: nearY }} aria-hidden="true">
        <div className="absolute left-[8%] top-[62%] h-20 w-20 rotate-12 rounded-lg border-2 border-neon-cyan/50" />
        <div className="absolute right-[10%] top-[24%] h-14 w-14 -rotate-6 rounded-full border-2 border-neon-amber/60" />
        <div className="absolute left-[22%] top-[18%] h-3 w-24 -rotate-12 rounded-full bg-neon-amber/30 blur-[1px]" />
        <div className="absolute bottom-[16%] right-[20%] h-24 w-24 rotate-45 border-2 border-white/15" />
        <div className="absolute bottom-[30%] left-[42%] h-2 w-2 rounded-full bg-neon-cyan shadow-glow-cyan" />
      </motion.div>

      {/* Gợi ý cuộn */}
      <div className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2 text-center">
        <p className="mb-2 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">Cuộn xuống</p>
        <div className="mx-auto flex h-9 w-5 items-start justify-center rounded-full border border-white/25 p-1.5">
          <div className="h-2 w-1 rounded-full bg-neon-cyan animate-scroll-hint motion-reduce:animate-none" />
        </div>
      </div>
    </section>
  );
}
