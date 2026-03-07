import { useEffect, useState } from "react";
import SEO from "../../components/SEO";
import { trackCalculatorUsed } from "../../utils/analytics";

interface Props {
  onNavigate: (page: string) => void;
  onBack: () => void;
}

const ACCENT = "#f97316";
const ACCENT_LIGHT = "#fb923c";

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

const resultBoxStyle: React.CSSProperties = {
  background: "#0f172a",
  border: `1px solid ${ACCENT}`,
  borderRadius: "0.75rem",
  padding: "1rem 1.25rem",
  marginTop: "1rem",
  color: ACCENT_LIGHT,
  fontSize: "1.2rem",
  fontWeight: 700,
};

function calcBtn(
  onClick: () => void,
  label: string,
  ocid: string,
): React.ReactNode {
  return (
    <button
      type="button"
      data-ocid={ocid}
      onClick={onClick}
      style={{
        background: ACCENT,
        color: "#ffffff",
        border: "none",
        borderRadius: "0.5rem",
        padding: "0.65rem 1.5rem",
        fontSize: "0.9375rem",
        fontWeight: 700,
        cursor: "pointer",
        transition: "background 0.15s",
        marginTop: "0.75rem",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = "#ea580c";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = ACCENT;
      }}
    >
      {label}
    </button>
  );
}

function resetBtn(onClick: () => void, ocid: string): React.ReactNode {
  return (
    <button
      type="button"
      data-ocid={ocid}
      onClick={onClick}
      style={{
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
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.color = "#94a3b8";
        (e.currentTarget as HTMLButtonElement).style.borderColor = "#94a3b8";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.color = "#64748b";
        (e.currentTarget as HTMLButtonElement).style.borderColor = "#334155";
      }}
    >
      Reset
    </button>
  );
}

