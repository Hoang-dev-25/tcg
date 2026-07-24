# /v6 — "Một chuyến bay đêm": website 3D WebGL cho Toàn Cầu ADV

Ngày: 2026-07-24

## 1. Bối cảnh và quyết định đã chốt

Wireframe 2.5D hiện tại của `/v6` (zoom ảnh + HUD kỹ thuật) bị đánh giá là hiệu ứng
rườm rà. Sau phiên brainstorm, các quyết định đã chốt cùng người dùng:

| Câu hỏi | Quyết định |
|---|---|
| Mạch nội dung | Mạch mới hoàn toàn, do art director đề xuất |
| Chất 3D | 3D thật bằng WebGL (Three.js), không phải 2.5D |
| Tông thẩm mỹ | Neon đêm công nghệ, **tiết chế** — bỏ HUD/nhãn kỹ thuật |
| Mức tả thực | Thành phố cách điệu neon (khối hộp + đèn), không cần asset ngoài |
| Mobile | Desktop-first, mobile giản lược để giữ 60fps |
| Concept | **A — Một chuyến bay đêm** (B và C lưu lại để có thể chuyển hướng) |
| Liều hiệu ứng | **Mạnh** — nâng chất điện ảnh (bloom, vệt tốc độ, FOV kick), không quay lại kiểu HUD rối |

Spec này **thay thế** spec totem `2026-07-23-v6-totem-scrollytelling-design.md` — hướng
totem không còn là nguồn sự thật cho `/v6`.

## 2. Bốn luật chung (áp cho mọi concept)

1. **Một chuyển động chủ đạo tại mỗi thời điểm** — khi camera bay thì không gì khác
   nhảy múa; khi chữ hiện thì camera gần như đứng yên.
2. **Neon chỉ dành cho biển quảng cáo** — tòa nhà chỉ có đèn cửa sổ vàng ấm mờ. Mắt
   người xem luôn bị hút đúng vào sản phẩm của Toàn Cầu ADV.
3. **Không HUD, không nhãn kỹ thuật, không hạt bay vô cớ** — chiều sâu đến từ ánh
   sáng, sương (fog) và phối cảnh. Hiệu ứng mạnh (mục 5) phải phục vụ cảm giác
   tốc độ/ánh sáng của cảnh, không phải trang trí đứng yên.
4. **Scroll = scrub** — cuộn tới đâu phim chạy tới đó, dừng cuộn là dừng phim.

## 3. Ba storyboard (concept đầy đủ — A được chọn; B, C lưu để chuyển hướng)

### 3.1 Concept A — "Một chuyến bay đêm" ✅ ĐƯỢC CHỌN

Toàn trang là MỘT cú máy drone không cắt cảnh. Thành phố là sân khấu, biển quảng cáo
là diễn viên.

| # | Frame | Hình bên dưới | Chữ / nội dung | Chuyển sang frame kế |
|---|---|---|---|---|
| 1 | Trên cao (Hero) | Thành phố khối hộp nhìn từ ~300m, góc chúc 55°; cửa sổ vàng ấm lấp lánh chậm; một billboard cyan sáng nhất khung ở trung tâm | H1 "Thương hiệu của bạn, vươn tầm đại chúng" + nút Khám phá | Camera hạ độ cao theo đường xoắn nhẹ, lượn sát một tòa nhà (tạo cảm giác tốc độ bằng phối cảnh), H1 trôi lên mờ dần |
| 2 | Đại lộ dịch vụ | Camera bay thấp ~20m dọc đại lộ; lần lượt 3 vật thể: billboard tấm lớn → pano ốp tường → màn LED cong. Biển đang xem sáng +20%, hai biển kia dịu | 3 điểm dừng nhỏ, mỗi điểm một card (tên dịch vụ + 1 câu) | Hết biển thứ 3, camera nghiêng bay lên theo vệt đèn đường — con đường duỗi thẳng thành trục thời gian |
| 3 | Con đường 20 năm | Đường thẳng vô tận trong sương; 5 biển nhỏ phát sáng ghi năm 2005→2024 hai bên | Mốc vào giữa khung thì tiêu đề + ghi chú hiện; mốc đã qua chìm vào sương | Qua mốc 2024, camera ngẩng lên trời — đèn các biển hắt lên thành lưới sáng mảnh |
| 4 | Tầng dữ liệu AI | Camera lơ lửng trên thành phố; các biển sáng bên dưới nối nhau bằng đường sáng mảnh tĩnh | 3 thẻ số liệu, số đếm lên MỘT lần rồi đứng yên | Dolly-out rất nhanh — thành phố thu thành cụm sáng, các cụm khác hiện ra, ghép thành hình Việt Nam bằng đèn (khoảnh khắc wow giữa trang) |
| 5 | Bản đồ ánh sáng | Dải đất VN bằng chấm đèn trên nền đen; 6 thành phố lớn là pin đậm | Stats 500+ · 200+ · 10M+ cột trái; popup dự án tiêu biểu cạnh TP.HCM | Camera lao vào điểm sáng TP.HCM — điểm sáng lớn dần hóa ra là một màn hình LED |
| 6 | Màn LED liên hệ | Bề mặt màn LED hơi cong chiếm trọn khung, viền glow nhẹ | Form liên hệ nằm trên mặt LED — "nội dung tiếp theo trên màn hình này là thương hiệu của bạn"; hotline + MXH | Hết phim |

