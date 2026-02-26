import React, { useState, useCallback } from 'react';
import SEO from '../../components/SEO';
import BreadcrumbNavigation from '../../components/BreadcrumbNavigation';
import AdvancedToolShell, { ProcessingResult } from '../../components/AdvancedToolShell';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface CompressorSettings {
  quality: number;
  format: 'jpeg' | 'png' | 'webp';
  targetSizeEnabled: boolean;
  targetSize: number;
  targetSizeUnit: 'KB' | 'MB';
}

const compressImage = async (file: File, settings: CompressorSettings): Promise<ProcessingResult> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) { reject(new Error('Canvas not supported')); return; }

      if (settings.format === 'jpeg') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);

      const mimeType = `image/${settings.format}`;
      const quality = settings.quality / 100;

      canvas.toBlob((blob) => {
        if (!blob) { reject(new Error('Compression failed')); return; }
        const ext = settings.format === 'jpeg' ? 'jpg' : settings.format;
        const baseName = file.name.replace(/\.[^.]+$/, '');
        const outputFileName = `${baseName}_compressed.${ext}`;
        const previewUrl = URL.createObjectURL(blob);
        resolve({
          blob,
          previewUrl,
          outputFileName,
          metadata: {
            'Dimensions': `${img.naturalWidth}×${img.naturalHeight}px`,
            'Format': settings.format.toUpperCase(),
            'Quality': `${settings.quality}%`,
          }
        });
      }, mimeType, quality);
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Failed to load image')); };
    img.src = url;
  });
};

const ImageCompressorPage: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
  const [settings, setSettings] = useState<CompressorSettings>({
    quality: 80,
    format: 'jpeg',
    targetSizeEnabled: false,
    targetSize: 100,
    targetSizeUnit: 'KB',
  });

  const processingFunction = useCallback(async (file: File): Promise<ProcessingResult> => {
    return compressImage(file, settings);
  }, [settings]);

  const settingsSlot = (
    <div className="space-y-5">
      {/* Output Format */}
      <div className="space-y-2">
        <Label className="text-gray-200 text-sm font-medium">Output Format</Label>
        <Select value={settings.format} onValueChange={(v) => setSettings(s => ({ ...s, format: v as 'jpeg' | 'png' | 'webp' }))}>
          <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-gray-100">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-600">
            <SelectItem value="jpeg">JPEG (best for photos)</SelectItem>
            <SelectItem value="png">PNG (lossless)</SelectItem>
            <SelectItem value="webp">WebP (modern, small)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Quality Slider */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label className="text-gray-200 text-sm font-medium">Quality</Label>
          <span className="text-blue-400 font-semibold text-sm">{settings.quality}%</span>
        </div>
        <Slider
          min={1}
          max={100}
          step={1}
          value={[settings.quality]}
          onValueChange={([v]) => setSettings(s => ({ ...s, quality: v }))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>1% (smallest)</span>
          <span>100% (best quality)</span>
        </div>
      </div>

      {/* Target Size */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="target-size-toggle"
            checked={settings.targetSizeEnabled}
            onChange={(e) => setSettings(s => ({ ...s, targetSizeEnabled: e.target.checked }))}
            className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500"
          />
          <Label htmlFor="target-size-toggle" className="text-gray-200 text-sm font-medium cursor-pointer">
            Target File Size (optional)
          </Label>
        </div>
        {settings.targetSizeEnabled && (
          <div className="flex gap-2 mt-2">
            <Input
              type="number"
              min={1}
              value={settings.targetSize}
              onChange={(e) => setSettings(s => ({ ...s, targetSize: Number(e.target.value) }))}
              className="flex-1 bg-gray-700 border-gray-600 text-gray-100"
              placeholder="100"
            />
            <Select value={settings.targetSizeUnit} onValueChange={(v) => setSettings(s => ({ ...s, targetSizeUnit: v as 'KB' | 'MB' }))}>
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
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <SEO
        title="Image Compressor - Reduce Image File Size Online Free"
        description="Compress images online for free. Reduce JPEG, PNG, WebP file sizes with quality control. Advanced settings with before/after preview."
        canonicalUrl="https://docmastertools.com/image-compressor"
      />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <BreadcrumbNavigation
          items={[
            { label: 'Home', onClick: () => onNavigate?.('home') },
            { label: 'Image Tools', onClick: () => onNavigate?.('image-tools') },
            { label: 'Image Compressor' },
          ]}
        />
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">Image Compressor</h1>
          <p className="text-gray-400">Compress images with full control over quality, format, and file size.</p>
        </div>
        <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
          <AdvancedToolShell
            toolTitle="Image Compressor"
            acceptedFileTypes="image/jpeg,image/png,image/webp,image/gif,image/bmp"
            acceptedFileTypesLabel="Supports JPEG, PNG, WebP, GIF, BMP"
            settingsSlot={settingsSlot}
            processingFunction={processingFunction}
            outputFileName="compressed-image.jpg"
          />
        </div>
      </main>
    </div>
  );
};

export default ImageCompressorPage;
