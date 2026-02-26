# Specification

## Summary
**Goal:** Audit and fix all existing tools, pages, components, and routing across the DocMasterTools platform to ensure everything works correctly end-to-end without errors.

**Planned changes:**
- Fix all 16 PDF tool components to correctly use the AdvancedToolShell workflow (settings panel, Apply & Preview, disabled Download until preview, post-download navigation).
- Fix all image tool pages to ensure file upload, settings controls, Apply & Preview with before/after comparison, and Download flow all work correctly.
- Fix SmartDocumentFixerPage and its sub-components (BeforeAfterPreviewPanel, AutoPhotoSizeGenerator, AutoFeaturesPanel, ExportOptionsPanel, ProPricingModal) including canvas operations, freemium gating via localStorage, and Pro modal flow.
- Fix AIDocumentEnhancerPage rendering, login/subscription gate, Pro badge, ProPricingModal pricing (₹399/month, ₹3000/year), and route registration in App.tsx.
- Fix Resume Builder pages: template grid (14 templates), multi-step form wizard, live preview, color theme selector, PDF download, and localStorage auto-save.
- Fix App.tsx routing so all routes (calculators, PDF tools, image tools, resume builder, smart-document-fixer, ai-document-enhancer, and language-prefixed variants) resolve correctly with React.lazy and Suspense.
- Fix Header and LanguageSelector components: all 6 nav links, hamburger mobile menu, 19 languages in dropdown, language switching without reload, RTL for Arabic, and localStorage persistence.
- Fix BreadcrumbNavigation integration on all non-calculator tool pages with correct hierarchical paths and Schema.org JSON-LD.
- Fix BackToHomeButton integration on all non-calculator tool pages (top-left above H1, 44×44px tap target).
- Fix PostDownloadNavigation integration on all image and PDF tool pages (correct hub URLs, full-width on mobile).
- Fix batch file processing (BatchFileQueue, useBatchProcessor hook, JSZip) on all applicable image and PDF tool pages.
- Fix CalculatorsPage and all 20 calculator pages for rendering, navigation, and SEO metadata without changing any calculation logic.
- Fix ImageToolsPage and PDFToolsPage hub pages: all tool cards, PRO badges on Smart Document Fixer and AI Document Enhancer, correct navigation, and AdPlaceholder positions.
- Fix HomePage: all sections (hero, trust badges, Calculator Hub, PDF Tools, Image Tools, Resume Builder, Pro Tools), PRO badges only on Pro tools, and no changes to the footer.
- Fix global mobile responsiveness on all non-calculator tool pages (stacked layouts below 768px, full-width buttons with min-height 48px, breadcrumb truncation, batch queue scrolling).

**User-visible outcome:** Every tool, page, and navigation element across the platform works correctly — users can upload files, configure settings, preview results, and download outputs on all PDF tools, image tools, resume builder, and smart/AI document tools, with correct routing, breadcrumbs, mobile layouts, and language switching throughout.
