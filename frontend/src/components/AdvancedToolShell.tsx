import React, { useState, useCallback } from 'react';
import { Upload, Settings, Eye, Download, X, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdvancedToolShellProps {
  toolTitle: string;
  acceptedFileTypes: string;
  acceptedFileTypesLabel?: string;
  settingsSlot: React.ReactNode;
  processingFunction: (file: File) => Promise<ProcessingResult>;
  outputFileName: string;
  onFileChange?: (file: File | null) => void;
  multipleFiles?: boolean;
  onMultipleFilesChange?: (files: File[]) => void;
}

export interface ProcessingResult {
  blob: Blob;
  previewUrl: string;
  outputFileName: string;
  metadata?: Record<string, string | number>;
}

interface FileInfo {
  name: string;
  size: number;
  type: string;
  width?: number;
  height?: number;
  url: string;
}

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve) => {
    if (!file.type.startsWith('image/')) {
      resolve({ width: 0, height: 0 });
      return;
    }
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      resolve({ width: 0, height: 0 });
      URL.revokeObjectURL(url);
    };
    img.src = url;
  });
};

const AdvancedToolShell: React.FC<AdvancedToolShellProps> = ({
  toolTitle,
  acceptedFileTypes,
  acceptedFileTypesLabel,
  settingsSlot,
  processingFunction,
  outputFileName,
  onFileChange,
  multipleFiles = false,
  onMultipleFilesChange,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewGenerated, setPreviewGenerated] = useState(false);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'upload' | 'settings' | 'preview'>('upload');

  const handleFileSelect = useCallback(async (selectedFile: File) => {
    const url = URL.createObjectURL(selectedFile);
    const dims = await getImageDimensions(selectedFile);
    setFileInfo({
      name: selectedFile.name,
      size: selectedFile.size,
      type: selectedFile.type,
      width: dims.width || undefined,
      height: dims.height || undefined,
      url,
    });
    setFile(selectedFile);
    setPreviewGenerated(false);
    setResult(null);
    setError(null);
    setStep('settings');
    if (onFileChange) onFileChange(selectedFile);
  }, [onFileChange]);

  const handleMultipleFilesSelect = useCallback((selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setPreviewGenerated(false);
    setResult(null);
    setError(null);
    setStep('settings');
    if (onMultipleFilesChange) onMultipleFilesChange(selectedFiles);
  }, [onMultipleFilesChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length === 0) return;
    if (multipleFiles) {
      handleMultipleFilesSelect(droppedFiles);
    } else {
      handleFileSelect(droppedFiles[0]);
    }
  }, [multipleFiles, handleFileSelect, handleMultipleFilesSelect]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;
    if (multipleFiles) {
      handleMultipleFilesSelect(selectedFiles);
    } else {
      handleFileSelect(selectedFiles[0]);
    }
  }, [multipleFiles, handleFileSelect, handleMultipleFilesSelect]);

  const handleApplyPreview = useCallback(async () => {
    const targetFile = file || (files.length > 0 ? files[0] : null);
    if (!targetFile) return;
    setIsProcessing(true);
    setError(null);
    try {
      const res = await processingFunction(targetFile);
      setResult(res);
      setPreviewGenerated(true);
      setStep('preview');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  }, [file, files, processingFunction]);

  const handleDownload = useCallback(() => {
    if (!result) return;
    const a = document.createElement('a');
    a.href = result.previewUrl;
    a.download = result.outputFileName || outputFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [result, outputFileName]);

  const handleReset = useCallback(() => {
    if (fileInfo?.url) URL.revokeObjectURL(fileInfo.url);
    if (result?.previewUrl) URL.revokeObjectURL(result.previewUrl);
    setFile(null);
    setFiles([]);
    setFileInfo(null);
    setResult(null);
    setPreviewGenerated(false);
    setError(null);
    setStep('upload');
    if (onFileChange) onFileChange(null);
  }, [fileInfo, result, onFileChange]);

  const isImage = fileInfo?.type?.startsWith('image/');
  const resultIsImage = result?.blob?.type?.startsWith('image/');

  return (
    <div className="w-full space-y-6">
      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {(['upload', 'settings', 'preview'] as const).map((s, i) => (
          <React.Fragment key={s}>
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              step === s
                ? 'bg-blue-600 text-white'
                : step === 'preview' && i < 2
                ? 'bg-green-600/20 text-green-400'
                : step === 'settings' && i === 0
                ? 'bg-green-600/20 text-green-400'
                : 'bg-gray-700 text-gray-400'
            }`}>
              {s === 'upload' && <Upload className="w-3.5 h-3.5" />}
              {s === 'settings' && <Settings className="w-3.5 h-3.5" />}
              {s === 'preview' && <Eye className="w-3.5 h-3.5" />}
              <span className="capitalize hidden sm:inline">{s === 'upload' ? '1. Upload' : s === 'settings' ? '2. Settings' : '3. Preview'}</span>
              <span className="capitalize sm:hidden">{i + 1}</span>
            </div>
            {i < 2 && <div className={`h-px w-6 sm:w-10 ${step !== 'upload' && i === 0 ? 'bg-green-500' : step === 'preview' && i === 1 ? 'bg-green-500' : 'bg-gray-600'}`} />}
          </React.Fragment>
        ))}
      </div>

      {/* Step 1: Upload */}
      {step === 'upload' && (
        <div
          className={`border-2 border-dashed rounded-xl p-8 sm:p-12 text-center transition-all cursor-pointer ${
            isDragging ? 'border-blue-400 bg-blue-900/20' : 'border-gray-600 hover:border-blue-500 hover:bg-gray-800/50'
          }`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => document.getElementById(`file-input-${toolTitle.replace(/\s/g, '-')}`)?.click()}
        >
          <input
            id={`file-input-${toolTitle.replace(/\s/g, '-')}`}
            type="file"
            accept={acceptedFileTypes}
            multiple={multipleFiles}
            className="hidden"
            onChange={handleInputChange}
          />
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-600/20 flex items-center justify-center">
              <Upload className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-100">
                {isDragging ? 'Drop your file here' : `Upload ${multipleFiles ? 'Files' : 'File'}`}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Drag & drop or click to browse
              </p>
              {acceptedFileTypesLabel && (
                <p className="text-xs text-gray-500 mt-1">{acceptedFileTypesLabel}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Steps 2 & 3: Settings + Preview */}
      {step !== 'upload' && (
        <div className="space-y-6">
          {/* File Info Bar */}
          <div className="flex items-center justify-between bg-gray-800 rounded-lg px-4 py-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                <Upload className="w-4 h-4 text-blue-400" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-100 truncate">{fileInfo?.name || (files.length > 0 ? `${files.length} files selected` : 'File selected')}</p>
                <p className="text-xs text-gray-400">
                  {fileInfo ? formatFileSize(fileInfo.size) : ''}
                  {fileInfo?.width && fileInfo?.height ? ` • ${fileInfo.width}×${fileInfo.height}px` : ''}
                </p>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="ml-3 p-1.5 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-gray-200 transition-colors flex-shrink-0"
              title="Remove file"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Settings Panel */}
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-4 sm:p-6">
            <h3 className="text-base font-semibold text-gray-100 mb-4 flex items-center gap-2">
              <Settings className="w-4 h-4 text-blue-400" />
              Settings
            </h3>
            {settingsSlot}
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-900/30 border border-red-700 rounded-lg px-4 py-3 text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* Apply & Preview Button */}
          {step === 'settings' && (
            <Button
              onClick={handleApplyPreview}
              disabled={isProcessing}
              className="w-full min-h-[48px] bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Processing…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Apply &amp; Preview
                </span>
              )}
            </Button>
          )}

          {/* Preview Panel */}
          {step === 'preview' && result && (
            <div className="space-y-4">
              {/* Before / After Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Before */}
                <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                  <div className="px-4 py-2 bg-gray-700/50 border-b border-gray-700">
                    <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Before</span>
                  </div>
                  <div className="p-4">
                    {isImage && fileInfo?.url ? (
                      <img
                        src={fileInfo.url}
                        alt="Original"
                        className="w-full h-48 object-contain rounded-lg bg-gray-900"
                      />
                    ) : (
                      <div className="w-full h-48 flex items-center justify-center bg-gray-900 rounded-lg">
                        <div className="text-center text-gray-400">
                          <Upload className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">{fileInfo?.name || 'Original file'}</p>
                        </div>
                      </div>
                    )}
                    <div className="mt-3 space-y-1 text-xs text-gray-400">
                      <div className="flex justify-between">
                        <span>Size:</span>
                        <span className="text-gray-200">{fileInfo ? formatFileSize(fileInfo.size) : '—'}</span>
                      </div>
                      {fileInfo?.width && fileInfo?.height && (
                        <div className="flex justify-between">
                          <span>Dimensions:</span>
                          <span className="text-gray-200">{fileInfo.width}×{fileInfo.height}px</span>
                        </div>
                      )}
                      {fileInfo?.type && (
                        <div className="flex justify-between">
                          <span>Format:</span>
                          <span className="text-gray-200">{fileInfo.type.split('/')[1]?.toUpperCase() || fileInfo.type}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* After */}
                <div className="bg-gray-800 rounded-xl border border-green-700/50 overflow-hidden">
                  <div className="px-4 py-2 bg-green-900/30 border-b border-green-700/50">
                    <span className="text-xs font-semibold text-green-400 uppercase tracking-wider">After</span>
                  </div>
                  <div className="p-4">
                    {resultIsImage ? (
                      <img
                        src={result.previewUrl}
                        alt="Processed"
                        className="w-full h-48 object-contain rounded-lg bg-gray-900"
                      />
                    ) : (
                      <div className="w-full h-48 flex items-center justify-center bg-gray-900 rounded-lg">
                        <div className="text-center text-green-400">
                          <Eye className="w-8 h-8 mx-auto mb-2 opacity-70" />
                          <p className="text-sm text-gray-300">{result.outputFileName}</p>
                          <p className="text-xs text-green-400 mt-1">Ready to download</p>
                        </div>
                      </div>
                    )}
                    <div className="mt-3 space-y-1 text-xs text-gray-400">
                      <div className="flex justify-between">
                        <span>Size:</span>
                        <span className="text-green-300">{formatFileSize(result.blob.size)}</span>
                      </div>
                      {result.metadata && Object.entries(result.metadata).map(([k, v]) => (
                        <div key={k} className="flex justify-between">
                          <span>{k}:</span>
                          <span className="text-gray-200">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => { setStep('settings'); setPreviewGenerated(false); setResult(null); }}
                  variant="outline"
                  className="flex-1 min-h-[48px] border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Adjust Settings
                </Button>
                <Button
                  onClick={handleDownload}
                  disabled={!previewGenerated}
                  className="flex-1 min-h-[48px] bg-green-600 hover:bg-green-700 text-white font-semibold"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          )}

          {/* Re-apply button when in preview mode */}
          {step === 'preview' && (
            <Button
              onClick={handleReset}
              variant="ghost"
              className="w-full text-gray-400 hover:text-gray-200"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Start Over with New File
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default AdvancedToolShell;
