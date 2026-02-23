import PhotoResizeTool, { PhotoPreset } from '@/components/image-tools/PhotoResizeTool';

interface AadhaarPhotoResizePageProps {
  onBack: () => void;
}

const presets: PhotoPreset[] = [
  { name: 'Aadhaar Card Photo', width: 200, height: 200, maxSizeKB: 50 },
  { name: 'Aadhaar Enrollment', width: 480, height: 640, maxSizeKB: 100 },
];

export default function AadhaarPhotoResizePage({ onBack }: AadhaarPhotoResizePageProps) {
  return (
    <PhotoResizeTool
      onBack={onBack}
      title="Aadhaar Photo Resize"
      description="Resize photos for Aadhaar card applications and enrollment with government-specified dimensions and file size limits."
      presets={presets}
      defaultPreset="Aadhaar Card Photo"
    />
  );
}
