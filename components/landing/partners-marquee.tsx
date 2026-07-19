"use client";

/* eslint-disable @next/next/no-img-element */

import { motion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";

import { useParallaxFactor } from "@/hooks/useParallaxFactor";
import { partnerLogo, partners } from "@/lib/landing-data";

function LogoCell({ name, domain }: { name: string; domain: string }) {
  return (
    <div
      title={name}
      className="grid h-[52px] w-[140px] flex-none place-items-center rounded-lg border border-slate-200 bg-white px-4 shadow-sm"
    >
      <img
        src={partnerLogo(domain)}
        alt={name}
        loading="lazy"
        width={108}
        height={28}
        className="max-h-7 w-auto max-w-full object-contain opacity-70 grayscale transition-[filter,opacity] hover:opacity-100 hover:grayscale-0"
        onError={(event) => {
          const el = event.currentTarget;
          el.style.display = "none";
          const parent = el.parentElement;
          if (parent) {
            parent.textContent = name;
            parent.className += " text-xs font-semibold text-slate-500";
          }
        }}
      />
    </div>
  );
}

function Row({ items, fast }: { items: typeof partners; fast?: boolean }) {
  return (
    <div className="w-full overflow-hidden">
      <div
        className={`flex w-max gap-4 ${fast ? "animate-marquee-fast" : "animate-marquee-slow"} motion-reduce:animate-none`}
      >
        {[...items, ...items].map((p, i) => (
          <LogoCell key={`${p.domain}-${i}`} name={p.name} domain={p.domain} />
        ))}
      </div>
    </div>
  );
}

/**
 * Băng logo đối tác 2 hàng chạy liên tục; cả cụm nghiêng nhẹ (skewX)
 * theo vận tốc cuộn — cuộn nhanh nghiêng mạnh, dừng thì trả về 0.
 */
export function PartnersMarquee() {
  const factor = useParallaxFactor();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 300 });
  const skewX = useTransform(smoothVelocity, [-2500, 2500], [-6 * factor, 6 * factor]);

  return (
    <section className="bg-slate-100 py-14" aria-label="Đối tác và nhãn hàng đồng hành">
      <motion.div
        className="mx-auto grid max-w-6xl gap-3.5 px-6 will-change-transform"
        style={{ skewX }}
      >
        <Row items={partners.slice(0, 6)} />
        <Row items={partners.slice(6)} fast />
      </motion.div>
    </section>
  );
}
