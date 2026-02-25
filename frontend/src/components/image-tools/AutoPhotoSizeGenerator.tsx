import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Download, ChevronDown, ChevronUp } from 'lucide-react';

interface Preset {
  id: string;
  label: string;
  width: number;
  height: number;
  maxKB: number;
  dpi: number;
  note?: string;
}

const PRESETS: Preset[] = [
  { id: 'passport', label: 'Passport', width: 413, height: 531, maxKB: 200, dpi: 300, note: '35×45 mm @ 300 DPI' },
  { id: 'aadhaar', label: 'Aadhaar', width: 200, height: 200, maxKB: 50, dpi: 200, note: '200×200 px, 50 KB' },
  { id: 'pan', label: 'PAN Card', width: 200, height: 230, maxKB: 50, dpi: 200, note: '200×230 px, 50 KB' },
  { id: 'ssc', label: 'SSC Exam', width: 300, height: 400, maxKB: 100, dpi: 200, note: '300×400 px, 100 KB' },
  { id: 'railway', label: 'Railway', width: 300, height: 400, maxKB: 100, dpi: 200, note: '300×400 px, 100 KB' },
  { id: 'police', label: 'Police/Army', width: 300, height: 400, maxKB: 100, dpi: 200, note: '300×400 px, 100 KB' },
  { id: 'us-visa', label: 'US Visa', width: 600, height: 600, maxKB: 240, dpi: 300, note: '600×600 px, 240 KB' },
  { id: 'uk-visa', label: 'UK Visa', width: 354, height: 472, maxKB: 50, dpi: 300, note: '354×472 px, 50 KB' },
  { id: 'canada-visa', label: 'Canada Visa', width: 420, height: 540, maxKB: 200, dpi: 300, note: '420×540 px, 200 KB' },
  { id: 'signature', label: 'Signature', width: 140, height: 60, maxKB: 30, dpi: 100, note: '140×60 px, 30 KB' },
];

interface Props {
  uploadedFile: File;
  onProcessed: (canvas: HTMLCanvasElement) => void;
  onProcessingStart: () => void;
}

async function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Failed to load image')); };
    img.src = url;
  });
}

async function resizeToCanvas(img: HTMLImageElement, width: number, height: number): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(img, 0, 0, width, height);
  return canvas;
}

async function compressCanvas(canvas: HTMLCanvasElement, maxKB: number): Promise<HTMLCanvasElement> {
  return new Promise((resolve) => {
    let quality = 0.95;
    const tryCompress = () => {
      canvas.toBlob((blob) => {
        if (!blob) { resolve(canvas); return; }
        if (blob.size <= maxKB * 1024 || quality <= 0.1) {
          resolve(canvas);
        } else {
          quality -= 0.05;
          const newCanvas = document.createElement('canvas');
          newCanvas.width = canvas.width;
          newCanvas.height = canvas.height;
          const ctx = newCanvas.getContext('2d')!;
          const img = new Image();
          const url = URL.createObjectURL(blob);
          img.onload = () => {
            URL.revokeObjectURL(url);
            ctx.drawImage(img, 0, 0);
            canvas = newCanvas;
            tryCompress();
          };
          img.src = url;
        }
      }, 'image/jpeg', quality);
    };
    tryCompress();
  });
}

