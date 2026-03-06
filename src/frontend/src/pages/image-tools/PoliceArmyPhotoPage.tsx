import BreadcrumbNavigation from "@/components/BreadcrumbNavigation";
import SEO from "@/components/SEO";
import PhotoResizeTool, {
  type PhotoPreset,
} from "@/components/image-tools/PhotoResizeTool";

interface PoliceArmyPhotoPageProps {
  onNavigate?: (page: string) => void;
}

const policeArmyPresets: PhotoPreset[] = [
  {
    label: "Police Recruitment (200×230px)",
    width: 200,
    height: 230,
    unit: "px",
    maxSizeKB: 50,
  },
  {
    label: "Army Recruitment (200×230px)",
    width: 200,
    height: 230,
    unit: "px",
    maxSizeKB: 50,
  },
  {
    label: "CAPF (200×230px)",
    width: 200,
    height: 230,
    unit: "px",
    maxSizeKB: 50,
  },
  {
    label: "BSF/CRPF (200×230px)",
    width: 200,
    height: 230,
    unit: "px",
    maxSizeKB: 50,
  },
];

export default function PoliceArmyPhotoPage({
  onNavigate,
}: PoliceArmyPhotoPageProps) {
  return (
    <div
      className="min-h-screen py-8 px-4"
      style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)" }}
    >
      <SEO
        title="Police Army CAPF Photo Resize Online Free | DocMasterTools"
        description="Resize photos for Police, Army, CAPF, BSF, and CRPF recruitment forms online for free."
        canonicalUrl="https://docmastertools.com/image-tools/police-army-photo"
      />
      <div className="max-w-4xl mx-auto">
        <BreadcrumbNavigation
          items={[
            {
              label: "Image Tools",
              onClick: () => onNavigate?.("image-tools"),
            },
            { label: "Police/Army Photo" },
          ]}
          onNavigate={onNavigate}
        />
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Police &amp; Army Photo Resize
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Resize your photo to exact specifications for Police, Army, CAPF,
            BSF, and CRPF recruitment forms.
          </p>
        </div>
        <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-8">
          <PhotoResizeTool
            presets={policeArmyPresets}
            toolTitle="Police/Army Photo Resize"
            defaultPresetIndex={0}
          />
        </div>
        <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-8">
          <h2 className="text-lg font-bold text-white mb-3">
            Police &amp; Army Photo Requirements
          </h2>
          <p className="text-slate-300 text-sm mb-3">
            All central police and paramilitary forces require standardized
            photo dimensions for recruitment applications.
          </p>
          <ul className="space-y-2 text-slate-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>Standard size:
              200×230 pixels
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>File size: max 50KB
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
