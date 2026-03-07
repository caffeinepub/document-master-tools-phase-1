import { useEffect } from "react";
import SEO from "../../components/SEO";
import PhotoResizeTool, {
  type PhotoPreset,
} from "../../components/image-tools/PhotoResizeTool";
import { trackFileProcessed, trackPageView } from "../../utils/analytics";

interface Props {
  onNavigate: (page: string) => void;
  onBack?: () => void;
}

// ─── India Standard Passport Presets ─────────────────────────────────────────
const passportPresets: PhotoPreset[] = [
  {
    label: "India Passport (35×45 mm) — Most Common",
    width: 413,
    height: 531,
    unit: "px",
    maxSizeKB: 100,
    dpi: 300,
  },
  {
    label: "India VISA / OCI (51×51 mm / 2×2 inch)",
    width: 600,
    height: 600,
    unit: "px",
    maxSizeKB: 240,
    dpi: 300,
  },
  {
    label: "India Driving Licence (35×35 mm)",
    width: 413,
    height: 413,
    unit: "px",
    maxSizeKB: 100,
    dpi: 300,
  },
  {
    label: "India UPSC / SSC Exam (4×5 cm)",
    width: 472,
    height: 591,
    unit: "px",
    maxSizeKB: 40,
    dpi: 300,
  },
  {
    label: "India PAN Card (25×35 mm)",
    width: 295,
    height: 413,
    unit: "px",
    maxSizeKB: 50,
    dpi: 300,
  },
  {
    label: "UK / Schengen Passport (35×45 mm)",
    width: 413,
    height: 531,
    unit: "px",
    maxSizeKB: 100,
    dpi: 300,
  },
  {
    label: "US Passport (2×2 inch / 51×51 mm)",
    width: 600,
    height: 600,
    unit: "px",
    maxSizeKB: 240,
    dpi: 300,
  },
  {
    label: "Custom Size",
    width: 400,
    height: 400,
    unit: "px",
  },
];

