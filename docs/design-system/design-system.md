# Design System — Toàn Cầu ADV (v3 "Corporate Blue")

> **Nguồn sự thật** cho ngôn ngữ thị giác + quy tắc nội dung của website Toàn Cầu ADV.
> Chuẩn hóa từ những gì `/v3` (và bản gốc `/v2`) **đang chạy thật** trong repo này, cập nhật 2026-07-18.
> Token code: [`tailwind.config.ts`](../../tailwind.config.ts) (namespace `v2blue`, `v2-*`) và [`styles/design-tokens.css`](../../styles/design-tokens.css) (CSS variables `--tcg-*` cho môi trường ngoài Tailwind). Hai nơi này khớp hex 1:1 — sửa màu thì sửa cả hai.
> Danh mục pattern component: [`components.md`](components.md).

Lịch sử: bản này thay thế README design-system cũ ở root (đã lỗi thời phần typography — Playfair Display/IBM Plex bị loại từ 2026-07-15 vì phản hồi "UI không thân thiện"; CTA amber bị loại từ v3 Corporate Blue 2026-07-14).

---

## 1. Định vị & giọng thương hiệu

Công ty CP Tập đoàn Quảng cáo Toàn Cầu (TOAN CAU ADV) — 20+ năm OOH toàn quốc: billboard, pano, sân bay, LED, nhà chờ xe bus. Đang chuyển đổi số: bản đồ vị trí, điểm AI theo ngành hàng, báo giá tự động.

- **Tone:** uy tín, chuyên nghiệp, minh bạch — *không bao giờ* "startup playful".
- Khán giả B2B lớn tuổi, hoài nghi → thiết kế trọng trật tự, chữ to, motion tiết chế, số liệu làm bằng chứng.
- Không tuyên bố tuyệt đối ("độc quyền", "lớn nhất", "số một") nếu không có tài liệu chứng minh. Số liệu công ty (~730 vị trí, 89.000 m², 400+ nhãn hàng) khi dùng trong tài liệu đối ngoại ghi kèm "theo thông tin doanh nghiệp cung cấp".

## 2. Màu sắc

### 2.1 Thang brand `v2blue` (quanh #368FFF)

| Token | Hex | Dùng cho |
|---|---|---|
| `v2blue-50` | `#EBF4FF` | Nền section sáng xen kẽ, nền icon chip |
| `v2blue-100` | `#D6E9FF` | Nền CTA band sáng (gradient với 50) |
| `v2blue-200` | `#ADD3FF` | Viền nhạt, text phụ trên nền đậm, sao decor |
| `v2blue-300` | `#7BB8FF` | Accent trên nền đậm (typewriter, kicker, viền hover) |
| `v2blue-400` | `#57A3FF` | Gradient accent, glow |
| `v2blue-500` | `#368FFF` | **Base brand.** Mảng lớn/hero/accent — KHÔNG dùng cho chữ/nút trên nền trắng (thiếu AA) |
| `v2blue-600` | `#2374D9` | **CTA mặc định** (nút primary nền trắng), link, icon — mức tối thiểu đạt AA trên trắng |
| `v2blue-700` | `#1A5BB0` | Hover của 600, chữ đậm hơn |
| `v2blue-800` | `#134384` | Nền khối phụ trên section đậm |
| `v2blue-900` | `#0D2F5E` | **Nền section đậm** (hero, journey, lead-form), heading trên nền sáng |

### 2.2 Trung tính & vai trò

- **Neutrals:** thang `slate` của Tailwind (lạnh, hợp tông xanh). Body text `slate-600/700`; caption `slate-500`; viền `slate-200`; nền trang trắng.
- **Nền đậm dùng gradient chuẩn:** `linear-gradient(160deg,#0D2F5E 0%,#134384 60%,#1A5BB0 100%)` (hero) hoặc `linear-gradient(160deg,#0D2F5E,#1A5BB0)` (lead-form). Chữ trên nền đậm: trắng / `slate-200/300` / `v2blue-200`.
- **Không còn màu nóng:** CTA vàng/amber/brick đã loại bỏ toàn bộ. Một trang chỉ một họ accent (xanh brand).
- **Footer nền TRẮNG** (kiểu KiotViet), không dùng footer đậm.

### 2.3 Quy tắc tương phản

- Chữ thường trên nền trắng: tối thiểu `slate-600`; chữ brand tối thiểu `v2blue-600`. AA (≥4.5:1) cho body, ≥3:1 cho chữ lớn.
- Trạng thái/điểm số **không bao giờ chỉ truyền đạt bằng màu** — luôn kèm số/nhãn/icon.

## 3. Typography

