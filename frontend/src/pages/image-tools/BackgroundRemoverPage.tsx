import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import FileUploadZone from '@/components/FileUploadZone';
import { toast } from 'sonner';

interface BackgroundRemoverPageProps {
  onBack: () => void;
}

export default function BackgroundRemoverPage({ onBack }: BackgroundRemoverPageProps) {
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    if (!selectedFile.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    setFile(selectedFile);
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
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Background Remover</h1>
              <p className="text-muted-foreground">
                Remove image backgrounds automatically with client-side processing. No data leaves your browser.
              </p>
            </div>

            {!file && (
              <FileUploadZone
                onFileSelect={handleFileSelect}
                accept="image/*"
                description="Click to upload image or drag and drop"
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
