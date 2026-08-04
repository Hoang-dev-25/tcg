"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { makeBoardTexture, makeGlowTexture, PALETTE } from "@/components/v7/experience/textures";
import { createLedMaterial } from "@/components/v7/experience/layers/ledMaterial";

/* Bản PROCEDURAL cho 3 slot sản phẩm thật (billboard / pano / led-cabinet).
   Đúng TỈ LỆ KỸ THUẬT nhưng thiếu bevel thép, độ võng bạt, tủ điện mặt sau —
   đó là phần bắt buộc dựng Blender (docs/v7-blender-spec.md §3–5).
   Pivot cục bộ: chân chạm đất (y = 0), mặt biển quay về +Z. */

const STEEL = "#151f38";
const DARKSTEEL = "#0d1424";
const CONCRETE = "#10141f";

/* ---------- 1. Billboard tấm lớn: mặt 12×6m, tâm cao 21m, cột đơn ---------- */
export function BillboardFallback({ face }: { face?: THREE.Texture }) {
  const tex = useMemo(
    () => face ?? makeBoardTexture(["TOÀN CẦU ADV"], { kicker: "Billboard 12×6m", accent: PALETTE.blue }),
    [face]
  );
  const glow = useMemo(() => makeGlowTexture(PALETTE.blueSoft, 0.3), []);
  const W = 12;
  const H = 6;
  const CY = 21;

  return (
    <group>
      {/* chân đế bê tông + cột đơn monopole */}
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[4.2, 1.4, 4.2]} />
        <meshStandardMaterial color={CONCRETE} roughness={1} />
      </mesh>
      <mesh position={[0, (CY - H / 2) / 2 + 0.7, 0]}>
        <cylinderGeometry args={[0.55, 0.75, CY - H / 2, 16]} />
        <meshStandardMaterial color={STEEL} metalness={0.65} roughness={0.42} />
      </mesh>

      {/* thang leo */}
      {Array.from({ length: 14 }).map((_, i) => (
        <mesh key={i} position={[0.85, 3 + i * 1.05, 0]}>
          <boxGeometry args={[0.9, 0.08, 0.08]} />
          <meshStandardMaterial color={DARKSTEEL} metalness={0.5} roughness={0.6} />
        </mesh>
      ))}

      {/* giàn đỡ sau mặt biển */}
      <mesh position={[0, CY, -0.55]}>
        <boxGeometry args={[W + 0.8, H + 0.8, 0.5]} />
        <meshStandardMaterial color={DARKSTEEL} metalness={0.55} roughness={0.5} />
      </mesh>
      {[-4, 0, 4].map((x) => (
        <mesh key={x} position={[x, CY, -0.95]}>
          <boxGeometry args={[0.22, H + 0.6, 0.5]} />
          <meshStandardMaterial color={STEEL} metalness={0.6} roughness={0.45} />
        </mesh>
      ))}

      {/* mặt biển */}
      <mesh position={[0, CY, 0]}>
        <planeGeometry args={[W, H]} />
        <meshStandardMaterial
          color="#0a1120"
          emissive="#ffffff"
          emissiveMap={tex}
          emissiveIntensity={0.95}
          toneMapped={false}
        />
      </mesh>

      {/* dàn đèn rọi 5 bóng gắn thanh ngang dưới */}
      <mesh position={[0, CY - H / 2 - 1.2, 1.1]}>
        <boxGeometry args={[W, 0.16, 0.16]} />
        <meshStandardMaterial color={STEEL} metalness={0.6} roughness={0.45} />
      </mesh>
      {[-4.4, -2.2, 0, 2.2, 4.4].map((x) => (
        <group key={x} position={[x, CY - H / 2 - 1.2, 1.1]}>
          <mesh rotation={[-0.5, 0, 0]}>
            <cylinderGeometry args={[0.28, 0.34, 0.5, 10]} />
            <meshStandardMaterial color={DARKSTEEL} metalness={0.6} roughness={0.4} />
          </mesh>
          <sprite scale={[3.4, 3.4, 1]} position={[0, 0.4, 0.3]}>
            <spriteMaterial map={glow} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
          </sprite>
        </group>
      ))}
    </group>
  );
}

