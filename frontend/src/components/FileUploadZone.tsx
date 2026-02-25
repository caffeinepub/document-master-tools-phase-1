import { Upload } from 'lucide-react';
import { useCallback } from 'react';

interface FileUploadZoneProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  description?: string;
}

export default function FileUploadZone({
  onFileSelect,
  accept = '*',
  multiple = false,
  maxSize = 50 * 1024 * 1024,
  description = 'Click to upload or drag and drop'
}: FileUploadZoneProps) {
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      if (files[0].size > maxSize) {
        alert(`File size exceeds ${Math.round(maxSize / 1024 / 1024)}MB limit`);
        return;
      }
      onFileSelect(files[0]);
    }
  }, [onFileSelect, maxSize]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      if (files[0].size > maxSize) {
        alert(`File size exceeds ${Math.round(maxSize / 1024 / 1024)}MB limit`);
        return;
      }
      onFileSelect(files[0]);
    }
  }, [onFileSelect, maxSize]);

  const handleTouch = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    document.getElementById('file-input')?.click();
  }, []);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onTouchStart={handleTouch}
      className="border-2 border-dashed border-border rounded-lg p-8 md:p-12 text-center hover:border-primary/50 transition-colors cursor-pointer bg-muted/30 min-h-[200px] flex flex-col items-center justify-center touch-manipulation"
      onClick={() => document.getElementById('file-input')?.click()}
    >
      <img src="/assets/generated/upload-illustration.dim_300x200.png" alt="Upload" className="w-24 md:w-32 h-auto mx-auto mb-4 opacity-60" />
      <Upload className="h-10 md:h-12 w-10 md:w-12 mx-auto mb-4 text-muted-foreground" />
      <p className="text-base md:text-lg font-medium mb-2">{description}</p>
      <p className="text-xs md:text-sm text-muted-foreground">
        Maximum file size: {Math.round(maxSize / 1024 / 1024)}MB
      </p>
      <input
        id="file-input"
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileInput}
        className="hidden"
      />
    </div>
  );
}
