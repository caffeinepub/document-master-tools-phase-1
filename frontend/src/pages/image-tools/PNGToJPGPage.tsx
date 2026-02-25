import { useState } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import FileUploadZone from '@/components/FileUploadZone';
import ProcessingState from '@/components/ProcessingState';
import { toast } from 'sonner';
import { convertFormat, formatFileSize } from '@/lib/imageProcessing';

interface PNGToJPGPageProps {
  onBack: () => void;
}

export default function PNGToJPGPage({ onBack }: PNGToJPGPageProps) {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState([90]);
  const [processing, setProcessing] = useState(false);
  const [converted, setConverted] = useState<{ blob: Blob; url: string; size: number } | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    if (!selectedFile.type.match(/image\/png/)) {
      toast.error('Please select a PNG file');
      return;
    }
    setFile(selectedFile);
    setConverted(null);
  };

  const convertImage = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const result = await convertFormat(file, 'image/jpeg', quality[0] / 100);
      setConverted(result);
      toast.success('Image converted to JPG successfully!');
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
    a.download = file.name.replace(/\.png$/i, '.jpg');
    a.click();
  };

  const reset = () => {
    setFile(null);
    setQuality([90]);
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
              <h1 className="text-2xl md:text-3xl font-bold mb-2">PNG to JPG Converter</h1>
              <p className="text-muted-foreground">
                Convert PNG images to JPG format with adjustable quality settings.
              </p>
            </div>

            {!converted && !processing && (
              <>
                {!file ? (
                  <FileUploadZone
                    onFileSelect={handleFileSelect}
                    accept="image/png"
                    description="Click to upload PNG or drag and drop"
                  />
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Size: {formatFileSize(file.size)}
                      </p>
                    </div>
                    <div className="space-y-3">
                      <Label>Quality: {quality[0]}%</Label>
                      <Slider
                        value={quality}
                        onValueChange={setQuality}
                        min={50}
                        max={100}
                        step={5}
                        className="w-full"
                      />
                    </div>
                    <Button onClick={convertImage} className="w-full" size="lg">
                      Convert to JPG
                    </Button>
                  </div>
                )}
              </>
            )}

            {processing && <ProcessingState message="Converting to JPG..." />}

            {converted && file && (
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-medium">{file.name.replace(/\.png$/i, '.jpg')}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm mt-2">
                    <div>
                      <p className="text-muted-foreground">Original (PNG):</p>
                      <p className="font-semibold">{formatFileSize(file.size)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Converted (JPG):</p>
                      <p className="font-semibold">{formatFileSize(converted.size)}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={downloadFile} className="flex-1" size="lg">
                    Download JPG
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
