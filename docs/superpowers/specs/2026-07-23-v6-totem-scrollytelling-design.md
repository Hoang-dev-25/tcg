# /v6 — Totem sao 3D + scrollytelling Toàn Cầu ADV

Ngày: 2026-07-23

## 1. Mục tiêu

`/v6` là một mạch camera liên tục, không phải một trang cuộn thông thường:

1. **Cổng vào** — một totem kính lơ lửng: vòng tròn đôi ôm lấy một lõi sao lập thể, hai
   dải mảnh rời khỏi vòng, cắt nhau ngay dưới nó rồi xòe rộng chạy ra khỏi cạnh dưới khung.
2. **Xuyên qua** — người xem cuộn, camera lao vào lõi sao, sao quay nhanh dần, tám chóp
   tách rời và bung ra, camera xuyên qua vỏ.
3. **Nội dung hiện ra từ bên trong sao** — lần lượt: slogan → văn hóa doanh nghiệp →
   năng lực online.

Yêu cầu xuyên suốt: hình học 3D thật, parallax nhiều tầng, scroll styling mạnh.

## 2. Kiến trúc hai tầng

```
┌─ DOM layer (z-10) ────────────────────────────┐
│  Chương 1 Slogan · Chương 2 Văn hóa           │  GSAP ScrollTrigger
│  Chương 3 Năng lực online                     │  pin + scrub + parallax
└───────────────────────────────────────────────┘
┌─ WebGL layer (fixed, z-0) ────────────────────┐
│  UniverseBackdrop · Totem · post chain        │  đọc progress từ ScrollTrigger
└───────────────────────────────────────────────┘
```

Cầu nối duy nhất giữa hai tầng là `scrollRef` (module-level ref sẵn có trong
`store/useGalleryStore.ts`). ScrollTrigger ghi vào nó; `useFrame` đọc ra. Không có
`setState` nào chạy theo frame.

**Thay đổi nền tảng:** `useVirtualScroll` hiện `preventDefault` mọi wheel event và tự
tích lũy `scrollRef.target` — tài liệu không hề cuộn. Mô hình đó không sống chung được
với các section DOM. Thay bằng `usePageScroll`: Lenis (đã có trong `package.json`) lo
smooth scroll trên document thật, ScrollTrigger lo pin/scrub từng chương.
`useVirtualScroll.ts` bị gỡ.

## 3. Chương 0 — Totem

### 3.1 Lõi sao — `makeStarCore` / `makeSpikeGeometries`

Thay `makeStarGeometry` (Shape 2D + ExtrudeGeometry) bằng **stellated octahedron** —
sao lập thể thật, mọi góc nhìn đều đọc ra hình sao.

Dựng hình:

- 6 đỉnh gốc trên ba trục: `(±R,0,0)`, `(0,±R,0)`, `(0,0,±R)` với `R = radius * waist`.
- 8 mặt của khối bát diện, mỗi mặt là một bộ dấu `(sx, sy, sz) ∈ {−1,+1}³`.
- Mỗi mặt mọc một chóp tứ diện, đỉnh tại `(sx, sy, sz) * radius * spike`.
  Với `spike == waist` đây đúng là stella octangula chuẩn; `spike > waist` cho chóp dài
  và nhọn hơn.
- 24 tam giác, **non-indexed, flat normals**. Cạnh phải sắc tuyệt đối — đây là toàn bộ
  lý do khối này bắt sáng đẹp.
- Winding phải cho pháp tuyến hướng ra ngoài; thứ tự ba đỉnh đảo theo dấu của
  `sx * sy * sz`.

Tám chóp được xuất **thành tám geometry riêng** (`makeSpikeGeometries`) kèm mảng tám
vector hướng đã chuẩn hóa, để GSAP đẩy từng chóp ra dọc hướng của nó ở pha bung. Tám
draw call là không đáng kể.

Bên trong đặt thêm một `OctahedronGeometry` bán kính `radius * innerCore` (≈ 0.42) —
kính trong suốt cần một thứ để khúc xạ cắn vào, không có nó lõi sẽ rỗng ruột.

### 3.2 Hai dải — `makeStrandCurve` / `makeRibbonGeometry`

Đường cong hiện tại phình ra trước rồi mới cắt nhau ở thấp. Ảnh tham chiếu thì ngược
lại. Viết lại theo sáu điểm điều khiển (`side = ±1`, gương nhau qua trục Y):

