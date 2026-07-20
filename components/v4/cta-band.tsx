"use client";

import { FerrisWheel, Map as MapIcon, PhoneCall } from "lucide-react";

import { Parallax } from "@/components/parallax";
import { Reveal } from "@/components/landing/reveal";
import { contactInfo, ctaBand } from "@/lib/v3-data";

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
            className="relative grid items-center gap-8 overflow-visible rounded-[20px] p-6 shadow-v2-lg sm:rounded-[28px] sm:p-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:p-[72px]"
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
                ~730 vị trí đang mở tra cứu
              </span>
              {/* Khẩu hiệu hướng tới khám phá bản đồ OOH — không lặp lại lời kêu
                  gọi báo giá của form Liên hệ ngay phía trên. */}
              <h2 className="m-0 font-v2display text-[clamp(1.75rem,2.6vw,2.5rem)] font-bold leading-[1.18] tracking-[-0.01em] text-v2blue-900">
                Vị trí tiếp theo của thương hiệu bạn đang chờ trên bản đồ
              </h2>
              <p className="m-0 max-w-[480px] text-[1.0625rem] leading-[1.65] text-slate-600">
                Mở bản đồ OOH toàn quốc, lọc theo tỉnh thành và ngân sách, xem điểm AI cho đúng
                ngành hàng của bạn. Không cần đăng ký, không cần chờ báo giá.
              </p>
              {/* Không lặp lại "Yêu cầu báo giá": form Liên hệ ngay phía trên đã
                  đảm nhiệm hành động đó, đặt thêm một CTA trỏ ngược lên #lien-he
                  là sai luồng. Ở đây chỉ đưa các lối liên hệ KHÁC. */}
              <div className="mt-2 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-3.5">
                {/* Hành động chính giờ là MỞ BẢN ĐỒ, hotline lùi về vai phụ */}
                <a
                  href="#ban-do"
                  className="v3-shine inline-flex h-12 items-center justify-center gap-2.5 rounded-md bg-v2blue-600 px-6 text-[.9375rem] font-semibold text-white shadow-v2-md transition hover:-translate-y-0.5 hover:bg-v2blue-500 sm:h-[54px] sm:px-7 sm:text-[1.0625rem]"
                >
                  <MapIcon className="h-[18px] w-[18px] shrink-0" /> Mở bản đồ OOH
                </a>
                <a
                  href={`tel:${contactInfo.hotline.replace(/\s/g, "")}`}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md border-[1.5px] border-v2blue-300 px-5 font-semibold text-v2blue-900 transition hover:-translate-y-0.5 hover:border-v2blue-400 sm:h-[54px] sm:px-6"
                >
                  <PhoneCall className="h-[17px] w-[17px] shrink-0" />
                  <span className="font-mono text-[.9375rem] sm:text-[1.0625rem]">
                    {contactInfo.hotline}
                  </span>
                </a>
              </div>
              <span className="text-[.8125rem] text-slate-500">
                {contactInfo.hours} · {contactInfo.email}
              </span>
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
