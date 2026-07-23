"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Facebook,
  Layers,
  MessageCircle,
  MonitorPlay,
  PhoneCall,
  RectangleHorizontal,
  Youtube,
} from "lucide-react";

import { leadForm } from "@/lib/v3-data";

/* ====================================================================== */
/* Dữ liệu wireframe — copy đúng theo brief, hình là placeholder khung dây */
/* ====================================================================== */

const MILESTONES = [
  { year: "2005", title: "Văn phòng đầu tiên", note: "Khởi đầu tại TP. Hồ Chí Minh với 5 thành viên" },
  { year: "2009", title: "Billboard đầu tay", note: "Biển tấm lớn đầu tiên trên trục QL1A" },
  { year: "2014", title: "100 khách hàng", note: "Cột mốc 100 nhãn hàng đồng hành" },
  { year: "2019", title: "Mạng lưới LED", note: "Phủ màn hình LED tại 30 tỉnh thành" },
  { year: "2024", title: "Nền tảng AI", note: "Ra mắt hệ thống dữ liệu + AI đo lường" },
];

const SERVICES = [
  {
    icon: RectangleHorizontal,
    name: "Billboard",
    desc: "Biển tấm lớn truyền thống — vị trí cửa ngõ, quốc lộ, vòng xoay.",
  },
  {
    icon: Layers,
    name: "Pano",
    desc: "In UV chất liệu bạt, chịu thời tiết, bảo trì định kỳ.",
  },
  {
    icon: MonitorPlay,
    name: "Màn hình LED",
    desc: "Độ phân giải cao, đổi nội dung và quản lý từ xa.",
  },
];

const PINS = [
  { name: "Hà Nội", x: 46, y: 16 },
  { name: "Hải Phòng", x: 55, y: 20 },
  { name: "Đà Nẵng", x: 68, y: 47 },
  { name: "Nha Trang", x: 73, y: 61 },
  { name: "TP.HCM", x: 52, y: 79 },
  { name: "Cần Thơ", x: 44, y: 85 },
];

const MAP_STATS = [
  { value: "500+", label: "dự án đã thi công" },
  { value: "200+", label: "khách hàng" },
  { value: "10M+", label: "lượt nhìn mỗi ngày" },
];

/* Ảnh hero — khung gốc 1376×768. Đổi ảnh thì đổi cả 4 góc FACE bên dưới và
   tỉ lệ trong .v6-cover (app/v6/v6.css). */
const HERO_SRC = "/v6-assets/hero-image-2.png";

/* Mặt biển quảng cáo trong ảnh, toạ độ % của khung ảnh, theo chiều kim đồng
   hồ từ góc trên-trái. Camera cảnh 01 zoom thẳng vào tâm của tứ giác này. */
const FACE = { tl: [36.3, 45.6], tr: [61.3, 38.7], br: [60.9, 59.2], bl: [40.2, 67.7] } as const;
const FACE_POLY = [FACE.tl, FACE.tr, FACE.br, FACE.bl].map((p) => p.join(",")).join(" ");
/* Tâm zoom cảnh 1 = trung bình 4 góc mặt biển */
const S1_ORIGIN = "49.7% 52.8%";

function StageShell({
  stage,
  children,
  className = "",
}: {
  stage: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section data-stage={stage} className={`v6-stage absolute inset-0 ${className}`} aria-hidden={stage !== 1}>
      {children}
    </section>
  );
}

/* ============================== CẢNH 1 =============================== */
/* Ảnh thật billboard giữa thành phố + 3 tầng khung dây zoom vào mặt biển  */

