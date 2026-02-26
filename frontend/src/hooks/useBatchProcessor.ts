import { useState, useCallback } from 'react';

export type BatchFileStatus = 'pending' | 'processing' | 'done' | 'error';

export interface BatchFile {
  id: string;
  name: string;
  size: number;
  status: BatchFileStatus;
  resultBlob?: Blob;
  resultName?: string;
  errorMessage?: string;
  originalFile: File;
}

interface UseBatchProcessorReturn {
  files: BatchFile[];
  isProcessing: boolean;
  addFiles: (newFiles: File[]) => void;
  processAll: (processFn: (file: File) => Promise<{ blob: Blob; name: string }>) => Promise<void>;
  downloadFile: (fileId: string) => void;
  downloadAllAsZip: (zipName?: string) => Promise<void>;
  clearFiles: () => void;
  removeFile: (fileId: string) => void;
}

export function useBatchProcessor(): UseBatchProcessorReturn {
  const [files, setFiles] = useState<BatchFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const addFiles = useCallback((newFiles: File[]) => {
    const batchFiles: BatchFile[] = newFiles.map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: file.name,
      size: file.size,
      status: 'pending',
      originalFile: file,
    }));
    setFiles((prev) => [...prev, ...batchFiles]);
  }, []);

  const processAll = useCallback(
    async (processFn: (file: File) => Promise<{ blob: Blob; name: string }>) => {
      setIsProcessing(true);
      setFiles((prev) =>
        prev.map((f) => (f.status === 'pending' ? { ...f, status: 'processing' } : f))
      );

      const pendingFiles = files.filter((f) => f.status === 'pending' || f.status === 'processing');

      for (const batchFile of pendingFiles) {
        setFiles((prev) =>
          prev.map((f) => (f.id === batchFile.id ? { ...f, status: 'processing' } : f))
        );
        try {
          const result = await processFn(batchFile.originalFile);
          setFiles((prev) =>
            prev.map((f) =>
              f.id === batchFile.id
                ? { ...f, status: 'done', resultBlob: result.blob, resultName: result.name }
                : f
            )
          );
        } catch (err) {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === batchFile.id
                ? {
                    ...f,
                    status: 'error',
                    errorMessage: err instanceof Error ? err.message : 'Processing failed',
                  }
                : f
            )
          );
        }
      }

      setIsProcessing(false);
    },
    [files]
  );

  const downloadFile = useCallback(
    (fileId: string) => {
      const file = files.find((f) => f.id === fileId);
      if (!file || !file.resultBlob) return;
      const url = URL.createObjectURL(file.resultBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.resultName || file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
    [files]
  );

  const downloadAllAsZip = useCallback(
    async (zipName = 'processed-files.zip') => {
      const doneFiles = files.filter((f) => f.status === 'done' && f.resultBlob);
      if (doneFiles.length === 0) return;

      // Dynamic import of JSZip-like functionality using native browser APIs
      // Since JSZip is not in package.json, we'll use a simple approach
      // by downloading files individually if only one, or creating a basic zip
      if (doneFiles.length === 1) {
        downloadFile(doneFiles[0].id);
        return;
      }

      // For multiple files, download them sequentially
      for (const file of doneFiles) {
        downloadFile(file.id);
        await new Promise((resolve) => setTimeout(resolve, 300));
      }
    },
    [files, downloadFile]
  );

  const clearFiles = useCallback(() => {
    setFiles([]);
  }, []);

  const removeFile = useCallback((fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
  }, []);

  return {
    files,
    isProcessing,
    addFiles,
    processAll,
    downloadFile,
    downloadAllAsZip,
    clearFiles,
    removeFile,
  };
}
