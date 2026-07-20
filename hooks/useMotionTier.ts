"use client";

import { useReducedMotion } from "framer-motion";

import { useIsMobile } from "@/hooks/useMediaQuery";

/**
 * Ba bậc chuyển động dùng chung cho toàn trang — thay cho cơ chế bật/tắt nhị phân cũ.
 *
 * - "full"   : desktop, người dùng không yêu cầu giảm chuyển động. Parallax, pin,
 *              zoom, deck 3D — dùng hết.
 * - "mobile" : màn dọc, không yêu cầu giảm chuyển động. KHÔNG bắt chước desktop:
 *              dùng ngôn ngữ motion riêng theo trục dọc (stack chiều sâu, reveal
 *              dọc, sticky theo bước). Xem `mobileMotion` bên dưới.
 * - "safe"   : người dùng bật prefers-reduced-motion. Bỏ mọi chuyển động tiền đình
 *              (parallax, zoom, xoay, scrub theo pin) NHƯNG vẫn giữ crossfade và
 *              dịch chuyển nhỏ — WCAG 2.3.3 yêu cầu bỏ animation lớn do tương tác,
 *              không yêu cầu trang phải đứng yên hoàn toàn.
 */
export type MotionTier = "full" | "mobile" | "safe";

export function useMotionTier(): MotionTier {
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  if (reduced) return "safe";
  return mobile ? "mobile" : "full";
}

/**
 * Hệ số cường độ cho các biến đổi CÓ TÍNH TIỀN ĐÌNH (parallax, zoom, xoay).
 * Bậc "safe" trả 0 — đây là loại chuyển động cần tắt thật sự.
 * Bậc "mobile" giữ 0.7: biên độ px trên màn hẹp phải nhỏ hơn thì mới không
 * đẩy nội dung ra ngoài khung.
 */
export function useParallaxFactor(): number {
  const tier = useMotionTier();
  if (tier === "safe") return 0;
  return tier === "mobile" ? 0.7 : 1;
}

/**
 * Hệ số cho chuyển động AN TOÀN (đổi độ mờ, dịch nhỏ, giãn nhẹ) — thứ vẫn giữ
 * được ở bậc "safe". Dùng cho reveal, crossfade, stack chiều sâu.
 * Ở "safe" trả 0.25 thay vì 0: đủ để mắt thấy có phản hồi, không đủ gây khó chịu.
 */
export function useSafeFactor(): number {
  const tier = useMotionTier();
  if (tier === "safe") return 0.25;
  return 1;
}

/**
 * Biên độ chuẩn cho ngôn ngữ motion riêng của mobile.
 * Gom vào một chỗ để các section dùng thống nhất thay vì mỗi nơi tự chế số.
 */
export const mobileMotion = {
  /** Coverflow vuốt ngang: thẻ lệch tâm nghiêng, lùi và mờ đi. */
  coverflow: { rotateYDeg: 20, scaleDrop: 0.14, opacityDrop: 0.45, zPush: -60 },
  /** Reveal theo trục dọc — dịch vào nhiều hơn desktop vì quãng cuộn ngắn. */
  reveal: { y: 34, stagger: 0.07 },
  /** Ảnh trong khối: zoom nhẹ khi đi qua viewport. */
  imageZoom: { from: 0.94, to: 1.04 },
} as const;
