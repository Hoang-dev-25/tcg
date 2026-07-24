# /v6 "Một chuyến bay đêm" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Thay wireframe 2.5D của `/v6` bằng trải nghiệm 3D WebGL "Một chuyến bay đêm" — một cú máy drone liền mạch qua 6 frame, scrub theo scroll, theo spec `docs/superpowers/specs/2026-07-24-v6-night-flight-design.md`.

**Architecture:** Hai tầng — Canvas R3F fixed (z-0) render thành phố instanced + biển neon + bản đồ VN; DOM overlay (z-10) chứa toàn bộ chữ/form. Cầu nối duy nhất là module ref `scrollState` do ScrollTrigger ghi, `useFrame` đọc; camera sample từ mảng keyframe thuần (tương đương một timeline scrub duy nhất, dễ chỉnh số hơn GSAP tween trong canvas). Không `setState` theo frame.

**Tech Stack:** Next 14 (app router) · React 18 · three + @react-three/fiber@8 + @react-three/postprocessing@2 · GSAP ScrollTrigger + Lenis (đã có) · Tailwind.

## Global Constraints

- React 18.3 / Next 14.2 → BẮT BUỘC `@react-three/fiber@^8` (KHÔNG dùng v9, v9 cần React 19). Không cài drei.
- Nền `#04091a`; neon cyan `#38bdf8` CHỈ trên mặt biển quảng cáo; cửa sổ vàng ấm `#ffb75e` cường độ thấp (luật 2 của spec).
- Không HUD/nhãn kỹ thuật/hạt bay thường trực; hiệu ứng chỉ gắn với chuyển động camera (luật 3).
- Không `setState` chạy theo frame; cầu nối duy nhất là `scrollState` trong `components/v6/experience/progress.ts`.
- Chữ luôn là DOM; số dùng `font-mono tabular-nums`; copy lấy từ `lib/v3-data.ts` + `components/v6/data.ts`, không bịa mới.
- Repo không có test framework → mỗi task kiểm chứng bằng `npx tsc --noEmit` + `npm run build` + checkpoint browser mô tả cụ thể. Không thêm jest/vitest.
- DPR kẹp `[1, 1.75]`, không shadow map.
- Track cuộn cao `1400vh`; mốc progress 6 frame (hold): F1 `0–0.06`, F2 `0.16–0.33`, F3 `0.38–0.58`, F4 `0.62–0.70`, F5 `0.78–0.86`, F6 `0.92–1`.

---

### Task 1: Dependencies + khung trang + cầu nối scroll

**Files:**
- Modify: `package.json` (qua npm install)
- Create: `components/v6/experience/progress.ts`
- Create: `components/v6/experience/Experience.tsx`
- Create: `components/v6/experience/Scene.tsx`
- Modify: `app/v6/page.tsx`, `app/v6/layout.tsx`, `app/v6/v6.css` (viết lại)

**Interfaces:**
- Produces: `scrollState: { progress: number }` (0→1 toàn trang); `<V6Experience />`; Scene chứa placeholder box để smoke-test.

- [ ] **Step 1: Cài dependency**

```bash
npm install three @react-three/fiber@^8.17.0 @react-three/postprocessing@^2.16.0
```

Kiểm tra: `npm ls @react-three/fiber` in ra bản 8.x, không lỗi peer với react@18.

- [ ] **Step 2: Viết `progress.ts`**

```ts
/* Cầu nối duy nhất giữa ScrollTrigger (ghi) và useFrame (đọc).
   Module ref — không setState theo frame. */
export const scrollState = {
  progress: 0, // 0 → 1 trên toàn track 1400vh
};
```

- [ ] **Step 3: Viết `Experience.tsx`** — track 1400vh + Lenis + ScrollTrigger ghi progress; Canvas load động (ssr:false)

```tsx
"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import { scrollState } from "./progress";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export function V6Experience() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const st = ScrollTrigger.create({
      trigger: trackRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        scrollState.progress = self.progress;
      },
    });

    return () => {
      st.kill();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-[#04091a]">
      {/* Track cuộn — chiều cao quyết định độ dài "phim" */}
      <div ref={trackRef} style={{ height: "1400vh" }} />
      <div className="fixed inset-0 z-0">
        <Scene />
      </div>
      {/* Overlay DOM gắn ở Task 7 */}
    </div>
  );
}
```

- [ ] **Step 4: Viết `Scene.tsx`** (smoke test — một box + đèn, sẽ thay dần)

```tsx
"use client";

import { Canvas } from "@react-three/fiber";

export default function Scene() {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ fov: 55, near: 0.5, far: 6000, position: [120, 300, 260] }}>
      <color attach="background" args={["#04091a"]} />
      <fog attach="fog" args={["#04091a", 120, 900]} />
      <ambientLight intensity={0.25} />
      <mesh>
        <boxGeometry args={[20, 20, 20]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.6} />
      </mesh>
    </Canvas>
  );
}
```

- [ ] **Step 5: Viết lại `app/v6/page.tsx` + `layout.tsx` + `v6.css`**

`page.tsx`:

```tsx
import { V6Experience } from "@/components/v6/experience/Experience";

/**
 * v6 — "Một chuyến bay đêm": một cú máy drone 3D WebGL liền mạch qua 6 frame,
 * scroll scrub toàn bộ. Spec: docs/superpowers/specs/2026-07-24-v6-night-flight-design.md
 */
export default function V6Page() {
  return <V6Experience />;
}
```

`layout.tsx` (bỏ khóa fixed — giờ cuộn trên document thật):

```tsx
import type { Metadata } from "next";

import "./v6.css";

export const metadata: Metadata = {
  title: "Toàn Cầu ADV — Một chuyến bay đêm qua thành phố quảng cáo",
  description:
    "Trải nghiệm 3D: một chuyến bay drone xuyên thành phố đêm — billboard, pano, màn hình LED, 20 năm Toàn Cầu ADV, bản đồ dự án toàn quốc.",
};

export default function V6Layout({ children }: { children: React.ReactNode }) {
  return <div className="bg-[#04091a] text-slate-100 antialiased">{children}</div>;
}
```

`v6.css` (viết lại từ đầu — chỉ style DOM overlay):

```css
/* ===== v6 "Một chuyến bay đêm" — style cho DOM overlay ===== */

.v6-label {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.6875rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(148, 197, 253, 0.75);
}

/* Card kính mờ cho chữ nổi trên cảnh 3D */
.v6-card {
  border: 1px solid rgba(96, 165, 250, 0.35);
  background: rgba(6, 12, 30, 0.55);
  backdrop-filter: blur(6px);
}
```

- [ ] **Step 6: Kiểm chứng**

```bash
npx tsc --noEmit && npm run build
```

Expected: PASS. Chạy `npm run dev`, mở `/v6`: nền navy, box cyan giữa khung, trang cuộn được ~14 màn hình, không lỗi console.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json components/v6/experience app/v6
git commit -m "feat(v6): khung 3D — Canvas R3F, track 1400vh, Lenis + ScrollTrigger ghi scrollState"
```

---

### Task 2: `data.ts` — gom nội dung

**Files:**
- Create: `components/v6/data.ts`

**Interfaces:**
- Produces: `MILESTONES`, `SERVICES`, `PINS`, `MAP_STATS`, `AI_STATS`, `VN_OUTLINE`, `pinToWorld(x,y)`. Hằng `MAP_SCALE = 40`, TP.HCM (52%, 79%) neo về gốc tọa độ (0,0) — mốc neo tỉ lệ theo spec mục 6.4.

- [ ] **Step 1: Viết `data.ts`** (data chuyển nguyên văn từ `stages.tsx`, thêm phần bản đồ)

```ts
/* Nội dung /v6 — chuyển từ wireframe cũ, KHÔNG bịa số liệu mới (spec mục 4). */

