"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { useParallaxFactor } from "@/hooks/useParallaxFactor";

/**
 * Kỹ thuật LỚP 03 (chữ đối lưu): ba dòng số liệu khổ lớn trượt ngang
 * ngược hướng nhau — dải nhấn trước khi vào form.
 */
export function StatsDrift() {
  const ref = useRef<HTMLElement>(null);
  const factor = useParallaxFactor();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const x1 = useTransform(scrollYProgress, [0, 1], [170 * factor, -170 * factor]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-240 * factor, 240 * factor]);
  const x3 = useTransform(scrollYProgress, [0, 1], [200 * factor, -200 * factor]);

  return (
    <section
      ref={ref}
      className="overflow-hidden bg-white py-24 sm:py-32"
      aria-label="Số liệu nổi bật"
    >
      <div className="space-y-2 font-bold uppercase leading-[1.05] tracking-tight">
        <motion.p
          className="whitespace-nowrap text-center text-4xl text-brand-900 will-change-transform sm:text-7xl"
          style={{ x: x1 }}
        >
          730+ vị trí trên toàn quốc
        </motion.p>
        <motion.p
          className="whitespace-nowrap text-center text-4xl text-transparent will-change-transform sm:text-7xl"
          style={{ x: x2, WebkitTextStroke: "1.5px rgba(35, 116, 217, 0.55)" }}
        >
          400+ nhãn hàng đồng hành
        </motion.p>
        <motion.p
          className="whitespace-nowrap text-center text-4xl text-brick-500 will-change-transform sm:text-7xl"
          style={{ x: x3 }}
        >
          20 năm kinh nghiệm vận hành
        </motion.p>
      </div>
    </section>
  );
}
