import { useCallback, useEffect, useRef, useState } from "react";
import SEO from "../components/SEO";
import TypingFAQ, { type FAQItem } from "../components/TypingFAQ";
import TypingInternalLinks from "../components/TypingInternalLinks";

// ─── Word lists ───────────────────────────────────────────────────────────────
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
  "hit",
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
  "horse",
];

const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

const pickWords = (count: number): string[] =>
  shuffle([...EASY_WORDS, ...MEDIUM_WORDS]).slice(0, count);

// ─── Leaderboard types & hook ─────────────────────────────────────────────────
type GameId = "race" | "falling" | "shooter";

interface LeaderboardEntry {
  name: string;
  score: number;
  wpm: number;
  accuracy: number;
  date: string;
}

interface AllGamesEntry extends LeaderboardEntry {
  gameName: string;
}

const GAME_NAMES: Record<GameId, string> = {
  race: "Speed Race",
  falling: "Falling Words",
  shooter: "Word Shooter",
};

function readAllGamesLeaderboard(): AllGamesEntry[] {
  const ids: GameId[] = ["race", "falling", "shooter"];
  const all: AllGamesEntry[] = [];
  for (const id of ids) {
    try {
      const raw = localStorage.getItem(`dmt_leaderboard_${id}`);
      if (!raw) continue;
      const entries = JSON.parse(raw) as LeaderboardEntry[];
      for (const e of entries) {
        all.push({ ...e, gameName: GAME_NAMES[id] });
      }
    } catch {
      // ignore parse errors
    }
  }
  return all
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.accuracy - a.accuracy;
    })
    .slice(0, 10);
}

