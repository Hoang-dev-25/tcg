import type { ButtonHTMLAttributes } from "react";

/* Nút pill trắng dùng chung cho navbar, hero CTA và mobile menu. */
export function PillButton({
  className = "",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`bg-white text-black px-8 py-3.5 rounded-full font-medium text-sm tracking-wide hover:bg-white/90 transition-all duration-300 button-glow ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
