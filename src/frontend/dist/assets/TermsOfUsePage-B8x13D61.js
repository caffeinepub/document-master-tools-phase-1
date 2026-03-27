import { j as jsxRuntimeExports } from "./index-5lKdoCW0.js";
import { A as ArrowLeft } from "./arrow-left-CfDrezEV.js";
function TermsOfUsePage({ onBack }) {
  const sections = [
    {
      title: "Acceptance of Terms",
      content: "By accessing and using DocMasterTools.com, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our services."
    },
    {
      title: "Use License",
      content: "Permission is granted to temporarily use DocMasterTools.com for personal and commercial document processing purposes. Under this license you may not: modify or copy the materials; use the materials for any commercial purpose without proper attribution; attempt to decompile or reverse engineer any software; or remove any copyright or other proprietary notations from the materials."
    },
    {
      title: "Service Description",
      content: "DocMasterTools.com provides browser-based document processing tools including PDF manipulation and conversion tools, image editing and processing tools, resume building templates and tools, calculator tools, and typing practice tools."
    },
    {
      title: "User Responsibilities",
      content: "You are responsible for ensuring you have the right to process any documents you handle, complying with all applicable laws and regulations, not using our services for any illegal or unauthorized purpose, and not attempting to interfere with or disrupt our services."
    },
    {
      title: "Privacy & Data",
      content: "All file processing runs entirely in your browser. We do not upload, store, or share your files. By using this site, you acknowledge this browser-based processing model."
    },
    {
      title: "Disclaimer of Warranties",
      content: "The materials on DocMasterTools.com are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties including implied warranties of merchantability, fitness for a particular purpose, or non-infringement of intellectual property."
    },
    {
      title: "Limitations of Liability",
      content: "In no event shall DocMasterTools.com or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use our services."
    },
    {
      title: "Modifications",
      content: "We may revise these terms of use at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms."
    },
    {
      title: "Governing Law",
      content: "These terms and conditions are governed by and construed in accordance with applicable laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location."
    },
    {
      title: "Contact",
      content: "For questions about these Terms, contact us at support@docmastertools.com."
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
            "data-ocid": "terms_conditions.back_button",
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
            children: "Terms & Conditions"
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
  TermsOfUsePage as default
};
