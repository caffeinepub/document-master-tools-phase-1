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
function CGPAToPercentageConverter() {
  const [cgpa, setCgpa] = reactExports.useState("");
  const [formula, setFormula] = reactExports.useState("cbse");
  const calculatePercentage = () => {
    const cgpaValue = Number.parseFloat(cgpa) || 0;
    if (formula === "cbse") {
      return (cgpaValue * 9.5).toFixed(2);
    }
    return (cgpaValue * 10).toFixed(2);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cgpa", className: "text-sm font-medium", children: "Enter CGPA (0-10)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "cgpa",
            type: "number",
            min: "0",
            max: "10",
            step: "0.01",
            value: cgpa,
            onChange: (e) => setCgpa(e.target.value),
            placeholder: "e.g., 8.5",
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium mb-3 block", children: "Select Formula" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          RadioGroup,
          {
            value: formula,
            onValueChange: (value) => setFormula(value),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 p-3 rounded-lg border bg-background hover:bg-accent transition-colors", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "cbse", id: "cbse" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "cbse", className: "flex-1 cursor-pointer", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: "CBSE Formula" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Percentage = CGPA × 9.5" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 p-3 rounded-lg border bg-background hover:bg-accent transition-colors", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "engineering", id: "engineering" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "engineering", className: "flex-1 cursor-pointer", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: "Engineering Formula" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Percentage = CGPA × 10" })
                ] })
              ] })
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-primary/5 border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-2", children: "Percentage" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-4xl font-bold text-primary", children: [
          calculatePercentage(),
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
        "Using ",
        formula === "cbse" ? "CBSE" : "Engineering",
        " formula"
      ] })
    ] }) }) })
  ] });
}
function CGPAToPercentageConverterPage({
  onBack
}) {
  reactExports.useEffect(() => {
    document.title = "CGPA to Percentage Converter | Calculator Hub";
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "py-8 md:py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", onClick: onBack, className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
      "Back to Calculators"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold mb-3", children: "CGPA to Percentage Converter" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground", children: "Convert CGPA to percentage using CBSE or Engineering formula." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CGPAToPercentageConverter, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8 prose prose-sm max-w-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold mb-3", children: "About CGPA to Percentage Conversion" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "Convert your CGPA to percentage using standard formulas. CBSE formula (CGPA × 9.5) is commonly used for school education, while Engineering formula (CGPA × 10) is used in many technical institutions." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Select the appropriate formula based on your institution's guidelines to get accurate percentage conversion." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "ad-container my-8 p-4 bg-muted/30 rounded-lg text-center text-sm text-muted-foreground", children: "Advertisement Space" })
    ] })
  ] }) });
}
export {
  CGPAToPercentageConverterPage as default
};
