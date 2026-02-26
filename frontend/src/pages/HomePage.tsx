import {
  Calculator,
  FileText,
  Image,
  FileOutput,
  Minimize2,
  Crop,
  ScanLine,
  FileImage,
  Stamp,
  Palette,
  Wand2,
  Crown,
  Sparkles,
  BookOpen,
  GraduationCap,
  DollarSign,
  Heart,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

interface ToolItem {
  title: string;
  description: string;
  path: string;
  icon: React.ReactNode;
}

const pdfTools: ToolItem[] = [
  { title: 'PDF Compress', description: 'Reduce PDF file size', path: '/pdf-tools', icon: <Minimize2 className="w-5 h-5 text-red-400" /> },
  { title: 'PDF Merge', description: 'Combine multiple PDFs', path: '/pdf-tools', icon: <FileText className="w-5 h-5 text-orange-400" /> },
  { title: 'PDF Split', description: 'Split PDF into pages', path: '/pdf-tools', icon: <FileOutput className="w-5 h-5 text-yellow-400" /> },
  { title: 'PDF to Image', description: 'Convert PDF pages to images', path: '/pdf-tools', icon: <FileImage className="w-5 h-5 text-green-400" /> },
  { title: 'Image to PDF', description: 'Convert images to PDF', path: '/pdf-tools', icon: <FileText className="w-5 h-5 text-blue-400" /> },
  { title: 'PDF Watermark', description: 'Add stamps & watermarks', path: '/pdf-tools', icon: <Stamp className="w-5 h-5 text-purple-400" /> },
];

const imageTools: ToolItem[] = [
  { title: 'Passport Photo', description: 'Create passport photos', path: '/image-tools/passport-photo', icon: <Image className="w-5 h-5 text-blue-400" /> },
  { title: 'Image Compressor', description: 'Compress images', path: '/image-tools/compress', icon: <Minimize2 className="w-5 h-5 text-green-400" /> },
  { title: 'Image Resizer', description: 'Resize to any dimension', path: '/image-tools/resize', icon: <FileOutput className="w-5 h-5 text-orange-400" /> },
  { title: 'Background Remover', description: 'Remove backgrounds', path: '/image-tools/background-remover', icon: <Palette className="w-5 h-5 text-pink-400" /> },
  { title: 'Image Cropper', description: 'Crop with presets', path: '/image-tools/crop', icon: <Crop className="w-5 h-5 text-purple-400" /> },
  { title: 'DPI Changer', description: 'Change image resolution', path: '/image-tools/dpi-changer', icon: <ScanLine className="w-5 h-5 text-cyan-400" /> },
  { title: 'JPG to PNG', description: 'Convert image formats', path: '/image-tools/jpg-to-png', icon: <FileImage className="w-5 h-5 text-yellow-400" /> },
  { title: 'Smart Doc Fixer', description: 'Auto-fix documents', path: '/image-tools/smart-document-fixer', icon: <Wand2 className="w-5 h-5 text-teal-400" /> },
];

const calculatorCategories = [
  {
    title: 'Academic Calculators',
    description: 'CGPA, SGPA, GPA, Grade, Marks %',
    path: '/calculators',
    icon: <GraduationCap className="w-8 h-8 text-orange-400" />,
    iconBg: 'bg-orange-900/30',
  },
  {
    title: 'Financial Calculators',
    description: 'GST, EMI, Loan, Interest, Discount',
    path: '/calculators',
    icon: <DollarSign className="w-8 h-8 text-green-400" />,
    iconBg: 'bg-green-900/30',
  },
  {
    title: 'Health Calculators',
    description: 'BMI, Age, Date Difference',
    path: '/calculators',
    icon: <Heart className="w-8 h-8 text-red-400" />,
    iconBg: 'bg-red-900/30',
  },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero */}
      <section className="bg-gray-900 border-b border-gray-800 py-10 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Welcome to{' '}
            <span className="text-blue-400">DocMasterTools.com</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-6">
            Free online document tools for government offices, students, corporate staff & international users.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-full border border-gray-700 text-sm text-gray-300">
              <img src="/assets/generated/private-badge-transparent.dim_120x40.png" alt="100% Private" className="h-5 object-contain" />
              <span>100% Private</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-full border border-gray-700 text-sm text-gray-300">
              <img src="/assets/generated/tools-badge-transparent.dim_120x40.png" alt="40+ Tools" className="h-5 object-contain" />
              <span>40+ Tools</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-full border border-gray-700 text-sm text-gray-300">
              <img src="/assets/generated/free-badge-transparent.dim_120x40.png" alt="Free Forever" className="h-5 object-contain" />
              <span>Free Forever</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
        {/* Calculator Hub */}
        <section>
          <div
            className="flex items-center gap-3 mb-4 cursor-pointer group"
            onClick={() => onNavigate('/calculators')}
          >
            <div className="w-10 h-10 flex items-center justify-center bg-orange-900/30 rounded-xl">
              <Calculator className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                Calculator Hub
              </h2>
              <p className="text-gray-400 text-sm">20+ free calculators for academics, finance & health</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {calculatorCategories.map((cat) => (
              <button
                key={cat.title}
                onClick={() => onNavigate(cat.path)}
                className="flex items-start gap-3 p-4 bg-gray-800 hover:bg-gray-750 border border-gray-700 hover:border-gray-500 rounded-xl transition-all duration-200 hover:scale-[1.02] text-left group"
              >
                <div className={`w-12 h-12 flex items-center justify-center ${cat.iconBg} rounded-xl flex-shrink-0`}>
                  {cat.icon}
                </div>
                <div>
                  <div className="font-semibold text-gray-100 text-sm">{cat.title}</div>
                  <div className="text-gray-400 text-xs mt-1">{cat.description}</div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* PDF Tools */}
        <section>
          <div
            className="flex items-center gap-3 mb-4 cursor-pointer group"
            onClick={() => onNavigate('/pdf-tools')}
          >
            <div className="w-10 h-10 flex items-center justify-center bg-red-900/30 rounded-xl">
              <img src="/assets/generated/pdf-tools-icon-transparent.dim_64x64.png" alt="PDF Tools" className="w-7 h-7 object-contain" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                PDF Tools
              </h2>
              <p className="text-gray-400 text-sm">16 free PDF tools — compress, merge, split, convert & more</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {pdfTools.map((tool) => (
              <button
                key={tool.title}
                onClick={() => onNavigate(tool.path)}
                className="flex items-start gap-3 p-3 bg-gray-800 hover:bg-gray-750 border border-gray-700 hover:border-gray-500 rounded-xl transition-all duration-200 hover:scale-[1.02] text-left"
              >
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gray-700 rounded-lg">
                  {tool.icon}
                </div>
                <div>
                  <div className="font-medium text-gray-100 text-xs">{tool.title}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{tool.description}</div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Image Tools */}
        <section>
          <div
            className="flex items-center gap-3 mb-4 cursor-pointer group"
            onClick={() => onNavigate('/image-tools')}
          >
            <div className="w-10 h-10 flex items-center justify-center bg-blue-900/30 rounded-xl">
              <img src="/assets/generated/image-tools-icon-transparent.dim_64x64.png" alt="Image Tools" className="w-7 h-7 object-contain" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                Image Tools
              </h2>
              <p className="text-gray-400 text-sm">16 free image tools — resize, compress, convert & more</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {imageTools.map((tool) => (
              <button
                key={tool.title}
                onClick={() => onNavigate(tool.path)}
                className="flex items-start gap-2 p-3 bg-gray-800 hover:bg-gray-750 border border-gray-700 hover:border-gray-500 rounded-xl transition-all duration-200 hover:scale-[1.02] text-left"
              >
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gray-700 rounded-lg">
                  {tool.icon}
                </div>
                <div>
                  <div className="font-medium text-gray-100 text-xs">{tool.title}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{tool.description}</div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Resume Builder */}
        <section>
          <div
            className="flex items-center gap-3 mb-4 cursor-pointer group"
            onClick={() => onNavigate('/resume-builder')}
          >
            <div className="w-10 h-10 flex items-center justify-center bg-green-900/30 rounded-xl">
              <img src="/assets/generated/resume-builder-icon-transparent.dim_64x64.png" alt="Resume Builder" className="w-7 h-7 object-contain" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                Resume Builder
              </h2>
              <p className="text-gray-400 text-sm">14 professional templates — Indian & International formats</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('/resume-builder')}
            className="flex items-center gap-4 p-4 bg-gray-800 hover:bg-gray-750 border border-gray-700 hover:border-gray-500 rounded-xl transition-all duration-200 hover:scale-[1.01] w-full text-left"
          >
            <div className="w-12 h-12 flex items-center justify-center bg-green-900/30 rounded-xl flex-shrink-0">
              <BookOpen className="w-7 h-7 text-green-400" />
            </div>
            <div>
              <div className="font-semibold text-gray-100">Build Your Resume</div>
              <div className="text-gray-400 text-sm mt-0.5">
                Choose from 14 templates — Fresher, Experienced, Creative & more
              </div>
            </div>
          </button>
        </section>

        {/* Pro Tools Section */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 flex items-center justify-center bg-amber-900/30 rounded-xl">
              <Crown className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Pro Tools
                <span className="px-2 py-0.5 bg-amber-500/20 border border-amber-500/50 text-amber-400 rounded-full text-xs font-bold">
                  Premium
                </span>
              </h2>
              <p className="text-gray-400 text-sm">Advanced AI-powered tools for professionals</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('/ai-document-enhancer')}
            className="flex items-start gap-4 p-4 bg-gray-800 hover:bg-gray-750 border border-amber-500/30 hover:border-amber-500/60 rounded-xl transition-all duration-200 hover:scale-[1.01] w-full text-left group"
          >
            <div className="w-12 h-12 flex items-center justify-center bg-amber-900/30 rounded-xl flex-shrink-0">
              <Sparkles className="w-7 h-7 text-amber-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-gray-100">AI Document Enhancer</span>
                <span className="flex items-center gap-1 px-2 py-0.5 bg-amber-500/20 border border-amber-500/50 text-amber-400 rounded-full text-xs font-bold">
                  <Crown className="w-3 h-3" />
                  PRO
                </span>
              </div>
              <p className="text-gray-400 text-sm mt-1">
                AI-powered document enhancement — fix lighting, sharpen text, remove noise. ₹399/month or ₹3,000/year.
              </p>
            </div>
          </button>
        </section>
      </div>
    </div>
  );
}
