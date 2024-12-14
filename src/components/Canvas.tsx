import { Canvas as ThreeCanvas } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import Scene from './Scene';
import { WallpaperPattern } from '../types';

interface CanvasProps {
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

export default function Canvas(props: CanvasProps) {
  return (
    <div className="w-full h-full">
      <ThreeCanvas>
        <OrthographicCamera makeDefault position={[0, 0, 1]} />
        <Scene {...props} />
      </ThreeCanvas>
    </div>
  );
}