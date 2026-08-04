import { PillButton } from "./Button";
import { Navbar } from "./Navbar";

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4";

export function Hero() {
  return (
    <section className="relative h-screen overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={HERO_VIDEO}
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="absolute inset-0 bg-black/20" />

      <Navbar />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 -mt-[120px]">
        <h1 className="font-instrument text-white text-[36px] md:text-7xl lg:text-[110px] leading-[0.9] tracking-tight text-center text-glow">
          Gentle touch.
          <br />
          Radiant presence.
        </h1>
        <p className="text-white/70 text-sm md:text-base text-center mt-5 md:mt-7 max-w-xl">
          Expert beauty and holistic wellness, delivered with warmth and
          intention.
        </p>
        <PillButton className="mt-6 md:mt-9">Begin your renewal</PillButton>
      </div>

      {/* Chỉ báo âm thanh (desktop) */}
      <div className="absolute bottom-8 left-8 hidden md:flex items-center gap-4">
        <div className="liquid-glass flex h-10 w-10 items-center justify-center rounded-full border border-white/20">
          <span className="block h-[2px] w-3 rounded-full bg-white/80" />
        </div>
        <div className="text-white/60 text-xs leading-relaxed">
          <p>Experience</p>
          <p>with sound</p>
        </div>
      </div>
    </section>
  );
}
