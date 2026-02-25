import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Lock } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Props {
  uploadedFile: File;
  processedCanvas: HTMLCanvasElement | null;
  onProcessed: (canvas: HTMLCanvasElement) => void;
  onProcessingStart: () => void;
  isProUser?: boolean;
  onUpgradeClick?: () => void;
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

function applyWhiteBackground(canvas: HTMLCanvasElement): HTMLCanvasElement {
  const out = document.createElement('canvas');
  out.width = canvas.width;
  out.height = canvas.height;
  const ctx = out.getContext('2d')!;
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, out.width, out.height);
  ctx.drawImage(canvas, 0, 0);

  // Flood-fill near-white/transparent border pixels
  const imageData = ctx.getImageData(0, 0, out.width, out.height);
  const data = imageData.data;
  const threshold = 240;

  const isNearWhiteOrTransparent = (idx: number) => {
    const a = data[idx + 3];
    if (a < 30) return true;
    const r = data[idx], g = data[idx + 1], b = data[idx + 2];
    return r > threshold && g > threshold && b > threshold;
  };

  const fill = (x: number, y: number) => {
    const stack = [[x, y]];
    const visited = new Set<number>();
    while (stack.length) {
      const [cx, cy] = stack.pop()!;
      if (cx < 0 || cy < 0 || cx >= out.width || cy >= out.height) continue;
      const idx = (cy * out.width + cx) * 4;
      if (visited.has(idx)) continue;
      if (!isNearWhiteOrTransparent(idx)) continue;
      visited.add(idx);
      data[idx] = 255; data[idx + 1] = 255; data[idx + 2] = 255; data[idx + 3] = 255;
      stack.push([cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]);
    }
  };

  // Fill from all four corners
  fill(0, 0);
  fill(out.width - 1, 0);
  fill(0, out.height - 1);
  fill(out.width - 1, out.height - 1);

  ctx.putImageData(imageData, 0, 0);
  return out;
}

async function compressToKB(canvas: HTMLCanvasElement, maxKB: number): Promise<HTMLCanvasElement> {
  return new Promise((resolve) => {
    let quality = 0.95;
    const attempt = () => {
      canvas.toBlob((blob) => {
        if (!blob || blob.size <= maxKB * 1024 || quality <= 0.1) {
          resolve(canvas);
          return;
        }
        quality = Math.max(0.1, quality - 0.05);
        attempt();
      }, 'image/jpeg', quality);
    };
    attempt();
  });
}

function createMultiCopyCanvas(canvas: HTMLCanvasElement): HTMLCanvasElement {
  // A4 at 300 DPI: 2480 x 3508 px
  const A4_W = 2480;
  const A4_H = 3508;
  const GUTTER = 20;
  const COLS = 2;
  const ROWS = 2;

  const cellW = Math.floor((A4_W - GUTTER * (COLS + 1)) / COLS);
  const cellH = Math.floor((A4_H - GUTTER * (ROWS + 1)) / ROWS);

  const out = document.createElement('canvas');
  out.width = A4_W;
  out.height = A4_H;
  const ctx = out.getContext('2d')!;
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, A4_W, A4_H);

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const x = GUTTER + col * (cellW + GUTTER);
      const y = GUTTER + row * (cellH + GUTTER);
      ctx.drawImage(canvas, x, y, cellW, cellH);
    }
  }

  return out;
}

const COMPRESS_PRESETS = ['20', '50', '100', '200'];

