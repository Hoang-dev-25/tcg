"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Parallax } from "@/components/parallax";
import { SectionHead } from "@/components/landing/section-head";
import { featuredServices } from "@/lib/landing-data";
import { cn } from "@/lib/utils";

/**
 * Spotlight dịch vụ nổi bật: cột tab bên trái, ảnh và mô tả đổi theo tab.
 * Parallax: ba cột trôi ba tốc độ khác nhau khi đi qua viewport.
 */
export function Spotlight() {
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();
  const service = featuredServices[active];

  return (
    <section id="spotlight" className="bg-white py-20 sm:py-24" aria-label="Dịch vụ nổi bật">
      <div className="mx-auto max-w-6xl px-3">
        <SectionHead
          kicker="Dịch vụ nổi bật"
          title="Giải pháp OOH của Toàn Cầu"
          sub="Khám phá các nhóm dịch vụ chính, từ sân bay đến billboard, LED và nhà chờ."
        />

        <div className="grid items-stretch gap-7 lg:grid-cols-[220px_1.15fr_1fr]">
          {/* Cột tab */}
          <Parallax speed={0.18}>
            <div
              className="grid content-start gap-2.5 max-lg:grid-cols-2 max-sm:grid-cols-1"
              role="tablist"
              aria-label="Chọn nhóm dịch vụ"
            >
              {featuredServices.map((f, idx) => (
                <button
                  key={f.slug}
                  type="button"
                  role="tab"
                  aria-selected={idx === active}
                  onClick={() => setActive(idx)}
                  className={cn(
                    "flex h-14 items-center rounded-lg px-4 text-left text-[15px] font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                    idx === active
                      ? "bg-gradient-to-r from-brand-900 to-brand-500 text-white shadow-md"
                      : "border border-slate-200 bg-white text-slate-700 hover:border-brand-300"
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </Parallax>

          {/* Ảnh */}
          <Parallax speed={0.32}>
            <div className="relative min-h-[320px] overflow-hidden rounded-2xl border border-slate-200 shadow-lg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={service.img}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: reducedMotion ? 1 : 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image
                    src={service.img}
                    alt={service.label}
                    fill
                    sizes="(max-width: 1024px) 92vw, 34rem"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </Parallax>

          {/* Nội dung */}
          <Parallax speed={0.24}>
            <AnimatePresence mode="wait">
              <motion.div
                key={service.title}
                className="grid content-center gap-3.5"
                initial={{ opacity: 0, y: reducedMotion ? 0 : 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-xs font-bold uppercase tracking-[0.08em] text-brand-600">
                  {service.label}
                </span>
                <h3 className="text-2xl font-semibold leading-snug text-brand-900">{service.title}</h3>
                <p className="text-[15px] leading-7 text-slate-600">{service.desc}</p>
                <div>
                  <a
                    href="#lien-he"
                    className="inline-flex h-11 items-center gap-2 rounded-lg bg-brick-500 px-5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-brick-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                  >
                    {service.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </Parallax>
        </div>
      </div>
    </section>
  );
}
