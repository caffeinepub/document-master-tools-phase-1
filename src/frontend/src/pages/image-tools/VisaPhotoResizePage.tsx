import PhotoResizeTool, { PhotoPreset } from '@/components/image-tools/PhotoResizeTool';

interface VisaPhotoResizePageProps {
  onBack: () => void;
}

const presets: PhotoPreset[] = [
  { name: 'US Visa (2×2 inch)', width: 600, height: 600, maxSizeKB: 240 },
  { name: 'UK Visa (35×45 mm)', width: 413, height: 531, maxSizeKB: 150 },
  { name: 'Schengen Visa (35×45 mm)', width: 413, height: 531, maxSizeKB: 150 },
  { name: 'Canada Visa (35×45 mm)', width: 413, height: 531, maxSizeKB: 150 },
];

export default function VisaPhotoResizePage({ onBack }: VisaPhotoResizePageProps) {
  return (
    <PhotoResizeTool
      onBack={onBack}
      title="Visa Photo Resize"
      description="Resize photos for international visa applications including US, UK, Schengen, and Canada with country-specific requirements."
      presets={presets}
      defaultPreset="US Visa (2×2 inch)"
    />
  );
}
