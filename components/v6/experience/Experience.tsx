"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import { scrollState } from "./progress";
import { V6Overlay } from "@/components/v6/overlay/Overlay";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export function V6Experience() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const st = ScrollTrigger.create({
      trigger: trackRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        scrollState.progress = self.progress;
      },
    });

    return () => {
      st.kill();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-[#04091a]">
      {/* Track cuộn — chiều cao quyết định độ dài "phim" */}
      <div ref={trackRef} style={{ height: "1400vh" }} />
      <div className="fixed inset-0 z-0">
        <Scene />
      </div>
      <V6Overlay />
    </div>
  );
}
