"use client";

import { useState } from "react";

import { useIsMobile } from "@/hooks/useMediaQuery";
import { ArrowRight, Check, CheckCircle2, Plus } from "lucide-react";

import { Reveal } from "@/components/landing/reveal";
import { HexTexture, StarField } from "@/components/v3/decor";
import { leadForm } from "@/lib/v3-data";

/**
 * LeadForm v4 — giữ tối giản (điểm conversion, không thêm ma sát).
 * Chi tiết duy nhất: bắt đầu điền form → nút submit pulse nhẹ (v4-sparkle).
 */
export function LeadFormV4() {
  const [submitted, setSubmitted] = useState(false);
  const [agree, setAgree] = useState(false);
  const [engaged, setEngaged] = useState(false);
  const [showOptional, setShowOptional] = useState(false);
  const mobile = useIsMobile();

  /* Mobile chỉ hiện 2 ô bắt buộc; 4 ô tuỳ chọn nằm sau một nút mở rộng.
     Xếp cả 6 ô theo chiều dọc làm khối form dài hơn một màn hình và tạo cảm
     giác phải khai báo rất nhiều mới liên hệ được. */
  const visibleFields =
    mobile && !showOptional ? leadForm.fields.filter((f) => f.required) : leadForm.fields;

  return (
    <section
      id="lien-he"
      className="relative overflow-hidden py-14 sm:py-20 lg:py-24"
      style={{ background: "linear-gradient(160deg,#0D2F5E,#1A5BB0)" }}
    >
      <HexTexture size={28} glow={11} className="opacity-55" />
      <StarField count={9} />
      <div className="relative mx-auto grid max-w-[1280px] items-start gap-7 px-4 sm:px-6 sm:gap-12 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
        {/* Cột thông tin (nền tối → chữ sáng) */}
        <Reveal className="grid gap-3 text-white sm:gap-4">
          <span className="text-xs font-bold uppercase tracking-[.12em] text-v2blue-200">
            Bắt đầu ngay hôm nay
          </span>
          <h2 className="m-0 font-v2display text-[1.5rem] font-semibold leading-[1.2] sm:text-4xl">
            {leadForm.title}
          </h2>
          <p className="m-0 text-[.9375rem] leading-[1.6] text-slate-300 sm:text-[1.0625rem]">{leadForm.desc}</p>
          <ul className="m-0 grid list-none gap-2 p-0">
            {leadForm.benefits.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-[.875rem] font-medium leading-[1.5] text-slate-200 sm:text-base">
                <span className="mt-[3px] grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-v2blue-500 text-white">
                  <Check className="h-3 w-3" />
                </span>
                {b}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-x-7 gap-y-2 border-y border-white/15 py-3">
            {leadForm.stats.map((s) => (
              <div key={s.label} className="grid gap-0.5">
                <strong className="font-mono text-xl text-white sm:text-2xl">{s.value}</strong>
                <span className="text-xs font-semibold uppercase tracking-[.06em] text-slate-400">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
          <div className="grid gap-1">
            <span className="text-[.875rem] text-slate-300">Cần tư vấn ngay?</span>
            <a
              href={`tel:${leadForm.hotline.replace(/\s/g, "")}`}
              className="font-mono text-[1.375rem] font-bold text-v2blue-200"
            >
              {leadForm.hotline}
            </a>
          </div>
        </Reveal>

        {/* Form / success */}
        <Reveal y={0}>
          {submitted ? (
            <div className="grid justify-items-center gap-2.5 rounded-2xl border border-white/15 bg-white/10 p-10 text-center backdrop-blur">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-v2blue-500 text-white">
                <CheckCircle2 className="h-7 w-7" />
              </span>
              <strong className="text-2xl text-white">Đã nhận yêu cầu của bạn</strong>
              <p className="m-0 text-slate-300">
                Chúng tôi sẽ liên hệ trong 24h làm việc. Mã yêu cầu:{" "}
                <span className="font-mono font-semibold text-white">TC-2607-018</span>
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-2 inline-flex h-11 items-center rounded-md border border-white/40 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Gửi yêu cầu khác
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              onFocusCapture={() => setEngaged(true)}
              className="grid grid-cols-1 gap-3 rounded-2xl border border-white/15 bg-white p-4 shadow-v2-xl sm:grid-cols-2 sm:gap-3.5 sm:p-7"
            >
              {visibleFields.map((f) => (
                <label key={f.label} className="grid gap-1.5">
                  <span className="text-[.8125rem] font-semibold text-slate-700">
                    {f.label}
                    {f.required && <span className="text-red-500"> *</span>}
                  </span>
                  <input
                    required={f.required}
                    placeholder={f.placeholder}
                    className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-[.9375rem] text-slate-900 outline-none transition focus:border-v2blue-500 focus:ring-2 focus:ring-v2blue-200 sm:h-11 sm:px-3.5"
                  />
                </label>
              ))}
              {mobile && !showOptional && (
                <button
                  type="button"
                  onClick={() => setShowOptional(true)}
                  className="flex h-10 items-center justify-center gap-1.5 rounded-md border border-dashed border-slate-300 text-[.8125rem] font-semibold text-v2blue-700"
                >
                  <Plus className="h-4 w-4" /> Thêm doanh nghiệp, email, ngành hàng, ngân sách
                </button>
              )}
              <label className="grid gap-1.5 sm:col-span-2">
                <span className="text-[.8125rem] font-semibold text-slate-700">Nhu cầu / ghi chú</span>
                <textarea
                  rows={2}
                  placeholder="Mô tả ngắn nhu cầu quảng cáo…"
                  className="w-full resize-y rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-[.9375rem] leading-normal text-slate-900 outline-none transition focus:border-v2blue-500 focus:ring-2 focus:ring-v2blue-200"
                />
              </label>
              <label className="flex items-center gap-2.5 text-[.875rem] text-slate-700">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="h-4 w-4 accent-v2blue-600"
                />
                Đồng ý nhận liên hệ
              </label>
              <div className="justify-self-stretch sm:col-start-2 sm:justify-self-end">
                <button
                  type="submit"
                  disabled={!agree}
                  className={`v3-shine inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-v2blue-600 px-6 font-semibold text-white shadow-v2-md transition enabled:hover:bg-v2blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto ${
                    engaged && !submitted ? "v4-sparkle" : ""
                  }`}
                >
                  Gửi yêu cầu tư vấn <ArrowRight className="h-[18px] w-[18px]" />
                </button>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
