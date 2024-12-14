import React from 'react';
import { Upload, RotateCcw } from 'lucide-react';
import { WallpaperPattern, patterns } from '../types';

interface ControlsProps {
  onImageUpload: (file: File) => void;
  rotation: number;
  setRotation: (rotation: number) => void;
  pattern: WallpaperPattern;
  setPattern: (pattern: WallpaperPattern) => void;
  image: string | null;
  scale: number;
  setScale: (scale: number) => void;
  aspectRatio: number;
  setAspectRatio: (ratio: number) => void;
  rowOffset: number;
  setRowOffset: (offset: number) => void;
  columnOffset: number;
  setColumnOffset: (offset: number) => void;
  mirrorX: boolean;
  setMirrorX: (mirror: boolean) => void;
  mirrorY: boolean;
  setMirrorY: (mirror: boolean) => void;
  mirrorAltX: boolean;
  setMirrorAltX: (mirror: boolean) => void;
  mirrorAltY: boolean;
  setMirrorAltY: (mirror: boolean) => void;
  hue: number;
  setHue: (hue: number) => void;
  saturation: number;
  setSaturation: (saturation: number) => void;
  brightness: number;
  setBrightness: (brightness: number) => void;
  contrast: number;
  setContrast: (contrast: number) => void;
  threshold: number;
  setThreshold: (threshold: number) => void;
  thresholdEnabled: boolean;
  setThresholdEnabled: (enabled: boolean) => void;
  spacing: number;
  setSpacing: (spacing: number) => void;
  onReset: () => void;
}

export default function Controls({
  onImageUpload,
  rotation,
  setRotation,
  pattern,
  setPattern,
  image,
  scale,
  setScale,
  aspectRatio,
  setAspectRatio,
  rowOffset,
  setRowOffset,
  columnOffset,
  setColumnOffset,
  mirrorX,
  setMirrorX,
  mirrorY,
  setMirrorY,
  mirrorAltX,
  setMirrorAltX,
  mirrorAltY,
  setMirrorAltY,
  hue,
  setHue,
  saturation,
  setSaturation,
  brightness,
  setBrightness,
  contrast,
  setContrast,
  threshold,
  setThreshold,
  thresholdEnabled,
  setThresholdEnabled,
  spacing,
  setSpacing,
  onReset,
}: ControlsProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg space-y-4 h-full overflow-y-auto">
      <div className="space-y-4">
        <div className="flex gap-4 items-start">
          <label className="flex-1">
            <div className="flex items-center justify-center w-full">
              <label className="w-full flex flex-col items-center px-4 py-4 bg-white rounded-lg border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white transition-colors duration-200">
                <Upload className="w-6 h-6" />
                <span className="mt-1 text-sm">Upload Image</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) onImageUpload(file);
                  }}
                />
              </label>
            </div>
          </label>
          {image && (
            <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
              <img src={image} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        <button
          onClick={onReset}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset All</span>
        </button>

        <div>
          <label className="block text-sm font-medium text-gray-700">Pattern Type</label>
          <select
            value={pattern}
            onChange={(e) => setPattern(e.target.value as WallpaperPattern)}
            className="mt-1 block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {patterns.map((p) => (
              <option key={p.type} value={p.type}>
                {p.type} - {p.description}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          <details className="group" open>
            <summary className="font-medium text-sm text-gray-700 cursor-pointer">
              Basic Controls
            </summary>
            <div className="mt-2 space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Pattern Scale ({scale.toFixed(1)})</label>
                <input
                  type="range"
                  min="0.1"
                  max="6.0"
                  step="0.1"
                  value={scale}
                  onChange={(e) => setScale(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Aspect Ratio ({aspectRatio.toFixed(1)})
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Rotation ({Math.round(rotation)}°)
                </label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={rotation}
                  onChange={(e) => setRotation(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Cell Spacing ({spacing.toFixed(2)})
                </label>
                <input
                  type="range"
                  min="0"
                  max="0.2"
                  step="0.01"
                  value={spacing}
                  onChange={(e) => setSpacing(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </details>

          <details className="group">
            <summary className="font-medium text-sm text-gray-700 cursor-pointer">
              Advanced Controls
            </summary>
            <div className="mt-2 space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Row Offset ({rowOffset.toFixed(1)})
                </label>
                <input
                  type="range"
                  min="-0.5"
                  max="0.5"
                  step="0.1"
                  value={rowOffset}
                  onChange={(e) => setRowOffset(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Column Offset ({columnOffset.toFixed(1)})
                </label>
                <input
                  type="range"
                  min="-0.5"
                  max="0.5"
                  step="0.1"
                  value={columnOffset}
                  onChange={(e) => setColumnOffset(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Mirror Options</label>
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={mirrorX}
                      onChange={(e) => setMirrorX(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-600">Mirror X</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={mirrorY}
                      onChange={(e) => setMirrorY(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-600">Mirror Y</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={mirrorAltX}
                      onChange={(e) => setMirrorAltX(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-600">Mirror Alt X</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={mirrorAltY}
                      onChange={(e) => setMirrorAltY(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-600">Mirror Alt Y</span>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Color Adjustments</label>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-600">Hue Rotate ({Math.round(hue)}°)</label>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={hue}
                      onChange={(e) => setHue(Number(e.target.value))}
                      className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600">
                      Saturation ({saturation.toFixed(1)})
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="2"
                      step="0.1"
                      value={saturation}
                      onChange={(e) => setSaturation(Number(e.target.value))}
                      className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600">
                      Brightness ({brightness.toFixed(1)})
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="2"
                      step="0.1"
                      value={brightness}
                      onChange={(e) => setBrightness(Number(e.target.value))}
                      className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600">
                      Contrast ({contrast.toFixed(1)})
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="2"
                      step="0.1"
                      value={contrast}
                      onChange={(e) => setContrast(Number(e.target.value))}
                      className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs text-gray-600">
                        Threshold ({threshold.toFixed(2)})
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={thresholdEnabled}
                          onChange={(e) => setThresholdEnabled(e.target.checked)}
                          className="rounded border-gray-300"
                        />
                        <span className="ml-2 text-xs text-gray-600">Enable</span>
                      </label>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={threshold}
                      onChange={(e) => setThreshold(Number(e.target.value))}
                      disabled={!thresholdEnabled}
                      className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}