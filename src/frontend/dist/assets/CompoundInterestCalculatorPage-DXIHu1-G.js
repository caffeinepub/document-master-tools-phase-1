import { r as reactExports, j as jsxRuntimeExports } from "./index-5lKdoCW0.js";
import { C as Card, d as CardContent, B as Button } from "./card-D8L0u0j9.js";
import { L as Label, I as Input } from "./input-BTbdFU5B.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CYvTDaKA.js";
import { A as ArrowLeft } from "./arrow-left-CfDrezEV.js";
import "./utils-DTOQoE02.js";
import "./index-IXOTxK3N.js";
import "./index-CCo3A7qs.js";
import "./index-BNibAAFA.js";
function CompoundInterestCalculator() {
  const [principal, setPrincipal] = reactExports.useState("");
  const [rate, setRate] = reactExports.useState("");
  const [time, setTime] = reactExports.useState("");
  const [frequency, setFrequency] = reactExports.useState("12");
  const calculate = () => {
    const P = Number.parseFloat(principal) || 0;
    const r = (Number.parseFloat(rate) || 0) / 100;
    const t = Number.parseFloat(time) || 0;
    const n = Number.parseFloat(frequency);
    if (P === 0 || r === 0 || t === 0) {
      return { amount: "0.00", interest: "0.00" };
    }
    const A = P * (1 + r / n) ** (n * t);
    const interest = A - P;
    return { amount: A.toFixed(2), interest: interest.toFixed(2) };
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "rate", className: "text-sm font-medium", children: "Annual Interest Rate (%)" }),
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
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "frequency", className: "text-sm font-medium", children: "Compounding Frequency" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: frequency, onValueChange: setFrequency, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "frequency", className: "mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "1", children: "Yearly" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "2", children: "Half-yearly" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "4", children: "Quarterly" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "12", children: "Monthly" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "365", children: "Daily" })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-primary/5 border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center pb-2 border-b", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Principal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg font-semibold", children: [
          "₹",
          principal || "0.00"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center pb-2 border-b", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Interest Earned" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg font-semibold text-green-600", children: [
          "₹",
          result.interest
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Final Amount" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-bold text-primary", children: [
          "₹",
          result.amount
        ] })
      ] })
    ] }) })
  ] });
}
function CompoundInterestCalculatorPage({
  onBack
}) {
  reactExports.useEffect(() => {
    document.title = "Compound Interest Calculator | Calculator Hub";
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "py-8 md:py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", onClick: onBack, className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
      "Back to Calculators"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold mb-3", children: "Compound Interest Calculator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground", children: "Calculate compound interest with multiple compounding frequencies." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CompoundInterestCalculator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8 prose prose-sm max-w-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold mb-3", children: "About Compound Interest Calculator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "Calculate compound interest with various compounding frequencies: yearly, half-yearly, quarterly, monthly, or daily. See how your investment grows over time with compound interest." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Formula: A = P(1 + r/n)^(nt) where A is final amount, P is principal, r is annual rate, n is compounding frequency, and t is time in years." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "ad-container my-8 p-4 bg-muted/30 rounded-lg text-center text-sm text-muted-foreground", children: "Advertisement Space" })
    ] })
  ] }) });
}
export {
  CompoundInterestCalculatorPage as default
};
