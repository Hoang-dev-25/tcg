# Chỗ thả asset Blender cho /v7

Thả file `.glb` vào đúng thư mục này, đặt **đúng tên** dưới đây, rồi chạy:

```bash
npm run v7:assets      # quét thư mục, ghi manifest.json, in báo cáo sẵn sàng
```

Mở `http://localhost:3000/v7?debug=1` để thấy bảng trạng thái 6 slot.

| Tên file | Bắt buộc | Dùng ở giai đoạn |
|---|---|---|
| `hero-tower.glb` | ✔ | 1 → 2 → 3 (camera bay xuyên mặt LED) |
| `building-kit.glb` | ✔ | 1 → 2 (rải InstancedMesh) |
| `billboard.glb` + `billboard-lod1.glb` | ✔ | 4, và LOD1 làm pin ở giai đoạn 5 |
| `pano.glb` + `pano-lod1.glb` | ✔ | 4, 5 |
| `led-cabinet.glb` + `led-cabinet-lod1.glb` | ✔ | 4, 5 |
| `camera-path.glb` | tùy chọn | toàn bộ đường bay 1 → 6 |

Chưa có file nào thì trang **vẫn chạy đủ 6 giai đoạn** bằng bản procedural —
không cần sửa code, chỉ thiếu độ chi tiết.

Spec đầy đủ (kích thước thật, tên node/material bắt buộc, quy trình bake &
export): [`docs/v7-blender-spec.md`](../../../docs/v7-blender-spec.md).
