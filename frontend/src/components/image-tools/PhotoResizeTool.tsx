import React, { useState, useCallback } from 'react';
import AdvancedToolShell, { ProcessingResult } from '../AdvancedToolShell';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

export interface PhotoPreset {
  label: string;
  width: number;
  height: number;
  unit: 'px' | 'cm' | 'mm' | 'inches';
  maxSizeKB?: number;
  dpi?: number;
}

interface PhotoResizeToolProps {
  toolTitle: string;
  presets: PhotoPreset[];
  defaultPresetIndex?: number;
  onNavigate?: (page: string) => void;
}

type Unit = 'px' | 'cm' | 'mm' | 'inches';

const toPx = (value: number, unit: Unit, dpi = 96): number => {
  switch (unit) {
    case 'px': return value;
    case 'cm': return Math.round(value * dpi / 2.54);
    case 'mm': return Math.round(value * dpi / 25.4);
    case 'inches': return Math.round(value * dpi);
    default: return value;
  }
};

const fromPx = (px: number, unit: Unit, dpi = 96): number => {
  switch (unit) {
    case 'px': return px;
    case 'cm': return parseFloat((px * 2.54 / dpi).toFixed(2));
    case 'mm': return parseFloat((px * 25.4 / dpi).toFixed(1));
    case 'inches': return parseFloat((px / dpi).toFixed(2));
    default: return px;
  }
};

