import { useCallback, useEffect, useState } from "react";
import SEO from "../../components/SEO";
import { trackEvent } from "../../utils/analytics";

interface Props {
  onNavigate: (page: string) => void;
  onBack: () => void;
}

const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

function generatePassword(
  length: number,
  opts: { upper: boolean; lower: boolean; numbers: boolean; symbols: boolean },
): string {
  let charset = "";
  if (opts.upper) charset += UPPERCASE;
  if (opts.lower) charset += LOWERCASE;
  if (opts.numbers) charset += NUMBERS;
  if (opts.symbols) charset += SYMBOLS;
  if (charset === "") return "";

  const array = new Uint32Array(length);
  window.crypto.getRandomValues(array);
  return Array.from(array)
    .map((n) => charset[n % charset.length])
    .join("");
}

function calcStrength(
  password: string,
  opts: { upper: boolean; lower: boolean; numbers: boolean; symbols: boolean },
): { label: string; score: number; color: string } {
  if (password.length === 0) return { label: "", score: 0, color: "#334155" };
  let score = 0;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  if (password.length >= 20) score++;
  if (opts.upper) score++;
  if (opts.lower) score++;
  if (opts.numbers) score++;
  if (opts.symbols) score++;

  if (score <= 2) return { label: "Weak", score: 1, color: "#ef4444" };
  if (score <= 4) return { label: "Fair", score: 2, color: "#f97316" };
  if (score <= 5) return { label: "Strong", score: 3, color: "#22c55e" };
  return { label: "Very Strong", score: 4, color: "#38bdf8" };
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is this password generator secure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The generator uses the Web Crypto API (window.crypto.getRandomValues) — the same cryptographic standard used by security-critical applications. Passwords are generated in your browser and never transmitted to any server.",
      },
    },
    {
      "@type": "Question",
      name: "What password length is recommended?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Security experts recommend at least 16 characters for general use and 20+ characters for critical accounts like email, banking, and cloud storage. Longer is always better.",
      },
    },
    {
      "@type": "Question",
      name: "Should I use symbols in my password?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, when the service allows it. Adding symbols dramatically increases the number of possible passwords, making brute-force attacks much harder. Always enable symbols for your most important accounts.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use the same password on multiple sites?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Never reuse passwords. If one site is breached, attackers will try your credentials on other sites. Generate a unique password for every account and store them in a password manager.",
      },
    },
    {
      "@type": "Question",
      name: "Does the tool store my generated passwords?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Passwords are generated entirely in your browser using JavaScript. Nothing is stored, logged, or transmitted. Close the tab and the password is gone.",
      },
    },
    {
      "@type": "Question",
      name: "What is a password manager and should I use one?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A password manager (Bitwarden, 1Password, KeePass) securely stores all your passwords behind one master password. Using one lets you have unique, complex passwords for every account without memorizing them all.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://docmastertools.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Utility Tools",
      item: "https://docmastertools.com/random-password-generator",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Random Password Generator",
      item: "https://docmastertools.com/random-password-generator",
    },
  ],
};

const ACCENT = "#2563eb";
const ACCENT_LIGHT = "#38bdf8";

const cardStyle: React.CSSProperties = {
  background: "#111827",
  borderRadius: "1rem",
  padding: "1.75rem",
  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
  marginBottom: "1.5rem",
  border: "1px solid #1e293b",
};

const h2Style: React.CSSProperties = {
  color: "#ffffff",
  fontSize: "1.4rem",
  fontWeight: 700,
  marginBottom: "1rem",
  marginTop: 0,
};

const h3Style: React.CSSProperties = {
  color: "#e2e8f0",
  fontSize: "1.05rem",
  fontWeight: 600,
  marginBottom: "0.4rem",
  marginTop: 0,
};

const bodyText: React.CSSProperties = {
  color: "#94a3b8",
  fontSize: "0.95rem",
  lineHeight: 1.7,
  margin: 0,
};

