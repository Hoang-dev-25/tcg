"use client";

import { motion, useTransform } from "framer-motion";

import { LayerLabel } from "@/components/demo/layer-label";
import { useSectionProgress } from "@/hooks/useSectionProgress";
import { useParallaxFactor } from "@/hooks/useParallaxFactor";

const phaseLabel = ["Đêm sâu", "Xanh brand", "Hoàng hôn"];

/**
 * LỚP 15 — Color morph: cả nền section "đổi màu" theo tiến độ cuộn.
 * Không animate background-color (tốn paint) — xếp 3 lớp gradient toàn màn
 * và crossfade bằng opacity, vẫn thuần GPU compositor.
 */
export function Layer15ColorMorph() {
  const { ref, progress } = useSectionProgress<HTMLDivElement>();
  const factor = useParallaxFactor();

  const night = useTransform(progress, [0, 0.35], [1, 0]);
  const brand = useTransform(progress, [0.2, 0.5, 0.8], [0, 1, 0]);
  const dusk = useTransform(progress, [0.65, 1], [0, 1]);
  const phaseText = useTransform(progress, (v) =>
    v < 0.35 ? phaseLabel[0] : v < 0.7 ? phaseLabel[1] : phaseLabel[2]
  );

  if (factor === 0) {
    // Reduced motion: một nền tĩnh, không crossfade
    return (
      <section id="layer-15" className="bg-gradient-to-br from-[#12315E] to-ink-950 py-32 text-center" aria-label="Lớp 15: đổi màu nền">
        <LayerLabel index={15} technique="Color morph" className="justify-center" />
        <h2 className="font-heading text-4xl font-bold uppercase text-white sm:text-6xl">
          Nền đổi màu theo cuộn
        </h2>
      </section>
    );
  }

  return (
    <section id="layer-15" aria-label="Lớp 15: đổi màu nền theo cuộn">
      <div ref={ref} className="relative h-[260vh]">
        <div className="sticky top-0 flex h-dvh items-center justify-center overflow-hidden">
          {/* 3 lớp nền crossfade bằng opacity */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-ink-950 via-ink-900 to-[#03060d]"
            style={{ opacity: night }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[#12315E] via-[#1D5FB8] to-ink-950"
            style={{ opacity: brand }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[#7a2a08] via-[#b4560f] to-ink-950"
            style={{ opacity: dusk }}
            aria-hidden="true"
          />

          <div className="relative z-10 px-6 text-center">
            <LayerLabel index={15} technique="Color morph (opacity-only)" className="justify-center" />
            <h2 className="font-heading text-4xl font-bold uppercase text-white drop-shadow sm:text-6xl">
              Nền đổi màu <span className="text-neon-amber text-glow-amber">theo cuộn</span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-white/70">
              Ba lớp gradient toàn màn hình crossfade bằng opacity — cảm giác như
              background-color đang animate, nhưng GPU chỉ làm việc trộn lớp.
            </p>
            <motion.p className="mt-6 font-mono text-sm uppercase tracking-[0.3em] text-white/80">
              {phaseText}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
