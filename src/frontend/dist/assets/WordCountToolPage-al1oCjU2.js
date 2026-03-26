import { r as reactExports, v as trackEvent, j as jsxRuntimeExports } from "./index-BFVPq1mW.js";
import { S as SEO } from "./SEO-B1UZw1Ql.js";
function computeStats(text) {
  const trimmed = text.trim();
  const words = trimmed === "" ? 0 : trimmed.split(/\s+/).filter(Boolean).length;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const sentences = trimmed === "" ? 0 : trimmed.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
  const paragraphs = trimmed === "" ? 0 : text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length;
  const readingMinutes = words / 200;
  const speakingMinutes = words / 125;
  const fmtTime = (mins) => {
    if (mins < 1) return `${Math.round(mins * 60)}s`;
    const m = Math.floor(mins);
    const s = Math.round((mins - m) * 60);
    return s > 0 ? `${m}m ${s}s` : `${m}m`;
  };
  return {
    words,
    chars,
    charsNoSpaces,
    sentences,
    paragraphs,
    readingTime: fmtTime(readingMinutes),
    speakingTime: fmtTime(speakingMinutes)
  };
}
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does the word count tool work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The tool counts words by splitting your text on whitespace characters. It also tracks characters, sentences, paragraphs, and estimated reading/speaking times in real time."
      }
    },
    {
      "@type": "Question",
      name: "Is there a word count limit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. You can paste or type any amount of text and the tool will count it instantly. All processing happens in your browser with no server upload."
      }
    },
    {
      "@type": "Question",
      name: "How is reading time calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Reading time is estimated at 200 words per minute, which is the average adult silent reading speed. Speaking time uses 125 words per minute, the average conversational pace."
      }
    },
    {
      "@type": "Question",
      name: "Does the tool count hyphenated words as one or two words?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hyphenated words like 'well-known' are counted as one word because they are joined by a hyphen with no space. Each whitespace-separated token counts as one word."
      }
    },
    {
      "@type": "Question",
      name: "Can I use this for essays, articles, or academic writing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The tool is ideal for blog posts, college essays, academic papers, social media captions, or any content with word limits. Paste your draft and check the count instantly."
      }
    },
    {
      "@type": "Question",
      name: "Does the tool store or save my text?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Your text never leaves your device. All computation runs locally in your browser. Nothing is sent to any server."
      }
    }
  ]
};
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://docmastertools.com/"
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Utility Tools",
      item: "https://docmastertools.com/word-count-tool"
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Word Count Tool",
      item: "https://docmastertools.com/word-count-tool"
    }
  ]
};
const ACCENT = "#2563eb";
const ACCENT_LIGHT = "#38bdf8";
const cardStyle = {
  background: "#111827",
  borderRadius: "1rem",
  padding: "1.75rem",
  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
  marginBottom: "1.5rem",
  border: "1px solid #1e293b"
};
const h2Style = {
  color: "#ffffff",
  fontSize: "1.4rem",
  fontWeight: 700,
  marginBottom: "1rem",
  marginTop: 0
};
const h3Style = {
  color: "#e2e8f0",
  fontSize: "1.05rem",
  fontWeight: 600,
  marginBottom: "0.4rem",
  marginTop: 0
};
const bodyText = {
  color: "#94a3b8",
  fontSize: "0.95rem",
  lineHeight: 1.7,
  margin: 0
};
function WordCountToolPage({ onNavigate, onBack }) {
  const [text, setText] = reactExports.useState("");
  const [stats, setStats] = reactExports.useState(computeStats(""));
  const [copied, setCopied] = reactExports.useState(false);
  const debounceRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    setStats(computeStats(text));
  }, [text]);
  const handleChange = reactExports.useCallback(
    (e) => {
      setText(e.target.value);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        trackEvent("tool_used", {
          tool_name: "word_count_tool",
          tool_category: "utility_tools"
        });
      }, 1e3);
    },
    []
  );
  const handleClear = () => {
    setText("");
    setCopied(false);
  };
  const handleCopyStats = async () => {
    const statsText = `Words: ${stats.words}
Characters: ${stats.chars}
Characters (no spaces): ${stats.charsNoSpaces}
Sentences: ${stats.sentences}
Paragraphs: ${stats.paragraphs}
Reading Time: ${stats.readingTime}
Speaking Time: ${stats.speakingTime}`;
    await navigator.clipboard.writeText(statsText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
    trackEvent("tool_used", {
      tool_name: "word_count_tool",
      tool_category: "utility_tools"
    });
  };
  const statItems = [
    { label: "Words", value: stats.words, color: ACCENT_LIGHT },
    { label: "Characters", value: stats.chars, color: "#a78bfa" },
    {
      label: "Chars (no spaces)",
      value: stats.charsNoSpaces,
      color: "#34d399"
    },
    { label: "Sentences", value: stats.sentences, color: "#f97316" },
    { label: "Paragraphs", value: stats.paragraphs, color: "#f472b6" },
    { label: "Reading Time", value: stats.readingTime, color: "#fbbf24" },
    { label: "Speaking Time", value: stats.speakingTime, color: "#60a5fa" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        padding: "2rem 1rem"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SEO,
          {
            title: "Word Count Tool – Free Online Word Counter | DocMasterTools",
            description: "Count words, characters, sentences, paragraphs, and reading time instantly. Free online word counter with no signup required. 100% browser-based and private.",
            canonicalUrl: "https://docmastertools.com/word-count-tool"
          }
        ),
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
            dangerouslySetInnerHTML: { __html: JSON.stringify(breadcrumbSchema) }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { maxWidth: "900px", margin: "0 auto" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "wordcount.secondary_button",
              onClick: onBack,
              style: {
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "#1e293b",
                color: "#94a3b8",
                border: "1px solid #334155",
                borderRadius: "0.5rem",
                padding: "0.5rem 1rem",
                fontSize: "0.875rem",
                cursor: "pointer",
                marginBottom: "1.5rem",
                transition: "color 0.15s, border-color 0.15s"
              },
              onMouseEnter: (e) => {
                e.currentTarget.style.color = "#38bdf8";
                e.currentTarget.style.borderColor = "#38bdf8";
              },
              onMouseLeave: (e) => {
                e.currentTarget.style.color = "#94a3b8";
                e.currentTarget.style.borderColor = "#334155";
              },
              children: "← Back to Home"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "nav",
            {
              style: {
                marginBottom: "1rem",
                fontSize: "0.8125rem",
                color: "#64748b"
              },
              "aria-label": "breadcrumb",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => onNavigate("home"),
                    style: {
                      background: "none",
                      border: "none",
                      color: "#64748b",
                      cursor: "pointer",
                      padding: 0
                    },
                    children: "Home"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { margin: "0 0.4rem" }, children: "›" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#94a3b8" }, children: "Utility Tools" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { margin: "0 0.4rem" }, children: "›" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: ACCENT_LIGHT }, children: "Word Count Tool" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h1",
            {
              style: {
                color: "#ffffff",
                fontSize: "clamp(1.6rem, 4vw, 2.25rem)",
                fontWeight: 800,
                marginBottom: "0.75rem",
                letterSpacing: "-0.02em"
              },
              children: "Word Count Tool – Free Online Word Counter"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              style: {
                ...bodyText,
                fontSize: "1rem",
                marginBottom: "2rem",
                maxWidth: "700px"
              },
              children: "Instantly count words, characters, sentences, paragraphs, and estimated reading and speaking time. Paste your text below — results update in real time. No signup, no upload, completely private."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                style: { ...h2Style, color: ACCENT_LIGHT, marginBottom: "1.25rem" },
                children: "📝 Word Count Tool"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                "data-ocid": "wordcount.input",
                value: text,
                onChange: handleChange,
                placeholder: "Paste or type your text here… Results appear instantly.",
                rows: 10,
                style: {
                  width: "100%",
                  background: "#0f172a",
                  color: "#e2e8f0",
                  border: "1px solid #334155",
                  borderRadius: "0.625rem",
                  padding: "1rem",
                  fontSize: "0.9375rem",
                  lineHeight: 1.65,
                  resize: "vertical",
                  outline: "none",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                  marginBottom: "1.25rem"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                  gap: "0.75rem",
                  marginBottom: "1.25rem"
                },
                children: statItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      background: "#0f172a",
                      border: "1px solid #1e293b",
                      borderRadius: "0.75rem",
                      padding: "0.875rem 1rem",
                      textAlign: "center"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            color: item.color,
                            fontSize: "1.4rem",
                            fontWeight: 800,
                            lineHeight: 1
                          },
                          children: item.value
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            color: "#64748b",
                            fontSize: "0.75rem",
                            marginTop: "0.3rem"
                          },
                          children: item.label
                        }
                      )
                    ]
                  },
                  item.label
                ))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "0.75rem", flexWrap: "wrap" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "wordcount.delete_button",
                  onClick: handleClear,
                  style: {
                    background: "#1e293b",
                    color: "#94a3b8",
                    border: "1px solid #334155",
                    borderRadius: "0.5rem",
                    padding: "0.6rem 1.25rem",
                    fontSize: "0.875rem",
                    cursor: "pointer",
                    transition: "all 0.15s"
                  },
                  onMouseEnter: (e) => {
                    e.currentTarget.style.background = "#0f172a";
                    e.currentTarget.style.borderColor = "#ef4444";
                    e.currentTarget.style.color = "#f87171";
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.background = "#1e293b";
                    e.currentTarget.style.borderColor = "#334155";
                    e.currentTarget.style.color = "#94a3b8";
                  },
                  children: "Clear"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "wordcount.secondary_button",
                  onClick: handleCopyStats,
                  style: {
                    background: copied ? "#16a34a" : ACCENT,
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "0.5rem",
                    padding: "0.6rem 1.25rem",
                    fontSize: "0.875rem",
                    cursor: "pointer",
                    transition: "all 0.15s",
                    fontWeight: 600
                  },
                  onMouseEnter: (e) => {
                    if (!copied) e.currentTarget.style.background = "#1d4ed8";
                  },
                  onMouseLeave: (e) => {
                    if (!copied) e.currentTarget.style.background = ACCENT;
                  },
                  children: copied ? "✓ Copied!" : "Copy Stats"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: h2Style, children: "Why Use an Online Word Counter?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: bodyText, children: "Whether you are writing a college essay, a blog post, a professional report, or filling out a government application form, keeping track of your word count is essential. Most platforms — academic portals, job application forms, content management systems, and social media — enforce strict word or character limits. Going over or under a limit can mean your work gets rejected, scored down, or truncated." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { ...bodyText, marginTop: "0.75rem" }, children: "Our free online word counter eliminates the guesswork. Paste your text and instantly see every key metric: word count, character count with and without spaces, sentence count, paragraph count, and estimated reading and speaking time. No downloading software, no creating an account — just accurate, real-time results." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { ...bodyText, marginTop: "0.75rem" }, children: "Students use it to hit essay requirements. Bloggers use it to match recommended article lengths for SEO. Authors use it to track chapter progress. Job seekers use it to tighten cover letters. Teachers use it to check submission lengths. The word count tool is one of the most universally useful writing utilities available — and it is completely free." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: h2Style, children: "How to Use the Word Count Tool" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: { display: "flex", flexDirection: "column", gap: "1rem" },
                children: [
                  {
                    step: 1,
                    title: "Open the Word Count Tool",
                    body: "Scroll to the top of this page. The tool is ready to use immediately — no login, no setup required."
                  },
                  {
                    step: 2,
                    title: "Paste or Type Your Text",
                    body: "Click inside the text area and paste your document using Ctrl+V (Windows) or Cmd+V (Mac). You can also type directly. The counter starts working as soon as text is present."
                  },
                  {
                    step: 3,
                    title: "Read Your Statistics",
                    body: "Below the text area, seven statistics update in real time: word count, total characters, characters without spaces, sentences, paragraphs, estimated reading time (200 wpm), and estimated speaking time (125 wpm)."
                  },
                  {
                    step: 4,
                    title: "Revise Until You Hit Your Target",
                    body: "Continue editing directly in the text area. Every change — adding a word, removing a sentence — is reflected immediately. No need to click a button or reload."
                  },
                  {
                    step: 5,
                    title: "Copy the Stats if Needed",
                    body: "Click the 'Copy Stats' button to copy all seven metrics to your clipboard in plain text format. Useful for pasting into submission notes, tracking documents, or sharing with clients."
                  }
                ].map(({ step, title, body }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
                            width: "2rem",
                            height: "2rem",
                            borderRadius: "50%",
                            background: ACCENT,
                            color: "#ffffff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.875rem",
                            fontWeight: 700,
                            flexShrink: 0
                          },
                          children: step
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: h3Style, children: title }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: bodyText, children: body })
                      ] })
                    ]
                  },
                  step
                ))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: h2Style, children: "Tips for Accurate Word Count" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "ul",
              {
                style: {
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.875rem"
                },
                children: [
                  {
                    tip: "Remove footnotes and citations first",
                    body: "If your word count target applies only to the body text, delete footnotes, bibliographies, or reference lists before pasting."
                  },
                  {
                    tip: "Paste plain text to avoid hidden characters",
                    body: "When copying from Word or Google Docs, some formatting or hidden markup can skew the count. Use Edit → Paste as Plain Text or paste into Notepad first."
                  },
                  {
                    tip: "Check character limits for social media",
                    body: "Twitter/X allows 280 characters, LinkedIn captions up to 3,000, and Instagram bios 150. Use the character count metric to verify before posting."
                  },
                  {
                    tip: "Use paragraph count for structured documents",
                    body: "Academic submissions and formal reports often require a minimum number of paragraphs. The paragraph counter helps you verify structure at a glance."
                  },
                  {
                    tip: "Target 7-minute reading time for blog posts",
                    body: "Research shows 7-minute reads (approx. 1,400–1,600 words) have the highest engagement on platforms like Medium. Use the reading time metric to optimize your articles."
                  },
                  {
                    tip: "Speaking time helps with presentations",
                    body: "If you are preparing a speech or script, use the speaking time estimate (based on 125 wpm) to ensure your content fits your allotted time slot."
                  }
                ].map(({ tip, body }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "li",
                  {
                    style: {
                      display: "flex",
                      gap: "0.75rem",
                      alignItems: "flex-start"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: {
                            color: ACCENT_LIGHT,
                            marginTop: "0.15rem",
                            flexShrink: 0
                          },
                          children: "✓"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { style: { color: "#e2e8f0", fontSize: "0.9375rem" }, children: [
                          tip,
                          ":"
                        ] }),
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#94a3b8", fontSize: "0.9375rem" }, children: body })
                      ] })
                    ]
                  },
                  tip
                ))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: h2Style, children: "Frequently Asked Questions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: { display: "flex", flexDirection: "column", gap: "1.25rem" },
                children: faqSchema.mainEntity.map((faq, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    "data-ocid": `wordcount.item.${i + 1}`,
                    style: {
                      borderBottom: i < faqSchema.mainEntity.length - 1 ? "1px solid #1e293b" : "none",
                      paddingBottom: i < faqSchema.mainEntity.length - 1 ? "1.25rem" : 0
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "h3",
                        {
                          style: {
                            ...h3Style,
                            color: ACCENT_LIGHT,
                            marginBottom: "0.375rem"
                          },
                          children: [
                            "Q: ",
                            faq.name
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: bodyText, children: faq.acceptedAnswer.text })
                    ]
                  },
                  i
                ))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: h2Style, children: "Related Free Tools" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                  gap: "0.75rem",
                  marginBottom: "1.5rem"
                },
                children: [
                  {
                    label: "PDF Tools",
                    page: "pdf-tools",
                    emoji: "📄",
                    desc: "Merge, compress, convert PDFs"
                  },
                  {
                    label: "Image Tools",
                    page: "image-tools",
                    emoji: "🖼️",
                    desc: "Resize, compress, convert images"
                  },
                  {
                    label: "Resume Builder",
                    page: "resume-builder",
                    emoji: "📋",
                    desc: "Create professional resumes"
                  },
                  {
                    label: "Calculator Hub",
                    page: "calculators",
                    emoji: "🧮",
                    desc: "Academic & financial calculators"
                  }
                ].map((tool) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "wordcount.link",
                    onClick: () => onNavigate(tool.page),
                    style: {
                      background: "#0f172a",
                      border: "1px solid #1e293b",
                      borderRadius: "0.75rem",
                      padding: "1rem",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.15s"
                    },
                    onMouseEnter: (e) => {
                      e.currentTarget.style.borderColor = ACCENT;
                      e.currentTarget.style.background = "#1e293b";
                    },
                    onMouseLeave: (e) => {
                      e.currentTarget.style.borderColor = "#1e293b";
                      e.currentTarget.style.background = "#0f172a";
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "1.5rem", marginBottom: "0.375rem" }, children: tool.emoji }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            color: "#ffffff",
                            fontSize: "0.875rem",
                            fontWeight: 600
                          },
                          children: tool.label
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            color: "#64748b",
                            fontSize: "0.75rem",
                            marginTop: "0.25rem"
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
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                marginBottom: "2rem"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "wordcount.primary_button",
                    onClick: () => onNavigate("pdf-tools"),
                    style: {
                      background: ACCENT,
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "0.625rem",
                      padding: "0.875rem 1.75rem",
                      fontSize: "1rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "background 0.15s"
                    },
                    onMouseEnter: (e) => {
                      e.currentTarget.style.background = "#1d4ed8";
                    },
                    onMouseLeave: (e) => {
                      e.currentTarget.style.background = ACCENT;
                    },
                    children: "Open PDF Tools →"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "wordcount.secondary_button",
                    onClick: () => onNavigate("resume-builder"),
                    style: {
                      background: "transparent",
                      color: ACCENT_LIGHT,
                      border: `1px solid ${ACCENT_LIGHT}`,
                      borderRadius: "0.625rem",
                      padding: "0.875rem 1.75rem",
                      fontSize: "1rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.15s"
                    },
                    onMouseEnter: (e) => {
                      e.currentTarget.style.background = "rgba(56,189,248,0.08)";
                    },
                    onMouseLeave: (e) => {
                      e.currentTarget.style.background = "transparent";
                    },
                    children: "Build Your Resume →"
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
  WordCountToolPage as default
};