export function Stage1City({ onExplore }: { onExplore: () => void }) {
  return (
    <StageShell stage={1}>
      {/* Lớp XA — ảnh thật, grade navy/neon, trôi chậm nhất */}
      <div className="v6-s1-far v6-cover v6-photo overflow-hidden will-change-transform" style={{ ["--v6-zoom" as string]: S1_ORIGIN }}>
        <Image
          src={HERO_SRC}
          alt="Biển quảng cáo tấm lớn giữa trung tâm thành phố"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Lớp GIỮA — nét neon bám đúng mặt biển trong ảnh */}
      <div className="v6-s1-mid v6-cover will-change-transform" style={{ ["--v6-zoom" as string]: S1_ORIGIN }}>
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
          {/* Mặt biển phát sáng như đang chạy nội dung */}
          <polygon points={FACE_POLY} fill="rgba(56,189,248,.35)" className="v6-face-glow" />
          <polygon
            points={FACE_POLY}
            fill="none"
            stroke="rgba(125,211,252,.95)"
            strokeWidth={0.28}
            strokeLinejoin="round"
          />
          {/* Đường chia mặt biển — gợi lưới điểm ảnh LED */}
          <line x1={44.6} y1={43.3} x2={47.1} y2={64.9} stroke="rgba(125,211,252,.32)" strokeWidth={0.14} />
          <line x1={53.0} y1={41.0} x2={54.0} y2={62.0} stroke="rgba(125,211,252,.32)" strokeWidth={0.14} />
          <line x1={38.25} y1={56.65} x2={61.1} y2={48.95} stroke="rgba(125,211,252,.28)" strokeWidth={0.14} />

          {/* Đường dóng đo kích thước biển */}
          <line x1={36.3} y1={45.6} x2={29.5} y2={45.6} stroke="rgba(148,197,253,.55)" strokeWidth={0.12} strokeDasharray="1.2 1" />
          <line x1={40.2} y1={67.7} x2={29.5} y2={67.7} stroke="rgba(148,197,253,.55)" strokeWidth={0.12} strokeDasharray="1.2 1" />
          <line x1={30.6} y1={45.6} x2={30.6} y2={67.7} stroke="rgba(148,197,253,.7)" strokeWidth={0.16} />

          {/* Vệt đèn xe bám đúng xa lộ trên cao bên phải ảnh */}
          <path
            d="M78,12 C77,28 71,44 62,62 S48,88 42,100"
            fill="none"
            stroke="rgba(125,211,252,.85)"
            strokeWidth={0.5}
            className="v6-traffic"
          />
          <path
            d="M83,16 C82,30 77,46 69,64 S55,90 50,100"
            fill="none"
            stroke="rgba(248,113,113,.7)"
            strokeWidth={0.42}
            className="v6-traffic v6-traffic--rev"
          />
          <path
            d="M4,74 C12,82 20,90 30,100"
            fill="none"
            stroke="rgba(56,189,248,.5)"
            strokeWidth={0.36}
            className="v6-traffic v6-traffic--slow"
          />
        </svg>

        {/* Nhãn kỹ thuật cạnh mặt biển */}
        <div className="absolute" style={{ left: `${FACE.tr[0]}%`, top: `${FACE.tr[1]}%` }}>
          <div className="v6-wire ml-3 -translate-y-1/2 px-2.5 py-1.5">
            <p className="v6-label !text-[0.5625rem]">billboard 12 × 24 m</p>
            <p className="v6-shimmer font-mono text-[0.6875rem] font-bold tracking-[0.2em] text-cyan-200">
              [LOGO] · ĐANG PHÁT
            </p>
          </div>
        </div>
        <p className="v6-label absolute -translate-x-full pr-2" style={{ left: "29.5%", top: `${(FACE.tl[1] + FACE.bl[1]) / 2}%` }}>
          tâm zoom
        </p>
      </div>

      {/* Lớp GẦN — vignette + hạt sáng, trôi nhanh nhất */}
      <div className="v6-s1-near v6-cover will-change-transform" style={{ ["--v6-zoom" as string]: S1_ORIGIN }} aria-hidden>
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {Array.from({ length: 26 }, (_, i) => (
            <circle
              key={i}
              cx={(i * 37.4) % 100}
              cy={(i * 61.7) % 100}
              r={i % 4 === 0 ? 0.34 : 0.18}
              fill="rgba(186,230,253,.55)"
            />
          ))}
        </svg>
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(58% 48% at 49.7% 52.8%, transparent 40%, rgba(2,6,18,.72) 100%)" }}
        />
      </div>

      {/* Copy cảnh 1 */}
      {/* Đặt dưới đáy mặt biển (~69%) để không che ảnh */}
      <div className="v6-s1-copy absolute inset-x-0 bottom-[11%] z-10 flex flex-col items-center gap-4 px-6 text-center">
        <p className="v6-label">cảnh 01 — biển tấm lớn giữa trung tâm</p>
        <h1 className="max-w-[16ch] font-sans text-[clamp(1.9rem,5.2vw,3.9rem)] font-extrabold leading-[1.08] tracking-tight text-white [text-shadow:0_0_28px_rgba(56,130,246,.45)]">
          Thương hiệu của bạn, vươn tầm đại chúng
        </h1>
        <button
          type="button"
          onClick={onExplore}
          className="v6-wire group mt-1 inline-flex h-12 items-center gap-2 rounded-sm px-6 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100 transition hover:bg-cyan-400/10"
        >
          Khám phá ngay
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </button>
      </div>
    </StageShell>
  );
}

