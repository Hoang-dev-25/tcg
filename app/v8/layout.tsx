import type { Metadata } from "next";
import { Dancing_Script, Instrument_Serif, Inter } from "next/font/google";

import "./v8.css";

/* Spec v8 "Serene": Dancing Script cho logo, Instrument Serif cho heading/quote,
   Inter cho thân bài — load qua next/font thay cho <link> Google Fonts. */
const script = Dancing_Script({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-v8-script",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-v8-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-v8-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Serene — Gentle touch. Radiant presence.",
  description:
    "Expert beauty and holistic wellness, delivered with warmth and intention.",
};

export default function V8Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${script.variable} ${serif.variable} ${inter.variable} v8-root bg-[#0a0608] text-white antialiased`}
    >
      {children}
    </div>
  );
}
