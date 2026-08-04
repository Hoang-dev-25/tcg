"use client";

import { useState } from "react";

import { PillButton } from "./Button";

const NAV_LINKS = ["About", "Services", "Journal", "Contact"];

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5">
        <a href="#" className="font-script text-white text-2xl md:text-3xl">
          Serene
        </a>

        <nav className="hidden md:flex items-center gap-12">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="text-white/80 hover:text-white text-sm tracking-wide transition-colors duration-300"
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <PillButton>Book a consultation</PillButton>
        </div>

        {/* Hamburger → X (mobile) */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[7px]"
        >
          <span
            className="block h-[2px] w-6 bg-white transition-all duration-500"
            style={{
              transitionTimingFunction: EASE,
              transform: open ? "translateY(9px) rotate(45deg)" : "none",
            }}
          />
          <span
            className="block h-[2px] w-6 bg-white transition-all duration-500"
            style={{
              transitionTimingFunction: EASE,
              opacity: open ? 0 : 1,
              transform: open ? "scaleX(0)" : "none",
            }}
          />
          <span
            className="block h-[2px] w-6 bg-white transition-all duration-500"
            style={{
              transitionTimingFunction: EASE,
              transform: open ? "translateY(-9px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </header>

      {/* Backdrop */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/50 transition-opacity duration-500 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Panel trượt từ phải */}
      <aside
        className={`md:hidden fixed top-0 right-0 bottom-0 z-40 w-[85%] max-w-[340px] bg-[#0a0608]/95 backdrop-blur-xl border-l border-white/10 flex flex-col justify-between px-8 pt-28 pb-10 transition-transform duration-500 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ transitionTimingFunction: EASE }}
      >
        <nav className="flex flex-col gap-7">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link}
              href="#"
              onClick={() => setOpen(false)}
              className="text-white/90 hover:text-white text-2xl tracking-wide transition-all duration-500"
              style={{
                transitionTimingFunction: EASE,
                transitionDelay: open ? `${150 + i * 75}ms` : "0ms",
                opacity: open ? 1 : 0,
                transform: open ? "translateX(0)" : "translateX(24px)",
              }}
            >
              {link}
            </a>
          ))}
        </nav>

        <div
          className="transition-all duration-500"
          style={{
            transitionTimingFunction: EASE,
            transitionDelay: open ? "450ms" : "0ms",
            opacity: open ? 1 : 0,
            transform: open ? "translateX(0)" : "translateX(24px)",
          }}
        >
          <PillButton className="w-full">Book a consultation</PillButton>
        </div>
      </aside>
    </>
  );
}
