import { BasePDFTool } from "@/components/pdf-tools/BasePDFTool";
import {
  ArrowLeft,
  BookOpen,
  Camera,
  ChevronRight,
  FileImage,
  FileOutput,
  FileText,
  Image,
  Layers,
  Minimize2,
  Palette,
  RotateCcw,
  Scissors,
  Shield,
  Zap,
} from "lucide-react";

interface PDFToolsPageProps {
  onNavigate: (page: string) => void;
  currentTool?: string;
}

const pdfToolsConfig = [
  {
    id: "merge",
    icon: <Layers className="w-6 h-6" />,
    title: "Merge PDF",
    description: "Combine multiple PDF files into one document",
    accept: ".pdf",
    buttonLabel: "Merge PDFs",
    processingMessage: "Merging PDFs...",
    outputName: "merged.pdf",
    outputType: "application/pdf",
    colorClass: "text-blue-400",
  },
  {
    id: "split",
    icon: <Scissors className="w-6 h-6" />,
    title: "Split PDF",
    description: "Split a PDF into multiple individual files",
    accept: ".pdf",
    buttonLabel: "Split PDF",
    processingMessage: "Splitting PDF...",
    outputName: "split.pdf",
    outputType: "application/pdf",
    colorClass: "text-orange-400",
  },
  {
    id: "compress",
    icon: <Minimize2 className="w-6 h-6" />,
    title: "Compress PDF",
    description: "Reduce PDF file size while maintaining quality",
    accept: ".pdf",
    buttonLabel: "Compress PDF",
    processingMessage: "Compressing PDF...",
    outputName: "compressed.pdf",
    outputType: "application/pdf",
    colorClass: "text-green-400",
  },
  {
    id: "pdf-to-word",
    icon: <FileText className="w-6 h-6" />,
    title: "PDF to Word",
    description: "Convert PDF documents to editable Word files",
    accept: ".pdf",
    buttonLabel: "Convert to Word",
    processingMessage: "Converting to Word...",
    outputName: "converted.docx",
    outputType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    colorClass: "text-blue-400",
  },
  {
    id: "word-to-pdf",
    icon: <FileOutput className="w-6 h-6" />,
    title: "Word to PDF",
    description: "Convert Word documents to PDF format",
    accept: ".doc,.docx",
    buttonLabel: "Convert to PDF",
    processingMessage: "Converting to PDF...",
    outputName: "converted.pdf",
    outputType: "application/pdf",
    colorClass: "text-orange-400",
  },
  {
    id: "pdf-to-jpg",
    icon: <FileImage className="w-6 h-6" />,
    title: "PDF to JPG",
    description: "Extract and convert PDF pages to JPG images",
    accept: ".pdf",
    buttonLabel: "Convert to JPG",
    processingMessage: "Converting to JPG...",
    outputName: "page.jpg",
    outputType: "image/jpeg",
    colorClass: "text-yellow-400",
  },
  {
    id: "jpg-to-pdf",
    icon: <Camera className="w-6 h-6" />,
    title: "JPG to PDF",
    description: "Convert JPG images to PDF documents",
    accept: ".jpg,.jpeg",
    buttonLabel: "Convert to PDF",
    processingMessage: "Converting to PDF...",
    outputName: "converted.pdf",
    outputType: "application/pdf",
    colorClass: "text-green-400",
  },
  {
    id: "rotate",
    icon: <RotateCcw className="w-6 h-6" />,
    title: "Rotate PDF",
    description: "Rotate PDF pages to the correct orientation",
    accept: ".pdf",
    buttonLabel: "Rotate PDF",
    processingMessage: "Rotating PDF...",
    outputName: "rotated.pdf",
    outputType: "application/pdf",
    colorClass: "text-purple-400",
  },
  {
    id: "watermark",
    icon: <Palette className="w-6 h-6" />,
    title: "Add Watermark",
    description: "Add text or image watermarks to PDF pages",
    accept: ".pdf",
    buttonLabel: "Add Watermark",
    processingMessage: "Adding watermark...",
    outputName: "watermarked.pdf",
    outputType: "application/pdf",
    colorClass: "text-pink-400",
  },
  {
    id: "protect",
    icon: <Shield className="w-6 h-6" />,
    title: "Protect PDF",
    description: "Password protect your PDF documents",
    accept: ".pdf",
    buttonLabel: "Protect PDF",
    processingMessage: "Protecting PDF...",
    outputName: "protected.pdf",
    outputType: "application/pdf",
    colorClass: "text-red-400",
  },
  {
    id: "unlock",
    icon: <Zap className="w-6 h-6" />,
    title: "Unlock PDF",
    description: "Remove password protection from PDF files",
    accept: ".pdf",
    buttonLabel: "Unlock PDF",
    processingMessage: "Unlocking PDF...",
    outputName: "unlocked.pdf",
    outputType: "application/pdf",
    colorClass: "text-yellow-400",
  },
  {
    id: "page-numbers",
    icon: <BookOpen className="w-6 h-6" />,
    title: "Add Page Numbers",
    description: "Add page numbers to your PDF documents",
    accept: ".pdf",
    buttonLabel: "Add Page Numbers",
    processingMessage: "Adding page numbers...",
    outputName: "numbered.pdf",
    outputType: "application/pdf",
    colorClass: "text-blue-400",
  },
  {
    id: "pdf-to-png",
    icon: <Image className="w-6 h-6" />,
    title: "PDF to PNG",
    description: "Convert PDF pages to high-quality PNG images",
    accept: ".pdf",
    buttonLabel: "Convert to PNG",
    processingMessage: "Converting to PNG...",
    outputName: "page.png",
    outputType: "image/png",
    colorClass: "text-green-400",
  },
  {
    id: "png-to-pdf",
    icon: <FileOutput className="w-6 h-6" />,
    title: "PNG to PDF",
    description: "Convert PNG images to PDF documents",
    accept: ".png",
    buttonLabel: "Convert to PDF",
    processingMessage: "Converting to PDF...",
    outputName: "converted.pdf",
    outputType: "application/pdf",
    colorClass: "text-orange-400",
  },
  {
    id: "excel-to-pdf",
    icon: <FileText className="w-6 h-6" />,
    title: "Excel to PDF",
    description: "Convert Excel spreadsheets to PDF format",
    accept: ".xls,.xlsx",
    buttonLabel: "Convert to PDF",
    processingMessage: "Converting to PDF...",
    outputName: "converted.pdf",
    outputType: "application/pdf",
    colorClass: "text-green-400",
  },
  {
    id: "pdf-to-excel",
    icon: <FileText className="w-6 h-6" />,
    title: "PDF to Excel",
    description: "Convert PDF tables to Excel spreadsheets",
    accept: ".pdf",
    buttonLabel: "Convert to Excel",
    processingMessage: "Converting to Excel...",
    outputName: "converted.xlsx",
    outputType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    colorClass: "text-blue-400",
  },
];

