import React from 'react';
import SEO from '../../components/SEO';
import BreadcrumbNavigation from '../../components/BreadcrumbNavigation';
import PhotoResizeTool, { PhotoPreset } from '../../components/image-tools/PhotoResizeTool';

const passportPresets: PhotoPreset[] = [
  { label: 'India Passport (35×45mm)', width: 132, height: 170, unit: 'px', maxSizeKB: 50, dpi: 96 },
  { label: 'US Passport (2×2 inch)', width: 600, height: 600, unit: 'px', maxSizeKB: 240, dpi: 300 },
  { label: 'UK Passport (35×45mm)', width: 132, height: 170, unit: 'px', maxSizeKB: 50, dpi: 96 },
  { label: 'Schengen Visa (35×45mm)', width: 132, height: 170, unit: 'px', maxSizeKB: 50, dpi: 96 },
  { label: 'Canada Passport (50×70mm)', width: 189, height: 264, unit: 'px', maxSizeKB: 240, dpi: 96 },
];

const PassportPhotoMakerPage: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <SEO
        title="Passport Photo Maker - Resize Passport Photos Online Free"
        description="Create passport photos for India, US, UK, Schengen visa online. Advanced settings with before/after preview and instant download."
        canonicalUrl="https://docmastertools.com/passport-photo-maker"
      />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <BreadcrumbNavigation
          items={[
            { label: 'Home', onClick: () => onNavigate?.('home') },
            { label: 'Image Tools', onClick: () => onNavigate?.('image-tools') },
            { label: 'Passport Photo Maker' },
          ]}
        />
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">Passport Photo Maker</h1>
          <p className="text-gray-400">Resize your photo to passport specifications for India, US, UK, Schengen, and Canada.</p>
        </div>
        <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
          <PhotoResizeTool
            toolTitle="Passport Photo Maker"
            presets={passportPresets}
            defaultPresetIndex={0}
            onNavigate={onNavigate}
          />
        </div>
      </main>
    </div>
  );
};

export default PassportPhotoMakerPage;
