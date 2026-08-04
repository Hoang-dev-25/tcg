"use client";

import { useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";

import { scrollState } from "../progress";
import { inWindow } from "../world";

/* Bật/tắt cả một layer theo cửa sổ progress — giữ draw call thấp mà vẫn có
   vùng chồng lấn nên mắt không thấy chỗ nối. */
export function useLayerWindow(
  win: [number, number],
  extra?: (p: number, group: THREE.Group) => void
): RefObject<THREE.Group> {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    const g = ref.current;
    if (!g) return;
    const p = scrollState.current;
    const on = inWindow(p, win);
    if (g.visible !== on) g.visible = on;
    if (on && extra) extra(p, g);
  });
  return ref;
}
