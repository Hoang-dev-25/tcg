"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/**
 * Đếm số tăng dần khi phần tử lọt vào viewport.
 * Đầu vào: target (số đích), duration (giây).
 * Đầu ra: { ref } gắn vào phần tử hiển thị + { value } chạy 0 → target.
 */
export function useCountUp(target: number, duration = 1.4) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reducedMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      setValue(target);
      return;
    }
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setValue(latest),
    });
    return () => controls.stop();
  }, [inView, target, duration, reducedMotion]);

  return { ref, value: Math.round(value) };
}
