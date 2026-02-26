import React, { useState, useCallback } from 'react';
import SEO from '../../components/SEO';
import BreadcrumbNavigation from '../../components/BreadcrumbNavigation';
import AdvancedToolShell, { ProcessingResult } from '../../components/AdvancedToolShell';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

type BgFill = 'transparent' | 'white' | 'custom' | 'blur';

const BackgroundRemoverPage: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
  const [bgFill, setBgFill] = useState<BgFill>('transparent');
  const [customColor, setCustomColor] = useState('#ffffff');
  const [format, setFormat] = useState<'png' | 'jpeg' | 'webp'>('png');
  const [quality, setQuality] = useState(90);

  // Force PNG for transparent background
  const effectiveFormat = bgFill === 'transparent' ? 'png' : format;

  const processingFunction = useCallback(async (file: File): Promise<ProcessingResult> => {
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

        // Apply background fill based on selection
        if (bgFill === 'white') {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else if (bgFill === 'custom') {
          ctx.fillStyle = customColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else if (bgFill === 'blur') {
          // Draw blurred version as background
          ctx.filter = 'blur(20px)';
          ctx.drawImage(img, -20, -20, canvas.width + 40, canvas.height + 40);
          ctx.filter = 'none';
        }
        // For transparent: don't fill background (canvas is transparent by default)

        // Draw the image on top
        ctx.drawImage(img, 0, 0);

        // Simple background removal: make near-white pixels transparent
        if (bgFill === 'transparent') {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            // Remove near-white background (simple threshold)
            if (r > 220 && g > 220 && b > 220) {
              data[i + 3] = 0; // Set alpha to 0 (transparent)
            }
          }
          ctx.putImageData(imageData, 0, 0);
        }

        const mimeType = `image/${effectiveFormat}`;
        const q = effectiveFormat !== 'png' ? quality / 100 : undefined;

        canvas.toBlob((blob) => {
          if (!blob) { reject(new Error('Processing failed')); return; }
          const ext = effectiveFormat === 'jpeg' ? 'jpg' : effectiveFormat;
          const baseName = file.name.replace(/\.[^.]+$/, '');
          const outputFileName = `${baseName}_bg_removed.${ext}`;
          const previewUrl = URL.createObjectURL(blob);
          resolve({
            blob,
            previewUrl,
            outputFileName,
            metadata: {
              'Background': bgFill === 'transparent' ? 'Transparent' : bgFill === 'white' ? 'White' : bgFill === 'custom' ? `Custom (${customColor})` : 'Blur',
              'Format': effectiveFormat.toUpperCase(),
              'Dimensions': `${img.naturalWidth}×${img.naturalHeight}px`,
            }
          });
        }, mimeType, q);
      };
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Failed to load image')); };
      img.src = url;
    });
  }, [bgFill, customColor, effectiveFormat, quality]);

  const settingsSlot = (
    <div className="space-y-5">
      {/* Background Fill */}
      <div className="space-y-2">
        <Label className="text-gray-200 text-sm font-medium">Background Fill</Label>
        <Select value={bgFill} onValueChange={(v) => setBgFill(v as BgFill)}>
          <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-gray-100">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-600">
            <SelectItem value="transparent">Transparent (PNG only)</SelectItem>
            <SelectItem value="white">White Background</SelectItem>
            <SelectItem value="custom">Custom Color</SelectItem>
            <SelectItem value="blur">Blur Background</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Custom Color Picker */}
      {bgFill === 'custom' && (
        <div className="space-y-2">
          <Label className="text-gray-200 text-sm font-medium">Background Color</Label>
          <div className="flex gap-3 items-center">
            <input
              type="color"
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
              className="w-12 h-10 rounded cursor-pointer border border-gray-600 bg-gray-700"
            />
            <Input
              type="text"
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
              className="flex-1 bg-gray-700 border-gray-600 text-gray-100"
              placeholder="#ffffff"
            />
          </div>
        </div>
      )}

      {/* Output Format — locked to PNG for transparent */}
      <div className="space-y-2">
        <Label className="text-gray-200 text-sm font-medium">Output Format</Label>
        {bgFill === 'transparent' ? (
          <div className="px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-gray-300 text-sm">
            PNG (required for transparency)
          </div>
        ) : (
          <Select value={format} onValueChange={(v) => setFormat(v as 'png' | 'jpeg' | 'webp')}>
            <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-gray-100">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              <SelectItem value="png">PNG</SelectItem>
              <SelectItem value="jpeg">JPEG</SelectItem>
              <SelectItem value="webp">WebP</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Quality — only for non-transparent, non-PNG */}
      {bgFill !== 'transparent' && effectiveFormat !== 'png' && (
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
      )}

      <div className="bg-amber-900/20 border border-amber-700/40 rounded-lg p-3 text-xs text-amber-300">
        <strong>Note:</strong> This tool uses a simple threshold-based background removal (removes near-white pixels). For complex backgrounds, results may vary.
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <SEO
        title="Background Remover - Remove Image Background Online Free"
        description="Remove image background online for free. Choose transparent, white, custom color, or blur background with before/after preview."
        canonicalUrl="https://docmastertools.com/background-remover"
      />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <BreadcrumbNavigation
          items={[
            { label: 'Home', onClick: () => onNavigate?.('home') },
            { label: 'Image Tools', onClick: () => onNavigate?.('image-tools') },
            { label: 'Background Remover' },
          ]}
        />
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">Background Remover</h1>
          <p className="text-gray-400">Remove or replace image backgrounds with transparent, white, custom color, or blur options.</p>
        </div>
        <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
          <AdvancedToolShell
            toolTitle="Background Remover"
            acceptedFileTypes="image/jpeg,image/png,image/webp,image/bmp"
            acceptedFileTypesLabel="Supports JPEG, PNG, WebP, BMP"
            settingsSlot={settingsSlot}
            processingFunction={processingFunction}
            outputFileName="background-removed.png"
          />
        </div>
      </main>
    </div>
  );
};

export default BackgroundRemoverPage;