// ─── All Games Leaderboard ────────────────────────────────────────────────────
function AllGamesLeaderboard() {
  const [entries, setEntries] = useState<AllGamesEntry[]>(() =>
    readAllGamesLeaderboard(),
  );

  const refresh = () => setEntries(readAllGamesLeaderboard());

  return (
    <div
      style={{
        background: "#0f172a",
        borderRadius: "0.75rem",
        padding: "1rem",
        border: "1px solid #1e3a5f",
        marginBottom: "1.5rem",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.75rem",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <h3
          style={{
            color: "#e2e8f0",
            fontSize: "1rem",
            fontWeight: 700,
            margin: 0,
          }}
        >
          🏆 All Games Leaderboard
        </h3>
        <button
          type="button"
          data-ocid="all_games_leaderboard.refresh_button"
          onClick={refresh}
          style={{
            background: "transparent",
            color: "#38bdf8",
            border: "1px solid #1e3a5f",
            borderRadius: "0.35rem",
            padding: "0.2rem 0.6rem",
            fontSize: "0.75rem",
            cursor: "pointer",
          }}
        >
          ↻ Refresh
        </button>
      </div>

      {entries.length === 0 ? (
        <div
          data-ocid="all_games_leaderboard.empty_state"
          style={{
            textAlign: "center",
            color: "#475569",
            fontSize: "0.85rem",
            padding: "1.5rem 0",
          }}
        >
          No scores yet. Play a game and submit your score!
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            data-ocid="all_games_leaderboard.table"
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.82rem",
            }}
          >
            <thead>
              <tr>
                {[
                  "Rank",
                  "Player",
                  "Game",
                  "Score",
                  "WPM",
                  "Accuracy",
                  "Date",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      color: "#64748b",
                      fontWeight: 600,
                      padding: "0.4rem 0.6rem",
                      textAlign:
                        h === "Rank" ||
                        h === "Score" ||
                        h === "WPM" ||
                        h === "Accuracy"
                          ? "center"
                          : "left",
                      borderBottom: "1px solid #1e293b",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, i) => (
                <tr
                  key={`${entry.name}-${entry.gameName}-${i}`}
                  data-ocid={`all_games_leaderboard.row.${i + 1}`}
                  style={{
                    background:
                      i === 0
                        ? "rgba(234,179,8,0.06)"
                        : i === 1
                          ? "rgba(148,163,184,0.04)"
                          : i === 2
                            ? "rgba(180,83,9,0.05)"
                            : "transparent",
                  }}
                >
                  <td
                    style={{
                      padding: "0.45rem 0.6rem",
                      textAlign: "center",
                      color:
                        i < 3
                          ? ["#facc15", "#94a3b8", "#fb923c"][i]
                          : "#475569",
                      fontWeight: i < 3 ? 700 : 400,
                      fontSize: i < 3 ? "1rem" : "0.82rem",
                      borderBottom: "1px solid #0f172a",
                    }}
                  >
                    {i < 3 ? MEDALS[i] : `#${i + 1}`}
                  </td>
                  <td
                    style={{
                      padding: "0.45rem 0.6rem",
                      color: "#e2e8f0",
                      fontWeight: 600,
                      borderBottom: "1px solid #0f172a",
                      maxWidth: "100px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {entry.name}
                  </td>
                  <td
                    style={{
                      padding: "0.45rem 0.6rem",
                      color: "#93c5fd",
                      fontWeight: 500,
                      borderBottom: "1px solid #0f172a",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {entry.gameName}
                  </td>
                  <td
                    style={{
                      padding: "0.45rem 0.6rem",
                      textAlign: "center",
                      color: "#a78bfa",
                      fontWeight: 700,
                      borderBottom: "1px solid #0f172a",
                    }}
                  >
                    {entry.score}
                  </td>
                  <td
                    style={{
                      padding: "0.45rem 0.6rem",
                      textAlign: "center",
                      color: "#4ade80",
                      fontWeight: 600,
                      borderBottom: "1px solid #0f172a",
                    }}
                  >
                    {entry.wpm}
                  </td>
                  <td
                    style={{
                      padding: "0.45rem 0.6rem",
                      textAlign: "center",
                      color: "#facc15",
                      fontWeight: 600,
                      borderBottom: "1px solid #0f172a",
                    }}
                  >
                    {entry.accuracy}%
                  </td>
                  <td
                    style={{
                      padding: "0.45rem 0.6rem",
                      color: "#475569",
                      borderBottom: "1px solid #0f172a",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {entry.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function storageKey(gameId: GameId) {
  return `dmt_leaderboard_${gameId}`;
}

function readLeaderboard(gameId: GameId): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(storageKey(gameId));
    if (!raw) return [];
    return JSON.parse(raw) as LeaderboardEntry[];
  } catch {
    return [];
  }
}

function saveLeaderboard(gameId: GameId, entries: LeaderboardEntry[]) {
  localStorage.setItem(storageKey(gameId), JSON.stringify(entries));
}

function useLeaderboard(gameId: GameId) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>(() =>
    readLeaderboard(gameId),
  );

  const addEntry = useCallback(
    (entry: LeaderboardEntry) => {
      setEntries((prev) => {
        const updated = [...prev, entry]
          .sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return b.accuracy - a.accuracy;
          })
          .slice(0, 10);
        saveLeaderboard(gameId, updated);
        return updated;
      });
    },
    [gameId],
  );

  const clearEntries = useCallback(() => {
    setEntries([]);
    localStorage.removeItem(storageKey(gameId));
  }, [gameId]);

  return { entries, addEntry, clearEntries };
}

// ─── Score Submit Form ────────────────────────────────────────────────────────
interface ScoreSubmitFormProps {
  score: number;
  wpm: number;
  accuracy: number;
  onSubmit: (name: string) => void;
}

function ScoreSubmitForm({
  score,
  wpm,
  accuracy,
  onSubmit,
}: ScoreSubmitFormProps) {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        data-ocid="leaderboard.success_state"
        style={{
          background: "#14532d",
          border: "1px solid #22c55e",
          borderRadius: "0.6rem",
          padding: "0.75rem 1rem",
          textAlign: "center",
          marginTop: "0.75rem",
          color: "#4ade80",
          fontSize: "0.9rem",
          fontWeight: 600,
        }}
      >
        ✓ Score submitted to the leaderboard!
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#0f172a",
        border: "1px solid #334155",
        borderRadius: "0.6rem",
        padding: "1rem",
        marginTop: "0.75rem",
      }}
    >
      <p
        style={{
          color: "#94a3b8",
          fontSize: "0.82rem",
          marginBottom: "0.6rem",
          textAlign: "center",
        }}
      >
        Submit your score — Score:{" "}
        <strong style={{ color: "#a78bfa" }}>{score}</strong>
        &nbsp;·&nbsp; WPM: <strong style={{ color: "#4ade80" }}>{wpm}</strong>
        &nbsp;·&nbsp; Accuracy:{" "}
        <strong style={{ color: "#facc15" }}>{accuracy}%</strong>
      </p>
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <input
          data-ocid="leaderboard.name_input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Enter your name..."
          maxLength={30}
          style={{
            background: "#1e293b",
            border: "1px solid #475569",
            borderRadius: "0.4rem",
            color: "#f1f5f9",
            fontSize: "0.9rem",
            padding: "0.5rem 0.75rem",
            outline: "none",
            width: "200px",
            boxSizing: "border-box",
          }}
        />
        <button
          type="button"
          data-ocid="leaderboard.submit_button"
          onClick={handleSubmit}
          disabled={!name.trim()}
          style={{
            background: name.trim() ? "#2563eb" : "#1e293b",
            color: name.trim() ? "#fff" : "#475569",
            border: "none",
            borderRadius: "0.4rem",
            padding: "0.5rem 1.25rem",
            fontSize: "0.9rem",
            fontWeight: 600,
            cursor: name.trim() ? "pointer" : "not-allowed",
            transition: "background 0.2s",
          }}
        >
          Submit Score
        </button>
      </div>
    </div>
  );
}

// ─── Leaderboard Table ────────────────────────────────────────────────────────
const MEDALS = ["🥇", "🥈", "🥉"];

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  onClear: () => void;
  gameTitle: string;
}

function LeaderboardTable({
  entries,
  onClear,
  gameTitle,
}: LeaderboardTableProps) {
  const [confirmClear, setConfirmClear] = useState(false);

  const handleClearClick = () => setConfirmClear(true);
  const handleCancelClear = () => setConfirmClear(false);
  const handleConfirmClear = () => {
    onClear();
    setConfirmClear(false);
  };

  return (
    <div
      style={{
        marginTop: "1.5rem",
        background: "#0f172a",
        borderRadius: "0.75rem",
        padding: "1rem",
        border: "1px solid #1e293b",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.75rem",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <h3
          style={{
            color: "#e2e8f0",
            fontSize: "0.95rem",
            fontWeight: 700,
            margin: 0,
          }}
        >
          🏆 {gameTitle} — Top 10
        </h3>
        {entries.length > 0 && !confirmClear && (
          <button
            type="button"
            data-ocid="leaderboard.clear_button"
            onClick={handleClearClick}
            style={{
              background: "transparent",
              color: "#ef4444",
              border: "1px solid #7f1d1d",
              borderRadius: "0.35rem",
              padding: "0.2rem 0.6rem",
              fontSize: "0.75rem",
              cursor: "pointer",
            }}
          >
            Clear
          </button>
        )}
        {confirmClear && (
          <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
            <span style={{ color: "#94a3b8", fontSize: "0.78rem" }}>
              Clear all scores?
            </span>
            <button
              type="button"
              data-ocid="leaderboard.confirm_button"
              onClick={handleConfirmClear}
              style={{
                background: "#ef4444",
                color: "#fff",
                border: "none",
                borderRadius: "0.3rem",
                padding: "0.2rem 0.6rem",
                fontSize: "0.75rem",
                cursor: "pointer",
              }}
            >
              Yes
            </button>
            <button
              type="button"
              data-ocid="leaderboard.cancel_button"
              onClick={handleCancelClear}
              style={{
                background: "transparent",
                color: "#94a3b8",
                border: "1px solid #334155",
                borderRadius: "0.3rem",
                padding: "0.2rem 0.6rem",
                fontSize: "0.75rem",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Empty state */}
      {entries.length === 0 && (
        <div
          data-ocid="leaderboard.empty_state"
          style={{
            textAlign: "center",
            color: "#475569",
            fontSize: "0.85rem",
            padding: "1.5rem 0",
          }}
        >
          No scores yet. Play a game and submit your score!
        </div>
      )}

      {/* Table */}
      {entries.length > 0 && (
        <div style={{ overflowX: "auto" }}>
          <table
            data-ocid="leaderboard.table"
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.82rem",
            }}
          >
            <thead>
              <tr>
                {["Rank", "Player", "Score", "WPM", "Accuracy", "Date"].map(
                  (h) => (
                    <th
                      key={h}
                      style={{
                        color: "#64748b",
                        fontWeight: 600,
                        padding: "0.4rem 0.6rem",
                        textAlign:
                          h === "Rank" ||
                          h === "Score" ||
                          h === "WPM" ||
                          h === "Accuracy"
                            ? "center"
                            : "left",
                        borderBottom: "1px solid #1e293b",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, i) => (
                <tr
                  key={`${entry.name}-${i}`}
                  data-ocid={`leaderboard.row.${i + 1}`}
                  style={{
                    background:
                      i === 0
                        ? "rgba(234,179,8,0.06)"
                        : i === 1
                          ? "rgba(148,163,184,0.04)"
                          : i === 2
                            ? "rgba(180,83,9,0.05)"
                            : "transparent",
                  }}
                >
                  <td
                    style={{
                      padding: "0.45rem 0.6rem",
                      textAlign: "center",
                      color:
                        i < 3
                          ? ["#facc15", "#94a3b8", "#fb923c"][i]
                          : "#475569",
                      fontWeight: i < 3 ? 700 : 400,
                      fontSize: i < 3 ? "1rem" : "0.82rem",
                      borderBottom: "1px solid #0f172a",
                    }}
                  >
                    {i < 3 ? MEDALS[i] : `#${i + 1}`}
                  </td>
                  <td
                    style={{
                      padding: "0.45rem 0.6rem",
                      color: "#e2e8f0",
                      fontWeight: 600,
                      borderBottom: "1px solid #0f172a",
                      maxWidth: "120px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {entry.name}
                  </td>
                  <td
                    style={{
                      padding: "0.45rem 0.6rem",
                      textAlign: "center",
                      color: "#a78bfa",
                      fontWeight: 700,
                      borderBottom: "1px solid #0f172a",
                    }}
                  >
                    {entry.score}
                  </td>
                  <td
                    style={{
                      padding: "0.45rem 0.6rem",
                      textAlign: "center",
                      color: "#4ade80",
                      fontWeight: 600,
                      borderBottom: "1px solid #0f172a",
                    }}
                  >
                    {entry.wpm}
                  </td>
                  <td
                    style={{
                      padding: "0.45rem 0.6rem",
                      textAlign: "center",
                      color: "#facc15",
                      fontWeight: 600,
                      borderBottom: "1px solid #0f172a",
                    }}
                  >
                    {entry.accuracy}%
                  </td>
                  <td
                    style={{
                      padding: "0.45rem 0.6rem",
                      color: "#475569",
                      borderBottom: "1px solid #0f172a",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {entry.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Shared types ─────────────────────────────────────────────────────────────
type GameState = "idle" | "playing" | "paused" | "finished";

interface StatsBarProps {
  score: number;
  wpm: number;
  accuracy: number;
  timeLeft: number | null;
  timeElapsed: number | null;
  countdown?: boolean;
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────
function StatsBar({
  score,
  wpm,
  accuracy,
  timeLeft,
  timeElapsed,
  countdown,
}: StatsBarProps) {
  const displayTime = countdown ? (timeLeft ?? 0) : (timeElapsed ?? 0);
  const timeColor = countdown && (timeLeft ?? 99) <= 10 ? "#f87171" : "#38bdf8";

  return (
    <div
      style={{
        display: "flex",
        gap: "0.75rem",
        flexWrap: "wrap",
        justifyContent: "center",
        marginBottom: "1rem",
      }}
    >
      {[
        { label: "Score", value: score, color: "#a78bfa" },
        { label: "WPM", value: wpm, color: "#4ade80" },
        { label: "Accuracy", value: `${accuracy}%`, color: "#facc15" },
        {
          label: countdown ? "Time Left" : "Time",
          value: countdown ? `${displayTime}s` : `${displayTime}s`,
          color: timeColor,
        },
      ].map((s) => (
        <div
          key={s.label}
          style={{
            background: "#1e293b",
            borderRadius: "0.6rem",
            padding: "0.5rem 1rem",
            textAlign: "center",
            minWidth: "70px",
          }}
        >
          <div style={{ color: s.color, fontSize: "1.3rem", fontWeight: 700 }}>
            {s.value}
          </div>
          <div style={{ color: "#64748b", fontSize: "0.7rem" }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Game: Typing Speed Race ──────────────────────────────────────────────────
function SpeedRaceGame({
  onBack,
  gameId,
}: { onBack: () => void; gameId: GameId }) {
  const TOTAL_WORDS = 30;
  const GAME_DURATION = 60;

  const [gameState, setGameState] = useState<GameState>("idle");
  const [words] = useState(() => pickWords(TOTAL_WORDS));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputVal, setInputVal] = useState("");
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [totalTyped, setTotalTyped] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);

  const { entries, addEntry, clearEntries } = useLeaderboard(gameId);

  const wpm =
    timeLeft < GAME_DURATION
      ? Math.round((score / Math.max(1, GAME_DURATION - timeLeft)) * 60)
      : 0;

  const accuracy =
    totalTyped > 0
      ? Math.max(0, Math.round(((totalTyped - mistakes) / totalTyped) * 100))
      : 100;

  const progress = Math.min(100, (currentIndex / TOTAL_WORDS) * 100);

  const clearTimer = useCallback(() => {
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
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const finishGame = useCallback(() => {
    clearTimer();
    setGameState("finished");
  }, [clearTimer]);

  useEffect(() => {
    if (gameState === "playing") {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            finishGame();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return clearTimer;
  }, [gameState, finishGame, clearTimer]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleScoreSubmit = (name: string) => {
    addEntry({
      name,
      score,
      wpm,
      accuracy,
      date: new Date().toLocaleDateString(),
    });
  };

  return (
    <div>
      <button type="button" onClick={onBack} style={backBtnStyle}>
        ← Back to Games
      </button>
      <h2
        style={{
          color: "#fff",
          fontSize: "1.3rem",
          fontWeight: 700,
          marginBottom: "0.25rem",
          textAlign: "center",
        }}
      >
        🏎️ Typing Speed Race
      </h2>
      <p
        style={{
          color: "#94a3b8",
          textAlign: "center",
          fontSize: "0.85rem",
          marginBottom: "1rem",
        }}
      >
        Type each word and press Space to move the car forward!
      </p>

      <StatsBar
        score={score}
        wpm={wpm}
        accuracy={accuracy}
        timeLeft={timeLeft}
        timeElapsed={null}
        countdown
      />

      {/* Race track */}
      <div
        style={{
          background: "#0f172a",
          borderRadius: "0.75rem",
          padding: "1rem",
          marginBottom: "1rem",
          border: "1px solid #334155",
        }}
      >
        {/* Road */}
        <div
          style={{
            position: "relative",
            height: "60px",
            background: "#1e293b",
            borderRadius: "0.5rem",
            overflow: "hidden",
            marginBottom: "0.5rem",
          }}
        >
          {/* Road markings */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              height: "2px",
              background:
                "repeating-linear-gradient(to right, #475569 0px, #475569 20px, transparent 20px, transparent 40px)",
              transform: "translateY(-50%)",
            }}
          />
          {/* Car */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              left: `${Math.max(2, Math.min(90, progress))}%`,
              fontSize: "1.8rem",
              transition: "left 0.3s ease-out",
            }}
          >
            🏎️
          </div>
          {/* Finish flag */}
          <div
            style={{
              position: "absolute",
              right: "4px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "1.5rem",
            }}
          >
            🏁
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.72rem",
            color: "#64748b",
          }}
        >
          <span>Start</span>
          <span>
            {currentIndex}/{TOTAL_WORDS} words
          </span>
          <span>Finish</span>
        </div>
      </div>

      {/* Word display */}
      {gameState !== "idle" && gameState !== "finished" && (
        <div style={{ textAlign: "center", marginBottom: "0.75rem" }}>
          <div
            style={{
              display: "flex",
              gap: "0.4rem",
              flexWrap: "wrap",
              justifyContent: "center",
              marginBottom: "0.75rem",
            }}
          >
            {words
              .slice(Math.max(0, currentIndex - 1), currentIndex + 5)
              .map((w, i) => {
                const absIdx = Math.max(0, currentIndex - 1) + i;
                const isCurrent = absIdx === currentIndex;
                const isDone = absIdx < currentIndex;
                return (
                  <span
                    key={absIdx}
                    style={{
                      padding: "0.2rem 0.5rem",
                      borderRadius: "0.3rem",
                      fontSize: isCurrent ? "1.1rem" : "0.9rem",
                      fontWeight: isCurrent ? 700 : 400,
                      background: isDone
                        ? "#1e3a2f"
                        : isCurrent
                          ? "#1e3a5f"
                          : "transparent",
                      color: isDone
                        ? "#4ade80"
                        : isCurrent
                          ? "#93c5fd"
                          : "#64748b",
                      border: isCurrent
                        ? "1px solid #3b82f6"
                        : "1px solid transparent",
                    }}
                  >
                    {isDone ? "✓ " : ""}
                    {w}
                  </span>
                );
              })}
          </div>
          <input
            ref={inputRef}
            value={inputVal}
            onChange={handleInput}
            placeholder="Type the highlighted word and press Space..."
            style={{
              background: isWrong ? "#2d1515" : isMatch ? "#152d1e" : "#0f172a",
              border: `1px solid ${isWrong ? "#ef4444" : isMatch ? "#22c55e" : "#334155"}`,
              borderRadius: "0.5rem",
              color: "#f1f5f9",
              fontSize: "1rem",
              padding: "0.6rem 1rem",
              outline: "none",
              width: "100%",
              maxWidth: "400px",
              boxSizing: "border-box",
            }}
          />
        </div>
      )}

      {gameState === "finished" && (
        <ResultCard
          score={score}
          wpm={wpm}
          accuracy={accuracy}
          onRestart={startGame}
          onScoreSubmit={handleScoreSubmit}
        />
      )}

      {(gameState === "idle" || gameState === "finished") && (
        <div style={{ textAlign: "center", marginTop: "0.75rem" }}>
          <button type="button" onClick={startGame} style={primaryBtnStyle}>
            {gameState === "finished" ? "🔄 Play Again" : "🚀 Start Race"}
          </button>
        </div>
      )}

      {/* Leaderboard */}
      <LeaderboardTable
        entries={entries}
        onClear={clearEntries}
        gameTitle="Typing Speed Race"
      />
    </div>
  );
}

// ─── Game: Falling Words ──────────────────────────────────────────────────────
interface FallingWord {
  id: number;
  word: string;
  x: number; // % from left
  y: number; // px from top
  speed: number;
  hit: boolean;
  missed: boolean;
}

function FallingWordsGame({
  onBack,
  gameId,
}: { onBack: () => void; gameId: GameId }) {
  const GAME_DURATION = 60;
  const AREA_HEIGHT = 300;

  const [gameState, setGameState] = useState<GameState>("idle");
  const [fallingWords, setFallingWords] = useState<FallingWord[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState(0);
  const [totalTyped, setTotalTyped] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const counterRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const spawnRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const rafRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const gameStateRef = useRef<GameState>("idle");
  const wordPoolRef = useRef<string[]>(
    shuffle([...EASY_WORDS, ...MEDIUM_WORDS]),
  );
  const poolIndexRef = useRef(0);

  const { entries, addEntry, clearEntries } = useLeaderboard(gameId);

  const wpm =
    timeLeft < GAME_DURATION
      ? Math.round((score / Math.max(1, GAME_DURATION - timeLeft)) * 60)
      : 0;
  const accuracy =
    totalTyped > 0
      ? Math.max(0, Math.round((score / Math.max(1, score + missed)) * 100))
      : 100;

  const clearAll = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (spawnRef.current) clearInterval(spawnRef.current);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  const finishGame = useCallback(() => {
    clearAll();
    gameStateRef.current = "finished";
    setGameState("finished");
  }, [clearAll]);

  const spawnWord = useCallback(() => {
    if (gameStateRef.current !== "playing") return;
    const pool = wordPoolRef.current;
    const word = pool[poolIndexRef.current % pool.length];
    poolIndexRef.current++;
    const speed =
      0.4 + Math.random() * 0.5 + Math.max(0, (GAME_DURATION - timeLeft) / 120);
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
        missed: false,
      },
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
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  // Countdown timer
  useEffect(() => {
    if (gameState !== "playing") return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          finishGame();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, finishGame]);

  // Spawn words
  useEffect(() => {
    if (gameState !== "playing") return;
    spawnRef.current = setInterval(spawnWord, 1800);
    spawnWord(); // spawn immediately
    return () => {
      if (spawnRef.current) clearInterval(spawnRef.current);
    };
  }, [gameState, spawnWord]);

  // Animate falling
  useEffect(() => {
    if (gameState !== "playing") return;
    const animate = () => {
      setFallingWords((prev) => {
        const updated = prev
          .map((w) => {
            if (w.hit) return w;
            const newY = w.y + w.speed;
            if (newY > AREA_HEIGHT && !w.missed) {
              setMissed((m) => m + 1);
              return { ...w, y: newY, missed: true };
            }
            return { ...w, y: newY };
          })
          .filter((w) => w.y < AREA_HEIGHT + 60);
        return updated;
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [gameState]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        return prev.map((w) => (w.id === match.id ? { ...w, hit: true } : w));
      }
      return prev;
    });
  };

  const handleScoreSubmit = (name: string) => {
    addEntry({
      name,
      score,
      wpm,
      accuracy,
      date: new Date().toLocaleDateString(),
    });
  };

  return (
    <div>
      <button type="button" onClick={onBack} style={backBtnStyle}>
        ← Back to Games
      </button>
      <h2
        style={{
          color: "#fff",
          fontSize: "1.3rem",
          fontWeight: 700,
          marginBottom: "0.25rem",
          textAlign: "center",
        }}
      >
        🌧️ Falling Words
      </h2>
      <p
        style={{
          color: "#94a3b8",
          textAlign: "center",
          fontSize: "0.85rem",
          marginBottom: "1rem",
        }}
      >
        Type the falling words before they reach the bottom!
      </p>

      <StatsBar
        score={score}
        wpm={wpm}
        accuracy={accuracy}
        timeLeft={timeLeft}
        timeElapsed={null}
        countdown
      />

      {/* Game area */}
      <div
        style={{
          position: "relative",
          height: `${AREA_HEIGHT}px`,
          background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
          borderRadius: "0.75rem",
          overflow: "hidden",
          marginBottom: "0.75rem",
          border: "1px solid #334155",
        }}
      >
        {/* Danger zone line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "4px",
            background:
              "linear-gradient(to right, transparent, #ef4444, transparent)",
            opacity: 0.6,
          }}
        />
        {/* Stars background */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`star-${(i * 17 + 3) % 97}-${(i * 23 + 5) % 90}`}
            style={{
              position: "absolute",
              left: `${(i * 17 + 3) % 97}%`,
              top: `${(i * 23 + 5) % 90}%`,
              width: "2px",
              height: "2px",
              background: "#475569",
              borderRadius: "50%",
            }}
          />
        ))}

        {fallingWords.map((w) => (
          <div
            key={w.id}
            style={{
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
              transition: w.hit ? "opacity 0.3s" : undefined,
              opacity: w.hit ? 0 : 1,
              pointerEvents: "none",
            }}
          >
            {w.word}
          </div>
        ))}

        {gameState === "idle" && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
              Press Start to begin
            </p>
          </div>
        )}
      </div>

      {gameState === "playing" && (
        <div style={{ textAlign: "center" }}>
          <input
            ref={inputRef}
            value={inputVal}
            onChange={handleInput}
            placeholder="Type a falling word..."
            style={{
              background: "#0f172a",
              border: "1px solid #334155",
              borderRadius: "0.5rem",
              color: "#f1f5f9",
              fontSize: "1rem",
              padding: "0.6rem 1rem",
              outline: "none",
              width: "100%",
              maxWidth: "380px",
              boxSizing: "border-box",
            }}
          />
        </div>
      )}

      {gameState === "finished" && (
        <ResultCard
          score={score}
          wpm={wpm}
          accuracy={accuracy}
          onRestart={startGame}
          onScoreSubmit={handleScoreSubmit}
        />
      )}

      {(gameState === "idle" || gameState === "finished") && (
        <div style={{ textAlign: "center", marginTop: "0.75rem" }}>
          <button type="button" onClick={startGame} style={primaryBtnStyle}>
            {gameState === "finished" ? "🔄 Play Again" : "🚀 Start Game"}
          </button>
        </div>
      )}

      {/* Leaderboard */}
      <LeaderboardTable
        entries={entries}
        onClear={clearEntries}
        gameTitle="Falling Words"
      />
    </div>
  );
}

// ─── Game: Word Shooter ───────────────────────────────────────────────────────
interface Target {
  id: number;
  word: string;
  destroyed: boolean;
  hit: boolean;
}

function WordShooterGame({
  onBack,
  gameId,
}: { onBack: () => void; gameId: GameId }) {
  const GAME_DURATION = 60;
  const MAX_TARGETS = 8;

  const [gameState, setGameState] = useState<GameState>("idle");
  const [targets, setTargets] = useState<Target[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const counterRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const spawnRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const gameStateRef = useRef<GameState>("idle");
  const wordPoolRef = useRef<string[]>([]);
  const poolIndexRef = useRef(0);

  const { entries, addEntry, clearEntries } = useLeaderboard(gameId);

  const wpm =
    timeLeft < GAME_DURATION
      ? Math.round((score / Math.max(1, GAME_DURATION - timeLeft)) * 60)
      : 0;
  const total = score + missed;
  const accuracy = total > 0 ? Math.round((score / total) * 100) : 100;

  const clearAll = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (spawnRef.current) clearInterval(spawnRef.current);
  }, []);

  const finishGame = useCallback(() => {
    clearAll();
    gameStateRef.current = "finished";
    setGameState("finished");
  }, [clearAll]);

  const spawnTarget = useCallback(() => {
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
        { id: counterRef.current, word, destroyed: false, hit: false },
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
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  // Timer
  useEffect(() => {
    if (gameState !== "playing") return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          finishGame();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, finishGame]);

  // Spawn targets — they expire after 8s if not typed
  useEffect(() => {
    if (gameState !== "playing") return;
    spawnRef.current = setInterval(spawnTarget, 1500);
    spawnTarget();
    return () => {
      if (spawnRef.current) clearInterval(spawnRef.current);
    };
  }, [gameState, spawnTarget]);

  // Expire un-typed targets after 9s
  useEffect(() => {
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
    }, 3000);
    return () => clearInterval(expiry);
  }, [gameState]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (gameState !== "playing") return;
    const val = e.target.value;
    setInputVal(val);
    const typed = val.trim();

    setTargets((prev) => {
      const match = prev.find(
        (t) => !t.destroyed && !t.hit && t.word === typed,
      );
      if (match) {
        setScore((s) => s + 1);
        setInputVal("");
        const updated = prev.map((t) =>
          t.id === match.id ? { ...t, hit: true } : t,
        );
        setTimeout(() => {
          setTargets((p) =>
            p.map((t) => (t.id === match.id ? { ...t, destroyed: true } : t)),
          );
        }, 500);
        return updated;
      }
      return prev;
    });
  };

  const activeTargets = targets.filter((t) => !t.destroyed);

  const handleScoreSubmit = (name: string) => {
    addEntry({
      name,
      score,
      wpm,
      accuracy,
      date: new Date().toLocaleDateString(),
    });
  };

  return (
    <div>
      <button type="button" onClick={onBack} style={backBtnStyle}>
        ← Back to Games
      </button>
      <h2
        style={{
          color: "#fff",
          fontSize: "1.3rem",
          fontWeight: 700,
          marginBottom: "0.25rem",
          textAlign: "center",
        }}
      >
        🎯 Word Shooter
      </h2>
      <p
        style={{
          color: "#94a3b8",
          textAlign: "center",
          fontSize: "0.85rem",
          marginBottom: "1rem",
        }}
      >
        Type a word exactly to shoot and destroy the target!
      </p>

      <StatsBar
        score={score}
        wpm={wpm}
        accuracy={accuracy}
        timeLeft={timeLeft}
        timeElapsed={null}
        countdown
      />

      {/* Target grid */}
      <div
        style={{
          background: "#0f172a",
          borderRadius: "0.75rem",
          padding: "1rem",
          minHeight: "200px",
          marginBottom: "0.75rem",
          border: "1px solid #334155",
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          alignContent: "flex-start",
        }}
      >
        {gameState === "idle" && (
          <div
            style={{ width: "100%", textAlign: "center", paddingTop: "3rem" }}
          >
            <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
              Press Start to begin shooting!
            </p>
          </div>
        )}
        {activeTargets.map((t) => (
          <div
            key={t.id}
            style={{
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
              position: "relative",
            }}
          >
            {t.hit && (
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  fontSize: "0.9rem",
                }}
              >
                💥
              </span>
            )}
            {t.word}
          </div>
        ))}
        {gameState === "playing" && activeTargets.length === 0 && (
          <p style={{ color: "#475569", fontSize: "0.85rem", padding: "1rem" }}>
            Loading targets...
          </p>
        )}
      </div>

      {gameState === "playing" && (
        <div style={{ textAlign: "center" }}>
          <input
            ref={inputRef}
            value={inputVal}
            onChange={handleInput}
            placeholder="Type a target word to shoot it..."
            style={{
              background: "#0f172a",
              border: "1px solid #334155",
              borderRadius: "0.5rem",
              color: "#f1f5f9",
              fontSize: "1rem",
              padding: "0.6rem 1rem",
              outline: "none",
              width: "100%",
              maxWidth: "380px",
              boxSizing: "border-box",
            }}
          />
          <p
            style={{
              color: "#475569",
              fontSize: "0.75rem",
              marginTop: "0.3rem",
            }}
          >
            {activeTargets.length} targets active
          </p>
        </div>
      )}

      {gameState === "finished" && (
        <ResultCard
          score={score}
          wpm={wpm}
          accuracy={accuracy}
          onRestart={startGame}
          onScoreSubmit={handleScoreSubmit}
        />
      )}

      {(gameState === "idle" || gameState === "finished") && (
        <div style={{ textAlign: "center", marginTop: "0.75rem" }}>
          <button type="button" onClick={startGame} style={primaryBtnStyle}>
            {gameState === "finished" ? "🔄 Play Again" : "🚀 Start Shooting"}
          </button>
        </div>
      )}

      {/* Leaderboard */}
      <LeaderboardTable
        entries={entries}
        onClear={clearEntries}
        gameTitle="Word Shooter"
      />
    </div>
  );
}

// ─── Result Card ──────────────────────────────────────────────────────────────
function ResultCard({
  score,
  wpm,
  accuracy,
  onRestart: _onRestart,
  onScoreSubmit,
}: {
  score: number;
  wpm: number;
  accuracy: number;
  onRestart: () => void;
  onScoreSubmit?: (name: string) => void;
}) {
  return (
    <div
      style={{
        background: "#1e293b",
        borderRadius: "0.75rem",
        padding: "1.25rem",
        textAlign: "center",
        marginBottom: "0.75rem",
        border: "1px solid #334155",
      }}
    >
      <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🎉</div>
      <div
        style={{
          color: "#4ade80",
          fontSize: "1.1rem",
          fontWeight: 700,
          marginBottom: "0.5rem",
        }}
      >
        Game Over!
      </div>
      <div style={{ color: "#cbd5e1", fontSize: "0.9rem" }}>
        Score: <strong style={{ color: "#a78bfa" }}>{score}</strong>
        &nbsp;·&nbsp; WPM: <strong style={{ color: "#4ade80" }}>{wpm}</strong>
        &nbsp;·&nbsp; Accuracy:{" "}
        <strong style={{ color: "#facc15" }}>{accuracy}%</strong>
      </div>
      {onScoreSubmit && (
        <ScoreSubmitForm
          score={score}
          wpm={wpm}
          accuracy={accuracy}
          onSubmit={onScoreSubmit}
        />
      )}
    </div>
  );
}

// ─── Shared styles ────────────────────────────────────────────────────────────
const primaryBtnStyle: React.CSSProperties = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "0.5rem",
  padding: "0.65rem 1.75rem",
  fontSize: "0.95rem",
  fontWeight: 600,
  cursor: "pointer",
};

const backBtnStyle: React.CSSProperties = {
  background: "transparent",
  color: "#94a3b8",
  border: "1px solid #334155",
  borderRadius: "0.4rem",
  padding: "0.3rem 0.75rem",
  fontSize: "0.8rem",
  cursor: "pointer",
  marginBottom: "1rem",
  display: "block",
};

// ─── Game Selector ────────────────────────────────────────────────────────────
const GAMES: { id: GameId; emoji: string; title: string; desc: string }[] = [
  {
    id: "race",
    emoji: "🏎️",
    title: "Typing Speed Race",
    desc: "Type words to drive your car to the finish line",
  },
  {
    id: "falling",
    emoji: "🌧️",
    title: "Falling Words",
    desc: "Catch falling words before they hit the ground",
  },
  {
    id: "shooter",
    emoji: "🎯",
    title: "Word Shooter",
    desc: "Shoot targets by typing the matching word",
  },
];

// ─── Main Page ────────────────────────────────────────────────────────────────
const GAMES_FAQS: FAQItem[] = [
  {
    q: "Do typing games actually improve typing speed?",
    a: "Yes. Typing games make practice engaging and help build muscle memory through repetition in a fun, low-pressure environment.",
  },
  {
    q: "What is the Falling Words typing game?",
    a: "In Falling Words, words drop from the top of the screen. You must type each word correctly before it reaches the bottom to score points.",
  },
  {
    q: "How does the Speed Race game work?",
    a: "In Speed Race, typing words correctly moves your car forward on a race track. The faster and more accurately you type, the faster your car moves.",
  },
  {
    q: "Is Word Shooter suitable for beginners?",
    a: "Yes. Word Shooter is suitable for all levels. Beginners can start at an easy pace while advanced users can challenge themselves with harder word lists.",
  },
  {
    q: "Are the leaderboard scores saved permanently?",
    a: "Leaderboard scores are saved in your browser's local storage and persist across sessions unless you clear your browser data.",
  },
];

interface TypingGamesPageProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

export default function TypingGamesPage({
  onBack,
  onNavigate,
}: TypingGamesPageProps) {
  const [activeGame, setActiveGame] = useState<GameId | null>(null);

  const containerStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    padding: "1.5rem 1rem",
    fontFamily: "'Segoe UI', sans-serif",
  };

  const innerStyle: React.CSSProperties = {
    maxWidth: "780px",
    margin: "0 auto",
  };

  const cardStyle: React.CSSProperties = {
    background: "#111827",
    borderRadius: "1rem",
    padding: "1.75rem",
    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
    minHeight: "60vh",
  };

  return (
    <div style={containerStyle}>
      <SEO
        title="Typing Games – Speed Race, Falling Words & Word Shooter | DocMasterTools"
        description="Play free typing games to improve your speed and accuracy. Speed Race, Falling Words, and Word Shooter — fun typing challenges with leaderboards."
        canonicalUrl="https://docmastertools.com/typing-games"
        ogImage="/assets/generated/docmastertools-logo.dim_540x270.png"
      />
      <div style={innerStyle}>
        {/* Header */}
        <div style={{ marginBottom: "1.5rem" }}>
          <button
            type="button"
            onClick={onBack}
            data-ocid="typing_games.back_button"
            style={{
              background: "transparent",
              color: "#94a3b8",
              border: "1px solid #334155",
              borderRadius: "0.4rem",
              padding: "0.35rem 0.9rem",
              fontSize: "0.82rem",
              cursor: "pointer",
              marginBottom: "1rem",
            }}
          >
            ← Back to Home
          </button>
          <h1
            style={{
              color: "#fff",
              fontSize: "1.75rem",
              fontWeight: 800,
              margin: 0,
              textAlign: "center",
            }}
          >
            🎮 Typing Games
          </h1>
          <p
            style={{
              color: "#94a3b8",
              textAlign: "center",
              marginTop: "0.4rem",
              fontSize: "0.9rem",
            }}
          >
            Learn to type faster through fun interactive games
          </p>
        </div>

        <div style={cardStyle}>
          {/* Game selector */}
          {!activeGame && (
            <>
              {/* All Games Leaderboard */}
              <AllGamesLeaderboard />

              <h2
                style={{
                  color: "#e2e8f0",
                  fontSize: "1rem",
                  fontWeight: 600,
                  marginBottom: "1rem",
                  textAlign: "center",
                }}
              >
                Choose a Game
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                {GAMES.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setActiveGame(g.id)}
                    data-ocid={`typing_games.${g.id}_card`}
                    style={{
                      background: "#1e293b",
                      border: "1px solid #334155",
                      borderRadius: "0.75rem",
                      padding: "1.25rem",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "border-color 0.2s, background 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        "#3b82f6";
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "#1e3a5f";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        "#334155";
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "#1e293b";
                    }}
                  >
                    <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                      {g.emoji}
                    </div>
                    <div
                      style={{
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: "0.95rem",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {g.title}
                    </div>
                    <div style={{ color: "#64748b", fontSize: "0.8rem" }}>
                      {g.desc}
                    </div>
                  </button>
                ))}
              </div>

              {/* Tips */}
              <div
                style={{
                  background: "#0f172a",
                  borderRadius: "0.75rem",
                  padding: "1rem",
                  border: "1px solid #1e293b",
                }}
              >
                <h3
                  style={{
                    color: "#94a3b8",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    marginBottom: "0.5rem",
                  }}
                >
                  💡 How to use Typing Games
                </h3>
                <ul
                  style={{
                    color: "#64748b",
                    fontSize: "0.8rem",
                    margin: 0,
                    paddingLeft: "1.25rem",
                    lineHeight: "1.8",
                  }}
                >
                  <li>Each game runs for 60 seconds</li>
                  <li>Type words accurately — speed will follow naturally</li>
                  <li>All three games track Score, WPM, Accuracy, and Time</li>
                  <li>
                    Submit your score after each game to join the leaderboard
                  </li>
                  <li>Practice daily to see consistent improvement</li>
                </ul>
              </div>
            </>
          )}

          {/* Active game */}
          {activeGame === "race" && (
            <SpeedRaceGame onBack={() => setActiveGame(null)} gameId="race" />
          )}
          {activeGame === "falling" && (
            <FallingWordsGame
              onBack={() => setActiveGame(null)}
              gameId="falling"
            />
          )}
          {activeGame === "shooter" && (
            <WordShooterGame
              onBack={() => setActiveGame(null)}
              gameId="shooter"
            />
          )}
        </div>

        {/* Internal Links */}
        {!activeGame && (
          <TypingInternalLinks
            onNavigate={onNavigate ?? onBack}
            currentPage="typing-games"
          />
        )}

        {/* FAQ */}
        {!activeGame && <TypingFAQ faqs={GAMES_FAQS} />}
      </div>
    </div>
  );
}
