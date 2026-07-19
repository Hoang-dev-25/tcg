"use client";

import { ArrowRight, FerrisWheel, Map as MapIcon } from "lucide-react";

import { Reveal } from "@/components/landing/reveal";
import { ctaBand } from "@/lib/v3-data";

export function CtaBand() {
  return (
    <section className="bg-white pt-12">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div
            className="grid items-center gap-9 rounded-[28px] p-9 shadow-v2-lg sm:p-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:p-[72px]"
            style={{ background: "linear-gradient(120deg,#D6E9FF 0%,#EBF4FF 100%)" }}
          >
            <div className="grid justify-items-start gap-5">
              <h2 className="m-0 font-v2display text-[clamp(1.75rem,2.6vw,2.5rem)] font-bold leading-[1.18] tracking-[-0.01em] text-v2blue-900">
                {ctaBand.title}
              </h2>
              <p className="m-0 max-w-[480px] text-[1.0625rem] leading-[1.65] text-slate-600">
                {ctaBand.desc}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-3.5">
                <a
                  href="#lien-he"
                  className="inline-flex h-[54px] items-center gap-2.5 rounded-md bg-v2blue-900 px-7 text-[1.0625rem] font-semibold text-white shadow-v2-md transition hover:-translate-y-0.5"
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

            <div className="relative">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-v2blue-200 shadow-v2-lg motion-safe:animate-float">
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
                  <strong className="text-[.875rem] text-v2blue-900">{ctaBand.badge.title}</strong>
                  <span className="text-[.71875rem] text-slate-500">{ctaBand.badge.sub}</span>
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
