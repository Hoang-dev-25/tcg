"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  Facebook,
  Linkedin,
  Monitor,
  MousePointer2,
  Phone,
  RectangleHorizontal,
  Youtube,
} from "lucide-react";

import {
  AI,
  BRAND,
  CONTACT,
  HERO,
  MAP_STATS,
  MAP_TITLE,
  MILESTONES,
  SERVICES,
  TIMELINE_TITLE,
} from "@/components/v7/data";
import { scrollApi, scrollState } from "@/components/v7/experience/progress";
import { STAGES } from "@/components/v7/experience/world";
import { AssetStatus } from "./AssetStatus";
import { ContactForm } from "./ContactForm";
import { Dashboard } from "./Dashboard";
import { ProjectPopups } from "./ProjectPopups";

/* ===== Lớp chữ DOM nổi trên cảnh 3D =====
   Mỗi giai đoạn chỉ 1–2 dòng copy, mờ vào/mờ ra đúng lúc camera tới nơi.
   Toàn bộ đọc scrollState trong gsap.ticker — không setState theo frame. */

const SERVICE_RANGES: Array<[number, number]> = [
  [0.525, 0.605],
  [0.607, 0.667],
  [0.669, 0.725],
];

const SERVICE_ICONS = [RectangleHorizontal, MousePointer2, Monitor];

