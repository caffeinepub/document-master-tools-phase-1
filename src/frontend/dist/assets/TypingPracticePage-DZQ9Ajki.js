import { r as reactExports, j as jsxRuntimeExports } from "./index-BFVPq1mW.js";
import { B as BreadcrumbSchema } from "./BreadcrumbSchema-DJGqVWYd.js";
import { S as SEO } from "./SEO-B1UZw1Ql.js";
import { T as TypingInternalLinks, a as TypingFAQ } from "./TypingInternalLinks-C_8L56vS.js";
import { T as TypingProgressPanel } from "./TypingProgressPanel-D-ECZv1G.js";
import { u as updateTypingProgress } from "./typingProgress-CQm7G-tq.js";
const WORD_DRILL_WORDS = [
  "keyboard typing speed practice accuracy learning focus improve skill",
  "finger position home row touch type method train daily effort",
  "quick brown lazy dog jump over fence strong brave smart bold"
];
const SENTENCE_DRILLS = [
  "Typing regularly helps improve both speed and accuracy.",
  "Keep your eyes on the screen and not on the keyboard.",
  "Accuracy is more important than speed when learning to type.",
  "Touch typing is a skill that saves hours every single week.",
  "Focus on each word carefully before moving to the next one."
];
const PARAGRAPH_DRILLS = [
  "Typing is a very important skill in the digital world. Practicing every day helps improve speed, accuracy, and overall productivity at work.",
  "The home row is the foundation of touch typing. By keeping your fingers anchored on A S D F and J K L semicolon, your hands can reach every other key efficiently.",
  "Good typing habits start with the correct posture. Sit up straight, keep your wrists slightly elevated, and let your fingers rest lightly on the home row keys."
];
const FAQS = [
  {
    q: "How long should I practice typing each day?",
    a: "15–20 minutes of focused daily practice is enough for most beginners. Consistency is more important than session length."
  },
  {
    q: "What is a good typing speed for a beginner?",
    a: "40–50 WPM with 90%+ accuracy is a solid beginner target. With regular practice, most people reach 60–70 WPM within a few months."
  },
  {
    q: "Should I focus on speed or accuracy first?",
    a: "Always focus on accuracy first. Speed naturally increases as your muscle memory develops and you stop making errors."
  },
  {
    q: "Can I learn touch typing on my own?",
    a: "Yes. Free online tools and structured lessons make it easy to learn touch typing at your own pace without needing a teacher."
  },
  {
    q: "How do I track my typing progress?",
    a: "Use the progress panel above to track your best WPM, total sessions, and time practiced. Regular tests also help measure improvement."
  }
];
const HOW_TO_STEPS = [
  {
    name: "Choose a practice mode",
    text: "Select Word Drill, Sentence Practice, or Paragraph Practice based on your current skill level."
  },
  {
    name: "Read the text carefully before typing",
    text: "Scan the full text once before you start typing so your brain is prepared for each word."
  },
  {
    name: "Type accurately without looking at the keyboard",
    text: "Keep your eyes on the screen and use muscle memory to find each key. Accuracy comes before speed."
  },
  {
    name: "Review mistakes and repeat",
    text: "After finishing, note which keys caused errors. Repeat the drill focusing on those specific keys."
  }
];
function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function TypingPracticePage({
  onNavigate,
  onBack
}) {
  const [mode, setMode] = reactExports.useState("word");
  const [drillText, setDrillText] = reactExports.useState(
    () => getRandomItem(WORD_DRILL_WORDS)
  );
  const [typed, setTyped] = reactExports.useState("");
  const [drillState, setDrillState] = reactExports.useState("idle");
  const [wpm, setWpm] = reactExports.useState(0);
  const [accuracy, setAccuracy] = reactExports.useState(100);
  const [mistakes, setMistakes] = reactExports.useState(0);
  const startTimeRef = reactExports.useRef(0);
  const inputRef = reactExports.useRef(null);
  const loadDrill = reactExports.useCallback((m) => {
    let text = "";
    if (m === "word") text = getRandomItem(WORD_DRILL_WORDS);
    else if (m === "sentence") text = getRandomItem(SENTENCE_DRILLS);
    else text = getRandomItem(PARAGRAPH_DRILLS);
    setDrillText(text);
    setTyped("");
    setWpm(0);
    setAccuracy(100);
    setMistakes(0);
    setDrillState("idle");
  }, []);
  const handleModeChange = (m) => {
    setMode(m);
    loadDrill(m);
  };
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
    },
    [drillText]
  );
  const startDrill = () => {
    loadDrill(mode);
    setDrillState("running");
    startTimeRef.current = Date.now();
    setTimeout(() => {
      var _a;
      return (_a = inputRef.current) == null ? void 0 : _a.focus();
    }, 50);
  };
  const handleInput = (e) => {
    if (drillState !== "running") return;
    const value = e.target.value;
    setTyped(value);
    calcStats(value);
    if (value.length >= drillText.length) {
      const elapsed = (Date.now() - startTimeRef.current) / 1e3;
      const words = value.trim().split(/\s+/).filter(Boolean).length;
      const mins = elapsed / 60 || 1 / 60;
      const finalWpm = Math.round(words / mins);
      updateTypingProgress(finalWpm, Math.round(elapsed));
      setDrillState("finished");
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
  reactExports.useEffect(() => {
    loadDrill("word");
  }, [loadDrill]);
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
            title: "Typing Practice Online – Improve Speed & Accuracy | DocMasterTools",
            description: "Practice typing online with free exercises on DocMasterTools. Improve your WPM, accuracy, and build keyboard confidence with daily practice sessions.",
            canonicalUrl: "https://docmastertools.com/typing-practice",
            ogImage: "/assets/generated/docmastertools-logo.dim_540x270.png"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          BreadcrumbSchema,
          {
            items: [
              { name: "Home", url: "https://docmastertools.com/" },
              {
                name: "Typing Practice",
                url: "https://docmastertools.com/typing-practice"
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
              "data-ocid": "typing_practice.back_button",
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
                children: "📝 Typing Practice Online"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#94a3b8", fontSize: "1rem", lineHeight: 1.7 }, children: "Practice typing online with free exercises designed for all skill levels. Whether you are a beginner building muscle memory or an experienced typist looking to sharpen accuracy, our practice modes help you improve consistently." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TypingProgressPanel, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: card, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: sectionHeading, children: "What is Typing Practice?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                style: {
                  color: "#94a3b8",
                  fontSize: "0.9rem",
                  lineHeight: 1.7,
                  marginBottom: "1rem"
                },
                children: "Typing practice is the deliberate repetition of typing exercises to build speed and accuracy. Unlike typing tests that measure performance, practice sessions focus on skill development — training your fingers to find keys automatically through muscle memory."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                  gap: "0.75rem"
                },
                children: [
                  {
                    icon: "🎯",
                    title: "Why It Matters",
                    body: "Typing is now a core workplace skill. Faster typing means more output in less time across emails, documents, code, and communication."
                  },
                  {
                    icon: "⏱️",
                    title: "How Often to Practice",
                    body: "15–20 minutes per day is ideal. Daily short sessions outperform irregular long sessions for building lasting muscle memory."
                  },
                  {
                    icon: "✅",
                    title: "How to Get Started",
                    body: "Begin with Word Drill to build rhythm, move to Sentence Practice for flow, then Paragraph Practice for sustained typing."
                  }
                ].map((tip) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      background: "#1e293b",
                      borderRadius: "0.75rem",
                      padding: "1rem 1.25rem",
                      borderLeft: "3px solid #2563eb"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "1.25rem", marginBottom: "0.4rem" }, children: tip.icon }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            color: "#38bdf8",
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: sectionHeading, children: "Practice Now" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  display: "flex",
                  gap: "0.5rem",
                  marginBottom: "1.25rem",
                  flexWrap: "wrap"
                },
                children: ["word", "sentence", "paragraph"].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": `typing_practice.${m}_mode.tab`,
                    onClick: () => handleModeChange(m),
                    style: {
                      background: mode === m ? "#2563eb" : "#1e293b",
                      color: mode === m ? "#fff" : "#94a3b8",
                      border: mode === m ? "2px solid #2563eb" : "2px solid #334155",
                      borderRadius: "0.5rem",
                      padding: "0.45rem 1.1rem",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      cursor: "pointer",
                      transition: "all 0.15s",
                      textTransform: "capitalize"
                    },
                    children: m === "word" ? "Word Drill" : m === "sentence" ? "Sentence Practice" : "Paragraph Practice"
                  },
                  m
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
                placeholder: "Start typing here...",
                "data-ocid": "typing_practice.textarea",
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
                "data-ocid": "typing_practice.success_state",
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
                      children: "✅ Drill Complete!"
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
                  "data-ocid": "typing_practice.start.primary_button",
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
                  children: "Start Practice"
                }
              ),
              (drillState === "running" || drillState === "finished") && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "typing_practice.next.secondary_button",
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
                  children: drillState === "finished" ? "Next Drill" : "Restart"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TypingInternalLinks,
            {
              onNavigate,
              currentPage: "typing-practice"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TypingFAQ,
            {
              faqs: FAQS,
              howToSteps: HOW_TO_STEPS,
              howToName: "How to Practice Typing Online"
            }
          )
        ] })
      ]
    }
  );
}
export {
  TypingPracticePage as default
};
