"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MapPin, PhoneCall, Sparkles } from "lucide-react";

import { heroStats, heroWords } from "@/lib/v3-data";
import { HeroCurves, HexTexture, StarField } from "@/components/v3/decor";

/** Gõ chữ luân phiên các loại hình OOH (nội dung v1). */
function useTypewriter(words: string[], reduced: boolean) {
  const [state, setState] = useState({ w: 0, len: reduced ? words[0].length : 0, del: false });

  useEffect(() => {
    if (reduced) return;
    const word = words[state.w];
    let delay = state.del ? 42 : 88;
    if (!state.del && state.len === word.length) delay = 2100;
    if (state.del && state.len === 0) delay = 420;
    const t = setTimeout(() => {
      setState((p) => {
        const wd = words[p.w];
        if (!p.del) return p.len < wd.length ? { ...p, len: p.len + 1 } : { ...p, del: true };
        return p.len > 0 ? { ...p, len: p.len - 1 } : { w: (p.w + 1) % words.length, len: 0, del: false };
      });
    }, delay);
    return () => clearTimeout(t);
  }, [state, reduced, words]);

  return { text: words[state.w].slice(0, state.len), idx: state.w };
}

export function Hero() {
  const reduced = useReducedMotion() ?? false;
  const { text, idx } = useTypewriter(
    heroWords.map((w) => w.word),
    reduced
  );

  return (
    <section id="top" className="relative flex flex-col overflow-hidden bg-v2blue-900 text-white">
      {/* nền trang trí */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "linear-gradient(160deg,#0D2F5E 0%,#134384 60%,#1A5BB0 100%)" }}
      />
      <HexTexture size={30} glow={12} className="opacity-60" />
      <HeroCurves />
      <StarField count={14} />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-40 h-[520px] w-[520px] rounded-full"
        style={{ background: "radial-gradient(circle,rgba(87,163,255,.25),transparent 68%)" }}
      />

      <div className="relative z-[2] mx-auto grid w-full max-w-[1280px] flex-1 items-center gap-11 px-4 pb-14 pt-20 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-14 lg:px-8 lg:pb-16">
        {/* Cột trái */}
        <div className="grid justify-items-start gap-6">
          <span className="inline-flex items-center gap-2 text-[.8125rem] font-bold uppercase tracking-[.1em] text-v2blue-200">
            <span className="h-2 w-2 rounded-full bg-v2blue-300 motion-safe:animate-pulse-ring" />
            Mạng lưới OOH toàn quốc
          </span>
          <h1 className="m-0 font-v2display text-[clamp(2.5rem,4.3vw,3.2rem)] font-bold leading-[1.1] tracking-[-0.01em]">
            Giải pháp Quảng cáo
            <br />
            <span className="text-v2blue-300">
              {text}
              <span
                aria-hidden
                className="ml-1 inline-block h-[0.92em] w-[3px] -translate-y-[0.05em] rounded-sm bg-v2blue-300 align-middle motion-safe:animate-[pulse-soft_1s_steps(1)_infinite]"
              />
            </span>
            <br />
            Hàng đầu Việt Nam
          </h1>
          <p className="m-0 max-w-[520px] text-[1.125rem] leading-[1.65] text-slate-200">
            Được hơn 400 nhãn hàng tin chọn trong suốt 20 năm; vận hành cùng dữ liệu vị trí minh
            bạch và điểm AI theo ngành hàng.
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-3.5">
            <a
              href="#ban-do"
              className="v3-shine inline-flex h-[54px] items-center gap-2.5 rounded-md bg-v2blue-600 px-7 text-[1.0625rem] font-semibold text-white shadow-v2-lg transition hover:-translate-y-0.5 hover:bg-v2blue-500"
            >
              Khám phá bản đồ vị trí <ArrowRight className="h-[19px] w-[19px]" />
            </a>
            <a
              href="#lien-he"
              className="inline-flex h-[54px] items-center gap-2 rounded-md border border-white/40 px-6 text-[1.0625rem] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              <PhoneCall className="h-[18px] w-[18px]" /> Nhận tư vấn
            </a>
          </div>
        </div>

        {/* Cột phải: ảnh xoay + 2 thẻ nổi */}
        <div className="relative min-h-[320px]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-v2blue-800 shadow-v2-xl ring-1 ring-white/10">
            {heroWords.map((w, k) => (
              <motion.img
                key={w.img}
                src={w.img}
                alt={"Quảng cáo " + w.word + " — Toàn Cầu ADV"}
                loading={k === 0 ? "eager" : "lazy"}
                className="absolute inset-0 h-full w-full object-cover"
                animate={{
                  opacity: k === idx ? 1 : 0,
                  scale: reduced ? 1 : k === idx ? 1.04 : 1,
                }}
                transition={{ opacity: { duration: 0.9 }, scale: { duration: 6, ease: "easeOut" } }}
              />
            ))}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: "linear-gradient(180deg,transparent 55%,rgba(13,47,94,.45))" }}
            />
          </div>

          <div className="absolute -left-5 -top-4 flex items-center gap-2.5 rounded-md border border-white/15 bg-white/95 px-4 py-3 shadow-v2-xl backdrop-blur motion-safe:animate-float">
            <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-v2blue-50 text-v2blue-600">
              <Sparkles className="h-[18px] w-[18px]" />
            </span>
            <span className="grid leading-tight">
              <strong className="text-[.9375rem] text-v2blue-900">Điểm AI 92/100</strong>
              <span className="text-[.75rem] text-slate-500">Gợi ý theo ngành hàng</span>
            </span>
          </div>

          <div className="absolute -bottom-5 -right-3 flex items-center gap-2.5 rounded-md border border-white/15 bg-white/95 px-4 py-3 shadow-v2-xl backdrop-blur motion-safe:animate-float-late">
            <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-v2blue-50 text-v2blue-600">
              <MapPin className="h-[18px] w-[18px]" />
            </span>
            <span className="grid leading-tight">
              <strong className="text-[.9375rem] text-v2blue-900">~730 vị trí</strong>
              <span className="text-[.75rem] text-slate-500">Phủ khắp 30+ tỉnh thành</span>
            </span>
          </div>
        </div>
      </div>

      {/* Stat band (v2) */}
      <div className="relative z-[2] w-full border-t border-white/10 bg-v2blue-900/60 backdrop-blur">
        <div className="mx-auto max-w-[1280px] px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-x-4 gap-y-6">
            {heroStats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-mono text-2xl font-bold tabular-nums sm:text-3xl">{s.value}</div>
                <div className="mt-1 text-[.8125rem] text-slate-300">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
