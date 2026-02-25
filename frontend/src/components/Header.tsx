import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calculator, FileText, Image, FileUser, Menu, X, ExternalLink } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';

interface HeaderProps {
  onNavigateHome: () => void;
  onNavigate?: (page: string) => void;
}

interface NavLink {
  label: string;
  type: 'internal' | 'external';
  page?: string;
  href?: string;
  icon?: React.ReactNode;
}

export default function Header({ onNavigateHome, onNavigate }: HeaderProps) {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: NavLink[] = [
    { label: t('nav.calculators') || 'Calculator Hub', type: 'internal', page: 'calculators', icon: <Calculator className="h-4 w-4" /> },
    { label: 'PDF Tools', type: 'internal', page: 'pdf-tools', icon: <FileText className="h-4 w-4" /> },
    { label: 'Image Tools', type: 'internal', page: 'image-tools', icon: <Image className="h-4 w-4" /> },
    { label: 'Resume Builder', type: 'internal', page: 'resume-builder', icon: <FileUser className="h-4 w-4" /> },
    { label: 'JobsIndiaa.com', type: 'external', href: 'https://jobsindiaa.com' },
    { label: 'RJY Total Manpowers.com', type: 'external', href: 'https://rjytotalmanpowers.com' },
  ];

  const handleNavigation = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          {/* Logo */}
          <Button
            variant="ghost"
            className="p-0 hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            onClick={onNavigateHome}
            aria-label="Go to home page"
          >
            <img
              src="/assets/file_0000000062007206bdb8c024866ac514.png"
              alt="DocMasterTools.com – All-in-One Document, Image & PDF Tools"
              className="h-7 w-auto sm:h-9 md:h-11 object-contain transition-transform hover:scale-105"
              loading="eager"
            />
          </Button>

          <div className="flex items-center gap-2">
            {onNavigate && (
              <>
                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-1 mr-2">
                  {navLinks.map((link) =>
                    link.type === 'internal' ? (
                      <Button
                        key={link.page}
                        variant="ghost"
                        onClick={() => handleNavigation(link.page!)}
                        className="flex items-center gap-1.5 min-h-[44px] text-sm px-3"
                      >
                        {link.icon}
                        {link.label}
                      </Button>
                    ) : (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 min-h-[44px] px-3 text-sm font-medium rounded-md text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
                      >
                        {link.label}
                        <ExternalLink className="h-3 w-3 opacity-70" />
                      </a>
                    )
                  )}
                </nav>

                {/* Mobile Menu Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden min-w-[44px] min-h-[44px]"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </>
            )}

            {/* Desktop Language Selector */}
            <div className="hidden md:block">
              <LanguageSelector />
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && onNavigate && (
          <div className="md:hidden border-t bg-background py-4 animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) =>
                link.type === 'internal' ? (
                  <Button
                    key={link.page}
                    variant="ghost"
                    onClick={() => handleNavigation(link.page!)}
                    className="justify-start min-h-[44px] text-base gap-3"
                  >
                    {link.icon && <span className="h-5 w-5 flex items-center justify-center">{link.icon}</span>}
                    {link.label}
                  </Button>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 min-h-[44px] px-4 text-base font-medium text-muted-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <ExternalLink className="h-5 w-5" />
                    {link.label}
                    <ExternalLink className="h-3.5 w-3.5 ml-auto opacity-60" />
                  </a>
                )
              )}
              <div className="px-2 py-2 mt-1 border-t">
                <LanguageSelector />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
