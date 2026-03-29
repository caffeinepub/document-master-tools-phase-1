import type React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import i18n, { SUPPORTED_LANGUAGE_CODES, autoTranslate } from "../i18n";

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

const STORAGE_KEY = "preferred_language";

// Module-level cache for dynamically translated strings
const dynamicTranslations: Record<string, Record<string, string>> = {};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // useTranslation triggers re-renders when i18next language changes
  const { i18n: i18nInstance } = useTranslation();
  const language = i18nInstance.language || "en";

  // Ref to trigger re-render when async translations arrive
  const [, setRenderTick] = useState(0);
  const setRenderTickRef = useRef(setRenderTick);
  setRenderTickRef.current = setRenderTick;

  // Keep html lang and dir in sync
  useEffect(() => {
    const onLangChanged = (lng: string) => {
      const rtlLangs = ["ar", "ur"];
      document.documentElement.dir = rtlLangs.includes(lng) ? "rtl" : "ltr";
      document.documentElement.lang = lng;
    };
    i18n.on("languageChanged", onLangChanged);
    onLangChanged(language);
    return () => i18n.off("languageChanged", onLangChanged);
  }, [language]);

  const setLanguage = useCallback((code: string) => {
    if (!SUPPORTED_LANGUAGE_CODES.includes(code)) return;
    i18n.changeLanguage(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* ignore */
    }
  }, []);

  // Stable function — reads i18n.language at call time, so no deps needed
  const t = useCallback((key: string): string => {
    // Try i18next first (handles dot-notation and lazy-loaded locales)
    const result = i18n.t(key);
    if (result !== key) return result;

    const lng = i18n.language;

    // Check dynamic auto-translation cache
    if (dynamicTranslations[lng]?.[key]) {
      return dynamicTranslations[lng][key];
    }

    // Fallback to English text for untranslated keys
    const englishText = i18n.t(key, { lng: "en" });
    const textToTranslate = englishText !== key ? englishText : key;

    // Fire-and-forget async auto-translation for missing keys
    if (lng !== "en" && textToTranslate !== key) {
      autoTranslate(textToTranslate, lng).then((translated) => {
        if (translated && translated !== textToTranslate) {
          if (!dynamicTranslations[lng]) dynamicTranslations[lng] = {};
          dynamicTranslations[lng][key] = translated;
          setRenderTickRef.current((n) => n + 1);
        }
      });
    }

    return textToTranslate;
    // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally stable; reads i18n.language at call time
  }, []);

  return (
    <LanguageContext.Provider
      value={{ language, currentLanguage: language, setLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

export const useI18nTranslation = () => useTranslation();

export default LanguageContext;
