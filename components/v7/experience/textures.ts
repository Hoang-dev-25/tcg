"use client";

import * as THREE from "three";

import { BRAND, MILESTONES, TIMELINE_TITLE } from "@/components/v7/data";

/* ===== Texture vẽ bằng canvas =====
   Chỉ dùng cho NỘI DUNG NẰM TRONG CẢNH (mặt biển, mặt LED). Chữ của trang vẫn
   là DOM để nét và đọc được bằng screen reader. */

export const PALETTE = {
  ink: "#04070f",
  navy: "#0a1020",
  navyDeep: "#060b18",
  blue: "#368fff",
  blueSoft: "#57a3ff",
  blueLight: "#7bb8ff",
  violet: "#8b5cf6",
  violetSoft: "#a78bfa",
  white: "#eaf2ff",
};

function ctx2d(w: number, h: number) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return { canvas: c, g: c.getContext("2d")! };
}

/** Glow tròn — dùng cho sprite halo, đèn, hạt. */
export function makeGlowTexture(color = PALETTE.blueSoft, power = 0.22): THREE.CanvasTexture {
  const { canvas, g } = ctx2d(128, 128);
  const c = new THREE.Color(color);
  const rgb = `${Math.round(c.r * 255)},${Math.round(c.g * 255)},${Math.round(c.b * 255)}`;
  const grad = g.createRadialGradient(64, 64, 2, 64, 64, 64);
  grad.addColorStop(0, `rgba(${rgb},${power})`);
  grad.addColorStop(0.45, `rgba(${rgb},${power * 0.3})`);
  grad.addColorStop(1, `rgba(${rgb},0)`);
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(canvas);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** Cửa sổ tòa nhà — dùng cho bản procedural của building kit. */
export function makeWindowTexture(seed = 7): THREE.CanvasTexture {
  const { canvas, g } = ctx2d(256, 512);
  g.fillStyle = PALETTE.navyDeep;
  g.fillRect(0, 0, 256, 512);
  let a = seed;
  const rnd = () => {
    a = (a * 1664525 + 1013904223) >>> 0;
    return a / 4294967296;
  };
  for (let y = 10; y < 500; y += 16) {
    for (let x = 8; x < 246; x += 13) {
      if (rnd() < 0.34) {
        const r = rnd();
        g.fillStyle =
          r < 0.62
            ? "rgba(214,233,255,0.82)"
            : r < 0.86
              ? "rgba(87,163,255,0.8)"
              : "rgba(167,139,250,0.72)"; // điểm xuyết tím
        g.fillRect(x, y, 7, 9);
      }
    }
  }
  const t = new THREE.CanvasTexture(canvas);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

/** Mặt biển procedural — logo/tên + kicker, nền navy, viền neon. */
export function makeBoardTexture(
  lines: string[],
  opts: { w?: number; h?: number; kicker?: string; accent?: string } = {}
): THREE.CanvasTexture {
  const w = opts.w ?? 1024;
  const h = opts.h ?? 512;
  const accent = opts.accent ?? PALETTE.blue;
  const { canvas, g } = ctx2d(w, h);

  const grad = g.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, "#0d2f5e");
  grad.addColorStop(1, "#0a1226");
  g.fillStyle = grad;
  g.fillRect(0, 0, w, h);

  g.strokeStyle = accent;
  g.lineWidth = Math.max(3, w * 0.006);
  g.strokeRect(w * 0.03, h * 0.06, w * 0.94, h * 0.88);

  g.textAlign = "center";
  g.textBaseline = "middle";
  if (opts.kicker) {
    g.fillStyle = accent;
    g.font = `600 ${Math.round(h * 0.075)}px 'Plus Jakarta Sans', system-ui, sans-serif`;
    g.fillText(opts.kicker.toUpperCase(), w / 2, h * 0.2);
  }
  g.fillStyle = PALETTE.white;
  const size = Math.floor((h * 0.52) / lines.length);
  g.font = `800 ${size}px 'Plus Jakarta Sans', system-ui, sans-serif`;
  lines.forEach((line, i) => {
    g.fillText(line, w / 2, h * 0.55 + (i - (lines.length - 1) / 2) * size * 1.08);
  });

  const t = new THREE.CanvasTexture(canvas);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

/* ===== Nội dung chạy trên mặt LED (giai đoạn 1 → 2) =====
   Một canvas RỘNG gồm 5 khung 16:9 ghép ngang; shader chỉ hiển thị 1 khung và
   trượt ngang theo progress:
     khung 0  logo mẫu (giai đoạn 1)
     khung 1  tiêu đề "Hành trình 20 năm…"
     khung 2–4  timeline 5 cột mốc trượt qua */
export const LED_PANEL = { w: 1024, h: 576, count: 5 };

export function makeLedContentTexture(): THREE.CanvasTexture {
  const W = LED_PANEL.w * LED_PANEL.count;
  const H = LED_PANEL.h;
  const { canvas, g } = ctx2d(W, H);

  const draw = () => {
    g.clearRect(0, 0, W, H);
    g.fillStyle = "#040a16";
    g.fillRect(0, 0, W, H);

    /* --- khung 0: logo mẫu --- */
    const gr = g.createLinearGradient(0, 0, LED_PANEL.w, H);
    gr.addColorStop(0, "#0d2f5e");
    gr.addColorStop(1, "#1b1147");
    g.fillStyle = gr;
    g.fillRect(0, 0, LED_PANEL.w, H);
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillStyle = PALETTE.white;
    g.font = `800 120px 'Plus Jakarta Sans', system-ui, sans-serif`;
    g.fillText(BRAND.short.toUpperCase(), LED_PANEL.w / 2, H * 0.44);
    g.fillStyle = PALETTE.blueLight;
    g.font = `600 40px 'Plus Jakarta Sans', system-ui, sans-serif`;
    g.fillText(BRAND.tagline.toUpperCase(), LED_PANEL.w / 2, H * 0.62);

    /* --- khung 1: tiêu đề giai đoạn 2 --- */
    const x1 = LED_PANEL.w;
    g.fillStyle = "#060d1e";
    g.fillRect(x1, 0, LED_PANEL.w, H);
    g.fillStyle = PALETTE.blue;
    g.font = `700 34px 'Plus Jakarta Sans', system-ui, sans-serif`;
    g.fillText("2005 — 2025", x1 + LED_PANEL.w / 2, H * 0.3);
    g.fillStyle = PALETTE.white;
    g.font = `800 76px 'Plus Jakarta Sans', system-ui, sans-serif`;
    g.fillText("Hành trình 20 năm", x1 + LED_PANEL.w / 2, H * 0.47);
    g.fillText("kiến tạo dấu ấn", x1 + LED_PANEL.w / 2, H * 0.63);

    /* --- khung 2–4: timeline ngang --- */
    const railX0 = LED_PANEL.w * 2;
    const railW = LED_PANEL.w * (LED_PANEL.count - 2);
    g.fillStyle = "#050b18";
    g.fillRect(railX0, 0, railW, H);

    const railY = H * 0.56;
    g.strokeStyle = "rgba(87,163,255,0.35)";
    g.lineWidth = 4;
    g.beginPath();
    g.moveTo(railX0 + 60, railY);
    g.lineTo(railX0 + railW - 60, railY);
    g.stroke();

    MILESTONES.forEach((m, i) => {
      const cx = railX0 + (railW * (i + 0.5)) / MILESTONES.length;
      /* ảnh tượng trưng: khối gradient thay ảnh thật, đổi được sau bằng texture swap */
      const bw = 300;
      const bh = 170;
      const img = g.createLinearGradient(cx - bw / 2, railY - 250, cx + bw / 2, railY - 90);
      img.addColorStop(0, i % 2 ? "#153a72" : "#241a5c");
      img.addColorStop(1, "#0a1226");
      g.fillStyle = img;
      g.fillRect(cx - bw / 2, railY - 250, bw, bh);
      g.strokeStyle = "rgba(123,184,255,0.4)";
      g.lineWidth = 2;
      g.strokeRect(cx - bw / 2, railY - 250, bw, bh);

      g.fillStyle = i % 2 ? PALETTE.blueSoft : PALETTE.violetSoft;
      g.beginPath();
      g.arc(cx, railY, 12, 0, Math.PI * 2);
      g.fill();

      g.fillStyle = PALETTE.white;
      g.font = `800 56px 'Plus Jakarta Sans', system-ui, sans-serif`;
      g.fillText(m.year, cx, railY + 62);
      g.fillStyle = PALETTE.blueLight;
      g.font = `600 28px 'Plus Jakarta Sans', system-ui, sans-serif`;
      g.fillText(m.title, cx, railY + 108);
    });

    /* nhãn nhỏ góc dưới, chạy suốt canvas */
    g.textAlign = "left";
    g.fillStyle = "rgba(123,184,255,0.5)";
    g.font = `600 26px 'Plus Jakarta Sans', system-ui, sans-serif`;
    for (let i = 0; i < LED_PANEL.count; i++) {
      g.fillText(TIMELINE_TITLE.toUpperCase(), i * LED_PANEL.w + 48, H - 40);
    }
  };

  draw();
  const t = new THREE.CanvasTexture(canvas);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  t.wrapS = THREE.ClampToEdgeWrapping;
  t.wrapT = THREE.ClampToEdgeWrapping;

  /* Vẽ lại một lần sau khi web font tải xong để chữ đúng bộ chữ thương hiệu */
  if (typeof document !== "undefined" && document.fonts?.ready) {
    document.fonts.ready.then(() => {
      draw();
      t.needsUpdate = true;
    });
  }
  return t;
}
