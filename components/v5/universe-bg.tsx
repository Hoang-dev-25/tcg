"use client";

import { useEffect, useRef } from "react";

/**
 * Nền vũ trụ v5 (bản mạnh) — lớp fixed nằm sau toàn trang, mọi tầng đều vẽ
 * trên canvas để parallax theo scroll RÕ RỆT (mỗi tầng một tốc độ, wrap vòng):
 *   1. Nebula màu (tím/xanh/cyan/hồng) — trôi chậm, blur lớn, blend "lighter".
 *   2. Sao xa (nhỏ, mờ)         — tốc độ 0.06×scroll.
 *   3. Sao giữa (vừa, nhấp nháy) — tốc độ 0.24×scroll.
 *   4. Sao gần (to, quầng sáng)  — tốc độ 0.55×scroll + trôi mạnh theo con trỏ.
 *   5. Thiên thạch (tối đa 3 cùng lúc) + texture nhiễu hạt + vignette (CSS).
 * Reduced-motion: vẽ tĩnh một lần, không rAF.
 */

type Star = {
  x: number;
  y: number;
  band: 0 | 1 | 2; // 0 xa → 2 gần
  r: number;
  phase: number;
  speed: number;
  tint: number; // 0 trắng · 1 xanh · 2 tím · 3 ấm
};

type Blob = { x: number; y: number; r: number; color: string; alpha: number; speed: number; sway: number };

type Meteor = { x: number; y: number; vx: number; vy: number; life: number; max: number };

/* Tốc độ parallax theo scroll của từng tầng sao (xa → gần) */
const BAND_SPEED = [0.06, 0.24, 0.55] as const;
const BAND_MOUSE = [6, 20, 44] as const;

const TINTS = [
  "255,255,255", // trắng
  "173,211,255", // xanh băng
  "196,181,253", // tím nhạt
  "255,214,165", // ấm
] as const;

