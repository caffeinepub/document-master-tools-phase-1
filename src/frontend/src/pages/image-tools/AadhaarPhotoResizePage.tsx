import BreadcrumbNavigation from "@/components/BreadcrumbNavigation";
import SEO from "@/components/SEO";
import PhotoResizeTool, {
  type PhotoPreset,
} from "@/components/image-tools/PhotoResizeTool";

interface AadhaarPhotoResizePageProps {
  onNavigate?: (page: string) => void;
}

const aadhaarPresets: PhotoPreset[] = [
  {
    label: "Aadhaar Standard (200×200)",
    width: 200,
    height: 200,
    unit: "px",
    maxSizeKB: 50,
  },
  {
    label: "Aadhaar Portrait (480×640)",
    width: 480,
    height: 640,
    unit: "px",
    maxSizeKB: 100,
  },
];

export default function AadhaarPhotoResizePage({
  onNavigate,
}: AadhaarPhotoResizePageProps) {
  return (
    <div
      className="min-h-screen py-8 px-4"
      style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)" }}
    >
      <SEO
        title="Aadhaar Card Photo Resize Online Free | DocMasterTools"
        description="Resize your photo for Aadhaar card application online for free. Supports 200×200 and 480×640 pixel formats with file size optimization."
        canonicalUrl="https://docmastertools.com/image-tools/aadhaar-photo"
      />
      <div className="max-w-4xl mx-auto">
        <BreadcrumbNavigation
          items={[
            {
              label: "Image Tools",
              onClick: () => onNavigate?.("image-tools"),
            },
            { label: "Aadhaar Photo Resize" },
          ]}
          onNavigate={onNavigate}
        />
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Aadhaar Card Photo Resize
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Resize your photo to exact Aadhaar card specifications. Supports
            200×200 and 480×640 pixel formats.
          </p>
        </div>
        <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-8">
          <PhotoResizeTool
            presets={aadhaarPresets}
            toolTitle="Aadhaar Photo Resize"
            defaultPresetIndex={0}
          />
        </div>
        <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-8">
          <h2 className="text-lg font-bold text-white mb-3">
            About Aadhaar Photo Requirements
          </h2>
          <p className="text-slate-300 text-sm mb-3">
            The Unique Identification Authority of India (UIDAI) requires
            specific photo dimensions for Aadhaar card applications.
          </p>
          <ul className="space-y-2 text-slate-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>Standard size:
              200×200 pixels, max 50KB
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>Portrait size:
              480×640 pixels, max 100KB
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>Format: JPEG/JPG
              preferred
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>White or light
              background recommended
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
