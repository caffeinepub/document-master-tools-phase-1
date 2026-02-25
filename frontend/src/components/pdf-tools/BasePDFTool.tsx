import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import FileUploadZone from '../FileUploadZone';
import ProcessingState from '../ProcessingState';
import DownloadSection from '../DownloadSection';
import { toast } from 'sonner';

interface BasePDFToolProps {
  onBack: () => void;
  title: string;
  description: string;
  accept: string;
  buttonLabel: string;
  processingMessage: string;
  outputName: string;
  outputType: string;
}

export function BasePDFTool({
  onBack,
  title,
  description,
  accept,
  buttonLabel,
  processingMessage,
  outputName,
  outputType
}: BasePDFToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<{ blob: Blob; name: string } | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const processFile = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const blob = new Blob([new Uint8Array(1024 * 100)], { type: outputType });
      setResult({ blob, name: outputName });
      toast.success('Processing completed!');
    } catch (error) {
      toast.error('Processing failed');
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
          Back to PDF Tools
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!result && !processing && (
              <>
                {!file ? (
                  <FileUploadZone
                    onFileSelect={handleFileSelect}
                    accept={accept}
                    description="Click to upload file or drag and drop"
                  />
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button onClick={processFile} className="w-full" size="lg">
                      {buttonLabel}
                    </Button>
                  </div>
                )}
              </>
            )}

            {processing && <ProcessingState message={processingMessage} />}

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
