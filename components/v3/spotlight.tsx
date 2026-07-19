"use client";

import { useState } from "react";
import {
  ArrowRight,
  Briefcase,
  Lamp,
  Monitor,
  Plane,
  RectangleHorizontal,
  type LucideIcon,
} from "lucide-react";

import { Reveal } from "@/components/landing/reveal";
import { Mark } from "@/components/v3/decor";
import { featuredServices, type LucideName } from "@/lib/v3-data";

const ICONS: Record<LucideName, LucideIcon> = {
  plane: Plane,
  "rectangle-horizontal": RectangleHorizontal,
  monitor: Monitor,
  lamp: Lamp,
  briefcase: Briefcase,
};

export function Spotlight() {
  const [active, setActive] = useState(0);
  const s = featuredServices[active];
  const ActiveIcon = ICONS[s.icon];

  return (
    <section id="spotlight" className="relative overflow-hidden bg-v2blue-50 py-20 lg:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-10 h-[360px] w-[360px] rounded-full"
        style={{ background: "radial-gradient(circle,rgba(54,143,255,.12),transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-10 grid justify-items-center gap-2.5 text-center">
          <span className="text-xs font-semibold uppercase tracking-[.12em] text-v2blue-600">
            Dịch vụ nổi bật
          </span>
          <h2 className="m-0 font-v2display text-[1.875rem] font-semibold leading-[1.18] text-v2blue-900 sm:text-4xl">
            Giải pháp OOH của <Mark>Toàn Cầu</Mark>
          </h2>
          <p className="m-0 max-w-[640px] text-[1.0625rem] text-slate-500 sm:text-lg">
            Khám phá các nhóm dịch vụ chính, từ sân bay đến billboard, LED và nhà chờ.
          </p>
        </Reveal>

        <Reveal className="grid items-stretch gap-7 lg:grid-cols-[220px_1.15fr_1fr]">
          {/* Cột tab */}
          <div className="grid content-start gap-2.5">
            {featuredServices.map((f, i) => {
              const Icon = ICONS[f.icon];
              const on = i === active;
              return (
                <button
                  key={f.label}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`flex h-14 items-center gap-2.5 rounded-md px-[18px] text-left text-[.9375rem] font-semibold transition ${
                    on
                      ? "bg-gradient-to-br from-v2blue-900 to-v2blue-500 text-white shadow-v2-md"
                      : "border border-slate-200 bg-white text-slate-700 hover:border-v2blue-300"
                  }`}
                >
                  <Icon className="h-[18px] w-[18px]" />
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* Ảnh */}
          <div className="relative min-h-[320px] overflow-hidden rounded-2xl shadow-v2-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={s.img}
              src={s.img}
              alt={s.label}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Nội dung */}
          <div key={s.title} className="grid content-center gap-3.5">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[.08em] text-v2blue-600">
              <ActiveIcon className="h-[15px] w-[15px]" />
              {s.label}
            </span>
            <h3 className="m-0 font-v2display text-2xl font-semibold leading-[1.3] text-v2blue-900">
              {s.title}
            </h3>
            <p className="m-0 text-[.9375rem] leading-[1.7] text-slate-600">{s.desc}</p>
            <div>
              <a
                href="#lien-he"
                className="inline-flex h-11 items-center gap-2 rounded-md bg-v2blue-600 px-5 text-sm font-semibold text-white shadow-v2-sm transition hover:bg-v2blue-700"
              >
                {s.cta} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
