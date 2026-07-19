"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Curtain reveal: footer sticky bottom (z-0) — nội dung z cao hơn nhấc lên để lộ footer.
 * CHỈ bật khi footer thấp hơn viewport: nếu footer cao hơn màn hình mà vẫn ghim đáy,
 * phần đầu footer sẽ không bao giờ cuộn tới được. Khi đó (thường là mobile) chuyển sang
 * bản reveal trượt: footer trôi từ trên xuống vào vị trí khi lọt viewport — vẫn có
 * cảm giác "mở màn" mà không khóa cuộn.
 * Reduced motion: luôn render bình thường.
 */
export function FooterReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const [fits, setFits] = useState(false);

  // Bản reveal trượt (footer cao hơn viewport): -120px → 0 khi footer vào màn
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 45%"] });
  const slideY = useTransform(scrollYProgress, [0, 1], [-120, 0]);

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

  if (!reduced && !fits) {
    return (
      <div ref={ref} className="overflow-clip">
        <motion.div style={{ y: slideY }} className="will-change-transform">
          {children}
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={ref} className={!reduced && fits ? "sticky bottom-0 z-0" : undefined}>
      {children}
    </div>
  );
}
