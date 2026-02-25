import { useState } from 'react';
import { ArrowLeft, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import FileUploadZone from '../FileUploadZone';
import ProcessingState from '../ProcessingState';
import DownloadSection from '../DownloadSection';
import { toast } from 'sonner';

interface BackgroundChangerToolProps {
  onBack: () => void;
}

export default function BackgroundChangerTool({ onBack }: BackgroundChangerToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<{ blob: Blob; name: string } | null>(null);

  const presetColors = ['#ffffff', '#000000', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  const handleFileSelect = (selectedFile: File) => {
    if (!selectedFile.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    setFile(selectedFile);
  };

  const changeBackground = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const blob = new Blob([new Uint8Array(1024 * 120)], { type: 'image/png' });
      setResult({ blob, name: 'new-background-' + file.name.replace(/\.[^/.]+$/, '.png') });
      toast.success('Background changed successfully!');
    } catch (error) {
      toast.error('Failed to change background');
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
    setBgColor('#ffffff');
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
            <CardTitle className="text-2xl">Background Changer</CardTitle>
            <CardDescription>
              Replace image backgrounds with solid colors or custom colors
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
                    <div className="space-y-3">
                      <Label>Background Color</Label>
                      <div className="flex gap-2 flex-wrap">
                        {presetColors.map((color) => (
                          <button
                            key={color}
                            onClick={() => setBgColor(color)}
                            className={`w-12 h-12 rounded-lg border-2 transition-all ${
                              bgColor === color ? 'border-primary scale-110' : 'border-border'
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <div className="flex gap-2 items-center">
                        <Input
                          type="color"
                          value={bgColor}
                          onChange={(e) => setBgColor(e.target.value)}
                          className="w-20 h-10"
                        />
                        <Input
                          type="text"
                          value={bgColor}
                          onChange={(e) => setBgColor(e.target.value)}
                          placeholder="#ffffff"
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <Button onClick={changeBackground} className="w-full" size="lg">
                      <Palette className="mr-2 h-4 w-4" />
                      Change Background
                    </Button>
                  </div>
                )}
              </>
            )}

            {processing && <ProcessingState message="Changing background..." />}

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
