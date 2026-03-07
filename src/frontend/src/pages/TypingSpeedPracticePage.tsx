import { useCallback, useEffect, useRef, useState } from "react";
import BreadcrumbSchema from "../components/BreadcrumbSchema";
import SEO from "../components/SEO";
import TypingFAQ, {
  type FAQItem,
  type HowToStep,
} from "../components/TypingFAQ";
import TypingInternalLinks from "../components/TypingInternalLinks";
import TypingProgressPanel from "../components/TypingProgressPanel";
import { updateTypingProgress } from "../utils/typingProgress";

const WORD_SPRINT_WORDS =
  "the and for are but not you all can her was one our out day get has him his how man new now old see two way who boy did its let put say she too use cat dog big run fly sun fun map cup";

const SPEED_BURST_TEXT =
  "The best way to improve your typing speed is to practice every single day. Focus on accuracy and the speed will follow naturally.";

const PARAGRAPH_DRILL_TEXT =
  "Typing faster requires both muscle memory and mental focus. Begin each session by warming up with simple home row exercises. Once your fingers are ready, push yourself slightly beyond your comfort zone. Track your best WPM after each session and aim to beat it next time. Consistent daily practice of fifteen minutes will show measurable results within weeks.";

type DrillMode = "sprint" | "burst" | "paragraph";
type DrillState = "idle" | "running" | "finished";

const FAQS: FAQItem[] = [
  {
    q: "What is WPM and how is it calculated?",
    a: "WPM stands for Words Per Minute. It is calculated by dividing the number of words typed by the time in minutes. Standard word length is 5 characters.",
  },
  {
    q: "What is the average typing speed?",
    a: "The average typing speed is 40–60 WPM. Professional typists typically type at 65–75 WPM. Speed above 80 WPM is considered advanced.",
  },
  {
    q: "How can I increase my WPM quickly?",
    a: "The fastest way to increase WPM is to focus on accuracy first, then gradually push your speed slightly beyond your comfort zone each session.",
  },
  {
    q: "Does typing speed matter for jobs?",
    a: "Yes. Many office, data entry, and admin roles require 40–60 WPM. Higher speeds are a competitive advantage for remote work and content creation.",
  },
  {
    q: "How long until I see improvement in typing speed?",
    a: "Most people see measurable WPM improvement within 2–3 weeks of daily practice. Consistent 15-minute sessions produce the best results.",
  },
];

const HOW_TO_STEPS: HowToStep[] = [
  {
    name: "Warm up with Word Sprint",
    text: "Type 15 common words as fast as you can. This activates your finger muscles and establishes a rhythm.",
  },
  {
    name: "Move to Speed Burst for timed pressure",
    text: "The 30-second Speed Burst replicates real typing pressure. Focus on completing as much as possible accurately.",
  },
  {
    name: "Practice Paragraph Drill for sustained speed",
    text: "Paragraph Drill builds endurance. Maintain consistent speed and accuracy over a longer text.",
  },
  {
    name: "Check Your Progress panel for improvement",
    text: "Review your Best WPM and session history in the Your Progress panel to track gains over time.",
  },
];

interface TypingSpeedPracticePageProps {
  onNavigate: (page: string) => void;
  onBack: () => void;
}

function getDrillText(mode: DrillMode): string {
  if (mode === "sprint") return WORD_SPRINT_WORDS;
  if (mode === "burst") return SPEED_BURST_TEXT;
  return PARAGRAPH_DRILL_TEXT;
}

