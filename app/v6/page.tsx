import { V6Wireframe } from "@/components/v6/wireframe";

/**
 * v6 — bản wireframe scrollytelling "Parallax Zoom":
 * cả trang là MỘT viewport 100vh không thanh cuộn; con lăn chuột chỉ kéo
 * tiến trình của một timeline GSAP duy nhất — camera zoom sâu dần qua 6 cảnh
 * (Thành phố đêm → màn LED 20 năm → không gian AI → Dịch vụ → Bản đồ → Liên hệ).
 * Mọi hình đều là khung dây (wireframe) để chốt bố cục + nhịp chuyển động
 * trước khi thay bằng art thật (WebGL) ở các đợt sau.
 */
export default function V6Page() {
  return <V6Wireframe />;
}
