import { useState } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import FileUploadZone from '@/components/FileUploadZone';
import ProcessingState from '@/components/ProcessingState';
import { toast } from 'sonner';
import { convertFormat, formatFileSize } from '@/lib/imageProcessing';

interface JPGToPNGPageProps {
  onBack: () => void;
}

export default function JPGToPNGPage({ onBack }: JPGToPNGPageProps) {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [converted, setConverted] = useState<{ blob: Blob; url: string; size: number } | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    if (!selectedFile.type.match(/image\/(jpeg|jpg)/)) {
      toast.error('Please select a JPG/JPEG file');
      return;
    }
    setFile(selectedFile);
    setConverted(null);
  };

  const convertImage = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const result = await convertFormat(file, 'image/png', 1);
      setConverted(result);
      toast.success('Image converted to PNG successfully!');
    } catch (error) {
      toast.error('Failed to convert image');
    } finally {
      setProcessing(false);
    }
  };

  const downloadFile = () => {
    if (!converted || !file) return;
    const a = document.createElement('a');
    a.href = converted.url;
    a.download = file.name.replace(/\.(jpg|jpeg)$/i, '.png');
    a.click();
  };

  const reset = () => {
    setFile(null);
    setConverted(null);
  };

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Image Tools
        </Button>

        <Card>
          <CardContent className="p-6 space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">JPG to PNG Converter</h1>
              <p className="text-muted-foreground">
                Convert JPEG images to PNG format with transparency support.
              </p>
            </div>

            {!converted && !processing && (
              <>
                {!file ? (
                  <FileUploadZone
                    onFileSelect={handleFileSelect}
                    accept="image/jpeg,image/jpg"
                    description="Click to upload JPG/JPEG or drag and drop"
                  />
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Size: {formatFileSize(file.size)}
                      </p>
                    </div>
                    <Button onClick={convertImage} className="w-full" size="lg">
                      Convert to PNG
                    </Button>
                  </div>
                )}
              </>
            )}

            {processing && <ProcessingState message="Converting to PNG..." />}

            {converted && file && (
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-medium">{file.name.replace(/\.(jpg|jpeg)$/i, '.png')}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm mt-2">
                    <div>
                      <p className="text-muted-foreground">Original (JPG):</p>
                      <p className="font-semibold">{formatFileSize(file.size)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Converted (PNG):</p>
                      <p className="font-semibold">{formatFileSize(converted.size)}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={downloadFile} className="flex-1" size="lg">
                    Download PNG
                  </Button>
                  <Button onClick={reset} variant="outline" size="lg">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
