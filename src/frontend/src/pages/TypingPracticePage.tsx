import { useCallback, useEffect, useRef, useState } from "react";
import SEO from "../components/SEO";
import TypingFAQ, {
  type FAQItem,
  type HowToStep,
} from "../components/TypingFAQ";
import TypingInternalLinks from "../components/TypingInternalLinks";
import TypingProgressPanel from "../components/TypingProgressPanel";
import { updateTypingProgress } from "../utils/typingProgress";

const WORD_DRILL_WORDS = [
  "keyboard typing speed practice accuracy learning focus improve skill",
  "finger position home row touch type method train daily effort",
  "quick brown lazy dog jump over fence strong brave smart bold",
];

const SENTENCE_DRILLS = [
  "Typing regularly helps improve both speed and accuracy.",
  "Keep your eyes on the screen and not on the keyboard.",
  "Accuracy is more important than speed when learning to type.",
  "Touch typing is a skill that saves hours every single week.",
  "Focus on each word carefully before moving to the next one.",
];

const PARAGRAPH_DRILLS = [
  "Typing is a very important skill in the digital world. Practicing every day helps improve speed, accuracy, and overall productivity at work.",
  "The home row is the foundation of touch typing. By keeping your fingers anchored on A S D F and J K L semicolon, your hands can reach every other key efficiently.",
  "Good typing habits start with the correct posture. Sit up straight, keep your wrists slightly elevated, and let your fingers rest lightly on the home row keys.",
];

type PracticeMode = "word" | "sentence" | "paragraph";
type DrillState = "idle" | "running" | "finished";

interface TypingPracticePageProps {
  onNavigate: (page: string) => void;
  onBack: () => void;
}

const FAQS: FAQItem[] = [
  {
    q: "How long should I practice typing each day?",
    a: "15–20 minutes of focused daily practice is enough for most beginners. Consistency is more important than session length.",
  },
  {
    q: "What is a good typing speed for a beginner?",
    a: "40–50 WPM with 90%+ accuracy is a solid beginner target. With regular practice, most people reach 60–70 WPM within a few months.",
  },
  {
    q: "Should I focus on speed or accuracy first?",
    a: "Always focus on accuracy first. Speed naturally increases as your muscle memory develops and you stop making errors.",
  },
  {
    q: "Can I learn touch typing on my own?",
    a: "Yes. Free online tools and structured lessons make it easy to learn touch typing at your own pace without needing a teacher.",
  },
  {
    q: "How do I track my typing progress?",
    a: "Use the progress panel above to track your best WPM, total sessions, and time practiced. Regular tests also help measure improvement.",
  },
];

