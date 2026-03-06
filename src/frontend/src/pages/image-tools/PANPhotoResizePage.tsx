import BreadcrumbNavigation from "@/components/BreadcrumbNavigation";
import SEO from "@/components/SEO";
import PhotoResizeTool, {
  type PhotoPreset,
} from "@/components/image-tools/PhotoResizeTool";

interface PANPhotoResizePageProps {
  onNavigate?: (page: string) => void;
}

const panPresets: PhotoPreset[] = [
  {
    label: "NSDL PAN (213×213)",
    width: 213,
    height: 213,
    unit: "px",
    maxSizeKB: 50,
  },
  {
    label: "UTIITSL PAN (200×200)",
    width: 200,
    height: 200,
    unit: "px",
    maxSizeKB: 50,
  },
  {
    label: "PAN Signature (213×67)",
    width: 213,
    height: 67,
    unit: "px",
    maxSizeKB: 30,
  },
];

export default function PANPhotoResizePage({
  onNavigate,
}: PANPhotoResizePageProps) {
  return (
    <div
      className="min-h-screen py-8 px-4"
      style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)" }}
    >
      <SEO
        title="PAN Card Photo Resize Online Free | DocMasterTools"
        description="Resize your photo for PAN card application online for free. Supports NSDL and UTIITSL specifications."
        canonicalUrl="https://docmastertools.com/image-tools/pan-photo"
      />
      <div className="max-w-4xl mx-auto">
        <BreadcrumbNavigation
          items={[
            {
              label: "Image Tools",
              onClick: () => onNavigate?.("image-tools"),
            },
            { label: "PAN Photo Resize" },
          ]}
          onNavigate={onNavigate}
        />
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
            PAN Card Photo Resize
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Resize your photo to exact PAN card specifications for NSDL and
            UTIITSL applications.
          </p>
        </div>
        <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-8">
          <PhotoResizeTool
            presets={panPresets}
            toolTitle="PAN Card Photo Resize"
            defaultPresetIndex={0}
          />
        </div>
        <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-8">
          <h2 className="text-lg font-bold text-white mb-3">
            PAN Card Photo Requirements
          </h2>
          <p className="text-slate-300 text-sm mb-3">
            The Income Tax Department requires specific photo dimensions for PAN
            card applications through NSDL and UTIITSL portals.
          </p>
          <ul className="space-y-2 text-slate-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>NSDL: 213×213
              pixels, max 50KB
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>UTIITSL: 200×200
              pixels, max 50KB
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>Signature: 213×67
              pixels, max 30KB
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>Format: JPEG/JPG
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
