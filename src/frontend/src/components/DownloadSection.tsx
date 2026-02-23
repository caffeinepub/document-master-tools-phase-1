import { Download, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DownloadFile {
  blob: Blob;
  name: string;
}

interface DownloadSectionProps {
  files?: DownloadFile[];
  fileName?: string;
  fileSize?: number;
  onDownload?: () => void;
  onProcessAnother?: () => void;
  onClear?: () => void;
  downloadLabel?: string;
}

export default function DownloadSection({
  files,
  fileName,
  fileSize,
  onDownload,
  onProcessAnother,
  onClear,
  downloadLabel = 'Download File'
}: DownloadSectionProps) {
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleDownloadFile = (file: DownloadFile) => {
    const url = URL.createObjectURL(file.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Multiple files mode
  if (files && files.length > 0) {
    return (
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <img src="/assets/generated/success-icon-transparent.dim_32x32.png" alt="Success" className="w-8 h-8" />
            <CardTitle className="text-xl">Files Ready!</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {files.map((file, index) => (
              <div key={index} className="bg-muted/50 rounded-lg p-4 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-medium break-all text-sm">{file.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatFileSize(file.blob.size)}
                  </p>
                </div>
                <Button onClick={() => handleDownloadFile(file)} size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            {onProcessAnother && (
              <Button onClick={onProcessAnother} variant="outline" className="flex-1">
                <Upload className="mr-2 h-4 w-4" />
                Process Another File
              </Button>
            )}
            {onClear && (
              <Button onClick={onClear} variant="outline" className="flex-1">
                <X className="mr-2 h-4 w-4" />
                Clear Files
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Single file mode (backward compatibility)
  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-3">
          <img src="/assets/generated/success-icon-transparent.dim_32x32.png" alt="Success" className="w-8 h-8" />
          <CardTitle className="text-xl">File Ready!</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted/50 rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">File Name</p>
          <p className="font-medium break-all">{fileName}</p>
          {fileSize && (
            <p className="text-sm text-muted-foreground mt-2">File Size: {formatFileSize(fileSize)}</p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={onDownload} className="flex-1" size="lg">
            <Download className="mr-2 h-4 w-4" />
            {downloadLabel}
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          {onProcessAnother && (
            <Button onClick={onProcessAnother} variant="outline" className="flex-1">
              <Upload className="mr-2 h-4 w-4" />
              Process Another File
            </Button>
          )}
          {onClear && (
            <Button onClick={onClear} variant="outline" className="flex-1">
              <X className="mr-2 h-4 w-4" />
              Clear File
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
