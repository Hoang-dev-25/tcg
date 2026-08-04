#!/usr/bin/env node
/**
 * v7 — Quét thư mục asset Blender và ghi manifest cho runtime.
 *
 *   node scripts/v7-check-assets.mjs           # quét + ghi manifest + in báo cáo
 *   node scripts/v7-check-assets.mjs --strict  # thoát mã 1 nếu thiếu asset bắt buộc
 *
 * Chạy lại mỗi khi người dựng nộp file mới. Runtime đọc
 * public/v7-assets/models/manifest.json để biết slot nào đã có.
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const MODELS_DIR = join(ROOT, "public/v7-assets/models");
const DECODERS_DIR = join(ROOT, "public/v7-assets/decoders");
const SPEC_FILE = join(ROOT, "components/v7/assets/manifest.ts");

/* ---------- Đọc hợp đồng slot từ manifest.ts (nguồn sự thật duy nhất) ---------- */
function readSlots() {
  const src = readFileSync(SPEC_FILE, "utf8");
  const slots = [];
  let cur = null;
  for (const line of src.split("\n")) {
    const id = line.match(/^\s{4}id:\s*"([^"]+)"/);
    if (id) {
      cur = { id: id[1], required: false, files: [], triBudget: 0 };
      slots.push(cur);
      continue;
    }
    if (!cur) continue;
    const req = line.match(/^\s{4}required:\s*(true|false)/);
    if (req) cur.required = req[1] === "true";
    const file = line.match(/(?:file|lodFile):\s*"\/v7-assets\/models\/([^"]+)"/);
    if (file) cur.files.push(file[1]);
    const tri = line.match(/^\s{4}triBudget:\s*\[(\d+)/);
    if (tri) cur.triBudget = Number(tri[1]);
  }
  return slots;
}

/* ---------- Quét file thật ---------- */
function scan() {
  if (!existsSync(MODELS_DIR)) return {};
  const out = {};
  for (const name of readdirSync(MODELS_DIR)) {
    if (!/\.(glb|gltf)$/i.test(name)) continue;
    out[name] = statSync(join(MODELS_DIR, name)).size;
  }
  return out;
}

const slots = readSlots();
const files = scan();

writeFileSync(
  join(MODELS_DIR, "manifest.json"),
  `${JSON.stringify({ generatedAt: new Date().toISOString(), files }, null, 2)}\n`
);

/* ---------- Báo cáo ---------- */
const kb = (n) => `${(n / 1024).toFixed(0)} KB`;
const mb = (n) => `${(n / 1024 / 1024).toFixed(2)} MB`;

console.log("\n  SLOT BLENDER cho /v7 — public/v7-assets/models\n");

let missingRequired = 0;
let total = 0;

for (const s of slots) {
  const lod0 = s.files[0];
  const present = lod0 && files[lod0] !== undefined;
  const tag = s.required ? "bắt buộc" : "tùy chọn";
  if (present) {
    total += files[lod0];
    console.log(`  ✔  ${lod0.padEnd(24)} ${kb(files[lod0]).padStart(9)}   (${tag})`);
  } else {
    if (s.required) missingRequired++;
    console.log(`  ○  ${String(lod0).padEnd(24)} ${"—".padStart(9)}   (${tag}, đang dùng bản procedural)`);
  }
  for (const extra of s.files.slice(1)) {
    if (files[extra] !== undefined) {
      total += files[extra];
      console.log(`     └─ ${extra.padEnd(21)} ${kb(files[extra]).padStart(9)}   (LOD1 → pin bản đồ)`);
    } else {
      console.log(`     └─ ${String(extra).padEnd(21)} ${"—".padStart(9)}   (LOD1 chưa có)`);
    }
  }
}

/* file lạ không nằm trong hợp đồng */
const known = new Set(slots.flatMap((s) => s.files));
const extras = Object.keys(files).filter((f) => !known.has(f));
if (extras.length) {
  console.log(`\n  ⚠  File không có trong hợp đồng đặt tên: ${extras.join(", ")}`);
  console.log("     → đổi tên theo components/v7/assets/manifest.ts thì runtime mới nạp.");
}

console.log(`\n  Tổng dung lượng model: ${mb(total)} (ngân sách texture nén < 25 MB)`);

const decodersOk =
  existsSync(join(DECODERS_DIR, "draco/draco_decoder.wasm")) &&
  existsSync(join(DECODERS_DIR, "basis/basis_transcoder.wasm"));
console.log(
  decodersOk
    ? "  ✔  Decoder Draco + KTX2/Basis đã sẵn sàng"
    : "  ○  Chưa có decoder — chạy `npm run v7:setup` trước khi nộp file nén Draco/KTX2"
);

console.log(
  missingRequired === 0
    ? "\n  → Đủ 5 asset bắt buộc. Trang chạy hoàn toàn bằng model thật.\n"
    : `\n  → Còn ${missingRequired} asset bắt buộc chưa có; trang vẫn chạy đủ 6 giai đoạn bằng bản procedural.\n`
);

if (process.argv.includes("--strict") && missingRequired > 0) process.exit(1);