export const MILESTONES = [
  { year: "2005", title: "Văn phòng đầu tiên", note: "Khởi đầu tại TP. Hồ Chí Minh với 5 thành viên" },
  { year: "2009", title: "Billboard đầu tay", note: "Biển tấm lớn đầu tiên trên trục QL1A" },
  { year: "2014", title: "100 khách hàng", note: "Cột mốc 100 nhãn hàng đồng hành" },
  { year: "2019", title: "Mạng lưới LED", note: "Phủ màn hình LED tại 30 tỉnh thành" },
  { year: "2024", title: "Nền tảng AI", note: "Ra mắt hệ thống dữ liệu + AI đo lường" },
];

export const SERVICES = [
  { name: "Billboard", desc: "Biển tấm lớn truyền thống — vị trí cửa ngõ, quốc lộ, vòng xoay." },
  { name: "Pano", desc: "In UV chất liệu bạt, chịu thời tiết, bảo trì định kỳ." },
  { name: "Màn hình LED", desc: "Độ phân giải cao, đổi nội dung và quản lý từ xa." },
];

/* Toạ độ % trên khung bản đồ (gốc từ wireframe cũ) */
export const PINS = [
  { name: "Hà Nội", x: 46, y: 16 },
  { name: "Hải Phòng", x: 55, y: 20 },
  { name: "Đà Nẵng", x: 68, y: 47 },
  { name: "Nha Trang", x: 73, y: 61 },
  { name: "TP.HCM", x: 52, y: 79 },
  { name: "Cần Thơ", x: 44, y: 85 },
];

export const MAP_STATS = [
  { value: "500+", label: "dự án đã thi công" },
  { value: "200+", label: "khách hàng" },
  { value: "10M+", label: "lượt nhìn mỗi ngày" },
];

export const AI_STATS = [
  { value: "1.183.420", label: "lượt nhìn hôm nay" },
  { value: "3,8%", label: "tỷ lệ chuyển đổi trung bình" },
  { value: "214", label: "màn hình đang phát · 30 tỉnh thành" },
];

/* Đường bao VN trong hệ 220×420 (gốc từ SVG wireframe cũ) */
export const VN_OUTLINE: Array<[number, number]> = [
  [104, 16], [128, 30], [126, 58], [112, 72], [118, 96], [134, 130], [152, 172],
  [164, 214], [166, 252], [156, 296], [134, 330], [110, 356], [92, 378], [84, 354],
  [98, 324], [118, 296], [128, 262], [124, 228], [106, 190], [90, 152], [80, 118],
  [68, 92], [60, 64], [76, 44],
];

/* TP.HCM (52%, 79%) neo về gốc thế giới (0,0) — mốc neo tỉ lệ (spec 6.4).
   1% bản đồ = MAP_SCALE đơn vị thế giới. */
export const MAP_SCALE = 40;
export function pinToWorld(xPct: number, yPct: number): [number, number] {
  return [(xPct - 52) * MAP_SCALE, (yPct - 79) * MAP_SCALE];
}
```

- [ ] **Step 2: Kiểm chứng + commit**

```bash
npx tsc --noEmit
git add components/v6/data.ts
git commit -m "feat(v6): data.ts — nội dung 6 frame + hệ toạ độ bản đồ neo TP.HCM"
```

---

### Task 3: `City.tsx` — thành phố instanced + đại lộ + con đường 20 năm

**Files:**
- Create: `components/v6/experience/City.tsx`
- Modify: `components/v6/experience/Scene.tsx` (thay box bằng City)

**Interfaces:**
- Produces: `<City count={number} />`. Bố cục thế giới (các task sau dựa vào): mặt đất y=0; đại lộ rộng 24 đơn vị dọc trục z tại x∈[−12,12], không có nhà; thành phố trải x,z∈[−280,280]; con đường 20 năm là chính đại lộ kéo dài tới z=−460. Seeded random cố định (seed 20051) — cùng thành phố mọi lần tải.

- [ ] **Step 1: Viết `City.tsx`**

```tsx
"use client";

import { useMemo } from "react";
import * as THREE from "three";

/* PRNG seeded — cùng seed = cùng thành phố (spec 6.3) */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* Texture cửa sổ vàng ấm vẽ bằng canvas — emissive map dùng chung mọi tòa */
function makeWindowTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 64; c.height = 128;
  const g = c.getContext("2d")!;
  g.fillStyle = "#05070f";
  g.fillRect(0, 0, 64, 128);
  const rnd = mulberry32(7);
  for (let y = 4; y < 124; y += 8) {
    for (let x = 4; x < 60; x += 8) {
      if (rnd() < 0.42) {
        g.fillStyle = rnd() < 0.85 ? "rgba(255,183,94,0.85)" : "rgba(210,225,255,0.7)";
        g.fillRect(x, y, 4, 5);
      }
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function City({ count = 400 }: { count?: number }) {
  const { matrices, windowTex } = useMemo(() => {
    const rnd = mulberry32(20051);
    const mats: THREE.Matrix4[] = [];
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const up = new THREE.Vector3(0, 1, 0);
    while (mats.length < count) {
      const x = (rnd() - 0.5) * 560;
      const z = (rnd() - 0.5) * 560 - 100;
      if (Math.abs(x) < 14) continue; // chừa đại lộ
      const h = 10 + rnd() * rnd() * 80;
      const w = 8 + rnd() * 14;
      const d = 8 + rnd() * 14;
      q.setFromAxisAngle(up, rnd() < 0.1 ? Math.PI / 4 : 0);
      m.compose(new THREE.Vector3(x, h / 2, z), q, new THREE.Vector3(w, h, d));
      mats.push(m.clone());
    }
    return { matrices: mats, windowTex: makeWindowTexture() };
  }, [count]);

  return (
    <group>
      {/* Tòa nhà — MỘT InstancedMesh (spec 6.3) */}
      <instancedMesh
        args={[undefined, undefined, matrices.length]}
        ref={(mesh) => {
          if (!mesh) return;
          matrices.forEach((mat, i) => mesh.setMatrixAt(i, mat));
          mesh.instanceMatrix.needsUpdate = true;
        }}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#0a1226"
          emissive="#ffffff"
          emissiveMap={windowTex}
          emissiveIntensity={0.55}
          roughness={0.9}
        />
      </instancedMesh>

      {/* Mặt đất */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[4000, 4000]} />
        <meshStandardMaterial color="#050a18" roughness={1} />
      </mesh>

      {/* Đại lộ — dải sáng hơn nền một chút, chạy tới hết con đường 20 năm */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, -80]}>
        <planeGeometry args={[24, 900]} />
        <meshStandardMaterial color="#0b1430" roughness={0.85} />
      </mesh>
      {/* Vạch tim đường phát sáng mờ — vệt dẫn mắt cho cú bay */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, -80]}>
        <planeGeometry args={[0.6, 900]} />
        <meshBasicMaterial color="#1d3a6e" />
      </mesh>
    </group>
  );
}
```

- [ ] **Step 2: Gắn vào `Scene.tsx`** (thay `<mesh>` box bằng)

```tsx
import { City } from "./City";
// ... trong <Canvas>, thay khối <mesh> box:
<City count={400} />
<directionalLight position={[200, 400, 100]} intensity={0.35} color="#8fb4ff" />
```

(Giữ ambientLight 0.25; giữ fog.)

- [ ] **Step 3: Kiểm chứng**

`npx tsc --noEmit` PASS. Browser: thấy thành phố khối hộp cửa sổ vàng lấm tấm từ trên cao, một đại lộ trống chạy dọc, chân trời chìm vào sương navy. Không tòa nhà nào màu neon.

- [ ] **Step 4: Commit**

```bash
git add components/v6/experience
git commit -m "feat(v6): City — 400 tòa instanced seeded, cửa sổ vàng ấm, đại lộ + nền"
```

---

### Task 4: `cameraPath.ts` + `CameraRig.tsx` — đường bay 6 frame

**Files:**
- Create: `components/v6/experience/cameraPath.ts`
- Create: `components/v6/experience/CameraRig.tsx`
- Modify: `components/v6/experience/Scene.tsx`

**Interfaces:**
- Consumes: `scrollState.progress`.
- Produces: `sampleCamera(p: number, out: CameraSample): void` với `type CameraSample = { pos: THREE.Vector3; look: THREE.Vector3; fov: number; roll: number }`; `KEYFRAMES` (mảng chỉnh số duy nhất — mọi tinh chỉnh đường bay chỉ sửa ở đây); `<CameraRig />` áp sample vào camera + chỉnh fog theo độ cao. Task 5–6 đặt vật thể theo các toạ độ look dưới đây.

- [ ] **Step 1: Viết `cameraPath.ts`**

```ts
import * as THREE from "three";

