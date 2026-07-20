"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import {
  FileText,
  HardHat,
  LineChart,
  MapPinned,
  MessageSquare,
  PenTool,
  type LucideIcon,
} from "lucide-react";

import { Reveal } from "@/components/landing/reveal";
import { Mark } from "@/components/v3/decor";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { processSteps, type ProcessIcon, type ProcessStep } from "@/lib/v4-content";

const ICONS: Record<ProcessIcon, LucideIcon> = {
  "message-square": MessageSquare,
  "map-pinned": MapPinned,
  "file-text": FileText,
  "pen-tool": PenTool,
  "hard-hat": HardHat,
  "line-chart": LineChart,
};

/**
 * Quy trình triển khai (v4) — Lớp 13 Parallax Lab "line draw": đường nối giữa
 * các bước được vẽ dần theo tiến độ cuộn, mốc bước sáng lên khi đường chạy qua.
 * Đặt sau ServicesDeck (navy) làm nhịp SÁNG, trước bảng giá (navy) — giữ xen kẽ.
 * Mobile: rail dọc bên trái; desktop: lưới 3 cột, đường vẽ ngang theo từng hàng.
 */
export function ProcessV4() {
  const ref = useRef<HTMLDivElement>(null);
  const mobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 55%"],
  });
  // Đường nối vẽ dần 0 → 100%
  const lineScale = useTransform(scrollYProgress, [0, 0.85], [0, 1]);

  return (
    <section id="quy-trinh" className="relative overflow-hidden bg-white py-20 lg:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-24 h-[420px] w-[420px] rounded-full"
        style={{ background: "radial-gradient(circle,rgba(54,143,255,.09),transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-12 grid max-w-[640px] gap-4">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-v2blue-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[.1em] text-v2blue-700">
            Quy trình triển khai
          </span>
          <h2 className="m-0 font-v2display text-[1.875rem] font-semibold leading-[1.18] text-v2blue-900 sm:text-4xl">
            Từ nhu cầu đến <Mark>biển lên sóng</Mark>
          </h2>
          <p className="m-0 text-[1.0625rem] leading-[1.7] text-slate-600">
            Sáu bước cố định, mỗi bước có mốc thời gian và đầu ra bàn giao rõ ràng — bạn luôn biết
            chiến dịch đang ở đâu.
          </p>
        </Reveal>

        <div ref={ref} className="relative">
          {/* Đường nối vẽ dần — dọc ở mobile, ngang ở desktop */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-[27px] top-2 hidden h-[calc(100%-16px)] w-[2px] origin-top bg-v2blue-100 sm:block lg:hidden"
          >
            <motion.div style={{ scaleY: lineScale }} className="h-full w-full origin-top bg-v2blue-500" />
          </div>

          <ol className="m-0 grid list-none gap-6 p-0 sm:gap-7 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
            {processSteps.map((s, i) => (
              <StepCard
                key={s.step}
                step={s}
                index={i}
                progress={scrollYProgress}
                mobile={mobile}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/**
 * Một bước trong quy trình. Tách thành component riêng để hook useTransform
 * được gọi ở top level (không nằm trong vòng lặp map).
 * Mốc icon mờ → rõ khi tiến độ cuộn chạy qua vị trí của bước.
 */
function StepCard({
  step: s,
  index,
  progress,
  mobile,
}: {
  step: ProcessStep;
  index: number;
  progress: MotionValue<number>;
  mobile: boolean;
}) {
  const Icon = ICONS[s.icon];
  const at = index / processSteps.length;
  // Mobile cuộn qua nhanh hơn → dải chuyển ngắn lại cho kịp mắt
  const span = mobile ? 0.08 : 0.14;
  const active = useTransform(progress, [at - span, at + span], [0.35, 1], { clamp: true });

  return (
    <li className="relative">
      <Reveal delay={(index % 3) * 0.08} className="h-full">
        <div className="grid h-full content-start gap-3.5 rounded-2xl border border-slate-200 bg-white p-6 shadow-v2-sm transition hover:-translate-y-1 hover:border-v2blue-200 hover:shadow-v2-lg">
          <div className="flex items-center gap-3">
            <motion.span
              style={{ opacity: active }}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-[13px] bg-v2blue-600 text-white shadow-v2-md"
            >
              <Icon className="h-5 w-5" />
            </motion.span>
            <span className="font-mono text-[.8125rem] font-bold tracking-[.08em] text-v2blue-300">
              BƯỚC {s.step}
            </span>
          </div>

          <h3 className="m-0 font-v2display text-[1.1875rem] font-semibold leading-[1.35] text-v2blue-900">
            {s.title}
          </h3>
          <p className="m-0 text-[.9375rem] leading-[1.65] text-slate-600">{s.desc}</p>

          <dl className="m-0 mt-1 grid gap-2 border-t border-slate-100 pt-3.5">
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-[.75rem] font-semibold uppercase tracking-[.06em] text-slate-400">
                Thời gian
              </dt>
              <dd className="m-0 font-mono text-[.8125rem] font-semibold tabular-nums text-v2blue-900">
                {s.duration}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-[.75rem] font-semibold uppercase tracking-[.06em] text-slate-400">
                Bàn giao
              </dt>
              <dd className="m-0 text-right text-[.8125rem] font-semibold text-slate-700">
                {s.output}
              </dd>
            </div>
          </dl>
        </div>
      </Reveal>
    </li>
  );
}
