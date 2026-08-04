"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* Tự hạ cấp theo FPS THẬT (không đoán theo user-agent).
   tier 2 = đủ hậu kỳ · tier 1 = tắt bloom · tier 0 = tắt hạt nặng + dpr 1 */
export function useQuality() {
  const [tier, setTier] = useState<0 | 1 | 2>(2);
  const [mobile, setMobile] = useState(false);
  const [reduced, setReduced] = useState(false);
  const bad = useRef(0);

  useEffect(() => {
    setMobile(window.matchMedia("(max-width: 767px)").matches);
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const reportFps = useCallback((fps: number) => {
    if (fps < 45) {
      bad.current += 1;
      if (bad.current >= 3) {
        bad.current = 0;
        setTier((t) => (t > 0 ? ((t - 1) as 0 | 1) : t));
      }
    } else {
      bad.current = 0;
    }
  }, []);

  return { tier, mobile, reduced, reportFps };
}
