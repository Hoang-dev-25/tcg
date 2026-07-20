"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  MapPin,
  Radar,
  Sparkles,
  Users,
} from "lucide-react";

import { Reveal } from "@/components/landing/reveal";
import { PinCue } from "@/components/v4/pin-cue";
import { HexTexture, StarField } from "@/components/v3/decor";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { mapPreview } from "@/lib/v3-data";

/* ---------- Nội dung 3 bước (dữ liệu thật từ hệ thống v1) ---------- */
const STEPS = [
  {
    k: "01",
    icon: MapPin,
    title: "Chọn vị trí",
    desc: "Khoanh vùng theo tỉnh/thành và ngân sách — hệ thống khóa mục tiêu billboard Ngã tư Sở, trục hướng tâm 86.000 xe/ngày.",
    stat: { value: "~730", label: "vị trí sẵn sàng đối chiếu" },
  },
  {
    k: "02",
    icon: BrainCircuit,
    title: "AI phân tích",
    desc: "Chồng lớp dữ liệu lưu lượng, nhân khẩu học bán kính 3km và giờ vàng — chấm điểm mức phù hợp cho từng ngành hàng.",
    stat: { value: "5", label: "ngành hàng được chấm điểm" },
  },
  {
    k: "03",
    icon: BarChart3,
    title: "Nhận kết quả",
    desc: "Điểm AI kèm tier và lý do đề xuất, xuất báo giá PDF trong vài phút — minh bạch để đối chiếu trước khi quyết định.",
    stat: { value: "92/100", label: "điểm F&B tại vị trí demo" },
  },
];

const SCORES = [
  { industry: "F&B", score: 92, tier: "Cao" },
  { industry: "Thời trang", score: 88, tier: "Cao" },
  { industry: "Công nghệ", score: 78, tier: "Khá" },
];

/* Dải tiến độ cho từng bước: [hiện, đỉnh, tắt] */
const RANGE: [number, number, number][] = [
  [0.0, 0.16, 0.3],
  [0.34, 0.5, 0.62],
  [0.68, 0.84, 1.01],
];

/** Panel chữ của 1 bước — crossfade theo dải tiến độ. */
function StepPanel({ step, index, t }: { step: (typeof STEPS)[number]; index: number; t: MotionValue<number> }) {
  const [a, , b] = RANGE[index];
  const opacity = useTransform(t, [a, a + 0.06, b - 0.06, b], [0, 1, 1, index === 2 ? 1 : 0]);
  const y = useTransform(t, [a, a + 0.06], [18, 0]);
  const Icon = step.icon;
  return (
    <motion.div style={{ opacity, y }} className="col-start-1 row-start-1 grid content-start gap-3 sm:gap-4">
      <span className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-md border border-white/15 bg-white/10 text-v2blue-200 backdrop-blur sm:h-11 sm:w-11">
          <Icon className="h-5 w-5" />
        </span>
        <span className="font-mono text-sm font-bold text-v2blue-300">BƯỚC {step.k}/03</span>
      </span>
      <h3 className="m-0 font-v2display text-[1.25rem] font-semibold leading-[1.2] text-white sm:text-3xl">
        {step.title}
      </h3>
      <p className="m-0 max-w-[420px] text-[.9375rem] leading-[1.65] text-slate-200 sm:text-[1.0625rem]">{step.desc}</p>
      <div className="flex items-baseline gap-2 rounded-md border border-white/15 bg-white/10 px-4 py-2.5 backdrop-blur">
        <strong className="font-mono text-[1.125rem] tabular-nums text-white sm:text-[1.375rem]">{step.stat.value}</strong>
        <span className="text-[.8125rem] font-semibold text-v2blue-100">{step.stat.label}</span>
      </div>
    </motion.div>
  );
}

