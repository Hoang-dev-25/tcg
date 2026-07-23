"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import {
  Stage1City,
  Stage2Timeline,
  Stage3Ai,
  Stage4Services,
  Stage5Map,
  Stage6Contact,
} from "@/components/v6/stages";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Bộ khung scrollytelling một-viewport:
 * - Scroller riêng (ẩn thanh cuộn) cao TRACK_VH; viewport sticky 100dvh bên trong.
 * - MỘT timeline GSAP duy nhất scrub theo scroll — trục thời gian tính bằng
 *   "unit" (1 unit ≈ 100vh cuộn), tổng TOTAL_UNITS.
 * - Mỗi cảnh là một lớp absolute; chuyển cảnh = cảnh cũ phóng to + mờ đi,
 *   cảnh mới nở ra từ tâm (cảm giác camera zoom xuyên lớp).
 */
const TOTAL_UNITS = 14;
const TRACK_VH = TOTAL_UNITS * 100 + 100;
/* Mốc bắt đầu từng cảnh trên trục unit — dùng cho rail điều hướng */
const STAGE_STARTS = [0, 1.7, 4.45, 6.9, 9.6, 12.4];
const STAGE_NAMES = ["Thành phố", "20 năm", "Công nghệ AI", "Dịch vụ", "Dự án", "Liên hệ"];

