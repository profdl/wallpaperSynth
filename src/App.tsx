import React, { useState } from 'react';
import Canvas from './components/Canvas';
import Controls from './components/Controls';
import { WallpaperPattern } from './types';

export default function App() {
  const [image, setImage] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [pattern, setPattern] = useState<WallpaperPattern>('p1');
  const [scale, setScale] = useState(1);
  const [aspectRatio, setAspectRatio] = useState(1);
  const [rowOffset, setRowOffset] = useState(0);
  const [columnOffset, setColumnOffset] = useState(0);
  const [mirrorX, setMirrorX] = useState(false);
  const [mirrorY, setMirrorY] = useState(false);
  const [mirrorAltX, setMirrorAltX] = useState(false);
  const [mirrorAltY, setMirrorAltY] = useState(false);
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(1);
  const [brightness, setBrightness] = useState(1);
  const [contrast, setContrast] = useState(1);
  const [threshold, setThreshold] = useState(0);
  const [thresholdEnabled, setThresholdEnabled] = useState(false);
  const [spacing, setSpacing] = useState(0);

  const handleImageUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setImage(url);
  };

  const resetAll = () => {
    setRotation(0);
    setScale(1);
    setAspectRatio(1);
    setRowOffset(0);
    setColumnOffset(0);
    setMirrorX(false);
    setMirrorY(false);
    setMirrorAltX(false);
    setMirrorAltY(false);
    setHue(0);
    setSaturation(1);
    setBrightness(1);
    setContrast(1);
    setThreshold(0);
    setThresholdEnabled(false);
    setSpacing(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-4 px-2">Wallpaper Pattern Generator</h1>
      <div className="flex gap-4 h-[calc(100vh-120px)]">
        <div className="w-[280px] flex-shrink-0">
          <Controls
            onImageUpload={handleImageUpload}
            rotation={rotation}
            setRotation={setRotation}
            pattern={pattern}
            setPattern={setPattern}
            image={image}
            scale={scale}
            setScale={setScale}
            aspectRatio={aspectRatio}
            setAspectRatio={setAspectRatio}
            rowOffset={rowOffset}
            setRowOffset={setRowOffset}
            columnOffset={columnOffset}
            setColumnOffset={setColumnOffset}
            mirrorX={mirrorX}
            setMirrorX={setMirrorX}
            mirrorY={mirrorY}
            setMirrorY={setMirrorY}
            mirrorAltX={mirrorAltX}
            setMirrorAltX={setMirrorAltX}
            mirrorAltY={mirrorAltY}
            setMirrorAltY={setMirrorAltY}
            hue={hue}
            setHue={setHue}
            saturation={saturation}
            setSaturation={setSaturation}
            brightness={brightness}
            setBrightness={setBrightness}
            contrast={contrast}
            setContrast={setContrast}
            threshold={threshold}
            setThreshold={setThreshold}
            thresholdEnabled={thresholdEnabled}
            setThresholdEnabled={setThresholdEnabled}
            spacing={spacing}
            setSpacing={setSpacing}
            onReset={resetAll}
          />
        </div>
        <div className="flex-1 bg-white rounded-lg shadow-lg overflow-hidden">
          <Canvas
            image={image}
            rows={4}
            columns={4}
            rotation={rotation}
            pattern={pattern}
            scale={scale}
            aspectRatio={aspectRatio}
            rowOffset={rowOffset}
            columnOffset={columnOffset}
            mirrorX={mirrorX}
            mirrorY={mirrorY}
            mirrorAltX={mirrorAltX}
            mirrorAltY={mirrorAltY}
            hue={hue}
            saturation={saturation}
            brightness={brightness}
            contrast={contrast}
            threshold={thresholdEnabled ? threshold : 0}
            spacing={spacing}
          />
        </div>
      </div>
    </div>
  );
}