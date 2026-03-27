import { r as reactExports, j as jsxRuntimeExports } from "./index-5lKdoCW0.js";
import { C as Card, d as CardContent, B as Button } from "./card-D8L0u0j9.js";
import { L as Label, I as Input } from "./input-BTbdFU5B.js";
import { R as RadioGroup, a as RadioGroupItem } from "./radio-group-Bu3RQTx8.js";
import { A as ArrowLeft } from "./arrow-left-CfDrezEV.js";
import "./utils-DTOQoE02.js";
import "./index-CCo3A7qs.js";
import "./index-Co7Hg6uG.js";
import "./index-BNibAAFA.js";
import "./index-CXobzX3M.js";
function SalaryHikeCalculator() {
  const [mode, setMode] = reactExports.useState("percentage");
  const [currentSalary, setCurrentSalary] = reactExports.useState("");
  const [hikePercentage, setHikePercentage] = reactExports.useState("");
  const [desiredSalary, setDesiredSalary] = reactExports.useState("");
  const calculate = () => {
    const current = Number.parseFloat(currentSalary) || 0;
    if (mode === "percentage") {
      const hike = Number.parseFloat(hikePercentage) || 0;
      const increment2 = current * hike / 100;
      const newSalary = current + increment2;
      return {
        newSalary: newSalary.toFixed(2),
        monthlyIncrement: increment2.toFixed(2),
        annualIncrement: (increment2 * 12).toFixed(2),
        percentage: hike.toFixed(2)
      };
    }
    const desired = Number.parseFloat(desiredSalary) || 0;
    const increment = desired - current;
    const hikeCalc = current > 0 ? increment / current * 100 : 0;
    return {
      requiredHike: hikeCalc.toFixed(2),
      monthlyIncrement: increment.toFixed(2),
      annualIncrement: (increment * 12).toFixed(2)
    };
  };
  const result = calculate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium mb-3 block", children: "Calculation Mode" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          RadioGroup,
          {
            value: mode,
            onValueChange: (value) => setMode(value),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "percentage", id: "percentage" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "percentage", className: "cursor-pointer", children: "From Hike %" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "amount", id: "amount" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "amount", className: "cursor-pointer", children: "From Desired Salary" })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "current", className: "text-sm font-medium", children: "Current Salary (₹/month)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "current",
            type: "number",
            min: "0",
            value: currentSalary,
            onChange: (e) => setCurrentSalary(e.target.value),
            placeholder: "e.g., 50000",
            className: "mt-2"
          }
        )
      ] }),
      mode === "percentage" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "hike", className: "text-sm font-medium", children: "Hike Percentage (%)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "hike",
            type: "number",
            min: "0",
            step: "0.1",
            value: hikePercentage,
            onChange: (e) => setHikePercentage(e.target.value),
            placeholder: "e.g., 15",
            className: "mt-2"
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "desired", className: "text-sm font-medium", children: "Desired Salary (₹/month)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "desired",
            type: "number",
            min: "0",
            value: desiredSalary,
            onChange: (e) => setDesiredSalary(e.target.value),
            placeholder: "e.g., 60000",
            className: "mt-2"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-primary/5 border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6 space-y-4", children: mode === "percentage" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center pb-4 border-b", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-2", children: "New Salary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-4xl font-bold text-primary", children: [
          "₹",
          result.newSalary
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "per month" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center pb-2 border-b", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Monthly Increment" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg font-semibold text-green-600", children: [
          "₹",
          result.monthlyIncrement
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Annual Increment" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xl font-bold text-green-600", children: [
          "₹",
          result.annualIncrement
        ] })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center pb-4 border-b", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-2", children: "Required Hike" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-4xl font-bold text-primary", children: [
          result.requiredHike,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center pb-2 border-b", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Monthly Increment" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg font-semibold text-green-600", children: [
          "₹",
          result.monthlyIncrement
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Annual Increment" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xl font-bold text-green-600", children: [
          "₹",
          result.annualIncrement
        ] })
      ] })
    ] }) }) })
  ] });
}
function SalaryHikeCalculatorPage({
  onBack
}) {
  reactExports.useEffect(() => {
    document.title = "Salary Hike Calculator | Calculator Hub";
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "py-8 md:py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", onClick: onBack, className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
      "Back to Calculators"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold mb-3", children: "Salary Hike Calculator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground", children: "Calculate new salary after hike and increment amount." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SalaryHikeCalculator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8 prose prose-sm max-w-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold mb-3", children: "About Salary Hike Calculator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "Calculate your new salary after a percentage hike or find out what percentage hike you need to reach a desired salary. See monthly and annual increment breakdowns." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Perfect for salary negotiations, appraisal planning, and understanding your compensation growth." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "ad-container my-8 p-4 bg-muted/30 rounded-lg text-center text-sm text-muted-foreground", children: "Advertisement Space" })
    ] })
  ] }) });
}
export {
  SalaryHikeCalculatorPage as default
};
