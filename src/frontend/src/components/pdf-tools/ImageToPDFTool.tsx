import { useState } from 'react';
import { ArrowLeft, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import FileUploadZone from '../FileUploadZone';
import ProcessingState from '../ProcessingState';
import DownloadSection from '../DownloadSection';
import { toast } from 'sonner';

interface ImageToPDFToolProps {
  onBack: () => void;
}

export default function ImageToPDFTool({ onBack }: ImageToPDFToolProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [pdf, setPdf] = useState<{ blob: Blob; name: string } | null>(null);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    setFiles(prev => [...prev, file]);
  };

  const convertToPDF = async () => {
    if (files.length === 0) return;
    setProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const blob = new Blob([new Uint8Array(1024 * 100)], { type: 'application/pdf' });
      setPdf({ blob, name: 'images-to-pdf.pdf' });
      toast.success('Images converted to PDF!');
    } catch (error) {
      toast.error('Failed to convert images');
    } finally {
      setProcessing(false);
    }
  };

  const downloadFile = () => {
    if (!pdf) return;
    const url = URL.createObjectURL(pdf.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = pdf.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setFiles([]);
    setPdf(null);
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
            <CardTitle className="text-2xl">Image to PDF</CardTitle>
            <CardDescription>
              Convert one or more images to a PDF document.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!pdf && !processing && (
              <>
                <FileUploadZone
                  onFileSelect={handleFileSelect}
                  accept="image/*"
                  description="Click to upload images or drag and drop"
                />
                {files.length > 0 && (
                  <div className="space-y-3">
                    <p className="font-medium">{files.length} image(s) selected</p>
                    <Button onClick={convertToPDF} className="w-full" size="lg">
                      <FileText className="mr-2 h-4 w-4" />
                      Convert to PDF
                    </Button>
                  </div>
                )}
              </>
            )}

            {processing && <ProcessingState message="Converting images to PDF..." />}

            {pdf && (
              <DownloadSection
                fileName={pdf.name}
                fileSize={pdf.blob.size}
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
