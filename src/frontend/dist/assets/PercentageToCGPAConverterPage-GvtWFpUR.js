import { r as reactExports, j as jsxRuntimeExports } from "./index-BK1nStnW.js";
import { C as Card, d as CardContent } from "./card-CY1lF6Ly.js";
import { L as Label, I as Input } from "./input-D5fftGWB.js";
import { R as RadioGroup, a as RadioGroupItem } from "./radio-group-J2I2nBoG.js";
import { B as Button } from "./button-CEbbI1IU.js";
import { A as ArrowLeft } from "./arrow-left-B6GHQD8m.js";
import "./utils-Bmita3Ip.js";
import "./index-C7kgm_TX.js";
import "./index-Bk28m8dh.js";
import "./index-DgHemueb.js";
import "./index-Doj5NPwU.js";
function PercentageToCGPAConverter() {
  const [percentage, setPercentage] = reactExports.useState("");
  const [formula, setFormula] = reactExports.useState("cbse");
  const calculateCGPA = () => {
    const percentageValue = Number.parseFloat(percentage) || 0;
    if (formula === "cbse") {
      return (percentageValue / 9.5).toFixed(2);
    }
    return (percentageValue / 10).toFixed(2);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "percentage", className: "text-sm font-medium", children: "Enter Percentage (0-100)" }),
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
            placeholder: "e.g., 85.5",
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
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "CGPA = Percentage ÷ 9.5" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 p-3 rounded-lg border bg-background hover:bg-accent transition-colors", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "engineering", id: "engineering" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "engineering", className: "flex-1 cursor-pointer", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: "Engineering Formula" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "CGPA = Percentage ÷ 10" })
                ] })
              ] })
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-primary/5 border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-2", children: "CGPA" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl font-bold text-primary", children: calculateCGPA() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2", children: "on 10.0 scale" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
        "Using ",
        formula === "cbse" ? "CBSE" : "Engineering",
        " formula"
      ] })
    ] }) }) })
  ] });
}
function PercentageToCGPAConverterPage({
  onBack
}) {
  reactExports.useEffect(() => {
    document.title = "Percentage to CGPA Converter | Calculator Hub";
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold mb-3", children: "Percentage to CGPA Converter" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground", children: "Convert percentage to CGPA using CBSE or Engineering formula." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PercentageToCGPAConverter, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8 prose prose-sm max-w-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold mb-3", children: "About Percentage to CGPA Conversion" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "Convert your percentage marks to CGPA using reverse formulas. CBSE formula (Percentage ÷ 9.5) and Engineering formula (Percentage ÷ 10) help you understand your grade point equivalent." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "This is useful when applying to institutions that require CGPA instead of percentage marks." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "ad-container my-8 p-4 bg-muted/30 rounded-lg text-center text-sm text-muted-foreground", children: "Advertisement Space" })
    ] })
  ] }) });
}
export {
  PercentageToCGPAConverterPage as default
};
