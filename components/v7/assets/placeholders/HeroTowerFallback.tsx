"use client";

import { useMemo } from "react";
import * as THREE from "three";

import { WORLD } from "@/components/v7/experience/world";
import { makeWindowTexture } from "@/components/v7/experience/textures";

/* Bản PROCEDURAL thay thế cho slot Blender `hero-tower`.
   Chỉ đủ để dựng khối và bố cục — cạnh vát kính, khung thép, giàn giáo kỹ thuật
   là phần người dựng phải làm (xem docs/v7-blender-spec.md §1).
   Toạ độ cục bộ: pivot ở TÂM ĐÁY tòa, mặt LED ở (0, 96, 24). */

const DARK = "#0a1020";

export function HeroTowerFallback() {
  const win = useMemo(() => makeWindowTexture(31), []);
  const t = WORLD.heroTower;
  const led = WORLD.ledWall;
  const ledY = led.center[1];
  const frameZ = 23.4;
  const fw = led.width + 3.2;
  const fh = led.height + 3.2;

  return (
    <group>
      {/* Bệ đế */}
      <mesh position={[0, 9, 0]}>
        <boxGeometry args={[t.width + 16, 18, t.depth + 14]} />
        <meshStandardMaterial color="#080d1a" roughness={0.95} />
      </mesh>

      {/* Thân tòa — mặt kính giả bằng emissive map cửa sổ */}
      <mesh position={[0, t.height / 2, 0]}>
        <boxGeometry args={[t.width, t.height, t.depth]} />
        <meshStandardMaterial
          color={DARK}
          emissive="#ffffff"
          emissiveMap={win}
          emissiveIntensity={0.45}
          roughness={0.75}
          metalness={0.15}
        />
      </mesh>

      {/* Hai lõi thang máy hai bên — phá khối hộp trơn */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * (t.width / 2 + 3), t.height * 0.46, -4]}>
          <boxGeometry args={[7, t.height * 0.92, 14]} />
          <meshStandardMaterial color="#070c17" roughness={0.9} />
        </mesh>
      ))}

      {/* Khung thép viền màn LED */}
      {[
        { p: [0, ledY + fh / 2, frameZ], a: [fw, 2.2, 2.4] },
        { p: [0, ledY - fh / 2, frameZ], a: [fw, 2.2, 2.4] },
        { p: [-fw / 2, ledY, frameZ], a: [2.2, fh, 2.4] },
        { p: [fw / 2, ledY, frameZ], a: [2.2, fh, 2.4] },
      ].map((b, i) => (
        <mesh key={i} position={b.p as [number, number, number]}>
          <boxGeometry args={b.a as [number, number, number]} />
          <meshStandardMaterial color="#121a30" metalness={0.6} roughness={0.4} />
        </mesh>
      ))}

      {/* Giàn kỹ thuật sau lưng màn hình */}
      {[-18, 0, 18].map((x) => (
        <mesh key={x} position={[x, ledY, 22]}>
          <boxGeometry args={[0.8, fh + 4, 0.8]} />
          <meshStandardMaterial color="#0e1526" metalness={0.5} roughness={0.6} />
        </mesh>
      ))}

      {/* Cột ăng-ten + đèn báo không lưu */}
      <mesh position={[0, t.height + 14, 0]}>
        <cylinderGeometry args={[0.5, 1.1, 28, 8]} />
        <meshStandardMaterial color="#141d33" metalness={0.6} roughness={0.5} />
      </mesh>
      <mesh position={[0, t.height + 29, 0]}>
        <sphereGeometry args={[1.1, 10, 10]} />
        <meshBasicMaterial color="#ff6b6b" toneMapped={false} />
      </mesh>
    </group>
  );
}
