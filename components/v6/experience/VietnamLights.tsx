"use client";

import { useMemo } from "react";
import * as THREE from "three";

import { PINS, VN_OUTLINE, pinToWorld } from "@/components/v6/data";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function VietnamLights() {
  const { outlinePos, pinPos } = useMemo(() => {
    const rnd = mulberry32(1975);
    /* Outline 220×420 → % → thế giới, rải chấm dọc từng cạnh + jitter */
    const pts = VN_OUTLINE.map(([px, py]) => pinToWorld((px / 220) * 100, (py / 420) * 100));
    const out: number[] = [];
    for (let i = 0; i < pts.length; i++) {
      const [ax, az] = pts[i];
      const [bx, bz] = pts[(i + 1) % pts.length];
      const len = Math.hypot(bx - ax, bz - az);
      const n = Math.max(2, Math.floor(len / 14));
      for (let k = 0; k < n; k++) {
        const u = k / n;
        out.push(
          ax + (bx - ax) * u + (rnd() - 0.5) * 10,
          0.5,
          az + (bz - az) * u + (rnd() - 0.5) * 10
        );
      }
    }
    /* Mỗi pin một cụm ~40 chấm dày quanh tâm */
    const pin: number[] = [];
    for (const p of PINS) {
      const [cx, cz] = pinToWorld(p.x, p.y);
      for (let k = 0; k < 40; k++) {
        const r = rnd() * 34;
        const a = rnd() * Math.PI * 2;
        pin.push(cx + Math.cos(a) * r, 0.5, cz + Math.sin(a) * r);
      }
    }
    return {
      outlinePos: new Float32Array(out),
      pinPos: new Float32Array(pin),
    };
  }, []);

  return (
    <group>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[outlinePos, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#2e5ea8" size={7} sizeAttenuation transparent opacity={0.8} depthWrite={false} />
      </points>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pinPos, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#7dd3fc" size={10} sizeAttenuation transparent opacity={0.95} depthWrite={false} />
      </points>
    </group>
  );
}
