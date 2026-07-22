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
  Plane,
  RectangleHorizontal,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { HexTexture, StarField } from "@/components/v3/decor";
import { Spotlight } from "@/components/v3/spotlight";
import { PinCue } from "@/components/v4/pin-cue";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useMotionTier, useSafeFactor } from "@/hooks/useMotionTier";
import { useSnapCarousel } from "@/hooks/useSnapCarousel";
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
const FLY = 0.45 * SEG; // thời lượng chuyển cảnh trong 1 segment

/* Kích thước thẻ (px) — khổ ngang 16:9 (560×315) + thanh label 56px nằm DƯỚI ảnh.
   Chỉ một thẻ chiếm sân khấu tại một thời điểm nên thẻ được phóng to hơn deck cũ. */
const CW = 560;
const BAR = 56;
const CH = 315 + BAR;

type Pose = { y: number; op: number; s: number; rx: number };

/* 4 trạng thái của một thẻ trong hiệu ứng handoff parallax */
const HID: Pose = { y: 120, op: 0, s: 0.9, rx: 9 }; // ẩn dưới sân khấu
const PEEK: Pose = { y: 56, op: 0.38, s: 0.93, rx: 7 }; // ló mép dưới, chờ tới lượt
const ON: Pose = { y: 0, op: 1, s: 1, rx: 0 }; // đang chiếm sân khấu
const OFFM: Pose = { y: -92, op: 1, s: 0.97, rx: -6 }; // đang trượt lên — vẫn ĐẶC, che thẻ sau
const OFF: Pose = { y: -150, op: 0, s: 0.95, rx: -9 }; // đã nhường chỗ, fade nhanh đoạn cuối

/**
 * Keyframes cho thẻ i — hiệu ứng "handoff parallax" thay cho deck bay 3D cũ
 * (deck cũ các thẻ xếp chồng lệch góc nên dễ đè lên nhau ở bề ngang hẹp):
 * ẩn → PEEK trong segment trước → trượt lên sân khấu → giữ → trượt lên trên
 * khi thẻ sau vào. Thẻ vào/ra ở tầng tốc độ khác nhau + ảnh bên trong trôi
 * ngược chiều → vẫn là parallax nhiều tầng nhưng không bao giờ chồng chéo
 * (thẻ active luôn nằm trên cùng nhờ zIndex theo segment).
 */
