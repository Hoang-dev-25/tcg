"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Lamp,
  Monitor,
  MoveRight,
  Plane,
  RectangleHorizontal,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { HexTexture, StarField } from "@/components/v3/decor";
import { Spotlight } from "@/components/v3/spotlight";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useMotionTier, useSafeFactor } from "@/hooks/useMotionTier";
import { deckServices, type DeckService } from "@/lib/v4-services";
import type { LucideName } from "@/lib/v3-data";

const ICONS: Record<LucideName, LucideIcon> = {
  plane: Plane,
  "rectangle-horizontal": RectangleHorizontal,
  monitor: Monitor,
  lamp: Lamp,
  briefcase: Briefcase,
};

const N = deckServices.length;
const SEG = 1 / N;
const FLY = 0.45 * SEG; // thời lượng bay ra/về trong 1 segment
const ARC = 0.2 * SEG; // mốc giữa của cung bay (nhấc lên trước, bay ngang sau)

/* Kích thước thẻ (px) — khổ NGANG theo đúng tỉ lệ ảnh 16:9 để ảnh hiển thị đầy đủ,
   không bị object-cover cắt. Vùng ảnh 420×236 + thanh label 54px nằm DƯỚI ảnh.
   Kích thước chọn để deck (×0.8) + featured (×1.06) VỪA cột trái ~864px, không đè nhau. */
const CW = 420;
const BAR = 54;
const CH = 236 + BAR;

type Pose = { x: number; y: number; z: number; rx: number; rz: number; s: number };

const deckPose = (i: number, dx: number): Pose => ({
  x: dx,
  y: i * 40 - 80,
  z: -i * 34,
  rx: 45,
  rz: -8,
  s: 0.58,
});
const liftPose = (i: number, dx: number): Pose => ({
  x: dx * 0.78,
  y: i * 40 - 80 - 76, // nhấc lên trước khi bay ngang → cung bay 2 nhịp, không lerp thẳng
  z: 12,
  rx: 22,
  rz: -4,
  s: 0.85,
});
const STAGE: Pose = { x: 0, y: 26, z: 40, rx: 0, rz: 0, s: 1.06 };

/** Sinh keyframes cho thẻ i: deck → (lift) → stage ở segment i, bay ngược ở segment i+1. */
function buildFrames(i: number, dx: number) {
  const d = deckPose(i, dx);
  const l = liftPose(i, dx);
  const si = i * SEG;
  const sn = (i + 1) * SEG;

  let times: number[];
  let poses: Pose[];
  if (i === N - 1) {
    // thẻ cuối: rút ra rồi giữ trên sân khấu tới hết
    times = si === 0 ? [0, ARC, FLY, 1] : [0, si, si + ARC, si + FLY, 1];
    poses = si === 0 ? [d, l, STAGE, STAGE] : [d, d, l, STAGE, STAGE];
  } else if (si === 0) {
    times = [0, ARC, FLY, sn, sn + ARC, sn + FLY, 1];
    poses = [d, l, STAGE, STAGE, l, d, d];
  } else {
    times = [0, si, si + ARC, si + FLY, sn, sn + ARC, sn + FLY, 1];
    poses = [d, d, l, STAGE, STAGE, l, d, d];
  }
  return {
    times,
    x: poses.map((p) => p.x),
    y: poses.map((p) => p.y),
    z: poses.map((p) => p.z),
    rx: poses.map((p) => p.rx),
    rz: poses.map((p) => p.rz),
    s: poses.map((p) => p.s),
  };
}

/** Count-up điểm AI khi thẻ được rút ra sân khấu. */
function AiScoreChip({ score, active }: { score: number; active: boolean }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const controls = animate(0, score, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [active, score]);
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-v2blue-900/80 px-2.5 py-1 backdrop-blur">
      <Sparkles className="h-3 w-3 text-v2blue-300" />
      <span className="font-mono text-[.6875rem] font-bold tabular-nums text-white">
        Điểm AI {value}/100
      </span>
    </span>
  );
}

