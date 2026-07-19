"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Parallax } from "@/components/parallax";
import { Reveal } from "@/components/landing/reveal";
import { cases } from "@/lib/landing-data";

/* 4 cột trôi 4 tốc độ — lưới tin không bao giờ phẳng khi cuộn */
const columnSpeeds = [0.1, 0.3, 0.15, 0.35];

/** Dự án & chiến dịch tiêu biểu: 4 card tin tức, stagger reveal + parallax cột. */
export function Cases() {
  return (
    <section id="cases" className="bg-slate-50 py-20 sm:py-24" aria-label="Dự án và chiến dịch tiêu biểu">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-3xl font-bold text-brand-900 sm:text-4xl">Dự án &amp; chiến dịch tiêu biểu</h2>
          <a
            href="#lien-he"
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand-900 px-5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            Xem tất cả <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cases.map((item, i) => (
            <Parallax key={item.title} speed={columnSpeeds[i % columnSpeeds.length]}>
              <Reveal delay={i * 0.08}>
                <article className="group grid h-full cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={item.img}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 18rem"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-brand-600/95 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.04em] text-white shadow-sm">
                      {item.tag}
                    </span>
                  </div>
                  <div className="grid content-start gap-2.5 p-4 pb-5">
                    <span className="font-mono text-xs text-slate-500">{item.date}</span>
                    <h3 className="text-base font-semibold leading-relaxed text-slate-900">{item.title}</h3>
                    <span className="mt-1 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-900">
                      Đọc tiếp
                      <ArrowRight className="h-[15px] w-[15px] transition-transform group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0" aria-hidden="true" />
                    </span>
                  </div>
                </article>
              </Reveal>
            </Parallax>
          ))}
        </div>
      </div>
    </section>
  );
}