/* ============================== CẢNH 2 =============================== */
/* Cận cảnh màn LED — hành trình 20 năm, timeline trượt ngang             */

export function Stage2Timeline() {
  return (
    <StageShell stage={2}>
      <div className="v6-s2-inner absolute inset-0 will-change-transform">
        {/* Viền bezel màn hình + scanline */}
        <div className="v6-wire absolute inset-4 md:inset-6" aria-hidden>
          <span className="v6-label absolute left-3 top-2">led panel · p6 outdoor · 60hz</span>
          <span className="v6-label absolute right-3 top-2">signal ● live</span>
          <div className="v6-scanlines absolute inset-0" />
        </div>

        {/* Copy cảnh 2 */}
        <div className="v6-s2-copy absolute inset-x-0 top-[13%] flex flex-col items-center gap-2 px-6 text-center">
          <p className="v6-label">cảnh 02 — bên trong màn hình</p>
          <h2 className="font-sans text-[clamp(1.4rem,3.4vw,2.6rem)] font-bold text-white">
            Hành trình 20 năm kiến tạo dấu ấn
          </h2>
        </div>

        {/* Timeline ngang — GSAP kéo x theo scroll */}
        <div className="absolute inset-x-0 top-[30%] bottom-[14%] overflow-hidden">
          <div className="v6-s2-rail flex h-full w-max items-stretch gap-[6vw] px-[14vw] will-change-transform">
            {MILESTONES.map((m) => (
              <article key={m.year} className="v6-s2-card flex w-[62vw] flex-col justify-center gap-3 sm:w-[34vw] lg:w-[22vw]">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[clamp(1.6rem,3vw,2.4rem)] font-bold tabular-nums text-cyan-300">
                    {m.year}
                  </span>
                  <span className="h-px flex-1 bg-cyan-300/30" />
                </div>
                <div className="v6-xbox aspect-[4/3] w-full">
                  <span className="v6-label absolute bottom-1.5 left-2">ảnh tư liệu</span>
                </div>
                <h3 className="font-sans text-lg font-semibold text-white">{m.title}</h3>
                <p className="text-sm leading-relaxed text-slate-300">{m.note}</p>
              </article>
            ))}
          </div>
        </div>

        <p className="v6-label absolute bottom-[9%] left-1/2 -translate-x-1/2">cuộn để đi dọc timeline →</p>
      </div>

      {/* Chớp sáng khi camera xuyên qua bề mặt LED */}
      <div className="v6-s2-flash pointer-events-none absolute inset-0 bg-cyan-50" aria-hidden />
    </StageShell>
  );
}

/* ============================== CẢNH 3 =============================== */
/* Không gian ảo AI — lưới phối cảnh, luồng dữ liệu, dashboard             */