/** Thẻ dịch vụ trong deck 3D — mọi transform là keyframe theo tiến độ cuộn (scrub 2 chiều). */
function DeckCard({
  item,
  index,
  t,
  dx,
  active,
  inView,
}: {
  item: DeckService;
  index: number;
  t: MotionValue<number>;
  dx: number;
  active: boolean;
  inView: boolean;
}) {
  const f = buildFrames(index, dx);
  const x = useTransform(t, f.times, f.x);
  const y = useTransform(t, f.times, f.y);
  const z = useTransform(t, f.times, f.z);
  const rotateX = useTransform(t, f.times, f.rx);
  const rotateZ = useTransform(t, f.times, f.rz);
  const scale = useTransform(t, f.times, f.s);
  // ảnh chỉ hiện khi thẻ ở/gần sân khấu
  const si = index * SEG;
  const sn = (index + 1) * SEG;
  // ảnh luôn hiện mờ ở deck (0.45) để nhận diện dịch vụ, rõ 100% khi được rút ra
  const imgOpacity = useTransform(
    t,
    index === N - 1
      ? [Math.max(0, si), si + FLY, 1]
      : [Math.max(0, si), si + FLY, sn, Math.min(1, sn + FLY)],
    index === N - 1 ? [0.3, 1, 1] : [0.3, 1, 1, 0.3]
  );
  const Icon = ICONS[item.icon];

  return (
    <motion.div
      style={{
        x,
        y,
        z,
        rotateX,
        rotateZ,
        scale,
        width: CW,
        height: CH,
        marginLeft: -CW / 2,
        marginTop: -CH / 2,
      }}
      className={`absolute left-[62%] top-1/2 overflow-hidden rounded-2xl border shadow-v2-xl ${
        inView ? "will-change-transform" : ""
      } ${
        item.isAI
          ? "border-v2blue-300 shadow-[0_16px_40px_rgba(13,47,94,.14),0_0_24px_rgba(87,163,255,.35)]"
          : "border-white/20"
      }`}
    >
      <div className="relative h-full w-full bg-v2blue-800">
        {/* Vùng ảnh 16:9 riêng phía trên — ảnh hiển thị TRỌN VẸN, không bị bar đè hay cắt */}
        <div className="absolute inset-x-0 top-0 overflow-hidden" style={{ height: CH - BAR }}>
          <motion.img
            src={item.image}
            alt=""
            style={{ opacity: imgOpacity }}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg,rgba(13,47,94,.12) 0%,transparent 30%)" }}
          />
        </div>
        {/* Thanh label nằm DƯỚI vùng ảnh: glass CHỈ khi featured, deck dùng nền đặc */}
        <div
          className={`absolute inset-x-0 bottom-0 flex items-center justify-between px-4 ${
            active ? "bg-white/10 backdrop-blur-md" : "bg-v2blue-900/90"
          }`}
          style={{ height: BAR }}
        >
          <span className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-[9px] bg-white/15 text-white">
              <Icon className="h-4 w-4" />
            </span>
            <span className="text-[.9375rem] font-bold text-white">{item.label}</span>
          </span>
          <span className="font-mono text-xs font-bold text-v2blue-200">
            {String(index + 1).padStart(2, "0")}/{String(N).padStart(2, "0")}
          </span>
        </div>
        {item.isAI && item.aiScore !== undefined && (
          <div className="absolute left-3 top-3">
            <AiScoreChip score={item.aiScore} active={active} />
          </div>
        )}
      </div>
    </motion.div>
  );
}

