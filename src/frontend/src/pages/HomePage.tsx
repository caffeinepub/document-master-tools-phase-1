import {
  Award,
  BookOpen,
  Briefcase,
  Calculator,
  Camera,
  ChevronRight,
  Clock,
  DollarSign,
  FileImage,
  FileOutput,
  FileText,
  Flame,
  Gamepad2,
  GraduationCap,
  Heart,
  Image,
  Keyboard,
  Layers,
  Maximize2,
  Minimize2,
  Palette,
  RotateCcw,
  ScanLine,
  Scissors,
  Shield,
  Star,
  UserCheck,
  Users,
  Wand2,
  Zap,
} from "lucide-react";
import { useState } from "react";
import SEO from "../components/SEO";
import { useLanguage } from "../contexts/LanguageContext";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [_hoveredCard, setHoveredCard] = useState<string | null>(null);
  const { t } = useLanguage();

  const calculatorCategories = [
    {
      id: "academic",
      icon: <BookOpen className="w-8 h-8" />,
      title: "Academic Calculators",
      description: "CGPA, SGPA, GPA, Grade Calculator and more",
      tools: [
        "CGPA Calculator",
        "SGPA Calculator",
        "GPA Calculator",
        "Grade Calculator",
        "Marks % Calculator",
      ],
      color: "from-blue-500 to-blue-700",
      page: "calculators",
    },
    {
      id: "financial",
      icon: <DollarSign className="w-8 h-8" />,
      title: "Financial Calculators",
      description: "EMI, GST, Loan, Interest calculators",
      tools: [
        "EMI Calculator",
        "GST Calculator",
        "Loan Calculator",
        "Compound Interest",
        "Simple Interest",
      ],
      color: "from-green-500 to-green-700",
      page: "calculators",
    },
    {
      id: "health",
      icon: <Heart className="w-8 h-8" />,
      title: "Health & Utility",
      description: "BMI, Age, Date, Time calculators",
      tools: [
        "BMI Calculator",
        "Age Calculator",
        "Date Difference",
        "Time Duration",
        "Discount Calculator",
      ],
      color: "from-red-500 to-red-700",
      page: "calculators",
    },
  ];

  const pdfTools = [
    {
      id: "merge",
      icon: <Layers className="w-6 h-6" />,
      title: "Merge PDF",
      description: "Combine multiple PDFs into one",
    },
    {
      id: "split",
      icon: <Scissors className="w-6 h-6" />,
      title: "Split PDF",
      description: "Split PDF into multiple files",
    },
    {
      id: "compress",
      icon: <Minimize2 className="w-6 h-6" />,
      title: "Compress PDF",
      description: "Reduce PDF file size",
    },
    {
      id: "pdf-to-word",
      icon: <FileText className="w-6 h-6" />,
      title: "PDF to Word",
      description: "Convert PDF to editable Word",
    },
    {
      id: "word-to-pdf",
      icon: <FileOutput className="w-6 h-6" />,
      title: "Word to PDF",
      description: "Convert Word docs to PDF",
    },
    {
      id: "pdf-to-jpg",
      icon: <FileImage className="w-6 h-6" />,
      title: "PDF to JPG",
      description: "Extract images from PDF",
    },
    {
      id: "jpg-to-pdf",
      icon: <Camera className="w-6 h-6" />,
      title: "JPG to PDF",
      description: "Convert images to PDF",
    },
    {
      id: "rotate",
      icon: <RotateCcw className="w-6 h-6" />,
      title: "Rotate PDF",
      description: "Rotate PDF pages",
    },
    {
      id: "watermark",
      icon: <Palette className="w-6 h-6" />,
      title: "Add Watermark",
      description: "Add watermark to PDF",
    },
    {
      id: "protect",
      icon: <Shield className="w-6 h-6" />,
      title: "Protect PDF",
      description: "Password protect your PDF",
    },
    {
      id: "unlock",
      icon: <Zap className="w-6 h-6" />,
      title: "Unlock PDF",
      description: "Remove PDF password",
    },
    {
      id: "page-numbers",
      icon: <BookOpen className="w-6 h-6" />,
      title: "Page Numbers",
      description: "Add page numbers to PDF",
    },
    {
      id: "pdf-to-png",
      icon: <Image className="w-6 h-6" />,
      title: "PDF to PNG",
      description: "Convert PDF pages to PNG",
    },
    {
      id: "png-to-pdf",
      icon: <FileOutput className="w-6 h-6" />,
      title: "PNG to PDF",
      description: "Convert PNG images to PDF",
    },
    {
      id: "excel-to-pdf",
      icon: <FileText className="w-6 h-6" />,
      title: "Excel to PDF",
      description: "Convert Excel to PDF",
    },
    {
      id: "pdf-to-excel",
      icon: <FileText className="w-6 h-6" />,
      title: "PDF to Excel",
      description: "Convert PDF to Excel",
    },
  ];

  const imageTools = [
    {
      id: "passport-photo",
      icon: <Camera className="w-6 h-6" />,
      title: "Passport Photo Maker",
      description: "Create standard passport photos",
    },
    {
      id: "aadhaar-photo",
      icon: <UserCheck className="w-6 h-6" />,
      title: "Aadhaar Photo Resize",
      description: "Resize photos for Aadhaar card",
    },
    {
      id: "pan-photo",
      icon: <UserCheck className="w-6 h-6" />,
      title: "PAN Photo Resize",
      description: "Resize photos for PAN card",
    },
    {
      id: "ssc-photo",
      icon: <GraduationCap className="w-6 h-6" />,
      title: "SSC Photo Resize",
      description: "Resize for SSC exam forms",
    },
    {
      id: "railway-photo",
      icon: <Briefcase className="w-6 h-6" />,
      title: "Railway Photo Resize",
      description: "Resize for Railway recruitment",
    },
    {
      id: "police-army-photo",
      icon: <Shield className="w-6 h-6" />,
      title: "Police/Army Photo",
      description: "Resize for Police/Army forms",
    },
    {
      id: "visa-photo",
      icon: <Camera className="w-6 h-6" />,
      title: "Visa Photo Resize",
      description: "Resize for visa applications",
    },
    {
      id: "signature-resize",
      icon: <Palette className="w-6 h-6" />,
      title: "Signature Resize",
      description: "Resize signature images",
    },
    {
      id: "image-compressor",
      icon: <Minimize2 className="w-6 h-6" />,
      title: "Image Compressor",
      description: "Compress images without quality loss",
    },
    {
      id: "image-cropper",
      icon: <Scissors className="w-6 h-6" />,
      title: "Image Cropper",
      description: "Crop images to any size",
    },
    {
      id: "dpi-changer",
      icon: <Maximize2 className="w-6 h-6" />,
      title: "DPI Changer",
      description: "Change image DPI/resolution",
    },
    {
      id: "custom-resize",
      icon: <Maximize2 className="w-6 h-6" />,
      title: "Custom Image Resize",
      description: "Resize to any custom dimensions",
    },
    {
      id: "jpg-to-png",
      icon: <FileImage className="w-6 h-6" />,
      title: "JPG to PNG",
      description: "Convert JPG images to PNG",
    },
    {
      id: "png-to-jpg",
      icon: <FileImage className="w-6 h-6" />,
      title: "PNG to JPG",
      description: "Convert PNG images to JPG",
    },
    {
      id: "webp-converter",
      icon: <FileImage className="w-6 h-6" />,
      title: "WebP Converter",
      description: "Convert images to/from WebP",
    },
    {
      id: "background-remover",
      icon: <Layers className="w-6 h-6" />,
      title: "Background Remover",
      description: "Remove image backgrounds",
    },
  ];

  const proTools = [
    {
      id: "ai-document-enhancer",
      icon: <Wand2 className="w-6 h-6" />,
      title: "AI Document Enhancer",
      description: "AI-powered document enhancement",
      badge: "PRO",
    },
    {
      id: "smart-document-fixer",
      icon: <ScanLine className="w-6 h-6" />,
      title: "Smart Document Fixer",
      description: "Fix scanned document quality",
      badge: "PRO",
    },
  ];

  const resumeTemplates = [
    {
      id: "indian-fresher",
      title: "Indian Fresher",
      description: "Perfect for fresh graduates",
    },
    {
      id: "experienced-professional",
      title: "Experienced Professional",
      description: "For 2+ years experience",
    },
    {
      id: "it-software",
      title: "IT & Software",
      description: "Tech industry focused",
    },
    {
      id: "simple-clean",
      title: "Simple & Clean",
      description: "Minimalist design",
    },
  ];

  const trustBadges = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "10 Lakh+ Users",
      description: "Trusted by millions",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "100% Private",
      description: "Files never stored",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Instant Processing",
      description: "Results in seconds",
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="DocMasterTools.com – Free Online Document, PDF, Image & Typing Tools"
        description="Free online tools for PDF, image editing, resume builder, calculators, and typing tests. All processing done locally in your browser – no uploads, no data stored."
        canonicalUrl="https://docmastertools.com/"
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-orange-900/20" />
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <img
              src="/assets/generated/docmastertools-logo.dim_540x270.png"
              alt="DocMasterTools"
              className="w-[120px] sm:w-[180px] max-w-[180px] h-auto block mx-auto"
            />
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            {t("home.hero.heading")}{" "}
            <span className="text-orange-400">{t("home.hero.brand")}</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            {t("home.hero.tagline")}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              type="button"
              onClick={() => onNavigate("calculators")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg flex items-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              {t("home.buttons.exploreCalculators")}
            </button>
            <button
              type="button"
              onClick={() => onNavigate("pdf-tools")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg flex items-center gap-2"
            >
              <FileText className="w-5 h-5" />
              {t("home.buttons.explorePDF")}
            </button>
            <button
              type="button"
              onClick={() => onNavigate("image-tools")}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg flex items-center gap-2"
            >
              <Image className="w-5 h-5" />
              {t("home.buttons.exploreImage")}
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {trustBadges.map((badge) => (
              <div
                key={badge.title}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3"
              >
                <div className="text-orange-400 shrink-0">{badge.icon}</div>
                <div className="text-left">
                  <div className="font-semibold text-white text-sm">
                    {badge.title}
                  </div>
                  <div className="text-slate-300 text-xs">
                    {badge.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Hub */}
      <section className="py-12 md:py-16 bg-slate-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {t("home.calculatorHub.title")}
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              {t("home.calculatorHub.description")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {calculatorCategories.map((cat) => (
              <div
                key={cat.id}
                className="bg-slate-700 hover:bg-slate-600 rounded-xl p-6 cursor-pointer transition-all duration-200 hover:shadow-xl hover:scale-105 border border-slate-600 hover:border-slate-500"
                onClick={() => onNavigate("calculators")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    onNavigate("calculators");
                }}
                onMouseEnter={() => setHoveredCard(cat.id)}
                onMouseLeave={() => setHoveredCard(null)}
                // biome-ignore lint/a11y/useSemanticElements: card layout requires div container
                role="button"
                tabIndex={0}
              >
                <div
                  className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${cat.color} text-white mb-4`}
                >
                  {cat.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {cat.title}
                </h3>
                <p className="text-slate-300 text-sm mb-4">{cat.description}</p>
                <ul className="space-y-1">
                  {cat.tools.slice(0, 3).map((tool) => (
                    <li
                      key={tool}
                      className="text-slate-400 text-xs flex items-center gap-1"
                    >
                      <ChevronRight className="w-3 h-3 text-blue-400" />
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={() => onNavigate("calculators")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg inline-flex items-center gap-2"
            >
              View All Calculators <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* PDF Tools */}
      <section className="py-12 md:py-16 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {t("home.pdfTools.title")}
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              {t("home.pdfTools.description")}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
            {pdfTools.map((tool) => (
              <div
                key={tool.id}
                className="bg-slate-800 hover:bg-slate-700 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:shadow-lg border border-slate-700 hover:border-slate-500 group"
                onClick={() => onNavigate(`pdf-tools/${tool.id}`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    onNavigate(`pdf-tools/${tool.id}`);
                }}
                // biome-ignore lint/a11y/useSemanticElements: card layout requires div container
                role="button"
                tabIndex={0}
              >
                <div className="text-orange-400 mb-3 group-hover:scale-110 transition-transform duration-200">
                  {tool.icon}
                </div>
                <h3 className="text-white font-semibold text-sm mb-1">
                  {tool.title}
                </h3>
                <p className="text-slate-400 text-xs">{tool.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={() => onNavigate("pdf-tools")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg inline-flex items-center gap-2"
            >
              {t("home.buttons.explorePDF")}{" "}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Image Tools */}
      <section className="py-12 md:py-16 bg-slate-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {t("home.imageTools.title")}
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              {t("home.imageTools.description")}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
            {imageTools.map((tool) => (
              <div
                key={tool.id}
                className="bg-slate-700 hover:bg-slate-600 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:shadow-lg border border-slate-600 hover:border-slate-400 group"
                onClick={() => onNavigate(`image-tools/${tool.id}`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    onNavigate(`image-tools/${tool.id}`);
                }}
                // biome-ignore lint/a11y/useSemanticElements: card layout requires div container
                role="button"
                tabIndex={0}
              >
                <div className="text-green-400 mb-3 group-hover:scale-110 transition-transform duration-200">
                  {tool.icon}
                </div>
                <h3 className="text-white font-semibold text-sm mb-1">
                  {tool.title}
                </h3>
                <p className="text-slate-400 text-xs">{tool.description}</p>
              </div>
            ))}
          </div>

          {/* Pro Tools */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              Pro Tools
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {proTools.map((tool) => (
                <div
                  key={tool.id}
                  className="bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:shadow-lg border border-yellow-500/30 hover:border-yellow-500/60 group"
                  onClick={() => onNavigate(`image-tools/${tool.id}`)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
                      onNavigate(`image-tools/${tool.id}`);
                  }}
                  // biome-ignore lint/a11y/useSemanticElements: card layout requires div container
                  role="button"
                  tabIndex={0}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-yellow-400 shrink-0 group-hover:scale-110 transition-transform duration-200">
                      {tool.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-white font-semibold text-sm">
                          {tool.title}
                        </h4>
                        <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded-full shrink-0">
                          {tool.badge}
                        </span>
                      </div>
                      <p className="text-slate-300 text-xs">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => onNavigate("image-tools")}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg inline-flex items-center gap-2"
            >
              {t("home.imageTools.viewAll")}{" "}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Resume Builder */}
      <section className="py-12 md:py-16 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {t("home.resumeBuilder.title")}
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              {t("home.resumeBuilder.description")}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {resumeTemplates.map((template) => (
              <div
                key={template.id}
                className="bg-slate-800 hover:bg-slate-700 rounded-xl p-5 cursor-pointer transition-all duration-200 hover:shadow-lg border border-slate-700 hover:border-slate-500 group text-center"
                onClick={() => onNavigate(`resume-builder/${template.id}`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    onNavigate(`resume-builder/${template.id}`);
                }}
                // biome-ignore lint/a11y/useSemanticElements: card layout requires div container
                role="button"
                tabIndex={0}
              >
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold text-sm mb-1">
                  {template.title}
                </h3>
                <p className="text-slate-400 text-xs">{template.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={() => onNavigate("resume-builder")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg inline-flex items-center gap-2"
            >
              View All Templates <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Typing Test Tool */}
      <section className="py-12 md:py-16 bg-slate-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Typing Tools
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Test and improve your typing speed and accuracy
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <div
              className="bg-slate-700 hover:bg-slate-600 rounded-xl p-5 cursor-pointer transition-all duration-200 hover:shadow-lg border border-slate-600 hover:border-slate-400 group"
              onClick={() => onNavigate("typing-test")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  onNavigate("typing-test");
              }}
              // biome-ignore lint/a11y/useSemanticElements: card layout requires div container
              role="button"
              tabIndex={0}
              data-ocid="typing_test.card"
            >
              <div className="text-blue-400 mb-3 group-hover:scale-110 transition-transform duration-200">
                <Keyboard className="w-6 h-6" />
              </div>
              <h3 className="text-white font-semibold text-sm mb-1">
                Typing Test
              </h3>
              <p className="text-slate-400 text-xs">
                Test WPM, accuracy &amp; mistakes — 1, 3 or 5 minute tests
              </p>
            </div>

            <div
              className="bg-slate-700 hover:bg-slate-600 rounded-xl p-5 cursor-pointer transition-all duration-200 hover:shadow-lg border border-slate-600 hover:border-slate-400 group"
              onClick={() => onNavigate("typing-games")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  onNavigate("typing-games");
              }}
              // biome-ignore lint/a11y/useSemanticElements: card layout requires div container
              role="button"
              tabIndex={0}
              data-ocid="typing_games.card"
            >
              <div className="text-purple-400 mb-3 group-hover:scale-110 transition-transform duration-200">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <h3 className="text-white font-semibold text-sm mb-1">
                Typing Games
              </h3>
              <p className="text-slate-400 text-xs">
                Speed Race, Falling Words &amp; Word Shooter — learn by playing
              </p>
            </div>

            <div
              className="bg-slate-700 hover:bg-slate-600 rounded-xl p-5 cursor-pointer transition-all duration-200 hover:shadow-lg border border-slate-600 hover:border-slate-400 group"
              onClick={() => onNavigate("daily-typing-challenge")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  onNavigate("daily-typing-challenge");
              }}
              // biome-ignore lint/a11y/useSemanticElements: card layout requires div container
              role="button"
              tabIndex={0}
              data-ocid="daily_typing_challenge.card"
            >
              <div className="text-orange-400 mb-3 group-hover:scale-110 transition-transform duration-200">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="text-white font-semibold text-sm mb-1">
                Daily Typing Challenge
              </h3>
              <p className="text-slate-400 text-xs">
                New challenge every day — compete on today's leaderboard
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Why Choose DocMasterTools?
            </h2>
            <p className="text-slate-300">
              Built for speed, privacy, and ease of use
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                title: "100% Private",
                description:
                  "All processing happens in your browser. Your files never leave your device.",
                color: "text-blue-400",
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Lightning Fast",
                description:
                  "Instant results with client-side processing. No waiting for server uploads.",
                color: "text-yellow-400",
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: "Completely Free",
                description:
                  "All basic tools are free forever. No hidden charges or subscriptions.",
                color: "text-green-400",
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "High Quality",
                description:
                  "Professional-grade output quality for all your document needs.",
                color: "text-orange-400",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Trusted by Millions",
                description:
                  "Over 10 lakh users trust DocMasterTools for their daily document needs.",
                color: "text-purple-400",
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: "Always Available",
                description:
                  "Available 24/7 with no downtime. Process documents anytime, anywhere.",
                color: "text-red-400",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-slate-700 rounded-xl p-6 border border-slate-600"
              >
                <div className={`${feature.color} mb-4`}>{feature.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-300 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