/** Thẻ điểm AI lật vào ở bước 3. */
function ScoreCard({ item, index, t }: { item: (typeof SCORES)[number]; index: number; t: MotionValue<number> }) {
  const start = 0.72 + index * 0.06;
  const rotateY = useTransform(t, [start, start + 0.08], [82, 0]);
  const opacity = useTransform(t, [start, start + 0.06], [0, 1]);
  return (
    <motion.div
      style={{ rotateY, opacity, transformPerspective: 900 }}
      className="v4-conic flex items-center gap-2.5 rounded-md border border-white/15 bg-white/95 px-3 py-2.5 shadow-v2-xl backdrop-blur will-change-transform sm:gap-3 sm:px-4 sm:py-3"
    >
      <strong className="font-mono text-[1.25rem] font-bold tabular-nums text-v2blue-900 sm:text-[1.5rem]">{item.score}</strong>
      <span className="grid leading-tight">
        <span className="whitespace-nowrap text-[.8125rem] font-bold text-slate-700">{item.industry}</span>
        <span className="whitespace-nowrap text-[.6875rem] font-semibold text-v2blue-600">
          Tier {item.tier} · /100
        </span>
      </span>
    </motion.div>
  );
}

/* Bộ motion value điều khiển sân khấu bản đồ — dùng chung desktop & mobile. */
type MapStageValues = {
  mapScale: MotionValue<number>;
  mapX: MotionValue<string>;
  mapY: MotionValue<string>;
  heatOpacity: MotionValue<number>;
  radiusScale: MotionValue<number>;
  radiusOpacity: MotionValue<number>;
  markerY: MotionValue<string>;
  markerOpacity: MotionValue<number>;
  scanX: MotionValue<string>;
  scanOpacity: MotionValue<number>;
};

/** Sân khấu bản đồ: zoom → heatmap/radius/scan → marker. Dùng chung 2 breakpoint. */
function MapStage({ v, compact = false }: { v: MapStageValues; compact?: boolean }) {
  return (
    <div
      className={`relative overflow-hidden border border-white/15 shadow-v2-xl ${
        compact ? "rounded-xl" : "rounded-2xl"
      }`}
    >
      {/* Bản đồ zoom theo bước */}
      <motion.div
        style={{ scale: v.mapScale, x: v.mapX, y: v.mapY }}
        className="relative will-change-transform"
      >
        <div style={{ background: "linear-gradient(160deg,#FFFFFF,#EBF4FF)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mapPreview.image}
            alt="Bản đồ mạng lưới vị trí OOH Toàn Cầu"
            className="block w-full mix-blend-multiply"
          />
        </div>

        {/* Heatmap traffic (bước 2) */}
        <motion.div aria-hidden style={{ opacity: v.heatOpacity }} className="absolute inset-0">
          <div
            className="absolute h-[34%] w-[26%]"
            style={{
              left: "48%",
              top: "22%",
              background: "radial-gradient(ellipse at center,rgba(255,120,50,.55),rgba(255,178,36,.28) 55%,transparent 75%)",
              filter: "blur(6px)",
            }}
          />
          <div
            className="absolute h-[26%] w-[20%]"
            style={{
              left: "56%",
              top: "40%",
              background: "radial-gradient(ellipse at center,rgba(255,178,36,.45),transparent 70%)",
              filter: "blur(8px)",
            }}
          />
        </motion.div>

        {/* Radius demographics 3km (bước 2) — scale từ tâm vị trí.
            Offset tâm đặt qua x/y của framer (translate Tailwind sẽ bị motion ghi đè). */}
        <motion.div
          aria-hidden
          style={{ scale: v.radiusScale, opacity: v.radiusOpacity, left: "61%", top: "38%", x: "-50%", y: "-50%" }}
          className="absolute h-[38%] w-[24%]"
        >
          <span className="absolute inset-0 rounded-full border-2 border-v2blue-500/70 bg-v2blue-500/15" />
          <span className="absolute inset-[18%] rounded-full border border-v2blue-500/50" />
          <span className="absolute -right-1 top-0 flex items-center gap-1 whitespace-nowrap rounded-full bg-white px-2 py-0.5 text-[.625rem] font-bold text-v2blue-800 shadow-v2-sm">
            <Users className="h-3 w-3" /> 1,2 triệu người / 3km
          </span>
        </motion.div>

        {/* Marker drop (bước 1) */}
        <motion.div
          style={{ x: "-50%", y: v.markerY, opacity: v.markerOpacity, left: "61%", top: "38%" }}
          className="absolute"
        >
          <span className="grid place-items-center rounded-full bg-v2blue-600 p-2 text-white shadow-v2-lg ring-4 ring-v2blue-500/30">
            <MapPin className="h-4 w-4" />
          </span>
        </motion.div>
      </motion.div>

      {/* Scan line "AI đang xử lý" (bước 2) — quét ngang 1 lần */}
      <motion.div
        aria-hidden
        style={{ x: v.scanX, opacity: v.scanOpacity }}
        className="absolute inset-y-0 w-full will-change-transform"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "linear-gradient(90deg,transparent 88%,rgba(54,143,255,.16) 96%,rgba(173,211,255,.85) 99%,rgba(54,143,255,.16) 100%)",
          }}
        />
      </motion.div>

      {/* Nhãn trạng thái radar */}
      <motion.div
        style={{ opacity: v.heatOpacity }}
        className={`absolute flex items-center gap-2 rounded-full bg-v2blue-900/85 backdrop-blur ${
          compact ? "left-2.5 top-2.5 px-2.5 py-1" : "left-4 top-4 px-3 py-1.5"
        }`}
      >
        <Radar className="h-3.5 w-3.5 animate-spin text-v2blue-300" style={{ animationDuration: "3s" }} />
        <span className="text-[.6875rem] font-bold text-v2blue-100">AI đang phân tích lớp dữ liệu…</span>
      </motion.div>
    </div>
  );
}

