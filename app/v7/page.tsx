import { V7Experience } from "@/components/v7/experience/Experience";

/**
 * v7 — "Xuyên qua ánh sáng": scrollytelling + parallax zoom trong MỘT viewport
 * 100dvh, không thanh cuộn dọc. Con lăn điều khiển tiến trình một cú máy 3D
 * liền mạch qua 6 giai đoạn.
 *
 * Chỗ trống chờ asset Blender: components/v7/assets/manifest.ts
 * Spec cho người dựng 3D:      docs/v7-blender-spec.md
 */
export default function V7Page() {
  return <V7Experience />;
}
