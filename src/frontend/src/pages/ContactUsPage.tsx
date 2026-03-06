import { ArrowLeft, Globe, Mail } from "lucide-react";
import { useState } from "react";

interface ContactUsPageProps {
  onBack: () => void;
}

export default function ContactUsPage({ onBack }: ContactUsPageProps) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        padding: "2rem 1rem",
      }}
    >
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        {/* Back button */}
        <button
          type="button"
          data-ocid="contact_us.back_button"
          onClick={onBack}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "transparent",
            border: "none",
            color: "#94a3b8",
            cursor: "pointer",
            fontSize: "0.9rem",
            marginBottom: "2rem",
            padding: "0.25rem 0",
          }}
        >
          <ArrowLeft size={16} />
          Back to Home
        </button>

        {/* Header */}
        <h1
          style={{
            color: "#ffffff",
            fontSize: "2rem",
            fontWeight: 700,
            marginBottom: "0.5rem",
          }}
        >
          Contact Us
        </h1>
        <p
          style={{
            color: "#94a3b8",
            marginBottom: "2rem",
            fontSize: "0.95rem",
          }}
        >
          Have a question or feedback? We'd love to hear from you.
        </p>

        {/* Contact Info */}
        <div
          style={{
            background: "#111827",
            borderRadius: "0.75rem",
            padding: "1.5rem",
            marginBottom: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <Mail size={18} color="#f97316" />
            <div>
              <p
                style={{
                  color: "#64748b",
                  fontSize: "0.75rem",
                  marginBottom: "0.1rem",
                }}
              >
                Email
              </p>
              <a
                href="mailto:support@docmastertools.com"
                style={{
                  color: "#f97316",
                  fontSize: "0.95rem",
                  textDecoration: "none",
                }}
              >
                support@docmastertools.com
              </a>
            </div>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <Globe size={18} color="#f97316" />
            <div>
              <p
                style={{
                  color: "#64748b",
                  fontSize: "0.75rem",
                  marginBottom: "0.1rem",
                }}
              >
                Website
              </p>
              <span style={{ color: "#cbd5e1", fontSize: "0.95rem" }}>
                DocMasterTools.com
              </span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div
          style={{
            background: "#111827",
            borderRadius: "0.75rem",
            padding: "1.75rem",
          }}
        >
          <h2
            style={{
              color: "#ffffff",
              fontSize: "1.1rem",
              fontWeight: 600,
              marginBottom: "1.5rem",
            }}
          >
            Send a Message
          </h2>

          {submitted ? (
            <div
              data-ocid="contact_us.success_state"
              style={{
                background: "#14532d",
                border: "1px solid #16a34a",
                borderRadius: "0.5rem",
                padding: "1.25rem",
                textAlign: "center",
                color: "#4ade80",
                fontWeight: 600,
              }}
            >
              Thank you! Your message has been received. We'll get back to you
              at <span style={{ color: "#86efac" }}>{form.email}</span>.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              <div>
                <label
                  htmlFor="contact-name"
                  style={{
                    color: "#94a3b8",
                    fontSize: "0.85rem",
                    display: "block",
                    marginBottom: "0.4rem",
                  }}
                >
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  data-ocid="contact_us.input"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={{
                    width: "100%",
                    background: "#0f172a",
                    border: "1px solid #334155",
                    borderRadius: "0.5rem",
                    color: "#f1f5f9",
                    fontSize: "0.95rem",
                    padding: "0.65rem 0.9rem",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  style={{
                    color: "#94a3b8",
                    fontSize: "0.85rem",
                    display: "block",
                    marginBottom: "0.4rem",
                  }}
                >
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  data-ocid="contact_us.input"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={{
                    width: "100%",
                    background: "#0f172a",
                    border: "1px solid #334155",
                    borderRadius: "0.5rem",
                    color: "#f1f5f9",
                    fontSize: "0.95rem",
                    padding: "0.65rem 0.9rem",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  style={{
                    color: "#94a3b8",
                    fontSize: "0.85rem",
                    display: "block",
                    marginBottom: "0.4rem",
                  }}
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  data-ocid="contact_us.textarea"
                  placeholder="Write your message here..."
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  style={{
                    width: "100%",
                    background: "#0f172a",
                    border: "1px solid #334155",
                    borderRadius: "0.5rem",
                    color: "#f1f5f9",
                    fontSize: "0.95rem",
                    padding: "0.65rem 0.9rem",
                    outline: "none",
                    resize: "vertical",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                  }}
                />
              </div>
              <button
                type="submit"
                data-ocid="contact_us.submit_button"
                style={{
                  background: "#f97316",
                  color: "#fff",
                  border: "none",
                  borderRadius: "0.5rem",
                  padding: "0.75rem 1.75rem",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  alignSelf: "flex-start",
                }}
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
