import { useEffect, useState } from "react";
import SEO from "../../components/SEO";
import { trackCalculatorUsed } from "../../utils/analytics";

interface Props {
  onNavigate: (page: string) => void;
  onBack: () => void;
}

const ACCENT = "#10b981";
const ACCENT_LIGHT = "#34d399";

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

const inputStyle: React.CSSProperties = {
  background: "#0f172a",
  color: "#e2e8f0",
  border: "1px solid #334155",
  borderRadius: "0.5rem",
  padding: "0.65rem 1rem",
  fontSize: "1rem",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
  fontFamily: "inherit",
};

const labelStyle: React.CSSProperties = {
  color: "#94a3b8",
  fontSize: "0.875rem",
  marginBottom: "0.4rem",
  display: "block",
};

const faqItems = [
  {
    q: "How do you calculate the discounted price?",
    a: "Discounted Price = Original Price × (1 − Discount% ÷ 100). For example, a 30% discount on ₹500: 500 × (1 − 0.30) = ₹350. The tool above performs this calculation instantly.",
  },
  {
    q: "How do you find the discount percentage from two prices?",
    a: "Discount% = ((Original Price − Sale Price) ÷ Original Price) × 100. For example, if an item was ₹800 and is now ₹600: ((800 − 600) ÷ 800) × 100 = 25%.",
  },
  {
    q: "How do I calculate savings amount?",
    a: "Savings Amount = Original Price × Discount% ÷ 100. If the original price is ₹1,200 and the discount is 15%: 1200 × 0.15 = ₹180 saved.",
  },
  {
    q: "What is double discount or successive discount?",
    a: "A double discount is not simply additive. A 20% discount followed by a 10% discount is NOT equal to 30%. The effective rate is: 1 − (1−0.20)(1−0.10) = 1 − 0.72 = 28%. Always apply discounts sequentially.",
  },
  {
    q: "How do I find the original price before a discount?",
    a: "Original Price = Sale Price ÷ (1 − Discount% ÷ 100). If a product costs ₹700 after a 30% discount: 700 ÷ 0.70 = ₹1,000. Use the reverse discount mode in the calculator above.",
  },
  {
    q: "Is this discount calculator free to use?",
    a: "Yes. Completely free, no login required, and all calculations run locally in your browser. No data is sent to any server.",
  },
];

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
      name: "Calculator Hub",
      item: "https://docmastertools.com/calculators",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Discount Calculator",
      item: "https://docmastertools.com/discount-calculator",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function DiscountCalculatorSEOPage({
  onNavigate,
  onBack,
}: Props) {
  // Mode 1: original + pct off -> final price, savings
  const [origPrice, setOrigPrice] = useState("");
  const [discPct, setDiscPct] = useState("");
  const [res1, setRes1] = useState<{ final: string; savings: string } | null>(
    null,
  );

  // Mode 2: original + sale price -> discount %
  const [origPrice2, setOrigPrice2] = useState("");
  const [salePrice2, setSalePrice2] = useState("");
  const [res2, setRes2] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Discount Calculator – Free Online Tool | DocMasterTools";
  }, []);

  const calc1 = () => {
    const op = Number.parseFloat(origPrice);
    const dp = Number.parseFloat(discPct);
    if (Number.isNaN(op) || Number.isNaN(dp) || op < 0 || dp < 0 || dp > 100) {
      setRes1({
        final: "Please enter valid values (0–100% discount).",
        savings: "",
      });
      return;
    }
    const savings = (op * dp) / 100;
    const final = op - savings;
    setRes1({
      final: final.toFixed(2),
      savings: savings.toFixed(2),
    });
    trackCalculatorUsed("discount_calculator");
  };

  const calc2 = () => {
    const op = Number.parseFloat(origPrice2);
    const sp = Number.parseFloat(salePrice2);
    if (Number.isNaN(op) || Number.isNaN(sp) || op <= 0) {
      setRes2("Please enter valid prices (original > 0).");
      return;
    }
    if (sp > op) {
      setRes2("Sale price cannot be greater than original price.");
      return;
    }
    const pct = ((op - sp) / op) * 100;
    setRes2(`Discount: ${pct.toFixed(2)}% (you save ${(op - sp).toFixed(2)})`);
    trackCalculatorUsed("discount_calculator");
  };

  const btnStyle: React.CSSProperties = {
    background: ACCENT,
    color: "#ffffff",
    border: "none",
    borderRadius: "0.5rem",
    padding: "0.65rem 1.5rem",
    fontSize: "0.9375rem",
    fontWeight: 700,
    cursor: "pointer",
    marginTop: "0.75rem",
    transition: "background 0.15s",
  };

  const resetBtnStyle: React.CSSProperties = {
    background: "transparent",
    color: "#64748b",
    border: "1px solid #334155",
    borderRadius: "0.5rem",
    padding: "0.65rem 1.25rem",
    fontSize: "0.875rem",
    cursor: "pointer",
    marginTop: "0.75rem",
    marginLeft: "0.75rem",
    transition: "all 0.15s",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        padding: "2rem 1rem",
      }}
    >
      <SEO
        title="Discount Calculator – Free Online Tool | DocMasterTools"
        description="Calculate discounted price, savings amount, and discount percentage instantly. Free online discount calculator — no signup, no download, works in your browser."
        canonicalUrl="https://docmastertools.com/discount-calculator"
      />

      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Back */}
        <button
          type="button"
          data-ocid="disccalc.secondary_button"
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
            (e.currentTarget as HTMLButtonElement).style.color = ACCENT_LIGHT;
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              ACCENT_LIGHT;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "#94a3b8";
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              "#334155";
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
          <button
            type="button"
            onClick={() => onNavigate("calculators")}
            style={{
              background: "none",
              border: "none",
              color: "#64748b",
              cursor: "pointer",
              padding: 0,
            }}
          >
            Calculator Hub
          </button>
          <span style={{ margin: "0 0.4rem" }}>›</span>
          <span style={{ color: ACCENT_LIGHT }}>Discount Calculator</span>
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
          Discount Calculator – Free Online Tool
        </h1>
        <p
          style={{
            ...bodyText,
            fontSize: "1rem",
            marginBottom: "2rem",
            maxWidth: "700px",
          }}
        >
          Calculate the final price after a discount, total savings, and the
          discount percentage between two prices — all instantly in your
          browser. No signup, no ads, completely private.
        </p>

        {/* ── TOOL ── */}
        <div style={cardStyle}>
          <h2 style={{ ...h2Style, color: ACCENT_LIGHT }}>
            Discount Calculator
          </h2>

          {/* Mode 1 */}
          <div style={{ marginBottom: "1.75rem" }}>
            <h3 style={h3Style}>1. Find Final Price & Savings</h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                marginTop: "0.75rem",
              }}
            >
              <div>
                <label style={labelStyle} htmlFor="origPrice">
                  Original Price
                </label>
                <input
                  id="origPrice"
                  data-ocid="disccalc.input"
                  type="number"
                  placeholder="e.g. 1200"
                  value={origPrice}
                  onChange={(e) => setOrigPrice(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle} htmlFor="discPct">
                  Discount (%)
                </label>
                <input
                  id="discPct"
                  data-ocid="disccalc.input"
                  type="number"
                  placeholder="e.g. 25"
                  value={discPct}
                  onChange={(e) => setDiscPct(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <button
                type="button"
                data-ocid="disccalc.primary_button"
                onClick={calc1}
                style={btnStyle}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "#059669";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    ACCENT;
                }}
              >
                Calculate
              </button>
              <button
                type="button"
                data-ocid="disccalc.delete_button"
                onClick={() => {
                  setOrigPrice("");
                  setDiscPct("");
                  setRes1(null);
                }}
                style={resetBtnStyle}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "#94a3b8";
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    "#94a3b8";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "#64748b";
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    "#334155";
                }}
              >
                Reset
              </button>
            </div>
            {res1 && res1.savings !== "" && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.75rem",
                  marginTop: "1rem",
                }}
              >
                <div
                  style={{
                    background: "#0f172a",
                    border: `1px solid ${ACCENT}`,
                    borderRadius: "0.75rem",
                    padding: "1rem",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      color: "#64748b",
                      fontSize: "0.75rem",
                      marginBottom: "0.35rem",
                    }}
                  >
                    Final Price
                  </div>
                  <div
                    style={{
                      color: ACCENT_LIGHT,
                      fontSize: "1.4rem",
                      fontWeight: 800,
                    }}
                  >
                    {res1.final}
                  </div>
                </div>
                <div
                  style={{
                    background: "#0f172a",
                    border: "1px solid #1e293b",
                    borderRadius: "0.75rem",
                    padding: "1rem",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      color: "#64748b",
                      fontSize: "0.75rem",
                      marginBottom: "0.35rem",
                    }}
                  >
                    You Save
                  </div>
                  <div
                    style={{
                      color: "#fbbf24",
                      fontSize: "1.4rem",
                      fontWeight: 800,
                    }}
                  >
                    {res1.savings}
                  </div>
                </div>
              </div>
            )}
            {res1 && res1.savings === "" && (
              <div
                style={{
                  background: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: "0.75rem",
                  padding: "1rem",
                  marginTop: "1rem",
                  color: "#f87171",
                }}
              >
                {res1.final}
              </div>
            )}
          </div>

          {/* Mode 2 */}
          <div style={{ borderTop: "1px solid #1e293b", paddingTop: "1.5rem" }}>
            <h3 style={h3Style}>2. Find Discount Percentage from Two Prices</h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                marginTop: "0.75rem",
              }}
            >
              <div>
                <label style={labelStyle} htmlFor="origPrice2">
                  Original Price
                </label>
                <input
                  id="origPrice2"
                  data-ocid="disccalc.input"
                  type="number"
                  placeholder="e.g. 800"
                  value={origPrice2}
                  onChange={(e) => setOrigPrice2(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle} htmlFor="salePrice2">
                  Sale Price
                </label>
                <input
                  id="salePrice2"
                  data-ocid="disccalc.input"
                  type="number"
                  placeholder="e.g. 600"
                  value={salePrice2}
                  onChange={(e) => setSalePrice2(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <button
                type="button"
                data-ocid="disccalc.primary_button"
                onClick={calc2}
                style={btnStyle}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "#059669";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    ACCENT;
                }}
              >
                Calculate
              </button>
              <button
                type="button"
                data-ocid="disccalc.delete_button"
                onClick={() => {
                  setOrigPrice2("");
                  setSalePrice2("");
                  setRes2(null);
                }}
                style={resetBtnStyle}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "#94a3b8";
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    "#94a3b8";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "#64748b";
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    "#334155";
                }}
              >
                Reset
              </button>
            </div>
            {res2 !== null && (
              <div
                style={{
                  background: "#0f172a",
                  border: `1px solid ${ACCENT}`,
                  borderRadius: "0.75rem",
                  padding: "1rem 1.25rem",
                  marginTop: "1rem",
                  color: ACCENT_LIGHT,
                  fontSize: "1.15rem",
                  fontWeight: 700,
                }}
              >
                {res2}
              </div>
            )}
          </div>
        </div>

        {/* ── SEO CONTENT ── */}
        <div style={cardStyle}>
          <h2 style={h2Style}>What Is a Discount Calculator?</h2>
          <p style={bodyText}>
            A discount calculator is a tool that helps you instantly determine
            how much you will pay after a percentage discount is applied, how
            much you will save, and what percentage off a product represents. It
            is one of the most searched financial tools on the internet, used
            daily by millions of shoppers, business owners, and students.
          </p>
          <p style={{ ...bodyText, marginTop: "0.75rem" }}>
            Discounts are everywhere — seasonal sales, coupon codes, bulk
            pricing, clearance events, GST-inclusive offers. Knowing exactly how
            much you save, and what percentage off a deal represents, helps you
            make better purchasing decisions.
          </p>
          <p style={{ ...bodyText, marginTop: "0.75rem" }}>
            Our free online discount calculator solves both directions: enter
            the original price and discount percentage to get the final price
            and savings amount, or enter the original and sale price to find out
            what percentage discount was applied. All results are instant and
            accurate to two decimal places.
          </p>
        </div>

        <div style={cardStyle}>
          <h2 style={h2Style}>How to Use the Discount Calculator</h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {[
              {
                step: 1,
                title: "Select a Calculation Mode",
                body: "Mode 1 calculates the final price and savings from original price plus discount percentage. Mode 2 finds the discount percentage when you know the original and sale prices.",
              },
              {
                step: 2,
                title: "Enter the Values",
                body: "Type the original price in the first field. For Mode 1, enter the discount percentage (e.g. 20 for 20%). For Mode 2, enter the actual sale price instead.",
              },
              {
                step: 3,
                title: "Click Calculate",
                body: "Press Calculate. In Mode 1 you'll see the final price and savings amount in two separate result boxes. In Mode 2 you'll see the exact discount percentage.",
              },
              {
                step: 4,
                title: "Reset and Try Another",
                body: "Use the Reset button to clear the fields for a new calculation. Each mode resets independently — you can compare prices without losing your previous result.",
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
          <h2 style={h2Style}>Discount Examples</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "1rem",
            }}
          >
            {[
              { q: "₹1,500 with 20% off", a: "Final: ₹1,200 | Saved: ₹300" },
              {
                q: "₹3,000 with 33.33% off",
                a: "Final: ₹2,000 | Saved: ₹1,000",
              },
              { q: "Original ₹800 → Sale ₹600", a: "Discount: 25%" },
              { q: "₹499 with 10% off", a: "Final: ₹449.10 | Saved: ₹49.90" },
              { q: "Original ₹2,500 → Sale ₹1,750", a: "Discount: 30%" },
              {
                q: "₹12,000 with 15% off",
                a: "Final: ₹10,200 | Saved: ₹1,800",
              },
            ].map((ex) => (
              <div
                key={ex.q}
                style={{
                  background: "#0f172a",
                  border: "1px solid #1e293b",
                  borderRadius: "0.625rem",
                  padding: "0.875rem 1rem",
                }}
              >
                <p
                  style={{
                    color: "#cbd5e1",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    marginBottom: "0.35rem",
                  }}
                >
                  {ex.q}
                </p>
                <p
                  style={{
                    color: ACCENT_LIGHT,
                    fontSize: "0.9375rem",
                    fontWeight: 700,
                    margin: 0,
                  }}
                >
                  {ex.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div style={cardStyle}>
          <h2 style={h2Style}>Smart Shopping Tips</h2>
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
                tip: "Compare effective prices, not percentages",
                body: "A 50% discount on ₹2,000 (saves ₹1,000) is better than 70% on ₹1,200 (saves ₹840). Always check the actual savings amount.",
              },
              {
                tip: "Beware of inflated original prices",
                body: "Retailers sometimes raise the listed price before applying a discount. Use the reverse mode to verify: enter the 'was' price and 'now' price to see the real percentage.",
              },
              {
                tip: "Stack coupons on already-discounted items",
                body: "Apply coupon discount sequentially. A 20% off coupon on a ₹1,000 item already at 10% off: 1000 × 0.90 × 0.80 = ₹720 (28% effective discount).",
              },
              {
                tip: "Use the tool for GST-inclusive pricing",
                body: "To find the pre-GST price of a ₹1,180 item with 18% GST: 1180 ÷ 1.18 = ₹1,000. Use Mode 2 (₹1,180 original, ₹1,000 sale) to confirm the 15.25% effective rate.",
              },
              {
                tip: "Check price per unit for bulk deals",
                body: "When comparing a single item at ₹500 vs 3 for ₹1,200: divide to get ₹400 per item — a 20% saving per unit. Discount calculators help compare unit economics.",
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
                    {tip}:{" "}
                  </strong>
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
            {faqItems.map((faq, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: static FAQ list
                key={i}
                data-ocid={`disccalc.item.${i + 1}`}
                style={{
                  borderBottom:
                    i < faqItems.length - 1 ? "1px solid #1e293b" : "none",
                  paddingBottom: i < faqItems.length - 1 ? "1.25rem" : 0,
                }}
              >
                <h3
                  style={{
                    ...h3Style,
                    color: ACCENT_LIGHT,
                    marginBottom: "0.375rem",
                  }}
                >
                  Q: {faq.q}
                </h3>
                <p style={bodyText}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Tools */}
        <div style={cardStyle}>
          <h2 style={h2Style}>Related Calculators & Tools</h2>
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
                label: "Percentage Calculator",
                page: "percentage-calculator",
                emoji: "%",
                desc: "Find X% of any number",
              },
              {
                label: "Loan EMI Calculator",
                page: "loan-emi-calculator",
                emoji: "🏦",
                desc: "Monthly loan repayment",
              },
              {
                label: "GST Calculator",
                page: "calc-gst",
                emoji: "💹",
                desc: "Add or remove GST",
              },
              {
                label: "Calculator Hub",
                page: "calculators",
                emoji: "🧮",
                desc: "All calculators in one place",
              },
            ].map((tool) => (
              <button
                key={tool.page}
                type="button"
                data-ocid="disccalc.link"
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
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    ACCENT;
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "#1e293b";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    "#1e293b";
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "#0f172a";
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

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button
              type="button"
              data-ocid="disccalc.primary_button"
              onClick={() => onNavigate("calculators")}
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
                (e.currentTarget as HTMLButtonElement).style.background =
                  "#059669";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  ACCENT;
              }}
            >
              Open Calculator Hub →
            </button>
            <button
              type="button"
              data-ocid="disccalc.secondary_button"
              onClick={() => onNavigate("loan-emi-calculator")}
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
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(52,211,153,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "transparent";
              }}
            >
              Loan EMI Calculator →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
