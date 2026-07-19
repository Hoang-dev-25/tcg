import type { Metadata } from "next";
import { Be_Vietnam_Pro, Big_Shoulders_Display } from "next/font/google";

import "./globals.css";

const heading = Big_Shoulders_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-heading",
  display: "swap",
});

const body = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Parallax Lab — 18 lớp hiệu ứng cuộn",
  description:
    "Trang demo scrollytelling: 18 layer parallax, mỗi layer một kỹ thuật — multi-speed, depth zoom, sticky stack, cuộn ngang, exploded view, velocity skew, 3D perspective, canvas scrub, vẽ nét SVG, text stagger, color morph, mouse parallax, footer reveal…",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={`${heading.variable} ${body.variable}`}>
      <body className="min-h-dvh overflow-x-hidden bg-ink-950">{children}</body>
    </html>
  );
}
