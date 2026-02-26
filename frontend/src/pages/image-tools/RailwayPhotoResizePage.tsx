import React from 'react';
import SEO from '../../components/SEO';
import BreadcrumbNavigation from '../../components/BreadcrumbNavigation';
import PhotoResizeTool, { PhotoPreset } from '../../components/image-tools/PhotoResizeTool';

const railwayPresets: PhotoPreset[] = [
  { label: 'RRB NTPC (300×400px)', width: 300, height: 400, unit: 'px', maxSizeKB: 100 },
  { label: 'RRB Group D (200×230px)', width: 200, height: 230, unit: 'px', maxSizeKB: 50 },
  { label: 'Railway ALP (200×230px)', width: 200, height: 230, unit: 'px', maxSizeKB: 50 },
];

const RailwayPhotoResizePage: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <SEO
        title="Railway Exam Photo Resize Online Free - RRB NTPC, Group D"
        description="Resize photo for Indian Railway recruitment exams online. Supports RRB NTPC, Group D, and ALP specifications with before/after preview."
        canonicalUrl="https://docmastertools.com/railway-photo-resize"
      />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <BreadcrumbNavigation
          items={[
            { label: 'Home', onClick: () => onNavigate?.('home') },
            { label: 'Image Tools', onClick: () => onNavigate?.('image-tools') },
            { label: 'Railway Photo Resize' },
          ]}
        />
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">Railway Exam Photo Resize</h1>
          <p className="text-gray-400">Resize your photo to Indian Railway recruitment exam specifications.</p>
        </div>
        <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
          <PhotoResizeTool
            toolTitle="Railway Photo Resize"
            presets={railwayPresets}
            defaultPresetIndex={0}
            onNavigate={onNavigate}
          />
        </div>
      </main>
    </div>
  );
};

export default RailwayPhotoResizePage;
