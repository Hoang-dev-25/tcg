"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

import { LayerLabel } from "@/components/demo/layer-label";
import { useParallaxFactor } from "@/hooks/useParallaxFactor";
import { cn } from "@/lib/utils";

const cards = [
  {
    title: "Thẻ thứ nhất",
    body: "Mỗi thẻ là một khối sticky chiếm trọn màn hình. Khi bạn cuộn tiếp, thẻ sau trượt lên đè lên thẻ trước.",
    accent: "from-ink-800 to-ink-900 border-white/10",
  },
  {
    title: "Thẻ thứ hai",
    body: "Thẻ phía dưới đồng thời thu nhỏ nhẹ (scale 1 → 0.92) để tạo cảm giác bị đẩy lùi về sau.",
    accent: "from-neon-cyan/15 to-ink-900 border-neon-cyan/30",
  },
  {
    title: "Thẻ thứ ba",
    body: "Toàn bộ chỉ dùng position sticky và transform — không có JavaScript can thiệp vào luồng cuộn.",
    accent: "from-neon-amber/15 to-ink-900 border-neon-amber/30",
  },
  {
    title: "Thẻ thứ tư",
    body: "Kỹ thuật này hợp cho danh sách tính năng, case study, hoặc các bước quy trình.",
    accent: "from-ink-700 to-ink-900 border-white/15",
  },
];

function StackCard({
  index,
  progress,
  factor,
}: {
  index: number;
  progress: MotionValue<number>;
  factor: number;
}) {
  const transitions = cards.length - 1;
  // Thẻ i bị thu nhỏ trong lúc thẻ i+1 trượt lên (đoạn tiến độ [i, i+1] / transitions).
  const scale = useTransform(
    progress,
    [index / transitions, (index + 1) / transitions],
    [1, index === transitions ? 1 : 1 - 0.08 * factor]
  );
  const card = cards[index];

  return (
    <div className="sticky top-0 flex h-dvh items-center justify-center" style={{ zIndex: index + 1 }}>
      <motion.div
        className={cn(
          "w-[min(88vw,36rem)] rounded-2xl border bg-gradient-to-br p-8 shadow-billboard will-change-transform sm:p-12",
          card.accent
        )}
        style={{ scale }}
      >
        <p className="font-heading text-sm font-bold tracking-[0.3em] text-muted-foreground">
          {String(index + 1).padStart(2, "0")} / {String(cards.length).padStart(2, "0")}
        </p>
        <h3 className="mt-3 font-heading text-4xl font-bold uppercase sm:text-5xl">{card.title}</h3>
        <p className="mt-4 max-w-md text-sm text-muted-foreground sm:text-base">{card.body}</p>
      </motion.div>
    </div>
  );
}

/**
 * LỚP 04 — Thẻ xếp chồng: các thẻ sticky lần lượt trượt đè lên nhau,
 * thẻ phía dưới thu nhỏ dần khi bị che.
 */
export function Layer04StickyStack() {
  const ref = useRef<HTMLDivElement>(null);
  const factor = useParallaxFactor();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section id="layer-04" className="bg-ink-950" aria-label="Lớp 4: thẻ xếp chồng sticky">
      <div className="container pt-24">
        <LayerLabel index={4} technique="Sticky card stack" />
      </div>
      <div ref={ref} className="relative">
        {cards.map((card, i) => (
          <StackCard key={card.title} index={i} progress={scrollYProgress} factor={factor} />
        ))}
      </div>
    </section>
  );
}
