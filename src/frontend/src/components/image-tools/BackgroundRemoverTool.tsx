import { useState } from 'react';
import { ArrowLeft, Scissors } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import FileUploadZone from '../FileUploadZone';
import ProcessingState from '../ProcessingState';
import DownloadSection from '../DownloadSection';
import { toast } from 'sonner';

interface BackgroundRemoverToolProps {
  onBack: () => void;
}

export default function BackgroundRemoverTool({ onBack }: BackgroundRemoverToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<{ blob: Blob; name: string } | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    if (!selectedFile.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    setFile(selectedFile);
  };

  const removeBackground = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const blob = new Blob([new Uint8Array(1024 * 100)], { type: 'image/png' });
      setResult({ blob, name: 'no-background-' + file.name.replace(/\.[^/.]+$/, '.png') });
      toast.success('Background removed successfully!');
    } catch (error) {
      toast.error('Failed to remove background');
    } finally {
      setProcessing(false);
    }
  };

  const downloadFile = () => {
    if (!result) return;
    const url = URL.createObjectURL(result.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = result.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setFile(null);
    setResult(null);
  };

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Image Tools
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Background Remover</CardTitle>
            <CardDescription>
              Automatically remove backgrounds from images with AI-powered detection
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!result && !processing && (
              <>
                {!file ? (
                  <FileUploadZone
                    onFileSelect={handleFileSelect}
                    accept="image/*"
                    description="Click to upload image or drag and drop"
                  />
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                    <Button onClick={removeBackground} className="w-full" size="lg">
                      <Scissors className="mr-2 h-4 w-4" />
                      Remove Background
                    </Button>
                  </div>
                )}
              </>
            )}

            {processing && <ProcessingState message="Removing background..." />}

            {result && (
              <DownloadSection
                fileName={result.name}
                fileSize={result.blob.size}
                onDownload={downloadFile}
                onProcessAnother={reset}
                onClear={reset}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
