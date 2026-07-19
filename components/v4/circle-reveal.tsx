"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Chuyển cảnh Lớp 09 (v4) — hết khối "Dự án tiêu biểu", vòng tròn navy lập tức
 * bung nuốt màn hình rồi nhả THẲNG vào form Liên hệ (đĩa dùng đúng gradient của
 * form nên cảm giác form "bung ra" từ trong vòng tròn). Không màn chữ trung gian.
 * Chỉ transform scale trên GPU. Reduced motion: bỏ hẳn chuyển cảnh.
 */
export function CircleRevealV4() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // bung nhanh: phủ kín màn ở ~55% quãng pin, phần còn lại nhả ngay vào form
  const circleScale = useTransform(scrollYProgress, [0.02, 0.55], [0.15, 20]);

  if (reduced) return null;

  return (
    <section aria-label="Chuyển cảnh sang liên hệ">
      <div ref={ref} className="relative h-[170vh] bg-white">
        <div className="sticky top-0 flex h-dvh items-center justify-center overflow-hidden">
          <motion.div
            aria-hidden
            style={{ scale: circleScale, background: "linear-gradient(160deg,#0D2F5E,#1A5BB0)" }}
            className="h-40 w-40 rounded-full will-change-transform"
          />
        </div>
      </div>
    </section>
  );
}
