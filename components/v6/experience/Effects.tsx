"use client";

import { Bloom, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";

export function V6Effects({ enabled }: { enabled: boolean }) {
  if (!enabled) return null;
  return (
    <EffectComposer>
      {/* luminanceThreshold cao: chỉ mặt neon toneMapped=false vượt ngưỡng */}
      <Bloom mipmapBlur intensity={0.45} luminanceThreshold={0.9} luminanceSmoothing={0.15} />
      <Vignette eskil={false} offset={0.28} darkness={0.72} />
      <Noise opacity={0.02} />
    </EffectComposer>
  );
}
