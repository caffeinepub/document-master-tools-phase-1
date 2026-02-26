import React from 'react';
import SEO from '../../components/SEO';
import BreadcrumbNavigation from '../../components/BreadcrumbNavigation';
import PhotoResizeTool, { PhotoPreset } from '../../components/image-tools/PhotoResizeTool';

const policeArmyPresets: PhotoPreset[] = [
  { label: 'Police/Army (300×400px)', width: 300, height: 400, unit: 'px', maxSizeKB: 100 },
  { label: 'CAPF (200×230px)', width: 200, height: 230, unit: 'px', maxSizeKB: 50 },
  { label: 'BSF/CRPF (200×230px)', width: 200, height: 230, unit: 'px', maxSizeKB: 50 },
];

const PoliceArmyPhotoPage: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <SEO
        title="Police Army CAPF Photo Resize Online Free"
        description="Resize photo for Police, Army, and CAPF recruitment online. Supports standard specifications with quality control and before/after preview."
        canonicalUrl="https://docmastertools.com/police-army-photo-resize"
      />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <BreadcrumbNavigation
          items={[
            { label: 'Home', onClick: () => onNavigate?.('home') },
            { label: 'Image Tools', onClick: () => onNavigate?.('image-tools') },
            { label: 'Police/Army Photo Resize' },
          ]}
        />
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">Police, Army &amp; CAPF Photo Resize</h1>
          <p className="text-gray-400">Resize your photo to Police, Army, and CAPF recruitment specifications.</p>
        </div>
        <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
          <PhotoResizeTool
            toolTitle="Police/Army Photo Resize"
            presets={policeArmyPresets}
            defaultPresetIndex={0}
            onNavigate={onNavigate}
          />
        </div>
      </main>
    </div>
  );
};

export default PoliceArmyPhotoPage;
