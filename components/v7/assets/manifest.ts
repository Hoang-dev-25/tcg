/* ===== ĐĂNG KÝ SLOT BLENDER cho /v7 =====
   Đây là bản hợp đồng giữa web và người dựng 3D. Mỗi slot dưới đây là một chỗ
   TRỐNG chờ file .glb; khi chưa có file, runtime tự dựng bản procedural thay thế
   nên trang vẫn chạy đủ 6 giai đoạn. Thả file đúng tên vào
   `public/v7-assets/models/` rồi chạy `npm run v7:assets` là xong — không phải
   sửa một dòng code nào.

   Spec chi tiết từng asset (kích thước thật, số cabinet, loại cột, quy trình
   bake/export): docs/v7-blender-spec.md */

export type SlotId =
  | "hero-tower"
  | "building-kit"
  | "billboard"
  | "pano"
  | "led-cabinet"
  | "camera-path";

export type SlotSpec = {
  id: SlotId;
  title: string;
  /** bắt buộc dựng Blender (5 asset) hay tùy chọn (camera path) */
  required: boolean;
  /** giai đoạn nào dùng tới */
  stages: string;
  /** đường dẫn file kỳ vọng, tính từ /public */
  file: string;
  /** bản LOD thấp — billboard/pano/led tái dùng làm pin trên bản đồ (giai đoạn 5) */
  lodFile?: string;
  /** ngân sách tam giác [LOD0, LOD1] */
  triBudget: [number, number?];
  /** hệ số quy đổi nếu file không xuất theo mét (mặc định 1) */
  scale: number;
  /** tên node bắt buộc phải có trong file để runtime neo/hoán vật liệu */
  nodes: string[];
  /** tên material bắt buộc — runtime sẽ thay bằng shader LED/ảnh dự án */
  materials: string[];
  /** kích thước thật để người dựng khớp tỉ lệ */
  realWorld: string;
  note: string;
};

export const SLOTS: Record<SlotId, SlotSpec> = {
  "hero-tower": {
    id: "hero-tower",
    title: "Tòa nhà chủ đạo + khung màn LED",
    required: true,
    stages: "1 → 2 → 3 (camera bay XUYÊN qua mặt LED)",
    file: "/v7-assets/models/hero-tower.glb",
    triBudget: [60000],
    scale: 1,
    nodes: ["HERO_TOWER", "LED_FRAME", "LED_SCREEN"],
    materials: ["MAT_LED_SCREEN"],
    realWorld: "tòa cao ~158m, mặt LED 56×31,5m (16:9), tâm mặt LED ở cao độ 96m",
    note:
      "Mặt kính có cạnh vát bắt sáng, khung thép viền màn hình, giàn giáo/thang kỹ thuật sau lưng, mái. " +
      "Node LED_SCREEN phải là mesh phẳng riêng, pivot ở tâm, pháp tuyến +Z, mang material MAT_LED_SCREEN " +
      "để runtime thay bằng shader LED (pixel grid + nội dung timeline).",
  },
  "building-kit": {
    id: "building-kit",
    title: "Kit tòa nhà đô thị (5–8 module)",
    required: true,
    stages: "1 → 2 (silhouette thành phố, InstancedMesh vài trăm bản)",
    file: "/v7-assets/models/building-kit.glb",
    triBudget: [12000],
    scale: 1,
    nodes: ["BLD_01", "BLD_02", "BLD_03", "BLD_04", "BLD_05"],
    materials: ["MAT_BUILDING"],
    realWorld: "mỗi module cao 12–90m, đáy 8–22m; pivot ở TÂM ĐÁY (y=0)",
    note:
      "Đặc trưng VN: nhà ống, chung cư cũ, ăng-ten, bồn nước inox, biển hiệu dọc. 300–1.500 tris/module. " +
      "Runtime tự đọc mọi node tên BLD_* và rải bằng InstancedMesh với random scale/rotation.",
  },
  billboard: {
    id: "billboard",
    title: "Billboard tấm lớn",
    required: true,
    stages: "4 (camera lướt sát) · 5 (bản LOD1 làm pin bản đồ)",
    file: "/v7-assets/models/billboard.glb",
    lodFile: "/v7-assets/models/billboard-lod1.glb",
    triBudget: [40000, 1200],
    scale: 1,
    nodes: ["BILLBOARD", "BOARD_FACE"],
    materials: ["MAT_BOARD_FACE"],
    realWorld: "mặt biển 12×6m, tâm mặt ở cao độ 21m, cột đơn monopole Ø1,2m",
    note:
      "Cần bevel cạnh thép. Dàn đèn rọi 4–6 bóng gắn thanh ngang dưới, thang leo, chân đế bê tông. " +
      "BOARD_FACE là plane phẳng riêng để runtime hoán ảnh dự án.",
  },
  pano: {
    id: "pano",
    title: "Pano bạt Hiflex",
    required: true,
    stages: "4 (camera lướt sát) · 5 (pin bản đồ)",
    file: "/v7-assets/models/pano.glb",
    lodFile: "/v7-assets/models/pano-lod1.glb",
    triBudget: [40000, 1200],
    scale: 1,
    nodes: ["PANO", "PANO_FACE"],
    materials: ["MAT_BOARD_FACE"],
    realWorld: "mặt pano 10×5m, tâm mặt ở cao độ 24m",
    note:
      "Bạt PHẢI có độ võng nhẹ (mô phỏng Cloth rồi apply, không phẳng tuyệt đối), gấp mép quanh khung, " +
      "khoen + dây chằng. Đây là chi tiết người trong ngành nhìn ra ngay.",
  },
  "led-cabinet": {
    id: "led-cabinet",
    title: "Màn LED outdoor (cabinet)",
    required: true,
    stages: "4 (camera lướt sát) · 5 (pin bản đồ)",
    file: "/v7-assets/models/led-cabinet.glb",
    lodFile: "/v7-assets/models/led-cabinet-lod1.glb",
    triBudget: [45000, 1500],
    scale: 1,
    nodes: ["LED_CABINET", "LED_FACE"],
    materials: ["MAT_LED_SCREEN"],
    realWorld: "module 960×960mm ghép 8×4 = 7,68×3,84m, tâm mặt ở cao độ 18m",
    note:
      "Khe hở giữa các cabinet phải thấy được. Mặt sau: tủ điện, quạt tản nhiệt, mái che chống nước. " +
      "Mặt trước để PHẲNG — chi tiết pixel do shader lo.",
  },
  "camera-path": {
    id: "camera-path",
    title: "Đường bay camera (glTF animation)",
    required: false,
    stages: "toàn bộ 1 → 6",
    file: "/v7-assets/models/camera-path.glb",
    triBudget: [0],
    scale: 1,
    nodes: ["CAM_RIG"],
    materials: [],
    realWorld: "Bezier path qua đủ 6 điểm dừng, 0 → 100 frame ứng với progress 0 → 1",
    note:
      "Nếu có file này, runtime bỏ hoàn toàn keyframe code và scrub bằng AnimationMixer.setTime(). " +
      "Camera con của CAM_RIG mang FOV art-direct từng khung. Đây là cách art-direct đường bay mà " +
      "không phải sửa code.",
  },
};

export const SLOT_LIST = Object.values(SLOTS);
export const REQUIRED_SLOTS = SLOT_LIST.filter((s) => s.required);

/* Ngân sách tổng của cả trang — script v7:assets kiểm tra và cảnh báo */
export const BUDGET = {
  totalTris: 500_000,
  totalTextureBytes: 25 * 1024 * 1024,
};
