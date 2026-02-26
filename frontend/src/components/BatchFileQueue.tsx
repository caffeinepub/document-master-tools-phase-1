import { Download, Loader2, CheckCircle, XCircle, Clock, Trash2, ArchiveIcon } from 'lucide-react';
import type { BatchFile } from '@/hooks/useBatchProcessor';

interface BatchFileQueueProps {
  files: BatchFile[];
  isProcessing: boolean;
  onDownloadFile: (fileId: string) => void;
  onDownloadAll: () => void;
  onRemoveFile: (fileId: string) => void;
  onClearAll: () => void;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function StatusIcon({ status }: { status: BatchFile['status'] }) {
  switch (status) {
    case 'pending':
      return <Clock className="w-4 h-4 text-gray-400" />;
    case 'processing':
      return <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />;
    case 'done':
      return <CheckCircle className="w-4 h-4 text-green-400" />;
    case 'error':
      return <XCircle className="w-4 h-4 text-red-400" />;
  }
}

function StatusLabel({ status }: { status: BatchFile['status'] }) {
  const labels = {
    pending: 'Pending',
    processing: 'Processing...',
    done: 'Done',
    error: 'Error',
  };
  const colors = {
    pending: 'text-gray-400',
    processing: 'text-blue-400',
    done: 'text-green-400',
    error: 'text-red-400',
  };
  return <span className={`text-xs font-medium ${colors[status]}`}>{labels[status]}</span>;
}

export default function BatchFileQueue({
  files,
  isProcessing,
  onDownloadFile,
  onDownloadAll,
  onRemoveFile,
  onClearAll,
}: BatchFileQueueProps) {
  if (files.length === 0) return null;

  const doneCount = files.filter((f) => f.status === 'done').length;

  return (
    <div className="mt-4 rounded-xl border border-gray-700 bg-gray-800/50 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <ArchiveIcon className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-semibold text-gray-200">
            Batch Queue ({files.length} file{files.length !== 1 ? 's' : ''})
          </span>
          {doneCount > 0 && (
            <span className="text-xs bg-green-900/50 text-green-400 px-2 py-0.5 rounded-full">
              {doneCount} ready
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {doneCount > 1 && (
            <button
              onClick={onDownloadAll}
              disabled={isProcessing}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              <Download className="w-3 h-3" />
              Download All
            </button>
          )}
          <button
            onClick={onClearAll}
            disabled={isProcessing}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors disabled:opacity-50"
          >
            <Trash2 className="w-3 h-3" />
            Clear
          </button>
        </div>
      </div>

      <div className="max-h-72 overflow-y-auto divide-y divide-gray-700/50">
        {files.map((file) => (
          <div
            key={file.id}
            className="flex flex-col sm:flex-row sm:items-center gap-2 px-4 py-3 hover:bg-gray-700/30 transition-colors"
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <StatusIcon status={file.status} />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-200 truncate font-medium">{file.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-gray-500">{formatFileSize(file.size)}</span>
                  <span className="text-gray-600">·</span>
                  <StatusLabel status={file.status} />
                  {file.errorMessage && (
                    <span className="text-xs text-red-400 truncate">{file.errorMessage}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {file.status === 'done' && (
                <button
                  onClick={() => onDownloadFile(file.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-green-700 hover:bg-green-600 text-white rounded-lg transition-colors"
                >
                  <Download className="w-3 h-3" />
                  Download
                </button>
              )}
              {!isProcessing && (
                <button
                  onClick={() => onRemoveFile(file.id)}
                  className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                  aria-label="Remove file"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
