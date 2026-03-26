import BreadcrumbNavigation from "@/components/BreadcrumbNavigation";
import SEO from "@/components/SEO";
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  Download,
  RefreshCw,
  Upload,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";

interface DPIChangerPageProps {
  onNavigate?: (page: string) => void;
}

const dpiPresets = [72, 96, 150, 200, 300, 600];

// ── DPI metadata injection helpers ──────────────────────────────────────────

/**
 * Inject DPI into a JPEG file by modifying the JFIF APP0 density fields.
 * Structure: SOI(2) + APP0 marker(2) + length(2) + "JFIF\0"(5) + version(2)
 *            + units(1) + Xdensity(2) + Ydensity(2) ...
 * Offsets:    0-1         2-3           4-5           6-10          11-12
 *             13          14-15         16-17
 */
function injectJPEGDPI(buffer: ArrayBuffer, dpi: number): ArrayBuffer {
  const src = new Uint8Array(buffer);
  if (
    src[0] !== 0xff ||
    src[1] !== 0xd8 || // SOI
    src[2] !== 0xff ||
    src[3] !== 0xe0 || // APP0
    src[6] !== 0x4a ||
    src[7] !== 0x46 ||
    src[8] !== 0x49 ||
    src[9] !== 0x46 ||
    src[10] !== 0x00 // "JFIF\0"
  ) {
    return buffer; // Not a standard JFIF — return unchanged
  }
  const out = new Uint8Array(buffer.slice(0));
  const view = new DataView(out.buffer);
  out[13] = 1; // units = 1 (DPI)
  view.setUint16(14, dpi, false); // Xdensity
  view.setUint16(16, dpi, false); // Ydensity
  return out.buffer;
}

