import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports } from "./index-YN_OslaE.js";
import { A as Alert, a as AlertDescription } from "./alert-CB69UQX_.js";
import { C as Card, d as CardContent } from "./card-njDO0RzR.js";
import { L as Label, I as Input } from "./input-BldACiYg.js";
import { B as Button } from "./button-N_0YpN9P.js";
import { A as ArrowLeft } from "./arrow-left-C6-8XIiy.js";
import "./utils-Bmita3Ip.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode);
function MarksPercentageCalculator() {
  const [obtained, setObtained] = reactExports.useState("");
  const [total, setTotal] = reactExports.useState("");
  const calculate = () => {
    const obt = Number.parseFloat(obtained) || 0;
    const tot = Number.parseFloat(total) || 0;
    if (tot === 0) return { percentage: "0.00", pass: false, error: false };
    if (obt > tot) return { percentage: "0.00", pass: false, error: true };
    const percentage = obt / tot * 100;
    return {
      percentage: percentage.toFixed(2),
      pass: percentage >= 40,
      error: false
    };
  };
  const result = calculate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "obtained", className: "text-sm font-medium", children: "Obtained Marks" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "obtained",
            type: "number",
            min: "0",
            value: obtained,
            onChange: (e) => setObtained(e.target.value),
            placeholder: "e.g., 450",
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "total", className: "text-sm font-medium", children: "Total Marks" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "total",
            type: "number",
            min: "0",
            value: total,
            onChange: (e) => setTotal(e.target.value),
            placeholder: "e.g., 500",
            className: "mt-2"
          }
        )
      ] })
    ] }) }),
    result.error && /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { variant: "destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: "Obtained marks cannot exceed total marks" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-primary/5 border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-2", children: "Percentage" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-5xl font-bold text-primary", children: [
          result.percentage,
          "%"
        ] })
      ] }),
      !result.error && Number.parseFloat(total) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `flex items-center justify-center gap-2 ${result.pass ? "text-green-600" : "text-red-600"}`,
          children: [
            result.pass ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-6 w-6" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-6 w-6" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-semibold", children: result.pass ? "Pass" : "Fail" })
          ]
        }
      )
    ] }) }) })
  ] });
}
function MarksPercentageCalculatorPage({
  onBack
}) {
  reactExports.useEffect(() => {
    document.title = "Marks Percentage Calculator | Calculator Hub";
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold mb-3", children: "Marks Percentage Calculator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground", children: "Calculate percentage from obtained marks and total marks." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MarksPercentageCalculator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8 prose prose-sm max-w-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold mb-3", children: "About Marks Percentage Calculator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "Calculate your exam percentage by entering obtained marks and total marks. The calculator shows your percentage with pass/fail indication based on 40% threshold." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Formula: Percentage = (Obtained Marks / Total Marks) × 100. Results are displayed with two decimal places for accuracy." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "ad-container my-8 p-4 bg-muted/30 rounded-lg text-center text-sm text-muted-foreground", children: "Advertisement Space" })
    ] })
  ] }) });
}
export {
  MarksPercentageCalculatorPage as default
};
