# Hướng dẫn thiết lập & tái sử dụng Parallax Lab cho dự án OOH

Tài liệu này mô tả **từng element trong codebase**: nó nhận đầu vào gì (data / props / tín hiệu cuộn), trả ra đầu ra gì (transform / DOM / giá trị), và cách nối data OOH thật vào sau này.

---

## 1. Thiết lập ban đầu

```bash
npm install        # cài dependencies
npm run dev        # chạy dev tại http://localhost:3000
npm run build      # build production + kiểm tra TypeScript
npm run typecheck  # chỉ kiểm tra TypeScript
```

### Stack & file cấu hình

| File | Vai trò |
|---|---|
| `package.json` | Next 14 App Router, TypeScript strict, Tailwind 3.4, Framer Motion 11, Lenis, shadcn-style UI |
| `tailwind.config.ts` | Design tokens: màu `ink-*` (nền navy), `neon.amber` `#ffb224`, `neon.cyan` `#2ee6ff`; font `font-heading`/`font-body`; shadow `glow-amber`/`glow-cyan`/`billboard`; keyframes `pulse-soft`, `drift-a/b`, `dash-flow`, `scroll-hint` |
| `app/globals.css` | Biến HSL cho shadcn (background/primary/ring…), CSS bắt buộc cho Lenis, utilities `text-glow-*`, `bg-grid-faint` |
| `app/layout.tsx` | Font Google: Big Shoulders Display (heading) + Be Vietnam Pro (body), subset `vietnamese`, gắn qua CSS variable `--font-heading` / `--font-body` |
| `next.config.mjs` | Đã khai `images.remotePatterns` cho `images.unsplash.com` — dùng lại khi cần ảnh billboard thật |

### Quy tắc bất biến (giữ khi mở rộng)

1. **Chỉ animate `transform` + `opacity`** — không animate width/height/top/left.
2. **Native scroll** — Lenis chỉ thêm quán tính, không hijack wheel/touch.
3. **`prefers-reduced-motion`** — mọi hiệu ứng phải về tĩnh khi hệ số parallax = 0 (xem `useParallaxFactor`).
4. **Mobile < 768px** — cường độ parallax tự giảm còn 55%.

---

## 2. Element hạ tầng (dùng cho MỌI trang, kể cả trang OOH)

### 2.1 `components/smooth-scroll.tsx` — `<SmoothScroll>`

Bọc toàn bộ nội dung trang trong `app/page.tsx`.

| | Mô tả |
|---|---|
| **Đầu vào** | `children: ReactNode` — toàn bộ nội dung trang |
| **Đầu ra** | Cuộn quán tính Lenis (`lerp 0.09`) trên toàn trang; tự bắt click `a[href^="#"]` và cuộn mượt tới element đích (`duration 1.4s`) |
| **Tự xử lý** | Bật reduced-motion → không khởi tạo Lenis (trả về cuộn native thuần); cleanup rAF + listener khi unmount |
| **Lưu ý OOH** | Nếu trang OOH có header cố định cao `H`px, thêm lại `offset: -H` trong lệnh `lenis.scrollTo(target, { offset: -H, duration: 1.4 })` |

### 2.2 `components/scroll-progress.tsx` — `<ScrollProgress>`

| | Mô tả |
|---|---|
| **Đầu vào** | Không có props. Tự đọc `useScroll()` — tiến độ cuộn **toàn trang** (0 → 1) |
| **Đầu ra** | Thanh gradient amber→cyan cố định mép trên, `scaleX` = tiến độ (làm mượt bằng spring; reduced-motion thì bám thẳng giá trị thật) |

### 2.3 `components/parallax.tsx` — `<Parallax>` ⭐ element tái sử dụng nhiều nhất

```tsx
<Parallax speed={0.4} className="...">{children}</Parallax>
```

| | Mô tả |
|---|---|
| **Đầu vào (props)** | `children` — khối bất kỳ; `speed?: number` (mặc định 0.4) — dương = trôi ngược hướng cuộn (nổi lên trước), âm = trôi cùng hướng (lùi về sau), mức tự nhiên 0.3–0.6; `className?` |
| **Đầu vào (scroll)** | Tiến độ của chính wrapper qua viewport: `offset: ["start end", "end start"]` (0 khi mép trên chạm đáy màn hình, 1 khi mép dưới rời đỉnh màn hình) |
| **Đầu ra** | `motion.div` với `y` chạy từ `+110×speed×factor` → `−110×speed×factor` (px) |
| **Ứng dụng OOH** | Heading section, ảnh nền, card trong lưới — như từng dùng cho lưới loại hình OOH với 4 cột speed `[0.12, 0.38, 0.18, 0.46]` |

