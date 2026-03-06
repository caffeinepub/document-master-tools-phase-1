import BreadcrumbNavigation from "@/components/BreadcrumbNavigation";
import SEO from "@/components/SEO";
import PhotoResizeTool, {
  type PhotoPreset,
} from "@/components/image-tools/PhotoResizeTool";

interface PassportPhotoMakerPageProps {
  onNavigate?: (page: string) => void;
}

const passportPresets: PhotoPreset[] = [
  {
    label: "India Passport (35×45mm)",
    width: 413,
    height: 531,
    unit: "px",
    maxSizeKB: 100,
  },
  {
    label: "US Passport (2×2 inch)",
    width: 600,
    height: 600,
    unit: "px",
    maxSizeKB: 240,
  },
  {
    label: "UK Passport (35×45mm)",
    width: 413,
    height: 531,
    unit: "px",
    maxSizeKB: 100,
  },
  {
    label: "Schengen Visa (35×45mm)",
    width: 413,
    height: 531,
    unit: "px",
    maxSizeKB: 100,
  },
  {
    label: "Canada Passport (50×70mm)",
    width: 591,
    height: 827,
    unit: "px",
    maxSizeKB: 240,
  },
];

export default function PassportPhotoMakerPage({
  onNavigate,
}: PassportPhotoMakerPageProps) {
  return (
    <div
      className="min-h-screen py-8 px-4"
      style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)" }}
    >
      <SEO
        title="Passport Photo Maker Online Free | DocMasterTools"
        description="Create standard passport photos for India, US, UK, Schengen, and Canada online for free. Download instantly."
        canonicalUrl="https://docmastertools.com/image-tools/passport-photo"
      />
      <div className="max-w-4xl mx-auto">
        <BreadcrumbNavigation
          items={[
            {
              label: "Image Tools",
              onClick: () => onNavigate?.("image-tools"),
            },
            { label: "Passport Photo Maker" },
          ]}
          onNavigate={onNavigate}
        />
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Passport Photo Maker
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Create standard passport photos for India, US, UK, Schengen, and
            Canada. Download instantly for free.
          </p>
        </div>
        <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-8">
          <PhotoResizeTool
            presets={passportPresets}
            toolTitle="Passport Photo Maker"
            defaultPresetIndex={0}
          />
        </div>
        <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-8">
          <h2 className="text-lg font-bold text-white mb-3">
            Passport Photo Requirements
          </h2>
          <p className="text-slate-300 text-sm mb-3">
            Different countries have specific passport photo requirements. Our
            tool supports all major formats.
          </p>
          <ul className="space-y-2 text-slate-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>India: 35×45mm,
              white background
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>US: 2×2 inch
              (51×51mm), white background
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>UK/Schengen:
              35×45mm
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>Canada: 50×70mm
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
