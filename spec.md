# Document Master Tools - Image Size Comparison Feature

## Current State

The platform has 9 image tools in two categories:

**Tools using `AdvancedToolShell` (already have side-by-side preview, but missing size/dimension stats):**
- CustomImageResizePage (`/custom-image-resize`)
- JPGToPNGPage (`/jpg-to-png`)
- WEBPConverterPage (`/webp-converter`)
- PassportPhotoMakerPage → PhotoResizeTool → AdvancedToolShell
- AadhaarPhotoResizePage → PhotoResizeTool → AdvancedToolShell
- PANPhotoResizePage → PhotoResizeTool → AdvancedToolShell
- SignatureResizePage → PhotoResizeTool → AdvancedToolShell

**Tools with custom UIs (missing side-by-side preview and size comparison):**
- ImageCompressorPage (`/image-tools/image-compressor`) — has basic before/after images and compressed size text, but no structured size comparison block
- ImageCropperPage (`/image-tools/image-cropper`) — shows only the cropped result with no original for comparison, no size stats

`AdvancedToolShell` currently shows:
- A "Result Details" metadata block (key-value pairs like Dimensions, Format, Quality)
- A side-by-side before/after image grid
- A Download button (already gated behind result being available)
- A post-download confirmation
- No file size comparison or dimension comparison as structured stats

## Requested Changes (Diff)

### Add
- A "Size Comparison" stats bar in `AdvancedToolShell` between the metadata block and the before/after preview, showing:
  - Original file size
  - New file size
  - Size reduction % (with green color if reduction, red if increase)
  - Original dimensions (read from the source file via Image element)
  - Processed dimensions (from result metadata or blob)
- The same "Size Comparison" stats block in `ImageCompressorPage` and `ImageCropperPage`
- Original image dimensions tracking in `AdvancedToolShell` (captured when file is loaded)
- Cropped result dimensions display in `ImageCropperPage`

### Modify
- `AdvancedToolShell`: capture original image dimensions when file is first selected; add size comparison stats panel after processing
- `ImageCompressorPage`: add structured size comparison stats block with original/new size, reduction %, original/processed dimensions; add side-by-side preview (it already has basic images, enhance to match style); keep Download button gated behind result
- `ImageCropperPage`: add side-by-side original vs cropped preview with size comparison stats; track original file size and dimensions; track cropped blob size and dimensions; keep Download gated behind result

### Remove
- Nothing removed — all existing logic and layouts remain intact

## Implementation Plan

1. **AdvancedToolShell.tsx** — Add `originalDimensions` state (populated via Image onload when file is set). After processing, render a "Size Comparison" panel showing original size, new size, reduction %, original dimensions, processed dimensions. The Download button already only appears with `result` present — keep this behavior.

2. **ImageCompressorPage.tsx** — Add `originalDimensions` state. Capture original image W×H when file is loaded. After compression, add a structured "Size & Dimension Comparison" panel with 3 stat boxes (Original Size, New Size, Reduction %) and a dimensions row. Enhance the side-by-side preview to match the dark-card style. Keep Download gated behind `compressedUrl`.

3. **ImageCropperPage.tsx** — Track `originalSize` (file.size), `croppedSize` (blob.size), `originalDimensions`, `croppedDimensions`. After cropping, show a side-by-side preview (original on left, cropped on right) and a size comparison stats panel. Keep Download gated behind `croppedUrl`.