export default function RandomPasswordGeneratorPage({
  onNavigate,
  onBack,
}: Props) {
  const [length, setLength] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    const pw = generatePassword(length, { upper, lower, numbers, symbols });
    setPassword(pw);
    setCopied(false);
    trackEvent("tool_used", {
      tool_name: "password_generator",
      tool_category: "utility_tools",
    });
  }, [length, upper, lower, numbers, symbols]);

  useEffect(() => {
    generate();
  }, [generate]);

  const handleCopy = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    trackEvent("tool_used", {
      tool_name: "password_generator",
      tool_category: "utility_tools",
    });
  };

  const strength = calcStrength(password, { upper, lower, numbers, symbols });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        padding: "2rem 1rem",
      }}
    >
      <SEO
        title="Random Password Generator – Free & Secure Online Tool | DocMasterTools"
        description="Generate strong, random passwords instantly. Customize length and character sets. Uses Web Crypto API for maximum security. Free, no signup, browser-based."
        canonicalUrl="https://docmastertools.com/random-password-generator"
      />

      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data is safe
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data is safe
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Back button */}
        <button
          type="button"
          data-ocid="pwgen.secondary_button"
          onClick={onBack}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "#1e293b",
            color: "#94a3b8",
            border: "1px solid #334155",
            borderRadius: "0.5rem",
            padding: "0.5rem 1rem",
            fontSize: "0.875rem",
            cursor: "pointer",
            marginBottom: "1.5rem",
            transition: "color 0.15s, border-color 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#38bdf8";
            e.currentTarget.style.borderColor = "#38bdf8";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#94a3b8";
            e.currentTarget.style.borderColor = "#334155";
          }}
        >
          ← Back to Home
        </button>

        {/* Breadcrumb */}
        <nav
          style={{
            marginBottom: "1rem",
            fontSize: "0.8125rem",
            color: "#64748b",
          }}
          aria-label="breadcrumb"
        >
          <button
            type="button"
            onClick={() => onNavigate("home")}
            style={{
              background: "none",
              border: "none",
              color: "#64748b",
              cursor: "pointer",
              padding: 0,
            }}
          >
            Home
          </button>
          <span style={{ margin: "0 0.4rem" }}>›</span>
          <span style={{ color: "#94a3b8" }}>Utility Tools</span>
          <span style={{ margin: "0 0.4rem" }}>›</span>
          <span style={{ color: ACCENT_LIGHT }}>Random Password Generator</span>
        </nav>

        {/* H1 */}
        <h1
          style={{
            color: "#ffffff",
            fontSize: "clamp(1.6rem, 4vw, 2.25rem)",
            fontWeight: 800,
            marginBottom: "0.75rem",
            letterSpacing: "-0.02em",
          }}
        >
          Random Password Generator – Free &amp; Secure Online Tool
        </h1>
        <p
          style={{
            ...bodyText,
            fontSize: "1rem",
            marginBottom: "2rem",
            maxWidth: "700px",
          }}
        >
          Generate cryptographically secure, random passwords in seconds. Choose
          your desired length and character set. All generation happens in your
          browser — no passwords are ever sent to a server.
        </p>

        {/* ── TOOL ── */}
        <div style={cardStyle}>
          <h2
            style={{ ...h2Style, color: ACCENT_LIGHT, marginBottom: "1.25rem" }}
          >
            🔐 Password Generator
          </h2>

          {/* Password display */}
          <div
            data-ocid="pwgen.panel"
            style={{
              background: "#0f172a",
              border: "1px solid #334155",
              borderRadius: "0.75rem",
              padding: "1rem 1.25rem",
              marginBottom: "1.25rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <span
              data-ocid="pwgen.input"
              style={{
                fontFamily: "monospace",
                fontSize: "clamp(0.875rem, 2.5vw, 1.125rem)",
                color: "#e2e8f0",
                letterSpacing: "0.05em",
                wordBreak: "break-all",
                flex: 1,
                userSelect: "all",
              }}
            >
              {password || "Configure options below…"}
            </span>
            <button
              type="button"
              data-ocid="pwgen.secondary_button"
              onClick={handleCopy}
              style={{
                background: copied ? "#16a34a" : ACCENT,
                color: "#ffffff",
                border: "none",
                borderRadius: "0.5rem",
                padding: "0.5rem 1.1rem",
                fontSize: "0.875rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "background 0.15s",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                if (!copied) e.currentTarget.style.background = "#1d4ed8";
              }}
              onMouseLeave={(e) => {
                if (!copied) e.currentTarget.style.background = ACCENT;
              }}
            >
              {copied ? "✓ Copied!" : "Copy"}
            </button>
          </div>

          {/* Strength bar */}
          <div style={{ marginBottom: "1.5rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.375rem",
              }}
            >
              <span style={{ color: "#64748b", fontSize: "0.8125rem" }}>
                Password Strength
              </span>
              {strength.label && (
                <span
                  style={{
                    color: strength.color,
                    fontSize: "0.8125rem",
                    fontWeight: 700,
                  }}
                >
                  {strength.label}
                </span>
              )}
            </div>
            <div
              style={{
                height: "6px",
                borderRadius: "9999px",
                background: "#1e293b",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  borderRadius: "9999px",
                  background: strength.color,
                  width: `${(strength.score / 4) * 100}%`,
                  transition: "width 0.3s, background 0.3s",
                }}
              />
            </div>
          </div>

          {/* Length slider */}
          <div style={{ marginBottom: "1.25rem" }}>
            <label
              htmlFor="pw-length"
              style={{
                color: "#e2e8f0",
                fontSize: "0.9375rem",
                fontWeight: 600,
                display: "block",
                marginBottom: "0.75rem",
              }}
            >
              Password Length:{" "}
              <span style={{ color: ACCENT_LIGHT }}>{length}</span>
            </label>
            <input
              id="pw-length"
              type="range"
              data-ocid="pwgen.input"
              min={8}
              max={64}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              style={{ width: "100%", accentColor: ACCENT, cursor: "pointer" }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#475569",
                fontSize: "0.75rem",
                marginTop: "0.25rem",
              }}
            >
              <span>8</span>
              <span>64</span>
            </div>
          </div>

          {/* Checkboxes */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "0.75rem",
              marginBottom: "1.5rem",
            }}
          >
            {[
              {
                label: "Uppercase Letters (A-Z)",
                value: upper,
                setter: setUpper,
                ocid: "pwgen.checkbox",
              },
              {
                label: "Lowercase Letters (a-z)",
                value: lower,
                setter: setLower,
                ocid: "pwgen.checkbox",
              },
              {
                label: "Numbers (0-9)",
                value: numbers,
                setter: setNumbers,
                ocid: "pwgen.checkbox",
              },
              {
                label: "Symbols (!@#$%^&*)",
                value: symbols,
                setter: setSymbols,
                ocid: "pwgen.checkbox",
              },
            ].map(({ label, value, setter, ocid }) => (
              <label
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  cursor: "pointer",
                  padding: "0.75rem 1rem",
                  background: "#0f172a",
                  borderRadius: "0.625rem",
                  border: "1px solid #1e293b",
                  transition: "border-color 0.15s",
                }}
              >
                <input
                  type="checkbox"
                  data-ocid={ocid}
                  checked={value}
                  onChange={(e) => setter(e.target.checked)}
                  style={{
                    accentColor: ACCENT,
                    width: "1rem",
                    height: "1rem",
                    cursor: "pointer",
                  }}
                />
                <span style={{ color: "#e2e8f0", fontSize: "0.875rem" }}>
                  {label}
                </span>
              </label>
            ))}
          </div>

          {/* Generate button */}
          <button
            type="button"
            data-ocid="pwgen.primary_button"
            onClick={generate}
            style={{
              background: ACCENT,
              color: "#ffffff",
              border: "none",
              borderRadius: "0.625rem",
              padding: "0.875rem 2rem",
              fontSize: "1rem",
              fontWeight: 700,
              cursor: "pointer",
              transition: "background 0.15s",
              width: "100%",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#1d4ed8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = ACCENT;
            }}
          >
            🔄 Generate New Password
          </button>
        </div>

        {/* ── SEO CONTENT ── */}
        <div style={cardStyle}>
          <h2 style={h2Style}>What Makes a Strong Password?</h2>
          <p style={bodyText}>
            A strong password is one that is both long and unpredictable.
            Security researchers and organizations like NIST (the US National
            Institute of Standards and Technology) recommend passwords of at
            least 12–16 characters that combine multiple character types. The
            goal is to maximize entropy — the mathematical measure of how many
            possible combinations an attacker must try before guessing your
            password.
          </p>
          <p style={{ ...bodyText, marginTop: "0.75rem" }}>
            A password like "correct-horse-battery-staple" is actually stronger
            than "P@ssw0rd!" because it is much longer and therefore has far
            more entropy, despite being easier to remember. However, for most
            accounts, a randomly generated password stored in a password manager
            provides the highest level of security. Our generator uses the Web
            Crypto API to generate passwords with true cryptographic randomness,
            not a pseudorandom algorithm.
          </p>
          <p style={{ ...bodyText, marginTop: "0.75rem" }}>
            The key factors that determine password strength are: length (more
            characters = exponentially more combinations), character diversity
            (using uppercase, lowercase, numbers, and symbols multiplies the
            possible character set), randomness (no dictionary words, personal
            information, or predictable patterns), and uniqueness (every account
            should have its own password). Our generator scores each password on
            all four dimensions and shows you a real-time strength indicator.
          </p>
        </div>

        <div style={cardStyle}>
          <h2 style={h2Style}>How to Use the Password Generator</h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {[
              {
                step: 1,
                title: "Choose Your Password Length",
                body: "Use the slider to set your desired length between 8 and 64 characters. For most accounts, 16 characters is a strong baseline. For critical accounts (email, banking), use 20+.",
              },
              {
                step: 2,
                title: "Select Character Types",
                body: "Check or uncheck the boxes for uppercase letters, lowercase letters, numbers, and symbols. The more character types you include, the stronger the password. All four are enabled by default.",
              },
              {
                step: 3,
                title: "Check the Strength Indicator",
                body: "The strength bar below the password shows Weak, Fair, Strong, or Very Strong. Aim for Strong or Very Strong for any account that matters. Increase length or add more character types to improve strength.",
              },
              {
                step: 4,
                title: "Generate a New Password",
                body: "Click 'Generate New Password' to create a new random password with your current settings. You can generate as many passwords as you need — each one is unique.",
              },
              {
                step: 5,
                title: "Copy and Save",
                body: "Click the 'Copy' button to copy the password to your clipboard. Immediately paste it into your password manager (Bitwarden, 1Password, LastPass, or any other). Never type passwords in emails or plain text files.",
              },
            ].map(({ step, title, body }) => (
              <div
                key={step}
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: "2rem",
                    height: "2rem",
                    borderRadius: "50%",
                    background: ACCENT,
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {step}
                </div>
                <div>
                  <h3 style={h3Style}>{title}</h3>
                  <p style={bodyText}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={cardStyle}>
          <h2 style={h2Style}>Password Security Best Practices</h2>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "0.875rem",
            }}
          >
            {[
              {
                tip: "Never reuse passwords",
                body: "A single breached site can expose all accounts that share the same password. Each account must have a unique password, no exceptions.",
              },
              {
                tip: "Use a password manager",
                body: "Bitwarden (free), 1Password, and KeePass let you store hundreds of complex passwords behind one master password. You only need to remember one.",
              },
              {
                tip: "Enable two-factor authentication (2FA)",
                body: "Even if your password is leaked, 2FA (authenticator app or hardware key) prevents unauthorized login. Enable it everywhere it is offered.",
              },
              {
                tip: "Never share passwords via email or SMS",
                body: "Email and SMS are unencrypted. If you must share a password temporarily, use an encrypted messaging app or a one-time secret service.",
              },
              {
                tip: "Change passwords after a breach",
                body: "Use services like HaveIBeenPwned.com to check if your email has appeared in a data breach. Change the affected password immediately.",
              },
              {
                tip: "Avoid personal information in passwords",
                body: "Names, birthdays, phone numbers, and addresses are the first things attackers try. Randomly generated passwords have no personal data to discover.",
              },
            ].map(({ tip, body }) => (
              <li
                key={tip}
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    color: ACCENT_LIGHT,
                    marginTop: "0.15rem",
                    flexShrink: 0,
                  }}
                >
                  ✓
                </span>
                <div>
                  <strong style={{ color: "#e2e8f0", fontSize: "0.9375rem" }}>
                    {tip}:
                  </strong>{" "}
                  <span style={{ color: "#94a3b8", fontSize: "0.9375rem" }}>
                    {body}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* FAQ */}
        <div style={cardStyle}>
          <h2 style={h2Style}>Frequently Asked Questions</h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            {faqSchema.mainEntity.map((faq, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: FAQ items are static and order never changes
                key={i}
                data-ocid={`pwgen.item.${i + 1}`}
                style={{
                  borderBottom:
                    i < faqSchema.mainEntity.length - 1
                      ? "1px solid #1e293b"
                      : "none",
                  paddingBottom:
                    i < faqSchema.mainEntity.length - 1 ? "1.25rem" : 0,
                }}
              >
                <h3
                  style={{
                    ...h3Style,
                    color: ACCENT_LIGHT,
                    marginBottom: "0.375rem",
                  }}
                >
                  Q: {faq.name}
                </h3>
                <p style={bodyText}>{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Tools */}
        <div style={cardStyle}>
          <h2 style={h2Style}>Related Free Tools</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: "0.75rem",
              marginBottom: "1.5rem",
            }}
          >
            {[
              {
                label: "PDF Tools",
                page: "pdf-tools",
                emoji: "📄",
                desc: "Merge, compress, convert PDFs",
              },
              {
                label: "Image Tools",
                page: "image-tools",
                emoji: "🖼️",
                desc: "Resize, compress, convert images",
              },
              {
                label: "Resume Builder",
                page: "resume-builder",
                emoji: "📋",
                desc: "Create professional resumes",
              },
              {
                label: "Calculator Hub",
                page: "calculators",
                emoji: "🧮",
                desc: "Academic & financial calculators",
              },
            ].map((tool) => (
              <button
                key={tool.page}
                type="button"
                data-ocid="pwgen.link"
                onClick={() => onNavigate(tool.page)}
                style={{
                  background: "#0f172a",
                  border: "1px solid #1e293b",
                  borderRadius: "0.75rem",
                  padding: "1rem",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = ACCENT;
                  e.currentTarget.style.background = "#1e293b";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#1e293b";
                  e.currentTarget.style.background = "#0f172a";
                }}
              >
                <div style={{ fontSize: "1.5rem", marginBottom: "0.375rem" }}>
                  {tool.emoji}
                </div>
                <div
                  style={{
                    color: "#ffffff",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                  }}
                >
                  {tool.label}
                </div>
                <div
                  style={{
                    color: "#64748b",
                    fontSize: "0.75rem",
                    marginTop: "0.25rem",
                  }}
                >
                  {tool.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            marginBottom: "2rem",
          }}
        >
          <button
            type="button"
            data-ocid="pwgen.primary_button"
            onClick={() => onNavigate("pdf-tools")}
            style={{
              background: ACCENT,
              color: "#ffffff",
              border: "none",
              borderRadius: "0.625rem",
              padding: "0.875rem 1.75rem",
              fontSize: "1rem",
              fontWeight: 700,
              cursor: "pointer",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#1d4ed8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = ACCENT;
            }}
          >
            Open PDF Tools →
          </button>
          <button
            type="button"
            data-ocid="pwgen.secondary_button"
            onClick={() => onNavigate("image-tools")}
            style={{
              background: "transparent",
              color: ACCENT_LIGHT,
              border: `1px solid ${ACCENT_LIGHT}`,
              borderRadius: "0.625rem",
              padding: "0.875rem 1.75rem",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(56,189,248,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            Try Image Tools →
          </button>
        </div>
      </div>
    </div>
  );
}
