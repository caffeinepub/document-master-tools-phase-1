import {
  ArrowLeft,
  Briefcase,
  Camera,
  ChevronRight,
  FileImage,
  GraduationCap,
  Layers,
  Maximize2,
  Minimize2,
  ScanLine,
  Scissors,
  Shield,
  UserCheck,
  Wand2,
} from "lucide-react";

interface ImageToolsPageProps {
  onNavigate: (page: string) => void;
}

export default function ImageToolsPage({ onNavigate }: ImageToolsPageProps) {
  const governmentPhotoTools = [
    {
      id: "image-passport-photo",
      icon: <Camera className="w-6 h-6" />,
      title: "Passport Photo Maker",
      description:
        "Create standard passport photos for India, US, UK, Schengen & more",
      badge: null,
    },
    {
      id: "image-aadhaar-photo",
      icon: <UserCheck className="w-6 h-6" />,
      title: "Aadhaar Photo Resize",
      description:
        "Resize photos to exact Aadhaar card specifications (200×200, 480×640)",
      badge: null,
    },
    {
      id: "image-pan-photo",
      icon: <UserCheck className="w-6 h-6" />,
      title: "PAN Card Photo Resize",
      description: "Resize photos for NSDL and UTIITSL PAN card applications",
      badge: null,
    },
    {
      id: "image-ssc-photo",
      icon: <GraduationCap className="w-6 h-6" />,
      title: "SSC Photo Resize",
      description: "Resize photos for SSC CGL, CHSL, MTS, and GD exam forms",
      badge: null,
    },
    {
      id: "image-railway-photo",
      icon: <Briefcase className="w-6 h-6" />,
      title: "Railway Photo Resize",
      description: "Resize photos for RRB NTPC, Group D, and ALP recruitment",
      badge: null,
    },
    {
      id: "image-police-army-photo",
      icon: <Shield className="w-6 h-6" />,
      title: "Police/Army Photo",
      description: "Resize photos for Police, Army, and CAPF recruitment forms",
      badge: null,
    },
    {
      id: "image-visa-photo",
      icon: <Camera className="w-6 h-6" />,
      title: "Visa Photo Resize",
      description:
        "Resize photos for US, UK, Schengen, Canada & Australia visas",
      badge: null,
    },
    {
      id: "image-signature-resize",
      icon: <UserCheck className="w-6 h-6" />,
      title: "Signature Resize",
      description: "Resize signature images for Aadhaar, PAN, and exam forms",
      badge: null,
    },
  ];

  const imageProcessingTools = [
    {
      id: "image-compressor",
      icon: <Minimize2 className="w-6 h-6" />,
      title: "Image Compressor",
      description: "Compress images without visible quality loss",
      badge: null,
    },
    {
      id: "image-cropper",
      icon: <Scissors className="w-6 h-6" />,
      title: "Image Cropper",
      description: "Crop images to any size with aspect ratio presets",
      badge: null,
    },
    {
      id: "image-dpi-changer",
      icon: <Maximize2 className="w-6 h-6" />,
      title: "DPI Changer",
      description: "Change image DPI/resolution for print and digital use",
      badge: null,
    },
    {
      id: "image-custom-resize",
      icon: <Maximize2 className="w-6 h-6" />,
      title: "Custom Image Resize",
      description: "Resize images to any custom dimensions or file size",
      badge: null,
    },
  ];

  const formatConversionTools = [
    {
      id: "image-jpg-to-png",
      icon: <FileImage className="w-6 h-6" />,
      title: "JPG to PNG",
      description: "Convert JPG images to PNG format",
      badge: null,
    },
    {
      id: "image-png-to-jpg",
      icon: <FileImage className="w-6 h-6" />,
      title: "PNG to JPG",
      description: "Convert PNG images to JPG format",
      badge: null,
    },
    {
      id: "image-webp-converter",
      icon: <FileImage className="w-6 h-6" />,
      title: "WebP Converter",
      description: "Convert images to/from WebP format",
      badge: null,
    },
    {
      id: "image-background-remover",
      icon: <Layers className="w-6 h-6" />,
      title: "Background Remover",
      description: "Remove image backgrounds with multiple fill options",
      badge: null,
    },
  ];

  const documentEnhancementTools = [
    {
      id: "smart-document-fixer",
      icon: <ScanLine className="w-6 h-6" />,
      title: "Smart Document Fixer",
      description:
        "Fix scanned document quality with brightness/contrast controls",
      badge: "PRO",
    },
    {
      id: "ai-document-enhancer",
      icon: <Wand2 className="w-6 h-6" />,
      title: "AI Document Enhancer",
      description: "AI-powered document enhancement for professional results",
      badge: "PRO",
    },
  ];

  const renderToolCard = (
    tool: {
      id: string;
      icon: React.ReactNode;
      title: string;
      description: string;
      badge: string | null;
    },
    colorClass: string,
  ) => (
    <div
      key={tool.id}
      className="bg-gray-900 hover:bg-gray-800 rounded-xl p-4 sm:p-6 cursor-pointer transition-colors duration-200 ease-in-out border border-gray-700 hover:border-gray-500 group flex flex-col"
      onClick={() => onNavigate(tool.id)}
    >
      <div
        className={`${colorClass} mb-3 group-hover:scale-110 transition-transform duration-200 shrink-0`}
      >
        {tool.icon}
      </div>
      <div className="flex items-start gap-2 mb-2">
        <h3 className="text-white font-semibold text-sm leading-tight">
          {tool.title}
        </h3>
        {tool.badge && (
          <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded-full shrink-0">
            {tool.badge}
          </span>
        )}
      </div>
      <p className="text-slate-300 text-xs flex-1">{tool.description}</p>
      <button
        className="mt-4 w-full min-h-[48px] px-6 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-md flex items-center justify-center gap-1"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate(tool.id);
        }}
      >
        Use Tool <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div
      className="min-h-screen py-8 px-4"
      style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 text-slate-300 hover:text-white mb-8 transition-colors duration-200 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Home
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Image Tools
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Free online image tools — resize, compress, convert, and enhance
            images. All processing happens in your browser.
          </p>
        </div>

        {/* Government Photo Tools */}
        <section className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-400" />
            Government &amp; ID Photo Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {governmentPhotoTools.map((tool) =>
              renderToolCard(tool, "text-blue-400"),
            )}
          </div>
        </section>

        {/* Image Processing Tools */}
        <section className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Maximize2 className="w-6 h-6 text-green-400" />
            Image Processing Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {imageProcessingTools.map((tool) =>
              renderToolCard(tool, "text-green-400"),
            )}
          </div>
        </section>

        {/* Format Conversion Tools */}
        <section className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <FileImage className="w-6 h-6 text-orange-400" />
            Format Conversion Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {formatConversionTools.map((tool) =>
              renderToolCard(tool, "text-orange-400"),
            )}
          </div>
        </section>

        {/* Document Enhancement Tools */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Wand2 className="w-6 h-6 text-yellow-400" />
            Document Enhancement Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {documentEnhancementTools.map((tool) =>
              renderToolCard(tool, "text-yellow-400"),
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
