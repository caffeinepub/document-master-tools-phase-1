import PhotoResizeTool, { PhotoPreset } from '@/components/image-tools/PhotoResizeTool';

interface SSCPhotoResizePageProps {
  onBack: () => void;
}

const presets: PhotoPreset[] = [
  { name: 'SSC Exam Photo', width: 300, height: 400, maxSizeKB: 100 },
  { name: 'SSC CGL Photo', width: 300, height: 400, maxSizeKB: 100 },
  { name: 'SSC CHSL Photo', width: 300, height: 400, maxSizeKB: 100 },
];

export default function SSCPhotoResizePage({ onBack }: SSCPhotoResizePageProps) {
  return (
    <PhotoResizeTool
      onBack={onBack}
      title="SSC Photo Resize"
      description="Resize photos for SSC (Staff Selection Commission) exams including CGL, CHSL, and other government examinations."
      presets={presets}
      defaultPreset="SSC Exam Photo"
    />
  );
}