/** Panel text bên phải — crossfade + translateY nhẹ, sync đúng segment thẻ đang featured. */
function TextPanel({ item, index, t }: { item: DeckService; index: number; t: MotionValue<number> }) {
  const si = index * SEG;
  const sn = (index + 1) * SEG;
  const opacity = useTransform(
    t,
    index === N - 1
      ? [si + FLY * 0.5, si + FLY, 1]
      : [si + FLY * 0.5, si + FLY, sn, sn + FLY * 0.5],
    index === N - 1 ? [0, 1, 1] : [0, 1, 1, 0]
  );
  const y = useTransform(t, [si + FLY * 0.5, si + FLY], [16, 0]);

  return (
    <motion.div style={{ opacity, y }} className="col-start-1 row-start-1 grid content-center gap-3.5">
      <span className="text-xs font-bold uppercase tracking-[.12em] text-v2blue-300">
        Dịch vụ {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="m-0 font-v2display text-[1.5rem] font-semibold leading-[1.22] text-white sm:text-[1.75rem]">
        {item.title}
      </h3>
      <p className="m-0 text-[.9375rem] leading-[1.65] text-slate-200">{item.desc}</p>
      <a
        href={item.ctaHref}
        className="mt-1 inline-flex h-12 w-fit items-center gap-2 rounded-md bg-v2blue-600 px-5 text-sm font-semibold text-white shadow-v2-md transition hover:-translate-y-0.5 hover:bg-v2blue-500"
      >
        {item.ctaLabel} <ArrowRight className="h-4 w-4" />
      </a>
    </motion.div>
  );
}

/* ---------- Mobile: coverflow carousel vuốt ngang ---------- */

/** Bề ngang một thẻ tính theo viewport — dùng chung cho card và tính snap. */
const M_CARD_VW = 74;

/**
 * Thẻ dịch vụ trên mobile. Biến đổi được lái bằng vị trí cuộn NGANG của
 * carousel chứ không phải cuộn dọc trang: thẻ ở giữa dựng thẳng và sáng rõ,
 * thẻ hai bên nghiêng theo trục Y + lùi lại + mờ đi → cảm giác coverflow 3D,
 * tương đương độ mạnh thị giác của deck 3D bên desktop nhưng hợp thao tác vuốt.
 * Bậc "safe": biên độ nhân 0.25, chỉ còn thu nhỏ/mờ nhẹ, bỏ nghiêng 3D.
 */
function MobileCard({
  item,
  index,
  progress,
  count,
}: {
  item: DeckService;
  index: number;
  progress: MotionValue<number>;
  count: number;
}) {
  const safe = useSafeFactor();
  const Icon = ICONS[item.icon];

  // Vị trí cuộn ngang (0..1) mà tại đó thẻ này nằm chính giữa khung
  const at = count > 1 ? index / (count - 1) : 0;
  const stepSize = count > 1 ? 1 / (count - 1) : 1;

  // Lệch có dấu → nghiêng trái/phải; lệch tuyệt đối → thu nhỏ và mờ
  const signed = useTransform(progress, (v) => (v - at) / stepSize);
  const dist = useTransform(signed, (v) => Math.min(Math.abs(v), 1));

  const rotateY = useTransform(signed, (v) => v * 20 * safe);
  const scale = useTransform(dist, [0, 1], [1, 1 - 0.14 * safe]);
  const opacity = useTransform(dist, [0, 1], [1, 1 - 0.45 * safe]);
  const z = useTransform(dist, [0, 1], [0, -60 * safe]);

  return (
    <article
      className="snap-center [transform-style:preserve-3d]"
      style={{ flex: `0 0 ${M_CARD_VW}vw`, maxWidth: 300 }}
    >
      <motion.div
        style={{ rotateY, scale, opacity, z }}
        className="overflow-hidden rounded-2xl border border-white/15 bg-v2blue-900 shadow-v2-xl will-change-transform"
      >
        {/* Ảnh 4:3 thay vì 16:9 — thẻ thấp hơn, không còn chiếm trọn màn hình */}
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.image}
            alt=""
            loading="lazy"
            className="aspect-[4/3] w-full object-cover"
          />
          <span className="absolute right-2.5 top-2.5 rounded-full bg-v2blue-900/80 px-2 py-1 font-mono text-[.6875rem] font-bold text-v2blue-100 backdrop-blur">
            {String(index + 1).padStart(2, "0")}/{String(count).padStart(2, "0")}
          </span>
          {item.isAI && item.aiScore !== undefined && (
            <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-full bg-v2blue-600/90 px-2.5 py-1 text-[.6875rem] font-bold text-white backdrop-blur">
              <Sparkles className="h-3 w-3" /> Điểm AI {item.aiScore}
            </span>
          )}
        </div>

        <div className="grid gap-2 p-4">
          <span className="flex items-center gap-2">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-[8px] bg-white/15 text-white">
              <Icon className="h-[15px] w-[15px]" />
            </span>
            <span className="text-[.875rem] font-bold text-white">{item.label}</span>
          </span>
          <h3 className="m-0 font-v2display text-[1.0625rem] font-semibold leading-[1.3] text-white">
            {item.title}
          </h3>
          {/* Cắt còn 3 dòng: giữ thẻ gọn, chi tiết đầy đủ nằm ở trang dịch vụ */}
          <p className="m-0 line-clamp-3 text-[.8125rem] leading-[1.55] text-slate-300">
            {item.desc}
          </p>
          <a
            href={item.ctaHref}
            className="mt-1 inline-flex h-10 w-fit items-center gap-1.5 rounded-md bg-v2blue-600 px-3.5 text-[.8125rem] font-semibold text-white"
          >
            {item.ctaLabel} <ArrowRight className="h-[15px] w-[15px]" />
          </a>
        </div>
      </motion.div>
    </article>
  );
}

