import { c as createLucideIcon, r as reactExports, h as trackDailyChallengeCompleted, j as jsxRuntimeExports } from "./index-BK1nStnW.js";
import { B as BreadcrumbSchema } from "./BreadcrumbSchema-DzefBAjw.js";
import { S as SEO } from "./SEO-C_L06y5W.js";
import { T as TypingInternalLinks, a as TypingFAQ } from "./TypingInternalLinks-C6q0bWF2.js";
import { u as updateTypingProgress } from "./typingProgress-CQm7G-tq.js";
import { A as ArrowLeft } from "./arrow-left-B6GHQD8m.js";
import { F as Flame } from "./flame-CogsrYm6.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6", key: "17hqa7" }],
  ["path", { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18", key: "lmptdp" }],
  ["path", { d: "M4 22h16", key: "57wxv0" }],
  ["path", { d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22", key: "1nw9bq" }],
  ["path", { d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22", key: "1np0yb" }],
  ["path", { d: "M18 2H6v7a6 6 0 0 0 12 0V2Z", key: "u46fv3" }]
];
const Trophy = createLucideIcon("trophy", __iconNode);
const CHALLENGE_TEXTS = [
  "The quick brown fox jumps over the lazy dog. This simple sentence contains every letter of the English alphabet and is used by typists worldwide to warm up their fingers.",
  "Consistency is the key to improving your typing speed. Even fifteen minutes of focused practice each day will show remarkable results within just a few weeks of dedication.",
  "Technology connects people across the globe in ways that were once unimaginable. The ability to communicate instantly with someone on the other side of the world is extraordinary.",
  "Reading great books expands your vocabulary and sharpens your mind. The more you read, the better you write, and the better you write, the more clearly you can think.",
  "Accuracy in typing is more important than raw speed. A typist who types at sixty words per minute with perfect accuracy is more productive than one who types faster with errors.",
  "The internet has transformed how we learn, work, and connect with others. Online platforms have made education accessible to millions of people regardless of their location.",
  "Every expert was once a beginner who refused to give up. The path to mastery is paved with consistent effort, patience, and a willingness to make mistakes along the way.",
  "Good communication skills open doors in every profession. Whether you are writing emails, reports, or messages, clear and concise writing makes a lasting impression on others.",
  "Keyboard shortcuts save time and boost productivity significantly. Learning common shortcuts like copy, paste, undo, and select all can speed up your daily computer workflow.",
  "The human brain adapts remarkably well to new skills with practice. Typing without looking at the keyboard becomes second nature after enough repetition and muscle memory training.",
  "Document management tools have revolutionized how offices handle paperwork. Converting, merging, and compressing files can now be done in seconds with the right software.",
  "Strong typing habits begin with proper posture and hand position. Keeping your wrists elevated and fingers curved over the home row keys reduces fatigue during long typing sessions.",
  "Online learning platforms have made professional development accessible to everyone. You can now learn programming, design, marketing, or any skill from the comfort of your home.",
  "Precision and focus are the hallmarks of a skilled typist. Training your fingers to move accurately before focusing on speed will yield better long-term results in your typing journey.",
  "The alphabet is the foundation of all written communication. Mastering the position of every letter on the keyboard is the first step toward becoming a confident and fast typist.",
  "Data entry professionals rely on fast and accurate typing every single day. Speed tests, practice sessions, and typing challenges are all useful tools for improving this critical skill.",
  "Writing by hand activates different parts of the brain compared to typing on a keyboard. Both methods have unique benefits and skilled communicators benefit from practicing each one.",
  "Confidence in any skill comes from repeated practice in varied conditions. Challenge yourself daily with new texts, timed tests, and games to keep your typing skills sharp.",
  "The home row keys — A S D F and J K L semicolon — are where your fingers should rest when you are not typing. Returning to the home row after each keystroke improves speed.",
  "Speed reading and fast typing complement each other well. Both skills require training your brain and body to process and produce information more efficiently over time.",
  "Freelancers and remote workers depend on excellent typing skills to meet deadlines. The faster and more accurately you can type, the more productive your work hours become.",
  "Grammar and spelling matter as much as speed when it comes to professional communication. A well-written message that is accurate always outperforms a hastily typed one.",
  "Digital literacy is now considered a fundamental skill in the modern workplace. Knowing how to type well, navigate software, and manage files efficiently gives you a clear advantage.",
  "The best typists look at the screen while they type, not at their hands. This technique, known as touch typing, allows you to catch errors in real time and correct them immediately.",
  "Stretching your fingers and wrists before a long typing session reduces the risk of strain. Just as athletes warm up before exercise, typists should prepare their hands similarly.",
  "Productivity tools like document editors, spreadsheets, and presentation software all require fast typing. Investing time in your typing speed pays dividends across every digital task.",
  "Typing challenges and competitions are a fun way to measure your progress. Setting personal records and comparing scores with others can provide powerful motivation to improve.",
  "The history of typewriters dates back to the nineteenth century. Early typists had to press keys with considerable force, making speed much harder to achieve than on modern keyboards.",
  "Modern keyboards come in many layouts and sizes. The standard QWERTY layout was originally designed to prevent mechanical jams on early typewriters by separating commonly used letters.",
  "Practice with purpose makes perfect. Identify the keys and combinations that slow you down the most, and target them specifically during your daily typing practice sessions."
];
function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1e3 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}
function getTodayKey() {
  const d = /* @__PURE__ */ new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function getTodayChallengeText() {
  const idx = getDayOfYear(/* @__PURE__ */ new Date()) % CHALLENGE_TEXTS.length;
  return CHALLENGE_TEXTS[idx];
}
const LEADERBOARD_KEY = "dmt_daily_leaderboard";
const PLAYER_NAME_KEY = "dmt_daily_player_name";
function loadLeaderboard() {
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    if (!raw) return [];
    const store = JSON.parse(raw);
    if (store.date !== getTodayKey()) {
      localStorage.removeItem(LEADERBOARD_KEY);
      return [];
    }
    return store.entries;
  } catch {
    return [];
  }
}
function saveLeaderboard(entries) {
  try {
    const store = { date: getTodayKey(), entries };
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(store));
  } catch {
  }
}
function loadPlayerName() {
  try {
    return localStorage.getItem(PLAYER_NAME_KEY) ?? "";
  } catch {
    return "";
  }
}
function savePlayerName(name) {
  try {
    localStorage.setItem(PLAYER_NAME_KEY, name);
  } catch {
  }
}
function sortedTopTen(entries) {
  return [...entries].sort((a, b) => b.wpm - a.wpm || b.accuracy - a.accuracy).slice(0, 10);
}
const DAILY_FAQS = [
  {
    q: "How often does the daily challenge text change?",
    a: "The challenge text changes every day at midnight. All users see the same text on a given day, making it a fair daily competition."
  },
  {
    q: "Can I submit my score to the leaderboard?",
    a: "Yes. After completing the challenge, enter your name and click Submit Score to appear on today's leaderboard."
  },
  {
    q: "Does the daily leaderboard reset?",
    a: "Yes. The daily leaderboard resets automatically each day. Only today's scores are shown."
  },
  {
    q: "What happens if I do not finish the challenge text?",
    a: "You must complete the entire challenge text before submitting your score. Partial completions are not recorded."
  },
  {
    q: "How is today's challenge text chosen?",
    a: "The challenge text is selected from a pool of 30 curated texts based on the day of the year, so the same text never repeats within a month."
  }
];
function DailyTypingChallengePage({
  onBack,
  onNavigate
}) {
  const challengeText = getTodayChallengeText();
  const todayKey = getTodayKey();
  const [state, setState] = reactExports.useState("idle");
  const [typed, setTyped] = reactExports.useState("");
  const [elapsed, setElapsed] = reactExports.useState(0);
  const [wpm, setWpm] = reactExports.useState(0);
  const [accuracy, setAccuracy] = reactExports.useState(100);
  const [finalWpm, setFinalWpm] = reactExports.useState(0);
  const [finalAccuracy, setFinalAccuracy] = reactExports.useState(100);
  const [finalTime, setFinalTime] = reactExports.useState(0);
  const [playerName, setPlayerName] = reactExports.useState(loadPlayerName);
  const [submitted, setSubmitted] = reactExports.useState(false);
  const [leaderboard, setLeaderboard] = reactExports.useState(
    () => sortedTopTen(loadLeaderboard())
  );
  const textareaRef = reactExports.useRef(null);
  const timerRef = reactExports.useRef(null);
  const startTimeRef = reactExports.useRef(0);
  reactExports.useEffect(() => {
    if (state === "running") {
      startTimeRef.current = Date.now() - elapsed * 1e3;
      timerRef.current = setInterval(() => {
        const sec = Math.floor((Date.now() - startTimeRef.current) / 1e3);
        setElapsed(sec);
      }, 500);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [state]);
  const calcStats = reactExports.useCallback(
    (currentTyped, currentElapsed) => {
      const wordCount = currentTyped.trim() ? currentTyped.trim().split(/\s+/).length : 0;
      const mins = currentElapsed / 60 || 1 / 60;
      const currentWpm = Math.round(wordCount / mins);
      let errors = 0;
      for (let i = 0; i < currentTyped.length; i++) {
        if (currentTyped[i] !== challengeText[i]) errors++;
      }
      const currentAcc = currentTyped.length > 0 ? Math.max(
        0,
        Math.round(
          (currentTyped.length - errors) / currentTyped.length * 100
        )
      ) : 100;
      setWpm(currentWpm);
      setAccuracy(currentAcc);
      return { wpm: currentWpm, accuracy: currentAcc };
    },
    [challengeText]
  );
  const finish = reactExports.useCallback(
    (currentTyped, currentElapsed) => {
      if (timerRef.current) clearInterval(timerRef.current);
      const stats = calcStats(currentTyped, currentElapsed);
      setFinalWpm(stats.wpm);
      setFinalAccuracy(stats.accuracy);
      setFinalTime(currentElapsed);
      setState("finished");
      trackDailyChallengeCompleted({
        wpm: stats.wpm,
        accuracy: stats.accuracy,
        timeTaken: currentElapsed
      });
    },
    [calcStats]
  );
  const handleInput = (e) => {
    if (state !== "running") return;
    const value = e.target.value;
    if (value.length > challengeText.length) return;
    setTyped(value);
    const currentElapsed = Math.floor(
      (Date.now() - startTimeRef.current) / 1e3
    );
    calcStats(value, currentElapsed);
    if (value.length === challengeText.length) {
      finish(value, currentElapsed);
    }
  };
  const startChallenge = () => {
    setTyped("");
    setElapsed(0);
    setWpm(0);
    setAccuracy(100);
    setSubmitted(false);
    setState("running");
    setTimeout(() => {
      var _a;
      return (_a = textareaRef.current) == null ? void 0 : _a.focus();
    }, 80);
  };
  const handleSubmitScore = () => {
    if (!playerName.trim()) return;
    savePlayerName(playerName.trim());
    const entry = {
      name: playerName.trim(),
      wpm: finalWpm,
      accuracy: finalAccuracy,
      timeTaken: finalTime,
      date: todayKey
    };
    const existing = loadLeaderboard();
    const updated = sortedTopTen([...existing, entry]);
    saveLeaderboard(updated);
    setLeaderboard(updated);
    updateTypingProgress(finalWpm, finalTime);
    setSubmitted(true);
  };
  const renderText = () => challengeText.split("").map((char, i) => {
    let color = "#94a3b8";
    if (i < typed.length) {
      color = typed[i] === char ? "#4ade80" : "#f87171";
    }
    const isCursor = i === typed.length && state === "running";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        style: {
          color,
          borderBottom: isCursor ? "2px solid #60a5fa" : "none",
          transition: "color 0.08s"
        },
        children: char
      },
      i
    );
  });
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
  };
  const medal = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return String(rank);
  };
  const card = {
    background: "#111827",
    borderRadius: "1rem",
    padding: "1.5rem",
    marginBottom: "1.5rem",
    border: "1px solid #1e293b"
  };
  const statBox = {
    background: "#1e293b",
    borderRadius: "0.75rem",
    padding: "0.75rem 1rem",
    textAlign: "center",
    minWidth: "80px"
  };
  const btnPrimary = {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "0.5rem",
    padding: "0.65rem 1.75rem",
    fontSize: "0.95rem",
    fontWeight: 600,
    cursor: "pointer"
  };
  const btnSuccess = {
    background: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: "0.5rem",
    padding: "0.65rem 1.75rem",
    fontSize: "0.95rem",
    fontWeight: 600,
    cursor: "pointer"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        color: "#f1f5f9",
        fontFamily: "'Segoe UI', sans-serif",
        padding: "1.5rem 1rem"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SEO,
          {
            title: "Daily Typing Challenge – New Challenge Every Day | DocMasterTools",
            description: "Take the daily typing challenge on DocMasterTools. A fresh typing challenge text every day with a leaderboard. Improve your speed and accuracy daily.",
            canonicalUrl: "https://docmastertools.com/daily-typing-challenge",
            ogImage: "/assets/generated/docmastertools-logo.dim_540x270.png"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          BreadcrumbSchema,
          {
            items: [
              { name: "Home", url: "https://docmastertools.com/" },
              {
                name: "Daily Typing Challenge",
                url: "https://docmastertools.com/daily-typing-challenge"
              }
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { maxWidth: "800px", margin: "0 auto" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: onBack,
              "data-ocid": "daily_challenge.back_button",
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
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 14 }),
                " Back to Home"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center", marginBottom: "2rem" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  marginBottom: "0.5rem"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { size: 28, color: "#f97316" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h1",
                    {
                      style: {
                        color: "#fff",
                        fontSize: "1.75rem",
                        fontWeight: 800,
                        margin: 0
                      },
                      children: "Daily Typing Challenge"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { color: "#94a3b8", fontSize: "0.9rem" }, children: [
              "Today's challenge —",
              " ",
              (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
              })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                style: {
                  color: "#64748b",
                  fontSize: "0.78rem",
                  marginTop: "0.25rem"
                },
                children: "Everyone gets the same text today. Type it all to submit your score."
              }
            )
          ] }),
          (state === "running" || state === "finished") && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                display: "flex",
                gap: "0.75rem",
                justifyContent: "center",
                flexWrap: "wrap",
                marginBottom: "1.25rem"
              },
              "data-ocid": "daily_challenge.stats_panel",
              children: [
                {
                  label: "Time",
                  value: formatTime(state === "finished" ? finalTime : elapsed),
                  color: "#38bdf8"
                },
                {
                  label: "WPM",
                  value: state === "finished" ? finalWpm : wpm,
                  color: "#4ade80"
                },
                {
                  label: "Accuracy",
                  value: `${state === "finished" ? finalAccuracy : accuracy}%`,
                  color: "#facc15"
                }
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
                    style: {
                      color: "#64748b",
                      fontSize: "0.75rem",
                      marginTop: "2px"
                    },
                    children: s.label
                  }
                )
              ] }, s.label))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: card, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                fontSize: "1rem",
                lineHeight: "2",
                letterSpacing: "0.02em",
                wordBreak: "break-word",
                userSelect: "none",
                fontFamily: "'Courier New', monospace"
              },
              children: state === "idle" ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#94a3b8" }, children: challengeText }) : renderText()
            }
          ) }),
          state === "idle" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { textAlign: "center", marginBottom: "1.5rem" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: startChallenge,
              "data-ocid": "daily_challenge.primary_button",
              style: {
                ...btnPrimary,
                fontSize: "1rem",
                padding: "0.75rem 2.5rem"
              },
              children: "Start Challenge"
            }
          ) }),
          state === "running" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "1.5rem" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                ref: textareaRef,
                value: typed,
                onChange: handleInput,
                rows: 4,
                placeholder: "Start typing the challenge text here...",
                "data-ocid": "daily_challenge.textarea",
                style: {
                  width: "100%",
                  background: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: "0.75rem",
                  color: "#f1f5f9",
                  fontSize: "0.95rem",
                  padding: "0.75rem 1rem",
                  resize: "none",
                  outline: "none",
                  boxSizing: "border-box",
                  fontFamily: "'Courier New', monospace",
                  lineHeight: "1.8"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  color: "#475569",
                  fontSize: "0.78rem",
                  textAlign: "right",
                  marginTop: "0.25rem"
                },
                children: [
                  typed.length,
                  " / ",
                  challengeText.length,
                  " characters"
                ]
              }
            )
          ] }),
          state === "finished" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...card, border: "1px solid #16a34a" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "1rem"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 20, color: "#facc15" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      style: { color: "#4ade80", fontWeight: 700, fontSize: "1rem" },
                      children: "Challenge Complete!"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  display: "flex",
                  gap: "0.75rem",
                  flexWrap: "wrap",
                  marginBottom: "1.5rem"
                },
                children: [
                  { label: "WPM", value: finalWpm, color: "#4ade80" },
                  {
                    label: "Accuracy",
                    value: `${finalAccuracy}%`,
                    color: "#facc15"
                  },
                  {
                    label: "Time Taken",
                    value: formatTime(finalTime),
                    color: "#38bdf8"
                  }
                ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: { ...statBox, flex: 1, minWidth: "90px" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            color: s.color,
                            fontSize: "1.5rem",
                            fontWeight: 700
                          },
                          children: s.value
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            color: "#64748b",
                            fontSize: "0.75rem",
                            marginTop: "2px"
                          },
                          children: s.label
                        }
                      )
                    ]
                  },
                  s.label
                ))
              }
            ),
            !submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  style: {
                    color: "#94a3b8",
                    fontSize: "0.875rem",
                    marginBottom: "0.75rem"
                  },
                  children: "Enter your name to submit your score to today's leaderboard:"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: { display: "flex", gap: "0.75rem", flexWrap: "wrap" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "text",
                        value: playerName,
                        onChange: (e) => setPlayerName(e.target.value),
                        placeholder: "Your name",
                        maxLength: 30,
                        "data-ocid": "daily_challenge.input",
                        style: {
                          flex: 1,
                          minWidth: "160px",
                          background: "#0f172a",
                          border: "1px solid #334155",
                          borderRadius: "0.5rem",
                          color: "#f1f5f9",
                          padding: "0.6rem 0.875rem",
                          fontSize: "0.9rem",
                          outline: "none"
                        },
                        onKeyDown: (e) => {
                          if (e.key === "Enter" && playerName.trim())
                            handleSubmitScore();
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: handleSubmitScore,
                        disabled: !playerName.trim(),
                        "data-ocid": "daily_challenge.submit_button",
                        style: {
                          ...btnSuccess,
                          opacity: playerName.trim() ? 1 : 0.5,
                          cursor: playerName.trim() ? "pointer" : "not-allowed"
                        },
                        children: "Submit Score"
                      }
                    )
                  ]
                }
              )
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#4ade80", fontWeight: 600 }, children: "Score submitted to today's leaderboard!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: "1rem" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: startChallenge,
                "data-ocid": "daily_challenge.secondary_button",
                style: {
                  background: "transparent",
                  border: "1px solid #334155",
                  color: "#94a3b8",
                  borderRadius: "0.5rem",
                  padding: "0.5rem 1.25rem",
                  cursor: "pointer",
                  fontSize: "0.875rem"
                },
                children: "Try Again"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: card, "data-ocid": "daily_challenge.table", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "1rem"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 18, color: "#facc15" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h2",
                    {
                      style: {
                        color: "#fff",
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        margin: 0
                      },
                      children: "Today's Leaderboard"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      style: {
                        marginLeft: "auto",
                        background: "#1e293b",
                        color: "#64748b",
                        fontSize: "0.7rem",
                        padding: "0.2rem 0.6rem",
                        borderRadius: "999px"
                      },
                      children: todayKey
                    }
                  )
                ]
              }
            ),
            leaderboard.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  textAlign: "center",
                  padding: "2rem",
                  color: "#475569",
                  fontSize: "0.9rem"
                },
                "data-ocid": "daily_challenge.empty_state",
                children: "No scores yet today. Be the first to complete the challenge!"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { overflowX: "auto" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { style: { width: "100%", borderCollapse: "collapse" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: ["Rank", "Player", "WPM", "Accuracy", "Time", "Date"].map(
                (h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "th",
                  {
                    style: {
                      textAlign: "left",
                      padding: "0.5rem 0.75rem",
                      color: "#64748b",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      borderBottom: "1px solid #1e293b"
                    },
                    children: h
                  },
                  h
                )
              ) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: leaderboard.map((entry, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  "data-ocid": `daily_challenge.row.${idx + 1}`,
                  style: {
                    background: idx % 2 === 0 ? "transparent" : "#0f172a22"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        style: {
                          padding: "0.6rem 0.75rem",
                          color: idx === 0 ? "#facc15" : idx === 1 ? "#94a3b8" : idx === 2 ? "#cd7f32" : "#64748b",
                          fontWeight: idx < 3 ? 700 : 400,
                          fontSize: "1rem"
                        },
                        children: medal(idx + 1)
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        style: {
                          padding: "0.6rem 0.75rem",
                          color: "#e2e8f0",
                          fontSize: "0.875rem",
                          fontWeight: idx < 3 ? 600 : 400
                        },
                        children: entry.name
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        style: {
                          padding: "0.6rem 0.75rem",
                          color: "#4ade80",
                          fontWeight: 700,
                          fontSize: "0.875rem"
                        },
                        children: entry.wpm
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "td",
                      {
                        style: {
                          padding: "0.6rem 0.75rem",
                          color: "#facc15",
                          fontSize: "0.875rem"
                        },
                        children: [
                          entry.accuracy,
                          "%"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        style: {
                          padding: "0.6rem 0.75rem",
                          color: "#38bdf8",
                          fontSize: "0.875rem"
                        },
                        children: formatTime(entry.timeTaken)
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        style: {
                          padding: "0.6rem 0.75rem",
                          color: "#475569",
                          fontSize: "0.78rem"
                        },
                        children: entry.date
                      }
                    )
                  ]
                },
                `${entry.name}-${idx}`
              )) })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              style: {
                textAlign: "center",
                color: "#334155",
                fontSize: "0.75rem",
                marginTop: "1rem",
                marginBottom: "2rem"
              },
              children: "Leaderboard resets daily at midnight. Challenge text changes every day."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TypingInternalLinks,
            {
              onNavigate: onNavigate ?? onBack,
              currentPage: "daily-typing-challenge"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TypingFAQ, { faqs: DAILY_FAQS })
        ] })
      ]
    }
  );
}
export {
  DailyTypingChallengePage as default
};
