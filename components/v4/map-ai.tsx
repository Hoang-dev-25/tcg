"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  ArrowRight,
  Map as MapIcon,
  MonitorSmartphone,
  Shirt,
  Sparkles,
  Utensils,
  type LucideIcon,
} from "lucide-react";

import { Reveal } from "@/components/landing/reveal";
import { HexTexture, Mark, StarField } from "@/components/v3/decor";
import { useCountUp } from "@/hooks/useCountUp";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useParallaxFactor } from "@/hooks/useParallaxFactor";
import { mapPreview } from "@/lib/v3-data";

/** Điểm AI thật từ hệ thống v1 (locations[].scores) — luôn kèm số + tier + lý do. */
const AI_SPOTS: {
  name: string;
  industry: string;
  score: number;
  reason: string;
  icon: LucideIcon;
  depth: number;
  className: string;
}[] = [
  {
    name: "Ngã tư Sở · Hà Nội",
    industry: "F&B",
    score: 92,
    reason: "Lưu lượng giờ cao điểm rất lớn",
    icon: Utensils,
    depth: 30,
    className: "-left-3 top-[8%] sm:-left-6",
  },
  {
    name: "Nội Bài T2 · Hà Nội",
    industry: "Thời trang",
    score: 88,
    reason: "Khách bay nội địa và quốc tế",
    icon: Shirt,
    depth: 22,
    className: "-right-2 top-[20%] sm:-right-5",
  },
  {
    name: "Tân Sơn Nhất · TP.HCM",
    industry: "Mỹ phẩm",
    score: 86,
    reason: "Sảnh đến quốc tế, khách chi tiêu cao",
    icon: Sparkles,
    depth: 26,
    className: "hidden sm:flex -left-8 bottom-[22%]",
  },
  {
    name: "LED Phạm Hùng · Hà Nội",
    industry: "Công nghệ",
    score: 78,
    reason: "Trục văn phòng, giờ vàng buổi tối",
    icon: MonitorSmartphone,
    depth: 34,
    className: "hidden sm:flex -right-6 bottom-[6%]",
  },
];

const tierOf = (score: number) => (score >= 85 ? "Cao" : "Khá");

/** Badge điểm AI nổi trên bản đồ — hook trong sub-component, không gọi trong vòng lặp. */
function AiBadge({
  spot,
  sx,
  sy,
  factor,
}: {
  spot: (typeof AI_SPOTS)[number];
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  factor: number;
}) {
  const x = useTransform(sx, (v) => v * spot.depth * factor);
  const y = useTransform(sy, (v) => v * spot.depth * 0.66 * factor);
  const { ref, value } = useCountUp(spot.score, 1.6);
  const Icon = spot.icon;

  return (
    <motion.div
      style={{ x, y }}
      className={`absolute z-[3] w-[228px] items-start gap-2.5 rounded-md border border-white/15 bg-white/95 px-3.5 py-3 shadow-v2-xl backdrop-blur will-change-transform ${spot.className.includes("hidden") ? "" : "flex"} ${spot.className}`}
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[9px] bg-v2blue-50 text-v2blue-600">
        <Icon className="h-4 w-4" />
      </span>
      <span className="grid gap-0.5 leading-tight">
        <span className="flex items-baseline gap-1.5">
          <strong ref={ref as React.Ref<HTMLElement>} className="font-mono text-[1.125rem] font-bold tabular-nums text-v2blue-900">
            {value}
          </strong>
          <span className="text-[.6875rem] font-semibold text-slate-400">/100</span>
          <span className="whitespace-nowrap rounded-full bg-v2blue-50 px-2 py-0.5 text-[.6875rem] font-bold text-v2blue-700">
            {tierOf(spot.score)} · {spot.industry}
          </span>
        </span>
        <span className="text-xs font-semibold text-slate-700">{spot.name}</span>
        <span className="text-[.6875rem] text-slate-500">{spot.reason}</span>
      </span>
    </motion.div>
  );
}

/**
 * Bản đồ + điểm AI (v4) — section đậm nổi bật ngay sau hero.
 * Áp Lớp 16 (mouse parallax) của Parallax Lab: khung bản đồ nghiêng 3D theo con trỏ,
 * bản đồ / quầng sáng / badge AI trôi theo độ sâu riêng. Cảm ứng & reduced-motion: tĩnh.
 */
