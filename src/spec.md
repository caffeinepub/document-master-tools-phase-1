# Specification

## Summary
**Goal:** Implement a complete multi-language system supporting 9 Indian languages (English, Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, Urdu) with language-prefixed URLs, translation infrastructure, and SEO optimization.

**Planned changes:**
- Create LanguageSelector dropdown component in header with all 9 languages
- Build i18n context provider with useLanguage hook and localStorage persistence
- Create 10 translation JSON files (en.json, hi.json, bn.json, ta.json, te.json, mr.json, gu.json, kn.json, ml.json, ur.json) for all UI text
- Update routing to support /:lang/ URL prefixes while preserving default English routes
- Add hreflang and canonical tags for all language variants
- Update all 50+ page components to use translation keys for UI text (preserving calculation logic)
- Implement lazy loading for translation files with loading states
- Add browser language auto-detection with optional redirect
- Generate sitemap with language-specific URLs for all pages across 9 languages

**User-visible outcome:** Users can switch between 9 languages via header dropdown, see all UI content in their selected language with language-prefixed URLs (e.g., /hi/calculators/cgpa-calculator), and have their preference persist across sessions. All pages are properly indexed with hreflang tags for international SEO.
