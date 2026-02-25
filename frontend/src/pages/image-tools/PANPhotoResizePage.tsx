import PhotoResizeTool, { PhotoPreset } from '@/components/image-tools/PhotoResizeTool';

interface PANPhotoResizePageProps {
  onBack: () => void;
}

const presets: PhotoPreset[] = [
  { name: 'PAN Card Photo', width: 200, height: 230, maxSizeKB: 50 },
];

export default function PANPhotoResizePage({ onBack }: PANPhotoResizePageProps) {
  return (
    <PhotoResizeTool
      onBack={onBack}
      title="PAN Card Photo Resize"
      description="Resize photos for PAN card applications with NSDL/UTIITSL specified dimensions and file size requirements."
      presets={presets}
      defaultPreset="PAN Card Photo"
    />
  );
}
