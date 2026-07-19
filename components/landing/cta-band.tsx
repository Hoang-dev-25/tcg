"use client";

import Image from "next/image";
import { ArrowRight, Map, FerrisWheel } from "lucide-react";

import { Parallax } from "@/components/parallax";
import { Reveal } from "@/components/landing/reveal";
import { ctaImage } from "@/lib/landing-data";

/**
 * CTA band: khối gradient bo tròn đè lên footer (margin âm),
 * ảnh bên phải trôi parallax + badge địa danh nổi.
 */
export function CTABand() {
  return (
    <section className="relative z-10 bg-slate-50 px-6 pt-12" aria-label="Kêu gọi hành động">
      <div className="mx-auto -mb-20 max-w-6xl">
        <Reveal>
          <div className="grid items-center gap-9 rounded-[28px] bg-gradient-to-r from-brand-100 to-brand-50 p-[clamp(36px,5vw,72px)] shadow-xl lg:grid-cols-[1.05fr_1fr] lg:gap-14">
            <div className="grid justify-items-start gap-5">
              <h2 className="text-[clamp(1.75rem,2.6vw,2.5rem)] font-bold leading-tight tracking-tight text-brand-900">
                Sẵn sàng tìm vị trí OOH cho chiến dịch tiếp theo?
              </h2>
              <p className="max-w-md text-lg leading-relaxed text-slate-600">
                Dù bạn là nhãn hàng, agency hay chủ mặt bằng, Toàn Cầu ADV có dữ liệu
                và đội ngũ để chiến dịch của bạn thành công.
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-3.5">
                <a
                  href="#lien-he"
                  className="inline-flex h-[54px] items-center gap-2.5 rounded-lg bg-brand-900 px-7 text-[17px] font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 motion-reduce:hover:translate-y-0"
                >
                  Yêu cầu báo giá <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </a>
                <a
                  href="#map"
                  className="inline-flex h-[54px] items-center gap-2 rounded-lg border-[1.5px] border-brand-300 px-6 text-[17px] font-semibold text-brand-900 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 motion-reduce:hover:translate-y-0"
                >
                  <Map className="h-[18px] w-[18px]" aria-hidden="true" /> Khám phá bản đồ vị trí
                </a>
              </div>
              <span className="text-[13px] text-slate-500">Bạn là chủ biển muốn cho thuê? Sàn OOH sắp ra mắt.</span>
            </div>

            <Parallax speed={0.28} className="relative">
              <div className="animate-float motion-reduce:animate-none">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-brand-200 shadow-xl">
                  <Image
                    src={ctaImage}
                    alt="Billboard Toàn Cầu ADV trên cầu Bãi Cháy, Hạ Long — vòng quay Mặt Trời phía xa"
                    fill
                    sizes="(max-width: 1024px) 92vw, 34rem"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-900/30" aria-hidden="true" />
                </div>
                <div className="absolute -bottom-4 -left-3.5 flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-lg">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-50 text-brand-600">
                    <FerrisWheel className="h-[17px] w-[17px]" aria-hidden="true" />
                  </span>
                  <span className="grid leading-tight">
                    <strong className="text-sm text-brand-900">Cầu Bãi Cháy — Hạ Long</strong>
                    <span className="text-xs text-slate-500">Thương hiệu của bạn trên hành trình mỗi ngày</span>
                  </span>
                </div>
              </div>
            </Parallax>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
