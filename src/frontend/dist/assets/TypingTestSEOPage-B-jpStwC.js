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
const SEO_META = {
  1: {
    title: "1 Minute Typing Test – Check Your Speed | DocMasterTools",
    description: "Take the 1 minute typing test to measure your typing speed and accuracy. Practice typing online with DocMasterTools.",
    heading: "1 Minute Typing Test",
    intro: "The 1 minute typing test is ideal for a quick speed check. In just 60 seconds, you can measure your current WPM (words per minute) and accuracy, making it perfect for daily practice sessions or warm-up before longer tests."
  },
  3: {
    title: "3 Minute Typing Test – Test Your WPM | DocMasterTools",
    description: "Take the 3 minute typing test to measure your typing speed and accuracy. Practice and improve your WPM online with DocMasterTools.",
    heading: "3 Minute Typing Test",
    intro: "The 3 minute typing test gives you a balanced challenge — long enough to measure your sustained typing speed and endurance, yet short enough to stay focused throughout. It is the most popular test duration used by professionals to assess real-world typing ability."
  },
  5: {
    title: "5 Minute Typing Test – Improve Typing Speed | DocMasterTools",
    description: "Take the 5 minute typing test to measure your long-form typing speed and accuracy. Build stamina and improve your WPM with DocMasterTools.",
    heading: "5 Minute Typing Test",
    intro: "The 5 minute typing test is designed for serious typists who want to measure their endurance and consistency over a longer duration. It reflects realistic typing conditions such as writing emails or documents, and is often used in professional typing assessments."
  }
};
const TIPS = [
  {
    title: "Focus on Accuracy First",
    body: "Speed will follow naturally once your fingers learn the correct positions. Prioritise hitting the right keys before trying to type faster."
  },
  {
    title: "Use All 10 Fingers",
    body: "Touch typing with all fingers reduces hand movement and significantly increases speed. Start by mastering the home row: A S D F and J K L ;"
  },
  {
    title: "Never Look at the Keyboard",
    body: "Train yourself to keep your eyes on the screen. Looking down breaks your rhythm and slows you down. Use the raised bumps on F and J to find the home row by feel."
  },
  {
    title: "Practice Every Day",
    body: "Even 10–15 minutes of daily practice leads to noticeable improvement within weeks. Consistency matters more than long but infrequent sessions."
  },
  {
    title: "Relax Your Hands",
    body: "Tension in your fingers and wrists slows you down. Keep your hands relaxed and your wrists slightly elevated above the keyboard."
  },
  {
    title: "Review Your Mistakes",
    body: "After each test, notice which keys you consistently miss. Focus extra practice on those letters, and your overall accuracy will improve quickly."
  }
];
const SEO_FAQS = [
  {
    q: "What is a good typing speed?",
    a: "A typing speed of 40–60 WPM is considered average. Professional typists typically achieve 65–75 WPM or more with high accuracy."
  },
  {
    q: "How is WPM calculated?",
    a: "WPM is calculated by dividing the total number of words typed by the duration of the test in minutes. Each 5 characters count as one word."
  },
  {
    q: "How can I improve my typing accuracy?",
    a: "Slow down slightly, focus on hitting each key correctly, and practice the home row position. Accuracy always comes before speed."
  },
  {
    q: "Should I take the 1, 3, or 5 minute test?",
    a: "Start with the 1-minute test for a quick check. Use the 3-minute test for a reliable average. The 5-minute test measures sustained typing endurance."
  },
  {
    q: "Does practice typing daily help?",
    a: "Yes. Even 10–15 minutes of daily typing practice leads to measurable improvement in speed and accuracy within a few weeks."
  }
];
const SEO_HOW_TO_STEPS = [
  {
    name: "Choose your test duration",
    text: "Select 1, 3, or 5 minutes depending on whether you want a quick check or an endurance test."
  },
  {
    name: "Click Start Test",
    text: "Press the Start Test button to begin. The timer will start and the text will be ready to type."
  },
  {
    name: "Type the displayed text as accurately as possible",
    text: "Type each word carefully. Character highlighting shows correct (green) and incorrect (red) characters in real time."
  },
  {
    name: "Review your WPM and accuracy when the timer ends",
    text: "Your final WPM, accuracy percentage, and mistake count are shown on the results screen."
  }
];
function TypingTestSEOPage({
  duration,
  onNavigate
}) {
  const meta = SEO_META[duration];
  reactExports.useEffect(() => {
    document.title = meta.title;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", meta.description);
    return () => {
      document.title = "DocMasterTools – Free Document & Utility Tools";
    };
  }, [meta]);
  const [selectedDuration, setSelectedDuration] = reactExports.useState(duration);
  const [testState, setTestState] = reactExports.useState("idle");
  const [sampleText, setSampleText] = reactExports.useState(SAMPLE_TEXTS[0]);
  const [typed, setTyped] = reactExports.useState("");
  const [timeLeft, setTimeLeft] = reactExports.useState(duration * 60);
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
    if (i < typed.length) {
      color = typed[i] === char ? "#4ade80" : "#f87171";
    }
    return (
      // biome-ignore lint/suspicious/noArrayIndexKey: character-level render requires index key
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color, transition: "color 0.08s" }, children: char }, i)
    );
  });
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
            title: meta.title,
            description: meta.description,
            canonicalUrl: `https://docmastertools.com/typing-test-${duration}-minute`,
            ogImage: "/assets/generated/docmastertools-logo.dim_540x270.png"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          BreadcrumbSchema,
          {
            items: [
              { name: "Home", url: "https://docmastertools.com/" },
              {
                name: "Typing Test",
                url: "https://docmastertools.com/typing-test"
              },
              {
                name: `${duration} Minute Typing Test`,
                url: `https://docmastertools.com/typing-test-${duration}-minute`
              }
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { maxWidth: "820px", margin: "0 auto" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "1.75rem" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "h1",
              {
                style: {
                  color: "#ffffff",
                  fontSize: "clamp(1.5rem, 4vw, 2rem)",
                  fontWeight: 800,
                  marginBottom: "0.5rem"
                },
                children: [
                  "⌨️ ",
                  meta.heading
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#94a3b8", fontSize: "1rem", lineHeight: 1.7 }, children: meta.intro })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: card, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: sectionHeading, children: "Typing Test" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  display: "flex",
                  gap: "0.5rem",
                  marginBottom: "1.25rem",
                  flexWrap: "wrap"
                },
                children: [1, 3, 5].map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    "data-ocid": `seo_typing_test.duration_${d}.button`,
                    onClick: () => handleDurationChange(d),
                    style: {
                      background: selectedDuration === d ? "#2563eb" : "#1e293b",
                      color: selectedDuration === d ? "#fff" : "#94a3b8",
                      border: selectedDuration === d ? "2px solid #2563eb" : "2px solid #334155",
                      borderRadius: "0.5rem",
                      padding: "0.5rem 1.25rem",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      cursor: "pointer",
                      transition: "all 0.15s"
                    },
                    children: [
                      d,
                      " min"
                    ]
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
                "data-ocid": "seo_typing_test.textarea",
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
                  "data-ocid": "seo_typing_test.start.primary_button",
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
                  "data-ocid": "seo_typing_test.stop.secondary_button",
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
                    "data-ocid": "seo_typing_test.restart.primary_button",
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
                    "data-ocid": "seo_typing_test.full_test.secondary_button",
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
                    children: "Full Typing Test"
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: card, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: sectionHeading, children: "Tips to Improve Typing Speed" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "1rem"
                },
                children: TIPS.map((tip) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
                            marginBottom: "0.4rem"
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
          /* @__PURE__ */ jsxRuntimeExports.jsx(TypingProgressPanel, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TypingInternalLinks,
            {
              onNavigate,
              currentPage: `typing-test-${duration}-minute`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TypingFAQ,
            {
              faqs: SEO_FAQS,
              howToSteps: SEO_HOW_TO_STEPS,
              howToName: "How to Take a Typing Speed Test"
            }
          )
        ] })
      ]
    }
  );
}
export {
  TypingTestSEOPage as default
};
