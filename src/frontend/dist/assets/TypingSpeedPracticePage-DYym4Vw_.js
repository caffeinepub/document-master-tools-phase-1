import { r as reactExports, j as jsxRuntimeExports } from "./index-BK1nStnW.js";
import { B as BreadcrumbSchema } from "./BreadcrumbSchema-DzefBAjw.js";
import { S as SEO } from "./SEO-C_L06y5W.js";
import { T as TypingInternalLinks, a as TypingFAQ } from "./TypingInternalLinks-C6q0bWF2.js";
import { T as TypingProgressPanel } from "./TypingProgressPanel-CpgEhKOy.js";
import { u as updateTypingProgress } from "./typingProgress-CQm7G-tq.js";
const WORD_SPRINT_WORDS = "the and for are but not you all can her was one our out day get has him his how man new now old see two way who boy did its let put say she too use cat dog big run fly sun fun map cup";
const SPEED_BURST_TEXT = "The best way to improve your typing speed is to practice every single day. Focus on accuracy and the speed will follow naturally.";
const PARAGRAPH_DRILL_TEXT = "Typing faster requires both muscle memory and mental focus. Begin each session by warming up with simple home row exercises. Once your fingers are ready, push yourself slightly beyond your comfort zone. Track your best WPM after each session and aim to beat it next time. Consistent daily practice of fifteen minutes will show measurable results within weeks.";
const FAQS = [
  {
    q: "What is WPM and how is it calculated?",
    a: "WPM stands for Words Per Minute. It is calculated by dividing the number of words typed by the time in minutes. Standard word length is 5 characters."
  },
  {
    q: "What is the average typing speed?",
    a: "The average typing speed is 40–60 WPM. Professional typists typically type at 65–75 WPM. Speed above 80 WPM is considered advanced."
  },
  {
    q: "How can I increase my WPM quickly?",
    a: "The fastest way to increase WPM is to focus on accuracy first, then gradually push your speed slightly beyond your comfort zone each session."
  },
  {
    q: "Does typing speed matter for jobs?",
    a: "Yes. Many office, data entry, and admin roles require 40–60 WPM. Higher speeds are a competitive advantage for remote work and content creation."
  },
  {
    q: "How long until I see improvement in typing speed?",
    a: "Most people see measurable WPM improvement within 2–3 weeks of daily practice. Consistent 15-minute sessions produce the best results."
  }
];
const HOW_TO_STEPS = [
  {
    name: "Warm up with Word Sprint",
    text: "Type 15 common words as fast as you can. This activates your finger muscles and establishes a rhythm."
  },
  {
    name: "Move to Speed Burst for timed pressure",
    text: "The 30-second Speed Burst replicates real typing pressure. Focus on completing as much as possible accurately."
  },
  {
    name: "Practice Paragraph Drill for sustained speed",
    text: "Paragraph Drill builds endurance. Maintain consistent speed and accuracy over a longer text."
  },
  {
    name: "Check Your Progress panel for improvement",
    text: "Review your Best WPM and session history in the Your Progress panel to track gains over time."
  }
];
function getDrillText(mode) {
  if (mode === "sprint") return WORD_SPRINT_WORDS;
  if (mode === "burst") return SPEED_BURST_TEXT;
  return PARAGRAPH_DRILL_TEXT;
}
function TypingSpeedPracticePage({
  onNavigate,
  onBack
}) {
  const [mode, setMode] = reactExports.useState("sprint");
  const [drillState, setDrillState] = reactExports.useState("idle");
  const [typed, setTyped] = reactExports.useState("");
  const [wpm, setWpm] = reactExports.useState(0);
  const [accuracy, setAccuracy] = reactExports.useState(100);
  const [mistakes, setMistakes] = reactExports.useState(0);
  const [timeLeft, setTimeLeft] = reactExports.useState(30);
  const [sessionBestWpm, setSessionBestWpm] = reactExports.useState(0);
  const startTimeRef = reactExports.useRef(0);
  const timerRef = reactExports.useRef(null);
  const inputRef = reactExports.useRef(null);
  const liveWpmRef = reactExports.useRef(0);
  const drillText = getDrillText(mode);
  const calcStats = reactExports.useCallback(
    (currentTyped) => {
      const elapsed = (Date.now() - startTimeRef.current) / 1e3;
      const words = currentTyped.trim().split(/\s+/).filter(Boolean).length;
      const mins = elapsed / 60 || 1 / 60;
      const currentWpm = Math.round(words / mins);
      let errors = 0;
      for (let i = 0; i < currentTyped.length; i++) {
        if (currentTyped[i] !== drillText[i]) errors++;
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
      liveWpmRef.current = currentWpm;
      return { wpm: currentWpm, elapsed };
    },
    [drillText]
  );
  const finishDrill = reactExports.useCallback((finalWpm, elapsedSecs) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setDrillState("finished");
    setSessionBestWpm((prev) => Math.max(prev, finalWpm));
    updateTypingProgress(finalWpm, Math.round(elapsedSecs));
  }, []);
  reactExports.useEffect(() => {
    if (drillState === "running" && mode === "burst") {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            finishDrill(liveWpmRef.current, 30);
            return 0;
          }
          return prev - 1;
        });
      }, 1e3);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [drillState, mode, finishDrill]);
  const startDrill = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTyped("");
    setWpm(0);
    setAccuracy(100);
    setMistakes(0);
    setTimeLeft(30);
    setDrillState("running");
    startTimeRef.current = Date.now();
    setTimeout(() => {
      var _a;
      return (_a = inputRef.current) == null ? void 0 : _a.focus();
    }, 50);
  };
  const handleModeChange = (m) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setMode(m);
    setTyped("");
    setWpm(0);
    setAccuracy(100);
    setMistakes(0);
    setTimeLeft(30);
    setDrillState("idle");
  };
  const handleInput = (e) => {
    if (drillState !== "running") return;
    const value = e.target.value;
    setTyped(value);
    const { wpm: currentWpm, elapsed } = calcStats(value);
    if (value.length >= drillText.length) {
      finishDrill(currentWpm, elapsed);
    }
  };
  const renderText = () => drillText.split("").map((char, i) => {
    let color = "#94a3b8";
    if (i < typed.length) {
      color = typed[i] === char ? "#4ade80" : "#f87171";
    }
    return (
      // biome-ignore lint/suspicious/noArrayIndexKey: character-level render requires index key
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color, transition: "color 0.08s" }, children: char }, i)
    );
  });
  const card = {
    background: "#111827",
    borderRadius: "1rem",
    padding: "1.75rem",
    marginBottom: "1.5rem",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
  };
  const sectionHeading = {
    color: "#ffffff",
    fontSize: "1.05rem",
    fontWeight: 700,
    marginBottom: "1rem"
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
            title: "Typing Speed Practice – Boost Your WPM | DocMasterTools",
            description: "Boost your typing speed with targeted speed drills on DocMasterTools. Practice word sprints, speed bursts, and paragraph drills to increase your WPM fast.",
            canonicalUrl: "https://docmastertools.com/typing-speed-practice",
            ogImage: "/assets/generated/docmastertools-logo.dim_540x270.png"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          BreadcrumbSchema,
          {
            items: [
              { name: "Home", url: "https://docmastertools.com/" },
              {
                name: "Typing Speed Practice",
                url: "https://docmastertools.com/typing-speed-practice"
              }
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { maxWidth: "820px", margin: "0 auto" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onBack,
              "data-ocid": "typing_speed_practice.back_button",
              style: {
                background: "transparent",
                border: "1px solid #334155",
                color: "#94a3b8",
                borderRadius: "0.5rem",
                padding: "0.4rem 1rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                marginBottom: "1.5rem",
                fontSize: "0.875rem"
              },
              children: "← Back to Home"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "1.75rem" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h1",
              {
                style: {
                  color: "#ffffff",
                  fontSize: "clamp(1.5rem, 4vw, 2rem)",
                  fontWeight: 800,
                  marginBottom: "0.5rem"
                },
                children: "⚡ Typing Speed Practice"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#94a3b8", fontSize: "1rem", lineHeight: 1.7 }, children: "Speed practice is different from accuracy practice. Once you have the basics, these targeted drills push your WPM higher by applying controlled pressure and rhythm training." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TypingProgressPanel, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: card, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: sectionHeading, children: "Speed Practice vs Accuracy Practice" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                  gap: "0.75rem"
                },
                children: [
                  {
                    icon: "🎯",
                    title: "Accuracy Practice",
                    color: "#4ade80",
                    body: "Slow, deliberate typing that builds correct muscle memory. Best for beginners. Reduces the habit of making the same errors repeatedly."
                  },
                  {
                    icon: "⚡",
                    title: "Speed Practice",
                    color: "#facc15",
                    body: "Pushes beyond your comfort zone to expand your ceiling. Best for typists who already have 40+ WPM and want to break through plateaus."
                  },
                  {
                    icon: "🔄",
                    title: "The Cycle",
                    color: "#38bdf8",
                    body: "Alternate between accuracy and speed sessions. Accuracy sessions consolidate gains; speed sessions push new limits. Both are essential."
                  }
                ].map((tip) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      background: "#1e293b",
                      borderRadius: "0.75rem",
                      padding: "1rem 1.25rem",
                      borderLeft: `3px solid ${tip.color}`
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "1.25rem", marginBottom: "0.4rem" }, children: tip.icon }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            color: tip.color,
                            fontWeight: 700,
                            fontSize: "0.875rem",
                            marginBottom: "0.3rem"
                          },
                          children: tip.title
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            color: "#94a3b8",
                            fontSize: "0.82rem",
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
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: card, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: sectionHeading, children: "WPM Level Guide" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: { display: "flex", flexDirection: "column", gap: "0.5rem" },
                children: [
                  {
                    range: "Below 30 WPM",
                    label: "Beginner",
                    color: "#f87171",
                    advice: "Focus on home row lessons and accuracy drills."
                  },
                  {
                    range: "30–50 WPM",
                    label: "Developing",
                    color: "#fb923c",
                    advice: "Practice all keyboard rows and common word drills."
                  },
                  {
                    range: "50–70 WPM",
                    label: "Intermediate",
                    color: "#facc15",
                    advice: "Use Speed Burst drills and timed paragraph practice."
                  },
                  {
                    range: "70–90 WPM",
                    label: "Advanced",
                    color: "#4ade80",
                    advice: "Push with Word Sprint and challenging paragraph texts."
                  },
                  {
                    range: "90+ WPM",
                    label: "Expert",
                    color: "#60a5fa",
                    advice: "Maintain accuracy under speed pressure. Practice consistently."
                  }
                ].map((level) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      background: "#1e293b",
                      borderRadius: "0.625rem",
                      padding: "0.625rem 1rem"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: {
                            color: level.color,
                            fontWeight: 700,
                            fontSize: "0.82rem",
                            minWidth: "90px"
                          },
                          children: level.range
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: {
                            color: level.color,
                            fontSize: "0.75rem",
                            background: `${level.color}20`,
                            padding: "1px 8px",
                            borderRadius: "0.25rem",
                            minWidth: "90px",
                            textAlign: "center"
                          },
                          children: level.label
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#64748b", fontSize: "0.8rem" }, children: level.advice })
                    ]
                  },
                  level.range
                ))
              }
            ),
            sessionBestWpm > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  marginTop: "1rem",
                  background: "#1e3a5f",
                  borderRadius: "0.625rem",
                  padding: "0.625rem 1rem",
                  border: "1px solid #2563eb",
                  color: "#60a5fa",
                  fontSize: "0.875rem",
                  fontWeight: 600
                },
                children: [
                  "🏆 This session best: ",
                  sessionBestWpm,
                  " WPM"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: card, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: sectionHeading, children: "Speed Drills" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  display: "flex",
                  gap: "0.5rem",
                  marginBottom: "1.25rem",
                  flexWrap: "wrap"
                },
                children: [
                  { id: "sprint", label: "Word Sprint" },
                  { id: "burst", label: "Speed Burst (30s)" },
                  { id: "paragraph", label: "Paragraph Drill" }
                ].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": `typing_speed_practice.${m.id}_mode.tab`,
                    onClick: () => handleModeChange(m.id),
                    style: {
                      background: mode === m.id ? "#2563eb" : "#1e293b",
                      color: mode === m.id ? "#fff" : "#94a3b8",
                      border: mode === m.id ? "2px solid #2563eb" : "2px solid #334155",
                      borderRadius: "0.5rem",
                      padding: "0.45rem 1.1rem",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      cursor: "pointer",
                      transition: "all 0.15s"
                    },
                    children: m.label
                  },
                  m.id
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
                  ...mode === "burst" ? [
                    {
                      label: "Time",
                      value: `${timeLeft}s`,
                      color: timeLeft <= 10 ? "#f87171" : "#38bdf8"
                    }
                  ] : [],
                  { label: "WPM", value: wpm, color: "#4ade80" },
                  { label: "Accuracy", value: `${accuracy}%`, color: "#facc15" },
                  { label: "Mistakes", value: mistakes, color: "#f87171" }
                ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      background: "#1e293b",
                      borderRadius: "0.75rem",
                      padding: "0.65rem 1rem",
                      textAlign: "center",
                      flex: "1 1 70px"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            color: s.color,
                            fontSize: "1.3rem",
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
                    ]
                  },
                  s.label
                ))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  background: "#1e293b",
                  borderRadius: "0.75rem",
                  padding: "1rem 1.25rem",
                  fontSize: "1rem",
                  lineHeight: 1.9,
                  letterSpacing: "0.02em",
                  marginBottom: "1.25rem",
                  wordBreak: "break-word",
                  userSelect: "none"
                },
                children: renderText()
              }
            ),
            drillState === "running" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                ref: inputRef,
                value: typed,
                onChange: handleInput,
                rows: 3,
                placeholder: "Type here...",
                "data-ocid": "typing_speed_practice.textarea",
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
            drillState === "finished" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": "typing_speed_practice.success_state",
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
                      children: "⚡ Drill Complete!"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: "#cbd5e1", fontSize: "0.95rem" }, children: [
                    "WPM: ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { style: { color: "#38bdf8" }, children: wpm }),
                    " |  Accuracy:",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { style: { color: "#facc15" }, children: [
                      accuracy,
                      "%"
                    ] }),
                    " |  Mistakes:",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { style: { color: "#f87171" }, children: mistakes })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "0.75rem", flexWrap: "wrap" }, children: [
              drillState === "idle" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "typing_speed_practice.start.primary_button",
                  onClick: startDrill,
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
                  children: "Start Drill"
                }
              ),
              (drillState === "running" || drillState === "finished") && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "typing_speed_practice.restart.secondary_button",
                  onClick: startDrill,
                  style: {
                    background: drillState === "finished" ? "#2563eb" : "#1e293b",
                    color: "#fff",
                    border: drillState === "finished" ? "none" : "1px solid #334155",
                    borderRadius: "0.5rem",
                    padding: "0.65rem 1.75rem",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    cursor: "pointer"
                  },
                  children: drillState === "finished" ? "Try Again" : "Restart"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TypingInternalLinks,
            {
              onNavigate,
              currentPage: "typing-speed-practice"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TypingFAQ,
            {
              faqs: FAQS,
              howToSteps: HOW_TO_STEPS,
              howToName: "How to Improve Typing Speed with Drills"
            }
          )
        ] })
      ]
    }
  );
}
export {
  TypingSpeedPracticePage as default
};
