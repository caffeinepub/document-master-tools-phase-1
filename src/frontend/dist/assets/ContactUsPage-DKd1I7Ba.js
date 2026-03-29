import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, G as Globe } from "./index-YN_OslaE.js";
import { A as ArrowLeft } from "./arrow-left-C6-8XIiy.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode);
function ContactUsPage({ onBack }) {
  const [form, setForm] = reactExports.useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = reactExports.useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
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
            "data-ocid": "contact_us.back_button",
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
            children: "Contact Us"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            style: {
              color: "#94a3b8",
              marginBottom: "2rem",
              fontSize: "0.95rem"
            },
            children: "Have a question or feedback? We'd love to hear from you."
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              background: "#111827",
              borderRadius: "0.75rem",
              padding: "1.5rem",
              marginBottom: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: { display: "flex", alignItems: "center", gap: "0.75rem" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 18, color: "#f97316" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          style: {
                            color: "#64748b",
                            fontSize: "0.75rem",
                            marginBottom: "0.1rem"
                          },
                          children: "Email"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "a",
                        {
                          href: "mailto:support@docmastertools.com",
                          style: {
                            color: "#f97316",
                            fontSize: "0.95rem",
                            textDecoration: "none"
                          },
                          children: "support@docmastertools.com"
                        }
                      )
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: { display: "flex", alignItems: "center", gap: "0.75rem" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { size: 18, color: "#f97316" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          style: {
                            color: "#64748b",
                            fontSize: "0.75rem",
                            marginBottom: "0.1rem"
                          },
                          children: "Website"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#cbd5e1", fontSize: "0.95rem" }, children: "DocMasterTools.com" })
                    ] })
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              background: "#111827",
              borderRadius: "0.75rem",
              padding: "1.75rem"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  style: {
                    color: "#ffffff",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    marginBottom: "1.5rem"
                  },
                  children: "Send a Message"
                }
              ),
              submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": "contact_us.success_state",
                  style: {
                    background: "#14532d",
                    border: "1px solid #16a34a",
                    borderRadius: "0.5rem",
                    padding: "1.25rem",
                    textAlign: "center",
                    color: "#4ade80",
                    fontWeight: 600
                  },
                  children: [
                    "Thank you! Your message has been received. We'll get back to you at ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#86efac" }, children: form.email }),
                    "."
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "form",
                {
                  onSubmit: handleSubmit,
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.25rem"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: "contact-name",
                          style: {
                            color: "#94a3b8",
                            fontSize: "0.85rem",
                            display: "block",
                            marginBottom: "0.4rem"
                          },
                          children: "Your Name"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "contact-name",
                          type: "text",
                          required: true,
                          "data-ocid": "contact_us.input",
                          placeholder: "Enter your name",
                          value: form.name,
                          onChange: (e) => setForm({ ...form, name: e.target.value }),
                          style: {
                            width: "100%",
                            background: "#0f172a",
                            border: "1px solid #334155",
                            borderRadius: "0.5rem",
                            color: "#f1f5f9",
                            fontSize: "0.95rem",
                            padding: "0.65rem 0.9rem",
                            outline: "none",
                            boxSizing: "border-box"
                          }
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: "contact-email",
                          style: {
                            color: "#94a3b8",
                            fontSize: "0.85rem",
                            display: "block",
                            marginBottom: "0.4rem"
                          },
                          children: "Email Address"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "contact-email",
                          type: "email",
                          required: true,
                          "data-ocid": "contact_us.input",
                          placeholder: "Enter your email",
                          value: form.email,
                          onChange: (e) => setForm({ ...form, email: e.target.value }),
                          style: {
                            width: "100%",
                            background: "#0f172a",
                            border: "1px solid #334155",
                            borderRadius: "0.5rem",
                            color: "#f1f5f9",
                            fontSize: "0.95rem",
                            padding: "0.65rem 0.9rem",
                            outline: "none",
                            boxSizing: "border-box"
                          }
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: "contact-message",
                          style: {
                            color: "#94a3b8",
                            fontSize: "0.85rem",
                            display: "block",
                            marginBottom: "0.4rem"
                          },
                          children: "Message"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "textarea",
                        {
                          id: "contact-message",
                          required: true,
                          rows: 5,
                          "data-ocid": "contact_us.textarea",
                          placeholder: "Write your message here...",
                          value: form.message,
                          onChange: (e) => setForm({ ...form, message: e.target.value }),
                          style: {
                            width: "100%",
                            background: "#0f172a",
                            border: "1px solid #334155",
                            borderRadius: "0.5rem",
                            color: "#f1f5f9",
                            fontSize: "0.95rem",
                            padding: "0.65rem 0.9rem",
                            outline: "none",
                            resize: "vertical",
                            boxSizing: "border-box",
                            fontFamily: "inherit"
                          }
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "submit",
                        "data-ocid": "contact_us.submit_button",
                        style: {
                          background: "#f97316",
                          color: "#fff",
                          border: "none",
                          borderRadius: "0.5rem",
                          padding: "0.75rem 1.75rem",
                          fontSize: "0.95rem",
                          fontWeight: 600,
                          cursor: "pointer",
                          alignSelf: "flex-start"
                        },
                        children: "Send Message"
                      }
                    )
                  ]
                }
              )
            ]
          }
        )
      ] })
    }
  );
}
export {
  ContactUsPage as default
};
