import { useState } from "react";
import BreadcrumbSchema from "../components/BreadcrumbSchema";
import SEO from "../components/SEO";

export interface DocToolSEOConfig {
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  toolCategory: "image" | "pdf";
  ctaPage: string;
  ctaLabel: string;
  secondaryCtaPage?: string;
  secondaryCtaLabel?: string;
  whatIsSection: { heading: string; body: string };
  howItWorks: { heading: string; steps: { title: string; body: string }[] };
  benefits: { heading: string; items: { title: string; body: string }[] };
  tips: { heading: string; items: { title: string; body: string }[] };
  faqs: { q: string; a: string }[];
  howToName: string;
  relatedTools: { label: string; page: string; emoji: string; desc: string }[];
}

interface Props {
  config: DocToolSEOConfig;
  onNavigate: (page: string) => void;
}

export default function DocumentToolSEOPage({ config, onNavigate }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: config.howToName,
    step: config.howItWorks.steps.map((step, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      name: step.title,
      text: step.body,
    })),
  };

  const card: React.CSSProperties = {
    background: "#111827",
    borderRadius: "1rem",
    padding: "1.75rem",
    marginBottom: "1.5rem",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
  };

  const sectionHeading: React.CSSProperties = {
    color: "#ffffff",
    fontSize: "1.15rem",
    fontWeight: 700,
    marginBottom: "1rem",
  };

  const accentColor = config.toolCategory === "pdf" ? "#f97316" : "#8b5cf6";
  const accentColorLight =
    config.toolCategory === "pdf" ? "#fb923c" : "#a78bfa";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        padding: "2rem 1rem 3rem",
      }}
    >
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data is safe
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data is safe
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <SEO
        title={config.title}
        description={config.description}
        canonicalUrl={`https://docmastertools.com/${config.slug}`}
        ogImage="/assets/generated/docmastertools-logo.dim_540x270.png"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://docmastertools.com/" },
          {
            name: config.toolCategory === "pdf" ? "PDF Tools" : "Image Tools",
            url: `https://docmastertools.com/${config.ctaPage}`,
          },
          { name: config.h1, url: `https://docmastertools.com/${config.slug}` },
        ]}
      />

      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        {/* Page Header */}
        <div style={{ marginBottom: "1.75rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "0.75rem",
            }}
          >
            <span
              style={{
                background: accentColor,
                color: "#fff",
                fontSize: "0.7rem",
                fontWeight: 700,
                padding: "0.2rem 0.6rem",
                borderRadius: "0.3rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {config.toolCategory === "pdf" ? "PDF Tool" : "Image Tool"}
            </span>
            <span
              style={{
                background: "#1e293b",
                color: "#4ade80",
                fontSize: "0.7rem",
                fontWeight: 700,
                padding: "0.2rem 0.6rem",
                borderRadius: "0.3rem",
              }}
            >
              Free Online
            </span>
          </div>
          <h1
            style={{
              color: "#ffffff",
              fontSize: "clamp(1.5rem, 4vw, 2.1rem)",
              fontWeight: 800,
              marginBottom: "0.65rem",
            }}
          >
            {config.h1}
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "1rem", lineHeight: 1.7 }}>
            {config.intro}
          </p>
        </div>

        {/* Primary CTA Hero Card */}
        <div
          style={{
            ...card,
            background: "linear-gradient(135deg, #1a1a2e, #16213e)",
            border: `1px solid ${accentColor}`,
            textAlign: "center",
            padding: "2.5rem 2rem",
          }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>
            {config.toolCategory === "pdf" ? "📄" : "🖼️"}
          </div>
          <h2
            style={{
              color: "#ffffff",
              fontSize: "1.3rem",
              fontWeight: 800,
              marginBottom: "0.5rem",
            }}
          >
            Use the Free {config.toolCategory === "pdf" ? "PDF" : "Image"} Tool
            Now
          </h2>
          <p
            style={{
              color: "#94a3b8",
              fontSize: "0.9rem",
              marginBottom: "1.5rem",
            }}
          >
            No signup required. Works entirely in your browser. Fast and
            private.
          </p>
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              data-ocid={`${config.slug.replace(/-/g, "_")}.hero_cta.primary_button`}
              onClick={() => onNavigate(config.ctaPage)}
              style={{
                background: accentColor,
                color: "#fff",
                border: "none",
                borderRadius: "0.5rem",
                padding: "0.85rem 2.25rem",
                fontSize: "1rem",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {config.ctaLabel}
            </button>
            {config.secondaryCtaPage && (
              <button
                type="button"
                data-ocid={`${config.slug.replace(/-/g, "_")}.hero_secondary.secondary_button`}
                onClick={() => onNavigate(config.secondaryCtaPage!)}
                style={{
                  background: "#1e293b",
                  color: "#94a3b8",
                  border: "1px solid #334155",
                  borderRadius: "0.5rem",
                  padding: "0.85rem 2.25rem",
                  fontSize: "1rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {config.secondaryCtaLabel}
              </button>
            )}
          </div>
        </div>

        {/* What Is Section */}
        <div style={card}>
          <h2 style={sectionHeading}>{config.whatIsSection.heading}</h2>
          <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.8 }}>
            {config.whatIsSection.body}
          </p>
        </div>

        {/* How It Works */}
        <div style={card}>
          <h2 style={sectionHeading}>{config.howItWorks.heading}</h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {config.howItWorks.steps.map((step, i) => (
              <div
                key={step.title}
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
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
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </div>
                <div>
                  <h3
                    style={{
                      color: "#e2e8f0",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      marginBottom: "0.2rem",
                      margin: "0 0 0.2rem",
                    }}
                  >
                    {step.title}
                  </h3>
                  <div
                    style={{
                      color: "#94a3b8",
                      fontSize: "0.85rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {step.body}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div style={card}>
          <h2 style={sectionHeading}>{config.benefits.heading}</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "1rem",
            }}
          >
            {config.benefits.items.map((item) => (
              <div
                key={item.title}
                style={{
                  background: "#1e293b",
                  borderRadius: "0.75rem",
                  padding: "1rem 1.25rem",
                  borderLeft: `3px solid ${accentColor}`,
                }}
              >
                <div
                  style={{
                    color: accentColorLight,
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    marginBottom: "0.35rem",
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    color: "#94a3b8",
                    fontSize: "0.85rem",
                    lineHeight: 1.6,
                  }}
                >
                  {item.body}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div style={card}>
          <h2 style={sectionHeading}>{config.tips.heading}</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "1rem",
            }}
          >
            {config.tips.items.map((tip) => (
              <div
                key={tip.title}
                style={{
                  background: "#1e293b",
                  borderRadius: "0.75rem",
                  padding: "1rem 1.25rem",
                  borderLeft: "3px solid #2563eb",
                }}
              >
                <div
                  style={{
                    color: "#38bdf8",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    marginBottom: "0.35rem",
                  }}
                >
                  {tip.title}
                </div>
                <div
                  style={{
                    color: "#94a3b8",
                    fontSize: "0.85rem",
                    lineHeight: 1.6,
                  }}
                >
                  {tip.body}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Tools */}
        {config.relatedTools.length > 0 && (
          <div style={card}>
            <h2 style={sectionHeading}>Related Free Tools</h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "0.65rem",
              }}
            >
              {config.relatedTools.map((tool) => (
                <button
                  key={tool.page}
                  type="button"
                  data-ocid={`${config.slug.replace(/-/g, "_")}.related_${tool.page.replace(/-/g, "_")}.link`}
                  onClick={() => onNavigate(tool.page)}
                  style={{
                    background: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "0.75rem",
                    padding: "0.875rem 1rem",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      marginBottom: "0.25rem",
                    }}
                  >
                    <span style={{ fontSize: "0.9rem" }}>{tool.emoji}</span>
                    <span
                      style={{
                        color: "#ffffff",
                        fontWeight: 700,
                        fontSize: "0.85rem",
                      }}
                    >
                      {tool.label}
                    </span>
                  </div>
                  <div
                    style={{
                      color: "#64748b",
                      fontSize: "0.75rem",
                      lineHeight: 1.4,
                    }}
                  >
                    {tool.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div
          style={{
            ...card,
            background: "linear-gradient(135deg, #1e293b, #0f172a)",
            border: `1px solid ${accentColor}`,
            textAlign: "center",
          }}
        >
          <h2
            style={{
              color: "#ffffff",
              fontSize: "1.15rem",
              fontWeight: 800,
              marginBottom: "0.5rem",
            }}
          >
            Ready to Process Your{" "}
            {config.toolCategory === "pdf" ? "PDF" : "Image"}?
          </h2>
          <p
            style={{
              color: "#94a3b8",
              fontSize: "0.9rem",
              marginBottom: "1.25rem",
            }}
          >
            100% free, browser-based, no file uploads to external servers.
          </p>
          <button
            type="button"
            data-ocid={`${config.slug.replace(/-/g, "_")}.bottom_cta.primary_button`}
            onClick={() => onNavigate(config.ctaPage)}
            style={{
              background: accentColor,
              color: "#fff",
              border: "none",
              borderRadius: "0.5rem",
              padding: "0.75rem 2.5rem",
              fontSize: "1rem",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {config.ctaLabel}
          </button>
        </div>

        {/* FAQ */}
        <div style={card}>
          <h2 style={sectionHeading}>Frequently Asked Questions</h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            {config.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  style={{
                    background: "#1e293b",
                    borderRadius: "0.75rem",
                    overflow: "hidden",
                    border: isOpen
                      ? `1px solid ${accentColor}`
                      : "1px solid #334155",
                  }}
                >
                  <button
                    type="button"
                    data-ocid={`${config.slug.replace(/-/g, "_")}.faq.item.${idx + 1}`}
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      padding: "0.875rem 1rem",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "0.5rem",
                    }}
                  >
                    <span
                      style={{
                        color: isOpen ? accentColorLight : "#e2e8f0",
                        fontWeight: 600,
                        fontSize: "0.875rem",
                        lineHeight: 1.4,
                      }}
                    >
                      {faq.q}
                    </span>
                    <span
                      style={{
                        color: "#64748b",
                        fontSize: "1rem",
                        flexShrink: 0,
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s",
                        display: "inline-block",
                      }}
                    >
                      ▼
                    </span>
                  </button>
                  {isOpen && (
                    <div
                      style={{
                        padding: "0 1rem 0.875rem",
                        color: "#94a3b8",
                        fontSize: "0.85rem",
                        lineHeight: 1.7,
                        borderTop: "1px solid #334155",
                        paddingTop: "0.75rem",
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
