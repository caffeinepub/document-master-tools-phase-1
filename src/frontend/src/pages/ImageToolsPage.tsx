import { useState } from 'react';
import { ArrowLeft, Minimize2, Ruler, Scissors, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ImageCompressorTool from '../components/image-tools/ImageCompressorTool';
import PhotoKBResizerTool from '../components/image-tools/PhotoKBResizerTool';
import BackgroundRemoverTool from '../components/image-tools/BackgroundRemoverTool';
import BackgroundChangerTool from '../components/image-tools/BackgroundChangerTool';

interface ImageToolsPageProps {
  onBack: () => void;
}

type ImageTool = 'compressor' | 'kb-resizer' | 'bg-remover' | 'bg-changer';

export default function ImageToolsPage({ onBack }: ImageToolsPageProps) {
  const [selectedTool, setSelectedTool] = useState<ImageTool | null>(null);

  const imageTools = [
    { id: 'compressor' as ImageTool, name: 'Image Compressor', description: 'Reduce image file size while maintaining quality', icon: Minimize2 },
    { id: 'kb-resizer' as ImageTool, name: 'Photo KB Resizer', description: 'Resize images to specific file sizes (20KB - 200KB)', icon: Ruler },
    { id: 'bg-remover' as ImageTool, name: 'Background Remover', description: 'Remove backgrounds automatically or manually', icon: Scissors },
    { id: 'bg-changer' as ImageTool, name: 'Background Changer', description: 'Replace backgrounds with colors or images', icon: Palette },
  ];

  const renderTool = () => {
    switch (selectedTool) {
      case 'compressor': return <ImageCompressorTool onBack={() => setSelectedTool(null)} />;
      case 'kb-resizer': return <PhotoKBResizerTool onBack={() => setSelectedTool(null)} />;
      case 'bg-remover': return <BackgroundRemoverTool onBack={() => setSelectedTool(null)} />;
      case 'bg-changer': return <BackgroundChangerTool onBack={() => setSelectedTool(null)} />;
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
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Image Tools</h1>
          <p className="text-lg text-muted-foreground">
            Professional image editing and processing tools. All operations are performed in your browser for maximum privacy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {imageTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Card
                key={tool.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                onClick={() => setSelectedTool(tool.id)}
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-3 group-hover:bg-green-500/20 transition-colors">
                    <Icon className="h-6 w-6 text-green-600 dark:text-green-400" />
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