| # | vai trò | vị trí |
|---|---|---|
| 0 | rời vòng ở sườn dưới | `(side·ringRadius·0.92, ringY − 0.18, 0)` |
| 1 | chụm vào tâm | `(side·ringRadius·0.52, ringY − 0.44, +strandDepth·0.3)` |
| 2 | **cắt nhau** | `(−side·ringRadius·0.10, strandCrossY, 0)` |
| 3 | bắt đầu xòe | `(−side·ringRadius·1.10, strandCrossY − 0.72, −strandDepth·0.4)` |
| 4 | rộng nhất | `(−side·ringRadius·strandFlare, strandCrossY − 1.55, 0)` |
| 5 | thoát khỏi khung | `(−side·ringRadius·strandFlare·0.9, strandEndY, +strandDepth·0.3)` |

`CatmullRomCurve3`, type `catmullrom`, tension 0.5. `strandCrossY ≈ ringY − 0.62` — cắt
ngay sát dưới vòng, đúng như ảnh.

`TubeGeometry` cho bán kính hằng, không diễn tả được cách ảnh bắt sáng. Thay bằng
`makeRibbonGeometry`: dựng thủ công các vành dọc curve bằng `computeFrenetFrames`, bán
kính nội suy `strandTubeStart → strandTubeEnd` (dày ở gốc vòng, mảnh như tóc ở đuôi).

**Ràng buộc bắt buộc:** index phải được phát theo đúng thứ tự dọc curve — vòng ngoài
chạy theo segment, vòng trong chạy theo radial. Đó là điều kiện để `setDrawRange` vẫn
vẽ dần được dải từ vòng xuống dưới, kỹ thuật đang dùng ở `IntroStar.tsx`.

### 3.3 Vật liệu — kính tán sắc

Lõi (`MeshPhysicalMaterial`):

```
flatShading: true          transmission: 0.85    thickness: 0.55
iridescence: 1             iridescenceIOR: 2.2   iridescenceThicknessRange: [180, 760]
clearcoat: 1               clearcoatRoughness: 0.05
roughness: 0.06            ior: 1.7              envMapIntensity: 3.0
```

Mỗi mặt phẳng bắt một dải cầu vồng riêng; khi khối quay chậm, màu chạy vòng quanh. Vòng
và dải dùng chung `glassMaterial` mảnh sẵn có.

Không có bloom pass ở lớp này, nên toàn bộ highlight đến từ env map thủ tục trong
`useStudioEnv` — giữ nguyên, không đổi.

### 3.4 GSAP — timeline dựng hình khi vào trang

Một `gsap.timeline` duy nhất, sequence bằng position parameter chứ không chuỗi delay:

| vị trí | nội dung | ease |
|---|---|---|
| `open` | vòng đôi xoay từ edge-on ra chính diện, scale 0.7 → 1 | `expo.out` |
| `open+=0.30` | lõi sao rơi vào tâm, scale 0.15 → 1, xoay 1.5 vòng | `back.out(1.7)` |
| `open+=0.55` | hai dải vẽ dần từ vòng xuống qua `setDrawRange` | `power2.inOut` |
| `open+=0.80` | motes hiện dần và bắt đầu thở | `power1.out` |

Bọc trong `gsap.matchMedia()`, thay cho nhánh `if (reducedMotion)` thủ công hiện tại:

- `(prefers-reduced-motion: reduce)` → nhảy thẳng tới trạng thái cuối, không tween.
- `(max-width: 767px)` → thu nhỏ totem còn 0.72, `moteCount` giảm một nửa.

### 3.5 GSAP — chuyển cảnh xuyên qua sao

Một `ScrollTrigger` scrub trên chương 0, ghi vào `scrollRef.intro` (0 → 1). Đọc trong
`useFrame`:

| `intro` | diễn biến |
|---|---|
| 0 → 0.35 | totem đứng yên, chỉ trôi nhẹ và nghiêng theo con trỏ |
| 0.35 → 0.70 | camera dolly vào lõi; tốc độ quay của sao tăng dần |
| 0.55 → 0.85 | tám chóp trượt ra dọc hướng riêng, vòng và dải mờ đi |
| 0.80 → 1.00 | camera xuyên qua vỏ; lõi trong mờ dần; chương 1 hiện lên |

`Totem.tsx` giữ prop `variant: "intro" | "outro"` ngay từ đầu (bản `outro` chỉ là
`scale.y = -1` + đảo hướng bay) nhưng **vòng này chỉ mount bản `intro`**.

## 4. Ba chương nội dung

Nguồn dữ liệu: `lib/v3-data.ts` và `lib/v4-content.ts`, dùng chung với v4/v5. Không bịa
copy mới, không thêm con số mới.

