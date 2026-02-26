import React, { useState, useCallback, useRef } from 'react';
import SEO from '../../components/SEO';
import BreadcrumbNavigation from '../../components/BreadcrumbNavigation';
import AdvancedToolShell, { ProcessingResult } from '../../components/AdvancedToolShell';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { convertPhysicalToPixels, resizeToTargetFileSize } from '../../lib/imageProcessing';

// ─── Types ────────────────────────────────────────────────────────────────────
type Unit = 'px' | 'cm' | 'mm' | 'inches';
type PrintUnit = 'mm' | 'cm' | 'inch';
type ResizeTab = 'easy' | 'percentage' | 'dimensions' | 'filesize' | 'print' | 'social';

// ─── Easy Resize Presets ──────────────────────────────────────────────────────
const EASY_PRESETS = [
  { label: 'Small', width: 640, height: 480 },
  { label: 'Medium', width: 1280, height: 960 },
  { label: 'Large', width: 1920, height: 1440 },
];

// ─── Width × Height Presets ───────────────────────────────────────────────────
const DIMENSION_PRESETS = [
  { label: '800 × 600', width: 800, height: 600 },
  { label: '1024 × 768', width: 1024, height: 768 },
  { label: '1280 × 720 (HD)', width: 1280, height: 720 },
  { label: '1920 × 1080 (Full HD)', width: 1920, height: 1080 },
  { label: '2560 × 1440 (2K)', width: 2560, height: 1440 },
  { label: '3840 × 2160 (4K)', width: 3840, height: 2160 },
];

// ─── Social Media Presets ─────────────────────────────────────────────────────
const SOCIAL_PRESETS = [
  { label: 'Instagram Post', platform: 'Instagram', width: 1080, height: 1080 },
  { label: 'Instagram Story', platform: 'Instagram', width: 1080, height: 1920 },
  { label: 'Facebook Post', platform: 'Facebook', width: 1200, height: 630 },
  { label: 'Facebook Cover', platform: 'Facebook', width: 820, height: 312 },
  { label: 'YouTube Thumbnail', platform: 'YouTube', width: 1280, height: 720 },
  { label: 'YouTube Channel Art', platform: 'YouTube', width: 2560, height: 1440 },
  { label: 'X (Twitter) Post', platform: 'X (Twitter)', width: 1200, height: 675 },
  { label: 'X (Twitter) Header', platform: 'X (Twitter)', width: 1500, height: 500 },
  { label: 'TikTok Video Cover', platform: 'TikTok', width: 1080, height: 1920 },
  { label: 'LinkedIn Personal Banner', platform: 'LinkedIn', width: 1584, height: 396 },
  { label: 'LinkedIn Company Banner', platform: 'LinkedIn', width: 1128, height: 191 },
  { label: 'Pinterest Pin', platform: 'Pinterest', width: 1000, height: 1500 },
  { label: 'Snap Story', platform: 'Snap', width: 1080, height: 1920 },
  { label: 'Tumblr Post', platform: 'Tumblr', width: 500, height: 750 },
];

// ─── Target File Size Presets ─────────────────────────────────────────────────
const FILE_SIZE_PRESETS = [
  { label: '100 KB', sizeKB: 100 },
  { label: '500 KB', sizeKB: 500 },
  { label: '1 MB', sizeKB: 1024 },
  { label: '2 MB', sizeKB: 2048 },
];

// ─── DPI Options ──────────────────────────────────────────────────────────────
const DPI_OPTIONS = [72, 96, 150, 200, 300];

// ─── Percentage Presets ───────────────────────────────────────────────────────
const PERCENT_PRESETS = [25, 40, 50, 75];

// ─── Helper ───────────────────────────────────────────────────────────────────
const toPx = (value: number, unit: Unit, dpi = 96): number => {
  switch (unit) {
    case 'px': return Math.round(value);
    case 'cm': return Math.round(value * dpi / 2.54);
    case 'mm': return Math.round(value * dpi / 25.4);
    case 'inches': return Math.round(value * dpi);
    default: return Math.round(value);
  }
};