| Vai trò | Font | Ghi chú |
|---|---|---|
| Display / h1 / h2 | **Lora** (`font-v2display`) | *Chỉ* tiêu đề. Weight 600–700. Subset `vietnamese` bắt buộc |
| Thân bài / UI | **Plus Jakarta Sans** (`font-v2sans`) | Mặc định toàn trang. Weight 400–800 |
| Số liệu | **Mono** (`font-mono`) | Stat, giá, ngày tháng — luôn `tabular-nums` khi xếp cột |

Nạp qua `next/font/google` trong [`app/v3/layout.tsx`](../../app/v3/layout.tsx) (variable `--font-v2-lora`, `--font-v2-jakarta`), subset `latin + vietnamese`, `display: swap`.

**Thang cỡ chữ đang dùng** (đơn vị rem; tối thiểu body 15–17px):

| Cỡ | Dùng cho |
|---|---|
| `clamp(2.5rem,4.3vw,3.2rem)` | h1 hero, leading 1.1, tracking -0.01em |
| `clamp(1.75rem,3vw,2.5rem)` / `1.875rem→4xl` | h2 section, leading 1.18 |
| `1.375rem` | h3 lớn |
| `1.125rem` (18px) | Sapo/dẫn hero |
| `1.0625rem` (17px) | Body nhấn, nút lớn |
| `.9375rem` (15px) | Body mặc định UI, nav |
| `.875rem` (14px) | Nút nhỏ |
| `.8125rem` (13px) | Caption, meta |
| `.75rem` (12px) | Kicker/eyebrow — UPPERCASE + `tracking-[.12em]` + semibold |

Nhấn mạnh trong đoạn = **đậm** hoặc `<Mark>` (gạch chân gradient vẽ dần) — không dùng italic tràn lan, không đổi font.

## 4. Hình khối & elevation

- **Bo góc mềm** (hướng "thân thiện" từ 2026-07-15): nút/input/chip `rounded-md` (8px) · card/ảnh `rounded-2xl` (16px) · band lớn `rounded-[28px]` · pill/avatar/dot `rounded-full`. Không quay lại kiểu sắc cạnh 1–6px.
- **Viền:** hairline `border-slate-200` trên nền sáng; `border-white/10..40` trên nền đậm.
- **Bóng đổ pha xanh brand** `rgba(13,47,94,…)` — không bóng đen thuần:

| Token | Giá trị | Dùng cho |
|---|---|---|
| `shadow-v2-sm` | `0 1px 2px rgba(13,47,94,.06)` | Nút, chip, badge |
| `shadow-v2-md` | `0 2px 10px rgba(13,47,94,.08)` | Header cuộn, tab active |
| `shadow-v2-lg` | `0 8px 24px rgba(13,47,94,.10)` | Card hover, ảnh, band |
| `shadow-v2-xl` | `0 16px 40px rgba(13,47,94,.14)` | Khối hero, thẻ nổi |

## 5. Layout & khoảng cách

- **Container:** `max-w-[1280px]` + `px-4 sm:px-6 lg:px-8`, căn giữa.
- **Nhịp section:** `py-20 lg:py-24`; heading block cách nội dung `mb-7…mb-14`.
- **Nền section xen kẽ:** trắng ↔ `v2blue-50` ↔ đậm (`v2blue-900`/gradient) — tạo nhịp đọc, tối đa 2 section đậm liên tiếp là không xảy ra (đậm luôn được đệm bằng sáng).
- Lưới card: `gap-4` (card dày đặc) đến `gap-7` (khối lớn); responsive `sm:2 → lg:3/4` cột.
- Touch target tối thiểu 44px (nút chuẩn h-11 = 44px, nút hero h-[54px]).

## 6. Motion

- **Easing chuẩn:** `cubic-bezier(.16,.84,.44,1)` (`--tcg-ease`, "ease-soft" của v2); Reveal dùng biến thể `[0.16,1,0.3,1]`.
- **Thời lượng:** micro (hover, màu) 150–300ms · reveal/chuyển cảnh 500–800ms · ambient (float, drift, marquee) 3–32s.
- **Chỉ animate `transform` + `opacity`.**
- **Danh mục hiệu ứng có sẵn** (khai báo trong `tailwind.config.ts` + [`app/v3/v3-theme.css`](../../app/v3/v3-theme.css)):
  - `Reveal` (fade-up 28px khi vào viewport, `once`, stagger `delay={i*0.08}`)
  - hover card: `-translate-y-1` + nâng shadow; hover nút: `-translate-y-0.5`
  - `animate-float` / `float-late` (thẻ nổi), `pulse-ring` (dot live), `pulse-soft`, `marquee-slow/fast` (logo đối tác), `v3-shine` (vệt sáng quét nút hero), `v3-star`/`v3twinkle` (sao), `v3-hex`/`v3hexglow` (lục giác phát sáng)