/* ---------- 2. Pano: bạt Hiflex 10×5m có ĐỘ VÕNG, giàn 4 chân ---------- */
export function PanoFallback({ face }: { face?: THREE.Texture }) {
  const tex = useMemo(
    () => face ?? makeBoardTexture(["TOÀN CẦU", "ADV"], { kicker: "Pano bạt Hiflex", accent: PALETTE.violetSoft }),
    [face]
  );
  const W = 10;
  const H = 5;
  const CY = 24;

  /* Độ võng nhẹ của bạt — Blender làm bằng Cloth, ở đây nắn đỉnh bằng tay */
  const sagged = useMemo(() => {
    const g = new THREE.PlaneGeometry(W, H, 24, 12);
    const p = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i) / (W / 2);
      const y = p.getY(i) / (H / 2);
      const sag = (1 - x * x) * (1 - y * y);
      p.setZ(i, -sag * 0.28); // võng vào trong tối đa 28cm
    }
    g.computeVertexNormals();
    return g;
  }, []);

  return (
    <group>
      {/* giàn 4 chân */}
      {[
        [-W / 2 + 0.6, -1.6],
        [W / 2 - 0.6, -1.6],
        [-W / 2 + 0.6, 1.6],
        [W / 2 - 0.6, 1.6],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, (CY - H / 2) / 2, z]}>
          <boxGeometry args={[0.34, CY - H / 2, 0.34]} />
          <meshStandardMaterial color={STEEL} metalness={0.6} roughness={0.45} />
        </mesh>
      ))}
      {/* giằng chéo */}
      {[6, 12, 18].map((y) => (
        <mesh key={y} position={[0, y, 0]} rotation={[0, 0, 0.05]}>
          <boxGeometry args={[W - 1, 0.16, 3.4]} />
          <meshStandardMaterial color={DARKSTEEL} metalness={0.5} roughness={0.6} />
        </mesh>
      ))}

      {/* khung thép hộp mạ kẽm */}
      <mesh position={[0, CY, -0.28]}>
        <boxGeometry args={[W + 0.5, H + 0.5, 0.32]} />
        <meshStandardMaterial color={DARKSTEEL} metalness={0.55} roughness={0.5} />
      </mesh>

      {/* bạt căng, hơi võng */}
      <mesh position={[0, CY, 0]} geometry={sagged}>
        <meshStandardMaterial
          color="#0b1222"
          emissive="#ffffff"
          emissiveMap={tex}
          emissiveIntensity={0.8}
          roughness={0.85}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>

      {/* khoen + dây chằng quanh mép */}
      {Array.from({ length: 10 }).map((_, i) => {
        const x = -W / 2 + 0.4 + (i * (W - 0.8)) / 9;
        return (
          <group key={i}>
            <mesh position={[x, CY + H / 2 + 0.12, 0]}>
              <torusGeometry args={[0.09, 0.03, 6, 10]} />
              <meshStandardMaterial color="#8b93a8" metalness={0.8} roughness={0.35} />
            </mesh>
            <mesh position={[x, CY - H / 2 - 0.12, 0]}>
              <torusGeometry args={[0.09, 0.03, 6, 10]} />
              <meshStandardMaterial color="#8b93a8" metalness={0.8} roughness={0.35} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

/* ---------- 3. Màn LED outdoor: cabinet 960×960 ghép 8×4 = 7,68×3,84m ---------- */
export function LedCabinetFallback({ face }: { face?: THREE.Texture }) {
  const tex = useMemo(
    () => face ?? makeBoardTexture(["LED P5 OUTDOOR"], { kicker: "8.000 nits", accent: PALETTE.blueSoft }),
    [face]
  );
  const mat = useMemo(() => {
    const m = createLedMaterial(tex, 1);
    m.uniforms.uPixels.value.set(154, 77);
    m.uniforms.uCabinets.value.set(8, 4);
    m.uniforms.uBright.value = 1.25;
    return m;
  }, [tex]);
  useFrame(({ clock }) => {
    mat.uniforms.uTime.value = clock.elapsedTime;
  });

  const CW = 0.96;
  const cols = 8;
  const rows = 4;
  const W = cols * CW;
  const H = rows * CW;
  const CY = 18;

  return (
    <group>
      {/* hai cột đỡ + đế */}
      {[-1, 1].map((s) => (
        <group key={s}>
          <mesh position={[s * (W / 2 - 0.6), (CY - H / 2) / 2, -0.7]}>
            <boxGeometry args={[0.5, CY - H / 2, 0.5]} />
            <meshStandardMaterial color={STEEL} metalness={0.65} roughness={0.4} />
          </mesh>
          <mesh position={[s * (W / 2 - 0.6), 0.5, -0.7]}>
            <boxGeometry args={[1.8, 1, 1.8]} />
            <meshStandardMaterial color={CONCRETE} roughness={1} />
          </mesh>
        </group>
      ))}

      {/* xương sau + tủ điện + quạt tản nhiệt */}
      <mesh position={[0, CY, -0.42]}>
        <boxGeometry args={[W + 0.3, H + 0.3, 0.6]} />
        <meshStandardMaterial color={DARKSTEEL} metalness={0.5} roughness={0.55} />
      </mesh>
      <mesh position={[W / 2 + 0.7, CY - H / 2 + 0.8, -0.5]}>
        <boxGeometry args={[0.9, 1.4, 0.6]} />
        <meshStandardMaterial color="#1a2338" metalness={0.6} roughness={0.5} />
      </mesh>
      {/* mái che chống nước */}
      <mesh position={[0, CY + H / 2 + 0.35, 0.1]} rotation={[0.22, 0, 0]}>
        <boxGeometry args={[W + 0.8, 0.12, 1.2]} />
        <meshStandardMaterial color={STEEL} metalness={0.6} roughness={0.45} />
      </mesh>

      {/* mặt LED — phẳng, chi tiết pixel do shader */}
      <mesh position={[0, CY, 0.02]} material={mat}>
        <planeGeometry args={[W, H]} />
      </mesh>
    </group>
  );
}