export default function PDFToolsPage({
  onNavigate,
  currentTool,
}: PDFToolsPageProps) {
  if (currentTool) {
    const toolConfig = pdfToolsConfig.find((t) => t.id === currentTool);
    if (toolConfig) {
      return (
        <div
          className="min-h-screen py-8 px-4"
          style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)" }}
        >
          <div className="max-w-4xl mx-auto">
            <button
              type="button"
              onClick={() => onNavigate("pdf-tools")}
              className="flex items-center gap-2 text-slate-300 hover:text-white mb-8 transition-colors duration-200 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to PDF Tools
            </button>
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
                {toolConfig.title}
              </h1>
              <p className="text-slate-300">{toolConfig.description}</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700">
              <BasePDFTool
                onBack={() => onNavigate("pdf-tools")}
                title={toolConfig.title}
                description={toolConfig.description}
                accept={toolConfig.accept}
                buttonLabel={toolConfig.buttonLabel}
                processingMessage={toolConfig.processingMessage}
                outputName={toolConfig.outputName}
                outputType={toolConfig.outputType}
              />
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div
      className="min-h-screen py-8 px-4"
      style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 text-slate-300 hover:text-white mb-8 transition-colors duration-200 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Home
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            PDF Tools
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Complete PDF toolkit — merge, split, compress, convert and more. All
            processing in your browser.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {pdfToolsConfig.map((tool) => (
            <div
              key={tool.id}
              className="bg-gray-900 hover:bg-gray-800 rounded-xl p-4 sm:p-6 cursor-pointer transition-colors duration-200 ease-in-out border border-gray-700 hover:border-gray-500 group flex flex-col"
              onClick={() => onNavigate(`pdf-tools/${tool.id}`)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  onNavigate(`pdf-tools/${tool.id}`);
              }}
              // biome-ignore lint/a11y/useSemanticElements: card layout requires div container
              role="button"
              tabIndex={0}
            >
              <div
                className={`${tool.colorClass} mb-3 group-hover:scale-110 transition-transform duration-200 shrink-0`}
              >
                {tool.icon}
              </div>
              <h3 className="text-white font-semibold text-sm mb-2 leading-tight">
                {tool.title}
              </h3>
              <p className="text-slate-300 text-xs flex-1 mb-4">
                {tool.description}
              </p>
              <button
                type="button"
                className="w-full min-h-[48px] px-6 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-md flex items-center justify-center gap-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate(`pdf-tools/${tool.id}`);
                }}
              >
                Use Tool <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
