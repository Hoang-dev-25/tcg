"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { scrollApi, scrollState, VIRTUAL_TRACK_VH } from "./progress";

gsap.registerPlugin(ScrollTrigger);

/* ===== Bộ điều khiển cuộn ẢO =====
   Trang chỉ cao đúng 100dvh và KHÔNG có thanh cuộn dọc (spec mục 1). Con lăn,
   vuốt chạm, phím và kéo chuột được ScrollTrigger.observe() bắt lại rồi đẩy
   `scrollState.target`; một vòng gsap.ticker làm mượt sang `scrollState.current`.
   Nhờ vậy vẫn "scrub" đúng nghĩa mà tài liệu không hề cuộn. */

export type ScrollApi = {
  /** đưa tiến trình tới p (0..1) bằng tween mượt */
  goTo: (p: number, duration?: number) => void;
};

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

export function useVirtualScroll(onApi?: (api: ScrollApi) => void) {
  useEffect(() => {
    const vh = () => window.innerHeight * VIRTUAL_TRACK_VH;

    /* Tween "nhảy chặng" — hủy khi người dùng lăn tiếp để không giằng nhau */
    let jump: gsap.core.Tween | null = null;
    const killJump = () => {
      jump?.kill();
      jump = null;
    };

    const push = (deltaPx: number) => {
      killJump();
      scrollState.engaged = true;
      scrollState.target = clamp01(scrollState.target + deltaPx / vh());
    };

    const goTo = (p: number, duration = 1.2) => {
      killJump();
      scrollState.engaged = true;
      jump = gsap.to(scrollState, {
        target: clamp01(p),
        duration,
        ease: "power2.inOut",
        overwrite: true,
      });
    };
    scrollApi.goTo = goTo;
    onApi?.({ goTo });

    /* Observer của GSAP (đi kèm ScrollTrigger) — gom wheel + touch + drag */
    const observer = ScrollTrigger.observe({
      target: window,
      type: "wheel,touch,pointer",
      wheelSpeed: 1,
      dragMinimum: 3,
      tolerance: 2,
      preventDefault: true,
      allowClicks: true,
      /* wheel: deltaY dương = lăn xuống = tiến tới.
         touch/pointer: kéo LÊN = tiến tới, nên đảo dấu deltaY. */
      onChangeY: (self) => {
        const isWheel = self.event?.type === "wheel";
        push(isWheel ? self.deltaY : -self.deltaY * 1.7);
      },
    });

    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement;
      if (el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return; // đang gõ form
      const page = 0.1;
      switch (e.key) {
        case "ArrowDown":
        case "PageDown":
        case " ":
          e.preventDefault();
          goTo(scrollState.target + page, 0.9);
          break;
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          goTo(scrollState.target - page, 0.9);
          break;
        case "Home":
          e.preventDefault();
          goTo(0, 1.4);
          break;
        case "End":
          e.preventDefault();
          goTo(1, 1.4);
          break;
      }
    };

    const onPointer = (e: PointerEvent) => {
      scrollState.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      scrollState.pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("keydown", onKey, { passive: false });
    window.addEventListener("pointermove", onPointer, { passive: true });

    /* Vòng làm mượt: lọc mọi cú giật của con lăn, độc lập tốc độ khung hình.
       Cùng công thức damping lũy thừa như v6 nên cảm giác chuyển động đồng nhất. */
    const smooth = (_t: number, dt: number) => {
      const d = Math.min(dt / 1000, 0.05);
      const k = 1 - Math.exp(-d * 4.6);
      const prev = scrollState.current;
      scrollState.current += (scrollState.target - scrollState.current) * k;
      scrollState.velocity = (scrollState.current - prev) / Math.max(d, 1e-4);
    };
    gsap.ticker.add(smooth);
    gsap.ticker.lagSmoothing(0);

    return () => {
      killJump();
      observer.kill();
      gsap.ticker.remove(smooth);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointermove", onPointer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