/**
 * Carousel dịch vụ cho mobile — vuốt ngang có snap, hé thẻ kế tiếp để người
 * dùng thấy ngay là còn nội dung bên phải. Thanh tiến độ và số thứ tự đồng bộ
 * với vị trí cuộn. Thay cho stack dọc cũ vì stack khiến mỗi thẻ chiếm nguyên
 * màn hình và phải cuộn rất lâu mới xem hết 5 dịch vụ.
 */
function MobileDeck() {
  const scroller = useRef<HTMLDivElement>(null);
  const count = deckServices.length;
  const [active, setActive] = useState(0);

  // Tiến độ cuộn ngang 0..1 của chính khung carousel
  const { scrollXProgress } = useScroll({ container: scroller });
  const p = useSpring(scrollXProgress, { stiffness: 120, damping: 26, restDelta: 0.001 });
  const barW = useTransform(p, (v) => `${Math.max(12, Math.min(1, Math.max(0, v)) * 100)}%`);

  useMotionValueEvent(p, "change", (v) => {
    const idx = Math.round(Math.min(1, Math.max(0, v)) * (count - 1));
    if (idx !== active) setActive(idx);
  });

  return (
    <section id="spotlight" className="relative overflow-hidden bg-v2blue-900 py-14 text-white">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "linear-gradient(160deg,#0D2F5E 0%,#134384 62%,#1A5BB0 100%)" }}
      />
      <HexTexture size={24} glow={8} className="opacity-50" />

      <div className="relative grid gap-5">
        <div className="grid justify-items-start gap-2.5 px-4 sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-[.12em] text-v2blue-300">
            Dịch vụ nổi bật
          </span>
          <h2 className="m-0 font-v2display text-[1.75rem] font-semibold leading-[1.18]">
            Giải pháp OOH của Toàn Cầu
          </h2>
        </div>

        {/* perspective đặt ở khung ngoài để rotateY của từng thẻ có chiều sâu thật */}
        <div
          ref={scroller}
          className="flex snap-x snap-mandatory gap-3.5 overflow-x-auto overscroll-x-contain px-[13vw] pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ perspective: 1000 }}
        >
          {deckServices.map((s, i) => (
            <MobileCard key={s.label} item={s} index={i} progress={p} count={count} />
          ))}
        </div>

        {/* Tiến độ + nhãn dịch vụ đang xem */}
        <div className="flex items-center gap-3 px-4 sm:px-6">
          <div aria-hidden className="h-1 flex-1 overflow-hidden rounded-full bg-white/15">
            <motion.div style={{ width: barW }} className="h-full rounded-full bg-v2blue-400" />
          </div>
          <span className="font-mono text-xs font-bold tabular-nums text-v2blue-200">
            {String(active + 1).padStart(2, "0")}/{String(count).padStart(2, "0")}
          </span>
        </div>
        <p className="m-0 px-4 text-[.8125rem] text-slate-400 sm:px-6">
          Vuốt ngang để xem tất cả {count} nhóm dịch vụ
        </p>
      </div>
    </section>
  );
}

/**
 * Dịch vụ nổi bật (v4) — 3D deck scrollytelling:
 * pin N×100vh, mỗi segment "rút" một thẻ từ deck exploded isometric (trái)
 * bay theo cung 2 nhịp ra sân khấu (phải), panel text crossfade đồng bộ.
 * Sort chiều sâu bằng translateZ thật trong preserve-3d.
 * Mobile: sticky stack phẳng. Reduced motion: dùng lại tab-switcher cũ (Spotlight).
 */
