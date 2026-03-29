import i18n from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";

const STORAGE_KEY = "preferred_language";

function getInitialLanguage(): string {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
  } catch {
    // ignore
  }
  try {
    const nav = navigator as Navigator;
    const langs = nav.languages || [nav.language];
    for (const lang of langs) {
      const code = lang.split("-")[0].toLowerCase();
      if (SUPPORTED_LANGUAGE_CODES.includes(code)) return code;
    }
  } catch {
    // ignore
  }
  return "en";
}

export const SUPPORTED_LANGUAGE_CODES = [
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
  "pa",
  "bho",
  "mai",
];

// Cache for auto-translated strings (MyMemory API)
const AUTO_TRANSLATE_CACHE_PREFIX = "docmt_autotrans_";

async function autoTranslate(
  text: string,
  targetLang: string,
): Promise<string> {
  const cacheKey = `${AUTO_TRANSLATE_CACHE_PREFIX}${targetLang}_${btoa(encodeURIComponent(text)).slice(0, 32)}`;
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) return cached;
  } catch {
    /* ignore */
  }

  try {
    // MyMemory free API - no key required
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(4000) });
    if (!res.ok) return text;
    const data = await res.json();
    const translated = data?.responseData?.translatedText;
    if (translated && translated !== text) {
      try {
        localStorage.setItem(cacheKey, translated);
      } catch {
        /* ignore */
      }
      return translated;
    }
  } catch {
    /* ignore */
  }
  return text;
}

export { autoTranslate };

i18n
  .use(
    resourcesToBackend(
      (language: string, _namespace: string) =>
        import(`./locales/${language}.json`),
    ),
  )
  .use(initReactI18next)
  .init({
    lng: getInitialLanguage(),
    fallbackLng: "en",
    supportedLngs: SUPPORTED_LANGUAGE_CODES,
    ns: ["translation"],
    defaultNS: "translation",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    // Lazy load — backend handles this
    load: "languageOnly",
  });

export default i18n;