const HOW_TO_STEPS: HowToStep[] = [
  {
    name: "Choose a practice mode",
    text: "Select Word Drill, Sentence Practice, or Paragraph Practice based on your current skill level.",
  },
  {
    name: "Read the text carefully before typing",
    text: "Scan the full text once before you start typing so your brain is prepared for each word.",
  },
  {
    name: "Type accurately without looking at the keyboard",
    text: "Keep your eyes on the screen and use muscle memory to find each key. Accuracy comes before speed.",
  },
  {
    name: "Review mistakes and repeat",
    text: "After finishing, note which keys caused errors. Repeat the drill focusing on those specific keys.",
  },
];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function TypingPracticePage({
  onNavigate,
  onBack,
}: TypingPracticePageProps) {
  const [mode, setMode] = useState<PracticeMode>("word");
  const [drillText, setDrillText] = useState(() =>
    getRandomItem(WORD_DRILL_WORDS),
  );
  const [typed, setTyped] = useState("");
  const [drillState, setDrillState] = useState<DrillState>("idle");
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [mistakes, setMistakes] = useState(0);
  const startTimeRef = useRef<number>(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const loadDrill = useCallback((m: PracticeMode) => {
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

  const handleModeChange = (m: PracticeMode) => {
    setMode(m);
    loadDrill(m);
  };

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
    },
    [drillText],
  );

  const startDrill = () => {
    loadDrill(mode);
    setDrillState("running");
    startTimeRef.current = Date.now();
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (drillState !== "running") return;
    const value = e.target.value;
    setTyped(value);
    calcStats(value);
    if (value.length >= drillText.length) {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const words = value.trim().split(/\s+/).filter(Boolean).length;
      const mins = elapsed / 60 || 1 / 60;
      const finalWpm = Math.round(words / mins);
      updateTypingProgress(finalWpm, Math.round(elapsed));
      setDrillState("finished");
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

  useEffect(() => {
    loadDrill("word");
  }, [loadDrill]);

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
        title="Typing Practice Online – Improve Speed & Accuracy | DocMasterTools"
        description="Practice typing online with free exercises on DocMasterTools. Improve your WPM, accuracy, and build keyboard confidence with daily practice sessions."
        canonicalUrl="https://docmastertools.com/typing-practice"
        ogImage="/assets/generated/docmastertools-logo.dim_540x270.png"
      />

      <div style={{ maxWidth: "820px", margin: "0 auto" }}>
        {/* Back button */}
        <button
          type="button"
          onClick={onBack}
          data-ocid="typing_practice.back_button"
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
            📝 Typing Practice Online
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "1rem", lineHeight: 1.7 }}>
            Practice typing online with free exercises designed for all skill
            levels. Whether you are a beginner building muscle memory or an
            experienced typist looking to sharpen accuracy, our practice modes
            help you improve consistently.
          </p>
        </div>

        {/* Progress Panel */}
        <TypingProgressPanel />

        {/* Practice Guide Card */}
        <div style={card}>
          <h2 style={sectionHeading}>What is Typing Practice?</h2>
          <p
            style={{
              color: "#94a3b8",
              fontSize: "0.9rem",
              lineHeight: 1.7,
              marginBottom: "1rem",
            }}
          >
            Typing practice is the deliberate repetition of typing exercises to
            build speed and accuracy. Unlike typing tests that measure
            performance, practice sessions focus on skill development — training
            your fingers to find keys automatically through muscle memory.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "0.75rem",
            }}
          >
            {[
              {
                icon: "🎯",
                title: "Why It Matters",
                body: "Typing is now a core workplace skill. Faster typing means more output in less time across emails, documents, code, and communication.",
              },
              {
                icon: "⏱️",
                title: "How Often to Practice",
                body: "15–20 minutes per day is ideal. Daily short sessions outperform irregular long sessions for building lasting muscle memory.",
              },
              {
                icon: "✅",
                title: "How to Get Started",
                body: "Begin with Word Drill to build rhythm, move to Sentence Practice for flow, then Paragraph Practice for sustained typing.",
              },
            ].map((tip) => (
              <div
                key={tip.title}
                style={{
                  background: "#1e293b",
                  borderRadius: "0.75rem",
                  padding: "1rem 1.25rem",
                  borderLeft: "3px solid #2563eb",
                }}
              >
                <div style={{ fontSize: "1.25rem", marginBottom: "0.4rem" }}>
                  {tip.icon}
                </div>
                <div
                  style={{
                    color: "#38bdf8",
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

        {/* Practice Widget */}
        <div style={card}>
          <h2 style={sectionHeading}>Practice Now</h2>

          {/* Mode selector */}
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              marginBottom: "1.25rem",
              flexWrap: "wrap",
            }}
          >
            {(["word", "sentence", "paragraph"] as PracticeMode[]).map((m) => (
              <button
                key={m}
                type="button"
                data-ocid={`typing_practice.${m}_mode.tab`}
                onClick={() => handleModeChange(m)}
                style={{
                  background: mode === m ? "#2563eb" : "#1e293b",
                  color: mode === m ? "#fff" : "#94a3b8",
                  border:
                    mode === m ? "2px solid #2563eb" : "2px solid #334155",
                  borderRadius: "0.5rem",
                  padding: "0.45rem 1.1rem",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  textTransform: "capitalize",
                }}
              >
                {m === "word"
                  ? "Word Drill"
                  : m === "sentence"
                    ? "Sentence Practice"
                    : "Paragraph Practice"}
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

          {/* Practice text display */}
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

          {/* Typing input */}
          {drillState === "running" && (
            <textarea
              ref={inputRef}
              value={typed}
              onChange={handleInput}
              rows={3}
              placeholder="Start typing here..."
              data-ocid="typing_practice.textarea"
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
              data-ocid="typing_practice.success_state"
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
                ✅ Drill Complete!
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
                data-ocid="typing_practice.start.primary_button"
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
                Start Practice
              </button>
            )}
            {(drillState === "running" || drillState === "finished") && (
              <button
                type="button"
                data-ocid="typing_practice.next.secondary_button"
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
                {drillState === "finished" ? "Next Drill" : "Restart"}
              </button>
            )}
          </div>
        </div>

        {/* Internal Links */}
        <TypingInternalLinks
          onNavigate={onNavigate}
          currentPage="typing-practice"
        />

        {/* FAQ */}
        <TypingFAQ
          faqs={FAQS}
          howToSteps={HOW_TO_STEPS}
          howToName="How to Practice Typing Online"
        />
      </div>
    </div>
  );
}
