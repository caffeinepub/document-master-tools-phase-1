import {
  AlertCircle,
  CheckCircle,
  Crown,
  Download,
  Loader2,
  RefreshCw,
  Wand2,
  Zap,
} from "lucide-react";
import type React from "react";
import { useCallback, useRef, useState } from "react";
import BackToHomeButton from "../../components/BackToHomeButton";
import BreadcrumbNavigation from "../../components/BreadcrumbNavigation";
import FileUploadZone from "../../components/FileUploadZone";
import SEO from "../../components/SEO";
import ProPricingModal from "../../components/image-tools/ProPricingModal";
import { useProAccess } from "../../hooks/useProAccess";

interface SmartDocumentFixerPageProps {
  onNavigate: (page: string) => void;
  onBack?: () => void;
}

const FREE_DAILY_LIMIT = 2;
const STORAGE_KEY = "sdf_daily_count";
const DATE_KEY = "sdf_daily_date";

function getDailyCount(): number {
  const today = new Date().toDateString();
  const storedDate = localStorage.getItem(DATE_KEY);
  if (storedDate !== today) {
    localStorage.setItem(DATE_KEY, today);
    localStorage.setItem(STORAGE_KEY, "0");
    return 0;
  }
  return Number.parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
}

function incrementDailyCount(): void {
  const count = getDailyCount();
  localStorage.setItem(STORAGE_KEY, String(count + 1));
}

