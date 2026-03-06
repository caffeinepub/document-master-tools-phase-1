import BreadcrumbNavigation from "@/components/BreadcrumbNavigation";
import SEO from "@/components/SEO";
import PhotoResizeTool, {
  type PhotoPreset,
} from "@/components/image-tools/PhotoResizeTool";

interface SignatureResizePageProps {
  onNavigate?: (page: string) => void;
}

const signaturePresets: PhotoPreset[] = [
  {
    label: "Aadhaar Signature (400×100px)",
    width: 400,
    height: 100,
    unit: "px",
    maxSizeKB: 30,
  },
  {
    label: "PAN Signature (213×67px)",
    width: 213,
    height: 67,
    unit: "px",
    maxSizeKB: 30,
  },
  {
    label: "Exam Signature (140×60px)",
    width: 140,
    height: 60,
    unit: "px",
    maxSizeKB: 20,
  },
  {
    label: "Standard Signature (300×80px)",
    width: 300,
    height: 80,
    unit: "px",
    maxSizeKB: 30,
  },
];

export default function SignatureResizePage({
  onNavigate,
}: SignatureResizePageProps) {
  return (
    <div
      className="min-h-screen py-8 px-4"
      style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)" }}
    >
      <SEO
        title="Signature Resize Online Free | DocMasterTools"
        description="Resize signature images for Aadhaar, PAN, and exam forms online for free."
        canonicalUrl="https://docmastertools.com/image-tools/signature-resize"
      />
      <div className="max-w-4xl mx-auto">
        <BreadcrumbNavigation
          items={[
            {
              label: "Image Tools",
              onClick: () => onNavigate?.("image-tools"),
            },
            { label: "Signature Resize" },
          ]}
          onNavigate={onNavigate}
        />
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Signature Resize
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Resize your signature image to exact specifications for Aadhaar,
            PAN, and exam form submissions.
          </p>
        </div>
        <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-8">
          <PhotoResizeTool
            presets={signaturePresets}
            toolTitle="Signature Resize"
            defaultPresetIndex={0}
          />
        </div>
        <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-8">
          <h2 className="text-lg font-bold text-white mb-3">
            Signature Size Requirements
          </h2>
          <p className="text-slate-300 text-sm mb-3">
            Different government forms and exams require specific signature
            image dimensions.
          </p>
          <ul className="space-y-2 text-slate-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>Aadhaar: 400×100
              pixels, max 30KB
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>PAN: 213×67 pixels,
              max 30KB
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>Exam forms: 140×60
              pixels, max 20KB
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">•</span>Format: JPEG/JPG,
              white background
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
