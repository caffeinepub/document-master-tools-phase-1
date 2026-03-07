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

export interface TypingSEOPageConfig {
  slug: string;
  defaultDuration?: number;
  durations?: number[];
  title: string;
  description: string;
  h1: string;
  intro: string;
  whatIsSection: { heading: string; body: string };
  howItWorks: { heading: string; steps: { title: string; body: string }[] };
  benefits: { heading: string; items: { title: string; body: string }[] };
  tips: { heading: string; items: { title: string; body: string }[] };
  extraContent?: { heading: string; body: string };
  faqs: FAQItem[];
  howToSteps: HowToStep[];
  howToName: string;
  ctaHeading: string;
  ctaBody: string;
}

type TestDuration = number;
type TestState = "idle" | "running" | "finished";

const SAMPLE_TEXTS = [
  "The quick brown fox jumps over the lazy dog. Practice makes perfect and consistent effort leads to improvement over time. Keep typing to build your speed and accuracy.",
  "Typing speed improves with daily practice. Focus on accuracy first and speed will follow naturally as your fingers learn the position of every key on the keyboard.",
  "A good typist does not look at the keyboard while typing. Train your muscle memory and your speed will increase significantly over a few weeks of consistent practice.",
  "Technology has changed the way we communicate today. Fast and accurate typing is now an essential skill for every professional working in any field or industry.",
  "The internet has connected billions of people around the world. Information travels at the speed of light and communication has never been easier or more accessible.",
  "Document processing tools help you work smarter and faster. From converting files to resizing images the right tools make complex tasks simple and quick to complete.",
];

interface Props {
  config: TypingSEOPageConfig;
  onNavigate: (page: string) => void;
}

