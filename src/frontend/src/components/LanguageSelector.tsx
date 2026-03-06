import { Check, ChevronDown, Globe } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const languages = [
  { code: "en", name: "English", native: "English" },
  { code: "hi", name: "Hindi", native: "हिन्दी" },
  { code: "bn", name: "Bengali", native: "বাংলা" },
  { code: "ta", name: "Tamil", native: "தமிழ்" },
  { code: "te", name: "Telugu", native: "తెలుగు" },
  { code: "mr", name: "Marathi", native: "मराठी" },
  { code: "gu", name: "Gujarati", native: "ગુજરાતી" },
  { code: "kn", name: "Kannada", native: "ಕನ್ನಡ" },
  { code: "ml", name: "Malayalam", native: "മലയാളം" },
  { code: "ur", name: "Urdu", native: "اردو" },
  { code: "ar", name: "Arabic", native: "العربية" },
  { code: "fr", name: "French", native: "Français" },
  { code: "es", name: "Spanish", native: "Español" },
  { code: "de", name: "German", native: "Deutsch" },
  { code: "zh", name: "Chinese Simplified", native: "简体中文" },
  { code: "pt", name: "Portuguese", native: "Português" },
  { code: "ru", name: "Russian", native: "Русский" },
  { code: "ja", name: "Japanese", native: "日本語" },
  { code: "id", name: "Indonesian", native: "Bahasa Indonesia" },
];

const LanguageSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage } = useLanguage();

  const currentLang =
    languages.find((l) => l.code === language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (code: string) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors min-h-[44px] min-w-[44px]"
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe size={16} />
        <span className="hidden sm:inline">{currentLang.native}</span>
        <ChevronDown
          size={14}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full mt-1 w-52 bg-gray-800 border border-gray-600 rounded-xl shadow-2xl z-50 overflow-hidden"
          style={{ animation: "slideIn 0.15s ease-out" }}
          role="listbox"
          aria-label="Language options"
        >
          <div className="max-h-72 overflow-y-auto py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors min-h-[44px] ${
                  language === lang.code
                    ? "bg-orange-500/20 text-orange-400 font-semibold"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
                role="option"
                aria-selected={language === lang.code}
              >
                <span>{lang.native}</span>
                {language === lang.code && <Check size={14} />}
              </button>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default LanguageSelector;
