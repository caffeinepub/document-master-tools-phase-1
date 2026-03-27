import { r as reactExports, j as jsxRuntimeExports, w as trackCalculatorUsed } from "./index-5lKdoCW0.js";
import { S as SEO } from "./SEO-CrxvtZlJ.js";
const ACCENT = "#10b981";
const ACCENT_LIGHT = "#34d399";
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
const GST_RATES = [5, 12, 18, 28];
const faqItems = [
  {
    q: "What is GST and how is it calculated?",
    a: "GST (Goods and Services Tax) is a value-added tax levied on the supply of goods and services in India. It replaced multiple indirect taxes like VAT, Service Tax, and Excise Duty. To calculate GST: GST Amount = (Original Price × GST Rate) ÷ 100. Final Price = Original Price + GST Amount."
  },
  {
    q: "What are the GST slabs in India?",
    a: "India has four main GST slabs: 5% (essential goods like food grains, medicines), 12% (processed foods, computers, phones), 18% (most services including restaurants, IT services, branded clothes), and 28% (luxury goods, automobiles, tobacco, cement). Some items like fresh fruits, vegetables, and education are exempt (0% GST)."
  },
  {
    q: "How do I remove GST from a GST-inclusive price?",
    a: "To remove GST from an inclusive price (reverse calculation): Base Price = Inclusive Price ÷ (1 + GST Rate/100). For example, if a product costs ₹1,180 inclusive of 18% GST: Base Price = 1180 ÷ 1.18 = ₹1,000. GST Amount = ₹1,180 − ₹1,000 = ₹180. Use the 'Remove GST' mode in our calculator."
  },
  {
    q: "What is CGST and SGST?",
    a: "Under India's GST system, intra-state transactions are split into CGST (Central GST) and SGST (State GST), each at half the rate. For an 18% GST transaction within a state, 9% is CGST and 9% is SGST. For inter-state transactions, IGST (Integrated GST) applies at the full rate."
  },
  {
    q: "Is GST charged on the MRP or the selling price?",
    a: "GST is charged on the transaction value (the actual selling price), not the MRP. If you sell below MRP, GST applies on the actual selling price. MRP for packaged consumer goods already includes GST, so the label should mention that GST is included."
  },
  {
    q: "Is this GST calculator free?",
    a: "Yes, completely free. No signup, no download, no data transmission to any server. The tool runs entirely in your browser and supports all four GST slabs (5%, 12%, 18%, 28%) plus a custom rate field."
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
      name: "GST Calculator",
      item: "https://docmastertools.com/gst-calculator"
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
function formatINR(n) {
  return n.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  });
}
function GSTCalculatorSEOPage({ onNavigate, onBack }) {
  const [mode, setMode] = reactExports.useState("add");
  const [amount, setAmount] = reactExports.useState("");
  const [gstRate, setGstRate] = reactExports.useState(18);
  const [customRate, setCustomRate] = reactExports.useState("");
  const [useCustom, setUseCustom] = reactExports.useState(false);
  const [result, setResult] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    document.title = "GST Calculator – Calculate GST Online Free | DocMasterTools";
  }, []);
  const effectiveRate = useCustom ? Number.parseFloat(customRate) : gstRate;
  const calculate = () => {
    const amt = Number.parseFloat(amount);
    const rate = effectiveRate;
    if (Number.isNaN(amt) || amt <= 0) {
      setError("Please enter a valid positive amount.");
      setResult(null);
      return;
    }
    if (Number.isNaN(rate) || rate < 0 || rate > 100) {
      setError("Please enter a valid GST rate between 0 and 100.");
      setResult(null);
      return;
    }
    let baseAmount;
    let gstAmount;
    let totalAmount;
    if (mode === "add") {
      baseAmount = amt;
      gstAmount = amt * rate / 100;
      totalAmount = amt + gstAmount;
    } else {
      totalAmount = amt;
      baseAmount = amt / (1 + rate / 100);
      gstAmount = amt - baseAmount;
    }
    const halfGst = gstAmount / 2;
    setError(null);
    setResult({
      baseAmount,
      gstAmount,
      totalAmount,
      cgst: halfGst,
      sgst: halfGst,
      igst: gstAmount
    });
    trackCalculatorUsed("gst_calculator");
  };
  const reset = () => {
    setAmount("");
    setGstRate(18);
    setCustomRate("");
    setUseCustom(false);
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
            title: "GST Calculator – Calculate GST Online Free | DocMasterTools",
            description: "Calculate GST instantly: add GST to a base price or remove GST from an inclusive price. Supports 5%, 12%, 18%, 28% slabs. Free, no signup required.",
            canonicalUrl: "https://docmastertools.com/gst-calculator"
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "meta",
          {
            property: "og:title",
            content: "GST Calculator – Calculate GST Online Free | DocMasterTools"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "meta",
          {
            property: "og:description",
            content: "Add or remove GST from any amount. Supports all Indian GST slabs (5%, 12%, 18%, 28%). Free, instant, no signup."
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "meta",
          {
            property: "og:url",
            content: "https://docmastertools.com/gst-calculator"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:type", content: "website" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { maxWidth: "900px", margin: "0 auto" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "gstcalc.secondary_button",
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
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: ACCENT_LIGHT }, children: "GST Calculator" })
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
              children: "GST Calculator – Calculate GST Online Free"
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
              children: "Add GST to a base price or remove GST from an inclusive price instantly. Supports all four Indian GST slabs — 5%, 12%, 18%, and 28% — plus a custom rate field. Results show the base price, GST amount, total amount, and CGST/SGST breakdown. Completely free, no signup required."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { ...h2Style, color: ACCENT_LIGHT }, children: "GST Calculator" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  display: "flex",
                  gap: "0.5rem",
                  marginBottom: "1.25rem",
                  background: "#0f172a",
                  borderRadius: "0.625rem",
                  padding: "0.25rem",
                  width: "fit-content"
                },
                children: ["add", "remove"].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "gstcalc.toggle",
                    onClick: () => {
                      setMode(m);
                      setResult(null);
                      setError(null);
                    },
                    style: {
                      background: mode === m ? ACCENT : "transparent",
                      color: mode === m ? "#ffffff" : "#64748b",
                      border: "none",
                      borderRadius: "0.5rem",
                      padding: "0.5rem 1.25rem",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.15s"
                    },
                    children: m === "add" ? "Add GST" : "Remove GST"
                  },
                  m
                ))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                style: {
                  ...bodyText,
                  fontSize: "0.875rem",
                  marginBottom: "1rem",
                  color: "#64748b"
                },
                children: mode === "add" ? "Enter the base price (excluding GST) and select the GST rate." : "Enter the GST-inclusive price and select the GST rate to find the base price."
              }
            ),
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
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: labelStyle, htmlFor: "gstAmount", children: mode === "add" ? "Base Amount (₹, excl. GST)" : "Inclusive Amount (₹, incl. GST)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "gstAmount",
                        "data-ocid": "gstcalc.input",
                        type: "number",
                        placeholder: "e.g. 1000",
                        value: amount,
                        onChange: (e) => setAmount(e.target.value),
                        style: inputStyle
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: labelStyle, children: "GST Rate (%)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        style: {
                          display: "flex",
                          gap: "0.4rem",
                          flexWrap: "wrap",
                          marginBottom: "0.4rem"
                        },
                        children: [
                          GST_RATES.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "button",
                            {
                              type: "button",
                              "data-ocid": "gstcalc.toggle",
                              onClick: () => {
                                setGstRate(r);
                                setUseCustom(false);
                              },
                              style: {
                                background: !useCustom && gstRate === r ? ACCENT : "#0f172a",
                                color: !useCustom && gstRate === r ? "#ffffff" : "#94a3b8",
                                border: `1px solid ${!useCustom && gstRate === r ? ACCENT : "#334155"}`,
                                borderRadius: "0.4rem",
                                padding: "0.35rem 0.75rem",
                                fontSize: "0.875rem",
                                fontWeight: 600,
                                cursor: "pointer",
                                transition: "all 0.15s"
                              },
                              children: [
                                r,
                                "%"
                              ]
                            },
                            r
                          )),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              "data-ocid": "gstcalc.toggle",
                              onClick: () => setUseCustom(true),
                              style: {
                                background: useCustom ? ACCENT : "#0f172a",
                                color: useCustom ? "#ffffff" : "#94a3b8",
                                border: `1px solid ${useCustom ? ACCENT : "#334155"}`,
                                borderRadius: "0.4rem",
                                padding: "0.35rem 0.75rem",
                                fontSize: "0.875rem",
                                fontWeight: 600,
                                cursor: "pointer",
                                transition: "all 0.15s"
                              },
                              children: "Custom"
                            }
                          )
                        ]
                      }
                    ),
                    useCustom && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        "data-ocid": "gstcalc.input",
                        type: "number",
                        placeholder: "Enter rate e.g. 3",
                        value: customRate,
                        onChange: (e) => setCustomRate(e.target.value),
                        style: inputStyle
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
                      "data-ocid": "gstcalc.primary_button",
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
                        e.currentTarget.style.background = "#059669";
                      },
                      onMouseLeave: (e) => {
                        e.currentTarget.style.background = ACCENT;
                      },
                      children: "Calculate GST"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "data-ocid": "gstcalc.delete_button",
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
                "data-ocid": "gstcalc.error_state",
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
            result && !error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": "gstcalc.success_state",
                style: { marginTop: "1.25rem" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                        gap: "0.875rem",
                        marginBottom: "1rem"
                      },
                      children: [
                        {
                          label: "Base Price (excl. GST)",
                          value: `₹${formatINR(result.baseAmount)}`,
                          color: "#e2e8f0",
                          highlight: false
                        },
                        {
                          label: `GST Amount (${effectiveRate}%)`,
                          value: `₹${formatINR(result.gstAmount)}`,
                          color: "#fbbf24",
                          highlight: false
                        },
                        {
                          label: "Total (incl. GST)",
                          value: `₹${formatINR(result.totalAmount)}`,
                          color: ACCENT_LIGHT,
                          highlight: true
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
                                  fontSize: "0.8rem",
                                  marginBottom: "0.4rem"
                                },
                                children: label
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color, fontSize: "1.3rem", fontWeight: 800 }, children: value })
                          ]
                        },
                        label
                      ))
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: {
                        background: "#0f172a",
                        border: "1px solid #1e293b",
                        borderRadius: "0.875rem",
                        padding: "1rem 1.25rem"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            style: {
                              color: "#64748b",
                              fontSize: "0.8rem",
                              marginBottom: "0.75rem",
                              fontWeight: 600,
                              textTransform: "uppercase",
                              letterSpacing: "0.05em"
                            },
                            children: "Tax Breakdown (Intra-State)"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: "2rem", flexWrap: "wrap" }, children: [
                          {
                            label: `CGST (${effectiveRate / 2}%)`,
                            value: `₹${formatINR(result.cgst)}`
                          },
                          {
                            label: `SGST (${effectiveRate / 2}%)`,
                            value: `₹${formatINR(result.sgst)}`
                          },
                          {
                            label: `IGST (${effectiveRate}%) — inter-state`,
                            value: `₹${formatINR(result.igst)}`
                          }
                        ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#64748b", fontSize: "0.75rem" }, children: label }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              style: {
                                color: "#cbd5e1",
                                fontSize: "1rem",
                                fontWeight: 700
                              },
                              children: value
                            }
                          )
                        ] }, label)) })
                      ]
                    }
                  )
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: h2Style, children: "What Is a GST Calculator?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: bodyText, children: "A GST calculator is a tool that helps businesses, freelancers, and consumers quickly compute the Goods and Services Tax on any transaction amount. India's GST system, introduced in July 2017, replaced a complex web of central and state taxes with a unified multi-rate structure. However, calculating GST still requires knowing the applicable slab and whether you are working from a base price (adding GST) or a tax-inclusive price (removing GST)." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { ...bodyText, marginTop: "0.75rem" }, children: "There are two common GST calculation scenarios. The first is adding GST to a base price — for example, a business invoicing a client for services needs to add 18% GST to the net amount to arrive at the total payable. The second is reversing GST from an inclusive price — for example, a consumer who sees an MRP of ₹1,180 wants to know the base price and the exact tax component. Our calculator handles both scenarios with a single mode toggle." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { ...bodyText, marginTop: "0.75rem" }, children: "The tool also shows the CGST and SGST split for intra-state transactions, and the equivalent IGST figure for inter-state transactions. This breakdown is exactly what you need when raising a GST invoice or filing returns. All calculations are instant and happen locally in your browser." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: h2Style, children: "How to Use the GST Calculator" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: { display: "flex", flexDirection: "column", gap: "1rem" },
                children: [
                  {
                    step: 1,
                    title: "Choose Add GST or Remove GST",
                    body: "Use the toggle at the top of the calculator. Select 'Add GST' if you have a base price (excluding tax) and want the final inclusive price. Select 'Remove GST' if you have a GST-inclusive price and want to extract the base amount and tax component."
                  },
                  {
                    step: 2,
                    title: "Enter the Amount",
                    body: "Type the price in the amount field. For 'Add GST' mode, this is the pre-tax price. For 'Remove GST' mode, this is the total amount already including GST. Do not include currency symbols or commas."
                  },
                  {
                    step: 3,
                    title: "Select the GST Rate",
                    body: "Click one of the four slab buttons: 5%, 12%, 18%, or 28%. If your product or service falls under a different rate (like 3% for gold jewellery or 0.25% for cut diamonds), click 'Custom' and enter your rate."
                  },
                  {
                    step: 4,
                    title: "Click Calculate GST",
                    body: "Press the green button. The results panel shows three values: base price (excluding GST), GST amount, and total amount (including GST). Below that, the tax breakdown shows CGST + SGST for intra-state transactions and IGST for inter-state."
                  },
                  {
                    step: 5,
                    title: "Use Results for Invoicing",
                    body: "Copy the figures directly onto your GST invoice. The base amount goes in the taxable value column, CGST and SGST (or IGST) fill the tax columns, and the total amount is the invoice total."
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: h2Style, children: "GST Calculation Examples" }),
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
                    "Item / Service",
                    "Base Price",
                    "GST Rate",
                    "GST Amount",
                    "Total (Incl. GST)"
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
                      item: "Software service",
                      base: "₹10,000",
                      rate: "18%",
                      gst: "₹1,800",
                      total: "₹11,800"
                    },
                    {
                      item: "Restaurant (AC)",
                      base: "₹500",
                      rate: "5%",
                      gst: "₹25",
                      total: "₹525"
                    },
                    {
                      item: "Mobile phone",
                      base: "₹15,000",
                      rate: "12%",
                      gst: "₹1,800",
                      total: "₹16,800"
                    },
                    {
                      item: "Car (mid-segment)",
                      base: "₹8,00,000",
                      rate: "28%",
                      gst: "₹2,24,000",
                      total: "₹10,24,000"
                    },
                    {
                      item: "Branded clothing",
                      base: "₹2,500",
                      rate: "12%",
                      gst: "₹300",
                      total: "₹2,800"
                    },
                    {
                      item: "Consulting fee",
                      base: "₹50,000",
                      rate: "18%",
                      gst: "₹9,000",
                      total: "₹59,000"
                    }
                  ].map((row, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "tr",
                    {
                      style: {
                        background: idx % 2 === 0 ? "#0f172a" : "transparent"
                      },
                      children: [row.item, row.base, row.rate, row.gst, row.total].map(
                        (cell, ci) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "td",
                          {
                            style: {
                              padding: "0.75rem 1rem",
                              color: ci === 4 ? ACCENT_LIGHT : "#94a3b8",
                              borderBottom: "1px solid #1e293b",
                              whiteSpace: "nowrap",
                              fontWeight: ci === 4 ? 700 : 400
                            },
                            children: cell
                          },
                          ci
                        )
                      )
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
                children: "* Illustrative examples. Always verify the applicable GST rate for your product or service category with a GST professional."
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: h2Style, children: "GST Rate Slabs at a Glance" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                  gap: "1rem"
                },
                children: [
                  {
                    rate: "5%",
                    color: "#22d3ee",
                    items: "Essential commodities: edible oils, sugar, tea, coffee, packed food items, medicines, economy hotels, transport services"
                  },
                  {
                    rate: "12%",
                    color: "#a3e635",
                    items: "Computers, mobile phones, processed foods, branded clothes, business class air travel, non-AC restaurants"
                  },
                  {
                    rate: "18%",
                    color: ACCENT_LIGHT,
                    items: "Most services (IT, telecom, financial), AC restaurants, capital goods, industrial goods, 3-star hotels"
                  },
                  {
                    rate: "28%",
                    color: "#fb923c",
                    items: "Luxury and sin goods: automobiles, tobacco, cement, luxury hotels, casinos, aerated drinks"
                  }
                ].map(({ rate, color, items }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      background: "#0f172a",
                      border: "1px solid #1e293b",
                      borderRadius: "0.875rem",
                      padding: "1.25rem"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          style: {
                            color,
                            fontSize: "1.5rem",
                            fontWeight: 800,
                            marginBottom: "0.5rem"
                          },
                          children: [
                            rate,
                            " GST"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { ...bodyText, fontSize: "0.8375rem" }, children: items })
                    ]
                  },
                  rate
                ))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: h2Style, children: "Tips for GST Calculations" }),
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
                    tip: "Use 'Remove GST' for MRP-labelled products",
                    body: "MRP on packaged consumer goods already includes GST. To find the base price and tax amount from the MRP, switch to 'Remove GST' mode. This is useful for retailers reconciling purchases."
                  },
                  {
                    tip: "For intra-state transactions, split GST into CGST + SGST",
                    body: "When raising an invoice for a customer in the same state, the GST is split equally: half is CGST (goes to Centre) and half is SGST (goes to State). For example, 18% GST = 9% CGST + 9% SGST."
                  },
                  {
                    tip: "For inter-state transactions, charge IGST",
                    body: "When selling to a customer in a different state, charge IGST (the full rate), not CGST + SGST. The tool shows the IGST figure for this case."
                  },
                  {
                    tip: "Always verify the HSN/SAC code for your product or service",
                    body: "GST rates are tied to specific HSN (goods) or SAC (services) codes. Charging the wrong rate can lead to penalties during GST audit. Confirm your rate using the official GST rate finder at gst.gov.in."
                  },
                  {
                    tip: "Reverse charge mechanism (RCM) changes who pays GST",
                    body: "Under RCM, the recipient of the goods or service pays GST instead of the supplier. This applies in specific cases (e.g., services from unregistered vendors, GTA services). Our calculator shows the tax amount; RCM registration status determines who remits it."
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
                    "data-ocid": `gstcalc.item.${i + 1}`,
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
                    label: "Loan EMI Calculator",
                    page: "loan-emi-calculator",
                    emoji: "🏦",
                    desc: "Monthly loan repayment"
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
                    "data-ocid": "gstcalc.link",
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
                  "data-ocid": "gstcalc.primary_button",
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
                    e.currentTarget.style.background = "#059669";
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
                  "data-ocid": "gstcalc.secondary_button",
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
                    e.currentTarget.style.background = "rgba(52,211,153,0.08)";
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
  GSTCalculatorSEOPage as default
};
