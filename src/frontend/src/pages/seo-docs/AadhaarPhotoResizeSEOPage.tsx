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

// ─── Aadhaar-specific Presets ─────────────────────────────────────────────────
const aadhaarPresets: PhotoPreset[] = [
  {
    label: "UIDAI Standard (400×400 px) — Recommended",
    width: 400,
    height: 400,
    unit: "px",
    maxSizeKB: 100,
    dpi: 96,
  },
  {
    label: "Aadhaar Enrolment (35×45 mm / 413×531 px)",
    width: 413,
    height: 531,
    unit: "px",
    maxSizeKB: 100,
    dpi: 300,
  },
  {
    label: "myAadhaar Portal Minimum (200×200 px)",
    width: 200,
    height: 200,
    unit: "px",
    maxSizeKB: 100,
    dpi: 96,
  },
  {
    label: "Aadhaar Update / High-Res (600×600 px)",
    width: 600,
    height: 600,
    unit: "px",
    maxSizeKB: 100,
    dpi: 96,
  },
  {
    label: "Aadhaar Enrolment Centre Print (35×45 mm)",
    width: 413,
    height: 531,
    unit: "px",
    maxSizeKB: 50,
    dpi: 300,
  },
  {
    label: "Custom Size",
    width: 400,
    height: 400,
    unit: "px",
  },
];

// ─── FAQ items ────────────────────────────────────────────────────────────────
const faqItems = [
  {
    q: "What is the photo size requirement for Aadhaar card?",
    a: "UIDAI requires a JPEG/JPG photo with dimensions between 200×200 pixels and 1000×1000 pixels, and the file size must not exceed 100 KB. The recommended dimension for most online submissions is 400×400 pixels. The background must be plain white and the face must occupy at least 60–80% of the frame.",
  },
  {
    q: "What is the best pixel size for an Aadhaar photo?",
    a: "400×400 pixels is the most widely recommended size for Aadhaar enrollment and updates via the myAadhaar portal. This falls within the allowed 200–1000 px range, keeps file size manageable, and provides sufficient resolution for the UIDAI biometric database. This tool defaults to the 400×400 px preset.",
  },
  {
    q: "Can I resize an Aadhaar photo on my mobile phone?",
    a: "Yes. This tool is fully mobile-compatible. Open the page on Chrome or Safari on your Android or iOS device, tap Upload Photo, select your image from the gallery, choose the UIDAI Standard preset, and tap Download. The entire process happens in your browser without uploading to any server.",
  },
  {
    q: "What background colour is required for an Aadhaar photo?",
    a: "UIDAI requires a plain white or light-coloured background with no patterns, shadows, or objects. The face must be clearly visible against the background. If your photo has a coloured background, use the Background Remover tool on this site to replace it with white before resizing.",
  },
  {
    q: "Is my Aadhaar photo stored on your server?",
    a: "No. All image processing happens locally in your browser using the Canvas API. Your photo is never uploaded to any server, shared with third parties, or stored anywhere. Your privacy is completely protected.",
  },
  {
    q: "Why is my Aadhaar enrollment photo being rejected?",
    a: "Common rejection reasons include: the file exceeds 100 KB, the dimensions are outside the 200–1000 px range, a non-white background, glasses in the photo, or the face not being clearly visible and centred. Use this tool to fix size and compression issues, and the Background Remover for background issues.",
  },
  {
    q: "Do I need to install software to resize my Aadhaar photo?",
    a: "No. This is a fully browser-based tool. There is nothing to download or install. It works on Windows, Mac, Android, and iOS. Open the page, upload your photo, pick a preset, and download the resized file.",
  },
  {
    q: "How do I update my Aadhaar photo online?",
    a: "Log in to myaadhaar.uidai.gov.in, navigate to Update Aadhaar, select Document Update or Photo Update, and upload your prepared photo. Use this tool first to resize your photo to 400×400 pixels and compress it to under 100 KB to ensure it meets UIDAI specifications before uploading.",
  },
];

