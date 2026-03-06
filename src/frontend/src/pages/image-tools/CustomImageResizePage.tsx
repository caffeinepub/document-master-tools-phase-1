import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type React from "react";
import { useCallback, useState } from "react";
import AdvancedToolShell, {
  type ProcessingResult,
} from "../../components/AdvancedToolShell";
import BreadcrumbNavigation from "../../components/BreadcrumbNavigation";
import SEO from "../../components/SEO";
import {
  convertPhysicalToPixels,
  resizeToTargetFileSize,
} from "../../lib/imageProcessing";

// ─── Types ────────────────────────────────────────────────────────────────────
type ResizeTab =
  | "easy"
  | "percentage"
  | "dimensions"
  | "filesize"
  | "print"
  | "social";

// ─── Social Media Presets ─────────────────────────────────────────────────────
const SOCIAL_PRESETS = [
  { label: "Instagram Post", platform: "Instagram", width: 1080, height: 1080 },
  {
    label: "Instagram Story",
    platform: "Instagram",
    width: 1080,
    height: 1920,
  },
  { label: "Facebook Post", platform: "Facebook", width: 1200, height: 630 },
  { label: "Facebook Cover", platform: "Facebook", width: 820, height: 312 },
  { label: "YouTube Thumbnail", platform: "YouTube", width: 1280, height: 720 },
  {
    label: "YouTube Channel Art",
    platform: "YouTube",
    width: 2560,
    height: 1440,
  },
  {
    label: "X (Twitter) Post",
    platform: "X (Twitter)",
    width: 1200,
    height: 675,
  },
  {
    label: "X (Twitter) Header",
    platform: "X (Twitter)",
    width: 1500,
    height: 500,
  },
  {
    label: "TikTok Video Cover",
    platform: "TikTok",
    width: 1080,
    height: 1920,
  },
  {
    label: "LinkedIn Personal Banner",
    platform: "LinkedIn",
    width: 1584,
    height: 396,
  },
  {
    label: "LinkedIn Company Banner",
    platform: "LinkedIn",
    width: 1128,
    height: 191,
  },
  { label: "Pinterest Pin", platform: "Pinterest", width: 1000, height: 1500 },
  { label: "Snap Story", platform: "Snap", width: 1080, height: 1920 },
  { label: "Tumblr Post", platform: "Tumblr", width: 500, height: 750 },
];

// ─── Easy Presets ─────────────────────────────────────────────────────────────
const EASY_PRESETS = [
  { label: "Small (640×480)", width: 640, height: 480 },
  { label: "Medium (1280×960)", width: 1280, height: 960 },
  { label: "Large (1920×1440)", width: 1920, height: 1440 },
];

// ─── Dimension Presets ────────────────────────────────────────────────────────
const DIMENSION_PRESETS = [
  { label: "800 × 600", width: 800, height: 600 },
  { label: "1280 × 720 (HD)", width: 1280, height: 720 },
  { label: "1920 × 1080 (Full HD)", width: 1920, height: 1080 },
  { label: "2560 × 1440 (2K)", width: 2560, height: 1440 },
  { label: "3840 × 2160 (4K)", width: 3840, height: 2160 },
];

