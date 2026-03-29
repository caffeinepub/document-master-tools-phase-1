import { Check, ChevronDown, Globe } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const GLOBAL_LANGUAGES = [
  { code: "en", name: "English", native: "English" },
  { code: "hi", name: "Hindi", native: "\u0939\u093f\u0928\u094d\u0926\u0940" },
  {
    code: "zh",
    name: "Chinese Simplified",
    native: "\u7b80\u4f53\u4e2d\u6587",
  },
  {
    code: "ar",
    name: "Arabic",
    native: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629",
  },
  { code: "es", name: "Spanish", native: "Espa\u00f1ol" },
  { code: "fr", name: "French", native: "Fran\u00e7ais" },
  {
    code: "ru",
    name: "Russian",
    native: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439",
  },
  { code: "pt", name: "Portuguese", native: "Portugu\u00eas" },
  { code: "de", name: "German", native: "Deutsch" },
  { code: "ja", name: "Japanese", native: "\u65e5\u672c\u8a9e" },
  { code: "id", name: "Indonesian", native: "Bahasa Indonesia" },
  { code: "ur", name: "Urdu", native: "\u0627\u0631\u062f\u0648" },
];

const INDIA_LANGUAGES = [
  { code: "hi", name: "Hindi", native: "\u0939\u093f\u0928\u094d\u0926\u0940" },
  {
    code: "bho",
    name: "Bhojpuri",
    native: "\u092d\u094b\u091c\u092a\u0941\u0930\u0940",
  },
  {
    code: "mai",
    name: "Maithili",
    native: "\u092e\u0948\u0925\u093f\u0932\u0940",
  },
  { code: "bn", name: "Bengali", native: "\u09ac\u09be\u0982\u09b2\u09be" },
  { code: "ta", name: "Tamil", native: "\u0ba4\u0bae\u0bbf\u0bb4\u0bcd" },
  {
    code: "te",
    name: "Telugu",
    native: "\u0c24\u0c46\u0c32\u0c41\u0c17\u0c41",
  },
  { code: "mr", name: "Marathi", native: "\u092e\u0930\u093e\u0920\u0940" },
  {
    code: "gu",
    name: "Gujarati",
    native: "\u0a97\u0ac1\u0a9c\u0ab0\u0abe\u0aa4\u0ac0",
  },
  { code: "kn", name: "Kannada", native: "\u0c95\u0ca8\u0ccd\u0ca8\u0ca1" },
  {
    code: "ml",
    name: "Malayalam",
    native: "\u0d2e\u0d32\u0d2f\u0d3e\u0d33\u0d02",
  },
  {
    code: "pa",
    name: "Punjabi",
    native: "\u0a2a\u0a70\u0a1c\u0a3e\u0a2c\u0a40",
  },
];

const LanguageSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<"global" | "india">("global");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage } = useLanguage();

  const allLanguages = [...GLOBAL_LANGUAGES, ...INDIA_LANGUAGES];
  const uniqueByCode = allLanguages.filter(
    (lang, idx, arr) => arr.findIndex((l) => l.code === lang.code) === idx,
  );
  const currentLang =
    uniqueByCode.find((l) => l.code === language) || GLOBAL_LANGUAGES[0];

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

  const displayList = tab === "global" ? GLOBAL_LANGUAGES : INDIA_LANGUAGES;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
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
          className="absolute right-0 top-full mt-1 w-56 bg-gray-800 border border-gray-600 rounded-xl shadow-2xl z-50 overflow-hidden"
          style={{ animation: "slideIn 0.15s ease-out" }}
          role="menu"
          aria-label="Language options"
        >
          {/* Tabs */}
          <div className="flex border-b border-gray-700">
            <button
              type="button"
              onClick={() => setTab("global")}
              className={`flex-1 py-2 text-xs font-semibold transition-colors ${
                tab === "global"
                  ? "text-orange-400 border-b-2 border-orange-400 bg-gray-700/50"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              🌍 Global
            </button>
            <button
              type="button"
              onClick={() => setTab("india")}
              className={`flex-1 py-2 text-xs font-semibold transition-colors ${
                tab === "india"
                  ? "text-orange-400 border-b-2 border-orange-400 bg-gray-700/50"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              🇮🇳 India
            </button>
          </div>

          <div className="max-h-64 overflow-y-auto py-1">
            {displayList.map((lang) => (
              <button
                type="button"
                key={`${tab}-${lang.code}`}
                onClick={() => handleSelect(lang.code)}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors min-h-[44px] ${
                  language === lang.code
                    ? "bg-orange-500/20 text-orange-400 font-semibold"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
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
