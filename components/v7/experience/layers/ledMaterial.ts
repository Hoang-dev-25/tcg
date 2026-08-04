"use client";

import * as THREE from "three";

import { LED_PANEL } from "../textures";

/* ===== Shader mặt LED =====
   Blender chỉ giao mặt PHẲNG + material tên MAT_LED_SCREEN. Toàn bộ chất LED —
   lưới pixel, khe cabinet, scanline, moiré, cú loé khi camera xuyên qua — do
   shader này lo (spec: "mặt trước để phẳng, chi tiết pixel để shader lo"). */

export type LedMaterial = THREE.ShaderMaterial & {
  uniforms: {
    uMap: { value: THREE.Texture | null };
    uPan: { value: number };
    uPanels: { value: number };
    uTime: { value: number };
    uDissolve: { value: number };
    uOpacity: { value: number };
    uPixels: { value: THREE.Vector2 };
    uCabinets: { value: THREE.Vector2 };
    uBright: { value: number };
  };
};

const vert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const frag = /* glsl */ `
  uniform sampler2D uMap;
  uniform float uPan;       // vị trí khung đang chiếu, 0..1-1/uPanels
  uniform float uPanels;    // số khung ghép ngang trong texture nội dung
  uniform float uTime;
  uniform float uDissolve;  // 0 → 1 khi camera xuyên qua mặt LED
  uniform float uOpacity;
  uniform vec2  uPixels;    // số điểm LED ngang/dọc
  uniform vec2  uCabinets;  // số cabinet ngang/dọc (khe hở giữa các module)
  uniform float uBright;
  varying vec2 vUv;

  void main() {
    vec2 cuv = vec2(vUv.x / uPanels + uPan, vUv.y);
    vec3 col = texture2D(uMap, cuv).rgb;

    // Lưới điểm LED: giữa các điểm là khe tối
    vec2 px = fract(vUv * uPixels);
    float dot = smoothstep(0.06, 0.30, px.x) * smoothstep(0.06, 0.30, px.y)
              * smoothstep(0.06, 0.30, 1.0 - px.x) * smoothstep(0.06, 0.30, 1.0 - px.y);
    col *= mix(0.42, 1.12, dot);

    // Khe ghép giữa các cabinet 960×960
    vec2 cb = abs(fract(vUv * uCabinets) - 0.5);
    float seam = smoothstep(0.47, 0.5, max(cb.x, cb.y));
    col *= 1.0 - seam * 0.55;

    // Scanline + nhấp nháy rất nhẹ, đúng chất màn LED quay phim
    col *= 0.94 + 0.06 * sin(vUv.y * 620.0 - uTime * 3.0);
    col *= 0.985 + 0.015 * sin(uTime * 37.0);

    col *= uBright;

    // Cú loé trắng-xanh khi camera lao xuyên qua bề mặt
    col += uDissolve * vec3(0.42, 0.66, 1.0) * 2.2;

    float a = uOpacity * (1.0 - uDissolve * uDissolve);
    gl_FragColor = vec4(col, a);
  }
`;

export function createLedMaterial(map: THREE.Texture | null, panels = LED_PANEL.count): LedMaterial {
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uMap: { value: map },
      uPan: { value: 0 },
      uPanels: { value: panels },
      uTime: { value: 0 },
      uDissolve: { value: 0 },
      uOpacity: { value: 1 },
      uPixels: { value: new THREE.Vector2(196, 110) },
      uCabinets: { value: new THREE.Vector2(8, 4.5) },
      uBright: { value: 1.35 },
    },
    vertexShader: vert,
    fragmentShader: frag,
    transparent: true,
    depthWrite: true,
    side: THREE.DoubleSide,
    toneMapped: false,
  }) as LedMaterial;
  return mat;
}
