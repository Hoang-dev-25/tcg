# Toàn Cầu ADV — Design System

> **⚠️ Tài liệu lịch sử (một phần đã lỗi thời).** Nguồn sự thật hiện tại: [`docs/design-system/design-system.md`](docs/design-system/design-system.md) (+ [`components.md`](docs/design-system/components.md), token CSS [`styles/design-tokens.css`](styles/design-tokens.css)). Khác biệt chính: typography chuẩn nay là **Lora (tiêu đề) + Plus Jakarta Sans (thân bài)** — không còn Playfair Display/IBM Plex; bo góc chuyển sang hệ mềm 8–28px. Các quy tắc nội dung/thương hiệu bên dưới vẫn còn giá trị và đã được gộp vào tài liệu mới.

Design system for **CÔNG TY CỔ PHẦN TẬP ĐOÀN QUẢNG CÁO TOÀN CẦU** (Global Advertisement Group JSC, "TOAN CAU ADV") — a 20+ year Vietnamese out-of-home (OOH) advertising company: billboards, pano, airport advertising, bus shelters, LED screens. HQ: 265 Thụy Khuê, Tây Hồ, Hà Nội. \~730 airport-system ad faces, \~89.000 m² ad surface, 400+ brands served (per company-provided figures — cite as "theo thông tin doanh nghiệp cung cấp" in external material).

**Product in scope:** the corporate website + first-party OOH sales system ("website as a 24/7 OOH consulting & quoting assistant"): interactive location map, AI suitability scores per industry, quote builder, lead capture. Public web only (CRM/admin is a later phase).

## Sources

- Codebase: mounted local folder `tcg-landing-page/` (Next.js 15 + Tailwind 4 + shadcn scaffold; pages are mostly stubs — the **docs are the source of truth**):
  - `docs/design-system/design-system.md` — canonical visual language (tokens, type scale, component patterns §7). This design system implements it 1:1; hex values are source-of-truth.
  - `docs/design-styles.md` — art direction rationale ("Corporate Trust / Institutional Blue" primary, data-driven map-first product areas, restrained motion for an older, skeptical B2B audience).
  - `docs/design-system/wireframe-homepage.md` (+ about/services wireframes) — annotated homepage spec used for the website UI kit.
