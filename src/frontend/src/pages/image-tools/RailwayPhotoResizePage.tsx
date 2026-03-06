import BreadcrumbNavigation from "@/components/BreadcrumbNavigation";
import SEO from "@/components/SEO";
import PhotoResizeTool, {
  type PhotoPreset,
} from "@/components/image-tools/PhotoResizeTool";

interface RailwayPhotoResizePageProps {
  onNavigate?: (page: string) => void;
}

const railwayPresets: PhotoPreset[] = [
  {
    label: "RRB NTPC (200×230px)",
    width: 200,
    height: 230,
    unit: "px",
    maxSizeKB: 50,
  },
  {
    label: "RRB Group D (200×230px)",
    width: 200,
    height: 230,
    unit: "px",
    maxSizeKB: 50,
  },
  {
    label: "RRB ALP (200×230px)",
    width: 200,
    height: 230,
    unit: "px",
    maxSizeKB: 50,
  },
];

export default function RailwayPhotoResizePage({
  onNavigate,
}: RailwayPhotoResizePageProps) {
  return (
    <div
      className="min-h-screen py-8 px-4"
      style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)" }}
    >
      <SEO
        title="Railway Recruitment Photo Resize Online Free | DocMasterTools"
        description="Resize photos for RRB NTPC, Group D, and ALP recruitment forms online for free."
        canonicalUrl="https://docmastertools.com/image-tools/railway-photo"
      />
      <div className="max-w-4xl mx-auto">
        <BreadcrumbNavigation
          items={[
            {
              label: "Image Tools",
              onClick: () => onNavigate?.("image-tools"),
            },
            { label: "Railway Photo Resize" },
          ]}
          onNavigate={onNavigate}
        />
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Railway Recruitment Photo Resize
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Resize your photo to exact Railway recruitment specifications for
            RRB NTPC, Group D, and ALP forms.
          </p>
        </div>
        <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-8">
          <PhotoResizeTool
            presets={railwayPresets}
            toolTitle="Railway Photo Resize"
            defaultPresetIndex={0}
          />
        </div>
        <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-8">
          <h2 className="text-lg font-bold text-white mb-3">
            Railway Photo Requirements
          </h2>
          <p className="text-slate-300 text-sm mb-3">
            Railway Recruitment Boards (RRB) require specific photo dimensions
            for all recruitment applications.
          </p>
          <ul className="space-y-2 text-slate-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>All RRB exams:
              200×230 pixels
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>File size: max 50KB
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>Format: JPEG/JPG
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>White background
              required
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
