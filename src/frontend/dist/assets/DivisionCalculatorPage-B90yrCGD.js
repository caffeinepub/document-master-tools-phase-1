import { r as reactExports, j as jsxRuntimeExports } from "./index-YN_OslaE.js";
import { C as Card, d as CardContent } from "./card-njDO0RzR.js";
import { L as Label, I as Input } from "./input-BldACiYg.js";
import { B as Button } from "./button-N_0YpN9P.js";
import { A as ArrowLeft } from "./arrow-left-C6-8XIiy.js";
import "./utils-Bmita3Ip.js";
function DivisionCalculator() {
  const [percentage, setPercentage] = reactExports.useState("");
  const getDivision = () => {
    const perc = Number.parseFloat(percentage) || 0;
    if (perc >= 60)
      return {
        division: "First Division",
        color: "text-green-600 dark:text-green-400",
        bg: "bg-green-50 dark:bg-green-950/20"
      };
    if (perc >= 50)
      return {
        division: "Second Division",
        color: "text-blue-600 dark:text-blue-400",
        bg: "bg-blue-50 dark:bg-blue-950/20"
      };
    if (perc >= 40)
      return {
        division: "Third Division",
        color: "text-yellow-600 dark:text-yellow-400",
        bg: "bg-yellow-50 dark:bg-yellow-950/20"
      };
    return {
      division: "Fail",
      color: "text-red-600 dark:text-red-400",
      bg: "bg-red-50 dark:bg-red-950/20"
    };
  };
  const result = getDivision();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "percentage", className: "text-sm font-medium", children: "Percentage (0-100)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "percentage",
          type: "number",
          min: "0",
          max: "100",
          step: "0.01",
          value: percentage,
          onChange: (e) => setPercentage(e.target.value),
          placeholder: "e.g., 75",
          className: "mt-2"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: `${result.bg} border-2`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-2", children: "Division" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-4xl font-bold ${result.color}`, children: result.division })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-muted/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-3 text-sm", children: "Division Criteria" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between p-2 bg-green-50 dark:bg-green-950/20 rounded", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "First Division" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "≥ 60%" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between p-2 bg-blue-50 dark:bg-blue-950/20 rounded", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Second Division" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "50% - 59%" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between p-2 bg-yellow-50 dark:bg-yellow-950/20 rounded", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Third Division" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "40% - 49%" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between p-2 bg-red-50 dark:bg-red-950/20 rounded", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Fail" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "< 40%" })
        ] })
      ] })
    ] }) })
  ] });
}
function DivisionCalculatorPage({
  onBack
}) {
  reactExports.useEffect(() => {
    document.title = "Division Calculator (1st/2nd/3rd Division) | Calculator Hub";
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "py-8 md:py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "ghost",
        onClick: onBack,
        className: "mb-6 text-slate-200 hover:text-white hover:bg-gray-700",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
          "Back to Calculators"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold mb-3", children: "Division Calculator (1st/2nd/3rd Division)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground", children: "Calculate academic division based on percentage." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DivisionCalculator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8 prose prose-sm max-w-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold mb-3", children: "About Division Calculator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "Determine your academic division classification based on percentage marks. First Division (60% or more), Second Division (50-59%), Third Division (40-49%), or Fail (less than 40%)." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "This classification system is commonly used in Indian educational institutions for exam results and academic records." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "ad-container my-8 p-4 bg-muted/30 rounded-lg text-center text-sm text-muted-foreground", children: "Advertisement Space" })
    ] })
  ] }) });
}
export {
  DivisionCalculatorPage as default
};