export function ServicesDeck() {
  const ref = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const mobile = useIsMobile();
  const tier = useMotionTier();
  const inView = useInView(ref, { margin: "20% 0px" });
  const [dx, setDx] = useState(-560);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const t = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 }); // ~ scrub: 1
  const progressW = useTransform(t, (v) => `${Math.max(2, v * 100)}%`);

  useMotionValueEvent(t, "change", (v) => {
    const idx = Math.min(N - 1, Math.max(0, Math.floor((v + FLY * 0.5) / SEG)));
    if (idx !== active) setActive(idx);
  });

  // đo khoảng bay deck ↔ sân khấu theo bề ngang thật (anchor 58% → 17%)
  useEffect(() => {
    if (reduced || mobile) return;
    const measure = () => {
      const w = stageRef.current?.clientWidth ?? 900;
      setDx(-0.45 * w);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (stageRef.current) ro.observe(stageRef.current);
    return () => ro.disconnect();
  }, [reduced, mobile]);

  /* Desktop + giảm chuyển động: tab-switcher cũ — không pin, không scrub */
  if (tier === "safe" && !mobile) return <Spotlight />;

  /* Mobile: card stack chiều sâu, không pin.
     Dùng cho cả khi bật giảm chuyển động — biên độ đã được useSafeFactor hạ
     xuống 1/4 bên trong MobileCard, nên vẫn an toàn mà không mất hẳn hiệu ứng. */
  if (mobile) return <MobileDeck />;

  /* Desktop: pin N×100vh */
  return (
    <section id="spotlight" aria-label="Dịch vụ nổi bật — 3D deck">
      <div ref={ref} className="relative" style={{ height: `${N * 100}vh` }}>
        <div className="sticky top-0 flex h-dvh flex-col justify-center overflow-hidden bg-v2blue-900 text-white">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: "linear-gradient(160deg,#0D2F5E 0%,#134384 62%,#1A5BB0 100%)" }}
          />
          <HexTexture size={28} glow={11} className="opacity-55" />
          <StarField count={7} />
          <div
            aria-hidden
            className="pointer-events-none absolute right-[6%] top-[12%] h-[440px] w-[440px] rounded-full"
            style={{ background: "radial-gradient(circle,rgba(87,163,255,.22),transparent 68%)" }}
          />

          {/* Header + tiến độ */}
          <div className="relative z-[2] mx-auto flex w-full max-w-[1280px] flex-wrap items-end justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <div className="grid justify-items-start gap-2.5">
              <span className="text-xs font-semibold uppercase tracking-[.12em] text-v2blue-300">
                Dịch vụ nổi bật
              </span>
              <h2 className="m-0 font-v2display text-[1.875rem] font-semibold leading-[1.18] sm:text-4xl">
                Giải pháp OOH của Toàn Cầu
              </h2>
            </div>
          </div>

          {/* Sân khấu: grid 2 cột thật — cột 3D và cột text có chỗ riêng, không bao giờ đè nhau */}
          <div
            className="relative z-[1] mx-auto mt-6 grid w-full max-w-[1280px] flex-none grid-cols-[1fr_300px] gap-8 px-4 sm:px-6 lg:px-8 xl:grid-cols-[1fr_320px]"
            style={{ height: CH + 170 }}
          >
            <div ref={stageRef} className="relative h-full" style={{ perspective: 1100 }}>
              {/* Bóng sàn dưới deck — neo khối 3D xuống mặt phẳng */}
              <div
                aria-hidden
                className="absolute left-[2%] top-[64%] h-[120px] w-[440px] rounded-full opacity-60"
                style={{ background: "radial-gradient(ellipse at center,rgba(6,10,19,.55),transparent 70%)", filter: "blur(18px)" }}
              />
              <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
                {deckServices.map((s, i) => (
                  <DeckCard key={s.label} item={s} index={i} t={t} dx={dx} active={active === i} inView={inView} />
                ))}
              </div>
            </div>
            {/* Cột text — trong luồng grid, tự có bề rộng riêng */}
            <div className="grid content-center">
              {deckServices.map((s, i) => (
                <TextPanel key={s.label} item={s} index={i} t={t} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
