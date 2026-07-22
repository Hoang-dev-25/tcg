"use client";

import { useEffect, useRef } from "react";

/**
 * Nền vũ trụ v5 — bản "ấn tượng":
 *   1. Dải Ngân Hà chéo màn (sprite ~700 sao + bụi màu)        — parallax 0.10×
 *   2. Aurora: 2 dải sáng uốn lượn chảy liên tục (teal + tím)
 *   3. Nebula 5 quầng màu (blend lighter)                       — 0.10–0.18×
 *   4. Sao 3 tầng (0.06/0.24/0.55×) + glint 4 cánh khi lóe sáng
 *   5. WARP khi cuộn nhanh: sao kéo thành vệt theo vận tốc cuộn
 *   6. Chòm sao tương tác: nối các sao quanh con trỏ bằng tia sáng mảnh
 *   7. Thiên thạch đầu phát sáng, tối đa 4 cùng lúc
 * Mọi thứ nặng pre-render thành sprite; canvas DPR 1.
 * Reduced-motion: vẽ tĩnh một lần, không rAF, không hiệu ứng động.
 */

type Star = {
  x: number;
  y: number;
  band: 0 | 1 | 2;
  size: number;
  r: number;
  phase: number;
  speed: number;
  tint: number;
};

type Blob = { x: number; y: number; speed: number; sway: number; sprite: HTMLCanvasElement };

type Meteor = { x: number; y: number; vx: number; vy: number; life: number; max: number };

const BAND_SPEED = [0.06, 0.24, 0.55] as const;
const BAND_MOUSE = [6, 20, 44] as const;

const TINTS = [
  "255,255,255", // trắng
  "173,211,255", // xanh băng
  "196,181,253", // tím nhạt
  "255,214,165", // ấm
] as const;

/* Aurora: [yBase(0-1), biên độ, màu, alpha, lệch pha] */
const AURORAS = [
  [0.16, 46, "45,212,191", 0.12, 0],
  [0.26, 60, "139,92,246", 0.1, 2.1],
] as const;

/** Sprite sao: chấm sáng + quầng glow. */
function makeStarSprite(tint: string, glow: boolean): HTMLCanvasElement {
  const s = glow ? 64 : 16;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const g = c.getContext("2d")!;
  const half = s / 2;
  const grad = g.createRadialGradient(half, half, 0, half, half, half);
  if (glow) {
    grad.addColorStop(0, `rgba(${tint},1)`);
    grad.addColorStop(0.12, `rgba(${tint},.9)`);
    grad.addColorStop(0.3, `rgba(${tint},.22)`);
    grad.addColorStop(1, `rgba(${tint},0)`);
  } else {
    grad.addColorStop(0, `rgba(${tint},1)`);
    grad.addColorStop(0.5, `rgba(${tint},.85)`);
    grad.addColorStop(1, `rgba(${tint},0)`);
  }
  g.fillStyle = grad;
  g.fillRect(0, 0, s, s);
  return c;
}

/** Sprite glint 4 cánh (lóe sáng kiểu ống kính) cho sao gần. */
function makeGlintSprite(tint: string): HTMLCanvasElement {
  const s = 96;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const g = c.getContext("2d")!;
  g.translate(s / 2, s / 2);
  for (const rot of [0, Math.PI / 2]) {
    g.save();
    g.rotate(rot);
    const grad = g.createLinearGradient(-s * 0.46, 0, s * 0.46, 0);
    grad.addColorStop(0, `rgba(${tint},0)`);
    grad.addColorStop(0.5, `rgba(${tint},.95)`);
    grad.addColorStop(1, `rgba(${tint},0)`);
    g.fillStyle = grad;
    g.fillRect(-s * 0.46, -1.3, s * 0.92, 2.6);
    g.restore();
  }
  const core = g.createRadialGradient(0, 0, 0, 0, 0, 7);
  core.addColorStop(0, `rgba(${tint},1)`);
  core.addColorStop(1, `rgba(${tint},0)`);
  g.fillStyle = core;
  g.beginPath();
  g.arc(0, 0, 7, 0, Math.PI * 2);
  g.fill();
  return c;
}

