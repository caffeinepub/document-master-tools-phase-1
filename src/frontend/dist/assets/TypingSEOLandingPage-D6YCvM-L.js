import { r as reactExports, j as jsxRuntimeExports } from "./index-5lKdoCW0.js";
import { B as BreadcrumbSchema } from "./BreadcrumbSchema-Dz0rGNZp.js";
import { S as SEO } from "./SEO-CrxvtZlJ.js";
import { T as TypingInternalLinks, a as TypingFAQ } from "./TypingInternalLinks-2MwN_oMM.js";
import { T as TypingProgressPanel } from "./TypingProgressPanel-DAXdG6S-.js";
import { u as updateTypingProgress } from "./typingProgress-CQm7G-tq.js";
const SAMPLE_TEXTS = [
  "The quick brown fox jumps over the lazy dog. Practice makes perfect and consistent effort leads to improvement over time. Keep typing to build your speed and accuracy.",
  "Typing speed improves with daily practice. Focus on accuracy first and speed will follow naturally as your fingers learn the position of every key on the keyboard.",
  "A good typist does not look at the keyboard while typing. Train your muscle memory and your speed will increase significantly over a few weeks of consistent practice.",
  "Technology has changed the way we communicate today. Fast and accurate typing is now an essential skill for every professional working in any field or industry.",
  "The internet has connected billions of people around the world. Information travels at the speed of light and communication has never been easier or more accessible.",
  "Document processing tools help you work smarter and faster. From converting files to resizing images the right tools make complex tasks simple and quick to complete."
];
function TypingSEOLandingPage({ config, onNavigate }) {
  const [selectedDuration, setSelectedDuration] = reactExports.useState(
    config.defaultDuration ?? 3
  );
  const [testState, setTestState] = reactExports.useState("idle");
  const [sampleText, setSampleText] = reactExports.useState(SAMPLE_TEXTS[0]);
  const [typed, setTyped] = reactExports.useState("");
  const [timeLeft, setTimeLeft] = reactExports.useState((config.defaultDuration ?? 3) * 60);
  const [wpm, setWpm] = reactExports.useState(0);
  const [accuracy, setAccuracy] = reactExports.useState(100);
  const [mistakes, setMistakes] = reactExports.useState(0);
  const [finalStats, setFinalStats] = reactExports.useState(null);
  const inputRef = reactExports.useRef(null);
  const timerRef = reactExports.useRef(null);
  const startTimeRef = reactExports.useRef(0);
  const liveStatsRef = reactExports.useRef({ wpm: 0, accuracy: 100, mistakes: 0 });
  const calcStats = reactExports.useCallback(
    (currentTyped, elapsed) => {
      const words = currentTyped.trim().split(/\s+/).filter(Boolean).length;
      const elapsedMinutes = elapsed / 60;
      const currentWpm = elapsedMinutes > 0 ? Math.round(words / elapsedMinutes) : 0;
      let errors = 0;
      for (let i = 0; i < currentTyped.length; i++) {
        if (currentTyped[i] !== sampleText[i]) errors++;
      }
      const acc = currentTyped.length > 0 ? Math.max(
        0,
        Math.round(
          (currentTyped.length - errors) / currentTyped.length * 100
        )
      ) : 100;
      setWpm(currentWpm);
      setAccuracy(acc);
      setMistakes(errors);
      liveStatsRef.current = {
        wpm: currentWpm,
        accuracy: acc,
        mistakes: errors
      };
    },
    [sampleText]
  );
  const stopTest = reactExports.useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setFinalStats({ ...liveStatsRef.current });
    setTestState("finished");
    updateTypingProgress(
      liveStatsRef.current.wpm,
      selectedDuration * 60 - timeLeft
    );
  }, [selectedDuration, timeLeft]);
  const startTest = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const randomText = SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)];
    setSampleText(randomText);
    setTyped("");
    setTimeLeft(selectedDuration * 60);
    setWpm(0);
    setAccuracy(100);
    setMistakes(0);
    setFinalStats(null);
    setTestState("running");
    startTimeRef.current = Date.now();
    setTimeout(() => {
      var _a;
      return (_a = inputRef.current) == null ? void 0 : _a.focus();
    }, 50);
  };
  reactExports.useEffect(() => {
    if (testState === "running") {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            stopTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1e3);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [testState, stopTest]);
  const handleInput = (e) => {
    if (testState !== "running") return;
    const value = e.target.value;
    setTyped(value);
    const elapsed = (Date.now() - startTimeRef.current) / 1e3;
    calcStats(value, elapsed);
    if (value.length >= sampleText.length) stopTest();
  };
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m > 0 ? `${m}:${s.toString().padStart(2, "0")}` : `${s}s`;
  };
  const renderColoredText = () => sampleText.split("").map((char, i) => {
    let color = "#94a3b8";
    if (i < typed.length) color = typed[i] === char ? "#4ade80" : "#f87171";
    return (
      // biome-ignore lint/suspicious/noArrayIndexKey: character-level render requires index key
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color, transition: "color 0.08s" }, children: char }, i)
    );
  });
  const formatDurationLabel = (d) => {
    if (d < 1) return `${Math.round(d * 60)}s`;
    return `${d} min`;
  };
  const handleDurationChange = (d) => {
    setSelectedDuration(d);
    if (testState !== "running") {
      setTimeLeft(d * 60);
      setTestState("idle");
      setFinalStats(null);
      setTyped("");
    }
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
  const statBox = {
    background: "#1e293b",
    borderRadius: "0.75rem",
    padding: "0.75rem 1.25rem",
    textAlign: "center",
    minWidth: "80px",
    flex: "1 1 80px"
  };
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
                name: "Typing Tools",
                url: "https://docmastertools.com/typing-test"
              },
              { name: config.h1, url: `https://docmastertools.com/${config.slug}` }
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { maxWidth: "860px", margin: "0 auto" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "1.75rem" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "h1",
              {
                style: {
                  color: "#ffffff",
                  fontSize: "clamp(1.5rem, 4vw, 2.1rem)",
                  fontWeight: 800,
                  marginBottom: "0.5rem"
                },
                children: [
                  "⌨️ ",
                  config.h1
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#94a3b8", fontSize: "1rem", lineHeight: 1.7 }, children: config.intro })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: card, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: sectionHeading, children: config.whatIsSection.heading }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.8 }, children: config.whatIsSection.body })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: card, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: sectionHeading, children: "Try the Typing Test Now" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  display: "flex",
                  gap: "0.5rem",
                  marginBottom: "1.25rem",
                  flexWrap: "wrap"
                },
                children: (config.durations ?? [1, 3, 5]).map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": `${config.slug.replace(/-/g, "_")}.duration_${String(d).replace(".", "_")}.button`,
                    onClick: () => handleDurationChange(d),
                    style: {
                      background: selectedDuration === d ? "#2563eb" : "#1e293b",
                      color: selectedDuration === d ? "#fff" : "#94a3b8",
                      border: selectedDuration === d ? "2px solid #2563eb" : "2px solid #334155",
                      borderRadius: "0.5rem",
                      padding: "0.5rem 1.25rem",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      cursor: "pointer"
                    },
                    children: formatDurationLabel(d)
                  },
                  d
                ))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  display: "flex",
                  gap: "0.75rem",
                  marginBottom: "1.25rem",
                  flexWrap: "wrap"
                },
                children: [
                  {
                    label: "Time",
                    value: formatTime(timeLeft),
                    color: timeLeft <= 10 && testState === "running" ? "#f87171" : "#38bdf8"
                  },
                  { label: "WPM", value: wpm, color: "#4ade80" },
                  { label: "Accuracy", value: `${accuracy}%`, color: "#facc15" },
                  { label: "Mistakes", value: mistakes, color: "#f87171" }
                ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: statBox, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        color: s.color,
                        fontSize: "1.4rem",
                        fontWeight: 700
                      },
                      children: s.value
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: { color: "#64748b", fontSize: "0.7rem", marginTop: 2 },
                      children: s.label
                    }
                  )
                ] }, s.label))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  background: "#1e293b",
                  borderRadius: "0.75rem",
                  padding: "1rem 1.25rem",
                  fontSize: "1.05rem",
                  lineHeight: 1.9,
                  letterSpacing: "0.02em",
                  marginBottom: "1.25rem",
                  wordBreak: "break-word",
                  userSelect: "none"
                },
                children: renderColoredText()
              }
            ),
            testState === "running" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                ref: inputRef,
                value: typed,
                onChange: handleInput,
                rows: 3,
                placeholder: "Start typing here...",
                "data-ocid": `${config.slug.replace(/-/g, "_")}.textarea`,
                style: {
                  width: "100%",
                  background: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: "0.75rem",
                  color: "#f1f5f9",
                  fontSize: "1rem",
                  padding: "0.75rem 1rem",
                  resize: "none",
                  outline: "none",
                  marginBottom: "1.25rem",
                  boxSizing: "border-box",
                  fontFamily: "inherit"
                }
              }
            ),
            testState === "finished" && finalStats && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  background: "#1e293b",
                  borderRadius: "0.75rem",
                  padding: "1.25rem",
                  textAlign: "center",
                  marginBottom: "1.25rem"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        color: "#4ade80",
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        marginBottom: "0.5rem"
                      },
                      children: "Test Complete!"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: "#cbd5e1", fontSize: "0.95rem" }, children: [
                    "Final WPM:",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { style: { color: "#38bdf8" }, children: finalStats.wpm }),
                    " |  Accuracy:",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { style: { color: "#facc15" }, children: [
                      finalStats.accuracy,
                      "%"
                    ] }),
                    " |  Mistakes:",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { style: { color: "#f87171" }, children: finalStats.mistakes })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "0.75rem", flexWrap: "wrap" }, children: [
              testState === "idle" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": `${config.slug.replace(/-/g, "_")}.start.primary_button`,
                  onClick: startTest,
                  style: {
                    background: "#2563eb",
                    color: "#fff",
                    border: "none",
                    borderRadius: "0.5rem",
                    padding: "0.65rem 1.75rem",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    cursor: "pointer"
                  },
                  children: "Start Test"
                }
              ),
              testState === "running" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": `${config.slug.replace(/-/g, "_")}.stop.secondary_button`,
                  onClick: stopTest,
                  style: {
                    background: "#dc2626",
                    color: "#fff",
                    border: "none",
                    borderRadius: "0.5rem",
                    padding: "0.65rem 1.75rem",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    cursor: "pointer"
                  },
                  children: "Stop"
                }
              ),
              testState === "finished" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": `${config.slug.replace(/-/g, "_")}.restart.primary_button`,
                    onClick: startTest,
                    style: {
                      background: "#2563eb",
                      color: "#fff",
                      border: "none",
                      borderRadius: "0.5rem",
                      padding: "0.65rem 1.75rem",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      cursor: "pointer"
                    },
                    children: "Try Again"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": `${config.slug.replace(/-/g, "_")}.full_test.secondary_button`,
                    onClick: () => onNavigate("typing-test"),
                    style: {
                      background: "#1e293b",
                      color: "#94a3b8",
                      border: "1px solid #334155",
                      borderRadius: "0.5rem",
                      padding: "0.65rem 1.75rem",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      cursor: "pointer"
                    },
                    children: "Full Typing Platform"
                  }
                )
              ] })
            ] })
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
                            background: "#2563eb",
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
                          "div",
                          {
                            style: {
                              color: "#e2e8f0",
                              fontWeight: 700,
                              fontSize: "0.9rem",
                              marginBottom: "0.2rem"
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
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: "1rem"
                },
                children: config.benefits.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      background: "#1e293b",
                      borderRadius: "0.75rem",
                      padding: "1rem 1.25rem",
                      borderLeft: "3px solid #10b981"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            color: "#34d399",
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
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
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
          config.extraContent && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: card, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: sectionHeading, children: config.extraContent.heading }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                style: { color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.8 },
                children: config.extraContent.body
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TypingProgressPanel, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                ...card,
                background: "linear-gradient(135deg, #1e3a5f, #0f172a)",
                border: "1px solid #2563eb",
                textAlign: "center"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h2",
                  {
                    style: {
                      color: "#ffffff",
                      fontSize: "1.2rem",
                      fontWeight: 800,
                      marginBottom: "0.5rem"
                    },
                    children: config.ctaHeading
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
                    children: config.ctaBody
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
                          "data-ocid": `${config.slug.replace(/-/g, "_")}.cta.primary_button`,
                          onClick: () => onNavigate("typing-test"),
                          style: {
                            background: "#2563eb",
                            color: "#fff",
                            border: "none",
                            borderRadius: "0.5rem",
                            padding: "0.75rem 2rem",
                            fontSize: "1rem",
                            fontWeight: 700,
                            cursor: "pointer"
                          },
                          children: "Start Typing Test"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          "data-ocid": `${config.slug.replace(/-/g, "_")}.cta_games.secondary_button`,
                          onClick: () => onNavigate("typing-games"),
                          style: {
                            background: "#1e293b",
                            color: "#94a3b8",
                            border: "1px solid #334155",
                            borderRadius: "0.5rem",
                            padding: "0.75rem 2rem",
                            fontSize: "1rem",
                            fontWeight: 600,
                            cursor: "pointer"
                          },
                          children: "Try Typing Games"
                        }
                      )
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TypingInternalLinks,
            {
              onNavigate,
              currentPage: config.slug
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TypingFAQ,
            {
              faqs: config.faqs,
              howToSteps: config.howToSteps,
              howToName: config.howToName
            }
          )
        ] })
      ]
    }
  );
}
export {
  TypingSEOLandingPage as T
};
