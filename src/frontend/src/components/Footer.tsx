import { Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
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
        
        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            © 2025. Built with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> using{' '}
            <a href="https://caffeine.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
