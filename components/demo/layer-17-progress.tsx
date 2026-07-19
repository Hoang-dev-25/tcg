"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

import { LayerLabel } from "@/components/demo/layer-label";

/**
 * LỚP 17 — Tiến độ toàn trang: % đã cuộn của cả trang hiển thị theo thời gian
 * thực (spring-smoothed), hai quầng sáng đổi chỗ bằng opacity ở đoạn cuối.
 */
export function Layer17Progress() {
  const { scrollYProgress } = useScroll();
  const smoothed = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  const percent = useTransform(smoothed, (v) => `${Math.min(100, Math.round(v * 100))}%`);
  const amberOpacity = useTransform(scrollYProgress, [0.78, 0.95], [0.3, 1]);
  const cyanOpacity = useTransform(scrollYProgress, [0.78, 0.95], [1, 0.3]);

  return (
    <section
      id="layer-17"
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-ink-950 py-28"
      aria-label="Lớp 17: tiến độ toàn trang"
    >
      <motion.div
        className="pointer-events-none absolute -left-24 top-1/4 h-[26rem] w-[26rem] rounded-full bg-neon-amber/15 blur-3xl"
        style={{ opacity: amberOpacity }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute -right-24 bottom-1/4 h-[26rem] w-[26rem] rounded-full bg-neon-cyan/15 blur-3xl"
        style={{ opacity: cyanOpacity }}
        aria-hidden="true"
      />

      <div className="container relative text-center">
        <LayerLabel index={17} technique="Tiến độ toàn trang" className="justify-center" />
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Bạn đã cuộn</p>
        <motion.p className="font-heading text-[7rem] font-bold leading-none text-neon-amber text-glow-amber sm:text-[11rem]">
          {percent}
        </motion.p>
        <h2 className="mx-auto mt-4 max-w-xl font-heading text-3xl font-bold uppercase sm:text-4xl">
          18 lớp — chỉ transform <span className="text-neon-cyan">&</span> opacity
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
          Toàn bộ hiệu ứng chạy trên GPU: không animate layout, native scroll với
          quán tính Lenis, tự tắt khi hệ điều hành bật giảm chuyển động. Cuộn tiếp
          để xem lớp cuối cùng lộ ra sau trang.
        </p>
      </div>
    </section>
  );
}
