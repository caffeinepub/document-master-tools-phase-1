import { r as reactExports, j as jsxRuntimeExports } from "./index-BK1nStnW.js";
import { C as Card, d as CardContent } from "./card-CY1lF6Ly.js";
import { L as Label, I as Input } from "./input-D5fftGWB.js";
import { R as RadioGroup, a as RadioGroupItem } from "./radio-group-J2I2nBoG.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DtX__EcZ.js";
import { B as Button } from "./button-CEbbI1IU.js";
import { A as ArrowLeft } from "./arrow-left-B6GHQD8m.js";
import "./utils-Bmita3Ip.js";
import "./index-C7kgm_TX.js";
import "./index-Bk28m8dh.js";
import "./index-DgHemueb.js";
import "./index-Doj5NPwU.js";
import "./index-IXOTxK3N.js";
function GSTCalculator() {
  const [mode, setMode] = reactExports.useState("add");
  const [amount, setAmount] = reactExports.useState("");
  const [gstRate, setGstRate] = reactExports.useState("18");
  const [customRate, setCustomRate] = reactExports.useState("");
  const rate = gstRate === "custom" ? Number.parseFloat(customRate) || 0 : Number.parseFloat(gstRate);
  const calculate = () => {
    const amt = Number.parseFloat(amount) || 0;
    if (mode === "add") {
      const gstAmount2 = amt * rate / 100;
      const total = amt + gstAmount2;
      return {
        base: amt.toFixed(2),
        gst: gstAmount2.toFixed(2),
        total: total.toFixed(2)
      };
    }
    const base = amt / (1 + rate / 100);
    const gstAmount = amt - base;
    return {
      base: base.toFixed(2),
      gst: gstAmount.toFixed(2),
      total: amt.toFixed(2)
    };
  };
  const result = calculate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium mb-3 block", children: "Mode" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          RadioGroup,
          {
            value: mode,
            onValueChange: (value) => setMode(value),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "add", id: "add" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "add", className: "cursor-pointer", children: "Add GST" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "remove", id: "remove" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "remove", className: "cursor-pointer", children: "Remove GST" })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "amount", className: "text-sm font-medium", children: mode === "add" ? "Base Amount" : "Total Amount (with GST)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "amount",
            type: "number",
            min: "0",
            step: "0.01",
            value: amount,
            onChange: (e) => setAmount(e.target.value),
            placeholder: "Enter amount",
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "gst-rate", className: "text-sm font-medium", children: "GST Rate" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: gstRate, onValueChange: setGstRate, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "gst-rate", className: "mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "5", children: "5%" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "12", children: "12%" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "18", children: "18%" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "28", children: "28%" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "custom", children: "Custom Rate" })
          ] })
        ] })
      ] }),
      gstRate === "custom" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "custom-rate", className: "text-sm font-medium", children: "Custom GST Rate (%)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "custom-rate",
            type: "number",
            min: "0",
            max: "100",
            step: "0.01",
            value: customRate,
            onChange: (e) => setCustomRate(e.target.value),
            placeholder: "Enter custom rate",
            className: "mt-2"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-primary/5 border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center pb-2 border-b", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Base Amount" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg font-semibold", children: [
          "₹",
          result.base
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center pb-2 border-b", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
          "GST Amount (",
          rate,
          "%)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg font-semibold text-orange-600", children: [
          "₹",
          result.gst
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Total Amount" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-bold text-primary", children: [
          "₹",
          result.total
        ] })
      ] })
    ] }) }) })
  ] });
}
function GSTCalculatorPage({ onBack }) {
  reactExports.useEffect(() => {
    document.title = "GST Calculator (Add/Remove GST) | Calculator Hub";
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold mb-3", children: "GST Calculator (Add/Remove GST)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground", children: "Add or remove GST from amount. Calculate GST with multiple tax rates." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(GSTCalculator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8 prose prose-sm max-w-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold mb-3", children: "About GST Calculator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "Calculate GST (Goods and Services Tax) by adding or removing it from amounts. Supports standard GST rates of 5%, 12%, 18%, 28%, and custom rates." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Add GST mode calculates total amount from base price. Remove GST mode extracts base amount from GST-inclusive price. Perfect for businesses and shoppers." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "ad-container my-8 p-4 bg-muted/30 rounded-lg text-center text-sm text-muted-foreground", children: "Advertisement Space" })
    ] })
  ] }) });
}
export {
  GSTCalculatorPage as default
};
