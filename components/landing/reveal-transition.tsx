"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { useParallaxFactor } from "@/hooks/useParallaxFactor";

/**
 * Kỹ thuật LỚP 09 (scale reveal) làm cầu chuyển cảnh:
 * đĩa gradient xanh brand phóng to nuốt trọn màn hình,
 * giới thiệu bộ thẻ dịch vụ ngay trên nền xanh đó.
 */
export function RevealTransition() {
  const ref = useRef<HTMLDivElement>(null);
  const factor = useParallaxFactor();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const circleScale = useTransform(
    scrollYProgress,
    [0.05, 0.55],
    [factor === 0 ? 22 : 0.15, 22]
  );
  const contentOpacity = useTransform(scrollYProgress, [0.5, 0.7], [factor === 0 ? 1 : 0, 1]);
  const contentY = useTransform(scrollYProgress, [0.5, 0.7], [36 * factor, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  return (
    <section aria-label="Chuyển cảnh sang dịch vụ">
      <div ref={ref} className="relative h-[240vh] bg-white">
        <div className="sticky top-0 flex h-dvh items-center justify-center overflow-hidden">
          <motion.p
            className="absolute px-6 text-center text-sm text-slate-500"
            style={{ opacity: hintOpacity }}
          >
            Cuộn tiếp để mở bộ thẻ dịch vụ…
          </motion.p>

          {/* Đĩa gradient brand phóng to phủ màn hình */}
          <motion.div
            className="h-40 w-40 rounded-full bg-gradient-to-br from-brand-500 via-brand-700 to-brand-900 will-change-transform"
            style={{ scale: circleScale }}
            aria-hidden="true"
          />

          {/* Nội dung trên nền xanh */}
          <motion.div
            className="absolute z-10 px-6 text-center will-change-transform"
            style={{ opacity: contentOpacity, y: contentY }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-brand-200">
              Dịch vụ nổi bật
            </p>
            <h2 className="mt-3 text-4xl font-bold text-white sm:text-6xl">
              Giải pháp OOH của Toàn Cầu
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm font-medium text-brand-100">
              Màn hình LED · Billboard · Sân bay — mỗi loại hình một thế mạnh riêng.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
