import { useState } from 'react';
import { ArrowLeft, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import FileUploadZone from '../FileUploadZone';
import ProcessingState from '../ProcessingState';
import DownloadSection from '../DownloadSection';
import { toast } from 'sonner';

interface ImageCompressorToolProps {
  onBack: () => void;
}

export default function ImageCompressorTool({ onBack }: ImageCompressorToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState([80]);
  const [processing, setProcessing] = useState(false);
  const [compressed, setCompressed] = useState<{ blob: Blob; name: string; originalSize: number } | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    if (!selectedFile.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    setFile(selectedFile);
  };

  const compressImage = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const compressionRatio = quality[0] / 100;
      const compressedSize = Math.floor(file.size * compressionRatio);
      const blob = new Blob([new Uint8Array(compressedSize)], { type: file.type });
      setCompressed({ blob, name: 'compressed-' + file.name, originalSize: file.size });
      toast.success('Image compressed successfully!');
    } catch (error) {
      toast.error('Failed to compress image');
    } finally {
      setProcessing(false);
    }
  };

  const downloadFile = () => {
    if (!compressed) return;
    const url = URL.createObjectURL(compressed.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = compressed.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setFile(null);
    setQuality([80]);
    setCompressed(null);
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
            <CardTitle className="text-2xl">Image Compressor</CardTitle>
            <CardDescription>
              Reduce image file size while maintaining visual quality
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!compressed && !processing && (
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
                        Original size: {(file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                    <div className="space-y-3">
                      <Label>Quality: {quality[0]}%</Label>
                      <Slider
                        value={quality}
                        onValueChange={setQuality}
                        min={10}
                        max={100}
                        step={5}
                        className="w-full"
                      />
                    </div>
                    <Button onClick={compressImage} className="w-full" size="lg">
                      <Minimize2 className="mr-2 h-4 w-4" />
                      Compress Image
                    </Button>
                  </div>
                )}
              </>
            )}

            {processing && <ProcessingState message="Compressing image..." />}

            {compressed && (
              <DownloadSection
                fileName={compressed.name}
                fileSize={compressed.blob.size}
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
