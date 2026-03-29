import { r as reactExports, j as jsxRuntimeExports, w as trackCalculatorUsed } from "./index-BK1nStnW.js";
import { S as SEO } from "./SEO-C_L06y5W.js";
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
const faqItems = [
  {
    q: "How do you calculate the discounted price?",
    a: "Discounted Price = Original Price × (1 − Discount% ÷ 100). For example, a 30% discount on ₹500: 500 × (1 − 0.30) = ₹350. The tool above performs this calculation instantly."
  },
  {
    q: "How do you find the discount percentage from two prices?",
    a: "Discount% = ((Original Price − Sale Price) ÷ Original Price) × 100. For example, if an item was ₹800 and is now ₹600: ((800 − 600) ÷ 800) × 100 = 25%."
  },
  {
    q: "How do I calculate savings amount?",
    a: "Savings Amount = Original Price × Discount% ÷ 100. If the original price is ₹1,200 and the discount is 15%: 1200 × 0.15 = ₹180 saved."
  },
  {
    q: "What is double discount or successive discount?",
    a: "A double discount is not simply additive. A 20% discount followed by a 10% discount is NOT equal to 30%. The effective rate is: 1 − (1−0.20)(1−0.10) = 1 − 0.72 = 28%. Always apply discounts sequentially."
  },
  {
    q: "How do I find the original price before a discount?",
    a: "Original Price = Sale Price ÷ (1 − Discount% ÷ 100). If a product costs ₹700 after a 30% discount: 700 ÷ 0.70 = ₹1,000. Use the reverse discount mode in the calculator above."
  },
  {
    q: "Is this discount calculator free to use?",
    a: "Yes. Completely free, no login required, and all calculations run locally in your browser. No data is sent to any server."
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
      name: "Discount Calculator",
      item: "https://docmastertools.com/discount-calculator"
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
function DiscountCalculatorSEOPage({
  onNavigate,
  onBack
}) {
  const [origPrice, setOrigPrice] = reactExports.useState("");
  const [discPct, setDiscPct] = reactExports.useState("");
  const [res1, setRes1] = reactExports.useState(
    null
  );
  const [origPrice2, setOrigPrice2] = reactExports.useState("");
  const [salePrice2, setSalePrice2] = reactExports.useState("");
  const [res2, setRes2] = reactExports.useState(null);
  reactExports.useEffect(() => {
    document.title = "Discount Calculator – Free Online Tool | DocMasterTools";
  }, []);
  const calc1 = () => {
    const op = Number.parseFloat(origPrice);
    const dp = Number.parseFloat(discPct);
    if (Number.isNaN(op) || Number.isNaN(dp) || op < 0 || dp < 0 || dp > 100) {
      setRes1({
        final: "Please enter valid values (0–100% discount).",
        savings: ""
      });
      return;
    }
    const savings = op * dp / 100;
    const final = op - savings;
    setRes1({
      final: final.toFixed(2),
      savings: savings.toFixed(2)
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
    const pct = (op - sp) / op * 100;
    setRes2(`Discount: ${pct.toFixed(2)}% (you save ${(op - sp).toFixed(2)})`);
    trackCalculatorUsed("discount_calculator");
  };
  const btnStyle = {
    background: ACCENT,
    color: "#ffffff",
    border: "none",
    borderRadius: "0.5rem",
    padding: "0.65rem 1.5rem",
    fontSize: "0.9375rem",
    fontWeight: 700,
    cursor: "pointer",
    marginTop: "0.75rem",
    transition: "background 0.15s"
  };
  const resetBtnStyle = {
    background: "transparent",
    color: "#64748b",
    border: "1px solid #334155",
    borderRadius: "0.5rem",
    padding: "0.65rem 1.25rem",
    fontSize: "0.875rem",
    cursor: "pointer",
    marginTop: "0.75rem",
    marginLeft: "0.75rem",
    transition: "all 0.15s"
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
            title: "Discount Calculator – Free Online Tool | DocMasterTools",
            description: "Calculate discounted price, savings amount, and discount percentage instantly. Free online discount calculator — no signup, no download, works in your browser.",
            canonicalUrl: "https://docmastertools.com/discount-calculator"
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
              "data-ocid": "disccalc.secondary_button",
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
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: ACCENT_LIGHT }, children: "Discount Calculator" })
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
              children: "Discount Calculator – Free Online Tool"
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
              children: "Calculate the final price after a discount, total savings, and the discount percentage between two prices — all instantly in your browser. No signup, no ads, completely private."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { ...h2Style, color: ACCENT_LIGHT }, children: "Discount Calculator" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "1.75rem" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: h3Style, children: "1. Find Final Price & Savings" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                    marginTop: "0.75rem"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: labelStyle, htmlFor: "origPrice", children: "Original Price" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "origPrice",
                          "data-ocid": "disccalc.input",
                          type: "number",
                          placeholder: "e.g. 1200",
                          value: origPrice,
                          onChange: (e) => setOrigPrice(e.target.value),
                          style: inputStyle
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: labelStyle, htmlFor: "discPct", children: "Discount (%)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "discPct",
                          "data-ocid": "disccalc.input",
                          type: "number",
                          placeholder: "e.g. 25",
                          value: discPct,
                          onChange: (e) => setDiscPct(e.target.value),
                          style: inputStyle
                        }
                      )
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "disccalc.primary_button",
                    onClick: calc1,
                    style: btnStyle,
                    onMouseEnter: (e) => {
                      e.currentTarget.style.background = "#059669";
                    },
                    onMouseLeave: (e) => {
                      e.currentTarget.style.background = ACCENT;
                    },
                    children: "Calculate"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "disccalc.delete_button",
                    onClick: () => {
                      setOrigPrice("");
                      setDiscPct("");
                      setRes1(null);
                    },
                    style: resetBtnStyle,
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
              ] }),
              res1 && res1.savings !== "" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "0.75rem",
                    marginTop: "1rem"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        style: {
                          background: "#0f172a",
                          border: `1px solid ${ACCENT}`,
                          borderRadius: "0.75rem",
                          padding: "1rem",
                          textAlign: "center"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              style: {
                                color: "#64748b",
                                fontSize: "0.75rem",
                                marginBottom: "0.35rem"
                              },
                              children: "Final Price"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              style: {
                                color: ACCENT_LIGHT,
                                fontSize: "1.4rem",
                                fontWeight: 800
                              },
                              children: res1.final
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        style: {
                          background: "#0f172a",
                          border: "1px solid #1e293b",
                          borderRadius: "0.75rem",
                          padding: "1rem",
                          textAlign: "center"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              style: {
                                color: "#64748b",
                                fontSize: "0.75rem",
                                marginBottom: "0.35rem"
                              },
                              children: "You Save"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              style: {
                                color: "#fbbf24",
                                fontSize: "1.4rem",
                                fontWeight: 800
                              },
                              children: res1.savings
                            }
                          )
                        ]
                      }
                    )
                  ]
                }
              ),
              res1 && res1.savings === "" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    background: "#0f172a",
                    border: "1px solid #334155",
                    borderRadius: "0.75rem",
                    padding: "1rem",
                    marginTop: "1rem",
                    color: "#f87171"
                  },
                  children: res1.final
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { borderTop: "1px solid #1e293b", paddingTop: "1.5rem" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: h3Style, children: "2. Find Discount Percentage from Two Prices" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                    marginTop: "0.75rem"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: labelStyle, htmlFor: "origPrice2", children: "Original Price" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "origPrice2",
                          "data-ocid": "disccalc.input",
                          type: "number",
                          placeholder: "e.g. 800",
                          value: origPrice2,
                          onChange: (e) => setOrigPrice2(e.target.value),
                          style: inputStyle
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: labelStyle, htmlFor: "salePrice2", children: "Sale Price" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "salePrice2",
                          "data-ocid": "disccalc.input",
                          type: "number",
                          placeholder: "e.g. 600",
                          value: salePrice2,
                          onChange: (e) => setSalePrice2(e.target.value),
                          style: inputStyle
                        }
                      )
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "disccalc.primary_button",
                    onClick: calc2,
                    style: btnStyle,
                    onMouseEnter: (e) => {
                      e.currentTarget.style.background = "#059669";
                    },
                    onMouseLeave: (e) => {
                      e.currentTarget.style.background = ACCENT;
                    },
                    children: "Calculate"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "disccalc.delete_button",
                    onClick: () => {
                      setOrigPrice2("");
                      setSalePrice2("");
                      setRes2(null);
                    },
                    style: resetBtnStyle,
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
              ] }),
              res2 !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    background: "#0f172a",
                    border: `1px solid ${ACCENT}`,
                    borderRadius: "0.75rem",
                    padding: "1rem 1.25rem",
                    marginTop: "1rem",
                    color: ACCENT_LIGHT,
                    fontSize: "1.15rem",
                    fontWeight: 700
                  },
                  children: res2
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: h2Style, children: "What Is a Discount Calculator?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: bodyText, children: "A discount calculator is a tool that helps you instantly determine how much you will pay after a percentage discount is applied, how much you will save, and what percentage off a product represents. It is one of the most searched financial tools on the internet, used daily by millions of shoppers, business owners, and students." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { ...bodyText, marginTop: "0.75rem" }, children: "Discounts are everywhere — seasonal sales, coupon codes, bulk pricing, clearance events, GST-inclusive offers. Knowing exactly how much you save, and what percentage off a deal represents, helps you make better purchasing decisions." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { ...bodyText, marginTop: "0.75rem" }, children: "Our free online discount calculator solves both directions: enter the original price and discount percentage to get the final price and savings amount, or enter the original and sale price to find out what percentage discount was applied. All results are instant and accurate to two decimal places." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: h2Style, children: "How to Use the Discount Calculator" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: { display: "flex", flexDirection: "column", gap: "1rem" },
                children: [
                  {
                    step: 1,
                    title: "Select a Calculation Mode",
                    body: "Mode 1 calculates the final price and savings from original price plus discount percentage. Mode 2 finds the discount percentage when you know the original and sale prices."
                  },
                  {
                    step: 2,
                    title: "Enter the Values",
                    body: "Type the original price in the first field. For Mode 1, enter the discount percentage (e.g. 20 for 20%). For Mode 2, enter the actual sale price instead."
                  },
                  {
                    step: 3,
                    title: "Click Calculate",
                    body: "Press Calculate. In Mode 1 you'll see the final price and savings amount in two separate result boxes. In Mode 2 you'll see the exact discount percentage."
                  },
                  {
                    step: 4,
                    title: "Reset and Try Another",
                    body: "Use the Reset button to clear the fields for a new calculation. Each mode resets independently — you can compare prices without losing your previous result."
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: h2Style, children: "Discount Examples" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: "1rem"
                },
                children: [
                  { q: "₹1,500 with 20% off", a: "Final: ₹1,200 | Saved: ₹300" },
                  {
                    q: "₹3,000 with 33.33% off",
                    a: "Final: ₹2,000 | Saved: ₹1,000"
                  },
                  { q: "Original ₹800 → Sale ₹600", a: "Discount: 25%" },
                  { q: "₹499 with 10% off", a: "Final: ₹449.10 | Saved: ₹49.90" },
                  { q: "Original ₹2,500 → Sale ₹1,750", a: "Discount: 30%" },
                  {
                    q: "₹12,000 with 15% off",
                    a: "Final: ₹10,200 | Saved: ₹1,800"
                  }
                ].map((ex) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      background: "#0f172a",
                      border: "1px solid #1e293b",
                      borderRadius: "0.625rem",
                      padding: "0.875rem 1rem"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          style: {
                            color: "#cbd5e1",
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            marginBottom: "0.35rem"
                          },
                          children: ex.q
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          style: {
                            color: ACCENT_LIGHT,
                            fontSize: "0.9375rem",
                            fontWeight: 700,
                            margin: 0
                          },
                          children: ex.a
                        }
                      )
                    ]
                  },
                  ex.q
                ))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: h2Style, children: "Smart Shopping Tips" }),
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
                    tip: "Compare effective prices, not percentages",
                    body: "A 50% discount on ₹2,000 (saves ₹1,000) is better than 70% on ₹1,200 (saves ₹840). Always check the actual savings amount."
                  },
                  {
                    tip: "Beware of inflated original prices",
                    body: "Retailers sometimes raise the listed price before applying a discount. Use the reverse mode to verify: enter the 'was' price and 'now' price to see the real percentage."
                  },
                  {
                    tip: "Stack coupons on already-discounted items",
                    body: "Apply coupon discount sequentially. A 20% off coupon on a ₹1,000 item already at 10% off: 1000 × 0.90 × 0.80 = ₹720 (28% effective discount)."
                  },
                  {
                    tip: "Use the tool for GST-inclusive pricing",
                    body: "To find the pre-GST price of a ₹1,180 item with 18% GST: 1180 ÷ 1.18 = ₹1,000. Use Mode 2 (₹1,180 original, ₹1,000 sale) to confirm the 15.25% effective rate."
                  },
                  {
                    tip: "Check price per unit for bulk deals",
                    body: "When comparing a single item at ₹500 vs 3 for ₹1,200: divide to get ₹400 per item — a 20% saving per unit. Discount calculators help compare unit economics."
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
                    "data-ocid": `disccalc.item.${i + 1}`,
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
                    label: "Loan EMI Calculator",
                    page: "loan-emi-calculator",
                    emoji: "🏦",
                    desc: "Monthly loan repayment"
                  },
                  {
                    label: "GST Calculator",
                    page: "calc-gst",
                    emoji: "💹",
                    desc: "Add or remove GST"
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
                    "data-ocid": "disccalc.link",
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
                  "data-ocid": "disccalc.primary_button",
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
                  "data-ocid": "disccalc.secondary_button",
                  onClick: () => onNavigate("loan-emi-calculator"),
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
                  children: "Loan EMI Calculator →"
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
  DiscountCalculatorSEOPage as default
};
