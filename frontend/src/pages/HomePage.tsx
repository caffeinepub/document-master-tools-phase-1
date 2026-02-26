import SEO from '../components/SEO';
import { FileText, Image, Calculator, FileUser, ArrowRight, Lock, Infinity, Wrench } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gray-900">
      <SEO
        title="DocMasterTools.com - Free PDF, Image & Calculator Tools Online"
        description="Free online tools for PDF processing, image editing, resume building, and calculations. No registration required. Fast, secure, and easy to use."
        canonicalUrl="https://documentmastertools.com"
      />

      {/* Hero Section */}
      <section className="bg-gray-900 py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 leading-tight">
            Welcome to{' '}
            <span className="text-blue-400">DocMasterTools.com</span>
          </h1>
          <p className="text-lg md:text-xl font-semibold text-gray-200 mb-5">
            Your All-in-One Document, Image &amp; PDF Utility Platform
          </p>
          <p className="text-sm md:text-base text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto">
            DocMasterTools.com helps you manage documents effortlessly. Convert, compress, and edit PDFs, resize images, remove or change backgrounds, and create professional resumes — all directly in your browser. Fast, secure, mobile-friendly, and designed especially for students, job seekers, and everyday users.
          </p>

          {/* Trust Badge Cards */}
          <div className="flex flex-wrap justify-center gap-4">
            {/* 100% Private */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl px-6 py-4 flex flex-col items-center min-w-[130px] shadow-lg">
              <img
                src="/assets/generated/private-badge-transparent.dim_120x40.png"
                alt="100% Private"
                className="h-10 mb-2 object-contain"
              />
              <span className="text-blue-400 text-2xl font-bold leading-none">100%</span>
              <span className="text-gray-300 text-sm mt-1">Private</span>
            </div>

            {/* 40+ Tools */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl px-6 py-4 flex flex-col items-center min-w-[130px] shadow-lg">
              <img
                src="/assets/generated/tools-badge-transparent.dim_120x40.png"
                alt="40+ Tools"
                className="h-10 mb-2 object-contain"
              />
              <span className="text-blue-400 text-2xl font-bold leading-none">40+</span>
              <span className="text-gray-300 text-sm mt-1">Tools</span>
            </div>

            {/* Free Forever */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl px-6 py-4 flex flex-col items-center min-w-[130px] shadow-lg">
              <img
                src="/assets/generated/free-badge-transparent.dim_120x40.png"
                alt="Free Forever"
                className="h-10 mb-2 object-contain"
              />
              <span className="text-blue-400 text-2xl font-bold leading-none">Free</span>
              <span className="text-gray-300 text-sm mt-1">Forever</span>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Hub Section */}
      <section className="py-10 bg-gray-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Calculator className="h-5 w-5 text-orange-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Calculator Hub</h2>
              <p className="text-sm text-gray-400">21 calculators for academic, financial &amp; health needs</p>
            </div>
          </div>

          {/* Category Cards - stacked vertically */}
          <div className="flex flex-col gap-4">
            {/* Academic Calculators */}
            <div
              className="bg-gray-800 border border-gray-700 rounded-xl p-6 cursor-pointer hover:border-orange-500/50 hover:bg-gray-750 transition-all"
              onClick={() => onNavigate('calculators')}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center mb-4 shadow-md">
                  <img
                    src="/assets/generated/academic-calc-icon.dim_128x128.png"
                    alt="Academic Calculators"
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">Academic Calculators</h3>
                <p className="text-sm text-gray-400 mb-3">9 calculators for students</p>
                <span className="text-orange-400 font-semibold text-sm">9 Tools</span>
              </div>
            </div>

            {/* Financial Calculators */}
            <div
              className="bg-gray-800 border border-gray-700 rounded-xl p-6 cursor-pointer hover:border-orange-500/50 hover:bg-gray-750 transition-all"
              onClick={() => onNavigate('calculators')}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center mb-4 shadow-md">
                  <img
                    src="/assets/generated/financial-calc-icon.dim_128x128.png"
                    alt="Financial Calculators"
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">Financial Calculators</h3>
                <p className="text-sm text-gray-400 mb-3">8 calculators for finance</p>
                <span className="text-orange-400 font-semibold text-sm">8 Tools</span>
              </div>
            </div>

            {/* Health & General */}
            <div
              className="bg-gray-800 border border-gray-700 rounded-xl p-6 cursor-pointer hover:border-orange-500/50 hover:bg-gray-750 transition-all"
              onClick={() => onNavigate('calculators')}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center mb-4 shadow-md">
                  <img
                    src="/assets/generated/health-calc-icon.dim_128x128.png"
                    alt="Health & General"
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">Health &amp; General</h3>
                <p className="text-sm text-gray-400 mb-3">4 calculators for health &amp; time</p>
                <span className="text-orange-400 font-semibold text-sm">4 Tools</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PDF Tools Section */}
      <section className="py-10 bg-gray-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">PDF Tools</h2>
              <p className="text-sm text-gray-400">16 professional PDF processing tools</p>
            </div>
          </div>

          {/* PDF Tool Cards Grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: 'Merge PDF', icon: '📄', page: 'pdf-merge', desc: 'Combine multiple PDFs into one' },
              { name: 'Split PDF', icon: '✂️', page: 'pdf-split', desc: 'Extract pages or split into files' },
              { name: 'Compress PDF', icon: '🗜️', page: 'pdf-compress', desc: 'Reduce PDF file size' },
              { name: 'PDF to Image', icon: '🖼️', page: 'pdf-to-jpg', desc: 'Convert PDF pages to images' },
              { name: 'PDF to Word', icon: '📝', page: 'pdf-to-word', desc: 'Convert PDF to DOCX' },
              { name: 'Word to PDF', icon: '🔄', page: 'word-to-pdf', desc: 'Convert DOCX to PDF' },
              { name: 'JPG to PDF', icon: '📸', page: 'jpg-to-pdf', desc: 'Create PDF from images' },
              { name: 'Rotate PDF', icon: '🔃', page: 'pdf-rotate', desc: 'Rotate PDF pages' },
              { name: 'PDF to Excel', icon: '📊', page: 'pdf-to-excel', desc: 'Convert PDF to spreadsheet' },
              { name: 'Excel to PDF', icon: '📋', page: 'excel-to-pdf', desc: 'Convert spreadsheet to PDF' },
              { name: 'PDF to PPT', icon: '📑', page: 'pdf-to-ppt', desc: 'Convert PDF to presentation' },
              { name: 'PPT to PDF', icon: '🎯', page: 'ppt-to-pdf', desc: 'Convert presentation to PDF' },
              { name: 'Watermark PDF', icon: '💧', page: 'pdf-watermark', desc: 'Add watermark to PDF' },
              { name: 'Unlock PDF', icon: '🔓', page: 'pdf-unlock', desc: 'Remove PDF password' },
              { name: 'Protect PDF', icon: '🔒', page: 'pdf-protect', desc: 'Add password to PDF' },
              { name: 'PDF OCR', icon: '🔍', page: 'pdf-ocr', desc: 'Extract text from scanned PDF' },
            ].map((tool) => (
              <div
                key={tool.page}
                onClick={() => onNavigate(tool.page)}
                className="bg-gray-800 border border-gray-700 rounded-xl p-4 cursor-pointer hover:border-red-500/50 hover:bg-gray-750 transition-all group"
              >
                <div className="text-2xl mb-2">{tool.icon}</div>
                <h3 className="font-semibold text-white text-sm group-hover:text-red-400 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1 leading-snug">{tool.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => onNavigate('pdf-tools')}
              className="inline-flex items-center gap-1 text-sm text-red-400 hover:text-red-300 font-medium transition-colors"
            >
              View All PDF Tools <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Image Tools Section */}
      <section className="py-10 bg-gray-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Image className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Image Tools</h2>
              <p className="text-sm text-gray-400">16 professional image editing tools</p>
            </div>
          </div>

          {/* Free Image Tools */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { name: 'Passport Photo', icon: '🪪', page: 'passport-photo-maker', desc: 'Standard passport photos' },
              { name: 'Image Compressor', icon: '🗜️', page: 'image-compressor', desc: 'Reduce image file size' },
              { name: 'Image Resizer', icon: '📐', page: 'custom-image-resize', desc: 'Resize to any dimension' },
              { name: 'JPG to PNG', icon: '🔄', page: 'jpg-to-png', desc: 'Convert image formats' },
              { name: 'Background Remover', icon: '✂️', page: 'background-remover', desc: 'Remove image background' },
              { name: 'Aadhaar Photo', icon: '🪪', page: 'aadhaar-photo-resize', desc: 'Aadhaar card photo size' },
              { name: 'DPI Changer', icon: '🖨️', page: 'dpi-changer', desc: 'Change image DPI/resolution' },
              { name: 'PNG to JPG', icon: '🔁', page: 'png-to-jpg', desc: 'Convert PNG to JPEG' },
              { name: 'WEBP Converter', icon: '🌐', page: 'webp-converter', desc: 'Convert to/from WEBP' },
              { name: 'Image Cropper', icon: '✂️', page: 'image-cropper', desc: 'Crop and resize images' },
              { name: 'PAN Photo', icon: '🪪', page: 'pan-photo-resize', desc: 'PAN card photo size' },
              { name: 'SSC Photo', icon: '🎓', page: 'ssc-photo-resize', desc: 'SSC exam photo size' },
              { name: 'Railway Photo', icon: '🚂', page: 'railway-photo-resize', desc: 'Railway exam photo size' },
              { name: 'Police/Army Photo', icon: '🛡️', page: 'police-army-photo', desc: 'Recruitment photo size' },
              { name: 'Visa Photo', icon: '✈️', page: 'visa-photo-resize', desc: 'Visa application photo' },
              { name: 'Signature Resize', icon: '✍️', page: 'signature-resize', desc: 'Resize signatures' },
            ].map((tool) => (
              <div
                key={tool.page}
                onClick={() => onNavigate(tool.page)}
                className="bg-gray-800 border border-gray-700 rounded-xl p-4 cursor-pointer hover:border-green-500/50 hover:bg-gray-750 transition-all group"
              >
                <div className="text-2xl mb-2">{tool.icon}</div>
                <h3 className="font-semibold text-white text-sm group-hover:text-green-400 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1 leading-snug">{tool.desc}</p>
              </div>
            ))}
          </div>

          {/* Pro Tools — Smart Document Fixer */}
          <div className="mt-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Pro Tools</span>
              <div className="flex-1 h-px bg-amber-500/30"></div>
            </div>
            <div
              onClick={() => onNavigate('smart-document-fixer')}
              className="bg-gray-800 border border-amber-500/40 rounded-xl p-4 cursor-pointer hover:border-amber-500/70 hover:bg-gray-750 transition-all group relative"
            >
              {/* PRO Badge */}
              <div className="absolute top-3 right-3">
                <span className="inline-flex items-center gap-0.5 bg-amber-500 text-gray-900 text-xs font-bold px-2 py-0.5 rounded-full">
                  ★ PRO
                </span>
              </div>
              <div className="text-2xl mb-2">🔧</div>
              <h3 className="font-semibold text-white text-sm group-hover:text-amber-400 transition-colors pr-14">
                Smart Document Fixer
              </h3>
              <p className="text-xs text-gray-500 mt-1 leading-snug">
                All-in-one photo fixing, resizing, background enhancement &amp; export for all government IDs
              </p>
            </div>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => onNavigate('image-tools')}
              className="inline-flex items-center gap-1 text-sm text-green-400 hover:text-green-300 font-medium transition-colors"
            >
              View All Image Tools <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Resume Builder Section */}
      <section className="py-10 bg-gray-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileUser className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Resume Builder</h2>
              <p className="text-sm text-gray-400">14 professional resume templates</p>
            </div>
          </div>

          <div
            className="bg-gray-800 border border-gray-700 rounded-xl p-6 cursor-pointer hover:border-purple-500/50 hover:bg-gray-750 transition-all group"
            onClick={() => onNavigate('resume-builder')}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                <img
                  src="/assets/generated/resume-builder-icon-transparent.dim_64x64.png"
                  alt="Resume Builder"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Build Your Resume</h3>
              <p className="text-sm text-gray-400 mb-3">
                Choose from 14 professional templates — Indian &amp; International formats for freshers and experienced professionals.
              </p>
              <span className="inline-flex items-center gap-1 text-purple-400 font-semibold text-sm group-hover:text-purple-300 transition-colors">
                Explore Templates <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom padding */}
      <div className="pb-10 bg-gray-900" />
    </div>
  );
}