/** Sprite dải Ngân Hà: lõi sáng elip + bụi màu + ~700 sao li ti quanh trục chéo. */
function makeGalaxySprite(w: number, h: number): HTMLCanvasElement {
  const gw = Math.round(w * 1.7);
  const gh = Math.round(h * 1.1);
  const c = document.createElement("canvas");
  c.width = gw;
  c.height = gh;
  const g = c.getContext("2d")!;
  g.translate(gw / 2, gh / 2);
  g.rotate(-0.3);

  g.save();
  g.scale(1, 0.16);
  const core = g.createRadialGradient(0, 0, 0, 0, 0, gw * 0.46);
  core.addColorStop(0, "rgba(214,233,255,.32)");
  core.addColorStop(0.45, "rgba(173,211,255,.15)");
  core.addColorStop(1, "rgba(173,211,255,0)");
  g.fillStyle = core;
  g.beginPath();
  g.arc(0, 0, gw * 0.46, 0, Math.PI * 2);
  g.fill();
  g.restore();

  const DUST = ["124,92,255", "35,116,217", "236,72,153", "56,189,248", "99,102,241"];
  for (let i = 0; i < 10; i++) {
    const x = (Math.random() - 0.5) * gw * 0.8;
    const y = (Math.random() - 0.5) * gh * 0.15;
    const r = gh * (0.1 + Math.random() * 0.14);
    const col = DUST[i % DUST.length];
    const grad = g.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, `rgba(${col},${0.15 + Math.random() * 0.11})`);
    grad.addColorStop(1, `rgba(${col},0)`);
    g.fillStyle = grad;
    g.beginPath();
    g.arc(x, y, r, 0, Math.PI * 2);
    g.fill();
  }

  const STAR_TINTS = ["255,255,255", "214,233,255", "196,181,253"];
  for (let i = 0; i < 700; i++) {
    const x = (Math.random() - 0.5) * gw * 0.94;
    const spread = (Math.random() + Math.random() + Math.random() + Math.random()) / 4 - 0.5;
    const y = spread * gh * 0.45 * (1 - (Math.abs(x) / (gw * 0.55)) * 0.35);
    const r = Math.random() < 0.9 ? 0.5 + Math.random() * 0.9 : 1.3 + Math.random();
    g.fillStyle = `rgba(${STAR_TINTS[i % 3]},${0.25 + Math.random() * 0.6})`;
    g.beginPath();
    g.arc(x, y, r, 0, Math.PI * 2);
    g.fill();
  }
  return c;
}

