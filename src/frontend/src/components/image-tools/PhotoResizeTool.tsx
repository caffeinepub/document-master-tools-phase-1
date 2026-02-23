import { useState, useEffect } from 'react';
import { ArrowLeft, Camera, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FileUploadZone from '../FileUploadZone';
import ProcessingState from '../ProcessingState';
import { toast } from 'sonner';
import { resizeImage, compressToTargetSize, loadImage, formatFileSize, calculateAspectRatio, calculateAspectRatioWidth } from '@/lib/imageProcessing';

export interface PhotoPreset {
  name: string;
  width: number;
  height: number;
  maxSizeKB?: number;
}

interface PhotoResizeToolProps {
  onBack: () => void;
  title: string;
  description: string;
  presets: PhotoPreset[];
  defaultPreset?: string;
}

export default function PhotoResizeTool({ onBack, title, description, presets, defaultPreset }: PhotoResizeToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string>(defaultPreset || 'custom');
  const [width, setWidth] = useState<number>(600);
  const [height, setHeight] = useState<number>(600);
  const [targetSizeKB, setTargetSizeKB] = useState<number>(100);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [quality, setQuality] = useState([85]);
  const [originalDimensions, setOriginalDimensions] = useState<{ width: number; height: number } | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<{ blob: Blob; url: string; size: number } | null>(null);

  useEffect(() => {
    if (selectedPreset !== 'custom') {
      const preset = presets.find(p => p.name === selectedPreset);
      if (preset) {
        setWidth(preset.width);
        setHeight(preset.height);
        if (preset.maxSizeKB) {
          setTargetSizeKB(preset.maxSizeKB);
        }
      }
    }
  }, [selectedPreset, presets]);

  const handleFileSelect = async (selectedFile: File) => {
    if (!selectedFile.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    setFile(selectedFile);
    setProcessedImage(null);
    
    try {
      const img = await loadImage(selectedFile);
      setOriginalDimensions({ width: img.width, height: img.height });
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    } catch (error) {
      toast.error('Failed to load image');
    }
  };

  const handleWidthChange = (value: string) => {
    const newWidth = parseInt(value) || 0;
    setWidth(newWidth);
    if (maintainAspectRatio && originalDimensions) {
      const newHeight = Math.round(calculateAspectRatio(originalDimensions.width, originalDimensions.height, newWidth));
      setHeight(newHeight);
    }
  };

  const handleHeightChange = (value: string) => {
    const newHeight = parseInt(value) || 0;
    setHeight(newHeight);
    if (maintainAspectRatio && originalDimensions) {
      const newWidth = Math.round(calculateAspectRatioWidth(originalDimensions.width, originalDimensions.height, newHeight));
      setWidth(newWidth);
    }
  };

  const processImage = async () => {
    if (!file) return;
    setProcessing(true);
    
    try {
      const result = await compressToTargetSize(file, targetSizeKB, width, height);
      setProcessedImage(result);
      toast.success('Image processed successfully!');
    } catch (error) {
      toast.error('Failed to process image');
      console.error(error);
    } finally {
      setProcessing(false);
    }
  };

  const downloadImage = () => {
    if (!processedImage) return;
    const a = document.createElement('a');
    a.href = processedImage.url;
    a.download = `resized-${file?.name || 'image.jpg'}`;
    a.click();
  };

  const reset = () => {
    setFile(null);
    setProcessedImage(null);
    setPreviewUrl(null);
    setOriginalDimensions(null);
    setSelectedPreset(defaultPreset || 'custom');
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
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{title}</h1>
              <p className="text-muted-foreground">{description}</p>
            </div>

            {!file && !processing && (
              <FileUploadZone
                onFileSelect={handleFileSelect}
                accept="image/*"
                description="Click to upload image or drag and drop"
                maxSize={10 * 1024 * 1024}
              />
            )}

            {file && !processedImage && !processing && (
              <div className="space-y-6">
                {previewUrl && (
                  <div className="relative rounded-lg overflow-hidden bg-muted/30 p-4">
                    <img src={previewUrl} alt="Preview" className="max-w-full h-auto mx-auto max-h-96 object-contain" />
                    {originalDimensions && (
                      <p className="text-sm text-muted-foreground mt-2 text-center">
                        Original: {originalDimensions.width} × {originalDimensions.height} px ({formatFileSize(file.size)})
                      </p>
                    )}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <Label>Preset</Label>
                    <Select value={selectedPreset} onValueChange={setSelectedPreset}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="custom">Custom</SelectItem>
                        {presets.map((preset) => (
                          <SelectItem key={preset.name} value={preset.name}>
                            {preset.name} ({preset.width}×{preset.height}px)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Width (px)</Label>
                      <Input
                        type="number"
                        value={width}
                        onChange={(e) => handleWidthChange(e.target.value)}
                        min={1}
                      />
                    </div>
                    <div>
                      <Label>Height (px)</Label>
                      <Input
                        type="number"
                        value={height}
                        onChange={(e) => handleHeightChange(e.target.value)}
                        min={1}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Maintain Aspect Ratio</Label>
                    <Switch checked={maintainAspectRatio} onCheckedChange={setMaintainAspectRatio} />
                  </div>

                  <div>
                    <Label>Target File Size (KB): {targetSizeKB}</Label>
                    <Slider
                      value={[targetSizeKB]}
                      onValueChange={(value) => setTargetSizeKB(value[0])}
                      min={20}
                      max={200}
                      step={10}
                      className="mt-2"
                    />
                  </div>

                  <Button onClick={processImage} className="w-full" size="lg">
                    <Camera className="mr-2 h-4 w-4" />
                    Process Image
                  </Button>
                </div>
              </div>
            )}

            {processing && <ProcessingState message="Processing image..." />}

            {processedImage && (
              <div className="space-y-4">
                <div className="relative rounded-lg overflow-hidden bg-muted/30 p-4">
                  <img src={processedImage.url} alt="Processed" className="max-w-full h-auto mx-auto max-h-96 object-contain" />
                  <p className="text-sm text-muted-foreground mt-2 text-center">
                    Processed: {width} × {height} px ({formatFileSize(processedImage.size)})
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button onClick={downloadImage} className="flex-1" size="lg">
                    Download Image
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
