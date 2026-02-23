import PhotoResizeTool, { PhotoPreset } from '@/components/image-tools/PhotoResizeTool';

interface RailwayPhotoResizePageProps {
  onBack: () => void;
}

const presets: PhotoPreset[] = [
  { name: 'Railway RRB Photo', width: 300, height: 400, maxSizeKB: 100 },
  { name: 'Railway NTPC Photo', width: 300, height: 400, maxSizeKB: 100 },
];

export default function RailwayPhotoResizePage({ onBack }: RailwayPhotoResizePageProps) {
  return (
    <PhotoResizeTool
      onBack={onBack}
      title="Railway Photo Resize"
      description="Resize photos for Indian Railway recruitment exams including RRB, NTPC, and other railway board examinations."
      presets={presets}
      defaultPreset="Railway RRB Photo"
    />
  );
}
