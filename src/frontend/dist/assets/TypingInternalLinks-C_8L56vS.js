import { r as reactExports, j as jsxRuntimeExports } from "./index-BFVPq1mW.js";
function TypingFAQ({
  faqs,
  howToSteps,
  howToName = "How to Practice Typing"
}) {
  const [openIndex, setOpenIndex] = reactExports.useState(null);
  reactExports.useEffect(() => {
  }, [faqs]);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a
      }
    }))
  };
  const howToSchema = howToSteps ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: howToName,
    step: howToSteps.map((step, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      name: step.name,
      text: step.text
    }))
  } : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "typing_faq.panel",
      style: {
        background: "#111827",
        borderRadius: "1rem",
        padding: "1.5rem 1.75rem",
        marginBottom: "1.5rem",
        boxShadow: "0 4px 20px rgba(0,0,0,0.25)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "script",
          {
            type: "application/ld+json",
            dangerouslySetInnerHTML: { __html: JSON.stringify(faqSchema) }
          }
        ),
        howToSchema && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "script",
          {
            type: "application/ld+json",
            dangerouslySetInnerHTML: { __html: JSON.stringify(howToSchema) }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h2",
          {
            style: {
              color: "#ffffff",
              fontSize: "1.05rem",
              fontWeight: 700,
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            },
            children: "❓ Frequently Asked Questions"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", gap: "0.5rem" }, children: faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          const ocidIndex = idx + 1;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                background: "#1e293b",
                borderRadius: "0.75rem",
                overflow: "hidden",
                border: isOpen ? "1px solid #2563eb" : "1px solid #334155",
                transition: "border-color 0.15s"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    "data-ocid": `typing_faq.item.${ocidIndex}`,
                    onClick: () => setOpenIndex(isOpen ? null : idx),
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
                            color: isOpen ? "#60a5fa" : "#e2e8f0",
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
        }) })
      ]
    }
  );
}
const ALL_LINKS = [
  {
    page: "typing-test",
    label: "Typing Test",
    desc: "Full practice with lessons & certificate",
    emoji: "⌨️"
  },
  {
    page: "typing-games",
    label: "Typing Games",
    desc: "Speed Race, Falling Words, Word Shooter",
    emoji: "🎮"
  },
  {
    page: "daily-typing-challenge",
    label: "Daily Typing Challenge",
    desc: "Fresh challenge every day",
    emoji: "🔥"
  },
  {
    page: "typing-practice",
    label: "Typing Practice",
    desc: "General practice guide & drills",
    emoji: "📝"
  },
  {
    page: "learn-touch-typing",
    label: "Learn Touch Typing",
    desc: "Finger placement & technique",
    emoji: "🖐️"
  },
  {
    page: "free-typing-lessons",
    label: "Free Typing Lessons",
    desc: "Step-by-step beginner lessons",
    emoji: "📚"
  },
  {
    page: "typing-speed-practice",
    label: "Typing Speed Practice",
    desc: "Speed drills to boost WPM",
    emoji: "⚡"
  },
  {
    page: "typing-test-1-minute",
    label: "1 Minute Test",
    desc: "Quick 60-second speed check",
    emoji: "⏱️"
  },
  {
    page: "typing-test-3-minute",
    label: "3 Minute Test",
    desc: "Balanced WPM test",
    emoji: "⏱️"
  },
  {
    page: "typing-test-5-minute",
    label: "5 Minute Test",
    desc: "Endurance test",
    emoji: "⏱️"
  },
  {
    page: "typing-speed-test",
    label: "Typing Speed Test",
    desc: "Measure WPM instantly",
    emoji: "🚀"
  },
  {
    page: "typing-test-online",
    label: "Typing Test Online",
    desc: "Browser-based speed test",
    emoji: "🌐"
  },
  {
    page: "typing-test-free",
    label: "Free Typing Test",
    desc: "No signup, no cost",
    emoji: "🆓"
  },
  {
    page: "check-typing-speed",
    label: "Check Typing Speed",
    desc: "Instant WPM checker",
    emoji: "⚡"
  },
  {
    page: "typing-test-with-certificate",
    label: "Test with Certificate",
    desc: "Download proof of speed",
    emoji: "🏆"
  },
  {
    page: "typing-practice-online",
    label: "Practice Online",
    desc: "Structured daily exercises",
    emoji: "🎯"
  },
  {
    page: "touch-typing-practice",
    label: "Touch Typing",
    desc: "10-finger technique",
    emoji: "🖐️"
  },
  {
    page: "improve-typing-speed",
    label: "Improve Speed",
    desc: "Proven methods & tips",
    emoji: "📈"
  },
  {
    page: "learn-typing-online",
    label: "Learn Typing",
    desc: "Beginner to advanced",
    emoji: "📖"
  },
  {
    page: "typing-test-for-jobs",
    label: "Test for Jobs",
    desc: "Government & office prep",
    emoji: "💼"
  },
  {
    page: "typing-test-30-seconds",
    label: "30 Second Test",
    desc: "Quick burst speed check",
    emoji: "⚡"
  },
  {
    page: "typing-test-2-minute",
    label: "2 Minute Test",
    desc: "Balanced WPM benchmark",
    emoji: "⏱️"
  },
  {
    page: "typing-test-10-minute",
    label: "10 Minute Test",
    desc: "Full endurance test",
    emoji: "🏋️"
  }
];
function TypingInternalLinks({
  onNavigate,
  currentPage
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "typing_links.panel",
      style: {
        background: "#111827",
        borderRadius: "1rem",
        padding: "1.5rem 1.75rem",
        marginBottom: "1.5rem",
        boxShadow: "0 4px 20px rgba(0,0,0,0.25)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h2",
          {
            style: {
              color: "#ffffff",
              fontSize: "1.05rem",
              fontWeight: 700,
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            },
            children: "🔗 More Typing Tools & Resources"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "0.65rem"
            },
            children: ALL_LINKS.map((link) => {
              const isActive = link.page === currentPage;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "data-ocid": `typing_links.${link.page.replace(/-/g, "_")}.link`,
                  onClick: () => onNavigate(link.page),
                  style: {
                    background: isActive ? "#1e3a5f" : "#1e293b",
                    border: isActive ? "1px solid #2563eb" : "1px solid #334155",
                    borderRadius: "0.75rem",
                    padding: "0.875rem 1rem",
                    textAlign: "left",
                    cursor: isActive ? "default" : "pointer",
                    transition: "all 0.15s"
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
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "0.9rem" }, children: link.emoji }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              style: {
                                color: isActive ? "#60a5fa" : "#ffffff",
                                fontWeight: 700,
                                fontSize: "0.85rem"
                              },
                              children: link.label
                            }
                          ),
                          isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              style: {
                                marginLeft: "auto",
                                background: "#2563eb",
                                color: "#fff",
                                fontSize: "0.6rem",
                                padding: "1px 5px",
                                borderRadius: "0.2rem",
                                fontWeight: 700,
                                whiteSpace: "nowrap"
                              },
                              children: "Current"
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
                        children: link.desc
                      }
                    )
                  ]
                },
                link.page
              );
            })
          }
        )
      ]
    }
  );
}
export {
  TypingInternalLinks as T,
  TypingFAQ as a
};
