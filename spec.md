# Specification

## Summary
**Goal:** Upgrade the DocMasterTools platform with improved navigation, batch processing, extended multi-language support, RTL layout for Arabic, enhanced PDF tools, a Pro plan structure, and mobile responsiveness across all non-calculator tool pages.

**Planned changes:**
- Add a "Back to Home" button (left-arrow + "Home" label, 44×44 px tap target) to the top-left of every non-calculator tool page (image tools, PDF tools, converters, Resume Builder).
- Integrate the existing BreadcrumbNavigation component on all non-calculator tool pages that lack it, positioned below the Back to Home button and above the H1, with Schema.org JSON-LD structured data.
- Display post-download navigation buttons ("Back to Home" and "Use Another Tool") after a successful download on all non-calculator tool pages; full-width on screens below 768 px.
- Add A4, Legal, and Letter page size presets (labeled "Office Print Ready") to CustomImageResizePage, DPIChangerPage, ExportOptionsPanel, ImageToPDFTool, and PDFToImageTool; auto-populate pixel dimensions based on active DPI.
- Implement batch file upload and processing on ImageCompressorPage, CustomImageResizePage, DPIChangerPage, JPGToPNGPage, PNGToJPGPage, WEBPConverterPage, BackgroundRemoverPage, PDFCompressTool, and ImageToPDFTool; show per-file queue with status (pending/processing/done/error) and allow individual or ZIP download.
- Enhance PDFAddWatermarkTool with a full stamp/watermark settings panel (text input, font size, opacity slider, position selector, color picker, rotation angle), with Apply & Preview flow before download.
- Add 9 new global languages (Arabic, French, Spanish, German, Chinese Simplified, Portuguese, Russian, Japanese, Indonesian) to LanguageContext and LanguageSelector with lazy-loaded locale JSON files.
- Implement RTL layout support for Arabic: set `dir="rtl"` and `lang="ar"` on the document root, mirror flex/grid layouts, right-align text, and render breadcrumbs in RTL order.
- Add multi-language SEO support: hreflang tags for all 19 supported languages (plus x-default for English), update sitemap.xml and generateSitemap.ts with language-prefixed URL variants, and add language-prefixed routes in App.tsx for the 9 new languages.
- Implement auto-detection of user locale via `navigator.language` on first visit; auto-switch to matching supported language and update URL; fall back to English if unsupported; persist selection in localStorage and skip auto-redirect on return visits.
- Update HomePage to show all free tool cards with clear SVG icons per card, and move the AI Document Enhancer into a separate "Pro Tools" section below all free tool sections with an amber/gold PRO badge; no PRO badge on free tool cards.
- Create AIDocumentEnhancerPage at `/ai-document-enhancer` with SEO metadata, breadcrumbs, H1, description, login/subscription gate (399 rupees/month or 3000 rupees/year), Pro Active badge for authenticated Pro users, and lazy-loaded route in App.tsx; update ProPricingModal pricing; add AI Document Enhancer card with PRO badge to ImageToolsPage.
- Update the Header LanguageSelector to include all 19 languages; preserve existing navigation link order (Calculator Hub, PDF Tools, Image Tools, Resume Builder, JobsIndiaa.com, RJY Total Manpowers.com).
- Upgrade all 16 PDF tool components to use AdvancedToolShell with the strict settings → Apply & Preview → download flow, each with tool-appropriate settings panels.
- Ensure all new navigation elements, breadcrumbs, post-download buttons, and batch UI are fully mobile-responsive (Back to Home full-width below 480 px, breadcrumbs truncate/scroll, post-download buttons full-width min-height 48 px, batch queue stacks vertically below 768 px).

**User-visible outcome:** Users on any non-calculator tool page can navigate easily via a Back to Home button and breadcrumbs, process multiple files in batch with a status queue, download results individually or as a ZIP, and access office print-ready page size presets. The platform now supports 19 languages including Arabic with RTL layout, auto-detects the user's language on first visit, and surfaces language-specific SEO. The homepage clearly separates free tools (each with an icon) from the single Pro tool (AI Document Enhancer). Pro users who are logged in can access the AI Document Enhancer; others see a pricing gate. All 16 PDF tools follow a consistent settings-then-preview-then-download flow.
