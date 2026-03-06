import BreadcrumbNavigation from "@/components/BreadcrumbNavigation";
import SEO from "@/components/SEO";
import PhotoResizeTool, {
  type PhotoPreset,
} from "@/components/image-tools/PhotoResizeTool";

interface VisaPhotoResizePageProps {
  onNavigate?: (page: string) => void;
}

const visaPresets: PhotoPreset[] = [
  {
    label: "US Visa (2×2 inch)",
    width: 600,
    height: 600,
    unit: "px",
    maxSizeKB: 240,
  },
  {
    label: "UK Visa (35×45mm)",
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
    label: "Canada Visa (50×70mm)",
    width: 591,
    height: 827,
    unit: "px",
    maxSizeKB: 240,
  },
  {
    label: "Australia Visa (35×45mm)",
    width: 413,
    height: 531,
    unit: "px",
    maxSizeKB: 100,
  },
];

export default function VisaPhotoResizePage({
  onNavigate,
}: VisaPhotoResizePageProps) {
  return (
    <div
      className="min-h-screen py-8 px-4"
      style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)" }}
    >
      <SEO
        title="Visa Photo Resize Online Free | DocMasterTools"
        description="Resize photos for US, UK, Schengen, Canada, and Australia visa applications online for free."
        canonicalUrl="https://docmastertools.com/image-tools/visa-photo"
      />
      <div className="max-w-4xl mx-auto">
        <BreadcrumbNavigation
          items={[
            {
              label: "Image Tools",
              onClick: () => onNavigate?.("image-tools"),
            },
            { label: "Visa Photo Resize" },
          ]}
          onNavigate={onNavigate}
        />
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Visa Photo Resize
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Resize your photo to exact visa specifications for US, UK, Schengen,
            Canada, and Australia applications.
          </p>
        </div>
        <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-8">
          <PhotoResizeTool
            presets={visaPresets}
            toolTitle="Visa Photo Resize"
            defaultPresetIndex={0}
          />
        </div>
        <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-8">
          <h2 className="text-lg font-bold text-white mb-3">
            Visa Photo Requirements
          </h2>
          <p className="text-slate-300 text-sm mb-3">
            Different countries have specific visa photo requirements. Our tool
            supports all major visa formats.
          </p>
          <ul className="space-y-2 text-slate-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>US Visa: 2×2 inch
              (51×51mm), white background
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>UK/Schengen:
              35×45mm
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>Canada: 50×70mm
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>Australia: 35×45mm
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
