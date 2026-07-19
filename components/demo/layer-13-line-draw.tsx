"use client";

import { motion, useTransform } from "framer-motion";

import { LayerLabel } from "@/components/demo/layer-label";
import { useSectionProgress } from "@/hooks/useSectionProgress";
import { useParallaxFactor } from "@/hooks/useParallaxFactor";

/**
 * LỚP 13 — SVG line drawing scrub: nét vẽ chạy theo tiến độ cuộn
 * (pathLength gắn thẳng vào scrollYProgress, không phải animation một lần).
 * Hình vẽ: khung một tấm billboard + tia đèn + đường chân trời.
 */
export function Layer13LineDraw() {
  const { ref, progress } = useSectionProgress<HTMLDivElement>();
  const factor = useParallaxFactor();

  // 3 nét vẽ nối tiếp nhau trên "thanh thời gian" cuộn
  const board = useTransform(progress, [0.08, 0.42], [factor === 0 ? 1 : 0, 1]);
  const rays = useTransform(progress, [0.42, 0.62], [factor === 0 ? 1 : 0, 1]);
  const skyline = useTransform(progress, [0.58, 0.85], [factor === 0 ? 1 : 0, 1]);
  const percent = useTransform(progress, (v) => `${Math.round(Math.min(1, Math.max(0, (v - 0.08) / 0.77)) * 100)}%`);

  return (
    <section id="layer-13" aria-label="Lớp 13: vẽ nét SVG theo cuộn">
      <div ref={ref} className="relative h-[260vh] bg-ink-900">
        <div className="sticky top-0 flex h-dvh flex-col items-center justify-center overflow-hidden px-6">
          <div className="mb-8 text-center">
            <LayerLabel index={13} technique="SVG line drawing scrub" className="justify-center" />
            <h2 className="font-heading text-4xl font-bold uppercase sm:text-5xl">
              Nét vẽ chạy theo <span className="text-neon-cyan text-glow-cyan">con lăn</span>
            </h2>
          </div>

          <div className="relative w-full max-w-2xl">
            <svg viewBox="0 0 400 260" className="h-auto w-full" role="img" aria-label="Hình vẽ nét billboard">
              {/* Khung billboard: mặt biển + trụ + chân đế */}
              <motion.path
                d="M100 40 H300 V120 H100 Z M196 120 V210 M204 120 V210 M170 210 H230"
                fill="none"
                stroke="#ffb224"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{ pathLength: board }}
              />
              {/* Tia đèn rọi */}
              <motion.path
                d="M92 34 L74 16 M200 30 V8 M308 34 L326 16"
                fill="none"
                stroke="#2ee6ff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="0 0"
                style={{ pathLength: rays }}
              />
              {/* Đường chân trời thành phố */}
              <motion.path
                d="M10 250 H60 V226 H88 V250 H130 V212 H158 V250 H240 V232 H268 V250 H322 V220 H352 V250 H390"
                fill="none"
                stroke="rgba(255,255,255,0.45)"
                strokeWidth="2"
                strokeLinejoin="round"
                style={{ pathLength: skyline }}
              />
            </svg>
            <motion.span className="absolute -bottom-2 right-0 font-mono text-sm text-neon-amber">
              {percent}
            </motion.span>
          </div>

          <p className="mt-8 max-w-md text-center text-sm text-muted-foreground">
            Ba path nối nhau trên cùng thanh tiến độ: khung biển → tia đèn → chân trời.
            Cuộn lùi là nét vẽ thu lại — scrub thật, không phải phát một lần.
          </p>
        </div>
      </div>
    </section>
  );
}
