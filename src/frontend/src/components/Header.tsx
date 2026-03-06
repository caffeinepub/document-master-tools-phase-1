import { Menu, X } from "lucide-react";
import type React from "react";
import { useState } from "react";
import LanguageSelector from "./LanguageSelector";

interface HeaderProps {
  onNavigate: (page: string) => void;
  onNavigateHome?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, onNavigateHome }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleHome = () => {
    if (onNavigateHome) onNavigateHome();
    else onNavigate("home");
    setMobileMenuOpen(false);
  };

  const handleNav = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: "Calculator Hub", page: "calculators", external: false },
    { label: "PDF Tools", page: "pdf-tools", external: false },
    { label: "Image Tools", page: "image-tools", external: false },
    { label: "Resume Builder", page: "resume-builder", external: false },
    { label: "JobsIndiaa.com", page: "https://jobsindiaa.com", external: true },
    {
      label: "RJY Total Manpowers",
      page: "https://rjytotalmanpowers.com",
      external: true,
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={handleHome}
          className="flex items-center gap-2 focus:outline-none"
          aria-label="Go to homepage"
        >
          <img
            src="/assets/generated/logo-transparent.dim_200x60.png"
            alt="DocMasterTools Logo"
            className="h-10 w-auto object-contain"
          />
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.page}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 text-sm text-gray-300 hover:text-orange-400 transition-colors rounded-lg hover:bg-gray-800 font-medium"
              >
                {link.label} ↗
              </a>
            ) : (
              <button
                type="button"
                key={link.label}
                onClick={() => handleNav(link.page)}
                className="px-3 py-2 text-sm text-gray-300 hover:text-orange-400 transition-colors rounded-lg hover:bg-gray-800 font-medium min-h-[44px]"
              >
                {link.label}
              </button>
            ),
          )}
        </nav>

        {/* Right side: Language Selector + Mobile Menu */}
        <div className="flex items-center gap-2">
          <LanguageSelector />
          <button
            type="button"
            className="lg:hidden p-2 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800 min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[65px] bg-gray-900 z-40 overflow-y-auto">
          <nav className="flex flex-col p-4 gap-2">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.page}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 text-gray-300 hover:text-orange-400 transition-colors rounded-lg hover:bg-gray-800 font-medium text-base min-h-[44px] flex items-center"
                >
                  {link.label} ↗
                </a>
              ) : (
                <button
                  type="button"
                  key={link.label}
                  onClick={() => handleNav(link.page)}
                  className="px-4 py-3 text-gray-300 hover:text-orange-400 transition-colors rounded-lg hover:bg-gray-800 font-medium text-base min-h-[44px] text-left"
                >
                  {link.label}
                </button>
              ),
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
