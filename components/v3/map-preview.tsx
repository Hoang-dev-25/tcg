"use client";

import { ArrowRight, Map as MapIcon, Sparkles } from "lucide-react";

import { Reveal } from "@/components/landing/reveal";
import { mapPreview } from "@/lib/v3-data";

export function MapPreview() {
  return (
    <section
      id="ban-do"
      className="overflow-hidden py-20 lg:py-24"
      style={{ background: "linear-gradient(180deg,#FFFFFF 0%,#EBF4FF 100%)" }}
    >
      <div className="mx-auto grid max-w-[1280px] items-center gap-14 px-4 sm:px-6 lg:grid-cols-[.95fr_1.05fr] lg:px-8">
        <Reveal className="grid justify-items-start gap-[18px]">
          <span className="inline-flex items-center gap-2 rounded-full bg-v2blue-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[.06em] text-v2blue-700">
            <MapIcon className="h-[15px] w-[15px]" />
            {mapPreview.eyebrow}
          </span>
          <h2 className="m-0 font-v2display text-[1.875rem] font-semibold leading-[1.2] text-v2blue-900 sm:text-4xl">
            {mapPreview.title}
          </h2>
          <p className="m-0 max-w-[460px] text-[1.0625rem] leading-[1.6] text-slate-600 sm:text-lg">
            {mapPreview.desc}
          </p>
          <div className="flex flex-wrap gap-2.5">
            {mapPreview.stats.map((s) => (
              <div
                key={s.label}
                className="flex items-baseline gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-4 py-2"
              >
                <strong className="font-mono text-[1.125rem] text-v2blue-900">{s.value}</strong>
                <span className="text-xs font-semibold text-slate-500">{s.label}</span>
              </div>
            ))}
          </div>
          <a
            href="#lien-he"
            className="mt-1 inline-flex h-[52px] items-center gap-2 rounded-md bg-v2blue-600 px-6 text-base font-semibold text-white shadow-v2-md transition hover:-translate-y-0.5 hover:shadow-v2-lg"
          >
            Khám phá bản đồ vị trí <ArrowRight className="h-[18px] w-[18px]" />
          </a>
        </Reveal>

        <Reveal className="relative" y={0}>
          <div
            aria-hidden
            className="absolute left-[15%] top-[15%] h-[70%] w-[70%] rounded-full bg-v2blue-200 opacity-50 blur-[70px]"
          />
          <div
            className="relative overflow-hidden rounded-2xl border border-slate-200 shadow-v2-lg"
            style={{ background: "linear-gradient(160deg,#fff,#EBF4FF)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={mapPreview.image}
              alt="Bản đồ mạng lưới vị trí OOH Toàn Cầu"
              className="block w-full mix-blend-multiply"
            />
          </div>
          <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 shadow-v2-md motion-safe:animate-pulse-ring">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-semibold text-slate-700">{mapPreview.liveLabel}</span>
          </div>
          <div className="absolute bottom-5 right-5 flex items-center gap-2 rounded-lg bg-v2blue-900 px-4 py-2.5 text-white shadow-v2-lg">
            <Sparkles className="h-4 w-4 text-v2blue-200" />
            <span className="text-[.8125rem] font-semibold">{mapPreview.aiLabel}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