### 2.4 `hooks/useParallaxFactor.ts` — `useParallaxFactor()`

| | Mô tả |
|---|---|
| **Đầu vào** | Không tham số. Tự đọc `prefers-reduced-motion` + media query mobile |
| **Đầu ra** | `number`: `0` (reduced motion) · `0.55` (mobile) · `1` (desktop) |
| **Cách dùng** | Nhân vào **mọi biên độ** transform: `useTransform(p, [0,1], [0, -160 * factor])`. Khi factor = 0 mọi thứ đứng yên → tự đạt yêu cầu reduced-motion. Với opacity dùng mẫu `factor === 0 ? 1 : 0` để nội dung luôn đọc được |

### 2.5 `hooks/useMediaQuery.ts` — `useMediaQuery(query)` / `useIsMobile()`

| | Mô tả |
|---|---|
| **Đầu vào** | Chuỗi media query, ví dụ `"(max-width: 767px)"` |
| **Đầu ra** | `boolean`, tự cập nhật khi resize. SSR trả `false` (an toàn hydration) |

### 2.6 `components/demo/layer-label.tsx` — `<LayerLabel>`

| | Mô tả |
|---|---|
| **Đầu vào** | `index: number` (1–12), `technique: string`, `className?` |
| **Đầu ra** | Nhãn "LỚP 0X/12 — tên kỹ thuật" đồng bộ thị giác. Với trang OOH: đổi thành eyebrow/badge của section |

### 2.7 `components/demo/layer-nav.tsx` — `<LayerNav>`

| | Mô tả |
|---|---|
| **Đầu vào** | Mảng `layers: string[]` (hiện hardcode 12 tên) — **đổi mảng này là đổi nav** |
| **Đầu ra** | 12 chấm anchor `#layer-01…12` cố định bên phải (ẩn < lg). Lenis lo phần cuộn mượt |

### 2.8 `components/ui/button.tsx` + `lib/utils.ts`

- `Button`: props chuẩn shadcn — `variant: default (amber) | outline (cyan) | secondary | ghost`, `size: sm | default | lg | icon`, `asChild` để bọc `<a>`.
- `cn(...)`: merge class Tailwind; `formatNumber(n)`: format số kiểu vi-VN (`86000` → `"86.000"`) — dùng cho số liệu lưu lượng OOH.

---

## 3. Mười hai layer — đầu vào / đầu ra / ứng dụng OOH

Mẫu chung của một layer scrollytelling sticky:

```tsx
const ref = useRef<HTMLDivElement>(null);
const factor = useParallaxFactor();
const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
// container cao Nvh, con sticky h-dvh → scrollYProgress 0→1 chính là "thanh thời gian"
// mọi useTransform cắt dải [a,b] trên thanh đó để đạo diễn từng nhịp
```

### Lớp 01 — `layer-01-hero.tsx` · Đa lớp tốc độ

| | |
|---|---|
| **Data vào** | Mảng `dots: [x%, y%][]` (15 chấm sao); 2 path SVG núi; text tiêu đề/phụ đề (hardcode trong JSX) |
| **Scroll vào** | `offset: ["start start", "end start"]` — chỉ chạy khi hero rời màn hình |
| **Đầu ra** | 4 tầng `y` khác tốc độ: sao `+80` · núi `−60` · tiêu đề `−160` · hình khối `−340` (px × factor); opacity tiêu đề 1→0 ở 75% |
| **OOH** | Đây chính là khung Hero billboard: thay tầng sao = ảnh skyline, tầng tiêu đề = khối biển + tên công ty, tầng tiền cảnh = vệt đèn xe |

### Lớp 02 — `layer-02-depth-zoom.tsx` · Depth zoom