const PhotoResizeTool: React.FC<PhotoResizeToolProps> = ({ toolTitle, presets, defaultPresetIndex = 0 }) => {
  const [selectedPreset, setSelectedPreset] = useState<string>(presets[defaultPresetIndex]?.label || 'custom');
  const [unit, setUnit] = useState<Unit>('px');
  const [width, setWidth] = useState<number>(presets[defaultPresetIndex]?.width || 200);
  const [height, setHeight] = useState<number>(presets[defaultPresetIndex]?.height || 200);
  const [maintainAspect, setMaintainAspect] = useState(false);
  const [quality, setQuality] = useState(90);
  const [format, setFormat] = useState<'jpeg' | 'png'>('jpeg');
  const [targetSizeEnabled, setTargetSizeEnabled] = useState(false);
  const [targetSize, setTargetSize] = useState(100);
  const [targetSizeUnit, setTargetSizeUnit] = useState<'KB' | 'MB'>('KB');
  const [originalAspect, setOriginalAspect] = useState<number | null>(null);

  const handlePresetChange = (label: string) => {
    setSelectedPreset(label);
    if (label === 'custom') return;
    const preset = presets.find(p => p.label === label);
    if (!preset) return;
    const dpi = preset.dpi || 96;
    if (unit === 'px') {
      setWidth(preset.width);
      setHeight(preset.height);
    } else {
      setWidth(fromPx(preset.width, unit, dpi));
      setHeight(fromPx(preset.height, unit, dpi));
    }
    if (preset.maxSizeKB) {
      setTargetSizeEnabled(true);
      setTargetSize(preset.maxSizeKB);
      setTargetSizeUnit('KB');
    }
  };

  const handleWidthChange = (val: number) => {
    setWidth(val);
    if (maintainAspect && originalAspect) {
      setHeight(parseFloat((val / originalAspect).toFixed(2)));
    }
  };

  const handleHeightChange = (val: number) => {
    setHeight(val);
    if (maintainAspect && originalAspect) {
      setWidth(parseFloat((val * originalAspect).toFixed(2)));
    }
  };

  const processingFunction = useCallback(async (file: File): Promise<ProcessingResult> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        const aspect = img.naturalWidth / img.naturalHeight;
        setOriginalAspect(aspect);

        const dpi = 96;
        const targetW = toPx(width, unit, dpi);
        const targetH = toPx(height, unit, dpi);

        const canvas = document.createElement('canvas');
        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext('2d');
        if (!ctx) { reject(new Error('Canvas not supported')); return; }

        if (format === 'jpeg') {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, targetW, targetH);
        }
        ctx.drawImage(img, 0, 0, targetW, targetH);

        const mimeType = `image/${format}`;
        const q = quality / 100;

        canvas.toBlob((blob) => {
          if (!blob) { reject(new Error('Processing failed')); return; }
          const ext = format === 'jpeg' ? 'jpg' : 'png';
          const baseName = file.name.replace(/\.[^.]+$/, '');
          const outputFileName = `${baseName}_resized.${ext}`;
          const previewUrl = URL.createObjectURL(blob);
          resolve({
            blob,
            previewUrl,
            outputFileName,
            metadata: {
              'Dimensions': `${targetW}×${targetH}px`,
              'Format': format.toUpperCase(),
              'Quality': `${quality}%`,
            }
          });
        }, mimeType, q);
      };
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Failed to load image')); };
      img.src = url;
    });
  }, [width, height, unit, format, quality]);

  const settingsSlot = (
    <div className="space-y-5">
      {/* Preset Selector */}
      <div className="space-y-2">
        <Label className="text-gray-200 text-sm font-medium">Preset</Label>
        <Select value={selectedPreset} onValueChange={handlePresetChange}>
          <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-gray-100">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-600">
            {presets.map(p => (
              <SelectItem key={p.label} value={p.label}>
                {p.label} ({p.width}×{p.height}{p.unit}{p.maxSizeKB ? `, max ${p.maxSizeKB}KB` : ''})
              </SelectItem>
            ))}
            <SelectItem value="custom">Custom</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Unit Selector */}
      <div className="space-y-2">
        <Label className="text-gray-200 text-sm font-medium">Unit</Label>
        <Select value={unit} onValueChange={(v) => setUnit(v as Unit)}>
          <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-gray-100">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-600">
            <SelectItem value="px">Pixels (px)</SelectItem>
            <SelectItem value="cm">Centimeters (cm)</SelectItem>
            <SelectItem value="mm">Millimeters (mm)</SelectItem>
            <SelectItem value="inches">Inches</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Width & Height */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label className="text-gray-200 text-sm font-medium">Width ({unit})</Label>
          <Input
            type="number"
            min={1}
            value={width}
            onChange={(e) => handleWidthChange(Number(e.target.value))}
            className="bg-gray-700 border-gray-600 text-gray-100"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-gray-200 text-sm font-medium">Height ({unit})</Label>
          <Input
            type="number"
            min={1}
            value={height}
            onChange={(e) => handleHeightChange(Number(e.target.value))}
            className="bg-gray-700 border-gray-600 text-gray-100"
          />
        </div>
      </div>

      {/* Maintain Aspect Ratio */}
      <div className="flex items-center gap-3">
        <Switch
          id="aspect-ratio"
          checked={maintainAspect}
          onCheckedChange={setMaintainAspect}
        />
        <Label htmlFor="aspect-ratio" className="text-gray-200 text-sm cursor-pointer">
          Maintain Aspect Ratio
        </Label>
      </div>

      {/* Output Format */}
      <div className="space-y-2">
        <Label className="text-gray-200 text-sm font-medium">Output Format</Label>
        <Select value={format} onValueChange={(v) => setFormat(v as 'jpeg' | 'png')}>
          <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-gray-100">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-600">
            <SelectItem value="jpeg">JPEG</SelectItem>
            <SelectItem value="png">PNG</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Quality */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label className="text-gray-200 text-sm font-medium">Quality</Label>
          <span className="text-blue-400 font-semibold text-sm">{quality}%</span>
        </div>
        <Slider
          min={1}
          max={100}
          step={1}
          value={[quality]}
          onValueChange={([v]) => setQuality(v)}
          className="w-full"
        />
      </div>

      {/* Target File Size */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="target-size-photo"
            checked={targetSizeEnabled}
            onChange={(e) => setTargetSizeEnabled(e.target.checked)}
            className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500"
          />
          <Label htmlFor="target-size-photo" className="text-gray-200 text-sm font-medium cursor-pointer">
            Target File Size (optional)
          </Label>
        </div>
        {targetSizeEnabled && (
          <div className="flex gap-2 mt-2">
            <Input
              type="number"
              min={1}
              value={targetSize}
              onChange={(e) => setTargetSize(Number(e.target.value))}
              className="flex-1 bg-gray-700 border-gray-600 text-gray-100"
            />
            <Select value={targetSizeUnit} onValueChange={(v) => setTargetSizeUnit(v as 'KB' | 'MB')}>
              <SelectTrigger className="w-24 bg-gray-700 border-gray-600 text-gray-100">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="KB">KB</SelectItem>
                <SelectItem value="MB">MB</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <AdvancedToolShell
      toolTitle={toolTitle}
      acceptedFileTypes="image/jpeg,image/png,image/webp,image/gif,image/bmp"
      acceptedFileTypesLabel="Supports JPEG, PNG, WebP, GIF, BMP"
      settingsSlot={settingsSlot}
      processingFunction={processingFunction}
      outputFileName="resized-photo.jpg"
    />
  );
};

export default PhotoResizeTool;
