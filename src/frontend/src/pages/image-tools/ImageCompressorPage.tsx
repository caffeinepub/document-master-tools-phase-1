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

interface ImageCompressorPageProps {
  onNavigate?: (page: string) => void;
}

export default function ImageCompressorPage({
  onNavigate,
}: ImageCompressorPageProps) {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState(80);
  const [outputFormat, setOutputFormat] = useState<"jpeg" | "png" | "webp">(
    "jpeg",
  );
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [originalDimensions, setOriginalDimensions] = useState<{
    w: number;
    h: number;
  } | null>(null);
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
      setErrorMessage("Please select a valid image file (JPEG, PNG, or WebP).");
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      setErrorMessage(
        "File size exceeds 50 MB. Please choose a smaller image.",
      );
      return;
    }
    setOriginalFile(file);
    setOriginalSize(file.size);
    setCompressedUrl(null);
    setCompressedSize(0);
    setErrorMessage(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setOriginalPreview(dataUrl);
      const img = new window.Image();
      img.onload = () => setOriginalDimensions({ w: img.width, h: img.height });
      img.src = dataUrl;
    };
    reader.onerror = () => {
      setErrorMessage("Failed to read the selected file. Please try again.");
    };
    reader.readAsDataURL(file);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
    // Reset input so the same file can be re-selected
    e.target.value = "";
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFileSelect(files[0]);
      }
    },
    [handleFileSelect],
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleCompress = () => {
    if (!originalFile || !originalPreview || !canvasRef.current) {
      setErrorMessage("Please upload an image first.");
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);
    setCompressedUrl(null);
    setCompressedSize(0);

    const img = new window.Image();

    img.onload = () => {
      try {
        const canvas = canvasRef.current!;
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          setErrorMessage("Canvas context unavailable. Please try again.");
          setIsProcessing(false);
          return;
        }

        // Fill white background for JPEG (no transparency support)
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

        const qualityValue = outputFormat === "png" ? undefined : quality / 100;

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              setErrorMessage(
                "Compression failed: could not generate output. Try a different format.",
              );
              setIsProcessing(false);
              return;
            }
            setCompressedSize(blob.size);
            // Revoke previous URL if any
            setCompressedUrl((prev) => {
              if (prev) URL.revokeObjectURL(prev);
              return URL.createObjectURL(blob);
            });
            setIsProcessing(false);
          },
          mimeType,
          qualityValue,
        );
      } catch (err) {
        console.error("Compression error:", err);
        setErrorMessage(
          "An unexpected error occurred during compression. Please try again.",
        );
        setIsProcessing(false);
      }
    };

    img.onerror = () => {
      setErrorMessage(
        "Failed to load the image for processing. The file may be corrupted.",
      );
      setIsProcessing(false);
    };

    img.src = originalPreview;
  };

  const handleDownload = () => {
    if (!compressedUrl) return;
    const a = document.createElement("a");
    a.href = compressedUrl;
    const baseName = originalFile?.name.replace(/\.[^.]+$/, "") ?? "image";
    a.download = `${baseName}-compressed.${outputFormat}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleReset = () => {
    if (compressedUrl) URL.revokeObjectURL(compressedUrl);
    setOriginalFile(null);
    setOriginalPreview(null);
    setCompressedUrl(null);
    setOriginalSize(0);
    setCompressedSize(0);
    setOriginalDimensions(null);
    setErrorMessage(null);
    setQuality(80);
    setOutputFormat("jpeg");
  };

  const sizeDiff = originalSize - compressedSize;
  const sizePct =
    compressedSize > 0
      ? Math.round(Math.abs(sizeDiff / originalSize) * 100)
      : 0;
  const isReduction = sizeDiff >= 0;

  return (
    <div
      className="min-h-screen py-8 px-4"
      style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)" }}
    >
      <SEO
        title="Image Compressor Online Free | DocMasterTools"
        description="Compress images online for free without losing quality. Supports JPEG, PNG, and WebP formats."
        canonicalUrl="https://docmastertools.com/image-tools/image-compressor"
      />
      {/* Hidden canvas for processing — not focusable, purely offscreen */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      <div className="max-w-4xl mx-auto">
        <BreadcrumbNavigation
          items={[
            {
              label: "Image Tools",
              onClick: () => onNavigate?.("image-tools"),
            },
            { label: "Image Compressor" },
          ]}
          onNavigate={onNavigate}
        />

        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Image Compressor
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Compress images without visible quality loss. Supports JPEG, PNG,
            and WebP formats. All processing is done in your browser.
          </p>
        </div>

        {/* Error Banner */}
        {errorMessage && (
          <div
            data-ocid="compressor.error_state"
            className="bg-red-900/50 border border-red-600 rounded-xl p-4 mb-6 flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <p className="text-red-300 text-sm">{errorMessage}</p>
          </div>
        )}

        {/* Upload Zone */}
        {!originalFile && (
          <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-8">
            <button
              type="button"
              data-ocid="compressor.dropzone"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`w-full border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors duration-200 flex flex-col items-center justify-center min-h-[200px] bg-transparent ${
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
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/*"
              className="hidden"
              onChange={handleInputChange}
              data-ocid="compressor.upload_button"
            />
          </div>
        )}

        {/* Settings + Actions */}
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
                    Original: {formatSize(originalSize)}
                    {originalDimensions &&
                      ` · ${originalDimensions.w} × ${originalDimensions.h} px`}
                  </p>
                </div>
              </div>

              <h2 className="text-white font-semibold mb-4">
                Compression Settings
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <div>
                  <label
                    htmlFor="compress-format-select"
                    className="block text-slate-300 text-sm mb-2"
                  >
                    Output Format
                  </label>
                  <select
                    id="compress-format-select"
                    data-ocid="compressor.select"
                    value={outputFormat}
                    onChange={(e) => {
                      setOutputFormat(
                        e.target.value as "jpeg" | "png" | "webp",
                      );
                      setCompressedUrl(null);
                      setCompressedSize(0);
                      setErrorMessage(null);
                    }}
                    className="w-full bg-gray-800 border border-gray-600 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="jpeg">JPEG (best for photos)</option>
                    <option value="png">PNG (lossless)</option>
                    <option value="webp">WebP (modern, smallest)</option>
                  </select>
                  {outputFormat === "png" && (
                    <p className="text-slate-500 text-xs mt-1">
                      PNG is lossless — quality slider has no effect
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="compress-quality-range"
                    className="block text-slate-300 text-sm mb-2"
                  >
                    Quality:{" "}
                    <span className="text-blue-400 font-semibold">
                      {quality}%
                    </span>
                  </label>
                  <input
                    id="compress-quality-range"
                    data-ocid="compressor.input"
                    type="range"
                    min={10}
                    max={100}
                    step={5}
                    value={quality}
                    disabled={outputFormat === "png"}
                    onChange={(e) => {
                      setQuality(Number(e.target.value));
                      setCompressedUrl(null);
                      setCompressedSize(0);
                      setErrorMessage(null);
                    }}
                    className="w-full accent-blue-500 disabled:opacity-40"
                  />
                  <div className="flex justify-between text-slate-500 text-xs mt-1">
                    <span>10% (smallest)</span>
                    <span>100% (best quality)</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  data-ocid="compressor.primary_button"
                  onClick={handleCompress}
                  disabled={isProcessing}
                  className="flex-1 min-h-[48px] px-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Compressing...
                    </>
                  ) : (
                    "Compress Image"
                  )}
                </button>
                <button
                  type="button"
                  data-ocid="compressor.secondary_button"
                  onClick={handleReset}
                  disabled={isProcessing}
                  className="min-h-[48px] px-6 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" /> Reset
                </button>
              </div>
            </div>

            {/* Loading indicator */}
            {isProcessing && (
              <div
                data-ocid="compressor.loading_state"
                className="bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6 flex items-center justify-center gap-3"
              >
                <RefreshCw className="w-6 h-6 text-blue-400 animate-spin" />
                <p className="text-slate-300 text-sm">
                  Compressing image, please wait...
                </p>
              </div>
            )}

            {/* Results */}
            {compressedUrl && !isProcessing && (
              <>
                {/* Size Comparison Panel */}
                <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-6">
                  <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <span className="text-blue-400">⚡</span> Compression
                    Results
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
                        {formatSize(compressedSize)}
                      </p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3 text-center">
                      <p className="text-gray-500 text-xs mb-1">Change</p>
                      <p
                        className={`text-sm font-semibold flex items-center justify-center gap-1 ${
                          isReduction ? "text-green-400" : "text-yellow-400"
                        }`}
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
                        <span className="text-gray-400">Original:</span>{" "}
                        <span className="font-medium text-white">
                          {originalDimensions.w} × {originalDimensions.h} px
                        </span>
                        <span className="text-gray-600 mx-2">·</span>
                        <span className="text-gray-400">Compressed:</span>{" "}
                        <span className="font-medium text-blue-400">
                          {originalDimensions.w} × {originalDimensions.h} px
                        </span>
                        <span className="text-gray-600 text-xs ml-2">
                          (same dimensions, reduced file size)
                        </span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Side-by-Side Preview */}
                <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-6">
                  <h2 className="text-white font-semibold mb-4">
                    Side-by-Side Preview
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                    <div className="text-center">
                      <p className="text-slate-400 text-xs font-medium uppercase tracking-wide mb-2">
                        Original
                      </p>
                      <div className="bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center min-h-[160px] p-2">
                        <img
                          src={originalPreview!}
                          alt="Original"
                          className="max-w-full rounded object-contain max-h-48"
                        />
                      </div>
                      <p className="text-gray-400 text-xs mt-2">
                        {formatSize(originalSize)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-slate-400 text-xs font-medium uppercase tracking-wide mb-2">
                        Compressed
                      </p>
                      <div className="bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center min-h-[160px] p-2">
                        <img
                          src={compressedUrl}
                          alt="Compressed"
                          className="max-w-full rounded object-contain max-h-48"
                        />
                      </div>
                      <p className="text-green-400 text-xs mt-2">
                        {formatSize(compressedSize)}{" "}
                        <span
                          className={
                            isReduction ? "text-green-400" : "text-yellow-400"
                          }
                        >
                          ({sizePct}% {isReduction ? "smaller" : "larger"})
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Download Button */}
                  <button
                    type="button"
                    data-ocid="compressor.primary_button"
                    onClick={handleDownload}
                    className="w-full min-h-[48px] px-6 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" /> Download Compressed Image
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
