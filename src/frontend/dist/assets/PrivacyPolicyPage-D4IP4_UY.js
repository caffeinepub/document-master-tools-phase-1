import { j as jsxRuntimeExports } from "./index-YN_OslaE.js";
import { A as ArrowLeft } from "./arrow-left-C6-8XIiy.js";
function PrivacyPolicyPage({ onBack }) {
  const sections = [
    {
      title: "Introduction",
      content: "DocMasterTools.com ('we', 'our', or 'us') is committed to protecting your privacy. This Privacy Policy explains how we handle your information when you use our document processing tools."
    },
    {
      title: "Data Processing",
      content: "All file processing on DocMasterTools.com happens entirely in your browser. We do not upload, store, or transmit your files to any server. Your documents remain on your device at all times."
    },
    {
      title: "What We Don't Collect",
      content: "We do not collect or store any files you process. We do not collect personal information unless you voluntarily provide it. We do not track your document content or processing activities."
    },
    {
      title: "What We May Collect",
      content: "We may collect anonymous usage statistics (page views, tool usage counts), technical information (browser type, device type) for improving user experience, and cookies for essential website functionality."
    },
    {
      title: "Third-Party Services",
      content: "We may use third-party services for analytics and advertising. These services may collect information about your visit to our website in accordance with their own privacy policies."
    },
    {
      title: "Data Security",
      content: "Since all processing happens in your browser, your files never leave your device. We implement industry-standard security measures to protect our website and any information we may collect."
    },
    {
      title: "Your Rights",
      content: "You have the right to access any personal information we may have collected, request deletion of your information, opt-out of analytics tracking, and disable cookies in your browser settings."
    },
    {
      title: "Children's Privacy",
      content: "Our services are not directed to children under 13. We do not knowingly collect information from children under 13."
    },
    {
      title: "Changes to This Policy",
      content: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'Last updated' date."
    },
    {
      title: "Contact Us",
      content: "If you have any questions about this Privacy Policy, please contact us at support@docmastertools.com."
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
            "data-ocid": "privacy_policy.back_button",
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
            children: "Privacy Policy"
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
  PrivacyPolicyPage as default
};
