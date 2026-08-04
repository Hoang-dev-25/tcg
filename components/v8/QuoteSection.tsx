"use client";

import { useEffect, useRef } from "react";

const RAINBOW_SRC =
  "https://soft-zoom-63098134.figma.site/_assets/v11/8d520a7515d06cbfc403d0125e3d05b1a7ccd29c.png";
const CLOUD_SRC =
  "https://soft-zoom-63098134.figma.site/_assets/v11/0d6dfd3f90b930f21726f2ed56a3320d79b7a797.png";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (current: number, target: number, factor: number) =>
  current + (target - current) * factor;

export function QuoteSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rainbowRef = useRef<HTMLImageElement>(null);
  const leftCloudRef = useRef<HTMLImageElement>(null);
  const rightCloudRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    /* Giá trị hiện tại (lerp mượt về target mỗi frame) */
    const state = {
      rainbowY: 120,
      leftX: -200,
      rightX: 200,
      cloudY: 0,
    };

    let raf = 0;

    const tick = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = clamp01(
        (windowHeight - rect.top) / (windowHeight + rect.height)
      );

      /* Cầu vồng: +120px → -160px theo progress */
      const rainbowTarget = 120 + progress * -280;
      state.rainbowY = lerp(state.rainbowY, rainbowTarget, 0.06);

      /* Mây: trượt vào khi 0.12 < progress < 0.92, trượt ra ngoài khoảng đó */
      const inView = progress > 0.12 && progress < 0.92;
      state.leftX = lerp(state.leftX, inView ? 0 : -200, 0.04);
      state.rightX = lerp(state.rightX, inView ? 0 : 200, 0.04);
      state.cloudY = lerp(state.cloudY, progress * -50, 0.04);

      if (rainbowRef.current) {
        rainbowRef.current.style.transform = `translate3d(0, ${state.rainbowY}px, 0)`;
      }
      if (leftCloudRef.current) {
        leftCloudRef.current.style.transform = `translate3d(${state.leftX}px, ${state.cloudY}px, 0)`;
        leftCloudRef.current.style.opacity = String(
          clamp01(1 - Math.abs(state.leftX) / 200)
        );
      }
      if (rightCloudRef.current) {
        rightCloudRef.current.style.transform = `translate3d(${state.rightX}px, ${state.cloudY}px, 0) scaleX(-1)`;
        rightCloudRef.current.style.opacity = String(
          clamp01(1 - Math.abs(state.rightX) / 200)
        );
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #010A17 0%, #0A4267 30%, #20658E 60%, #6BADC4 100%)",
      }}
    >
      <img
        ref={rainbowRef}
        src={RAINBOW_SRC}
        alt=""
        aria-hidden
        className="absolute inset-x-0 top-0 z-30 w-full will-change-transform"
        style={{ transform: "translate3d(0, 120px, 0)" }}
      />

      <img
        ref={leftCloudRef}
        src={CLOUD_SRC}
        alt=""
        aria-hidden
        className="hidden sm:block absolute left-0 bottom-[10%] z-10 w-[500px] md:w-[650px] max-w-none will-change-transform"
        style={{
          marginLeft: "-50%",
          opacity: 0,
          transform: "translate3d(-200px, 0, 0)",
        }}
      />

      <img
        ref={rightCloudRef}
        src={CLOUD_SRC}
        alt=""
        aria-hidden
        className="hidden sm:block absolute right-0 bottom-[15%] z-10 w-[500px] md:w-[650px] max-w-none will-change-transform"
        style={{
          marginRight: "-75%",
          opacity: 0,
          transform: "translate3d(200px, 0, 0) scaleX(-1)",
        }}
      />

      <div className="relative z-20 flex h-full items-center justify-center px-6">
        <figure className="max-w-4xl text-center">
          <blockquote className="font-instrument text-white text-xl sm:text-2xl md:text-4xl lg:text-[42px] leading-[1.45] md:leading-[1.5]">
            &ldquo;Serene was founded on a belief in beauty that honors your
            nature. We pursue refined outcomes, considered approaches, and
            lasting vitality. We spend time learning what matters to you before
            deciding what serves you best. No rushing, no excess &mdash; just
            support that lets you feel radiant.&rdquo;
          </blockquote>
          <figcaption className="mt-6 md:mt-8 text-white/80 text-sm md:text-base tracking-wide">
            Dr. Mia Callahan &mdash; Founder
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
