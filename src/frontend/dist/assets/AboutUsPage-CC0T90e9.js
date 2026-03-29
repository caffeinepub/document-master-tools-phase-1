import { j as jsxRuntimeExports } from "./index-BK1nStnW.js";
import { A as ArrowLeft } from "./arrow-left-B6GHQD8m.js";
function AboutUsPage({ onBack }) {
  const sections = [
    {
      title: "Who We Are",
      content: "DocMasterTools.com is a free, browser-based platform providing document, image, PDF, and productivity tools for students, job seekers, professionals, and individuals across India and the world. We are operated by RJY TOTAL MANPOWERS SERVICES PRIVATE LIMITED."
    },
    {
      title: "Our Mission",
      content: "Our mission is to make powerful document tools accessible to everyone — completely free and with full privacy. Every tool on our platform runs entirely in your browser. Your files are never uploaded to any server."
    },
    {
      title: "What We Offer",
      content: "We provide 40+ tools including PDF merge, split, compress, convert, and protect; image resize, compress, crop, and background removal; a multi-template resume builder; calculators for finance, academics, and general use; and a full typing test and practice system."
    },
    {
      title: "Privacy First",
      content: "All processing happens locally in your browser. We do not store, transmit, or share your files. What you upload stays on your device — period."
    },
    {
      title: "Contact",
      content: "For support or feedback, reach us at support@docmastertools.com. We aim to respond within 1-2 business days."
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      style: {
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        padding: "2rem 1rem"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { maxWidth: "720px", margin: "0 auto" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "data-ocid": "about_us.back_button",
            onClick: onBack,
            style: {
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "transparent",
              border: "none",
              color: "#94a3b8",
              cursor: "pointer",
              fontSize: "0.9rem",
              marginBottom: "2rem",
              padding: "0.25rem 0"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 16 }),
              "Back to Home"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h1",
          {
            style: {
              color: "#ffffff",
              fontSize: "2rem",
              fontWeight: 700,
              marginBottom: "0.5rem"
            },
            children: "About Us"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            style: {
              color: "#94a3b8",
              marginBottom: "2.5rem",
              fontSize: "0.95rem"
            },
            children: "Last updated: March 2026"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: { display: "flex", flexDirection: "column", gap: "1.5rem" },
            children: sections.map((section) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  background: "#111827",
                  borderRadius: "0.75rem",
                  padding: "1.5rem",
                  borderLeft: "3px solid #f97316"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h2",
                    {
                      style: {
                        color: "#ffffff",
                        fontSize: "1.05rem",
                        fontWeight: 600,
                        marginBottom: "0.75rem"
                      },
                      children: section.title
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      style: {
                        color: "#cbd5e1",
                        fontSize: "0.93rem",
                        lineHeight: "1.7",
                        margin: 0
                      },
                      children: section.content
                    }
                  )
                ]
              },
              section.title
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "p",
          {
            style: {
              color: "#475569",
              fontSize: "0.8rem",
              textAlign: "center",
              marginTop: "2.5rem"
            },
            children: [
              "© ",
              (/* @__PURE__ */ new Date()).getFullYear(),
              " RJY TOTAL MANPOWERS SERVICES PRIVATE LIMITED. All Rights Reserved."
            ]
          }
        )
      ] })
    }
  );
}
export {
  AboutUsPage as default
};
