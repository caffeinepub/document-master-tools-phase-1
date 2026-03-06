import BreadcrumbNavigation from "@/components/BreadcrumbNavigation";
import SEO from "@/components/SEO";
import PhotoResizeTool, {
  type PhotoPreset,
} from "@/components/image-tools/PhotoResizeTool";

interface SSCPhotoResizePageProps {
  onNavigate?: (page: string) => void;
}

const sscPresets: PhotoPreset[] = [
  {
    label: "SSC CGL (100×120px)",
    width: 100,
    height: 120,
    unit: "px",
    maxSizeKB: 20,
  },
  {
    label: "SSC CHSL (100×120px)",
    width: 100,
    height: 120,
    unit: "px",
    maxSizeKB: 20,
  },
  {
    label: "SSC MTS (100×120px)",
    width: 100,
    height: 120,
    unit: "px",
    maxSizeKB: 20,
  },
  {
    label: "SSC GD (200×230px)",
    width: 200,
    height: 230,
    unit: "px",
    maxSizeKB: 50,
  },
];

export default function SSCPhotoResizePage({
  onNavigate,
}: SSCPhotoResizePageProps) {
  return (
    <div
      className="min-h-screen py-8 px-4"
      style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)" }}
    >
      <SEO
        title="SSC Exam Photo Resize Online Free | DocMasterTools"
        description="Resize photos for SSC CGL, CHSL, MTS, and GD exam forms online for free. Exact specifications guaranteed."
        canonicalUrl="https://docmastertools.com/image-tools/ssc-photo"
      />
      <div className="max-w-4xl mx-auto">
        <BreadcrumbNavigation
          items={[
            {
              label: "Image Tools",
              onClick: () => onNavigate?.("image-tools"),
            },
            { label: "SSC Photo Resize" },
          ]}
          onNavigate={onNavigate}
        />
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
            SSC Exam Photo Resize
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Resize your photo to exact SSC exam specifications for CGL, CHSL,
            MTS, and GD forms.
          </p>
        </div>
        <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-8">
          <PhotoResizeTool
            presets={sscPresets}
            toolTitle="SSC Photo Resize"
            defaultPresetIndex={0}
          />
        </div>
        <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-8">
          <h2 className="text-lg font-bold text-white mb-3">
            SSC Photo Requirements
          </h2>
          <p className="text-slate-300 text-sm mb-3">
            Staff Selection Commission (SSC) requires specific photo dimensions
            for different exam applications.
          </p>
          <ul className="space-y-2 text-slate-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>SSC CGL/CHSL/MTS:
              100×120 pixels, max 20KB
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>SSC GD: 200×230
              pixels, max 50KB
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>Format: JPEG/JPG
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>White or light
              background
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
