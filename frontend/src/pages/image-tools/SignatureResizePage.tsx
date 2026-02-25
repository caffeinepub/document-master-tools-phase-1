import PhotoResizeTool, { PhotoPreset } from '@/components/image-tools/PhotoResizeTool';

interface SignatureResizePageProps {
  onBack: () => void;
}

const presets: PhotoPreset[] = [
  { name: 'Standard Signature', width: 300, height: 80, maxSizeKB: 30 },
  { name: 'Aadhaar Signature', width: 200, height: 80, maxSizeKB: 20 },
  { name: 'PAN Signature', width: 200, height: 80, maxSizeKB: 20 },
  { name: 'Exam Signature', width: 300, height: 100, maxSizeKB: 40 },
];

export default function SignatureResizePage({ onBack }: SignatureResizePageProps) {
  return (
    <PhotoResizeTool
      onBack={onBack}
      title="Signature Resize"
      description="Resize signatures for government applications, exams, and official documents with preset dimensions."
      presets={presets}
      defaultPreset="Standard Signature"
    />
  );
}