export function V6Wireframe() {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollToUnit = useRef<(u: number) => void>(() => {});

  useGSAP(
    () => {
      const scroller = rootRef.current!;
      const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      /* Reduced-motion: giữ crossfade nhưng triệt tiêu biên độ zoom (tiền đình) */
      const z = (v: number) => (rm ? 1 + (v - 1) * 0.05 : v);

      /* ---- trạng thái đầu: chỉ cảnh 1 hiện ---- */
      gsap.set(".v6-stage", { autoAlpha: 0 });
      gsap.set('[data-stage="1"]', { autoAlpha: 1 });
      gsap.set(".v6-s2-flash", { autoAlpha: 0 });
      gsap.set(".v6-progress-fill", { scaleX: 0, transformOrigin: "0 50%" });

      const dots = gsap.utils.toArray<HTMLElement>(".v6-dot");
      const stageLabel = scroller.querySelector<HTMLElement>(".v6-stage-label");
      const setBar = gsap.quickSetter(".v6-progress-fill", "scaleX");

      /* ---- timeline chính, scrub theo scroller ẩn thanh cuộn ---- */
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: trackRef.current,
          scroller,
          start: "top top",
          end: "bottom bottom",
          scrub: rm ? true : 0.9,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setBar(self.progress);
            const u = self.progress * TOTAL_UNITS;
            let idx = 0;
            for (let i = 0; i < STAGE_STARTS.length; i++) if (u >= STAGE_STARTS[i] - 0.2) idx = i;
            dots.forEach((d, i) => d.setAttribute("data-active", i === idx ? "1" : "0"));
            if (stageLabel) stageLabel.textContent = `0${idx + 1} · ${STAGE_NAMES[idx]}`;
          },
        },
      });

      /* ============ CẢNH 1: thành phố đêm (0 → 1) ============ */
      tl.to(".v6-hint", { autoAlpha: 0, duration: 0.2 }, 0.1)
        .fromTo(".v6-s1-far", { scale: 1 }, { scale: z(1.06), duration: 1 }, 0)
        .fromTo(".v6-s1-mid", { scale: 1 }, { scale: z(1.14), duration: 1 }, 0)
        .fromTo(".v6-s1-near", { scale: 1 }, { scale: z(1.26), duration: 1 }, 0)
        .to(".v6-s1-copy", { autoAlpha: 0, y: -44, duration: 0.25 }, 0.72);

      /* ============ CHUYỂN 1→2: zoom vào màn LED (1 → 2.2) ============ */
      tl.to(".v6-s1-far", { scale: z(4.2), duration: 1.2, ease: "power1.in" }, 1)
        .to(".v6-s1-mid", { scale: z(6.8), duration: 1.2, ease: "power1.in" }, 1)
        .to(".v6-s1-near", { scale: z(9.5), autoAlpha: 0, duration: 1.1, ease: "power1.in" }, 1)
        .to('[data-stage="1"]', { autoAlpha: 0, duration: 0.35 }, 1.85)
        .fromTo('[data-stage="2"]', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, 1.7)
        .fromTo(".v6-s2-inner", { scale: z(0.52) }, { scale: 1, duration: 0.8, ease: "power1.out" }, 1.7)
        .fromTo(".v6-s2-copy", { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.3 }, 2.2);

      /* ============ CẢNH 2: pan dọc timeline 20 năm (2.5 → 4) ============ */
      const railX = () => {
        const rail = scroller.querySelector<HTMLElement>(".v6-s2-rail")!;
        return -(rail.scrollWidth - scroller.clientWidth);
      };
      tl.fromTo(".v6-s2-rail", { x: 0 }, { x: railX, duration: 1.5 }, 2.5);

      /* ============ CHUYỂN 2→3: xuyên qua bề mặt LED (4 → 5) ============ */
      tl.to(".v6-s2-flash", { autoAlpha: 0.85, duration: 0.12, ease: "power2.in" }, 4.05)
        .to(".v6-s2-flash", { autoAlpha: 0, duration: 0.28 }, 4.2)
        .to(".v6-s2-inner", { scale: z(6), duration: 0.9, ease: "power1.in" }, 4)
        .to('[data-stage="2"]', { autoAlpha: 0, duration: 0.4 }, 4.55)
        .fromTo('[data-stage="3"]', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, 4.45)
        .fromTo(".v6-s3-grid", { scale: z(1.9) }, { scale: 1, duration: 1.1, ease: "power1.out" }, 4.45)
        .fromTo(".v6-s3-copy", { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.3 }, 5.1)
        .fromTo(
          ".v6-s3-card",
          { autoAlpha: 0, y: 44 },
          { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.16 },
          5.3
        );

      /* Trôi nhẹ tiếp trong không gian dữ liệu (5.6 → 6.5) */
      tl.to(".v6-s3-grid", { scale: z(0.92), duration: 0.9 }, 5.6);

      /* ============ CHUYỂN 3→4: tia sáng bắn ra thành phố (6.5 → 7.5) ============ */
      tl.to('[data-stage="3"]', { autoAlpha: 0, scale: z(2.6), duration: 0.9, ease: "power1.in" }, 6.5)
        .fromTo('[data-stage="4"]', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, 6.9)
        .fromTo(
          ".v6-s4-ray",
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 0.5, stagger: 0.12 },
          6.9
        )
        .fromTo(".v6-s4-copy", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.3 }, 7.3);

      /* ============ CẢNH 4: camera lướt qua 3 module dịch vụ (7.5 → 9.3) ============ */
      const beltX = () => {
        const belt = scroller.querySelector<HTMLElement>(".v6-s4-belt")!;
        return -(belt.scrollWidth - scroller.clientWidth);
      };
      tl.fromTo(".v6-s4-belt", { x: 0 }, { x: beltX, duration: 1.8 }, 7.5)
        .fromTo(
          ".v6-s4-card",
          { scale: 0.9, autoAlpha: 0.4 },
          { scale: 1, autoAlpha: 1, duration: 0.4, stagger: 0.6 },
          7.55
        );

      /* ============ CHUYỂN 4→5: camera lùi ra lộ bản đồ (9.3 → 10.3) ============ */
      tl.to('[data-stage="4"]', { autoAlpha: 0, scale: z(0.45), duration: 0.9, ease: "power1.in" }, 9.3)
        .fromTo('[data-stage="5"]', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, 9.6)
        .fromTo(".v6-s5-mapwrap", { scale: z(2.4) }, { scale: 1, duration: 1, ease: "power1.out" }, 9.6)
        .fromTo(".v6-s5-copy", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, 10.2);

      /* ============ CẢNH 5: pins bung + popup + thành tích (10.3 → 12) ============ */
      tl.fromTo(
        ".v6-s5-pin",
        { scale: 0, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 0.25, stagger: 0.12, ease: "back.out(2)" },
        10.4
      )
        .fromTo(
          ".v6-s5-stat",
          { autoAlpha: 0, y: 26 },
          { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.15 },
          10.6
        )
        .fromTo(
          ".v6-s5-pop",
          { autoAlpha: 0, scale: 0.8, y: 14 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.6)" },
          11.2
        );

      /* ============ CHUYỂN 5→6: tới không gian liên hệ (12 → 12.9) ============ */
      tl.to('[data-stage="5"]', { autoAlpha: 0, scale: z(1.7), duration: 0.8, ease: "power1.in" }, 12)
        .fromTo('[data-stage="6"]', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, 12.4)
        .fromTo(".v6-s6-head", { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 12.8)
        .fromTo(
          ".v6-s6-field",
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.1 },
          13
        )
        .fromTo(
          ".v6-s6-cta",
          { autoAlpha: 0, scale: 0.9 },
          { autoAlpha: 1, scale: 1, duration: 0.3, ease: "back.out(1.7)" },
          13.5
        )
        .fromTo(".v6-s6-foot", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, 13.7)
        .to({}, { duration: 0.3 }, 13.7); /* đệm giữ khung cuối */

      /* ---- dashboard AI: số liệu nhảy LIÊN TỤC, độc lập với scroll ---- */
      if (!rm) {
        const viewsEl = scroller.querySelector<HTMLElement>(".v6-count-views");
        const ctrEl = scroller.querySelector<HTMLElement>(".v6-count-ctr");
        const liveEl = scroller.querySelector<HTMLElement>(".v6-count-live");
        const views = { v: 1_183_420 };
        gsap.to(views, {
          v: "+=260000",
          duration: 90,
          ease: "none",
          repeat: -1,
          onUpdate: () => {
            if (viewsEl) viewsEl.textContent = Math.floor(views.v).toLocaleString("vi-VN");
          },
        });
        const ctr = { v: 3.2 };
        gsap.to(ctr, {
          v: 4.6,
          duration: 3.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          onUpdate: () => {
            if (ctrEl) ctrEl.textContent = `${ctr.v.toFixed(1).replace(".", ",")}%`;
          },
        });
        const live = { v: 214 };
        gsap.to(live, {
          v: 240,
          duration: 60,
          ease: "none",
          repeat: -1,
          yoyo: true,
          onUpdate: () => {
            if (liveEl) liveEl.textContent = String(Math.floor(live.v));
          },
        });
      }

      /* ---- parallax theo con trỏ: cả khối cảnh nghiêng rất nhẹ ---- */
      let removeMove: (() => void) | undefined;
      if (!rm) {
        const mx = gsap.quickTo(".v6-mouse", "x", { duration: 0.7, ease: "power3" });
        const my = gsap.quickTo(".v6-mouse", "y", { duration: 0.7, ease: "power3" });
        const onMove = (e: PointerEvent) => {
          mx((e.clientX / window.innerWidth - 0.5) * -16);
          my((e.clientY / window.innerHeight - 0.5) * -12);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        removeMove = () => window.removeEventListener("pointermove", onMove);
      }

      /* ---- điều hướng: CTA + dot nhảy tới mốc cảnh ---- */
      scrollToUnit.current = (u: number) => {
        const st = tl.scrollTrigger!;
        scroller.scrollTo({
          top: st.start + ((st.end - st.start) * u) / TOTAL_UNITS,
          behavior: rm ? "auto" : "smooth",
        });
      };

      return () => removeMove?.();
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      className="v6-noscroll h-dvh w-full overflow-y-auto overflow-x-hidden bg-[#04091a] text-slate-100"
    >
      <div ref={trackRef} style={{ height: `${TRACK_VH}vh` }}>
        <div className="sticky top-0 h-dvh overflow-hidden">
          {/* Nền blueprint + vignette dùng chung mọi cảnh */}
          <div className="v6-blueprint absolute inset-0 opacity-40" aria-hidden />
          <div
            className="pointer-events-none absolute inset-0 z-20"
            style={{ background: "radial-gradient(115% 90% at 50% 50%, transparent 58%, rgba(2,6,18,.75) 100%)" }}
            aria-hidden
          />

          {/* Khối cảnh — nghiêng nhẹ theo con trỏ */}
          <div className="v6-mouse absolute inset-0 will-change-transform">
            <Stage1City onExplore={() => scrollToUnit.current(2.6)} />
            <Stage2Timeline />
            <Stage3Ai />
            <Stage4Services />
            <Stage5Map />
            <Stage6Contact />
          </div>

          {/* ===== HUD cố định ===== */}
          <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between p-4 md:p-6">
            <div className="v6-wire pointer-events-auto px-3 py-2">
              <p className="font-mono text-sm font-bold tracking-[0.24em] text-white">TOÀN CẦU ADV</p>
              <p className="v6-label mt-0.5">ooh · billboard · pano · led</p>
            </div>
            <p className="v6-label text-right leading-relaxed">
              v6 · wireframe 01
              <br />
              parallax zoom prototype
            </p>
          </header>

          {/* Rail điều hướng 6 cảnh bên phải */}
          <nav className="absolute right-4 top-1/2 z-30 flex -translate-y-1/2 flex-col items-end gap-4 md:right-6" aria-label="Các cảnh">
            {STAGE_NAMES.map((name, i) => (
              <button
                key={name}
                type="button"
                data-active={i === 0 ? "1" : "0"}
                onClick={() => scrollToUnit.current(STAGE_STARTS[i] + 0.35)}
                className="v6-dot group flex items-center gap-2"
                aria-label={`Tới cảnh ${name}`}
              >
                <span className="v6-label opacity-0 transition group-hover:opacity-100 group-data-[active=1]:opacity-100">
                  {name}
                </span>
                <span className="h-2 w-2 rounded-full border border-cyan-300/60 transition group-data-[active=1]:bg-cyan-300 group-data-[active=1]:shadow-[0_0_10px_rgba(56,189,248,.9)]" />
              </button>
            ))}
          </nav>

          {/* Thanh tiến trình + nhãn cảnh hiện tại */}
          <footer className="absolute inset-x-0 bottom-0 z-30 flex items-center gap-3 p-4 md:p-6">
            <p className="v6-stage-label v6-label w-28 shrink-0">01 · Thành phố</p>
            <div className="h-px flex-1 bg-white/15">
              <div className="v6-progress-fill h-full w-full bg-gradient-to-r from-cyan-300 to-violet-400" />
            </div>
            <p className="v6-hint v6-label shrink-0">
              cuộn để zoom <span className="v6-blink">▼</span>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
