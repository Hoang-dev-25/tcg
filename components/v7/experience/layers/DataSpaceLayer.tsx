"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { scrollState } from "../progress";
import { LAYER_WINDOWS, WORLD } from "../world";
import { useLayerWindow } from "./useLayerWindow";

/* ===== Giai đoạn 3 · Xuyên qua màn LED vào không gian dữ liệu =====
   Không có gì dựng Blender ở đây (theo phân loại): mạch điện = LineSegments,
   luồng dữ liệu = GPU particles, lõi dữ liệu = IcosahedronGeometry + wireframe. */

const BLUE = new THREE.Color("#57a3ff");
const VIOLET = new THREE.Color("#a78bfa");

const Z0 = WORLD.dataSpace.from;
const Z1 = WORLD.dataSpace.to;
const DEPTH = Z0 - Z1; // dương
const CY = WORLD.dataSpace.core[1];

/* ---------- Mạch điện: đường gấp khúc vuông góc trên vách hành lang ---------- */
function useCircuitGeometry(paths = 46) {
  return useMemo(() => {
    let a = 4242;
    const rnd = () => {
      a = (a * 1664525 + 1013904223) >>> 0;
      return a / 4294967296;
    };
    const pts: number[] = [];
    const cols: number[] = [];
    const R = 78;

    for (let i = 0; i < paths; i++) {
      const ang = rnd() * Math.PI * 2;
      const r = R * (0.7 + rnd() * 0.5);
      let x = Math.cos(ang) * r;
      let y = CY + Math.sin(ang) * r * 0.62;
      let z = Z0 - rnd() * DEPTH * 0.4;
      const c = rnd() < 0.62 ? BLUE : VIOLET;
      const steps = 8 + Math.floor(rnd() * 10);
      for (let s = 0; s < steps; s++) {
        const nx = rnd() < 0.5 ? x + (rnd() - 0.5) * 26 : x;
        const ny = nx === x ? y + (rnd() - 0.5) * 22 : y;
        const nz = z - (6 + rnd() * 34);
        pts.push(x, y, z, nx, ny, nz);
        const fade = 1 - s / steps;
        cols.push(c.r * fade, c.g * fade, c.b * fade, c.r * fade, c.g * fade, c.b * fade);
        x = nx;
        y = ny;
        z = nz;
        if (z < Z1) break;
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    g.setAttribute("color", new THREE.Float32BufferAttribute(cols, 3));
    return g;
  }, [paths]);
}

/* ---------- Luồng dữ liệu: hạt chạy về phía lõi, tính hoàn toàn trên GPU ---------- */
function DataStreams({ count = 1400 }: { count?: number }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const base = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const ang = Math.random() * Math.PI * 2;
      const r = 6 + Math.random() * 70;
      base[i * 3] = Math.cos(ang) * r;
      base[i * 3 + 1] = CY + Math.sin(ang) * r * 0.6;
      base[i * 3 + 2] = Z0 - Math.random() * DEPTH;
      seed[i] = 0.4 + Math.random();
    }
    g.setAttribute("position", new THREE.BufferAttribute(base, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    return g;
  }, [count]);

  useFrame(({ clock }) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <points geometry={geo} frustumCulled={false}>
      <shaderMaterial
        ref={matRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uTime: { value: 0 },
          uZ0: { value: Z0 },
          uDepth: { value: DEPTH },
          uBlue: { value: BLUE },
          uViolet: { value: VIOLET },
        }}
        vertexShader={/* glsl */ `
          attribute float aSeed;
          uniform float uTime, uZ0, uDepth;
          varying float vMix;
          void main() {
            vec3 p = position;
            float travel = mod(uTime * 46.0 * aSeed + aSeed * 900.0, uDepth);
            p.z = uZ0 - mod((uZ0 - p.z) + travel, uDepth);
            vMix = fract(aSeed * 7.3);
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_PointSize = (110.0 / -mv.z) * (0.6 + aSeed);
            gl_Position = projectionMatrix * mv;
          }
        `}
        fragmentShader={/* glsl */ `
          uniform vec3 uBlue, uViolet;
          varying float vMix;
          void main() {
            vec2 d = gl_PointCoord - 0.5;
            float a = smoothstep(0.5, 0.0, length(d));
            gl_FragColor = vec4(mix(uBlue, uViolet, vMix), a * 0.85);
          }
        `}
      />
    </points>
  );
}

