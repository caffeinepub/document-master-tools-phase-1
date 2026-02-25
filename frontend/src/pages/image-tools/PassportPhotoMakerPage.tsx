import PhotoResizeTool, { PhotoPreset } from '@/components/image-tools/PhotoResizeTool';

interface PassportPhotoMakerPageProps {
  onBack: () => void;
}

const presets: PhotoPreset[] = [
  { name: 'India Passport (2×2 inch)', width: 600, height: 600, maxSizeKB: 100 },
  { name: 'US Passport (2×2 inch)', width: 600, height: 600, maxSizeKB: 240 },
  { name: 'UK Passport (35×45 mm)', width: 413, height: 531, maxSizeKB: 150 },
  { name: 'Schengen Visa (35×45 mm)', width: 413, height: 531, maxSizeKB: 150 },
];

export default function PassportPhotoMakerPage({ onBack }: PassportPhotoMakerPageProps) {
  return (
    <>
      <PhotoResizeTool
        onBack={onBack}
        title="Passport Photo Maker - Create Government Standard Photos"
        description="Create government standard passport photos with preset dimensions and file size requirements for various countries."
        presets={presets}
        defaultPreset="India Passport (2×2 inch)"
      />

      <div className="container mx-auto px-4 max-w-4xl pb-12">
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mt-8 mb-4">About Passport Photo Requirements</h2>
          <p className="text-muted-foreground mb-4">
            Passport photos must meet specific government standards for size, dimensions, and file format. Our passport photo maker helps you create compliant photos for Indian passports, US passports, UK passports, and Schengen visa applications. Simply upload your photo, select the country preset, and download the properly sized image that meets all official requirements including dimension specifications and maximum file size limits.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">What are the standard passport photo dimensions?</h4>
              <p className="text-muted-foreground">Indian passports require 2×2 inch (600×600 px) photos, while US passports also use 2×2 inch. UK and Schengen visas require 35×45 mm (413×531 px) photos.</p>
            </div>
            <div>
              <h4 className="font-semibold">What is the maximum file size for passport photos?</h4>
              <p className="text-muted-foreground">File size limits vary by country: India allows up to 100KB, US up to 240KB, and UK/Schengen up to 150KB. Our tool automatically compresses to meet these requirements.</p>
            </div>
            <div>
              <h4 className="font-semibold">Can I use this for visa applications?</h4>
              <p className="text-muted-foreground">Yes! Our tool includes presets for Schengen visa applications and can be customized for other visa photo requirements.</p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Related Tools:</strong> Also check out our Calculator Hub for academic and financial calculations, and PDF Tools for document processing.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
