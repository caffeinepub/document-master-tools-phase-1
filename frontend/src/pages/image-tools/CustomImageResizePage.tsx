import PhotoResizeTool, { PhotoPreset } from '@/components/image-tools/PhotoResizeTool';

interface CustomImageResizePageProps {
  onBack: () => void;
}

const presets: PhotoPreset[] = [
  { name: 'HD (1920×1080)', width: 1920, height: 1080 },
  { name: 'Full HD (1080×1920)', width: 1080, height: 1920 },
  { name: 'Square (1000×1000)', width: 1000, height: 1000 },
  { name: 'Instagram Post (1080×1080)', width: 1080, height: 1080 },
  { name: 'Instagram Story (1080×1920)', width: 1080, height: 1920 },
  { name: 'Facebook Cover (820×312)', width: 820, height: 312 },
];

export default function CustomImageResizePage({ onBack }: CustomImageResizePageProps) {
  return (
    <PhotoResizeTool
      onBack={onBack}
      title="Custom Image Resize"
      description="Resize images to any custom dimensions or choose from popular social media and display presets."
      presets={presets}
      defaultPreset="custom"
    />
  );
}
