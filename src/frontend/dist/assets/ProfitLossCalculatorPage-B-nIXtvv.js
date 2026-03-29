import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports } from "./index-BK1nStnW.js";
import { C as Card, d as CardContent } from "./card-CY1lF6Ly.js";
import { L as Label, I as Input } from "./input-D5fftGWB.js";
import { B as Button } from "./button-CEbbI1IU.js";
import { A as ArrowLeft } from "./arrow-left-B6GHQD8m.js";
import "./utils-Bmita3Ip.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M16 17h6v-6", key: "t6n2it" }],
  ["path", { d: "m22 17-8.5-8.5-5 5L2 7", key: "x473p" }]
];
const TrendingDown = createLucideIcon("trending-down", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
function ProfitLossCalculator() {
  const [costPrice, setCostPrice] = reactExports.useState("");
  const [sellingPrice, setSellingPrice] = reactExports.useState("");
  const calculate = () => {
    const CP = Number.parseFloat(costPrice) || 0;
    const SP = Number.parseFloat(sellingPrice) || 0;
    if (CP === 0) return { amount: "0.00", percentage: "0.00", type: "none" };
    const diff = SP - CP;
    const percentage = diff / CP * 100;
    return {
      amount: Math.abs(diff).toFixed(2),
      percentage: Math.abs(percentage).toFixed(2),
      type: diff > 0 ? "profit" : diff < 0 ? "loss" : "none"
    };
  };
  const result = calculate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cp", className: "text-sm font-medium", children: "Cost Price (₹)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "cp",
            type: "number",
            min: "0",
            value: costPrice,
            onChange: (e) => setCostPrice(e.target.value),
            placeholder: "e.g., 500",
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "sp", className: "text-sm font-medium", children: "Selling Price (₹)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "sp",
            type: "number",
            min: "0",
            value: sellingPrice,
            onChange: (e) => setSellingPrice(e.target.value),
            placeholder: "e.g., 600",
            className: "mt-2"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: `${result.type === "profit" ? "bg-green-50 dark:bg-green-950/20 border-green-200" : result.type === "loss" ? "bg-red-50 dark:bg-red-950/20 border-red-200" : "bg-muted/50"}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-4", children: [
          result.type !== "none" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `flex items-center justify-center gap-2 ${result.type === "profit" ? "text-green-600" : "text-red-600"}`,
              children: [
                result.type === "profit" ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-8 w-8" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "h-8 w-8" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold", children: result.type === "profit" ? "Profit" : "Loss" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-2", children: "Amount" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: `text-4xl font-bold ${result.type === "profit" ? "text-green-600" : result.type === "loss" ? "text-red-600" : "text-muted-foreground"}`,
                children: [
                  "₹",
                  result.amount
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-2", children: "Percentage" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: `text-3xl font-bold ${result.type === "profit" ? "text-green-600" : result.type === "loss" ? "text-red-600" : "text-muted-foreground"}`,
                children: [
                  result.percentage,
                  "%"
                ]
              }
            )
          ] })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-muted/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "Formula:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs bg-background p-2 rounded", children: "Profit/Loss % = ((Selling Price - Cost Price) / Cost Price) × 100" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        "CP = ₹",
        costPrice || "0",
        ", SP = ₹",
        sellingPrice || "0"
      ] })
    ] }) }) })
  ] });
}
function ProfitLossCalculatorPage({
  onBack
}) {
  reactExports.useEffect(() => {
    document.title = "Profit Loss Percentage Calculator | Calculator Hub";
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold mb-3", children: "Profit Loss Percentage Calculator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground", children: "Calculate profit or loss percentage from cost price and selling price." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ProfitLossCalculator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8 prose prose-sm max-w-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold mb-3", children: "About Profit/Loss Calculator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "Calculate profit or loss percentage by entering cost price and selling price. The calculator automatically determines whether you made a profit or loss and shows the percentage." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Formula: Profit/Loss % = ((Selling Price - Cost Price) / Cost Price) × 100. Visual indicators help you quickly identify profitable transactions." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "ad-container my-8 p-4 bg-muted/30 rounded-lg text-center text-sm text-muted-foreground", children: "Advertisement Space" })
    ] })
  ] }) });
}
export {
  ProfitLossCalculatorPage as default
};
