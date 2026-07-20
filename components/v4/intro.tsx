"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Building2 } from "lucide-react";

import { Reveal } from "@/components/landing/reveal";
import { Mark } from "@/components/v3/decor";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useMotionTier, useSafeFactor } from "@/hooks/useMotionTier";

/** Số liệu thật của doanh nghiệp (hệ thống v1) — mono, làm bằng chứng. */
const FACTS = [
  { value: "20+", label: "năm kinh nghiệm" },
  { value: "~730", label: "vị trí OOH" },
  { value: "89.000", label: "m² khai thác" },
  { value: "400+", label: "nhãn hàng" },
];

/** Phần chữ giới thiệu — dùng chung cho bản pin (trong thẻ trắng) và bản tĩnh. */
function IntroCopy() {
  return (
    <div className="grid justify-items-start gap-3.5 sm:gap-5">
      <span className="inline-flex items-center gap-2 rounded-full bg-v2blue-50 px-3 py-1 text-[.6875rem] font-bold uppercase tracking-[.1em] text-v2blue-700 sm:px-3.5 sm:py-1.5 sm:text-xs">
        Về Toàn Cầu ADV
      </span>
      <h2 className="m-0 font-v2display text-[1.375rem] font-semibold leading-[1.28] text-v2blue-900 sm:text-[clamp(1.75rem,2.6vw,2.25rem)] sm:leading-[1.2]">
        20 năm đưa thương hiệu Việt ra đường phố
      </h2>
      <p className="m-0 max-w-[560px] text-[.875rem] leading-[1.6] text-slate-600 sm:text-[1rem] sm:leading-[1.7]">
        Khởi đầu từ tổ chức sự kiện năm 2003, Toàn Cầu ADV phát triển thành mạng lưới quảng cáo
        ngoài trời phủ 30+ tỉnh thành — từ billboard cửa ngõ, sân bay, màn hình LED đến nhà chờ
        xe bus.
      </p>
      <p className="m-0 max-w-[560px] text-[.875rem] leading-[1.6] text-slate-600 sm:text-[1rem] sm:leading-[1.7]">
        Hệ thống đang được số hóa toàn diện: bản đồ vị trí minh bạch, điểm AI theo ngành hàng và
        báo giá PDF trong vài phút — để mỗi quyết định OOH đều dựa trên dữ liệu.
      </p>
      <div className="mt-0.5 grid w-full grid-cols-2 gap-2 sm:mt-1 sm:flex sm:w-auto sm:flex-wrap sm:gap-2.5">
        {FACTS.map((f) => (
          <div
            key={f.label}
            className="flex items-baseline gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-v2-sm sm:px-4 sm:py-2"
          >
            <strong className="font-mono text-[.9375rem] tabular-nums text-v2blue-900 sm:text-[1.125rem]">{f.value}</strong>
            <span className="text-[.6875rem] font-semibold leading-tight text-slate-500 sm:text-xs">{f.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Khối ảnh thật + thẻ nổi văn phòng — dùng chung hai bản. */
function IntroImage() {
  return (
    <div className="relative">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-v2-xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/v4-assets/biloadboard_tower.png"
          alt="Biển quảng cáo tấm lớn của Toàn Cầu ADV trên mặt tòa nhà trung tâm"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg,transparent 60%,rgba(13,47,94,.35))" }}
        />
      </div>
      <div className="absolute -bottom-4 -left-3.5 flex items-center gap-2.5 rounded-md border border-slate-200 bg-white px-4 py-2.5 shadow-v2-lg">
        <span className="grid h-8 w-8 place-items-center rounded-[9px] bg-v2blue-50 text-v2blue-600">
          <Building2 className="h-[17px] w-[17px]" />
        </span>
        <span className="grid leading-tight">
          <strong className="text-[.8125rem] text-v2blue-900">5 văn phòng toàn quốc</strong>
          <span className="text-[.6875rem] text-slate-500">
            Hà Nội · TP.HCM · Đà Nẵng · Cần Thơ · Nghệ An
          </span>
        </span>
      </div>
    </div>
  );
}

/**
 * Giới thiệu (v4) — Lớp 02 Parallax Lab "Depth zoom":
 * pin 200vh; ảnh billboard zoom 0.72→1.02 (camera đẩy vào), chữ nền khổng lồ
 * scale ngược chiều 1→1.6 + mờ dần (tách tầng chiều sâu), thẻ nội dung trắng
 * trượt vào khi zoom gần xong.
 * Mobile: KHÔNG pin (2 cột xếp dọc sẽ tràn khung) nhưng vẫn giữ parallax
 * scroll-linked — chữ nền trôi ngang, ảnh zoom vào, thẻ nội dung trượt lên.
 * Reduced-motion: bản tĩnh 2 cột.
 */
export function IntroV4() {
  const ref = useRef<HTMLDivElement>(null);
  const mobile = useIsMobile();
  const tier = useMotionTier();
  const safe = useSafeFactor();

  // Mobile không pin → đo tiến độ theo cả quãng section đi qua viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: mobile ? ["start end", "end start"] : ["start start", "end end"],
  });
  const t = useSpring(scrollYProgress, { stiffness: 160, damping: 30, restDelta: 0.001 });

  const bgScale = useTransform(t, [0.02, 0.9], [1, 1.6]);
  const bgOpacity = useTransform(t, [0.02, 0.75], [0.5, 0.06]);
  const imgScale = useTransform(t, [0.02, 0.8], [0.72, 1.02]);
  const cardOpacity = useTransform(t, [0.38, 0.58], [0, 1]);
  const cardX = useTransform(t, [0.38, 0.58], [-36, 0]);

  /* Biên độ riêng cho bản mobile không pin — nhân useSafeFactor để khi người
     dùng bật giảm chuyển động thì hạ còn 1/4 thay vì mất hẳn hiệu ứng. */
  const mBgX = useTransform(t, [0, 1], [70 * safe, -70 * safe]);
  const mBgOpacity = useTransform(t, [0, 0.35, 0.75, 1], [0, 1, 1, 0]);
  const mCardY = useTransform(t, [0.04, 0.28], [44 * safe, 0]);
  const mCardOpacity = useTransform(t, [0.04, 0.24], [0, 1]);
  const mImgScale = useTransform(t, [0.15, 0.5], [1 - 0.1 * safe, 1]);
  const mImgY = useTransform(t, [0, 1], [36 * safe, -24 * safe]);

  /* Desktop + giảm chuyển động: bản tĩnh 2 cột (bỏ hẳn depth zoom vì đây là
     chuyển động tiền đình biên độ lớn). Mobile vẫn đi nhánh dưới với biên độ hạ. */
  if (tier === "safe" && !mobile) {
    return (
      <section
        id="gioi-thieu"
        className="relative overflow-hidden py-20 lg:py-24"
        style={{ background: "linear-gradient(180deg,#FFFFFF 0%,#EBF4FF 100%)" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -left-28 top-10 h-[360px] w-[360px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(54,143,255,.1),transparent 70%)" }}
        />
        <div className="relative mx-auto grid max-w-[1280px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:gap-14 lg:px-8">
          <Reveal>
            <IntroCopy />
          </Reveal>
          <Reveal y={0}>
            <IntroImage />
          </Reveal>
        </div>
      </section>
    );
  }

  /* Mobile: parallax không pin — chữ nền trôi, thẻ trượt lên, ảnh zoom vào */
  if (mobile) {
    return (
      <section
        ref={ref}
        id="gioi-thieu"
        className="relative overflow-hidden py-14"
        style={{ background: "linear-gradient(180deg,#FFFFFF 0%,#EBF4FF 100%)" }}
      >
        {/* Tầng xa: chữ khổng lồ trôi ngang ngược hướng cuộn */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-8 flex justify-center overflow-hidden"
        >
          <motion.span
            style={{ x: mBgX, opacity: mBgOpacity }}
            className="whitespace-nowrap font-v2sans text-[26vw] font-extrabold uppercase tracking-tight text-v2blue-900/10 will-change-transform"
          >
            Toàn Cầu ADV
          </motion.span>
        </div>

        <div className="relative mx-auto grid max-w-[560px] gap-7 px-4 sm:px-6">
          <motion.div
            style={{ y: mCardY, opacity: mCardOpacity }}
            className="relative z-[2] rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-v2-xl backdrop-blur will-change-transform"
          >
            <IntroCopy />
          </motion.div>
          {/* Tầng gần: ảnh zoom vào + trôi nhẹ ngược hướng cuộn */}
          <motion.div style={{ scale: mImgScale, y: mImgY }} className="relative z-[1] will-change-transform">
            <IntroImage />
          </motion.div>
        </div>
      </section>
    );
  }

  /* Desktop: depth zoom pin 200vh */
  return (
    <section id="gioi-thieu" aria-label="Giới thiệu Toàn Cầu ADV">
      <div ref={ref} className="relative h-[165vh]">
        <div
          className="sticky top-0 flex h-dvh items-center overflow-hidden"
          style={{ background: "linear-gradient(180deg,#FFFFFF 0%,#EBF4FF 100%)" }}
        >
          {/* Tầng xa: chữ khổng lồ scale ngược chiều + mờ dần (depth cue) */}
          <div aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center">
            <motion.span
              style={{ scale: bgScale, opacity: bgOpacity }}
              className="whitespace-nowrap font-v2sans text-[15vw] font-extrabold uppercase tracking-tight text-v2blue-900/10 will-change-transform"
            >
              Toàn Cầu ADV
            </motion.span>
          </div>

          <div className="relative mx-auto grid w-full max-w-[1280px] items-center gap-10 px-4 sm:px-6 lg:grid-cols-[.95fr_1.05fr] lg:px-8">
            {/* Thẻ nội dung trắng — trượt vào khi camera zoom gần xong */}
            <motion.div
              style={{ opacity: cardOpacity, x: cardX }}
              className="relative z-[2] rounded-2xl border border-slate-200 bg-white/95 p-7 shadow-v2-xl backdrop-blur will-change-transform lg:p-8"
            >
              <IntroCopy />
            </motion.div>

            {/* Tầng gần: ảnh billboard — camera đẩy vào */}
            <motion.div style={{ scale: imgScale }} className="relative z-[1] will-change-transform">
              <IntroImage />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
