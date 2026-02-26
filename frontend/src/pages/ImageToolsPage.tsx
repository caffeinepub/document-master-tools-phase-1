import { Crown, Image, FileImage, Crop, Minimize2, ScanLine, FileOutput, Stamp, Wand2, Sparkles, Palette, Scissors } from 'lucide-react';

interface ImageToolsPageProps {
  onBack?: () => void;
  onNavigate: (page: string) => void;
}

interface ToolCard {
  title: string;
  description: string;
  page: string;
  icon: React.ReactNode;
  badge?: 'new' | 'pro' | 'popular';
}

const governmentTools: ToolCard[] = [
  {
    title: 'Passport Photo Maker',
    description: 'Create passport photos for India, US, UK, Schengen & more',
    page: 'passport-photo-maker',
    icon: <Image className="w-6 h-6 text-blue-400" />,
    badge: 'popular',
  },
  {
    title: 'Aadhaar Photo Resizer',
    description: 'Resize photos to Aadhaar card specifications (200×200, 480×640)',
    page: 'aadhaar-photo-resize',
    icon: <FileImage className="w-6 h-6 text-green-400" />,
  },
  {
    title: 'PAN Card Photo Resizer',
    description: 'Resize photos for NSDL and UTIITSL PAN card applications',
    page: 'pan-photo-resize',
    icon: <FileImage className="w-6 h-6 text-orange-400" />,
  },
  {
    title: 'SSC Photo Resizer',
    description: 'Resize photos for SSC CGL, CHSL, MTS, and GD exams',
    page: 'ssc-photo-resize',
    icon: <FileImage className="w-6 h-6 text-purple-400" />,
  },
  {
    title: 'Railway Photo Resizer',
    description: 'Resize photos for RRB NTPC, Group D, and ALP recruitment',
    page: 'railway-photo-resize',
    icon: <FileImage className="w-6 h-6 text-red-400" />,
  },
  {
    title: 'Police & Army Photo',
    description: 'Resize photos for Police, Army, and CAPF recruitment',
    page: 'police-army-photo',
    icon: <FileImage className="w-6 h-6 text-yellow-400" />,
  },
  {
    title: 'Visa Photo Resizer',
    description: 'Resize photos for US, UK, Schengen, Canada & Australia visas',
    page: 'visa-photo-resize',
    icon: <FileImage className="w-6 h-6 text-cyan-400" />,
  },
  {
    title: 'Signature Resizer',
    description: 'Resize signatures for Aadhaar, PAN, and exam applications',
    page: 'signature-resize',
    icon: <Stamp className="w-6 h-6 text-pink-400" />,
  },
];

const processingTools: ToolCard[] = [
  {
    title: 'Image Compressor',
    description: 'Compress images with quality control and target file size',
    page: 'image-compressor',
    icon: <Minimize2 className="w-6 h-6 text-blue-400" />,
    badge: 'popular',
  },
  {
    title: 'Image Cropper',
    description: 'Crop images with aspect ratio presets and custom dimensions',
    page: 'image-cropper',
    icon: <Crop className="w-6 h-6 text-green-400" />,
  },
  {
    title: 'DPI Changer',
    description: 'Change image DPI/resolution for print and digital use',
    page: 'dpi-changer',
    icon: <ScanLine className="w-6 h-6 text-purple-400" />,
  },
  {
    title: 'Custom Image Resizer',
    description: 'Resize by dimensions, percentage, file size, or social media presets',
    page: 'custom-image-resize',
    icon: <FileOutput className="w-6 h-6 text-orange-400" />,
    badge: 'popular',
  },
  {
    title: 'Background Remover',
    description: 'Remove or replace image backgrounds with custom colors',
    page: 'background-remover',
    icon: <Palette className="w-6 h-6 text-pink-400" />,
  },
];

