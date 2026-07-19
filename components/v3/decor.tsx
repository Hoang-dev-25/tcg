"use client";

import { useId, type ReactNode } from "react";
import { motion } from "framer-motion";

/** Trường sao lấp lánh (nền tối) — vị trí tất định để không lệch hydrate. */
export function StarField({ count = 12, className = "" }: { count?: number; className?: string }) {
  const stars = Array.from({ length: count }, (_, i) => ({
    top: ((i * 53) % 90) + 4,
    left: ((i * 37) % 92) + 4,
    size: i % 3 === 0 ? 3 : 2,
    color: i % 2 ? "#7BB8FF" : "#ADD3FF",
    delay: i * 0.3,
  }));
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {stars.map((s, i) => (
        <span
          key={i}
          className="v3-star"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            background: s.color,
            animationDelay: `${s.delay}s, ${s.delay * 0.85}s`,
          }}
        />
      ))}
    </div>
  );
}

/** Lưới grid mờ (section nền tối) — như case-study/#ban-do của v2. */
export function GridPattern({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 opacity-60 ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px)",
        backgroundSize: "36px 36px",
      }}
    />
  );
}

/**
 * Họa tiết tổ ong phát sáng (glow-scatter) cho section nền tối.
 * Lớp 1: lưới lục giác nền (SVG pattern, viền mảnh, nền trong suốt → giữ màu nền đậm).
 * Lớp 2: vài ô lục giác sáng theo 3 tầng độ sáng → tạo chiều sâu 3D.
 * Vị trí & tầng sáng tất định theo index nên không lệch khi hydrate.
 */
export function HexTexture({
  size = 28,
  glow = 13,
  className = "",
}: {
  size?: number;
  glow?: number;
  className?: string;
}) {
  const gridId = `hex${useId().replace(/:/g, "")}`; // id duy nhất/an toàn mỗi lần dùng → tránh trùng khi lặp nhiều section
  const R = size; // bán kính lục giác (tâm → đỉnh)
  const hh = (Math.sqrt(3) * R) / 2; // nửa chiều cao lục giác flat-top
  // 6 đỉnh của lục giác flat-top quanh gốc (0,0)
  const hex = `${R},0 ${R / 2},${hh} ${-R / 2},${hh} ${-R},0 ${-R / 2},${-hh} ${R / 2},${-hh}`;

  // 3 tầng: chìm (không animate) → trung → nổi (glow mạnh nhất)
  const tiers = [
    { fill: "#12315E", fillOp: 0.45, stroke: "rgba(87,163,255,.28)", shadow: 0, anim: false },
    { fill: "#1A5BB0", fillOp: 0.5, stroke: "rgba(123,184,255,.55)", shadow: 10, anim: true },
    { fill: "#368FFF", fillOp: 0.6, stroke: "rgba(173,211,255,.9)", shadow: 20, anim: true },
  ];

  const cells = Array.from({ length: glow }, (_, i) => ({
    top: ((i * 61) % 84) + 6,
    left: ((i * 43) % 88) + 5,
    tier: i % 3,
    delay: (i % 5) * 0.7,
  }));

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* Lớp 1 — lưới tổ ong nền */}
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={gridId} width={R * 3} height={hh * 2} patternUnits="userSpaceOnUse">
            <polygon points={hex} fill="none" stroke="rgba(87,163,255,.08)" strokeWidth="1" />
            <polygon
              points={hex}
              transform={`translate(${R * 1.5},${hh})`}
              fill="none"
              stroke="rgba(87,163,255,.08)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${gridId})`} />
      </svg>

      {/* Lớp 2 — các ô phát sáng (glow-scatter) */}
      {cells.map((c, i) => {
        const t = tiers[c.tier];
        return (
          <svg
            key={i}
            className={t.anim ? "v3-hex" : undefined}
            viewBox={`${-R} ${-hh} ${R * 2} ${hh * 2}`}
            style={{
              position: "absolute",
              top: `${c.top}%`,
              left: `${c.left}%`,
              width: R * 2,
              height: hh * 2,
              marginLeft: -R,
              marginTop: -hh,
              overflow: "visible",
              animationDelay: t.anim ? `${c.delay}s` : undefined,
              filter: t.shadow ? `drop-shadow(0 0 ${t.shadow}px rgba(55,143,255,.55))` : undefined,
            }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon points={hex} fill={t.fill} fillOpacity={t.fillOp} stroke={t.stroke} strokeWidth="1.2" />
          </svg>
        );
      })}
    </div>
  );
}

/** Gạch chân gradient vẽ dần khi vào khung nhìn (mark-draw của v2). */
export function Mark({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block">
      {children}
      <motion.span
        aria-hidden
        className="absolute inset-x-0 bottom-[.04em] h-[.12em] origin-left rounded-sm"
        style={{ background: "linear-gradient(90deg,#57A3FF,#ADD3FF)", opacity: 0.85 }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 0.84, 0.44, 1] }}
      />
    </span>
  );
}

/** Đường cong gradient trang trí trong hero (như v2). */
export function HeroCurves() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
      viewBox="0 0 1440 600"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="v3hcA" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#368FFF" stopOpacity=".55" />
          <stop offset="100%" stopColor="#ADD3FF" stopOpacity=".05" />
        </linearGradient>
        <linearGradient id="v3hcB" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#7BB8FF" stopOpacity=".4" />
          <stop offset="100%" stopColor="#1A5BB0" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="v3hcC" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ADD3FF" stopOpacity=".35" />
          <stop offset="100%" stopColor="#368FFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0,420 C280,340 480,500 760,430 C1040,360 1180,480 1440,380 L1440,600 L0,600 Z"
        fill="url(#v3hcA)"
      />
      <path
        d="M0,90 C260,20 520,140 820,70 C1080,10 1260,120 1440,50 L1440,0 L0,0 Z"
        fill="url(#v3hcB)"
      />
      <path
        d="M200,600 C420,500 620,560 900,470 C1120,400 1300,470 1440,430 L1440,600 Z"
        fill="url(#v3hcC)"
      />
    </svg>
  );
}
