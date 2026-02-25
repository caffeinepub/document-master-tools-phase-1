import { useState } from 'react';
import { ArrowLeft, Minimize2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import FileUploadZone from '@/components/FileUploadZone';
import ProcessingState from '@/components/ProcessingState';
import { toast } from 'sonner';
import { resizeImage, formatFileSize, loadImage } from '@/lib/imageProcessing';

interface ImageCompressorPageProps {
  onBack: () => void;
}

export default function ImageCompressorPage({ onBack }: ImageCompressorPageProps) {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState([80]);
  const [processing, setProcessing] = useState(false);
  const [compressed, setCompressed] = useState<{ blob: Blob; url: string; size: number } | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = async (selectedFile: File) => {
    if (!selectedFile.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    setFile(selectedFile);
    setCompressed(null);
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
  };

  const compressImage = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const img = await loadImage(file);
      const result = await resizeImage(file, img.width, img.height, quality[0] / 100, file.type);
      setCompressed(result);
      toast.success('Image compressed successfully!');
    } catch (error) {
      toast.error('Failed to compress image');
    } finally {
      setProcessing(false);
    }
  };

  const downloadFile = () => {
    if (!compressed || !file) return;
    const a = document.createElement('a');
    a.href = compressed.url;
    a.download = 'compressed-' + file.name;
    a.click();
  };

  const reset = () => {
    setFile(null);
    setQuality([80]);
    setCompressed(null);
    setPreviewUrl(null);
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
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Image Compressor</h1>
              <p className="text-muted-foreground">
                Reduce image file size while maintaining visual quality. Perfect for web optimization and email attachments.
              </p>
            </div>

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
                    {previewUrl && (
                      <div className="relative rounded-lg overflow-hidden bg-muted/30 p-4">
                        <img src={previewUrl} alt="Preview" className="max-w-full h-auto mx-auto max-h-96 object-contain" />
                        <p className="text-sm text-muted-foreground mt-2 text-center">
                          Original size: {formatFileSize(file.size)}
                        </p>
                      </div>
                    )}
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
                      <p className="text-xs text-muted-foreground">
                        Lower quality = smaller file size. Recommended: 70-85% for web use.
                      </p>
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

            {compressed && file && (
              <div className="space-y-4">
                <div className="relative rounded-lg overflow-hidden bg-muted/30 p-4">
                  <img src={compressed.url} alt="Compressed" className="max-w-full h-auto mx-auto max-h-96 object-contain" />
                  <div className="mt-4 p-3 bg-background rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Original:</p>
                        <p className="font-semibold">{formatFileSize(file.size)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Compressed:</p>
                        <p className="font-semibold text-green-600">{formatFileSize(compressed.size)}</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      Reduced by {Math.round((1 - compressed.size / file.size) * 100)}%
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={downloadFile} className="flex-1" size="lg">
                    Download Compressed Image
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
