"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

import { LayerLabel } from "@/components/demo/layer-label";
import { useParallaxFactor } from "@/hooks/useParallaxFactor";
import { cn } from "@/lib/utils";

const planes = [
  { label: "Lớp bề mặt", className: "border-neon-amber/60 bg-neon-amber/10" },
  { label: "Lớp nội dung", className: "border-neon-cyan/60 bg-neon-cyan/10" },
  { label: "Lớp khung", className: "border-white/40 bg-white/5" },
  { label: "Lớp nền", className: "border-neon-cyan/40 bg-ink-800/80" },
  { label: "Lớp móng", className: "border-neon-amber/40 bg-ink-800/80" },
];

function Plane({
  index,
  progress,
  factor,
}: {
  index: number;
  progress: MotionValue<number>;
  factor: number;
}) {
  const center = (planes.length - 1) / 2;
  const offset = index - center; // -2..2
  const y = useTransform(progress, [0.12, 0.75], [0, offset * 92 * factor]);
  const rotate = useTransform(progress, [0.12, 0.75], [0, offset * 3.5 * factor]);
  const labelOpacity = useTransform(progress, [0.5, 0.7], [factor === 0 ? 1 : 0, 1]);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 will-change-transform"
      style={{ y, rotate, x: "-50%", translateY: "-50%", zIndex: planes.length - index }}
    >
      <div
        className={cn(
          "flex h-40 w-[min(80vw,26rem)] items-end rounded-xl border-2 p-4 backdrop-blur-sm sm:h-44",
          planes[index].className
        )}
      >
        <motion.span
          className="text-xs font-semibold uppercase tracking-widest text-foreground/90"
          style={{ opacity: labelOpacity }}
        >
          {planes[index].label}
        </motion.span>
      </div>
    </motion.div>
  );
}

/**
 * LỚP 07 — Phân rã lớp (exploded view): chồng 5 tấm phẳng
 * tách rời theo trục dọc kèm xoay nhẹ khi cuộn.
 */
export function Layer07Exploded() {
  const ref = useRef<HTMLDivElement>(null);
  const factor = useParallaxFactor();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section id="layer-07" aria-label="Lớp 7: phân rã exploded view">
      <div ref={ref} className="relative h-[280vh] bg-ink-900">
        <div className="sticky top-0 flex h-dvh flex-col overflow-hidden">
          <div className="container pt-24">
            <LayerLabel index={7} technique="Exploded layers" />
            <h2 className="max-w-lg font-heading text-4xl font-bold uppercase sm:text-5xl">
              Tách khối thành <span className="text-neon-cyan text-glow-cyan">từng lớp</span>
            </h2>
          </div>
          <div className="relative flex-1">
            {planes.map((plane, i) => (
              <Plane key={plane.label} index={i} progress={scrollYProgress} factor={factor} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
