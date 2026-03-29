import { r as reactExports, j as jsxRuntimeExports, x as trackCalculatorUsed } from "./index-YN_OslaE.js";
import { S as SEO } from "./SEO-DRKgHPjT.js";
const ACCENT = "#6366f1";
const ACCENT_LIGHT = "#818cf8";
const cardStyle = {
  background: "#111827",
  borderRadius: "1rem",
  padding: "1.75rem",
  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
  marginBottom: "1.5rem",
  border: "1px solid #1e293b"
};
const h2Style = {
  color: "#ffffff",
  fontSize: "1.4rem",
  fontWeight: 700,
  marginBottom: "1rem",
  marginTop: 0
};
const h3Style = {
  color: "#e2e8f0",
  fontSize: "1.05rem",
  fontWeight: 600,
  marginBottom: "0.4rem",
  marginTop: 0
};
const bodyText = {
  color: "#94a3b8",
  fontSize: "0.95rem",
  lineHeight: 1.7,
  margin: 0
};
const inputStyle = {
  background: "#0f172a",
  color: "#e2e8f0",
  border: "1px solid #334155",
  borderRadius: "0.5rem",
  padding: "0.65rem 1rem",
  fontSize: "1rem",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
  fontFamily: "inherit"
};
const labelStyle = {
  color: "#94a3b8",
  fontSize: "0.875rem",
  marginBottom: "0.4rem",
  display: "block"
};
const faqItems = [
  {
    q: "What is EMI and how is it calculated?",
    a: "EMI (Equated Monthly Instalment) is a fixed payment you make each month to repay a loan. The formula is: EMI = [P × R × (1+R)^N] ÷ [(1+R)^N − 1], where P = principal loan amount, R = monthly interest rate (annual rate ÷ 12 ÷ 100), and N = number of monthly instalments."
  },
  {
    q: "What is the difference between EMI and simple interest?",
    a: "Simple interest is calculated only on the original principal. EMI uses reducing balance or compound interest — interest is charged on the outstanding principal each month. This is why the EMI formula accounts for the effect of compounding over the loan tenure."
  },
  {
    q: "How can I reduce my EMI amount?",
    a: "You can reduce your EMI by: (1) choosing a longer loan tenure — this spreads repayment over more months; (2) making a larger down payment to reduce the principal; (3) negotiating a lower interest rate; or (4) prepaying part of the loan to reduce the outstanding balance."
  },
  {
    q: "Does a longer tenure mean lower EMI?",
    a: "Yes, a longer tenure lowers your monthly EMI, but you pay significantly more total interest over the life of the loan. A shorter tenure increases your EMI but reduces your total interest burden. Use the calculator to compare scenarios before deciding."
  },
  {
    q: "What is the total interest paid on a loan?",
    a: "Total Interest = (EMI × Number of Months) − Principal. For example, if your EMI is ₹9,500 for 36 months on a ₹3,00,000 loan: total paid = ₹3,42,000, total interest = ₹42,000."
  },
  {
    q: "Is this EMI calculator free?",
    a: "Yes. The tool is completely free, requires no signup, and runs entirely in your browser. No data is sent to any server."
  }
];
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://docmastertools.com/"
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Calculator Hub",
      item: "https://docmastertools.com/calculators"
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Loan EMI Calculator",
      item: "https://docmastertools.com/loan-emi-calculator"
    }
  ]
};
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a }
  }))
};
function formatNum(n) {
  return n.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  });
}
function LoanEMICalculatorPage({ onNavigate, onBack }) {
  const [principal, setPrincipal] = reactExports.useState("");
  const [annualRate, setAnnualRate] = reactExports.useState("");
  const [tenureMonths, setTenureMonths] = reactExports.useState("");
  const [result, setResult] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    document.title = "Loan EMI Calculator – Free Online Tool | DocMasterTools";
  }, []);
  const calculate = () => {
    const P = Number.parseFloat(principal);
    const annRate = Number.parseFloat(annualRate);
    const N = Number.parseFloat(tenureMonths);
    if (Number.isNaN(P) || Number.isNaN(annRate) || Number.isNaN(N) || P <= 0 || annRate <= 0 || N <= 0) {
      setError("Please enter valid positive values for all fields.");
      setResult(null);
      return;
    }
    if (annRate > 100) {
      setError(
        "Annual interest rate seems too high. Please enter a rate like 8.5 for 8.5%."
      );
      setResult(null);
      return;
    }
    if (N > 600) {
      setError("Tenure cannot exceed 600 months (50 years).");
      setResult(null);
      return;
    }
    const R = annRate / 12 / 100;
    const onePlusR_N = (1 + R) ** N;
    const emi = P * R * onePlusR_N / (onePlusR_N - 1);
    const totalPayment = emi * N;
    const totalInterest = totalPayment - P;
    setError(null);
    setResult({ emi, totalInterest, totalPayment });
    trackCalculatorUsed("loan_emi_calculator");
  };
  const reset = () => {
    setPrincipal("");
    setAnnualRate("");
    setTenureMonths("");
    setResult(null);
    setError(null);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        padding: "2rem 1rem"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SEO,
          {
            title: "Loan EMI Calculator – Free Online Tool | DocMasterTools",
            description: "Calculate your monthly loan EMI, total interest, and total payment instantly. Free online EMI calculator for home loans, car loans, and personal loans. No signup required.",
            canonicalUrl: "https://docmastertools.com/loan-emi-calculator"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "script",
          {
            type: "application/ld+json",
            dangerouslySetInnerHTML: { __html: JSON.stringify(faqSchema) }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "script",
          {
            type: "application/ld+json",
            dangerouslySetInnerHTML: { __html: JSON.stringify(breadcrumbSchema) }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { maxWidth: "900px", margin: "0 auto" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "emicalc.secondary_button",
              onClick: onBack,
              style: {
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
                transition: "color 0.15s, border-color 0.15s"
              },
              onMouseEnter: (e) => {
                e.currentTarget.style.color = ACCENT_LIGHT;
                e.currentTarget.style.borderColor = ACCENT_LIGHT;
              },
              onMouseLeave: (e) => {
                e.currentTarget.style.color = "#94a3b8";
                e.currentTarget.style.borderColor = "#334155";
              },
              children: "← Back to Home"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "nav",
            {
              style: {
                marginBottom: "1rem",
                fontSize: "0.8125rem",
                color: "#64748b"
              },
              "aria-label": "breadcrumb",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => onNavigate("home"),
                    style: {
                      background: "none",
                      border: "none",
                      color: "#64748b",
                      cursor: "pointer",
                      padding: 0
                    },
                    children: "Home"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { margin: "0 0.4rem" }, children: "›" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => onNavigate("calculators"),
                    style: {
                      background: "none",
                      border: "none",
                      color: "#64748b",
                      cursor: "pointer",
                      padding: 0
                    },
                    children: "Calculator Hub"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { margin: "0 0.4rem" }, children: "›" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: ACCENT_LIGHT }, children: "Loan EMI Calculator" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h1",
            {
              style: {
                color: "#ffffff",
                fontSize: "clamp(1.6rem, 4vw, 2.25rem)",
                fontWeight: 800,
                marginBottom: "0.75rem",
                letterSpacing: "-0.02em"
              },
              children: "Loan EMI Calculator – Free Online Tool"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              style: {
                ...bodyText,
                fontSize: "1rem",
                marginBottom: "2rem",
                maxWidth: "700px"
              },
              children: "Calculate your monthly EMI, total interest payable, and total loan repayment for any home loan, car loan, or personal loan. Enter the loan amount, annual interest rate, and tenure to get instant results. 100% free, no signup."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { ...h2Style, color: ACCENT_LIGHT }, children: "EMI Calculator" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                  gap: "1rem"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: labelStyle, htmlFor: "principal", children: "Loan Amount (₹)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "principal",
                        "data-ocid": "emicalc.input",
                        type: "number",
                        placeholder: "e.g. 500000",
                        value: principal,
                        onChange: (e) => setPrincipal(e.target.value),
                        style: inputStyle
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: labelStyle, htmlFor: "annualRate", children: "Annual Interest Rate (%)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "annualRate",
                        "data-ocid": "emicalc.input",
                        type: "number",
                        placeholder: "e.g. 8.5",
                        value: annualRate,
                        onChange: (e) => setAnnualRate(e.target.value),
                        style: inputStyle
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: labelStyle, htmlFor: "tenureMonths", children: "Tenure (Months)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "tenureMonths",
                        "data-ocid": "emicalc.input",
                        type: "number",
                        placeholder: "e.g. 36",
                        value: tenureMonths,
                        onChange: (e) => setTenureMonths(e.target.value),
                        style: inputStyle
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        style: {
                          color: "#475569",
                          fontSize: "0.75rem",
                          marginTop: "0.3rem",
                          marginBottom: 0
                        },
                        children: "Tip: 1 year = 12 months, 5 years = 60 months"
                      }
                    )
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: { display: "flex", alignItems: "center", marginTop: "1rem" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "data-ocid": "emicalc.primary_button",
                      onClick: calculate,
                      style: {
                        background: ACCENT,
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "0.5rem",
                        padding: "0.75rem 2rem",
                        fontSize: "1rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        transition: "background 0.15s"
                      },
                      onMouseEnter: (e) => {
                        e.currentTarget.style.background = "#4f46e5";
                      },
                      onMouseLeave: (e) => {
                        e.currentTarget.style.background = ACCENT;
                      },
                      children: "Calculate EMI"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "data-ocid": "emicalc.delete_button",
                      onClick: reset,
                      style: {
                        background: "transparent",
                        color: "#64748b",
                        border: "1px solid #334155",
                        borderRadius: "0.5rem",
                        padding: "0.75rem 1.25rem",
                        fontSize: "0.875rem",
                        cursor: "pointer",
                        marginLeft: "0.75rem",
                        transition: "all 0.15s"
                      },
                      onMouseEnter: (e) => {
                        e.currentTarget.style.color = "#94a3b8";
                        e.currentTarget.style.borderColor = "#94a3b8";
                      },
                      onMouseLeave: (e) => {
                        e.currentTarget.style.color = "#64748b";
                        e.currentTarget.style.borderColor = "#334155";
                      },
                      children: "Reset"
                    }
                  )
                ]
              }
            ),
            error && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  background: "#0f172a",
                  border: "1px solid #ef4444",
                  borderRadius: "0.75rem",
                  padding: "1rem",
                  marginTop: "1rem",
                  color: "#f87171",
                  fontSize: "0.9rem"
                },
                children: error
              }
            ),
            result && !error && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  marginTop: "1.25rem",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                  gap: "0.875rem"
                },
                children: [
                  {
                    label: "Monthly EMI",
                    value: `₹${formatNum(result.emi)}`,
                    color: ACCENT_LIGHT,
                    highlight: true
                  },
                  {
                    label: "Total Interest",
                    value: `₹${formatNum(result.totalInterest)}`,
                    color: "#fbbf24",
                    highlight: false
                  },
                  {
                    label: "Total Payment",
                    value: `₹${formatNum(result.totalPayment)}`,
                    color: "#34d399",
                    highlight: false
                  }
                ].map(({ label, value, color, highlight }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      background: "#0f172a",
                      border: `1px solid ${highlight ? ACCENT : "#1e293b"}`,
                      borderRadius: "0.875rem",
                      padding: "1.25rem",
                      textAlign: "center"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            color: "#64748b",
                            fontSize: "0.8125rem",
                            marginBottom: "0.4rem"
                          },
                          children: label
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            color,
                            fontSize: "1.35rem",
                            fontWeight: 800,
                            letterSpacing: "-0.01em"
                          },
                          children: value
                        }
                      )
                    ]
                  },
                  label
                ))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: h2Style, children: "What Is an EMI Calculator?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: bodyText, children: "An EMI (Equated Monthly Instalment) calculator helps you determine how much you need to pay each month to repay a loan within a chosen tenure at a given interest rate. Whether you are planning a home loan, a car loan, an education loan, or a personal loan, knowing your monthly EMI before you borrow is one of the most important steps in personal financial planning." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { ...bodyText, marginTop: "0.75rem" }, children: "The EMI amount depends on three factors: the loan principal (amount borrowed), the annual interest rate, and the repayment tenure in months. Our calculator uses the standard reducing balance formula to give you accurate EMI figures, along with the total interest you will pay over the life of the loan and the total amount you will repay." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { ...bodyText, marginTop: "0.75rem" }, children: "Knowing your EMI in advance helps you budget your monthly expenses, compare loan offers from multiple banks, decide the optimal tenure that balances affordability and total interest cost, and plan prepayments to reduce interest burden." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: h2Style, children: "How to Use the Loan EMI Calculator" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: { display: "flex", flexDirection: "column", gap: "1rem" },
                children: [
                  {
                    step: 1,
                    title: "Enter the Loan Amount",
                    body: "Type the principal — the total amount you want to borrow. For example, ₹5,00,000 for a personal loan or ₹30,00,000 for a home loan. Do not include commas."
                  },
                  {
                    step: 2,
                    title: "Enter the Annual Interest Rate",
                    body: "Type the annual interest rate your bank has quoted. For example, 8.5 for 8.5% per annum. Do not add the % symbol. The calculator will convert this to a monthly rate automatically."
                  },
                  {
                    step: 3,
                    title: "Enter the Tenure in Months",
                    body: "Enter the repayment period in months. For a 3-year loan, enter 36. For a 5-year loan, enter 60. For a 20-year home loan, enter 240."
                  },
                  {
                    step: 4,
                    title: "Click 'Calculate EMI'",
                    body: "Press the Calculate EMI button. You will instantly see three results: your monthly EMI, the total interest you will pay over the full tenure, and the total amount repaid."
                  },
                  {
                    step: 5,
                    title: "Compare Scenarios",
                    body: "Try different tenures or interest rates to see how they affect your EMI and total cost. Click Reset to clear all fields and start a new comparison."
                  }
                ].map(({ step, title, body }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      gap: "1rem",
                      alignItems: "flex-start"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
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
                            flexShrink: 0
                          },
                          children: step
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: h3Style, children: title }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: bodyText, children: body })
                      ] })
                    ]
                  },
                  step
                ))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: h2Style, children: "EMI Examples" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { overflowX: "auto" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "table",
              {
                style: {
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "0.875rem"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: [
                    "Loan Amount",
                    "Rate (p.a.)",
                    "Tenure",
                    "Monthly EMI",
                    "Total Interest"
                  ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "th",
                    {
                      style: {
                        background: "#0f172a",
                        color: "#94a3b8",
                        padding: "0.75rem 1rem",
                        textAlign: "left",
                        borderBottom: "1px solid #1e293b",
                        whiteSpace: "nowrap"
                      },
                      children: h
                    },
                    h
                  )) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: [
                    {
                      loan: "₹1,00,000",
                      rate: "10%",
                      tenure: "12 months",
                      emi: "₹8,792",
                      interest: "₹5,499"
                    },
                    {
                      loan: "₹3,00,000",
                      rate: "12%",
                      tenure: "36 months",
                      emi: "₹9,967",
                      interest: "₹58,812"
                    },
                    {
                      loan: "₹5,00,000",
                      rate: "9%",
                      tenure: "60 months",
                      emi: "₹10,377",
                      interest: "₹1,22,620"
                    },
                    {
                      loan: "₹10,00,000",
                      rate: "8.5%",
                      tenure: "120 months",
                      emi: "₹12,400",
                      interest: "₹4,88,000"
                    },
                    {
                      loan: "₹30,00,000",
                      rate: "7.5%",
                      tenure: "240 months",
                      emi: "₹24,151",
                      interest: "₹27,96,240"
                    }
                  ].map((row, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "tr",
                    {
                      style: {
                        background: idx % 2 === 0 ? "#0f172a" : "transparent"
                      },
                      children: [
                        row.loan,
                        row.rate,
                        row.tenure,
                        row.emi,
                        row.interest
                      ].map((cell, ci) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "td",
                        {
                          style: {
                            padding: "0.75rem 1rem",
                            color: ci === 3 ? ACCENT_LIGHT : "#94a3b8",
                            borderBottom: "1px solid #1e293b",
                            whiteSpace: "nowrap",
                            fontWeight: ci === 3 ? 700 : 400
                          },
                          children: cell
                        },
                        ci
                      ))
                    },
                    idx
                  )) })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                style: {
                  ...bodyText,
                  fontSize: "0.8rem",
                  marginTop: "0.75rem",
                  color: "#475569"
                },
                children: "* Values are approximate, calculated using the reducing balance formula."
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: h2Style, children: "Tips for Managing Loan EMIs" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "ul",
              {
                style: {
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.875rem"
                },
                children: [
                  {
                    tip: "Keep EMI below 40% of monthly income",
                    body: "Most financial advisors recommend that your total monthly EMI obligations should not exceed 40% of your take-home salary. This keeps your budget healthy and maintains a safety buffer."
                  },
                  {
                    tip: "Shorter tenure = less total interest",
                    body: "A ₹5L loan at 10% for 3 years costs ₹80,000 in interest; for 5 years it costs ₹1,37,000. Paying more EMI for fewer months saves significantly in the long run."
                  },
                  {
                    tip: "Compare the effective annual rate, not just headline rate",
                    body: "Banks may quote EMI-based flat rates. Always use a reducing balance EMI calculator (like this one) to find the true annual percentage rate before signing any loan agreement."
                  },
                  {
                    tip: "Part-prepayment reduces your principal faster",
                    body: "Making an extra payment toward the principal reduces the outstanding balance, which cuts your future interest. Most banks allow part-prepayment with minimal charges for floating-rate loans."
                  },
                  {
                    tip: "Factor in processing fees and insurance",
                    body: "Your actual loan cost includes processing fees (0.5–2%), GST on fees, and often mandatory loan insurance. Include these in your cost comparison between lenders."
                  }
                ].map(({ tip, body }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "li",
                  {
                    style: {
                      display: "flex",
                      gap: "0.75rem",
                      alignItems: "flex-start"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: {
                            color: ACCENT_LIGHT,
                            marginTop: "0.15rem",
                            flexShrink: 0
                          },
                          children: "✓"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { style: { color: "#e2e8f0", fontSize: "0.9375rem" }, children: [
                          tip,
                          ":",
                          " "
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#94a3b8", fontSize: "0.9375rem" }, children: body })
                      ] })
                    ]
                  },
                  tip
                ))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: h2Style, children: "Frequently Asked Questions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: { display: "flex", flexDirection: "column", gap: "1.25rem" },
                children: faqItems.map((faq, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    "data-ocid": `emicalc.item.${i + 1}`,
                    style: {
                      borderBottom: i < faqItems.length - 1 ? "1px solid #1e293b" : "none",
                      paddingBottom: i < faqItems.length - 1 ? "1.25rem" : 0
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "h3",
                        {
                          style: {
                            ...h3Style,
                            color: ACCENT_LIGHT,
                            marginBottom: "0.375rem"
                          },
                          children: [
                            "Q: ",
                            faq.q
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: bodyText, children: faq.a })
                    ]
                  },
                  i
                ))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: h2Style, children: "Related Calculators & Tools" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                  gap: "0.75rem",
                  marginBottom: "1.5rem"
                },
                children: [
                  {
                    label: "Percentage Calculator",
                    page: "percentage-calculator",
                    emoji: "%",
                    desc: "Find X% of any number"
                  },
                  {
                    label: "Discount Calculator",
                    page: "discount-calculator",
                    emoji: "🏷️",
                    desc: "Calculate savings & final price"
                  },
                  {
                    label: "Compound Interest",
                    page: "calc-compound-interest",
                    emoji: "📈",
                    desc: "Compound growth calculator"
                  },
                  {
                    label: "Calculator Hub",
                    page: "calculators",
                    emoji: "🧮",
                    desc: "All calculators in one place"
                  }
                ].map((tool) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "emicalc.link",
                    onClick: () => onNavigate(tool.page),
                    style: {
                      background: "#0f172a",
                      border: "1px solid #1e293b",
                      borderRadius: "0.75rem",
                      padding: "1rem",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.15s"
                    },
                    onMouseEnter: (e) => {
                      e.currentTarget.style.borderColor = ACCENT;
                      e.currentTarget.style.background = "#1e293b";
                    },
                    onMouseLeave: (e) => {
                      e.currentTarget.style.borderColor = "#1e293b";
                      e.currentTarget.style.background = "#0f172a";
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "1.5rem", marginBottom: "0.375rem" }, children: tool.emoji }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            color: "#ffffff",
                            fontSize: "0.875rem",
                            fontWeight: 600
                          },
                          children: tool.label
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            color: "#64748b",
                            fontSize: "0.75rem",
                            marginTop: "0.25rem"
                          },
                          children: tool.desc
                        }
                      )
                    ]
                  },
                  tool.page
                ))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "1rem", flexWrap: "wrap" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "emicalc.primary_button",
                  onClick: () => onNavigate("calculators"),
                  style: {
                    background: ACCENT,
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "0.625rem",
                    padding: "0.875rem 1.75rem",
                    fontSize: "1rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "background 0.15s"
                  },
                  onMouseEnter: (e) => {
                    e.currentTarget.style.background = "#4f46e5";
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.background = ACCENT;
                  },
                  children: "Open Calculator Hub →"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "emicalc.secondary_button",
                  onClick: () => onNavigate("percentage-calculator"),
                  style: {
                    background: "transparent",
                    color: ACCENT_LIGHT,
                    border: `1px solid ${ACCENT_LIGHT}`,
                    borderRadius: "0.625rem",
                    padding: "0.875rem 1.75rem",
                    fontSize: "1rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.15s"
                  },
                  onMouseEnter: (e) => {
                    e.currentTarget.style.background = "rgba(129,140,248,0.08)";
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.background = "transparent";
                  },
                  children: "Percentage Calculator →"
                }
              )
            ] })
          ] })
        ] })
      ]
    }
  );
}
export {
  LoanEMICalculatorPage as default
};
