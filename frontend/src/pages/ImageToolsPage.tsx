import { ArrowLeft, Camera, FileImage, Briefcase, GraduationCap, Train, Shield, Plane, PenTool, Minimize2, Crop, Monitor, Maximize2, FileType, Image as ImageIcon, Scissors, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface ImageToolsPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

export default function ImageToolsPage({ onBack, onNavigate }: ImageToolsPageProps) {
  const governmentDocTools = [
    {
      id: 'smart-document-fixer',
      name: 'Smart Document Fixer',
      description: 'All-in-one tool for photo fixing, resizing, background enhancement, and export for all government IDs.',
      icon: Wand2,
      isNew: true,
      isPro: true,
    },
    { id: 'passport-photo-maker', name: 'Passport Photo Maker', description: 'Create government standard passport photos', icon: Camera },
    { id: 'aadhaar-photo-resize', name: 'Aadhaar Photo Resize', description: 'Resize photos for Aadhaar card', icon: FileImage },
    { id: 'pan-photo-resize', name: 'PAN Photo Resize', description: 'Resize photos for PAN card', icon: FileImage },
    { id: 'ssc-photo-resize', name: 'SSC Photo Resize', description: 'Resize photos for SSC exams', icon: GraduationCap },
    { id: 'railway-photo-resize', name: 'Railway Photo Resize', description: 'Resize photos for Railway exams', icon: Train },
    { id: 'police-army-photo', name: 'Police/Army Photo', description: 'Resize photos for recruitment', icon: Shield },
    { id: 'visa-photo-resize', name: 'Visa Photo Resize', description: 'Resize photos for visa applications', icon: Plane },
    { id: 'signature-resize', name: 'Signature Resize', description: 'Resize signatures for applications', icon: PenTool },
  ];

  const imageProcessingTools = [
    { id: 'image-compressor', name: 'Image Compressor', description: 'Reduce image file size', icon: Minimize2 },
    { id: 'image-cropper', name: 'Image Cropper', description: 'Crop and resize images', icon: Crop },
    { id: 'dpi-changer', name: 'DPI Changer', description: 'Change image resolution (DPI)', icon: Monitor },
    { id: 'custom-image-resize', name: 'Custom Image Resize', description: 'Resize to any dimension', icon: Maximize2 },
  ];

  const formatConversionTools = [
    { id: 'jpg-to-png', name: 'JPG to PNG', description: 'Convert JPEG to PNG format', icon: FileType },
    { id: 'png-to-jpg', name: 'PNG to JPG', description: 'Convert PNG to JPEG format', icon: FileType },
    { id: 'webp-converter', name: 'WEBP Converter', description: 'Convert to/from WEBP format', icon: ImageIcon },
    { id: 'background-remover', name: 'Background Remover', description: 'Remove image backgrounds', icon: Scissors },
  ];

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
            Professional image editing and processing tools for government documents, photos, and format conversion. All operations are performed in your browser for maximum privacy.
          </p>
        </div>

        {/* Government Document Photos */}
        <div className="mb-10">
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">Government Document Photos</h2>
            <p className="text-sm text-muted-foreground">
              Resize and optimize photos for government IDs, exams, and official applications with preset dimensions and file size requirements.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {governmentDocTools.map((tool) => {
              const Icon = tool.icon;
              const isNew = 'isNew' in tool && tool.isNew;
              const isPro = 'isPro' in tool && tool.isPro;
              return (
                <Card
                  key={tool.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group relative"
                  onClick={() => onNavigate(tool.id)}
                >
                  {/* PRO badge — only for Smart Document Fixer */}
                  {isPro && (
                    <div className="absolute top-3 right-3 z-10">
                      <span className="inline-flex items-center gap-0.5 bg-amber-500 dark:bg-amber-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        ★ PRO
                      </span>
                    </div>
                  )}
                  {/* New badge — shown only when not PRO */}
                  {isNew && !isPro && (
                    <div className="absolute top-3 right-3 z-10">
                      <Badge className="text-xs px-2 py-0.5">New</Badge>
                    </div>
                  )}
                  <CardHeader className="p-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-3 group-hover:bg-blue-500/20 transition-colors">
                      <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle className="text-base pr-12">{tool.name}</CardTitle>
                    <CardDescription className="text-sm">{tool.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>

        <Separator className="my-8" />

        {/* Image Processing Tools */}
        <div className="mb-10">
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">Image Processing</h2>
            <p className="text-sm text-muted-foreground">
              Compress, crop, resize, and adjust image resolution for web and print use.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {imageProcessingTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Card
                  key={tool.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                  onClick={() => onNavigate(tool.id)}
                >
                  <CardHeader className="p-4">
                    <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-3 group-hover:bg-green-500/20 transition-colors">
                      <Icon className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle className="text-base">{tool.name}</CardTitle>
                    <CardDescription className="text-sm">{tool.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>

        <Separator className="my-8" />

        {/* Format Conversion Tools */}
        <div className="mb-10">
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">Format Conversion</h2>
            <p className="text-sm text-muted-foreground">
              Convert images between JPG, PNG, WEBP formats and remove backgrounds.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {formatConversionTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Card
                  key={tool.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                  onClick={() => onNavigate(tool.id)}
                >
                  <CardHeader className="p-4">
                    <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-3 group-hover:bg-purple-500/20 transition-colors">
                      <Icon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <CardTitle className="text-base">{tool.name}</CardTitle>
                    <CardDescription className="text-sm">{tool.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
