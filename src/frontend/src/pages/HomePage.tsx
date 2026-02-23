import { useState, useEffect } from 'react';
import { FileText, Image, FileEdit, Scissors, Minimize2, Image as ImageIcon, FileType, Hash, ArrowUpDown, Lock, Unlock, FileX, ListOrdered, Droplet, PenTool, ScanText, Ruler, Palette, Heart, X, Download, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import SEO from '@/components/SEO';

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

  // WebApplication structured data
  const webAppStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Document Master Tools",
    "description": "Free online tools for document processing, PDF manipulation, image editing, and calculations. 52+ tools including calculators, PDF converters, and image processors.",
    "url": window.location.origin,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript. Modern browser recommended.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <SEO
        title="Document Master Tools - Free Online Calculators, PDF & Image Tools"
        description="DocMasterTools.com offers 52+ free online tools for students, professionals, and everyday users. Access calculators for academic and financial needs, PDF tools for merging, splitting, and converting documents, and image tools for resizing, compressing, and editing photos. All tools work directly in your browser with complete privacy - no uploads to servers."
        canonicalUrl={window.location.origin}
      />

      {/* WebApplication Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppStructuredData) }}
      />

      {/* App Download Banner */}
      {showAppBanner && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg shadow-2xl p-4 z-50 animate-pulse">
          <button
            onClick={() => setShowAppBanner(false)}
            className="absolute top-2 right-2 p-1 hover:bg-primary-foreground/20 rounded-full transition-colors"
            aria-label="Close banner"
          >
            <X className="h-4 w-4" />
          </button>
          
          <div className="flex items-start gap-3 pr-6">
            <div className="w-12 h-12 bg-primary-foreground/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Download className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm mb-1">Get Our Mobile App</h3>
              <p className="text-xs opacity-90 mb-3">Access all tools on the go. Download now for Android & iOS!</p>
              <Button 
                size="sm" 
                variant="secondary" 
                className="w-full text-xs"
                onClick={() => alert('App download coming soon!')}
              >
                Download App
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-primary/5 py-12 md:py-16 lg:py-20 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 opacity-5">
            <img 
              src="/assets/generated/hero-banner.dim_1200x400.png" 
              alt="" 
              loading="eager"
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
                    loading="lazy"
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
                    loading="lazy"
                    className="h-8 w-auto"
                  />
                  <div className="text-center">
                    <div className="text-xl md:text-2xl font-bold text-primary">52+</div>
                    <div className="text-xs md:text-sm text-muted-foreground font-medium">Tools</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-background/50 backdrop-blur-sm border shadow-sm min-w-[120px]">
                  <img 
                    src="/assets/generated/free-badge-transparent.dim_120x40.png" 
                    alt="Free Forever" 
                    loading="lazy"
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
                  <p className="text-sm text-muted-foreground">20 calculators for academic, financial & health needs</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {calculatorCategories.map((category) => (
                  <Card 
                    key={category.id} 
                    className="cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02]"
                    onClick={() => onNavigate('calculators')}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <img 
                          src={category.icon} 
                          alt={category.name}
                          loading="lazy"
                          className="w-12 h-12"
                        />
                        <div>
                          <CardTitle className="text-lg">{category.name}</CardTitle>
                          <div className="text-sm text-muted-foreground">{category.count} tools</div>
                        </div>
                      </div>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>

              {/* Cross-links to other categories */}
              <div className="flex flex-wrap gap-3 mt-4">
                <Button variant="outline" size="sm" onClick={() => onNavigate('pdf-tools')}>
                  <FileText className="mr-2 h-4 w-4" />
                  Explore PDF Tools
                </Button>
                <Button variant="outline" size="sm" onClick={() => onNavigate('image-tools')}>
                  <Image className="mr-2 h-4 w-4" />
                  Explore Image Tools
                </Button>
              </div>
            </div>

            <Separator className="my-8" />

            {/* PDF Tools */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/assets/generated/pdf-tools-icon-transparent.dim_64x64.png" 
                  alt="PDF Tools"
                  loading="lazy"
                  className="w-10 h-10"
                />
                <div>
                  <h2 className="text-2xl font-bold">PDF Tools</h2>
                  <p className="text-sm text-muted-foreground">16 tools for PDF processing & conversion</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3">
                {pdfTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Card 
                      key={tool.id} 
                      className="cursor-pointer hover:shadow-md transition-all hover:scale-[1.02]"
                      onClick={() => onNavigate('pdf-tools')}
                    >
                      <CardHeader className="p-4">
                        <div className="flex flex-col items-center text-center gap-2">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <CardTitle className="text-sm">{tool.name}</CardTitle>
                        </div>
                      </CardHeader>
                    </Card>
                  );
                })}
              </div>

              {/* Cross-links */}
              <div className="flex flex-wrap gap-3 mt-4">
                <Button variant="outline" size="sm" onClick={() => onNavigate('calculators')}>
                  <Calculator className="mr-2 h-4 w-4" />
                  Explore Calculators
                </Button>
                <Button variant="outline" size="sm" onClick={() => onNavigate('image-tools')}>
                  <Image className="mr-2 h-4 w-4" />
                  Explore Image Tools
                </Button>
              </div>
            </div>

            <Separator className="my-8" />

            {/* Image Tools */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/assets/generated/image-tools-icon-transparent.dim_64x64.png" 
                  alt="Image Tools"
                  loading="lazy"
                  className="w-10 h-10"
                />
                <div>
                  <h2 className="text-2xl font-bold">Image Tools</h2>
                  <p className="text-sm text-muted-foreground">16 tools for image processing & editing</p>
                </div>
              </div>
              
              <Card 
                className="cursor-pointer hover:shadow-lg transition-all hover:scale-[1.01]"
                onClick={() => onNavigate('image-tools')}
              >
                <CardHeader>
                  <CardTitle>Explore All Image Tools</CardTitle>
                  <CardDescription>
                    Resize, compress, convert, and edit images. Includes specialized tools for passport photos, government documents, and more.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">View All Image Tools</Button>
                </CardContent>
              </Card>

              {/* Cross-links */}
              <div className="flex flex-wrap gap-3 mt-4">
                <Button variant="outline" size="sm" onClick={() => onNavigate('calculators')}>
                  <Calculator className="mr-2 h-4 w-4" />
                  Explore Calculators
                </Button>
                <Button variant="outline" size="sm" onClick={() => onNavigate('pdf-tools')}>
                  <FileText className="mr-2 h-4 w-4" />
                  Explore PDF Tools
                </Button>
              </div>
            </div>

            <Separator className="my-8" />

            {/* Resume Builder */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/assets/generated/resume-builder-icon-transparent.dim_64x64.png" 
                  alt="Resume Builder"
                  loading="lazy"
                  className="w-10 h-10"
                />
                <div>
                  <h2 className="text-2xl font-bold">Resume Builder</h2>
                  <p className="text-sm text-muted-foreground">Create professional resumes with ease</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {resumeTemplates.map((template) => (
                  <Card 
                    key={template.id} 
                    className="cursor-pointer hover:shadow-md transition-all hover:scale-[1.02]"
                    onClick={() => onNavigate('resume-builder')}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <FileEdit className="w-5 h-5 text-primary" />
                        </div>
                        <CardTitle className="text-base">{template.name}</CardTitle>
                      </div>
                      <CardDescription className="text-sm">{template.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-muted/30 border-t py-8 mt-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* Quick Links */}
              <div>
                <h3 className="font-semibold mb-3">Quick Links</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <button onClick={() => onNavigate('calculators')} className="hover:text-foreground transition-colors">
                      Calculator Hub
                    </button>
                  </li>
                  <li>
                    <button onClick={() => onNavigate('pdf-tools')} className="hover:text-foreground transition-colors">
                      PDF Tools
                    </button>
                  </li>
                  <li>
                    <button onClick={() => onNavigate('image-tools')} className="hover:text-foreground transition-colors">
                      Image Tools
                    </button>
                  </li>
                  <li>
                    <button onClick={() => onNavigate('resume-builder')} className="hover:text-foreground transition-colors">
                      Resume Builder
                    </button>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="font-semibold mb-3">Legal</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <button onClick={() => onNavigate('privacy')} className="hover:text-foreground transition-colors">
                      Privacy Policy
                    </button>
                  </li>
                  <li>
                    <button onClick={() => onNavigate('terms')} className="hover:text-foreground transition-colors">
                      Terms of Use
                    </button>
                  </li>
                  <li>
                    <button onClick={() => onNavigate('disclaimer')} className="hover:text-foreground transition-colors">
                      Disclaimer
                    </button>
                  </li>
                </ul>
              </div>

              {/* About */}
              <div>
                <h3 className="font-semibold mb-3">About</h3>
                <p className="text-sm text-muted-foreground">
                  DocMasterTools.com provides free online tools for document processing, calculations, and image editing. All tools work directly in your browser with complete privacy.
                </p>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Copyright */}
            <div className="text-center text-sm text-muted-foreground space-y-2">
              <p>© {new Date().getFullYear()} RJY TOTAL MANPOWERS SERVICES PRIVATE LIMITED. All Rights Reserved.</p>
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
      </main>
    </>
  );
}
