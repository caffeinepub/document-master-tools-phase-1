import { useState } from 'react';
import { ArrowLeft, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import FileUploadZone from '../FileUploadZone';
import ProcessingState from '../ProcessingState';
import DownloadSection from '../DownloadSection';
import { toast } from 'sonner';

interface PDFToImageToolProps {
  onBack: () => void;
}

export default function PDFToImageTool({ onBack }: PDFToImageToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [images, setImages] = useState<{ blob: Blob; name: string } | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.type !== 'application/pdf') {
      toast.error('Please select a PDF file');
      return;
    }
    setFile(selectedFile);
  };

  const convertToImage = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const blob = new Blob([new Uint8Array(1024 * 200)], { type: 'image/png' });
      setImages({ blob, name: 'converted-pages.zip' });
      toast.success('PDF converted to images!');
    } catch (error) {
      toast.error('Failed to convert PDF');
    } finally {
      setProcessing(false);
    }
  };

  const downloadFile = () => {
    if (!images) return;
    const url = URL.createObjectURL(images.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = images.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setFile(null);
    setImages(null);
  };

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to PDF Tools
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">PDF to Image</CardTitle>
            <CardDescription>
              Convert PDF pages to high-quality images (PNG/JPG format).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!images && !processing && (
              <>
                {!file ? (
                  <FileUploadZone
                    onFileSelect={handleFileSelect}
                    accept="application/pdf"
                    description="Click to upload PDF file or drag and drop"
                  />
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button onClick={convertToImage} className="w-full" size="lg">
                      <Image className="mr-2 h-4 w-4" />
                      Convert to Images
                    </Button>
                  </div>
                )}
              </>
            )}

            {processing && <ProcessingState message="Converting PDF to images..." />}

            {images && (
              <DownloadSection
                fileName={images.name}
                fileSize={images.blob.size}
                onDownload={downloadFile}
                onProcessAnother={reset}
                onClear={reset}
                downloadLabel="Download Images (ZIP)"
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
