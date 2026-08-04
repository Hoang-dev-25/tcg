"use client";

import { Bloom, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";

/* Hậu kỳ: bloom CHỌN LỌC (chỉ vật toneMapped=false vượt ngưỡng mới nở),
   vignette kéo mắt vào tâm, noise rất nhẹ để dải gradient tối không bị banding. */
export function V7Effects({ enabled }: { enabled: boolean }) {
  if (!enabled) return null;
  return (
    <EffectComposer>
      <Bloom mipmapBlur intensity={0.62} luminanceThreshold={0.82} luminanceSmoothing={0.2} />
      <Vignette eskil={false} offset={0.24} darkness={0.78} />
      <Noise opacity={0.022} />
    </EffectComposer>
  );
}
