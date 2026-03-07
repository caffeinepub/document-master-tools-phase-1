import { useState } from "react";

export interface FAQItem {
  q: string;
  a: string;
}

export interface HowToStep {
  name: string;
  text: string;
}

interface TypingFAQProps {
  faqs: FAQItem[];
  howToSteps?: HowToStep[];
  howToName?: string;
}

export default function TypingFAQ({
  faqs,
  howToSteps,
  howToName = "How to Practice Typing",
}: TypingFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Build FAQ JSON-LD
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  // Build HowTo JSON-LD
  const howToSchema = howToSteps
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: howToName,
        step: howToSteps.map((step, idx) => ({
          "@type": "HowToStep",
          position: idx + 1,
          name: step.name,
          text: step.text,
        })),
      }
    : null;

  return (
    <div
      data-ocid="typing_faq.panel"
      style={{
        background: "#111827",
        borderRadius: "1rem",
        padding: "1.5rem 1.75rem",
        marginBottom: "1.5rem",
        boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
      }}
    >
      {/* JSON-LD schemas */}
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data is safe */}
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data is safe
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {howToSchema && (
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data is safe
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data is safe
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}

      <h2
        style={{
          color: "#ffffff",
          fontSize: "1.05rem",
          fontWeight: 700,
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        ❓ Frequently Asked Questions
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          const ocidIndex = idx + 1;
          return (
            <div
              key={faq.q}
              style={{
                background: "#1e293b",
                borderRadius: "0.75rem",
                overflow: "hidden",
                border: isOpen ? "1px solid #2563eb" : "1px solid #334155",
                transition: "border-color 0.15s",
              }}
            >
              <button
                type="button"
                data-ocid={`typing_faq.item.${ocidIndex}`}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
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
                    color: isOpen ? "#60a5fa" : "#e2e8f0",
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
  );
}