export default function TypingSpeedPracticePage({
  onNavigate,
  onBack,
}: TypingSpeedPracticePageProps) {
  const [mode, setMode] = useState<DrillMode>("sprint");
  const [drillState, setDrillState] = useState<DrillState>("idle");
  const [typed, setTyped] = useState("");
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [mistakes, setMistakes] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // for burst mode
  const [sessionBestWpm, setSessionBestWpm] = useState(0);
  const startTimeRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const liveWpmRef = useRef(0);

  const drillText = getDrillText(mode);

  const calcStats = useCallback(
    (currentTyped: string) => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const words = currentTyped.trim().split(/\s+/).filter(Boolean).length;
      const mins = elapsed / 60 || 1 / 60;
      const currentWpm = Math.round(words / mins);
      let errors = 0;
      for (let i = 0; i < currentTyped.length; i++) {
        if (currentTyped[i] !== drillText[i]) errors++;
      }
      const acc =
        currentTyped.length > 0
          ? Math.max(
              0,
              Math.round(
                ((currentTyped.length - errors) / currentTyped.length) * 100,
              ),
            )
          : 100;
      setWpm(currentWpm);
      setAccuracy(acc);
      setMistakes(errors);
      liveWpmRef.current = currentWpm;
      return { wpm: currentWpm, elapsed };
    },
    [drillText],
  );

  const finishDrill = useCallback((finalWpm: number, elapsedSecs: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setDrillState("finished");
    setSessionBestWpm((prev) => Math.max(prev, finalWpm));
    updateTypingProgress(finalWpm, Math.round(elapsedSecs));
  }, []);

  // Burst mode timer
  useEffect(() => {
    if (drillState === "running" && mode === "burst") {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            finishDrill(liveWpmRef.current, 30);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
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
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleModeChange = (m: DrillMode) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setMode(m);
    setTyped("");
    setWpm(0);
    setAccuracy(100);
    setMistakes(0);
    setTimeLeft(30);
    setDrillState("idle");
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (drillState !== "running") return;
    const value = e.target.value;
    setTyped(value);
    const { wpm: currentWpm, elapsed } = calcStats(value);
    if (value.length >= drillText.length) {
      finishDrill(currentWpm, elapsed);
    }
  };

  const renderText = () =>
    drillText.split("").map((char, i) => {
      let color = "#94a3b8";
      if (i < typed.length) {
        color = typed[i] === char ? "#4ade80" : "#f87171";
      }
      return (
        // biome-ignore lint/suspicious/noArrayIndexKey: character-level render requires index key
        <span key={i} style={{ color, transition: "color 0.08s" }}>
          {char}
        </span>
      );
    });

  const card: React.CSSProperties = {
    background: "#111827",
    borderRadius: "1rem",
    padding: "1.75rem",
    marginBottom: "1.5rem",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
  };

  const sectionHeading: React.CSSProperties = {
    color: "#ffffff",
    fontSize: "1.05rem",
    fontWeight: 700,
    marginBottom: "1rem",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        padding: "2rem 1rem 3rem",
      }}
    >
      <SEO
        title="Typing Speed Practice – Boost Your WPM | DocMasterTools"
        description="Boost your typing speed with targeted speed drills on DocMasterTools. Practice word sprints, speed bursts, and paragraph drills to increase your WPM fast."
        canonicalUrl="https://docmastertools.com/typing-speed-practice"
        ogImage="/assets/generated/docmastertools-logo.dim_540x270.png"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://docmastertools.com/" },
          {
            name: "Typing Speed Practice",
            url: "https://docmastertools.com/typing-speed-practice",
          },
        ]}
      />

      <div style={{ maxWidth: "820px", margin: "0 auto" }}>
        {/* Back button */}
        <button
          type="button"
          onClick={onBack}
          data-ocid="typing_speed_practice.back_button"
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
          ← Back to Home
        </button>

        {/* Header */}
        <div style={{ marginBottom: "1.75rem" }}>
          <h1
            style={{
              color: "#ffffff",
              fontSize: "clamp(1.5rem, 4vw, 2rem)",
              fontWeight: 800,
              marginBottom: "0.5rem",
            }}
          >
            ⚡ Typing Speed Practice
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "1rem", lineHeight: 1.7 }}>
            Speed practice is different from accuracy practice. Once you have
            the basics, these targeted drills push your WPM higher by applying
            controlled pressure and rhythm training.
          </p>
        </div>

        {/* Progress Panel */}
        <TypingProgressPanel />

        {/* Speed vs Accuracy Card */}
        <div style={card}>
          <h2 style={sectionHeading}>Speed Practice vs Accuracy Practice</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "0.75rem",
            }}
          >
            {[
              {
                icon: "🎯",
                title: "Accuracy Practice",
                color: "#4ade80",
                body: "Slow, deliberate typing that builds correct muscle memory. Best for beginners. Reduces the habit of making the same errors repeatedly.",
              },
              {
                icon: "⚡",
                title: "Speed Practice",
                color: "#facc15",
                body: "Pushes beyond your comfort zone to expand your ceiling. Best for typists who already have 40+ WPM and want to break through plateaus.",
              },
              {
                icon: "🔄",
                title: "The Cycle",
                color: "#38bdf8",
                body: "Alternate between accuracy and speed sessions. Accuracy sessions consolidate gains; speed sessions push new limits. Both are essential.",
              },
            ].map((tip) => (
              <div
                key={tip.title}
                style={{
                  background: "#1e293b",
                  borderRadius: "0.75rem",
                  padding: "1rem 1.25rem",
                  borderLeft: `3px solid ${tip.color}`,
                }}
              >
                <div style={{ fontSize: "1.25rem", marginBottom: "0.4rem" }}>
                  {tip.icon}
                </div>
                <div
                  style={{
                    color: tip.color,
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    marginBottom: "0.3rem",
                  }}
                >
                  {tip.title}
                </div>
                <div
                  style={{
                    color: "#94a3b8",
                    fontSize: "0.82rem",
                    lineHeight: 1.6,
                  }}
                >
                  {tip.body}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WPM Level Guide */}
        <div style={card}>
          <h2 style={sectionHeading}>WPM Level Guide</h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            {[
              {
                range: "Below 30 WPM",
                label: "Beginner",
                color: "#f87171",
                advice: "Focus on home row lessons and accuracy drills.",
              },
              {
                range: "30–50 WPM",
                label: "Developing",
                color: "#fb923c",
                advice: "Practice all keyboard rows and common word drills.",
              },
              {
                range: "50–70 WPM",
                label: "Intermediate",
                color: "#facc15",
                advice: "Use Speed Burst drills and timed paragraph practice.",
              },
              {
                range: "70–90 WPM",
                label: "Advanced",
                color: "#4ade80",
                advice:
                  "Push with Word Sprint and challenging paragraph texts.",
              },
              {
                range: "90+ WPM",
                label: "Expert",
                color: "#60a5fa",
                advice:
                  "Maintain accuracy under speed pressure. Practice consistently.",
              },
            ].map((level) => (
              <div
                key={level.range}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  background: "#1e293b",
                  borderRadius: "0.625rem",
                  padding: "0.625rem 1rem",
                }}
              >
                <span
                  style={{
                    color: level.color,
                    fontWeight: 700,
                    fontSize: "0.82rem",
                    minWidth: "90px",
                  }}
                >
                  {level.range}
                </span>
                <span
                  style={{
                    color: level.color,
                    fontSize: "0.75rem",
                    background: `${level.color}20`,
                    padding: "1px 8px",
                    borderRadius: "0.25rem",
                    minWidth: "90px",
                    textAlign: "center",
                  }}
                >
                  {level.label}
                </span>
                <span style={{ color: "#64748b", fontSize: "0.8rem" }}>
                  {level.advice}
                </span>
              </div>
            ))}
          </div>
          {sessionBestWpm > 0 && (
            <div
              style={{
                marginTop: "1rem",
                background: "#1e3a5f",
                borderRadius: "0.625rem",
                padding: "0.625rem 1rem",
                border: "1px solid #2563eb",
                color: "#60a5fa",
                fontSize: "0.875rem",
                fontWeight: 600,
              }}
            >
              🏆 This session best: {sessionBestWpm} WPM
            </div>
          )}
        </div>

        {/* Speed Drill Widget */}
        <div style={card}>
          <h2 style={sectionHeading}>Speed Drills</h2>

          {/* Mode selector */}
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              marginBottom: "1.25rem",
              flexWrap: "wrap",
            }}
          >
            {[
              { id: "sprint" as DrillMode, label: "Word Sprint" },
              { id: "burst" as DrillMode, label: "Speed Burst (30s)" },
              { id: "paragraph" as DrillMode, label: "Paragraph Drill" },
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                data-ocid={`typing_speed_practice.${m.id}_mode.tab`}
                onClick={() => handleModeChange(m.id)}
                style={{
                  background: mode === m.id ? "#2563eb" : "#1e293b",
                  color: mode === m.id ? "#fff" : "#94a3b8",
                  border:
                    mode === m.id ? "2px solid #2563eb" : "2px solid #334155",
                  borderRadius: "0.5rem",
                  padding: "0.45rem 1.1rem",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Stats bar */}
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              marginBottom: "1.25rem",
              flexWrap: "wrap",
            }}
          >
            {[
              ...(mode === "burst"
                ? [
                    {
                      label: "Time",
                      value: `${timeLeft}s`,
                      color: timeLeft <= 10 ? "#f87171" : "#38bdf8",
                    },
                  ]
                : []),
              { label: "WPM", value: wpm, color: "#4ade80" },
              { label: "Accuracy", value: `${accuracy}%`, color: "#facc15" },
              { label: "Mistakes", value: mistakes, color: "#f87171" },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  background: "#1e293b",
                  borderRadius: "0.75rem",
                  padding: "0.65rem 1rem",
                  textAlign: "center",
                  flex: "1 1 70px",
                }}
              >
                <div
                  style={{
                    color: s.color,
                    fontSize: "1.3rem",
                    fontWeight: 700,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{ color: "#64748b", fontSize: "0.7rem", marginTop: 2 }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Practice text */}
          <div
            style={{
              background: "#1e293b",
              borderRadius: "0.75rem",
              padding: "1rem 1.25rem",
              fontSize: "1rem",
              lineHeight: 1.9,
              letterSpacing: "0.02em",
              marginBottom: "1.25rem",
              wordBreak: "break-word",
              userSelect: "none",
            }}
          >
            {renderText()}
          </div>

          {/* Input */}
          {drillState === "running" && (
            <textarea
              ref={inputRef}
              value={typed}
              onChange={handleInput}
              rows={3}
              placeholder="Type here..."
              data-ocid="typing_speed_practice.textarea"
              style={{
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
                fontFamily: "inherit",
              }}
            />
          )}

          {/* Result */}
          {drillState === "finished" && (
            <div
              data-ocid="typing_speed_practice.success_state"
              style={{
                background: "#1e293b",
                borderRadius: "0.75rem",
                padding: "1.25rem",
                textAlign: "center",
                marginBottom: "1.25rem",
              }}
            >
              <div
                style={{
                  color: "#4ade80",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  marginBottom: "0.5rem",
                }}
              >
                ⚡ Drill Complete!
              </div>
              <div style={{ color: "#cbd5e1", fontSize: "0.95rem" }}>
                WPM: <strong style={{ color: "#38bdf8" }}>{wpm}</strong>
                &nbsp;|&nbsp; Accuracy:{" "}
                <strong style={{ color: "#facc15" }}>{accuracy}%</strong>
                &nbsp;|&nbsp; Mistakes:{" "}
                <strong style={{ color: "#f87171" }}>{mistakes}</strong>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {drillState === "idle" && (
              <button
                type="button"
                data-ocid="typing_speed_practice.start.primary_button"
                onClick={startDrill}
                style={{
                  background: "#2563eb",
                  color: "#fff",
                  border: "none",
                  borderRadius: "0.5rem",
                  padding: "0.65rem 1.75rem",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Start Drill
              </button>
            )}
            {(drillState === "running" || drillState === "finished") && (
              <button
                type="button"
                data-ocid="typing_speed_practice.restart.secondary_button"
                onClick={startDrill}
                style={{
                  background: drillState === "finished" ? "#2563eb" : "#1e293b",
                  color: "#fff",
                  border:
                    drillState === "finished" ? "none" : "1px solid #334155",
                  borderRadius: "0.5rem",
                  padding: "0.65rem 1.75rem",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {drillState === "finished" ? "Try Again" : "Restart"}
              </button>
            )}
          </div>
        </div>

        {/* Internal Links */}
        <TypingInternalLinks
          onNavigate={onNavigate}
          currentPage="typing-speed-practice"
        />

        {/* FAQ */}
        <TypingFAQ
          faqs={FAQS}
          howToSteps={HOW_TO_STEPS}
          howToName="How to Improve Typing Speed with Drills"
        />
      </div>
    </div>
  );
}