const conversionTools: ToolCard[] = [
  {
    title: 'JPG to PNG Converter',
    description: 'Convert JPG images to PNG or WebP format',
    page: 'jpg-to-png',
    icon: <FileImage className="w-6 h-6 text-blue-400" />,
  },
  {
    title: 'PNG to JPG Converter',
    description: 'Convert PNG images to JPG or WebP format',
    page: 'png-to-jpg',
    icon: <FileImage className="w-6 h-6 text-green-400" />,
  },
  {
    title: 'WebP Converter',
    description: 'Convert images to/from WebP format',
    page: 'webp-converter',
    icon: <FileImage className="w-6 h-6 text-purple-400" />,
  },
];

function BadgeEl({ type }: { type: 'new' | 'pro' | 'popular' }) {
  if (type === 'pro') {
    return (
      <span className="flex items-center gap-1 px-2 py-0.5 bg-amber-500/20 border border-amber-500/50 text-amber-400 rounded-full text-xs font-bold">
        <Crown className="w-3 h-3" />
        PRO
      </span>
    );
  }
  if (type === 'popular') {
    return (
      <span className="px-2 py-0.5 bg-blue-500/20 border border-blue-500/50 text-blue-400 rounded-full text-xs font-bold">
        Popular
      </span>
    );
  }
  return (
    <span className="px-2 py-0.5 bg-green-500/20 border border-green-500/50 text-green-400 rounded-full text-xs font-bold">
      New
    </span>
  );
}

function ToolCardEl({ tool, onNavigate }: { tool: ToolCard; onNavigate: (page: string) => void }) {
  return (
    <button
      onClick={() => onNavigate(tool.page)}
      className="flex items-start gap-4 p-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-500 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg text-left w-full group"
    >
      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-gray-700 rounded-lg group-hover:bg-gray-600 transition-colors">
        {tool.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-gray-100 text-sm">{tool.title}</span>
          {tool.badge && <BadgeEl type={tool.badge} />}
        </div>
        <p className="text-gray-400 text-xs mt-1 leading-relaxed">{tool.description}</p>
      </div>
    </button>
  );
}

export default function ImageToolsPage({ onBack, onNavigate }: ImageToolsPageProps) {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <main className="max-w-5xl mx-auto px-4 py-8">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
          >
            ← Back
          </button>
        )}

        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Image Tools</h1>
          <p className="text-gray-400">
            Professional image processing tools for government documents, office use, and personal projects.
          </p>
        </div>

        {/* Government Document Photos */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
            <FileImage className="w-5 h-5 text-blue-400" />
            Government Document Photos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {governmentTools.map((tool) => (
              <ToolCardEl key={tool.page} tool={tool} onNavigate={onNavigate} />
            ))}
          </div>
        </section>

        {/* Image Processing */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-purple-400" />
            Image Processing
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {processingTools.map((tool) => (
              <ToolCardEl key={tool.page} tool={tool} onNavigate={onNavigate} />
            ))}
          </div>
        </section>

        {/* Format Conversion */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
            <FileOutput className="w-5 h-5 text-green-400" />
            Format Conversion
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {conversionTools.map((tool) => (
              <ToolCardEl key={tool.page} tool={tool} onNavigate={onNavigate} />
            ))}
          </div>
        </section>

        {/* Document Enhancement */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
            <ScanLine className="w-5 h-5 text-cyan-400" />
            Document Enhancement
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <ToolCardEl
              tool={{
                title: 'Smart Document Fixer',
                description: 'Auto-fix document photos: brightness, contrast, crop guides, and more',
                page: 'smart-document-fixer',
                icon: <ScanLine className="w-6 h-6 text-cyan-400" />,
              }}
              onNavigate={onNavigate}
            />
          </div>
        </section>

        {/* Pro Tools Section */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-400" />
              Pro Tools
            </h2>
            <span className="px-2 py-0.5 bg-amber-500/20 border border-amber-500/50 text-amber-400 rounded-full text-xs font-bold">
              Premium
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <ToolCardEl
              tool={{
                title: 'AI Document Enhancer',
                description: 'AI-powered document enhancement: fix lighting, sharpen text, remove noise',
                page: 'ai-document-enhancer',
                icon: <Sparkles className="w-6 h-6 text-amber-400" />,
                badge: 'pro',
              }}
              onNavigate={onNavigate}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
