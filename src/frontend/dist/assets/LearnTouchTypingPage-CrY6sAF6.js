import { r as reactExports, j as jsxRuntimeExports } from "./index-BK1nStnW.js";
import { B as BreadcrumbSchema } from "./BreadcrumbSchema-DzefBAjw.js";
import { S as SEO } from "./SEO-C_L06y5W.js";
import { T as TypingInternalLinks, a as TypingFAQ } from "./TypingInternalLinks-C6q0bWF2.js";
import { T as TypingProgressPanel } from "./TypingProgressPanel-CpgEhKOy.js";
import { u as updateTypingProgress } from "./typingProgress-CQm7G-tq.js";
const FINGER_MAP = [
  {
    hand: "Left Hand",
    color: "#3b82f6",
    fingers: [
      { finger: "Pinky", keys: "Q A Z 1" },
      { finger: "Ring", keys: "W S X 2" },
      { finger: "Middle", keys: "E D C 3" },
      { finger: "Index", keys: "R F V T G B 4 5" }
    ]
  },
  {
    hand: "Right Hand",
    color: "#22c55e",
    fingers: [
      { finger: "Index", keys: "Y H N U J M 6 7" },
      { finger: "Middle", keys: "I K , 8" },
      { finger: "Ring", keys: "O L . 9" },
      { finger: "Pinky", keys: "P ; / 0 [ ]" }
    ]
  }
];
const ROW_DRILLS = [
  {
    id: "home",
    label: "Home Row",
    desc: "A S D F  —  J K L ;",
    text: "asdf jkl; asdf jkl; asdf jkl; sad ask fall glad flask dads"
  },
  {
    id: "top",
    label: "Top Row",
    desc: "Q W E R T  —  Y U I O P",
    text: "qwer uiop qwer uiop type quit tower write power route quite"
  },
  {
    id: "bottom",
    label: "Bottom Row",
    desc: "Z X C V B  —  N M , . /",
    text: "zxcv nm,. zxcv nm,. zinc exam cave next move bench bomb mix"
  }
];
const FAQS = [
  {
    q: "What is touch typing?",
    a: "Touch typing is typing without looking at the keyboard. You rely on muscle memory to find each key, allowing you to focus on the screen."
  },
  {
    q: "How long does it take to learn touch typing?",
    a: "Most people develop basic touch typing skills within 2–4 weeks of daily practice. Full proficiency typically takes 1–3 months."
  },
  {
    q: "What is the home row?",
    a: "The home row is the middle row of keys: A S D F (left hand) and J K L ; (right hand). Your fingers rest here when not typing."
  },
  {
    q: "Is touch typing faster than hunt-and-peck?",
    a: "Yes. Touch typists typically reach 60–100+ WPM, while hunt-and-peck typists average 30–40 WPM. The speed difference compounds over time."
  },
  {
    q: "Which fingers type which keys?",
    a: "Left hand: A (pinky), S (ring), D (middle), F (index). Right hand: J (index), K (middle), L (ring), ; (pinky). Thumbs use the spacebar."
  }
];
const HOW_TO_STEPS = [
  {
    name: "Position fingers on the home row",
    text: "Rest your left fingers on A S D F and your right fingers on J K L ;. Feel the raised bumps on F and J."
  },
  {
    name: "Keep eyes on the screen, not the keyboard",
    text: "Resist the urge to look down. Your fingers will learn key positions through repetition."
  },
  {
    name: "Practice each row separately",
    text: "Start with home row drills until comfortable, then add top row and bottom row one at a time."
  },
  {
    name: "Combine rows gradually",
    text: "Once each row is comfortable, practice texts that combine all rows. Speed will increase naturally."
  }
];
function LearnTouchTypingPage({
  onNavigate,
  onBack
}) {
  const [selectedDrill, setSelectedDrill] = reactExports.useState(ROW_DRILLS[0]);
  const [typed, setTyped] = reactExports.useState("");
  const [drillState, setDrillState] = reactExports.useState("idle");
  const [wpm, setWpm] = reactExports.useState(0);
  const [accuracy, setAccuracy] = reactExports.useState(100);
  const [mistakes, setMistakes] = reactExports.useState(0);
  const startTimeRef = reactExports.useRef(0);
  const inputRef = reactExports.useRef(null);
  const calcStats = reactExports.useCallback(
    (currentTyped) => {
      const elapsed = (Date.now() - startTimeRef.current) / 1e3;
      const words = currentTyped.trim().split(/\s+/).filter(Boolean).length;
      const mins = elapsed / 60 || 1 / 60;
      const currentWpm = Math.round(words / mins);
      let errors = 0;
      for (let i = 0; i < currentTyped.length; i++) {
        if (currentTyped[i] !== selectedDrill.text[i]) errors++;
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
    [selectedDrill.text]
  );
  const startDrill = () => {
    setTyped("");
    setWpm(0);
    setAccuracy(100);
    setMistakes(0);
    setDrillState("running");
    startTimeRef.current = Date.now();
    setTimeout(() => {
      var _a;
      return (_a = inputRef.current) == null ? void 0 : _a.focus();
    }, 50);
  };
  const handleDrillChange = (drill) => {
    setSelectedDrill(drill);
    setTyped("");
    setWpm(0);
    setAccuracy(100);
    setMistakes(0);
    setDrillState("idle");
  };
  const handleInput = (e) => {
    if (drillState !== "running") return;
    const value = e.target.value;
    setTyped(value);
    calcStats(value);
    if (value.length >= selectedDrill.text.length) {
      const elapsed = (Date.now() - startTimeRef.current) / 1e3;
      const words = value.trim().split(/\s+/).filter(Boolean).length;
      const mins = elapsed / 60 || 1 / 60;
      const finalWpm = Math.round(words / mins);
      updateTypingProgress(finalWpm, Math.round(elapsed));
      setDrillState("finished");
    }
  };
  const renderText = () => selectedDrill.text.split("").map((char, i) => {
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
            title: "Learn Touch Typing – Free Online Guide | DocMasterTools",
            description: "Learn touch typing from scratch with our free guide. Master finger placement, home row keys, and keyboard technique to type faster without looking.",
            canonicalUrl: "https://docmastertools.com/learn-touch-typing",
            ogImage: "/assets/generated/docmastertools-logo.dim_540x270.png"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          BreadcrumbSchema,
          {
            items: [
              { name: "Home", url: "https://docmastertools.com/" },
              {
                name: "Learn Touch Typing",
                url: "https://docmastertools.com/learn-touch-typing"
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
              "data-ocid": "learn_touch_typing.back_button",
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
                children: "🖐️ Learn Touch Typing"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#94a3b8", fontSize: "1rem", lineHeight: 1.7 }, children: "Touch typing means typing without looking at your keyboard. By learning proper finger placement and practicing regularly, you can double or triple your typing speed while reducing errors significantly." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TypingProgressPanel, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: card, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: sectionHeading, children: "What is Touch Typing?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                style: {
                  color: "#94a3b8",
                  fontSize: "0.9rem",
                  lineHeight: 1.7,
                  marginBottom: "1rem"
                },
                children: "Touch typing is a method of typing that uses muscle memory rather than sight. Instead of searching for each key visually, trained typists know where every key is by feel — keeping their eyes fixed on the screen and their thoughts focused on the content they are writing."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  background: "#1e293b",
                  borderRadius: "0.75rem",
                  padding: "1rem 1.25rem",
                  borderLeft: "3px solid #4ade80"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      style: {
                        color: "#4ade80",
                        fontWeight: 700,
                        fontSize: "0.875rem",
                        marginBottom: "0.35rem"
                      },
                      children: "🏠 The Home Row — Your Starting Position"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      style: {
                        color: "#94a3b8",
                        fontSize: "0.85rem",
                        lineHeight: 1.7,
                        margin: 0
                      },
                      children: [
                        "The home row is the middle row of your keyboard. Your left hand rests on ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { style: { color: "#60a5fa" }, children: "A S D F" }),
                        " and your right hand on",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { style: { color: "#60a5fa" }, children: "J K L ;" }),
                        ". The raised bumps on F and J help you find home row without looking. All other keys are reached by extending fingers from this position."
                      ]
                    }
                  )
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: card, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: sectionHeading, children: "Finger-to-Key Mapping" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "1rem"
                },
                children: FINGER_MAP.map((hand) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      background: "#1e293b",
                      borderRadius: "0.75rem",
                      padding: "1rem 1.25rem",
                      border: `2px solid ${hand.color}30`
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            color: hand.color,
                            fontWeight: 700,
                            fontSize: "0.9rem",
                            marginBottom: "0.75rem"
                          },
                          children: hand.hand
                        }
                      ),
                      hand.fingers.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          style: {
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "0.35rem 0",
                            borderBottom: "1px solid #334155"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#cbd5e1", fontSize: "0.82rem" }, children: f.finger }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                style: {
                                  color: "#64748b",
                                  fontSize: "0.82rem",
                                  fontFamily: "monospace"
                                },
                                children: f.keys
                              }
                            )
                          ]
                        },
                        f.finger
                      )),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          style: {
                            color: "#475569",
                            fontSize: "0.72rem",
                            marginTop: "0.5rem",
                            lineHeight: 1.5
                          },
                          children: "Thumbs: Spacebar"
                        }
                      )
                    ]
                  },
                  hand.hand
                ))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: card, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: sectionHeading, children: "Row Drills — Practice Now" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  display: "flex",
                  gap: "0.5rem",
                  marginBottom: "1.25rem",
                  flexWrap: "wrap"
                },
                children: ROW_DRILLS.map((drill) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": `learn_touch_typing.${drill.id}_row.tab`,
                    onClick: () => handleDrillChange(drill),
                    style: {
                      background: selectedDrill.id === drill.id ? "#2563eb" : "#1e293b",
                      color: selectedDrill.id === drill.id ? "#fff" : "#94a3b8",
                      border: selectedDrill.id === drill.id ? "2px solid #2563eb" : "2px solid #334155",
                      borderRadius: "0.5rem",
                      padding: "0.45rem 1.1rem",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      cursor: "pointer",
                      transition: "all 0.15s"
                    },
                    children: drill.label
                  },
                  drill.id
                ))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                style: {
                  color: "#64748b",
                  fontSize: "0.82rem",
                  marginBottom: "1rem"
                },
                children: selectedDrill.desc
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
                  fontFamily: "monospace",
                  letterSpacing: "0.05em",
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
                "data-ocid": "learn_touch_typing.textarea",
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
            drillState === "finished" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": "learn_touch_typing.success_state",
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
                  "data-ocid": "learn_touch_typing.start.primary_button",
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
                  "data-ocid": "learn_touch_typing.restart.secondary_button",
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
              currentPage: "learn-touch-typing"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TypingFAQ,
            {
              faqs: FAQS,
              howToSteps: HOW_TO_STEPS,
              howToName: "How to Learn Touch Typing"
            }
          )
        ] })
      ]
    }
  );
}
export {
  LearnTouchTypingPage as default
};