const SmartDocumentFixerPage: React.FC<SmartDocumentFixerPageProps> = ({
  onNavigate,
  onBack,
}) => {
  const { isPro, devToggle } = useProAccess();
  const [file, setFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [processedPreview, setProcessedPreview] = useState<string | null>(null);
  const [processedBlob, setProcessedBlob] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showProModal, setShowProModal] = useState(false);
  const [dailyCount, setDailyCount] = useState(getDailyCount);
  const [brightness, setBrightness] = useState(10);
  const [contrast, setContrast] = useState(15);
  const [sharpen, setSharpen] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleBack = () => {
    if (onBack) onBack();
    else onNavigate("image-tools");
  };

  const handleFileSelect = useCallback((selectedFile: File) => {
    setFile(selectedFile);
    setProcessedPreview(null);
    setProcessedBlob(null);
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => setOriginalPreview(e.target?.result as string);
    reader.readAsDataURL(selectedFile);
  }, []);

  const canProcess = isPro || dailyCount < FREE_DAILY_LIMIT;

  const handleProcess = useCallback(async () => {
    if (!file || !canProcess) {
      if (!canProcess) setShowProModal(true);
      return;
    }
    setIsProcessing(true);
    setError(null);
    try {
      const img = new Image();
      const url = URL.createObjectURL(file);
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = url;
      });

      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas not supported");

      ctx.filter = `brightness(${1 + brightness / 100}) contrast(${1 + contrast / 100})${sharpen ? " saturate(1.1)" : ""}`;
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error("Failed to process"))),
          "image/jpeg",
          0.92,
        );
      });

      const processedUrl = URL.createObjectURL(blob);
      setProcessedPreview(processedUrl);
      setProcessedBlob(blob);

      if (!isPro) {
        incrementDailyCount();
        setDailyCount(getDailyCount());
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Processing failed");
    } finally {
      setIsProcessing(false);
    }
  }, [file, canProcess, isPro, brightness, contrast, sharpen]);

  const handleDownload = useCallback(() => {
    if (!processedBlob || !file) return;
    const url = URL.createObjectURL(processedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${file.name.replace(/\.[^.]+$/, "")}_fixed.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [processedBlob, file]);

  const handleReset = useCallback(() => {
    setFile(null);
    setOriginalPreview(null);
    setProcessedPreview(null);
    setProcessedBlob(null);
    setError(null);
  }, []);

  const remainingFixes = Math.max(0, FREE_DAILY_LIMIT - dailyCount);

  return (
    <>
      <SEO
        title="Smart Document Fixer - Auto-Fix Document Photos Free | Document Master Tools"
        description="Automatically fix document photos with brightness, contrast, and sharpness enhancement. Free online document photo fixer."
        canonicalUrl="https://documentmastertools.com/image-tools/smart-document-fixer"
      />
      <div className="dark-page-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Navigation */}
          <div className="mb-6 flex flex-col gap-3">
            <BackToHomeButton
              onClick={handleBack}
              label="Back to Image Tools"
            />
            <BreadcrumbNavigation
              items={[
                {
                  label: "Image Tools",
                  onClick: () => onNavigate("image-tools"),
                },
                { label: "Smart Document Fixer" },
              ]}
            />
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Smart Document Fixer
              </h1>
              <span className="text-xs px-2 py-1 rounded-full bg-green-600 text-white font-bold">
                FREE
              </span>
              {isPro && (
                <span className="text-xs px-2 py-1 rounded-full bg-violet-600 text-white font-bold">
                  PRO
                </span>
              )}
            </div>
            <p className="text-slate-300 text-sm md:text-base">
              Auto-fix document photos: brightness, contrast, crop &amp; enhance
            </p>
            {!isPro && (
              <div className="mt-3 flex items-center gap-2 text-sm flex-wrap">
                <span className="text-slate-400">Free fixes today:</span>
                <span
                  className={`font-semibold ${remainingFixes > 0 ? "text-green-400" : "text-red-400"}`}
                >
                  {remainingFixes}/{FREE_DAILY_LIMIT} remaining
                </span>
                <button
                  type="button"
                  onClick={() => setShowProModal(true)}
                  className="ml-2 flex items-center gap-1 text-violet-400 hover:text-violet-300 transition-colors text-xs"
                >
                  <Crown className="w-3.5 h-3.5" />
                  Go Pro for unlimited
                </button>
              </div>
            )}
          </div>

          {/* Dev Toggle */}
          <div className="mb-4">
            <button
              type="button"
              onClick={devToggle}
              className="text-xs px-3 py-1.5 rounded bg-gray-700 text-slate-300 hover:bg-gray-600 transition-colors"
            >
              [DEV] Toggle Pro: {isPro ? "ON" : "OFF"}
            </button>
          </div>

          {/* Upload */}
          {!file && (
            <div className="mb-8">
              <FileUploadZone
                onFileSelect={handleFileSelect}
                accept="image/jpeg,image/png,image/webp"
                description="Upload document photo (JPG, PNG, WebP)"
              />
            </div>
          )}

          {/* File & Settings */}
          {file && (
            <div className="space-y-6 mb-8">
              {/* File info */}
              <div className="tool-card rounded-xl p-4 md:p-6 border border-gray-700/50">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="bg-blue-900/30 p-2 rounded-lg shrink-0">
                      <Wand2 className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-white font-medium text-sm truncate">
                        {file.name}
                      </p>
                      <p className="text-slate-400 text-xs">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-sm min-h-[36px] px-3 py-1.5 rounded-lg hover:bg-white/5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Change
                  </button>
                </div>
              </div>

              {/* Enhancement Settings */}
              <div className="tool-card rounded-xl p-4 md:p-6 border border-gray-700/50">
                <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
                  Enhancement Settings
                </h3>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="brightness-range"
                      className="block text-slate-300 text-sm mb-2"
                    >
                      Brightness: +{brightness}%
                    </label>
                    <input
                      id="brightness-range"
                      type="range"
                      min={0}
                      max={50}
                      value={brightness}
                      onChange={(e) => setBrightness(Number(e.target.value))}
                      className="w-full accent-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contrast-range"
                      className="block text-slate-300 text-sm mb-2"
                    >
                      Contrast: +{contrast}%
                    </label>
                    <input
                      id="contrast-range"
                      type="range"
                      min={0}
                      max={50}
                      value={contrast}
                      onChange={(e) => setContrast(Number(e.target.value))}
                      className="w-full accent-blue-500"
                    />
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sharpen}
                      onChange={(e) => setSharpen(e.target.checked)}
                      className="accent-blue-500"
                    />
                    <span className="text-slate-300 text-sm">Auto-sharpen</span>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleProcess}
                  disabled={isProcessing || (!isPro && remainingFixes === 0)}
                  className="flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition-all duration-200 hover:shadow-lg text-sm flex-1 sm:flex-none"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      Fix Document
                    </>
                  )}
                </button>

                {processedBlob && (
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition-all duration-200 hover:shadow-lg text-sm flex-1 sm:flex-none"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                )}

                {!isPro && remainingFixes === 0 && (
                  <button
                    type="button"
                    onClick={() => setShowProModal(true)}
                    className="flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-semibold transition-all duration-200 hover:shadow-lg text-sm flex-1 sm:flex-none"
                  >
                    <Crown className="w-4 h-4" />
                    Go Pro
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mb-6 flex items-start gap-3 p-4 rounded-xl bg-red-900/20 border border-red-700/40">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Preview */}
          {(originalPreview || processedPreview) && (
            <div className="tool-card rounded-xl p-4 md:p-6 border border-gray-700/50">
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
                Preview
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {originalPreview && (
                  <div>
                    <p className="text-slate-400 text-xs mb-2 uppercase tracking-wide">
                      Original
                    </p>
                    <img
                      src={originalPreview}
                      alt="Original"
                      className="w-full rounded-lg object-contain max-h-64 bg-gray-800"
                    />
                  </div>
                )}
                {processedPreview && (
                  <div className="relative">
                    <p className="text-slate-400 text-xs mb-2 uppercase tracking-wide">
                      Fixed
                    </p>
                    <img
                      src={processedPreview}
                      alt="Fixed"
                      className="w-full rounded-lg object-contain max-h-64 bg-gray-800"
                    />
                    {!isPro && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-white/20 text-2xl font-bold rotate-[-30deg] select-none">
                          PREVIEW
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
              {processedPreview && (
                <div className="mt-4 flex items-center gap-2 text-green-400 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  Document fixed! Click Download to save.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showProModal && (
        <ProPricingModal
          isOpen={showProModal}
          onClose={() => setShowProModal(false)}
        />
      )}
      <canvas ref={canvasRef} className="hidden" />
    </>
  );
};

export default SmartDocumentFixerPage;