function buildFrames(i: number) {
  const si = i * SEG;
  const sn = (i + 1) * SEG;
  const sp = (i - 1) * SEG;
  // Handoff TUẦN TỰ: thẻ cũ trượt lên vẫn đặc (che thẻ sau) tới 30% FLY rồi
  // fade nhanh, xong hẳn ở 45% FLY; thẻ mới rời PEEK từ 50% FLY → không tồn
  // tại thời điểm nào hai thẻ cùng mờ đè lên nhau.
  const IN0 = si + FLY * 0.5;
  const IN1 = si + FLY;
  const OUTM = sn + FLY * 0.3;
  const OUT1 = sn + FLY * 0.45;

  let times: number[];
  let poses: Pose[];
  if (i === 0) {
    times = N === 1 ? [0, 1] : [0, sn, OUTM, OUT1, 1];
    poses = N === 1 ? [ON, ON] : [ON, ON, OFFM, OFF, OFF];
  } else if (i === N - 1) {
    times = sp === 0 ? [0, FLY, IN0, IN1, 1] : [0, sp, sp + FLY, IN0, IN1, 1];
    poses = sp === 0 ? [HID, PEEK, PEEK, ON, ON] : [HID, HID, PEEK, PEEK, ON, ON];
  } else if (sp === 0) {
    times = [0, FLY, IN0, IN1, sn, OUTM, OUT1, 1];
    poses = [HID, PEEK, PEEK, ON, ON, OFFM, OFF, OFF];
  } else {
    times = [0, sp, sp + FLY, IN0, IN1, sn, OUTM, OUT1, 1];
    poses = [HID, HID, PEEK, PEEK, ON, ON, OFFM, OFF, OFF];
  }
  return {
    times,
    y: poses.map((p) => p.y),
    op: poses.map((p) => p.op),
    s: poses.map((p) => p.s),
    rx: poses.map((p) => p.rx),
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

/** Thẻ dịch vụ trên sân khấu — handoff parallax, thẻ active luôn nằm trên cùng. */
function DeckCard({
  item,
  index,
  t,
  active,
  inView,
}: {
  item: DeckService;
  index: number;
  t: MotionValue<number>;
  active: boolean;
  inView: boolean;
}) {
  const f = buildFrames(index);
  const y = useTransform(t, f.times, f.y);
  const opacity = useTransform(t, f.times, f.op);
  const scale = useTransform(t, f.times, f.s);
  const rotateX = useTransform(t, f.times, f.rx);
  const si = index * SEG;
  const sn = (index + 1) * SEG;
  // Tầng xếp chồng: active = 30; RIÊNG pha trượt ra giữ 40 (trên cả thẻ mới
  // vừa thành active) — nếu tụt sớm, thẻ PEEK mờ sẽ đè lên thẻ đặc đang thoát.
  const zIndex = useTransform(t, (v) =>
    v >= sn && v < sn + FLY * 0.45 ? 40 : v >= si - 0.0001 && v < sn ? 30 : 10
  );
  // ảnh bên trong trôi ngược hướng thẻ → tầng tốc độ thứ hai (parallax nội thẻ)
  const imgY = useTransform(t, [Math.max(0, si - SEG), Math.min(1, sn + FLY)], ["6%", "-6%"]);
  const Icon = ICONS[item.icon];

  return (
    <motion.div
      style={{
        y,
        opacity,
        scale,
        rotateX,
        zIndex,
        width: CW,
        height: CH,
        marginLeft: -CW / 2,
        marginTop: -CH / 2,
      }}
      className={`absolute left-1/2 top-1/2 overflow-hidden rounded-2xl border shadow-v2-xl ${
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
            style={{ y: imgY }}
            className="absolute inset-x-0 top-[-6%] h-[112%] w-full object-cover"
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
      <span className="text-[.8125rem] font-bold uppercase tracking-[.12em] text-v2blue-300">
        Dịch vụ {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="m-0 font-v2display text-[1.875rem] font-semibold leading-[1.2] text-white xl:text-[2.125rem]">
        {item.title}
      </h3>
      <p className="m-0 text-[1.0625rem] leading-[1.7] text-slate-200">{item.desc}</p>
      <a
        href={item.ctaHref}
        className="mt-1 inline-flex h-[52px] w-fit items-center gap-2 rounded-md bg-v2blue-600 px-6 text-[.9375rem] font-semibold text-white shadow-v2-md transition hover:-translate-y-0.5 hover:bg-v2blue-500"
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
  const count = deckServices.length;
  const { scroller, progress: p, active, barWidth: barW } = useSnapCarousel(count, 12);

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
  const reduced = useReducedMotion() ?? false;
  const mobile = useIsMobile();
  const tier = useMotionTier();
  const inView = useInView(ref, { margin: "20% 0px" });
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // scrub chậm & mượt hơn: stiffness thấp → thẻ "trôi" theo cuộn thay vì giật tới đích
  const t = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });
  useMotionValueEvent(t, "change", (v) => {
    const idx = Math.min(N - 1, Math.max(0, Math.floor((v + FLY * 0.5) / SEG)));
    if (idx !== active) setActive(idx);
  });

  /* Desktop + giảm chuyển động: tab-switcher cũ — không pin, không scrub */
  if (tier === "safe" && !mobile) return <Spotlight />;

  /* Mobile: card stack chiều sâu, không pin.
     Dùng cho cả khi bật giảm chuyển động — biên độ đã được useSafeFactor hạ
     xuống 1/4 bên trong MobileCard, nên vẫn an toàn mà không mất hẳn hiệu ứng. */
  if (mobile) return <MobileDeck />;

  /* Desktop: pin N×100vh */
  return (
    <section id="spotlight" aria-label="Dịch vụ nổi bật — 3D deck">
      <div ref={ref} className="relative" style={{ height: `${N * 108}vh` }}>
        <div className="sticky top-[76px] mx-3 flex h-[calc(100dvh-148px)] flex-col justify-center overflow-hidden rounded-[22px] bg-v2blue-900 text-white shadow-v2-xl sm:mx-5 lg:mx-8">
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
            className="relative z-[1] mx-auto mt-5 grid w-full max-w-[1280px] flex-none grid-cols-[1fr_340px] gap-8 px-4 sm:px-6 lg:px-8 xl:grid-cols-[1fr_380px]"
            style={{ height: CH + 130 }}
          >
            <div className="relative h-full" style={{ perspective: 1100 }}>
              {deckServices.map((s, i) => (
                <DeckCard key={s.label} item={s} index={i} t={t} active={active === i} inView={inView} />
              ))}
            </div>
            {/* Cột text — trong luồng grid, tự có bề rộng riêng */}
            <div className="grid content-center">
              {deckServices.map((s, i) => (
                <TextPanel key={s.label} item={s} index={i} t={t} />
              ))}
            </div>
          </div>

          {/* Deck pin qua nhiều màn — chỉ báo cho biết còn thẻ phía sau */}
          <PinCue progress={t} current={active + 1} total={N} />
        </div>
      </div>
    </section>
  );
}
