import { ArrowLeft, CheckCircle, Search, ShieldX } from "lucide-react";
import { useState } from "react";

const CERTIFICATES_KEY = "typingmaster_certificates";

interface CertificateRecord {
  certificateId: string;
  name: string;
  wpm: number;
  accuracy: number;
  duration: number;
  date: string;
}

function loadCertificates(): CertificateRecord[] {
  try {
    const raw = localStorage.getItem(CERTIFICATES_KEY);
    if (raw) return JSON.parse(raw) as CertificateRecord[];
  } catch {
    // ignore
  }
  return [];
}

interface VerifyCertificatePageProps {
  onBack?: () => void;
}

export default function VerifyCertificatePage({
  onBack,
}: VerifyCertificatePageProps) {
  const [inputId, setInputId] = useState("");
  const [result, setResult] = useState<CertificateRecord | null | undefined>(
    undefined,
  );
  const [searched, setSearched] = useState(false);

  const handleVerify = () => {
    if (!inputId.trim()) return;
    const all = loadCertificates();
    const found = all.find(
      (c) =>
        c.certificateId.trim().toUpperCase() === inputId.trim().toUpperCase(),
    );
    setResult(found ?? null);
    setSearched(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleVerify();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        padding: "2rem 1rem",
        fontFamily: "'Segoe UI', sans-serif",
        color: "#f1f5f9",
      }}
    >
      {/* Back button */}
      {onBack && (
        <div style={{ maxWidth: "640px", margin: "0 auto 1.5rem" }}>
          <button
            type="button"
            data-ocid="verify_cert.back.button"
            onClick={onBack}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              background: "transparent",
              border: "1px solid #334155",
              borderRadius: "0.5rem",
              color: "#94a3b8",
              padding: "0.4rem 0.9rem",
              fontSize: "0.85rem",
              cursor: "pointer",
              transition: "color 0.2s, border-color 0.2s",
            }}
          >
            <ArrowLeft size={15} /> Back
          </button>
        </div>
      )}

      <div style={{ maxWidth: "640px", margin: "0 auto" }}>
        {/* Page Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🔍</div>
          <h1
            style={{
              color: "#ffffff",
              fontSize: "1.75rem",
              fontWeight: 700,
              marginBottom: "0.4rem",
            }}
          >
            Certificate Verification
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "0.95rem" }}>
            Enter your Certificate ID to verify an issued typing certificate.
          </p>
        </div>

        {/* Search Card */}
        <div
          style={{
            background: "#111827",
            borderRadius: "1rem",
            padding: "2rem",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            marginBottom: "1.5rem",
          }}
        >
          <label
            htmlFor="cert-id-input"
            style={{
              display: "block",
              color: "#cbd5e1",
              fontSize: "0.875rem",
              fontWeight: 600,
              marginBottom: "0.6rem",
            }}
          >
            Certificate ID
          </label>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <input
              id="cert-id-input"
              type="text"
              data-ocid="verify_cert.id.input"
              value={inputId}
              onChange={(e) => {
                setInputId(e.target.value);
                setSearched(false);
              }}
              onKeyDown={handleKeyDown}
              placeholder="e.g. DMT-2026-000001"
              style={{
                flex: 1,
                minWidth: "180px",
                background: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "0.6rem",
                color: "#f1f5f9",
                fontSize: "1rem",
                padding: "0.65rem 1rem",
                outline: "none",
                letterSpacing: "0.04em",
                fontFamily: "monospace",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#3b82f6";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#334155";
              }}
            />
            <button
              type="button"
              data-ocid="verify_cert.verify.primary_button"
              onClick={handleVerify}
              disabled={!inputId.trim()}
              style={{
                background: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: "0.6rem",
                padding: "0.65rem 1.5rem",
                fontSize: "0.95rem",
                fontWeight: 600,
                cursor: inputId.trim() ? "pointer" : "not-allowed",
                opacity: inputId.trim() ? 1 : 0.5,
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                transition: "background 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              <Search size={16} /> Verify Certificate
            </button>
          </div>
          <p
            style={{
              color: "#475569",
              fontSize: "0.78rem",
              marginTop: "0.6rem",
            }}
          >
            Example format: DMT-2026-000001
          </p>
        </div>

        {/* Results */}
        {searched && result === null && (
          <div
            data-ocid="verify_cert.error_state"
            style={{
              background: "#111827",
              border: "1px solid #ef4444",
              borderRadius: "1rem",
              padding: "2rem",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <ShieldX size={40} color="#ef4444" />
            <h2
              style={{ color: "#f87171", fontWeight: 700, fontSize: "1.1rem" }}
            >
              Certificate Not Found
            </h2>
            <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
              Certificate not found or invalid. Please check the ID and try
              again.
            </p>
          </div>
        )}

        {searched && result && (
          <div
            data-ocid="verify_cert.success_state"
            style={{
              background:
                "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
              border: "2px solid #4f9cff",
              borderRadius: "1rem",
              padding: "2rem",
              boxShadow:
                "0 0 24px rgba(79,156,255,0.35), 0 8px 32px rgba(0,0,0,0.5)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Subtle watermark */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  fontSize: "3.5rem",
                  fontWeight: 800,
                  color: "rgba(255,255,255,0.04)",
                  transform: "rotate(-20deg)",
                  whiteSpace: "nowrap",
                  userSelect: "none",
                }}
              >
                DocMasterTools.com
              </span>
            </div>

            {/* Verified badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                background: "rgba(34,197,94,0.12)",
                border: "1px solid rgba(34,197,94,0.4)",
                borderRadius: "2rem",
                padding: "0.4rem 1.2rem",
                width: "fit-content",
                margin: "0 auto 1.5rem",
              }}
            >
              <CheckCircle size={18} color="#4ade80" />
              <span
                style={{
                  color: "#4ade80",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Verified
              </span>
            </div>

            {/* Trophy and title */}
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <div style={{ fontSize: "3rem", marginBottom: "0.4rem" }}>🏆</div>
              <h2
                style={{
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "1.4rem",
                  marginBottom: "0.25rem",
                }}
              >
                Certificate of Achievement
              </h2>
              <p style={{ color: "#94a3b8", fontSize: "0.875rem" }}>
                DocMasterTools.com
              </p>
            </div>

            {/* Recipient name */}
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <p
                style={{
                  color: "#94a3b8",
                  fontSize: "0.85rem",
                  marginBottom: "0.3rem",
                }}
              >
                This certifies that
              </p>
              <div
                style={{
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  letterSpacing: "0.02em",
                }}
              >
                {result.name}
              </div>
              <div
                style={{
                  width: "8rem",
                  height: "1px",
                  background: "#475569",
                  margin: "0.75rem auto 0",
                }}
              />
            </div>

            {/* Stats grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                gap: "0.75rem",
                marginBottom: "1.5rem",
              }}
            >
              {[
                {
                  label: "Typing Speed",
                  value: `${result.wpm} WPM`,
                  color: "#4ade80",
                },
                {
                  label: "Accuracy",
                  value: `${result.accuracy}%`,
                  color: "#facc15",
                },
                {
                  label: "Duration",
                  value: `${result.duration} Min`,
                  color: "#38bdf8",
                },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(79,156,255,0.22)",
                    borderRadius: "0.75rem",
                    padding: "0.85rem 0.5rem",
                    textAlign: "center",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <div
                    style={{
                      color: s.color,
                      fontWeight: 700,
                      fontSize: "1.3rem",
                      marginBottom: "0.2rem",
                    }}
                  >
                    {s.value}
                  </div>
                  <div style={{ color: "#94a3b8", fontSize: "0.75rem" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Details */}
            <div
              style={{
                background: "rgba(0,0,0,0.2)",
                borderRadius: "0.6rem",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "0.25rem",
                }}
              >
                <span style={{ color: "#64748b", fontSize: "0.82rem" }}>
                  Date Issued
                </span>
                <span
                  style={{
                    color: "#cbd5e1",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                  }}
                >
                  {result.date}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "0.25rem",
                }}
              >
                <span style={{ color: "#64748b", fontSize: "0.82rem" }}>
                  Certificate ID
                </span>
                <span
                  style={{
                    color: "#60a5fa",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    fontFamily: "monospace",
                    letterSpacing: "0.06em",
                  }}
                >
                  {result.certificateId}
                </span>
              </div>
            </div>

            {/* Footer */}
            <div
              style={{
                borderTop: "1px solid rgba(71,85,105,0.5)",
                paddingTop: "0.9rem",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  color: "#93c5fd",
                  fontWeight: 700,
                  fontSize: "0.82rem",
                  letterSpacing: "0.01em",
                  textShadow: "0 0 10px rgba(147,197,253,0.3)",
                }}
              >
                Generated by DocMasterTools.com — Free Online Document &amp;
                Utility Tools
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