| | |
|---|---|
| **Data vào** | Nội dung card (heading + mô tả, hardcode) |
| **Scroll vào** | Container `h-[250vh]`, `offset: ["start start", "end end"]` |
| **Đầu ra** | Card `scale 0.68→1.22`; nền `scale 1→1.7` + opacity `0.5→0.15` (ngược hướng); text hiện ở dải `[0.3, 0.55]`; MotionValue `percent` render % live |
| **OOH** | Zoom cận cảnh một vị trí billboard "đinh"; % thay bằng số liệu (lượt tiếp cận đếm dần) |

### Lớp 03 — `layer-03-opposing-text.tsx` · Chữ đối lưu

| | |
|---|---|
| **Data vào** | 3 chuỗi text (hardcode trong JSX) |
| **Scroll vào** | `offset: ["start end", "end start"]` — chạy suốt lúc section đi qua viewport |
| **Đầu ra** | `x` ba dòng: `+180→−180`, `−260→+260` (viền `WebkitTextStroke`), `+220→−220` |
| **OOH** | Dải slogan/USP giữa các section ("730+ vị trí · 63 tỉnh thành…") |

### Lớp 04 — `layer-04-sticky-stack.tsx` · Thẻ xếp chồng

| | |
|---|---|
| **Data vào** | `cards: { title, body, accent }[]` — **thêm/bớt phần tử là số thẻ tự đổi**, không phải sửa logic |
| **Scroll vào** | Container progress chia đều: thẻ `i` bị thu nhỏ trong dải `[i/(n−1), (i+1)/(n−1)]` |
| **Đầu ra** | Mỗi thẻ `sticky top-0 h-dvh` + `zIndex` tăng dần → thẻ sau đè thẻ trước; thẻ dưới `scale 1→0.92` |
| **OOH** | Case study khách hàng, các bước quy trình (Khảo sát → Thiết kế → Xin phép → Thi công), gói dịch vụ |

### Lớp 05 — `layer-05-horizontal.tsx` · Cuộn ngang

| | |
|---|---|
| **Data vào** | `panels: { title, body, accent }[]` (4 panel). **Nếu đổi số panel n**: sửa track `w-[400vw]` → `w-[n×100vw]` và `x` cuối → `-${(n-1)/n × 100}%` |
| **Scroll vào** | Container `h-[300vh]`, dải hoạt động `[0.05, 0.95]` |
| **Đầu ra** | Track `translateX "0%" → "-75%"` trong khung sticky. Reduced-motion: render lưới dọc tĩnh (fallback riêng) |
| **OOH** | Showcase 8 loại hình OOH (billboard, pano cao tốc, LED, sân bay, xe bus…) — mỗi panel một loại + ảnh |

### Lớp 06 — `layer-06-rotate.tsx` · Xoay theo cuộn

| | |
|---|---|
| **Data vào** | Không có data — thuần hình học (2 vành + chấm vệ tinh) |
| **Scroll vào** | Container `h-[220vh]` |
| **Đầu ra** | Vành ngoài `rotate 0→200°`, vành trong `0→−300°`, cụm `scale 0.85→1` ở dải `[0, 0.4]` |
| **OOH** | Trang trí section số liệu/mạng lưới (vòng tròn 63 tỉnh thành, radar coverage) |

### Lớp 07 — `layer-07-exploded.tsx` · Phân rã lớp ⭐ quan trọng nhất cho OOH

| | |
|---|---|
| **Data vào** | `planes: { label, className }[]` (5 tấm). Vị trí tách tính từ `offset = index − center` |
| **Scroll vào** | Container `h-[280vh]`; tách trong dải `[0.12, 0.75]`; nhãn hiện `[0.5, 0.7]` |
| **Đầu ra** | Tấm `i`: `y = offset × 92px`, `rotate = offset × 3.5°` (× factor); zIndex đảo để tấm trên cùng nổi |
| **OOH** | Chính là section "exploded view biển quảng cáo": map 4–5 tấm = mặt bạt/LED → khung thép → hệ đèn → trụ móng, `label` = thông số kỹ thuật (kích thước 8×16m, chịu gió bão cấp 12, đèn 400W, cao 25m…). Muốn tách ngang thay vì dọc: đổi `y` thành `x` trong `Plane` |

### Lớp 08 — `layer-08-velocity.tsx` · Vận tốc & skew

