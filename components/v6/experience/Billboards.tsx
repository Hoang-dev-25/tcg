"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { scrollState } from "./progress";

/* Texture chữ vẽ canvas — CHỈ dùng cho nội dung trên mặt biển (năm, logo mẫu).
   Chữ nội dung trang vẫn là DOM (spec 6.2). */
export function makeTextTexture(lines: string[], w = 1024, h = 512): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  const g = c.getContext("2d")!;
  /* Nền biển: navy đậm v2blue-900, chữ trắng-xanh D6E9FF (design system) */
  g.fillStyle = "#0D2F5E";
  g.fillRect(0, 0, w, h);
  g.fillStyle = "#D6E9FF";
  g.textAlign = "center";
  g.textBaseline = "middle";
  const size = Math.floor(h / (lines.length + 1.2));
  g.font = `700 ${size}px 'Plus Jakarta Sans', system-ui, sans-serif`;
  lines.forEach((line, i) => {
    g.fillText(line, w / 2, (h / (lines.length + 1)) * (i + 1));
  });
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

/* Accent duy nhất của cả trang: họ v2blue (design system cấm màu nóng/cyan lạ) */
const NEON = "#57A3FF";

/* Sprite halo — glow rẻ quanh mặt biển (spec 6.3: không bloom ở tier thấp) */
function Halo({ position, scale }: { position: [number, number, number]; scale: number }) {
  const tex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const g = c.getContext("2d")!;
    const grad = g.createRadialGradient(64, 64, 6, 64, 64, 64);
    grad.addColorStop(0, "rgba(87,163,255,0.16)");
    grad.addColorStop(0.55, "rgba(87,163,255,0.05)");
    grad.addColorStop(1, "rgba(87,163,255,0)");
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
      {/* Mặt biển — vật duy nhất mang accent brand (luật 2) */}
      <mesh>
        <planeGeometry args={[w, h]} />
        <meshStandardMaterial
          color="#0a1120"
          emissive="#ffffff"
          emissiveMap={face ?? undefined}
          emissiveIntensity={face ? 1.05 : 0.7}
          toneMapped={false}
        />
      </mesh>
      <Halo position={[0, 0, 0.8]} scale={Math.max(w, h) * 1.05} />
    </group>
  );
}

/* Giả phản chiếu ướt: halo gradient lộn ngược trên mặt đường (spec mục 5) */
function WetGlow({ position, w }: { position: [number, number, number]; w: number }) {
  const tex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 128; c.height = 64;
    const g = c.getContext("2d")!;
    const grad = g.createLinearGradient(0, 0, 0, 64);
    grad.addColorStop(0, "rgba(87,163,255,0.3)");
    grad.addColorStop(1, "rgba(87,163,255,0)");
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

/* Màn LED liên hệ F6 — bật/tắt theo progress để không lọt vào các frame đầu */
function ContactScreen() {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    if (ref.current) ref.current.visible = scrollState.progress >= 0.86;
  });
  return (
    <group ref={ref} position={[0, 40, -20]} visible={false}>
      <mesh>
        <planeGeometry args={[64, 36]} />
        <meshStandardMaterial color="#04101e" emissive={NEON} emissiveIntensity={0.16} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0, -0.5]}>
        <boxGeometry args={[66, 38, 0.8]} />
        <meshStandardMaterial color="#101a35" />
      </mesh>
    </group>
  );
}

export function Billboards() {
  const logoTex = useMemo(() => makeTextTexture(["TOÀN CẦU", "ADV"]), []);
  const panoTex = useMemo(() => makeTextTexture(["TOÀN", "CẦU", "ADV"], 256, 512), []);
  const ledTex = useMemo(() => makeTextTexture(["TOÀN CẦU ADV"], 1024, 256), []);
  const yearTex = useMemo(
    () => ["2005", "2009", "2014", "2019", "2024"].map((y) => makeTextTexture([y], 256, 256)),
    []
  );

  return (
    <group>
      {/* F1/F2 · Billboard hero — chếch mặt về phía camera đi tới trên đại lộ */}
      <Board position={[14, 12, -40]} rotY={-Math.PI / 2 + 0.5} w={24} h={13} face={logoTex} />

      {/* F2 · Pano ốp tường — dựng kèm một tòa "chủ" ngay sau */}
      <group>
        <mesh position={[-22, 20, -85]}>
          <boxGeometry args={[12, 40, 18]} />
          <meshStandardMaterial color="#0a1226" roughness={0.9} />
        </mesh>
        <Board position={[-15.8, 20, -85]} rotY={Math.PI / 2} w={14} h={26} face={panoTex} />
      </group>

      {/* F2 · Màn LED cong — trụ cong phát sáng */}
      <group position={[13, 9, -125]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh>
          <cylinderGeometry args={[10, 10, 12, 24, 1, true, -0.6, 1.2]} />
          <meshStandardMaterial
            color="#031018"
            emissive={NEON}
            emissiveMap={ledTex}
            emissiveIntensity={1.05}
            side={THREE.DoubleSide}
            toneMapped={false}
          />
        </mesh>
        <Halo position={[0, 0, 8]} scale={16} />
      </group>

      {/* Nền ướt phản chiếu dưới 3 biển hero (spec mục 5) */}
      <WetGlow position={[8, 0.06, -40]} w={24} />
      <WetGlow position={[-10, 0.06, -85]} w={16} />
      <WetGlow position={[7, 0.06, -125]} w={20} />

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

      {/* F6 · Màn LED liên hệ — camera kết thúc vuông góc trước mặt nó.
          Chỉ hiện từ cú lao vào (p ≥ 0.86), nếu không nó lơ lửng giữa khung
          ở các frame mặt đất đầu trang. */}
      <ContactScreen />
    </group>
  );
}
