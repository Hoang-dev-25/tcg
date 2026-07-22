"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowRight, ChevronDown, MapPin, PhoneCall, Sparkles } from "lucide-react";

import { heroStats, heroWords } from "@/lib/v3-data";
import { useParallaxFactor } from "@/hooks/useParallaxFactor";

/* Load-in: stagger từng phần tử, headline reveal theo dòng (clip) */
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};
const lineReveal: Variants = {
  hidden: { y: "112%" },
  show: { y: "0%", transition: { duration: 0.75, ease: [0.16, 0.84, 0.44, 1] } },
};

/** Một dòng headline reveal từ dưới lên trong khung cắt (clip-path reveal). */
function Line({ children }: { children: React.ReactNode }) {
  return (
    <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
      <motion.span variants={lineReveal} className="block will-change-transform">
        {children}
      </motion.span>
    </span>
  );
}

/** Gõ chữ luân phiên các loại hình OOH (như v3/v4). */
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

  return words[state.w].slice(0, state.len);
}

/**
 * Hero v5 — nền TRONG SUỐT để lộ vũ trụ (UniverseBg fixed phía sau).
 * Parallax mới thay cho ảnh nền của v4: các tầng không gian trôi lệch tốc độ
 * khi cuộn — nebula orb (chậm) → hành tinh chân trời (vừa) → floating card
 * kính mờ (nhanh) → cụm chữ (nhanh nhất, fade khi bị section sau phủ lên).
 * Mọi biên độ nhân useParallaxFactor() → mobile giảm cường độ, reduced-motion tĩnh.
 */