export type CameraSample = {
  pos: THREE.Vector3;
  look: THREE.Vector3;
  fov: number;
  roll: number;
};

type Key = {
  t: number;                       // progress 0..1
  pos: [number, number, number];
  look: [number, number, number];
  fov?: number;                    // mặc định 55
  ease?: (u: number) => number;    // ease của CHẶNG kết thúc tại key này
};

const easeInOut = (u: number) => u * u * (3 - 2 * u);
const easeIn = (u: number) => u * u * u;
const easeOut = (u: number) => 1 - Math.pow(1 - u, 3);

/* ==== BẢNG CHỈNH SỐ DUY NHẤT của đường bay ====
   Mốc frame (hold = pos/look đứng yên giữa 2 key giống nhau):
   F1 0–.06 · bay 1→2 · F2 3 điểm dừng .16–.33 · bay 2→3 · F3 5 mốc .38–.58
   · bay 3→4 · F4 .62–.70 · dolly-out · F5 .78–.86 · lao vào LED · F6 .92–1 */
export const KEYFRAMES: Key[] = [
  { t: 0.0,  pos: [120, 300, 260],  look: [0, 26, -60] },
  { t: 0.06, pos: [120, 300, 260],  look: [0, 26, -60] },                       // hold F1
  { t: 0.11, pos: [60, 120, 120],   look: [0, 22, -60], fov: 64, ease: easeIn }, // hạ + FOV kick
  { t: 0.16, pos: [-4, 8, -16],     look: [14, 12, -40], ease: easeOut },
  { t: 0.20, pos: [-4, 8, -16],     look: [14, 12, -40] },                      // hold billboard
  { t: 0.24, pos: [3, 10, -62],     look: [-16, 20, -85], ease: easeInOut },
  { t: 0.27, pos: [3, 10, -62],     look: [-16, 20, -85] },                     // hold pano
  { t: 0.30, pos: [-3, 7, -103],    look: [13, 9, -125], ease: easeInOut },
  { t: 0.33, pos: [-3, 7, -103],    look: [13, 9, -125] },                      // hold LED
  { t: 0.38, pos: [0, 12, -158],    look: [0, 9, -260], fov: 58, ease: easeInOut },
  { t: 0.41, pos: [0, 10, -168],    look: [-10, 8, -210] },                     // mốc 2005
  { t: 0.445,pos: [0, 10, -218],    look: [10, 8, -260], ease: easeInOut },     // mốc 2009
  { t: 0.48, pos: [0, 10, -268],    look: [-10, 8, -310], ease: easeInOut },    // mốc 2014
  { t: 0.515,pos: [0, 10, -318],    look: [10, 8, -360], ease: easeInOut },     // mốc 2019
  { t: 0.55, pos: [0, 10, -368],    look: [-10, 8, -410], ease: easeInOut },    // mốc 2024
  { t: 0.58, pos: [0, 10, -368],    look: [-10, 8, -410] },                     // hold cuối F3
  { t: 0.62, pos: [0, 150, -240],   look: [0, 0, -110], ease: easeInOut },      // ngẩng lên tầng AI
  { t: 0.70, pos: [0, 150, -240],   look: [0, 0, -110] },                       // hold F4
  { t: 0.78, pos: [150, 2600, -400],look: [120, 0, -1150], fov: 60, ease: easeIn }, // dolly-out bản đồ
  { t: 0.86, pos: [150, 2600, -400],look: [120, 0, -1150], fov: 55 },           // hold F5
  { t: 0.92, pos: [0, 40, 26],      look: [0, 40, -20], fov: 50, ease: easeInOut }, // lao vào LED
  { t: 1.0,  pos: [0, 40, 26],      look: [0, 40, -20], fov: 50 },              // hold F6
];

const vA = new THREE.Vector3();
const vB = new THREE.Vector3();

export function sampleCamera(p: number, out: CameraSample): void {
  const t = THREE.MathUtils.clamp(p, 0, 1);
  let i = KEYFRAMES.length - 2;
  for (let k = 0; k < KEYFRAMES.length - 1; k++) {
    if (t >= KEYFRAMES[k].t && t <= KEYFRAMES[k + 1].t) { i = k; break; }
  }
  const a = KEYFRAMES[i];
  const b = KEYFRAMES[i + 1];
  const span = Math.max(b.t - a.t, 1e-6);
  const u = (b.ease ?? easeInOut)((t - a.t) / span);

  out.pos.copy(vA.fromArray(a.pos).lerp(vB.fromArray(b.pos), u));
  out.look.copy(vA.fromArray(a.look).lerp(vB.fromArray(b.look), u));
  out.fov = THREE.MathUtils.lerp(a.fov ?? 55, b.fov ?? 55, u);
  out.roll = 0; // roll gắn ở Task 9 (hiệu ứng mạnh)
}
```

- [ ] **Step 2: Viết `CameraRig.tsx`**

```tsx
"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import { scrollState } from "./progress";
import { sampleCamera, type CameraSample } from "./cameraPath";

