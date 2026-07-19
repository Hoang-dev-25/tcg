"use client";

import { useRef } from "react";
import { useScroll, type MotionValue } from "framer-motion";

type Offset = NonNullable<Parameters<typeof useScroll>[0]>["offset"];

/**
 * Tiến độ cuộn (0 → 1) của một section so với viewport.
 * Mặc định: bắt đầu khi mép trên section chạm mép trên màn hình,
 * kết thúc khi mép dưới section chạm mép dưới màn hình — hợp với
 * các container sticky scrollytelling.
 */
export function useSectionProgress<T extends HTMLElement>(
  offset: Offset = ["start start", "end end"]
): { ref: React.RefObject<T>; progress: MotionValue<number> } {
  const ref = useRef<T>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset });
  return { ref, progress: scrollYProgress };
}