export function V5Hero() {
  const runway = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const factor = useParallaxFactor();
  const text = useTypewriter(
    heroWords.map((w) => w.word),
    reduced
  );

  // 0 → 1 đúng trong pha section dưới trượt lên phủ hero
  const { scrollYProgress } = useScroll({ target: runway, offset: ["start start", "end end"] });

  // 4 tầng tốc độ (xa → gần): orb → hành tinh → floating card → text
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 130 * factor]);
  const planetY = useTransform(scrollYProgress, [0, 1], [0, 280 * factor]);
  const cardsY = useTransform(scrollYProgress, [0, 1], [0, -170 * factor]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -260 * factor]);
  const contentFade = useTransform(scrollYProgress, [0, 0.35, 0.8], [1, 1, factor === 0 ? 1 : 0.15]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div ref={runway} id="top" className="relative z-[5] h-[200dvh]">
      <div className="sticky top-0 h-dvh overflow-hidden">
        <section
          className="relative flex h-full flex-col overflow-hidden text-white"
          aria-label="Giới thiệu Toàn Cầu ADV"
        >
          {/* Tầng xa: nebula orb trôi chậm */}
          <motion.div aria-hidden style={{ y: orbY }} className="absolute inset-0 will-change-transform">
            <div
              className="absolute left-[6%] top-[14%] h-[46vmin] w-[46vmin] rounded-full blur-2xl"
              style={{ background: "radial-gradient(circle,rgba(124,92,255,.30),transparent 66%)" }}
            />
            <div
              className="absolute right-[2%] top-[34%] h-[56vmin] w-[56vmin] rounded-full blur-2xl"
              style={{ background: "radial-gradient(circle,rgba(35,116,217,.34),transparent 66%)" }}
            />
          </motion.div>

          {/* Tầng vừa: hành tinh nơi chân trời — lùi xuống khi cuộn */}
          <motion.div
            aria-hidden
            style={{ y: planetY }}
            className="absolute inset-x-0 -bottom-[52vmin] flex justify-center will-change-transform"
          >
            <div
              className="h-[92vmin] w-[92vmin] rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 50% 16%, #1A5BB0 0%, #113A72 30%, #0A1F42 58%, #050B1D 82%)",
                boxShadow:
                  "0 -22px 90px rgba(87,163,255,.38), inset 0 26px 70px rgba(173,211,255,.22)",
              }}
            />
          </motion.div>

          {/* Tầng giữa: floating card kính mờ trôi ở tốc độ riêng */}
          <motion.div aria-hidden style={{ y: cardsY }} className="absolute inset-0 z-[1] hidden lg:block">
            <motion.div
              initial={reduced ? false : { opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-[7%] top-[26%] flex items-center gap-2.5 rounded-md border border-white/20 bg-white/10 px-4 py-3 shadow-v2-xl backdrop-blur-md motion-safe:animate-float"
            >
              <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-white/10 text-v2blue-200">
                <Sparkles className="h-[18px] w-[18px]" />
              </span>
              <span className="grid text-left leading-tight">
                <strong className="text-[.9375rem] text-white">Điểm AI 92/100</strong>
                <span className="text-[.75rem] text-slate-300">Gợi ý theo ngành hàng</span>
              </span>
            </motion.div>
            <motion.div
              initial={reduced ? false : { opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-[24%] right-[6%] flex items-center gap-2.5 rounded-md border border-white/20 bg-white/10 px-4 py-3 shadow-v2-xl backdrop-blur-md motion-safe:animate-float-late"
            >
              <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-white/10 text-v2blue-200">
                <MapPin className="h-[18px] w-[18px]" />
              </span>
              <span className="grid text-left leading-tight">
                <strong className="text-[.9375rem] text-white">~730 vị trí</strong>
                <span className="text-[.75rem] text-slate-300">Phủ khắp 30+ tỉnh thành</span>
              </span>
            </motion.div>
          </motion.div>

          {/* Nội dung căn giữa — tầng nhanh nhất, fade khi hero bị phủ */}
          <motion.div
            variants={stagger}
            initial={reduced ? false : "hidden"}
            animate="show"
            style={{ y: contentY, opacity: contentFade }}
            className="relative z-[2] mx-auto flex w-full max-w-[1280px] flex-1 flex-col items-center justify-center px-4 pb-20 pt-24 text-center sm:px-6 lg:px-8"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[.8125rem] font-bold uppercase tracking-[.1em] text-v2blue-100 backdrop-blur"
            >
              <span className="h-2 w-2 rounded-full bg-v2blue-300 motion-safe:animate-pulse-ring" />
              Mạng lưới OOH toàn quốc
            </motion.span>
            <h1 className="m-0 mt-6 max-w-[880px] font-v2display text-[clamp(1.875rem,8.5vw,2.5rem)] font-bold leading-[1.12] tracking-[-0.01em] sm:text-[clamp(2.5rem,4.6vw,3.5rem)]">
              <Line>Giải pháp Quảng cáo</Line>
              <Line>
                <span className="text-v2blue-300">
                  {text}
                  <span
                    aria-hidden
                    className="ml-1 inline-block h-[0.92em] w-[3px] -translate-y-[0.05em] rounded-sm bg-v2blue-300 align-middle motion-safe:animate-[pulse-soft_1s_steps(1)_infinite]"
                  />
                </span>
              </Line>
              <Line>Hàng đầu Việt Nam</Line>
            </h1>
            <motion.p
              variants={fadeUp}
              className="m-0 mt-5 max-w-[620px] text-[1rem] leading-[1.65] text-slate-200 sm:text-[1.125rem]"
            >
              Được hơn 400 nhãn hàng tin chọn trong suốt 20 năm; vận hành cùng dữ liệu vị trí
              minh bạch và điểm AI theo ngành hàng.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-7 flex w-full items-center justify-center gap-2.5 sm:mt-8 sm:w-auto sm:flex-wrap sm:gap-3.5"
            >
              <a
                href="#ban-do"
                className="v3-shine inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-md bg-v2blue-600 px-4 text-[.9375rem] font-semibold text-white shadow-v2-lg transition hover:-translate-y-0.5 hover:bg-v2blue-500 sm:h-[54px] sm:flex-none sm:px-7 sm:text-[1.0625rem]"
              >
                Khám phá bản đồ <ArrowRight className="h-[17px] w-[17px] shrink-0" />
              </a>
              <a
                href="#lien-he"
                aria-label="Nhận tư vấn qua điện thoại"
                className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-md border border-white/40 bg-white/5 px-4 text-[.9375rem] font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/10 sm:h-[54px] sm:px-6 sm:text-[1.0625rem]"
              >
                <PhoneCall className="h-[17px] w-[17px] shrink-0" />
                Nhận tư vấn
              </a>
            </motion.div>

            {/* Số liệu làm bằng chứng — hàng nhẹ, không dùng band nặng */}
            <motion.div variants={fadeUp} className="mt-10 flex items-stretch divide-x divide-white/15 sm:mt-12">
              {heroStats.map((s) => (
                <div key={s.label} className="flex-1 px-3 text-center sm:flex-none sm:px-10">
                  <div className="font-mono text-[1.25rem] font-bold tabular-nums sm:text-[1.75rem]">
                    {s.value}
                  </div>
                  <div className="mt-1 text-[.6875rem] leading-snug text-slate-300 sm:text-[.8125rem]">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Gợi ý cuộn — mờ dần ngay khi bắt đầu cuộn */}
          <motion.div
            aria-hidden
            style={{ opacity: hintOpacity }}
            className="pointer-events-none absolute bottom-7 left-1/2 z-[2] -translate-x-1/2 text-v2blue-200"
          >
            <ChevronDown className="h-6 w-6 motion-safe:animate-scroll-hint" />
          </motion.div>
        </section>
      </div>
    </div>
  );
}
