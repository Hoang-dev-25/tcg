"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

import { LayerLabel } from "@/components/demo/layer-label";
import { useSectionProgress } from "@/hooks/useSectionProgress";
import { useParallaxFactor } from "@/hooks/useParallaxFactor";

const SENTENCE =
  "Mỗi con chữ bạn đang đọc được thắp sáng bởi chính con lăn chuột — cuộn tới đâu, câu chuyện hiện ra tới đó, cuộn lùi là chữ mờ lại như chưa từng xuất hiện.";

const words = SENTENCE.split(" ");

function Word({
  word,
  index,
  progress,
  factor,
}: {
  word: string;
  index: number;
  progress: MotionValue<number>;
  factor: number;
}) {
  const start = 0.1 + 0.7 * (index / words.length);
  const end = start + 0.7 / words.length;
  const opacity = useTransform(progress, [start, end], [factor === 0 ? 1 : 0.12, 1]);

  return (
    <motion.span style={{ opacity }} className="mr-[0.32em] inline-block">
      {word}
    </motion.span>
  );
}

/**
 * LỚP 14 — Text stagger reveal theo cuộn: từng từ sáng dần theo tiến độ,
 * scrub hai chiều (không phải hiệu ứng chạy một lần khi lọt viewport).
 */
export function Layer14TextStagger() {
  const { ref, progress } = useSectionProgress<HTMLDivElement>();
  const factor = useParallaxFactor();

  return (
    <section id="layer-14" aria-label="Lớp 14: chữ hiện dần theo cuộn">
      <div ref={ref} className="relative h-[250vh] bg-ink-950">
        <div className="sticky top-0 flex h-dvh flex-col items-center justify-center overflow-hidden px-6">
          <LayerLabel index={14} technique="Text stagger scrub" className="justify-center" />
          <p className="mx-auto mt-6 max-w-3xl text-center font-heading text-3xl font-bold uppercase leading-snug text-foreground sm:text-5xl">
            {words.map((word, i) => (
              <Word key={`${word}-${i}`} word={word} index={i} progress={progress} factor={factor} />
            ))}
          </p>
          <p className="mt-8 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {words.length} từ · mỗi từ một dải tiến độ riêng
          </p>
        </div>
      </div>
    </section>
  );
}
