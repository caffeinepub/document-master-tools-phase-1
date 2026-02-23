# Specification

## Summary
**Goal:** Add Phase 3 - Advanced Image Tools Module with 16 comprehensive image processing tools organized into Government Document Photos, Image Processing, and Format Conversion categories.

**Planned changes:**
- Create ImageToolsPage component at /image-tools route displaying 16 image tools in a grid layout organized by category
- Create 8 Government Document Photo tools: PassportPhotoMaker, AadhaarPhotoResize, PANPhotoResize, SSCPhotoResize, RailwayPhotoResize, PoliceArmyPhoto, VisaPhotoResize, SignatureResize with Job Form Special Mode, target size selectors, dimension controls, and aspect ratio toggles
- Create 4 Image Processing tools: ImageCompressor with compression levels, ImageCropper with aspect ratio presets, DPIChanger with preset/custom DPI, CustomImageResize with pixel/percentage modes
- Create 4 Format Conversion tools: JPGToPNG, PNGToJPG, WEBPConverter for bidirectional conversion, BackgroundRemover using client-side processing
- Implement Job Form Special Mode across all government document tools with presets for government exams, passports, and signatures
- Add 17 new routes in App.tsx: /image-tools main page plus 16 individual tool routes
- Create SEO-optimized page wrappers for all 16 tools with unique H1s, 100-150 word descriptions, FAQ sections, meta tags, structured data, and internal links
- Style all components with modern card layouts, dark/light mode compatibility, smooth processing animations, and AdSense-ready semantic structure
- Ensure full mobile responsiveness from 320px width with touch-friendly drag & drop on all 16 tools
- Update HomePage Image Tools section to showcase all 16 tools organized by category
- Update Footer copyright to: © 2026 RJY TOTAL MANPOWERS SERVICES PRIVATE LIMITED. All Rights Reserved.

**User-visible outcome:** Users can access a comprehensive suite of 16 image tools for government document photo preparation, image processing, and format conversion - all processing client-side with drag & drop uploads, live previews, and secure downloads. The Image Tools section is now featured on the homepage alongside Calculator Hub and PDF Tools.
