"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

import { cn } from "@/lib/utils";

/** Thanh tiến độ cuộn toàn trang, cố định sát mép trên. */
export function ScrollProgress({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const reducedMotion = useReducedMotion();
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.4,
  });

  return (
    <motion.div
      className={cn(
        "fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-neon-amber via-neon-amber to-neon-cyan",
        className
      )}
      style={{ scaleX: reducedMotion ? scrollYProgress : smoothed }}
      aria-hidden="true"
    />
  );
}