export function CameraRig() {
  const scene = useThree((s) => s.scene);
  const sample = useRef<CameraSample>({
    pos: new THREE.Vector3(),
    look: new THREE.Vector3(),
    fov: 55,
    roll: 0,
  });

  useFrame(({ camera }) => {
    const s = sample.current;
    sampleCamera(scrollState.progress, s);
    camera.position.copy(s.pos);
    camera.lookAt(s.look);
    if (s.roll !== 0) camera.rotateZ(s.roll);
    const cam = camera as THREE.PerspectiveCamera;
    if (Math.abs(cam.fov - s.fov) > 0.01) {
      cam.fov = s.fov;
      cam.updateProjectionMatrix();
    }
    /* Fog nới xa dần theo độ cao camera — để cảnh bản đồ không bị sương nuốt */
    const fog = scene.fog as THREE.Fog | null;
    if (fog) fog.far = THREE.MathUtils.clamp(900 + s.pos.y * 2.2, 900, 7000);
  });

  return null;
}
```

- [ ] **Step 3: Gắn `<CameraRig />` vào `Scene.tsx`** (trong `<Canvas>`, cạnh `<City/>`).

- [ ] **Step 4: Kiểm chứng**

`npx tsc --noEmit` PASS. Browser: cuộn chậm từ đầu tới cuối — camera đi đủ: nhìn từ cao → hạ xuống đại lộ → 3 điểm dừng quay trái/phải → chạy dọc đường nhìn xen kẽ 2 bên → bốc lên nhìn xuống → vọt lên rất cao → hạ xuống khung nhìn thẳng (chưa có vật ở 2 cảnh cuối — chấp nhận). Dừng cuộn thì hình đứng yên. Không giật khựng giữa chặng.

- [ ] **Step 5: Commit**

```bash
git add components/v6/experience
git commit -m "feat(v6): CameraRig — 22 keyframe scrub, hold từng frame, fog theo độ cao"
```

---

### Task 5: `Billboards.tsx` — biển hero, biển năm, halo

**Files:**
- Create: `components/v6/experience/Billboards.tsx`
- Modify: `components/v6/experience/Scene.tsx`

**Interfaces:**
- Consumes: toạ độ look của Task 4: billboard hero F1/F2 `(14,12,-40)` hướng mặt về −x; pano `(-16,20,-85)` mặt về +x; LED cong `(13,9,-125)` mặt về −x; 5 biển năm tại `(±10, 8, -210/-260/-310/-360/-410)`; màn LED liên hệ `(0,40,-20)` mặt về +z.
- Produces: `<Billboards />` (tất cả vật thể trên + halo sprite); export `makeTextTexture(lines: string[], w?: number, h?: number): THREE.CanvasTexture` cho Task 9 tái dùng.

- [ ] **Step 1: Viết `Billboards.tsx`**

```tsx
"use client";

import { useMemo } from "react";
import * as THREE from "three";

/* Texture chữ vẽ canvas — CHỈ dùng cho nội dung trên mặt biển (năm, logo mẫu).
   Chữ nội dung trang vẫn là DOM (spec 6.2). */
export function makeTextTexture(lines: string[], w = 512, h = 256): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  const g = c.getContext("2d")!;
  g.fillStyle = "#03101f";
  g.fillRect(0, 0, w, h);
  g.fillStyle = "#aee9ff";
  g.textAlign = "center";
  g.textBaseline = "middle";
  const size = Math.floor(h / (lines.length + 1.2));
  g.font = `700 ${size}px ui-monospace, Menlo, monospace`;
  lines.forEach((line, i) => {
    g.fillText(line, w / 2, (h / (lines.length + 1)) * (i + 1));
  });
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

const NEON = "#38bdf8";

/* Sprite halo — glow rẻ quanh mặt biển (spec 6.3: không bloom ở tier thấp) */
function Halo({ position, scale }: { position: [number, number, number]; scale: number }) {
  const tex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const g = c.getContext("2d")!;
    const grad = g.createRadialGradient(64, 64, 6, 64, 64, 64);
    grad.addColorStop(0, "rgba(90,200,255,0.55)");
    grad.addColorStop(1, "rgba(90,200,255,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  }, []);
  return (
    <sprite position={position} scale={[scale, scale, 1]}>
      <spriteMaterial map={tex} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
    </sprite>
  );
}

/* Một biển: khung tối + mặt phát sáng quay theo rotY */
function Board({
  position, rotY, w, h, face,
}: {
  position: [number, number, number]; rotY: number; w: number; h: number; face: THREE.Texture | null;
}) {
  return (
    <group position={position} rotation={[0, rotY, 0]}>
      {/* Cột + khung */}
      <mesh position={[0, -position[1] / 2, -0.6]}>
        <boxGeometry args={[1.2, position[1], 1.2]} />
        <meshStandardMaterial color="#0a1226" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0, -0.35]}>
        <boxGeometry args={[w + 1, h + 1, 0.6]} />
        <meshStandardMaterial color="#101a35" roughness={0.8} />
      </mesh>
      {/* Mặt biển — vật duy nhất mang neon (luật 2) */}
      <mesh>
        <planeGeometry args={[w, h]} />
        <meshStandardMaterial
          color="#031018"
          emissive={NEON}
          emissiveMap={face ?? undefined}
          emissiveIntensity={face ? 1.6 : 1.1}
          toneMapped={false}
        />
      </mesh>
      <Halo position={[0, 0, 1.5]} scale={Math.max(w, h) * 1.9} />
    </group>
  );
}

