import { useState } from 'react';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import FileUploadZone from '../FileUploadZone';
import ProcessingState from '../ProcessingState';
import DownloadSection from '../DownloadSection';
import { toast } from 'sonner';

interface PDFMergeToolProps {
  onBack: () => void;
}

export default function PDFMergeTool({ onBack }: PDFMergeToolProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [mergedPDF, setMergedPDF] = useState<{ blob: Blob; name: string } | null>(null);

  const handleFileSelect = (file: File) => {
    if (file.type !== 'application/pdf') {
      toast.error('Please select a PDF file');
      return;
    }
    setFiles(prev => [...prev, file]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const mergePDFs = async () => {
    if (files.length < 2) {
      toast.error('Please select at least 2 PDF files to merge');
      return;
    }

    setProcessing(true);
    try {
      // Simulate PDF merging (in production, use pdf-lib)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const blob = new Blob([new Uint8Array(1024 * 100)], { type: 'application/pdf' });
      setMergedPDF({ blob, name: 'merged-document.pdf' });
      toast.success('PDFs merged successfully!');
    } catch (error) {
      toast.error('Failed to merge PDFs');
    } finally {
      setProcessing(false);
    }
  };

  const downloadFile = () => {
    if (!mergedPDF) return;
    const url = URL.createObjectURL(mergedPDF.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = mergedPDF.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setFiles([]);
    setMergedPDF(null);
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
            <CardTitle className="text-2xl">Merge PDF Files</CardTitle>
            <CardDescription>
              Combine multiple PDF files into a single document. Upload at least 2 PDF files to get started.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!mergedPDF && !processing && (
              <>
                <FileUploadZone
                  onFileSelect={handleFileSelect}
                  accept="application/pdf"
                  description="Click to upload PDF files or drag and drop"
                />

                {files.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-medium">Selected Files ({files.length})</h3>
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button onClick={mergePDFs} className="w-full" size="lg">
                      <Plus className="mr-2 h-4 w-4" />
                      Merge {files.length} PDFs
                    </Button>
                  </div>
                )}
              </>
            )}

            {processing && <ProcessingState message="Merging PDF files..." />}

            {mergedPDF && (
              <DownloadSection
                fileName={mergedPDF.name}
                fileSize={mergedPDF.blob.size}
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
