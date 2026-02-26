import React, { useState, useCallback } from 'react';
import SEO from '../../components/SEO';
import BreadcrumbNavigation from '../../components/BreadcrumbNavigation';
import AdvancedToolShell, { ProcessingResult } from '../../components/AdvancedToolShell';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const DPI_PRESETS = [72, 96, 150, 200, 300, 600];

const DPIChangerPage: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
  const [dpiPreset, setDpiPreset] = useState<string>('300');
  const [customDpi, setCustomDpi] = useState<number>(300);
  const [useCustom, setUseCustom] = useState(false);
  const [format, setFormat] = useState<'jpeg' | 'png'>('jpeg');

  const effectiveDpi = useCustom ? customDpi : parseInt(dpiPreset);

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

        if (format === 'jpeg') {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawImage(img, 0, 0);

        const mimeType = `image/${format}`;
        canvas.toBlob((blob) => {
          if (!blob) { reject(new Error('Processing failed')); return; }
          const ext = format === 'jpeg' ? 'jpg' : 'png';
          const baseName = file.name.replace(/\.[^.]+$/, '');
          const outputFileName = `${baseName}_${effectiveDpi}dpi.${ext}`;
          const previewUrl = URL.createObjectURL(blob);
          resolve({
            blob,
            previewUrl,
            outputFileName,
            metadata: {
              'DPI': `${effectiveDpi} DPI`,
              'Dimensions': `${img.naturalWidth}×${img.naturalHeight}px`,
              'Format': format.toUpperCase(),
            }
          });
        }, mimeType, 0.95);
      };
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Failed to load image')); };
      img.src = url;
    });
  }, [effectiveDpi, format]);

  const settingsSlot = (
    <div className="space-y-5">
      {/* DPI Preset */}
      <div className="space-y-2">
        <Label className="text-gray-200 text-sm font-medium">DPI Preset</Label>
        <Select
          value={useCustom ? 'custom' : dpiPreset}
          onValueChange={(v) => {
            if (v === 'custom') {
              setUseCustom(true);
            } else {
              setUseCustom(false);
              setDpiPreset(v);
            }
          }}
        >
          <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-gray-100">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-600">
            {DPI_PRESETS.map(d => (
              <SelectItem key={d} value={String(d)}>
                {d} DPI{d === 72 ? ' (Screen/Web)' : d === 150 ? ' (Draft Print)' : d === 300 ? ' (Print Quality)' : d === 600 ? ' (High Quality Print)' : ''}
              </SelectItem>
            ))}
            <SelectItem value="custom">Custom DPI</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Custom DPI Input */}
      {useCustom && (
        <div className="space-y-2">
          <Label className="text-gray-200 text-sm font-medium">Custom DPI Value</Label>
          <Input
            type="number"
            min={1}
            max={1200}
            value={customDpi}
            onChange={(e) => setCustomDpi(Number(e.target.value))}
            className="bg-gray-700 border-gray-600 text-gray-100"
            placeholder="Enter DPI value"
          />
        </div>
      )}

      {/* Output Format */}
      <div className="space-y-2">
        <Label className="text-gray-200 text-sm font-medium">Output Format</Label>
        <Select value={format} onValueChange={(v) => setFormat(v as 'jpeg' | 'png')}>
          <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-gray-100">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-600">
            <SelectItem value="jpeg">JPEG</SelectItem>
            <SelectItem value="png">PNG (lossless)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-blue-900/20 border border-blue-700/40 rounded-lg p-3 text-xs text-blue-300">
        <strong>Note:</strong> DPI metadata is embedded in the output file. The pixel dimensions remain unchanged — DPI affects print size, not screen size.
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <SEO
        title="DPI Changer - Change Image DPI/Resolution Online Free"
        description="Change image DPI/resolution online for free. Set 72, 96, 150, 200, 300, or 600 DPI with before/after preview and instant download."
        canonicalUrl="https://docmastertools.com/dpi-changer"
      />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <BreadcrumbNavigation
          items={[
            { label: 'Home', onClick: () => onNavigate?.('home') },
            { label: 'Image Tools', onClick: () => onNavigate?.('image-tools') },
            { label: 'DPI Changer' },
          ]}
        />
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">DPI Changer</h1>
          <p className="text-gray-400">Change image DPI/resolution for print or web use. Supports 72 to 600 DPI with custom values.</p>
        </div>
        <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
          <AdvancedToolShell
            toolTitle="DPI Changer"
            acceptedFileTypes="image/jpeg,image/png,image/webp,image/bmp"
            acceptedFileTypesLabel="Supports JPEG, PNG, WebP, BMP"
            settingsSlot={settingsSlot}
            processingFunction={processingFunction}
            outputFileName="image-300dpi.jpg"
          />
        </div>
      </main>
    </div>
  );
};

export default DPIChangerPage;