- **`prefers-reduced-motion` là bắt buộc:** mọi hiệu ứng phải tắt/về tĩnh (Reveal đã tự xử lý; keyframe CSS tắt trong block reduced-motion của `v3-theme.css`; nội dung luôn đọc được khi tĩnh).

## 7. Decor nền đậm

Bộ trang trí chỉ dùng trên section đậm, luôn `aria-hidden` + `pointer-events-none`, đặt dưới nội dung (`relative z-[2]` cho content). Nguồn: [`components/v3/decor.tsx`](../../components/v3/decor.tsx).

| Component | Vai trò | Thông số khuyến nghị |
|---|---|---|
| `HexTexture` | Lưới tổ ong + ô lục giác phát sáng 3 tầng (chìm `#12315E` → trung `#1A5BB0` → nổi `#368FFF`) tạo chiều sâu 3D | `size` 26–30, `glow` 11–14, `opacity-55…70`. Hero 30/12/60 · Journey 26/14/70 · LeadForm 28/11/55 |
| `StarField` | Sao lấp lánh trôi nhẹ | `count` 9–14 |
| `HeroCurves` | 3 dải cong gradient | Chỉ hero |
| `GridPattern` | Lưới vuông mờ | Legacy — ưu tiên `HexTexture` cho section mới |
| Quầng sáng radial | `radial-gradient(circle,rgba(87,163,255,.25),transparent 68%)` | 1–2 quầng/section, tràn mép |

Tối đa ~3 lớp decor một section; decor không được làm chữ dưới AA.

## 8. Iconography & hình ảnh

- **Icon:** [Lucide](https://lucide.dev) duy nhất (`lucide-react`). Stroke mặc định, cỡ 15–19px theo chữ đi kèm. **Icon luôn có nhãn chữ** — không icon trơ, không emoji, không unicode-làm-icon.
- Icon chip: khung 32–36px `rounded-[9px]…rounded-md`, nền `v2blue-50`, icon `v2blue-600`.
- **Logo:** bản full-color cho nền sáng, bản chữ trắng cho nền đậm. Không vẽ lại globe mark.
- **Ảnh:** ưu tiên ảnh thật từ `public/v1-assets/`, `public/v2-assets/`; khung `aspect-[4/3]`/`[16/10]` + `object-cover` + `rounded-2xl`; ảnh trên nền đậm thêm `ring-1 ring-white/10`; overlay đáy `linear-gradient(180deg,transparent 55%,rgba(13,47,94,.45))` khi cần đặt chữ. Placeholder tạm: picsum seed cố định.

## 9. Quy tắc nội dung (tiếng Việt)

- **Ngôn ngữ:** tiếng Việt trước (`lang="vi"`), đủ dấu. EN là giai đoạn sau.
- **Giọng:** "Toàn Cầu" / "chúng tôi" nói với "bạn" / "doanh nghiệp của bạn". Trang trọng-chuyên nghiệp nhưng giản dị, câu ngắn.
- **Casing:** Sentence case cho body + nút ("Yêu cầu báo giá"). UPPERCASE chỉ cho kicker/eyebrow và nhãn nhỏ ("20 NĂM ĐỒNG HÀNH").
- **CTA gọi tên kết quả:** "Nhận báo giá", "Nhận tư vấn", "Khám phá bản đồ vị trí", "Xem chi tiết" — không dùng "Tìm hiểu thêm" cho hành động chính.
- **Số liệu là bằng chứng:** render to, mono. Định dạng vi-VN: chấm ngăn nghìn, "đ" + "/tháng" (`45.000.000đ/tháng`), kích thước "8×12m".
- **Điểm AI phải giải thích được:** luôn = số + tier (Thấp/Trung bình/Khá/Cao) + 1 dòng "vì sao đề xuất". Không bao giờ chỉ dùng màu.
- Không em-dash trong copy hiển thị; không claim pháp lý/tuyệt đối chưa kiểm chứng.

## 10. Accessibility checklist

- [ ] Tương phản AA (body ≥4.5:1; chữ lớn ≥3:1) — nhớ ngưỡng `v2blue-600` trên trắng.
- [ ] Touch target ≥44px; focus ring hiển thị rõ trên cả nền sáng lẫn đậm.
- [ ] `prefers-reduced-motion` phủ mọi animation.
- [ ] Decor `aria-hidden`; icon trang trí không đọc bởi screen reader; nút icon có `aria-label` ("Mở menu").
- [ ] Trạng thái không chỉ bằng màu; form có nhãn + thông báo lỗi bằng chữ kèm đường khắc phục.
- [ ] Ảnh nội dung có `alt` mô tả tiếng Việt; ảnh trang trí `alt=""`.
