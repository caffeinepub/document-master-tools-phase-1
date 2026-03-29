import { r as reactExports, j as jsxRuntimeExports } from "./index-BK1nStnW.js";
import { C as Card, d as CardContent } from "./card-CY1lF6Ly.js";
import { L as Label, I as Input } from "./input-D5fftGWB.js";
import { B as Button } from "./button-CEbbI1IU.js";
import { A as ArrowLeft } from "./arrow-left-B6GHQD8m.js";
import "./utils-Bmita3Ip.js";
function SimpleInterestCalculator() {
  const [principal, setPrincipal] = reactExports.useState("");
  const [rate, setRate] = reactExports.useState("");
  const [time, setTime] = reactExports.useState("");
  const calculate = () => {
    const P = Number.parseFloat(principal) || 0;
    const R = Number.parseFloat(rate) || 0;
    const T = Number.parseFloat(time) || 0;
    const SI = P * R * T / 100;
    const total = P + SI;
    return { interest: SI.toFixed(2), total: total.toFixed(2) };
  };
  const result = calculate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "principal", className: "text-sm font-medium", children: "Principal Amount (₹)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "principal",
            type: "number",
            min: "0",
            value: principal,
            onChange: (e) => setPrincipal(e.target.value),
            placeholder: "e.g., 100000",
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "rate", className: "text-sm font-medium", children: "Rate of Interest (% per annum)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "rate",
            type: "number",
            min: "0",
            step: "0.1",
            value: rate,
            onChange: (e) => setRate(e.target.value),
            placeholder: "e.g., 8.5",
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "time", className: "text-sm font-medium", children: "Time Period (Years)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "time",
            type: "number",
            min: "0",
            step: "0.1",
            value: time,
            onChange: (e) => setTime(e.target.value),
            placeholder: "e.g., 5",
            className: "mt-2"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-muted/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "Formula:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs bg-background p-2 rounded", children: "SI = (P × R × T) / 100" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        "P = ",
        principal || "0",
        ", R = ",
        rate || "0",
        "%, T = ",
        time || "0",
        " ",
        "years"
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-primary/5 border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center pb-2 border-b", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Simple Interest" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-bold text-primary", children: [
          "₹",
          result.interest
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Total Amount" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xl font-bold", children: [
          "₹",
          result.total
        ] })
      ] })
    ] }) })
  ] });
}
function SimpleInterestCalculatorPage({
  onBack
}) {
  reactExports.useEffect(() => {
    document.title = "Simple Interest Calculator | Calculator Hub";
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold mb-3", children: "Simple Interest Calculator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground", children: "Calculate simple interest from principal, rate, and time." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SimpleInterestCalculator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8 prose prose-sm max-w-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold mb-3", children: "About Simple Interest Calculator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "Calculate simple interest on loans or investments using the straightforward formula: SI = (P × R × T) / 100. Enter principal amount, annual interest rate, and time period to get instant results." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Simple interest is calculated only on the principal amount, making it easy to understand and calculate for short-term loans and deposits." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "ad-container my-8 p-4 bg-muted/30 rounded-lg text-center text-sm text-muted-foreground", children: "Advertisement Space" })
    ] })
  ] }) });
}
export {
  SimpleInterestCalculatorPage as default
};
