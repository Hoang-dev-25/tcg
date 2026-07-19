"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { logo, nav } from "@/lib/v3-data";

/**
 * Header v4 — trong suốt đè lên hero, cuộn qua ~80px thì thu gọn:
 * nền trắng mờ + backdrop-blur + viền mảnh, chữ/logo đổi về tông tối.
 */
export function HeaderV4() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-all duration-300 ${
        solid
          ? "border-slate-200/80 bg-white/85 shadow-v2-sm backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-[1280px] items-center gap-7 px-4 transition-all duration-300 sm:px-6 lg:px-8 ${
          solid ? "h-16" : "h-[80px]"
        }`}
      >
        <a href="#top" className="flex shrink-0 items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logo.src}
            alt={logo.alt}
            className={`h-9 w-auto transition-all duration-300 sm:h-10 ${
              solid ? "" : "brightness-0 invert"
            }`}
          />
        </a>
        <nav className="hidden flex-1 gap-6 text-[.9375rem] font-medium md:flex">
          {nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              className={
                i === 0
                  ? `font-semibold ${solid ? "text-v2blue-600" : "text-white"}`
                  : `transition-colors ${
                      solid ? "text-slate-600 hover:text-v2blue-700" : "text-white/75 hover:text-white"
                    }`
              }
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#lien-he"
          className={`ml-auto hidden h-11 items-center rounded-md px-5 text-[.9375rem] font-semibold transition md:inline-flex ${
            solid
              ? "bg-v2blue-600 text-white shadow-v2-sm hover:-translate-y-0.5 hover:bg-v2blue-700"
              : "border border-white/40 text-white hover:bg-white/10"
          }`}
        >
          Yêu cầu báo giá
        </a>
        <button
          type="button"
          aria-label="Mở menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={`ml-auto grid h-10 w-10 place-items-center rounded-md md:hidden ${
            solid ? "text-slate-700 hover:bg-slate-100" : "text-white hover:bg-white/10"
          }`}
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
