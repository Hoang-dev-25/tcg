"use client";

import Image from "next/image";
import { ArrowRight, Map, Sparkles } from "lucide-react";

import { Parallax } from "@/components/parallax";
import { Reveal } from "@/components/landing/reveal";
import { assets } from "@/lib/landing-data";

/**
 * Preview bản đồ vị trí OOH: trái là mô tả + chip số liệu + CTA,
 * phải là bản đồ chấm với blob parallax trôi ngược phía sau.
 */
export function MapPreview() {
  return (
    <section id="map" className="overflow-hidden bg-white py-20 sm:py-24" aria-label="Bản đồ vị trí OOH">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Parallax speed={0.24}>
          <Reveal>
            <div className="grid justify-items-start gap-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.06em] text-brand-700">
                <Map className="h-[15px] w-[15px]" aria-hidden="true" /> Bản đồ trực tuyến
              </span>
              <h2 className="text-3xl font-bold leading-tight text-brand-900 sm:text-4xl">
                Bản đồ vị trí OOH toàn quốc
              </h2>
              <p className="max-w-md text-lg leading-relaxed text-slate-600">
                Lọc theo tỉnh/thành, loại biển, ngân sách. Xem điểm AI và chọn vị trí để
                nhận báo giá trong vài phút.
              </p>
              <div className="flex flex-wrap gap-2.5">
                {[
                  ["~730", "Vị trí OOH"],
                  ["30+", "Tỉnh/thành"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="flex items-baseline gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-4 py-2"
                  >
                    <strong className="font-mono text-lg text-brand-900">{value}</strong>
                    <span className="text-xs font-semibold text-slate-500">{label}</span>
                  </div>
                ))}
              </div>
              <a
                href="#lien-he"
                className="inline-flex h-[52px] items-center gap-2 rounded-lg bg-brick-500 px-6 text-base font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 motion-reduce:hover:translate-y-0"
              >
                Khám phá bản đồ vị trí <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </Parallax>

        <div className="relative">
          {/* Blob mờ phía sau — trôi ngược */}
          <Parallax speed={-0.4} className="pointer-events-none absolute left-[15%] top-[15%] h-[70%] w-[70%]">
            <div className="h-full w-full bg-brand-200 opacity-50 blur-[70px]" aria-hidden="true" />
          </Parallax>

          <Parallax speed={0.34} className="relative">
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-brand-50 shadow-lg">
              <Image
                src={assets.worldMap}
                alt="Bản đồ mạng lưới vị trí OOH Toàn Cầu"
                width={1200}
                height={700}
                sizes="(max-width: 1024px) 92vw, 38rem"
                className="block h-auto w-full mix-blend-multiply"
              />
            </div>

            <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 shadow-md animate-pulse-ring motion-reduce:animate-none">
              <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
              <span className="text-xs font-semibold text-slate-800">Đang khai thác trực tiếp</span>
            </div>
            <div className="absolute bottom-5 right-5 flex items-center gap-2 rounded-xl bg-brand-900 px-4 py-2.5 text-white shadow-lg">
              <Sparkles className="h-4 w-4 text-brand-200" aria-hidden="true" />
              <span className="text-[13px] font-semibold">Điểm AI theo ngành hàng</span>
            </div>
          </Parallax>
        </div>
      </div>
    </section>
  );
}
