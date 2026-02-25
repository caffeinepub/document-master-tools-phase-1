import { ExternalLink, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const appId = encodeURIComponent(window.location.hostname || 'document-master-tools');

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <h3 className="font-semibold mb-3">Document Master Tools</h3>
            <p className="text-sm text-muted-foreground">
              Professional document processing tools for PDF, images, and resumes. All processing happens in your browser for maximum privacy.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('calculators')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Calculator Hub
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('pdf-tools')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  PDF Tools
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('image-tools')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Image Tools
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('resume-builder')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Resume Builder
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('smart-document-fixer')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Smart Document Fixer
                </button>
              </li>
              <li>
                <a
                  href="https://jobsindiaa.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                >
                  JobsIndiaa.com
                  <ExternalLink className="h-3 w-3 opacity-70" />
                </a>
              </li>
              <li>
                <a
                  href="https://rjytotalmanpowers.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                >
                  RJY Total Manpowers.com
                  <ExternalLink className="h-3 w-3 opacity-70" />
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('privacy')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('terms')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms of Use
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('disclaimer')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Disclaimer
                </button>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold mb-3">About</h3>
            <p className="text-sm text-muted-foreground">
              DocMasterTools.com — your all-in-one platform for document, image, and PDF utilities. Built for students, job seekers, and professionals.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground space-y-2">
          <p>© 2026 RJY TOTAL MANPOWERS SERVICES PRIVATE LIMITED. All Rights Reserved.</p>
          <p className="flex items-center justify-center gap-1">
            Built with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
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
  );
}
