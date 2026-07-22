"use client";

import { useEffect, useState } from "react";
import { Menu, PhoneCall, X } from "lucide-react";

import { contactInfo, logo, nav } from "@/lib/v3-data";

/**
 * Header v5 — bản universe của header v4: trong suốt đè lên hero,
 * cuộn qua ~80px chuyển thành kính mờ TỐI (không phải trắng như v4)
 * để hòa với nền vũ trụ phía sau. Logo chuẩn luôn nằm trong chip trắng.
 */
export function HeaderV5() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  /* Link nav: gạch chân trượt vào khi hover, mục active giữ gạch chân */
  const navLink = (active: boolean) =>
    `relative py-1 font-semibold transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:origin-left after:rounded-full after:bg-current after:transition-transform after:duration-300 ${
      active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-all duration-300 ${
        open
          ? "border-white/10 bg-[#081226]"
          : scrolled
            ? "border-white/10 bg-[#081226]/80 shadow-[0_10px_36px_rgba(2,6,18,.5)] backdrop-blur-md"
            : "border-transparent bg-transparent"
      }`}
    >
      {/* Scrim tối phía trên hero — giúp cụm header đọc rõ trên nền sao */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 h-[150%] bg-gradient-to-b from-[#050B1D]/85 via-[#050B1D]/35 to-transparent transition-opacity duration-300 ${
          solid ? "opacity-0" : "opacity-100"
        }`}
      />
      <div
        className={`relative mx-auto flex max-w-[1280px] items-center gap-7 px-4 transition-all duration-300 sm:px-6 lg:px-8 ${
          solid ? "h-16" : "h-[80px]"
        }`}
      >
        <a
          href="#top"
          /* Nền tối cả hai trạng thái → logo chuẩn luôn trong chip trắng */
          className="flex shrink-0 items-center rounded-lg bg-white/95 px-2.5 py-1 shadow-v2-md backdrop-blur transition-all duration-300"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo.src} alt={logo.alt} className="h-9 w-auto sm:h-10" />
        </a>
        <nav className="hidden flex-1 gap-6 text-[.9375rem] md:flex">
          {nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              className={`${navLink(i === 0)} ${
                i === 0 ? "text-v2blue-300" : "text-white/80 hover:text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#lien-he"
          className={`v3-shine ml-auto hidden h-11 items-center gap-2 rounded-md px-5 text-[.9375rem] font-semibold transition md:inline-flex ${
            solid
              ? "bg-v2blue-600 text-white shadow-v2-sm hover:-translate-y-0.5 hover:bg-v2blue-500"
              : "bg-white text-v2blue-800 shadow-v2-md hover:-translate-y-0.5 hover:bg-v2blue-50"
          }`}
        >
          <PhoneCall className="h-4 w-4 shrink-0" />
          Nhận tư vấn
        </a>
        <button
          type="button"
          aria-label="Mở menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="ml-auto grid h-10 w-10 place-items-center rounded-md text-white hover:bg-white/10 md:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="bg-[#081226] md:hidden">
          <nav className="mx-auto flex max-w-[1280px] flex-col px-4 py-2 text-[.9375rem] font-medium">
            {nav.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={
                  "border-white/10 py-3" +
                  (i === 0 ? " font-semibold text-v2blue-300" : " border-t text-slate-200")
                }
              >
                {item.label}
              </a>
            ))}
            <a
              href="#lien-he"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-v2blue-600 text-sm font-semibold text-white"
            >
              <PhoneCall className="h-4 w-4" />
              Nhận tư vấn
            </a>
            <a
              href={`tel:${contactInfo.hotline.replace(/\s/g, "")}`}
              className="mb-3 mt-2 inline-flex h-11 items-center justify-center gap-2 rounded-md border border-white/20 text-sm font-semibold text-v2blue-200"
            >
              Hotline {contactInfo.hotline}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
