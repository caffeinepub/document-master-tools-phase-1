import { j as jsxRuntimeExports } from "./index-BK1nStnW.js";
import { A as AdPlaceholder } from "./AdPlaceholder-Hdfo7QJU.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription } from "./card-CY1lF6Ly.js";
import { A as ArrowLeft } from "./arrow-left-B6GHQD8m.js";
import { G as GraduationCap } from "./graduation-cap-DxeavWf9.js";
import { C as Calculator } from "./calculator-LD0A6QP0.js";
import { D as DollarSign, H as Heart } from "./heart-C-qhNSNp.js";
import "./utils-Bmita3Ip.js";
function CalculatorsPage({
  onBack,
  onNavigate
}) {
  const academicCalculators = [
    {
      id: "cgpa-calculator",
      name: "CGPA Calculator",
      description: "Calculate cumulative grade point average"
    },
    {
      id: "sgpa-calculator",
      name: "SGPA Calculator",
      description: "Calculate semester grade point average"
    },
    {
      id: "cgpa-to-percentage-converter",
      name: "CGPA to Percentage",
      description: "Convert CGPA to percentage"
    },
    {
      id: "percentage-to-cgpa-converter",
      name: "Percentage to CGPA",
      description: "Convert percentage to CGPA"
    },
    {
      id: "grade-calculator",
      name: "Grade Calculator",
      description: "Convert letter grades to points"
    },
    {
      id: "gpa-calculator",
      name: "GPA Calculator",
      description: "Calculate GPA on 4.0 or 10.0 scale"
    },
    {
      id: "marks-percentage-calculator",
      name: "Marks Percentage",
      description: "Calculate percentage from marks"
    },
    {
      id: "division-calculator",
      name: "Division Calculator",
      description: "Determine academic division"
    }
  ];
  const financialCalculators = [
    {
      id: "gst-calculator",
      name: "GST Calculator",
      description: "Add or remove GST from amount"
    },
    {
      id: "emi-calculator",
      name: "EMI Calculator",
      description: "Calculate monthly loan EMI"
    },
    {
      id: "loan-calculator",
      name: "Loan Calculator",
      description: "Calculate loan tenure and interest"
    },
    {
      id: "compound-interest-calculator",
      name: "Compound Interest",
      description: "Calculate compound interest"
    },
    {
      id: "simple-interest-calculator",
      name: "Simple Interest",
      description: "Calculate simple interest"
    },
    {
      id: "discount-calculator",
      name: "Discount Calculator",
      description: "Calculate discounts and savings"
    },
    {
      id: "profit-loss-calculator",
      name: "Profit/Loss Calculator",
      description: "Calculate profit or loss percentage"
    },
    {
      id: "salary-hike-calculator",
      name: "Salary Hike",
      description: "Calculate salary increment"
    }
  ];
  const healthGeneralCalculators = [
    {
      id: "bmi-calculator",
      name: "BMI Calculator",
      description: "Calculate body mass index"
    },
    {
      id: "age-calculator",
      name: "Age Calculator",
      description: "Calculate age with birthday countdown"
    },
    {
      id: "date-difference-calculator",
      name: "Date Difference",
      description: "Calculate difference between dates"
    },
    {
      id: "time-duration-calculator",
      name: "Time Duration",
      description: "Calculate time duration"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-8 md:py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: onBack,
        className: "flex items-center gap-2 text-slate-300 hover:text-white mb-6 transition-colors duration-200 group",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" }),
          "Back to Home"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold mb-3", children: "Calculator Hub" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground", children: "Professional calculators for academic, financial, and health needs. All calculations are instant and performed in your browser." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdPlaceholder, { adType: "banner" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-spacing-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-6 w-6 text-blue-600 dark:text-blue-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: "Academic Calculators" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "8 calculators for students and educators" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: academicCalculators.map((calc, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: "cursor-pointer hover:shadow-xl hover:scale-105 hover:border-primary/50 transition-all duration-200 group",
            onClick: () => onNavigate(calc.id),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "card-padding", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-3 group-hover:bg-blue-500/20 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calculator, { className: "h-6 w-6 text-blue-600 dark:text-blue-400" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: calc.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: calc.description })
            ] })
          },
          calc.id
        ),
        index === 5 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdPlaceholder, { adType: "in-content" }) })
      ] })) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-spacing-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-6 w-6 text-green-600 dark:text-green-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: "Financial Calculators" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "8 calculators for financial planning" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: financialCalculators.map((calc, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: "cursor-pointer hover:shadow-xl hover:scale-105 hover:border-primary/50 transition-all duration-200 group",
            onClick: () => onNavigate(calc.id),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "card-padding", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-3 group-hover:bg-green-500/20 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calculator, { className: "h-6 w-6 text-green-600 dark:text-green-400" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: calc.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: calc.description })
            ] })
          },
          calc.id
        ),
        index === 5 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdPlaceholder, { adType: "in-content" }) })
      ] })) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-spacing-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-6 w-6 text-red-600 dark:text-red-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", children: "Health & General Calculators" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "4 calculators for health and time" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: healthGeneralCalculators.map((calc) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: "cursor-pointer hover:shadow-xl hover:scale-105 hover:border-primary/50 transition-all duration-200 group",
          onClick: () => onNavigate(calc.id),
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "card-padding", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center mb-3 group-hover:bg-red-500/20 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calculator, { className: "h-6 w-6 text-red-600 dark:text-red-400" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: calc.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: calc.description })
          ] })
        },
        calc.id
      )) })
    ] })
  ] }) });
}
export {
  CalculatorsPage as default
};