// ─── Schemas ──────────────────────────────────────────────────────────────────
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
      name: "Aadhaar Photo Resize",
      item: "https://docmastertools.com/aadhaar-photo-resize",
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

// ─── Styles ───────────────────────────────────────────────────────────────────
const ACCENT = "#10b981";
const ACCENT_LIGHT = "#34d399";

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
    label: "Aadhaar Photo Tool",
    page: "image-aadhaar-photo",
    emoji: "🪪",
    desc: "UIDAI presets + crop",
  },
  {
    label: "Passport Photo Resize",
    page: "passport-photo-resize",
    emoji: "📷",
    desc: "Passport size presets",
  },
  {
    label: "Image Compressor",
    page: "image-compressor",
    emoji: "🗜️",
    desc: "Reduce to under 100 KB",
  },
  {
    label: "Background Remover",
    page: "image-background-remover",
    emoji: "✂️",
    desc: "Remove photo background",
  },
  {
    label: "DPI Changer",
    page: "image-dpi-changer",
    emoji: "📐",
    desc: "Set print resolution",
  },
  {
    label: "All Image Tools",
    page: "image-tools",
    emoji: "🖼️",
    desc: "Browse all tools",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function AadhaarPhotoResizeSEOPage({
  onNavigate,
  onBack,
}: Props) {
  useEffect(() => {
    trackPageView({
      page_title: "Aadhaar Photo Resize — DocMasterTools",
      page_url: "https://docmastertools.com/aadhaar-photo-resize",
      page_category: "image_tools",
    });
    trackFileProcessed({
      toolName: "aadhaar_photo_resize_page_view",
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
        title="Aadhaar Photo Resize Online Free – UIDAI Standard Sizes | DocMasterTools"
        description="Resize your photo to UIDAI-standard Aadhaar card dimensions (400×400 px, max 100 KB) instantly. Free browser-based tool with Aadhaar presets, file size control, and download. No upload, no signup."
        canonicalUrl="https://docmastertools.com/aadhaar-photo-resize"
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
            data-ocid="aadhaarresize.link"
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
            data-ocid="aadhaarresize.link"
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
          <span style={{ color: "#94a3b8" }}>Aadhaar Photo Resize</span>
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
            Aadhaar Photo Resize Online Free
          </h1>
          <p style={{ ...bodyText, fontSize: "1.05rem", maxWidth: "760px" }}>
            Resize any photo to UIDAI-standard Aadhaar card dimensions — 400×400
            pixels, under 100 KB — instantly in your browser. No uploads, no
            software, no signup. Supports all major Aadhaar photo specifications
            for online enrollment, photo update via myAadhaar portal, and
            physical enrollment centre submissions.
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
            boxShadow: "0 4px 30px rgba(16,185,129,0.08)",
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
            <span>🪪</span>
            <span>Aadhaar Photo Resizer Tool</span>
          </h2>
          <PhotoResizeTool
            presets={aadhaarPresets}
            toolTitle="Aadhaar Photo Resize"
            defaultPresetIndex={0}
            onNavigate={onNavigate}
          />
        </div>

        {/* ── UIDAI Standard Sizes Reference Table ─────────────────── */}
        <div style={cardStyle}>
          <h2 style={h2Style}>UIDAI Aadhaar Photo Specifications</h2>
          <p style={{ ...bodyText, marginBottom: "1rem" }}>
            The UIDAI has published specific photo requirements for Aadhaar
            enrollment and updates. Use this reference table to understand the
            permitted dimension range and the recommended sizes for different
            submission methods:
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
                    "Submission Method",
                    "Recommended Size",
                    "Allowed Range",
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
                    "myAadhaar Portal (Online)",
                    "400 × 400 px",
                    "200–1000 px (square)",
                    "100 KB",
                  ],
                  [
                    "Aadhaar Enrolment Centre",
                    "35 × 45 mm / 413 × 531 px",
                    "200–1000 px",
                    "100 KB",
                  ],
                  [
                    "Aadhaar Update Request",
                    "400 × 400 px",
                    "200–1000 px",
                    "100 KB",
                  ],
                  [
                    "Print at Enrolment Centre",
                    "35 × 45 mm @ 300 DPI",
                    "413 × 531 px",
                    "50 KB",
                  ],
                  [
                    "High-Res Submission",
                    "600 × 600 px",
                    "Up to 1000 × 1000 px",
                    "100 KB",
                  ],
                ].map(([method, rec, range, size], i) => (
                  <tr
                    key={method}
                    style={{ background: i % 2 === 0 ? "#111827" : "#0f172a" }}
                  >
                    {[method, rec, range, size].map((cell) => (
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
            * Specifications as per UIDAI's official enrollment and update
            documentation. Requirements may change — always verify with the
            current UIDAI guidelines at uidai.gov.in before submission.
          </p>
        </div>

        {/* ── Step-by-Step Guide ───────────────────────────────────── */}
        <div style={cardStyle}>
          <h2 style={h2Style}>
            How to Resize an Aadhaar Photo — Step-by-Step Guide
          </h2>
          <p style={{ ...bodyText, marginBottom: "1.25rem" }}>
            Follow these five steps to resize your photo to UIDAI-compliant
            Aadhaar card dimensions in under two minutes using this free
            browser-based tool.
          </p>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}
          >
            {[
              {
                step: "Step 1",
                title: "Upload Your Photo",
                body: "Click the Upload Photo button in the tool above or drag and drop your image into the upload area. Supported formats are JPG, PNG, and WEBP. For the best results, start with a photo that is at least 600 × 600 pixels or higher resolution. A higher-resolution source image produces a sharper, cleaner output at any target size.",
              },
              {
                step: "Step 2",
                title: "Select the Aadhaar Preset",
                body: "Use the preset dropdown to choose your submission method. For most online Aadhaar updates via myAadhaar portal, select 'UIDAI Standard (400×400 px)'. For enrollment at a physical Aadhaar centre, select 'Aadhaar Enrolment (35×45 mm / 413×531 px)'. The tool will automatically set the correct pixel dimensions and enable the 100 KB file size limit.",
              },
              {
                step: "Step 3",
                title: "Verify Width and Height",
                body: "After selecting a preset, the width and height fields are automatically filled with the correct pixel dimensions. Confirm the values match the UIDAI specification for your submission type. If a specific portal requires a different size within the 200–1000 px range, you can manually enter the values or use the unit toggle to switch between pixels, millimetres, and centimetres.",
              },
              {
                step: "Step 4",
                title: "Check the File Size Limit",
                body: "UIDAI's maximum file size is 100 KB. The preset automatically enables the target file size control and sets it to 100 KB. If you need a smaller file, reduce the quality slider or lower the target KB value. JPG at 80–85% quality usually produces a photo well under 50 KB while maintaining clear facial detail.",
              },
              {
                step: "Step 5",
                title: "Download and Submit",
                body: "The preview panel shows the resized output in real time. Once you are satisfied with the result, click the Download button. The photo is saved to your device as a JPG file. Verify the file size by checking file properties on your device, then upload it directly to the myAadhaar portal or take it to an enrollment centre.",
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

        {/* ── UIDAI Photo Requirements ─────────────────────────────── */}
        <div style={cardStyle}>
          <h2 style={h2Style}>
            UIDAI Aadhaar Card Photo Requirements — Complete Guide
          </h2>
          <p style={{ ...bodyText, marginBottom: "1rem" }}>
            The UIDAI (Unique Identification Authority of India) has established
            clear specifications for photographs used in Aadhaar enrollment and
            updates. Meeting these requirements on the first submission is
            critical — non-compliant photos are one of the most common causes of
            Aadhaar enrollment delays.
          </p>

          <h3 style={{ ...h3Style, marginTop: "1.25rem" }}>
            Dimension and Format Requirements
          </h3>
          <p style={{ ...bodyText, marginBottom: "1rem" }}>
            UIDAI accepts photos in JPEG/JPG format with pixel dimensions
            between 200×200 and 1000×1000 pixels. The recommended and most
            widely-accepted size is 400×400 pixels. Square dimensions are
            preferred for most portal uploads. The file size must not exceed 100
            KB. The tool's UIDAI Standard preset enforces all three constraints
            — dimensions, square crop, and file size — automatically.
          </p>

          <h3 style={{ ...h3Style, marginTop: "1.25rem" }}>
            Background and Lighting
          </h3>
          <p style={{ ...bodyText, marginBottom: "1rem" }}>
            The background must be plain white or light-coloured with no
            patterns, textures, or shadows. The face must be clearly
            distinguishable from the background. Coloured backgrounds —
            including blue or grey, which are common in studio photos — are not
            acceptable. If your photo has a non-white background, use the
            Background Remover tool on this site to replace it with white before
            resizing. Lighting should be even across the face with no harsh
            shadows under the chin, nose, or around the eyes.
          </p>

          <h3 style={{ ...h3Style, marginTop: "1.25rem" }}>
            Face Position and Expression
          </h3>
          <p style={{ ...bodyText, marginBottom: "1rem" }}>
            The face must be centred in the frame and occupy at least 60–80% of
            the photo area. Both ears should be visible. Eyes must be fully open
            and looking directly at the camera. The expression should be neutral
            with the mouth closed. Tilted, angled, or profile photos are
            rejected. Head coverings other than those worn for religious
            purposes are not permitted.
          </p>

          <h3 style={{ ...h3Style, marginTop: "1.25rem" }}>
            Glasses, Accessories, and Other Restrictions
          </h3>
          <p style={bodyText}>
            Per the latest UIDAI guidelines, spectacles and sunglasses are not
            permitted in Aadhaar enrollment photos. Heavy jewellery that
            obscures the face outline is also not acceptable. The photo must be
            recent — typically taken within the past six months — and must
            accurately represent the applicant's current appearance. Photos
            taken at an angle, with filters, or heavily edited for appearance
            modification are not acceptable.
          </p>
        </div>

        {/* ── Tips Section ─────────────────────────────────────────── */}
        <div style={cardStyle}>
          <h2 style={h2Style}>Tips for a Successful Aadhaar Photo</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "1rem",
            }}
          >
            {[
              {
                icon: "📸",
                title: "Use a High-Resolution Source",
                body: "Start with a photo at least 600 × 600 pixels. Resizing a small, blurry image will not improve its quality. Take a fresh photo near a window in good natural light for the sharpest result.",
              },
              {
                icon: "⬜",
                title: "White Background is Mandatory",
                body: "UIDAI requires a plain white or light background. If your photo was taken in front of a wall, curtain, or outdoors, use the Background Remover tool on this site first, then return here to resize.",
              },
              {
                icon: "📏",
                title: "400×400 px for Online Submissions",
                body: "The UIDAI Standard (400×400 px) preset is the safest choice for myAadhaar portal uploads. Square dimensions fit all UIDAI-compliant portals without cropping errors.",
              },
              {
                icon: "📦",
                title: "Keep File Under 100 KB",
                body: "The portal rejects files larger than 100 KB. JPG at 80–85% quality is typically 30–60 KB at 400×400 px. The preset automatically enforces this limit — no manual compression needed.",
              },
              {
                icon: "👓",
                title: "Remove Glasses Before the Photo",
                body: "UIDAI's latest guidelines do not allow spectacles of any kind — even prescription glasses — in Aadhaar photos. Take a fresh photo without glasses to avoid rejection.",
              },
              {
                icon: "✅",
                title: "Verify Before Uploading",
                body: "After downloading, check the file size by right-clicking and opening Properties (Windows) or Get Info (Mac). Confirm it is under 100 KB and the dimensions are within the 200–1000 px range.",
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
          <h2 style={h2Style}>Why Use This Aadhaar Photo Resize Tool?</h2>
          <p style={{ ...bodyText, marginBottom: "1rem" }}>
            Preparing a photo that meets UIDAI specifications used to require
            photo editing software, manual dimension calculations, and a
            separate compression step. This tool consolidates all three into a
            single, one-step workflow:
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
              — runs entirely in your browser on Windows, Mac, Android, and iOS.
            </li>
            <li>
              <strong style={{ color: "#e2e8f0" }}>Privacy-first</strong> — your
              photo never leaves your device. All processing is done locally
              using the Canvas API.
            </li>
            <li>
              <strong style={{ color: "#e2e8f0" }}>
                UIDAI-specific presets
              </strong>{" "}
              — dedicated presets for myAadhaar portal, enrollment centre
              submission, and photo update workflows.
            </li>
            <li>
              <strong style={{ color: "#e2e8f0" }}>
                Automatic file size enforcement
              </strong>{" "}
              — the 100 KB limit is applied automatically via the preset. No
              manual compression required.
            </li>
            <li>
              <strong style={{ color: "#e2e8f0" }}>Mobile-friendly</strong> —
              fully responsive; resize your Aadhaar photo directly from your
              smartphone camera roll without any app download.
            </li>
          </ul>
        </div>

        {/* ── Common Mistakes Section ──────────────────────────────── */}
        <div style={cardStyle}>
          <h2 style={h2Style}>
            Common Aadhaar Photo Mistakes and How to Avoid Them
          </h2>
          <p style={{ ...bodyText, marginBottom: "1.25rem" }}>
            Understanding the most frequent rejection reasons helps you prepare
            a compliant photo on the first attempt. Here are the issues reported
            most often at UIDAI enrollment centres and on the myAadhaar portal:
          </p>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {[
              {
                title: "File Exceeds 100 KB",
                body: "This is the single most common rejection reason for online submissions. Use the Target File Size control in the tool and set it to 100 KB. The tool will automatically reduce the compression quality until the output fits.",
              },
              {
                title: "Wrong Dimensions",
                body: "Photos outside the 200–1000 pixel range are rejected automatically by the portal. Using this tool's preset guarantees you are always within the allowed range. The 400×400 px UIDAI Standard preset is the safest choice for all portal uploads.",
              },
              {
                title: "Coloured or Patterned Background",
                body: "Photos taken in front of walls, curtains, or outdoors typically have non-white backgrounds. Use the Background Remover tool linked below to replace the background with white, then return here to resize.",
              },
              {
                title: "Glasses in the Photo",
                body: "The latest UIDAI guidelines do not permit any type of spectacles or sunglasses. This requirement has become strictly enforced. Retake the photo without glasses if you encounter this rejection.",
              },
              {
                title: "Photo Not Recent",
                body: "UIDAI enrollment officers are instructed to reject photos that do not closely match the applicant's current appearance. Use a photo taken within the last three to six months.",
              },
            ].map(({ title, body }, i) => (
              <div
                key={title}
                style={{
                  display: "flex",
                  gap: "1rem",
                  borderBottom: i < 4 ? "1px solid #1e293b" : "none",
                  paddingBottom: i < 4 ? "1rem" : 0,
                }}
              >
                <span
                  style={{
                    color: ACCENT,
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    flexShrink: 0,
                    marginTop: "0.1rem",
                  }}
                >
                  ✗
                </span>
                <div>
                  <h3
                    style={{
                      ...h3Style,
                      color: "#f1f5f9",
                      marginBottom: "0.3rem",
                    }}
                  >
                    {title}
                  </h3>
                  <p style={{ ...bodyText, fontSize: "0.9rem" }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
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
                data-ocid="aadhaarresize.link"
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
              data-ocid="aadhaarresize.primary_button"
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
                  "#059669";
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
              data-ocid="aadhaarresize.secondary_button"
              onClick={() => onNavigate("image-aadhaar-photo")}
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
                  "rgba(52,211,153,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "transparent";
              }}
            >
              Aadhaar Photo Tool →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
