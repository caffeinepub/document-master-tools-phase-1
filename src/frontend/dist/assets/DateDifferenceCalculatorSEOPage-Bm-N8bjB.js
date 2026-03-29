import { r as reactExports, j as jsxRuntimeExports, x as trackCalculatorUsed } from "./index-YN_OslaE.js";
import { S as SEO } from "./SEO-DRKgHPjT.js";
const ACCENT = "#a855f7";
const ACCENT_LIGHT = "#c084fc";
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
    q: "How do I calculate the number of days between two dates?",
    a: "The simplest method is to convert both dates to a numeric day count (such as Julian Day Numbers) and subtract. For practical purposes, our tool does this automatically — just enter the start and end dates and click Calculate. The result shows days, weeks, months, and years."
  },
  {
    q: "Does the date difference calculator include both the start and end date?",
    a: "By default, the calculator counts the days from start date to end date exclusive of both endpoints (i.e., the number of full days in between). This matches how most scheduling systems and financial contracts count durations. If you need to include the end date, add 1 to the total days shown."
  },
  {
    q: "How many days between 1 January 2024 and 31 December 2024?",
    a: "There are 365 days between 1 January 2024 and 31 December 2024 (exclusive of start date). If you include the start date, it is 366 days — the full leap year. Our calculator shows the exclusive count by default."
  },
  {
    q: "Can I calculate the difference in months and years?",
    a: "Yes. The calculator shows the difference broken down into years, months, and remaining days — similar to how age is expressed. It also shows the total number of weeks and total days. This is useful for contract durations, subscription periods, and project timelines."
  },
  {
    q: "What is the difference between calendar days and working days?",
    a: "Calendar days count every day (including weekends and holidays). Working days (also called business days) typically exclude Saturdays, Sundays, and public holidays. This tool counts calendar days. For working day calculations, manually subtract weekends from the total."
  },
  {
    q: "Is this date difference calculator free?",
    a: "Yes, completely free. No signup required, no ads in the calculation flow, and all processing happens in your browser. No data is stored or transmitted."
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
      name: "Date Difference Calculator",
      item: "https://docmastertools.com/date-difference-calculator"
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
function dateDiff(start, end) {
  const isNegative = end < start;
  const d1 = isNegative ? end : start;
  const d2 = isNegative ? start : end;
  const msPerDay = 1e3 * 60 * 60 * 24;
  const totalDays = Math.floor((d2.getTime() - d1.getTime()) / msPerDay);
  const totalWeeks = Math.floor(totalDays / 7);
  let years = d2.getFullYear() - d1.getFullYear();
  let months = d2.getMonth() - d1.getMonth();
  let days = d2.getDate() - d1.getDate();
  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(d2.getFullYear(), d2.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { totalDays, totalWeeks, years, months, days, isNegative };
}
function DateDifferenceCalculatorSEOPage({
  onNavigate,
  onBack
}) {
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const [startDate, setStartDate] = reactExports.useState("");
  const [endDate, setEndDate] = reactExports.useState(today);
  const [result, setResult] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    document.title = "Date Difference Calculator – Days Between Two Dates | DocMasterTools";
  }, []);
  const calculate = () => {
    if (!startDate || !endDate) {
      setError("Please select both start and end dates.");
      setResult(null);
      return;
    }
    const s = new Date(startDate);
    const e = new Date(endDate);
    if (Number.isNaN(s.getTime()) || Number.isNaN(e.getTime())) {
      setError("One or both dates are invalid.");
      setResult(null);
      return;
    }
    if (s.getTime() === e.getTime()) {
      setError("Start and end dates are the same — difference is 0 days.");
      setResult(null);
      return;
    }
    setError(null);
    setResult(dateDiff(s, e));
    trackCalculatorUsed("date_difference_calculator");
  };
  const reset = () => {
    setStartDate("");
    setEndDate(today);
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
            title: "Date Difference Calculator – Days Between Two Dates | DocMasterTools",
            description: "Calculate the exact number of days, weeks, months, and years between any two dates. Free online date difference calculator — no signup required.",
            canonicalUrl: "https://docmastertools.com/date-difference-calculator"
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
            content: "Date Difference Calculator – Days Between Two Dates | DocMasterTools"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "meta",
          {
            property: "og:description",
            content: "Find the exact days, weeks, months, and years between any two dates. Free, instant, no signup."
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "meta",
          {
            property: "og:url",
            content: "https://docmastertools.com/date-difference-calculator"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:type", content: "website" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { maxWidth: "900px", margin: "0 auto" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "datediff.secondary_button",
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
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: ACCENT_LIGHT }, children: "Date Difference Calculator" })
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
              children: "Date Difference Calculator – Days Between Two Dates"
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
              children: "Calculate the exact number of days, weeks, months, and years between any two dates. Useful for project deadlines, contract durations, loan tenures, and age verification. Enter your start and end dates and results appear instantly — no login needed."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { ...h2Style, color: ACCENT_LIGHT }, children: "Date Difference Calculator" }),
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
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: labelStyle, htmlFor: "startDate", children: "Start Date" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "startDate",
                        "data-ocid": "datediff.input",
                        type: "date",
                        value: startDate,
                        onChange: (e) => setStartDate(e.target.value),
                        style: inputStyle
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: labelStyle, htmlFor: "endDate", children: "End Date" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "endDate",
                        "data-ocid": "datediff.input",
                        type: "date",
                        value: endDate,
                        onChange: (e) => setEndDate(e.target.value),
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
                      "data-ocid": "datediff.primary_button",
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
                        e.currentTarget.style.background = "#9333ea";
                      },
                      onMouseLeave: (e) => {
                        e.currentTarget.style.background = ACCENT;
                      },
                      children: "Calculate Difference"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "data-ocid": "datediff.delete_button",
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
                "data-ocid": "datediff.error_state",
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
                "data-ocid": "datediff.success_state",
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
                            children: result.isNegative ? "End date is before start date — difference is" : "Exact difference"
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
                              result.years > 0 ? `${result.years}y ` : "",
                              result.months > 0 ? `${result.months}m ` : "",
                              result.days,
                              " days"
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
                          label: "Total Days",
                          value: result.totalDays.toLocaleString()
                        },
                        {
                          label: "Total Weeks",
                          value: `${result.totalWeeks.toLocaleString()} wks`
                        },
                        { label: "Full Years", value: result.years.toString() },
                        {
                          label: "Full Months",
                          value: (result.years * 12 + result.months).toString()
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: h2Style, children: "What Is a Date Difference Calculator?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: bodyText, children: "A date difference calculator determines the exact span between two calendar dates. This is more complex than simple subtraction because months have different numbers of days (28, 29, 30, or 31), and you need to account for leap years when counting total days. Manual calculation is error-prone — particularly for multi-year spans or dates close to month boundaries." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { ...bodyText, marginTop: "0.75rem" }, children: "The date difference is one of the most commonly needed calculations in everyday life. Students use it to calculate time remaining before an exam. Lawyers and accountants use it to measure contract durations and interest periods. HR professionals calculate employee tenure. Project managers track sprints and milestones. Loan officers measure repayment periods. Doctors record the duration of medical conditions or pregnancies." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { ...bodyText, marginTop: "0.75rem" }, children: "Our free tool shows you four levels of granularity: the total number of calendar days, total weeks, the difference expressed as years and months (like age), and the total full months. All results appear instantly in your browser — no server involved, completely private." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: h2Style, children: "How to Use the Date Difference Calculator" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: { display: "flex", flexDirection: "column", gap: "1rem" },
                children: [
                  {
                    step: 1,
                    title: "Enter the Start Date",
                    body: "Click the 'Start Date' calendar picker and select the earlier of the two dates. You can enter dates as far back as records exist — the tool handles historical dates accurately."
                  },
                  {
                    step: 2,
                    title: "Enter the End Date",
                    body: "Click the 'End Date' picker and select the later date. The tool pre-fills today's date as a convenience — you can change it to any date. The end date can also be before the start date; the tool will note the reversal and show the correct absolute difference."
                  },
                  {
                    step: 3,
                    title: "Click 'Calculate Difference'",
                    body: "Press the purple Calculate Difference button. The result panel shows the exact difference in years/months/days format, plus four stat cards: total days, total weeks, full years, and full months."
                  },
                  {
                    step: 4,
                    title: "Read the Results",
                    body: "Use the total days figure for financial calculations, the weeks for project planning, the years/months breakdown for legal documents, and the full months count for subscription or tenancy periods."
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: h2Style, children: "Date Difference Examples" }),
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
                    q: "1 Jan 2024 to 31 Dec 2024",
                    a: "365 days, 52 weeks (2024 is a leap year: 366 total days in the year)"
                  },
                  {
                    q: "15 Aug 1947 to 15 Aug 2024",
                    a: "77 years exactly, 28,124 days"
                  },
                  {
                    q: "Project start: 1 Apr 2025, end: 30 Sep 2025",
                    a: "182 days, 26 weeks (6 months)"
                  },
                  {
                    q: "Loan disbursed: 10 Jan 2023, closed: 10 Jan 2026",
                    a: "Exactly 3 years, 1,095 days"
                  },
                  {
                    q: "1 Feb 2020 to 1 Mar 2020 (leap year)",
                    a: "29 days (Feb 2020 had 29 days)"
                  },
                  {
                    q: "Tenancy: 1 Oct 2023 to 31 Mar 2026",
                    a: "2 years, 5 months, 30 days"
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: h2Style, children: "Tips for Date Difference Calculations" }),
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
                    tip: "Inclusive vs exclusive counts matter for legal documents",
                    body: "A 30-day notice period from 1 March ends on 30 March (exclusive) or 31 March (inclusive). Always confirm whether your contract means 'within 30 days' or 'including the 30th day'. Add 1 to total days for inclusive count."
                  },
                  {
                    tip: "Leap years add one day in spans crossing February",
                    body: "A 1-year span from 1 Feb 2023 to 1 Feb 2024 contains 365 days (no leap year). But 1 Feb 2024 to 1 Feb 2025 passes through Feb 2024 (29 days) and Feb 2025 (28 days), so it is still 365 days. The tool handles all cases automatically."
                  },
                  {
                    tip: "Total weeks is useful for sprint planning",
                    body: "Agile projects often work in 2-week sprints. Divide total days by 14 to get the number of sprints. Our tool shows total weeks directly, saving the extra step."
                  },
                  {
                    tip: "Use full months for rental and subscription periods",
                    body: "Landlords and subscription services typically charge by the full month. Use the 'Full Months' stat to determine how many billing cycles fall in a period."
                  },
                  {
                    tip: "Financial interest calculations need exact days",
                    body: "Most bank interest calculations use the 'actual/365' or 'actual/360' day count convention. Use our total days figure as the numerator in your interest formula."
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
                    "data-ocid": `datediff.item.${i + 1}`,
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
                    label: "Age Calculator",
                    page: "age-calculator-online",
                    emoji: "🎂",
                    desc: "Calculate exact age from DOB"
                  },
                  {
                    label: "Loan EMI Calculator",
                    page: "loan-emi-calculator",
                    emoji: "🏦",
                    desc: "Monthly loan repayment"
                  },
                  {
                    label: "GST Calculator",
                    page: "gst-calculator",
                    emoji: "💹",
                    desc: "Calculate GST on any amount"
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
                    "data-ocid": "datediff.link",
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
                  "data-ocid": "datediff.primary_button",
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
                    e.currentTarget.style.background = "#9333ea";
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
                  "data-ocid": "datediff.secondary_button",
                  onClick: () => onNavigate("age-calculator-online"),
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
                    e.currentTarget.style.background = "rgba(192,132,252,0.08)";
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.background = "transparent";
                  },
                  children: "Age Calculator →"
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
  DateDifferenceCalculatorSEOPage as default
};
