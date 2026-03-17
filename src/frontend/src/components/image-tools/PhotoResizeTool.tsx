import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import type React from "react";
import { useCallback, useRef, useState } from "react";
import AdvancedToolShell, { type ProcessingResult } from "../AdvancedToolShell";

export interface PhotoPreset {
  label: string;
  width: number;
  height: number;
  unit: "px" | "cm" | "mm" | "inches";
  maxSizeKB?: number;
  dpi?: number;
}

interface PhotoResizeToolProps {
  toolTitle: string;
  presets: PhotoPreset[];
  defaultPresetIndex?: number;
  onNavigate?: (page: string) => void;
}

type Unit = "px" | "cm" | "mm" | "inches";

const toPx = (value: number, unit: Unit, dpi = 96): number => {
  switch (unit) {
    case "px":
      return Math.max(1, Math.round(value));
    case "cm":
      return Math.max(1, Math.round((value * dpi) / 2.54));
    case "mm":
      return Math.max(1, Math.round((value * dpi) / 25.4));
    case "inches":
      return Math.max(1, Math.round(value * dpi));
    default:
      return Math.max(1, Math.round(value));
  }
};

const fromPx = (px: number, unit: Unit, dpi = 96): number => {
  switch (unit) {
    case "px":
      return px;
    case "cm":
      return Number.parseFloat(((px * 2.54) / dpi).toFixed(2));
    case "mm":
      return Number.parseFloat(((px * 25.4) / dpi).toFixed(1));
    case "inches":
      return Number.parseFloat((px / dpi).toFixed(2));
    default:
      return px;
  }
};

/**
 * Compress a blob iteratively to fit within maxSizeKB.
 * Reduces quality in steps until the size target is met or minimum quality is reached.
 */
const compressToTargetSize = (
  canvas: HTMLCanvasElement,
  mimeType: string,
  maxSizeBytes: number,
  startQuality: number,
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    let q = Math.min(startQuality / 100, 0.92);
    const minQ = 0.05;

    const tryCompress = () => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Canvas toBlob returned null"));
            return;
          }
          if (blob.size <= maxSizeBytes || q <= minQ) {
            resolve(blob);
          } else {
            q = Math.max(minQ, q - 0.08);
            tryCompress();
          }
        },
        mimeType,
        q,
      );
    };
    tryCompress();
  });
};

/**
 * Draw image onto canvas using "cover" mode: scales to fill the target dimensions
 * and center-crops, so the image is never distorted (like object-fit: cover).
 */
const drawCoverFit = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  targetW: number,
  targetH: number,
) => {
  const imgAspect = img.naturalWidth / img.naturalHeight;
  const canvasAspect = targetW / targetH;

  let sx = 0;
  let sy = 0;
  let sWidth = img.naturalWidth;
  let sHeight = img.naturalHeight;

  if (imgAspect > canvasAspect) {
    // Image is wider than target — crop left/right
    sWidth = Math.round(img.naturalHeight * canvasAspect);
    sx = Math.round((img.naturalWidth - sWidth) / 2);
  } else {
    // Image is taller than target — crop top/bottom
    sHeight = Math.round(img.naturalWidth / canvasAspect);
    sy = Math.round((img.naturalHeight - sHeight) / 2);
  }

  ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, targetW, targetH);
};