export function MapAi() {
  const frame = useRef<HTMLDivElement>(null);
  const factor = useParallaxFactor();
  const coarse = useMediaQuery("(hover: none)");
  const interactive = factor > 0 && !coarse;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  const rotateY = useTransform(sx, (v) => v * 10 * factor);
  const rotateX = useTransform(sy, (v) => -v * 7 * factor);
  const mapX = useTransform(sx, (v) => v * -12 * factor);
  const mapY = useTransform(sy, (v) => v * -8 * factor);
  const glowX = useTransform(sx, (v) => v * 46 * factor);
  const glowY = useTransform(sy, (v) => v * 30 * factor);

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = frame.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((event.clientX - rect.left) / rect.width - 0.5);
    my.set((event.clientY - rect.top) / rect.height - 0.5);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section id="ban-do" className="relative overflow-hidden bg-v2blue-900 py-20 text-white lg:py-24">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "linear-gradient(160deg,#0D2F5E 0%,#134384 62%,#1A5BB0 100%)" }}
      />
      <HexTexture size={28} glow={12} className="opacity-60" />
      <StarField count={9} />

      <div className="relative z-[2] mx-auto grid max-w-[1280px] items-center gap-14 px-4 sm:px-6 lg:grid-cols-[.92fr_1.08fr] lg:px-8">
        {/* Cột nội dung */}
        <Reveal className="grid justify-items-start gap-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[.1em] text-v2blue-100 backdrop-blur">
            <MapIcon className="h-[15px] w-[15px]" />
            {mapPreview.eyebrow}
          </span>
          <h2 className="m-0 font-v2display text-[1.875rem] font-semibold leading-[1.2] sm:text-4xl">
            Bản đồ vị trí OOH <Mark>toàn quốc</Mark>
          </h2>
          <p className="m-0 max-w-[460px] text-[1.0625rem] leading-[1.65] text-slate-200 sm:text-lg">
            {mapPreview.desc}
          </p>
          <div className="flex flex-wrap gap-2.5">
            {mapPreview.stats.map((s) => (
              <div
                key={s.label}
                className="flex items-baseline gap-1.5 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur"
              >
                <strong className="font-mono text-[1.125rem] tabular-nums text-white">{s.value}</strong>
                <span className="text-xs font-semibold text-v2blue-100">{s.label}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur">
              <Sparkles className="h-[14px] w-[14px] text-v2blue-200" />
              <span className="text-xs font-semibold text-v2blue-100">{mapPreview.aiLabel}</span>
            </div>
          </div>
          <a
            href="#lien-he"
            className="v3-shine mt-1 inline-flex h-[52px] items-center gap-2 rounded-md bg-v2blue-600 px-6 text-base font-semibold text-white shadow-v2-lg transition hover:-translate-y-0.5 hover:bg-v2blue-500"
          >
            Nhận tư vấn vị trí phù hợp <ArrowRight className="h-[18px] w-[18px]" />
          </a>
        </Reveal>

        {/* Khung bản đồ — Lớp 16: mouse parallax */}
        <Reveal y={0}>
          <div style={{ perspective: 1100 }} className="relative">
            <motion.div
              ref={frame}
              onPointerMove={interactive ? onPointerMove : undefined}
              onPointerLeave={interactive ? reset : undefined}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative will-change-transform"
            >
              {/* Lớp xa: quầng sáng */}
              <motion.div
                aria-hidden
                style={{ x: glowX, y: glowY }}
                className="absolute left-[12%] top-[10%] h-[75%] w-[75%] rounded-full bg-v2blue-400/30 blur-[80px] will-change-transform"
              />
              {/* Lớp giữa: card bản đồ */}
              <motion.div
                style={{ x: mapX, y: mapY }}
                className="relative overflow-hidden rounded-2xl border border-white/15 shadow-v2-xl will-change-transform"
              >
                <div style={{ background: "linear-gradient(160deg,#FFFFFF,#EBF4FF)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={mapPreview.image}
                    alt="Bản đồ mạng lưới vị trí OOH Toàn Cầu"
                    className="block w-full mix-blend-multiply"
                  />
                </div>
                <div className="absolute left-1/2 top-5 flex -translate-x-1/2 items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 shadow-v2-md motion-safe:animate-pulse-ring">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-xs font-semibold text-slate-700">{mapPreview.liveLabel}</span>
                </div>
              </motion.div>
              {/* Lớp gần: badge điểm AI */}
              {AI_SPOTS.map((spot) => (
                <AiBadge key={spot.name} spot={spot} sx={sx} sy={sy} factor={factor} />
              ))}
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
