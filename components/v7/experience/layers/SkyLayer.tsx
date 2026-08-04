"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { scrollState } from "../progress";
import { LAYER_WINDOWS } from "../world";
import { useLayerWindow } from "./useLayerWindow";

/* ===== Bầu trời: mây, sương, bụi khí quyển + 2 lớp silhouette thành phố xa =====
   Đây là chỗ tạo cảm giác PARALLAX NHIỀU LỚP: mỗi lớp có hệ số trôi riêng theo
   tiến trình, nên khi zoom sâu chúng chạy với vận tốc khác nhau. */

function makeCloudTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 256;
  const g = c.getContext("2d")!;
  for (let i = 0; i < 70; i++) {
    const x = Math.random() * 512;
    const y = 90 + Math.random() * 100;
    const r = 30 + Math.random() * 90;
    const grad = g.createRadialGradient(x, y, 0, x, y, r);
    const a = 0.05 + Math.random() * 0.06;
    grad.addColorStop(0, `rgba(86,120,190,${a})`);
    grad.addColorStop(1, "rgba(86,120,190,0)");
    g.fillStyle = grad;
    g.fillRect(x - r, y - r, r * 2, r * 2);
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** Silhouette thành phố xa — vẽ ngẫu nhiên nhưng cố định theo seed */
function makeSkylineTexture(seed: number, tint: string): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 256;
  const g = c.getContext("2d")!;
  let a = seed;
  const rnd = () => {
    a = (a * 1664525 + 1013904223) >>> 0;
    return a / 4294967296;
  };
  g.clearRect(0, 0, 1024, 256);
  g.fillStyle = tint;
  let x = 0;
  while (x < 1024) {
    const w = 14 + rnd() * 46;
    const h = 30 + rnd() * rnd() * 190;
    g.fillRect(x, 256 - h, w - 3, h);
    /* vài ô cửa sổ sáng */
    for (let i = 0; i < 6; i++) {
      if (rnd() < 0.35) {
        g.fillStyle = "rgba(123,184,255,0.35)";
        g.fillRect(x + 4 + rnd() * (w - 12), 256 - h + 8 + rnd() * (h - 16), 3, 4);
        g.fillStyle = tint;
      }
    }
    x += w;
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

type Band = { z: number; y: number; w: number; h: number; speed: number; parallax: number; opacity: number };

const CLOUD_BANDS: Band[] = [
  { z: -700, y: 210, w: 2400, h: 420, speed: 0.004, parallax: 60, opacity: 0.85 },
  { z: -430, y: 150, w: 1500, h: 300, speed: 0.009, parallax: 150, opacity: 0.7 },
  { z: -160, y: 120, w: 900, h: 200, speed: 0.017, parallax: 320, opacity: 0.5 },
];

export function SkyLayer({ dust = 420 }: { dust?: number }) {
  const cloudTex = useMemo(makeCloudTexture, []);
  const farSkyline = useMemo(() => makeSkylineTexture(11, "rgba(11,19,38,0.95)"), []);
  const midSkyline = useMemo(() => makeSkylineTexture(29, "rgba(8,14,30,0.98)"), []);
  const bandRefs = useRef<Array<THREE.Mesh | null>>([]);
  const dustRef = useRef<THREE.Points>(null);

  const dustGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const p = new Float32Array(dust * 3);
    for (let i = 0; i < dust; i++) {
      p[i * 3] = (Math.random() - 0.5) * 900;
      p[i * 3 + 1] = Math.random() * 320;
      p[i * 3 + 2] = 200 - Math.random() * 900;
    }
    g.setAttribute("position", new THREE.BufferAttribute(p, 3));
    return g;
  }, [dust]);

  const ref = useLayerWindow(LAYER_WINDOWS.city, (p) => {
    /* Mỗi dải mây trôi theo hệ số riêng → vận tốc khác nhau khi zoom */
    CLOUD_BANDS.forEach((b, i) => {
      const mesh = bandRefs.current[i];
      if (!mesh) return;
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = b.opacity * (1 - Math.max(0, (p - 0.24) / 0.14));
      mesh.position.x = Math.sin(p * 3.1) * 12 - p * b.parallax;
      mesh.position.y = b.y + p * b.parallax * 0.22;
    });
    if (dustRef.current) dustRef.current.rotation.y = p * 0.35;
  });

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    CLOUD_BANDS.forEach((b, i) => {
      const mesh = bandRefs.current[i];
      if (!mesh) return;
      const mat = mesh.material as THREE.MeshBasicMaterial;
      if (mat.map) mat.map.offset.x = t * b.speed;
    });
  });

  return (
    <group ref={ref}>
      {/* Silhouette thành phố xa — 2 lớp, lớp gần đậm hơn */}
      <mesh position={[0, 120, -880]} scale={[1, 1, 1]}>
        <planeGeometry args={[3000, 500]} />
        <meshBasicMaterial map={farSkyline} transparent depthWrite={false} opacity={0.9} toneMapped={false} />
      </mesh>
      <mesh position={[0, 90, -640]}>
        <planeGeometry args={[2000, 340]} />
        <meshBasicMaterial map={midSkyline} transparent depthWrite={false} opacity={0.95} toneMapped={false} />
      </mesh>

      {/* Dải mây/sương */}
      {CLOUD_BANDS.map((b, i) => (
        <mesh
          key={i}
          ref={(el) => {
            bandRefs.current[i] = el;
          }}
          position={[0, b.y, b.z]}
        >
          <planeGeometry args={[b.w, b.h]} />
          <meshBasicMaterial
            map={cloudTex.clone()}
            transparent
            opacity={b.opacity}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* Bụi khí quyển bắt sáng neon */}
      <points ref={dustRef} geometry={dustGeo}>
        <pointsMaterial
          size={1.6}
          color="#7bb8ff"
          transparent
          opacity={0.4}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