/**
 * ⭐ AI Showcase (v4) — pin 300vh, scrub 3 bước: zoom vào vị trí → AI phân tích
 * (heatmap + radius + scan line) → kết quả (score card lật vào + CTA).
 * Mobile: pin rút gọn 260vh, bố cục dọc — vẫn giữ nguyên scrub 3 bước.
 * Reduced-motion: bỏ pin, 3 block dọc reveal thường.
 */
export function AiShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const mobile = useIsMobile();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // scrub có độ trễ mượt (tương đương scrub: 1)
  const t = useSpring(scrollYProgress, { stiffness: 160, damping: 30, restDelta: 0.001 });

  /* Bước đang xem — dùng cho PinCue để người dùng biết còn bước phía sau */
  const [step, setStep] = useState(1);
  useMotionValueEvent(t, "change", (v) => {
    const i = Math.min(STEPS.length, Math.max(1, Math.floor(v * STEPS.length) + 1));
    if (i !== step) setStep(i);
  });

  /* Bước 1: zoom vào vị trí (Ngã tư Sở ~ 61%/38% trên ảnh bản đồ) */
  const mapScale = useTransform(t, [0, 0.16, 0.62, 0.86], [1, 1.55, 1.55, 1.12]);
  const mapX = useTransform(t, [0, 0.16, 0.62, 0.86], ["0%", "-11%", "-11%", "-3%"]);
  const mapY = useTransform(t, [0, 0.16, 0.62, 0.86], ["0%", "12%", "12%", "3%"]);
  const markerDrop = useTransform(t, [0.1, 0.18, 0.22], [-56, 0, -10]);
  // gộp offset neo chân marker (-50%/-100%) với chuyển động drop — motion ghi đè translate class
  const markerY = useTransform(markerDrop, (v) => `calc(-100% + ${v}px)`);
  const markerOpacity = useTransform(t, [0.1, 0.14], [0, 1]);

  /* Bước 2: lớp dữ liệu vẽ dần + scan line quét 1 lần */
  const heatOpacity = useTransform(t, [0.36, 0.46, 0.86, 0.95], [0, 0.85, 0.85, 0]);
  const radiusScale = useTransform(t, [0.38, 0.52], [0, 1]);
  const radiusOpacity = useTransform(t, [0.38, 0.44, 0.86, 0.95], [0, 1, 1, 0]);
  const scanX = useTransform(t, [0.4, 0.56], ["-104%", "104%"]);
  const scanOpacity = useTransform(t, [0.38, 0.42, 0.54, 0.58], [0, 1, 1, 0]);

  /* Bước 3: CTA */
  const ctaOpacity = useTransform(t, [0.86, 0.94], [0, 1]);
  const ctaY = useTransform(t, [0.86, 0.94], [14, 0]);

  const progressW = useTransform(t, (v) => `${Math.max(2, v * 100)}%`);

  const stage: MapStageValues = {
    mapScale,
    mapX,
    mapY,
    heatOpacity,
    radiusScale,
    radiusOpacity,
    markerY,
    markerOpacity,
    scanX,
    scanOpacity,
  };

  /* ---------- Fallback reduced-motion: 3 block dọc, không hiệu ứng ---------- */
  if (reduced) {
    return (
      <section id="ban-do" className="relative overflow-hidden bg-v2blue-900 py-20 text-white">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "linear-gradient(160deg,#0D2F5E 0%,#134384 62%,#1A5BB0 100%)" }}
        />
        <HexTexture size={26} glow={10} className="opacity-55" />
        <div className="relative z-[2] mx-auto grid max-w-[1280px] gap-10 px-4 sm:px-6">
          <Reveal className="grid justify-items-start gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[.1em] text-v2blue-100">
              <Sparkles className="h-[14px] w-[14px]" /> AI Insights
            </span>
            <h2 className="m-0 font-v2display text-[1.875rem] font-semibold leading-[1.18]">
              AI chọn vị trí trong 3 bước
            </h2>
          </Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-white/15 shadow-v2-xl">
            <div style={{ background: "linear-gradient(160deg,#FFFFFF,#EBF4FF)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={mapPreview.image} alt="Bản đồ mạng lưới vị trí OOH Toàn Cầu" className="block w-full mix-blend-multiply" />
            </div>
          </div>
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.k} delay={i * 0.08} className="grid gap-3 rounded-2xl border border-white/12 bg-white/[.06] p-6 backdrop-blur">
                <span className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-md bg-white/10 text-v2blue-200">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <span className="font-mono text-[.8125rem] font-bold text-v2blue-300">BƯỚC {s.k}</span>
                </span>
                <h3 className="m-0 font-v2display text-xl font-semibold">{s.title}</h3>
                <p className="m-0 text-[.9375rem] leading-[1.65] text-slate-200">{s.desc}</p>
              </Reveal>
            );
          })}
          <a
            href="#lien-he"
            className="inline-flex h-[52px] w-fit items-center gap-2 rounded-md bg-v2blue-600 px-6 text-base font-semibold text-white shadow-v2-lg"
          >
            Xem báo cáo mẫu <ArrowRight className="h-[18px] w-[18px]" />
          </a>
        </div>
      </section>
    );
  }

  /* ---------- Mobile: pin 260vh, bố cục dọc — vẫn scrub 3 bước ---------- */
  if (mobile) {
    return (
      <section id="ban-do" aria-label="AI chọn vị trí trong 3 bước">
        <div ref={ref} className="relative h-[190vh]">
          <div className="sticky top-[76px] mx-3 flex h-[calc(100dvh-148px)] flex-col justify-center overflow-hidden rounded-[22px] bg-v2blue-900 text-white shadow-v2-xl sm:mx-5 lg:mx-8">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: "linear-gradient(160deg,#0D2F5E 0%,#134384 62%,#1A5BB0 100%)" }}
            />
            <HexTexture size={24} glow={9} className="opacity-50" />

            <div className="relative z-[2] mx-auto grid w-full max-w-[560px] gap-4 px-4 sm:px-6">
              <div className="grid justify-items-start gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[.6875rem] font-bold uppercase tracking-[.1em] text-v2blue-100 backdrop-blur">
                  <Sparkles className="h-3.5 w-3.5" /> AI Insights
                </span>
                <h2 className="m-0 font-v2display text-[1.375rem] font-semibold leading-[1.18]">
                  AI chọn vị trí trong 3 bước
                </h2>
                {/* Thanh tiến độ 3 bước */}
                <span className="relative h-1 w-full max-w-[240px] overflow-hidden rounded-full bg-white/15">
                  <motion.span
                    style={{ width: progressW }}
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-v2blue-400 to-v2blue-200"
                  />
                </span>
              </div>

              <MapStage v={stage} compact />

              {/* Score cards lật vào (bước 3) — đè mép dưới bản đồ */}
              <div className="-mt-8 flex flex-wrap justify-center gap-2 px-1">
                {SCORES.map((sc, i) => (
                  <ScoreCard key={sc.industry} item={sc} index={i} t={t} />
                ))}
              </div>

              {/* Panel 3 bước crossfade */}
              <div className="grid min-h-[176px]">
                {STEPS.map((s, i) => (
                  <StepPanel key={s.k} step={s} index={i} t={t} />
                ))}
              </div>

              <motion.div style={{ opacity: ctaOpacity, y: ctaY }}>
                <a
                  href="#lien-he"
                  className="v3-shine inline-flex h-12 items-center gap-2 rounded-md bg-v2blue-600 px-5 text-sm font-semibold text-white shadow-v2-lg"
                >
                  Xem báo cáo mẫu <ArrowRight className="h-4 w-4" />
                </a>
              </motion.div>
            </div>
          
            <PinCue progress={t} current={step} total={STEPS.length} />
          </div>
        </div>
      </section>
    );
  }

  /* ---------- Desktop: pin 300vh ---------- */
  return (
    <section id="ban-do" aria-label="AI chọn vị trí trong 3 bước">
      <div ref={ref} className="relative h-[220vh]">
        <div className="sticky top-[76px] mx-3 flex h-[calc(100dvh-148px)] flex-col justify-center overflow-hidden rounded-[22px] bg-v2blue-900 text-white shadow-v2-xl sm:mx-5 lg:mx-8">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: "linear-gradient(160deg,#0D2F5E 0%,#134384 62%,#1A5BB0 100%)" }}
          />
          <HexTexture size={28} glow={12} className="opacity-60" />
          <StarField count={8} />

          <div className="relative z-[2] mx-auto grid w-full max-w-[1280px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-[.85fr_1.15fr] lg:px-8">
            {/* Panel trái: tiêu đề + 3 bước crossfade */}
            <div className="grid content-center gap-8">
              <div className="grid justify-items-start gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[.1em] text-v2blue-100 backdrop-blur">
                  <Sparkles className="h-[14px] w-[14px]" /> AI Insights
                </span>
                <h2 className="m-0 font-v2display text-[1.875rem] font-semibold leading-[1.18] sm:text-4xl">
                  AI chọn vị trí trong 3 bước
                </h2>
                {/* Thanh tiến độ 3 bước */}
                <div className="mt-1 flex w-full max-w-[300px] items-center gap-2">
                  <span className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/15">
                    <motion.span
                      style={{ width: progressW }}
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-v2blue-400 to-v2blue-200"
                    />
                  </span>
                </div>
              </div>
              <div className="grid">
                {STEPS.map((s, i) => (
                  <StepPanel key={s.k} step={s} index={i} t={t} />
                ))}
              </div>
              <motion.div style={{ opacity: ctaOpacity, y: ctaY }}>
                <a
                  href="#lien-he"
                  className="v3-shine inline-flex h-[52px] items-center gap-2 rounded-md bg-v2blue-600 px-6 text-base font-semibold text-white shadow-v2-lg transition hover:-translate-y-0.5 hover:bg-v2blue-500"
                >
                  Xem báo cáo mẫu <ArrowRight className="h-[18px] w-[18px]" />
                </a>
              </motion.div>
            </div>

            {/* Sân khấu bản đồ */}
            <div className="relative">
              <div
                aria-hidden
                className="absolute left-[10%] top-[8%] h-[80%] w-[80%] rounded-full bg-v2blue-400/25 blur-[90px]"
              />
              <MapStage v={stage} />

              {/* Score cards lật vào (bước 3) */}
              <div className="absolute -bottom-6 left-1/2 flex -translate-x-1/2 gap-3">
                {SCORES.map((sc, i) => (
                  <ScoreCard key={sc.industry} item={sc} index={i} t={t} />
                ))}
              </div>
            </div>
          </div>

          <PinCue progress={t} current={step} total={STEPS.length} />
        </div>
      </div>
    </section>
  );
}
