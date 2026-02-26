import { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage, SUPPORTED_LANGUAGES, type LanguageCode } from '../contexts/LanguageContext';

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: LanguageCode) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white transition-all duration-200 text-sm min-h-[44px]"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <Globe className="w-4 h-4 flex-shrink-0" />
        <span className="hidden sm:inline max-w-[80px] truncate">{currentLang.nativeName}</span>
        <ChevronDown className={`w-3 h-3 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-52 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl z-50 overflow-hidden backdrop-blur-sm animate-in slide-in-from-top-2 duration-200">
          <div className="max-h-80 overflow-y-auto py-1">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-gray-800 ${
                  language === lang.code
                    ? 'text-blue-400 bg-blue-900/20 font-semibold'
                    : 'text-gray-300'
                }`}
              >
                <span>{lang.nativeName}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{lang.name}</span>
                  {language === lang.code && <Check className="w-3.5 h-3.5 text-blue-400" />}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
