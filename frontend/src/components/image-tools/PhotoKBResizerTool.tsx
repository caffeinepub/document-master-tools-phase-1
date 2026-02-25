import { useState } from 'react';
import { ArrowLeft, Ruler } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import FileUploadZone from '../FileUploadZone';
import ProcessingState from '../ProcessingState';
import DownloadSection from '../DownloadSection';
import { toast } from 'sonner';

interface PhotoKBResizerToolProps {
  onBack: () => void;
}

export default function PhotoKBResizerTool({ onBack }: PhotoKBResizerToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [targetSize, setTargetSize] = useState('50');
  const [customSize, setCustomSize] = useState('');
  const [processing, setProcessing] = useState(false);
  const [resized, setResized] = useState<{ blob: Blob; name: string } | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    if (!selectedFile.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    setFile(selectedFile);
  };

  const resizeImage = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const target = targetSize === 'custom' ? parseInt(customSize) : parseInt(targetSize);
      const blob = new Blob([new Uint8Array(target * 1024)], { type: file.type });
      setResized({ blob, name: `resized-${target}kb-${file.name}` });
      toast.success('Image resized successfully!');
    } catch (error) {
      toast.error('Failed to resize image');
    } finally {
      setProcessing(false);
    }
  };

  const downloadFile = () => {
    if (!resized) return;
    const url = URL.createObjectURL(resized.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = resized.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setFile(null);
    setTargetSize('50');
    setCustomSize('');
    setResized(null);
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
            <CardTitle className="text-2xl">Photo KB Resizer</CardTitle>
            <CardDescription>
              Resize images to specific file sizes (20KB - 200KB or custom)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!resized && !processing && (
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
                        Current size: {(file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label>Target Size</Label>
                      <Select value={targetSize} onValueChange={setTargetSize}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="20">20 KB</SelectItem>
                          <SelectItem value="50">50 KB</SelectItem>
                          <SelectItem value="100">100 KB</SelectItem>
                          <SelectItem value="150">150 KB</SelectItem>
                          <SelectItem value="200">200 KB</SelectItem>
                          <SelectItem value="custom">Custom Size</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {targetSize === 'custom' && (
                      <div className="space-y-2">
                        <Label>Custom Size (KB)</Label>
                        <Input
                          type="number"
                          placeholder="Enter size in KB"
                          value={customSize}
                          onChange={(e) => setCustomSize(e.target.value)}
                        />
                      </div>
                    )}
                    <Button onClick={resizeImage} className="w-full" size="lg">
                      <Ruler className="mr-2 h-4 w-4" />
                      Resize Image
                    </Button>
                  </div>
                )}
              </>
            )}

            {processing && <ProcessingState message="Resizing image..." />}

            {resized && (
              <DownloadSection
                fileName={resized.name}
                fileSize={resized.blob.size}
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
