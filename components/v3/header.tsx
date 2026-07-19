"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { logo, nav } from "@/lib/v3-data";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-white transition-shadow ${
        scrolled ? "border-slate-200 shadow-v2-md" : "border-transparent shadow-v2-sm"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center gap-7 px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex shrink-0 items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo.src} alt={logo.alt} className="h-9 w-auto sm:h-10" />
        </a>
        <nav className="hidden flex-1 gap-6 text-[.9375rem] font-medium md:flex">
          {nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              className={
                i === 0
                  ? "font-semibold text-v2blue-600"
                  : "text-slate-600 transition-colors hover:text-v2blue-700"
              }
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#lien-he"
          className="ml-auto hidden h-11 items-center rounded-md bg-v2blue-600 px-5 text-[.9375rem] font-semibold text-white shadow-v2-sm transition hover:-translate-y-0.5 hover:bg-v2blue-700 md:inline-flex"
        >
          Yêu cầu báo giá
        </a>
        <button
          type="button"
          aria-label="Mở menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="ml-auto grid h-10 w-10 place-items-center rounded-md text-slate-700 hover:bg-slate-100 md:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <nav className="mx-auto flex max-w-[1280px] flex-col px-4 py-2 text-[.9375rem] font-medium">
            {nav.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={
                  "border-slate-100 py-3" +
                  (i === 0 ? " font-semibold text-v2blue-600" : " border-t text-slate-700")
                }
              >
                {item.label}
              </a>
            ))}
            <a
              href="#lien-he"
              onClick={() => setOpen(false)}
              className="my-3 inline-flex h-11 items-center justify-center rounded-md bg-v2blue-600 text-sm font-semibold text-white"
            >
              Yêu cầu báo giá
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
