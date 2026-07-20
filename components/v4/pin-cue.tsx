"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { ChevronDown } from "lucide-react";

/**
 * Chỉ báo "section này còn tiếp" cho các khối bị PIN (dính màn hình).
 *
 * Vì sao cần: khi một section pin lại, người dùng cuộn nhưng khung nhìn không
 * nhúc nhích — trang trông như đã dừng hẳn, nhiều người tưởng hết nội dung và
 * thoát ra. Thanh tiến độ + số bước cho biết đang ở đâu trong chuỗi, mũi tên
 * nhắc rằng cuộn tiếp vẫn còn.
 *
 * Tự mờ đi khi sắp hết section (progress > ~0.9) để không che phần kết.
 */
export function PinCue({
  progress,
  current,
  total,
  tone = "dark",
}: {
  /** Tiến độ 0..1 của chính section pin. */
  progress: MotionValue<number>;
  current: number;
  total: number;
  /** "dark" cho nền navy, "light" cho nền sáng. */
  tone?: "dark" | "light";
}) {
  const opacity = useTransform(progress, [0, 0.04, 0.88, 1], [0, 1, 1, 0]);
  const barWidth = useTransform(
    progress,
    (v) => `${Math.max(6, Math.min(1, Math.max(0, v)) * 100)}%`,
  );

  const dark = tone === "dark";

  return (
    <motion.div
      aria-hidden
      style={{ opacity }}
      className="pointer-events-none absolute inset-x-0 bottom-4 z-[3] mx-auto flex w-full max-w-[1280px] items-center gap-3 px-4 sm:bottom-6 sm:px-6 lg:px-8"
    >
      <div
        className={`h-[3px] flex-1 overflow-hidden rounded-full ${
          dark ? "bg-white/20" : "bg-v2blue-900/15"
        }`}
      >
        <motion.div
          style={{ width: barWidth }}
          className={`h-full rounded-full ${dark ? "bg-v2blue-300" : "bg-v2blue-500"}`}
        />
      </div>
      <span
        className={`font-mono text-[.6875rem] font-bold tabular-nums ${
          dark ? "text-v2blue-200" : "text-v2blue-700"
        }`}
      >
        {String(current).padStart(2, "0")}/{String(total).padStart(2, "0")}
      </span>
      <ChevronDown
        className={`h-4 w-4 motion-safe:animate-scroll-hint ${
          dark ? "text-v2blue-200" : "text-v2blue-600"
        }`}
      />
    </motion.div>
  );
}
