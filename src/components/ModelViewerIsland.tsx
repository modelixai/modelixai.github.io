import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import type { ViewerTranslations } from '../i18n/translations';

type LightingPreset = 'neutral' | 'rim' | 'clay' | 'blueprint';
type BackdropMode = 'light' | 'dark' | 'checker';

interface ModelStats {
  name: string;
  format: string;
  triangles: number;
  vertices: number;
  meshes: number;
  materials: number;
  textures: number;
  dimensions: string;
  fileSize: string;
}

interface DroppedEntryFile {
  file: File;
  relativePath: string;
}

interface Props {
  t: ViewerTranslations;
}

const TEXTURE_KEYS = [
  'map',
  'normalMap',
  'roughnessMap',
  'metalnessMap',
  'aoMap',
  'emissiveMap',
  'alphaMap',
  'bumpMap',
  'lightMap',
  'specularMap',
] as const;

function formatBytes(bytes: number): string {
  if (bytes <= 0) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function formatDimensionValue(v: number): string {
  if (!Number.isFinite(v)) return '0';
  if (v >= 100) return v.toFixed(1);
  if (v >= 1) return v.toFixed(2);
  return v.toFixed(3);
}

function disposeObject3D(root: THREE.Object3D | null): void {
  if (!root) return;
  const disposedGeometries = new Set<THREE.BufferGeometry>();
  const disposedMaterials = new Set<THREE.Material>();
  const disposedTextures = new Set<THREE.Texture>();

  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (mesh.geometry && !disposedGeometries.has(mesh.geometry)) {
      disposedGeometries.add(mesh.geometry);
      mesh.geometry.dispose();
    }
    if (mesh.material) {
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      for (const mat of mats) {
        if (!mat || disposedMaterials.has(mat)) continue;
        disposedMaterials.add(mat);
        const rec = mat as unknown as Record<string, unknown>;
        for (const key of TEXTURE_KEYS) {
          const tex = rec[key];
          if (tex instanceof THREE.Texture && !disposedTextures.has(tex)) {
            disposedTextures.add(tex);
            tex.dispose();
          }
        }
        mat.dispose();
      }
    }
  });
}

function computeModelMetrics(root: THREE.Object3D): {
  triangles: number;
  vertices: number;
  meshes: number;
  materials: number;
  textures: number;
} {
  let triangles = 0;
  let vertices = 0;
  let meshes = 0;
  const uniqueMaterials = new Set<THREE.Material>();
  const uniqueTextures = new Set<THREE.Texture>();

  root.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh) {
      const mesh = obj as THREE.Mesh;
      meshes += 1;
      const geom = mesh.geometry;
      if (geom) {
        const pos = geom.attributes.position;
        if (pos) {
          vertices += pos.count;
          if (geom.index) {
            triangles += Math.floor(geom.index.count / 3);
          } else {
            triangles += Math.floor(pos.count / 3);
          }
        }
      }
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      for (const mat of mats) {
        if (!mat) continue;
        uniqueMaterials.add(mat);
        const rec = mat as unknown as Record<string, unknown>;
        for (const key of TEXTURE_KEYS) {
          const tex = rec[key];
          if (tex instanceof THREE.Texture) {
            uniqueTextures.add(tex);
          }
        }
      }
    }
  });

  return {
    triangles,
    vertices,
    meshes,
    materials: uniqueMaterials.size,
    textures: uniqueTextures.size,
  };
}

/**
 * Generates a crisp procedural canvas grid texture for the built-in PBR showcase asset.
 */
function createProceduralCalibrationTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#dce3ee';
    ctx.fillRect(0, 0, 256, 256);
    ctx.strokeStyle = '#94a6c2';
    ctx.lineWidth = 2;
    for (let i = 0; i <= 256; i += 32) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 256);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(256, i);
      ctx.stroke();
    }
    ctx.strokeStyle = '#4a6fa5';
    ctx.lineWidth = 4;
    ctx.strokeRect(4, 4, 248, 248);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 2);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * Builds the built-in animated PBR inspection assembly (multi-mesh + PBR materials + 2 AnimationClips).
 */
function buildProceduralPbrSample(): {
  root: THREE.Group;
  clips: THREE.AnimationClip[];
} {
  const root = new THREE.Group();
  root.name = 'OrbitalGyroAssembly';

  const calibTex = createProceduralCalibrationTexture();

  const baseMat = new THREE.MeshStandardMaterial({
    color: 0x2c364f,
    metalness: 0.65,
    roughness: 0.32,
  });

  const deckMat = new THREE.MeshStandardMaterial({
    map: calibTex,
    color: 0xeef2f8,
    metalness: 0.25,
    roughness: 0.45,
  });

  const steelBlueMat = new THREE.MeshStandardMaterial({
    color: 0x4a6fa5,
    metalness: 0.72,
    roughness: 0.22,
  });

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xd6deeb,
    metalness: 0.82,
    roughness: 0.18,
  });

  const coreMat = new THREE.MeshStandardMaterial({
    color: 0x7aa4e0,
    emissive: 0x1e3a66,
    emissiveIntensity: 0.45,
    metalness: 0.35,
    roughness: 0.15,
    flatShading: true,
  });

  // Pedestal base
  const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.32, 0.24, 48), baseMat);
  pedestal.position.y = 0.12;
  root.add(pedestal);

  const deck = new THREE.Mesh(new THREE.CylinderGeometry(0.96, 0.96, 0.08, 48), deckMat);
  deck.position.y = 0.26;
  root.add(deck);

  // Support stanchions
  const pillarGeom = new THREE.CylinderGeometry(0.06, 0.08, 1.45, 20);
  const leftPillar = new THREE.Mesh(pillarGeom, baseMat);
  leftPillar.position.set(-1.08, 0.92, 0);
  root.add(leftPillar);

  const rightPillar = new THREE.Mesh(pillarGeom, baseMat);
  rightPillar.position.set(1.08, 0.92, 0);
  root.add(rightPillar);

  // Pivot assembly
  const hubY = 1.55;

  const outerGimbal = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.065, 24, 64), steelBlueMat);
  outerGimbal.name = 'OuterGimbal';
  outerGimbal.position.set(0, hubY, 0);
  root.add(outerGimbal);

  const innerGimbal = new THREE.Mesh(new THREE.TorusGeometry(0.68, 0.05, 20, 56), silverMat);
  innerGimbal.name = 'InnerGimbal';
  innerGimbal.position.set(0, hubY, 0);
  root.add(innerGimbal);

  const crystalCore = new THREE.Mesh(new THREE.IcosahedronGeometry(0.38, 1), coreMat);
  crystalCore.name = 'CrystalCore';
  crystalCore.position.set(0, hubY, 0);
  root.add(crystalCore);

  // Animation Clip 1: Orbital Gimbal Spin (4s seamless loop)
  const times = [0, 1, 2, 3, 4];
  const q0 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0));
  const q1 = new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI * 0.5, Math.PI * 0.5, 0));
  const q2 = new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI, Math.PI, 0));
  const q3 = new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI * 1.5, Math.PI * 1.5, 0));
  const q4 = new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI * 2, Math.PI * 2, 0));

  const outerTrack = new THREE.QuaternionKeyframeTrack(
    'OuterGimbal.quaternion',
    times,
    [...q0.toArray(), ...q1.toArray(), ...q2.toArray(), ...q3.toArray(), ...q4.toArray()]
  );

  const iq0 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0));
  const iq1 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, -Math.PI * 0.5, Math.PI * 0.5));
  const iq2 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, -Math.PI, Math.PI));
  const iq3 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, -Math.PI * 1.5, Math.PI * 1.5));
  const iq4 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, -Math.PI * 2, Math.PI * 2));

  const innerTrack = new THREE.QuaternionKeyframeTrack(
    'InnerGimbal.quaternion',
    times,
    [...iq0.toArray(), ...iq1.toArray(), ...iq2.toArray(), ...iq3.toArray(), ...iq4.toArray()]
  );

  const corePosTrack = new THREE.VectorKeyframeTrack(
    'CrystalCore.position',
    [0, 2, 4],
    [0, hubY, 0, 0, hubY + 0.1, 0, 0, hubY, 0]
  );

  const clip1 = new THREE.AnimationClip('Orbital Gimbal Calibration', 4, [
    outerTrack,
    innerTrack,
    corePosTrack,
  ]);

  // Animation Clip 2: Core Inspection Pulse (3s loop)
  const coreScaleTrack = new THREE.VectorKeyframeTrack(
    'CrystalCore.scale',
    [0, 1.5, 3],
    [1, 1, 1, 1.16, 1.16, 1.16, 1, 1, 1]
  );
  const clip2 = new THREE.AnimationClip('Core Harmonic Pulse', 3, [coreScaleTrack]);

  return { root, clips: [clip1, clip2] };
}