// ─── Component ────────────────────────────────────────────────────────────────
const CustomImageResizePage: React.FC<{
  onNavigate?: (page: string) => void;
}> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<ResizeTab>("easy");

  // Easy
  const [easyPreset, setEasyPreset] = useState<string>("Medium (1280×960)");

  // Percentage
  const [percentValue, setPercentValue] = useState<number>(50);

  // Dimensions
  const [dimPreset, setDimPreset] = useState<string>("1920 × 1080 (Full HD)");
  const [isCustomDim, setIsCustomDim] = useState(false);
  const [customWidth, setCustomWidth] = useState<number>(1920);
  const [customHeight, setCustomHeight] = useState<number>(1080);
  const [maintainAspect, setMaintainAspect] = useState(true);

  // File Size
  const [fileSizePreset, setFileSizePreset] = useState<number>(500);
  const [isCustomFileSize, setIsCustomFileSize] = useState(false);
  const [customFileSizeValue, setCustomFileSizeValue] = useState<number>(500);
  const [customFileSizeUnit, setCustomFileSizeUnit] = useState<"KB" | "MB">(
    "KB",
  );

  // Print
  const [printWidth, setPrintWidth] = useState<number>(210);
  const [printHeight, setPrintHeight] = useState<number>(297);
  const [printUnit, setPrintUnit] = useState<"mm" | "cm" | "inch">("mm");
  const [printDpi, setPrintDpi] = useState<number>(300);

  // Social
  const [socialPreset, setSocialPreset] = useState<string>("Instagram Post");

  // Output
  const [format, setFormat] = useState<"jpeg" | "png" | "webp">("jpeg");
  const [quality, setQuality] = useState(90);

  // ─── Processing Function ────────────────────────────────────────────────────
  const processingFunction = useCallback(
    async (file: File): Promise<ProcessingResult> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(file);

        img.onload = async () => {
          URL.revokeObjectURL(url);
          const origW = img.naturalWidth;
          const origH = img.naturalHeight;

          try {
            let targetW = origW;
            let targetH = origH;
            let targetFileSizeKB: number | null = null;

            if (activeTab === "easy") {
              const preset = EASY_PRESETS.find((p) => p.label === easyPreset);
              if (preset) {
                targetW = preset.width;
                targetH = preset.height;
              }
            } else if (activeTab === "percentage") {
              targetW = Math.round((origW * percentValue) / 100);
              targetH = Math.round((origH * percentValue) / 100);
            } else if (activeTab === "dimensions") {
              if (isCustomDim) {
                targetW = customWidth;
                targetH = maintainAspect
                  ? Math.round(customWidth * (origH / origW))
                  : customHeight;
              } else {
                const preset = DIMENSION_PRESETS.find(
                  (p) => p.label === dimPreset,
                );
                if (preset) {
                  targetW = preset.width;
                  targetH = preset.height;
                }
              }
            } else if (activeTab === "filesize") {
              targetW = origW;
              targetH = origH;
              if (isCustomFileSize) {
                const multiplier = customFileSizeUnit === "MB" ? 1024 : 1;
                targetFileSizeKB = customFileSizeValue * multiplier;
              } else {
                targetFileSizeKB = fileSizePreset;
              }
            } else if (activeTab === "print") {
              // convertPhysicalToPixels(width, height, unit, dpi) returns ImageDimensions
              const dims = convertPhysicalToPixels(
                printWidth,
                printHeight,
                printUnit,
                printDpi,
              );
              targetW = dims.width;
              targetH = dims.height;
            } else if (activeTab === "social") {
              const preset = SOCIAL_PRESETS.find(
                (p) => p.label === socialPreset,
              );
              if (preset) {
                targetW = preset.width;
                targetH = preset.height;
              }
            }

            const canvas = document.createElement("canvas");
            canvas.width = targetW;
            canvas.height = targetH;
            const ctx = canvas.getContext("2d");
            if (!ctx) {
              reject(new Error("Canvas not supported"));
              return;
            }

            if (format === "jpeg") {
              ctx.fillStyle = "#ffffff";
              ctx.fillRect(0, 0, targetW, targetH);
            }
            ctx.drawImage(img, 0, 0, targetW, targetH);

            // File size mode: use iterative compression
            if (targetFileSizeKB !== null) {
              const mimeType =
                format === "png"
                  ? "image/png"
                  : format === "webp"
                    ? "image/webp"
                    : "image/jpeg";
              const blob = await resizeToTargetFileSize(
                canvas,
                targetFileSizeKB,
                mimeType,
              );
              if (!blob) {
                reject(new Error("Could not compress to target size"));
                return;
              }
              const ext = format === "jpeg" ? "jpg" : format;
              const baseName = file.name.replace(/\.[^.]+$/, "");
              const outputFileName = `${baseName}_${targetFileSizeKB}kb.${ext}`;
              const previewUrl = URL.createObjectURL(blob);
              resolve({
                blob,
                previewUrl,
                outputFileName,
                metadata: {
                  Dimensions: `${targetW}×${targetH}px`,
                  "Target Size": `${targetFileSizeKB}KB`,
                  "Actual Size": `${(blob.size / 1024).toFixed(1)}KB`,
                  Format: format.toUpperCase(),
                },
              });
              return;
            }

            // Standard resize
            const mimeType =
              format === "png"
                ? "image/png"
                : format === "webp"
                  ? "image/webp"
                  : "image/jpeg";
            canvas.toBlob(
              (blob) => {
                if (!blob) {
                  reject(new Error("Processing failed"));
                  return;
                }
                const ext = format === "jpeg" ? "jpg" : format;
                const baseName = file.name.replace(/\.[^.]+$/, "");
                const outputFileName = `${baseName}_resized.${ext}`;
                const previewUrl = URL.createObjectURL(blob);
                resolve({
                  blob,
                  previewUrl,
                  outputFileName,
                  metadata: {
                    Dimensions: `${targetW}×${targetH}px`,
                    Format: format.toUpperCase(),
                    Quality: `${quality}%`,
                  },
                });
              },
              mimeType,
              quality / 100,
            );
          } catch (err) {
            reject(err);
          }
        };
        img.onerror = () => {
          URL.revokeObjectURL(url);
          reject(new Error("Failed to load image"));
        };
        img.src = url;
      });
    },
    [
      activeTab,
      easyPreset,
      percentValue,
      isCustomDim,
      customWidth,
      customHeight,
      maintainAspect,
      dimPreset,
      fileSizePreset,
      isCustomFileSize,
      customFileSizeValue,
      customFileSizeUnit,
      printWidth,
      printHeight,
      printUnit,
      printDpi,
      socialPreset,
      format,
      quality,
    ],
  );

  const tabs: { id: ResizeTab; label: string }[] = [
    { id: "easy", label: "Easy" },
    { id: "percentage", label: "Percentage" },
    { id: "dimensions", label: "Dimensions" },
    { id: "filesize", label: "File Size" },
    { id: "print", label: "Print Size" },
    { id: "social", label: "Social Media" },
  ];

  const settingsSlot = (
    <div className="space-y-5">
      {/* Tab Selector */}
      <div className="space-y-2">
        <Label className="text-gray-200 text-sm font-medium">Resize Mode</Label>
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors min-h-[36px] ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700/60 text-slate-300 hover:bg-gray-600/60"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Easy Mode */}
      {activeTab === "easy" && (
        <div className="space-y-2">
          <Label className="text-gray-200 text-sm font-medium">
            Size Preset
          </Label>
          <Select value={easyPreset} onValueChange={setEasyPreset}>
            <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-gray-100">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              {EASY_PRESETS.map((p) => (
                <SelectItem key={p.label} value={p.label}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Percentage Mode */}
      {activeTab === "percentage" && (
        <div className="space-y-3">
          <Label className="text-gray-200 text-sm font-medium">
            Percentage: {percentValue}%
          </Label>
          <div className="flex flex-wrap gap-2">
            {[25, 40, 50, 75].map((p) => (
              <button
                type="button"
                key={p}
                onClick={() => setPercentValue(p)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors min-h-[36px] ${
                  percentValue === p
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700/60 text-slate-300 hover:bg-gray-600/60"
                }`}
              >
                {p}%
              </button>
            ))}
          </div>
          <Input
            type="number"
            min={1}
            max={500}
            value={percentValue}
            onChange={(e) => setPercentValue(Number(e.target.value))}
            className="bg-gray-700 border-gray-600 text-gray-100"
            placeholder="Custom %"
          />
        </div>
      )}

      {/* Dimensions Mode */}
      {activeTab === "dimensions" && (
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-gray-200 text-sm font-medium">Preset</Label>
            <Select
              value={isCustomDim ? "custom" : dimPreset}
              onValueChange={(v) => {
                if (v === "custom") {
                  setIsCustomDim(true);
                } else {
                  setIsCustomDim(false);
                  setDimPreset(v);
                  const found = DIMENSION_PRESETS.find((p) => p.label === v);
                  if (found) {
                    setCustomWidth(found.width);
                    setCustomHeight(found.height);
                  }
                }
              }}
            >
              <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-gray-100">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                {DIMENSION_PRESETS.map((p) => (
                  <SelectItem key={p.label} value={p.label}>
                    {p.label}
                  </SelectItem>
                ))}
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {isCustomDim && (
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-gray-200 text-xs">Width (px)</Label>
                <Input
                  type="number"
                  min={1}
                  value={customWidth}
                  onChange={(e) => setCustomWidth(Number(e.target.value))}
                  className="bg-gray-700 border-gray-600 text-gray-100"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-gray-200 text-xs">Height (px)</Label>
                <Input
                  type="number"
                  min={1}
                  value={customHeight}
                  onChange={(e) => setCustomHeight(Number(e.target.value))}
                  disabled={maintainAspect}
                  className="bg-gray-700 border-gray-600 text-gray-100 disabled:opacity-50"
                />
              </div>
            </div>
          )}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={maintainAspect}
              onChange={(e) => setMaintainAspect(e.target.checked)}
              className="accent-blue-500"
            />
            <span className="text-gray-200 text-sm">Maintain aspect ratio</span>
          </label>
        </div>
      )}

      {/* File Size Mode */}
      {activeTab === "filesize" && (
        <div className="space-y-3">
          <Label className="text-gray-200 text-sm font-medium">
            Target File Size
          </Label>
          <div className="flex flex-wrap gap-2">
            {[100, 500, 1024, 2048].map((kb) => (
              <button
                type="button"
                key={kb}
                onClick={() => {
                  setFileSizePreset(kb);
                  setIsCustomFileSize(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors min-h-[36px] ${
                  !isCustomFileSize && fileSizePreset === kb
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700/60 text-slate-300 hover:bg-gray-600/60"
                }`}
              >
                {kb >= 1024 ? `${kb / 1024}MB` : `${kb}KB`}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              type="number"
              min={1}
              value={customFileSizeValue}
              onChange={(e) => {
                setCustomFileSizeValue(Number(e.target.value));
                setIsCustomFileSize(true);
              }}
              className="flex-1 bg-gray-700 border-gray-600 text-gray-100"
              placeholder="Custom size"
            />
            <Select
              value={customFileSizeUnit}
              onValueChange={(v) => setCustomFileSizeUnit(v as "KB" | "MB")}
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
        </div>
      )}

      {/* Print Size Mode */}
      {activeTab === "print" && (
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-gray-200 text-sm font-medium">Unit</Label>
            <Select
              value={printUnit}
              onValueChange={(v) => setPrintUnit(v as "mm" | "cm" | "inch")}
            >
              <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-gray-100">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="mm">Millimeters (mm)</SelectItem>
                <SelectItem value="cm">Centimeters (cm)</SelectItem>
                <SelectItem value="inch">Inches</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-gray-200 text-xs">
                Width ({printUnit})
              </Label>
              <Input
                type="number"
                min={1}
                value={printWidth}
                onChange={(e) => setPrintWidth(Number(e.target.value))}
                className="bg-gray-700 border-gray-600 text-gray-100"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-gray-200 text-xs">
                Height ({printUnit})
              </Label>
              <Input
                type="number"
                min={1}
                value={printHeight}
                onChange={(e) => setPrintHeight(Number(e.target.value))}
                className="bg-gray-700 border-gray-600 text-gray-100"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-gray-200 text-sm font-medium">DPI</Label>
            <Select
              value={String(printDpi)}
              onValueChange={(v) => setPrintDpi(Number(v))}
            >
              <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-gray-100">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                {[72, 96, 150, 200, 300, 600].map((d) => (
                  <SelectItem key={d} value={String(d)}>
                    {d} DPI
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Social Media Mode */}
      {activeTab === "social" && (
        <div className="space-y-2">
          <Label className="text-gray-200 text-sm font-medium">
            Platform Preset
          </Label>
          <Select value={socialPreset} onValueChange={setSocialPreset}>
            <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-gray-100">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              {SOCIAL_PRESETS.map((p) => (
                <SelectItem key={p.label} value={p.label}>
                  {p.label} ({p.width}×{p.height})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Output Format */}
      <div className="space-y-2">
        <Label className="text-gray-200 text-sm font-medium">
          Output Format
        </Label>
        <Select
          value={format}
          onValueChange={(v) => setFormat(v as "jpeg" | "png" | "webp")}
        >
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
      {format !== "png" && activeTab !== "filesize" && (
        <div className="space-y-2">
          <Label className="text-gray-200 text-sm font-medium">
            Quality: {quality}%
          </Label>
          <input
            type="range"
            min={1}
            max={100}
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <SEO
        title="Custom Image Resize - Resize Images Online Free"
        description="Resize images by percentage, dimensions, file size, print size, or social media presets. Free online image resizer with before/after preview."
        canonicalUrl="https://docmastertools.com/custom-image-resize"
      />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <BreadcrumbNavigation
          items={[
            { label: "Home", onClick: () => onNavigate?.("home") },
            {
              label: "Image Tools",
              onClick: () => onNavigate?.("image-tools"),
            },
            { label: "Custom Image Resize" },
          ]}
        />
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">
            Custom Image Resize
          </h1>
          <p className="text-gray-400">
            Resize images by dimensions, percentage, file size, print size, or
            social media presets.
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
      </main>
    </div>
  );
};

export default CustomImageResizePage;