### Chương 1 — Slogan
Một câu, chiếm trọn khung. `ctaBand.title` làm mệnh đề chính, `heroWords` (Billboard ·
Màn hình LED · Sân bay · Nhà chờ xe bus) chạy luân phiên bên dưới. Section được pin,
chữ reveal theo dòng bằng clip-path, scrub theo scroll.

### Chương 2 — Văn hóa doanh nghiệp
Bốn mục `commitments` (hồ sơ pháp lý · nghiệm thu bằng hình ảnh · kiểm tra kết cấu định
kỳ · báo giá minh bạch). Bố cục lệch, không phải bốn thẻ bằng nhau xếp hàng. Mỗi mục có
hệ số parallax riêng nên chúng trôi lệch nhau khi cuộn. Nền là mốc thời gian `journey`
(2003 → 2026) trôi chậm hơn ở tầng sau.

### Chương 3 — Năng lực online
`mapPreview` làm trung tâm: bản đồ chấm, `mapPreview.stats` (~730 vị trí, 30+ tỉnh
thành), nhãn `liveLabel` và `aiLabel`. `heroStats` (730+ / 400+ / 20+) đếm lên khi vào
khung. `featuredServices` xếp thành một dải trượt ngang được scrub bằng scroll dọc.

Mọi con số dùng `tabular-nums` monospace, dấu chấm phân tách hàng nghìn.

## 5. Scroll và parallax

- **Lenis** lo smooth scroll trên document thật; `ScrollTrigger.scrollerProxy` nối hai
  bên, `lenis.on("scroll", ScrollTrigger.update)`.
- Mỗi chương là một `ScrollTrigger` với `pin` + `scrub`. Tiến độ chương 0 ghi vào
  `scrollRef.intro`; ba chương sau ghi vào `scrollRef.chapter`.
- Parallax: mỗi tầng khai báo một hệ số nhân trong config, biên độ thật bằng hệ số ×
  `parallaxFactor` (0 khi reduced-motion, giảm trên mobile) — cùng cách `V5Hero` đang
  làm với `useParallaxFactor`.
- Vẫn không có `setState` nào chạy theo frame.

## 6. Gỡ bỏ

Tường ảnh vô tận không còn chỗ trong mạch kể này. Xóa:

```
components/TileWall.tsx     components/Tile.tsx
hooks/useTileLayout.ts      hooks/useHoverTile.ts     hooks/useTextures.ts
hooks/useVirtualScroll.ts   materials/TileMaterial.ts
shaders/tile.vert.glsl.ts   shaders/tile.frag.glsl.ts
```

Kèm theo: khối `wall`, `tile`, `bend`, `warp`, `hover`, `focus` trong `scene.config.ts`;
`focusedId` / `hoveredId` / `focusRef` trong store; `Cursor.tsx` (con trỏ "VIEW" chỉ
phục vụ việc mở tile).

Giữ lại: `UniverseBackdrop`, `GalleryCanvas`, `Loader`, `Overlay`, `useStudioEnv`,
`GrainEffect`, khối `post` trong config, `TunePanel` (panel không bind vào `star.*` nên
không vướng).

## 7. Thay đổi theo file

| File | Việc |
|---|---|
| `utils/totem.ts` | `makeStarCore`, `makeSpikeGeometries`, `makeRibbonGeometry`; viết lại `makeStrandCurve` |
| `components/IntroStar.tsx` → `Totem.tsx` | prop `variant`; timeline dựng hình; pha bung chóp |
| `config/scene.config.ts` | bỏ `points`/`innerRatio`/`depth`/`bevel`; thêm `spike`/`waist`/`innerCore`, `strandFlare`, `strandTubeStart`/`End`, khối `chapters` |
| `hooks/usePageScroll.ts` | **mới** — Lenis + ScrollTrigger, ghi `scrollRef` |
| `components/chapters/*.tsx` | **mới** — ba chương DOM |
| `components/GalleryScene.tsx` | bỏ `TileWall`, chỉ còn `Totem` |
| `app/v6/page.tsx` | canvas fixed + ba chương DOM chồng lên |

## 8. Ngoài phạm vi vòng này

- Totem lật ngược ở cuối trang (`variant="outro"`) — component đã sẵn prop, chỉ chưa mount.
- Header, footer, form liên hệ.
- Sáu màn trong `docs/v6-stitch-prompts.md` — tài liệu đó mô tả một mạch khác (Thành phố →
  20 năm → AI → Dịch vụ → Dự án → Liên hệ) và **không** phải nguồn sự thật cho spec này.