/**
 * Generates an authentic binary STL ArrayBuffer of a 12-tooth CAD spur gear in Z-up coordinates
 * so STLLoader parses real binary STL triangles and demonstrates Z-Up Upright orientation.
 */
function buildSampleCadStlBuffer(): ArrayBuffer {
  const teeth = 12;
  const segments = teeth * 4;
  const innerHoleR = 8; // mm
  const rootR = 20; // mm
  const tipR = 26; // mm
  const thickness = 10; // mm along Z (authentic CAD Z-up!)

  const tris: number[][] = [];
  const pushTri = (a: [number, number, number], b: [number, number, number], c: [number, number, number]) => {
    tris.push([...a, ...b, ...c]);
  };

  const outerRadiusAt = (idx: number): number => {
    const m = idx % 4;
    return m === 1 || m === 2 ? tipR : rootR;
  };

  const z0 = 0;
  const z1 = thickness;

  for (let i = 0; i < segments; i++) {
    const next = (i + 1) % segments;
    const a0 = (i / segments) * Math.PI * 2;
    const a1 = (next / segments) * Math.PI * 2;

    const r0 = outerRadiusAt(i);
    const r1 = outerRadiusAt(next);

    const ix0 = Math.cos(a0) * innerHoleR;
    const iy0 = Math.sin(a0) * innerHoleR;
    const ix1 = Math.cos(a1) * innerHoleR;
    const iy1 = Math.sin(a1) * innerHoleR;

    const ox0 = Math.cos(a0) * r0;
    const oy0 = Math.sin(a0) * r0;
    const ox1 = Math.cos(a1) * r1;
    const oy1 = Math.sin(a1) * r1;

    // Top face (+Z)
    pushTri([ix0, iy0, z1], [ox0, oy0, z1], [ox1, oy1, z1]);
    pushTri([ix0, iy0, z1], [ox1, oy1, z1], [ix1, iy1, z1]);

    // Bottom face (-Z)
    pushTri([ix0, iy0, z0], [ox1, oy1, z0], [ox0, oy0, z0]);
    pushTri([ix0, iy0, z0], [ix1, iy1, z0], [ox1, oy1, z0]);

    // Outer gear tooth wall
    pushTri([ox0, oy0, z0], [ox1, oy1, z0], [ox1, oy1, z1]);
    pushTri([ox0, oy0, z0], [ox1, oy1, z1], [ox0, oy0, z1]);

    // Inner bore cylinder wall
    pushTri([ix0, iy0, z0], [ix1, iy1, z1], [ix1, iy1, z0]);
    pushTri([ix0, iy0, z0], [ix0, iy0, z1], [ix1, iy1, z1]);
  }

  const triCount = tris.length;
  const buffer = new ArrayBuffer(84 + triCount * 50);
  const view = new DataView(buffer);
  view.setUint32(80, triCount, true);

  const vA = new THREE.Vector3();
  const vB = new THREE.Vector3();
  const vC = new THREE.Vector3();
  const cb = new THREE.Vector3();
  const ab = new THREE.Vector3();

  let offset = 84;
  for (let i = 0; i < triCount; i++) {
    const t = tris[i];
    vA.set(t[0], t[1], t[2]);
    vB.set(t[3], t[4], t[5]);
    vC.set(t[6], t[7], t[8]);
    cb.subVectors(vC, vB);
    ab.subVectors(vA, vB);
    cb.cross(ab).normalize();

    view.setFloat32(offset, cb.x, true);
    view.setFloat32(offset + 4, cb.y, true);
    view.setFloat32(offset + 8, cb.z, true);

    view.setFloat32(offset + 12, vA.x, true);
    view.setFloat32(offset + 16, vA.y, true);
    view.setFloat32(offset + 20, vA.z, true);

    view.setFloat32(offset + 24, vB.x, true);
    view.setFloat32(offset + 28, vB.y, true);
    view.setFloat32(offset + 32, vB.z, true);

    view.setFloat32(offset + 36, vC.x, true);
    view.setFloat32(offset + 40, vC.y, true);
    view.setFloat32(offset + 44, vC.z, true);

    view.setUint16(offset + 48, 0, true);
    offset += 50;
  }

  return buffer;
}

async function readDataTransferFiles(dataTransfer: DataTransfer): Promise<DroppedEntryFile[]> {
  const results: DroppedEntryFile[] = [];

  const traverseEntry = async (entry: FileSystemEntry, prefix = ''): Promise<void> => {
    if (entry.isFile) {
      const fileEntry = entry as FileSystemFileEntry;
      const file = await new Promise<File>((resolve, reject) => fileEntry.file(resolve, reject));
      results.push({ file, relativePath: `${prefix}${file.name}` });
    } else if (entry.isDirectory) {
      const dirEntry = entry as FileSystemDirectoryEntry;
      const reader = dirEntry.createReader();
      const entries: FileSystemEntry[] = [];
      let batch: FileSystemEntry[];
      do {
        batch = await new Promise<FileSystemEntry[]>((resolve, reject) =>
          reader.readEntries(resolve, reject)
        );
        entries.push(...batch);
      } while (batch.length > 0);

      for (const child of entries) {
        await traverseEntry(child, `${prefix}${dirEntry.name}/`);
      }
    }
  };

  if (dataTransfer.items && dataTransfer.items.length > 0) {
    const entries: FileSystemEntry[] = [];
    for (let i = 0; i < dataTransfer.items.length; i++) {
      const item = dataTransfer.items[i];
      const webkitEntry =
        typeof item.webkitGetAsEntry === 'function' ? item.webkitGetAsEntry() : null;
      if (webkitEntry) entries.push(webkitEntry);
    }
    if (entries.length > 0) {
      for (const entry of entries) {
        await traverseEntry(entry);
      }
      if (results.length > 0) return results;
    }
  }

  for (let i = 0; i < dataTransfer.files.length; i++) {
    const file = dataTransfer.files[i];
    results.push({ file, relativePath: file.webkitRelativePath || file.name });
  }
  return results;
}

