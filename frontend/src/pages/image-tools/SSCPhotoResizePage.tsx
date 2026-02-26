import React from 'react';
import SEO from '../../components/SEO';
import BreadcrumbNavigation from '../../components/BreadcrumbNavigation';
import PhotoResizeTool, { PhotoPreset } from '../../components/image-tools/PhotoResizeTool';

const sscPresets: PhotoPreset[] = [
  { label: 'SSC CGL/CHSL (300×400px)', width: 300, height: 400, unit: 'px', maxSizeKB: 100 },
  { label: 'SSC MTS (200×230px)', width: 200, height: 230, unit: 'px', maxSizeKB: 50 },
  { label: 'SSC GD (200×230px)', width: 200, height: 230, unit: 'px', maxSizeKB: 50 },
];

const SSCPhotoResizePage: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <SEO
        title="SSC Exam Photo Resize Online Free - CGL, CHSL, MTS Specifications"
        description="Resize photo for SSC exams online. Supports CGL, CHSL, MTS, and GD specifications with quality control and before/after preview."
        canonicalUrl="https://docmastertools.com/ssc-photo-resize"
      />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <BreadcrumbNavigation
          items={[
            { label: 'Home', onClick: () => onNavigate?.('home') },
            { label: 'Image Tools', onClick: () => onNavigate?.('image-tools') },
            { label: 'SSC Photo Resize' },
          ]}
        />
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">SSC Exam Photo Resize</h1>
          <p className="text-gray-400">Resize your photo to SSC exam specifications for CGL, CHSL, MTS, and GD.</p>
        </div>
        <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
          <PhotoResizeTool
            toolTitle="SSC Photo Resize"
            presets={sscPresets}
            defaultPresetIndex={0}
            onNavigate={onNavigate}
          />
        </div>
      </main>
    </div>
  );
};

export default SSCPhotoResizePage;
