import { useState, useEffect } from 'react';
import { FileText, Image, FileEdit, Scissors, Minimize2, Image as ImageIcon, FileType, Hash, ArrowUpDown, Lock, Unlock, FileX, ListOrdered, Droplet, PenTool, ScanText, Ruler, Palette, Heart, X, Download, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [showAppBanner, setShowAppBanner] = useState(false);

  useEffect(() => {
    // Show app download banner after 7 seconds
    const timer = setTimeout(() => {
      setShowAppBanner(true);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  const pdfTools = [
    { id: 'merge', name: 'Merge PDF', description: 'Combine multiple PDFs into one', icon: FileText },
    { id: 'split', name: 'Split PDF', description: 'Extract pages or split into files', icon: Scissors },
    { id: 'compress', name: 'Compress PDF', description: 'Reduce PDF file size', icon: Minimize2 },
    { id: 'pdf-to-image', name: 'PDF to Image', description: 'Convert PDF pages to images', icon: ImageIcon },
    { id: 'image-to-pdf', name: 'Image to PDF', description: 'Convert images to PDF', icon: FileText },
    { id: 'pdf-to-word', name: 'PDF to Word', description: 'Convert PDF to editable Word', icon: FileType },
    { id: 'word-to-pdf', name: 'Word to PDF', description: 'Convert Word to PDF', icon: FileText },
    { id: 'page-counter', name: 'Page Counter', description: 'Count pages in PDF', icon: Hash },
    { id: 'reorder', name: 'Reorder Pages', description: 'Rearrange PDF pages', icon: ArrowUpDown },
    { id: 'password-protect', name: 'Password Protect', description: 'Add password security', icon: Lock },
    { id: 'password-unlock', name: 'Password Unlock', description: 'Remove password protection', icon: Unlock },
    { id: 'remove-blank', name: 'Remove Blank Pages', description: 'Delete empty pages', icon: FileX },
    { id: 'add-page-numbers', name: 'Add Page Numbers', description: 'Insert page numbering', icon: ListOrdered },
    { id: 'add-watermark', name: 'Add Watermark', description: 'Apply text or image watermark', icon: Droplet },
    { id: 'sign', name: 'Sign PDF', description: 'Add digital signature', icon: PenTool },
    { id: 'ocr', name: 'OCR to Searchable', description: 'Make scanned PDFs searchable', icon: ScanText },
  ];

  const calculatorCategories = [
    { 
      id: 'academic', 
      name: 'Academic Calculators', 
      description: '9 calculators for students', 
      icon: '/assets/generated/academic-calc-icon.dim_128x128.png',
      count: 9
    },
    { 
      id: 'financial', 
      name: 'Financial Calculators', 
      description: '8 calculators for finance', 
      icon: '/assets/generated/financial-calc-icon.dim_128x128.png',
      count: 8
    },
    { 
      id: 'health', 
      name: 'Health & General', 
      description: '4 calculators for health & time', 
      icon: '/assets/generated/health-calc-icon.dim_128x128.png',
      count: 4
    },
  ];

  const resumeTemplates = [
    { id: 'fresher', name: 'Fresher Template', description: 'Perfect for entry-level positions' },
    { id: 'experienced', name: 'Experienced Template', description: 'For seasoned professionals' },
    { id: 'professional', name: 'Corporate Template', description: 'Clean and professional design' },
    { id: 'simple', name: 'Simple Template', description: 'Minimalist and elegant' },
    { id: 'creative', name: 'Creative Template', description: 'Stand out with unique design' },
  ];

  return (
    <>
      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-primary/5 py-12 md:py-16 lg:py-20 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 opacity-5">
            <img 
              src="/assets/generated/hero-banner.dim_1200x400.png" 
              alt="" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              {/* Main Heading - H1 */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-4 md:mb-5">
                Welcome to <span className="text-primary">DocMasterTools.com</span>
              </h1>
              
              {/* Sub-heading/Tagline */}
              <p className="text-lg md:text-xl lg:text-2xl font-semibold text-muted-foreground mb-4 md:mb-6">
                Your All-in-One Document, Image & PDF Utility Platform
              </p>
              
              {/* Description */}
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground/90 mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed">
                DocMasterTools.com helps you manage documents effortlessly. Convert, compress, and edit PDFs, resize images, remove or change backgrounds, and create professional resumes — all directly in your browser. Fast, secure, mobile-friendly, and designed especially for students, job seekers, and everyday users.
              </p>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 lg:gap-8">
                <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-background/50 backdrop-blur-sm border shadow-sm min-w-[120px]">
                  <img 
                    src="/assets/generated/private-badge-transparent.dim_120x40.png" 
                    alt="100% Private" 
                    className="h-8 w-auto"
                  />
                  <div className="text-center">
                    <div className="text-xl md:text-2xl font-bold text-primary">100%</div>
                    <div className="text-xs md:text-sm text-muted-foreground font-medium">Private</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-background/50 backdrop-blur-sm border shadow-sm min-w-[120px]">
                  <img 
                    src="/assets/generated/tools-badge-transparent.dim_120x40.png" 
                    alt="40+ Tools" 
                    className="h-8 w-auto"
                  />
                  <div className="text-center">
                    <div className="text-xl md:text-2xl font-bold text-primary">40+</div>
                    <div className="text-xs md:text-sm text-muted-foreground font-medium">Tools</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-background/50 backdrop-blur-sm border shadow-sm min-w-[120px]">
                  <img 
                    src="/assets/generated/free-badge-transparent.dim_120x40.png" 
                    alt="Free Forever" 
                    className="h-8 w-auto"
                  />
                  <div className="text-center">
                    <div className="text-xl md:text-2xl font-bold text-primary">Free</div>
                    <div className="text-xs md:text-sm text-muted-foreground font-medium">Forever</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            {/* Calculator Hub */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Calculator Hub</h2>
                  <p className="text-sm text-muted-foreground">21 calculators for academic, financial & health needs</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {calculatorCategories.map((category) => (
                  <Card
                    key={category.id}
                    className="cursor-pointer hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group"
                    onClick={() => onNavigate('calculators')}
                  >
                    <CardHeader className="p-4">
                      <div className="w-16 h-16 rounded-lg bg-orange-500/10 flex items-center justify-center mb-3 group-hover:bg-orange-500/20 transition-colors mx-auto">
                        <img src={category.icon} alt={category.name} className="w-12 h-12" />
                      </div>
                      <CardTitle className="text-base text-center">{category.name}</CardTitle>
                      <CardDescription className="text-xs text-center">{category.description}</CardDescription>
                      <div className="text-center mt-2">
                        <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">{category.count} Tools</span>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            <Separator className="my-8" />

            {/* PDF Tools */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <img src="/assets/generated/pdf-tools-icon-transparent.dim_64x64.png" alt="PDF Tools" className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">PDF Tools</h2>
                  <p className="text-sm text-muted-foreground">16 professional PDF processing tools</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {pdfTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Card
                      key={tool.id}
                      className="cursor-pointer hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group"
                      onClick={() => onNavigate('pdf-tools')}
                    >
                      <CardHeader className="p-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-sm leading-tight">{tool.name}</CardTitle>
                        <CardDescription className="text-xs line-clamp-2">{tool.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  );
                })}
              </div>
            </div>

            <Separator className="my-8" />

            {/* Image Tools - Updated to show 16 tools */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <img src="/assets/generated/image-tools-icon-transparent.dim_64x64.png" alt="Image Tools" className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Image Tools</h2>
                  <p className="text-sm text-muted-foreground">16 comprehensive image tools for government documents, processing & conversion</p>
                </div>
              </div>
              
              <div className="space-y-6">
                {/* Government Document Photos */}
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">Government Document Photos (8 tools)</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Resize and optimize photos for Passport, Aadhaar, PAN, SSC, Railway, Police/Army, Visa applications, and Signatures with preset dimensions.
                  </p>
                </div>

                {/* Image Processing */}
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-green-600 dark:text-green-400">Image Processing (4 tools)</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Compress, crop, change DPI, and custom resize images with advanced controls and live preview.
                  </p>
                </div>

                {/* Format Conversion */}
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-purple-600 dark:text-purple-400">Format Conversion (4 tools)</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Convert between JPG, PNG, and WEBP formats, plus remove backgrounds automatically.
                  </p>
                </div>

                <Button 
                  onClick={() => onNavigate('image-tools')} 
                  size="lg"
                  className="w-full md:w-auto"
                >
                  View All Image Tools
                </Button>
              </div>
            </div>

            <Separator className="my-8" />

            {/* Resume Builder */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <img src="/assets/generated/resume-builder-icon-transparent.dim_64x64.png" alt="Resume Builder" className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Resume Builder</h2>
                  <p className="text-sm text-muted-foreground">5 professional templates for job seekers</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {resumeTemplates.slice(0, 3).map((template) => (
                  <Card
                    key={template.id}
                    className="cursor-pointer hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group"
                    onClick={() => onNavigate('resume-builder')}
                  >
                    <CardHeader className="p-4">
                      <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-3 group-hover:bg-purple-500/20 transition-colors">
                        <FileEdit className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <CardTitle className="text-base">{template.name}</CardTitle>
                      <CardDescription className="text-xs">{template.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" onClick={() => onNavigate('resume-builder')}>
                  View All Templates
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* App Download Banner */}
        {showAppBanner && (
          <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-primary/90 to-primary/80 backdrop-blur-sm text-primary-foreground p-4 shadow-lg z-50 animate-slide-up">
            <div className="container mx-auto flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img src="/assets/generated/app-download-icon.dim_48x48.png" alt="App" className="w-10 h-10" />
                <div>
                  <p className="font-semibold text-sm md:text-base">Get the DocMasterTools App</p>
                  <p className="text-xs md:text-sm opacity-90">Access all tools offline on your mobile device</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" className="hidden md:inline-flex">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setShowAppBanner(false)} className="text-primary-foreground hover:bg-primary-foreground/20">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Document Master Tools</h3>
              <p className="text-sm text-muted-foreground">
                Professional document processing tools for PDF, images, and resumes. All processing happens in your browser for maximum privacy.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={() => onNavigate('calculators')} className="text-muted-foreground hover:text-primary transition-colors">
                    Calculator Hub
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('pdf-tools')} className="text-muted-foreground hover:text-primary transition-colors">
                    PDF Tools
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('image-tools')} className="text-muted-foreground hover:text-primary transition-colors">
                    Image Tools
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('resume-builder')} className="text-muted-foreground hover:text-primary transition-colors">
                    Resume Builder
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={() => onNavigate('privacy')} className="text-muted-foreground hover:text-primary transition-colors">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('terms')} className="text-muted-foreground hover:text-primary transition-colors">
                    Terms of Use
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('disclaimer')} className="text-muted-foreground hover:text-primary transition-colors">
                    Disclaimer
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground space-y-2">
            <p>© 2026 RJY TOTAL MANPOWERS SERVICES PRIVATE LIMITED. All Rights Reserved.</p>
            <p className="flex items-center justify-center gap-1">
              Built with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> using{' '}
              <a 
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
