"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { LayerLabel } from "@/components/demo/layer-label";

const FRAMES = 120;

type RGB = [number, number, number];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function mixColor(a: RGB, b: RGB, t: number): string {
  return `rgb(${Math.round(lerp(a[0], b[0], t))},${Math.round(lerp(a[1], b[1], t))},${Math.round(lerp(a[2], b[2], t))})`;
}

/** Nội suy 3 mốc màu: chiều (0) → hoàng hôn (0.5) → đêm (1). */
function tri(a: RGB, b: RGB, c: RGB, t: number): string {
  return t < 0.5 ? mixColor(a, b, t * 2) : mixColor(b, c, (t - 0.5) * 2);
}

const smooth = (from: number, to: number, t: number) =>
  Math.min(1, Math.max(0, (t - from) / (to - from)));

/** Vẽ một "khung hình" của cảnh billboard theo tiến độ t (0 → 1). */
function drawScene(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  // Bầu trời chuyển từ chiều sang đêm
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, tri([125, 184, 255], [235, 110, 60], [6, 10, 19], t));
  sky.addColorStop(1, tri([205, 228, 255], [255, 176, 110], [13, 21, 39], t));
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  // Mặt trời lặn dần / trăng hiện
  const sunT = Math.min(t * 1.25, 1);
  const sunX = w * (0.16 + 0.5 * sunT);
  const sunY = h * 0.72 - Math.sin(Math.PI * (1 - sunT) * 0.5 + Math.PI * 0.5 * 0) * h * 0.42 * (1 - sunT * 0.9) - h * 0.05;
  if (t < 0.75) {
    ctx.fillStyle = mixColor([255, 214, 90], [255, 120, 60], Math.min(t * 2, 1));
    ctx.beginPath();
    ctx.arc(sunX, sunY, 26 - 10 * t, 0, Math.PI * 2);
    ctx.fill();
  }
  // Sao đêm (giả ngẫu nhiên, tất định theo chỉ số)
  const starAlpha = smooth(0.6, 0.95, t);
  if (starAlpha > 0) {
    ctx.fillStyle = `rgba(255,255,255,${0.85 * starAlpha})`;
    for (let i = 0; i < 40; i++) {
      const sx = ((i * 2654435761) % 1000) / 1000;
      const sy = ((i * 1597334677) % 1000) / 1000;
      ctx.fillRect(sx * w, sy * h * 0.5, 2, 2);
    }
  }

  // Dãy nhà xa
  ctx.fillStyle = tri([90, 130, 185], [120, 80, 90], [13, 21, 39], t);
  const buildings = [0.06, 0.16, 0.27, 0.4, 0.52, 0.78, 0.9];
  buildings.forEach((bx, i) => {
    const bw = w * 0.08;
    const bh = h * (0.16 + ((i * 37) % 5) * 0.03);
    ctx.fillRect(bx * w, h * 0.78 - bh, bw, bh);
  });

  // Mặt đường
  ctx.fillStyle = tri([70, 85, 105], [55, 50, 60], [8, 12, 22], t);
  ctx.fillRect(0, h * 0.78, w, h * 0.22);

  // Vệt đèn xe chạy (chỉ rõ về đêm)
  const streakAlpha = smooth(0.45, 0.8, t);
  if (streakAlpha > 0) {
    const offset = (t * 3 * w) % w;
    ctx.fillStyle = `rgba(255,178,36,${0.8 * streakAlpha})`;
    ctx.fillRect(((offset + w * 0.2) % w) - w * 0.12, h * 0.86, w * 0.12, 3);
    ctx.fillStyle = `rgba(46,230,255,${0.6 * streakAlpha})`;
    ctx.fillRect(w - ((offset + w * 0.55) % w), h * 0.92, w * 0.16, 3);
  }

  // Billboard: trụ + khung + mặt biển
  const bx = w * 0.6;
  const bw = w * 0.3;
  const bh = h * 0.24;
  const by = h * 0.24;
  ctx.fillStyle = tri([90, 100, 120], [70, 70, 85], [26, 41, 71], t);
  ctx.fillRect(bx + bw / 2 - 7, by + bh, 14, h * 0.78 - by - bh);
  ctx.fillStyle = tri([70, 82, 104], [58, 58, 74], [18, 29, 54], t);
  ctx.fillRect(bx - 8, by - 8, bw + 16, bh + 16);

  // Mặt biển sáng đèn dần khi trời tối
  const lit = smooth(0.5, 0.8, t);
  const face = ctx.createLinearGradient(bx, by, bx, by + bh);
  face.addColorStop(0, mixColor([160, 180, 205], [255, 196, 80], lit));
  face.addColorStop(1, mixColor([120, 140, 170], [255, 150, 40], lit));
  ctx.fillStyle = face;
  ctx.fillRect(bx, by, bw, bh);
  ctx.fillStyle = `rgba(10,17,32,${0.85 - 0.3 * lit})`;
  ctx.font = `bold ${Math.round(bh * 0.32)}px sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText("OOH", bx + bw / 2, by + bh * 0.62);

  // Quầng sáng đèn rọi
  if (lit > 0) {
    const glow = ctx.createRadialGradient(bx + bw / 2, by + bh / 2, 10, bx + bw / 2, by + bh / 2, bw * 0.9);
    glow.addColorStop(0, `rgba(255,178,36,${0.4 * lit})`);
    glow.addColorStop(1, "rgba(255,178,36,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(bx - bw, by - bh, bw * 3, bh * 3);
  }
}

/**
 * LỚP 12 — Canvas image-sequence scrub: tiến độ cuộn "tua" 120 khung hình
 * của một cảnh billboard chuyển từ chiều sang đêm, vẽ trực tiếp trên canvas.
 * Kỹ thuật tương đương scrub chuỗi ảnh JPEG kiểu trang Apple.
 */
export function Layer12CanvasScrub() {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const frameText = useTransform(
    scrollYProgress,
    (v) => `khung ${String(1 + Math.round(v * (FRAMES - 1))).padStart(3, "0")}/${FRAMES}`
  );

  const render = (t: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    drawScene(ctx, canvas.width, canvas.height, t);
  };

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!reducedMotion) render(v);
  });

  useEffect(() => {
    render(reducedMotion ? 1 : scrollYProgress.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  return (
    <section id="layer-12" aria-label="Lớp 12: canvas scrub theo cuộn">
      <div ref={ref} className="relative h-[300vh] bg-ink-950">
        <div className="sticky top-0 flex h-dvh flex-col items-center justify-center overflow-hidden px-6">
          <div className="mb-8 text-center">
            <LayerLabel index={12} technique="Canvas image-sequence scrub" className="justify-center" />
            <h2 className="font-heading text-4xl font-bold uppercase sm:text-5xl">
              Tua <span className="text-neon-amber text-glow-amber">120 khung hình</span> bằng cuộn
            </h2>
          </div>

          <div className="relative w-full max-w-3xl overflow-hidden rounded-xl border border-white/10 shadow-billboard">
            <canvas ref={canvasRef} width={960} height={600} className="block h-auto w-full" />
            <motion.span className="absolute bottom-3 right-4 rounded-full bg-ink-950/70 px-3 py-1 font-mono text-xs text-neon-cyan backdrop-blur">
              {frameText}
            </motion.span>
          </div>

          <p className="mt-6 max-w-md text-center text-sm text-muted-foreground">
            Cảnh chiều → hoàng hôn → đêm được vẽ lại mỗi lần tiến độ đổi — cùng cơ chế
            với scrub chuỗi ảnh sản phẩm, nhưng không cần tải 120 file JPEG.
          </p>
        </div>
      </div>
    </section>
  );
}
