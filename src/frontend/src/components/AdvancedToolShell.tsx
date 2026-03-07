import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  CheckCircle,
  Download,
  Eye,
  Upload,
  X,
  Zap,
} from "lucide-react";
import type React from "react";
import { useCallback, useRef, useState } from "react";
import { trackFileProcessed } from "../utils/analytics";

// ─── Exported types (used by image tool pages) ───────────────────────────────

export interface ProcessingResult {
  blob: Blob;
  previewUrl: string;
  outputFileName: string;
  metadata?: Record<string, string>;
}

// ─── Props ────────────────────────────────────────────────────────────────────

export interface AdvancedToolShellProps {
  toolTitle: string;
  acceptedFileTypes?: string;
  acceptedFileTypesLabel?: string;
  settingsSlot: React.ReactNode;
  processingFunction: (file: File) => Promise<ProcessingResult>;
  outputFileName?: string;
  maxFileSizeMB?: number;
  analyticsToolCategory?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

const AdvancedToolShell: React.FC<AdvancedToolShellProps> = ({
  toolTitle: _toolTitle,
  acceptedFileTypes = "image/*",
  acceptedFileTypesLabel,
  settingsSlot,
  processingFunction,
  outputFileName,
  maxFileSizeMB = 20,
  analyticsToolCategory = "image_tools",
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [downloadTriggered, setDownloadTriggered] = useState(false);
  const [originalDimensions, setOriginalDimensions] = useState<{
    w: number;
    h: number;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (f: File) => {
      if (maxFileSizeMB && f.size > maxFileSizeMB * 1024 * 1024) {
        setError(`File too large. Maximum size is ${maxFileSizeMB}MB.`);
        return;
      }
      setFile(f);
      setResult(null);
      setError(null);
      setDownloadTriggered(false);
      setOriginalDimensions(null);
      // Read original image dimensions
      if (f.type.startsWith("image/")) {
        const url = URL.createObjectURL(f);
        const img = new Image();
        img.onload = () => {
          setOriginalDimensions({ w: img.naturalWidth, h: img.naturalHeight });
          URL.revokeObjectURL(url);
        };
        img.onerror = () => URL.revokeObjectURL(url);
        img.src = url;
      }
    },
    [maxFileSizeMB],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const dropped = e.dataTransfer.files[0];
      if (dropped) handleFile(dropped);
    },
    [handleFile],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selected = e.target.files?.[0];
      if (selected) handleFile(selected);
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    [handleFile],
  );

  const handleProcess = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);
    try {
      const res = await processingFunction(file);
      setResult(res);
      // GA4: track file processed
      trackFileProcessed({
        toolName: outputFileName?.split("-")[0] ?? "image_tool",
        toolCategory: analyticsToolCategory,
        fileType: file.type,
        fileSize: file.size,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Processing failed. Please try again.",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result.previewUrl;
    a.download = outputFileName || result.outputFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setDownloadTriggered(true);
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setError(null);
    setDownloadTriggered(false);
    setOriginalDimensions(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // Parse processed dimensions from metadata (e.g. "1200×800px" or "1200×800")
  const parseDimensions = (
    dimStr?: string,
  ): { w: number; h: number } | null => {
    if (!dimStr) return null;
    const match = dimStr.match(/(\d+)[×x](\d+)/);
    if (!match) return null;
    return { w: Number(match[1]), h: Number(match[2]) };
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      {!file && (
        <div
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
          // biome-ignore lint/a11y/useSemanticElements: drag-and-drop zone requires div; converting to button breaks drop events
          role="button"
          tabIndex={0}
          className={`border-2 border-dashed rounded-xl p-8 md:p-12 text-center transition-colors cursor-pointer ${
            isDragging
              ? "border-blue-500 bg-blue-500/10"
              : "border-gray-600 hover:border-blue-400 bg-gray-700/30 hover:bg-gray-700/50"
          }`}
        >
          <Upload size={40} className="mx-auto mb-3 text-gray-500" />
          <p className="text-gray-300 font-medium mb-1">
            Drop your file here or{" "}
            <span className="text-blue-400">click to upload</span>
          </p>
          {acceptedFileTypesLabel && (
            <p className="text-gray-500 text-sm">{acceptedFileTypesLabel}</p>
          )}
          <p className="text-gray-600 text-xs mt-1">Max {maxFileSizeMB}MB</p>
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedFileTypes}
            className="hidden"
            onChange={handleInputChange}
          />
        </div>
      )}

      {/* File Info + Reset */}
      {file && (
        <div className="flex items-center justify-between bg-gray-700/50 rounded-xl px-4 py-3 border border-gray-600">
          <div className="flex items-center gap-3 min-w-0">
            <CheckCircle size={18} className="text-green-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-gray-200 text-sm font-medium truncate">
                {file.name}
              </p>
              <p className="text-gray-500 text-xs">{formatSize(file.size)}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="ml-3 p-1.5 text-gray-400 hover:text-red-400 hover:bg-gray-600 rounded-lg transition-colors shrink-0"
            title="Remove file"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Settings Panel */}
      {file && (
        <div className="bg-gray-700/30 rounded-xl p-4 md:p-5 border border-gray-600">
          <h3 className="text-gray-200 font-semibold text-sm mb-4">Settings</h3>
          {settingsSlot}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 bg-red-900/30 border border-red-700/50 rounded-xl p-4 text-red-300 text-sm">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      {/* Action Buttons */}
      {file && (
        <div className="flex flex-col md:flex-row gap-3">
          <button
            type="button"
            onClick={handleProcess}
            disabled={isProcessing}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-lg w-full md:w-auto min-h-[48px]"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                Processing...
              </>
            ) : (
              <>
                <Eye size={18} />
                Apply &amp; Preview
              </>
            )}
          </button>
          <button
            type="button"
            onClick={handleDownload}
            disabled={!result}
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-lg w-full md:w-auto min-h-[48px]"
          >
            <Download size={18} />
            Download
          </button>
        </div>
      )}

      {/* Preview + Size Comparison */}
      {result && file && (
        <div className="space-y-4">
          {/* Size Comparison Panel */}
          <div className="bg-gray-700/30 rounded-xl p-4 border border-gray-600">
            <h3 className="text-gray-200 font-semibold text-sm mb-3 flex items-center gap-2">
              <Zap size={16} className="text-blue-400" />
              Size Comparison
            </h3>
            <div className="grid grid-cols-3 gap-3 mb-3">
              {/* Original Size */}
              <div className="bg-gray-800 rounded-lg p-3 text-center">
                <p className="text-gray-500 text-xs mb-1">Original Size</p>
                <p className="text-gray-200 text-sm font-semibold">
                  {formatSize(file.size)}
                </p>
              </div>
              {/* New Size */}
              <div className="bg-gray-800 rounded-lg p-3 text-center">
                <p className="text-gray-500 text-xs mb-1">New Size</p>
                <p className="text-green-400 text-sm font-semibold">
                  {formatSize(result.blob.size)}
                </p>
              </div>
              {/* Reduction */}
              <div className="bg-gray-800 rounded-lg p-3 text-center">
                <p className="text-gray-500 text-xs mb-1">Change</p>
                {(() => {
                  const diff = file.size - result.blob.size;
                  const pct = Math.round(Math.abs(diff / file.size) * 100);
                  const isReduction = diff >= 0;
                  return (
                    <p
                      className={`text-sm font-semibold flex items-center justify-center gap-1 ${isReduction ? "text-green-400" : "text-red-400"}`}
                    >
                      {isReduction ? (
                        <ArrowDown size={12} />
                      ) : (
                        <ArrowUp size={12} />
                      )}
                      {pct}% {isReduction ? "smaller" : "larger"}
                    </p>
                  );
                })()}
              </div>
            </div>
            {/* Dimension Comparison */}
            {(() => {
              const processedDim = parseDimensions(result.metadata?.Dimensions);
              if (!originalDimensions && !processedDim) return null;
              return (
                <div className="grid grid-cols-2 gap-3">
                  {originalDimensions && (
                    <div className="bg-gray-800 rounded-lg p-3">
                      <p className="text-gray-500 text-xs mb-1">
                        Original Dimensions
                      </p>
                      <p className="text-gray-200 text-sm font-medium">
                        {originalDimensions.w} × {originalDimensions.h} px
                      </p>
                    </div>
                  )}
                  {processedDim && (
                    <div className="bg-gray-800 rounded-lg p-3">
                      <p className="text-gray-500 text-xs mb-1">
                        Processed Dimensions
                      </p>
                      <p className="text-blue-400 text-sm font-medium">
                        {processedDim.w} × {processedDim.h} px
                      </p>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>

          {/* Additional Metadata */}
          {result.metadata &&
            Object.keys(result.metadata).filter((k) => k !== "Dimensions")
              .length > 0 && (
              <div className="bg-gray-700/30 rounded-xl p-4 border border-gray-600">
                <h3 className="text-gray-200 font-semibold text-sm mb-3">
                  Output Details
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {Object.entries(result.metadata)
                    .filter(([k]) => k !== "Dimensions")
                    .map(([key, value]) => (
                      <div key={key} className="bg-gray-800 rounded-lg p-3">
                        <p className="text-gray-500 text-xs mb-1">{key}</p>
                        <p className="text-gray-200 text-sm font-medium">
                          {value}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            )}

          {/* Before / After Side-by-Side Preview */}
          <div className="bg-gray-700/30 rounded-xl p-4 border border-gray-600">
            <h3 className="text-gray-200 font-semibold text-sm mb-3">
              Side-by-Side Preview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-xs mb-2 text-center font-medium uppercase tracking-wide">
                  Original
                </p>
                <div className="bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center min-h-[180px] p-2">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Original"
                    className="max-w-full rounded object-contain max-h-64"
                  />
                </div>
                <p className="text-gray-500 text-xs text-center mt-1">
                  {formatSize(file.size)}
                  {originalDimensions
                    ? ` · ${originalDimensions.w}×${originalDimensions.h}px`
                    : ""}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-2 text-center font-medium uppercase tracking-wide">
                  Processed
                </p>
                <div className="bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center min-h-[180px] p-2">
                  <img
                    src={result.previewUrl}
                    alt="Processed"
                    className="max-w-full rounded object-contain max-h-64"
                  />
                </div>
                {(() => {
                  const processedDim = parseDimensions(
                    result.metadata?.Dimensions,
                  );
                  return (
                    <p className="text-green-400 text-xs text-center mt-1">
                      {formatSize(result.blob.size)}
                      {processedDim
                        ? ` · ${processedDim.w}×${processedDim.h}px`
                        : ""}
                    </p>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* Post-download message */}
          {downloadTriggered && (
            <div className="bg-green-900/30 border border-green-700/50 rounded-xl p-4 text-center">
              <p className="text-green-400 font-semibold text-sm">
                ✓ Download started!
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Your file{" "}
                <span className="text-gray-200">
                  {outputFileName || result.outputFileName}
                </span>{" "}
                is downloading.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdvancedToolShell;
