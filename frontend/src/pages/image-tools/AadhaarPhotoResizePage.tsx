import React from 'react';
import SEO from '../../components/SEO';
import BreadcrumbNavigation from '../../components/BreadcrumbNavigation';
import PhotoResizeTool, { PhotoPreset } from '../../components/image-tools/PhotoResizeTool';

const aadhaarPresets: PhotoPreset[] = [
  { label: 'Aadhaar Photo (200×200px)', width: 200, height: 200, unit: 'px', maxSizeKB: 50 },
  { label: 'Aadhaar Photo (480×640px)', width: 480, height: 640, unit: 'px', maxSizeKB: 100 },
];

const AadhaarPhotoResizePage: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <SEO
        title="Aadhaar Card Photo Resize Online Free - 200x200, 480x640"
        description="Resize photo for Aadhaar card online. Supports 200×200 and 480×640 pixel specifications with quality control and before/after preview."
        canonicalUrl="https://docmastertools.com/aadhaar-photo-resize"
      />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <BreadcrumbNavigation
          items={[
            { label: 'Home', onClick: () => onNavigate?.('home') },
            { label: 'Image Tools', onClick: () => onNavigate?.('image-tools') },
            { label: 'Aadhaar Photo Resize' },
          ]}
        />
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">Aadhaar Card Photo Resize</h1>
          <p className="text-gray-400">Resize your photo to Aadhaar card specifications (200×200 or 480×640 pixels).</p>
        </div>
        <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
          <PhotoResizeTool
            toolTitle="Aadhaar Photo Resize"
            presets={aadhaarPresets}
            defaultPresetIndex={0}
            onNavigate={onNavigate}
          />
        </div>
      </main>
    </div>
  );
};

export default AadhaarPhotoResizePage;