| | |
|---|---|
| **Data vào** | Chuỗi `line` lặp 8 lần; props `MarqueeRow`: `offset` (lệch pha), `direction: 1 \| -1` |
| **Scroll vào** | `scrollY` toàn trang + `useVelocity` → spring |
| **Đầu ra** | `x = −(scrollY × 0.03 + offset) mod 50%` (loop liền mạch vì nội dung tuần hoàn); `skewX` nội suy từ vận tốc `[−2500, 2500] → [∓14°]` |
| **OOH** | Băng tên khách hàng/đối tác chạy giữa các section |

### Lớp 09 — `layer-09-circle-reveal.tsx` · Vòng tròn mở màn

| | |
|---|---|
| **Data vào** | Nội dung hiện trên nền sáng (hardcode) |
| **Scroll vào** | Container `h-[260vh]`; đĩa scale dải `[0.05, 0.55]`, nội dung `[0.5, 0.7]` |
| **Đầu ra** | Đĩa gradient `scale 0.15→22` phủ màn hình (chỉ transform, không clip-path); chữ đổi sang màu `ink-950` vì nền chuyển sáng |
| **OOH** | Cú chuyển cảnh sang section CTA/báo giá — đổi tông màu toàn màn hình mà không đổi trang |

### Lớp 10 — `layer-10-perspective.tsx` · Phối cảnh 3D

| | |
|---|---|
| **Data vào** | `cards: { title, body, accent }[]` — mỗi card một `TiltCard` độc lập |
| **Scroll vào** | **Từng card tự đo**: `offset: ["start end", "center center"]` → tự lệch pha theo vị trí trong lưới |
| **Đầu ra** | `rotateX 55°→0`, `y 90→0`, `opacity 0.2→1`; cha khai `perspective: 1200` |
| **OOH** | Lưới 3 lợi thế cạnh tranh, hoặc 3 gói dịch vụ |

### Lớp 11 — `layer-11-grid.tsx` · Lưới lệch nhịp

| | |
|---|---|
| **Data vào** | `tiles: string[]` (12 tên) + `columnSpeeds = [0.15, 0.5, 0.25, 0.65]` + `tileAccents` xoay vòng |
| **Scroll vào** | Mỗi ô tự đo qua `<Parallax speed={columnSpeeds[i % 4]}>` |
| **Đầu ra** | Lưới 4 cột trôi 4 tốc độ — hiệu ứng gợn sóng |
| **OOH** | Lưới loại hình OOH / lưới tỉnh thành phủ sóng. Thay `string[]` bằng `{ name, image, advantage }[]` là thành card có ảnh |

### Lớp 12 — `layer-12-finale.tsx` · Tổng kết

| | |
|---|---|
| **Data vào** | Không — tự đọc `useScroll()` toàn trang |
| **Đầu ra** | `percent` (MotionValue chuỗi "0%…100%", spring-smoothed) render trực tiếp; 2 quầng sáng đổi opacity chéo nhau ở dải `[0.8, 1]`; nút `asChild` cuộn về `#layer-01` |
| **OOH** | Section liên hệ + CTA cuối trang (ghép form tên/SĐT/ngành hàng vào đây) |

---

## 4. Nối data OOH thật — contract đề xuất

Hiện data các layer **hardcode dạng `const` đầu file** — đó là điểm cắm data. Khi làm trang OOH, tạo lại `lib/data.ts` với các kiểu sau rồi truyền vào qua props:

```ts
// lib/data.ts (đề xuất cho giai đoạn OOH)

/** Lớp 07 — exploded view biển quảng cáo */
export type BillboardSpec = {
  id: string;          // "face" | "frame" | "light" | "base"
  title: string;       // "Mặt hiển thị"
  lines: string[];     // ["Kích thước 8m × 16m", "LED P8, 7.500 nit", ...]
};

/** Lớp 05 / 11 — showcase loại hình */
export type OohType = {
  id: string;
  name: string;        // "Pano đường cao tốc"
  advantage: string;   // 1 dòng ưu thế
  image: string;       // URL ảnh (đã mở sẵn remotePatterns cho Unsplash)
  imageAlt: string;
};

/** Lớp 04 — case study / quy trình */
export type StackCardData = {
  title: string;
  body: string;
  accent: string;      // class Tailwind gradient + border
};

/** Panel AI gợi ý (nếu khôi phục) */
export type Industry = {
  id: string; label: string; headline: string;
  traffic: number;     // xe/ngày  → hiển thị qua formatNumber()
  reach: number;       // người/ngày
  goldenHours: string;
  insight: string;
  locations: { name: string; district: string; score: number; format: string }[];
};
```

