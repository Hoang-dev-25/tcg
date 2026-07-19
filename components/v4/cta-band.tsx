"use client";

import { ArrowRight, FerrisWheel, Map as MapIcon } from "lucide-react";

import { Parallax } from "@/components/parallax";
import { Reveal } from "@/components/landing/reveal";
import { ctaBand } from "@/lib/v3-data";

/**
 * CTA cuối (v4) — dải band SÁNG (nhịp nghỉ sau khối Liên hệ navy) nhưng giữ
 * motif echo hero đảo hướng: ảnh + quầng sáng trôi NGƯỢC hướng cuộn (Parallax dương).
 */
export function CtaBandV4() {
  return (
    <section className="relative overflow-hidden bg-white pt-12 pb-20 lg:pb-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div
            className="relative grid items-center gap-9 overflow-visible rounded-[28px] p-9 shadow-v2-lg sm:p-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:p-[72px]"
            style={{ background: "linear-gradient(120deg,#D6E9FF 0%,#EBF4FF 100%)" }}
          >
            <Parallax
              speed={0.25}
              className="pointer-events-none absolute -left-24 -bottom-24 h-[320px] w-[320px]"
            >
              <div
                aria-hidden
                className="h-full w-full rounded-full"
                style={{ background: "radial-gradient(circle,rgba(54,143,255,.18),transparent 70%)" }}
              />
            </Parallax>

            <div className="relative grid justify-items-start gap-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-v2blue-200 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[.1em] text-v2blue-700 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-v2blue-400 motion-safe:animate-pulse-ring" />
                Sẵn sàng lên sóng
              </span>
              <h2 className="m-0 font-v2display text-[clamp(1.75rem,2.6vw,2.5rem)] font-bold leading-[1.18] tracking-[-0.01em] text-v2blue-900">
                {ctaBand.title}
              </h2>
              <p className="m-0 max-w-[480px] text-[1.0625rem] leading-[1.65] text-slate-600">
                {ctaBand.desc}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-3.5">
                <a
                  href="#lien-he"
                  className="v3-shine inline-flex h-[54px] items-center gap-2.5 rounded-md bg-v2blue-900 px-7 text-[1.0625rem] font-semibold text-white shadow-v2-md transition hover:-translate-y-0.5"
                >
                  Yêu cầu báo giá <ArrowRight className="h-[19px] w-[19px]" />
                </a>
                <a
                  href="#ban-do"
                  className="inline-flex h-[54px] items-center gap-2 rounded-md border-[1.5px] border-v2blue-300 px-6 text-[1.0625rem] font-semibold text-v2blue-900 transition hover:-translate-y-0.5 hover:border-v2blue-400"
                >
                  <MapIcon className="h-[18px] w-[18px]" /> Khám phá bản đồ vị trí
                </a>
              </div>
              <span className="text-[.8125rem] text-slate-500">{ctaBand.note}</span>
            </div>

            <Parallax speed={0.28} className="relative">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-v2blue-200 shadow-v2-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ctaBand.image}
                  alt="Billboard Toàn Cầu ADV trên cầu Bãi Cháy, Hạ Long"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(180deg,transparent 60%,rgba(13,47,94,.3))" }}
                />
              </div>
              <div className="absolute -bottom-4 -left-3.5 flex items-center gap-2.5 rounded-md border border-slate-200 bg-white px-4 py-2.5 shadow-v2-lg">
                <span className="grid h-8 w-8 place-items-center rounded-[9px] bg-v2blue-50 text-v2blue-600">
                  <FerrisWheel className="h-[17px] w-[17px]" />
                </span>
                <span className="grid leading-tight">
                  <strong className="text-[.8125rem] text-v2blue-900">Cầu Bãi Cháy — Hạ Long</strong>
                  <span className="text-[.6875rem] text-slate-500">Vị trí biểu tượng đang khai thác</span>
                </span>
              </div>
            </Parallax>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
