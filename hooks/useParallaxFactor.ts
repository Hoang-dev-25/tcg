"use client";

import { useReducedMotion } from "framer-motion";

import { useIsMobile } from "@/hooks/useMediaQuery";

/**
 * Hệ số cường độ parallax dùng chung cho mọi layer:
 * - 0 khi người dùng bật prefers-reduced-motion (mọi transform về tĩnh)
 * - 0.55 trên mobile (giảm cường độ)
 * - 1 trên desktop
 */
export function useParallaxFactor(): number {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  if (reducedMotion) return 0;
  return isMobile ? 0.55 : 1;
}
