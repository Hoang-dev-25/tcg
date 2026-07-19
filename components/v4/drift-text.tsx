"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { useIsMobile } from "@/hooks/useMediaQuery";
import { useParallaxFactor } from "@/hooks/useParallaxFactor";

/**
 * Dải tuyên ngôn thương hiệu (v4) — Lớp 03 Parallax Lab: ba dòng chữ khổ lớn
 * trôi ngang ngược hướng nhau theo cuộn; dòng giữa outline (text-stroke) tách tầng.
 * Khúc chuyển "trôi" giữa AI Showcase (pin, navy) và Hành trình (pin, sáng).
 * Mobile: cỡ chữ theo vw để cả dòng VỪA màn hình + biên độ trôi nhỏ hơn
 * (biên độ lớn sẽ đẩy chữ ra ngoài màn suốt quãng cuộn → nhìn như bị cắt).
 * Reduced motion: factor = 0 → chữ đứng yên, vẫn đọc đủ.
 */
export function DriftText() {
  const ref = useRef<HTMLElement>(null);
  const factor = useParallaxFactor();
  const mobile = useIsMobile();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Biên độ px: mobile ~1/3 desktop để dòng chữ luôn đọc được quanh tâm viewport
  const [a1, a2, a3] = mobile ? [56, 84, 68] : [170, 260, 210];
  const x1 = useTransform(scrollYProgress, [0, 1], [a1 * factor, -a1 * factor]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-a2 * factor, a2 * factor]);
  const x3 = useTransform(scrollYProgress, [0, 1], [a3 * factor, -a3 * factor]);

  return (
    <section
      ref={ref}
      aria-label="Tuyên ngôn Toàn Cầu ADV"
      className="relative overflow-hidden bg-white py-16 sm:py-28"
    >
      <div className="grid gap-2 font-v2sans font-extrabold uppercase leading-[1.02] tracking-tight sm:gap-3">
        <motion.p
          style={{ x: x1 }}
          className="m-0 whitespace-nowrap text-center text-[clamp(1.125rem,4.9vw,3.5rem)] text-v2blue-900 will-change-transform"
        >
          Đúng vị trí · Đúng thời điểm
        </motion.p>
        <motion.p
          style={{ x: x2, WebkitTextStroke: "2px rgba(54,143,255,.55)" }}
          className="m-0 whitespace-nowrap text-center text-[clamp(2rem,9vw,7rem)] text-transparent will-change-transform"
        >
          Toàn Cầu ADV
        </motion.p>
        <motion.p
          style={{ x: x3 }}
          className="m-0 whitespace-nowrap text-center text-[clamp(.9375rem,3.9vw,2.875rem)] text-v2blue-600 will-change-transform"
        >
          Thương hiệu của bạn trên mọi nẻo đường
        </motion.p>
      </div>
    </section>
  );
}
