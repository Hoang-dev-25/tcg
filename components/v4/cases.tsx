"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Clock3 } from "lucide-react";

import { Parallax } from "@/components/parallax";
import { Reveal } from "@/components/landing/reveal";
import { Mark } from "@/components/v3/decor";
import { useParallaxFactor } from "@/hooks/useParallaxFactor";
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
 * Dự án & tin tức (v4) — nền SÁNG, lưới 4×2 dữ liệu thật (làm giàu: excerpt/tác giả/phút đọc).
 * Lớp 11: mỗi cột một tốc độ trôi → lưới gợn sóng; ảnh trong card parallax nhẹ.
 */
export function CasesV4() {
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
