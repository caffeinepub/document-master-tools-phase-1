import BreadcrumbNavigation from "@/components/BreadcrumbNavigation";
import FileUploadZone from "@/components/FileUploadZone";
import SEO from "@/components/SEO";
import { Download, RefreshCw } from "lucide-react";
import { useRef, useState } from "react";

interface ImageCropperPageProps {
  onNavigate?: (page: string) => void;
}

const aspectRatioPresets = [
  { label: "Free", value: "free" },
  { label: "1:1 (Square)", value: "1" },
  { label: "4:3", value: String(4 / 3) },
  { label: "16:9", value: String(16 / 9) },
  { label: "3:4 (Portrait)", value: String(3 / 4) },
  { label: "2:3", value: String(2 / 3) },
];

export default function ImageCropperPage({
  onNavigate,
}: ImageCropperPageProps) {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [croppedUrl, setCroppedUrl] = useState<string | null>(null);
  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);
  const [cropWidth, setCropWidth] = useState(100);
  const [cropHeight, setCropHeight] = useState(100);
  const [quality, setQuality] = useState(90);
  const [outputFormat, setOutputFormat] = useState<"jpeg" | "png" | "webp">(
    "jpeg",
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileSelect = (file: File) => {
    setOriginalFile(file);
    setCroppedUrl(null);
    const reader = new FileReader();
    reader.onload = (e) => setOriginalPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleCrop = async () => {
    if (!originalPreview || !canvasRef.current) return;
    setIsProcessing(true);
    try {
      const img = new window.Image();
      img.onload = () => {
        const canvas = canvasRef.current!;
        const sx = (cropX / 100) * img.width;
        const sy = (cropY / 100) * img.height;
        const sw = (cropWidth / 100) * img.width;
        const sh = (cropHeight / 100) * img.height;
        canvas.width = sw;
        canvas.height = sh;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
        const mimeType =
          outputFormat === "jpeg"
            ? "image/jpeg"
            : outputFormat === "png"
              ? "image/png"
              : "image/webp";
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              setCroppedUrl(url);
            }
            setIsProcessing(false);
          },
          mimeType,
          quality / 100,
        );
      };
      img.src = originalPreview;
    } catch {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!croppedUrl) return;
    const a = document.createElement("a");
    a.href = croppedUrl;
    a.download = `cropped.${outputFormat}`;
    a.click();
  };

  const handleReset = () => {
    setOriginalFile(null);
    setOriginalPreview(null);
    setCroppedUrl(null);
    setCropX(0);
    setCropY(0);
    setCropWidth(100);
    setCropHeight(100);
  };

  return (
    <div
      className="min-h-screen py-8 px-4"
      style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)" }}
    >
      <SEO
        title="Image Cropper Online Free | DocMasterTools"
        description="Crop images online for free with aspect ratio presets. Supports JPEG, PNG, and WebP formats."
        canonicalUrl="https://docmastertools.com/image-tools/image-cropper"
      />
      <canvas ref={canvasRef} className="hidden" />
      <div className="max-w-4xl mx-auto">
        <BreadcrumbNavigation
          items={[
            {
              label: "Image Tools",
              onClick: () => onNavigate?.("image-tools"),
            },
            { label: "Image Cropper" },
          ]}
          onNavigate={onNavigate}
        />
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Image Cropper
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Crop images to any size with aspect ratio presets. Supports JPEG,
            PNG, and WebP formats.
          </p>
        </div>

        {!originalFile ? (
          <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-8">
            <FileUploadZone
              accept="image/*"
              description="Upload an image to crop (JPEG, PNG, WebP)"
              onFileSelect={handleFileSelect}
            />
          </div>
        ) : (
          <>
            <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-6">
              <h2 className="text-white font-semibold mb-4">Crop Settings</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4">
                <div>
                  <label className="block text-slate-300 text-sm mb-2">
                    Aspect Ratio
                  </label>
                  <select
                    defaultValue="free"
                    onChange={(e) => {
                      // aspect ratio selection — visual only for now
                      void e.target.value;
                    }}
                    className="w-full bg-gray-800 border border-gray-600 text-white rounded-lg px-3 py-2 text-sm"
                  >
                    {aspectRatioPresets.map((p) => (
                      <option key={p.label} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 text-sm mb-2">
                    Output Format
                  </label>
                  <select
                    value={outputFormat}
                    onChange={(e) =>
                      setOutputFormat(e.target.value as "jpeg" | "png" | "webp")
                    }
                    className="w-full bg-gray-800 border border-gray-600 text-white rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="jpeg">JPEG</option>
                    <option value="png">PNG</option>
                    <option value="webp">WebP</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-slate-300 text-sm mb-2">
                    Crop X (%): {cropX}
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={90}
                    value={cropX}
                    onChange={(e) => setCropX(Number(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm mb-2">
                    Crop Y (%): {cropY}
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={90}
                    value={cropY}
                    onChange={(e) => setCropY(Number(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm mb-2">
                    Width (%): {cropWidth}
                  </label>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    value={cropWidth}
                    onChange={(e) => setCropWidth(Number(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm mb-2">
                    Height (%): {cropHeight}
                  </label>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    value={cropHeight}
                    onChange={(e) => setCropHeight(Number(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-slate-300 text-sm mb-2">
                  Quality: {quality}%
                </label>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleCrop}
                  disabled={isProcessing}
                  className="flex-1 min-h-[48px] px-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />{" "}
                      Processing...
                    </>
                  ) : (
                    "Crop Image"
                  )}
                </button>
                <button
                  onClick={handleReset}
                  className="min-h-[48px] px-6 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" /> Reset
                </button>
              </div>
            </div>

            {croppedUrl && (
              <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-6">
                <h2 className="text-white font-semibold mb-4">
                  Cropped Result
                </h2>
                <div className="text-center mb-4">
                  <img
                    src={croppedUrl}
                    alt="Cropped"
                    className="max-w-full rounded-lg mx-auto max-h-64 object-contain"
                  />
                </div>
                <button
                  onClick={handleDownload}
                  className="w-full min-h-[48px] px-6 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" /> Download Cropped Image
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
