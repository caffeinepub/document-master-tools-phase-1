import { r as reactExports, j as jsxRuntimeExports } from "./index-BFVPq1mW.js";
import { B as BreadcrumbSchema } from "./BreadcrumbSchema-DJGqVWYd.js";
import { S as SEO } from "./SEO-B1UZw1Ql.js";
function DocumentToolSEOPage({ config, onNavigate }) {
  const [openFaq, setOpenFaq] = reactExports.useState(null);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a }
    }))
  };
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: config.howToName,
    step: config.howItWorks.steps.map((step, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      name: step.title,
      text: step.body
    }))
  };
  const card = {
    background: "#111827",
    borderRadius: "1rem",
    padding: "1.75rem",
    marginBottom: "1.5rem",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
  };
  const sectionHeading = {
    color: "#ffffff",
    fontSize: "1.15rem",
    fontWeight: 700,
    marginBottom: "1rem"
  };
  const accentColor = config.toolCategory === "pdf" ? "#f97316" : "#8b5cf6";
  const accentColorLight = config.toolCategory === "pdf" ? "#fb923c" : "#a78bfa";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        padding: "2rem 1rem 3rem"
      },
      children: [
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
            dangerouslySetInnerHTML: { __html: JSON.stringify(howToSchema) }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SEO,
          {
            title: config.title,
            description: config.description,
            canonicalUrl: `https://docmastertools.com/${config.slug}`,
            ogImage: "/assets/generated/docmastertools-logo.dim_540x270.png"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          BreadcrumbSchema,
          {
            items: [
              { name: "Home", url: "https://docmastertools.com/" },
              {
                name: config.toolCategory === "pdf" ? "PDF Tools" : "Image Tools",
                url: `https://docmastertools.com/${config.ctaPage}`
              },
              { name: config.h1, url: `https://docmastertools.com/${config.slug}` }
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { maxWidth: "860px", margin: "0 auto" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "1.75rem" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "0.75rem"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      style: {
                        background: accentColor,
                        color: "#fff",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        padding: "0.2rem 0.6rem",
                        borderRadius: "0.3rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em"
                      },
                      children: config.toolCategory === "pdf" ? "PDF Tool" : "Image Tool"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      style: {
                        background: "#1e293b",
                        color: "#4ade80",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        padding: "0.2rem 0.6rem",
                        borderRadius: "0.3rem"
                      },
                      children: "Free Online"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h1",
              {
                style: {
                  color: "#ffffff",
                  fontSize: "clamp(1.5rem, 4vw, 2.1rem)",
                  fontWeight: 800,
                  marginBottom: "0.65rem"
                },
                children: config.h1
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#94a3b8", fontSize: "1rem", lineHeight: 1.7 }, children: config.intro })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                ...card,
                background: "linear-gradient(135deg, #1a1a2e, #16213e)",
                border: `1px solid ${accentColor}`,
                textAlign: "center",
                padding: "2.5rem 2rem"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "3rem", marginBottom: "0.75rem" }, children: config.toolCategory === "pdf" ? "📄" : "🖼️" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "h2",
                  {
                    style: {
                      color: "#ffffff",
                      fontSize: "1.3rem",
                      fontWeight: 800,
                      marginBottom: "0.5rem"
                    },
                    children: [
                      "Use the Free ",
                      config.toolCategory === "pdf" ? "PDF" : "Image",
                      " Tool Now"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    style: {
                      color: "#94a3b8",
                      fontSize: "0.9rem",
                      marginBottom: "1.5rem"
                    },
                    children: "No signup required. Works entirely in your browser. Fast and private."
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      gap: "0.75rem",
                      justifyContent: "center",
                      flexWrap: "wrap"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          "data-ocid": `${config.slug.replace(/-/g, "_")}.hero_cta.primary_button`,
                          onClick: () => onNavigate(config.ctaPage),
                          style: {
                            background: accentColor,
                            color: "#fff",
                            border: "none",
                            borderRadius: "0.5rem",
                            padding: "0.85rem 2.25rem",
                            fontSize: "1rem",
                            fontWeight: 700,
                            cursor: "pointer"
                          },
                          children: config.ctaLabel
                        }
                      ),
                      config.secondaryCtaPage && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          "data-ocid": `${config.slug.replace(/-/g, "_")}.hero_secondary.secondary_button`,
                          onClick: () => onNavigate(config.secondaryCtaPage),
                          style: {
                            background: "#1e293b",
                            color: "#94a3b8",
                            border: "1px solid #334155",
                            borderRadius: "0.5rem",
                            padding: "0.85rem 2.25rem",
                            fontSize: "1rem",
                            fontWeight: 600,
                            cursor: "pointer"
                          },
                          children: config.secondaryCtaLabel
                        }
                      )
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: card, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: sectionHeading, children: config.whatIsSection.heading }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.8 }, children: config.whatIsSection.body })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: card, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: sectionHeading, children: config.howItWorks.heading }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: { display: "flex", flexDirection: "column", gap: "1rem" },
                children: config.howItWorks.steps.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
                            background: accentColor,
                            color: "#fff",
                            borderRadius: "50%",
                            width: "28px",
                            height: "28px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            fontSize: "0.85rem",
                            flexShrink: 0
                          },
                          children: i + 1
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "h3",
                          {
                            style: {
                              color: "#e2e8f0",
                              fontWeight: 700,
                              fontSize: "0.9rem",
                              marginBottom: "0.2rem",
                              margin: "0 0 0.2rem"
                            },
                            children: step.title
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            style: {
                              color: "#94a3b8",
                              fontSize: "0.85rem",
                              lineHeight: 1.6
                            },
                            children: step.body
                          }
                        )
                      ] })
                    ]
                  },
                  step.title
                ))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: card, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: sectionHeading, children: config.benefits.heading }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                  gap: "1rem"
                },
                children: config.benefits.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      background: "#1e293b",
                      borderRadius: "0.75rem",
                      padding: "1rem 1.25rem",
                      borderLeft: `3px solid ${accentColor}`
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            color: accentColorLight,
                            fontWeight: 700,
                            fontSize: "0.9rem",
                            marginBottom: "0.35rem"
                          },
                          children: item.title
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            color: "#94a3b8",
                            fontSize: "0.85rem",
                            lineHeight: 1.6
                          },
                          children: item.body
                        }
                      )
                    ]
                  },
                  item.title
                ))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: card, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: sectionHeading, children: config.tips.heading }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                  gap: "1rem"
                },
                children: config.tips.items.map((tip) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      background: "#1e293b",
                      borderRadius: "0.75rem",
                      padding: "1rem 1.25rem",
                      borderLeft: "3px solid #2563eb"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            color: "#38bdf8",
                            fontWeight: 700,
                            fontSize: "0.9rem",
                            marginBottom: "0.35rem"
                          },
                          children: tip.title
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            color: "#94a3b8",
                            fontSize: "0.85rem",
                            lineHeight: 1.6
                          },
                          children: tip.body
                        }
                      )
                    ]
                  },
                  tip.title
                ))
              }
            )
          ] }),
          config.relatedTools.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: card, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: sectionHeading, children: "Related Free Tools" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                  gap: "0.65rem"
                },
                children: config.relatedTools.map((tool) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    "data-ocid": `${config.slug.replace(/-/g, "_")}.related_${tool.page.replace(/-/g, "_")}.link`,
                    onClick: () => onNavigate(tool.page),
                    style: {
                      background: "#1e293b",
                      border: "1px solid #334155",
                      borderRadius: "0.75rem",
                      padding: "0.875rem 1rem",
                      textAlign: "left",
                      cursor: "pointer"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          style: {
                            display: "flex",
                            alignItems: "center",
                            gap: "0.35rem",
                            marginBottom: "0.25rem"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "0.9rem" }, children: tool.emoji }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                style: {
                                  color: "#ffffff",
                                  fontWeight: 700,
                                  fontSize: "0.85rem"
                                },
                                children: tool.label
                              }
                            )
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            color: "#64748b",
                            fontSize: "0.75rem",
                            lineHeight: 1.4
                          },
                          children: tool.desc
                        }
                      )
                    ]
                  },
                  tool.page
                ))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                ...card,
                background: "linear-gradient(135deg, #1e293b, #0f172a)",
                border: `1px solid ${accentColor}`,
                textAlign: "center"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "h2",
                  {
                    style: {
                      color: "#ffffff",
                      fontSize: "1.15rem",
                      fontWeight: 800,
                      marginBottom: "0.5rem"
                    },
                    children: [
                      "Ready to Process Your",
                      " ",
                      config.toolCategory === "pdf" ? "PDF" : "Image",
                      "?"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    style: {
                      color: "#94a3b8",
                      fontSize: "0.9rem",
                      marginBottom: "1.25rem"
                    },
                    children: "100% free, browser-based, no file uploads to external servers."
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": `${config.slug.replace(/-/g, "_")}.bottom_cta.primary_button`,
                    onClick: () => onNavigate(config.ctaPage),
                    style: {
                      background: accentColor,
                      color: "#fff",
                      border: "none",
                      borderRadius: "0.5rem",
                      padding: "0.75rem 2.5rem",
                      fontSize: "1rem",
                      fontWeight: 700,
                      cursor: "pointer"
                    },
                    children: config.ctaLabel
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: card, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: sectionHeading, children: "Frequently Asked Questions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: { display: "flex", flexDirection: "column", gap: "0.5rem" },
                children: config.faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: {
                        background: "#1e293b",
                        borderRadius: "0.75rem",
                        overflow: "hidden",
                        border: isOpen ? `1px solid ${accentColor}` : "1px solid #334155"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            "data-ocid": `${config.slug.replace(/-/g, "_")}.faq.item.${idx + 1}`,
                            onClick: () => setOpenFaq(isOpen ? null : idx),
                            style: {
                              width: "100%",
                              background: "transparent",
                              border: "none",
                              cursor: "pointer",
                              padding: "0.875rem 1rem",
                              textAlign: "left",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: "0.5rem"
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  style: {
                                    color: isOpen ? accentColorLight : "#e2e8f0",
                                    fontWeight: 600,
                                    fontSize: "0.875rem",
                                    lineHeight: 1.4
                                  },
                                  children: faq.q
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  style: {
                                    color: "#64748b",
                                    fontSize: "1rem",
                                    flexShrink: 0,
                                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                                    transition: "transform 0.2s",
                                    display: "inline-block"
                                  },
                                  children: "▼"
                                }
                              )
                            ]
                          }
                        ),
                        isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            style: {
                              padding: "0 1rem 0.875rem",
                              color: "#94a3b8",
                              fontSize: "0.85rem",
                              lineHeight: 1.7,
                              borderTop: "1px solid #334155",
                              paddingTop: "0.75rem"
                            },
                            children: faq.a
                          }
                        )
                      ]
                    },
                    faq.q
                  );
                })
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  DocumentToolSEOPage as D
};