/** Sprite nebula: quầng màu blur lớn. */
function makeBlobSprite(color: string, radius: number, alpha: number): HTMLCanvasElement {
  const s = Math.round(radius * 2);
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(radius, radius, 0, radius, radius, radius);
  grad.addColorStop(0, `rgba(${color},${alpha})`);
  grad.addColorStop(0.55, `rgba(${color},${alpha * 0.35})`);
  grad.addColorStop(1, `rgba(${color},0)`);
  g.fillStyle = grad;
  g.fillRect(0, 0, s, s);
  return c;
}

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
    let field = 0;
    let nebField = 0;
    let galSpan = 0;
    let stars: Star[] = [];
    let blobs: Blob[] = [];
    let meteors: Meteor[] = [];
    let sprites: HTMLCanvasElement[][] = [];
    let glints: HTMLCanvasElement[] = [];
    let galaxy: HTMLCanvasElement | null = null;
    let meteorHead: HTMLCanvasElement | null = null;
    let nextMeteor = 1400;
    let last = performance.now();
    let lastScroll = 0;
    let vel = 0; // vận tốc cuộn đã làm mượt (px/frame) — dùng cho hiệu ứng warp
    const mouse = { x: 0, y: 0, sx: 0, sy: 0, px: -9999, py: -9999, in: false };

    const seed = () => {
      field = h * 2;
      nebField = h * 3;
      galSpan = h * 2.6;
      sprites = TINTS.map((t) => [makeStarSprite(t, false), makeStarSprite(t, true)]);
      glints = TINTS.map((t) => makeGlintSprite(t));
      galaxy = makeGalaxySprite(w, h);
      meteorHead = makeStarSprite("214,233,255", true);
      const count = Math.min(340, Math.round((w * h) / 3900));
      stars = Array.from({ length: count }, () => {
        const p = Math.random();
        // tăng tỉ lệ sao gần (band 2) → nhiều sao to lấp lánh hơn
        const band: 0 | 1 | 2 = p < 0.48 ? 0 : p < 0.82 ? 1 : 2;
        const r =
          band === 0 ? 0.35 + Math.random() * 0.7 : band === 1 ? 0.7 + Math.random() * 1.1 : 1.2 + Math.random() * 2;
        return {
          x: Math.random() * w,
          y: Math.random() * field,
          band,
          r,
          size: band === 2 ? r * 10 : r * 4,
          phase: Math.random() * Math.PI * 2,
          speed: 0.6 + Math.random() * 1.8,
          tint: Math.random() < 0.62 ? 0 : Math.random() < 0.55 ? 1 : Math.random() < 0.6 ? 2 : 3,
        };
      });
      const base = Math.min(w, h);
      blobs = (
        [
          [w * 0.16, 0.08, 0.62, "124,92,255", 0.5, 0.1, 0.9],
          [w * 0.86, 0.24, 0.7, "35,116,217", 0.52, 0.14, 1.4],
          [w * 0.32, 0.46, 0.5, "56,189,248", 0.36, 0.18, 1.1],
          [w * 0.72, 0.62, 0.46, "236,72,153", 0.24, 0.12, 1.8],
          [w * 0.1, 0.8, 0.58, "99,102,241", 0.4, 0.16, 1.2],
        ] as const
      ).map(([x, fy, fr, color, alpha, speed, sway]) => ({
        x,
        y: nebField * fy,
        speed,
        sway,
        sprite: makeBlobSprite(color, base * fr, alpha),
      }));
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      seed();
      if (reduced) draw(performance.now(), true);
    };

    const wrapY = (y: number, scroll: number, speed: number, span: number) =>
      ((((y - scroll * speed) % span) + span) % span) - (span - h) / 2;

    /** Aurora: 2 dải sáng uốn lượn chảy liên tục ở phần trên màn hình. */
    const drawAurora = (now: number, staticFrame: boolean) => {
      const t = staticFrame ? 0 : now * 0.00012;
      for (const [fy, amp, color, alpha, phase] of AURORAS) {
        const yb = h * fy;
        ctx.beginPath();
        ctx.moveTo(-60, yb);
        for (let i = 0; i <= 24; i++) {
          const x = ((w + 120) * i) / 24 - 60;
          const y =
            yb + Math.sin(i * 0.55 + t * 40 + phase) * amp + Math.sin(i * 0.23 - t * 26 + phase) * amp * 0.6;
          ctx.lineTo(x, y);
        }
        for (let i = 24; i >= 0; i--) {
          const x = ((w + 120) * i) / 24 - 60;
          const y = yb + 110 + Math.sin(i * 0.5 + t * 34 + phase + 1.3) * amp * 0.8;
          ctx.lineTo(x, y);
        }
        ctx.closePath();
        const grad = ctx.createLinearGradient(0, yb - amp, 0, yb + 150);
        grad.addColorStop(0, `rgba(${color},0)`);
        grad.addColorStop(0.45, `rgba(${color},${alpha})`);
        grad.addColorStop(1, `rgba(${color},0)`);
        ctx.fillStyle = grad;
        ctx.fill();
      }
    };

    /** Chòm sao tương tác: nối con trỏ với các sao gần bằng tia sáng mảnh. */
    const drawConstellation = () => {
      if (!mouse.in) return;
      const R = 180;
      let linked = 0;
      for (const s of stars) {
        if (s.band === 0 || linked >= 14) continue;
        const y = wrapY(s.y, lastScroll, BAND_SPEED[s.band], field);
        const x = s.x + mouse.sx * BAND_MOUSE[s.band];
        const dx = x - mouse.px;
        const dy = y - mouse.py;
        const d = Math.hypot(dx, dy);
        if (d > R || d < 6) continue;
        linked++;
        const a = (1 - d / R) * 0.4;
        ctx.strokeStyle = `rgba(173,211,255,${a})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(mouse.px, mouse.py);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
      if (linked > 0 && meteorHead) {
        ctx.globalAlpha = 0.55;
        ctx.drawImage(meteorHead, mouse.px - 9, mouse.py - 9, 18, 18);
        ctx.globalAlpha = 1;
      }
    };

    const draw = (now: number, staticFrame = false) => {
      ctx.clearRect(0, 0, w, h);
      const scroll = window.scrollY;

      ctx.globalCompositeOperation = "lighter";

      /* --- Dải Ngân Hà: parallax 0.10×, vẽ lặp để wrap liền mạch --- */
      if (galaxy) {
        const gx = w / 2 - galaxy.width / 2 + mouse.sx * 14;
        const gy = wrapY(h * 0.5, scroll, 0.1, galSpan);
        ctx.globalAlpha = 0.9;
        ctx.drawImage(galaxy, gx, gy - galaxy.height / 2);
        ctx.drawImage(galaxy, gx, gy - galSpan - galaxy.height / 2);
        ctx.drawImage(galaxy, gx, gy + galSpan - galaxy.height / 2);
        ctx.globalAlpha = 1;
      }

      /* --- Aurora --- */
      drawAurora(now, staticFrame);

      /* --- Nebula --- */
      for (const b of blobs) {
        const half = b.sprite.width / 2;
        const y = wrapY(b.y, scroll, b.speed, nebField);
        if (y < -half || y > h + half) continue;
        const swayX = staticFrame ? 0 : Math.sin(now * 0.00005 * b.sway + b.sway * 7) * w * 0.04;
        ctx.drawImage(b.sprite, b.x + swayX + mouse.sx * 30 - half, y - half);
      }

      /* --- Sao 3 tầng + glint + WARP theo vận tốc cuộn --- */
      const warp = staticFrame ? 0 : Math.max(-1, Math.min(1, vel / 46));
      for (const s of stars) {
        const y = wrapY(s.y, scroll, BAND_SPEED[s.band], field) + mouse.sy * BAND_MOUSE[s.band] * 0.4;
        if (y < -8 || y > h + 8) continue;
        const x = s.x + mouse.sx * BAND_MOUSE[s.band];
        const tw = staticFrame ? 0.8 : 0.5 + 0.5 * Math.sin(now * 0.0012 * s.speed + s.phase);
        const alpha = (s.band === 0 ? 0.4 : s.band === 1 ? 0.65 : 0.95) * (0.35 + 0.65 * tw);
        ctx.globalAlpha = alpha;
        const sp = sprites[s.tint][s.band === 2 ? 1 : 0];
        ctx.drawImage(sp, x - s.size / 2, y - s.size / 2, s.size, s.size);

        // Warp: cuộn nhanh → sao kéo thành vệt dọc theo hướng cuộn, tầng gần dài hơn
        if (Math.abs(warp) > 0.12) {
          const len = warp * (30 + s.band * 55) * (0.4 + s.r * 0.4);
          const g = ctx.createLinearGradient(x, y, x, y - len);
          g.addColorStop(0, `rgba(${TINTS[s.tint]},${alpha * 0.7})`);
          g.addColorStop(1, `rgba(${TINTS[s.tint]},0)`);
          ctx.strokeStyle = g;
          ctx.lineWidth = Math.max(0.6, s.r * 0.8);
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x, y - len);
          ctx.stroke();
        }

        if (s.band === 2 && tw > 0.84) {
          const ga = ((tw - 0.84) / 0.16) * 0.9;
          const gs = s.size * 2.4;
          ctx.globalAlpha = ga;
          ctx.drawImage(glints[s.tint], x - gs / 2, y - gs / 2, gs, gs);
        }
      }
      ctx.globalAlpha = 1;

      /* --- Chòm sao quanh con trỏ --- */
      if (!staticFrame) drawConstellation();

      /* --- Thiên thạch: vệt đuôi gradient + đầu phát sáng --- */
      for (const m of meteors) {
        const t = m.life / m.max;
        const fade = Math.sin(Math.PI * t);
        const tail = 15;
        const g = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * tail, m.y - m.vy * tail);
        g.addColorStop(0, `rgba(214,233,255,${0.95 * fade})`);
        g.addColorStop(1, "rgba(214,233,255,0)");
        ctx.strokeStyle = g;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.vx * tail, m.y - m.vy * tail);
        ctx.stroke();
        if (meteorHead) {
          ctx.globalAlpha = fade;
          ctx.drawImage(meteorHead, m.x - 12, m.y - 12, 24, 24);
          ctx.globalAlpha = 1;
        }
      }
      ctx.globalCompositeOperation = "source-over";
    };

    const tick = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;

      mouse.sx += (mouse.x - mouse.sx) * 0.05;
      mouse.sy += (mouse.y - mouse.sy) * 0.05;

      // vận tốc cuộn làm mượt cho hiệu ứng warp
      const sc = window.scrollY;
      vel += (sc - lastScroll - vel) * 0.18;
      lastScroll = sc;

      meteors = meteors.filter((m) => (m.life += dt) < m.max);
      for (const m of meteors) {
        m.x += (m.vx * dt) / 16;
        m.y += (m.vy * dt) / 16;
      }
      nextMeteor -= dt;
      if (nextMeteor <= 0 && meteors.length < 4) {
        meteors.push({
          x: Math.random() * w * 0.9,
          y: Math.random() * h * 0.5,
          vx: 11 + Math.random() * 9,
          vy: 5 + Math.random() * 4,
          life: 0,
          max: 800 + Math.random() * 600,
        });
        nextMeteor = 1600 + Math.random() * 2600;
      }

      draw(now);
      raf = requestAnimationFrame(tick);
    };

    const onMouse = (e: MouseEvent) => {
      mouse.x = e.clientX / w - 0.5;
      mouse.y = e.clientY / h - 0.5;
      mouse.px = e.clientX;
      mouse.py = e.clientY;
      mouse.in = true;
    };
    const onLeave = () => {
      mouse.in = false;
    };

    resize();
    window.addEventListener("resize", resize);
    if (!reduced) {
      window.addEventListener("mousemove", onMouse, { passive: true });
      document.documentElement.addEventListener("mouseleave", onLeave);
      raf = requestAnimationFrame(tick);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div aria-hidden className="v5-universe fixed inset-0 z-0 overflow-hidden">
      {/* Wash màu nền tĩnh cho chiều sâu cơ bản */}
      <div className="v5-space-wash absolute inset-0" />
      <canvas ref={canvasRef} className="absolute inset-0" />
      {/* Texture nhiễu hạt + vignette tối mép cho chữ nổi */}
      <div className="v5-noise absolute inset-0" />
      <div className="v5-vignette absolute inset-0" />
    </div>
  );
}