export default function AutoFeaturesPanel({
  uploadedFile,
  processedCanvas,
  onProcessed,
  onProcessingStart,
  isProUser = true,
  onUpgradeClick,
}: Props) {
  const [whiteBackground, setWhiteBackground] = useState(false);
  const [compressEnabled, setCompressEnabled] = useState(false);
  const [compressKB, setCompressKB] = useState('100');
  const [multiCopy, setMultiCopy] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApply = useCallback(async () => {
    setIsProcessing(true);
    onProcessingStart();

    try {
      // Start from processedCanvas if available, else load from file
      let canvas: HTMLCanvasElement;
      if (processedCanvas) {
        const out = document.createElement('canvas');
        out.width = processedCanvas.width;
        out.height = processedCanvas.height;
        out.getContext('2d')!.drawImage(processedCanvas, 0, 0);
        canvas = out;
      } else {
        const img = await loadImageFromFile(uploadedFile);
        canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        canvas.getContext('2d')!.drawImage(img, 0, 0);
      }

      // 1. White background
      if (whiteBackground) {
        canvas = applyWhiteBackground(canvas);
      }

      // 2. Compress
      if (compressEnabled) {
        canvas = await compressToKB(canvas, parseInt(compressKB));
      }

      // 3. Multi-copy layout (Pro only — guard in case called directly)
      if (multiCopy && isProUser) {
        canvas = createMultiCopyCanvas(canvas);
      }

      onProcessed(canvas);
    } catch (err) {
      console.error('Enhancement error:', err);
    } finally {
      setIsProcessing(false);
    }
  }, [processedCanvas, uploadedFile, whiteBackground, compressEnabled, compressKB, multiCopy, isProUser, onProcessed, onProcessingStart]);

  const anyEnabled = whiteBackground || compressEnabled || (multiCopy && isProUser);

  return (
    <div className="space-y-4">
      {/* Feature toggles */}
      <div className="space-y-3">
        {/* White Background */}
        <label className="flex items-start gap-3 p-3 rounded-lg border border-border bg-muted/20 cursor-pointer hover:bg-muted/40 transition-colors">
          <input
            type="checkbox"
            checked={whiteBackground}
            onChange={(e) => setWhiteBackground(e.target.checked)}
            className="mt-0.5 rounded"
          />
          <div>
            <p className="text-sm font-medium text-foreground">Auto White Background</p>
            <p className="text-xs text-muted-foreground">Replace transparent or near-white borders with solid white</p>
          </div>
        </label>

        {/* Center Crop Guide (visual only) */}
        <div className="flex items-start gap-3 p-3 rounded-lg border border-border bg-muted/20">
          <div className="mt-0.5 w-4 h-4 rounded border-2 border-primary/40 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-primary/40" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Auto Center Crop Guide</p>
            <p className="text-xs text-muted-foreground">
              Toggle the crop guide overlay in the Preview panel using the{' '}
              <span className="font-medium text-primary">Crop</span> button above
            </p>
          </div>
        </div>

        {/* Compress */}
        <label className="flex items-start gap-3 p-3 rounded-lg border border-border bg-muted/20 cursor-pointer hover:bg-muted/40 transition-colors">
          <input
            type="checkbox"
            checked={compressEnabled}
            onChange={(e) => setCompressEnabled(e.target.checked)}
            className="mt-0.5 rounded"
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Auto Compress to KB</p>
            <p className="text-xs text-muted-foreground mb-2">Reduce file size to target KB</p>
            {compressEnabled && (
              <Select value={compressKB} onValueChange={setCompressKB}>
                <SelectTrigger className="h-7 text-xs w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COMPRESS_PRESETS.map((kb) => (
                    <SelectItem key={kb} value={kb}>{kb} KB</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </label>

        {/* Multi-copy — Pro gated */}
        {isProUser ? (
          <label className="flex items-start gap-3 p-3 rounded-lg border border-border bg-muted/20 cursor-pointer hover:bg-muted/40 transition-colors">
            <input
              type="checkbox"
              checked={multiCopy}
              onChange={(e) => setMultiCopy(e.target.checked)}
              className="mt-0.5 rounded"
            />
            <div>
              <p className="text-sm font-medium text-foreground">Multi-Copy Layout (4 photos on A4)</p>
              <p className="text-xs text-muted-foreground">Arrange 4 copies on A4 300 DPI canvas (2480×3508 px)</p>
            </div>
          </label>
        ) : (
          <div
            className="relative flex items-start gap-3 p-3 rounded-lg border border-border bg-muted/20 cursor-pointer"
            style={{ filter: 'blur(1.5px)', opacity: 0.7 }}
            onClick={onUpgradeClick}
            title="Pro feature — click to upgrade"
          >
            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/10 z-10">
              <div className="bg-amber-500 rounded-full p-1.5 shadow-lg">
                <Lock className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
            <input
              type="checkbox"
              checked={false}
              readOnly
              className="mt-0.5 rounded pointer-events-none"
            />
            <div>
              <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                Multi-Copy Layout (4 photos on A4)
                <span className="text-xs bg-amber-500 text-white px-1.5 py-0.5 rounded-full font-bold">PRO</span>
              </p>
              <p className="text-xs text-muted-foreground">Arrange 4 copies on A4 300 DPI canvas (2480×3508 px)</p>
            </div>
          </div>
        )}
      </div>

      <Button
        onClick={handleApply}
        disabled={isProcessing || !anyEnabled}
        className="w-full"
        size="sm"
      >
        {isProcessing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
        Apply & Preview
      </Button>
    </div>
  );
}
