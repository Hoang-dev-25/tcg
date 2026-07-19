"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, PhoneCall, Sparkles } from "lucide-react";

import { Parallax } from "@/components/parallax";
import { heroStats, heroWords } from "@/lib/landing-data";
import { useCountUp } from "@/hooks/useCountUp";

function StatItem({ stat }: { stat: (typeof heroStats)[number] }) {
  const { ref, value } = useCountUp(stat.value);
  return (
    <div className="grid gap-0.5">
      <strong ref={ref} className="text-2xl font-bold tracking-tight text-brand-900 sm:text-3xl">
        {value}
        {stat.suffix}
      </strong>
      <span className="text-xs text-slate-500 sm:text-sm">{stat.label}</span>
    </div>
  );
}

/**
 * HERO đơn giản: trái là thông tin + 2 CTA + chỉ số, phải là MỘT ảnh nhỏ
 * đóng khung kèm badge AI nổi. Blob nền trôi ngược tạo chiều sâu.
 */
export function Hero() {
  const reducedMotion = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: reducedMotion ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100dvh-72px)] items-center overflow-hidden bg-gradient-to-br from-brand-50 via-white to-brand-100"
      aria-label="Giới thiệu Toàn Cầu ADV"
    >
      <Parallax speed={-0.45} className="pointer-events-none absolute -right-32 -top-40">
        <div className="h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(54,143,255,0.16),transparent_68%)]" aria-hidden="true" />
      </Parallax>
      <Parallax speed={-0.3} className="pointer-events-none absolute -bottom-44 -left-36">
        <div className="h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(54,143,255,0.12),transparent_70%)]" aria-hidden="true" />
      </Parallax>

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        {/* Trái: thông tin đơn giản + CTA */}
        <Parallax speed={0.12}>
          <div className="grid justify-items-start gap-6">
            <motion.span
              className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-brand-700 ring-1 ring-brand-200"
              {...fadeUp(0)}
            >
              Quảng cáo ngoài trời toàn quốc
            </motion.span>
            <motion.h1
              className="text-[clamp(2.4rem,4.2vw,3.8rem)] font-bold leading-[1.08] tracking-tight text-brand-900"
              {...fadeUp(0.08)}
            >
              Thương hiệu của bạn
              <br />
              <span className="text-brand-600">trên từng cung đường</span>
            </motion.h1>
            <motion.p className="max-w-lg text-lg leading-relaxed text-slate-600" {...fadeUp(0.16)}>
              Toàn Cầu ADV vận hành ~730 vị trí billboard, LED, sân bay và nhà chờ xe bus
              trên 30+ tỉnh thành — kèm điểm AI gợi ý vị trí theo ngành hàng.
            </motion.p>
            <motion.div className="flex flex-wrap items-center gap-3.5" {...fadeUp(0.24)}>
              <a
                href="#lien-he"
                className="inline-flex h-[52px] items-center gap-2.5 rounded-lg bg-brand-900 px-7 text-base font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 motion-reduce:hover:translate-y-0"
              >
                Yêu cầu báo giá <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="#dich-vu"
                className="inline-flex h-[52px] items-center gap-2 rounded-lg border-[1.5px] border-slate-300 px-6 text-base font-semibold text-brand-900 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 motion-reduce:hover:translate-y-0"
              >
                <PhoneCall className="h-[18px] w-[18px]" aria-hidden="true" /> Xem dịch vụ
              </a>
            </motion.div>
            <motion.div className="flex flex-wrap gap-8 border-t-2 border-dashed border-slate-300 pt-6" {...fadeUp(0.32)}>
              {heroStats.map((stat) => (
                <StatItem key={stat.label} stat={stat} />
              ))}
            </motion.div>
          </div>
        </Parallax>

        {/* Phải: một hình ảnh nhỏ */}
        <Parallax speed={0.35} className="mx-auto w-full max-w-sm">
          <motion.div className="relative" {...fadeUp(0.18)}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-brand-100 shadow-xl ring-1 ring-slate-200">
              <Image
                src={heroWords[0].img}
                alt="Billboard Toàn Cầu ADV tại cửa ngõ cao tốc"
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 24rem"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-900/35" aria-hidden="true" />
              <p className="absolute bottom-3 left-4 text-sm font-semibold text-white drop-shadow">
                Nút giao Pháp Vân — cửa ngõ phía Nam Hà Nội
              </p>
            </div>
            <Parallax speed={0.5} className="absolute -left-6 -top-4">
              <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg animate-float motion-reduce:animate-none">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-600">
                  <Sparkles className="h-[18px] w-[18px]" aria-hidden="true" />
                </span>
                <span className="grid leading-tight">
                  <strong className="text-[15px] text-brand-900">Điểm AI 92/100</strong>
                  <span className="text-xs text-slate-500">Gợi ý theo ngành hàng</span>
                </span>
              </div>
            </Parallax>
          </motion.div>
        </Parallax>
      </div>

      {/* Gợi ý cuộn */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
        <p className="mb-2 text-[11px] uppercase tracking-[0.3em] text-slate-400">Cuộn xuống</p>
        <div className="mx-auto flex h-9 w-5 items-start justify-center rounded-full border border-slate-300 p-1.5">
          <div className="h-2 w-1 rounded-full bg-brand-600 animate-scroll-hint motion-reduce:animate-none" />
        </div>
      </div>
    </section>
  );
}
