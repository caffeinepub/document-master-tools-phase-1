import { useCallback, useEffect, useRef, useState } from "react";

// ---- Types ----
type TestDuration = 1 | 3 | 5;
type TestState = "idle" | "running" | "finished";

const SAMPLE_TEXTS = [
  "The quick brown fox jumps over the lazy dog. Practice makes perfect and consistent effort leads to improvement over time. Keep typing to build your speed and accuracy.",
  "Typing speed improves with daily practice. Focus on accuracy first and speed will follow naturally as your fingers learn the position of every key on the keyboard.",
  "A good typist does not look at the keyboard while typing. Train your muscle memory and your speed will increase significantly over a few weeks of consistent practice.",
  "Technology has changed the way we communicate today. Fast and accurate typing is now an essential skill for every professional working in any field or industry.",
  "The internet has connected billions of people around the world. Information travels at the speed of light and communication has never been easier or more accessible.",
  "Document processing tools help you work smarter and faster. From converting files to resizing images the right tools make complex tasks simple and quick to complete.",
];

const SEO_META: Record<
  TestDuration,
  { title: string; description: string; heading: string; intro: string }
> = {
  1: {
    title: "1 Minute Typing Test – Check Your Speed | DocMasterTools",
    description:
      "Take the 1 minute typing test to measure your typing speed and accuracy. Practice typing online with DocMasterTools.",
    heading: "1 Minute Typing Test",
    intro:
      "The 1 minute typing test is ideal for a quick speed check. In just 60 seconds, you can measure your current WPM (words per minute) and accuracy, making it perfect for daily practice sessions or warm-up before longer tests.",
  },
  3: {
    title: "3 Minute Typing Test – Test Your WPM | DocMasterTools",
    description:
      "Take the 3 minute typing test to measure your typing speed and accuracy. Practice and improve your WPM online with DocMasterTools.",
    heading: "3 Minute Typing Test",
    intro:
      "The 3 minute typing test gives you a balanced challenge — long enough to measure your sustained typing speed and endurance, yet short enough to stay focused throughout. It is the most popular test duration used by professionals to assess real-world typing ability.",
  },
  5: {
    title: "5 Minute Typing Test – Improve Typing Speed | DocMasterTools",
    description:
      "Take the 5 minute typing test to measure your long-form typing speed and accuracy. Build stamina and improve your WPM with DocMasterTools.",
    heading: "5 Minute Typing Test",
    intro:
      "The 5 minute typing test is designed for serious typists who want to measure their endurance and consistency over a longer duration. It reflects realistic typing conditions such as writing emails or documents, and is often used in professional typing assessments.",
  },
};

const TIPS: { title: string; body: string }[] = [
  {
    title: "Focus on Accuracy First",
    body: "Speed will follow naturally once your fingers learn the correct positions. Prioritise hitting the right keys before trying to type faster.",
  },
  {
    title: "Use All 10 Fingers",
    body: "Touch typing with all fingers reduces hand movement and significantly increases speed. Start by mastering the home row: A S D F and J K L ;",
  },
  {
    title: "Never Look at the Keyboard",
    body: "Train yourself to keep your eyes on the screen. Looking down breaks your rhythm and slows you down. Use the raised bumps on F and J to find the home row by feel.",
  },
  {
    title: "Practice Every Day",
    body: "Even 10–15 minutes of daily practice leads to noticeable improvement within weeks. Consistency matters more than long but infrequent sessions.",
  },
  {
    title: "Relax Your Hands",
    body: "Tension in your fingers and wrists slows you down. Keep your hands relaxed and your wrists slightly elevated above the keyboard.",
  },
  {
    title: "Review Your Mistakes",
    body: "After each test, notice which keys you consistently miss. Focus extra practice on those letters, and your overall accuracy will improve quickly.",
  },
];

const INTERNAL_LINKS: { label: string; page: string; desc: string }[] = [
  {
    label: "Typing Test",
    page: "typing-test",
    desc: "Full-featured typing practice with Learn Typing and Practice Mode",
  },
  {
    label: "1 Minute Typing Test",
    page: "typing-test-1-minute",
    desc: "Quick 60-second speed check",
  },
  {
    label: "3 Minute Typing Test",
    page: "typing-test-3-minute",
    desc: "Balanced test for consistent WPM measurement",
  },
  {
    label: "5 Minute Typing Test",
    page: "typing-test-5-minute",
    desc: "Endurance test for serious typists",
  },
];

