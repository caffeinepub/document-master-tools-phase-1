const ALL_LINKS: {
  page: string;
  label: string;
  desc: string;
  emoji: string;
}[] = [
  {
    page: "typing-test",
    label: "Typing Test",
    desc: "Full practice with lessons & certificate",
    emoji: "⌨️",
  },
  {
    page: "typing-games",
    label: "Typing Games",
    desc: "Speed Race, Falling Words, Word Shooter",
    emoji: "🎮",
  },
  {
    page: "daily-typing-challenge",
    label: "Daily Typing Challenge",
    desc: "Fresh challenge every day",
    emoji: "🔥",
  },
  {
    page: "typing-practice",
    label: "Typing Practice",
    desc: "General practice guide & drills",
    emoji: "📝",
  },
  {
    page: "learn-touch-typing",
    label: "Learn Touch Typing",
    desc: "Finger placement & technique",
    emoji: "🖐️",
  },
  {
    page: "free-typing-lessons",
    label: "Free Typing Lessons",
    desc: "Step-by-step beginner lessons",
    emoji: "📚",
  },
  {
    page: "typing-speed-practice",
    label: "Typing Speed Practice",
    desc: "Speed drills to boost WPM",
    emoji: "⚡",
  },
  {
    page: "typing-test-1-minute",
    label: "1 Minute Test",
    desc: "Quick 60-second speed check",
    emoji: "⏱️",
  },
  {
    page: "typing-test-3-minute",
    label: "3 Minute Test",
    desc: "Balanced WPM test",
    emoji: "⏱️",
  },
  {
    page: "typing-test-5-minute",
    label: "5 Minute Test",
    desc: "Endurance test",
    emoji: "⏱️",
  },
];

interface TypingInternalLinksProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export default function TypingInternalLinks({
  onNavigate,
  currentPage,
}: TypingInternalLinksProps) {
  return (
    <div
      data-ocid="typing_links.panel"
      style={{
        background: "#111827",
        borderRadius: "1rem",
        padding: "1.5rem 1.75rem",
        marginBottom: "1.5rem",
        boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
      }}
    >
      <h2
        style={{
          color: "#ffffff",
          fontSize: "1.05rem",
          fontWeight: 700,
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        🔗 More Typing Tools &amp; Resources
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "0.65rem",
        }}
      >
        {ALL_LINKS.map((link) => {
          const isActive = link.page === currentPage;
          return (
            <button
              key={link.page}
              type="button"
              data-ocid={`typing_links.${link.page.replace(/-/g, "_")}.link`}
              onClick={() => onNavigate(link.page)}
              style={{
                background: isActive ? "#1e3a5f" : "#1e293b",
                border: isActive ? "1px solid #2563eb" : "1px solid #334155",
                borderRadius: "0.75rem",
                padding: "0.875rem 1rem",
                textAlign: "left",
                cursor: isActive ? "default" : "pointer",
                transition: "all 0.15s",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  marginBottom: "0.25rem",
                }}
              >
                <span style={{ fontSize: "0.9rem" }}>{link.emoji}</span>
                <span
                  style={{
                    color: isActive ? "#60a5fa" : "#ffffff",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                  }}
                >
                  {link.label}
                </span>
                {isActive && (
                  <span
                    style={{
                      marginLeft: "auto",
                      background: "#2563eb",
                      color: "#fff",
                      fontSize: "0.6rem",
                      padding: "1px 5px",
                      borderRadius: "0.2rem",
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                    }}
                  >
                    Current
                  </span>
                )}
              </div>
              <div
                style={{
                  color: "#64748b",
                  fontSize: "0.75rem",
                  lineHeight: 1.4,
                }}
              >
                {link.desc}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
