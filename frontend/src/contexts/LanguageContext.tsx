import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type LanguageCode =
  | 'en'
  | 'hi'
  | 'te'
  | 'ta'
  | 'bn'
  | 'mr'
  | 'gu'
  | 'kn'
  | 'ml'
  | 'pa'
  | 'ar'
  | 'fr'
  | 'es'
  | 'de'
  | 'zh'
  | 'pt'
  | 'ru'
  | 'ja'
  | 'id';

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  rtl?: boolean;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', rtl: true },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
];

const RTL_LANGUAGES: LanguageCode[] = ['ar'];

interface LanguageContextValue {
  language: LanguageCode;
  // Keep backward-compat alias
  currentLanguage: LanguageCode;
  setLanguage: (code: LanguageCode) => void;
  t: (key: string) => string;
  isRTL: boolean;
  supportedLanguages: Language[];
  isLoading: boolean;
  isInitializing: boolean;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: 'en',
  currentLanguage: 'en',
  setLanguage: () => {},
  t: (key) => key,
  isRTL: false,
  supportedLanguages: SUPPORTED_LANGUAGES,
  isLoading: false,
  isInitializing: false,
});

const STORAGE_KEY = 'docmaster_language';
const MANUAL_KEY = 'docmaster_language_manual';

type Translations = Record<string, string>;

const translationCache: Partial<Record<LanguageCode, Translations>> = {};

async function loadTranslations(code: LanguageCode): Promise<Translations> {
  if (translationCache[code]) return translationCache[code]!;
  if (code === 'en') {
    translationCache['en'] = {};
    return {};
  }
  try {
    const module = await import(`../locales/${code}.json`);
    translationCache[code] = module.default as Translations;
    return translationCache[code]!;
  } catch {
    return {};
  }
}

function detectLanguageFromBrowser(): LanguageCode {
  const nav = navigator as Navigator & { languages?: readonly string[] };
  const browserLang = navigator.language || nav.languages?.[0] || 'en';
  const langCode = browserLang.split('-')[0].toLowerCase();
  const supported = SUPPORTED_LANGUAGES.find((l) => l.code === langCode);
  return supported ? supported.code : 'en';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>('en');
  const [translations, setTranslations] = useState<Translations>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const isRTL = RTL_LANGUAGES.includes(language);

  const applyLanguage = useCallback(async (code: LanguageCode) => {
    setIsLoading(true);
    try {
      const trans = await loadTranslations(code);
      setTranslations(trans);
      setLanguageState(code);

      // Apply RTL/LTR
      const isRtl = RTL_LANGUAGES.includes(code);
      document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
      document.documentElement.lang = code;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initialize language on mount
  useEffect(() => {
    const init = async () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      const isManual = localStorage.getItem(MANUAL_KEY) === 'true';

      if (stored && SUPPORTED_LANGUAGES.find((l) => l.code === stored)) {
        await applyLanguage(stored as LanguageCode);
      } else if (!isManual) {
        const detected = detectLanguageFromBrowser();
        await applyLanguage(detected);
        localStorage.setItem(STORAGE_KEY, detected);
      } else {
        await applyLanguage('en');
      }
      setIsInitializing(false);
    };
    init();
  }, [applyLanguage]);

  const setLanguage = useCallback(
    (code: LanguageCode) => {
      localStorage.setItem(STORAGE_KEY, code);
      localStorage.setItem(MANUAL_KEY, 'true');
      applyLanguage(code);
    },
    [applyLanguage]
  );

  const t = useCallback(
    (key: string): string => {
      // Support nested dot-notation keys
      const keys = key.split('.');
      let value: unknown = translations;
      for (const k of keys) {
        if (value && typeof value === 'object') {
          value = (value as Record<string, unknown>)[k];
        } else {
          return key;
        }
      }
      return typeof value === 'string' ? value : key;
    },
    [translations]
  );

  return (
    <LanguageContext.Provider
      value={{
        language,
        currentLanguage: language,
        setLanguage,
        t,
        isRTL,
        supportedLanguages: SUPPORTED_LANGUAGES,
        isLoading,
        isInitializing,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
