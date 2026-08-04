"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import { useSlot } from "@/components/v7/assets/AssetSlot";
import { scrollState } from "./progress";
import { sampleCamera, type CameraSample } from "./cameraPath";
import { STAGES } from "./world";

const HOLD_POSES = STAGES.map((s) => s.hold);

const WORLD_UP = new THREE.Vector3(0, 1, 0);

export function CameraRig({ reduced = false }: { reduced?: boolean }) {
  const scene = useThree((s) => s.scene);

  /* Nếu Blender đã nộp camera-path.glb → scrub animation, bỏ hẳn keyframe code */
  const pathGltf = useSlot("camera-path");
  const rig = useMemo(() => {
    if (!pathGltf || pathGltf.animations.length === 0) return null;
    const mixer = new THREE.AnimationMixer(pathGltf.scene);
    const clip = pathGltf.animations[0];
    mixer.clipAction(clip).play();
    const node =
      pathGltf.cameras[0] ??
      pathGltf.scene.getObjectByName("CAM_RIG") ??
      pathGltf.scene.children[0];
    return { mixer, clip, node, root: pathGltf.scene };
  }, [pathGltf]);

  const sample = useRef<CameraSample>({
    pos: new THREE.Vector3(),
    look: new THREE.Vector3(),
    fov: 46,
    roll: 0,
  });
  const tmpDir = useRef(new THREE.Vector3());
  const tmpRight = useRef(new THREE.Vector3());
  const parallax = useRef({ x: 0, y: 0 });

  useFrame(({ camera }, dt) => {
    const cam = camera as THREE.PerspectiveCamera;
    let p = scrollState.current;

    /* prefers-reduced-motion: nhảy giữa các pose tĩnh, không tween */
    if (reduced) {
      p = HOLD_POSES.reduce((best, c) => (Math.abs(c - p) < Math.abs(best - p) ? c : best));
    }

    /* Parallax theo chuột — làm mượt riêng, biên độ nhỏ để không say */
    const k = 1 - Math.exp(-Math.min(dt, 0.05) * 3);
    parallax.current.x += (scrollState.pointer.x - parallax.current.x) * k;
    parallax.current.y += (scrollState.pointer.y - parallax.current.y) * k;

    if (rig) {
      const dur = rig.clip.duration;
      rig.mixer.setTime(THREE.MathUtils.clamp(p, 0, 1) * dur);
      rig.root.updateMatrixWorld(true);
      rig.node.getWorldPosition(cam.position);
      rig.node.getWorldQuaternion(cam.quaternion);
      const src = rig.node as THREE.PerspectiveCamera;
      if (src.isPerspectiveCamera && Math.abs(cam.fov - src.fov) > 0.01) {
        cam.fov = src.fov;
        cam.updateProjectionMatrix();
      }
      return;
    }

    const s = sample.current;
    sampleCamera(p, s);

    /* Đẩy camera lệch ngang/dọc theo con trỏ, biên độ tỉ lệ khoảng cách nhìn */
    const dist = s.pos.distanceTo(s.look);
    const amp = THREE.MathUtils.clamp(dist * 0.012, 0.3, 6);
    tmpDir.current.subVectors(s.look, s.pos).normalize();
    tmpRight.current.crossVectors(tmpDir.current, WORLD_UP).normalize();

    cam.position.copy(s.pos);
    if (!reduced) {
      cam.position.addScaledVector(tmpRight.current, parallax.current.x * amp);
      cam.position.addScaledVector(WORLD_UP, -parallax.current.y * amp * 0.6);
    }
    cam.lookAt(s.look);
    if (s.roll !== 0 && !reduced) cam.rotateZ(s.roll);

    /* FOV kick theo tốc độ cuộn — cuộn nhanh thì khung nở ra, cảm giác lao tới */
    const kick = reduced ? 0 : THREE.MathUtils.clamp(scrollState.velocity * 26, -2.5, 5);
    const fov = s.fov + kick;
    if (Math.abs(cam.fov - fov) > 0.01) {
      cam.fov = fov;
      cam.updateProjectionMatrix();
    }

    /* Sương mù nới xa dần khi camera lên cao (cảnh sa bàn không bị nuốt) */
    const fog = scene.fog as THREE.Fog | null;
    if (fog) fog.far = THREE.MathUtils.clamp(900 + cam.position.y * 2.6, 900, 4200);
  });

  return null;
}
