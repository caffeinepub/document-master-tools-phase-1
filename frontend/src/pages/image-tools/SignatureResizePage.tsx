import React from 'react';
import SEO from '../../components/SEO';
import BreadcrumbNavigation from '../../components/BreadcrumbNavigation';
import PhotoResizeTool, { PhotoPreset } from '../../components/image-tools/PhotoResizeTool';

const signaturePresets: PhotoPreset[] = [
  { label: 'Aadhaar Signature (140×60px)', width: 140, height: 60, unit: 'px', maxSizeKB: 30 },
  { label: 'PAN Signature (140×60px)', width: 140, height: 60, unit: 'px', maxSizeKB: 30 },
  { label: 'Exam Signature (140×60px)', width: 140, height: 60, unit: 'px', maxSizeKB: 30 },
  { label: 'Standard (200×80px)', width: 200, height: 80, unit: 'px', maxSizeKB: 50 },
];

const SignatureResizePage: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <SEO
        title="Signature Resize Online Free - Aadhaar, PAN, Exam Specifications"
        description="Resize signature image for Aadhaar, PAN, and exam applications online. Advanced settings with before/after preview and instant download."
        canonicalUrl="https://docmastertools.com/signature-resize"
      />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <BreadcrumbNavigation
          items={[
            { label: 'Home', onClick: () => onNavigate?.('home') },
            { label: 'Image Tools', onClick: () => onNavigate?.('image-tools') },
            { label: 'Signature Resize' },
          ]}
        />
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">Signature Resize</h1>
          <p className="text-gray-400">Resize your signature image to Aadhaar, PAN, and exam application specifications.</p>
        </div>
        <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
          <PhotoResizeTool
            toolTitle="Signature Resize"
            presets={signaturePresets}
            defaultPresetIndex={0}
            onNavigate={onNavigate}
          />
        </div>
      </main>
    </div>
  );
};

export default SignatureResizePage;
