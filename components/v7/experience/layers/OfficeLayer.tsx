"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { makeGlowTexture, PALETTE } from "../textures";
import { LAYER_WINDOWS, WORLD } from "../world";
import { useLayerWindow } from "./useLayerWindow";

/* ===== Giai đoạn 6 · Không gian văn phòng ảo =====
   Không dựng Blender (theo phân loại): gradient + fog + vài mặt phản chiếu.
   Form/CTA/social là DOM thuần nằm chính giữa. */

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

function makeWallTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 288;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(256, 150, 20, 256, 150, 300);
  grad.addColorStop(0, "#16306a");
  grad.addColorStop(0.45, "#0c1832");
  grad.addColorStop(1, "#050912");
  g.fillStyle = grad;
  g.fillRect(0, 0, 512, 288);
  /* vệt neon ngang rất mảnh, gợi khe sáng kiến trúc */
  g.fillStyle = "rgba(87,163,255,0.30)";
  g.fillRect(0, 86, 512, 1.5);
  g.fillStyle = "rgba(167,139,250,0.22)";
  g.fillRect(0, 214, 512, 1.5);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function OfficeLayer() {
  const wallTex = useMemo(makeWallTexture, []);
  const glow = useMemo(() => makeGlowTexture(PALETTE.blueSoft, 0.35), []);
  const motes = useRef<THREE.Points>(null);

  const [cx, , cz] = WORLD.office.center;
  const wallZ = WORLD.office.wall[2];

  const moteGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const n = 240;
    const p = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      p[i * 3] = cx + (Math.random() - 0.5) * 130;
      p[i * 3 + 1] = Math.random() * 46;
      p[i * 3 + 2] = cz + (Math.random() - 0.5) * 90;
    }
    g.setAttribute("position", new THREE.BufferAttribute(p, 3));
    return g;
  }, [cx, cz]);

  const ref = useLayerWindow(LAYER_WINDOWS.office, (p, g) => {
    const a = clamp01((p - 0.855) / 0.05);
    g.traverse((o) => {
      const m = (o as THREE.Mesh).material as THREE.MeshBasicMaterial | undefined;
      if (!m || !m.transparent || typeof m.opacity !== "number") return;
      if (m.userData.baseOpacity === undefined) m.userData.baseOpacity = m.opacity;
      m.opacity = m.userData.baseOpacity * a;
    });
  });

  useFrame(({ clock }) => {
    if (motes.current) motes.current.rotation.y = clock.elapsedTime * 0.02;
  });

  return (
    <group ref={ref}>
      {/* Sàn bóng — giả phản chiếu bằng metalness + vệt glow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[cx, 0, cz]}>
        <planeGeometry args={[420, 320]} />
        <meshStandardMaterial color="#060a14" roughness={0.28} metalness={0.72} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[cx, 0.05, cz - 22]}>
        <planeGeometry args={[150, 150]} />
        <meshBasicMaterial
          map={glow}
          transparent
          opacity={0.55}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>

      {/* Vách nền phía sau form */}
      <mesh position={[cx, 26, wallZ]}>
        <planeGeometry args={[170, 84]} />
        <meshBasicMaterial map={wallTex} transparent opacity={1} toneMapped={false} />
      </mesh>

      {/* Hai dải đèn hắt hai bên */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[cx + s * 46, 22, wallZ + 24]} rotation={[0, -s * 0.5, 0]}>
          <planeGeometry args={[1.4, 44]} />
          <meshBasicMaterial color={s < 0 ? "#57a3ff" : "#a78bfa"} transparent opacity={0.85} toneMapped={false} />
        </mesh>
      ))}

      {/* Bụi sáng lơ lửng */}
      <points ref={motes} geometry={moteGeo}>
        <pointsMaterial
          size={0.5}
          color="#7bb8ff"
          transparent
          opacity={0.55}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
