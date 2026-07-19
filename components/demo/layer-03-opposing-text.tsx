"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { LayerLabel } from "@/components/demo/layer-label";
import { useParallaxFactor } from "@/hooks/useParallaxFactor";

/**
 * LỚP 03 — Chữ đối lưu: ba dòng chữ khổ lớn trượt ngang
 * theo hai hướng ngược nhau khi section đi qua viewport.
 */
export function Layer03OpposingText() {
  const ref = useRef<HTMLElement>(null);
  const factor = useParallaxFactor();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const x1 = useTransform(scrollYProgress, [0, 1], [180 * factor, -180 * factor]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-260 * factor, 260 * factor]);
  const x3 = useTransform(scrollYProgress, [0, 1], [220 * factor, -220 * factor]);

  return (
    <section
      id="layer-03"
      ref={ref}
      className="relative overflow-hidden bg-ink-900 py-32 sm:py-44"
      aria-label="Lớp 3: chữ trượt ngang đối hướng"
    >
      <div className="container mb-12">
        <LayerLabel index={3} technique="Opposing text drift" />
        <p className="max-w-md text-sm text-muted-foreground">
          Ba dòng chữ gắn với cùng một tiến độ cuộn nhưng biên độ và hướng khác nhau —
          dòng giữa dùng nét viền (text-stroke) để tách tầng thị giác.
        </p>
      </div>

      <div className="space-y-2 font-heading font-bold uppercase leading-[0.95]">
        <motion.p
          className="whitespace-nowrap text-center text-6xl tracking-tight text-foreground will-change-transform sm:text-8xl"
          style={{ x: x1 }}
        >
          Chuyển động tạo chiều sâu
        </motion.p>
        <motion.p
          className="whitespace-nowrap text-center text-6xl tracking-tight text-transparent will-change-transform sm:text-8xl"
          style={{ x: x2, WebkitTextStroke: "1.5px rgba(46, 230, 255, 0.65)" }}
        >
          Chiều sâu tạo cảm xúc
        </motion.p>
        <motion.p
          className="whitespace-nowrap text-center text-6xl tracking-tight text-neon-amber text-glow-amber will-change-transform sm:text-8xl"
          style={{ x: x3 }}
        >
          Cảm xúc giữ người xem
        </motion.p>
      </div>
    </section>
  );
}
