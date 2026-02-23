import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

type Language = 'en' | 'hi' | 'bn' | 'ta' | 'te' | 'mr' | 'gu' | 'kn' | 'ml' | 'ur';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isLoading: boolean;
  isInitializing: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'documentmaster_language';
const SESSION_KEY = 'documentmaster_language_detected';

// Cache for loaded translations
const translationsCache: Record<Language, any> = {} as Record<Language, any>;

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  // Load translation file
  const loadTranslations = async (lang: Language) => {
    // Check cache first
    if (translationsCache[lang]) {
      setTranslations(translationsCache[lang]);
      return;
    }

    setIsLoading(true);
    try {
      const module = await import(`../locales/${lang}.json`);
      const loadedTranslations = module.default;
      translationsCache[lang] = loadedTranslations;
      setTranslations(loadedTranslations);
    } catch (error) {
      console.error(`Failed to load translations for ${lang}:`, error);
      toast.error('Failed to load language. Falling back to English.');
      
      // Fallback to English
      if (lang !== 'en') {
        try {
          const fallbackModule = await import('../locales/en.json');
          const fallbackTranslations = fallbackModule.default;
          translationsCache['en'] = fallbackTranslations;
          setTranslations(fallbackTranslations);
          setCurrentLanguage('en');
        } catch (fallbackError) {
          console.error('Failed to load English fallback:', fallbackError);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize language on mount
  useEffect(() => {
    const initializeLanguage = async () => {
      // Check if we already detected language in this session
      const sessionDetected = sessionStorage.getItem(SESSION_KEY);
      
      // Check localStorage first
      const storedLang = localStorage.getItem(STORAGE_KEY) as Language | null;
      
      if (storedLang && ['en', 'hi', 'bn', 'ta', 'te', 'mr', 'gu', 'kn', 'ml', 'ur'].includes(storedLang)) {
        setCurrentLanguage(storedLang);
        await loadTranslations(storedLang);
      } else if (!sessionDetected) {
        // Auto-detect browser language only once per session
        const browserLang = navigator.language || (navigator as any).languages?.[0] || 'en';
        const langCode = browserLang.substring(0, 2).toLowerCase();
        
        const supportedLanguages: Language[] = ['en', 'hi', 'bn', 'ta', 'te', 'mr', 'gu', 'kn', 'ml', 'ur'];
        const detectedLang: Language = supportedLanguages.includes(langCode as Language) 
          ? (langCode as Language) 
          : 'en';
        
        setCurrentLanguage(detectedLang);
        await loadTranslations(detectedLang);
        localStorage.setItem(STORAGE_KEY, detectedLang);
        sessionStorage.setItem(SESSION_KEY, 'true');
      } else {
        // Default to English
        await loadTranslations('en');
      }
      
      setIsInitializing(false);
    };

    initializeLanguage();
  }, []);

  // Change language function
  const changeLanguage = async (lang: Language) => {
    if (lang === currentLanguage) return;
    
    setCurrentLanguage(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    await loadTranslations(lang);
  };

  // Translation function with nested key support
  const t = (key: string): string => {
    if (!translations || Object.keys(translations).length === 0) {
      return key;
    }

    const keys = key.split('.');
    let value: any = translations;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage: changeLanguage,
        t,
        isLoading,
        isInitializing,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
