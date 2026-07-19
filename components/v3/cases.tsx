"use client";

import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/landing/reveal";
import { Mark } from "@/components/v3/decor";
import { newsCards } from "@/lib/v3-data";

export function Cases() {
  return (
    <section id="tin-tuc" className="bg-v2blue-50 py-20 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <h2 className="m-0 font-v2display text-[1.875rem] font-semibold text-v2blue-900 sm:text-4xl">
            Dự án &amp; chiến dịch <Mark>tiêu biểu</Mark>
          </h2>
          <a
            href="#tin-tuc"
            className="inline-flex h-11 items-center gap-2 rounded-md bg-v2blue-600 px-5 text-sm font-semibold text-white shadow-v2-sm transition hover:bg-v2blue-700"
          >
            Xem tất cả <ArrowRight className="h-4 w-4" />
          </a>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {newsCards.map((n, i) => (
            <Reveal key={n.title} delay={i * 0.08}>
              <article className="grid h-full cursor-pointer grid-rows-[auto_1fr] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-v2-sm transition hover:-translate-y-1 hover:shadow-v2-lg">
                <div className="relative aspect-[16/10] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={n.img} alt="" className="h-full w-full object-cover" />
                  <span className="absolute left-3 top-3 rounded-full bg-v2blue-600/95 px-2.5 py-1 text-[.6875rem] font-bold uppercase tracking-[.04em] text-white shadow-v2-sm">
                    {n.tag}
                  </span>
                </div>
                <div className="grid content-start gap-2.5 p-[16px_18px_20px]">
                  <span className="font-mono text-xs text-slate-500">{n.date}</span>
                  <h3 className="m-0 font-v2display text-base font-semibold leading-[1.45] text-v2blue-900">
                    {n.title}
                  </h3>
                  <span className="mt-1 inline-flex items-center gap-1.5 text-[.8125rem] font-semibold text-v2blue-600">
                    Đọc tiếp <ArrowRight className="h-[15px] w-[15px]" />
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