export function Billboards() {
  const logoTex = useMemo(() => makeTextTexture(["TOÀN CẦU", "ADV"]), []);
  const yearTex = useMemo(
    () => ["2005", "2009", "2014", "2019", "2024"].map((y) => makeTextTexture([y], 256, 256)),
    []
  );

  return (
    <group>
      {/* F1/F2 · Billboard hero — camera F1 nhìn thẳng vào nó từ trên cao */}
      <Board position={[14, 12, -40]} rotY={-Math.PI / 2} w={24} h={13} face={logoTex} />

      {/* F2 · Pano ốp tường — dựng kèm một tòa "chủ" ngay sau */}
      <group>
        <mesh position={[-22, 20, -85]}>
          <boxGeometry args={[12, 40, 18]} />
          <meshStandardMaterial color="#0a1226" roughness={0.9} />
        </mesh>
        <Board position={[-15.8, 20, -85]} rotY={Math.PI / 2} w={14} h={26} face={null} />
      </group>

      {/* F2 · Màn LED cong — trụ cong phát sáng */}
      <group position={[13, 9, -125]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh>
          <cylinderGeometry args={[10, 10, 12, 24, 1, true, -0.6, 1.2]} />
          <meshStandardMaterial
            color="#031018"
            emissive={NEON}
            emissiveIntensity={1.2}
            side={THREE.DoubleSide}
            toneMapped={false}
          />
        </mesh>
        <Halo position={[0, 0, 8]} scale={30} />
      </group>

      {/* F3 · 5 biển năm dọc con đường 20 năm, so le trái phải */}
      {yearTex.map((tex, i) => (
        <Board
          key={i}
          position={[i % 2 === 0 ? -10 : 10, 8, -210 - i * 50]}
          rotY={i % 2 === 0 ? Math.PI / 2 : -Math.PI / 2}
          w={9}
          h={9}
          face={tex}
        />
      ))}

      {/* F6 · Màn LED liên hệ — camera kết thúc vuông góc trước mặt nó */}
      <group position={[0, 40, -20]}>
        <mesh>
          <planeGeometry args={[64, 36]} />
          <meshStandardMaterial color="#04101e" emissive={NEON} emissiveIntensity={0.35} toneMapped={false} />
        </mesh>
        <mesh position={[0, 0, -0.5]}>
          <boxGeometry args={[66, 38, 0.8]} />
          <meshStandardMaterial color="#101a35" />
        </mesh>
      </group>
    </group>
  );
}
```

- [ ] **Step 2: Gắn `<Billboards />` vào `Scene.tsx`.**

- [ ] **Step 3: Kiểm chứng**

Browser theo từng mốc cuộn: F1 thấy billboard "TOÀN CẦU ADV" sáng cyan giữa thành phố; 3 điểm dừng F2 lần lượt đối diện billboard/pano/LED cong; F3 lướt qua 5 biển năm so le; F6 kết thúc trước màn LED lớn chiếm gần trọn khung. Chỉ các mặt biển có màu cyan.

- [ ] **Step 4: Commit**

```bash
git add components/v6/experience
git commit -m "feat(v6): Billboards — biển hero 3 dịch vụ, 5 biển năm, màn LED liên hệ, halo sprite"
```

---

### Task 6: `VietnamLights.tsx` — bản đồ đèn khớp neo TP.HCM

**Files:**
- Create: `components/v6/experience/VietnamLights.tsx`
- Modify: `components/v6/experience/Scene.tsx`

**Interfaces:**
- Consumes: `VN_OUTLINE`, `PINS`, `pinToWorld`, `MAP_SCALE` (Task 2); camera F5 nhìn từ `(150,2600,-400)` xuống `(120,0,-1150)` (Task 4).
- Produces: `<VietnamLights />` — outline VN bằng chấm đèn + 6 cụm pin; TP.HCM trùng gốc (0,0) nên thành phố 3D chính là cụm sáng TP.HCM khi nhìn từ cao (một không gian liền, không cắt scene — spec 6.4).

- [ ] **Step 1: Viết `VietnamLights.tsx`**

```tsx
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
```

- [ ] **Step 2: Gắn `<VietnamLights />` vào `Scene.tsx`.**

- [ ] **Step 3: Kiểm chứng**

Browser: cuộn tới 0.78–0.86 — thấy dáng chữ S Việt Nam bằng chấm đèn xanh, 6 cụm sáng đậm; cụm TP.HCM trùng vị trí thành phố 3D (thành phố thu nhỏ thành đúng cụm đó khi dolly-out — nhìn chuyển cảnh 4→5 phải liền, không "nhảy"). Ở các frame mặt đất (F1–F3) các chấm bản đồ không lọt vào khung (chúng nằm xa + fog che).

- [ ] **Step 4: Commit**

```bash
git add components/v6/experience
git commit -m "feat(v6): VietnamLights — bản đồ VN bằng chấm đèn, neo TP.HCM trùng gốc thành phố"
```

---

### Task 7: Overlay DOM — 6 block chữ + form + điều hướng

**Files:**
- Create: `components/v6/overlay/Overlay.tsx`
- Create: `components/v6/overlay/ContactForm.tsx`
- Modify: `components/v6/experience/Experience.tsx` (mount Overlay)

**Interfaces:**
- Consumes: mốc hold của Task 4; `MILESTONES`, `SERVICES`, `MAP_STATS`, `AI_STATS` (Task 2); `leadForm` từ `lib/v3-data`.
- Produces: `<V6Overlay />` — mỗi block gắn `data-range="a,b"` (progress hiện/ẩn); một ScrollTrigger riêng trong Overlay đọc cùng track qua `document` scroll (không đụng `scrollState`); nav 6 dot + progress bar; click dot cuộn tới progress mốc.

- [ ] **Step 1: Viết `ContactForm.tsx`** (chuyển logic submit từ `stages.tsx` cũ, style mới)

```tsx
"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { leadForm } from "@/lib/v3-data";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [agree, setAgree] = useState(false);

  if (submitted) {
    return (
      <div className="v6-card grid place-content-center justify-items-center gap-2.5 p-8 text-center">
        <CheckCircle2 className="h-10 w-10 text-cyan-300" />
        <strong className="font-sans text-2xl text-white">Đã nhận yêu cầu của bạn</strong>
        <p className="text-sm text-slate-300">Chúng tôi sẽ liên hệ trong 24h làm việc.</p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="v6-card mt-2 inline-flex h-11 items-center px-5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-cyan-400/10"
        >
          Gửi yêu cầu khác
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
      className="v6-card grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 sm:p-6"
    >
      {leadForm.fields.map((f) => (
        <label key={f.label} className="flex flex-col gap-1 border border-dashed border-blue-300/30 px-3 py-2">
          <span className="v6-label">
            {f.label}
            {f.required && <span className="text-rose-400"> *</span>}
          </span>
          <input
            required={f.required}
            placeholder={f.placeholder}
            className="bg-transparent font-sans text-sm text-white outline-none placeholder:text-slate-500"
          />
        </label>
      ))}
      <label className="flex items-center gap-2.5 text-sm text-slate-300">
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="h-4 w-4 accent-cyan-400"
        />
        Đồng ý nhận liên hệ
      </label>
      <button
        type="submit"
        disabled={!agree}
        className="v6-card inline-flex h-12 items-center justify-center gap-2 px-6 font-mono text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:bg-cyan-400/10 disabled:cursor-not-allowed disabled:opacity-45 sm:justify-self-end"
      >
        Liên hệ ngay <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}
```

- [ ] **Step 2: Viết `Overlay.tsx`**

```tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

import { AI_STATS, MAP_STATS, MILESTONES, SERVICES } from "@/components/v6/data";
import { ContactForm } from "./ContactForm";

gsap.registerPlugin(ScrollTrigger);

/* Mốc hiện/ẩn từng block — bám mốc hold của cameraPath (Task 4) */
const FRAME_NAMES = ["Thành phố", "Dịch vụ", "20 năm", "Công nghệ AI", "Dự án", "Liên hệ"];
const FRAME_STARTS = [0, 0.16, 0.38, 0.62, 0.78, 0.92];

export function V6Overlay() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current!;
    const blocks = Array.from(root.querySelectorAll<HTMLElement>("[data-range]"));
    const dots = Array.from(root.querySelectorAll<HTMLElement>("[data-dot]"));
    const fill = root.querySelector<HTMLElement>(".v6-progress-fill")!;
    gsap.set(blocks, { autoAlpha: 0, y: 20 });

    const st = ScrollTrigger.create({
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        fill.style.transform = `scaleX(${p})`;
        for (const el of blocks) {
          const [a, b] = el.dataset.range!.split(",").map(Number);
          const on = p >= a && p <= b;
          if ((el.dataset.on === "1") !== on) {
            el.dataset.on = on ? "1" : "0";
            gsap.to(el, { autoAlpha: on ? 1 : 0, y: on ? 0 : 20, duration: 0.4, overwrite: "auto" });
          }
        }
        let idx = 0;
        FRAME_STARTS.forEach((s, i) => { if (p >= s - 0.02) idx = i; });
        dots.forEach((d, i) => d.setAttribute("data-active", i === idx ? "1" : "0"));
      },
    });
    return () => st.kill();
  }, []);

  const jumpTo = (p: number) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: max * p, behavior: "smooth" });
  };

  return (
    <div ref={rootRef} className="pointer-events-none fixed inset-0 z-10">
      {/* Logo góc trái */}
      <header className="absolute left-4 top-4 md:left-6 md:top-6">
        <div className="v6-card pointer-events-auto px-3 py-2">
          <p className="font-mono text-sm font-bold tracking-[0.24em] text-white">TOÀN CẦU ADV</p>
          <p className="v6-label mt-0.5">ooh · billboard · pano · led</p>
        </div>
      </header>

      {/* F1 · Hero */}
      <section data-range="0,0.07" className="absolute inset-x-0 bottom-[12%] flex flex-col items-center gap-4 px-6 text-center">
        <h1 className="max-w-[16ch] font-sans text-[clamp(1.9rem,5.2vw,3.9rem)] font-extrabold leading-[1.08] tracking-tight text-white [text-shadow:0_0_28px_rgba(56,130,246,.45)]">
          Thương hiệu của bạn, vươn tầm đại chúng
        </h1>
        <button
          type="button"
          onClick={() => jumpTo(0.18)}
          className="v6-card pointer-events-auto group inline-flex h-12 items-center gap-2 px-6 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100 transition hover:bg-cyan-400/10"
        >
          Khám phá ngay
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </button>
      </section>

      {/* F2 · 3 card dịch vụ — hiện theo từng điểm dừng */}
      {SERVICES.map((s, i) => {
        const a = 0.16 + i * 0.05;
        return (
          <section
            key={s.name}
            data-range={`${a},${a + 0.045}`}
            className={`absolute top-1/2 w-72 -translate-y-1/2 ${i === 1 ? "right-[8%]" : "left-[8%]"}`}
          >
            <div className="v6-card p-5">
              <p className="v6-label">dịch vụ 0{i + 1}</p>
              <h2 className="mt-1 font-sans text-2xl font-bold text-white">{s.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{s.desc}</p>
            </div>
          </section>
        );
      })}

      {/* F3 · 5 cột mốc — hiện theo từng biển năm */}
      {MILESTONES.map((m, i) => {
        const a = 0.395 + i * 0.035;
        return (
          <section
            key={m.year}
            data-range={`${a},${a + 0.033}`}
            className={`absolute top-[30%] w-72 ${i % 2 === 0 ? "left-[10%]" : "right-[10%]"}`}
          >
            <div className="v6-card p-5">
              <p className="font-mono text-3xl font-bold tabular-nums text-cyan-300">{m.year}</p>
              <h2 className="mt-1 font-sans text-lg font-semibold text-white">{m.title}</h2>
              <p className="mt-1 text-sm leading-relaxed text-slate-300">{m.note}</p>
            </div>
          </section>
        );
      })}

      {/* F4 · AI */}
      <section data-range="0.62,0.71" className="absolute inset-x-0 top-[14%] flex flex-col items-center gap-6 px-6">
        <h2 className="max-w-[26ch] text-center font-sans text-[clamp(1.3rem,3.2vw,2.4rem)] font-bold text-white">
          AI tối ưu hiệu quả quảng cáo — phân tích thời gian thực
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {AI_STATS.map((s) => (
            <div key={s.label} className="v6-card w-60 p-5">
              <p className="font-mono text-3xl font-bold tabular-nums text-cyan-200">{s.value}</p>
              <p className="v6-label mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* F5 · Bản đồ + stats */}
      <section data-range="0.78,0.87" className="absolute left-[6%] top-1/2 flex -translate-y-1/2 flex-col gap-7">
        <p className="v6-label">dự án &amp; thành tích toàn quốc</p>
        {MAP_STATS.map((s) => (
          <div key={s.label}>
            <p className="font-mono text-[clamp(1.6rem,3vw,2.6rem)] font-bold tabular-nums text-white">{s.value}</p>
            <p className="mt-1 text-sm text-slate-300">{s.label}</p>
          </div>
        ))}
      </section>

      {/* F6 · Liên hệ trên màn LED */}
      <section data-range="0.93,1" className="absolute inset-0 flex items-center justify-center px-5">
        <div className="pointer-events-auto grid w-full max-w-[880px] gap-6">
          <div className="text-center">
            <p className="v6-label">nội dung tiếp theo trên màn hình này là thương hiệu của bạn</p>
            <h2 className="mt-2 font-sans text-[clamp(1.35rem,2.9vw,2.15rem)] font-bold text-white">
              Sẵn sàng đưa thương hiệu lên tầm cao mới?
            </h2>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* Nav 6 dot bên phải */}
      <nav className="absolute right-4 top-1/2 flex -translate-y-1/2 flex-col items-end gap-4 md:right-6" aria-label="Các frame">
        {FRAME_NAMES.map((name, i) => (
          <button
            key={name}
            type="button"
            data-dot
            data-active={i === 0 ? "1" : "0"}
            onClick={() => jumpTo(FRAME_STARTS[i] + 0.02)}
            className="v6-dot pointer-events-auto group flex items-center gap-2"
            aria-label={`Tới ${name}`}
          >
            <span className="v6-label opacity-0 transition group-hover:opacity-100 group-data-[active=1]:opacity-100">
              {name}
            </span>
            <span className="h-2 w-2 rounded-full border border-cyan-300/60 transition group-data-[active=1]:bg-cyan-300 group-data-[active=1]:shadow-[0_0_10px_rgba(56,189,248,.9)]" />
          </button>
        ))}
      </nav>

      {/* Progress bar đáy */}
      <footer className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-4 md:p-6">
        <div className="h-px flex-1 bg-white/15">
          <div className="v6-progress-fill h-full w-full origin-left bg-gradient-to-r from-cyan-300 to-violet-400" style={{ transform: "scaleX(0)" }} />
        </div>
      </footer>
    </div>
  );
}
```

- [ ] **Step 3: Mount vào `Experience.tsx`** — thêm `import { V6Overlay } from "@/components/v6/overlay/Overlay";` và đặt `<V6Overlay />` ngay sau div Canvas.

- [ ] **Step 4: Kiểm chứng**

`npx tsc --noEmit && npm run build` PASS. Browser: chữ từng frame hiện đúng lúc camera hold, fade + trượt 20px thống nhất; card dịch vụ nằm phía đối diện biển đang xem (không che biển); form F6 gõ được, submit hiện màn cảm ơn; dots nhảy đúng, click dot bay tới frame; progress bar chạy. KHÔNG còn nhãn "cảnh 0x", không HUD.

- [ ] **Step 5: Commit**

```bash
git add components/v6/overlay components/v6/experience/Experience.tsx
git commit -m "feat(v6): Overlay DOM — 6 block chữ đồng bộ hold camera, form, nav dot, progress bar"
```

---

### Task 8: Gỡ wireframe cũ

**Files:**
- Delete: `components/v6/wireframe.tsx`, `components/v6/stages.tsx`

**Interfaces:** không — task dọn dẹp; sau task này build không còn tham chiếu wireframe.

- [ ] **Step 1: Xóa + kiểm tra tham chiếu**

```bash
rm components/v6/wireframe.tsx components/v6/stages.tsx
grep -rn "wireframe\|stages" app/v6 components/v6 --include="*.tsx" --include="*.ts"
```

Expected: grep không còn kết quả (ngoài chữ trong comment nếu có).

- [ ] **Step 2: Build + commit**

```bash
npx tsc --noEmit && npm run build
git add -A components/v6 app/v6
git commit -m "chore(v6): gỡ wireframe 2.5D cũ — /v6 giờ chạy hoàn toàn bằng 3D"
```

---

### Task 9: Liều hiệu ứng mạnh — bloom, FOV kick + roll, streaks, nền ướt, bụi sao

**Files:**
- Create: `components/v6/experience/Effects.tsx`
- Create: `components/v6/experience/Streaks.tsx`
- Modify: `components/v6/experience/cameraPath.ts` (roll)
- Modify: `components/v6/experience/Billboards.tsx` (nền ướt)
- Modify: `components/v6/experience/Scene.tsx`

**Interfaces:**
- Consumes: `scrollState.progress`; `CameraSample.roll` (đã có sẵn field từ Task 4).
- Produces: `<V6Effects enabled={boolean} />`, `<Streaks />` + `<MapDust />`; roll ±2° trong 2 chặng bay nhanh.

- [ ] **Step 1: `Effects.tsx`** — bloom chọn lọc + vignette + grain (spec mục 5)

```tsx
"use client";

import { Bloom, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";

export function V6Effects({ enabled }: { enabled: boolean }) {
  if (!enabled) return null;
  return (
    <EffectComposer>
      {/* luminanceThreshold cao: chỉ mặt neon toneMapped=false vượt ngưỡng */}
      <Bloom mipmapBlur intensity={0.9} luminanceThreshold={0.85} luminanceSmoothing={0.2} />
      <Vignette eskil={false} offset={0.28} darkness={0.72} />
      <Noise opacity={0.04} />
    </EffectComposer>
  );
}
```

- [ ] **Step 2: Roll trong `cameraPath.ts`** — thay dòng `out.roll = 0;` bằng:

```ts
  /* Roll ±2° chỉ trong 2 chặng bay nhanh (spec: FOV kick + camera roll) */
  const rollWindows: Array<[number, number, number]> = [
    [0.06, 0.16, -2], // hạ xuống đại lộ — nghiêng trái
    [0.70, 0.78, 2],  // dolly-out bản đồ — nghiêng phải
  ];
  out.roll = 0;
  for (const [a, b, deg] of rollWindows) {
    if (t > a && t < b) {
      const u = (t - a) / (b - a);
      out.roll = THREE.MathUtils.degToRad(deg) * Math.sin(u * Math.PI); // vào-ra mềm
    }
  }
```

- [ ] **Step 3: `Streaks.tsx`** — vệt sáng tốc độ + bụi sao dolly-out, opacity theo cửa sổ progress (chỉ hiện khi camera đang lao — spec mục 5)

```tsx
"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { scrollState } from "./progress";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* Cường độ 0→1→0 trong cửa sổ [a,b] */
function windowPulse(p: number, a: number, b: number): number {
  if (p <= a || p >= b) return 0;
  return Math.sin(((p - a) / (b - a)) * Math.PI);
}

/* Vệt dọc hành lang hạ độ cao (0.06–0.16): hộp mảnh kéo dài theo trục bay */
export function Streaks({ count = 90 }: { count?: number }) {
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  const matrices = useMemo(() => {
    const rnd = mulberry32(88);
    const m: THREE.Matrix4[] = [];
    const tmp = new THREE.Matrix4();
    for (let i = 0; i < count; i++) {
      /* rải trong ống dọc đường hạ cánh: từ (120,300,260) về (0,10,-20) */
      const u = rnd();
      const cx = 120 * (1 - u) + (rnd() - 0.5) * 90;
      const cy = 300 * (1 - u) + 12 + (rnd() - 0.5) * 60;
      const cz = 260 * (1 - u) - 20 * u + (rnd() - 0.5) * 90;
      tmp.makeTranslation(cx, cy, cz);
      m.push(tmp.clone());
    }
    return m;
  }, [count]);

  useFrame(() => {
    if (!matRef.current) return;
    matRef.current.opacity = windowPulse(scrollState.progress, 0.06, 0.16) * 0.5;
  });

  return (
    <instancedMesh
      args={[undefined, undefined, matrices.length]}
      ref={(mesh) => {
        if (!mesh) return;
        matrices.forEach((mat, i) => mesh.setMatrixAt(i, mat));
        mesh.instanceMatrix.needsUpdate = true;
      }}
    >
      {/* hộp rất mảnh, kéo dài chéo theo hướng bay xuống */}
      <boxGeometry args={[0.12, 14, 0.12]} />
      <meshBasicMaterial
        ref={matRef}
        color="#7dd3fc"
        transparent
        opacity={0}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
}

/* Bụi sao thưa — CHỈ hiện trong cú dolly-out 0.70–0.86 (spec mục 5) */
export function MapDust({ count = 500 }: { count?: number }) {
  const matRef = useRef<THREE.PointsMaterial>(null);
  const positions = useMemo(() => {
    const rnd = mulberry32(404);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rnd() - 0.5) * 3600 + 120;
      arr[i * 3 + 1] = 300 + rnd() * 1800;
      arr[i * 3 + 2] = (rnd() - 0.5) * 3600 - 1100;
    }
    return arr;
  }, [count]);

  useFrame(() => {
    if (!matRef.current) return;
    matRef.current.opacity = windowPulse(scrollState.progress, 0.70, 0.86) * 0.7;
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial ref={matRef} color="#9fc8ff" size={4} sizeAttenuation transparent opacity={0} depthWrite={false} />
    </points>
  );
}
```

- [ ] **Step 4: Nền ướt trong `Billboards.tsx`** — thêm component và gắn dưới 3 biển hero

Thêm vào file (trên `export function Billboards`):

```tsx
/* Giả phản chiếu ướt: halo gradient lộn ngược trên mặt đường (spec mục 5) */
function WetGlow({ position, w }: { position: [number, number, number]; w: number }) {
  const tex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 128; c.height = 64;
    const g = c.getContext("2d")!;
    const grad = g.createLinearGradient(0, 0, 0, 64);
    grad.addColorStop(0, "rgba(90,200,255,0.35)");
    grad.addColorStop(1, "rgba(90,200,255,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 128, 64);
    return new THREE.CanvasTexture(c);
  }, []);
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={position}>
      <planeGeometry args={[w * 1.4, w * 0.8]} />
      <meshBasicMaterial map={tex} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}
```

Trong JSX của `Billboards`, thêm sau 3 biển hero:

```tsx
<WetGlow position={[8, 0.06, -40]} w={24} />
<WetGlow position={[-10, 0.06, -85]} w={16} />
<WetGlow position={[7, 0.06, -125]} w={20} />
```

- [ ] **Step 5: Gắn vào `Scene.tsx`**

```tsx
import { V6Effects } from "./Effects";
import { MapDust, Streaks } from "./Streaks";
// trong <Canvas>:
<Streaks />
<MapDust />
<V6Effects enabled />
```

- [ ] **Step 6: Kiểm chứng**

`npx tsc --noEmit && npm run build` PASS. Browser: mặt biển neon nở sáng (bloom) nhưng chữ DOM + tòa nhà KHÔNG nở; góc khung tối nhẹ (vignette), grain rất mịn; chặng hạ độ cao thấy vệt sáng lướt qua + khung nghiêng nhẹ rồi thẳng lại; dolly-out có bụi sao và nghiêng ngược; dưới 3 biển hero mặt đường loang sáng ướt. Khi camera ĐỨNG YÊN (giữa hold): không có gì chuyển động ngoài cửa sổ lấp lánh chậm — đúng luật 3.

- [ ] **Step 7: Commit**

```bash
git add components/v6/experience
git commit -m "feat(v6): hiệu ứng mạnh — bloom chọn lọc, roll, streaks, bụi sao, nền ướt"
```

---

### Task 10: Auto-tier hiệu năng + mobile + reduced-motion

**Files:**
- Create: `components/v6/experience/useQuality.ts`
- Modify: `components/v6/experience/Scene.tsx`, `CameraRig.tsx`

**Interfaces:**
- Consumes: hook `useMediaQuery` sẵn có (`hooks/useMediaQuery.ts`) nếu chữ ký phù hợp — nếu không, dùng matchMedia trực tiếp như code dưới (đã tự chứa, không phụ thuộc).
- Produces: `useQuality(): { tier: 0 | 1 | 2; mobile: boolean; reduced: boolean; reportFps(fps: number): void }` — tier 2 đủ hiệu ứng, tier 1 tắt bloom, tier 0 tắt bloom + giảm DPR về 1. Đây là chỗ setState DUY NHẤT liên quan render, và chỉ đổi tối đa vài lần mỗi phiên (không theo frame).

- [ ] **Step 1: Viết `useQuality.ts`**

```ts
"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useQuality() {
  const [tier, setTier] = useState<0 | 1 | 2>(2);
  const [mobile, setMobile] = useState(false);
  const [reduced, setReduced] = useState(false);
  const bad = useRef(0);

  useEffect(() => {
    setMobile(window.matchMedia("(max-width: 767px)").matches);
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  /* Gọi từ useFrame (mỗi ~1s một lần) — tụt dưới 45fps đủ lâu thì hạ tier */
  const reportFps = useCallback((fps: number) => {
    if (fps < 45) {
      bad.current += 1;
      if (bad.current >= 3) {
        bad.current = 0;
        setTier((t) => (t > 0 ? ((t - 1) as 0 | 1) : t));
      }
    } else {
      bad.current = 0;
    }
  }, []);

  return { tier, mobile, reduced, reportFps };
}
```

- [ ] **Step 2: Nối vào `Scene.tsx`** — bản cuối của file:

```tsx
"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

import { City } from "./City";
import { Billboards } from "./Billboards";
import { VietnamLights } from "./VietnamLights";
import { CameraRig } from "./CameraRig";
import { V6Effects } from "./Effects";
import { MapDust, Streaks } from "./Streaks";
import { useQuality } from "./useQuality";

/* Đo FPS thật, báo về useQuality mỗi giây (spec 6.6 — không đoán theo UA) */
function FpsProbe({ report }: { report: (fps: number) => void }) {
  const frames = useRef(0);
  const last = useRef(0);
  useFrame(({ clock }) => {
    frames.current += 1;
    const t = clock.elapsedTime;
    if (t - last.current >= 1) {
      report(frames.current / (t - last.current));
      frames.current = 0;
      last.current = t;
    }
  });
  return null;
}

export default function Scene() {
  const { tier, mobile, reduced, reportFps } = useQuality();

  return (
    <Canvas
      dpr={tier === 0 ? 1 : [1, 1.75]}
      camera={{ fov: 55, near: 0.5, far: 6000, position: [120, 300, 260] }}
    >
      <color attach="background" args={["#04091a"]} />
      <fog attach="fog" args={["#04091a", 120, 900]} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[200, 400, 100]} intensity={0.35} color="#8fb4ff" />

      <City count={mobile ? 150 : 400} />
      <Billboards />
      <VietnamLights />
      {!reduced && <Streaks count={mobile ? 40 : 90} />}
      {!reduced && <MapDust count={mobile ? 200 : 500} />}

      <CameraRig reduced={reduced} />
      <FpsProbe report={reportFps} />
      <V6Effects enabled={tier === 2 && !mobile && !reduced} />
    </Canvas>
  );
}
```

- [ ] **Step 3: Reduced-motion trong `CameraRig.tsx`** — nhận prop, quantize progress về tâm hold gần nhất (nhảy pose thay vì tween — spec 6.6):

```tsx
export function CameraRig({ reduced = false }: { reduced?: boolean }) {
  // ...
  const HOLD_CENTERS = [0.03, 0.185, 0.255, 0.315, 0.48, 0.66, 0.82, 0.96];
  useFrame(({ camera }) => {
    let p = scrollState.progress;
    if (reduced) {
      /* nhảy giữa các pose tĩnh — không tween camera */
      p = HOLD_CENTERS.reduce((best, c) =>
        Math.abs(c - p) < Math.abs(best - p) ? c : best
      );
    }
    const s = sample.current;
    sampleCamera(p, s);
    // ... phần còn lại giữ nguyên
  });
}
```

- [ ] **Step 4: Kiểm chứng**

`npx tsc --noEmit && npm run build` PASS. Browser desktop: đủ hiệu ứng. DevTools bật CPU throttle 6× → sau ~3s tier tự hạ (bloom tắt), console không lỗi. Bật responsive mobile (< 768px): ít tòa hơn, không bloom, vẫn cuộn mượt. Bật `prefers-reduced-motion` (DevTools → Rendering → emulate): camera nhảy giữa khung tĩnh, không tween, chữ vẫn đọc đủ 6 frame.

- [ ] **Step 5: Commit**

```bash
git add components/v6/experience
git commit -m "feat(v6): auto-tier FPS thật, mobile giản lược, reduced-motion nhảy pose tĩnh"
```

---

## Self-Review (đã chạy)

1. **Spec coverage:** 6 frame + chuyển cảnh (T4–T7) ✓ · luật neon/không-HUD (T3, T5, T7) ✓ · hiệu ứng mạnh đủ 7 mục bảng spec: bloom ✓ vignette+grain ✓ FOV kick (keyframes fov) + roll ✓ streaks ✓ nội dung biển động — texture logo tĩnh + pulse chưa làm: chấp nhận cắt ở đợt này, ghi ở "Ngoài phạm vi" dưới · nền ướt ✓ bụi sao ✓ · auto-tier/mobile/reduced (T10) ✓ · gỡ wireframe (T8) ✓ · không setState theo frame (chỉ useQuality đổi tier vài lần/phiên — đúng chú thích spec) ✓.
2. **Placeholder scan:** không còn TBD/TODO; mọi step có code hoặc lệnh cụ thể.
3. **Type consistency:** `scrollState.progress` (T1) dùng ở T4/T9 ✓; `CameraSample.roll` khai báo T4, dùng T9 ✓; `pinToWorld` (T2) dùng T6 ✓; `CameraRig` prop `reduced` thêm ở T10 khớp mount T10 Scene ✓.

**Ngoài phạm vi plan này (làm sau nếu cần):** nội dung mặt biển động (slide đổi + pulse); popup dự án tiêu biểu cạnh TP.HCM ở F5; tinh chỉnh mỹ thuật đường bay sau khi xem bản chạy thật.
