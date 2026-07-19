"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { assets } from "@/lib/landing-data";
import { cn } from "@/lib/utils";

const links = [
  ["#top", "Trang chủ"],
  ["#mang-luoi", "Mạng lưới"],
  ["#dich-vu", "Dịch vụ"],
  ["#lien-he", "Liên hệ"],
] as const;

/** Navbar sáng, sticky; đổ bóng khi rời đỉnh trang. */
export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur transition-shadow",
        scrolled && "shadow-md"
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-6xl items-center gap-7 px-6">
        <a href="#top" className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
          <Image src={assets.logo} alt="Toàn Cầu ADV" width={132} height={40} className="h-10 w-auto" />
        </a>
        <nav className="hidden flex-1 items-center gap-6 text-[15px] font-medium text-slate-600 md:flex" aria-label="Điều hướng chính">
          {links.map(([href, label]) => (
            <a
              key={label}
              href={href}
              className="transition-colors hover:text-brand-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <Link
            href="/"
            className="hidden text-sm font-medium text-slate-500 transition-colors hover:text-brand-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 lg:block"
          >
            Parallax Lab
          </Link>
          <a
            href="#lien-he"
            className="inline-flex h-10 items-center rounded-lg bg-brick-500 px-4 text-sm font-semibold text-white shadow-md transition-colors hover:bg-brick-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            Yêu cầu báo giá
          </a>
        </div>
      </div>
    </header>
  );
}
