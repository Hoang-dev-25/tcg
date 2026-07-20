"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Camera, ChevronDown, PhoneCall, Receipt, ShieldCheck, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Reveal } from "@/components/landing/reveal";
import { Mark } from "@/components/v3/decor";
import { contactInfo } from "@/lib/v3-data";
import { commitments, faqItems, type CommitmentIcon } from "@/lib/v4-content";

const COMMIT_ICONS: Record<CommitmentIcon, LucideIcon> = {
  "shield-check": ShieldCheck,
  camera: Camera,
  wrench: Wrench,
  receipt: Receipt,
};

/** Một mục hỏi đáp — accordion, mở/đóng bằng nút để dùng được với bàn phím. */
function FaqRow({ index, item, open, onToggle }: {
  index: number;
  item: (typeof faqItems)[number];
  open: boolean;
  onToggle: () => void;
}) {
  const reduced = useReducedMotion() ?? false;
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div
      className={`overflow-hidden rounded-xl border bg-white transition ${
        open ? "border-v2blue-200 shadow-v2-md" : "border-slate-200 shadow-v2-sm hover:border-v2blue-200"
      }`}
    >
      <h3 className="m-0">
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-start gap-3.5 px-5 py-4 text-left"
        >
          <span className="mt-[3px] shrink-0 rounded-full bg-v2blue-50 px-2.5 py-1 text-[.6875rem] font-bold uppercase tracking-[.04em] text-v2blue-700">
            {item.group}
          </span>
          <span className="flex-1 text-[.9375rem] font-semibold leading-[1.5] text-v2blue-900">
            {item.q}
          </span>
          <ChevronDown
            aria-hidden
            className={`mt-0.5 h-[18px] w-[18px] shrink-0 text-v2blue-600 transition-transform duration-250 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="m-0 px-5 pb-5 pl-[4.75rem] text-[.9375rem] leading-[1.7] text-slate-600">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Hỏi đáp + Cam kết vận hành (v4) — nhịp SÁNG giữa Tin tức (trắng) và
 * Liên hệ (navy). Hai cột: FAQ accordion bên trái, cam kết vận hành + hotline
 * bên phải (sticky trên desktop) để cột phải không bị trống khi FAQ dài ra.
 */
export function FaqV4() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="hoi-dap"
      className="relative overflow-hidden py-20 lg:py-24"
      style={{ background: "linear-gradient(180deg,#FFFFFF 0%,#EBF4FF 100%)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-32 h-[420px] w-[420px] rounded-full"
        style={{ background: "radial-gradient(circle,rgba(54,143,255,.1),transparent 70%)" }}
      />

      <div className="relative mx-auto grid max-w-[1280px] items-start gap-12 px-4 sm:px-6 lg:grid-cols-[1.15fr_.85fr] lg:gap-14 lg:px-8">
        {/* Cột trái: hỏi đáp */}
        <div className="grid gap-6">
          <Reveal className="grid gap-4">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-v2blue-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[.1em] text-v2blue-700">
              Hỏi đáp
            </span>
            <h2 className="m-0 font-v2display text-[1.875rem] font-semibold leading-[1.18] text-v2blue-900 sm:text-4xl">
              Những điều doanh nghiệp <Mark>hỏi nhiều nhất</Mark>
            </h2>
            <p className="m-0 text-[1.0625rem] leading-[1.7] text-slate-600">
              Tổng hợp từ các cuộc tư vấn thực tế — chi phí, tiến độ, thủ tục pháp lý và cách đo
              lường hiệu quả.
            </p>
          </Reveal>

          <Reveal y={16} className="grid gap-2.5">
            {faqItems.map((item, i) => (
              <FaqRow
                key={item.q}
                index={i}
                item={item}
                open={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            ))}
          </Reveal>
        </div>

        {/* Cột phải: cam kết vận hành + hotline, dính khi cuộn */}
        <Reveal y={0} className="lg:sticky lg:top-[92px]">
          <div className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-v2-lg lg:p-7">
            <div className="grid gap-2">
              <span className="text-xs font-bold uppercase tracking-[.1em] text-v2blue-700">
                Cam kết vận hành
              </span>
              <h3 className="m-0 font-v2display text-[1.375rem] font-semibold leading-[1.3] text-v2blue-900">
                Cách chúng tôi làm việc
              </h3>
            </div>

            <ul className="m-0 grid list-none gap-4 p-0">
              {commitments.map((c) => {
                const Icon = COMMIT_ICONS[c.icon];
                return (
                  <li key={c.title} className="flex items-start gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[11px] bg-v2blue-50 text-v2blue-600">
                      <Icon className="h-[17px] w-[17px]" />
                    </span>
                    <span className="grid gap-0.5">
                      <strong className="text-[.9375rem] leading-snug text-v2blue-900">
                        {c.title}
                      </strong>
                      <span className="text-[.8125rem] leading-[1.6] text-slate-600">{c.desc}</span>
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="grid gap-2.5 border-t border-slate-200 pt-5">
              <span className="text-[.875rem] text-slate-600">Câu hỏi của bạn chưa có ở đây?</span>
              <a
                href={`tel:${contactInfo.hotline.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2.5 font-mono text-[1.25rem] font-bold text-v2blue-700"
              >
                <PhoneCall className="h-[18px] w-[18px]" />
                {contactInfo.hotline}
              </a>
              <a
                href="#lien-he"
                className="v3-shine mt-1 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-v2blue-600 px-5 text-[.9375rem] font-semibold text-white shadow-v2-sm transition hover:bg-v2blue-700"
              >
                Gửi câu hỏi cho chuyên viên
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
