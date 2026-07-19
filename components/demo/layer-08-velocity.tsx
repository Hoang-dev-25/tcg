"use client";

import { motion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";

import { LayerLabel } from "@/components/demo/layer-label";
import { useParallaxFactor } from "@/hooks/useParallaxFactor";

const line = "PARALLAX · DEPTH · MOTION · SCROLL · ";

function MarqueeRow({
  offset,
  direction,
  className,
}: {
  offset: number;
  direction: 1 | -1;
  className?: string;
}) {
  const factor = useParallaxFactor();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 300 });
  const skewX = useTransform(smoothVelocity, [-2500, 2500], [-14 * factor, 14 * factor]);
  // Trượt theo scrollY; nội dung lặp chu kỳ nên dịch mod 50% là loop liền mạch.
  const x = useTransform(scrollY, (v) => {
    const shift = (v * 0.03 * factor + offset) % 50;
    return direction === 1 ? `${-shift}%` : `${-50 + shift}%`;
  });

  return (
    <motion.div className={className} style={{ x, skewX }}>
      <span className="whitespace-nowrap font-heading text-6xl font-bold uppercase tracking-tight sm:text-8xl">
        {line.repeat(8)}
      </span>
    </motion.div>
  );
}

/**
 * LỚP 08 — Vận tốc & skew: hai băng chữ chạy ngang theo scroll,
 * nghiêng (skew) theo vận tốc cuộn — cuộn càng nhanh nghiêng càng mạnh.
 */
export function Layer08Velocity() {
  return (
    <section
      id="layer-08"
      className="overflow-hidden bg-ink-950 py-28 sm:py-36"
      aria-label="Lớp 8: marquee theo vận tốc cuộn"
    >
      <div className="container mb-10">
        <LayerLabel index={8} technique="Velocity-aware marquee" />
        <p className="max-w-md text-sm text-muted-foreground">
          Cuộn nhanh rồi dừng đột ngột để thấy hai băng chữ nghiêng theo quán tính —
          góc skew nội suy từ vận tốc cuộn qua một spring.
        </p>
      </div>
      <div className="space-y-4">
        <MarqueeRow offset={0} direction={1} className="text-foreground/90 will-change-transform" />
        <MarqueeRow offset={12} direction={-1} className="text-transparent will-change-transform [-webkit-text-stroke:1.5px_rgba(255,178,36,0.6)]" />
      </div>
    </section>
  );
}