// ---- Component ----

interface TypingTestSEOPageProps {
  duration: TestDuration;
  onNavigate: (page: string) => void;
  onBack: () => void;
}

export default function TypingTestSEOPage({
  duration,
  onNavigate,
}: TypingTestSEOPageProps) {
  const meta = SEO_META[duration];

  // Update document title and meta description
  useEffect(() => {
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

  // ---- Typing test state ----
  const [selectedDuration, setSelectedDuration] =
    useState<TestDuration>(duration);
  const [testState, setTestState] = useState<TestState>("idle");
  const [sampleText, setSampleText] = useState(SAMPLE_TEXTS[0]);
  const [typed, setTyped] = useState("");
  const [timeLeft, setTimeLeft] = useState(duration * 60);
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
  }, []);

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

  const handleDurationChange = (d: TestDuration) => {
    setSelectedDuration(d);
    if (testState !== "running") {
      setTimeLeft(d * 60);
      setTestState("idle");
      setFinalStats(null);
      setTyped("");
    }
  };

  // ---- Styles ----
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
      <div style={{ maxWidth: "820px", margin: "0 auto" }}>
        {/* Page Header */}
        <div style={{ marginBottom: "1.75rem" }}>
          <h1
            style={{
              color: "#ffffff",
              fontSize: "clamp(1.5rem, 4vw, 2rem)",
              fontWeight: 800,
              marginBottom: "0.5rem",
            }}
          >
            ⌨️ {meta.heading}
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "1rem", lineHeight: 1.7 }}>
            {meta.intro}
          </p>
        </div>

        {/* Typing Test Card */}
        <div style={card}>
          <h2 style={sectionHeading}>Typing Test</h2>

          {/* Duration selector */}
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              marginBottom: "1.25rem",
              flexWrap: "wrap",
            }}
          >
            {([1, 3, 5] as TestDuration[]).map((d) => (
              <button
                key={d}
                type="button"
                data-ocid={`seo_typing_test.duration_${d}.button`}
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
                  transition: "all 0.15s",
                }}
              >
                {d} min
              </button>
            ))}
          </div>

          {/* Stats Bar */}
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

          {/* Sample Text Display */}
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

          {/* Typing Input */}
          {testState === "running" && (
            <textarea
              ref={inputRef}
              value={typed}
              onChange={handleInput}
              rows={3}
              placeholder="Start typing here..."
              data-ocid="seo_typing_test.textarea"
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

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {testState === "idle" && (
              <button
                type="button"
                data-ocid="seo_typing_test.start.primary_button"
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
                data-ocid="seo_typing_test.stop.secondary_button"
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
                  data-ocid="seo_typing_test.restart.primary_button"
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
                  data-ocid="seo_typing_test.full_test.secondary_button"
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
                  Full Typing Test
                </button>
              </>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <div style={card}>
          <h2 style={sectionHeading}>Tips to Improve Typing Speed</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1rem",
            }}
          >
            {TIPS.map((tip) => (
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
                    marginBottom: "0.4rem",
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

        {/* Internal Links Section */}
        <div style={card}>
          <h2 style={sectionHeading}>More Typing Tests</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "0.75rem",
            }}
          >
            {INTERNAL_LINKS.map((link) => {
              const isActive = link.page === `typing-test-${duration}-minute`;
              return (
                <button
                  key={link.page}
                  type="button"
                  data-ocid={`seo_typing_test.nav.${link.page.replace(/-/g, "_")}.link`}
                  onClick={() => onNavigate(link.page)}
                  style={{
                    background: isActive ? "#1e3a5f" : "#1e293b",
                    border: isActive
                      ? "1px solid #2563eb"
                      : "1px solid #334155",
                    borderRadius: "0.75rem",
                    padding: "1rem",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  <div
                    style={{
                      color: isActive ? "#60a5fa" : "#ffffff",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {link.label}
                    {isActive && (
                      <span
                        style={{
                          marginLeft: "0.5rem",
                          background: "#2563eb",
                          color: "#fff",
                          fontSize: "0.65rem",
                          padding: "1px 6px",
                          borderRadius: "0.25rem",
                          verticalAlign: "middle",
                        }}
                      >
                        Current
                      </span>
                    )}
                  </div>
                  <div style={{ color: "#64748b", fontSize: "0.78rem" }}>
                    {link.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
