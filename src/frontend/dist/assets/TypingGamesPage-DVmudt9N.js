import { r as reactExports, j as jsxRuntimeExports, g as trackTypingGamePlayed } from "./index-BFVPq1mW.js";
import { B as BreadcrumbSchema } from "./BreadcrumbSchema-DJGqVWYd.js";
import { S as SEO } from "./SEO-B1UZw1Ql.js";
import { T as TypingInternalLinks, a as TypingFAQ } from "./TypingInternalLinks-C_8L56vS.js";
const EASY_WORDS = [
  "the",
  "and",
  "for",
  "are",
  "but",
  "not",
  "you",
  "all",
  "can",
  "her",
  "was",
  "one",
  "our",
  "out",
  "day",
  "get",
  "has",
  "him",
  "his",
  "how",
  "man",
  "new",
  "now",
  "old",
  "see",
  "two",
  "way",
  "who",
  "boy",
  "did",
  "its",
  "let",
  "put",
  "say",
  "she",
  "too",
  "use",
  "cat",
  "dog",
  "big",
  "run",
  "fly",
  "sun",
  "fun",
  "map",
  "cup",
  "box",
  "red",
  "top",
  "hit"
];
const MEDIUM_WORDS = [
  "about",
  "above",
  "after",
  "again",
  "along",
  "angry",
  "apple",
  "avoid",
  "beach",
  "black",
  "blank",
  "brave",
  "bread",
  "bring",
  "brown",
  "build",
  "chair",
  "check",
  "child",
  "clean",
  "clear",
  "clock",
  "close",
  "cloud",
  "comes",
  "count",
  "cover",
  "craft",
  "crazy",
  "dance",
  "drive",
  "earth",
  "eight",
  "enjoy",
  "enter",
  "every",
  "exact",
  "faith",
  "false",
  "fancy",
  "field",
  "fight",
  "final",
  "first",
  "fixed",
  "flame",
  "floor",
  "focus",
  "found",
  "fresh",
  "front",
  "fruit",
  "funny",
  "games",
  "given",
  "glass",
  "globe",
  "grace",
  "grade",
  "grand",
  "grant",
  "grasp",
  "great",
  "green",
  "group",
  "grown",
  "guard",
  "guide",
  "happy",
  "heart",
  "heavy",
  "horse"
];
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
const pickWords = (count) => shuffle([...EASY_WORDS, ...MEDIUM_WORDS]).slice(0, count);
const GAME_NAMES = {
  race: "Speed Race",
  falling: "Falling Words",
  shooter: "Word Shooter"
};
function readAllGamesLeaderboard() {
  const ids = ["race", "falling", "shooter"];
  const all = [];
  for (const id of ids) {
    try {
      const raw = localStorage.getItem(`dmt_leaderboard_${id}`);
      if (!raw) continue;
      const entries = JSON.parse(raw);
      for (const e of entries) {
        all.push({ ...e, gameName: GAME_NAMES[id] });
      }
    } catch {
    }
  }
  return all.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.accuracy - a.accuracy;
  }).slice(0, 10);
}
function AllGamesLeaderboard() {
  const [entries, setEntries] = reactExports.useState(
    () => readAllGamesLeaderboard()
  );
  const refresh = () => setEntries(readAllGamesLeaderboard());
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        background: "#0f172a",
        borderRadius: "0.75rem",
        padding: "1rem",
        border: "1px solid #1e3a5f",
        marginBottom: "1.5rem"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.75rem",
              flexWrap: "wrap",
              gap: "0.5rem"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h3",
                {
                  style: {
                    color: "#e2e8f0",
                    fontSize: "1rem",
                    fontWeight: 700,
                    margin: 0
                  },
                  children: "🏆 All Games Leaderboard"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "all_games_leaderboard.refresh_button",
                  onClick: refresh,
                  style: {
                    background: "transparent",
                    color: "#38bdf8",
                    border: "1px solid #1e3a5f",
                    borderRadius: "0.35rem",
                    padding: "0.2rem 0.6rem",
                    fontSize: "0.75rem",
                    cursor: "pointer"
                  },
                  children: "↻ Refresh"
                }
              )
            ]
          }
        ),
        entries.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "data-ocid": "all_games_leaderboard.empty_state",
            style: {
              textAlign: "center",
              color: "#475569",
              fontSize: "0.85rem",
              padding: "1.5rem 0"
            },
            children: "No scores yet. Play a game and submit your score!"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { overflowX: "auto" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "table",
          {
            "data-ocid": "all_games_leaderboard.table",
            style: {
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.82rem"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: [
                "Rank",
                "Player",
                "Game",
                "Score",
                "WPM",
                "Accuracy",
                "Date"
              ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "th",
                {
                  style: {
                    color: "#64748b",
                    fontWeight: 600,
                    padding: "0.4rem 0.6rem",
                    textAlign: h === "Rank" || h === "Score" || h === "WPM" || h === "Accuracy" ? "center" : "left",
                    borderBottom: "1px solid #1e293b",
                    whiteSpace: "nowrap"
                  },
                  children: h
                },
                h
              )) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: entries.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  "data-ocid": `all_games_leaderboard.row.${i + 1}`,
                  style: {
                    background: i === 0 ? "rgba(234,179,8,0.06)" : i === 1 ? "rgba(148,163,184,0.04)" : i === 2 ? "rgba(180,83,9,0.05)" : "transparent"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        style: {
                          padding: "0.45rem 0.6rem",
                          textAlign: "center",
                          color: i < 3 ? ["#facc15", "#94a3b8", "#fb923c"][i] : "#475569",
                          fontWeight: i < 3 ? 700 : 400,
                          fontSize: i < 3 ? "1rem" : "0.82rem",
                          borderBottom: "1px solid #0f172a"
                        },
                        children: i < 3 ? MEDALS[i] : `#${i + 1}`
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        style: {
                          padding: "0.45rem 0.6rem",
                          color: "#e2e8f0",
                          fontWeight: 600,
                          borderBottom: "1px solid #0f172a",
                          maxWidth: "100px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap"
                        },
                        children: entry.name
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        style: {
                          padding: "0.45rem 0.6rem",
                          color: "#93c5fd",
                          fontWeight: 500,
                          borderBottom: "1px solid #0f172a",
                          whiteSpace: "nowrap"
                        },
                        children: entry.gameName
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        style: {
                          padding: "0.45rem 0.6rem",
                          textAlign: "center",
                          color: "#a78bfa",
                          fontWeight: 700,
                          borderBottom: "1px solid #0f172a"
                        },
                        children: entry.score
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        style: {
                          padding: "0.45rem 0.6rem",
                          textAlign: "center",
                          color: "#4ade80",
                          fontWeight: 600,
                          borderBottom: "1px solid #0f172a"
                        },
                        children: entry.wpm
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "td",
                      {
                        style: {
                          padding: "0.45rem 0.6rem",
                          textAlign: "center",
                          color: "#facc15",
                          fontWeight: 600,
                          borderBottom: "1px solid #0f172a"
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
                          padding: "0.45rem 0.6rem",
                          color: "#475569",
                          borderBottom: "1px solid #0f172a",
                          whiteSpace: "nowrap"
                        },
                        children: entry.date
                      }
                    )
                  ]
                },
                `${entry.name}-${entry.gameName}-${i}`
              )) })
            ]
          }
        ) })
      ]
    }
  );
}
function storageKey(gameId) {
  return `dmt_leaderboard_${gameId}`;
}
function readLeaderboard(gameId) {
  try {
    const raw = localStorage.getItem(storageKey(gameId));
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
function saveLeaderboard(gameId, entries) {
  localStorage.setItem(storageKey(gameId), JSON.stringify(entries));
}
function useLeaderboard(gameId) {
  const [entries, setEntries] = reactExports.useState(
    () => readLeaderboard(gameId)
  );
  const addEntry = reactExports.useCallback(
    (entry) => {
      setEntries((prev) => {
        const updated = [...prev, entry].sort((a, b) => {
          if (b.score !== a.score) return b.score - a.score;
          return b.accuracy - a.accuracy;
        }).slice(0, 10);
        saveLeaderboard(gameId, updated);
        return updated;
      });
    },
    [gameId]
  );
  const clearEntries = reactExports.useCallback(() => {
    setEntries([]);
    localStorage.removeItem(storageKey(gameId));
  }, [gameId]);
  return { entries, addEntry, clearEntries };
}
function ScoreSubmitForm({
  score,
  wpm,
  accuracy,
  onSubmit
}) {
  const [name, setName] = reactExports.useState("");
  const [submitted, setSubmitted] = reactExports.useState(false);
  const handleSubmit = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setSubmitted(true);
  };
  if (submitted) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-ocid": "leaderboard.success_state",
        style: {
          background: "#14532d",
          border: "1px solid #22c55e",
          borderRadius: "0.6rem",
          padding: "0.75rem 1rem",
          textAlign: "center",
          marginTop: "0.75rem",
          color: "#4ade80",
          fontSize: "0.9rem",
          fontWeight: 600
        },
        children: "✓ Score submitted to the leaderboard!"
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        background: "#0f172a",
        border: "1px solid #334155",
        borderRadius: "0.6rem",
        padding: "1rem",
        marginTop: "0.75rem"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "p",
          {
            style: {
              color: "#94a3b8",
              fontSize: "0.82rem",
              marginBottom: "0.6rem",
              textAlign: "center"
            },
            children: [
              "Submit your score — Score:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { style: { color: "#a78bfa" }, children: score }),
              " ·  WPM: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { style: { color: "#4ade80" }, children: wpm }),
              " ·  Accuracy:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { style: { color: "#facc15" }, children: [
                accuracy,
                "%"
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              gap: "0.5rem",
              justifyContent: "center",
              flexWrap: "wrap"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  "data-ocid": "leaderboard.name_input",
                  value: name,
                  onChange: (e) => setName(e.target.value),
                  onKeyDown: (e) => e.key === "Enter" && handleSubmit(),
                  placeholder: "Enter your name...",
                  maxLength: 30,
                  style: {
                    background: "#1e293b",
                    border: "1px solid #475569",
                    borderRadius: "0.4rem",
                    color: "#f1f5f9",
                    fontSize: "0.9rem",
                    padding: "0.5rem 0.75rem",
                    outline: "none",
                    width: "200px",
                    boxSizing: "border-box"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "leaderboard.submit_button",
                  onClick: handleSubmit,
                  disabled: !name.trim(),
                  style: {
                    background: name.trim() ? "#2563eb" : "#1e293b",
                    color: name.trim() ? "#fff" : "#475569",
                    border: "none",
                    borderRadius: "0.4rem",
                    padding: "0.5rem 1.25rem",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    cursor: name.trim() ? "pointer" : "not-allowed",
                    transition: "background 0.2s"
                  },
                  children: "Submit Score"
                }
              )
            ]
          }
        )
      ]
    }
  );
}
const MEDALS = ["🥇", "🥈", "🥉"];
function LeaderboardTable({
  entries,
  onClear,
  gameTitle
}) {
  const [confirmClear, setConfirmClear] = reactExports.useState(false);
  const handleClearClick = () => setConfirmClear(true);
  const handleCancelClear = () => setConfirmClear(false);
  const handleConfirmClear = () => {
    onClear();
    setConfirmClear(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        marginTop: "1.5rem",
        background: "#0f172a",
        borderRadius: "0.75rem",
        padding: "1rem",
        border: "1px solid #1e293b"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.75rem",
              flexWrap: "wrap",
              gap: "0.5rem"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "h3",
                {
                  style: {
                    color: "#e2e8f0",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    margin: 0
                  },
                  children: [
                    "🏆 ",
                    gameTitle,
                    " — Top 10"
                  ]
                }
              ),
              entries.length > 0 && !confirmClear && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "leaderboard.clear_button",
                  onClick: handleClearClick,
                  style: {
                    background: "transparent",
                    color: "#ef4444",
                    border: "1px solid #7f1d1d",
                    borderRadius: "0.35rem",
                    padding: "0.2rem 0.6rem",
                    fontSize: "0.75rem",
                    cursor: "pointer"
                  },
                  children: "Clear"
                }
              ),
              confirmClear && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "0.4rem", alignItems: "center" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#94a3b8", fontSize: "0.78rem" }, children: "Clear all scores?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "leaderboard.confirm_button",
                    onClick: handleConfirmClear,
                    style: {
                      background: "#ef4444",
                      color: "#fff",
                      border: "none",
                      borderRadius: "0.3rem",
                      padding: "0.2rem 0.6rem",
                      fontSize: "0.75rem",
                      cursor: "pointer"
                    },
                    children: "Yes"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "leaderboard.cancel_button",
                    onClick: handleCancelClear,
                    style: {
                      background: "transparent",
                      color: "#94a3b8",
                      border: "1px solid #334155",
                      borderRadius: "0.3rem",
                      padding: "0.2rem 0.6rem",
                      fontSize: "0.75rem",
                      cursor: "pointer"
                    },
                    children: "Cancel"
                  }
                )
              ] })
            ]
          }
        ),
        entries.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "data-ocid": "leaderboard.empty_state",
            style: {
              textAlign: "center",
              color: "#475569",
              fontSize: "0.85rem",
              padding: "1.5rem 0"
            },
            children: "No scores yet. Play a game and submit your score!"
          }
        ),
        entries.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { overflowX: "auto" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "table",
          {
            "data-ocid": "leaderboard.table",
            style: {
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.82rem"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: ["Rank", "Player", "Score", "WPM", "Accuracy", "Date"].map(
                (h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "th",
                  {
                    style: {
                      color: "#64748b",
                      fontWeight: 600,
                      padding: "0.4rem 0.6rem",
                      textAlign: h === "Rank" || h === "Score" || h === "WPM" || h === "Accuracy" ? "center" : "left",
                      borderBottom: "1px solid #1e293b",
                      whiteSpace: "nowrap"
                    },
                    children: h
                  },
                  h
                )
              ) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: entries.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  "data-ocid": `leaderboard.row.${i + 1}`,
                  style: {
                    background: i === 0 ? "rgba(234,179,8,0.06)" : i === 1 ? "rgba(148,163,184,0.04)" : i === 2 ? "rgba(180,83,9,0.05)" : "transparent"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        style: {
                          padding: "0.45rem 0.6rem",
                          textAlign: "center",
                          color: i < 3 ? ["#facc15", "#94a3b8", "#fb923c"][i] : "#475569",
                          fontWeight: i < 3 ? 700 : 400,
                          fontSize: i < 3 ? "1rem" : "0.82rem",
                          borderBottom: "1px solid #0f172a"
                        },
                        children: i < 3 ? MEDALS[i] : `#${i + 1}`
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        style: {
                          padding: "0.45rem 0.6rem",
                          color: "#e2e8f0",
                          fontWeight: 600,
                          borderBottom: "1px solid #0f172a",
                          maxWidth: "120px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap"
                        },
                        children: entry.name
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        style: {
                          padding: "0.45rem 0.6rem",
                          textAlign: "center",
                          color: "#a78bfa",
                          fontWeight: 700,
                          borderBottom: "1px solid #0f172a"
                        },
                        children: entry.score
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        style: {
                          padding: "0.45rem 0.6rem",
                          textAlign: "center",
                          color: "#4ade80",
                          fontWeight: 600,
                          borderBottom: "1px solid #0f172a"
                        },
                        children: entry.wpm
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "td",
                      {
                        style: {
                          padding: "0.45rem 0.6rem",
                          textAlign: "center",
                          color: "#facc15",
                          fontWeight: 600,
                          borderBottom: "1px solid #0f172a"
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
                          padding: "0.45rem 0.6rem",
                          color: "#475569",
                          borderBottom: "1px solid #0f172a",
                          whiteSpace: "nowrap"
                        },
                        children: entry.date
                      }
                    )
                  ]
                },
                `${entry.name}-${i}`
              )) })
            ]
          }
        ) })
      ]
    }
  );
}
function StatsBar({
  score,
  wpm,
  accuracy,
  timeLeft,
  timeElapsed,
  countdown
}) {
  const displayTime = countdown ? timeLeft ?? 0 : timeElapsed ?? 0;
  const timeColor = countdown && (timeLeft ?? 99) <= 10 ? "#f87171" : "#38bdf8";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      style: {
        display: "flex",
        gap: "0.75rem",
        flexWrap: "wrap",
        justifyContent: "center",
        marginBottom: "1rem"
      },
      children: [
        { label: "Score", value: score, color: "#a78bfa" },
        { label: "WPM", value: wpm, color: "#4ade80" },
        { label: "Accuracy", value: `${accuracy}%`, color: "#facc15" },
        {
          label: countdown ? "Time Left" : "Time",
          value: countdown ? `${displayTime}s` : `${displayTime}s`,
          color: timeColor
        }
      ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            background: "#1e293b",
            borderRadius: "0.6rem",
            padding: "0.5rem 1rem",
            textAlign: "center",
            minWidth: "70px"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: s.color, fontSize: "1.3rem", fontWeight: 700 }, children: s.value }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#64748b", fontSize: "0.7rem" }, children: s.label })
          ]
        },
        s.label
      ))
    }
  );
}
function SpeedRaceGame({
  onBack,
  gameId
}) {
  const TOTAL_WORDS = 30;
  const GAME_DURATION = 60;
  const [gameState, setGameState] = reactExports.useState("idle");
  const [words] = reactExports.useState(() => pickWords(TOTAL_WORDS));
  const [currentIndex, setCurrentIndex] = reactExports.useState(0);
  const [inputVal, setInputVal] = reactExports.useState("");
  const [score, setScore] = reactExports.useState(0);
  const [mistakes, setMistakes] = reactExports.useState(0);
  const [timeLeft, setTimeLeft] = reactExports.useState(GAME_DURATION);
  const [totalTyped, setTotalTyped] = reactExports.useState(0);
  const inputRef = reactExports.useRef(null);
  const timerRef = reactExports.useRef(null);
  const startTimeRef = reactExports.useRef(0);
  const { entries, addEntry, clearEntries } = useLeaderboard(gameId);
  const wpm = timeLeft < GAME_DURATION ? Math.round(score / Math.max(1, GAME_DURATION - timeLeft) * 60) : 0;
  const accuracy = totalTyped > 0 ? Math.max(0, Math.round((totalTyped - mistakes) / totalTyped * 100)) : 100;
  const progress = Math.min(100, currentIndex / TOTAL_WORDS * 100);
  const clearTimer = reactExports.useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);
  const startGame = () => {
    setCurrentIndex(0);
    setInputVal("");
    setScore(0);
    setMistakes(0);
    setTimeLeft(GAME_DURATION);
    setTotalTyped(0);
    startTimeRef.current = Date.now();
    setGameState("playing");
    setTimeout(() => {
      var _a;
      return (_a = inputRef.current) == null ? void 0 : _a.focus();
    }, 50);
  };
  const finishGame = reactExports.useCallback(() => {
    clearTimer();
    setGameState("finished");
  }, [clearTimer]);
  reactExports.useEffect(() => {
    if (gameState === "finished") {
      trackTypingGamePlayed({
        gameName: "speed_race",
        score,
        wpm,
        accuracy,
        timeTaken: GAME_DURATION - timeLeft
      });
    }
  }, [gameState, score, wpm, accuracy, timeLeft]);
  reactExports.useEffect(() => {
    if (gameState === "playing") {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            finishGame();
            return 0;
          }
          return t - 1;
        });
      }, 1e3);
    }
    return clearTimer;
  }, [gameState, finishGame, clearTimer]);
  const handleInput = (e) => {
    if (gameState !== "playing") return;
    const val = e.target.value;
    if (val.endsWith(" ")) {
      const typed = val.trim();
      setTotalTyped((n) => n + typed.length);
      if (typed === words[currentIndex]) {
        setScore((s) => s + 1);
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        if (nextIndex >= TOTAL_WORDS) finishGame();
      } else {
        setMistakes((m) => m + 1);
      }
      setInputVal("");
    } else {
      setInputVal(val);
    }
  };
  const currentWord = words[currentIndex] ?? "";
  const isMatch = inputVal.length > 0 && currentWord.startsWith(inputVal);
  const isWrong = inputVal.length > 0 && !currentWord.startsWith(inputVal);
  const handleScoreSubmit = (name) => {
    addEntry({
      name,
      score,
      wpm,
      accuracy,
      date: (/* @__PURE__ */ new Date()).toLocaleDateString()
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onBack, style: backBtnStyle, children: "← Back to Games" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "h2",
      {
        style: {
          color: "#fff",
          fontSize: "1.3rem",
          fontWeight: 700,
          marginBottom: "0.25rem",
          textAlign: "center"
        },
        children: "🏎️ Typing Speed Race"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        style: {
          color: "#94a3b8",
          textAlign: "center",
          fontSize: "0.85rem",
          marginBottom: "1rem"
        },
        children: "Type each word and press Space to move the car forward!"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StatsBar,
      {
        score,
        wpm,
        accuracy,
        timeLeft,
        timeElapsed: null,
        countdown: true
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          background: "#0f172a",
          borderRadius: "0.75rem",
          padding: "1rem",
          marginBottom: "1rem",
          border: "1px solid #334155"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                position: "relative",
                height: "60px",
                background: "#1e293b",
                borderRadius: "0.5rem",
                overflow: "hidden",
                marginBottom: "0.5rem"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      top: "50%",
                      left: 0,
                      right: 0,
                      height: "2px",
                      background: "repeating-linear-gradient(to right, #475569 0px, #475569 20px, transparent 20px, transparent 40px)",
                      transform: "translateY(-50%)"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      top: "50%",
                      transform: "translateY(-50%)",
                      left: `${Math.max(2, Math.min(90, progress))}%`,
                      fontSize: "1.8rem",
                      transition: "left 0.3s ease-out"
                    },
                    children: "🏎️"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      right: "4px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: "1.5rem"
                    },
                    children: "🏁"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.72rem",
                color: "#64748b"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Start" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  currentIndex,
                  "/",
                  TOTAL_WORDS,
                  " words"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Finish" })
              ]
            }
          )
        ]
      }
    ),
    gameState !== "idle" && gameState !== "finished" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center", marginBottom: "0.75rem" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            display: "flex",
            gap: "0.4rem",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: "0.75rem"
          },
          children: words.slice(Math.max(0, currentIndex - 1), currentIndex + 5).map((w, i) => {
            const absIdx = Math.max(0, currentIndex - 1) + i;
            const isCurrent = absIdx === currentIndex;
            const isDone = absIdx < currentIndex;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                style: {
                  padding: "0.2rem 0.5rem",
                  borderRadius: "0.3rem",
                  fontSize: isCurrent ? "1.1rem" : "0.9rem",
                  fontWeight: isCurrent ? 700 : 400,
                  background: isDone ? "#1e3a2f" : isCurrent ? "#1e3a5f" : "transparent",
                  color: isDone ? "#4ade80" : isCurrent ? "#93c5fd" : "#64748b",
                  border: isCurrent ? "1px solid #3b82f6" : "1px solid transparent"
                },
                children: [
                  isDone ? "✓ " : "",
                  w
                ]
              },
              absIdx
            );
          })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          ref: inputRef,
          value: inputVal,
          onChange: handleInput,
          placeholder: "Type the highlighted word and press Space...",
          style: {
            background: isWrong ? "#2d1515" : isMatch ? "#152d1e" : "#0f172a",
            border: `1px solid ${isWrong ? "#ef4444" : isMatch ? "#22c55e" : "#334155"}`,
            borderRadius: "0.5rem",
            color: "#f1f5f9",
            fontSize: "1rem",
            padding: "0.6rem 1rem",
            outline: "none",
            width: "100%",
            maxWidth: "400px",
            boxSizing: "border-box"
          }
        }
      )
    ] }),
    gameState === "finished" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ResultCard,
      {
        score,
        wpm,
        accuracy,
        onRestart: startGame,
        onScoreSubmit: handleScoreSubmit
      }
    ),
    (gameState === "idle" || gameState === "finished") && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { textAlign: "center", marginTop: "0.75rem" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: startGame, style: primaryBtnStyle, children: gameState === "finished" ? "🔄 Play Again" : "🚀 Start Race" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      LeaderboardTable,
      {
        entries,
        onClear: clearEntries,
        gameTitle: "Typing Speed Race"
      }
    )
  ] });
}
function FallingWordsGame({
  onBack,
  gameId
}) {
  const GAME_DURATION = 60;
  const AREA_HEIGHT = 300;
  const [gameState, setGameState] = reactExports.useState("idle");
  const [fallingWords, setFallingWords] = reactExports.useState([]);
  const [inputVal, setInputVal] = reactExports.useState("");
  const [score, setScore] = reactExports.useState(0);
  const [missed, setMissed] = reactExports.useState(0);
  const [totalTyped, setTotalTyped] = reactExports.useState(0);
  const [timeLeft, setTimeLeft] = reactExports.useState(GAME_DURATION);
  const counterRef = reactExports.useRef(0);
  const timerRef = reactExports.useRef(null);
  const spawnRef = reactExports.useRef(null);
  const rafRef = reactExports.useRef(null);
  const inputRef = reactExports.useRef(null);
  const gameStateRef = reactExports.useRef("idle");
  const wordPoolRef = reactExports.useRef(
    shuffle([...EASY_WORDS, ...MEDIUM_WORDS])
  );
  const poolIndexRef = reactExports.useRef(0);
  const { entries, addEntry, clearEntries } = useLeaderboard(gameId);
  const wpm = timeLeft < GAME_DURATION ? Math.round(score / Math.max(1, GAME_DURATION - timeLeft) * 60) : 0;
  const accuracy = totalTyped > 0 ? Math.max(0, Math.round(score / Math.max(1, score + missed) * 100)) : 100;
  const clearAll = reactExports.useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (spawnRef.current) clearInterval(spawnRef.current);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);
  const finishGame = reactExports.useCallback(() => {
    clearAll();
    gameStateRef.current = "finished";
    setGameState("finished");
  }, [clearAll]);
  reactExports.useEffect(() => {
    if (gameState === "finished") {
      trackTypingGamePlayed({
        gameName: "falling_words",
        score,
        wpm,
        accuracy,
        timeTaken: GAME_DURATION - timeLeft
      });
    }
  }, [gameState, score, wpm, accuracy, timeLeft]);
  const spawnWord = reactExports.useCallback(() => {
    if (gameStateRef.current !== "playing") return;
    const pool = wordPoolRef.current;
    const word = pool[poolIndexRef.current % pool.length];
    poolIndexRef.current++;
    const speed = 0.4 + Math.random() * 0.5 + Math.max(0, (GAME_DURATION - timeLeft) / 120);
    counterRef.current++;
    const id = counterRef.current;
    setFallingWords((prev) => [
      ...prev,
      {
        id,
        word,
        x: 5 + Math.random() * 75,
        y: -30,
        speed,
        hit: false,
        missed: false
      }
    ]);
  }, [timeLeft]);
  const startGame = () => {
    clearAll();
    setFallingWords([]);
    setInputVal("");
    setScore(0);
    setMissed(0);
    setTotalTyped(0);
    setTimeLeft(GAME_DURATION);
    poolIndexRef.current = 0;
    wordPoolRef.current = shuffle([...EASY_WORDS, ...MEDIUM_WORDS]);
    gameStateRef.current = "playing";
    setGameState("playing");
    setTimeout(() => {
      var _a;
      return (_a = inputRef.current) == null ? void 0 : _a.focus();
    }, 50);
  };
  reactExports.useEffect(() => {
    if (gameState !== "playing") return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          finishGame();
          return 0;
        }
        return t - 1;
      });
    }, 1e3);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, finishGame]);
  reactExports.useEffect(() => {
    if (gameState !== "playing") return;
    spawnRef.current = setInterval(spawnWord, 1800);
    spawnWord();
    return () => {
      if (spawnRef.current) clearInterval(spawnRef.current);
    };
  }, [gameState, spawnWord]);
  reactExports.useEffect(() => {
    if (gameState !== "playing") return;
    const animate = () => {
      setFallingWords((prev) => {
        const updated = prev.map((w) => {
          if (w.hit) return w;
          const newY = w.y + w.speed;
          if (newY > AREA_HEIGHT && !w.missed) {
            setMissed((m) => m + 1);
            return { ...w, y: newY, missed: true };
          }
          return { ...w, y: newY };
        }).filter((w) => w.y < AREA_HEIGHT + 60);
        return updated;
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [gameState]);
  const handleInput = (e) => {
    if (gameState !== "playing") return;
    const val = e.target.value;
    setInputVal(val);
    const typed = val.trim();
    setFallingWords((prev) => {
      const match = prev.find((w) => !w.hit && !w.missed && w.word === typed);
      if (match) {
        setScore((s) => s + 1);
        setTotalTyped((n) => n + typed.length);
        setInputVal("");
        return prev.map((w) => w.id === match.id ? { ...w, hit: true } : w);
      }
      return prev;
    });
  };
  const handleScoreSubmit = (name) => {
    addEntry({
      name,
      score,
      wpm,
      accuracy,
      date: (/* @__PURE__ */ new Date()).toLocaleDateString()
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onBack, style: backBtnStyle, children: "← Back to Games" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "h2",
      {
        style: {
          color: "#fff",
          fontSize: "1.3rem",
          fontWeight: 700,
          marginBottom: "0.25rem",
          textAlign: "center"
        },
        children: "🌧️ Falling Words"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        style: {
          color: "#94a3b8",
          textAlign: "center",
          fontSize: "0.85rem",
          marginBottom: "1rem"
        },
        children: "Type the falling words before they reach the bottom!"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StatsBar,
      {
        score,
        wpm,
        accuracy,
        timeLeft,
        timeElapsed: null,
        countdown: true
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          position: "relative",
          height: `${AREA_HEIGHT}px`,
          background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
          borderRadius: "0.75rem",
          overflow: "hidden",
          marginBottom: "0.75rem",
          border: "1px solid #334155"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "linear-gradient(to right, transparent, #ef4444, transparent)",
                opacity: 0.6
              }
            }
          ),
          [...Array(20)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                position: "absolute",
                left: `${(i * 17 + 3) % 97}%`,
                top: `${(i * 23 + 5) % 90}%`,
                width: "2px",
                height: "2px",
                background: "#475569",
                borderRadius: "50%"
              }
            },
            `star-${(i * 17 + 3) % 97}-${(i * 23 + 5) % 90}`
          )),
          fallingWords.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                position: "absolute",
                left: `${w.x}%`,
                top: `${w.y}px`,
                background: w.hit ? "#166534" : w.missed ? "#7f1d1d" : "#1e3a5f",
                border: `1px solid ${w.hit ? "#22c55e" : w.missed ? "#ef4444" : "#3b82f6"}`,
                borderRadius: "0.4rem",
                padding: "0.2rem 0.5rem",
                color: w.hit ? "#4ade80" : w.missed ? "#fca5a5" : "#93c5fd",
                fontSize: "0.9rem",
                fontWeight: 600,
                whiteSpace: "nowrap",
                transition: w.hit ? "opacity 0.3s" : void 0,
                opacity: w.hit ? 0 : 1,
                pointerEvents: "none"
              },
              children: w.word
            },
            w.id
          )),
          gameState === "idle" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#64748b", fontSize: "0.9rem" }, children: "Press Start to begin" })
            }
          )
        ]
      }
    ),
    gameState === "playing" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { textAlign: "center" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: inputRef,
        value: inputVal,
        onChange: handleInput,
        placeholder: "Type a falling word...",
        style: {
          background: "#0f172a",
          border: "1px solid #334155",
          borderRadius: "0.5rem",
          color: "#f1f5f9",
          fontSize: "1rem",
          padding: "0.6rem 1rem",
          outline: "none",
          width: "100%",
          maxWidth: "380px",
          boxSizing: "border-box"
        }
      }
    ) }),
    gameState === "finished" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ResultCard,
      {
        score,
        wpm,
        accuracy,
        onRestart: startGame,
        onScoreSubmit: handleScoreSubmit
      }
    ),
    (gameState === "idle" || gameState === "finished") && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { textAlign: "center", marginTop: "0.75rem" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: startGame, style: primaryBtnStyle, children: gameState === "finished" ? "🔄 Play Again" : "🚀 Start Game" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      LeaderboardTable,
      {
        entries,
        onClear: clearEntries,
        gameTitle: "Falling Words"
      }
    )
  ] });
}
function WordShooterGame({
  onBack,
  gameId
}) {
  const GAME_DURATION = 60;
  const MAX_TARGETS = 8;
  const [gameState, setGameState] = reactExports.useState("idle");
  const [targets, setTargets] = reactExports.useState([]);
  const [inputVal, setInputVal] = reactExports.useState("");
  const [score, setScore] = reactExports.useState(0);
  const [missed, setMissed] = reactExports.useState(0);
  const [timeLeft, setTimeLeft] = reactExports.useState(GAME_DURATION);
  const counterRef = reactExports.useRef(0);
  const timerRef = reactExports.useRef(null);
  const spawnRef = reactExports.useRef(null);
  const inputRef = reactExports.useRef(null);
  const gameStateRef = reactExports.useRef("idle");
  const wordPoolRef = reactExports.useRef([]);
  const poolIndexRef = reactExports.useRef(0);
  const { entries, addEntry, clearEntries } = useLeaderboard(gameId);
  const wpm = timeLeft < GAME_DURATION ? Math.round(score / Math.max(1, GAME_DURATION - timeLeft) * 60) : 0;
  const total = score + missed;
  const accuracy = total > 0 ? Math.round(score / total * 100) : 100;
  const clearAll = reactExports.useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (spawnRef.current) clearInterval(spawnRef.current);
  }, []);
  const finishGame = reactExports.useCallback(() => {
    clearAll();
    gameStateRef.current = "finished";
    setGameState("finished");
  }, [clearAll]);
  reactExports.useEffect(() => {
    if (gameState === "finished") {
      trackTypingGamePlayed({
        gameName: "word_shooter",
        score,
        wpm,
        accuracy,
        timeTaken: GAME_DURATION - timeLeft
      });
    }
  }, [gameState, score, wpm, accuracy, timeLeft]);
  const spawnTarget = reactExports.useCallback(() => {
    if (gameStateRef.current !== "playing") return;
    setTargets((prev) => {
      const active = prev.filter((t) => !t.destroyed && !t.hit);
      if (active.length >= MAX_TARGETS) return prev;
      const pool = wordPoolRef.current;
      const word = pool[poolIndexRef.current % pool.length];
      poolIndexRef.current++;
      counterRef.current++;
      return [
        ...prev.filter((t) => !t.destroyed),
        { id: counterRef.current, word, destroyed: false, hit: false }
      ];
    });
  }, []);
  const startGame = () => {
    clearAll();
    wordPoolRef.current = shuffle([...EASY_WORDS, ...MEDIUM_WORDS]);
    poolIndexRef.current = 0;
    setTargets([]);
    setInputVal("");
    setScore(0);
    setMissed(0);
    setTimeLeft(GAME_DURATION);
    gameStateRef.current = "playing";
    setGameState("playing");
    setTimeout(() => {
      var _a;
      return (_a = inputRef.current) == null ? void 0 : _a.focus();
    }, 50);
  };
  reactExports.useEffect(() => {
    if (gameState !== "playing") return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          finishGame();
          return 0;
        }
        return t - 1;
      });
    }, 1e3);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, finishGame]);
  reactExports.useEffect(() => {
    if (gameState !== "playing") return;
    spawnRef.current = setInterval(spawnTarget, 1500);
    spawnTarget();
    return () => {
      if (spawnRef.current) clearInterval(spawnRef.current);
    };
  }, [gameState, spawnTarget]);
  reactExports.useEffect(() => {
    if (gameState !== "playing") return;
    const expiry = setInterval(() => {
      setTargets((prev) => {
        return prev.map((t) => {
          if (!t.destroyed && !t.hit) {
            return t;
          }
          return t;
        });
      });
    }, 3e3);
    return () => clearInterval(expiry);
  }, [gameState]);
  const handleInput = (e) => {
    if (gameState !== "playing") return;
    const val = e.target.value;
    setInputVal(val);
    const typed = val.trim();
    setTargets((prev) => {
      const match = prev.find(
        (t) => !t.destroyed && !t.hit && t.word === typed
      );
      if (match) {
        setScore((s) => s + 1);
        setInputVal("");
        const updated = prev.map(
          (t) => t.id === match.id ? { ...t, hit: true } : t
        );
        setTimeout(() => {
          setTargets(
            (p) => p.map((t) => t.id === match.id ? { ...t, destroyed: true } : t)
          );
        }, 500);
        return updated;
      }
      return prev;
    });
  };
  const activeTargets = targets.filter((t) => !t.destroyed);
  const handleScoreSubmit = (name) => {
    addEntry({
      name,
      score,
      wpm,
      accuracy,
      date: (/* @__PURE__ */ new Date()).toLocaleDateString()
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onBack, style: backBtnStyle, children: "← Back to Games" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "h2",
      {
        style: {
          color: "#fff",
          fontSize: "1.3rem",
          fontWeight: 700,
          marginBottom: "0.25rem",
          textAlign: "center"
        },
        children: "🎯 Word Shooter"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        style: {
          color: "#94a3b8",
          textAlign: "center",
          fontSize: "0.85rem",
          marginBottom: "1rem"
        },
        children: "Type a word exactly to shoot and destroy the target!"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StatsBar,
      {
        score,
        wpm,
        accuracy,
        timeLeft,
        timeElapsed: null,
        countdown: true
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          background: "#0f172a",
          borderRadius: "0.75rem",
          padding: "1rem",
          minHeight: "200px",
          marginBottom: "0.75rem",
          border: "1px solid #334155",
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          alignContent: "flex-start"
        },
        children: [
          gameState === "idle" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: { width: "100%", textAlign: "center", paddingTop: "3rem" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#64748b", fontSize: "0.9rem" }, children: "Press Start to begin shooting!" })
            }
          ),
          activeTargets.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                background: t.hit ? "#1f2d1f" : "#1e293b",
                border: `2px solid ${t.hit ? "#22c55e" : "#ef4444"}`,
                borderRadius: "0.5rem",
                padding: "0.4rem 0.75rem",
                color: t.hit ? "#4ade80" : "#fca5a5",
                fontSize: "0.95rem",
                fontWeight: 600,
                cursor: "default",
                transition: "all 0.3s",
                transform: t.hit ? "scale(1.1)" : "scale(1)",
                opacity: t.hit ? 0.5 : 1,
                position: "relative"
              },
              children: [
                t.hit && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      position: "absolute",
                      top: "-8px",
                      right: "-8px",
                      fontSize: "0.9rem"
                    },
                    children: "💥"
                  }
                ),
                t.word
              ]
            },
            t.id
          )),
          gameState === "playing" && activeTargets.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#475569", fontSize: "0.85rem", padding: "1rem" }, children: "Loading targets..." })
        ]
      }
    ),
    gameState === "playing" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          ref: inputRef,
          value: inputVal,
          onChange: handleInput,
          placeholder: "Type a target word to shoot it...",
          style: {
            background: "#0f172a",
            border: "1px solid #334155",
            borderRadius: "0.5rem",
            color: "#f1f5f9",
            fontSize: "1rem",
            padding: "0.6rem 1rem",
            outline: "none",
            width: "100%",
            maxWidth: "380px",
            boxSizing: "border-box"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "p",
        {
          style: {
            color: "#475569",
            fontSize: "0.75rem",
            marginTop: "0.3rem"
          },
          children: [
            activeTargets.length,
            " targets active"
          ]
        }
      )
    ] }),
    gameState === "finished" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ResultCard,
      {
        score,
        wpm,
        accuracy,
        onRestart: startGame,
        onScoreSubmit: handleScoreSubmit
      }
    ),
    (gameState === "idle" || gameState === "finished") && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { textAlign: "center", marginTop: "0.75rem" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: startGame, style: primaryBtnStyle, children: gameState === "finished" ? "🔄 Play Again" : "🚀 Start Shooting" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      LeaderboardTable,
      {
        entries,
        onClear: clearEntries,
        gameTitle: "Word Shooter"
      }
    )
  ] });
}
function ResultCard({
  score,
  wpm,
  accuracy,
  onRestart: _onRestart,
  onScoreSubmit
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        background: "#1e293b",
        borderRadius: "0.75rem",
        padding: "1.25rem",
        textAlign: "center",
        marginBottom: "0.75rem",
        border: "1px solid #334155"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "1.5rem", marginBottom: "0.5rem" }, children: "🎉" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              color: "#4ade80",
              fontSize: "1.1rem",
              fontWeight: 700,
              marginBottom: "0.5rem"
            },
            children: "Game Over!"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: "#cbd5e1", fontSize: "0.9rem" }, children: [
          "Score: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { style: { color: "#a78bfa" }, children: score }),
          " ·  WPM: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { style: { color: "#4ade80" }, children: wpm }),
          " ·  Accuracy:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { style: { color: "#facc15" }, children: [
            accuracy,
            "%"
          ] })
        ] }),
        onScoreSubmit && /* @__PURE__ */ jsxRuntimeExports.jsx(
          ScoreSubmitForm,
          {
            score,
            wpm,
            accuracy,
            onSubmit: onScoreSubmit
          }
        )
      ]
    }
  );
}
const primaryBtnStyle = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "0.5rem",
  padding: "0.65rem 1.75rem",
  fontSize: "0.95rem",
  fontWeight: 600,
  cursor: "pointer"
};
const backBtnStyle = {
  background: "transparent",
  color: "#94a3b8",
  border: "1px solid #334155",
  borderRadius: "0.4rem",
  padding: "0.3rem 0.75rem",
  fontSize: "0.8rem",
  cursor: "pointer",
  marginBottom: "1rem",
  display: "block"
};
const GAMES = [
  {
    id: "race",
    emoji: "🏎️",
    title: "Typing Speed Race",
    desc: "Type words to drive your car to the finish line"
  },
  {
    id: "falling",
    emoji: "🌧️",
    title: "Falling Words",
    desc: "Catch falling words before they hit the ground"
  },
  {
    id: "shooter",
    emoji: "🎯",
    title: "Word Shooter",
    desc: "Shoot targets by typing the matching word"
  }
];
const GAMES_FAQS = [
  {
    q: "Do typing games actually improve typing speed?",
    a: "Yes. Typing games make practice engaging and help build muscle memory through repetition in a fun, low-pressure environment."
  },
  {
    q: "What is the Falling Words typing game?",
    a: "In Falling Words, words drop from the top of the screen. You must type each word correctly before it reaches the bottom to score points."
  },
  {
    q: "How does the Speed Race game work?",
    a: "In Speed Race, typing words correctly moves your car forward on a race track. The faster and more accurately you type, the faster your car moves."
  },
  {
    q: "Is Word Shooter suitable for beginners?",
    a: "Yes. Word Shooter is suitable for all levels. Beginners can start at an easy pace while advanced users can challenge themselves with harder word lists."
  },
  {
    q: "Are the leaderboard scores saved permanently?",
    a: "Leaderboard scores are saved in your browser's local storage and persist across sessions unless you clear your browser data."
  }
];
function TypingGamesPage({
  onBack,
  onNavigate
}) {
  const [activeGame, setActiveGame] = reactExports.useState(null);
  const containerStyle = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    padding: "1.5rem 1rem",
    fontFamily: "'Segoe UI', sans-serif"
  };
  const innerStyle = {
    maxWidth: "780px",
    margin: "0 auto"
  };
  const cardStyle = {
    background: "#111827",
    borderRadius: "1rem",
    padding: "1.75rem",
    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
    minHeight: "60vh"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: containerStyle, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SEO,
      {
        title: "Typing Games – Speed Race, Falling Words & Word Shooter | DocMasterTools",
        description: "Play free typing games to improve your speed and accuracy. Speed Race, Falling Words, and Word Shooter — fun typing challenges with leaderboards.",
        canonicalUrl: "https://docmastertools.com/typing-games",
        ogImage: "/assets/generated/docmastertools-logo.dim_540x270.png"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BreadcrumbSchema,
      {
        items: [
          { name: "Home", url: "https://docmastertools.com/" },
          {
            name: "Typing Games",
            url: "https://docmastertools.com/typing-games"
          }
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: innerStyle, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "1.5rem" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onBack,
            "data-ocid": "typing_games.back_button",
            style: {
              background: "transparent",
              color: "#94a3b8",
              border: "1px solid #334155",
              borderRadius: "0.4rem",
              padding: "0.35rem 0.9rem",
              fontSize: "0.82rem",
              cursor: "pointer",
              marginBottom: "1rem"
            },
            children: "← Back to Home"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h1",
          {
            style: {
              color: "#fff",
              fontSize: "1.75rem",
              fontWeight: 800,
              margin: 0,
              textAlign: "center"
            },
            children: "🎮 Typing Games"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            style: {
              color: "#94a3b8",
              textAlign: "center",
              marginTop: "0.4rem",
              fontSize: "0.9rem"
            },
            children: "Learn to type faster through fun interactive games"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
        !activeGame && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AllGamesLeaderboard, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              style: {
                color: "#e2e8f0",
                fontSize: "1rem",
                fontWeight: 600,
                marginBottom: "1rem",
                textAlign: "center"
              },
              children: "Choose a Game"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1rem",
                marginBottom: "1.5rem"
              },
              children: GAMES.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setActiveGame(g.id),
                  "data-ocid": `typing_games.${g.id}_card`,
                  style: {
                    background: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "0.75rem",
                    padding: "1.25rem",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "border-color 0.2s, background 0.2s"
                  },
                  onMouseEnter: (e) => {
                    e.currentTarget.style.borderColor = "#3b82f6";
                    e.currentTarget.style.background = "#1e3a5f";
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.borderColor = "#334155";
                    e.currentTarget.style.background = "#1e293b";
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "2rem", marginBottom: "0.5rem" }, children: g.emoji }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          color: "#fff",
                          fontWeight: 700,
                          fontSize: "0.95rem",
                          marginBottom: "0.25rem"
                        },
                        children: g.title
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#64748b", fontSize: "0.8rem" }, children: g.desc })
                  ]
                },
                g.id
              ))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                background: "#0f172a",
                borderRadius: "0.75rem",
                padding: "1rem",
                border: "1px solid #1e293b"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h3",
                  {
                    style: {
                      color: "#94a3b8",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      marginBottom: "0.5rem"
                    },
                    children: "💡 How to use Typing Games"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "ul",
                  {
                    style: {
                      color: "#64748b",
                      fontSize: "0.8rem",
                      margin: 0,
                      paddingLeft: "1.25rem",
                      lineHeight: "1.8"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Each game runs for 60 seconds" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Type words accurately — speed will follow naturally" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "All three games track Score, WPM, Accuracy, and Time" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Submit your score after each game to join the leaderboard" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Practice daily to see consistent improvement" })
                    ]
                  }
                )
              ]
            }
          )
        ] }),
        activeGame === "race" && /* @__PURE__ */ jsxRuntimeExports.jsx(SpeedRaceGame, { onBack: () => setActiveGame(null), gameId: "race" }),
        activeGame === "falling" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          FallingWordsGame,
          {
            onBack: () => setActiveGame(null),
            gameId: "falling"
          }
        ),
        activeGame === "shooter" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          WordShooterGame,
          {
            onBack: () => setActiveGame(null),
            gameId: "shooter"
          }
        )
      ] }),
      !activeGame && /* @__PURE__ */ jsxRuntimeExports.jsx(
        TypingInternalLinks,
        {
          onNavigate: onNavigate ?? onBack,
          currentPage: "typing-games"
        }
      ),
      !activeGame && /* @__PURE__ */ jsxRuntimeExports.jsx(TypingFAQ, { faqs: GAMES_FAQS })
    ] })
  ] });
}
export {
  TypingGamesPage as default
};
