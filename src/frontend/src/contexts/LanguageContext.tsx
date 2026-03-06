import type React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface LanguageContextType {
  language: string;
  currentLanguage: string; // backward-compatible alias
  setLanguage: (code: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  currentLanguage: "en",
  setLanguage: () => {},
  t: (key: string) => key,
});

const SUPPORTED_LANGUAGES = [
  "en",
  "hi",
  "bn",
  "ta",
  "te",
  "mr",
  "gu",
  "kn",
  "ml",
  "ur",
  "ar",
  "fr",
  "es",
  "de",
  "zh",
  "pt",
  "ru",
  "ja",
  "id",
];
const STORAGE_KEY = "preferred_language";

// Locale cache
const localeCache: Record<string, Record<string, string>> = {};

async function loadLocale(code: string): Promise<Record<string, string>> {
  if (localeCache[code]) return localeCache[code];
  try {
    const module = await import(`../locales/${code}.json`);
    localeCache[code] = module.default || module;
    return localeCache[code];
  } catch {
    // fallback to empty
    localeCache[code] = {};
    return {};
  }
}

function detectBrowserLanguage(): string {
  try {
    const nav = navigator as Navigator;
    const langs = nav.languages || [nav.language];
    for (const lang of langs) {
      const code = lang.split("-")[0].toLowerCase();
      if (SUPPORTED_LANGUAGES.includes(code)) return code;
    }
  } catch {
    // ignore
  }
  return "en";
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const getInitialLanguage = (): string => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && SUPPORTED_LANGUAGES.includes(stored)) return stored;
    } catch {
      // ignore
    }
    return detectBrowserLanguage();
  };

  const [language, setLanguageState] = useState<string>(getInitialLanguage);
  const [translations, setTranslations] = useState<Record<string, string>>({});

  const applyLanguage = useCallback(async (code: string) => {
    const locale = await loadLocale(code);
    setTranslations(locale);

    // Apply RTL for Arabic
    if (code === "ar") {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "ar";
    } else {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = code;
    }
  }, []);

  useEffect(() => {
    applyLanguage(language);
  }, [language, applyLanguage]);

  const setLanguage = useCallback((code: string) => {
    if (!SUPPORTED_LANGUAGES.includes(code)) return;
    setLanguageState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // ignore
    }
  }, []);

  const t = useCallback(
    (key: string): string => {
      return translations[key] || key;
    },
    [translations],
  );

  return (
    <LanguageContext.Provider
      value={{ language, currentLanguage: language, setLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

export default LanguageContext;