const faqItems = [
  {
    q: "How do I calculate what percentage one number is of another?",
    a: "Divide the part by the whole, then multiply by 100. For example, to find what percentage 45 is of 180: (45 ÷ 180) × 100 = 25%. Use the 'What % is X of Y?' section in the tool above.",
  },
  {
    q: "How do I find X% of a number?",
    a: "Multiply the number by the percentage and divide by 100. For example, 15% of 200 = (15 × 200) ÷ 100 = 30. The tool handles this instantly in the first calculator section.",
  },
  {
    q: "How is percentage increase or decrease calculated?",
    a: "Percentage change = ((New Value − Old Value) ÷ Old Value) × 100. A positive result means an increase; a negative result means a decrease. Example: from 80 to 100 = ((100−80)÷80)×100 = 25% increase.",
  },
  {
    q: "Is this percentage calculator free?",
    a: "Yes, completely free with no signup required. All calculations happen instantly in your browser — no data is sent to any server.",
  },
  {
    q: "Can I use this calculator for exam marks?",
    a: "Yes. Use the 'What % is X of Y?' section — enter your marks as X and total marks as Y to get your percentage score instantly.",
  },
  {
    q: "What is the formula for percentage change?",
    a: "Percentage Change = ((New − Old) ÷ |Old|) × 100. If the result is positive it's an increase; if negative it's a decrease. This is useful for comparing prices, salaries, exam results, and more.",
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
      name: "Percentage Calculator",
      item: "https://docmastertools.com/percentage-calculator",
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

export default function PercentageCalculatorPage({
  onNavigate,
  onBack,
}: Props) {
  // Mode 1: X% of Y
  const [pct1, setPct1] = useState("");
  const [num1, setNum1] = useState("");
  const [res1, setRes1] = useState<string | null>(null);

  // Mode 2: What % is X of Y
  const [partVal, setPartVal] = useState("");
  const [totalVal, setTotalVal] = useState("");
  const [res2, setRes2] = useState<string | null>(null);

  // Mode 3: Percentage change
  const [oldVal, setOldVal] = useState("");
  const [newVal, setNewVal] = useState("");
  const [res3, setRes3] = useState<string | null>(null);

  useEffect(() => {
    document.title =
      "Percentage Calculator – Free Online Tool | DocMasterTools";
  }, []);

  const calc1 = () => {
    const p = Number.parseFloat(pct1);
    const n = Number.parseFloat(num1);
    if (Number.isNaN(p) || Number.isNaN(n)) {
      setRes1("Please enter valid numbers.");
      return;
    }
    setRes1(
      `${p}% of ${n} = ${((p * n) / 100).toFixed(4).replace(/\.?0+$/, "")}`,
    );
    trackCalculatorUsed("percentage_calculator");
  };

  const calc2 = () => {
    const part = Number.parseFloat(partVal);
    const total = Number.parseFloat(totalVal);
    if (Number.isNaN(part) || Number.isNaN(total) || total === 0) {
      setRes2("Please enter valid numbers (total cannot be 0).");
      return;
    }
    setRes2(
      `${partVal} is ${((part / total) * 100).toFixed(4).replace(/\.?0+$/, "")}% of ${totalVal}`,
    );
    trackCalculatorUsed("percentage_calculator");
  };

  const calc3 = () => {
    const o = Number.parseFloat(oldVal);
    const n = Number.parseFloat(newVal);
    if (Number.isNaN(o) || Number.isNaN(n) || o === 0) {
      setRes3("Please enter valid numbers (old value cannot be 0).");
      return;
    }
    const change = ((n - o) / Math.abs(o)) * 100;
    const sign = change >= 0 ? "+" : "";
    setRes3(
      `${sign}${change.toFixed(4).replace(/\.?0+$/, "")}% (${change >= 0 ? "increase" : "decrease"})`,
    );
    trackCalculatorUsed("percentage_calculator");
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
        title="Percentage Calculator – Free Online Tool | DocMasterTools"
        description="Calculate percentages instantly: find X% of a number, what percentage one number is of another, or percentage increase/decrease. Free, no signup required."
        canonicalUrl="https://docmastertools.com/percentage-calculator"
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

      {/* Open Graph handled by SEO component; extra OG tags added via meta below */}
      <meta
        property="og:title"
        content="Percentage Calculator – Free Online Tool | DocMasterTools"
      />
      <meta
        property="og:description"
        content="Calculate percentages instantly — find X% of Y, what % is X of Y, and percentage change. Free browser-based tool, no signup needed."
      />
      <meta
        property="og:url"
        content="https://docmastertools.com/percentage-calculator"
      />
      <meta property="og:type" content="website" />

      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Back button */}
        <button
          type="button"
          data-ocid="pctcalc.secondary_button"
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
          <span style={{ color: ACCENT_LIGHT }}>Percentage Calculator</span>
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
          Percentage Calculator – Free Online Tool
        </h1>
        <p
          style={{
            ...bodyText,
            fontSize: "1rem",
            marginBottom: "2rem",
            maxWidth: "700px",
          }}
        >
          Instantly calculate percentages three ways: find what X% of a number
          is, determine what percentage one number is of another, or compute
          percentage increase or decrease. All calculations happen in your
          browser — no login, no ads, completely private.
        </p>

        {/* ── TOOL ── */}
        <div style={cardStyle}>
          <h2 style={{ ...h2Style, color: ACCENT_LIGHT }}>
            Percentage Calculator
          </h2>

          {/* Section 1 */}
          <div style={{ marginBottom: "1.75rem" }}>
            <h3 style={h3Style}>1. Find X% of a Number</h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                marginTop: "0.75rem",
              }}
            >
              <div>
                <label style={labelStyle} htmlFor="pct1">
                  Percentage (%)
                </label>
                <input
                  id="pct1"
                  data-ocid="pctcalc.input"
                  type="number"
                  placeholder="e.g. 15"
                  value={pct1}
                  onChange={(e) => setPct1(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle} htmlFor="num1">
                  Number
                </label>
                <input
                  id="num1"
                  data-ocid="pctcalc.input"
                  type="number"
                  placeholder="e.g. 200"
                  value={num1}
                  onChange={(e) => setNum1(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              {calcBtn(calc1, "Calculate", "pctcalc.primary_button")}
              {resetBtn(() => {
                setPct1("");
                setNum1("");
                setRes1(null);
              }, "pctcalc.delete_button")}
            </div>
            {res1 !== null && <div style={resultBoxStyle}>{res1}</div>}
          </div>

          {/* Section 2 */}
          <div
            style={{
              marginBottom: "1.75rem",
              borderTop: "1px solid #1e293b",
              paddingTop: "1.5rem",
            }}
          >
            <h3 style={h3Style}>2. What % is X of Y?</h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                marginTop: "0.75rem",
              }}
            >
              <div>
                <label style={labelStyle} htmlFor="partVal">
                  Value (X)
                </label>
                <input
                  id="partVal"
                  data-ocid="pctcalc.input"
                  type="number"
                  placeholder="e.g. 45"
                  value={partVal}
                  onChange={(e) => setPartVal(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle} htmlFor="totalVal">
                  Total (Y)
                </label>
                <input
                  id="totalVal"
                  data-ocid="pctcalc.input"
                  type="number"
                  placeholder="e.g. 180"
                  value={totalVal}
                  onChange={(e) => setTotalVal(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              {calcBtn(calc2, "Calculate", "pctcalc.primary_button")}
              {resetBtn(() => {
                setPartVal("");
                setTotalVal("");
                setRes2(null);
              }, "pctcalc.delete_button")}
            </div>
            {res2 !== null && <div style={resultBoxStyle}>{res2}</div>}
          </div>

          {/* Section 3 */}
          <div style={{ borderTop: "1px solid #1e293b", paddingTop: "1.5rem" }}>
            <h3 style={h3Style}>3. Percentage Change (Increase / Decrease)</h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                marginTop: "0.75rem",
              }}
            >
              <div>
                <label style={labelStyle} htmlFor="oldVal">
                  Old Value
                </label>
                <input
                  id="oldVal"
                  data-ocid="pctcalc.input"
                  type="number"
                  placeholder="e.g. 80"
                  value={oldVal}
                  onChange={(e) => setOldVal(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle} htmlFor="newVal">
                  New Value
                </label>
                <input
                  id="newVal"
                  data-ocid="pctcalc.input"
                  type="number"
                  placeholder="e.g. 100"
                  value={newVal}
                  onChange={(e) => setNewVal(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              {calcBtn(calc3, "Calculate", "pctcalc.primary_button")}
              {resetBtn(() => {
                setOldVal("");
                setNewVal("");
                setRes3(null);
              }, "pctcalc.delete_button")}
            </div>
            {res3 !== null && <div style={resultBoxStyle}>{res3}</div>}
          </div>
        </div>

        {/* ── SEO CONTENT ── */}
        <div style={cardStyle}>
          <h2 style={h2Style}>What Is a Percentage Calculator?</h2>
          <p style={bodyText}>
            A percentage calculator is a digital tool that solves the three most
            common percentage problems in seconds. Whether you need to find 18%
            of 350, determine what percentage 72 is out of 240, or calculate how
            much a stock price changed between two values, this tool gives you
            the answer without requiring a formula or mental arithmetic.
          </p>
          <p style={{ ...bodyText, marginTop: "0.75rem" }}>
            Percentages appear in virtually every area of daily life — from exam
            scores and salary hikes to GST calculations, bank interest, shopping
            discounts, and data analysis. Understanding how to calculate
            percentages accurately is a fundamental numerical skill.
          </p>
          <p style={{ ...bodyText, marginTop: "0.75rem" }}>
            Our free online percentage calculator covers all three core
            scenarios in one page: finding a percentage of a number, finding
            what percentage X is of Y, and calculating percentage change between
            two values. No signup, no download, no data collection — just
            instant results.
          </p>
        </div>

        <div style={cardStyle}>
          <h2 style={h2Style}>How to Use the Percentage Calculator</h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {[
              {
                step: 1,
                title: "Choose Your Calculation Type",
                body: "Select from three modes: (1) Find X% of a number, (2) Find what percentage one number is of another, or (3) Calculate percentage change between two values.",
              },
              {
                step: 2,
                title: "Enter Your Numbers",
                body: "Type the required values into the input fields. All fields accept whole numbers and decimals. You do not need to add the % symbol — just enter the numeric value.",
              },
              {
                step: 3,
                title: "Click Calculate",
                body: "Press the orange Calculate button. The result appears immediately below the inputs in a highlighted result box.",
              },
              {
                step: 4,
                title: "Reset and Try Again",
                body: "Click Reset to clear the fields and try a different calculation. Each of the three calculator sections resets independently.",
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
          <h2 style={h2Style}>Percentage Formulas Explained</h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            {[
              {
                title: "Find X% of a Number",
                formula: "Result = (X ÷ 100) × Number",
                example: "15% of 200 = (15 ÷ 100) × 200 = 30",
                use: "Used for calculating discounts, GST, interest amounts, tip calculations.",
              },
              {
                title: "What Percentage is X of Y?",
                formula: "Percentage = (X ÷ Y) × 100",
                example: "45 out of 180 = (45 ÷ 180) × 100 = 25%",
                use: "Used for exam scores, market share, survey results, budget analysis.",
              },
              {
                title: "Percentage Change",
                formula: "Change% = ((New − Old) ÷ |Old|) × 100",
                example:
                  "Price moved from ₹80 to ₹100: ((100 − 80) ÷ 80) × 100 = 25% increase",
                use: "Used for price comparisons, salary hike calculations, stock performance, revenue growth.",
              },
            ].map(({ title, formula, example, use }) => (
              <div
                key={title}
                style={{
                  background: "#0f172a",
                  border: "1px solid #1e293b",
                  borderRadius: "0.75rem",
                  padding: "1.125rem 1.25rem",
                }}
              >
                <h3 style={{ ...h3Style, color: ACCENT_LIGHT }}>{title}</h3>
                <p
                  style={{
                    ...bodyText,
                    fontFamily: "monospace",
                    color: "#e2e8f0",
                    marginBottom: "0.5rem",
                  }}
                >
                  {formula}
                </p>
                <p style={{ ...bodyText, marginBottom: "0.35rem" }}>
                  <strong style={{ color: "#e2e8f0" }}>Example: </strong>
                  {example}
                </p>
                <p style={bodyText}>
                  <strong style={{ color: "#e2e8f0" }}>Common uses: </strong>
                  {use}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div style={cardStyle}>
          <h2 style={h2Style}>Percentage Examples</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1rem",
            }}
          >
            {[
              { q: "What is 20% of 500?", a: "20% × 500 ÷ 100 = 100" },
              { q: "45 out of 150 is what %?", a: "(45 ÷ 150) × 100 = 30%" },
              {
                q: "Salary hike: ₹25,000 → ₹30,000",
                a: "((30000 − 25000) ÷ 25000) × 100 = 20% increase",
              },
              { q: "What is 8.5% of 12,000?", a: "8.5 × 12000 ÷ 100 = 1,020" },
              { q: "Marks: 78 out of 100", a: "(78 ÷ 100) × 100 = 78%" },
              {
                q: "Price drop: ₹400 → ₹320",
                a: "((320 − 400) ÷ 400) × 100 = −20% (decrease)",
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
          <h2 style={h2Style}>Tips for Using Percentages</h2>
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
                tip: "Multiply by 0.01 instead of dividing by 100",
                body: "A quick mental shortcut: 25% of 80 = 25 × 0.01 × 80 = 20. This works for any percentage.",
              },
              {
                tip: "Percentage of 100 is always that number itself",
                body: "18% of 100 = 18, 42% of 100 = 42. Use 100 as a reference to check your calculations.",
              },
              {
                tip: "To add a percentage, multiply by (1 + rate)",
                body: "To add 12% GST to ₹5,000: 5000 × 1.12 = ₹5,600. Faster than calculating the tax separately then adding.",
              },
              {
                tip: "To remove a percentage, multiply by (1 − rate)",
                body: "To find the original price before a 20% discount on ₹800: 800 ÷ 0.8 = ₹1,000. This reverses the discount correctly.",
              },
              {
                tip: "Cross-check with the reverse formula",
                body: "If 30% of X = 90, then X = 90 ÷ 0.3 = 300. Always verify important calculations using the inverse operation.",
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
                data-ocid={`pctcalc.item.${i + 1}`}
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
                label: "Discount Calculator",
                page: "discount-calculator",
                emoji: "🏷️",
                desc: "Calculate savings & final price",
              },
              {
                label: "Loan EMI Calculator",
                page: "loan-emi-calculator",
                emoji: "🏦",
                desc: "Monthly loan repayment",
              },
              {
                label: "Calculator Hub",
                page: "calculators",
                emoji: "🧮",
                desc: "All calculators in one place",
              },
              {
                label: "GST Calculator",
                page: "calc-gst",
                emoji: "💹",
                desc: "Calculate GST on any amount",
              },
            ].map((tool) => (
              <button
                key={tool.page}
                type="button"
                data-ocid="pctcalc.link"
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
              data-ocid="pctcalc.primary_button"
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
                  "#ea580c";
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
              data-ocid="pctcalc.secondary_button"
              onClick={() => onNavigate("discount-calculator")}
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
                  "rgba(251,146,60,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "transparent";
              }}
            >
              Discount Calculator →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