- Skills applied per request (saved in-project: `skills/taste-skill/SKILL.md`, `skills/ui-ux-pro-max/SKILL.md`; sources: https://github.com/Leonxlnx/taste-skill.git, https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git). See "Skill application" below.
- Logos uploaded: `assets/logo-full.png` (full-color, light backgrounds), `assets/logo-global-white.png` (light lettering, for navy/dark backgrounds).
- Company background brief (Vietnamese) supplied in-project — see Content fundamentals.

## Brand positioning

20+ năm kinh nghiệm OOH toàn quốc; mạng lưới vị trí rộng (sân bay, billboard, LED, nhà chờ); đang chuyển đổi số (bản đồ vị trí, điểm AI, báo giá tự động). Tone: uy tín, chuyên nghiệp, minh bạch — never "startup playful". Avoid absolute claims ("độc quyền", "lớn nhất", "số một") unless documented.

## CONTENT FUNDAMENTALS

- **Language:** Vietnamese first (`lang="vi"`). EN is a later phase. All UI copy in Vietnamese with proper diacritics.
- **Voice:** first-person-plural công ty ("Toàn Cầu", "chúng tôi") addressing "bạn" / "doanh nghiệp của bạn". Formal-professional but plain; short sentences that scan.
- **Casing:** Sentence case for body & buttons ("Yêu cầu báo giá", "Khám phá bản đồ vị trí"). UPPERCASE reserved for small caption labels/eyebrows (e.g. "NĂM OOH", "VỊ TRÍ OOH") and section kickers.
- **CTAs name the outcome:** "Nhận báo giá", "Nhận tư vấn", "Xem chi tiết", "+ Thêm vào báo giá" — never vague "Tìm hiểu thêm" for primary actions.
- **Numbers are proof:** stats rendered large in mono ("20+", "\~730", "89.000 m²"). Vietnamese number format: dot thousands separator, "đ" suffix, "/tháng" (45.000.000đ/tháng). Sizes as "8×12m".
- **Explainability:** AI scores always come with a number + tier label (Thấp/Trung bình/Khá/Cao) + a one-line "vì sao đề xuất" reason. Never color-only.
- **Emoji:** not used in UI. Lucide icons with text labels instead.
- **No absolute/legal claims** without verification; company figures get "theo thông tin doanh nghiệp cung cấp" in external docs.

## VISUAL FOUNDATIONS (v3 "Corporate Blue" — cập nhật 2026-07-14)

User-specified palette update: brand blue `#368FFF`; yêu cầu bỏ hoàn toàn CTA vàng/amber; nav 5 mục; multi-page dùng chung header + footer; footer dạng KiotViet (nền sáng, thông tin công ty + bản đồ + 4 cột link).

- **Palette:** Blue ramp quanh `#368FFF` (base 500). Nút/chuwx trên nền trắng dùng blue-600 `#2374D9` trở lên (AA); blue-500 chỉ cho mảng lớn/hero/accent. `--cta` = blue-600 (không còn màu nóng). Hero/CTA band nền blue-900 `#0D2F5E`. Slate neutrals lạnh. Footer nền TRẮNG.
- **Dark mode:** nền `#0B1526`, primary/cta → blue-300.
- **Type:** giữ hệ v2 — Playfair Display (display/h1/h2, subset VI) + IBM Plex Sans + IBM Plex Mono cho số liệu.
- **Shape/elevation/motion:** giữ v2 — bán kính sắc cạnh 1–6px (pill ngoại lệ), hairline border, bóng nhạt (nay pha xanh `rgba(35,116,217,…)` qua alias), motion 150/250/400ms.
- **Nav (5 mục cố định):** Trang chủ · Bản đồ · Dịch vụ · Tin tức · Liên hệ + nút "Yêu cầu báo giá" (blue). Trang hiện tại được highlight.
- **Footer chuẩn (mọi trang):** nền trắng, trái = logo + tên công ty + trụ sở/hotline/email/giờ làm việc + social; phải = bản đồ trụ sở; dưới = 4 cột (Doanh nghiệp · Dịch vụ · Vị trí OOH · Hotline với số mono đậm); cuối = dòng ©.
- **Imagery/status/layout rules:** như v2 (ảnh thật/placeholder picsum đã audit, status không chỉ dùng màu, container 1280px).
- Legacy alias tokens (`--navy-*`, `--green-*` → blue; `--amber-*`, `--brick-*` → blue; `--slate-*`/`--stone-*` → slate) giữ code cũ đúng brand — code mới viết theo `--blue-*` hoặc semantic roles.

<details><summary>v2 "Editorial Evergreen" (retired 2026-07-14)</summary> Evergreen #234D3A + Brick #A84A24 + Stone, nền ngà #FCFCFA — thay bởi v3 theo yêu cầu màu #368FFF và bỏ CTA nóng. </details>

## ICONOGRAPHY

- **System:** [Lucide](https://lucide.dev) (matches `lucide-react` in the codebase). Stroke 1.5–2px, sized to text (16/20px). Loaded via CDN (`lucide@latest` UMD) in cards and kits — the codebase ships no icon binaries to copy. Do not mix icon sets.
- **Icons always carry a text label** (audience rule). No emoji, no unicode-as-icon.
- **Logos:** two provided marks in `assets/` (see above). The full-color mark carries the tagline "QUẢNG CÁO - TRUYỀN THÔNG - THƯƠNG HIỆU". On dark green, use `logo-global-white.png`. Never redraw the globe mark. Note: the logo's blue tones predate the v2 Evergreen palette — user deferred logo reconciliation ("logo tính sau").
- The codebase `public/` contains only Next.js starter SVGs (not brand assets) — intentionally not copied.

## Skill application (taste-skill + ui-ux-pro-max)

**Design read v2 (taste-skill §0.B, after user chose overhaul):** "Reading this as: corporate B2B website + OOH sales tool for older, skeptical Vietnamese decision-makers, with an editorial-premium language (light, serif display, generous whitespace), leaning toward native CSS tokens + Playfair Display/IBM Plex + a Forest-family palette (redesign-overhaul mode §11: new visual language, content & IA preserved)." **Dials (taste-skill §1):** VARIANCE 5 · MOTION 3 · DENSITY 3 (editorial airy, tempered by the trust-first audience: layouts stay ordered, type stays large). **Hard rules enforced:** zero em-dash in visible copy (§9.G) · real placeholder photography via picsum seeds (§4.8) · green-tinted shadows, no pure black · one accent (brick) locked page-wide · one shape system (sharp, pill exception documented) · serif justified per §4.1 (genuinely editorial direction; Playfair from the approved pool, not Fraunces/Instrument) · emphasis = italic same-family · icons always labeled · body ≥16px, AA contrast, 44px touch targets, `prefers-reduced-motion` (ui-ux-pro-max priority 1–2) · errors with text + recovery path · status/score never color-only. **Deviations kept deliberately:** Lucide stays (codebase dependency; taste-skill allows it then) · 4-card services grid kept as a directory listing · logo has blue tones that no longer match the palette — user chose "đổi palette tự do, logo tính sau"; flag for a future logo refresh.

## Index

- `styles.css` → `tokens/colors.css`, `tokens/typography.css`, `tokens/layout.css`
- `assets/` — logos
- `guidelines/` — foundation specimen cards (Design System tab)
- `components/` — reusable primitives per design-system.md §7:
  - `core/` Button
  - `badges/` AIScoreBadge, StatusPill, TypeBadge
  - `cards/` LocationCard, CaseStudyCard
  - `filters/` FilterChip, FilterBar
  - `quote/` QuoteTray
  - `forms/` Input, Select, Textarea, Checkbox
  - `feedback/` Toast, Skeleton, EmptyState, ErrorState
  - `sections/` TrustStats
  - `map/` MapMarker, MapPopup
- `ui_kits/website/` — multi-page website (chung Navbar + Footer): `index.html` trang chủ · `map.html` bản đồ · `services.html` dịch vụ · `news.html` tin tức · `contact.html` liên hệ
- `SKILL.md` — agent-skill entry point

## Intentional additions

None — the component inventory is exactly design-system.md §7. Corporate sections (Hero, CTA band, Footer) live as UI-kit surfaces, not primitives, since the spec defines them as page patterns.

## Known gaps / notes

- Fonts load from Google Fonts CDN (`tokens/typography.css` @import) — Be Vietnam Pro & Geist Mono are Google-hosted; no font binaries in the codebase to copy. Supply .woff2 files if offline use is needed.
- Partner logos, case-study content, and billboard photography are placeholders pending real material.
- Map canvas in the UI kit is a cosmetic mock (real product uses MapLibre GL + clustering).
