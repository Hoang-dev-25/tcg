"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight, Clock3 } from "lucide-react";

import { Parallax } from "@/components/parallax";
import { Reveal } from "@/components/landing/reveal";
import { Mark } from "@/components/v3/decor";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useParallaxFactor, useSafeFactor } from "@/hooks/useParallaxFactor";
import { useSnapCarousel } from "@/hooks/useSnapCarousel";
import { newsCardsRich, type NewsCardRich } from "@/lib/v4-cases";

/* Lớp 11 Parallax Lab — column-offset grid: mỗi cột một tốc độ trôi,
   lưới "gợn sóng" khi cuộn thay vì phẳng. */
const COLUMN_SPEEDS = [0.12, 0.38, 0.18, 0.46];

/** Card tin — ảnh bên trong trôi chậm hơn card (~15%) tạo chiều sâu khi cuộn qua. */
function CaseCard({ item, index }: { item: NewsCardRich; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const factor = useParallaxFactor();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [`${-7 * factor}%`, `${7 * factor}%`]);

  return (
    <Reveal delay={(index % 4) * 0.08}>
      <article
        ref={ref}
        className="grid h-full cursor-pointer grid-rows-[auto_1fr] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-v2-sm transition hover:-translate-y-1 hover:shadow-v2-lg"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <motion.img
            src={item.img}
            alt=""
            style={{ y: imgY }}
            className="absolute inset-x-0 top-[-8%] h-[116%] w-full object-cover will-change-transform"
          />
          <span className="absolute left-3 top-3 rounded-full bg-v2blue-600/95 px-2.5 py-1 text-[.6875rem] font-bold uppercase tracking-[.04em] text-white shadow-v2-sm">
            {item.tag}
          </span>
        </div>
        <div className="grid content-start gap-2.5 p-[16px_18px_20px]">
          <span className="flex items-center gap-2.5 font-mono text-xs text-slate-500">
            {item.date}
            <span aria-hidden className="h-3 w-px bg-slate-200" />
            <span className="inline-flex items-center gap-1">
              <Clock3 className="h-3 w-3" /> {item.read} phút đọc
            </span>
          </span>
          <h3 className="m-0 font-v2display text-base font-semibold leading-[1.45] text-v2blue-900">
            {item.title}
          </h3>
          <p className="m-0 line-clamp-2 text-[.8125rem] leading-[1.6] text-slate-600">{item.excerpt}</p>
          <span className="mt-1 flex items-center justify-between">
            <span className="text-[.75rem] font-semibold text-slate-500">{item.author}</span>
            <span className="inline-flex items-center gap-1.5 text-[.8125rem] font-semibold text-v2blue-600">
              Đọc tiếp <ArrowRight className="h-[15px] w-[15px]" />
            </span>
          </span>
        </div>
      </article>
    </Reveal>
  );
}

/**
 * Thẻ tin bản mobile — nằm trong carousel vuốt ngang. Thẻ lệch tâm thu nhỏ và
 * mờ đi (nhẹ hơn coverflow của khối dịch vụ: tin tức cần đọc được, không nên
 * nghiêng 3D). Bậc "safe" hạ biên độ còn 1/4 qua useSafeFactor.
 */
function MobileCaseCard({
  item,
  index,
  progress,
  count,
}: {
  item: NewsCardRich;
  index: number;
  progress: MotionValue<number>;
  count: number;
}) {
  const safe = useSafeFactor();
  const at = count > 1 ? index / (count - 1) : 0;
  const stepSize = count > 1 ? 1 / (count - 1) : 1;
  const dist = useTransform(progress, (v) => Math.min(Math.abs((v - at) / stepSize), 1));
  const scale = useTransform(dist, [0, 1], [1, 1 - 0.08 * safe]);
  const opacity = useTransform(dist, [0, 1], [1, 1 - 0.35 * safe]);

  return (
    <motion.article
      style={{ scale, opacity }}
      className="snap-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-v2-sm will-change-transform"
    >
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.img} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover" />
        <span className="absolute left-2.5 top-2.5 rounded-full bg-v2blue-600/95 px-2.5 py-1 text-[.625rem] font-bold uppercase tracking-[.04em] text-white">
          {item.tag}
        </span>
      </div>
      <div className="grid content-start gap-2 p-4">
        <span className="flex items-center gap-2 font-mono text-[.6875rem] text-slate-500">
          {item.date}
          <span aria-hidden className="h-3 w-px bg-slate-200" />
          <span className="inline-flex items-center gap-1">
            <Clock3 className="h-3 w-3" /> {item.read} phút
          </span>
        </span>
        <h3 className="m-0 line-clamp-2 font-v2display text-[.9375rem] font-semibold leading-[1.4] text-v2blue-900">
          {item.title}
        </h3>
        <p className="m-0 line-clamp-2 text-[.75rem] leading-[1.55] text-slate-600">{item.excerpt}</p>
        <span className="mt-0.5 flex items-center justify-between">
          <span className="text-[.6875rem] font-semibold text-slate-500">{item.author}</span>
          <span className="inline-flex items-center gap-1 text-[.75rem] font-semibold text-v2blue-600">
            Đọc tiếp <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </span>
      </div>
    </motion.article>
  );
}

