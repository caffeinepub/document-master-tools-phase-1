import { r as reactExports, q as trackPageView, s as trackFileProcessed, j as jsxRuntimeExports } from "./index-YN_OslaE.js";
import { S as SEO } from "./SEO-DRKgHPjT.js";
import { P as PhotoResizeTool } from "./PhotoResizeTool-WgWeo9ik.js";
import "./input-BldACiYg.js";
import "./utils-Bmita3Ip.js";
import "./select-Bm5_92VY.js";
import "./index-IXOTxK3N.js";
import "./index-B7n2t64q.js";
import "./index-DyakJ80C.js";
import "./slider-DkvtRS-k.js";
import "./AdvancedToolShell-DnnYRrLm.js";
import "./upload-DORtw0Gt.js";
import "./circle-check-big-D5mWTfL5.js";
import "./circle-alert-D_hdXq39.js";
import "./eye--NTW7qb9.js";
import "./download-CGoTQdDD.js";
import "./zap-BXuwvbGj.js";
import "./arrow-up-BvhRKI9_.js";
const panPresets = [
  {
    label: "NSDL Standard (3.5×2.5 cm / 413×295 px) — Recommended",
    width: 413,
    height: 295,
    unit: "px",
    maxSizeKB: 50,
    dpi: 300
  },
  {
    label: "UTIITSL Portal (200×200 px square)",
    width: 200,
    height: 200,
    unit: "px",
    maxSizeKB: 50,
    dpi: 96
  },
  {
    label: "Form 49A Print (3.5×2.5 cm @ 300 DPI)",
    width: 413,
    height: 295,
    unit: "px",
    maxSizeKB: 50,
    dpi: 300
  },
  {
    label: "Correction Application (3.5×2.5 cm)",
    width: 413,
    height: 295,
    unit: "px",
    maxSizeKB: 50,
    dpi: 300
  },
  {
    label: "Minors / Child PAN (3.5×2.5 cm)",
    width: 413,
    height: 295,
    unit: "px",
    maxSizeKB: 50,
    dpi: 300
  },
  {
    label: "Custom Size",
    width: 413,
    height: 295,
    unit: "px"
  }
];
const faqItems = [
  {
    q: "What is the photo size for PAN card application?",
    a: "NSDL requires a 3.5×2.5 cm JPEG under 50 KB. At 300 DPI this equals 413×295 pixels. At screen resolution (96 DPI) the equivalent is approximately 132×94 pixels. Use the NSDL Standard preset in the tool above to get the correct dimensions automatically."
  },
  {
    q: "Can I use a selfie for my PAN card photo?",
    a: "Yes, if it meets all requirements: plain white background, clear front-facing view, no glasses, face occupying at least 70% of the frame, and the file is under 50 KB. Resize and compress using this tool before uploading to the NSDL or UTIITSL portal."
  },
  {
    q: "Is the PAN card photo resize tool free?",
    a: "Yes. This tool is completely free on DocMasterTools. There is no subscription, no sign-up, and no per-download charge. You can process unlimited photos at no cost."
  },
  {
    q: "What happens if my PAN photo is rejected by NSDL?",
    a: "The portal shows an error specifying the reason — typically file too large, wrong format, or wrong dimensions. Fix the issue using this tool: select the NSDL Standard preset, enable the 50 KB target file size, and re-download. Then re-upload to the portal."
  },
  {
    q: "Do I need to resize both photo and signature for PAN application?",
    a: "Yes. PAN applications require both a photograph (3.5×2.5 cm, under 50 KB) and a signature image (2×4.5 cm, under 30 KB). Use this tool for the photo and the Signature Resize tool (linked below) for the signature."
  },
  {
    q: "What is the background colour requirement for PAN card photo?",
    a: "The background must be plain white. A coloured, patterned, or outdoor background will cause rejection during the application officer's review. Use the Background Remover tool on this site to replace non-white backgrounds before resizing."
  },
  {
    q: "Can I resize a PAN card photo on my phone?",
    a: "Yes. The tool is fully mobile-compatible. Open the page in Chrome or Safari on Android or iOS, tap Upload, select your photo from the gallery, choose the NSDL Standard preset, and tap Download. No app installation required."
  },
  {
    q: "How do I apply for PAN card correction with a new photo?",
    a: "Log in to the NSDL or UTIITSL portal, select PAN Correction / Reprint, and upload a new photo. Use this tool to resize the photo to 413×295 pixels (NSDL Standard preset) and compress to under 50 KB before uploading to the correction form."
  }
];
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://docmastertools.com/"
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Image Tools",
      item: "https://docmastertools.com/image-tools"
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "PAN Card Photo Resize",
      item: "https://docmastertools.com/pan-card-photo-resize"
    }
  ]
};
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a }
  }))
};
const ACCENT = "#f97316";
const ACCENT_LIGHT = "#fb923c";
const cardStyle = {
  background: "#111827",
  borderRadius: "1rem",
  padding: "1.75rem",
  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
  marginBottom: "1.5rem",
  border: "1px solid #1e293b"
};
const h2Style = {
  color: "#ffffff",
  fontSize: "1.4rem",
  fontWeight: 700,
  marginBottom: "1rem",
  marginTop: 0
};
const h3Style = {
  color: "#e2e8f0",
  fontSize: "1.05rem",
  fontWeight: 600,
  marginBottom: "0.4rem",
  marginTop: 0
};
const bodyText = {
  color: "#94a3b8",
  fontSize: "0.95rem",
  lineHeight: 1.75,
  margin: 0
};
const relatedTools = [
  {
    label: "PAN Photo Tool",
    page: "image-pan-photo",
    emoji: "🪪",
    desc: "NSDL/UTI presets"
  },
  {
    label: "Signature Resize",
    page: "image-signature-resize",
    emoji: "✍️",
    desc: "Resize signature under 30KB"
  },
  {
    label: "Image Compressor",
    page: "image-compressor",
    emoji: "🗜️",
    desc: "Compress under 50KB"
  },
  {
    label: "Background Remover",
    page: "image-background-remover",
    emoji: "✂️",
    desc: "Add white background"
  },
  {
    label: "Aadhaar Photo Resize",
    page: "aadhaar-photo-resize",
    emoji: "📋",
    desc: "UIDAI compliant photo"
  },
  {
    label: "Passport Photo Resize",
    page: "passport-photo-resize",
    emoji: "📷",
    desc: "Passport size presets"
  }
];
function PANCardPhotoResizePage({ onNavigate, onBack }) {
  reactExports.useEffect(() => {
    trackPageView({
      page_title: "PAN Card Photo Resize — DocMasterTools",
      page_url: "https://docmastertools.com/pan-card-photo-resize",
      page_category: "image_tools"
    });
    trackFileProcessed({
      toolName: "pan_card_photo_resize_page_view",
      toolCategory: "image_tools"
    });
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        padding: "2rem 1rem"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SEO,
          {
            title: "PAN Card Photo Resize Online Free – NSDL/UTI Ready | DocMasterTools",
            description: "Resize your photo for PAN card application to exact NSDL and UTIITSL specifications — 3.5×2.5cm, under 50KB, JPEG format. Free browser tool, no signup.",
            canonicalUrl: "https://docmastertools.com/pan-card-photo-resize"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "script",
          {
            type: "application/ld+json",
            dangerouslySetInnerHTML: { __html: JSON.stringify(faqSchema) }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "script",
          {
            type: "application/ld+json",
            dangerouslySetInnerHTML: { __html: JSON.stringify(breadcrumbSchema) }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { maxWidth: "960px", margin: "0 auto" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "nav",
            {
              "aria-label": "Breadcrumb",
              style: {
                marginBottom: "1.5rem",
                fontSize: "0.875rem",
                color: "#64748b"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "panresize.link",
                    onClick: () => onBack ? onBack() : onNavigate("home"),
                    style: {
                      background: "none",
                      border: "none",
                      color: "#64748b",
                      cursor: "pointer",
                      padding: 0
                    },
                    children: "Home"
                  }
                ),
                " › ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "panresize.link",
                    onClick: () => onNavigate("image-tools"),
                    style: {
                      background: "none",
                      border: "none",
                      color: "#64748b",
                      cursor: "pointer",
                      padding: 0
                    },
                    children: "Image Tools"
                  }
                ),
                " › ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#94a3b8" }, children: "PAN Card Photo Resize" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "2rem" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h1",
              {
                style: {
                  color: "#ffffff",
                  fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
                  fontWeight: 800,
                  marginBottom: "0.75rem",
                  lineHeight: 1.25
                },
                children: "PAN Card Photo Resize Online Free"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { ...bodyText, fontSize: "1.05rem", maxWidth: "760px" }, children: "Resize any photo to the exact NSDL and UTIITSL PAN card application specifications — 3.5×2.5 cm (413×295 pixels at 300 DPI), under 50 KB, JPEG format — instantly in your browser. No uploads to any server, no software to install, no account required. Whether you are applying for a new PAN card on the NSDL portal, using UTIITSL's online facility, submitting a physical Form 49A, or filing a PAN correction request, this tool provides the correct preset for every submission type." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                background: "#111827",
                borderRadius: "1rem",
                padding: "1.5rem",
                border: `1px solid ${ACCENT}33`,
                marginBottom: "2rem",
                boxShadow: "0 4px 30px rgba(249,115,22,0.08)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "h2",
                  {
                    style: {
                      ...h2Style,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontSize: "1.15rem",
                      marginBottom: "1.25rem"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🪪" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "PAN Card Photo Resizer Tool" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  PhotoResizeTool,
                  {
                    presets: panPresets,
                    toolTitle: "PAN Card Photo Resize",
                    defaultPresetIndex: 0,
                    onNavigate
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: h2Style, children: "PAN Card Photo Specifications — Official Reference" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { ...bodyText, marginBottom: "1rem" }, children: "The Income Tax Department and its authorised service providers — NSDL e-Governance Infrastructure Limited and UTIITSL — have published strict photo specifications for PAN card applications. Use this table as a quick reference before uploading your photo to any PAN portal:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  overflowX: "auto",
                  borderRadius: "0.5rem",
                  border: "1px solid #1e293b"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "table",
                  {
                    style: {
                      width: "100%",
                      borderCollapse: "collapse",
                      fontSize: "0.875rem",
                      minWidth: "540px"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { style: { background: "#0f172a" }, children: [
                        "Submission Type",
                        "Dimensions",
                        "Resolution",
                        "Max File Size"
                      ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "th",
                        {
                          style: {
                            padding: "0.625rem 0.875rem",
                            textAlign: "left",
                            color: "#94a3b8",
                            fontWeight: 600,
                            borderBottom: "1px solid #1e293b"
                          },
                          children: h
                        },
                        h
                      )) }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: [
                        [
                          "NSDL Portal (Online)",
                          "3.5×2.5 cm / 413×295 px",
                          "300 DPI",
                          "50 KB"
                        ],
                        ["UTIITSL Portal", "200×200 px (square)", "96 DPI", "50 KB"],
                        [
                          "Form 49A (Physical)",
                          "3.5×2.5 cm print",
                          "300 DPI",
                          "50 KB"
                        ],
                        ["Correction Application", "3.5×2.5 cm", "300 DPI", "50 KB"],
                        ["Digital Submission", "3.5×2.5 cm JPEG", "300 DPI", "50 KB"]
                      ].map(([type, dims, res, size], i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "tr",
                        {
                          style: { background: i % 2 === 0 ? "#111827" : "#0f172a" },
                          children: [type, dims, res, size].map((cell) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "td",
                            {
                              style: {
                                padding: "0.625rem 0.875rem",
                                color: "#cbd5e1",
                                borderBottom: "1px solid #1e293b"
                              },
                              children: cell
                            },
                            cell
                          ))
                        },
                        type
                      )) })
                    ]
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                style: {
                  ...bodyText,
                  marginTop: "0.875rem",
                  fontSize: "0.825rem",
                  color: "#64748b"
                },
                children: "* Specifications are based on official NSDL and UTIITSL portal documentation. Requirements may be updated — always verify with the current portal guidelines at onlineservices.nsdl.com or www.utiitsl.com before submission."
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: h2Style, children: "How to Resize a PAN Card Photo — Step-by-Step Guide" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { ...bodyText, marginBottom: "1.25rem" }, children: "Follow these five steps to resize your photo to NSDL-compliant PAN card dimensions in under two minutes using this free browser-based tool. No installation, no account, and your photo never leaves your device." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: { display: "flex", flexDirection: "column", gap: "1.1rem" },
                children: [
                  {
                    step: "Step 1",
                    title: "Upload Your Photo",
                    body: "Click the Upload Photo button in the tool above or drag and drop your image into the upload area. Supported formats are JPG, PNG, and WEBP. For the best results, start with a photo that is at least 600 pixels wide or higher resolution. A higher-resolution source image produces a sharper, more detailed output at any target size."
                  },
                  {
                    step: "Step 2",
                    title: "Select the PAN Card Preset",
                    body: "Use the preset dropdown to choose your submission method. For most online applications on the NSDL portal, select 'NSDL Standard (3.5×2.5 cm / 413×295 px)'. For UTIITSL's online portal, select 'UTIITSL Portal (200×200 px square)'. For physical Form 49A, choose 'Form 49A Print (3.5×2.5 cm @ 300 DPI)'. The tool will automatically set the correct pixel dimensions and enable the 50 KB file size limit."
                  },
                  {
                    step: "Step 3",
                    title: "Verify Width and Height",
                    body: "After selecting a preset, the width and height fields are automatically filled with the correct pixel dimensions. Confirm the values match the specification for your submission type. For custom requirements, you can manually adjust the width and height fields or toggle between pixels, millimetres, and centimetres using the unit selector."
                  },
                  {
                    step: "Step 4",
                    title: "Check the File Size Limit",
                    body: "NSDL and UTIITSL both require a maximum file size of 50 KB. The preset automatically enables the target file size control and sets it to 50 KB. The tool will reduce the JPEG compression quality until the output file meets the size requirement. If the result looks too compressed, try starting with a higher-resolution source image."
                  },
                  {
                    step: "Step 5",
                    title: "Download and Upload to Portal",
                    body: "The preview panel shows the resized output in real time. Once you are satisfied with the result, click the Download button. The photo is saved to your device as a JPEG file. Verify the file size by checking the file properties on your device, then upload it to the NSDL or UTIITSL portal's photo upload field."
                  }
                ].map(({ step, title, body }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      gap: "1rem",
                      alignItems: "flex-start"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
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
                            flexShrink: 0
                          },
                          children: i + 1
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: h3Style, children: title }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: bodyText, children: body })
                      ] })
                    ]
                  },
                  step
                ))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: h2Style, children: "PAN Card Photo Requirements — Complete Guide" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { ...bodyText, marginBottom: "1rem" }, children: "The Income Tax Department and its authorised registrars enforce strict photo standards for PAN card applications. A non-compliant photo is one of the most common reasons for application rejection or processing delays at the NSDL and UTIITSL portals. Understanding these requirements before you upload saves time and avoids having to restart the application process." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { ...h3Style, marginTop: "1.25rem" }, children: "Dimension and Format Requirements" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { ...bodyText, marginBottom: "1rem" }, children: "Both NSDL and UTIITSL require the photo to be in JPEG/JPG format. The NSDL portal's standard is 3.5×2.5 cm — at 300 DPI this equals 413×295 pixels. UTIITSL uses a square format of 200×200 pixels for its online portal. For physical Form 49A, the photo must be 3.5×2.5 cm at a print resolution of 300 DPI. The maximum file size across all submission types is 50 KB. This tool's presets automatically enforce all dimension and file size constraints for each submission method." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { ...h3Style, marginTop: "1.25rem" }, children: "Background and Lighting" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { ...bodyText, marginBottom: "1rem" }, children: "The background must be plain white with no patterns, shadows, gradients, or objects. Indoor photos against a painted white wall work well. Outdoor backgrounds, studio blue or grey backgrounds, and any textured surfaces are not acceptable and will result in rejection during the application officer's quality review. If your photo has a non-white background, use the Background Remover tool linked at the bottom of this page to replace it with a white background before resizing. Lighting should be even and shadow-free — avoid direct flash close to the face, which creates harsh shadows around the nose and cheeks." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { ...h3Style, marginTop: "1.25rem" }, children: "Face Position and Expression" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { ...bodyText, marginBottom: "1rem" }, children: "The applicant's face must occupy the majority of the photo frame — typically at least 70% of the total image area. The face must be centred, looking directly at the camera with a neutral expression and the mouth closed. Both ears should ideally be visible, and the head should not be tilted, turned, or angled. Profile photos and photos with the face cut off at the edges are automatically rejected. The photo must accurately represent the applicant's current appearance and should have been taken within the last six months." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { ...h3Style, marginTop: "1.25rem" }, children: "Prohibited Items — Glasses and Accessories" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: bodyText, children: "Per NSDL and UTIITSL guidelines, spectacles and sunglasses of any kind — including prescription glasses — are not permitted in PAN card photos. Heavy jewellery that obscures the face outline, such as large earrings or a necklace that overlaps the chin, is also not acceptable. Head coverings are only permitted for documented religious reasons, and in such cases the full face must remain clearly visible. The photo must not have any digital filters, retouching, or alterations that change the applicant's natural appearance." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: h2Style, children: "Tips for a Successful PAN Card Photo" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: "1rem"
                },
                children: [
                  {
                    icon: "📸",
                    title: "Use a Recent Photo",
                    body: "The Income Tax Department requires a recent likeness — ideally taken within the last six months. An outdated photo that does not match your current appearance may be rejected by the application reviewing officer during document verification."
                  },
                  {
                    icon: "⬜",
                    title: "White Background is Mandatory",
                    body: "Any background colour other than plain white or light grey will cause rejection. Studio blue or grey backgrounds are not accepted. Use the Background Remover tool linked below to replace any non-white background before resizing your photo."
                  },
                  {
                    icon: "📦",
                    title: "Keep File Under 50KB",
                    body: "The NSDL and UTIITSL portals enforce a strict 50 KB file size limit and will show an error if your file exceeds this. Aim for 40–48 KB to leave a safe margin. The preset automatically applies the correct compression level — no manual adjustment needed."
                  },
                  {
                    icon: "👤",
                    title: "Face Must Be Clear and Centered",
                    body: "Blur, soft focus, or off-centre framing causes quality rejection during the automated review. Use a well-lit environment with natural or diffused indoor light. The face should be sharp and clearly distinguishable from the background."
                  },
                  {
                    icon: "👓",
                    title: "No Glasses in PAN Photo",
                    body: "NSDL and UTIITSL strictly prohibit spectacles and sunglasses in PAN card photos — including prescription glasses. Take a fresh photo without glasses. Submitting a photo with glasses is one of the top rejection reasons at both portals."
                  },
                  {
                    icon: "✍️",
                    title: "Resize Signature Separately",
                    body: "PAN applications require both a photo and a digital signature image. The signature must be under 30 KB and in JPEG format, with dimensions of approximately 2×4.5 cm. Use the Signature Resize tool linked below to prepare your signature image separately."
                  }
                ].map(({ icon, title, body }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      background: "#0f172a",
                      borderRadius: "0.75rem",
                      padding: "1rem 1.125rem",
                      border: "1px solid #1e293b"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "1.4rem", marginBottom: "0.375rem" }, children: icon }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { ...h3Style, fontSize: "0.9rem" }, children: title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { ...bodyText, fontSize: "0.875rem" }, children: body })
                    ]
                  },
                  title
                ))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: h2Style, children: "Common PAN Card Photo Mistakes and How to Avoid Them" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { ...bodyText, marginBottom: "1.25rem" }, children: "These are the most frequent reasons PAN card photo submissions are rejected by NSDL and UTIITSL. Addressing these before you upload will save you from having to restart or resubmit your application:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: { display: "flex", flexDirection: "column", gap: "1rem" },
                children: [
                  {
                    title: "File Exceeds 50 KB",
                    body: "This is the most common cause of upload errors on the NSDL portal. Use the Target File Size control in the tool and set it to 50 KB. The tool will automatically reduce the compression quality until the output fits within the limit. Always aim for 40–48 KB to leave a buffer."
                  },
                  {
                    title: "Wrong Dimensions",
                    body: "The NSDL portal expects a 3.5×2.5 cm photo (413×295 px at 300 DPI). Uploading a square photo, a portrait photo, or a photo of the wrong pixel count will trigger a dimension error. Use the NSDL Standard preset to guarantee correct output dimensions every time."
                  },
                  {
                    title: "Non-White Background",
                    body: "A coloured, textured, or patterned background is rejected during the officer's manual quality check even if the file passes the automated portal validation. Use the Background Remover tool linked below to replace any non-white background with solid white before resizing."
                  },
                  {
                    title: "Glasses in the Photo",
                    body: "Spectacles — including clear prescription glasses — are not permitted in PAN card photos per the latest NSDL and UTIITSL guidelines. If you submitted a photo with glasses and it was rejected, retake the photo without glasses. There is no digital removal solution that the portals accept."
                  },
                  {
                    title: "Photo Not Recent",
                    body: "The application reviewer is instructed to reject photos that do not appear to match the applicant's current appearance. Using an old photo — even if it meets all technical requirements — can result in rejection during document verification. Always use a photo taken within the last six months."
                  }
                ].map(({ title, body }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      gap: "1rem",
                      borderBottom: i < 4 ? "1px solid #1e293b" : "none",
                      paddingBottom: i < 4 ? "1rem" : 0
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: {
                            color: ACCENT,
                            fontWeight: 700,
                            fontSize: "1.1rem",
                            flexShrink: 0,
                            marginTop: "0.1rem"
                          },
                          children: "✗"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "h3",
                          {
                            style: {
                              ...h3Style,
                              color: "#f1f5f9",
                              marginBottom: "0.3rem"
                            },
                            children: title
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { ...bodyText, fontSize: "0.9rem" }, children: body })
                      ] })
                    ]
                  },
                  title
                ))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: h2Style, children: "Frequently Asked Questions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: { display: "flex", flexDirection: "column", gap: "1rem" },
                children: faqItems.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      borderBottom: i < faqItems.length - 1 ? "1px solid #1e293b" : "none",
                      paddingBottom: i < faqItems.length - 1 ? "1rem" : 0
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "h3",
                        {
                          style: {
                            ...h3Style,
                            color: ACCENT_LIGHT,
                            fontSize: "0.975rem",
                            marginBottom: "0.375rem"
                          },
                          children: item.q
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { ...bodyText, fontSize: "0.9rem" }, children: item.a })
                    ]
                  },
                  item.q
                ))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: h2Style, children: "Related Image Tools" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                  gap: "0.875rem",
                  marginBottom: "1.5rem"
                },
                children: relatedTools.map((tool) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "panresize.link",
                    onClick: () => onNavigate(tool.page),
                    style: {
                      background: "#0f172a",
                      border: "1px solid #1e293b",
                      borderRadius: "0.75rem",
                      padding: "1rem",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.15s"
                    },
                    onMouseEnter: (e) => {
                      e.currentTarget.style.borderColor = ACCENT;
                      e.currentTarget.style.background = "#1e293b";
                    },
                    onMouseLeave: (e) => {
                      e.currentTarget.style.borderColor = "#1e293b";
                      e.currentTarget.style.background = "#0f172a";
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "1.5rem", marginBottom: "0.375rem" }, children: tool.emoji }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            color: "#ffffff",
                            fontSize: "0.875rem",
                            fontWeight: 600
                          },
                          children: tool.label
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            color: "#64748b",
                            fontSize: "0.75rem",
                            marginTop: "0.25rem"
                          },
                          children: tool.desc
                        }
                      )
                    ]
                  },
                  tool.page
                ))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "1rem", flexWrap: "wrap" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "panresize.primary_button",
                  onClick: () => onNavigate("image-tools"),
                  style: {
                    background: ACCENT,
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "0.625rem",
                    padding: "0.875rem 1.75rem",
                    fontSize: "1rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "background 0.15s"
                  },
                  onMouseEnter: (e) => {
                    e.currentTarget.style.background = "#ea580c";
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.background = ACCENT;
                  },
                  children: "Browse All Image Tools →"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "panresize.secondary_button",
                  onClick: () => onNavigate("image-pan-photo"),
                  style: {
                    background: "transparent",
                    color: ACCENT_LIGHT,
                    border: `1px solid ${ACCENT_LIGHT}`,
                    borderRadius: "0.625rem",
                    padding: "0.875rem 1.75rem",
                    fontSize: "1rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.15s"
                  },
                  onMouseEnter: (e) => {
                    e.currentTarget.style.background = "rgba(251,146,60,0.08)";
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.background = "transparent";
                  },
                  children: "PAN Photo Tool →"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "p",
            {
              style: {
                textAlign: "center",
                color: "#475569",
                fontSize: "0.8rem",
                marginTop: "1.5rem"
              },
              children: [
                "© ",
                (/* @__PURE__ */ new Date()).getFullYear(),
                ". Built with love using",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                      typeof window !== "undefined" ? window.location.hostname : "docmastertools.com"
                    )}`,
                    style: { color: "#64748b" },
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: "caffeine.ai"
                  }
                )
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  PANCardPhotoResizePage as default
};