Trade-off: cảm giác 3D và độ liền mạch mạnh nhất; việc tốn công chính là tinh chỉnh
đường bay camera.

### 3.2 Concept B — "Hành trình một chiến dịch" (lưu)

Camera bám theo MỘT nhân vật: tấm biển mang logo của khách hàng.

| # | Frame | Diễn biến | Chuyển |
|---|---|---|---|
| 1 | Hạt sáng | Nền đen tuyền, một đốm sáng nhỏ (ý tưởng/logo) + H1. Tối giản tuyệt đối | Đốm sáng bay về trước, camera bám sau |
| 2 | Chọn vị trí bằng AI | Đốm bay giữa chòm 730+ điểm sáng (vị trí OOH thật); điểm không phù hợp mờ đi, một điểm được khoanh tròn chậm | Camera cùng đốm lao vào điểm được chọn, xuyên ra bầu trời đêm |
| 3 | Dựng biển (wow chính) | Khung thép billboard TỰ LẮP RÁP theo scroll: cột dựng, giàn ghép, bạt căng, đốm sáng đập vào nở thành logo. Cuộn ngược thì tháo ngược | Biển xong, camera lùi xa dần |
| 4 | Phủ khắp thành phố | Cùng logo bật sáng lần lượt trên pano, LED, billboard xa lộ — mỗi lần kèm card dịch vụ | Các biển phát một nhịp sáng lan như sóng (một lần, chậm) |
| 5 | Đo lường | Vòng tròn mảnh lan từ mỗi biển; số 10M+ · 500+ · 200+ đếm lên. Không dashboard | Camera quay về biển đầu tiên, tiến sát mặt biển |
| 6 | Biển của bạn | Mặt biển hiển thị form: "Đặt vị trí cho thương hiệu của bạn" — kết vòng tròn kể chuyện | Hết |

Trade-off: thông điệp bán hàng rõ nhất; trừu tượng hơn A ở 2 frame đầu; cần nhiều
trạng thái vật thể (lắp ráp từng phần).

### 3.3 Concept C — "Thành phố thức giấc" (lưu)

Scroll điều khiển THỜI GIAN: hoàng hôn → nửa đêm, thành phố sáng đèn dần. Camera gần
tĩnh, chỉ 3 góc máy lớn.

| # | Frame | Diễn biến | Chuyển |
|---|---|---|---|
| 1 | Hoàng hôn | Silhouette thành phố đen, trời tím-cam tắt dần, chưa một bóng đèn; H1 trên nền trời | Trời tối dần theo scroll, biển đầu tiên bật sáng — nguồn sáng duy nhất |
| 2 | Ba lần bật đèn | Billboard → pano → LED lần lượt bật, ánh sáng hắt lên tòa nhà xung quanh, card dịch vụ hiện theo. Camera pan rất nhẹ | Góc máy đổi sang nhìn dọc đường chân trời |
| 3 | 20 năm = dãy phố | Chân trời sáng dần từ trái sang phải; 5 mốc = 5 cụm phố bừng sáng + chữ cột mốc | Cụm 2024 sáng kéo theo lưới mảnh hiện trên trời |
| 4 | Thành phố + tầng AI | Toàn thành phố rực rỡ; lưới dữ liệu tĩnh rất nhạt; 3 số liệu AI đếm một lần | Camera kéo thẳng lên cao (lần di chuyển lớn duy nhất) |
| 5 | Bản đồ đêm | VN bằng đèn, pins, stats (giống frame 5 của A) | Trời chuyển dần về ánh rạng đông nhẹ |
| 6 | Trước bình minh | Form trên nền skyline: "Đêm nào thành phố cũng nhìn thấy các thương hiệu này. Sáng mai, đến lượt bạn." | Hết |

Trade-off: nhẹ và dễ dựng nhất; cảm giác 3D yếu nhất — hơi phí lựa chọn WebGL.

## 4. Nội dung — nguồn sự thật

Không bịa copy hay số liệu mới. Lấy từ:

