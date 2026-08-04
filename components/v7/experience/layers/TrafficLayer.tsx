"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { LAYER_WINDOWS } from "../world";
import { useLayerWindow } from "./useLayerWindow";

/* ===== Xe cộ & vệt đèn xe =====
   Không dựng Blender: mỗi xe là một khối thuôn phát sáng chạy trên làn, cộng
   một vệt sáng kéo dài phía sau. Đèn trước trắng-xanh, đèn sau tím. */

type Car = { lane: number; dir: 1 | -1; speed: number; z: number; len: number; cross: boolean };

export function TrafficLayer({ count = 90 }: { count?: number }) {
  const headRef = useRef<THREE.InstancedMesh>(null);
  const tailRef = useRef<THREE.InstancedMesh>(null);

  const cars = useMemo<Car[]>(() => {
    let a = 99;
    const rnd = () => {
      a = (a * 1664525 + 1013904223) >>> 0;
      return a / 4294967296;
    };
    return Array.from({ length: count }, (_, i) => {
      const cross = i % 4 === 0; // 1/4 số xe chạy trên phố cắt ngang
      const dir: 1 | -1 = rnd() < 0.5 ? 1 : -1;
      return {
        cross,
        dir,
        lane: cross ? -120 - Math.floor(rnd() * 4) * 130 : dir > 0 ? -4 - rnd() * 9 : 4 + rnd() * 9,
        speed: 42 + rnd() * 46,
        z: cross ? (rnd() - 0.5) * 700 : 240 - rnd() * 760,
        len: 5 + rnd() * 9,
      };
    });
  }, [count]);

  const ref = useLayerWindow(LAYER_WINDOWS.city);

  const m = useMemo(() => new THREE.Matrix4(), []);
  const q = useMemo(() => new THREE.Quaternion(), []);
  const pos = useMemo(() => new THREE.Vector3(), []);
  const scl = useMemo(() => new THREE.Vector3(), []);
  const qCross = useMemo(() => new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2), []);

  useFrame((_, dt) => {
    const head = headRef.current;
    const tail = tailRef.current;
    if (!head || !tail || !ref.current?.visible) return;
    const d = Math.min(dt, 0.05);

    cars.forEach((c, i) => {
      c.z += c.speed * c.dir * d;
      if (c.dir > 0 && c.z > 250) c.z = -520;
      if (c.dir < 0 && c.z < -520) c.z = 250;

      if (c.cross) {
        /* phố ngang: "z" đóng vai trục X, lane là toạ độ Z */
        pos.set(c.z, 1.1, c.lane);
        q.copy(qCross);
      } else {
        pos.set(c.lane, 1.1, c.z);
        q.identity();
      }
      scl.set(0.9, 0.5, c.len);
      m.compose(pos, q, scl);
      head.setMatrixAt(i, m);

      /* vệt sáng phía sau — dài hơn, mảnh hơn */
      const back = c.dir > 0 ? -c.len * 2.6 : c.len * 2.6;
      if (c.cross) pos.set(c.z + back, 1.1, c.lane);
      else pos.set(c.lane, 1.1, c.z + back);
      scl.set(0.5, 0.22, c.len * 4);
      m.compose(pos, q, scl);
      tail.setMatrixAt(i, m);
    });
    head.instanceMatrix.needsUpdate = true;
    tail.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={ref}>
      <instancedMesh ref={headRef} args={[undefined, undefined, count]} frustumCulled={false}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#dbe9ff" toneMapped={false} />
      </instancedMesh>
      <instancedMesh ref={tailRef} args={[undefined, undefined, count]} frustumCulled={false}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial
          color="#8b5cf6"
          toneMapped={false}
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </instancedMesh>
    </group>
  );
}
