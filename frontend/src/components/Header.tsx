import { useState } from 'react';
import { Menu, X, ExternalLink, Calculator, FileText, Image, BookOpen } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

interface HeaderProps {
  onNavigate: (page: string) => void;
  onNavigateHome?: () => void;
  currentRoute?: string;
}

const navLinks = [
  { label: 'Calculator Hub', page: 'calculators', icon: <Calculator className="w-4 h-4" />, external: false },
  { label: 'PDF Tools', page: 'pdf-tools', icon: <FileText className="w-4 h-4" />, external: false },
  { label: 'Image Tools', page: 'image-tools', icon: <Image className="w-4 h-4" />, external: false },
  { label: 'Resume Builder', page: 'resume-builder', icon: <BookOpen className="w-4 h-4" />, external: false },
  { label: 'JobsIndiaa.com', page: 'https://jobsindiaa.com', icon: <ExternalLink className="w-4 h-4" />, external: true },
  { label: 'RJY Total Manpowers', page: 'https://rjytotalmanpowers.com', icon: <ExternalLink className="w-4 h-4" />, external: true },
];

export default function Header({ onNavigate, onNavigateHome }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (page: string, external: boolean) => {
    setMobileOpen(false);
    if (external) {
      window.open(page, '_blank', 'noopener,noreferrer');
    } else {
      onNavigate(page);
    }
  };

  const handleLogoClick = () => {
    setMobileOpen(false);
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      onNavigate('home');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2 flex-shrink-0 min-h-[44px]"
            aria-label="Go to home page"
          >
            <img
              src="/assets/file_0000000062007206bdb8c024866ac514.png"
              alt="DocMasterTools.com"
              className="h-8 sm:h-9 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.page, link.external)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors min-h-[44px]"
              >
                {link.icon}
                <span>{link.label}</span>
                {link.external && <ExternalLink className="w-3 h-3 opacity-60" />}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <LanguageSelector />
            </div>
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-800 bg-gray-900 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col p-4 gap-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.page, link.external)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors min-h-[52px] text-left"
              >
                {link.icon}
                <span>{link.label}</span>
                {link.external && <ExternalLink className="w-4 h-4 opacity-60 ml-auto" />}
              </button>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-800">
              <LanguageSelector />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