const PhotoResizeTool: React.FC<PhotoResizeToolProps> = ({
  toolTitle,
  presets,
  defaultPresetIndex = 0,
}) => {
  const [selectedPreset, setSelectedPreset] = useState<string>(
    presets[defaultPresetIndex]?.label || "custom",
  );
  const [unit, setUnit] = useState<Unit>("px");
  const [width, setWidth] = useState<number>(
    presets[defaultPresetIndex]?.width || 200,
  );
  const [height, setHeight] = useState<number>(
    presets[defaultPresetIndex]?.height || 200,
  );
  const [maintainAspect, setMaintainAspect] = useState(false);
  const [quality, setQuality] = useState(90);
  const [format, setFormat] = useState<"jpeg" | "png">("jpeg");
  const [targetSizeEnabled, setTargetSizeEnabled] = useState(false);
  const [targetSize, setTargetSize] = useState(100);
  const [targetSizeUnit, setTargetSizeUnit] = useState<"KB" | "MB">("KB");
  // Use a ref to track aspect ratio so the processing function always sees the latest value
  const aspectRatioRef = useRef<number | null>(null);
  const [aspectRatioDisplay, setAspectRatioDisplay] = useState<number | null>(
    null,
  );

  const handlePresetChange = (label: string) => {
    setSelectedPreset(label);
    if (label === "custom") return;
    const preset = presets.find((p) => p.label === label);
    if (!preset) return;
    const dpi = preset.dpi || 96;
    if (unit === "px") {
      setWidth(preset.width);
      setHeight(preset.height);
    } else {
      setWidth(fromPx(preset.width, unit, dpi));
      setHeight(fromPx(preset.height, unit, dpi));
    }
    if (preset.maxSizeKB) {
      setTargetSizeEnabled(true);
      setTargetSize(preset.maxSizeKB);
      setTargetSizeUnit("KB");
    }
  };

  const handleWidthChange = (val: number) => {
    setWidth(val);
    if (maintainAspect && aspectRatioRef.current) {
      setHeight(Number.parseFloat((val / aspectRatioRef.current).toFixed(2)));
    }
  };

  const handleHeightChange = (val: number) => {
    setHeight(val);
    if (maintainAspect && aspectRatioRef.current) {
      setWidth(Number.parseFloat((val * aspectRatioRef.current).toFixed(2)));
    }
  };

  const processingFunction = useCallback(
    async (file: File): Promise<ProcessingResult> => {
      return new Promise((resolve, reject) => {
        // Validate file type early
        if (!file.type.startsWith("image/")) {
          reject(
            new Error(
              "Unsupported file type. Please upload a JPEG, PNG, or WebP image.",
            ),
          );
          return;
        }

        const img = new Image();
        const url = URL.createObjectURL(file);

        img.onerror = () => {
          URL.revokeObjectURL(url);
          reject(
            new Error(
              "Failed to load image. The file may be corrupted or in an unsupported format.",
            ),
          );
        };

        img.onload = async () => {
          URL.revokeObjectURL(url);

          // Record aspect ratio in ref (for live UI) and in state (for display)
          const aspect = img.naturalWidth / img.naturalHeight;
          aspectRatioRef.current = aspect;
          setAspectRatioDisplay(aspect);

          const dpi = 96;
          const targetW = toPx(width, unit, dpi);
          const targetH = toPx(height, unit, dpi);

          if (targetW < 1 || targetH < 1) {
            reject(
              new Error(
                "Invalid dimensions. Width and height must be at least 1px.",
              ),
            );
            return;
          }

          const canvas = document.createElement("canvas");
          canvas.width = targetW;
          canvas.height = targetH;
          const ctx = canvas.getContext("2d");

          if (!ctx) {
            reject(new Error("Canvas is not supported in this browser."));
            return;
          }

          // Always fill with white background (required for passport/document photos)
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, targetW, targetH);

          // Use cover-fit: center-crop to fill target dimensions without distortion
          drawCoverFit(ctx, img, targetW, targetH);

          const mimeType = `image/${format}`;
          const ext = format === "jpeg" ? "jpg" : "png";
          const baseName = file.name.replace(/\.[^.]+$/, "");
          const outputFileName = `${baseName}_${targetW}x${targetH}.${ext}`;

          try {
            let blob: Blob;

            if (targetSizeEnabled) {
              const maxBytes =
                targetSizeUnit === "MB"
                  ? targetSize * 1024 * 1024
                  : targetSize * 1024;
              blob = await compressToTargetSize(
                canvas,
                mimeType,
                maxBytes,
                quality,
              );
            } else {
              blob = await new Promise<Blob>((res, rej) => {
                canvas.toBlob(
                  (b) => {
                    if (b) res(b);
                    else
                      rej(
                        new Error(
                          "Failed to create image blob. Please try a different format.",
                        ),
                      );
                  },
                  mimeType,
                  quality / 100,
                );
              });
            }

            const previewUrl = URL.createObjectURL(blob);
            resolve({
              blob,
              previewUrl,
              outputFileName,
              metadata: {
                Dimensions: `${targetW}×${targetH}px`,
                Format: format.toUpperCase(),
                Quality: targetSizeEnabled
                  ? `Target ≤${targetSize}${targetSizeUnit}`
                  : `${quality}%`,
              },
            });
          } catch (err) {
            reject(
              err instanceof Error
                ? err
                : new Error("Image processing failed. Please try again."),
            );
          }
        };

        img.src = url;
      });
    },
    [
      width,
      height,
      unit,
      format,
      quality,
      targetSizeEnabled,
      targetSize,
      targetSizeUnit,
    ],
  );

  // Suppress unused warning — aspectRatioDisplay is used for reactive re-renders
  void aspectRatioDisplay;

  const settingsSlot = (
    <div className="space-y-5">
      {/* Preset Selector */}
      <div className="space-y-2">
        <Label className="text-gray-200 text-sm font-medium">Preset</Label>
        <Select value={selectedPreset} onValueChange={handlePresetChange}>
          <SelectTrigger
            className="w-full bg-gray-700 border-gray-600 text-gray-100"
            data-ocid="photo_resize.preset.select"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-600">
            {presets.map((p) => (
              <SelectItem key={p.label} value={p.label}>
                {p.label} ({p.width}×{p.height}
                {p.unit}
                {p.maxSizeKB ? `, max ${p.maxSizeKB}KB` : ""})
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
          <Label className="text-gray-200 text-sm font-medium">
            Width ({unit})
          </Label>
          <Input
            type="number"
            min={1}
            value={width}
            onChange={(e) => handleWidthChange(Number(e.target.value))}
            className="bg-gray-700 border-gray-600 text-gray-100"
            data-ocid="photo_resize.width.input"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-gray-200 text-sm font-medium">
            Height ({unit})
          </Label>
          <Input
            type="number"
            min={1}
            value={height}
            onChange={(e) => handleHeightChange(Number(e.target.value))}
            className="bg-gray-700 border-gray-600 text-gray-100"
            data-ocid="photo_resize.height.input"
          />
        </div>
      </div>

      {/* Maintain Aspect Ratio */}
      <div className="flex items-center gap-3">
        <Switch
          id="aspect-ratio"
          checked={maintainAspect}
          onCheckedChange={(checked) => {
            setMaintainAspect(checked);
            // When enabling, lock in the current image aspect ratio
            if (checked && aspectRatioRef.current) {
              // Recalculate height from current width
              setHeight(
                Number.parseFloat((width / aspectRatioRef.current).toFixed(2)),
              );
            }
          }}
          data-ocid="photo_resize.aspect_ratio.switch"
        />
        <Label
          htmlFor="aspect-ratio"
          className="text-gray-200 text-sm cursor-pointer"
        >
          Maintain Aspect Ratio
          {maintainAspect && aspectRatioRef.current && (
            <span className="text-gray-500 text-xs ml-2">
              ({aspectRatioRef.current.toFixed(2)}:1)
            </span>
          )}
        </Label>
      </div>

      {/* Output Format */}
      <div className="space-y-2">
        <Label className="text-gray-200 text-sm font-medium">
          Output Format
        </Label>
        <Select
          value={format}
          onValueChange={(v) => setFormat(v as "jpeg" | "png")}
        >
          <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-gray-100">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-600">
            <SelectItem value="jpeg">JPEG (recommended for photos)</SelectItem>
            <SelectItem value="png">PNG</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Quality */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label className="text-gray-200 text-sm font-medium">Quality</Label>
          <span className="text-blue-400 font-semibold text-sm">
            {quality}%
          </span>
        </div>
        <Slider
          min={1}
          max={100}
          step={1}
          value={[quality]}
          onValueChange={([v]) => setQuality(v)}
          className="w-full"
          data-ocid="photo_resize.quality.toggle"
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
            data-ocid="photo_resize.target_size.checkbox"
          />
          <Label
            htmlFor="target-size-photo"
            className="text-gray-200 text-sm font-medium cursor-pointer"
          >
            Target File Size
          </Label>
          {targetSizeEnabled && (
            <span className="text-blue-400 text-xs">
              (will auto-adjust quality)
            </span>
          )}
        </div>
        {targetSizeEnabled && (
          <div className="flex gap-2 mt-2">
            <Input
              type="number"
              min={1}
              value={targetSize}
              onChange={(e) => setTargetSize(Number(e.target.value))}
              className="flex-1 bg-gray-700 border-gray-600 text-gray-100"
              data-ocid="photo_resize.target_size.input"
            />
            <Select
              value={targetSizeUnit}
              onValueChange={(v) => setTargetSizeUnit(v as "KB" | "MB")}
            >
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
      // Do NOT pass outputFileName — let the dynamic name from processingFunction be used
    />
  );
};

export default PhotoResizeTool;