/* ---------- Lõi dữ liệu trung tâm ---------- */
function DataCore() {
  const shell = useRef<THREE.LineSegments>(null);
  const inner = useRef<THREE.Mesh>(null);
  const rings = useRef<THREE.Group>(null);
  const R = WORLD.dataSpace.coreRadius;

  const wire = useMemo(() => new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(R, 2)), [R]);

  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime;
    if (shell.current) {
      shell.current.rotation.y += dt * 0.16;
      shell.current.rotation.x = Math.sin(t * 0.2) * 0.14;
    }
    if (rings.current) rings.current.rotation.z += dt * 0.32;
    if (inner.current) {
      const s = 1 + Math.sin(t * 2.1) * 0.045;
      inner.current.scale.setScalar(s);
    }
  });

  return (
    <group position={WORLD.dataSpace.core as unknown as [number, number, number]}>
      <lineSegments ref={shell} geometry={wire}>
        <lineBasicMaterial color="#7bb8ff" transparent opacity={0.55} blending={THREE.AdditiveBlending} toneMapped={false} />
      </lineSegments>
      <mesh ref={inner}>
        <icosahedronGeometry args={[R * 0.62, 1]} />
        <meshBasicMaterial color="#1b3a78" transparent opacity={0.85} toneMapped={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[R * 0.42, 20, 20]} />
        <meshBasicMaterial color="#a9d0ff" toneMapped={false} />
      </mesh>
      <group ref={rings}>
        {[1.5, 1.9, 2.35].map((k, i) => (
          <mesh key={k} rotation={[Math.PI / 2 + i * 0.5, i * 0.4, 0]}>
            <torusGeometry args={[R * k, 0.12, 8, 72]} />
            <meshBasicMaterial
              color={i === 1 ? "#a78bfa" : "#57a3ff"}
              transparent
              opacity={0.7}
              blending={THREE.AdditiveBlending}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ---------- Vài "bảng dữ liệu" trôi trong hành lang ---------- */
function FloatingPanels() {
  const gridTex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const g = c.getContext("2d")!;
    g.clearRect(0, 0, 128, 128);
    g.strokeStyle = "rgba(87,163,255,0.5)";
    g.lineWidth = 1;
    for (let i = 0; i <= 128; i += 16) {
      g.beginPath();
      g.moveTo(i, 0);
      g.lineTo(i, 128);
      g.moveTo(0, i);
      g.lineTo(128, i);
      g.stroke();
    }
    /* đường biểu đồ */
    g.strokeStyle = "rgba(167,139,250,0.9)";
    g.lineWidth = 2.5;
    g.beginPath();
    g.moveTo(4, 100);
    for (let x = 4; x < 128; x += 12) g.lineTo(x, 100 - Math.random() * 70);
    g.stroke();
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);

  const panels = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        pos: [
          (i % 2 ? 1 : -1) * (34 + Math.random() * 34),
          CY + (Math.random() - 0.5) * 60,
          Z0 - 40 - Math.random() * (DEPTH - 90),
        ] as [number, number, number],
        rot: (i % 2 ? -1 : 1) * (0.4 + Math.random() * 0.4),
        s: 12 + Math.random() * 14,
      })),
    []
  );

  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.children.forEach((c, i) => {
      c.position.y += Math.sin(clock.elapsedTime * 0.6 + i) * 0.012;
    });
  });

  return (
    <group ref={ref}>
      {panels.map((p, i) => (
        <mesh key={i} position={p.pos} rotation={[0, p.rot, 0]}>
          <planeGeometry args={[p.s * 1.4, p.s]} />
          <meshBasicMaterial
            map={gridTex}
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

export function DataSpaceLayer({ light = false }: { light?: boolean }) {
  const circuit = useCircuitGeometry(light ? 22 : 46);
  const ref = useLayerWindow(LAYER_WINDOWS.dataSpace, (p, g) => {
    /* Toàn bộ tầng dữ liệu mờ vào/ra để nối liền với 2 cảnh kề */
    const fadeIn = Math.min(1, Math.max(0, (p - 0.27) / 0.05));
    const fadeOut = 1 - Math.min(1, Math.max(0, (p - 0.66) / 0.07));
    const a = fadeIn * fadeOut;
    g.traverse((o) => {
      const mat = (o as THREE.Mesh).material as THREE.Material | undefined;
      if (!mat || !mat.transparent || typeof (mat as THREE.MeshBasicMaterial).opacity !== "number") return;
      const m = mat as THREE.MeshBasicMaterial;
      if (m.userData.baseOpacity === undefined) m.userData.baseOpacity = m.opacity;
      m.opacity = m.userData.baseOpacity * a;
    });
  });

  return (
    <group ref={ref}>
      <lineSegments geometry={circuit}>
        <lineBasicMaterial vertexColors transparent opacity={0.5} blending={THREE.AdditiveBlending} toneMapped={false} />
      </lineSegments>
      <DataStreams count={light ? 500 : 1400} />
      <FloatingPanels />
      <DataCore />
    </group>
  );
}
