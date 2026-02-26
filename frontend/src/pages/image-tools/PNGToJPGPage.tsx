import React, { useState, useCallback } from 'react';
import SEO from '../../components/SEO';
import BreadcrumbNavigation from '../../components/BreadcrumbNavigation';
import AdvancedToolShell, { ProcessingResult } from '../../components/AdvancedToolShell';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const PNGToJPGPage: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
  const [format, setFormat] = useState<'jpeg' | 'webp'>('jpeg');
  const [quality, setQuality] = useState(90);
  const [targetSizeEnabled, setTargetSizeEnabled] = useState(false);
  const [targetSize, setTargetSize] = useState(500);
  const [targetSizeUnit, setTargetSizeUnit] = useState<'KB' | 'MB'>('KB');

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
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        const mimeType = `image/${format}`;
        const q = quality / 100;

        canvas.toBlob((blob) => {
          if (!blob) { reject(new Error('Conversion failed')); return; }
          const baseName = file.name.replace(/\.[^.]+$/, '');
          const ext = format === 'jpeg' ? 'jpg' : 'webp';
          const outputFileName = `${baseName}.${ext}`;
          const previewUrl = URL.createObjectURL(blob);
          resolve({
            blob,
            previewUrl,
            outputFileName,
            metadata: {
              'Format': format.toUpperCase(),
              'Dimensions': `${img.naturalWidth}×${img.naturalHeight}px`,
              'Quality': `${quality}%`,
            }
          });
        }, mimeType, q);
      };
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Failed to load image')); };
      img.src = url;
    });
  }, [format, quality]);

  const settingsSlot = (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label className="text-gray-200 text-sm font-medium">Output Format</Label>
        <Select value={format} onValueChange={(v) => setFormat(v as 'jpeg' | 'webp')}>
          <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-gray-100">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-600">
            <SelectItem value="jpeg">JPEG (smaller size)</SelectItem>
            <SelectItem value="webp">WebP (modern)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label className="text-gray-200 text-sm font-medium">Quality</Label>
          <span className="text-blue-400 font-semibold text-sm">{quality}%</span>
        </div>
        <Slider min={1} max={100} step={1} value={[quality]} onValueChange={([v]) => setQuality(v)} className="w-full" />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <input type="checkbox" id="ts-png-jpg" checked={targetSizeEnabled} onChange={(e) => setTargetSizeEnabled(e.target.checked)} className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500" />
          <Label htmlFor="ts-png-jpg" className="text-gray-200 text-sm font-medium cursor-pointer">Target File Size (optional)</Label>
        </div>
        {targetSizeEnabled && (
          <div className="flex gap-2 mt-2">
            <Input type="number" min={1} value={targetSize} onChange={(e) => setTargetSize(Number(e.target.value))} className="flex-1 bg-gray-700 border-gray-600 text-gray-100" />
            <Select value={targetSizeUnit} onValueChange={(v) => setTargetSizeUnit(v as 'KB' | 'MB')}>
              <SelectTrigger className="w-24 bg-gray-700 border-gray-600 text-gray-100"><SelectValue /></SelectTrigger>
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
        title="PNG to JPG Converter - Convert PNG to JPEG Online Free"
        description="Convert PNG images to JPEG or WebP online for free. Quality control, before/after preview, and instant download."
        canonicalUrl="https://docmastertools.com/png-to-jpg"
      />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <BreadcrumbNavigation
          items={[
            { label: 'Home', onClick: () => onNavigate?.('home') },
            { label: 'Image Tools', onClick: () => onNavigate?.('image-tools') },
            { label: 'PNG to JPG' },
          ]}
        />
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">PNG to JPG Converter</h1>
          <p className="text-gray-400">Convert PNG images to JPEG or WebP format with quality control and before/after preview.</p>
        </div>
        <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
          <AdvancedToolShell
            toolTitle="PNG to JPG"
            acceptedFileTypes="image/png"
            acceptedFileTypesLabel="Accepts PNG files"
            settingsSlot={settingsSlot}
            processingFunction={processingFunction}
            outputFileName="converted.jpg"
          />
        </div>
      </main>
    </div>
  );
};

export default PNGToJPGPage;
