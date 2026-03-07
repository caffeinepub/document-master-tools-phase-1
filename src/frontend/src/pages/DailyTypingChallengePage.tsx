import { ArrowLeft, Flame, Trophy } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import BreadcrumbSchema from "../components/BreadcrumbSchema";
import SEO from "../components/SEO";
import TypingFAQ, { type FAQItem } from "../components/TypingFAQ";
import TypingInternalLinks from "../components/TypingInternalLinks";
import { trackDailyChallengeCompleted } from "../utils/analytics";
import { updateTypingProgress } from "../utils/typingProgress";

// ─── Challenge Texts (30 entries, one per day of year rotation) ───────────────
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
  "Practice with purpose makes perfect. Identify the keys and combinations that slow you down the most, and target them specifically during your daily typing practice sessions.",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

function getTodayKey(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function getTodayChallengeText(): string {
  const idx = getDayOfYear(new Date()) % CHALLENGE_TEXTS.length;
  return CHALLENGE_TEXTS[idx];
}

// ─── Leaderboard storage ──────────────────────────────────────────────────────
const LEADERBOARD_KEY = "dmt_daily_leaderboard";
const PLAYER_NAME_KEY = "dmt_daily_player_name";

interface LeaderboardEntry {
  name: string;
  wpm: number;
  accuracy: number;
  timeTaken: number; // seconds
  date: string;
}

interface LeaderboardStore {
  date: string;
  entries: LeaderboardEntry[];
}

function loadLeaderboard(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    if (!raw) return [];
    const store: LeaderboardStore = JSON.parse(raw);
    if (store.date !== getTodayKey()) {
      localStorage.removeItem(LEADERBOARD_KEY);
      return [];
    }
    return store.entries;
  } catch {
    return [];
  }
}

function saveLeaderboard(entries: LeaderboardEntry[]): void {
  try {
    const store: LeaderboardStore = { date: getTodayKey(), entries };
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(store));
  } catch {
    // ignore
  }
}

function loadPlayerName(): string {
  try {
    return localStorage.getItem(PLAYER_NAME_KEY) ?? "";
  } catch {
    return "";
  }
}

function savePlayerName(name: string): void {
  try {
    localStorage.setItem(PLAYER_NAME_KEY, name);
  } catch {
    // ignore
  }
}

function sortedTopTen(entries: LeaderboardEntry[]): LeaderboardEntry[] {
  return [...entries]
    .sort((a, b) => b.wpm - a.wpm || b.accuracy - a.accuracy)
    .slice(0, 10);
}

// ─── Types ────────────────────────────────────────────────────────────────────
type ChallengeState = "idle" | "running" | "finished";

const DAILY_FAQS: FAQItem[] = [
  {
    q: "How often does the daily challenge text change?",
    a: "The challenge text changes every day at midnight. All users see the same text on a given day, making it a fair daily competition.",
  },
  {
    q: "Can I submit my score to the leaderboard?",
    a: "Yes. After completing the challenge, enter your name and click Submit Score to appear on today's leaderboard.",
  },
  {
    q: "Does the daily leaderboard reset?",
    a: "Yes. The daily leaderboard resets automatically each day. Only today's scores are shown.",
  },
  {
    q: "What happens if I do not finish the challenge text?",
    a: "You must complete the entire challenge text before submitting your score. Partial completions are not recorded.",
  },
  {
    q: "How is today's challenge text chosen?",
    a: "The challenge text is selected from a pool of 30 curated texts based on the day of the year, so the same text never repeats within a month.",
  },
];