export default function TypingSEOLandingPage({ config, onNavigate }: Props) {
  const [selectedDuration, setSelectedDuration] = useState<TestDuration>(
    config.defaultDuration ?? 3,
  );
  const [testState, setTestState] = useState<TestState>("idle");
  const [sampleText, setSampleText] = useState(SAMPLE_TEXTS[0]);
  const [typed, setTyped] = useState("");
  const [timeLeft, setTimeLeft] = useState((config.defaultDuration ?? 3) * 60);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [mistakes, setMistakes] = useState(0);
  const [finalStats, setFinalStats] = useState<{
    wpm: number;
    accuracy: number;
    mistakes: number;
  } | null>(null);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);
  const liveStatsRef = useRef({ wpm: 0, accuracy: 100, mistakes: 0 });

  const calcStats = useCallback(
    (currentTyped: string, elapsed: number) => {
      const words = currentTyped.trim().split(/\s+/).filter(Boolean).length;
      const elapsedMinutes = elapsed / 60;
      const currentWpm =
        elapsedMinutes > 0 ? Math.round(words / elapsedMinutes) : 0;
      let errors = 0;
      for (let i = 0; i < currentTyped.length; i++) {
        if (currentTyped[i] !== sampleText[i]) errors++;
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
      liveStatsRef.current = {
        wpm: currentWpm,
        accuracy: acc,
        mistakes: errors,
      };
    },
    [sampleText],
  );

  const stopTest = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setFinalStats({ ...liveStatsRef.current });
    setTestState("finished");
    updateTypingProgress(
      liveStatsRef.current.wpm,
      selectedDuration * 60 - timeLeft,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDuration, timeLeft]);

  const startTest = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const randomText =
      SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)];
    setSampleText(randomText);
    setTyped("");
    setTimeLeft(selectedDuration * 60);
    setWpm(0);
    setAccuracy(100);
    setMistakes(0);
    setFinalStats(null);
    setTestState("running");
    startTimeRef.current = Date.now();
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  useEffect(() => {
    if (testState === "running") {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            stopTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [testState, stopTest]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (testState !== "running") return;
    const value = e.target.value;
    setTyped(value);
    const elapsed = (Date.now() - startTimeRef.current) / 1000;
    calcStats(value, elapsed);
    if (value.length >= sampleText.length) stopTest();
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m > 0 ? `${m}:${s.toString().padStart(2, "0")}` : `${s}s`;
  };

  const renderColoredText = () =>
    sampleText.split("").map((char, i) => {
      let color = "#94a3b8";
      if (i < typed.length) color = typed[i] === char ? "#4ade80" : "#f87171";
      return (
        // biome-ignore lint/suspicious/noArrayIndexKey: character-level render requires index key
        <span key={i} style={{ color, transition: "color 0.08s" }}>
          {char}
        </span>
      );
    });

  const formatDurationLabel = (d: number) => {
    if (d < 1) return `${Math.round(d * 60)}s`;
    return `${d} min`;
  };

  const handleDurationChange = (d: TestDuration) => {
    setSelectedDuration(d);
    if (testState !== "running") {
      setTimeLeft(d * 60);
      setTestState("idle");
      setFinalStats(null);
      setTyped("");
    }
  };

  // Styles
  const card: React.CSSProperties = {
    background: "#111827",
    borderRadius: "1rem",
    padding: "1.75rem",
    marginBottom: "1.5rem",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
  };

  const sectionHeading: React.CSSProperties = {
    color: "#ffffff",
    fontSize: "1.15rem",
    fontWeight: 700,
    marginBottom: "1rem",
  };

  const statBox: React.CSSProperties = {
    background: "#1e293b",
    borderRadius: "0.75rem",
    padding: "0.75rem 1.25rem",
    textAlign: "center",
    minWidth: "80px",
    flex: "1 1 80px",
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
        title={config.title}
        description={config.description}
        canonicalUrl={`https://docmastertools.com/${config.slug}`}
        ogImage="/assets/generated/docmastertools-logo.dim_540x270.png"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://docmastertools.com/" },
          {
            name: "Typing Tools",
            url: "https://docmastertools.com/typing-test",
          },
          { name: config.h1, url: `https://docmastertools.com/${config.slug}` },
        ]}
      />

      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        {/* Page Header */}
        <div style={{ marginBottom: "1.75rem" }}>
          <h1
            style={{
              color: "#ffffff",
              fontSize: "clamp(1.5rem, 4vw, 2.1rem)",
              fontWeight: 800,
              marginBottom: "0.5rem",
            }}
          >
            ⌨️ {config.h1}
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "1rem", lineHeight: 1.7 }}>
            {config.intro}
          </p>
        </div>

        {/* What Is Section */}
        <div style={card}>
          <h2 style={sectionHeading}>{config.whatIsSection.heading}</h2>
          <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.8 }}>
            {config.whatIsSection.body}
          </p>
        </div>

        {/* Embedded Typing Widget */}
        <div style={card}>
          <h2 style={sectionHeading}>Try the Typing Test Now</h2>
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              marginBottom: "1.25rem",
              flexWrap: "wrap",
            }}
          >
            {(config.durations ?? [1, 3, 5]).map((d) => (
              <button
                key={d}
                type="button"
                data-ocid={`${config.slug.replace(/-/g, "_")}.duration_${String(d).replace(".", "_")}.button`}
                onClick={() => handleDurationChange(d)}
                style={{
                  background: selectedDuration === d ? "#2563eb" : "#1e293b",
                  color: selectedDuration === d ? "#fff" : "#94a3b8",
                  border:
                    selectedDuration === d
                      ? "2px solid #2563eb"
                      : "2px solid #334155",
                  borderRadius: "0.5rem",
                  padding: "0.5rem 1.25rem",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                }}
              >
                {formatDurationLabel(d)}
              </button>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              marginBottom: "1.25rem",
              flexWrap: "wrap",
            }}
          >
            {[
              {
                label: "Time",
                value: formatTime(timeLeft),
                color:
                  timeLeft <= 10 && testState === "running"
                    ? "#f87171"
                    : "#38bdf8",
              },
              { label: "WPM", value: wpm, color: "#4ade80" },
              { label: "Accuracy", value: `${accuracy}%`, color: "#facc15" },
              { label: "Mistakes", value: mistakes, color: "#f87171" },
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
                  style={{ color: "#64748b", fontSize: "0.7rem", marginTop: 2 }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              background: "#1e293b",
              borderRadius: "0.75rem",
              padding: "1rem 1.25rem",
              fontSize: "1.05rem",
              lineHeight: 1.9,
              letterSpacing: "0.02em",
              marginBottom: "1.25rem",
              wordBreak: "break-word",
              userSelect: "none",
            }}
          >
            {renderColoredText()}
          </div>

          {testState === "running" && (
            <textarea
              ref={inputRef}
              value={typed}
              onChange={handleInput}
              rows={3}
              placeholder="Start typing here..."
              data-ocid={`${config.slug.replace(/-/g, "_")}.textarea`}
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

          {testState === "finished" && finalStats && (
            <div
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
                Test Complete!
              </div>
              <div style={{ color: "#cbd5e1", fontSize: "0.95rem" }}>
                Final WPM:{" "}
                <strong style={{ color: "#38bdf8" }}>{finalStats.wpm}</strong>
                &nbsp;|&nbsp; Accuracy:{" "}
                <strong style={{ color: "#facc15" }}>
                  {finalStats.accuracy}%
                </strong>
                &nbsp;|&nbsp; Mistakes:{" "}
                <strong style={{ color: "#f87171" }}>
                  {finalStats.mistakes}
                </strong>
              </div>
            </div>
          )}

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {testState === "idle" && (
              <button
                type="button"
                data-ocid={`${config.slug.replace(/-/g, "_")}.start.primary_button`}
                onClick={startTest}
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
                Start Test
              </button>
            )}
            {testState === "running" && (
              <button
                type="button"
                data-ocid={`${config.slug.replace(/-/g, "_")}.stop.secondary_button`}
                onClick={stopTest}
                style={{
                  background: "#dc2626",
                  color: "#fff",
                  border: "none",
                  borderRadius: "0.5rem",
                  padding: "0.65rem 1.75rem",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Stop
              </button>
            )}
            {testState === "finished" && (
              <>
                <button
                  type="button"
                  data-ocid={`${config.slug.replace(/-/g, "_")}.restart.primary_button`}
                  onClick={startTest}
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
                  Try Again
                </button>
                <button
                  type="button"
                  data-ocid={`${config.slug.replace(/-/g, "_")}.full_test.secondary_button`}
                  onClick={() => onNavigate("typing-test")}
                  style={{
                    background: "#1e293b",
                    color: "#94a3b8",
                    border: "1px solid #334155",
                    borderRadius: "0.5rem",
                    padding: "0.65rem 1.75rem",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Full Typing Platform
                </button>
              </>
            )}
          </div>
        </div>

        {/* How It Works */}
        <div style={card}>
          <h2 style={sectionHeading}>{config.howItWorks.heading}</h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {config.howItWorks.steps.map((step, i) => (
              <div
                key={step.title}
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    background: "#2563eb",
                    color: "#fff",
                    borderRadius: "50%",
                    width: "28px",
                    height: "28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </div>
                <div>
                  <div
                    style={{
                      color: "#e2e8f0",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      marginBottom: "0.2rem",
                    }}
                  >
                    {step.title}
                  </div>
                  <div
                    style={{
                      color: "#94a3b8",
                      fontSize: "0.85rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {step.body}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div style={card}>
          <h2 style={sectionHeading}>{config.benefits.heading}</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "1rem",
            }}
          >
            {config.benefits.items.map((item) => (
              <div
                key={item.title}
                style={{
                  background: "#1e293b",
                  borderRadius: "0.75rem",
                  padding: "1rem 1.25rem",
                  borderLeft: "3px solid #10b981",
                }}
              >
                <div
                  style={{
                    color: "#34d399",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    marginBottom: "0.35rem",
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    color: "#94a3b8",
                    fontSize: "0.85rem",
                    lineHeight: 1.6,
                  }}
                >
                  {item.body}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div style={card}>
          <h2 style={sectionHeading}>{config.tips.heading}</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "1rem",
            }}
          >
            {config.tips.items.map((tip) => (
              <div
                key={tip.title}
                style={{
                  background: "#1e293b",
                  borderRadius: "0.75rem",
                  padding: "1rem 1.25rem",
                  borderLeft: "3px solid #2563eb",
                }}
              >
                <div
                  style={{
                    color: "#38bdf8",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    marginBottom: "0.35rem",
                  }}
                >
                  {tip.title}
                </div>
                <div
                  style={{
                    color: "#94a3b8",
                    fontSize: "0.85rem",
                    lineHeight: 1.6,
                  }}
                >
                  {tip.body}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Extra Content (optional) */}
        {config.extraContent && (
          <div style={card}>
            <h2 style={sectionHeading}>{config.extraContent.heading}</h2>
            <p
              style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.8 }}
            >
              {config.extraContent.body}
            </p>
          </div>
        )}

        {/* Progress Panel */}
        <TypingProgressPanel />

        {/* CTA */}
        <div
          style={{
            ...card,
            background: "linear-gradient(135deg, #1e3a5f, #0f172a)",
            border: "1px solid #2563eb",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              color: "#ffffff",
              fontSize: "1.2rem",
              fontWeight: 800,
              marginBottom: "0.5rem",
            }}
          >
            {config.ctaHeading}
          </h2>
          <p
            style={{
              color: "#94a3b8",
              fontSize: "0.9rem",
              marginBottom: "1.25rem",
            }}
          >
            {config.ctaBody}
          </p>
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              data-ocid={`${config.slug.replace(/-/g, "_")}.cta.primary_button`}
              onClick={() => onNavigate("typing-test")}
              style={{
                background: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: "0.5rem",
                padding: "0.75rem 2rem",
                fontSize: "1rem",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Start Typing Test
            </button>
            <button
              type="button"
              data-ocid={`${config.slug.replace(/-/g, "_")}.cta_games.secondary_button`}
              onClick={() => onNavigate("typing-games")}
              style={{
                background: "#1e293b",
                color: "#94a3b8",
                border: "1px solid #334155",
                borderRadius: "0.5rem",
                padding: "0.75rem 2rem",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Try Typing Games
            </button>
          </div>
        </div>

        {/* Internal Links */}
        <TypingInternalLinks
          onNavigate={onNavigate}
          currentPage={config.slug}
        />

        {/* FAQ */}
        <TypingFAQ
          faqs={config.faqs}
          howToSteps={config.howToSteps}
          howToName={config.howToName}
        />
      </div>
    </div>
  );
}
