"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { LayerLabel } from "@/components/demo/layer-label";
import { useParallaxFactor } from "@/hooks/useParallaxFactor";
import { cn } from "@/lib/utils";

const cards = [
  { title: "RotateX", body: "Ngả từ 55° về 0° khi tiến vào giữa màn hình.", accent: "border-neon-cyan/40" },
  { title: "Perspective", body: "Cha khai báo perspective 1200px cho chiều sâu thật.", accent: "border-neon-amber/40" },
  { title: "Stagger", body: "Ba thẻ cùng công thức nhưng lệch pha theo vị trí.", accent: "border-white/25" },
];

function TiltCard({ card, index }: { card: (typeof cards)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const factor = useParallaxFactor();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [55 * factor, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [90 * factor, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [factor === 0 ? 1 : 0.2, 1]);

  return (
    <div ref={ref} style={{ perspective: 1200 }}>
      <motion.div
        className={cn(
          "rounded-2xl border bg-ink-900/80 p-8 shadow-billboard will-change-transform",
          card.accent
        )}
        style={{ rotateX, y, opacity, transformStyle: "preserve-3d" }}
      >
        <p className="font-heading text-5xl font-bold text-neon-cyan">{String(index + 1).padStart(2, "0")}</p>
        <h3 className="mt-4 font-heading text-2xl font-bold uppercase">{card.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{card.body}</p>
      </motion.div>
    </div>
  );
}

/**
 * LỚP 10 — Phối cảnh 3D: các thẻ ngả theo trục X trong không gian
 * perspective, dựng thẳng dậy khi cuộn tới giữa màn hình.
 */
export function Layer10Perspective() {
  return (
    <section
      id="layer-10"
      className="bg-ink-900 py-28 sm:py-40"
      aria-label="Lớp 10: phối cảnh 3D"
    >
      <div className="container">
        <LayerLabel index={10} technique="3D perspective tilt" />
        <h2 className="max-w-xl font-heading text-4xl font-bold uppercase sm:text-5xl">
          Dựng thẻ dậy trong <span className="text-neon-amber text-glow-amber">không gian 3D</span>
        </h2>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {cards.map((card, i) => (
            <TiltCard key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
