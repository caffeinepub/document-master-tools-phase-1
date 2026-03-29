import { r as reactExports, j as jsxRuntimeExports } from "./index-BK1nStnW.js";
import { B as BreadcrumbSchema } from "./BreadcrumbSchema-DzefBAjw.js";
import { S as SEO } from "./SEO-C_L06y5W.js";
import { T as TypingInternalLinks, a as TypingFAQ } from "./TypingInternalLinks-C6q0bWF2.js";
import { T as TypingProgressPanel } from "./TypingProgressPanel-CpgEhKOy.js";
import { u as updateTypingProgress } from "./typingProgress-CQm7G-tq.js";
const LESSONS = [
  {
    id: 1,
    title: "Lesson 1: Home Row Keys",
    keys: "A S D F  J K L ;",
    tip: "Rest all 8 fingers on the home row. Left on ASDF, right on JKL;. Feel the bumps on F and J.",
    text: "asdf jkl; asdf jkl; asdf jkl; sad ask fall; glad flask"
  },
  {
    id: 2,
    title: "Lesson 2: Top Row Keys",
    keys: "Q W E R T  Y U I O P",
    tip: "Reach upward from home row without lifting your wrists. Return fingers to home row after each keystroke.",
    text: "qwer uiop qwer uiop tree wire quite power"
  },
  {
    id: 3,
    title: "Lesson 3: Bottom Row Keys",
    keys: "Z X C V B  N M , . /",
    tip: "Curl your fingers downward to reach the bottom row. Keep your thumbs hovering over the spacebar.",
    text: "zxcv bnm, zxcv bnm, cab max novel"
  },
  {
    id: 4,
    title: "Lesson 4: Common Words",
    keys: "All rows combined",
    tip: "This lesson uses all rows. Focus on returning to home row between words and keeping your eyes on the screen.",
    text: "the and for are but not you all can her"
  },
  {
    id: 5,
    title: "Lesson 5: Full Sentences",
    keys: "Full keyboard",
    tip: "You are now using the full keyboard. Keep a steady rhythm and prioritise accuracy over speed.",
    text: "A fast typist can type more than sixty words per minute."
  }
];
const FAQS = [
  {
    q: "Are these typing lessons free?",
    a: "Yes, all typing lessons on DocMasterTools are completely free with no signup required."
  },
  {
    q: "What should I learn first when starting to type?",
    a: "Start with the home row keys (ASDF JKL;). Once you can type those without looking, move to the top and bottom rows."
  },
  {
    q: "How many lessons should I do per day?",
    a: "2–3 lessons per day is a good starting pace. Revisit earlier lessons whenever your accuracy drops below 85%."
  },
  {
    q: "Why do beginners make so many typing mistakes?",
    a: "Beginners make mistakes because their finger-to-key mapping is not yet automatic. Slow down, focus on accuracy, and speed will follow."
  },
  {
    q: "When should I move on to the next lesson?",
    a: "Move to the next lesson when you can complete the current one with at least 85–90% accuracy consistently."
  }
];
const HOW_TO_STEPS = [
  {
    name: "Start with Lesson 1",
    text: "Begin with the home row lesson. Do not skip ahead — the foundation is critical for later lessons."
  },
  {
    name: "Type the practice text accurately",
    text: "Read the practice text, then type it character by character without looking at the keyboard."
  },
  {
    name: "Unlock the next lesson after completing",
    text: "Each lesson is unlocked after you complete the current one. Aim for 85%+ accuracy before moving on."
  },
  {
    name: "Repeat each lesson until accuracy is above 90%",
    text: "If your accuracy is below 85%, repeat the lesson. Consistent accuracy builds lasting muscle memory."
  }
];
function FreeTypingLessonsPage({
  onNavigate,
  onBack
}) {
  const [currentLessonIdx, setCurrentLessonIdx] = reactExports.useState(0);
  const [unlockedUpTo, setUnlockedUpTo] = reactExports.useState(0);
  const [lessonState, setLessonState] = reactExports.useState("idle");
  const [typed, setTyped] = reactExports.useState("");
  const [wpm, setWpm] = reactExports.useState(0);
  const [accuracy, setAccuracy] = reactExports.useState(100);
  const [mistakes, setMistakes] = reactExports.useState(0);
  const startTimeRef = reactExports.useRef(0);
  const inputRef = reactExports.useRef(null);
  const currentLesson = LESSONS[currentLessonIdx];
  const calcStats = reactExports.useCallback(
    (currentTyped) => {
      const elapsed = (Date.now() - startTimeRef.current) / 1e3;
      const words = currentTyped.trim().split(/\s+/).filter(Boolean).length;
      const mins = elapsed / 60 || 1 / 60;
      const currentWpm = Math.round(words / mins);
      let errors = 0;
      for (let i = 0; i < currentTyped.length; i++) {
        if (currentTyped[i] !== currentLesson.text[i]) errors++;
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
      return { wpm: currentWpm, accuracy: acc };
    },
    [currentLesson.text]
  );
  const startLesson = () => {
    setTyped("");
    setWpm(0);
    setAccuracy(100);
    setMistakes(0);
    setLessonState("running");
    startTimeRef.current = Date.now();
    setTimeout(() => {
      var _a;
      return (_a = inputRef.current) == null ? void 0 : _a.focus();
    }, 50);
  };
  const handleInput = (e) => {
    if (lessonState !== "running") return;
    const value = e.target.value;
    setTyped(value);
    const stats = calcStats(value);
    if (value.length >= currentLesson.text.length) {
      const elapsed = (Date.now() - startTimeRef.current) / 1e3;
      updateTypingProgress(stats.wpm, Math.round(elapsed));
      if (stats.accuracy >= 70 && currentLessonIdx >= unlockedUpTo) {
        setUnlockedUpTo(Math.min(currentLessonIdx + 1, LESSONS.length - 1));
      }
      setLessonState("finished");
    }
  };
  const goToLesson = (idx) => {
    if (idx > unlockedUpTo) return;
    setCurrentLessonIdx(idx);
    setTyped("");
    setWpm(0);
    setAccuracy(100);
    setMistakes(0);
    setLessonState("idle");
  };
  const goNextLesson = () => {
    const next = currentLessonIdx + 1;
    if (next < LESSONS.length) {
      goToLesson(next);
    }
  };
  const renderText = () => currentLesson.text.split("").map((char, i) => {
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
            title: "Free Typing Lessons for Beginners – Learn Step by Step | DocMasterTools",
            description: "Start learning to type with free beginner typing lessons. Step-by-step lessons for home row, top row, bottom row, common words, and full sentences.",
            canonicalUrl: "https://docmastertools.com/free-typing-lessons",
            ogImage: "/assets/generated/docmastertools-logo.dim_540x270.png"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          BreadcrumbSchema,
          {
            items: [
              { name: "Home", url: "https://docmastertools.com/" },
              {
                name: "Free Typing Lessons",
                url: "https://docmastertools.com/free-typing-lessons"
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
              "data-ocid": "free_typing_lessons.back_button",
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
                children: "📚 Free Typing Lessons"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#94a3b8", fontSize: "1rem", lineHeight: 1.7 }, children: "Start learning to type properly with our free step-by-step beginner lessons. Progress from the home row through to full sentences — each lesson building on the last." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TypingProgressPanel, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: card, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: sectionHeading, children: "Choose a Lesson" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: { display: "flex", flexDirection: "column", gap: "0.5rem" },
                children: LESSONS.map((lesson, idx) => {
                  const isUnlocked = idx <= unlockedUpTo;
                  const isCurrent = idx === currentLessonIdx;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      "data-ocid": `free_typing_lessons.lesson.${lesson.id}.button`,
                      onClick: () => goToLesson(idx),
                      disabled: !isUnlocked,
                      style: {
                        background: isCurrent ? "#1e3a5f" : isUnlocked ? "#1e293b" : "#0f172a",
                        border: isCurrent ? "1px solid #2563eb" : "1px solid #334155",
                        borderRadius: "0.75rem",
                        padding: "0.875rem 1.25rem",
                        textAlign: "left",
                        cursor: isUnlocked ? "pointer" : "not-allowed",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "0.5rem",
                        opacity: isUnlocked ? 1 : 0.4,
                        transition: "all 0.15s"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              style: {
                                color: isCurrent ? "#60a5fa" : isUnlocked ? "#e2e8f0" : "#475569",
                                fontWeight: 700,
                                fontSize: "0.875rem"
                              },
                              children: lesson.title
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              style: {
                                color: "#64748b",
                                fontSize: "0.75rem",
                                marginTop: "0.2rem"
                              },
                              children: [
                                "Keys: ",
                                lesson.keys
                              ]
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            style: {
                              fontSize: "0.75rem",
                              padding: "2px 8px",
                              borderRadius: "0.375rem",
                              background: isCurrent ? "#2563eb" : isUnlocked ? "#16a34a20" : "#334155",
                              color: isCurrent ? "#fff" : isUnlocked ? "#4ade80" : "#475569",
                              whiteSpace: "nowrap"
                            },
                            children: isCurrent ? "Active" : isUnlocked ? "Unlocked" : "🔒 Locked"
                          }
                        )
                      ]
                    },
                    lesson.id
                  );
                })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: card, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: sectionHeading, children: currentLesson.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  background: "#1e293b",
                  borderRadius: "0.625rem",
                  padding: "0.75rem 1rem",
                  marginBottom: "1rem",
                  borderLeft: "3px solid #f97316"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    style: {
                      color: "#94a3b8",
                      fontSize: "0.82rem",
                      lineHeight: 1.6,
                      margin: 0
                    },
                    children: [
                      "💡 ",
                      currentLesson.tip
                    ]
                  }
                )
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
                  fontSize: "1.1rem",
                  lineHeight: 2,
                  fontFamily: "monospace",
                  letterSpacing: "0.06em",
                  marginBottom: "1.25rem",
                  wordBreak: "break-word",
                  userSelect: "none"
                },
                children: renderText()
              }
            ),
            lessonState === "running" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                ref: inputRef,
                value: typed,
                onChange: handleInput,
                rows: 3,
                placeholder: "Type here...",
                "data-ocid": "free_typing_lessons.textarea",
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
                  fontFamily: "monospace"
                }
              }
            ),
            lessonState === "finished" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": "free_typing_lessons.success_state",
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
                        color: accuracy >= 70 ? "#4ade80" : "#f87171",
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        marginBottom: "0.5rem"
                      },
                      children: accuracy >= 70 ? "✅ Lesson Complete!" : "⚠️ Keep Practicing!"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: {
                        color: "#cbd5e1",
                        fontSize: "0.95rem",
                        marginBottom: "0.5rem"
                      },
                      children: [
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
                      ]
                    }
                  ),
                  accuracy < 70 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#94a3b8", fontSize: "0.8rem" }, children: "Aim for at least 70% accuracy to unlock the next lesson." })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "0.75rem", flexWrap: "wrap" }, children: [
              lessonState === "idle" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "free_typing_lessons.start.primary_button",
                  onClick: startLesson,
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
                  children: "Start Lesson"
                }
              ),
              lessonState === "running" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "free_typing_lessons.restart.secondary_button",
                  onClick: startLesson,
                  style: {
                    background: "#1e293b",
                    color: "#fff",
                    border: "1px solid #334155",
                    borderRadius: "0.5rem",
                    padding: "0.65rem 1.75rem",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    cursor: "pointer"
                  },
                  children: "Restart"
                }
              ),
              lessonState === "finished" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "free_typing_lessons.retry.secondary_button",
                    onClick: startLesson,
                    style: {
                      background: "#1e293b",
                      color: "#fff",
                      border: "1px solid #334155",
                      borderRadius: "0.5rem",
                      padding: "0.65rem 1.5rem",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      cursor: "pointer"
                    },
                    children: "Try Again"
                  }
                ),
                currentLessonIdx < LESSONS.length - 1 && accuracy >= 70 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "free_typing_lessons.next.primary_button",
                    onClick: goNextLesson,
                    style: {
                      background: "#16a34a",
                      color: "#fff",
                      border: "none",
                      borderRadius: "0.5rem",
                      padding: "0.65rem 1.75rem",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      cursor: "pointer"
                    },
                    children: "Next Lesson →"
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TypingInternalLinks,
            {
              onNavigate,
              currentPage: "free-typing-lessons"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TypingFAQ,
            {
              faqs: FAQS,
              howToSteps: HOW_TO_STEPS,
              howToName: "How to Complete Free Typing Lessons"
            }
          )
        ] })
      ]
    }
  );
}
export {
  FreeTypingLessonsPage as default
};