- `lib/v3-data.ts`: H1, `leadForm` (6 trường + benefits + stats + hotline).
- Dữ liệu đã dùng ở wireframe cũ (chuyển vào `components/v6/data.ts`):
  - MILESTONES 2005 / 2009 / 2014 / 2019 / 2024;
  - SERVICES: Billboard · Pano · Màn hình LED (icon + mô tả);
  - PINS 6 thành phố + MAP_STATS 500+ · 200+ · 10M+;
  - 3 số liệu AI: lượt nhìn hôm nay · tỷ lệ chuyển đổi · màn hình đang phát.

Mọi con số dùng monospace `tabular-nums`.

## 5. Liều hiệu ứng "mạnh" — danh sách chốt

Nâng chất điện ảnh, mỗi hiệu ứng gắn vào một khoảnh khắc cụ thể (không có hiệu ứng
chạy thường trực vô cớ):

| Hiệu ứng | Ở đâu | Cách làm |
|---|---|---|
| Bloom chọn lọc | Toàn trang, chỉ mặt neon nở sáng | `@react-three/postprocessing` Bloom, `luminanceThreshold` cao để tòa nhà/chữ không bị nở; tắt trên mobile/low-tier |
| Vignette + grain nhẹ | Toàn trang | Cùng EffectComposer, cường độ thấp — chất phim, không bẩn hình |
| FOV kick | Các chặng bay nhanh (1→2, 4→5, 5→6) | fov 55 → 68 rồi về, kèm camera roll ±2° — cảm giác gia tốc |
| Vệt sáng tốc độ | Chỉ trong 2 chuyển cảnh nhanh (1→2, 4→5) | Instanced streaks mảnh dọc hướng bay, fade in/out theo tốc độ camera; như phơi sáng dài đèn xe |
| Nội dung biển động | Các biển hero | Shader/texture slide đổi nội dung + pulse sáng ngắn khi đổi |
| Nền ướt phản chiếu | Dưới chân các biển hero ở đại lộ | Halo gradient lộn ngược mờ trên mặt đường — giả ướt, rẻ, không dùng Reflector thật |
| Bụi sao dolly-out | Duy nhất lúc thành phố thu thành bản đồ (4→5) | Hệ điểm thưa hiện ra khi camera lùi, đứng yên khi camera dừng |

Nguyên tắc phân xử: hiệu ứng gắn với CHUYỂN ĐỘNG camera thì được phép mạnh; hiệu ứng
đứng yên lặp vô hạn (kiểu scanline, chấm bay, số nhảy liên tục) vẫn bị cấm theo luật 3.

## 6. Kiến trúc kỹ thuật

### 6.1 Stack

Thêm dependency: `three`, `@react-three/fiber@8` (tương thích React 18 / Next 14),
`@react-three/drei@9`, `@react-three/postprocessing` (bản tương thích fiber 8).
GSAP + ScrollTrigger + Lenis đã có sẵn trong `package.json`.

### 6.2 Hai tầng

```
┌─ DOM overlay (z-10) ──────────────────────────┐
│  6 block chữ + form + nav dots + progress bar │  GSAP ScrollTrigger
└───────────────────────────────────────────────┘
┌─ WebGL Canvas (fixed, z-0) ───────────────────┐
│  City · Billboards · VietnamLights · Camera   │  useFrame đọc progress ref
└───────────────────────────────────────────────┘
```

- Cầu nối duy nhất: ScrollTrigger ghi `progress` (0→1) vào module ref
  (`components/v6/experience/progress.ts`); `useFrame` đọc mỗi khung hình.
  **Không có `setState` nào chạy theo frame.**
- Lenis lo smooth scroll trên document thật; track cao ~1400vh như wireframe cũ.
- Chữ luôn là DOM thật (nét, chọn được, SEO); không render chữ trong WebGL.

### 6.3 Thành phố cách điệu

- Tòa nhà: MỘT `InstancedMesh` hộp (~400 instance desktop / ~150 mobile), vị trí +
  kích thước sinh bằng seeded random (cùng seed = cùng thành phố mọi lần tải).
- Cửa sổ: emissive map vẽ bằng canvas — vàng ấm cường độ thấp; vài ô nhấp nháy chu
  kỳ rất chậm (biến thiên theo instance id trong shader, không setState).
- Biển hero: 6–8 vật thể đặt tay (billboard 2 cột, pano ốp tường, LED cong) — chỉ
  chúng mang màu cyan (luật 2). Mặt biển emissive + sprite halo.
- Chiều sâu: fog màu `#04091a` + lớp sương mặt đất; bóng giả bằng gradient chân tòa
  nhà, **không shadow map**.

### 6.4 Hệ camera — trái tim của trang

- 6 pose (position + lookAt target) tương ứng 6 frame; frame 2 có thêm 3 sub-pose
  (3 biển dịch vụ), frame 3 có 5 sub-pose (5 mốc).
- MỘT GSAP timeline duy nhất scrub theo scroll, tween camera qua từng pose; ease
  riêng từng chặng (hạ độ cao `power2.inOut`, dolly-out bản đồ `expo.in`…).
