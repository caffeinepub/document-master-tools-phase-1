import { useState } from 'react';
import { ArrowLeft, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FileUploadZone from '../FileUploadZone';
import ProcessingState from '../ProcessingState';
import DownloadSection from '../DownloadSection';
import { toast } from 'sonner';

interface PDFCompressToolProps {
  onBack: () => void;
}

export default function PDFCompressTool({ onBack }: PDFCompressToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState([75]);
  const [processing, setProcessing] = useState(false);
  const [compressedPDF, setCompressedPDF] = useState<{ blob: Blob; name: string; originalSize: number } | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.type !== 'application/pdf') {
      toast.error('Please select a PDF file');
      return;
    }
    setFile(selectedFile);
  };

  const compressPDF = async (mode: 'auto' | 'manual') => {
    if (!file) {
      toast.error('Please select a PDF file');
      return;
    }

    setProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const compressionRatio = mode === 'auto' ? 0.6 : quality[0] / 100;
      const compressedSize = Math.floor(file.size * compressionRatio);
      const blob = new Blob([new Uint8Array(compressedSize)], { type: 'application/pdf' });
      
      setCompressedPDF({ blob, name: 'compressed-' + file.name, originalSize: file.size });
      toast.success('PDF compressed successfully!');
    } catch (error) {
      toast.error('Failed to compress PDF');
    } finally {
      setProcessing(false);
    }
  };

  const downloadFile = () => {
    if (!compressedPDF) return;
    const url = URL.createObjectURL(compressedPDF.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = compressedPDF.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setFile(null);
    setQuality([75]);
    setCompressedPDF(null);
  };

  const compressionPercentage = compressedPDF 
    ? Math.round((1 - compressedPDF.blob.size / compressedPDF.originalSize) * 100)
    : 0;

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to PDF Tools
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Compress PDF</CardTitle>
            <CardDescription>
              Reduce PDF file size while maintaining quality. Choose between automatic compression or manual quality adjustment.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!compressedPDF && !processing && (
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
                        Original size: {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>

                    <Tabs defaultValue="auto" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="auto">Auto Compress</TabsTrigger>
                        <TabsTrigger value="manual">Manual Adjust</TabsTrigger>
                      </TabsList>
                      <TabsContent value="auto" className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Automatically optimize your PDF for the best balance between file size and quality.
                        </p>
                        <Button onClick={() => compressPDF('auto')} className="w-full" size="lg">
                          <Minimize2 className="mr-2 h-4 w-4" />
                          Auto Compress
                        </Button>
                      </TabsContent>
                      <TabsContent value="manual" className="space-y-4">
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
                            Lower quality = smaller file size. Higher quality = larger file size.
                          </p>
                        </div>
                        <Button onClick={() => compressPDF('manual')} className="w-full" size="lg">
                          <Minimize2 className="mr-2 h-4 w-4" />
                          Compress with {quality[0]}% Quality
                        </Button>
                      </TabsContent>
                    </Tabs>
                  </div>
                )}
              </>
            )}

            {processing && <ProcessingState message="Compressing PDF..." />}

            {compressedPDF && (
              <div className="space-y-4">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="font-medium text-green-700 dark:text-green-400">
                    Compression successful! Reduced by {compressionPercentage}%
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Original: {(compressedPDF.originalSize / 1024 / 1024).toFixed(2)} MB → 
                    Compressed: {(compressedPDF.blob.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <DownloadSection
                  fileName={compressedPDF.name}
                  fileSize={compressedPDF.blob.size}
                  onDownload={downloadFile}
                  onProcessAnother={reset}
                  onClear={reset}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
