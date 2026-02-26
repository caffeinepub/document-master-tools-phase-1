# Specification

## Summary
**Goal:** Upgrade all non-calculator image and PDF tools to an advanced user-controlled workflow with settings-first, preview-gated download; add recognizable icons to all tool cards; and separate Pro tools from free tools on the homepage and Image Tools page.

**Planned changes:**
- Create a reusable `AdvancedToolShell` component enforcing a strict workflow: file upload → settings panel → "Apply & Preview" button → before/after comparison panel → download button (disabled until preview is generated)
- Upgrade ImageCompressor tool with target size (KB/MB), quality slider, and output format selector, gated behind "Apply & Preview"
- Upgrade all 8 government document photo resize tools with preset dimensions, custom dimensions (px/cm/mm/inches), aspect ratio toggle, target file size (KB/MB), quality slider, and format selector, gated behind "Apply & Preview"
- Upgrade CustomImageResize with width/height unit selectors, aspect ratio toggle, resize mode (pixel/percentage), quality slider, and format selector, gated behind "Apply & Preview"
- Upgrade DPI Changer with DPI preset selector, custom DPI input, and format selector (JPEG/PNG/TIFF), gated behind "Apply & Preview"
- Upgrade Image Cropper with aspect ratio presets, custom crop dimensions (px/percentage), interactive drag-handle crop area, quality slider, and format selector, gated behind "Apply & Preview"
- Upgrade JPGToPNG, PNGToJPG, and WEBPConverter format conversion tools with output format selector, quality slider, and optional target size (KB/MB), gated behind "Apply & Preview"
- Upgrade Background Remover with background fill selector (Transparent/White/Custom Color/Blur), context-aware format selector, and quality slider, gated behind "Apply & Preview"
- Upgrade all 16 PDF tools with tool-specific settings panels (compression level, merge reorder, split mode, DPI/format/quality for PDF-to-image, page size/orientation/fit for image-to-PDF, password/encryption, watermark controls, etc.), gated behind "Apply & Preview"
- Update HomePage to add recognizable icons to all free tool cards and move Smart Document Fixer into a separate labeled "Pro Tools" section below free tool sections, using the existing amber/gold PRO badge; no layout, theme, or structural changes otherwise
- Update ImageToolsPage to add a recognizable icon to every image tool card; keep Smart Document Fixer in its existing Pro Tools sub-section with PRO badge
- Update PDFToolsPage to add a recognizable icon to every PDF tool card
- Ensure all upgraded tool pages are fully mobile responsive: settings panel stacks vertically, before/after comparison stacks vertically, and action buttons are full-width (min 48px height) on screens below 768px
- Calculator components remain completely untouched throughout all changes

**User-visible outcome:** Users can now configure all image and PDF tool settings before any processing occurs, see a before/after preview, and only then download the result. The homepage and tool listing pages show clear icons for every tool, and Pro tools are visually separated from free tools.
