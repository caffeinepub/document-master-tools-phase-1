import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, i as trackCertificateVerified } from "./index-BK1nStnW.js";
import { A as ArrowLeft } from "./arrow-left-B6GHQD8m.js";
import { C as CircleCheckBig } from "./circle-check-big-C6nUF8Wo.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m14.5 9.5-5 5", key: "17q4r4" }],
  ["path", { d: "m9.5 9.5 5 5", key: "18nt4w" }]
];
const ShieldX = createLucideIcon("shield-x", __iconNode);
const CERTIFICATES_KEY = "typingmaster_certificates";
function loadCertificates() {
  try {
    const raw = localStorage.getItem(CERTIFICATES_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
  }
  return [];
}
function VerifyCertificatePage({
  onBack
}) {
  const [inputId, setInputId] = reactExports.useState("");
  const [result, setResult] = reactExports.useState(
    void 0
  );
  const [searched, setSearched] = reactExports.useState(false);
  const handleVerify = () => {
    if (!inputId.trim()) return;
    const all = loadCertificates();
    const found = all.find(
      (c) => c.certificateId.trim().toUpperCase() === inputId.trim().toUpperCase()
    );
    setResult(found ?? null);
    setSearched(true);
    trackCertificateVerified(inputId.trim().toUpperCase());
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleVerify();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        padding: "2rem 1rem",
        fontFamily: "'Segoe UI', sans-serif",
        color: "#f1f5f9"
      },
      children: [
        onBack && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { maxWidth: "640px", margin: "0 auto 1.5rem" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "data-ocid": "verify_cert.back.button",
            onClick: onBack,
            style: {
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              background: "transparent",
              border: "1px solid #334155",
              borderRadius: "0.5rem",
              color: "#94a3b8",
              padding: "0.4rem 0.9rem",
              fontSize: "0.85rem",
              cursor: "pointer",
              transition: "color 0.2s, border-color 0.2s"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 15 }),
              " Back"
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { maxWidth: "640px", margin: "0 auto" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center", marginBottom: "2rem" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "2.5rem", marginBottom: "0.5rem" }, children: "🔍" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h1",
              {
                style: {
                  color: "#ffffff",
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  marginBottom: "0.4rem"
                },
                children: "Certificate Verification"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#94a3b8", fontSize: "0.95rem" }, children: "Enter your Certificate ID to verify an issued typing certificate." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                background: "#111827",
                borderRadius: "1rem",
                padding: "2rem",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                marginBottom: "1.5rem"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "cert-id-input",
                    style: {
                      display: "block",
                      color: "#cbd5e1",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      marginBottom: "0.6rem"
                    },
                    children: "Certificate ID"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "0.75rem", flexWrap: "wrap" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "cert-id-input",
                      type: "text",
                      "data-ocid": "verify_cert.id.input",
                      value: inputId,
                      onChange: (e) => {
                        setInputId(e.target.value);
                        setSearched(false);
                      },
                      onKeyDown: handleKeyDown,
                      placeholder: "e.g. DMT-2026-000001",
                      style: {
                        flex: 1,
                        minWidth: "180px",
                        background: "#0f172a",
                        border: "1px solid #334155",
                        borderRadius: "0.6rem",
                        color: "#f1f5f9",
                        fontSize: "1rem",
                        padding: "0.65rem 1rem",
                        outline: "none",
                        letterSpacing: "0.04em",
                        fontFamily: "monospace",
                        transition: "border-color 0.2s"
                      },
                      onFocus: (e) => {
                        e.target.style.borderColor = "#3b82f6";
                      },
                      onBlur: (e) => {
                        e.target.style.borderColor = "#334155";
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      "data-ocid": "verify_cert.verify.primary_button",
                      onClick: handleVerify,
                      disabled: !inputId.trim(),
                      style: {
                        background: "#2563eb",
                        color: "#fff",
                        border: "none",
                        borderRadius: "0.6rem",
                        padding: "0.65rem 1.5rem",
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        cursor: inputId.trim() ? "pointer" : "not-allowed",
                        opacity: inputId.trim() ? 1 : 0.5,
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        transition: "background 0.2s",
                        whiteSpace: "nowrap"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 16 }),
                        " Verify Certificate"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    style: {
                      color: "#475569",
                      fontSize: "0.78rem",
                      marginTop: "0.6rem"
                    },
                    children: "Example format: DMT-2026-000001"
                  }
                )
              ]
            }
          ),
          searched && result === null && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "verify_cert.error_state",
              style: {
                background: "#111827",
                border: "1px solid #ef4444",
                borderRadius: "1rem",
                padding: "2rem",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.75rem"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldX, { size: 40, color: "#ef4444" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h2",
                  {
                    style: { color: "#f87171", fontWeight: 700, fontSize: "1.1rem" },
                    children: "Certificate Not Found"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#94a3b8", fontSize: "0.9rem" }, children: "Certificate not found or invalid. Please check the ID and try again." })
              ]
            }
          ),
          searched && result && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "verify_cert.success_state",
              style: {
                background: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
                border: "2px solid #4f9cff",
                borderRadius: "1rem",
                padding: "2rem",
                boxShadow: "0 0 24px rgba(79,156,255,0.35), 0 8px 32px rgba(0,0,0,0.5)",
                position: "relative",
                overflow: "hidden"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    "aria-hidden": "true",
                    style: {
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      pointerEvents: "none",
                      overflow: "hidden"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        style: {
                          fontSize: "3.5rem",
                          fontWeight: 800,
                          color: "rgba(255,255,255,0.04)",
                          transform: "rotate(-20deg)",
                          whiteSpace: "nowrap",
                          userSelect: "none"
                        },
                        children: "DocMasterTools.com"
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      background: "rgba(34,197,94,0.12)",
                      border: "1px solid rgba(34,197,94,0.4)",
                      borderRadius: "2rem",
                      padding: "0.4rem 1.2rem",
                      width: "fit-content",
                      margin: "0 auto 1.5rem"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 18, color: "#4ade80" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: {
                            color: "#4ade80",
                            fontWeight: 700,
                            fontSize: "0.9rem",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase"
                          },
                          children: "Verified"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center", marginBottom: "1.5rem" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "3rem", marginBottom: "0.4rem" }, children: "🏆" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h2",
                    {
                      style: {
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: "1.4rem",
                        marginBottom: "0.25rem"
                      },
                      children: "Certificate of Achievement"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#94a3b8", fontSize: "0.875rem" }, children: "DocMasterTools.com" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center", marginBottom: "1.5rem" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      style: {
                        color: "#94a3b8",
                        fontSize: "0.85rem",
                        marginBottom: "0.3rem"
                      },
                      children: "This certifies that"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: "1.5rem",
                        letterSpacing: "0.02em"
                      },
                      children: result.name
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        width: "8rem",
                        height: "1px",
                        background: "#475569",
                        margin: "0.75rem auto 0"
                      }
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                      gap: "0.75rem",
                      marginBottom: "1.5rem"
                    },
                    children: [
                      {
                        label: "Typing Speed",
                        value: `${result.wpm} WPM`,
                        color: "#4ade80"
                      },
                      {
                        label: "Accuracy",
                        value: `${result.accuracy}%`,
                        color: "#facc15"
                      },
                      {
                        label: "Duration",
                        value: `${result.duration} Min`,
                        color: "#38bdf8"
                      }
                    ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        style: {
                          background: "rgba(255,255,255,0.07)",
                          border: "1px solid rgba(79,156,255,0.22)",
                          borderRadius: "0.75rem",
                          padding: "0.85rem 0.5rem",
                          textAlign: "center",
                          backdropFilter: "blur(8px)"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              style: {
                                color: s.color,
                                fontWeight: 700,
                                fontSize: "1.3rem",
                                marginBottom: "0.2rem"
                              },
                              children: s.value
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#94a3b8", fontSize: "0.75rem" }, children: s.label })
                        ]
                      },
                      s.label
                    ))
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      background: "rgba(0,0,0,0.2)",
                      borderRadius: "0.6rem",
                      padding: "1rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                      marginBottom: "1rem"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          style: {
                            display: "flex",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            gap: "0.25rem"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#64748b", fontSize: "0.82rem" }, children: "Date Issued" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                style: {
                                  color: "#cbd5e1",
                                  fontSize: "0.82rem",
                                  fontWeight: 600
                                },
                                children: result.date
                              }
                            )
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          style: {
                            display: "flex",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            gap: "0.25rem"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#64748b", fontSize: "0.82rem" }, children: "Certificate ID" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                style: {
                                  color: "#60a5fa",
                                  fontSize: "0.82rem",
                                  fontWeight: 700,
                                  fontFamily: "monospace",
                                  letterSpacing: "0.06em"
                                },
                                children: result.certificateId
                              }
                            )
                          ]
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      borderTop: "1px solid rgba(71,85,105,0.5)",
                      paddingTop: "0.9rem",
                      textAlign: "center"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        style: {
                          color: "#93c5fd",
                          fontWeight: 700,
                          fontSize: "0.82rem",
                          letterSpacing: "0.01em",
                          textShadow: "0 0 10px rgba(147,197,253,0.3)"
                        },
                        children: "Generated by DocMasterTools.com — Free Online Document & Utility Tools"
                      }
                    )
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
  VerifyCertificatePage as default
};
