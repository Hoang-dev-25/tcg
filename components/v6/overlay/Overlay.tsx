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
            className="pointer-events-auto group flex items-center gap-2"
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
