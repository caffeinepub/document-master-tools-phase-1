import React from 'react';
import SEO from '../../components/SEO';
import BreadcrumbNavigation from '../../components/BreadcrumbNavigation';
import PhotoResizeTool, { PhotoPreset } from '../../components/image-tools/PhotoResizeTool';

const panPresets: PhotoPreset[] = [
  { label: 'PAN Card Photo (200×230px)', width: 200, height: 230, unit: 'px', maxSizeKB: 50 },
  { label: 'PAN Card Photo (300×300px)', width: 300, height: 300, unit: 'px', maxSizeKB: 50 },
];

const PANPhotoResizePage: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <SEO
        title="PAN Card Photo Resize Online Free - NSDL/UTIITSL Specifications"
        description="Resize photo for PAN card application online. Supports NSDL and UTIITSL specifications with quality control and before/after preview."
        canonicalUrl="https://docmastertools.com/pan-photo-resize"
      />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <BreadcrumbNavigation
          items={[
            { label: 'Home', onClick: () => onNavigate?.('home') },
            { label: 'Image Tools', onClick: () => onNavigate?.('image-tools') },
            { label: 'PAN Card Photo Resize' },
          ]}
        />
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">PAN Card Photo Resize</h1>
          <p className="text-gray-400">Resize your photo to PAN card specifications as per NSDL/UTIITSL requirements.</p>
        </div>
        <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
          <PhotoResizeTool
            toolTitle="PAN Card Photo Resize"
            presets={panPresets}
            defaultPresetIndex={0}
            onNavigate={onNavigate}
          />
        </div>
      </main>
    </div>
  );
};

export default PANPhotoResizePage;
