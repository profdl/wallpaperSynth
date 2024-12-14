import { useEffect, useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { WallpaperPattern } from '../types';
import { getShaderForPattern } from '../shaders';

interface SceneProps {
  image: string | null;
  rows: number;
  columns: number;
  rotation: number;
  pattern: WallpaperPattern;
  scale: number;
  aspectRatio: number;
  rowOffset: number;
  columnOffset: number;
  mirrorX: boolean;
  mirrorY: boolean;
  mirrorAltX: boolean;
  mirrorAltY: boolean;
  hue: number;
  saturation: number;
  brightness: number;
  contrast: number;
  threshold: number;
  spacing: number;
}

export default function Scene({
  image,
  rows,
  columns,
  rotation,
  pattern,
  scale,
  aspectRatio,
  rowOffset,
  columnOffset,
  mirrorX,
  mirrorY,
  mirrorAltX,
  mirrorAltY,
  hue,
  saturation,
  brightness,
  contrast,
  threshold,
  spacing,
}: SceneProps) {
  const { scene, viewport } = useThree();

  const material = useMemo(() => {
    if (!image) return null;

    const texture = new THREE.TextureLoader().load(image);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    
    const shader = getShaderForPattern(pattern);
    
    return new THREE.ShaderMaterial({
      uniforms: {
        u_texture: { value: texture },
        rows: { value: rows },
        columns: { value: columns },
        rotation: { value: rotation * Math.PI / 180 },
        scale: { value: scale },
        aspectRatio: { value: aspectRatio },
        rowOffset: { value: rowOffset },
        columnOffset: { value: columnOffset },
        mirrorX: { value: mirrorX },
        mirrorY: { value: mirrorY },
        mirrorAltX: { value: mirrorAltX },
        mirrorAltY: { value: mirrorAltY },
        hue: { value: hue },
        saturation: { value: saturation },
        brightness: { value: brightness },
        contrast: { value: contrast },
        threshold: { value: threshold },
        viewportAspect: { value: viewport.aspect },
        spacing: { value: spacing },
      },
      vertexShader: shader.vertexShader,
      fragmentShader: shader.fragmentShader,
    });
  }, [
    image,
    pattern,
    rows,
    columns,
    rotation,
    scale,
    aspectRatio,
    rowOffset,
    columnOffset,
    mirrorX,
    mirrorY,
    mirrorAltX,
    mirrorAltY,
    hue,
    saturation,
    brightness,
    contrast,
    threshold,
    viewport.aspect,
    spacing,
  ]);

  useEffect(() => {
    if (!material) return;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    return () => {
      scene.remove(mesh);
      geometry.dispose();
      material.dispose();
    };
  }, [scene, material]);

  useEffect(() => {
    if (material) {
      material.uniforms.viewportAspect.value = viewport.aspect;
    }
  }, [material, viewport.aspect]);

  return null;
}