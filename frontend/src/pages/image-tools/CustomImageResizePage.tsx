import React, { useState, useCallback } from 'react';
import SEO from '../../components/SEO';
import BreadcrumbNavigation from '../../components/BreadcrumbNavigation';
import AdvancedToolShell, { ProcessingResult } from '../../components/AdvancedToolShell';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

type Unit = 'px' | 'cm' | 'mm' | 'inches';
type ResizeMode = 'pixel' | 'percentage';

const toPx = (value: number, unit: Unit, dpi = 96): number => {
  switch (unit) {
    case 'px': return value;
    case 'cm': return Math.round(value * dpi / 2.54);
    case 'mm': return Math.round(value * dpi / 25.4);
    case 'inches': return Math.round(value * dpi);
    default: return value;
  }
};

const CustomImageResizePage: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
  const [widthUnit, setWidthUnit] = useState<Unit>('px');
  const [heightUnit, setHeightUnit] = useState<Unit>('px');
  const [width, setWidth] = useState<number>(800);
  const [height, setHeight] = useState<number>(600);
  const [maintainAspect, setMaintainAspect] = useState(true);
  const [resizeMode, setResizeMode] = useState<ResizeMode>('pixel');
  const [widthPercent, setWidthPercent] = useState(100);
  const [heightPercent, setHeightPercent] = useState(100);
  const [quality, setQuality] = useState(90);
  const [format, setFormat] = useState<'jpeg' | 'png' | 'webp'>('jpeg');
  const [originalDims, setOriginalDims] = useState<{ w: number; h: number } | null>(null);

  const handleWidthChange = (val: number) => {
    setWidth(val);
    if (maintainAspect && originalDims) {
      const aspect = originalDims.w / originalDims.h;
      const wPx = toPx(val, widthUnit);
      const hPx = Math.round(wPx / aspect);
      setHeight(hPx);
    }
  };

  const handleHeightChange = (val: number) => {
    setHeight(val);
    if (maintainAspect && originalDims) {
      const aspect = originalDims.w / originalDims.h;
      const hPx = toPx(val, heightUnit);
      const wPx = Math.round(hPx * aspect);
      setWidth(wPx);
    }
  };

  const processingFunction = useCallback(async (file: File): Promise<ProcessingResult> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        setOriginalDims({ w: img.naturalWidth, h: img.naturalHeight });

        let targetW: number;
        let targetH: number;

        if (resizeMode === 'percentage') {
          targetW = Math.round(img.naturalWidth * widthPercent / 100);
          targetH = Math.round(img.naturalHeight * heightPercent / 100);
        } else {
          targetW = toPx(width, widthUnit);
          targetH = toPx(height, heightUnit);
        }

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
          const ext = format === 'jpeg' ? 'jpg' : format;
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
  }, [width, height, widthUnit, heightUnit, resizeMode, widthPercent, heightPercent, format, quality]);

  const settingsSlot = (
    <div className="space-y-5">
      {/* Resize Mode */}
      <div className="space-y-2">
        <Label className="text-gray-200 text-sm font-medium">Resize Mode</Label>
        <Select value={resizeMode} onValueChange={(v) => setResizeMode(v as ResizeMode)}>
          <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-gray-100">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-600">
            <SelectItem value="pixel">By Pixel / Unit</SelectItem>
            <SelectItem value="percentage">By Percentage</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {resizeMode === 'pixel' ? (
        <>
          {/* Width */}
          <div className="space-y-2">
            <Label className="text-gray-200 text-sm font-medium">Width</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                min={1}
                value={width}
                onChange={(e) => handleWidthChange(Number(e.target.value))}
                className="flex-1 bg-gray-700 border-gray-600 text-gray-100"
              />
              <Select value={widthUnit} onValueChange={(v) => setWidthUnit(v as Unit)}>
                <SelectTrigger className="w-28 bg-gray-700 border-gray-600 text-gray-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="px">px</SelectItem>
                  <SelectItem value="cm">cm</SelectItem>
                  <SelectItem value="mm">mm</SelectItem>
                  <SelectItem value="inches">inches</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Height */}
          <div className="space-y-2">
            <Label className="text-gray-200 text-sm font-medium">Height</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                min={1}
                value={height}
                onChange={(e) => handleHeightChange(Number(e.target.value))}
                className="flex-1 bg-gray-700 border-gray-600 text-gray-100"
              />
              <Select value={heightUnit} onValueChange={(v) => setHeightUnit(v as Unit)}>
                <SelectTrigger className="w-28 bg-gray-700 border-gray-600 text-gray-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="px">px</SelectItem>
                  <SelectItem value="cm">cm</SelectItem>
                  <SelectItem value="mm">mm</SelectItem>
                  <SelectItem value="inches">inches</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="space-y-2">
            <Label className="text-gray-200 text-sm font-medium">Width %</Label>
            <div className="flex items-center gap-3">
              <Input
                type="number"
                min={1}
                max={500}
                value={widthPercent}
                onChange={(e) => {
                  setWidthPercent(Number(e.target.value));
                  if (maintainAspect) setHeightPercent(Number(e.target.value));
                }}
                className="flex-1 bg-gray-700 border-gray-600 text-gray-100"
              />
              <span className="text-gray-400">%</span>
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-gray-200 text-sm font-medium">Height %</Label>
            <div className="flex items-center gap-3">
              <Input
                type="number"
                min={1}
                max={500}
                value={heightPercent}
                onChange={(e) => {
                  setHeightPercent(Number(e.target.value));
                  if (maintainAspect) setWidthPercent(Number(e.target.value));
                }}
                className="flex-1 bg-gray-700 border-gray-600 text-gray-100"
              />
              <span className="text-gray-400">%</span>
            </div>
          </div>
        </>
      )}

      {/* Maintain Aspect Ratio */}
      <div className="flex items-center gap-3">
        <Switch id="aspect-custom" checked={maintainAspect} onCheckedChange={setMaintainAspect} />
        <Label htmlFor="aspect-custom" className="text-gray-200 text-sm cursor-pointer">Maintain Aspect Ratio</Label>
      </div>

      {/* Output Format */}
      <div className="space-y-2">
        <Label className="text-gray-200 text-sm font-medium">Output Format</Label>
        <Select value={format} onValueChange={(v) => setFormat(v as 'jpeg' | 'png' | 'webp')}>
          <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-gray-100">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-600">
            <SelectItem value="jpeg">JPEG</SelectItem>
            <SelectItem value="png">PNG</SelectItem>
            <SelectItem value="webp">WebP</SelectItem>
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
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <SEO
        title="Custom Image Resize Online Free - Resize to Any Dimension"
        description="Resize images to any custom dimension online. Supports px, cm, mm, inches with aspect ratio lock, quality control, and before/after preview."
        canonicalUrl="https://docmastertools.com/custom-image-resize"
      />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <BreadcrumbNavigation
          items={[
            { label: 'Home', onClick: () => onNavigate?.('home') },
            { label: 'Image Tools', onClick: () => onNavigate?.('image-tools') },
            { label: 'Custom Image Resize' },
          ]}
        />
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">Custom Image Resize</h1>
          <p className="text-gray-400">Resize images to any custom dimension with full control over units, aspect ratio, quality, and format.</p>
        </div>
        <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
          <AdvancedToolShell
            toolTitle="Custom Image Resize"
            acceptedFileTypes="image/jpeg,image/png,image/webp,image/gif,image/bmp"
            acceptedFileTypesLabel="Supports JPEG, PNG, WebP, GIF, BMP"
            settingsSlot={settingsSlot}
            processingFunction={processingFunction}
            outputFileName="resized-image.jpg"
          />
        </div>
      </main>
    </div>
  );
};

export default CustomImageResizePage;
