"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { useIsMobile } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

type ParallaxProps = {
  children: ReactNode;
  /**
   * Cường độ trôi theo scroll. Dương: phần tử trôi ngược hướng cuộn (nổi lên trước),
   * âm: trôi cùng hướng (lùi về sau). 0.3–0.6 là mức tự nhiên.
   */
  speed?: number;
  className?: string;
};

/**
 * Bọc bất kỳ khối nào để nó trôi theo tốc độ riêng khi đi qua viewport —
 * tạo chiều sâu parallax cho toàn trang. Tự giảm 50% trên mobile và
 * tắt hẳn với prefers-reduced-motion.
 */
export function Parallax({ children, speed = 0.4, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const factor = reducedMotion ? 0 : isMobile ? 0.7 : 1;
  const range = 110 * speed * factor;
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);

  return (
    <motion.div ref={ref} style={{ y }} className={cn("will-change-transform", className)}>
      {children}
    </motion.div>
  );
}
