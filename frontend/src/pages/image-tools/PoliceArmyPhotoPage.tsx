import PhotoResizeTool, { PhotoPreset } from '@/components/image-tools/PhotoResizeTool';

interface PoliceArmyPhotoPageProps {
  onBack: () => void;
}

const presets: PhotoPreset[] = [
  { name: 'Police Recruitment', width: 300, height: 400, maxSizeKB: 100 },
  { name: 'Army Recruitment', width: 300, height: 400, maxSizeKB: 100 },
  { name: 'CAPF Photo', width: 300, height: 400, maxSizeKB: 100 },
];

export default function PoliceArmyPhotoPage({ onBack }: PoliceArmyPhotoPageProps) {
  return (
    <PhotoResizeTool
      onBack={onBack}
      title="Police/Army Photo Resize"
      description="Resize photos for Police, Army, and CAPF recruitment applications with standard government specifications."
      presets={presets}
      defaultPreset="Police Recruitment"
    />
  );
}
