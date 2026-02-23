# Specification

## Summary
**Goal:** Add a comprehensive Resume Builder module with 14 professional templates organized into Indian and International formats, featuring multi-step form wizard, live preview, color themes, AI summary generation, and PDF download capabilities.

**Planned changes:**
- Create ResumeBuilderPage component at /resume-builder route displaying 14 templates in two categories (Indian Format: 7 templates, International Format: 7 templates)
- Implement multi-step form wizard with progressive sections (Personal Info, Education, Experience, Skills, Projects, Certifications, Languages, Achievements, References) with add/remove functionality for repeatable entries
- Build live preview component that renders resume in real-time with exact PDF formatting
- Add optional photo upload with drag-and-drop, crop/resize preview, and template-aware placement (prominent for Indian formats, minimal/hidden for International formats)
- Implement custom color theme selector with 6+ predefined palettes that apply to headers, borders, and accents
- Create auto-formatting logic for skills bullets, dates (MM/YYYY), phone numbers (Indian +91 or International), proper noun capitalization, and consistent spacing
- Add PDF download functionality with A4 sizing, intelligent page breaks, embedded fonts, and preserved styling
- Integrate basic AI summary generator using local logic to analyze experience/skills and generate 2-3 sentence professional summaries
- Create individual SEO-optimized pages for all 14 templates at /resume-builder/[template-slug] with unique meta titles, descriptions, Open Graph tags, FAQ sections, and internal links
- Ensure full mobile responsiveness with vertical layouts below 768px, collapsible sections, touch-friendly controls, and preview below form on mobile
- Style with modern card-based UI, smooth step transitions, progress indicators, optional localStorage save draft, and consistent Tailwind design system
- Update HomePage to add Resume Builder section showing both template categories with preview cards
- Update Header navigation to include Resume Builder link
- Integrate AdPlaceholder components (top banner 728×90, in-content 300×250, sidebar 160×600) without interfering with form functionality
- Configure all routes in App.tsx: main /resume-builder route and 14 individual template routes with slugs (fresher-resume, government-job-resume, private-job-resume, hindi-resume, biodata-for-marriage, teacher-resume, police-army-resume, ats-friendly-resume, us-resume, uk-cv-format, canada-resume, europass-cv, creative-resume, corporate-resume)

**User-visible outcome:** Users can access a full-featured Resume Builder from the homepage and header navigation, select from 14 professional templates across Indian and International formats, fill out a guided multi-step form with live preview, customize colors, optionally upload photos, generate AI-powered summaries, and download professionally formatted PDF resumes optimized for their target job market.
