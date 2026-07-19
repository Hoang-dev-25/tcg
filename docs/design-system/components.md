# Danh mục pattern component — Toàn Cầu ADV

> Công thức các pattern đang chạy thật trong `/v3`. Mỗi mục ghi file nguồn + "công thức class" cốt lõi để tái tạo ở trang mới. Nền tảng (màu/chữ/motion) xem [`design-system.md`](design-system.md).

## Nút (buttons)

| Biến thể | Công thức | Nguồn |
|---|---|---|
| **Primary (nền sáng)** | `inline-flex h-11 items-center gap-2 rounded-md bg-v2blue-600 px-5 text-sm font-semibold text-white shadow-v2-sm transition hover:bg-v2blue-700` (± `hover:-translate-y-0.5`) | `header.tsx`, `cases.tsx` |
| **Primary hero (54px)** | `h-[54px] rounded-md bg-v2blue-600 px-7 text-[1.0625rem] font-semibold text-white shadow-v2-lg hover:bg-v2blue-500` + lớp `v3-shine` (vệt sáng quét) | `hero.tsx` |
| **Primary đậm nhất** | như trên nhưng `bg-v2blue-900` — dùng trên nền `v2blue-100/50` (CTA band) | `cta-band.tsx` |
| **Outline (nền đậm)** | `h-[54px] rounded-md border border-white/40 px-6 font-semibold text-white hover:bg-white/10` | `hero.tsx` |
| **Outline (nền sáng)** | `h-[54px] rounded-md border-[1.5px] border-v2blue-300 px-6 font-semibold text-v2blue-900 hover:border-v2blue-400` | `cta-band.tsx` |

Quy ước chung: icon Lucide 18–19px đặt sau nhãn, `gap-2…2.5`; nhãn CTA gọi tên kết quả.

## Header

`header.tsx` — sticky trắng, đổ bóng khi cuộn:
- Khung: `sticky top-0 z-40 border-b bg-white` + đổi `shadow-v2-sm → shadow-v2-md` khi `scrollY > 10`; cao `h-[72px]`, container 1280px.
- Nav desktop: `text-[.9375rem] font-medium text-slate-600 hover:text-v2blue-700`; mục hiện tại `font-semibold text-v2blue-600`.
- CTA phải: nút Primary h-11. Mobile: nút hamburger 40px + panel xổ dọc, đóng khi chọn mục.

## Section chuẩn

- Khung: `py-20 lg:py-24` + nền (trắng / `bg-v2blue-50` / đậm `bg-v2blue-900 text-white`), container `mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8`.
- Heading block (giữa): kicker `text-xs font-semibold uppercase tracking-[.12em] text-v2blue-600` (nền đậm: `text-v2blue-300`) → h2 `font-v2display text-[1.875rem] font-semibold leading-[1.18] text-v2blue-900 sm:text-4xl` (± `<Mark>` gạch chân gradient) → sapo `max-w-[640px] text-[1.0625rem] text-slate-500`.
- Biến thể heading trái + hành động phải: `flex flex-wrap items-center justify-between gap-4` (xem `cases.tsx`).
- Bọc `<Reveal>` cho khối heading; card lưới stagger `delay={i * 0.08}`.

## Card

| Loại | Công thức | Nguồn |
|---|---|---|
| **Card tin/case** | `grid h-full grid-rows-[auto_1fr] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-v2-sm transition hover:-translate-y-1 hover:shadow-v2-lg` · ảnh `aspect-[16/10]` + tag pill `bg-v2blue-600/95` góc trên trái · thân `p-[16px_18px_20px]`: ngày mono → h3 `font-v2display text-base` → link "Đọc tiếp →" `text-v2blue-600` | `cases.tsx` |
| **Thẻ nổi (floating badge)** | `absolute flex items-center gap-2.5 rounded-md border border-white/15 bg-white/95 px-4 py-3 shadow-v2-xl backdrop-blur motion-safe:animate-float` · icon chip 36px `bg-v2blue-50 text-v2blue-600` · 2 dòng: đậm 15px `text-v2blue-900` + phụ 12px `text-slate-500` | `hero.tsx` |
| **Tab dọc (spotlight)** | `flex h-14 items-center gap-2.5 rounded-md px-[18px] font-semibold` · active: `bg-gradient-to-br from-v2blue-900 to-v2blue-500 text-white shadow-v2-md` · nghỉ: `border border-slate-200 bg-white text-slate-700 hover:border-v2blue-300` | `spotlight.tsx` |
| **Chip info trắng (trên band)** | `flex items-center gap-2.5 rounded-md border border-slate-200 bg-white px-4 py-2.5 shadow-v2-lg` | `cta-band.tsx` |

## Stat band

`hero.tsx` — dải số liệu đáy hero: `border-t border-white/10 bg-v2blue-900/60 backdrop-blur` · lưới `grid-cols-3` · số `font-mono text-2xl…3xl font-bold tabular-nums` · nhãn `text-[.8125rem] text-slate-300`.

## CTA band

`cta-band.tsx` — khối kết trang trên nền trắng: `rounded-[28px] p-9…p-[72px] shadow-v2-lg` nền `linear-gradient(120deg,#D6E9FF,#EBF4FF)` · trái = h2 + desc + cặp nút (primary `bg-v2blue-900` + outline) + note nhỏ · phải = ảnh `aspect-[16/10] rounded-2xl animate-float` + chip info đè góc.

## Form (lead-form)

`lead-form.tsx` — section đậm gradient + `HexTexture`/`StarField`; 2 cột: trái = kicker + h2 + benefit list (mỗi dòng dot check 20px `bg-v2blue-500 rounded-full` + chữ `text-slate-200`); phải = form nền trắng. Input chuẩn: nền trắng, `rounded-md`, viền `slate-200`, focus viền/ring brand; nhãn rõ; lỗi bằng chữ.

## Journey / timeline

`journey.tsx` — section đậm `bg-v2blue-900` + `HexTexture` + `StarField`; trục ngang `h-[3px]` gradient `#57A3FF→#ADD3FF` xuyên 5 mốc (`md:grid-cols-5`), mỗi mốc icon + năm + mô tả, stagger `delay={i*0.1}`.

## Footer

`footer.tsx` — nền TRẮNG `border-t border-slate-200`: trái = logo + tên pháp nhân + trụ sở/hotline/email/giờ + social (vòng 36px `border-slate-200 text-v2blue-700`); phải = Google Maps iframe `rounded-2xl`; dưới = 4 cột link `text-slate-600 hover:text-v2blue-700`; cuối = dòng ©.

## Decor & tiện ích

- `<Reveal delay y className>` — fade-up khi vào viewport (`components/landing/reveal.tsx`), tự tắt với reduced-motion. Mặc định cho mọi khối nội dung.
- `<Mark>` — gạch chân gradient vẽ dần dưới từ nhấn trong h2 (`decor.tsx`).
- `<HexTexture size glow className>` / `<StarField count>` / `<HeroCurves>` — decor nền đậm, thông số xem design-system.md §7.
- `v3-shine` — vệt sáng quét ngang cho nút hero (class CSS trong `v3-theme.css`).
