"use client";

import { partnerLogoToken, partners, type Partner } from "@/lib/v3-data";

function logoUrl(domain: string) {
  return `https://img.logo.dev/${domain}?token=${partnerLogoToken}&format=png&size=200&retina=true`;
}

function Row({ items, duration }: { items: Partner[]; duration: number }) {
  return (
    <div className="overflow-hidden">
      <div
        className="flex w-max gap-4 motion-safe:animate-[marquee_var(--dur)_linear_infinite]"
        style={{ ["--dur" as string]: `${duration}s` }}
      >
        {[...items, ...items].map((p, i) => (
          <div
            key={`${p.name}-${i}`}
            title={p.name}
            className="grid h-[52px] w-[140px] flex-none place-items-center rounded-md border border-slate-200 bg-white px-4 shadow-v2-sm"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoUrl(p.domain)}
              alt={p.name}
              loading="lazy"
              className="max-h-7 max-w-full object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
              onError={(e) => {
                const el = e.currentTarget;
                el.style.display = "none";
                const parent = el.parentElement;
                if (parent) {
                  parent.textContent = p.name;
                  parent.className +=
                    " text-[.75rem] font-semibold text-slate-500 text-center leading-tight";
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Partners() {
  return (
    <section className="border-y border-slate-100 bg-slate-50 py-14">
      <div className="mx-auto grid max-w-[1280px] gap-6 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-3.5">
          <Row items={partners.slice(0, 6)} duration={30} />
          <Row items={partners.slice(6)} duration={22} />
        </div>
      </div>
    </section>
  );
}
