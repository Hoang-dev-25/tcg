import { featuredServices, type LucideName } from "./v3-data";

/** Config cho 3D deck "Dịch vụ nổi bật" (v4) — tách riêng theo yêu cầu refactor. */
export interface DeckService {
  icon: LucideName;
  label: string;
  title: string;
  desc: string;
  image: string;
  ctaLabel: string;
  ctaHref: string;
  isAI: boolean;
  /** Điểm AI thật (v1 data) — chỉ có ở dịch vụ isAI, chạy count-up khi thẻ được rút ra. */
  aiScore?: number;
}

/** Ảnh hệ thống v4-assets theo từng dịch vụ. */
const V4_IMAGES: Record<string, string> = {
  "Sân bay": "/v4-assets/san_bay.png",
  Billboard: "/v4-assets/billoadboard.png",
  "Màn hình LED": "/v4-assets/screen.png",
  "Pano · Hộp đèn": "/v4-assets/pano.png",
  "Dự án tiêu biểu": "/v4-assets/biloadboard_tower.png",
};

export const deckServices: DeckService[] = featuredServices.map((s) => ({
  icon: s.icon,
  label: s.label,
  title: s.title,
  desc: s.desc,
  image: V4_IMAGES[s.label] ?? s.img,
  ctaLabel: s.cta,
  ctaHref: "#lien-he",
  isAI: s.label === "Màn hình LED",
  aiScore: s.label === "Màn hình LED" ? 78 : undefined,
}));
