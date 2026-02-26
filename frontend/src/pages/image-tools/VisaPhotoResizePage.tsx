import React from 'react';
import SEO from '../../components/SEO';
import BreadcrumbNavigation from '../../components/BreadcrumbNavigation';
import PhotoResizeTool, { PhotoPreset } from '../../components/image-tools/PhotoResizeTool';

const visaPresets: PhotoPreset[] = [
  { label: 'US Visa (2×2 inch)', width: 600, height: 600, unit: 'px', maxSizeKB: 240, dpi: 300 },
  { label: 'UK Visa (35×45mm)', width: 132, height: 170, unit: 'px', maxSizeKB: 50 },
  { label: 'Schengen Visa (35×45mm)', width: 132, height: 170, unit: 'px', maxSizeKB: 50 },
  { label: 'Canada Visa (50×70mm)', width: 189, height: 264, unit: 'px', maxSizeKB: 240 },
  { label: 'Australia Visa (35×45mm)', width: 132, height: 170, unit: 'px', maxSizeKB: 50 },
];

const VisaPhotoResizePage: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <SEO
        title="Visa Photo Resize Online Free - US, UK, Schengen, Canada"
        description="Resize visa photos for US, UK, Schengen, Canada, and Australia online. Advanced settings with before/after preview and instant download."
        canonicalUrl="https://docmastertools.com/visa-photo-resize"
      />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <BreadcrumbNavigation
          items={[
            { label: 'Home', onClick: () => onNavigate?.('home') },
            { label: 'Image Tools', onClick: () => onNavigate?.('image-tools') },
            { label: 'Visa Photo Resize' },
          ]}
        />
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">Visa Photo Resize</h1>
          <p className="text-gray-400">Resize your photo to visa specifications for US, UK, Schengen, Canada, and Australia.</p>
        </div>
        <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
          <PhotoResizeTool
            toolTitle="Visa Photo Resize"
            presets={visaPresets}
            defaultPresetIndex={0}
            onNavigate={onNavigate}
          />
        </div>
      </main>
    </div>
  );
};

export default VisaPhotoResizePage;
