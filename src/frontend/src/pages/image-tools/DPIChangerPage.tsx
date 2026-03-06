import BreadcrumbNavigation from "@/components/BreadcrumbNavigation";
import FileUploadZone from "@/components/FileUploadZone";
import SEO from "@/components/SEO";
import { Download, RefreshCw } from "lucide-react";
import { useRef, useState } from "react";

interface DPIChangerPageProps {
  onNavigate?: (page: string) => void;
}

const dpiPresets = [72, 96, 150, 200, 300, 600];

export default function DPIChangerPage({ onNavigate }: DPIChangerPageProps) {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [targetDPI, setTargetDPI] = useState(300);
  const [customDPI, setCustomDPI] = useState("");
  const [outputFormat, setOutputFormat] = useState<"jpeg" | "png" | "webp">(
    "jpeg",
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileSelect = (file: File) => {
    setOriginalFile(file);
    setProcessedUrl(null);
    const reader = new FileReader();
    reader.onload = (e) => setOriginalPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleProcess = async () => {
    if (!originalPreview || !canvasRef.current) return;
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
              const url = URL.createObjectURL(blob);
              setProcessedUrl(url);
            }
            setIsProcessing(false);
          },
          mimeType,
          0.92,
        );
      };
      img.src = originalPreview;
    } catch {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!processedUrl) return;
    const dpi = customDPI ? Number(customDPI) : targetDPI;
    const a = document.createElement("a");
    a.href = processedUrl;
    a.download = `image_${dpi}dpi.${outputFormat}`;
    a.click();
  };

  const handleReset = () => {
    setOriginalFile(null);
    setOriginalPreview(null);
    setProcessedUrl(null);
    setCustomDPI("");
  };

  const effectiveDPI = customDPI ? Number(customDPI) : targetDPI;

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
            Change image DPI/resolution for print and digital use. Supports
            preset and custom DPI values.
          </p>
        </div>

        {!originalFile ? (
          <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-8">
            <FileUploadZone
              accept="image/*"
              description="Upload an image to change DPI (JPEG, PNG, WebP)"
              onFileSelect={handleFileSelect}
            />
          </div>
        ) : (
          <>
            <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-6">
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
                  className="flex-1 min-h-[48px] px-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2"
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
                  className="min-h-[48px] px-6 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" /> Reset
                </button>
              </div>
            </div>

            {processedUrl && (
              <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-6">
                <h2 className="text-white font-semibold mb-4">
                  Result — {effectiveDPI} DPI
                </h2>
                <div className="text-center mb-4">
                  <img
                    src={processedUrl}
                    alt="Processed"
                    className="max-w-full rounded-lg mx-auto max-h-64 object-contain"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="w-full min-h-[48px] px-6 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" /> Download Image (
                  {effectiveDPI} DPI)
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
