import BreadcrumbNavigation from "@/components/BreadcrumbNavigation";
import FileUploadZone from "@/components/FileUploadZone";
import SEO from "@/components/SEO";
import { ArrowDown, ArrowUp, Download, RefreshCw } from "lucide-react";
import { useRef, useState } from "react";

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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleFileSelect = (file: File) => {
    setOriginalFile(file);
    setOriginalSize(file.size);
    setCompressedUrl(null);
    setCompressedSize(0);
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setOriginalPreview(dataUrl);
      // Get original dimensions
      const img = new window.Image();
      img.onload = () => setOriginalDimensions({ w: img.width, h: img.height });
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleCompress = async () => {
    if (!originalFile || !canvasRef.current) return;
    setIsProcessing(true);
    try {
      const img = new window.Image();
      img.onload = () => {
        const canvas = canvasRef.current!;
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0);
        const mimeType =
          outputFormat === "jpeg"
            ? "image/jpeg"
            : outputFormat === "png"
              ? "image/png"
              : "image/webp";
        canvas.toBlob(
          (blob) => {
            if (blob) {
              setCompressedSize(blob.size);
              const url = URL.createObjectURL(blob);
              setCompressedUrl(url);
            }
            setIsProcessing(false);
          },
          mimeType,
          quality / 100,
        );
      };
      img.src = originalPreview!;
    } catch {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!compressedUrl) return;
    const a = document.createElement("a");
    a.href = compressedUrl;
    a.download = `compressed.${outputFormat}`;
    a.click();
  };

  const handleReset = () => {
    setOriginalFile(null);
    setOriginalPreview(null);
    setCompressedUrl(null);
    setOriginalSize(0);
    setCompressedSize(0);
    setOriginalDimensions(null);
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
      <canvas ref={canvasRef} className="hidden" />
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
            and WebP formats.
          </p>
        </div>

        {!originalFile ? (
          <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-8">
            <FileUploadZone
              accept="image/*"
              description="Upload an image to compress (JPEG, PNG, WebP)"
              onFileSelect={handleFileSelect}
            />
          </div>
        ) : (
          <>
            <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-6">
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
                    value={outputFormat}
                    onChange={(e) => {
                      setOutputFormat(
                        e.target.value as "jpeg" | "png" | "webp",
                      );
                      setCompressedUrl(null);
                    }}
                    className="w-full bg-gray-800 border border-gray-600 text-white rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="jpeg">JPEG</option>
                    <option value="png">PNG</option>
                    <option value="webp">WebP</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="compress-quality-range"
                    className="block text-slate-300 text-sm mb-2"
                  >
                    Quality: {quality}%
                  </label>
                  <input
                    id="compress-quality-range"
                    type="range"
                    min={10}
                    max={100}
                    value={quality}
                    onChange={(e) => {
                      setQuality(Number(e.target.value));
                      setCompressedUrl(null);
                    }}
                    className="w-full accent-blue-500"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleCompress}
                  disabled={isProcessing}
                  className="flex-1 min-h-[48px] px-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />{" "}
                      Processing...
                    </>
                  ) : (
                    "Compress Image"
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="min-h-[48px] px-6 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" /> Reset
                </button>
              </div>
            </div>

            {compressedUrl && (
              <>
                {/* Size Comparison Panel */}
                <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-6">
                  <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <span className="text-blue-400">⚡</span> Size Comparison
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
                        className={`text-sm font-semibold flex items-center justify-center gap-1 ${isReduction ? "text-green-400" : "text-red-400"}`}
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4">
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
                        {formatSize(compressedSize)} ({sizePct}%{" "}
                        {isReduction ? "smaller" : "larger"})
                      </p>
                    </div>
                  </div>

                  {/* Download Button — only shown after preview */}
                  <button
                    type="button"
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