export function Stage3Ai() {
  return (
    <StageShell stage={3}>
      <div className="v6-s3-grid absolute inset-0 will-change-transform" aria-hidden>
        <svg className="h-full w-full" viewBox="0 0 1440 810" preserveAspectRatio="xMidYMid slice">
          {/* Sàn lưới hút về điểm tụ */}
          {Array.from({ length: 13 }, (_, i) => (
            <line key={`v${i}`} x1={720} y1={405} x2={i * 120} y2={810} stroke="rgba(124,92,255,.28)" />
          ))}
          {Array.from({ length: 7 }, (_, i) => {
            const k = (i + 1) / 7;
            const y = 405 + 405 * k * k;
            return <line key={`h${i}`} x1={0} y1={y} x2={1440} y2={y} stroke="rgba(56,189,248,.22)" />;
          })}
          {/* Trần mờ */}
          {Array.from({ length: 13 }, (_, i) => (
            <line key={`c${i}`} x1={720} y1={405} x2={i * 120} y2={0} stroke="rgba(124,92,255,.10)" />
          ))}
          {/* Luồng dữ liệu bay ngang */}
          <line x1={0} y1={205} x2={1440} y2={165} stroke="rgba(125,211,252,.7)" strokeWidth={1.6} className="v6-stream" />
          <line x1={0} y1={300} x2={1440} y2={330} stroke="rgba(167,139,250,.65)" strokeWidth={1.4} className="v6-stream v6-stream--2" />
          <line x1={0} y1={120} x2={1440} y2={96} stroke="rgba(94,234,212,.5)" strokeWidth={1.2} className="v6-stream v6-stream--3" />
        </svg>
      </div>

      <div className="v6-s3-copy absolute inset-x-0 top-[12%] flex flex-col items-center gap-2 px-6 text-center">
        <p className="v6-label">cảnh 03 — xuyên qua màn hình, vào không gian dữ liệu</p>
        <h2 className="max-w-[26ch] font-sans text-[clamp(1.3rem,3.2vw,2.4rem)] font-bold text-white">
          AI tối ưu hóa hiệu quả quảng cáo — phân tích thời gian thực
        </h2>
      </div>

      {/* Dashboard ảo: số liệu chạy liên tục (không phụ thuộc scroll) */}
      <div className="absolute inset-x-0 top-[38%] flex flex-wrap items-stretch justify-center gap-4 px-6 md:gap-6">
        <div className="v6-s3-card v6-wire w-[17rem] max-w-[86vw] p-5">
          <p className="v6-label">lượt nhìn hôm nay</p>
          <p className="v6-count-views mt-2 font-mono text-3xl font-bold tabular-nums text-cyan-200">1.183.420</p>
          <svg className="mt-3 h-10 w-full" viewBox="0 0 200 40" preserveAspectRatio="none" aria-hidden>
            <polyline
              points="0,32 24,28 48,30 72,20 96,24 120,14 144,18 168,8 200,12"
              fill="none"
              stroke="rgba(56,189,248,.8)"
              strokeWidth={1.6}
            />
          </svg>
        </div>
        <div className="v6-s3-card v6-wire v6-wire--violet w-[17rem] max-w-[86vw] p-5">
          <p className="v6-label">tỷ lệ chuyển đổi</p>
          <p className="v6-count-ctr mt-2 font-mono text-3xl font-bold tabular-nums text-violet-200">3,8%</p>
          <p className="mt-3 text-xs text-slate-400">trung bình các chiến dịch đang chạy</p>
        </div>
        <div className="v6-s3-card v6-wire w-[17rem] max-w-[86vw] p-5">
          <p className="v6-label">màn hình đang phát</p>
          <p className="v6-count-live mt-2 font-mono text-3xl font-bold tabular-nums text-teal-200">214</p>
          <p className="mt-3 text-xs text-slate-400">trên 30 tỉnh thành · uptime 99,7%</p>
        </div>
      </div>
    </StageShell>
  );
}

/* ============================== CẢNH 4 =============================== */
/* Dịch vụ — tia sáng bắn ra 3 module, camera lướt ngang qua từng module   */

