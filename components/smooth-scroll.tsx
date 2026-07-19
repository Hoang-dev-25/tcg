"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

/**
 * Cuộn quán tính mượt cho toàn trang bằng Lenis.
 * - Giữ nguyên native input (wheel/touch), không scroll-hijacking.
 * - Tự tắt khi người dùng bật prefers-reduced-motion.
 * - Bắt click anchor nội bộ để cuộn mượt tới section, bù chiều cao header.
 */
export function SmoothScroll({
  children,
  anchorOffset = 0,
}: {
  children: ReactNode;
  /** Bù chiều cao header cố định khi cuộn tới anchor (VD: -64 cho header h-16). */
  anchorOffset?: number;
}) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
    });

    let rafId = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    const onAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
        'a[href^="#"]'
      );
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: anchorOffset, duration: 1.4 });
    };
    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
