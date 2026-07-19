"use client";

import {
  Building2,
  Map as MapIcon,
  Plane,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

import { Reveal } from "@/components/landing/reveal";
import { HexTexture, StarField } from "@/components/v3/decor";
import { journey, type JourneyIcon } from "@/lib/v3-data";

const ICONS: Record<JourneyIcon, LucideIcon> = {
  building: Building2,
  trending: TrendingUp,
  plane: Plane,
  map: MapIcon,
  sparkles: Sparkles,
};

export function Journey() {
  return (
    <section className="relative overflow-hidden bg-v2blue-900 py-20 text-white lg:py-24">
      <HexTexture size={26} glow={14} className="opacity-70" />
      <StarField count={10} />
      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <Reveal>
          <span className="mb-3 block text-center text-xs font-semibold uppercase tracking-[.12em] text-v2blue-300">
            20 năm đồng hành
          </span>
          <h2 className="mb-14 text-center font-v2display text-[clamp(1.75rem,3vw,2.5rem)] font-bold tracking-[.01em]">
            Hành trình 20 năm
          </h2>
        </Reveal>
        <div className="relative grid gap-10 md:grid-cols-5 md:gap-4">
          <div
            aria-hidden
            className="absolute left-[10%] right-[10%] top-[74px] hidden h-[3px] rounded-sm md:block"
            style={{ background: "linear-gradient(90deg,#57A3FF,#ADD3FF)" }}
          />
          {journey.map((j, i) => {
            const Icon = ICONS[j.icon];
            return (
              <Reveal
                key={j.year}
                delay={i * 0.1}
                className="relative z-[1] grid justify-items-center gap-3.5 text-center"
              >
                <span className="font-mono text-[.9375rem] font-bold text-v2blue-200">{j.year}</span>
                <span
                  className="grid h-14 w-14 place-items-center rounded-full border-[3px] border-v2blue-900 bg-v2blue-500 text-white ring-2 ring-v2blue-400/50"
                  style={{ boxShadow: "0 0 22px rgba(87,163,255,.45)" }}
                >
                  <Icon className="h-6 w-6" />
                </span>
                <span className="-mt-1 h-2.5 w-2.5 rounded-full bg-v2blue-300" />
                <div className="mt-1 grid gap-1.5">
                  <strong className="text-[.9375rem] font-bold leading-[1.35] text-white">
                    {i + 1}. {j.title}
                  </strong>
                  <p className="m-0 text-[.8125rem] leading-[1.55] text-slate-300">{j.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