// ─── Schema: FAQ ──────────────────────────────────────────────────────────────
const faqItems = [
  {
    q: "What is the standard passport photo size in India?",
    a: "The standard Indian passport photo size is 35mm × 45mm (width × height), which is approximately 413 × 531 pixels at 300 DPI. The photo must have a plain white background, and the face should occupy 70–80% of the frame. The file size for online applications is typically 10 KB to 100 KB in JPG format.",
  },
  {
    q: "What background colour is required for Indian passport photos?",
    a: "Indian passport regulations require a plain white or off-white background with no shadows, patterns, or objects. The applicant should face the camera directly with a neutral expression. Glasses and head coverings (except for religious reasons) are not permitted.",
  },
  {
    q: "Can I resize a passport photo on my mobile phone?",
    a: "Yes. This tool is fully mobile-compatible. Open the page on Chrome or Safari on your Android or iOS device, tap 'Upload Photo', select your image from the gallery, choose the India Passport preset, and download the resized file. The entire process is done in your browser without uploading to any server.",
  },
  {
    q: "What is the maximum file size for an Indian passport photo upload?",
    a: "For online passport applications through the Passport Seva portal, the photo file size must be between 10 KB and 100 KB in JPG format. This tool includes a file size controller so you can compress the image to meet the exact size requirement without a separate tool.",
  },
  {
    q: "Do I need to install any software to resize passport photos?",
    a: "No. This is a fully browser-based tool. There is no software to download or install. It works on Windows, Mac, Android, and iOS. Just open the page, upload your photo, pick a preset, and download.",
  },
  {
    q: "Is my passport photo stored on your server?",
    a: "No. All image processing is done locally in your browser using the Canvas API. Your photo is never uploaded to any server, shared with third parties, or stored anywhere. Privacy is completely protected.",
  },
  {
    q: "What photo formats are supported?",
    a: "You can upload JPG, PNG, and WEBP photos. The tool outputs JPG by default, which is the format accepted by all Indian government portals. If you need a PNG output, you can adjust the download settings accordingly.",
  },
  {
    q: "How do I resize a passport photo to exactly 35×45mm at 300 DPI?",
    a: "Select the 'India Passport (35×45 mm)' preset from the dropdown. This automatically sets the pixel dimensions to 413×531 pixels at 300 DPI. Upload your photo, adjust the crop if needed, set the quality and target file size, then click Download.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://docmastertools.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Image Tools",
      item: "https://docmastertools.com/image-tools",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Passport Photo Resize",
      item: "https://docmastertools.com/passport-photo-resize",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

// ─── Styles ────────────────────────────────────────────────────────────────────
const ACCENT = "#3b82f6";
const ACCENT_LIGHT = "#60a5fa";

const cardStyle: React.CSSProperties = {
  background: "#111827",
  borderRadius: "1rem",
  padding: "1.75rem",
  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
  marginBottom: "1.5rem",
  border: "1px solid #1e293b",
};

const h2Style: React.CSSProperties = {
  color: "#ffffff",
  fontSize: "1.4rem",
  fontWeight: 700,
  marginBottom: "1rem",
  marginTop: 0,
};

const h3Style: React.CSSProperties = {
  color: "#e2e8f0",
  fontSize: "1.05rem",
  fontWeight: 600,
  marginBottom: "0.4rem",
  marginTop: 0,
};

const bodyText: React.CSSProperties = {
  color: "#94a3b8",
  fontSize: "0.95rem",
  lineHeight: 1.75,
  margin: 0,
};

const relatedTools = [
  {
    label: "Passport Photo Maker",
    page: "image-passport-photo",
    emoji: "🪪",
    desc: "Official presets + crop",
  },
  {
    label: "Image Compressor",
    page: "image-compressor",
    emoji: "🗜️",
    desc: "Reduce file size",
  },
  {
    label: "DPI Changer",
    page: "image-dpi-changer",
    emoji: "📐",
    desc: "Set 300 DPI for print",
  },
  {
    label: "Custom Resize",
    page: "image-custom-resize",
    emoji: "📏",
    desc: "Any custom dimension",
  },
  {
    label: "Background Remover",
    page: "image-background-remover",
    emoji: "✂️",
    desc: "Remove photo background",
  },
  {
    label: "All Image Tools",
    page: "image-tools",
    emoji: "🖼️",
    desc: "Browse all tools",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function PassportPhotoResizeSEOPage({
  onNavigate,
  onBack,
}: Props) {
  useEffect(() => {
    trackPageView({
      page_title: "Passport Photo Resize — DocMasterTools",
      page_url: "https://docmastertools.com/passport-photo-resize",
      page_category: "image_tools",
    });
    trackFileProcessed({
      toolName: "passport_photo_resize_page_view",
      toolCategory: "image_tools",
    });
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        padding: "2rem 1rem",
      }}
    >
      <SEO
        title="Passport Photo Resize Online Free – India Standard Sizes | DocMasterTools"
        description="Resize passport photos to India standard sizes (35×45mm) instantly. Free browser-based tool with presets for Indian passport, VISA, PAN card, driving licence, and more. No upload, no signup."
        canonicalUrl="https://docmastertools.com/passport-photo-resize"
      />

      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        {/* Breadcrumb nav */}
        <nav
          aria-label="Breadcrumb"
          style={{
            marginBottom: "1.5rem",
            fontSize: "0.875rem",
            color: "#64748b",
          }}
        >
          <button
            type="button"
            data-ocid="passportresize.link"
            onClick={() => (onBack ? onBack() : onNavigate("home"))}
            style={{
              background: "none",
              border: "none",
              color: "#64748b",
              cursor: "pointer",
              padding: 0,
            }}
          >
            Home
          </button>
          {" › "}
          <button
            type="button"
            data-ocid="passportresize.link"
            onClick={() => onNavigate("image-tools")}
            style={{
              background: "none",
              border: "none",
              color: "#64748b",
              cursor: "pointer",
              padding: 0,
            }}
          >
            Image Tools
          </button>
          {" › "}
          <span style={{ color: "#94a3b8" }}>Passport Photo Resize</span>
        </nav>

        {/* ── H1 + Intro ───────────────────────────────────────────── */}
        <div style={{ marginBottom: "2rem" }}>
          <h1
            style={{
              color: "#ffffff",
              fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
              fontWeight: 800,
              marginBottom: "0.75rem",
              lineHeight: 1.25,
            }}
          >
            Passport Photo Resize Online Free
          </h1>
          <p style={{ ...bodyText, fontSize: "1.05rem", maxWidth: "760px" }}>
            Resize any photo to India standard passport size — 35×45 mm —
            instantly in your browser. No uploads, no software, no signup.
            Supports all major Indian document photo sizes including VISA, PAN
            card, driving licence, and government exam requirements.
          </p>
        </div>

        {/* ── TOOL ─────────────────────────────────────────────────── */}
        <div
          style={{
            background: "#111827",
            borderRadius: "1rem",
            padding: "1.5rem",
            border: `1px solid ${ACCENT}33`,
            marginBottom: "2rem",
            boxShadow: "0 4px 30px rgba(59,130,246,0.08)",
          }}
        >
          <h2
            style={{
              ...h2Style,
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "1.15rem",
              marginBottom: "1.25rem",
            }}
          >
            <span>📸</span>
            <span>Passport Photo Resizer Tool</span>
          </h2>
          <PhotoResizeTool
            presets={passportPresets}
            toolTitle="Passport Photo Resize"
            defaultPresetIndex={0}
            onNavigate={onNavigate}
          />
        </div>

        {/* ── India Standard Sizes Reference ───────────────────────── */}
        <div style={cardStyle}>
          <h2 style={h2Style}>India Standard Passport Photo Sizes</h2>
          <p style={{ ...bodyText, marginBottom: "1rem" }}>
            Indian government portals and document applications each specify
            different photo dimensions. Here is a quick reference for the most
            common requirements:
          </p>
          <div
            style={{
              overflowX: "auto",
              borderRadius: "0.5rem",
              border: "1px solid #1e293b",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "0.875rem",
                minWidth: "540px",
              }}
            >
              <thead>
                <tr style={{ background: "#0f172a" }}>
                  {[
                    "Document / Portal",
                    "Size (mm)",
                    "Pixels @ 300 DPI",
                    "Max File Size",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "0.625rem 0.875rem",
                        textAlign: "left",
                        color: "#94a3b8",
                        fontWeight: 600,
                        borderBottom: "1px solid #1e293b",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "Indian Passport (Passport Seva)",
                    "35 × 45 mm",
                    "413 × 531 px",
                    "100 KB",
                  ],
                  [
                    "Indian VISA / OCI Card",
                    "51 × 51 mm (2×2 in)",
                    "600 × 600 px",
                    "240 KB",
                  ],
                  ["PAN Card", "25 × 35 mm", "295 × 413 px", "50 KB"],
                  [
                    "Driving Licence (DigiLocker)",
                    "35 × 35 mm",
                    "413 × 413 px",
                    "100 KB",
                  ],
                  [
                    "UPSC / SSC Exam Photo",
                    "40 × 50 mm (4×5 cm)",
                    "472 × 591 px",
                    "40 KB",
                  ],
                  ["Aadhaar Enrolment", "35 × 45 mm", "413 × 531 px", "100 KB"],
                  ["Voter ID (NVSP)", "35 × 45 mm", "413 × 531 px", "100 KB"],
                ].map(([doc, mm, px, size], i) => (
                  <tr
                    key={doc}
                    style={{ background: i % 2 === 0 ? "#111827" : "#0f172a" }}
                  >
                    {[doc, mm, px, size].map((cell) => (
                      <td
                        key={cell}
                        style={{
                          padding: "0.625rem 0.875rem",
                          color: "#cbd5e1",
                          borderBottom: "1px solid #1e293b",
                        }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p
            style={{
              ...bodyText,
              marginTop: "0.875rem",
              fontSize: "0.825rem",
              color: "#64748b",
            }}
          >
            * Pixel dimensions calculated at 300 DPI (dots per inch), the
            standard for print-quality photos. For online-only submissions that
            specify a pixel count rather than DPI, adjust dimensions
            accordingly.
          </p>
        </div>

        {/* ── Step-by-Step Guide ───────────────────────────────────── */}
        <div style={cardStyle}>
          <h2 style={h2Style}>
            How to Resize a Passport Photo — Step-by-Step Guide
          </h2>
          <p style={{ ...bodyText, marginBottom: "1.25rem" }}>
            Follow these steps to resize your passport photo to the exact
            dimensions required by Indian government portals in under two
            minutes.
          </p>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}
          >
            {[
              {
                step: "Step 1",
                title: "Upload Your Photo",
                body: "Click the 'Upload Photo' button in the tool above or drag and drop your image file into the upload area. Supported formats are JPG, PNG, and WEBP. For the best results, start with a photo that is at least 600 × 800 pixels. A higher-resolution source image always produces a sharper output.",
              },
              {
                step: "Step 2",
                title: "Select the Correct Preset",
                body: "Use the preset dropdown to choose your document type. For most Indian passport applications, select 'India Passport (35×45 mm)'. For a VISA or OCI application, select 'India VISA / OCI (51×51 mm)'. For PAN card, driving licence, or exam photos, the relevant presets are also listed.",
              },
              {
                step: "Step 3",
                title: "Adjust Width, Height, and DPI",
                body: "After selecting a preset, the width and height fields are automatically populated with the correct pixel dimensions at 300 DPI. If your application portal specifies a different pixel count, you can manually enter the values. You can also switch the unit between pixels, millimetres, centimetres, and inches using the unit toggle.",
              },
              {
                step: "Step 4",
                title: "Set the Target File Size",
                body: "Indian passport portals typically require the photo file to be between 10 KB and 100 KB. Use the quality slider or the max size (KB) field to control the output file size. The tool will compress the image to stay within the limit while maintaining the best possible visual quality.",
              },
              {
                step: "Step 5",
                title: "Preview and Download",
                body: "The preview panel updates in real time as you adjust the settings. Once you are satisfied with the dimensions and file size, click the 'Download' button. The resized photo will be saved to your device as a JPG file, ready for direct upload to the Passport Seva portal or for printing.",
              },
            ].map(({ step, title, body }, i) => (
              <div
                key={step}
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    minWidth: "2.2rem",
                    height: "2.2rem",
                    borderRadius: "50%",
                    background: ACCENT,
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </div>
                <div>
                  <h3 style={h3Style}>{title}</h3>
                  <p style={bodyText}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── About Passport Photo Requirements ───────────────────── */}
        <div style={cardStyle}>
          <h2 style={h2Style}>
            Understanding Indian Passport Photo Requirements
          </h2>
          <p style={{ ...bodyText, marginBottom: "1rem" }}>
            The Ministry of External Affairs and the Passport Seva Programme
            specify strict requirements for passport photos. Understanding these
            requirements before resizing your photo helps ensure your
            application is accepted on the first attempt.
          </p>

          <h3 style={{ ...h3Style, marginTop: "1.25rem" }}>
            Photo Dimensions and Background
          </h3>
          <p style={{ ...bodyText, marginBottom: "1rem" }}>
            The required size is 35mm wide by 45mm tall. This is the
            international standard shared by the UK, Schengen, and many other
            countries. The background must be plain white or off-white — no
            patterns, shadows, or gradient. If your original photo has a
            coloured or patterned background, use the Background Remover tool to
            replace it with white before resizing.
          </p>

          <h3 style={{ ...h3Style, marginTop: "1.25rem" }}>
            Face Framing and Expression
          </h3>
          <p style={{ ...bodyText, marginBottom: "1rem" }}>
            The face must be centred and should occupy 70–80% of the photo area.
            Eyes must be fully open, looking directly at the camera. The
            expression should be neutral with the mouth closed. Sunglasses,
            heavy jewellery, and head coverings (unless worn for religious
            reasons with a signed declaration) are not permitted.
          </p>

          <h3 style={{ ...h3Style, marginTop: "1.25rem" }}>
            Lighting and Photo Quality
          </h3>
          <p style={{ ...bodyText, marginBottom: "1rem" }}>
            Avoid harsh shadows on the face or behind the head. The photo should
            be well-lit with even lighting across the face. Blurry, pixelated,
            or scanned copies of photos are rejected. Start with the
            highest-resolution photo available — the resizer will produce the
            best output from a high-quality source.
          </p>

          <h3 style={{ ...h3Style, marginTop: "1.25rem" }}>
            Digital File Requirements
          </h3>
          <p style={bodyText}>
            For the Passport Seva portal (passportindia.gov.in), the digital
            photo must be between 10 KB and 100 KB in JPG or JPEG format. The
            pixel dimensions should correspond to 35×45mm at the resolution your
            scanner or camera uses — at 300 DPI this is 413×531 pixels. This
            tool enforces these constraints via the preset system and file size
            controller.
          </p>
        </div>

        {/* ── Tips Section ─────────────────────────────────────────── */}
        <div style={cardStyle}>
          <h2 style={h2Style}>Tips for a Perfect Passport Photo</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "1rem",
            }}
          >
            {[
              {
                icon: "💡",
                title: "Use a High-Resolution Source",
                body: "Start with a photo that is at least 1000 × 1300 pixels. Resizing a small, low-quality image will produce a blurry output. Take a fresh selfie against a white wall in good daylight.",
              },
              {
                icon: "🎨",
                title: "White Background Required",
                body: "Indian passport regulations mandate a plain white background. Use the Background Remover on this site if your photo has a coloured or cluttered background.",
              },
              {
                icon: "📏",
                title: "Use the Correct Preset",
                body: "Always select the preset matching your document type. The 35×45mm preset is for Indian passports. For US passports or OCI cards, the 51×51mm preset is required.",
              },
              {
                icon: "📦",
                title: "Keep File Size Under 100 KB",
                body: "The Passport Seva portal rejects files larger than 100 KB. Use the quality slider in the tool to compress the output. JPG at 80–90% quality usually produces a sharp photo under 60 KB.",
              },
              {
                icon: "🖨️",
                title: "300 DPI for Print Copies",
                body: "If you need a printed passport photo (for physical applications or visa envelopes), download at 300 DPI. This ensures the print is sharp at the small 35×45mm size.",
              },
              {
                icon: "✅",
                title: "Verify Before Submitting",
                body: "After downloading, right-click the file, open Properties (Windows) or Get Info (Mac), and confirm the pixel dimensions. 413×531 px for Indian passport, 600×600 px for VISA.",
              },
            ].map(({ icon, title, body }) => (
              <div
                key={title}
                style={{
                  background: "#0f172a",
                  borderRadius: "0.75rem",
                  padding: "1rem 1.125rem",
                  border: "1px solid #1e293b",
                }}
              >
                <div style={{ fontSize: "1.4rem", marginBottom: "0.375rem" }}>
                  {icon}
                </div>
                <h3 style={{ ...h3Style, fontSize: "0.9rem" }}>{title}</h3>
                <p style={{ ...bodyText, fontSize: "0.875rem" }}>{body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Why Use This Tool ────────────────────────────────────── */}
        <div style={cardStyle}>
          <h2 style={h2Style}>Why Use This Passport Photo Resize Tool?</h2>
          <p style={{ ...bodyText, marginBottom: "1rem" }}>
            Most photo editing software requires installation, a subscription,
            or technical knowledge to set exact millimetre dimensions and 300
            DPI output. This tool removes all that friction:
          </p>
          <ul
            style={{
              ...bodyText,
              paddingLeft: "1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <li>
              <strong style={{ color: "#e2e8f0" }}>Completely free</strong> — no
              subscription, no credits, no hidden charges.
            </li>
            <li>
              <strong style={{ color: "#e2e8f0" }}>
                No software installation
              </strong>{" "}
              — runs entirely in your browser on any device.
            </li>
            <li>
              <strong style={{ color: "#e2e8f0" }}>Privacy-first</strong> — your
              photo never leaves your device. All processing is done locally
              using the Canvas API.
            </li>
            <li>
              <strong style={{ color: "#e2e8f0" }}>
                India-specific presets
              </strong>{" "}
              — dedicated presets for Passport Seva, PAN card, driving licence,
              Aadhaar, SSC/UPSC exams, and VISA applications.
            </li>
            <li>
              <strong style={{ color: "#e2e8f0" }}>File size control</strong> —
              set a maximum KB target so the output is always within portal
              limits.
            </li>
            <li>
              <strong style={{ color: "#e2e8f0" }}>Mobile-friendly</strong> —
              fully responsive; works on Android and iOS without any app
              download.
            </li>
          </ul>
        </div>

        {/* ── FAQ ─────────────────────────────────────────────────── */}
        <div style={cardStyle}>
          <h2 style={h2Style}>Frequently Asked Questions</h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {faqItems.map((item, i) => (
              <div
                key={item.q}
                style={{
                  borderBottom:
                    i < faqItems.length - 1 ? "1px solid #1e293b" : "none",
                  paddingBottom: i < faqItems.length - 1 ? "1rem" : 0,
                }}
              >
                <h3
                  style={{
                    ...h3Style,
                    color: ACCENT_LIGHT,
                    fontSize: "0.975rem",
                    marginBottom: "0.375rem",
                  }}
                >
                  {item.q}
                </h3>
                <p style={{ ...bodyText, fontSize: "0.9rem" }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Related Tools ────────────────────────────────────────── */}
        <div style={cardStyle}>
          <h2 style={h2Style}>Related Image Tools</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
              gap: "0.875rem",
              marginBottom: "1.5rem",
            }}
          >
            {relatedTools.map((tool) => (
              <button
                key={tool.page}
                type="button"
                data-ocid="passportresize.link"
                onClick={() => onNavigate(tool.page)}
                style={{
                  background: "#0f172a",
                  border: "1px solid #1e293b",
                  borderRadius: "0.75rem",
                  padding: "1rem",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    ACCENT;
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "#1e293b";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    "#1e293b";
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "#0f172a";
                }}
              >
                <div style={{ fontSize: "1.5rem", marginBottom: "0.375rem" }}>
                  {tool.emoji}
                </div>
                <div
                  style={{
                    color: "#ffffff",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                  }}
                >
                  {tool.label}
                </div>
                <div
                  style={{
                    color: "#64748b",
                    fontSize: "0.75rem",
                    marginTop: "0.25rem",
                  }}
                >
                  {tool.desc}
                </div>
              </button>
            ))}
          </div>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button
              type="button"
              data-ocid="passportresize.primary_button"
              onClick={() => onNavigate("image-tools")}
              style={{
                background: ACCENT,
                color: "#ffffff",
                border: "none",
                borderRadius: "0.625rem",
                padding: "0.875rem 1.75rem",
                fontSize: "1rem",
                fontWeight: 700,
                cursor: "pointer",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "#2563eb";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  ACCENT;
              }}
            >
              Browse All Image Tools →
            </button>
            <button
              type="button"
              data-ocid="passportresize.secondary_button"
              onClick={() => onNavigate("image-passport-photo")}
              style={{
                background: "transparent",
                color: ACCENT_LIGHT,
                border: `1px solid ${ACCENT_LIGHT}`,
                borderRadius: "0.625rem",
                padding: "0.875rem 1.75rem",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(96,165,250,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "transparent";
              }}
            >
              Passport Photo Maker →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