/**
 * Tin tức bản mobile — carousel vuốt ngang thay cho lưới 1 cột.
 * Lưới dọc 8 thẻ dài gần 3800px, mỗi thẻ chiếm gần trọn màn hình nên người dùng
 * phải cuộn rất lâu; carousel gói cả 8 tin trong một màn và hé thẻ kế tiếp.
 */
function MobileCases() {
  const count = newsCardsRich.length;
  const { scroller, progress: p, active, barWidth: barW } = useSnapCarousel(count);

  return (
    <section id="tin-tuc" className="relative overflow-hidden bg-white py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-28 top-10 h-[320px] w-[320px] rounded-full"
        style={{ background: "radial-gradient(circle,rgba(54,143,255,.1),transparent 70%)" }}
      />
      <div className="relative grid gap-5">
        <div className="flex flex-wrap items-end justify-between gap-3 px-4 sm:px-6">
          <h2 className="m-0 font-v2display text-[1.625rem] font-semibold leading-[1.2] text-v2blue-900">
            Dự án &amp; chiến dịch <Mark>tiêu biểu</Mark>
          </h2>
          <a
            href="#tin-tuc"
            className="inline-flex h-10 items-center gap-1.5 rounded-md bg-v2blue-600 px-4 text-[.8125rem] font-semibold text-white"
          >
            Xem tất cả <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div
          ref={scroller}
          className="flex snap-x snap-mandatory gap-3.5 overflow-x-auto overscroll-x-contain px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {newsCardsRich.map((n, i) => (
            <div key={n.title} className="flex-none" style={{ width: "72vw", maxWidth: 290 }}>
              <MobileCaseCard item={n} index={i} progress={p} count={count} />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 px-4 sm:px-6">
          <div aria-hidden className="h-1 flex-1 overflow-hidden rounded-full bg-slate-200">
            <motion.div style={{ width: barW }} className="h-full rounded-full bg-v2blue-500" />
          </div>
          <span className="font-mono text-xs font-bold tabular-nums text-slate-500">
            {String(active + 1).padStart(2, "0")}/{String(count).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}

/**
 * Dự án & tin tức (v4) — nền SÁNG, lưới 4×2 dữ liệu thật (làm giàu: excerpt/tác giả/phút đọc).
 * Lớp 11: mỗi cột một tốc độ trôi → lưới gợn sóng; ảnh trong card parallax nhẹ.
 * Mobile: carousel vuốt ngang (xem MobileCases).
 */
export function CasesV4() {
  const mobile = useIsMobile();
  if (mobile) return <MobileCases />;

  return (
    <section id="tin-tuc" className="relative overflow-hidden bg-white py-20 lg:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-28 top-14 h-[380px] w-[380px] rounded-full"
        style={{ background: "radial-gradient(circle,rgba(54,143,255,.1),transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h2 className="m-0 font-v2display text-[1.875rem] font-semibold text-v2blue-900 sm:text-4xl">
            Dự án &amp; chiến dịch <Mark>tiêu biểu</Mark>
          </h2>
          <a
            href="#tin-tuc"
            className="inline-flex h-11 items-center gap-2 rounded-md bg-v2blue-600 px-5 text-sm font-semibold text-white shadow-v2-sm transition hover:-translate-y-0.5 hover:bg-v2blue-700"
          >
            Xem tất cả <ArrowRight className="h-4 w-4" />
          </a>
        </Reveal>

        <div className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {newsCardsRich.map((n, i) => (
            <Parallax key={n.title} speed={COLUMN_SPEEDS[i % COLUMN_SPEEDS.length]}>
              <CaseCard item={n} index={i} />
            </Parallax>
          ))}
        </div>
      </div>
    </section>
  );
}