export default function ModelViewerIsland({ t }: Props) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Three.js mutable refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const gridRef = useRef<THREE.GridHelper | null>(null);
  const stageGroupRef = useRef<THREE.Group | null>(null);
  const orientationGroupRef = useRef<THREE.Group | null>(null);
  const currentModelRef = useRef<THREE.Object3D | null>(null);
  const dracoRef = useRef<DRACOLoader | null>(null);

  // Lights refs
  const hemiLightRef = useRef<THREE.HemisphereLight | null>(null);
  const keyLightRef = useRef<THREE.DirectionalLight | null>(null);
  const fillLightRef = useRef<THREE.DirectionalLight | null>(null);
  const rimLightRef = useRef<THREE.DirectionalLight | null>(null);

  // Animation refs
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const clipsRef = useRef<THREE.AnimationClip[]>([]);
  const activeActionRef = useRef<THREE.AnimationAction | null>(null);
  const isPlayingRef = useRef<boolean>(true);
  const isScrubbingRef = useRef<boolean>(false);

  // UI states
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [liveAnnouncement, setLiveAnnouncement] = useState<string>('');

  const [isWireframe, setIsWireframe] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [autoRotate, setAutoRotate] = useState(false);
  const [isZUp, setIsZUp] = useState(false);
  const [lighting, setLighting] = useState<LightingPreset>('neutral');
  const [backdrop, setBackdrop] = useState<BackdropMode>('light');

  // Animation states
  const [clipNames, setClipNames] = useState<string[]>([]);
  const [selectedClipIdx, setSelectedClipIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [clipDuration, setClipDuration] = useState(0);
  const [clipTime, setClipTime] = useState(0);

  // Model Inspector stats
  const [stats, setStats] = useState<ModelStats>({
    name: t.samplePbrName,
    format: 'GLB / PBR',
    triangles: 0,
    vertices: 0,
    meshes: 0,
    materials: 0,
    textures: 0,
    dimensions: '—',
    fileSize: t.proceduralSize,
  });

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
  }, []);

  useEffect(() => {
    if (!toastMsg) return;
    const timer = window.setTimeout(() => setToastMsg(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toastMsg]);

  const applyWireframeToModel = useCallback((root: THREE.Object3D | null, wf: boolean) => {
    if (!root) return;
    root.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        for (const m of mats) {
          if (m && 'wireframe' in m) {
            (m as THREE.MeshStandardMaterial).wireframe = wf;
          }
        }
      }
    });
  }, []);

  const fitAndMeasureStage = useCallback(
    (zUpFlag: boolean, resetCam: boolean): string => {
      const stageGroup = stageGroupRef.current;
      const orientationGroup = orientationGroupRef.current;
      const camera = cameraRef.current;
      const controls = controlsRef.current;
      if (!stageGroup || !orientationGroup || !currentModelRef.current) return '—';

      stageGroup.position.set(0, 0, 0);
      stageGroup.scale.set(1, 1, 1);
      orientationGroup.rotation.set(zUpFlag ? -Math.PI / 2 : 0, 0, 0);
      stageGroup.updateMatrixWorld(true);

      const rawBox = new THREE.Box3().setFromObject(orientationGroup);
      if (rawBox.isEmpty()) return '0 × 0 × 0';

      const rawSize = rawBox.getSize(new THREE.Vector3());
      const dimString = `${formatDimensionValue(rawSize.x)} × ${formatDimensionValue(rawSize.y)} × ${formatDimensionValue(rawSize.z)}`;

      const maxDim = Math.max(rawSize.x, rawSize.y, rawSize.z) || 1;
      const normScale = 2.6 / maxDim;
      stageGroup.scale.setScalar(normScale);
      stageGroup.updateMatrixWorld(true);

      const scaledBox = new THREE.Box3().setFromObject(orientationGroup);
      const scaledCenter = scaledBox.getCenter(new THREE.Vector3());
      stageGroup.position.set(-scaledCenter.x, -scaledBox.min.y, -scaledCenter.z);
      stageGroup.updateMatrixWorld(true);

      if (resetCam && camera && controls) {
        const finalBox = new THREE.Box3().setFromObject(stageGroup);
        const finalSize = finalBox.getSize(new THREE.Vector3());
        const targetY = Math.max(finalSize.y * 0.46, 0.35);
        const radius = Math.max(finalSize.length() * 0.5, 1.1);
        const dist = radius * 2.15;

        controls.target.set(0, targetY, 0);
        camera.position.set(dist * 0.82, targetY + dist * 0.48, dist * 1.02);
        camera.near = 0.01;
        camera.far = Math.max(dist * 25, 100);
        camera.updateProjectionMatrix();
        controls.update();
      }

      return dimString;
    },
    []
  );

  const installModelIntoScene = useCallback(
    (
      modelRoot: THREE.Object3D,
      clips: THREE.AnimationClip[],
      meta: { name: string; format: string; fileSize: string; defaultZUp: boolean; announce: boolean }
    ) => {
      const orientationGroup = orientationGroupRef.current;
      if (!orientationGroup) return;

      // Cleanly dispose previous model & mixer
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
        if (currentModelRef.current) {
          mixerRef.current.uncacheRoot(currentModelRef.current);
        }
        mixerRef.current = null;
      }
      activeActionRef.current = null;

      if (currentModelRef.current) {
        orientationGroup.remove(currentModelRef.current);
        disposeObject3D(currentModelRef.current);
        currentModelRef.current = null;
      }

      currentModelRef.current = modelRoot;
      orientationGroup.add(modelRoot);

      applyWireframeToModel(modelRoot, isWireframe);
      setIsZUp(meta.defaultZUp);

      const dimString = fitAndMeasureStage(meta.defaultZUp, true);
      const metrics = computeModelMetrics(modelRoot);

      setStats({
        name: meta.name,
        format: meta.format,
        triangles: metrics.triangles,
        vertices: metrics.vertices,
        meshes: metrics.meshes,
        materials: metrics.materials,
        textures: metrics.textures,
        dimensions: dimString,
        fileSize: meta.fileSize,
      });

      // Setup animations
      clipsRef.current = clips;
      if (clips.length > 0) {
        const mixer = new THREE.AnimationMixer(modelRoot);
        mixerRef.current = mixer;
        setClipNames(clips.map((c, idx) => c.name || `Clip ${idx + 1}`));
        setSelectedClipIdx(0);
        const firstClip = clips[0];
        const action = mixer.clipAction(firstClip);
        action.reset().play();
        activeActionRef.current = action;
        setClipDuration(firstClip.duration);
        setClipTime(0);
        setIsPlaying(true);
        isPlayingRef.current = true;
      } else {
        setClipNames([]);
        setSelectedClipIdx(0);
        setClipDuration(0);
        setClipTime(0);
        setIsPlaying(false);
        isPlayingRef.current = false;
      }

      if (meta.announce) {
        const announcement = t.statusLoadedTemplate
          .replace('{name}', meta.name)
          .replace('{format}', meta.format)
          .replace('{triangles}', metrics.triangles.toLocaleString());
        setLiveAnnouncement(announcement);
      }
    },
    [applyWireframeToModel, fitAndMeasureStage, isWireframe, t.statusLoadedTemplate]
  );

  // Initialize Three.js WebGL Stage
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const initialDark = document.documentElement.classList.contains('dark');
    setBackdrop(initialDark ? 'dark' : 'light');

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(initialDark ? '#121622' : '#EEF2F7');
    sceneRef.current = scene;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 480;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.01, 200);
    camera.position.set(2.8, 2.1, 3.4);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // PMREM Studio Environment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const roomEnv = new RoomEnvironment();
    const envRT = pmremGenerator.fromScene(roomEnv, 0.04);
    scene.environment = envRT.texture;
    roomEnv.dispose();

    // Studio Grid Floor
    const grid = new THREE.GridHelper(
      10,
      20,
      initialDark ? 0x3b4c6b : 0x9aa9c2,
      initialDark ? 0x232c40 : 0xd5dce6
    );
    grid.position.y = 0;
    scene.add(grid);
    gridRef.current = grid;

    // Studio Lighting Rig
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x3a475e, 0.65);
    scene.add(hemiLight);
    hemiLightRef.current = hemiLight;

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.65);
    keyLight.position.set(4.5, 7.0, 5.0);
    scene.add(keyLight);
    keyLightRef.current = keyLight;

    const fillLight = new THREE.DirectionalLight(0xdce8ff, 0.75);
    fillLight.position.set(-5.0, 3.5, 2.5);
    scene.add(fillLight);
    fillLightRef.current = fillLight;

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.7);
    rimLight.position.set(0, 4.5, -6.0);
    scene.add(rimLight);
    rimLightRef.current = rimLight;

    // Stage & Orientation Pivot Groups
    const stageGroup = new THREE.Group();
    const orientationGroup = new THREE.Group();
    stageGroup.add(orientationGroup);
    scene.add(stageGroup);
    stageGroupRef.current = stageGroup;
    orientationGroupRef.current = orientationGroup;

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.065;
    controls.rotateSpeed = 0.85;
    controls.zoomSpeed = 1.0;
    controls.panSpeed = 0.85;
    controls.minDistance = 0.25;
    controls.maxDistance = 45;
    controls.autoRotate = false;
    controls.autoRotateSpeed = 2.0;
    controlsRef.current = controls;

    // Shared DRACOLoader pointing to local /draco/ decoder assets (zero external network calls)
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');
    dracoRef.current = dracoLoader;

    // Load lightweight built-in procedural PBR animated sample immediately so controls are live
    const sample = buildProceduralPbrSample();
    currentModelRef.current = sample.root;
    orientationGroup.add(sample.root);
    const dimStr = fitAndMeasureStage(false, true);
    const initialMetrics = computeModelMetrics(sample.root);
    setStats({
      name: t.samplePbrName,
      format: 'GLB / PBR',
      triangles: initialMetrics.triangles,
      vertices: initialMetrics.vertices,
      meshes: initialMetrics.meshes,
      materials: initialMetrics.materials,
      textures: initialMetrics.textures,
      dimensions: dimStr,
      fileSize: t.proceduralSize,
    });

    clipsRef.current = sample.clips;
    const mixer = new THREE.AnimationMixer(sample.root);
    mixerRef.current = mixer;
    setClipNames(sample.clips.map((c) => c.name));
    setSelectedClipIdx(0);
    const firstAction = mixer.clipAction(sample.clips[0]);
    firstAction.play();
    activeActionRef.current = firstAction;
    setClipDuration(sample.clips[0].duration);
    setIsPlaying(true);
    isPlayingRef.current = true;

    // Sync backdrop when user toggles site Light/Dark mode in Navbar
    const onSiteThemeChange = (ev: Event) => {
      const customEv = ev as CustomEvent<{ dark: boolean }>;
      setBackdrop((prev) => (prev === 'checker' ? 'checker' : customEv.detail.dark ? 'dark' : 'light'));
    };
    window.addEventListener('modelix-theme-change', onSiteThemeChange);

    // Responsive ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    // 60fps Render Loop
    const clock = new THREE.Clock();
    let rafId = 0;
    let uiTickAccumulator = 0;

    const animate = () => {
      rafId = window.requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.1);

      if (mixerRef.current && isPlayingRef.current && !isScrubbingRef.current) {
        mixerRef.current.update(delta);
        uiTickAccumulator += delta;
        if (uiTickAccumulator >= 0.08 && activeActionRef.current) {
          uiTickAccumulator = 0;
          setClipTime(activeActionRef.current.time);
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('modelix-theme-change', onSiteThemeChange);
      resizeObserver.disconnect();
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
      }
      disposeObject3D(currentModelRef.current);
      if (gridRef.current) {
        gridRef.current.geometry.dispose();
        if (Array.isArray(gridRef.current.material)) {
          gridRef.current.material.forEach((m) => m.dispose());
        } else {
          gridRef.current.material.dispose();
        }
      }
      controls.dispose();
      dracoLoader.dispose();
      envRT.dispose();
      pmremGenerator.dispose();
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync Wireframe toggle
  useEffect(() => {
    applyWireframeToModel(currentModelRef.current, isWireframe);
  }, [isWireframe, applyWireframeToModel]);

  // Sync Grid Floor toggle
  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.visible = showGrid;
    }
  }, [showGrid]);

  // Sync Auto-Rotate toggle
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
    }
  }, [autoRotate]);

  // Sync Z-Up Upright orientation toggle
  useEffect(() => {
    if (!currentModelRef.current) return;
    const newDims = fitAndMeasureStage(isZUp, false);
    setStats((prev) => ({ ...prev, dimensions: newDims }));
  }, [isZUp, fitAndMeasureStage]);

  // Sync Studio Lighting Presets
  useEffect(() => {
    const scene = sceneRef.current;
    const hemi = hemiLightRef.current;
    const key = keyLightRef.current;
    const fill = fillLightRef.current;
    const rim = rimLightRef.current;
    if (!scene || !hemi || !key || !fill || !rim) return;

    switch (lighting) {
      case 'neutral':
        scene.environmentIntensity = 0.85;
        hemi.color.setHex(0xffffff);
        hemi.groundColor.setHex(0x3a475e);
        hemi.intensity = 0.65;
        key.color.setHex(0xffffff);
        key.intensity = 1.65;
        key.position.set(4.5, 7.0, 5.0);
        fill.color.setHex(0xdce8ff);
        fill.intensity = 0.75;
        rim.color.setHex(0xffffff);
        rim.intensity = 0.7;
        break;
      case 'rim':
        scene.environmentIntensity = 0.42;
        hemi.color.setHex(0xd8e6ff);
        hemi.groundColor.setHex(0x182030);
        hemi.intensity = 0.45;
        key.color.setHex(0xeef4ff);
        key.intensity = 0.95;
        key.position.set(3.5, 4.5, 4.5);
        fill.color.setHex(0x6e95ce);
        fill.intensity = 0.55;
        rim.color.setHex(0x88bbff);
        rim.intensity = 2.85;
        break;
      case 'clay':
        scene.environmentIntensity = 0.65;
        hemi.color.setHex(0xfff1e0);
        hemi.groundColor.setHex(0x3d3530);
        hemi.intensity = 0.75;
        key.color.setHex(0xffd8b0);
        key.intensity = 2.15;
        key.position.set(5.5, 6.5, 4.0);
        fill.color.setHex(0x9bb2d6);
        fill.intensity = 0.85;
        rim.color.setHex(0xffe6c7);
        rim.intensity = 1.05;
        break;
      case 'blueprint':
        scene.environmentIntensity = 0.58;
        hemi.color.setHex(0xcce2ff);
        hemi.groundColor.setHex(0x16243b);
        hemi.intensity = 0.7;
        key.color.setHex(0xa8ceff);
        key.intensity = 2.0;
        key.position.set(4.0, 7.5, 4.5);
        fill.color.setHex(0x4a6fa5);
        fill.intensity = 1.1;
        rim.color.setHex(0xe0f0ff);
        rim.intensity = 1.45;
        break;
    }
  }, [lighting]);

  // Sync Viewport Backdrop Mode
  useEffect(() => {
    const scene = sceneRef.current;
    const renderer = rendererRef.current;
    const grid = gridRef.current;
    if (!scene || !renderer) return;

    if (backdrop === 'checker') {
      scene.background = null;
      renderer.setClearColor(0x000000, 0);
    } else if (backdrop === 'dark') {
      scene.background = new THREE.Color('#121622');
    } else {
      scene.background = new THREE.Color('#EEF2F7');
    }

    if (grid && stageGroupRef.current) {
      scene.remove(grid);
      grid.geometry.dispose();
      if (Array.isArray(grid.material)) {
        grid.material.forEach((m) => m.dispose());
      } else {
        grid.material.dispose();
      }
      const darkGrid = backdrop === 'dark';
      const nextGrid = new THREE.GridHelper(
        10,
        20,
        darkGrid ? 0x3f5275 : 0x8fa1bd,
        darkGrid ? 0x242e45 : 0xd3dbe8
      );
      nextGrid.visible = showGrid;
      scene.add(nextGrid);
      gridRef.current = nextGrid;
    }
  }, [backdrop, showGrid]);

  // Handle Multi-File 3D Loading (.glb, .gltf + .bin + textures, .obj + .mtl + textures, .stl)
  const loadDroppedFiles = useCallback(
    async (entries: DroppedEntryFile[]) => {
      if (entries.length === 0) return;
      setErrorMsg(null);

      const findByExt = (ext: string) =>
        entries.find((e) => e.file.name.toLowerCase().endsWith(ext));

      const primaryEntry =
        findByExt('.glb') || findByExt('.gltf') || findByExt('.obj') || findByExt('.stl');

      if (!primaryEntry) {
        setErrorMsg(t.errorUnsupported);
        return;
      }

      setIsLoading(true);

      const createdUrls: string[] = [];
      const blobMap = new Map<string, string>();

      for (const item of entries) {
        const blobUrl = URL.createObjectURL(item.file);
        createdUrls.push(blobUrl);
        const normRel = item.relativePath.replace(/^(\.\/|\/)+/, '').replace(/\\/g, '/').toLowerCase();
        const baseName = item.file.name.toLowerCase();
        blobMap.set(normRel, blobUrl);
        blobMap.set(baseName, blobUrl);
      }

      const cleanupBlobs = () => {
        window.setTimeout(() => {
          for (const u of createdUrls) URL.revokeObjectURL(u);
        }, 2500);
      };

      try {
        const totalBytes = entries.reduce((sum, item) => sum + item.file.size, 0);
        const primaryUrl = blobMap.get(primaryEntry.file.name.toLowerCase())!;
        const lowerName = primaryEntry.file.name.toLowerCase();

        const manager = new THREE.LoadingManager();
        manager.setURLModifier((url) => {
          if (url.startsWith('data:') || url.startsWith('blob:')) return url;
          const clean = decodeURIComponent(url)
            .split('?')[0]
            .replace(/^(\.\/|\/)+/, '')
            .replace(/\\/g, '/')
            .toLowerCase();
          if (blobMap.has(clean)) return blobMap.get(clean)!;
          const base = clean.split('/').pop() || clean;
          if (blobMap.has(base)) return blobMap.get(base)!;
          return url;
        });

        if (lowerName.endsWith('.glb') || lowerName.endsWith('.gltf')) {
          const gltfLoader = new GLTFLoader(manager);
          if (dracoRef.current) {
            gltfLoader.setDRACOLoader(dracoRef.current);
          }
          const gltf = await gltfLoader.loadAsync(primaryUrl);
          const formatLabel = lowerName.endsWith('.glb') ? 'GLB' : 'glTF 2.0';
          installModelIntoScene(gltf.scene, gltf.animations || [], {
            name: primaryEntry.file.name,
            format: formatLabel,
            fileSize: formatBytes(totalBytes),
            defaultZUp: false,
            announce: true,
          });
        } else if (lowerName.endsWith('.obj')) {
          const mtlEntry = findByExt('.mtl');
          const objLoader = new OBJLoader(manager);
          if (mtlEntry) {
            const mtlUrl = blobMap.get(mtlEntry.file.name.toLowerCase())!;
            const mtlLoader = new MTLLoader(manager);
            const materials = await mtlLoader.loadAsync(mtlUrl);
            materials.preload();
            objLoader.setMaterials(materials);
          }
          const objGroup = await objLoader.loadAsync(primaryUrl);
          objGroup.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              if (mesh.geometry && !mesh.geometry.attributes.normal) {
                mesh.geometry.computeVertexNormals();
              }
              if (!mtlEntry) {
                mesh.material = new THREE.MeshStandardMaterial({
                  color: 0xd0d8e6,
                  metalness: 0.18,
                  roughness: 0.45,
                });
              }
            }
          });
          installModelIntoScene(objGroup, [], {
            name: primaryEntry.file.name,
            format: mtlEntry ? 'OBJ + MTL' : 'OBJ',
            fileSize: formatBytes(totalBytes),
            defaultZUp: false,
            announce: true,
          });
        } else if (lowerName.endsWith('.stl')) {
          const stlLoader = new STLLoader(manager);
          const geometry = await stlLoader.loadAsync(primaryUrl);
          if (!geometry.attributes.normal) {
            geometry.computeVertexNormals();
          }
          const stlMat = new THREE.MeshStandardMaterial({
            color: 0x6e95ce,
            metalness: 0.24,
            roughness: 0.36,
          });
          const mesh = new THREE.Mesh(geometry, stlMat);
          mesh.name = primaryEntry.file.name;
          const group = new THREE.Group();
          group.add(mesh);

          installModelIntoScene(group, [], {
            name: primaryEntry.file.name,
            format: 'STL',
            fileSize: formatBytes(totalBytes),
            defaultZUp: true,
            announce: true,
          });
        }
      } catch (err) {
        console.error('3D load error:', err);
        setErrorMsg(t.errorLoadFailed);
      } finally {
        setIsLoading(false);
        cleanupBlobs();
      }
    },
    [installModelIntoScene, t.errorLoadFailed, t.errorUnsupported]
  );

  const handleLoadSamplePbr = () => {
    setErrorMsg(null);
    const sample = buildProceduralPbrSample();
    installModelIntoScene(sample.root, sample.clips, {
      name: t.samplePbrName,
      format: 'GLB / PBR',
      fileSize: t.proceduralSize,
      defaultZUp: false,
      announce: true,
    });
  };

  const handleLoadSampleStl = () => {
    setErrorMsg(null);
    const buffer = buildSampleCadStlBuffer();
    const stlLoader = new STLLoader();
    const geometry = stlLoader.parse(buffer);
    if (!geometry.attributes.normal) geometry.computeVertexNormals();
    const mat = new THREE.MeshStandardMaterial({
      color: 0x5c84bd,
      metalness: 0.28,
      roughness: 0.34,
    });
    const mesh = new THREE.Mesh(geometry, mat);
    const group = new THREE.Group();
    group.add(mesh);

    installModelIntoScene(group, [], {
      name: t.sampleStlName,
      format: 'STL (CAD)',
      fileSize: formatBytes(buffer.byteLength),
      defaultZUp: true,
      announce: true,
    });
  };

  const handleResetCamera = () => {
    fitAndMeasureStage(isZUp, true);
  };

  const handleSelectClip = (idx: number) => {
    const mixer = mixerRef.current;
    const clips = clipsRef.current;
    if (!mixer || !clips[idx]) return;

    mixer.stopAllAction();
    const nextClip = clips[idx];
    const action = mixer.clipAction(nextClip);
    action.reset().play();
    action.paused = !isPlaying;
    activeActionRef.current = action;
    setSelectedClipIdx(idx);
    setClipDuration(nextClip.duration);
    setClipTime(0);
  };

  const handleTogglePlay = () => {
    const action = activeActionRef.current;
    if (!action) return;
    const nextPlaying = !isPlaying;
    action.paused = !nextPlaying;
    if (nextPlaying && !action.isRunning()) {
      action.play();
    }
    setIsPlaying(nextPlaying);
    isPlayingRef.current = nextPlaying;
  };

  const handleScrub = (val: number) => {
    const action = activeActionRef.current;
    const mixer = mixerRef.current;
    if (!action || !mixer) return;
    setClipTime(val);
    action.paused = false;
    action.time = val;
    mixer.update(0);
    action.paused = !isPlaying;
  };

  const handleExportTransparentPng = () => {
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const renderer = rendererRef.current;
    const grid = gridRef.current;
    if (!scene || !camera || !renderer) return;

    const prevBg = scene.background;
    const prevGridVisible = grid ? grid.visible : false;

    scene.background = null;
    if (grid) grid.visible = false;
    renderer.setClearColor(0x000000, 0);
    renderer.render(scene, camera);

    const dataUrl = renderer.domElement.toDataURL('image/png');

    scene.background = prevBg;
    if (grid) grid.visible = prevGridVisible;
    renderer.render(scene, camera);

    const safeBase = stats.name
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-zA-Z0-9_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .toLowerCase() || 'modelixai-3d';
    const filename = `${safeBase}-transparent.png`;

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    const msg = t.statusExportedTemplate.replace('{filename}', filename);
    setLiveAnnouncement(msg);
    showToast(msg);
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;
    const entries: DroppedEntryFile[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const f = fileList[i];
      entries.push({ file: f, relativePath: f.webkitRelativePath || f.name });
    }
    void loadDroppedFiles(entries);
    e.target.value = '';
  };

  const onDropHandler = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const entries = await readDataTransferFiles(e.dataTransfer);
    await loadDroppedFiles(entries);
  };

  const triggerFilePicker = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className="w-full rounded-2xl border border-line bg-card shadow-lg transition-colors duration-200 overflow-hidden"
      onDragOver={(e) => {
        e.preventDefault();
        if (!isDragging) setIsDragging(true);
      }}
      onDragLeave={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setIsDragging(false);
        }
      }}
      onDrop={onDropHandler}
    >
      {/* Screen-reader polite announcer */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {liveAnnouncement}
      </div>

      {/* Hidden multi-file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".glb,.gltf,.bin,.obj,.mtl,.stl,.png,.jpg,.jpeg,.webp"
        onChange={onFileInputChange}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      />

      {/* Top File Dropzone & Quick Sample Bar */}
      <div className="flex flex-col gap-3 border-b border-line bg-subtle/45 px-4 py-3.5 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="button"
          tabIndex={0}
          aria-label={t.dropzoneAriaLabel}
          onClick={triggerFilePicker}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              triggerFilePicker();
            }
          }}
          className={`group flex flex-1 cursor-pointer items-center gap-3.5 rounded-xl border-2 border-dashed px-4 py-2.5 text-left transition-all duration-200 ease-studio ${
            isDragging
              ? 'border-accent bg-accent/10 scale-[1.005]'
              : 'border-line bg-card/80 hover:border-accent hover:bg-card'
          }`}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-subtle text-accent transition-transform duration-200 ease-studio group-hover:scale-105">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0l-4 4m4-4l4 4M4 17v2a1 1 0 001 1h14a1 1 0 001-1v-2" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-txt-primary">{t.dropzoneTitle}</p>
            <p className="truncate text-xs text-txt-secondary">{t.dropzoneSubtitle}</p>
          </div>
          <span className="hidden rounded-md border border-line bg-subtle px-2.5 py-1 font-mono text-xs font-semibold text-txt-primary sm:inline-block">
            {t.dropzoneFormats}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={triggerFilePicker}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-accent-contrast shadow-sm transition-all duration-200 ease-studio hover:bg-accent-hover active:scale-[0.98]"
          >
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <span>{t.openModelBtn}</span>
          </button>

          <button
            type="button"
            onClick={handleLoadSamplePbr}
            className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl border border-line bg-card px-3.5 py-2 text-xs font-semibold text-txt-primary transition-all duration-200 ease-studio hover:border-accent hover:bg-subtle sm:text-sm"
          >
            <span>{t.samplePbrBtn}</span>
          </button>

          <button
            type="button"
            onClick={handleLoadSampleStl}
            className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl border border-line bg-card px-3.5 py-2 text-xs font-semibold text-txt-primary transition-all duration-200 ease-studio hover:border-accent hover:bg-subtle sm:text-sm"
          >
            <span>{t.sampleStlBtn}</span>
          </button>
        </div>
      </div>

      {errorMsg && (
        <div role="alert" className="border-b border-line bg-subtle px-4 py-2.5 text-sm font-medium text-txt-primary">
          {errorMsg}
        </div>
      )}

      {/* Main Studio Grid: WebGL Stage + Live Inspector Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left / Center: WebGL 3D Stage & Controls (8 cols on desktop) */}
        <div className="flex flex-col lg:col-span-8 lg:border-r lg:border-line">
          {/* Fixed-aspect-ratio WebGL Viewport (Zero CLS) */}
          <div
            className={`relative w-full aspect-[16/11] sm:aspect-[16/10] min-h-[340px] sm:min-h-[430px] select-none overflow-hidden ${
              backdrop === 'checker' ? 'bg-checkerboard' : backdrop === 'dark' ? 'bg-[#121622]' : 'bg-[#EEF2F7]'
            }`}
          >
            <div ref={mountRef} className="h-full w-full" />

            {/* Privacy badge top-left */}
            <div className="pointer-events-none absolute top-3 left-3 flex items-center gap-1.5 rounded-lg border border-line/80 bg-card/85 px-2.5 py-1 text-xs font-medium text-txt-primary backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
              <span>{t.privacyBadge}</span>
            </div>

            {/* Active filename badge top-right */}
            <div className="pointer-events-none absolute top-3 right-3 max-w-[55%] truncate rounded-lg border border-line/80 bg-card/85 px-2.5 py-1 font-mono text-xs font-medium text-txt-primary backdrop-blur-sm">
              {stats.name}
            </div>

            {/* Orbit hint bottom-left */}
            <div className="pointer-events-none absolute bottom-2.5 left-3 hidden rounded-md bg-card/80 px-2.5 py-1 text-[11px] font-medium text-txt-secondary backdrop-blur-sm sm:block">
              {t.orbitHint}
            </div>

            {/* Loading spinner overlay */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-card/75 backdrop-blur-sm">
                <div className="flex items-center gap-3 rounded-xl border border-line bg-card px-5 py-3 shadow-lg">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-accent border-t-transparent" aria-hidden="true" />
                  <span className="text-sm font-semibold text-txt-primary">{t.loadingModel}</span>
                </div>
              </div>
            )}

            {/* Drag-and-drop full-stage visual cue */}
            {isDragging && (
              <div className="pointer-events-none absolute inset-3 flex items-center justify-center rounded-xl border-2 border-dashed border-accent bg-card/80 backdrop-blur-sm">
                <p className="text-base font-bold text-txt-primary">{t.dropzoneTitle}</p>
              </div>
            )}

            {/* PNG Export Toast confirmation */}
            {toastMsg && (
              <div className="pointer-events-none absolute bottom-3 right-3 rounded-xl border border-accent bg-card px-3.5 py-2 text-xs font-semibold text-txt-primary shadow-lg">
                {toastMsg}
              </div>
            )}
          </div>

          {/* Primary Viewport Controls Bar */}
          <div className="flex flex-wrap items-center gap-2 border-t border-line bg-card px-3.5 py-3 sm:px-4">
            {/* Wireframe */}
            <button
              type="button"
              aria-label={t.wireframeAria}
              aria-pressed={isWireframe}
              onClick={() => setIsWireframe((v) => !v)}
              className={`inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-all duration-200 ease-studio sm:text-sm ${
                isWireframe
                  ? 'border-accent bg-accent text-accent-contrast shadow-sm'
                  : 'border-line bg-subtle/50 text-txt-primary hover:border-accent hover:bg-subtle'
              }`}
            >
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span>{t.wireframe}</span>
            </button>

            {/* Grid Floor */}
            <button
              type="button"
              aria-label={t.gridFloorAria}
              aria-pressed={showGrid}
              onClick={() => setShowGrid((v) => !v)}
              className={`inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-all duration-200 ease-studio sm:text-sm ${
                showGrid
                  ? 'border-accent bg-accent text-accent-contrast shadow-sm'
                  : 'border-line bg-subtle/50 text-txt-primary hover:border-accent hover:bg-subtle'
              }`}
            >
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18v18H3V3zm6 0v18m6-18v18M3 9h18M3 15h18" />
              </svg>
              <span>{t.gridFloor}</span>
            </button>

            {/* Auto-Rotate */}
            <button
              type="button"
              aria-label={t.autoRotateAria}
              aria-pressed={autoRotate}
              onClick={() => setAutoRotate((v) => !v)}
              className={`inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-all duration-200 ease-studio sm:text-sm ${
                autoRotate
                  ? 'border-accent bg-accent text-accent-contrast shadow-sm'
                  : 'border-line bg-subtle/50 text-txt-primary hover:border-accent hover:bg-subtle'
              }`}
            >
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4.5 9A8 8 0 0118.3 6.3M19.5 15A8 8 0 015.7 17.7" />
              </svg>
              <span>{t.autoRotate}</span>
            </button>

            {/* Z-Up Upright Flip (STL / CAD) */}
            <button
              type="button"
              aria-label={t.zUpUprightAria}
              aria-pressed={isZUp}
              onClick={() => setIsZUp((v) => !v)}
              className={`inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-all duration-200 ease-studio sm:text-sm ${
                isZUp
                  ? 'border-accent bg-accent text-accent-contrast shadow-sm'
                  : 'border-line bg-subtle/50 text-txt-primary hover:border-accent hover:bg-subtle'
              }`}
            >
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-4 4m4-4l4 4M5 19h14" />
              </svg>
              <span>{t.zUpUpright}</span>
            </button>

            {/* Reset Camera */}
            <button
              type="button"
              aria-label={t.resetCameraAria}
              onClick={handleResetCamera}
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-line bg-card px-3 py-2 text-xs font-semibold text-txt-primary transition-all duration-200 ease-studio hover:border-accent hover:bg-subtle ml-auto sm:text-sm"
            >
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="3" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v3m0 14v3M2 12h3m14 0h3" />
              </svg>
              <span>{t.resetCamera}</span>
            </button>
          </div>

          {/* Studio Lighting & Viewport Backdrop Selector Bar */}
          <div className="flex flex-col gap-3 border-t border-line bg-subtle/30 px-3.5 py-3 sm:px-4 xl:flex-row xl:items-center xl:justify-between">
            {/* Lighting Presets */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="mr-1 text-xs font-bold uppercase tracking-wider text-txt-secondary">
                {t.lightingLabel}:
              </span>
              {(
                [
                  { id: 'neutral', label: t.lightingNeutral },
                  { id: 'rim', label: t.lightingRim },
                  { id: 'clay', label: t.lightingClay },
                  { id: 'blueprint', label: t.lightingBlueprint },
                ] as const
              ).map((preset) => {
                const active = lighting === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    aria-label={`${t.lightingLabel}: ${preset.label}`}
                    aria-pressed={active}
                    onClick={() => setLighting(preset.id)}
                    className={`min-h-[38px] rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-all duration-200 ease-studio ${
                      active
                        ? 'border-accent bg-accent text-accent-contrast'
                        : 'border-line bg-card text-txt-primary hover:border-accent'
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>

            {/* Viewport Backdrop Toggle */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="mr-1 text-xs font-bold uppercase tracking-wider text-txt-secondary">
                {t.backdropLabel}:
              </span>
              {(
                [
                  { id: 'light', label: t.backdropLight },
                  { id: 'dark', label: t.backdropDark },
                  { id: 'checker', label: t.backdropChecker },
                ] as const
              ).map((mode) => {
                const active = backdrop === mode.id;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    aria-label={`${t.backdropLabel}: ${mode.label}`}
                    aria-pressed={active}
                    onClick={() => setBackdrop(mode.id)}
                    className={`min-h-[38px] rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-all duration-200 ease-studio ${
                      active
                        ? 'border-accent bg-accent text-accent-contrast'
                        : 'border-line bg-card text-txt-primary hover:border-accent'
                    }`}
                  >
                    {mode.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Animation Playback & Timeline Scrubber Bar */}
          <div className="flex flex-wrap items-center gap-3 border-t border-line bg-card px-3.5 py-3 sm:px-4">
            <span className="text-xs font-bold uppercase tracking-wider text-txt-secondary">
              {t.animationsLabel}:
            </span>

            <button
              type="button"
              disabled={clipNames.length === 0}
              aria-label={isPlaying ? t.pauseAnimationAria : t.playAnimationAria}
              aria-pressed={isPlaying}
              onClick={handleTogglePlay}
              className={`inline-flex min-h-[42px] min-w-[42px] items-center justify-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all duration-200 ease-studio ${
                clipNames.length === 0
                  ? 'cursor-not-allowed border-line bg-subtle/40 text-txt-secondary opacity-60'
                  : isPlaying
                    ? 'border-accent bg-accent text-accent-contrast'
                    : 'border-line bg-subtle text-txt-primary hover:border-accent'
              }`}
            >
              {isPlaying ? (
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <rect x="6" y="5" width="4" height="14" rx="1" />
                  <rect x="14" y="5" width="4" height="14" rx="1" />
                </svg>
              ) : (
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5.14v13.72a1 1 0 001.55.83l10.29-6.86a1 1 0 000-1.66L9.55 4.31A1 1 0 008 5.14z" />
                </svg>
              )}
              <span>{isPlaying ? t.pauseBtn : t.playBtn}</span>
            </button>

            <select
              aria-label={t.clipSelectAria}
              disabled={clipNames.length === 0}
              value={selectedClipIdx}
              onChange={(e) => handleSelectClip(Number(e.target.value))}
              className="min-h-[42px] rounded-xl border border-line bg-card px-3 py-1.5 text-xs font-semibold text-txt-primary disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
            >
              {clipNames.length === 0 ? (
                <option value={0}>—</option>
              ) : (
                clipNames.map((name, idx) => (
                  <option key={`${name}-${idx}`} value={idx}>
                    {name}
                  </option>
                ))
              )}
            </select>

            <div className="flex min-w-[160px] flex-1 items-center gap-2.5">
              <input
                type="range"
                aria-label={t.scrubberAria}
                disabled={clipNames.length === 0}
                min={0}
                max={clipDuration || 1}
                step={0.01}
                value={Math.min(clipTime, clipDuration || 0)}
                onPointerDown={() => {
                  isScrubbingRef.current = true;
                }}
                onPointerUp={() => {
                  isScrubbingRef.current = false;
                }}
                onChange={(e) => handleScrub(Number(e.target.value))}
                className="studio-range w-full disabled:cursor-not-allowed disabled:opacity-50"
              />
              <span className="w-24 shrink-0 text-right font-mono text-xs text-txt-secondary">
                {clipTime.toFixed(2)}s / {clipDuration.toFixed(2)}s
              </span>
            </div>
          </div>
        </div>

        {/* Right: Live Model Inspector & Alpha PNG Export (4 cols on desktop) */}
        <aside className="flex flex-col justify-between border-t border-line bg-subtle/25 p-4 sm:p-5 lg:col-span-4 lg:border-t-0">
          <div>
            <div className="flex items-center justify-between border-b border-line pb-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-txt-primary">
                {t.inspectorTitle}
              </h2>
              <span className="rounded-md border border-line bg-card px-2 py-0.5 font-mono text-xs font-bold text-accent">
                {stats.format}
              </span>
            </div>

            <dl className="mt-3.5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-xl border border-line bg-card px-3.5 py-2.5">
                <dt className="text-xs font-medium text-txt-secondary">{t.statFormat}</dt>
                <dd className="mt-0.5 font-mono text-sm font-bold text-txt-primary">{stats.format}</dd>
              </div>

              <div className="rounded-xl border border-line bg-card px-3.5 py-2.5">
                <dt className="text-xs font-medium text-txt-secondary">{t.statTriangles}</dt>
                <dd className="mt-0.5 font-mono text-sm font-bold text-txt-primary">
                  {stats.triangles.toLocaleString()}
                </dd>
              </div>

              <div className="rounded-xl border border-line bg-card px-3.5 py-2.5">
                <dt className="text-xs font-medium text-txt-secondary">{t.statVertices}</dt>
                <dd className="mt-0.5 font-mono text-sm font-bold text-txt-primary">
                  {stats.vertices.toLocaleString()}
                </dd>
              </div>

              <div className="rounded-xl border border-line bg-card px-3.5 py-2.5">
                <dt className="text-xs font-medium text-txt-secondary">{t.statMeshes}</dt>
                <dd className="mt-0.5 font-mono text-sm font-bold text-txt-primary">
                  {stats.meshes.toLocaleString()}
                </dd>
              </div>

              <div className="rounded-xl border border-line bg-card px-3.5 py-2.5">
                <dt className="text-xs font-medium text-txt-secondary">{t.statMaterials}</dt>
                <dd className="mt-0.5 font-mono text-sm font-bold text-txt-primary">
                  {stats.materials} / {stats.textures}
                </dd>
              </div>

              <div className="rounded-xl border border-line bg-card px-3.5 py-2.5">
                <dt className="text-xs font-medium text-txt-secondary">{t.statDimensions}</dt>
                <dd className="mt-0.5 truncate font-mono text-xs font-bold text-txt-primary sm:text-sm" title={stats.dimensions}>
                  {stats.dimensions}
                </dd>
              </div>

              <div className="col-span-2 rounded-xl border border-line bg-card px-3.5 py-2.5 sm:col-span-3 lg:col-span-1">
                <dt className="text-xs font-medium text-txt-secondary">{t.statFileSize}</dt>
                <dd className="mt-0.5 font-mono text-sm font-bold text-txt-primary">{stats.fileSize}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-5 pt-3 border-t border-line">
            <button
              type="button"
              aria-label={t.exportPngAria}
              onClick={handleExportTransparentPng}
              className="flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-xl bg-accent px-4 py-3 text-sm font-bold text-accent-contrast shadow-sm transition-all duration-200 ease-studio hover:bg-accent-hover active:scale-[0.99]"
            >
              <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <circle cx="12" cy="13" r="3.5" />
              </svg>
              <span>{t.exportPngBtn}</span>
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
