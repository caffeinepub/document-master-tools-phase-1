import React, { useState, useCallback } from 'react';
import SEO from '../../components/SEO';
import BreadcrumbNavigation from '../../components/BreadcrumbNavigation';
import AdvancedToolShell, { ProcessingResult } from '../../components/AdvancedToolShell';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

type AspectRatio = 'free' | '1:1' | '4:3' | '3:2' | '16:9' | '9:16' | 'custom';

const ASPECT_RATIOS: { label: string; value: AspectRatio; ratio?: number }[] = [
  { label: 'Free', value: 'free' },
  { label: '1:1 (Square)', value: '1:1', ratio: 1 },
  { label: '4:3', value: '4:3', ratio: 4 / 3 },
  { label: '3:2', value: '3:2', ratio: 3 / 2 },
  { label: '16:9 (Widescreen)', value: '16:9', ratio: 16 / 9 },
  { label: '9:16 (Portrait)', value: '9:16', ratio: 9 / 16 },
  { label: 'Custom', value: 'custom' },
];

const ImageCropperPage: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('free');
  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);
  const [cropW, setCropW] = useState(100);
  const [cropH, setCropH] = useState(100);
  const [cropUnit, setCropUnit] = useState<'px' | 'percentage'>('percentage');
  const [quality, setQuality] = useState(90);
  const [format, setFormat] = useState<'jpeg' | 'png' | 'webp'>('jpeg');

  const processingFunction = useCallback(async (file: File): Promise<ProcessingResult> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);

        let sx: number, sy: number, sw: number, sh: number;
        if (cropUnit === 'percentage') {
          sx = Math.round(img.naturalWidth * cropX / 100);
          sy = Math.round(img.naturalHeight * cropY / 100);
          sw = Math.round(img.naturalWidth * cropW / 100);
          sh = Math.round(img.naturalHeight * cropH / 100);
        } else {
          sx = cropX;
          sy = cropY;
          sw = cropW;
          sh = cropH;
        }

        sw = Math.max(1, Math.min(sw, img.naturalWidth - sx));
        sh = Math.max(1, Math.min(sh, img.naturalHeight - sy));

        const canvas = document.createElement('canvas');
        canvas.width = sw;
        canvas.height = sh;
        const ctx = canvas.getContext('2d');
        if (!ctx) { reject(new Error('Canvas not supported')); return; }

        if (format === 'jpeg') {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, sw, sh);
        }
        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);

        const mimeType = `image/${format}`;
        const q = quality / 100;

        canvas.toBlob((blob) => {
          if (!blob) { reject(new Error('Processing failed')); return; }
          const ext = format === 'jpeg' ? 'jpg' : format;
          const baseName = file.name.replace(/\.[^.]+$/, '');
          const outputFileName = `${baseName}_cropped.${ext}`;
          const previewUrl = URL.createObjectURL(blob);
          resolve({
            blob,
            previewUrl,
            outputFileName,
            metadata: {
              'Cropped Size': `${sw}×${sh}px`,
              'Format': format.toUpperCase(),
              'Quality': `${quality}%`,
            }
          });
        }, mimeType, q);
      };
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Failed to load image')); };
      img.src = url;
    });
  }, [cropX, cropY, cropW, cropH, cropUnit, format, quality]);

  const handleAspectChange = (val: AspectRatio) => {
    setAspectRatio(val);
    const preset = ASPECT_RATIOS.find(r => r.value === val);
    if (preset?.ratio && cropUnit === 'percentage') {
      const newH = Math.round(cropW / preset.ratio);
      setCropH(Math.min(newH, 100));
    }
  };

  const settingsSlot = (
    <div className="space-y-5">
      {/* Aspect Ratio */}
      <div className="space-y-2">
        <Label className="text-gray-200 text-sm font-medium">Aspect Ratio</Label>
        <Select value={aspectRatio} onValueChange={(v) => handleAspectChange(v as AspectRatio)}>
          <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-gray-100">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-600">
            {ASPECT_RATIOS.map(r => (
              <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Crop Unit */}
      <div className="space-y-2">
        <Label className="text-gray-200 text-sm font-medium">Crop Unit</Label>
        <Select value={cropUnit} onValueChange={(v) => setCropUnit(v as 'px' | 'percentage')}>
          <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-gray-100">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-600">
            <SelectItem value="percentage">Percentage (%)</SelectItem>
            <SelectItem value="px">Pixels (px)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Crop Dimensions */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label className="text-gray-200 text-sm font-medium">X Offset ({cropUnit === 'percentage' ? '%' : 'px'})</Label>
          <Input
            type="number"
            min={0}
            max={cropUnit === 'percentage' ? 99 : undefined}
            value={cropX}
            onChange={(e) => setCropX(Number(e.target.value))}
            className="bg-gray-700 border-gray-600 text-gray-100"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-gray-200 text-sm font-medium">Y Offset ({cropUnit === 'percentage' ? '%' : 'px'})</Label>
          <Input
            type="number"
            min={0}
            max={cropUnit === 'percentage' ? 99 : undefined}
            value={cropY}
            onChange={(e) => setCropY(Number(e.target.value))}
            className="bg-gray-700 border-gray-600 text-gray-100"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-gray-200 text-sm font-medium">Width ({cropUnit === 'percentage' ? '%' : 'px'})</Label>
          <Input
            type="number"
            min={1}
            max={cropUnit === 'percentage' ? 100 : undefined}
            value={cropW}
            onChange={(e) => setCropW(Number(e.target.value))}
            className="bg-gray-700 border-gray-600 text-gray-100"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-gray-200 text-sm font-medium">Height ({cropUnit === 'percentage' ? '%' : 'px'})</Label>
          <Input
            type="number"
            min={1}
            max={cropUnit === 'percentage' ? 100 : undefined}
            value={cropH}
            onChange={(e) => setCropH(Number(e.target.value))}
            className="bg-gray-700 border-gray-600 text-gray-100"
          />
        </div>
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
        title="Image Cropper - Crop Images Online Free"
        description="Crop images online for free with custom dimensions, aspect ratios, and quality control. Before/after preview with instant download."
        canonicalUrl="https://docmastertools.com/image-cropper"
      />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <BreadcrumbNavigation
          items={[
            { label: 'Home', onClick: () => onNavigate?.('home') },
            { label: 'Image Tools', onClick: () => onNavigate?.('image-tools') },
            { label: 'Image Cropper' },
          ]}
        />
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">Image Cropper</h1>
          <p className="text-gray-400">Crop images with custom dimensions, aspect ratios, and quality settings.</p>
        </div>
        <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
          <AdvancedToolShell
            toolTitle="Image Cropper"
            acceptedFileTypes="image/jpeg,image/png,image/webp,image/gif,image/bmp"
            acceptedFileTypesLabel="Supports JPEG, PNG, WebP, GIF, BMP"
            settingsSlot={settingsSlot}
            processingFunction={processingFunction}
            outputFileName="cropped-image.jpg"
          />
        </div>
      </main>
    </div>
  );
};

export default ImageCropperPage;
