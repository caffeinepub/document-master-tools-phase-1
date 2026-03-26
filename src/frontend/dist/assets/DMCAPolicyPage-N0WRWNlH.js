import { j as jsxRuntimeExports } from "./index-BFVPq1mW.js";
import { A as ArrowLeft } from "./arrow-left-ByehoCcW.js";
function DMCAPolicyPage({ onBack }) {
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
            "data-ocid": "dmca_policy.back_button",
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
            children: "DMCA Policy"
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
            children: [
              {
                title: "Overview",
                content: "DocMasterTools.com respects the intellectual property rights of others and expects its users to do the same. In accordance with the Digital Millennium Copyright Act of 1998 (DMCA), we will respond to notices of alleged copyright infringement that comply with the DMCA."
              },
              {
                title: "Copyright Infringement Notification",
                content: "If you believe that content available on or through DocMasterTools.com infringes one or more of your copyrights, please notify us by sending a written notice to our designated copyright agent at support@docmastertools.com. Your notice must include: (1) a physical or electronic signature of the person authorized to act on behalf of the copyright owner; (2) identification of the copyrighted work(s) claimed to have been infringed; (3) identification of the material claimed to be infringing with enough detail for us to locate it; (4) your contact information including address, telephone number, and email; (5) a statement by you that you have a good faith belief that the disputed use is not authorized; (6) a statement that the information in the notification is accurate and, under penalty of perjury, that you are authorized to act on behalf of the copyright owner."
              },
              {
                title: "Counter-Notification",
                content: "If you believe that your content was removed or disabled by mistake or misidentification, you may submit a counter-notification to support@docmastertools.com. Your counter-notification must include: (1) your physical or electronic signature; (2) identification of the material removed and the location where it appeared before removal; (3) a statement under penalty of perjury that you have a good faith belief that the content was removed due to mistake or misidentification; (4) your name, address, and telephone number, and a statement that you consent to the jurisdiction of the applicable courts."
              },
              {
                title: "Repeat Infringers",
                content: "It is our policy to terminate, in appropriate circumstances, the accounts of users who are repeat copyright infringers."
              },
              {
                title: "User-Generated Content",
                content: "DocMasterTools.com is a browser-based tool platform. Users process their own files entirely within their own browsers. We do not host, store, or serve user-uploaded content. As such, the platform does not act as a hosting service for user content, and DMCA takedown requests related to user-processed files are not applicable to our infrastructure."
              },
              {
                title: "Contact",
                content: "For all DMCA-related notices and counter-notices, contact us at: support@docmastertools.com"
              }
            ].map((section) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
  DMCAPolicyPage as default
};
