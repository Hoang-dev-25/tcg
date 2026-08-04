"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { makeGlowTexture, LED_PANEL, PALETTE } from "../textures";
import { scrollState } from "../progress";
import { LAYER_WINDOWS, WORLD } from "../world";
import { useLayerWindow } from "./useLayerWindow";
import type { LedMaterial } from "./ledMaterial";

/* ===== Giai đoạn 1 → 3 · Mặt LED khổng lồ =====
   Nội dung trượt ngang theo progress: khung logo → tiêu đề 20 năm → timeline.
   Khi camera lao tới z = -220 thì mặt LED "tan" ra để bay xuyên qua. */

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const seg = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));

/** Khung nội dung đang chiếu (0..LED_PANEL.count-1) theo tiến trình */
function panelAt(p: number): number {
  if (p < 0.13) return 0;
  if (p < 0.18) return seg(p, 0.13, 0.18); // 0 → 1
  if (p < 0.21) return 1;
  return 1 + seg(p, 0.21, 0.315) * (LED_PANEL.count - 1 - 1); // 1 → 4
}

export function LedWallLayer({
  material,
  hidden,
}: {
  material: LedMaterial;
  /** true khi mặt LED do file Blender cung cấp — không dựng plane dự phòng nữa */
  hidden: boolean;
}) {
  const glow = useMemo(() => makeGlowTexture(PALETTE.blueSoft, 0.4), []);
  const haloRef = useRef<THREE.Sprite>(null);
  const [cx, cy, cz] = WORLD.ledWall.center;

  const ref = useLayerWindow(LAYER_WINDOWS.ledWall, (p) => {
    const u = material.uniforms;
    u.uPan.value = panelAt(p) / LED_PANEL.count;
    u.uDissolve.value = seg(p, 0.293, 0.327);
    /* mờ dần hẳn sau khi đã ở phía sau, tránh thấy mặt lưng lơ lửng */
    u.uOpacity.value = 1 - seg(p, 0.33, 0.38);
    if (haloRef.current) {
      const s = 1 - seg(p, 0.24, 0.33);
      haloRef.current.scale.set(WORLD.ledWall.width * 1.5 * s, WORLD.ledWall.height * 2.4 * s, 1);
    }
  });

  useFrame(({ clock }) => {
    material.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <group ref={ref}>
      {!hidden && (
        <mesh position={[cx, cy, cz]} material={material}>
          <planeGeometry args={[WORLD.ledWall.width, WORLD.ledWall.height]} />
        </mesh>
      )}

      {/* Quầng sáng tỏa ra từ màn hình — glow rẻ, không cần bloom ở tier thấp */}
      <sprite ref={haloRef} position={[cx, cy, cz + 4]} scale={[84, 76, 1]}>
        <spriteMaterial map={glow} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>

      {/* Vệt hắt xuống mặt đường ướt ngay dưới chân tòa */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[cx, 0.08, cz + 46]}>
        <planeGeometry args={[110, 150]} />
        <meshBasicMaterial
          map={glow}
          transparent
          opacity={0.5}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
