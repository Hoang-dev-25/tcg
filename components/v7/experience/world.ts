/* ===== v7 — BẢN ĐỒ THẾ GIỚI 3D (nguồn sự thật duy nhất về toạ độ) =====
   Mọi layer VÀ đường bay camera đều đọc từ đây. Đổi số ở file này thì cả cảnh
   lẫn camera dịch theo nhau — không bao giờ lệch.

   Trục: đơn vị = MÉT (khớp yêu cầu export Blender "đơn vị mét").
   Camera đi từ z dương về z âm, xuyên qua mặt LED rồi vào không gian dữ liệu. */

export const WORLD = {
  /* --- Giai đoạn 1–2: tòa nhà chủ đạo mang màn LED (slot Blender hero-tower) --- */
  heroTower: {
    /* Chân tòa nhà đặt tại gốc XZ này, cao lên theo +Y.
       Pivot của file Blender = tâm đáy tòa; mặt trước thân tòa ở local z = +23,
       tâm mặt LED ở local (0, 96, 24) → rơi đúng WORLD.ledWall.center. */
    base: [0, 0, -244] as [number, number, number],
    width: 62,
    depth: 46,
    height: 158,
  },
  /* Mặt LED gắn mặt trước tòa (hướng +Z về phía camera). 16:9. */
  ledWall: {
    center: [0, 96, -220] as [number, number, number],
    width: 56,
    height: 31.5,
  },

  /* --- Giai đoạn 3: không gian dữ liệu phía SAU mặt LED --- */
  dataSpace: {
    from: -232, // ngay sau mặt LED
    to: -640,
    core: [0, 92, -520] as [number, number, number],
    coreRadius: 14,
  },

  /* --- Giai đoạn 4: ba trạm dịch vụ (3 slot Blender sản phẩm thật) --- */
  services: [
    {
      id: "billboard" as const,
      /* tâm mặt biển 12×6m, chân cột chạm đất */
      anchor: [-118, 0, -742] as [number, number, number],
      faceCenter: [-118, 21, -742] as [number, number, number],
      rotY: 0.42,
    },
    {
      id: "pano" as const,
      anchor: [112, 0, -892] as [number, number, number],
      faceCenter: [112, 24, -892] as [number, number, number],
      rotY: -0.5,
    },
    {
      id: "led-cabinet" as const,
      anchor: [-56, 0, -1044] as [number, number, number],
      faceCenter: [-56, 18, -1044] as [number, number, number],
      rotY: 0.3,
    },
  ],

  /* --- Giai đoạn 5: sa bàn bản đồ Việt Nam (nằm ngang, nhìn từ trên xuống) --- */
  map: {
    center: [0, 0, -1330] as [number, number, number],
    /* khung sa bàn: rộng theo X, dài theo Z */
    width: 430,
    depth: 880,
  },

  /* --- Giai đoạn 6: không gian văn phòng ảo --- */
  office: {
    center: [0, 0, -1836] as [number, number, number],
    wall: [0, 17, -1874] as [number, number, number],
  },
} as const;

/* Sáu giai đoạn — khoảng progress dùng CHUNG cho camera, layer và overlay DOM.
   `hold` là điểm giữa đoạn đứng yên: reduced-motion nhảy giữa các điểm này. */
export type StageId = "hero" | "timeline" | "ai" | "services" | "map" | "contact";

export type Stage = {
  id: StageId;
  label: string;
  start: number;
  end: number;
  hold: number;
};

export const STAGES: Stage[] = [
  { id: "hero", label: "Thành phố", start: 0.0, end: 0.13, hold: 0.04 },
  { id: "timeline", label: "20 năm", start: 0.13, end: 0.32, hold: 0.25 },
  { id: "ai", label: "Công nghệ AI", start: 0.32, end: 0.5, hold: 0.45 },
  { id: "services", label: "Dịch vụ", start: 0.5, end: 0.71, hold: 0.6 },
  { id: "map", label: "Dự án", start: 0.71, end: 0.88, hold: 0.81 },
  { id: "contact", label: "Liên hệ", start: 0.88, end: 1.0, hold: 0.97 },
];

export function stageAt(p: number): Stage {
  for (let i = STAGES.length - 1; i >= 0; i--) {
    if (p >= STAGES[i].start) return STAGES[i];
  }
  return STAGES[0];
}

/* Cửa sổ hiển thị của từng layer — ngoài khoảng này layer tự tắt (visible=false)
   để giữ draw call thấp. Có chồng lấn để chuyển cảnh không bị "khựng". */
export const LAYER_WINDOWS = {
  city: [0.0, 0.4] as [number, number],
  ledWall: [0.0, 0.42] as [number, number],
  dataSpace: [0.26, 0.74] as [number, number],
  services: [0.46, 0.82] as [number, number],
  map: [0.66, 0.93] as [number, number],
  office: [0.84, 1.0] as [number, number],
};

export function inWindow(p: number, w: [number, number], pad = 0.01): boolean {
  return p >= w[0] - pad && p <= w[1] + pad;
}
