# Document Master Tools   Phase 1

## Overview
A comprehensive document processing platform that provides PDF tools, image editing capabilities, and resume building functionality. All file processing is performed client-side in the browser for privacy and security.

## Global UX Requirements
- All file processing must be client-side (browser-based)
- No automatic downloads - all downloads require manual user action
- **No ZIP file generation or bundled downloads** - all outputs must be individual direct file downloads (JPG, PNG, PDF, DOC)
- After processing, display a list or preview of generated files where each item has its **own "Download" button**
- Include optional action buttons: "Download Again", "Process Another File", "Clear File"
- Consistent design and behavior across all tool categories
- Full responsive design for mobile and desktop
- Fast loading times (under 2 seconds on mobile)

## Header Design
- **Logo placement**: Position the DocMasterTools logo (file_0000000062007206bdb8c024866ac514.png) on the left side of the header
- **Logo functionality**: Make the logo clickable and redirect to the Home Page when clicked
- **Logo styling**: Ensure proper padding and alignment for clean, professional appearance
- **Responsive scaling**: Implement responsive scaling for desktop, tablet, and mobile with proportional sizing
- **Aspect ratio**: Maintain aspect ratio to prevent distortion
- **Visibility**: Ensure clear visibility in both light and dark modes with appropriate contrast adjustments
- **Performance**: Optimize logo image for fast load performance
- **SEO**: Include alt text "DocMasterTools.com – All-in-One Document, Image & PDF Tools"
- **Layout**: Keep header compact and visually balanced across all device sizes
- **Visual integration**: Ensure logo aligns with site's visual style and theme

## Home Page Design

### Hero Section
- **Main heading (H1)**: "Welcome to DocMasterTools.com"
- **Sub-heading/tagline**: "Your All-in-One Document, Image & PDF Utility Platform"
- **Description text**: "DocMasterTools.com helps you manage documents effortlessly. Convert, compress, and edit PDFs, resize images, remove or change backgrounds, and create professional resumes — all directly in your browser. Fast, secure, mobile-friendly, and designed especially for students, job seekers, and everyday users."
- **Three trust badges prominently displayed above the fold**:
  - "100% Private"
  - "20+ Tools" 
  - "Free Forever"
- Use hero-banner.dim_1200x400.png as background image
- Use logo-transparent.dim_200x60.png for site logo
- Ensure only one H1 tag exists on the homepage
- Mobile-first responsive design with content above the fold

### App Download Popup
- **Small, mobile-friendly floating banner or popup** that:
  - Appears after 5-10 seconds or on scroll
  - Displays message: "Get the DocMasterTools App – Faster & Easier"
  - Contains "Download App" button (link to Play Store or APK)
  - Blinks subtly to attract attention
  - Easy to close with clear ❌ icon
  - AdSense-safe implementation
  - Non-intrusive design

### Tool Categories Grid
- **Mobile-first design** ensuring all tools are visible within one or two scrolls on mobile
- **Clean categorized grid or card layout** grouped by tool category:
  - PDF Tools (use pdf-tools-icon-transparent.dim_64x64.png)
  - Image Tools (use image-tools-icon-transparent.dim_64x64.png)
  - Resume Builder (use resume-builder-icon-transparent.dim_64x64.png)
- Each tool card displays:
  - Tool name
  - Short one-line description
  - Clear "Use Tool" button
- **Fast-loading UX** prioritizing easy tool discovery without searching

## PDF Tools Suite
Complete implementation of PDF processing tools:

### Core PDF Operations
- **Merge PDF**: Combine multiple PDF files into one
- **Split PDF**: Extract specific pages or split into separate files with individual PDF downloads
- **Compress PDF**: Reduce file size with auto-compress and manual adjustment modes, quality slider, target size options, and compression preview
- **PDF to Image**: Convert PDF pages to image formats (JPG, PNG) with individual image file downloads
- **Image to PDF**: Convert images to PDF format
- **PDF to Word**: Convert PDF to editable Word document
- **Word to PDF**: Convert Word documents to PDF

### PDF Utilities
- **Page Counter**: Display total number of pages in PDF
- **Page Reorder**: Drag and drop to rearrange PDF pages
- **Password Protect**: Add password security to PDF files
- **Password Unlock**: Remove password protection from PDFs
- **Remove Blank Pages**: Automatically detect and remove empty pages
- **Add Page Numbers**: Insert page numbering with customizable position and format
- **Add Watermark**: Apply text or image watermarks to PDF pages
- **Sign PDF**: Digital signature functionality with draw or upload signature options
- **OCR to Searchable PDF**: Convert scanned PDFs to searchable text

## Image Tools
Browser-based image processing capabilities:

- **Image Compressor**: Reduce image file sizes while maintaining quality
- **Photo KB Resizer**: Resize images to specific file sizes (20KB - 200KB range with custom size option)
- **Background Remover**: Automatic background removal with manual refinement tools
- **Background Changer**: Replace backgrounds with preset colors or custom color picker

## Resume Builder
Multi-template resume creation system:

### Template Types
- Fresher resume template
- Experienced professional template
- Corporate/Professional template
- Simple template
- Creative template

### Resume Sections
- Personal information and contact details
- Education history
- Work experience
- Skills and competencies
- Projects and achievements
- Additional customizable sections

### Features
- Template preview and selection interface
- Manual editing capabilities for all sections
- PDF export functionality with manual download

## SEO and Legal Requirements
- SEO-optimized metadata and titles for each tool page
- Schema markup for better search visibility
- Privacy Policy page
- Terms of Use page
- Disclaimer page
- AdSense-compatible layout and content structure

## Technical Requirements
- All file processing must remain client-side for privacy
- Support for common file formats (PDF, DOC, DOCX, JPG, PNG)
- Real-time processing feedback and progress indicators (use processing-icon-transparent.dim_48x48.png and success-icon-transparent.dim_32x32.png)
- Error handling for unsupported files or processing failures
- Cross-browser compatibility for modern browsers
- Use upload-illustration.dim_300x200.png for file upload areas