export default function AutoPhotoSizeGenerator({ uploadedFile, onProcessed, onProcessingStart }: Props) {
  const [selectedPreset, setSelectedPreset] = useState<string>('');
  const [customMode, setCustomMode] = useState(false);
  const [targetKB, setTargetKB] = useState('100');
  const [targetWidth, setTargetWidth] = useState('300');
  const [targetHeight, setTargetHeight] = useState('400');
  const [dpi, setDpi] = useState('200');
  const [maintainAspect, setMaintainAspect] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [outputInfo, setOutputInfo] = useState<{ width: number; height: number; kb: string } | null>(null);
  const [originalInfo, setOriginalInfo] = useState<{ width: number; height: number; kb: string } | null>(null);

  const selectPreset = (preset: Preset) => {
    setSelectedPreset(preset.id);
    setTargetWidth(String(preset.width));
    setTargetHeight(String(preset.height));
    setTargetKB(String(preset.maxKB));
    setDpi(String(preset.dpi));
    setCustomMode(false);
  };

  const handleWidthChange = (val: string) => {
    setTargetWidth(val);
    if (maintainAspect && originalInfo) {
      const ratio = originalInfo.height / originalInfo.width;
      setTargetHeight(String(Math.round(Number(val) * ratio)));
    }
  };

  const handleHeightChange = (val: string) => {
    setTargetHeight(val);
    if (maintainAspect && originalInfo) {
      const ratio = originalInfo.width / originalInfo.height;
      setTargetWidth(String(Math.round(Number(val) * ratio)));
    }
  };

  const handleProcess = useCallback(async () => {
    const w = parseInt(targetWidth);
    const h = parseInt(targetHeight);
    const kb = parseInt(targetKB);
    if (!w || !h || !kb) return;

    setIsProcessing(true);
    onProcessingStart();

    try {
      const img = await loadImageFromFile(uploadedFile);
      setOriginalInfo({
        width: img.naturalWidth,
        height: img.naturalHeight,
        kb: (uploadedFile.size / 1024).toFixed(1),
      });

      let canvas = await resizeToCanvas(img, w, h);
      canvas = await compressCanvas(canvas, kb);

      canvas.toBlob((blob) => {
        if (blob) {
          setOutputInfo({ width: w, height: h, kb: (blob.size / 1024).toFixed(1) });
        }
      }, 'image/jpeg', 0.92);

      onProcessed(canvas);
    } catch (err) {
      console.error('Processing error:', err);
    } finally {
      setIsProcessing(false);
    }
  }, [uploadedFile, targetWidth, targetHeight, targetKB, onProcessed, onProcessingStart]);

  const handleDownload = useCallback(async () => {
    const w = parseInt(targetWidth);
    const h = parseInt(targetHeight);
    const kb = parseInt(targetKB);
    if (!w || !h || !kb) return;

    setIsProcessing(true);
    try {
      const img = await loadImageFromFile(uploadedFile);
      let canvas = await resizeToCanvas(img, w, h);
      canvas = await compressCanvas(canvas, kb);

      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const baseName = uploadedFile.name.replace(/\.[^.]+$/, '');
        a.download = `${baseName}-resized.jpg`;
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }, 'image/jpeg', 0.92);
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setIsProcessing(false);
    }
  }, [uploadedFile, targetWidth, targetHeight, targetKB]);

  return (
    <div className="space-y-4">
      {/* Preset Grid */}
      <div>
        <p className="text-sm font-medium text-foreground mb-2">Government Presets</p>
        <div className="grid grid-cols-2 gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => selectPreset(preset)}
              className={`text-left px-3 py-2 rounded-lg border text-xs transition-all ${
                selectedPreset === preset.id
                  ? 'border-primary bg-primary/10 text-primary font-semibold'
                  : 'border-border bg-muted/30 text-foreground hover:border-primary/50 hover:bg-muted'
              }`}
            >
              <div className="font-medium">{preset.label}</div>
              <div className="text-muted-foreground mt-0.5">{preset.note}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Mode Toggle */}
      <button
        onClick={() => setCustomMode((v) => !v)}
        className="flex items-center gap-2 text-sm text-primary font-medium hover:underline"
      >
        {customMode ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        Custom Mode
      </button>

      {customMode && (
        <div className="space-y-3 p-4 bg-muted/30 rounded-lg border border-border">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs mb-1 block">Width (px)</Label>
              <Input
                type="number"
                value={targetWidth}
                onChange={(e) => handleWidthChange(e.target.value)}
                className="h-8 text-sm"
              />
            </div>
            <div>
              <Label className="text-xs mb-1 block">Height (px)</Label>
              <Input
                type="number"
                value={targetHeight}
                onChange={(e) => handleHeightChange(e.target.value)}
                className="h-8 text-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs mb-1 block">Target KB</Label>
              <Input
                type="number"
                value={targetKB}
                onChange={(e) => setTargetKB(e.target.value)}
                className="h-8 text-sm"
              />
            </div>
            <div>
              <Label className="text-xs mb-1 block">DPI</Label>
              <Select value={dpi} onValueChange={setDpi}>
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100">100 DPI</SelectItem>
                  <SelectItem value="200">200 DPI</SelectItem>
                  <SelectItem value="300">300 DPI</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={maintainAspect}
              onChange={(e) => setMaintainAspect(e.target.checked)}
              className="rounded"
            />
            <span className="text-foreground">Maintain aspect ratio</span>
          </label>
        </div>
      )}

      {/* Info display */}
      {(originalInfo || outputInfo) && (
        <div className="grid grid-cols-2 gap-3 text-xs">
          {originalInfo && (
            <div className="bg-muted/30 rounded-lg p-3 border border-border">
              <p className="font-semibold text-muted-foreground mb-1">Input</p>
              <p className="text-foreground">{originalInfo.width} × {originalInfo.height} px</p>
              <p className="text-foreground">{originalInfo.kb} KB</p>
            </div>
          )}
          {outputInfo && (
            <div className="bg-primary/5 rounded-lg p-3 border border-primary/20">
              <p className="font-semibold text-primary mb-1">Output</p>
              <p className="text-foreground">{outputInfo.width} × {outputInfo.height} px</p>
              <p className="text-foreground">{outputInfo.kb} KB</p>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button
          onClick={handleProcess}
          disabled={isProcessing || (!selectedPreset && !customMode)}
          className="flex-1"
          size="sm"
        >
          {isProcessing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
          Apply & Preview
        </Button>
        <Button
          variant="outline"
          onClick={handleDownload}
          disabled={isProcessing || (!selectedPreset && !customMode)}
          size="sm"
        >
          <Download className="w-4 h-4 mr-1" />
          Download
        </Button>
      </div>
    </div>
  );
}