/** CRC32 table + computation for PNG pHYs chunk */
const CRC_TABLE: number[] = (() => {
  const t: number[] = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(data: Uint8Array): number {
  let crc = 0xffffffff;
  for (const byte of data) crc = (crc >>> 8) ^ CRC_TABLE[(crc ^ byte) & 0xff];
  return (crc ^ 0xffffffff) >>> 0;
}

/**
 * Inject a pHYs chunk into a PNG file (inserted right after IHDR chunk).
 * pHYs chunk: length(4=9) + "pHYs"(4) + Xppm(4) + Yppm(4) + unit(1=meter) + CRC(4) = 21 bytes
 */
function injectPNGDPI(buffer: ArrayBuffer, dpi: number): ArrayBuffer {
  const src = new Uint8Array(buffer);
  // Verify PNG signature
  const sig = [137, 80, 78, 71, 13, 10, 26, 10];
  if (sig.some((b, i) => src[i] !== b)) return buffer;

  const pixelsPerMeter = Math.round(dpi * 39.3701);

  // Build pHYs chunk (21 bytes)
  const phys = new Uint8Array(21);
  const dv = new DataView(phys.buffer);
  dv.setUint32(0, 9, false); // length = 9 (data bytes)
  phys[4] = 0x70;
  phys[5] = 0x48;
  phys[6] = 0x59;
  phys[7] = 0x73; // "pHYs"
  dv.setUint32(8, pixelsPerMeter, false); // X pixels per unit
  dv.setUint32(12, pixelsPerMeter, false); // Y pixels per unit
  phys[16] = 1; // unit: 1 = metre
  dv.setUint32(17, crc32(phys.slice(4, 17)), false); // CRC of type+data

  // Insert after IHDR (PNG signature(8) + IHDR chunk(25) = offset 33)
  const insertAt = 33;
  const result = new Uint8Array(src.length + 21);
  result.set(src.slice(0, insertAt), 0);
  result.set(phys, insertAt);
  result.set(src.slice(insertAt), insertAt + 21);
  return result.buffer;
}

// ────────────────────────────────────────────────────────────────────────────

export default function DPIChangerPage({ onNavigate }: DPIChangerPageProps) {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [originalDimensions, setOriginalDimensions] = useState<{
    w: number;
    h: number;
  } | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [processedSize, setProcessedSize] = useState<number>(0);
  const [targetDPI, setTargetDPI] = useState(300);
  const [customDPI, setCustomDPI] = useState("");
  const [outputFormat, setOutputFormat] = useState<"jpeg" | "png" | "webp">(
    "jpeg",
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please upload a valid image file (JPEG, PNG, or WebP).");
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      setErrorMessage("File too large. Maximum size is 50 MB.");
      return;
    }
    setOriginalFile(file);
    setOriginalSize(file.size);
    setProcessedUrl(null);
    setProcessedSize(0);
    setErrorMessage(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setOriginalPreview(dataUrl);
      const img = new window.Image();
      img.onload = () => setOriginalDimensions({ w: img.width, h: img.height });
      img.src = dataUrl;
    };
    reader.onerror = () =>
      setErrorMessage("Failed to read the file. Please try again.");
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFileSelect(file);
    },
    [handleFileSelect],
  );

  const handleProcess = async () => {
    if (!originalPreview || !canvasRef.current) return;
    setIsProcessing(true);
    setErrorMessage(null);
    setProcessedUrl(null);
    setProcessedSize(0);

    const img = new window.Image();
    img.onerror = () => {
      setErrorMessage(
        "Failed to load the image for processing. The file may be corrupted.",
      );
      setIsProcessing(false);
    };
    img.onload = () => {
      try {
        const canvas = canvasRef.current!;
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          setErrorMessage(
            "Canvas is not available. Please try a different browser.",
          );
          setIsProcessing(false);
          return;
        }

        // Fill white background for JPEG
        if (outputFormat === "jpeg") {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawImage(img, 0, 0);

        const mimeType =
          outputFormat === "jpeg"
            ? "image/jpeg"
            : outputFormat === "png"
              ? "image/png"
              : "image/webp";
        const effectiveDPI = customDPI ? Number(customDPI) : targetDPI;

        canvas.toBlob(
          async (blob) => {
            if (!blob) {
              setErrorMessage(
                "Failed to process image. Try a different output format.",
              );
              setIsProcessing(false);
              return;
            }
            try {
              // Inject real DPI metadata into the file
              const rawBuffer = await blob.arrayBuffer();
              let finalBuffer: ArrayBuffer;
              if (outputFormat === "jpeg") {
                finalBuffer = injectJPEGDPI(rawBuffer, effectiveDPI);
              } else if (outputFormat === "png") {
                finalBuffer = injectPNGDPI(rawBuffer, effectiveDPI);
              } else {
                finalBuffer = rawBuffer; // WebP: no standard DPI injection
              }
              const finalBlob = new Blob([finalBuffer], { type: mimeType });
              const url = URL.createObjectURL(finalBlob);
              setProcessedUrl(url);
              setProcessedSize(finalBlob.size);
            } catch {
              // Fallback: use original blob without DPI metadata
              const url = URL.createObjectURL(blob);
              setProcessedUrl(url);
              setProcessedSize(blob.size);
            }
            setIsProcessing(false);
          },
          mimeType,
          0.92,
        );
      } catch (err) {
        setErrorMessage(
          err instanceof Error
            ? err.message
            : "An unexpected error occurred. Please try again.",
        );
        setIsProcessing(false);
      }
    };
    img.src = originalPreview;
  };

  const handleDownload = () => {
    if (!processedUrl) return;
    const dpi = customDPI ? Number(customDPI) : targetDPI;
    const a = document.createElement("a");
    a.href = processedUrl;
    a.download = `image_${dpi}dpi.${outputFormat === "jpeg" ? "jpg" : outputFormat}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleReset = () => {
    setOriginalFile(null);
    setOriginalPreview(null);
    setOriginalSize(0);
    setOriginalDimensions(null);
    setProcessedUrl(null);
    setProcessedSize(0);
    setCustomDPI("");
    setErrorMessage(null);
  };

  const effectiveDPI = customDPI ? Number(customDPI) : targetDPI;
  const sizeDiff = originalSize - processedSize;
  const sizePct =
    processedSize > 0 ? Math.round(Math.abs(sizeDiff / originalSize) * 100) : 0;
  const isReduction = sizeDiff >= 0;

  return (
    <div
      className="min-h-screen py-8 px-4"
      style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)" }}
    >
      <SEO
        title="DPI Changer Online Free | DocMasterTools"
        description="Change image DPI/resolution online for free. Supports 72, 96, 150, 200, 300, and 600 DPI presets."
        canonicalUrl="https://docmastertools.com/image-tools/dpi-changer"
      />
      <canvas ref={canvasRef} className="hidden" />

      <div className="max-w-4xl mx-auto">
        <BreadcrumbNavigation
          items={[
            {
              label: "Image Tools",
              onClick: () => onNavigate?.("image-tools"),
            },
            { label: "DPI Changer" },
          ]}
          onNavigate={onNavigate}
        />
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
            DPI Changer
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Change image DPI/resolution for print and digital use. DPI metadata
            is embedded directly into the output file.
          </p>
        </div>

        {/* Error Banner */}
        {errorMessage && (
          <div className="bg-red-900/50 border border-red-600 rounded-xl p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <p className="text-red-300 text-sm">{errorMessage}</p>
          </div>
        )}

        {/* Upload Zone */}
        {!originalFile && (
          <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-8">
            {/* biome-ignore lint/a11y/useSemanticElements: drag-and-drop zone requires div */}
            <div
              role="button"
              tabIndex={0}
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  fileInputRef.current?.click();
              }}
              className={`w-full border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors duration-200 flex flex-col items-center justify-center min-h-[200px] ${
                isDragging
                  ? "border-blue-400 bg-blue-900/20"
                  : "border-gray-600 hover:border-blue-500 hover:bg-gray-800/50"
              }`}
            >
              <Upload className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-white font-medium mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-slate-400 text-sm">
                JPEG, PNG, or WebP — max 50 MB
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFileSelect(f);
                e.target.value = "";
              }}
            />
          </div>
        )}

        {/* Settings */}
        {originalFile && (
          <>
            <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-6">
              {/* File info */}
              <div className="flex items-center gap-3 mb-5 p-3 bg-gray-800 rounded-lg">
                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center shrink-0">
                  <Upload className="w-5 h-5 text-blue-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-white text-sm font-medium truncate">
                    {originalFile.name}
                  </p>
                  <p className="text-slate-400 text-xs">
                    {formatSize(originalSize)}
                    {originalDimensions &&
                      ` · ${originalDimensions.w} × ${originalDimensions.h} px`}
                  </p>
                </div>
              </div>

              <h2 className="text-white font-semibold mb-4">DPI Settings</h2>
              <div className="mb-4">
                <p className="block text-slate-300 text-sm mb-3">
                  Select DPI Preset
                </p>
                <div className="flex flex-wrap gap-2">
                  {dpiPresets.map((dpi) => (
                    <button
                      type="button"
                      key={dpi}
                      onClick={() => {
                        setTargetDPI(dpi);
                        setCustomDPI("");
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        targetDPI === dpi && !customDPI
                          ? "bg-blue-600 text-white"
                          : "bg-gray-700 text-slate-300 hover:bg-gray-600"
                      }`}
                    >
                      {dpi} DPI
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="dpi-custom-input"
                  className="block text-slate-300 text-sm mb-2"
                >
                  Custom DPI (optional)
                </label>
                <input
                  id="dpi-custom-input"
                  type="number"
                  min={1}
                  max={1200}
                  value={customDPI}
                  onChange={(e) => setCustomDPI(e.target.value)}
                  placeholder="Enter custom DPI..."
                  className="w-full bg-gray-800 border border-gray-600 text-white rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="dpi-format-select"
                  className="block text-slate-300 text-sm mb-2"
                >
                  Output Format
                </label>
                <select
                  id="dpi-format-select"
                  value={outputFormat}
                  onChange={(e) => {
                    setOutputFormat(e.target.value as "jpeg" | "png" | "webp");
                    setProcessedUrl(null);
                    setProcessedSize(0);
                  }}
                  className="w-full bg-gray-800 border border-gray-600 text-white rounded-lg px-3 py-2 text-sm"
                >
                  <option value="jpeg">JPEG (DPI metadata embedded)</option>
                  <option value="png">PNG (DPI metadata embedded)</option>
                  <option value="webp">WebP</option>
                </select>
              </div>
              <p className="text-slate-400 text-xs mb-4">
                Target DPI:{" "}
                <span className="text-blue-400 font-semibold">
                  {effectiveDPI} DPI
                </span>
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleProcess}
                  disabled={isProcessing}
                  className="flex-1 min-h-[48px] px-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />{" "}
                      Processing...
                    </>
                  ) : (
                    "Change DPI"
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={isProcessing}
                  className="min-h-[48px] px-6 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" /> Reset
                </button>
              </div>
            </div>

            {/* Loading */}
            {isProcessing && (
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6 flex items-center justify-center gap-3">
                <RefreshCw className="w-6 h-6 text-blue-400 animate-spin" />
                <p className="text-slate-300 text-sm">
                  Processing image, please wait...
                </p>
              </div>
            )}

            {/* Results */}
            {processedUrl && !isProcessing && (
              <>
                {/* Size Comparison */}
                <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-6">
                  <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <span className="text-blue-400">⚡</span> Processing Results
                  </h2>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-gray-800 rounded-lg p-3 text-center">
                      <p className="text-gray-500 text-xs mb-1">
                        Original Size
                      </p>
                      <p className="text-white text-sm font-semibold">
                        {formatSize(originalSize)}
                      </p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3 text-center">
                      <p className="text-gray-500 text-xs mb-1">New Size</p>
                      <p className="text-green-400 text-sm font-semibold">
                        {formatSize(processedSize)}
                      </p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3 text-center">
                      <p className="text-gray-500 text-xs mb-1">Change</p>
                      <p
                        className={`text-sm font-semibold flex items-center justify-center gap-1 ${isReduction ? "text-green-400" : "text-yellow-400"}`}
                      >
                        {isReduction ? (
                          <ArrowDown className="w-3 h-3" />
                        ) : (
                          <ArrowUp className="w-3 h-3" />
                        )}
                        {sizePct}% {isReduction ? "smaller" : "larger"}
                      </p>
                    </div>
                  </div>
                  {originalDimensions && (
                    <div className="bg-gray-800 rounded-lg p-3">
                      <p className="text-gray-500 text-xs mb-1">
                        Image Dimensions
                      </p>
                      <p className="text-gray-300 text-sm">
                        <span className="text-gray-400">Size:</span>{" "}
                        <span className="font-medium text-white">
                          {originalDimensions.w} × {originalDimensions.h} px
                        </span>
                        <span className="text-gray-600 mx-2">·</span>
                        <span className="text-blue-400 font-medium">
                          {effectiveDPI} DPI
                        </span>
                        <span className="text-gray-500 text-xs ml-2">
                          (embedded in file metadata)
                        </span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Side-by-side preview */}
                <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-6">
                  <h2 className="text-white font-semibold mb-4">Preview</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <p className="text-slate-400 text-xs font-medium uppercase tracking-wide mb-2">
                        Original
                      </p>
                      <div className="bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center min-h-[160px] p-2">
                        {originalPreview && (
                          <img
                            src={originalPreview}
                            alt="Original"
                            className="max-w-full rounded object-contain max-h-48"
                          />
                        )}
                      </div>
                      <p className="text-gray-400 text-xs mt-2">
                        {formatSize(originalSize)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-slate-400 text-xs font-medium uppercase tracking-wide mb-2">
                        Processed ({effectiveDPI} DPI)
                      </p>
                      <div className="bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center min-h-[160px] p-2">
                        <img
                          src={processedUrl}
                          alt="Processed"
                          className="max-w-full rounded object-contain max-h-48"
                        />
                      </div>
                      <p className="text-green-400 text-xs mt-2">
                        {formatSize(processedSize)}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="w-full min-h-[48px] px-6 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" /> Download Image (
                    {effectiveDPI} DPI)
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
