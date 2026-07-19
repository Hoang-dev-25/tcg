import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        ink: {
          950: "#060a13",
          900: "#0a1120",
          850: "#0d1527",
          800: "#121d36",
          700: "#1b2a4a",
          600: "#27395f",
        },
        neon: {
          amber: "#ffb224",
          cyan: "#2ee6ff",
        },
        /* Palette trang OOH theme sáng (Toàn Cầu ADV) */
        brand: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#368FFF",
          600: "#2374D9",
          700: "#1D5FB8",
          800: "#173F85",
          900: "#12315E",
        },
        brick: {
          500: "#C2410C",
          600: "#9A3412",
        },
        /* Palette riêng cho /v3 — copy đúng hex gốc của v2-tcg, tách biệt khỏi "brand" (lệch vài mã hex) */
        v2blue: {
          50: "#EBF4FF",
          100: "#D6E9FF",
          200: "#ADD3FF",
          300: "#7BB8FF",
          400: "#57A3FF",
          500: "#368FFF",
          600: "#2374D9",
          700: "#1A5BB0",
          800: "#134384",
          900: "#0D2F5E",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        v2display: ["var(--font-v2-lora)", "Georgia", "serif"],
        v2sans: ["var(--font-v2-jakarta)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
      },
      boxShadow: {
        "glow-amber": "0 0 24px rgba(255, 178, 36, 0.35), 0 0 80px rgba(255, 178, 36, 0.12)",
        "glow-cyan": "0 0 24px rgba(46, 230, 255, 0.3), 0 0 80px rgba(46, 230, 255, 0.1)",
        billboard: "0 24px 80px -16px rgba(0, 0, 0, 0.8)",
        "v2-sm": "0 1px 2px rgba(13,47,94,.06)",
        "v2-md": "0 2px 10px rgba(13,47,94,.08)",
        "v2-lg": "0 8px 24px rgba(13,47,94,.10)",
        "v2-xl": "0 16px 40px rgba(13,47,94,.14)",
      },
      keyframes: {
        "pulse-soft": {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
        "drift-a": {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(4%, -6%, 0) scale(1.08)" },
        },
        "drift-b": {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1.05)" },
          "50%": { transform: "translate3d(-5%, 4%, 0) scale(1)" },
        },
        "dash-flow": {
          to: { strokeDashoffset: "-24" },
        },
        "scroll-hint": {
          "0%": { transform: "translate3d(0, 0, 0)", opacity: "0" },
          "30%": { opacity: "1" },
          "100%": { transform: "translate3d(0, 10px, 0)", opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -10px, 0)" },
        },
        marquee: {
          from: { transform: "translate3d(0, 0, 0)" },
          to: { transform: "translate3d(-50%, 0, 0)" },
        },
        "pulse-ring": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(35, 116, 217, 0.45)" },
          "50%": { boxShadow: "0 0 0 8px rgba(35, 116, 217, 0)" },
        },
      },
      animation: {
        "pulse-soft": "pulse-soft 3.2s ease-in-out infinite",
        "drift-a": "drift-a 18s ease-in-out infinite",
        "drift-b": "drift-b 22s ease-in-out infinite",
        "dash-flow": "dash-flow 1.6s linear infinite",
        "scroll-hint": "scroll-hint 2s ease-in-out infinite",
        float: "float 5.5s ease-in-out infinite",
        "float-late": "float 6.5s ease-in-out -2.6s infinite",
        "marquee-slow": "marquee 32s linear infinite",
        "marquee-fast": "marquee 20s linear infinite",
        "pulse-ring": "pulse-ring 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
