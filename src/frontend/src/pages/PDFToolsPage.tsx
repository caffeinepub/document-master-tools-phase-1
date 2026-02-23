import { useState } from 'react';
import { ArrowLeft, FileText, Scissors, Minimize2, Image as ImageIcon, FileType, Hash, ArrowUpDown, Lock, Unlock, FileX, ListOrdered, Droplet, PenTool, ScanText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PDFMergeTool from '../components/pdf-tools/PDFMergeTool';
import PDFSplitTool from '../components/pdf-tools/PDFSplitTool';
import PDFCompressTool from '../components/pdf-tools/PDFCompressTool';
import PDFToImageTool from '../components/pdf-tools/PDFToImageTool';
import ImageToPDFTool from '../components/pdf-tools/ImageToPDFTool';
import PDFToWordTool from '../components/pdf-tools/PDFToWordTool';
import WordToPDFTool from '../components/pdf-tools/WordToPDFTool';
import PDFPageCounterTool from '../components/pdf-tools/PDFPageCounterTool';
import PDFReorderTool from '../components/pdf-tools/PDFReorderTool';
import PDFPasswordProtectTool from '../components/pdf-tools/PDFPasswordProtectTool';
import PDFPasswordUnlockTool from '../components/pdf-tools/PDFPasswordUnlockTool';
import PDFRemoveBlankPagesTool from '../components/pdf-tools/PDFRemoveBlankPagesTool';
import PDFAddPageNumbersTool from '../components/pdf-tools/PDFAddPageNumbersTool';
import PDFAddWatermarkTool from '../components/pdf-tools/PDFAddWatermarkTool';
import PDFSignTool from '../components/pdf-tools/PDFSignTool';
import PDFOCRTool from '../components/pdf-tools/PDFOCRTool';

interface PDFToolsPageProps {
  onBack: () => void;
}

type PDFTool = 
  | 'merge' | 'split' | 'compress' | 'pdf-to-image' | 'image-to-pdf' 
  | 'pdf-to-word' | 'word-to-pdf' | 'page-counter' | 'reorder' 
  | 'password-protect' | 'password-unlock' | 'remove-blank' 
  | 'add-page-numbers' | 'add-watermark' | 'sign' | 'ocr';

export default function PDFToolsPage({ onBack }: PDFToolsPageProps) {
  const [selectedTool, setSelectedTool] = useState<PDFTool | null>(null);

  const pdfTools = [
    { id: 'merge' as PDFTool, name: 'Merge PDF', description: 'Combine multiple PDFs into one', icon: FileText },
    { id: 'split' as PDFTool, name: 'Split PDF', description: 'Extract pages or split into files', icon: Scissors },
    { id: 'compress' as PDFTool, name: 'Compress PDF', description: 'Reduce PDF file size', icon: Minimize2 },
    { id: 'pdf-to-image' as PDFTool, name: 'PDF to Image', description: 'Convert PDF pages to images', icon: ImageIcon },
    { id: 'image-to-pdf' as PDFTool, name: 'Image to PDF', description: 'Convert images to PDF', icon: FileText },
    { id: 'pdf-to-word' as PDFTool, name: 'PDF to Word', description: 'Convert PDF to editable Word', icon: FileType },
    { id: 'word-to-pdf' as PDFTool, name: 'Word to PDF', description: 'Convert Word to PDF', icon: FileText },
    { id: 'page-counter' as PDFTool, name: 'Page Counter', description: 'Count pages in PDF', icon: Hash },
    { id: 'reorder' as PDFTool, name: 'Reorder Pages', description: 'Rearrange PDF pages', icon: ArrowUpDown },
    { id: 'password-protect' as PDFTool, name: 'Password Protect', description: 'Add password security', icon: Lock },
    { id: 'password-unlock' as PDFTool, name: 'Password Unlock', description: 'Remove password protection', icon: Unlock },
    { id: 'remove-blank' as PDFTool, name: 'Remove Blank Pages', description: 'Delete empty pages', icon: FileX },
    { id: 'add-page-numbers' as PDFTool, name: 'Add Page Numbers', description: 'Insert page numbering', icon: ListOrdered },
    { id: 'add-watermark' as PDFTool, name: 'Add Watermark', description: 'Apply text or image watermark', icon: Droplet },
    { id: 'sign' as PDFTool, name: 'Sign PDF', description: 'Add digital signature', icon: PenTool },
    { id: 'ocr' as PDFTool, name: 'OCR to Searchable', description: 'Make scanned PDFs searchable', icon: ScanText },
  ];

  const renderTool = () => {
    switch (selectedTool) {
      case 'merge': return <PDFMergeTool onBack={() => setSelectedTool(null)} />;
      case 'split': return <PDFSplitTool onBack={() => setSelectedTool(null)} />;
      case 'compress': return <PDFCompressTool onBack={() => setSelectedTool(null)} />;
      case 'pdf-to-image': return <PDFToImageTool onBack={() => setSelectedTool(null)} />;
      case 'image-to-pdf': return <ImageToPDFTool onBack={() => setSelectedTool(null)} />;
      case 'pdf-to-word': return <PDFToWordTool onBack={() => setSelectedTool(null)} />;
      case 'word-to-pdf': return <WordToPDFTool onBack={() => setSelectedTool(null)} />;
      case 'page-counter': return <PDFPageCounterTool onBack={() => setSelectedTool(null)} />;
      case 'reorder': return <PDFReorderTool onBack={() => setSelectedTool(null)} />;
      case 'password-protect': return <PDFPasswordProtectTool onBack={() => setSelectedTool(null)} />;
      case 'password-unlock': return <PDFPasswordUnlockTool onBack={() => setSelectedTool(null)} />;
      case 'remove-blank': return <PDFRemoveBlankPagesTool onBack={() => setSelectedTool(null)} />;
      case 'add-page-numbers': return <PDFAddPageNumbersTool onBack={() => setSelectedTool(null)} />;
      case 'add-watermark': return <PDFAddWatermarkTool onBack={() => setSelectedTool(null)} />;
      case 'sign': return <PDFSignTool onBack={() => setSelectedTool(null)} />;
      case 'ocr': return <PDFOCRTool onBack={() => setSelectedTool(null)} />;
      default: return null;
    }
  };

  if (selectedTool) {
    return renderTool();
  }

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">PDF Tools</h1>
          <p className="text-lg text-muted-foreground">
            Professional PDF processing tools. All operations are performed in your browser for maximum privacy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {pdfTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Card
                key={tool.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                onClick={() => setSelectedTool(tool.id)}
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
