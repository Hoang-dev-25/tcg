"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { LayerLabel } from "@/components/demo/layer-label";
import { useParallaxFactor } from "@/hooks/useParallaxFactor";

/**
 * LỚP 06 — Xoay theo cuộn: hai vành đai quay ngược chiều nhau,
 * góc xoay gắn trực tiếp với tiến độ cuộn của section.
 */
export function Layer06Rotate() {
  const ref = useRef<HTMLDivElement>(null);
  const factor = useParallaxFactor();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const rotateOuter = useTransform(scrollYProgress, [0, 1], [0, 200 * factor]);
  const rotateInner = useTransform(scrollYProgress, [0, 1], [0, -300 * factor]);
  const ringScale = useTransform(scrollYProgress, [0, 0.4], [1 - 0.15 * factor, 1]);

  return (
    <section id="layer-06" aria-label="Lớp 6: xoay theo cuộn">
      <div ref={ref} className="relative h-[220vh] bg-ink-950">
        <div className="sticky top-0 flex h-dvh flex-col items-center justify-center overflow-hidden">
          <div className="container mb-10 text-center">
            <LayerLabel index={6} technique="Scroll-linked rotation" className="justify-center" />
            <h2 className="font-heading text-4xl font-bold uppercase sm:text-5xl">
              Quay theo <span className="text-neon-amber text-glow-amber">nhịp cuộn</span>
            </h2>
          </div>

          <motion.div className="relative h-72 w-72 sm:h-96 sm:w-96" style={{ scale: ringScale }}>
            {/* Vành ngoài — quay thuận */}
            <motion.div
              className="absolute inset-0 rounded-full border border-dashed border-neon-cyan/40 will-change-transform"
              style={{ rotate: rotateOuter }}
              aria-hidden="true"
            >
              <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-neon-cyan shadow-glow-cyan" />
              <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-neon-cyan/60" />
              <span className="absolute -left-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-neon-cyan/60" />
              <span className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-neon-cyan shadow-glow-cyan" />
            </motion.div>

            {/* Vành trong — quay ngược */}
            <motion.div
              className="absolute inset-10 rounded-full border border-neon-amber/40 will-change-transform sm:inset-14"
              style={{ rotate: rotateInner }}
              aria-hidden="true"
            >
              <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-neon-amber shadow-glow-amber" />
              <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-neon-amber/60" />
            </motion.div>

            {/* Tâm */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="font-heading text-5xl font-bold text-foreground sm:text-6xl">200°</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">góc quay tối đa</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