- Mỗi pose có đoạn "hold" ~15% chiều dài chặng — camera gần như đứng yên cho người
  xem đọc chữ (luật 1).
- Chuyển thành phố → bản đồ KHÔNG cắt scene: chấm đèn bản đồ nằm sẵn ở tọa độ xa,
  camera lùi ra thì thành phố thu lại vừa khớp thành cụm sáng TP.HCM. Tọa độ
  TP.HCM là mốc neo tỉ lệ, chốt ngay từ đầu.
- Chuyển 5→6: camera lao vào plane LED gần điểm TP.HCM; khi mặt LED chiếm trọn
  khung, DOM form fade in đè lên.

### 6.5 Đồng bộ chữ DOM

Mỗi frame một block DOM; cùng ScrollTrigger đánh dấu range hiện/ẩn. Đúng MỘT kiểu
animation chữ toàn trang: fade + trượt 20px. Điều hướng giữ từ wireframe cũ: progress
bar đáy + 6 dot phải (bấm dot = tween scroll tới pose) + logo góc trái. Bỏ vĩnh viễn:
nhãn kỹ thuật, HUD, số nhảy liên tục.

### 6.6 Hiệu năng · mobile · reduced-motion

- DPR kẹp ≤ 1.75; frustum + fog che phần xa; đo FPS thật — nếu tụt dưới ngưỡng thì
  tự giảm tier (tắt bloom → giảm instance → giảm DPR).
- Mobile: ~150 tòa, đường bay ngắn hơn (gộp 3 điểm dừng đại lộ thành 1), bloom tắt,
  streaks giảm nửa, chữ xếp dọc.
- `prefers-reduced-motion`: không tween camera — crossfade giữa 6 khung tĩnh (camera
  nhảy pose), chữ vẫn hiện đủ; mọi animation lặp tắt.

### 6.7 Cấu trúc file

```
app/v6/page.tsx                    — ghép Canvas + Overlay (thay nội dung cũ)
app/v6/v6.css                      — viết lại: chỉ còn style DOM overlay
components/v6/data.ts              — MILESTONES / SERVICES / PINS / MAP_STATS (chuyển từ stages.tsx)
components/v6/experience/
  Experience.tsx                   — Canvas, ánh sáng, fog, EffectComposer
  City.tsx                         — instanced buildings + cửa sổ
  Billboards.tsx                   — biển hero + halo + nền ướt
  VietnamLights.tsx                — bản đồ chấm đèn + pins
  Streaks.tsx                      — vệt sáng tốc độ (2 chuyển cảnh)
  CameraRig.tsx                    — 6 pose + timeline scrub + FOV kick
  progress.ts                      — module ref cầu nối
components/v6/overlay/
  Overlay.tsx                      — 6 block chữ + nav + progress bar
  ContactForm.tsx                  — form (tái dùng logic submit của stages.tsx)
```

Gỡ bỏ khi triển khai: `components/v6/wireframe.tsx`, `components/v6/stages.tsx`
(sau khi đã chuyển data + form ra file mới).

## 7. Rủi ro chính và cách đỡ

1. **Đường bay camera xấu** → pose chỉnh được bằng số từng chặng, xem trực tiếp;
   đây là hạng mục dành nhiều thời gian tinh chỉnh nhất.
2. **Hiệu năng máy yếu** → auto-tier (6.6); ngưỡng đo bằng FPS thật chứ không đoán
   theo user-agent.
3. **Khớp thành-phố-vào-bản-đồ lệch tỉ lệ** → chốt tọa độ TP.HCM làm mốc neo ngay
   từ khi dựng City và VietnamLights.
4. **React 18 vs fiber 9** → phải dùng fiber 8 / drei 9 / postprocessing bản tương
   thích; kiểm tra version khi cài.

## 8. Phân đợt triển khai

| Đợt | Nội dung |
|---|---|
| 1 | Nền tảng: Canvas + City + progress ref + CameraRig với 6 pose thô + overlay chữ — đi hết 6 frame bằng chuyển động đơn giản, chưa hiệu ứng mạnh |
| 2 | Biển hero + đại lộ dịch vụ + con đường 20 năm (sub-pose) + bản đồ VN khớp neo |
| 3 | Liều hiệu ứng mạnh: bloom, FOV kick, streaks, nền ướt, bụi sao + auto-tier hiệu năng + mobile/reduced-motion |

Mỗi đợt chạy được và xem được ở cuối đợt; hiệu ứng mạnh vào sau cùng để pacing camera
được chốt trên bản sạch.

## 9. Ngoài phạm vi

- Concept B và C (mục 3.2, 3.3) — chỉ lưu storyboard, không dựng.
- CMS/quản trị nội dung biển; ảnh dự án thật (dùng placeholder màu/texture code).
- Âm thanh.
