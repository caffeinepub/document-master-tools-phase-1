import { useEffect, useState } from "react";
import { loadTypingProgress } from "../utils/typingProgress";

export default function TypingProgressPanel() {
  const [progress, setProgress] = useState(loadTypingProgress);

  // Refresh when window gets focus (after completing a test on another tab)
  useEffect(() => {
    const handleFocus = () => setProgress(loadTypingProgress());
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const formatTime = (totalSecs: number): string => {
    if (totalSecs < 60) return `${totalSecs}s`;
    const mins = Math.floor(totalSecs / 60);
    if (mins < 60) return `${mins}m`;
    const hours = Math.floor(mins / 60);
    const remainMins = mins % 60;
    return remainMins > 0 ? `${hours}h ${remainMins}m` : `${hours}h`;
  };

  const hasActivity = progress.totalSessions > 0;

  return (
    <div
      data-ocid="typing_progress.panel"
      style={{
        background: "#111827",
        borderRadius: "0.875rem",
        padding: "1rem 1.5rem",
        marginBottom: "1.5rem",
        border: "1px solid #1e3a5f",
        boxShadow: "0 2px 12px rgba(37,99,235,0.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "0.75rem",
        }}
      >
        <span style={{ fontSize: "1rem" }}>📊</span>
        <span style={{ color: "#38bdf8", fontWeight: 700, fontSize: "0.9rem" }}>
          Your Progress
        </span>
        {!hasActivity && (
          <span
            style={{
              color: "#475569",
              fontSize: "0.75rem",
              marginLeft: "auto",
            }}
          >
            Complete a test to start tracking
          </span>
        )}
      </div>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        {[
          {
            label: "Best WPM",
            value: hasActivity ? String(progress.bestWpm) : "—",
            color: "#4ade80",
          },
          {
            label: "Sessions",
            value: hasActivity ? String(progress.totalSessions) : "—",
            color: "#a78bfa",
          },
          {
            label: "Time Practiced",
            value: hasActivity ? formatTime(progress.totalTimeSecs) : "—",
            color: "#facc15",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              background: "#1e293b",
              borderRadius: "0.625rem",
              padding: "0.6rem 1rem",
              textAlign: "center",
              flex: "1 1 80px",
              minWidth: "80px",
            }}
          >
            <div
              style={{
                color: stat.color,
                fontSize: "1.25rem",
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                color: "#64748b",
                fontSize: "0.68rem",
                marginTop: "2px",
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