interface DailyTypingChallengePageProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function DailyTypingChallengePage({
  onBack,
  onNavigate,
}: DailyTypingChallengePageProps) {
  const challengeText = getTodayChallengeText();
  const todayKey = getTodayKey();

  const [state, setState] = useState<ChallengeState>("idle");
  const [typed, setTyped] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [finalWpm, setFinalWpm] = useState(0);
  const [finalAccuracy, setFinalAccuracy] = useState(100);
  const [finalTime, setFinalTime] = useState(0);
  const [playerName, setPlayerName] = useState(loadPlayerName);
  const [submitted, setSubmitted] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(() =>
    sortedTopTen(loadLeaderboard()),
  );

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);

  // ── Timer ──
  // biome-ignore lint/correctness/useExhaustiveDependencies: elapsed is intentionally excluded to avoid re-creating the interval on each tick
  useEffect(() => {
    if (state === "running") {
      startTimeRef.current = Date.now() - elapsed * 1000;
      timerRef.current = setInterval(() => {
        const sec = Math.floor((Date.now() - startTimeRef.current) / 1000);
        setElapsed(sec);
      }, 500);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [state]);

  // ── Live stats calc ──
  const calcStats = useCallback(
    (currentTyped: string, currentElapsed: number) => {
      const wordCount = currentTyped.trim()
        ? currentTyped.trim().split(/\s+/).length
        : 0;
      const mins = currentElapsed / 60 || 1 / 60;
      const currentWpm = Math.round(wordCount / mins);

      let errors = 0;
      for (let i = 0; i < currentTyped.length; i++) {
        if (currentTyped[i] !== challengeText[i]) errors++;
      }
      const currentAcc =
        currentTyped.length > 0
          ? Math.max(
              0,
              Math.round(
                ((currentTyped.length - errors) / currentTyped.length) * 100,
              ),
            )
          : 100;

      setWpm(currentWpm);
      setAccuracy(currentAcc);
      return { wpm: currentWpm, accuracy: currentAcc };
    },
    [challengeText],
  );

  const finish = useCallback(
    (currentTyped: string, currentElapsed: number) => {
      if (timerRef.current) clearInterval(timerRef.current);
      const stats = calcStats(currentTyped, currentElapsed);
      setFinalWpm(stats.wpm);
      setFinalAccuracy(stats.accuracy);
      setFinalTime(currentElapsed);
      setState("finished");
      // GA4: track daily challenge completion
      trackDailyChallengeCompleted({
        wpm: stats.wpm,
        accuracy: stats.accuracy,
        timeTaken: currentElapsed,
      });
    },
    [calcStats],
  );

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (state !== "running") return;
    const value = e.target.value;
    // Prevent typing beyond challenge text length
    if (value.length > challengeText.length) return;
    setTyped(value);
    const currentElapsed = Math.floor(
      (Date.now() - startTimeRef.current) / 1000,
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
    setTimeout(() => textareaRef.current?.focus(), 80);
  };

  const handleSubmitScore = () => {
    if (!playerName.trim()) return;
    savePlayerName(playerName.trim());
    const entry: LeaderboardEntry = {
      name: playerName.trim(),
      wpm: finalWpm,
      accuracy: finalAccuracy,
      timeTaken: finalTime,
      date: todayKey,
    };
    const existing = loadLeaderboard();
    const updated = sortedTopTen([...existing, entry]);
    saveLeaderboard(updated);
    setLeaderboard(updated);
    updateTypingProgress(finalWpm, finalTime);
    setSubmitted(true);
  };

  // ── Per-character highlighted text ──
  const renderText = () =>
    challengeText.split("").map((char, i) => {
      let color = "#94a3b8";
      if (i < typed.length) {
        color = typed[i] === char ? "#4ade80" : "#f87171";
      }
      const isCursor = i === typed.length && state === "running";
      return (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: character-level rendering requires stable index keys
          key={i}
          style={{
            color,
            borderBottom: isCursor ? "2px solid #60a5fa" : "none",
            transition: "color 0.08s",
          }}
        >
          {char}
        </span>
      );
    });

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
  };

  const medal = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return String(rank);
  };

  // ── Styles ──
  const card: React.CSSProperties = {
    background: "#111827",
    borderRadius: "1rem",
    padding: "1.5rem",
    marginBottom: "1.5rem",
    border: "1px solid #1e293b",
  };

  const statBox: React.CSSProperties = {
    background: "#1e293b",
    borderRadius: "0.75rem",
    padding: "0.75rem 1rem",
    textAlign: "center",
    minWidth: "80px",
  };

  const btnPrimary: React.CSSProperties = {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "0.5rem",
    padding: "0.65rem 1.75rem",
    fontSize: "0.95rem",
    fontWeight: 600,
    cursor: "pointer",
  };

  const btnSuccess: React.CSSProperties = {
    background: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: "0.5rem",
    padding: "0.65rem 1.75rem",
    fontSize: "0.95rem",
    fontWeight: 600,
    cursor: "pointer",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        color: "#f1f5f9",
        fontFamily: "'Segoe UI', sans-serif",
        padding: "1.5rem 1rem",
      }}
    >
      <SEO
        title="Daily Typing Challenge – New Challenge Every Day | DocMasterTools"
        description="Take the daily typing challenge on DocMasterTools. A fresh typing challenge text every day with a leaderboard. Improve your speed and accuracy daily."
        canonicalUrl="https://docmastertools.com/daily-typing-challenge"
        ogImage="/assets/generated/docmastertools-logo.dim_540x270.png"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://docmastertools.com/" },
          {
            name: "Daily Typing Challenge",
            url: "https://docmastertools.com/daily-typing-challenge",
          },
        ]}
      />
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Back button */}
        <button
          type="button"
          onClick={onBack}
          data-ocid="daily_challenge.back_button"
          style={{
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
            fontSize: "0.875rem",
          }}
        >
          <ArrowLeft size={14} /> Back to Home
        </button>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              marginBottom: "0.5rem",
            }}
          >
            <Flame size={28} color="#f97316" />
            <h1
              style={{
                color: "#fff",
                fontSize: "1.75rem",
                fontWeight: 800,
                margin: 0,
              }}
            >
              Daily Typing Challenge
            </h1>
          </div>
          <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
            Today's challenge —{" "}
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p
            style={{
              color: "#64748b",
              fontSize: "0.78rem",
              marginTop: "0.25rem",
            }}
          >
            Everyone gets the same text today. Type it all to submit your score.
          </p>
        </div>

        {/* Live Stats Bar */}
        {(state === "running" || state === "finished") && (
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: "1.25rem",
            }}
            data-ocid="daily_challenge.stats_panel"
          >
            {[
              {
                label: "Time",
                value: formatTime(state === "finished" ? finalTime : elapsed),
                color: "#38bdf8",
              },
              {
                label: "WPM",
                value: state === "finished" ? finalWpm : wpm,
                color: "#4ade80",
              },
              {
                label: "Accuracy",
                value: `${state === "finished" ? finalAccuracy : accuracy}%`,
                color: "#facc15",
              },
            ].map((s) => (
              <div key={s.label} style={statBox}>
                <div
                  style={{
                    color: s.color,
                    fontSize: "1.4rem",
                    fontWeight: 700,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    color: "#64748b",
                    fontSize: "0.75rem",
                    marginTop: "2px",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Challenge Text */}
        <div style={card}>
          <div
            style={{
              fontSize: "1rem",
              lineHeight: "2",
              letterSpacing: "0.02em",
              wordBreak: "break-word",
              userSelect: "none",
              fontFamily: "'Courier New', monospace",
            }}
          >
            {state === "idle" ? (
              <span style={{ color: "#94a3b8" }}>{challengeText}</span>
            ) : (
              renderText()
            )}
          </div>
        </div>

        {/* Start button (idle) */}
        {state === "idle" && (
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <button
              type="button"
              onClick={startChallenge}
              data-ocid="daily_challenge.primary_button"
              style={{
                ...btnPrimary,
                fontSize: "1rem",
                padding: "0.75rem 2.5rem",
              }}
            >
              Start Challenge
            </button>
          </div>
        )}

        {/* Typing Input (running) */}
        {state === "running" && (
          <div style={{ marginBottom: "1.5rem" }}>
            <textarea
              ref={textareaRef}
              value={typed}
              onChange={handleInput}
              rows={4}
              placeholder="Start typing the challenge text here..."
              data-ocid="daily_challenge.textarea"
              style={{
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
                lineHeight: "1.8",
              }}
            />
            <div
              style={{
                color: "#475569",
                fontSize: "0.78rem",
                textAlign: "right",
                marginTop: "0.25rem",
              }}
            >
              {typed.length} / {challengeText.length} characters
            </div>
          </div>
        )}

        {/* Result Panel (finished) */}
        {state === "finished" && (
          <div style={{ ...card, border: "1px solid #16a34a" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "1rem",
              }}
            >
              <Trophy size={20} color="#facc15" />
              <span
                style={{ color: "#4ade80", fontWeight: 700, fontSize: "1rem" }}
              >
                Challenge Complete!
              </span>
            </div>

            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                flexWrap: "wrap",
                marginBottom: "1.5rem",
              }}
            >
              {[
                { label: "WPM", value: finalWpm, color: "#4ade80" },
                {
                  label: "Accuracy",
                  value: `${finalAccuracy}%`,
                  color: "#facc15",
                },
                {
                  label: "Time Taken",
                  value: formatTime(finalTime),
                  color: "#38bdf8",
                },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{ ...statBox, flex: 1, minWidth: "90px" }}
                >
                  <div
                    style={{
                      color: s.color,
                      fontSize: "1.5rem",
                      fontWeight: 700,
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      color: "#64748b",
                      fontSize: "0.75rem",
                      marginTop: "2px",
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {!submitted ? (
              <div>
                <p
                  style={{
                    color: "#94a3b8",
                    fontSize: "0.875rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  Enter your name to submit your score to today's leaderboard:
                </p>
                <div
                  style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}
                >
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="Your name"
                    maxLength={30}
                    data-ocid="daily_challenge.input"
                    style={{
                      flex: 1,
                      minWidth: "160px",
                      background: "#0f172a",
                      border: "1px solid #334155",
                      borderRadius: "0.5rem",
                      color: "#f1f5f9",
                      padding: "0.6rem 0.875rem",
                      fontSize: "0.9rem",
                      outline: "none",
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && playerName.trim())
                        handleSubmitScore();
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleSubmitScore}
                    disabled={!playerName.trim()}
                    data-ocid="daily_challenge.submit_button"
                    style={{
                      ...btnSuccess,
                      opacity: playerName.trim() ? 1 : 0.5,
                      cursor: playerName.trim() ? "pointer" : "not-allowed",
                    }}
                  >
                    Submit Score
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ color: "#4ade80", fontWeight: 600 }}>
                Score submitted to today's leaderboard!
              </div>
            )}

            <div style={{ marginTop: "1rem" }}>
              <button
                type="button"
                onClick={startChallenge}
                data-ocid="daily_challenge.secondary_button"
                style={{
                  background: "transparent",
                  border: "1px solid #334155",
                  color: "#94a3b8",
                  borderRadius: "0.5rem",
                  padding: "0.5rem 1.25rem",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                }}
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Today's Leaderboard */}
        <div style={card} data-ocid="daily_challenge.table">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            <Trophy size={18} color="#facc15" />
            <h2
              style={{
                color: "#fff",
                fontSize: "1.1rem",
                fontWeight: 700,
                margin: 0,
              }}
            >
              Today's Leaderboard
            </h2>
            <span
              style={{
                marginLeft: "auto",
                background: "#1e293b",
                color: "#64748b",
                fontSize: "0.7rem",
                padding: "0.2rem 0.6rem",
                borderRadius: "999px",
              }}
            >
              {todayKey}
            </span>
          </div>

          {leaderboard.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "2rem",
                color: "#475569",
                fontSize: "0.9rem",
              }}
              data-ocid="daily_challenge.empty_state"
            >
              No scores yet today. Be the first to complete the challenge!
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {["Rank", "Player", "WPM", "Accuracy", "Time", "Date"].map(
                      (h) => (
                        <th
                          key={h}
                          style={{
                            textAlign: "left",
                            padding: "0.5rem 0.75rem",
                            color: "#64748b",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            textTransform: "uppercase",
                            borderBottom: "1px solid #1e293b",
                          }}
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, idx) => (
                    <tr
                      key={`${entry.name}-${idx}`}
                      data-ocid={`daily_challenge.row.${idx + 1}`}
                      style={{
                        background: idx % 2 === 0 ? "transparent" : "#0f172a22",
                      }}
                    >
                      <td
                        style={{
                          padding: "0.6rem 0.75rem",
                          color:
                            idx === 0
                              ? "#facc15"
                              : idx === 1
                                ? "#94a3b8"
                                : idx === 2
                                  ? "#cd7f32"
                                  : "#64748b",
                          fontWeight: idx < 3 ? 700 : 400,
                          fontSize: "1rem",
                        }}
                      >
                        {medal(idx + 1)}
                      </td>
                      <td
                        style={{
                          padding: "0.6rem 0.75rem",
                          color: "#e2e8f0",
                          fontSize: "0.875rem",
                          fontWeight: idx < 3 ? 600 : 400,
                        }}
                      >
                        {entry.name}
                      </td>
                      <td
                        style={{
                          padding: "0.6rem 0.75rem",
                          color: "#4ade80",
                          fontWeight: 700,
                          fontSize: "0.875rem",
                        }}
                      >
                        {entry.wpm}
                      </td>
                      <td
                        style={{
                          padding: "0.6rem 0.75rem",
                          color: "#facc15",
                          fontSize: "0.875rem",
                        }}
                      >
                        {entry.accuracy}%
                      </td>
                      <td
                        style={{
                          padding: "0.6rem 0.75rem",
                          color: "#38bdf8",
                          fontSize: "0.875rem",
                        }}
                      >
                        {formatTime(entry.timeTaken)}
                      </td>
                      <td
                        style={{
                          padding: "0.6rem 0.75rem",
                          color: "#475569",
                          fontSize: "0.78rem",
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

        {/* Footer note */}
        <p
          style={{
            textAlign: "center",
            color: "#334155",
            fontSize: "0.75rem",
            marginTop: "1rem",
            marginBottom: "2rem",
          }}
        >
          Leaderboard resets daily at midnight. Challenge text changes every
          day.
        </p>

        {/* Internal Links */}
        <TypingInternalLinks
          onNavigate={onNavigate ?? onBack}
          currentPage="daily-typing-challenge"
        />

        {/* FAQ */}
        <TypingFAQ faqs={DAILY_FAQS} />
      </div>
    </div>
  );
}
