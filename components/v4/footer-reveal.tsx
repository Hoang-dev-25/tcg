"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Curtain reveal: footer sticky bottom (z-0) — nội dung z cao hơn nhấc lên để lộ footer.
 * CHỈ bật khi footer thấp hơn viewport: nếu footer cao hơn màn hình mà vẫn ghim đáy,
 * phần đầu footer sẽ không bao giờ cuộn tới được → khi đó trả về luồng cuộn bình thường.
 * Reduced motion: luôn render bình thường.
 */
export function FooterReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const [fits, setFits] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const measure = () => {
      const h = ref.current?.offsetHeight ?? 0;
      setFits(h > 0 && h <= window.innerHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (ref.current) ro.observe(ref.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [reduced]);

  return (
    <div ref={ref} className={!reduced && fits ? "sticky bottom-0 z-0" : undefined}>
      {children}
    </div>
  );
}
