"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";

/**
 * Trạng thái dùng chung cho các carousel vuốt ngang có snap trên mobile
 * (khối dịch vụ, khối tin tức).
 *
 * Trả về:
 *  - `scroller`: gắn vào khung cuộn ngang
 *  - `progress` : tiến độ cuộn 0..1 đã làm mượt, dùng lái biến đổi từng thẻ
 *  - `active`   : chỉ số thẻ đang ở giữa khung
 *  - `barWidth` : bề rộng thanh tiến độ dạng chuỗi %
 */
export function useSnapCarousel(count: number, minBarPercent = 8) {
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollXProgress } = useScroll({ container: scroller });
  const progress = useSpring(scrollXProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  const barWidth = useTransform(
    progress,
    (v) => `${Math.max(minBarPercent, Math.min(1, Math.max(0, v)) * 100)}%`,
  );

  useMotionValueEvent(progress, "change", (v) => {
    const idx = Math.round(Math.min(1, Math.max(0, v)) * (count - 1));
    if (idx !== active) setActive(idx);
  });

  /**
   * Luôn mở ở thẻ đầu tiên. Trình duyệt khôi phục scrollLeft của khung cuộn khi
   * reload / quay lại trang, khiến carousel hiện ra ở giữa danh sách. Ép về 0
   * ngay sau khi mount, lặp lại trong frame kế tiếp vì scroll-snap có thể chỉnh
   * lại vị trí sau lần gán đầu.
   */
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const reset = () => {
      el.scrollLeft = 0;
    };
    reset();
    const raf1 = requestAnimationFrame(() => {
      reset();
      requestAnimationFrame(reset);
    });
    return () => cancelAnimationFrame(raf1);
  }, []);

  return { scroller, progress, active, barWidth };
}
