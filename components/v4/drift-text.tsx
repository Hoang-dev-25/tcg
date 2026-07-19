"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { useParallaxFactor } from "@/hooks/useParallaxFactor";

/**
 * Dải tuyên ngôn thương hiệu (v4) — Lớp 03 Parallax Lab: ba dòng chữ khổ lớn
 * trôi ngang ngược hướng nhau theo cuộn; dòng giữa outline (text-stroke) tách tầng.
 * Khúc chuyển "trôi" giữa AI Showcase (pin, navy) và Hành trình (pin, sáng).
 * Reduced motion: factor = 0 → chữ đứng yên, vẫn đọc đủ.
 */
export function DriftText() {
  const ref = useRef<HTMLElement>(null);
  const factor = useParallaxFactor();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const x1 = useTransform(scrollYProgress, [0, 1], [170 * factor, -170 * factor]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-260 * factor, 260 * factor]);
  const x3 = useTransform(scrollYProgress, [0, 1], [210 * factor, -210 * factor]);

  return (
    <section
      ref={ref}
      aria-label="Tuyên ngôn Toàn Cầu ADV"
      className="relative overflow-hidden bg-white py-20 sm:py-28"
    >
      <div className="grid gap-3 font-v2sans font-extrabold uppercase leading-[1.02] tracking-tight">
        <motion.p
          style={{ x: x1 }}
          className="m-0 whitespace-nowrap text-center text-[clamp(1.75rem,4.6vw,3.5rem)] text-v2blue-900 will-change-transform"
        >
          Đúng vị trí · Đúng thời điểm
        </motion.p>
        <motion.p
          style={{ x: x2, WebkitTextStroke: "2px rgba(54,143,255,.55)" }}
          className="m-0 whitespace-nowrap text-center text-[clamp(3rem,9vw,7rem)] text-transparent will-change-transform"
        >
          Toàn Cầu ADV
        </motion.p>
        <motion.p
          style={{ x: x3 }}
          className="m-0 whitespace-nowrap text-center text-[clamp(1.5rem,3.8vw,2.875rem)] text-v2blue-600 will-change-transform"
        >
          Thương hiệu của bạn trên mọi nẻo đường
        </motion.p>
      </div>
    </section>
  );
}