Cách chuyển một layer từ hardcode sang nhận data (ví dụ Lớp 07):

```tsx
// Trước:  const planes = [...] trong file
// Sau:
export function Layer07Exploded({ planes }: { planes: BillboardSpec[] }) { ... }

// app/page.tsx
<Layer07Exploded planes={billboardSpecs} />
```

Quy tắc khi map data → hiệu ứng:

- **Số phần tử thay đổi** → kiểm tra lại các hằng phụ thuộc n: Lớp 04 (`transitions = n−1`), Lớp 05 (`w-[n×100vw]`, `%` cuối), Lớp 07 (`center = (n−1)/2`).
- **Số liệu động** (lưu lượng, reach) → render qua `formatNumber()`; muốn số đếm dần khi lọt viewport, tạo lại `hooks/useCountUp.ts`:

```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

// Đầu vào: target (số đích), duration (giây).
// Đầu ra: { ref } gắn vào phần tử hiển thị + { value } tăng 0 → target khi vào viewport.
export function useCountUp(target: number, duration = 1.4) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reducedMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) { setValue(target); return; }
    const controls = animate(0, target, {
      duration, ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setValue(latest),
    });
    return () => controls.stop();
  }, [inView, target, duration, reducedMotion]);

  return { ref, value };
}
```
- **Ảnh thật** → dùng `next/image` với `fill + sizes` bên trong khung có `aspect-ratio` cố định (CLS = 0); ảnh hero thêm `priority`.

---

## 5. Checklist khi thêm section/layer mới

1. Section sticky: container `h-[Nvh]` (N ≥ 200 cho đủ "thời gian"), con `sticky top-0 h-dvh overflow-hidden`.
2. Mọi biên độ nhân `factor` từ `useParallaxFactor()`; opacity dùng mẫu `factor === 0 ? 1 : 0`.
3. Hiệu ứng phức tạp (cuộn ngang, exploded) phải có **fallback tĩnh** cho reduced-motion (xem Lớp 05).
4. Thêm `will-change-transform` cho phần tử chuyển động liên tục; `aria-hidden="true"` cho lớp trang trí; `aria-label` cho section.
5. Thêm `id="layer-XX"` + cập nhật mảng tên trong `layer-nav.tsx`.
6. Hooks (`useTransform`) không được gọi trong vòng lặp trực tiếp — tách thành sub-component nhận `MotionValue` qua props (mẫu: `StackCard`, `Plane`, `TiltCard`).
7. Chạy `npm run build` xác nhận không lỗi TypeScript trước khi bàn giao.

---

## 6. Sơ đồ luồng dữ liệu tổng quát

```
Người dùng cuộn (native)
        │
        ▼
Lenis (SmoothScroll) ── thêm quán tính, cập nhật scrollY thật của trình duyệt
        │
        ▼
useScroll({ target, offset }) ── đo tiến độ 0→1 của từng section/element
        │
        ▼
useParallaxFactor() ──× nhân hệ số (0 / 0.55 / 1)
        │
        ▼
useTransform(progress, [dải], [giá trị]) ── cắt "thanh thời gian" thành từng nhịp
        │
        ▼
<motion.div style={{ y, x, scale, rotate, opacity }}> ── chỉ transform + opacity, chạy GPU
```

Đầu vào cuối cùng luôn là **vị trí cuộn**; đầu ra cuối cùng luôn là **transform/opacity**. Data nghiệp vụ (thông số biển, loại hình, ngành hàng) chỉ quyết định *nội dung và số phần tử*, không chạm vào cơ chế cuộn.

---

## 7. Bổ sung: lớp 12–18 (bộ đầy đủ 18 kỹ thuật)

> Từ bản này Parallax Lab có **18 lớp**. Lớp "Tổng kết" cũ (12) được chuyển thành
> lớp 17; `LayerLabel` hiển thị `/18`; `layer-nav.tsx` có 18 chấm. Hai ngoại lệ
> cơ chế: lớp 12 vẽ canvas (không phải transform nhưng vẫn scrub theo cuộn),
> lớp 16 lấy đầu vào từ CON TRỎ thay vì thanh cuộn.

