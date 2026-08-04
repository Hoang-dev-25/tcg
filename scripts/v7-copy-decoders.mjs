#!/usr/bin/env node
/**
 * v7 — Copy decoder Draco + KTX2/Basis từ node_modules sang public/.
 * Chỉ cần chạy khi asset Blender được nén bằng Draco/meshopt hoặc texture KTX2.
 *
 *   npm run v7:setup
 */

import { cpSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "node_modules/three/examples/jsm/libs");
const DEST = join(ROOT, "public/v7-assets/decoders");

const jobs = [
  { from: join(SRC, "draco/gltf"), to: join(DEST, "draco"), label: "Draco" },
  { from: join(SRC, "basis"), to: join(DEST, "basis"), label: "KTX2/Basis" },
];

for (const j of jobs) {
  if (!existsSync(j.from)) {
    console.log(`  ✖  Không thấy ${j.from} — cài lại three?`);
    continue;
  }
  mkdirSync(j.to, { recursive: true });
  cpSync(j.from, j.to, { recursive: true });
  console.log(`  ✔  ${j.label} → ${j.to.replace(ROOT + "/", "")}`);
}

console.log("\n  Xong. Phiên bản decoder khớp đúng three trong node_modules.\n");