export function Stage4Services() {
  return (
    <StageShell stage={4}>
      {/* Tia sáng từ trung tâm dữ liệu tỏa ra thành phố */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        <circle cx={50} cy={30} r={1.6} fill="rgba(125,211,252,.9)" />
        {[
          [50, 30, 16, 66],
          [50, 30, 50, 72],
          [50, 30, 84, 66],
        ].map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            pathLength={1}
            strokeDasharray={1}
            className="v6-s4-ray"
            stroke={i === 1 ? "rgba(167,139,250,.8)" : "rgba(56,189,248,.8)"}
            strokeWidth={0.35}
          />
        ))}
      </svg>

      <div className="v6-s4-copy absolute inset-x-0 top-[12%] flex flex-col items-center gap-2 px-6 text-center">
        <p className="v6-label">cảnh 04 — dịch vụ lan tỏa khắp thành phố</p>
        <h2 className="font-sans text-[clamp(1.3rem,3.2vw,2.4rem)] font-bold text-white">
          Ba trụ cột OOH tấm lớn
        </h2>
      </div>

      {/* Băng chuyền module — GSAP kéo x, từng thẻ "nở" khi đi qua tâm */}
      <div className="absolute inset-x-0 top-[30%] bottom-[10%] overflow-hidden">
        <div className="v6-s4-belt flex h-full w-max items-center gap-[9vw] pl-[38vw] pr-[16vw] will-change-transform">
          {SERVICES.map((s) => (
            <article key={s.name} className="v6-s4-card v6-wire flex w-[70vw] flex-col gap-4 p-6 sm:w-[42vw] lg:w-[27vw]">
              <div className="flex items-center gap-3">
                <span className="v6-wire grid h-11 w-11 place-items-center text-cyan-200">
                  <s.icon className="h-5 w-5" />
                </span>
                <h3 className="font-sans text-xl font-bold text-white">{s.name}</h3>
              </div>
              <div className="v6-xbox aspect-video w-full">
                <span className="v6-label absolute bottom-1.5 left-2">ảnh thực tế</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-300">{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </StageShell>
  );
}

/* ============================== CẢNH 5 =============================== */
/* Bản đồ dự án — camera lùi ra, pins bung, popup dự án tiêu biểu          */

export function Stage5Map() {
  return (
    <StageShell stage={5}>
      <div className="v6-s5-copy absolute inset-x-0 top-[10%] flex flex-col items-center gap-2 px-6 text-center">
        <p className="v6-label">cảnh 05 — dự án &amp; thành tích trên toàn quốc</p>
      </div>

      {/* Cụm bản đồ: scale từ 2.4 → 1 khi camera lùi */}
      <div className="v6-s5-mapwrap absolute inset-0 will-change-transform">
        <div className="absolute left-1/2 top-1/2 h-[68vh] -translate-x-1/2 -translate-y-[46%]" style={{ aspectRatio: "220/420" }}>
          <svg className="h-full w-full" viewBox="0 0 220 420" aria-hidden>
            <path
              d="M104 16 L128 30 L126 58 L112 72 L118 96 L134 130 L152 172 L164 214 L166 252 L156 296 L134 330 L110 356 L92 378 L84 354 L98 324 L118 296 L128 262 L124 228 L106 190 L90 152 L80 118 L68 92 L60 64 L76 44 Z"
              fill="rgba(13,26,58,.35)"
              stroke="rgba(96,165,250,.7)"
              strokeWidth={1.2}
              strokeLinejoin="round"
            />
          </svg>

          {/* Pins DOM đè theo toạ độ % */}
          {PINS.map((p) => (
            <div key={p.name} className="v6-s5-pin absolute" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
              <span className="v6-pin-ring absolute -inset-2 rounded-full border border-cyan-300/60" />
              <span className="block h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(56,189,248,.9)]" />
              <span className="v6-label absolute left-2.5 top-0 whitespace-nowrap">{p.name}</span>
            </div>
          ))}

          {/* Popup dự án tiêu biểu cạnh TP.HCM */}
          <div className="v6-s5-pop v6-wire v6-wire--violet absolute left-[58%] top-[66%] w-56 p-3">
            <p className="v6-label">dự án tiêu biểu</p>
            <div className="v6-xbox mt-2 aspect-video w-full" />
            <p className="mt-2 font-sans text-sm font-semibold text-white">Billboard cửa ngõ QL1A</p>
            <p className="font-mono text-xs tabular-nums text-violet-200">2,1 triệu lượt nhìn/tháng</p>
          </div>
        </div>
      </div>

      {/* Cột thành tích bên trái */}
      <div className="absolute left-[6%] top-1/2 hidden -translate-y-1/2 flex-col gap-6 md:flex">
        {MAP_STATS.map((s) => (
          <div key={s.label} className="v6-s5-stat">
            <p className="font-mono text-[clamp(1.6rem,3vw,2.6rem)] font-bold tabular-nums text-white">{s.value}</p>
            <p className="mt-1 text-sm text-slate-300">{s.label}</p>
          </div>
        ))}
      </div>
      {/* Bản mobile: gọn một hàng dưới đáy */}
      <div className="absolute inset-x-0 bottom-[7%] flex justify-center gap-7 md:hidden">
        {MAP_STATS.map((s) => (
          <div key={s.label} className="v6-s5-stat text-center">
            <p className="font-mono text-xl font-bold tabular-nums text-white">{s.value}</p>
            <p className="mt-0.5 text-[0.65rem] text-slate-300">{s.label}</p>
          </div>
        ))}
      </div>
    </StageShell>
  );
}

/* ============================== CẢNH 6 =============================== */
/* Liên hệ — không gian sạch, form ở trung tâm, CTA neon                   */

export function Stage6Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [agree, setAgree] = useState(false);

  return (
    <StageShell stage={6}>
      {/* Đường chân trời + lưới nhẹ cho "không gian mở" */}
      <div className="v6-blueprint absolute inset-0 opacity-60" aria-hidden />
      <div className="absolute inset-x-0 top-[68%] h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" aria-hidden />

      {/* overflow-hidden: cảnh này KHÔNG được tự cuộn, nếu không con lăn sẽ bị
          khối form nuốt mất thay vì kéo timeline */}
      <div className="absolute inset-0 flex flex-col justify-center overflow-hidden px-5 py-14">
        <div className="mx-auto grid w-full max-w-[1180px] items-center gap-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-12">
          {/* Cột thông tin — bê nguyên nội dung leadForm của v5 */}
          <div className="v6-s6-head grid gap-3">
            <p className="v6-label">cảnh 06 — bắt đầu chiến dịch của bạn</p>
            <h2 className="font-sans text-[clamp(1.35rem,2.9vw,2.15rem)] font-bold leading-[1.15] text-white">
              Sẵn sàng đưa thương hiệu của bạn lên tầm cao mới?
            </h2>
            <p className="text-[.9375rem] leading-relaxed text-slate-300">
              {leadForm.title} — {leadForm.desc}
            </p>
            <ul className="m-0 grid list-none gap-1.5 p-0">
              {leadForm.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm leading-snug text-slate-200">
                  <span className="v6-wire mt-[2px] grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full text-cyan-200">
                    <Check className="h-3 w-3" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-x-8 gap-y-2 border-y border-white/15 py-3">
              {leadForm.stats.map((s) => (
                <div key={s.label} className="grid gap-0.5">
                  <strong className="font-mono text-xl font-bold tabular-nums text-white">{s.value}</strong>
                  <span className="v6-label">{s.label}</span>
                </div>
              ))}
            </div>
            <div className="grid gap-0.5">
              <span className="v6-label">cần tư vấn ngay?</span>
              <a
                href={`tel:${leadForm.hotline.replace(/\s/g, "")}`}
                className="font-mono text-[1.35rem] font-bold tabular-nums text-cyan-200"
              >
                {leadForm.hotline}
              </a>
            </div>
          </div>

          {/* Card form — 6 trường của v5 + ghi chú + xác nhận */}
          <div className="relative">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className={`v6-wire grid grid-cols-1 gap-3 p-4 transition-opacity sm:grid-cols-2 sm:p-6 ${
                submitted ? "pointer-events-none opacity-0" : "opacity-100"
              }`}
            >
              {leadForm.fields.map((f) => (
                <label key={f.label} className="v6-s6-field v6-wire v6-wire--dashed flex flex-col gap-1 px-3 py-2">
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
              <label className="v6-s6-field v6-wire v6-wire--dashed flex flex-col gap-1 px-3 py-2 sm:col-span-2">
                <span className="v6-label">nhu cầu / ghi chú</span>
                <textarea
                  rows={2}
                  placeholder="Mô tả ngắn nhu cầu quảng cáo…"
                  className="resize-none bg-transparent font-sans text-sm leading-relaxed text-white outline-none placeholder:text-slate-500"
                />
              </label>
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
                className="v6-s6-cta v6-neon-cta inline-flex h-12 items-center justify-center gap-2 rounded-sm border px-6 font-mono text-sm font-bold uppercase tracking-[0.2em] text-white transition disabled:cursor-not-allowed disabled:opacity-45 sm:justify-self-end"
              >
                Liên hệ ngay <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            {/* Trạng thái đã gửi — phủ lên form, form vẫn mount để timeline không mất target */}
            {submitted && (
              <div className="v6-wire absolute inset-0 grid place-content-center justify-items-center gap-2.5 p-8 text-center">
                <span className="v6-wire grid h-14 w-14 place-items-center rounded-full text-cyan-200">
                  <CheckCircle2 className="h-7 w-7" />
                </span>
                <strong className="font-sans text-2xl text-white">Đã nhận yêu cầu của bạn</strong>
                <p className="text-sm text-slate-300">
                  Chúng tôi sẽ liên hệ trong 24h làm việc. Mã yêu cầu:{" "}
                  <span className="font-mono font-semibold tabular-nums text-white">TC-2607-018</span>
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="v6-wire mt-2 inline-flex h-11 items-center px-5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-cyan-400/10"
                >
                  Gửi yêu cầu khác
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Hotline + mạng xã hội */}
        <div className="v6-s6-foot mx-auto mt-8 flex max-w-[1180px] items-center justify-center gap-5 text-slate-300">
          <a
            href={`tel:${leadForm.hotline.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-2 font-mono text-sm tabular-nums text-cyan-200"
          >
            <PhoneCall className="h-4 w-4" /> {leadForm.hotline}
          </a>
          <span className="h-4 w-px bg-white/20" />
          <a href="#" aria-label="Facebook" className="transition hover:text-cyan-200"><Facebook className="h-4 w-4" /></a>
          <a href="#" aria-label="Youtube" className="transition hover:text-cyan-200"><Youtube className="h-4 w-4" /></a>
          <a href="#" aria-label="Zalo" className="transition hover:text-cyan-200"><MessageCircle className="h-4 w-4" /></a>
        </div>
      </div>
    </StageShell>
  );
}
