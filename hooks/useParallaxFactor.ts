"use client";

/**
 * Giữ lại đường import cũ cho các layer đã dùng `useParallaxFactor`.
 * Chính sách chuyển động nay tập trung ở `useMotionTier` (ba bậc full/mobile/safe)
 * — sửa cường độ thì sửa ở đó, không sửa ở đây.
 */
export { useParallaxFactor, useSafeFactor, useMotionTier, mobileMotion } from "@/hooks/useMotionTier";
export type { MotionTier } from "@/hooks/useMotionTier";