// ─── Component ────────────────────────────────────────────────────────────────
const CustomImageResizePage: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<ResizeTab>('easy');

  // Easy Resize
  const [easyPreset, setEasyPreset] = useState<string>('Medium');

  // Percentage
  const [percentValue, setPercentValue] = useState<number>(50);
  const [customPercent, setCustomPercent] = useState<number>(50);
  const [isCustomPercent, setIsCustomPercent] = useState(false);

  // Dimensions
  const [dimPreset, setDimPreset] = useState<string>('1920 × 1080 (Full HD)');
  const [isCustomDim, setIsCustomDim] = useState(false);
  const [customWidth, setCustomWidth] = useState<number>(1920);
  const [customHeight, setCustomHeight] = useState<number>(1080);
  const [dimUnit, setDimUnit] = useState<Unit>('px');
  const [maintainAspect, setMaintainAspect] = useState(true);

  // File Size
  const [fileSizePreset, setFileSizePreset] = useState<number>(500);
  const [isCustomFileSize, setIsCustomFileSize] = useState(false);
  const [customFileSizeValue, setCustomFileSizeValue] = useState<number>(500);
  const [customFileSizeUnit, setCustomFileSizeUnit] = useState<'KB' | 'MB'>('KB');

  // Print
  const [printWidth, setPrintWidth] = useState<number>(210);
  const [printHeight, setPrintHeight] = useState<number>(297);
  const [printUnit, setPrintUnit] = useState<PrintUnit>('mm');
  const [printDpi, setPrintDpi] = useState<number>(300);

  // Social
  const [socialPreset, setSocialPreset] = useState<string>('Instagram Post');

  // Output
  const [format, setFormat] = useState<'jpeg' | 'png' | 'webp'>('jpeg');
  const [quality, setQuality] = useState(90);

  // Track original dims for percentage/aspect ratio
  const originalDimsRef = useRef<{ w: number; h: number } | null>(null);

  // ─── Dimension preset change ────────────────────────────────────────────────
  const handleDimPresetChange = (val: string) => {
    setDimPreset(val);
    if (val === 'custom') {
      setIsCustomDim(true);
      return;
    }
    setIsCustomDim(false);
    const found = DIMENSION_PRESETS.find(p => p.label === val);
    if (found) {
      setCustomWidth(found.width);
      setCustomHeight(found.height);
    }
  };

  const handleCustomWidthChange = (val: number) => {
    setCustomWidth(val);
    if (maintainAspect && originalDimsRef.current) {
      const aspect = originalDimsRef.current.w / originalDimsRef.current.h;
      const wPx = toPx(val, dimUnit);
      setCustomHeight(Math.round(wPx / aspect));
    }
  };

  const handleCustomHeightChange = (val: number) => {
    setCustomHeight(val);
    if (maintainAspect && originalDimsRef.current) {
      const aspect = originalDimsRef.current.w / originalDimsRef.current.h;
      const hPx = toPx(val, dimUnit);
      setCustomWidth(Math.round(hPx * aspect));
    }
  };

  // ─── Processing Function ────────────────────────────────────────────────────
  const processingFunction = useCallback(async (file: File): Promise<ProcessingResult> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);

      img.onload = async () => {
        URL.revokeObjectURL(url);
        const origW = img.naturalWidth;
        const origH = img.naturalHeight;
        originalDimsRef.current = { w: origW, h: origH };

        try {
          let targetW = origW;
          let targetH = origH;
          let targetFileSizeKB: number | null = null;

          // ── Determine target dimensions based on active tab ──
          if (activeTab === 'easy') {
            const preset = EASY_PRESETS.find(p => p.label === easyPreset);
            if (preset) { targetW = preset.width; targetH = preset.height; }

          } else if (activeTab === 'percentage') {
            const pct = isCustomPercent ? customPercent : percentValue;
            targetW = Math.round(origW * pct / 100);
            targetH = Math.round(origH * pct / 100);

          } else if (activeTab === 'dimensions') {
            if (isCustomDim) {
              targetW = toPx(customWidth, dimUnit);
              targetH = toPx(customHeight, dimUnit);
            } else {
              const preset = DIMENSION_PRESETS.find(p => p.label === dimPreset);
              if (preset) { targetW = preset.width; targetH = preset.height; }
            }

          } else if (activeTab === 'filesize') {
            // Keep original dimensions, compress to target size
            targetW = origW;
            targetH = origH;
            if (isCustomFileSize) {
              const multiplier = customFileSizeUnit === 'MB' ? 1024 : 1;
              targetFileSizeKB = customFileSizeValue * multiplier;
            } else {
              targetFileSizeKB = fileSizePreset;
            }

          } else if (activeTab === 'print') {
            const dims = convertPhysicalToPixels(printWidth, printHeight, printUnit, printDpi);
            targetW = dims.width;
            targetH = dims.height;

          } else if (activeTab === 'social') {
            const preset = SOCIAL_PRESETS.find(p => p.label === socialPreset);
            if (preset) { targetW = preset.width; targetH = preset.height; }
          }

          // ── If target file size mode, use iterative compression ──
          if (targetFileSizeKB !== null) {
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

            const blob = await resizeToTargetFileSize(canvas, targetFileSizeKB, format === 'png' ? 'image/png' : format === 'webp' ? 'image/webp' : 'image/jpeg');
            if (!blob) { reject(new Error('Could not compress to target size')); return; }
            const ext = format === 'jpeg' ? 'jpg' : format;
            const baseName = file.name.replace(/\.[^.]+$/, '');
            const previewUrl = URL.createObjectURL(blob);
            resolve({
              blob,
              previewUrl,
              outputFileName: `${baseName}_resized.${ext}`,
              metadata: {
                'Dimensions': `${targetW}×${targetH}px`,
                'Target Size': targetFileSizeKB >= 1024 ? `${(targetFileSizeKB / 1024).toFixed(1)} MB` : `${targetFileSizeKB} KB`,
                'Format': format.toUpperCase(),
              }
            });
            return;
          }

          // ── Standard canvas resize ──
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

          const mimeType = format === 'jpeg' ? 'image/jpeg' : format === 'png' ? 'image/png' : 'image/webp';
          const q = quality / 100;

          canvas.toBlob((blob) => {
            if (!blob) { reject(new Error('Processing failed')); return; }
            const ext = format === 'jpeg' ? 'jpg' : format;
            const baseName = file.name.replace(/\.[^.]+$/, '');
            const previewUrl = URL.createObjectURL(blob);
            resolve({
              blob,
              previewUrl,
              outputFileName: `${baseName}_resized.${ext}`,
              metadata: {
                'Dimensions': `${targetW}×${targetH}px`,
                'Format': format.toUpperCase(),
                'Quality': `${quality}%`,
              }
            });
          }, mimeType, q);

        } catch (err) {
          reject(err);
        }
      };

      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Failed to load image')); };
      img.src = url;
    });
  }, [
    activeTab,
    easyPreset,
    percentValue, isCustomPercent, customPercent,
    dimPreset, isCustomDim, customWidth, customHeight, dimUnit, maintainAspect,
    fileSizePreset, isCustomFileSize, customFileSizeValue, customFileSizeUnit,
    printWidth, printHeight, printUnit, printDpi,
    socialPreset,
    format, quality,
  ]);

  // ─── Settings Slot ──────────────────────────────────────────────────────────
  const settingsSlot = (
    <div className="space-y-5">
      {/* Mode Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as ResizeTab)}>
        <TabsList className="w-full flex flex-wrap h-auto gap-1 bg-gray-900/60 p-1 rounded-xl mb-4">
          <TabsTrigger value="easy" className="flex-1 min-w-[80px] text-xs sm:text-sm data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg py-2">
            Easy
          </TabsTrigger>
          <TabsTrigger value="percentage" className="flex-1 min-w-[80px] text-xs sm:text-sm data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg py-2">
            Percentage
          </TabsTrigger>
          <TabsTrigger value="dimensions" className="flex-1 min-w-[80px] text-xs sm:text-sm data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg py-2">
            Dimensions
          </TabsTrigger>
          <TabsTrigger value="filesize" className="flex-1 min-w-[80px] text-xs sm:text-sm data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg py-2">
            File Size
          </TabsTrigger>
          <TabsTrigger value="print" className="flex-1 min-w-[80px] text-xs sm:text-sm data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg py-2">
            Print
          </TabsTrigger>
          <TabsTrigger value="social" className="flex-1 min-w-[80px] text-xs sm:text-sm data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg py-2">
            Social
          </TabsTrigger>
        </TabsList>

        {/* ── Easy Resize ── */}
        <TabsContent value="easy" className="mt-0 space-y-4">
          <p className="text-xs text-gray-400">Choose a quick size preset to resize your image instantly.</p>
          <div className="grid grid-cols-3 gap-3">
            {EASY_PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => setEasyPreset(p.label)}
                className={`flex flex-col items-center justify-center gap-1 rounded-xl border-2 py-4 px-2 transition-all min-h-[80px] ${
                  easyPreset === p.label
                    ? 'border-blue-500 bg-blue-600/20 text-blue-300'
                    : 'border-gray-600 bg-gray-800 text-gray-300 hover:border-blue-500/60 hover:bg-gray-700'
                }`}
              >
                <span className="font-semibold text-sm">{p.label}</span>
                <span className="text-xs text-gray-400">{p.width}×{p.height}</span>
              </button>
            ))}
          </div>
          <div className="bg-gray-800/60 rounded-lg px-3 py-2 text-xs text-gray-400">
            Selected: <span className="text-blue-300 font-medium">{easyPreset}</span> — {EASY_PRESETS.find(p => p.label === easyPreset)?.width}×{EASY_PRESETS.find(p => p.label === easyPreset)?.height}px
          </div>
        </TabsContent>

        {/* ── Percentage Resize ── */}
        <TabsContent value="percentage" className="mt-0 space-y-4">
          <p className="text-xs text-gray-400">Scale the image by a percentage of its original dimensions.</p>
          <div className="grid grid-cols-4 gap-2">
            {PERCENT_PRESETS.map((pct) => (
              <button
                key={pct}
                type="button"
                onClick={() => { setPercentValue(pct); setIsCustomPercent(false); }}
                className={`flex items-center justify-center rounded-xl border-2 py-3 font-semibold text-sm transition-all min-h-[48px] ${
                  !isCustomPercent && percentValue === pct
                    ? 'border-blue-500 bg-blue-600/20 text-blue-300'
                    : 'border-gray-600 bg-gray-800 text-gray-300 hover:border-blue-500/60 hover:bg-gray-700'
                }`}
              >
                {pct}%
              </button>
            ))}
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsCustomPercent(true)}
                className={`flex items-center justify-center rounded-xl border-2 px-4 py-2 text-sm font-medium transition-all min-h-[44px] ${
                  isCustomPercent
                    ? 'border-blue-500 bg-blue-600/20 text-blue-300'
                    : 'border-gray-600 bg-gray-800 text-gray-300 hover:border-blue-500/60'
                }`}
              >
                Custom
              </button>
              {isCustomPercent && (
                <div className="flex items-center gap-2 flex-1">
                  <Input
                    type="number"
                    min={1}
                    max={1000}
                    value={customPercent}
                    onChange={(e) => setCustomPercent(Number(e.target.value))}
                    className="flex-1 bg-gray-700 border-gray-600 text-gray-100 min-h-[44px]"
                  />
                  <span className="text-gray-400 text-sm">%</span>
                </div>
              )}
            </div>
          </div>
          <div className="bg-gray-800/60 rounded-lg px-3 py-2 text-xs text-gray-400">
            Scale: <span className="text-blue-300 font-medium">{isCustomPercent ? customPercent : percentValue}%</span> of original size
          </div>
        </TabsContent>

        {/* ── Width × Height Dimensions ── */}
        <TabsContent value="dimensions" className="mt-0 space-y-4">
          <p className="text-xs text-gray-400">Select a common resolution or enter custom dimensions.</p>
          <div className="space-y-2">
            <Label className="text-gray-200 text-sm font-medium">Preset Dimensions</Label>
            <Select value={isCustomDim ? 'custom' : dimPreset} onValueChange={handleDimPresetChange}>
              <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-gray-100 min-h-[44px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                {DIMENSION_PRESETS.map(p => (
                  <SelectItem key={p.label} value={p.label}>{p.label}px</SelectItem>
                ))}
                <SelectItem value="custom">Custom…</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isCustomDim && (
            <>
              <div className="space-y-2">
                <Label className="text-gray-200 text-sm font-medium">Unit</Label>
                <Select value={dimUnit} onValueChange={(v) => setDimUnit(v as Unit)}>
                  <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-gray-100 min-h-[44px]">
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
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-gray-200 text-sm font-medium">Width ({dimUnit})</Label>
                  <Input
                    type="number"
                    min={1}
                    value={customWidth}
                    onChange={(e) => handleCustomWidthChange(Number(e.target.value))}
                    className="bg-gray-700 border-gray-600 text-gray-100 min-h-[44px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-200 text-sm font-medium">Height ({dimUnit})</Label>
                  <Input
                    type="number"
                    min={1}
                    value={customHeight}
                    onChange={(e) => handleCustomHeightChange(Number(e.target.value))}
                    className="bg-gray-700 border-gray-600 text-gray-100 min-h-[44px]"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Switch id="aspect-dim" checked={maintainAspect} onCheckedChange={setMaintainAspect} />
                <Label htmlFor="aspect-dim" className="text-gray-200 text-sm cursor-pointer">Maintain Aspect Ratio</Label>
              </div>
            </>
          )}

          {!isCustomDim && (
            <div className="bg-gray-800/60 rounded-lg px-3 py-2 text-xs text-gray-400">
              Selected: <span className="text-blue-300 font-medium">{dimPreset}</span>
            </div>
          )}
        </TabsContent>

        {/* ── Target File Size ── */}
        <TabsContent value="filesize" className="mt-0 space-y-4">
          <p className="text-xs text-gray-400">Compress the image to fit within a target file size. Dimensions are preserved.</p>
          <div className="grid grid-cols-2 gap-3">
            {FILE_SIZE_PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => { setFileSizePreset(p.sizeKB); setIsCustomFileSize(false); }}
                className={`flex items-center justify-center rounded-xl border-2 py-3 font-semibold text-sm transition-all min-h-[52px] ${
                  !isCustomFileSize && fileSizePreset === p.sizeKB
                    ? 'border-blue-500 bg-blue-600/20 text-blue-300'
                    : 'border-gray-600 bg-gray-800 text-gray-300 hover:border-blue-500/60 hover:bg-gray-700'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => setIsCustomFileSize(true)}
              className={`w-full flex items-center justify-center rounded-xl border-2 py-2 text-sm font-medium transition-all min-h-[44px] ${
                isCustomFileSize
                  ? 'border-blue-500 bg-blue-600/20 text-blue-300'
                  : 'border-gray-600 bg-gray-800 text-gray-300 hover:border-blue-500/60'
              }`}
            >
              Custom Size
            </button>
            {isCustomFileSize && (
              <div className="flex gap-2 mt-2">
                <Input
                  type="number"
                  min={1}
                  value={customFileSizeValue}
                  onChange={(e) => setCustomFileSizeValue(Number(e.target.value))}
                  className="flex-1 bg-gray-700 border-gray-600 text-gray-100 min-h-[44px]"
                />
                <Select value={customFileSizeUnit} onValueChange={(v) => setCustomFileSizeUnit(v as 'KB' | 'MB')}>
                  <SelectTrigger className="w-24 bg-gray-700 border-gray-600 text-gray-100 min-h-[44px]">
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
          <div className="bg-gray-800/60 rounded-lg px-3 py-2 text-xs text-gray-400">
            Target: <span className="text-blue-300 font-medium">
              {isCustomFileSize
                ? `${customFileSizeValue} ${customFileSizeUnit}`
                : FILE_SIZE_PRESETS.find(p => p.sizeKB === fileSizePreset)?.label || `${fileSizePreset} KB`}
            </span>
          </div>
        </TabsContent>

        {/* ── Print Size ── */}
        <TabsContent value="print" className="mt-0 space-y-4">
          <p className="text-xs text-gray-400">Set physical print dimensions and DPI to calculate the exact pixel output.</p>
          <div className="space-y-2">
            <Label className="text-gray-200 text-sm font-medium">Unit</Label>
            <div className="grid grid-cols-3 gap-2">
              {(['mm', 'cm', 'inch'] as PrintUnit[]).map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setPrintUnit(u)}
                  className={`flex items-center justify-center rounded-xl border-2 py-2.5 text-sm font-medium transition-all min-h-[44px] ${
                    printUnit === u
                      ? 'border-blue-500 bg-blue-600/20 text-blue-300'
                      : 'border-gray-600 bg-gray-800 text-gray-300 hover:border-blue-500/60'
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-gray-200 text-sm font-medium">Width ({printUnit})</Label>
              <Input
                type="number"
                min={1}
                step={0.1}
                value={printWidth}
                onChange={(e) => setPrintWidth(Number(e.target.value))}
                className="bg-gray-700 border-gray-600 text-gray-100 min-h-[44px]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-200 text-sm font-medium">Height ({printUnit})</Label>
              <Input
                type="number"
                min={1}
                step={0.1}
                value={printHeight}
                onChange={(e) => setPrintHeight(Number(e.target.value))}
                className="bg-gray-700 border-gray-600 text-gray-100 min-h-[44px]"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-gray-200 text-sm font-medium">DPI (Resolution)</Label>
            <Select value={String(printDpi)} onValueChange={(v) => setPrintDpi(Number(v))}>
              <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-gray-100 min-h-[44px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                {DPI_OPTIONS.map(d => (
                  <SelectItem key={d} value={String(d)}>{d} DPI{d === 72 ? ' (Screen)' : d === 96 ? ' (Web)' : d === 150 ? ' (Draft Print)' : d === 200 ? ' (Good Print)' : ' (High Quality)'}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="bg-gray-800/60 rounded-lg px-3 py-2 text-xs text-gray-400">
            Output pixels: <span className="text-blue-300 font-medium">
              {convertPhysicalToPixels(printWidth, printHeight, printUnit, printDpi).width} × {convertPhysicalToPixels(printWidth, printHeight, printUnit, printDpi).height}px
            </span>
          </div>
        </TabsContent>

        {/* ── Social Media ── */}
        <TabsContent value="social" className="mt-0 space-y-4">
          <p className="text-xs text-gray-400">Resize to exact dimensions for popular social media platforms.</p>
          <div className="space-y-2">
            <Label className="text-gray-200 text-sm font-medium">Platform & Format</Label>
            <Select value={socialPreset} onValueChange={setSocialPreset}>
              <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-gray-100 min-h-[44px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600 max-h-72">
                {['Instagram', 'Facebook', 'YouTube', 'X (Twitter)', 'TikTok', 'LinkedIn', 'Pinterest', 'Snap', 'Tumblr'].map(platform => (
                  <React.Fragment key={platform}>
                    <SelectItem value={`__group_${platform}`} disabled className="text-gray-500 text-xs font-semibold uppercase tracking-wider py-1 cursor-default">
                      ── {platform} ──
                    </SelectItem>
                    {SOCIAL_PRESETS.filter(p => p.platform === platform).map(p => (
                      <SelectItem key={p.label} value={p.label} className="pl-4">
                        {p.label} ({p.width}×{p.height})
                      </SelectItem>
                    ))}
                  </React.Fragment>
                ))}
              </SelectContent>
            </Select>
          </div>
          {(() => {
            const found = SOCIAL_PRESETS.find(p => p.label === socialPreset);
            return found ? (
              <div className="bg-gray-800/60 rounded-lg px-4 py-3 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Platform</span>
                  <span className="text-sm font-medium text-blue-300">{found.platform}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Dimensions</span>
                  <span className="text-sm font-medium text-gray-100">{found.width} × {found.height}px</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Aspect Ratio</span>
                  <span className="text-sm font-medium text-gray-100">
                    {(() => {
                      const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
                      const g = gcd(found.width, found.height);
                      return `${found.width / g}:${found.height / g}`;
                    })()}
                  </span>
                </div>
              </div>
            ) : null;
          })()}
          {/* Quick-select grid for popular platforms */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Instagram Post', short: 'IG Post' },
              { label: 'Facebook Post', short: 'FB Post' },
              { label: 'YouTube Thumbnail', short: 'YT Thumb' },
              { label: 'X (Twitter) Post', short: 'X Post' },
            ].map(({ label, short }) => (
              <button
                key={label}
                type="button"
                onClick={() => setSocialPreset(label)}
                className={`flex items-center justify-center rounded-xl border-2 py-2 text-xs font-medium transition-all min-h-[44px] ${
                  socialPreset === label
                    ? 'border-blue-500 bg-blue-600/20 text-blue-300'
                    : 'border-gray-600 bg-gray-800 text-gray-300 hover:border-blue-500/60'
                }`}
              >
                {short}
              </button>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* ── Output Format & Quality (shared) ── */}
      <div className="border-t border-gray-700 pt-4 space-y-4">
        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Output Settings</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label className="text-gray-200 text-sm font-medium">Format</Label>
            <Select value={format} onValueChange={(v) => setFormat(v as 'jpeg' | 'png' | 'webp')}>
              <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-gray-100 min-h-[44px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="jpeg">JPEG</SelectItem>
                <SelectItem value="png">PNG</SelectItem>
                <SelectItem value="webp">WebP</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-gray-200 text-sm font-medium flex justify-between">
              <span>Quality</span>
              <span className="text-blue-400 font-semibold">{quality}%</span>
            </Label>
            <input
              type="range"
              min={1}
              max={100}
              step={1}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full h-2 rounded-full accent-blue-500 cursor-pointer mt-3"
              disabled={activeTab === 'filesize'}
            />
            {activeTab === 'filesize' && (
              <p className="text-xs text-gray-500">Quality is auto-adjusted for target file size.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <SEO
        title="Custom Image Resize Online Free - Advanced Preset Resizer"
        description="Resize images with 6 preset modes: Easy, Percentage, Dimensions, Target File Size, Print Size, and Social Media presets for Instagram, Facebook, YouTube, Twitter, TikTok, LinkedIn, Pinterest, Snap, and Tumblr."
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
          <p className="text-gray-400">
            Resize images with 6 powerful modes — Easy, Percentage, Dimensions, Target File Size, Print Size, and Social Media presets.
            Select your options, click <strong className="text-blue-400">Apply &amp; Preview</strong>, then download.
          </p>
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

        {/* Mode descriptions */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: '⚡', title: 'Easy Resize', desc: 'One-click Small (640×480), Medium (1280×960), or Large (1920×1440) presets.' },
            { icon: '📐', title: 'Percentage Resize', desc: 'Scale to 25%, 40%, 50%, 75% or any custom percentage of the original.' },
            { icon: '📏', title: 'Dimensions', desc: 'Pick from HD/4K presets or enter exact width × height in px, cm, mm, or inches.' },
            { icon: '💾', title: 'Target File Size', desc: 'Auto-compress to 100 KB, 500 KB, 1 MB, 2 MB, or a custom size.' },
            { icon: '🖨️', title: 'Print Size', desc: 'Enter physical dimensions in mm, cm, or inches with DPI for print-ready output.' },
            { icon: '📱', title: 'Social Media', desc: 'Exact dimensions for Instagram, Facebook, YouTube, X, TikTok, LinkedIn, Pinterest, Snap, Tumblr.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-gray-800/60 rounded-xl border border-gray-700 p-4">
              <div className="text-2xl mb-2">{icon}</div>
              <h3 className="text-sm font-semibold text-gray-100 mb-1">{title}</h3>
              <p className="text-xs text-gray-400">{desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CustomImageResizePage;
