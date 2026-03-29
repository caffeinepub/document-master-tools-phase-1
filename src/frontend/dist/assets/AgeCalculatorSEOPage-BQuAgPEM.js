import { r as reactExports, j as jsxRuntimeExports, w as trackCalculatorUsed } from "./index-BK1nStnW.js";
import { S as SEO } from "./SEO-C_L06y5W.js";
const ACCENT = "#06b6d4";
const ACCENT_LIGHT = "#22d3ee";
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
    q: "How is age calculated from date of birth?",
    a: "Age is calculated by subtracting your birth date from today's date. The years component counts how many full 12-month cycles have completed. The remaining months and days make up the fractional part. Our tool also shows your age in total weeks, total days, and hours."
  },
  {
    q: "What is the formula for calculating age?",
    a: "Age (years) = Current Year − Birth Year. If the current month/day hasn't yet passed this year, subtract 1 from the year count. For exact days: Age (days) = Today's date − Date of birth (using the Julian Day Number or similar method)."
  },
  {
    q: "Can I use this to calculate age for a government form?",
    a: "Yes. The tool shows your age as of today in years, months, and days — the format most government forms require. For forms that require age as on a specific date (like an exam cut-off date), enter that date in the 'Calculate age as on' field."
  },
  {
    q: "How do I find my age in total days?",
    a: "Select your date of birth in the calculator and click Calculate. The result section shows your exact age in total days. For example, someone born on 1 January 2000 would be approximately 9,500+ days old as of early 2026."
  },
  {
    q: "Is this age calculator accurate for leap years?",
    a: "Yes. The tool accounts for leap years (366-day years) when calculating total days and weeks. The year, month, and day breakdown also correctly handles February dates for people born on or near 29 February."
  },
  {
    q: "Is this tool free?",
    a: "Completely free. No signup, no download, no ads in the calculation flow. All processing happens in your browser — nothing is sent to any server."
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
      name: "Age Calculator Online",
      item: "https://docmastertools.com/age-calculator-online"
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
function calculateAge(dob, asOf) {
  let years = asOf.getFullYear() - dob.getFullYear();
  let months = asOf.getMonth() - dob.getMonth();
  let days = asOf.getDate() - dob.getDate();
  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(asOf.getFullYear(), asOf.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  const msPerDay = 1e3 * 60 * 60 * 24;
  const totalDays = Math.floor((asOf.getTime() - dob.getTime()) / msPerDay);
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;
  let nextBirthday = new Date(
    asOf.getFullYear(),
    dob.getMonth(),
    dob.getDate()
  );
  if (nextBirthday <= asOf) {
    nextBirthday = new Date(
      asOf.getFullYear() + 1,
      dob.getMonth(),
      dob.getDate()
    );
  }
  const nextBirthdayDays = Math.ceil(
    (nextBirthday.getTime() - asOf.getTime()) / msPerDay
  );
  return {
    years,
    months,
    days,
    totalDays,
    totalWeeks,
    totalMonths,
    nextBirthdayDays
  };
}
function AgeCalculatorSEOPage({ onNavigate, onBack }) {
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const [dob, setDob] = reactExports.useState("");
  const [asOf, setAsOf] = reactExports.useState(today);
  const [result, setResult] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    document.title = "Age Calculator Online – Calculate Exact Age | DocMasterTools";
  }, []);
  const calculate = () => {
    if (!dob) {
      setError("Please enter your date of birth.");
      setResult(null);
      return;
    }
    const dobDate = new Date(dob);
    const asOfDate = new Date(asOf || today);
    if (Number.isNaN(dobDate.getTime())) {
      setError("Invalid date of birth.");
      setResult(null);
      return;
    }
    if (dobDate >= asOfDate) {
      setError("Date of birth must be before the 'as on' date.");
      setResult(null);
      return;
    }
    setError(null);
    const r = calculateAge(dobDate, asOfDate);
    setResult(r);
    trackCalculatorUsed("age_calculator");
  };
  const reset = () => {
    setDob("");
    setAsOf(today);
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
            title: "Age Calculator Online – Calculate Exact Age | DocMasterTools",
            description: "Calculate your exact age in years, months, days, weeks, and total days from your date of birth. Free online age calculator — no signup required.",
            canonicalUrl: "https://docmastertools.com/age-calculator-online"
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
            content: "Age Calculator Online – Calculate Exact Age | DocMasterTools"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "meta",
          {
            property: "og:description",
            content: "Find your exact age in years, months, days, and weeks from your date of birth. Free, instant, privacy-first."
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "meta",
          {
            property: "og:url",
            content: "https://docmastertools.com/age-calculator-online"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:type", content: "website" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { maxWidth: "900px", margin: "0 auto" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "agecalc.secondary_button",
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
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: ACCENT_LIGHT }, children: "Age Calculator Online" })
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
              children: "Age Calculator Online – Calculate Exact Age from Date of Birth"
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
              children: "Find your exact age in years, months, days, total weeks, and total days. You can also calculate how many days remain until your next birthday. Enter your date of birth below — results appear instantly, no login needed."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { ...h2Style, color: ACCENT_LIGHT }, children: "Age Calculator" }),
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
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: labelStyle, htmlFor: "dob", children: "Date of Birth" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "dob",
                        "data-ocid": "agecalc.input",
                        type: "date",
                        value: dob,
                        max: today,
                        onChange: (e) => setDob(e.target.value),
                        style: inputStyle
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: labelStyle, htmlFor: "asOf", children: "Calculate Age As On (optional)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "asOf",
                        "data-ocid": "agecalc.input",
                        type: "date",
                        value: asOf,
                        onChange: (e) => setAsOf(e.target.value),
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
                        children: "Leave as today or enter a past/future cut-off date"
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
                      "data-ocid": "agecalc.primary_button",
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
                        e.currentTarget.style.background = "#0891b2";
                      },
                      onMouseLeave: (e) => {
                        e.currentTarget.style.background = ACCENT;
                      },
                      children: "Calculate Age"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "data-ocid": "agecalc.delete_button",
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
                "data-ocid": "agecalc.error_state",
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
                "data-ocid": "agecalc.success_state",
                style: { marginTop: "1.25rem" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: {
                        background: "#0f172a",
                        border: `1px solid ${ACCENT}`,
                        borderRadius: "0.875rem",
                        padding: "1.25rem 1.5rem",
                        marginBottom: "1rem",
                        textAlign: "center"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            style: {
                              color: "#64748b",
                              fontSize: "0.8125rem",
                              marginBottom: "0.5rem"
                            },
                            children: "Your Exact Age"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            style: {
                              color: ACCENT_LIGHT,
                              fontSize: "1.75rem",
                              fontWeight: 800,
                              letterSpacing: "-0.02em"
                            },
                            children: [
                              result.years,
                              " years, ",
                              result.months,
                              " months, ",
                              result.days,
                              " ",
                              "days"
                            ]
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                        gap: "0.75rem"
                      },
                      children: [
                        {
                          label: "Total Months",
                          value: result.totalMonths.toLocaleString()
                        },
                        {
                          label: "Total Weeks",
                          value: result.totalWeeks.toLocaleString()
                        },
                        {
                          label: "Total Days",
                          value: result.totalDays.toLocaleString()
                        },
                        {
                          label: "Days to Birthday",
                          value: result.nextBirthdayDays.toLocaleString()
                        }
                      ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
                                children: label
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                style: {
                                  color: "#e2e8f0",
                                  fontSize: "1.2rem",
                                  fontWeight: 700
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
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: h2Style, children: "What Is an Age Calculator?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: bodyText, children: "An age calculator is a tool that computes your exact age from your date of birth. Unlike simply subtracting birth year from current year, a proper age calculator accounts for whether your birthday has already occurred this calendar year, and correctly handles months with different numbers of days, as well as leap years. The result is precise to the year, month, and day." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { ...bodyText, marginTop: "0.75rem" }, children: "Age calculations come up in dozens of real-world situations: filling government forms, verifying eligibility for exams, calculating retirement age, processing insurance applications, tracking child development milestones, or simply satisfying curiosity. Manual calculation is error-prone, especially around birthdays in January or February where the year boundary makes subtraction confusing." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { ...bodyText, marginTop: "0.75rem" }, children: "Our free online age calculator goes beyond a simple year count. It shows your total age in months, weeks, and days — useful for medical contexts, immigration documents, and more. It also counts down the number of days until your next birthday. All calculations run instantly in your browser with no data sent to any server." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: h2Style, children: "How to Use the Age Calculator" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: { display: "flex", flexDirection: "column", gap: "1rem" },
                children: [
                  {
                    step: 1,
                    title: "Enter Your Date of Birth",
                    body: "Click on the 'Date of Birth' field and select your birth date from the calendar picker. You can also type it directly in YYYY-MM-DD format. The maximum selectable date is today."
                  },
                  {
                    step: 2,
                    title: "Set the 'As On' Date (Optional)",
                    body: "By default, the calculator computes your age as of today. If you need to know your age as on a specific exam cut-off date, job application deadline, or any past/future date, change the 'Calculate Age As On' field to that date."
                  },
                  {
                    step: 3,
                    title: "Click Calculate Age",
                    body: "Press the teal 'Calculate Age' button. Results appear immediately showing: your exact age in years/months/days, your age expressed as total months, total weeks, and total days, plus a countdown to your next birthday."
                  },
                  {
                    step: 4,
                    title: "Read Your Results",
                    body: "The main result box shows your precise age breakdown. The four stat cards below show total months, weeks, days, and days remaining until your next birthday. You can copy these values directly onto your forms."
                  },
                  {
                    step: 5,
                    title: "Reset for a New Calculation",
                    body: "Click Reset to clear all fields and start a new calculation. This is useful if you need to check age for multiple people or multiple cut-off dates."
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: h2Style, children: "Age Calculation Examples" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "1rem"
                },
                children: [
                  {
                    q: "Born 1 Jan 2000, today is 1 Mar 2026",
                    a: "26 years, 2 months, 0 days (9,557 total days)"
                  },
                  {
                    q: "Born 15 Aug 1990, today is 7 Mar 2026",
                    a: "35 years, 6 months, 20 days"
                  },
                  {
                    q: "Born 29 Feb 2000 (leap year), today is 1 Mar 2026",
                    a: "26 years, 0 months, 1 day"
                  },
                  {
                    q: "Born 10 Dec 2005, exam cut-off 1 Jan 2024",
                    a: "18 years, 0 months, 22 days"
                  },
                  {
                    q: "Born 5 May 2020, today is 7 Mar 2026",
                    a: "5 years, 10 months, 2 days"
                  },
                  {
                    q: "Born 1 Jan 1985, today is 7 Mar 2026",
                    a: "41 years, 2 months, 6 days"
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: h2Style, children: "Tips for Age Calculations" }),
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
                    tip: "Always check the cut-off date on forms",
                    body: "Government exams (UPSC, SSC, Banking, Railways) have a specific cut-off date for age eligibility. Use the 'As On' field to enter that exact date, not today's date."
                  },
                  {
                    tip: "Leap year birthdays (29 Feb) are handled correctly",
                    body: "If you were born on 29 February, the tool correctly calculates your age in non-leap years. Your 'birthday' is treated as 28 February in those years for the days-remaining calculation."
                  },
                  {
                    tip: "Total days is useful for medical records",
                    body: "For newborns and young infants, doctors often record age in total days or weeks. Use the total days figure from the stats panel for pediatric contexts."
                  },
                  {
                    tip: "Use the weeks figure for pregnancy tracking",
                    body: "Gestational age is measured in weeks from the last menstrual period (LMP). You can set the 'Date of Birth' to your LMP date to get total weeks elapsed."
                  },
                  {
                    tip: "Double-check year boundaries in January",
                    body: "If your birthday is in December and today is in January, simple subtraction overestimates your age by 1. The calculator handles this automatically."
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
                    "data-ocid": `agecalc.item.${i + 1}`,
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
                    label: "Date Difference Calculator",
                    page: "date-difference-calculator",
                    emoji: "📅",
                    desc: "Days between two dates"
                  },
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
                    label: "Calculator Hub",
                    page: "calculators",
                    emoji: "🧮",
                    desc: "All calculators in one place"
                  }
                ].map((tool) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "agecalc.link",
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
                  "data-ocid": "agecalc.primary_button",
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
                    e.currentTarget.style.background = "#0891b2";
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
                  "data-ocid": "agecalc.secondary_button",
                  onClick: () => onNavigate("date-difference-calculator"),
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
                    e.currentTarget.style.background = "rgba(34,211,238,0.08)";
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.background = "transparent";
                  },
                  children: "Date Difference Calculator →"
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
  AgeCalculatorSEOPage as default
};
