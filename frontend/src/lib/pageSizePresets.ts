export interface PageSizePreset {
  id: string;
  label: string;
  widthMm: number;
  heightMm: number;
  category: string;
}

export const PAGE_SIZE_PRESETS: PageSizePreset[] = [
  {
    id: 'a4',
    label: 'A4 (210 × 297 mm)',
    widthMm: 210,
    heightMm: 297,
    category: 'Office Print Ready',
  },
  {
    id: 'legal',
    label: 'Legal (216 × 356 mm)',
    widthMm: 215.9,
    heightMm: 355.6,
    category: 'Office Print Ready',
  },
  {
    id: 'letter',
    label: 'Letter (216 × 279 mm)',
    widthMm: 215.9,
    heightMm: 279.4,
    category: 'Office Print Ready',
  },
];

/**
 * Convert mm to pixels at a given DPI
 */
export function mmToPixels(mm: number, dpi: number = 300): number {
  return Math.round((mm / 25.4) * dpi);
}

/**
 * Get pixel dimensions for a page size preset at a given DPI
 */
export function getPresetPixelDimensions(
  preset: PageSizePreset,
  dpi: number = 300
): { width: number; height: number } {
  return {
    width: mmToPixels(preset.widthMm, dpi),
    height: mmToPixels(preset.heightMm, dpi),
  };
}