export function V7Overlay() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current!;
    const blocks = Array.from(root.querySelectorAll<HTMLElement>("[data-range]"));
    const dots = Array.from(root.querySelectorAll<HTMLElement>("[data-dot]"));
    const milestones = Array.from(root.querySelectorAll<HTMLElement>("[data-ms]"));
    const noteEl = root.querySelector<HTMLElement>("[data-ms-note]")!;
    const fill = root.querySelector<HTMLElement>(".v7-rail-fill")!;
    const hint = root.querySelector<HTMLElement>("[data-hint]")!;

    gsap.set(blocks, { autoAlpha: 0, y: 22 });

    let lastMs = -1;
    const tick = () => {
      const p = scrollState.current;

      fill.style.transform = `scaleX(${p.toFixed(4)})`;

      for (const el of blocks) {
        const [a, b] = el.dataset.range!.split(",").map(Number);
        const on = p >= a && p <= b;
        if ((el.dataset.on === "1") !== on) {
          el.dataset.on = on ? "1" : "0";
          gsap.to(el, {
            autoAlpha: on ? 1 : 0,
            y: on ? 0 : 22,
            duration: 0.45,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      }

      let idx = 0;
      STAGES.forEach((s, i) => {
        if (p >= s.start - 0.005) idx = i;
      });
      dots.forEach((d, i) => d.setAttribute("data-active", i === idx ? "1" : "0"));

      /* Cột mốc đang trôi qua trên màn LED (khớp panelAt trong LedWallLayer) */
      const ms = Math.min(
        MILESTONES.length - 1,
        Math.max(0, Math.floor(((p - 0.215) / (0.315 - 0.215)) * MILESTONES.length))
      );
      if (ms !== lastMs) {
        lastMs = ms;
        milestones.forEach((el, i) => el.setAttribute("data-active", i === ms ? "1" : "0"));
        noteEl.textContent = `${MILESTONES[ms].title} — ${MILESTONES[ms].note}`;
      }

      hint.style.opacity = p < 0.015 && !scrollState.engaged ? "1" : "0";
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  return (
    <div ref={rootRef} className="pointer-events-none absolute inset-0 z-10">
      {/* ── Header ─────────────────────────────────────────── */}
      <header className="absolute inset-x-0 top-0 flex items-start justify-between p-4 md:p-6">
        <div className="v7-card pointer-events-auto px-3.5 py-2.5">
          <p className="text-sm font-extrabold tracking-[0.22em] text-white">
            {BRAND.short.toUpperCase()}
          </p>
          <p className="v7-label mt-0.5">{BRAND.tagline}</p>
        </div>
        <a href={`tel:${BRAND.hotline.replace(/\s/g, "")}`} className="v7-card v7-hotline pointer-events-auto">
          <Phone className="h-4 w-4" />
          <span className="hidden sm:inline">{BRAND.hotline}</span>
        </a>
      </header>

      {/* ── G1 · Toàn cảnh thành phố đêm ───────────────────── */}
      <section
        data-range="0,0.105"
        className="absolute inset-x-0 bottom-[15%] flex flex-col items-center gap-4 px-6 text-center"
      >
        <p className="v7-label">{HERO.eyebrow}</p>
        <h1 className="v7-h1 max-w-[17ch]">{HERO.title}</h1>
        <p className="max-w-[38ch] text-[0.95rem] text-slate-300 sm:text-base">{HERO.sub}</p>
        <button type="button" onClick={() => scrollApi.goTo(0.19, 1.6)} className="v7-cta group pointer-events-auto">
          {HERO.cta}
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </button>
      </section>

      {/* ── G2 · Hành trình 20 năm ─────────────────────────── */}
      <section data-range="0.135,0.208" className="absolute inset-x-0 bottom-[13%] px-6 text-center">
        <p className="v7-label">2005 — 2025</p>
        <h2 className="v7-h2 mx-auto mt-1 max-w-[20ch]">{TIMELINE_TITLE}</h2>
      </section>

      <section data-range="0.212,0.322" className="absolute inset-x-0 bottom-[11%] px-6">
        <div className="v7-card mx-auto max-w-3xl px-5 py-4">
          <ol className="flex items-center justify-between gap-2">
            {MILESTONES.map((m, i) => (
              <li key={m.year} data-ms={i} className="v7-ms flex-1 text-center">
                <span className="v7-ms-dot" />
                <span className="v7-ms-year">{m.year}</span>
              </li>
            ))}
          </ol>
          <p data-ms-note className="mt-3 text-center text-sm text-slate-300">
            {MILESTONES[0].title} — {MILESTONES[0].note}
          </p>
        </div>
      </section>

      {/* ── G3 · Công nghệ AI ──────────────────────────────── */}
      <section data-range="0.355,0.505" className="absolute inset-x-0 bottom-[12%] px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="v7-h2 mx-auto max-w-[24ch]">{AI.title}</h2>
          <p className="mx-auto mt-2 max-w-[44ch] text-[0.95rem] text-slate-300">{AI.sub}</p>
          <div className="mt-5">
            <Dashboard />
          </div>
        </div>
      </section>

      {/* ── G4 · Ba module dịch vụ ─────────────────────────── */}
      {SERVICES.map((s, i) => {
        const Icon = SERVICE_ICONS[i];
        return (
          <section
            key={s.id}
            data-range={SERVICE_RANGES[i].join(",")}
            className="absolute bottom-[10%] left-1/2 w-[min(92vw,26rem)] -translate-x-1/2 px-2 md:left-8 md:translate-x-0"
          >
            <div className="v7-card p-5">
              <div className="flex items-center gap-3">
                <span className="v7-icon">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="v7-label">{s.kicker}</p>
                  <h3 className="text-xl font-extrabold text-white">{s.name}</h3>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{s.desc}</p>
              <ul className="mt-3 space-y-1">
                {s.specs.map((sp) => (
                  <li key={sp} className="flex gap-2 text-[0.8rem] text-slate-400">
                    <span className="text-[#57a3ff]">—</span>
                    {sp}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      {/* ── G5 · Dự án & thành tích ────────────────────────── */}
      <ProjectPopups />
      <section data-range="0.73,0.885" className="absolute inset-x-0 bottom-[9%] px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="v7-h2 mx-auto max-w-[26ch]">{MAP_TITLE}</h2>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            {MAP_STATS.map((s) => (
              <div key={s.label} className="v7-card px-4 py-2.5 text-left">
                <span className="v7-num block text-xl font-extrabold text-white">{s.value}</span>
                <span className="v7-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── G6 · Liên hệ ───────────────────────────────────── */}
      <section
        data-range="0.885,1"
        className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-5 py-16"
      >
        <h2 className="v7-h2 max-w-[22ch] text-center">{CONTACT.title}</h2>
        <p className="max-w-[42ch] text-center text-[0.95rem] text-slate-300">{CONTACT.sub}</p>
        <div className="pointer-events-auto w-[min(94vw,42rem)]">
          <ContactForm />
        </div>
        <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-3">
          <a href={`tel:${BRAND.hotline.replace(/\s/g, "")}`} className="v7-hotline v7-card">
            <Phone className="h-4 w-4" /> {BRAND.hotline}
          </a>
          {[Facebook, Youtube, Linkedin].map((Icon, i) => (
            <a key={i} href="#" aria-label="Mạng xã hội" className="v7-social">
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
        <p className="text-center text-xs text-slate-500">
          {BRAND.legal} · {BRAND.address}
        </p>
      </section>

      {/* ── HUD: thanh tiến trình + 6 chấm giai đoạn ───────── */}
      <nav className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 pb-3">
        <ul className="pointer-events-auto flex items-center gap-1.5">
          {STAGES.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                data-dot
                data-active="0"
                onClick={() => scrollApi.goTo(s.hold, 1.5)}
                className="v7-dot"
                aria-label={`Tới giai đoạn ${i + 1}: ${s.label}`}
              >
                <span className="v7-dot-label">{s.label}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="v7-rail">
          <span className="v7-rail-fill" />
        </div>
      </nav>

      {/* Gợi ý cuộn — tự ẩn ngay khi người dùng chạm vào con lăn */}
      <div data-hint className="v7-hint">
        <span className="v7-hint-wheel" />
        Cuộn để bay
      </div>

      <AssetStatus />
    </div>
  );
}
