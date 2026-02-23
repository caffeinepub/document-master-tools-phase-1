import { useState } from 'react';
import { ArrowLeft, Scissors } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import FileUploadZone from '../FileUploadZone';
import ProcessingState from '../ProcessingState';
import DownloadSection from '../DownloadSection';
import { toast } from 'sonner';

interface PDFSplitToolProps {
  onBack: () => void;
}

interface SplitFile {
  blob: Blob;
  name: string;
}

export default function PDFSplitTool({ onBack }: PDFSplitToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [pageRange, setPageRange] = useState('');
  const [processing, setProcessing] = useState(false);
  const [splitResults, setSplitResults] = useState<SplitFile[]>([]);

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.type !== 'application/pdf') {
      toast.error('Please select a PDF file');
      return;
    }
    setFile(selectedFile);
  };

  const handleSplitPDF = async () => {
    if (!file) {
      toast.error('Please select a PDF file');
      return;
    }

    setProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate splitting into multiple individual PDF files
      const results: SplitFile[] = [];
      const pageCount = pageRange ? pageRange.split(',').length : 3;
      
      for (let i = 0; i < pageCount; i++) {
        const blob = new Blob([new Uint8Array(1024 * 50)], { type: 'application/pdf' });
        results.push({
          blob,
          name: `split-page-${i + 1}.pdf`
        });
      }
      
      setSplitResults(results);
      toast.success(`PDF split into ${results.length} individual files!`);
    } catch (error) {
      toast.error('Failed to split PDF');
    } finally {
      setProcessing(false);
    }
  };

  const reset = () => {
    setFile(null);
    setPageRange('');
    setSplitResults([]);
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
            <CardTitle className="text-2xl">Split PDF</CardTitle>
            <CardDescription>
              Extract specific pages from your PDF. Enter page ranges like "1-3, 5, 7-9" or leave empty to split all pages into individual files.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {splitResults.length === 0 && !processing && (
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
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pageRange">Page Range (optional)</Label>
                      <Input
                        id="pageRange"
                        placeholder="e.g., 1-3, 5, 7-9"
                        value={pageRange}
                        onChange={(e) => setPageRange(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Leave empty to split all pages into separate files
                      </p>
                    </div>

                    <Button onClick={handleSplitPDF} className="w-full" size="lg">
                      <Scissors className="mr-2 h-4 w-4" />
                      Split PDF
                    </Button>
                  </div>
                )}
              </>
            )}

            {processing && <ProcessingState message="Splitting PDF into individual files..." />}

            {splitResults.length > 0 && (
              <DownloadSection
                files={splitResults}
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