export function UniverseBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let w = 0;
    let h = 0;
    let field = 0; // chiều cao bầu trời ảo (wrap sao)
    let nebField = 0; // chiều cao vòng lặp nebula
    let stars: Star[] = [];
    let blobs: Blob[] = [];
    let meteors: Meteor[] = [];
    let nextMeteor = 1800;
    let last = performance.now();
    const mouse = { x: 0, y: 0, sx: 0, sy: 0 };

    const seed = () => {
      field = h * 2;
      nebField = h * 3;
      const count = Math.min(420, Math.round((w * h) / 3400));
      stars = Array.from({ length: count }, () => {
        const p = Math.random();
        const band: 0 | 1 | 2 = p < 0.5 ? 0 : p < 0.85 ? 1 : 2;
        return {
          x: Math.random() * w,
          y: Math.random() * field,
          band,
          r: band === 0 ? 0.35 + Math.random() * 0.7 : band === 1 ? 0.7 + Math.random() * 1.1 : 1.2 + Math.random() * 1.8,
          phase: Math.random() * Math.PI * 2,
          speed: 0.6 + Math.random() * 1.8,
          tint: Math.random() < 0.62 ? 0 : Math.random() < 0.55 ? 1 : Math.random() < 0.6 ? 2 : 3,
        };
      });
      const base = Math.min(w, h);
      blobs = [
        { x: w * 0.16, y: nebField * 0.08, r: base * 0.62, color: "124,92,255", alpha: 0.34, speed: 0.1, sway: 0.9 },
        { x: w * 0.86, y: nebField * 0.24, r: base * 0.7, color: "35,116,217", alpha: 0.36, speed: 0.14, sway: 1.4 },
        { x: w * 0.32, y: nebField * 0.46, r: base * 0.5, color: "56,189,248", alpha: 0.26, speed: 0.18, sway: 1.1 },
        { x: w * 0.72, y: nebField * 0.62, r: base * 0.46, color: "236,72,153", alpha: 0.16, speed: 0.12, sway: 1.8 },
        { x: w * 0.1, y: nebField * 0.8, r: base * 0.58, color: "99,102,241", alpha: 0.3, speed: 0.16, sway: 1.2 },
      ];
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (reduced) draw(performance.now(), true);
    };

    /* Vị trí wrap vòng theo scroll: tầng gần lướt nhanh → cảm giác chiều sâu mạnh */
    const wrapY = (y: number, scroll: number, speed: number, span: number) =>
      ((((y - scroll * speed) % span) + span) % span) - (span - h) / 2;

    const draw = (now: number, staticFrame = false) => {
      ctx.clearRect(0, 0, w, h);
      const scroll = window.scrollY;

      /* --- Nebula: blend lighter cho màu rực, trôi chậm + lắc lư theo thời gian --- */
      ctx.globalCompositeOperation = "lighter";
      for (const b of blobs) {
        const y = wrapY(b.y, scroll, b.speed, nebField);
        if (y < -b.r || y > h + b.r) continue;
        const swayX = staticFrame ? 0 : Math.sin(now * 0.00005 * b.sway + b.sway * 7) * w * 0.04;
        const x = b.x + swayX + mouse.sx * 30;
        const g = ctx.createRadialGradient(x, y, 0, x, y, b.r);
        g.addColorStop(0, `rgba(${b.color},${b.alpha})`);
        g.addColorStop(0.55, `rgba(${b.color},${b.alpha * 0.35})`);
        g.addColorStop(1, `rgba(${b.color},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, b.r, 0, Math.PI * 2);
        ctx.fill();
      }

      /* --- Sao 3 tầng --- */
      for (const s of stars) {
        const speed = BAND_SPEED[s.band];
        const y = wrapY(s.y, scroll, speed, field) + mouse.sy * BAND_MOUSE[s.band] * 0.4;
        if (y < -6 || y > h + 6) continue;
        const x = s.x + mouse.sx * BAND_MOUSE[s.band];
        const tw = staticFrame ? 0.8 : 0.5 + 0.5 * Math.sin(now * 0.0012 * s.speed + s.phase);
        const alpha = (s.band === 0 ? 0.35 : s.band === 1 ? 0.6 : 0.9) * (0.35 + 0.65 * tw);
        ctx.fillStyle = `rgba(${TINTS[s.tint]},${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fill();
        // quầng sáng tầng gần
        if (s.band === 2) {
          const g = ctx.createRadialGradient(x, y, 0, x, y, s.r * 5);
          g.addColorStop(0, `rgba(${TINTS[s.tint]},${alpha * 0.35})`);
          g.addColorStop(1, `rgba(${TINTS[s.tint]},0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(x, y, s.r * 5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      /* --- Thiên thạch --- */
      for (const m of meteors) {
        const t = m.life / m.max;
        const fade = Math.sin(Math.PI * t);
        const tail = 11;
        const g = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * tail, m.y - m.vy * tail);
        g.addColorStop(0, `rgba(214,233,255,${0.95 * fade})`);
        g.addColorStop(1, "rgba(214,233,255,0)");
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.vx * tail, m.y - m.vy * tail);
        ctx.stroke();
      }
      ctx.globalCompositeOperation = "source-over";
    };

    const tick = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;

      mouse.sx += (mouse.x - mouse.sx) * 0.05;
      mouse.sy += (mouse.y - mouse.sy) * 0.05;

      meteors = meteors.filter((m) => (m.life += dt) < m.max);
      for (const m of meteors) {
        m.x += (m.vx * dt) / 16;
        m.y += (m.vy * dt) / 16;
      }
      nextMeteor -= dt;
      if (nextMeteor <= 0 && meteors.length < 3) {
        meteors.push({
          x: Math.random() * w * 0.9,
          y: Math.random() * h * 0.45,
          vx: 10 + Math.random() * 8,
          vy: 4.5 + Math.random() * 3.5,
          life: 0,
          max: 800 + Math.random() * 600,
        });
        nextMeteor = 2200 + Math.random() * 3200;
      }

      draw(now);
      raf = requestAnimationFrame(tick);
    };

    const onMouse = (e: MouseEvent) => {
      mouse.x = e.clientX / w - 0.5;
      mouse.y = e.clientY / h - 0.5;
    };

    resize();
    window.addEventListener("resize", resize);
    if (!reduced) {
      window.addEventListener("mousemove", onMouse, { passive: true });
      raf = requestAnimationFrame(tick);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <div aria-hidden className="v5-universe fixed inset-0 z-0 overflow-hidden">
      {/* Wash màu nền tĩnh cho chiều sâu cơ bản (nebula động vẽ trên canvas) */}
      <div className="v5-space-wash absolute inset-0" />
      <canvas ref={canvasRef} className="absolute inset-0" />
      {/* Texture nhiễu hạt + vignette tối mép cho chữ nổi */}
      <div className="v5-noise absolute inset-0" />
      <div className="v5-vignette absolute inset-0" />
    </div>
  );
}