### Lớp 12 — `layer-12-canvas-scrub.tsx` · Canvas image-sequence scrub
| | |
|---|---|
| **Data vào** | Hàm `drawScene(ctx, w, h, t)` vẽ 1 khung theo t (0→1); hằng `FRAMES = 120` chỉ để hiển thị số khung |
| **Scroll vào** | Container `h-[300vh]`; `useMotionValueEvent(progress, "change")` gọi vẽ lại |
| **Đầu ra** | Canvas 960×600 vẽ cảnh chiều → hoàng hôn → đêm; reduced-motion: vẽ 1 lần khung cuối |
| **OOH** | Thay `drawScene` bằng scrub chuỗi ảnh JPEG thật (preload mảng `Image`, vẽ `imgs[Math.round(t*(n-1))]`) — mô phỏng dựng biển, timelapse vị trí |

### Lớp 13 — `layer-13-line-draw.tsx` · SVG line drawing scrub
| | |
|---|---|
| **Data vào** | 3 thuộc tính `d` của path (khung biển, tia đèn, chân trời) |
| **Scroll vào** | 3 dải nối tiếp: `[0.08–0.42]`, `[0.42–0.62]`, `[0.58–0.85]` |
| **Đầu ra** | `motion.path` với `style={{ pathLength }}` — nét vẽ chạy/thu theo 2 chiều cuộn |
| **OOH** | Vẽ nét sơ đồ kết cấu biển, route bản đồ tuyến, logo khách hàng |

### Lớp 14 — `layer-14-text-stagger.tsx` · Text stagger scrub
| | |
|---|---|
| **Data vào** | Chuỗi `SENTENCE` → `split(" ")`; mỗi từ là 1 sub-component `Word` (hook trong component con, không trong vòng lặp) |
| **Scroll vào** | Từ thứ i sáng trong dải `[0.1 + 0.7·i/n, +0.7/n]` |
| **Đầu ra** | Opacity từng từ 0.12 → 1, scrub 2 chiều |
| **OOH** | Câu tuyên ngôn thương hiệu, đoạn dẫn chuyện giữa các section |

### Lớp 15 — `layer-15-color-morph.tsx` · Color morph (opacity-only)
| | |
|---|---|
| **Data vào** | 3 lớp gradient toàn màn (đêm / xanh brand / hoàng hôn) + nhãn pha |
| **Scroll vào** | Opacity: lớp 1 `[0→0.35]`, lớp 2 `[0.2,0.5,0.8]`, lớp 3 `[0.65→1]` |
| **Đầu ra** | Cảm giác background đổi màu nhưng chỉ là crossfade opacity (GPU); reduced-motion: 1 nền tĩnh |
| **OOH** | Chuyển tông giữa các chương của landing (ngày → đêm theo giờ vàng quảng cáo) |

### Lớp 16 — `layer-16-mouse-parallax.tsx` · Mouse parallax
| | |
|---|---|
| **Data vào** | KHÔNG dùng scroll — `onPointerMove` chuẩn hoá con trỏ về −0.5→0.5, qua `useSpring` |
| **Đầu ra** | Mỗi lớp dịch theo độ sâu riêng (glow ×60, skyline ×−26, biển ×34) + nghiêng `rotateX/rotateY` cả khung; rời chuột → spring về 0; cảm ứng/reduced-motion: đứng yên |
| **OOH** | Khối hero hoặc card vị trí "sống" theo con trỏ |

### Lớp 17 — `layer-17-progress.tsx` · Tiến độ toàn trang
Bản đổi tên của lớp Tổng kết cũ: % cuộn cả trang (spring), 2 quầng sáng crossfade ở dải `[0.78, 0.95]`.

### Lớp 18 — `layer-18-footer-reveal.tsx` · Footer reveal
| | |
|---|---|
| **Cơ chế** | KHÔNG transform: khối `position:fixed; bottom:0; z-index:-10` nằm sau trang + spacer trong suốt `h-[82vh]` ở cuối tài liệu. Cuộn hết → trang "nhấc lên" lộ khối |
| **Điều kiện** | Mọi section phía trên phải có background ĐỤC (các layer đều có `bg-ink-*`); spacer mang `id="layer-18"` cho nav |
| **OOH** | Footer liên hệ/CTA lộ ra sau trang — cảm giác kết màn phổ biến ở các site agency |
