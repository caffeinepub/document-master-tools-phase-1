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
function BMICalculator() {
  const [weight, setWeight] = reactExports.useState("");
  const [weightUnit, setWeightUnit] = reactExports.useState("kg");
  const [height, setHeight] = reactExports.useState("");
  const [heightUnit, setHeightUnit] = reactExports.useState("cm");
  const [feet, setFeet] = reactExports.useState("");
  const [inches, setInches] = reactExports.useState("");
  const calculateBMI = () => {
    let weightKg = Number.parseFloat(weight) || 0;
    if (weightUnit === "lbs") {
      weightKg = weightKg * 0.453592;
    }
    let heightM = 0;
    if (heightUnit === "cm") {
      heightM = (Number.parseFloat(height) || 0) / 100;
    } else {
      const ft = Number.parseFloat(feet) || 0;
      const inch = Number.parseFloat(inches) || 0;
      heightM = (ft * 30.48 + inch * 2.54) / 100;
    }
    if (weightKg === 0 || heightM === 0) {
      return {
        bmi: "0.0",
        category: "N/A",
        color: "text-muted-foreground",
        healthyRange: "N/A"
      };
    }
    const bmi = weightKg / (heightM * heightM);
    let category = "";
    let color = "";
    if (bmi < 18.5) {
      category = "Underweight";
      color = "text-blue-600 dark:text-blue-400";
    } else if (bmi < 25) {
      category = "Normal";
      color = "text-green-600 dark:text-green-400";
    } else if (bmi < 30) {
      category = "Overweight";
      color = "text-yellow-600 dark:text-yellow-400";
    } else {
      category = "Obese";
      color = "text-red-600 dark:text-red-400";
    }
    const minHealthy = (18.5 * heightM * heightM).toFixed(1);
    const maxHealthy = (24.9 * heightM * heightM).toFixed(1);
    const healthyRange = `${minHealthy} - ${maxHealthy} ${weightUnit}`;
    return { bmi: bmi.toFixed(1), category, color, healthyRange };
  };
  const result = calculateBMI();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "weight", className: "text-sm font-medium", children: "Weight" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "weight",
              type: "number",
              min: "0",
              step: "0.1",
              value: weight,
              onChange: (e) => setWeight(e.target.value),
              placeholder: "e.g., 70",
              className: "flex-1"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            RadioGroup,
            {
              value: weightUnit,
              onValueChange: (value) => setWeightUnit(value),
              className: "flex gap-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "kg", id: "kg" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "kg", className: "cursor-pointer", children: "kg" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "lbs", id: "lbs" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "lbs", className: "cursor-pointer", children: "lbs" })
                ] })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Height" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          RadioGroup,
          {
            value: heightUnit,
            onValueChange: (value) => setHeightUnit(value),
            className: "flex gap-4 mt-2 mb-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "cm", id: "cm" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cm", className: "cursor-pointer", children: "cm" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "ft", id: "ft" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ft", className: "cursor-pointer", children: "feet/inches" })
              ] })
            ]
          }
        ),
        heightUnit === "cm" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            min: "0",
            step: "0.1",
            value: height,
            onChange: (e) => setHeight(e.target.value),
            placeholder: "e.g., 170"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: "0",
              step: "1",
              value: feet,
              onChange: (e) => setFeet(e.target.value),
              placeholder: "Feet",
              className: "flex-1"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: "0",
              max: "11",
              step: "1",
              value: inches,
              onChange: (e) => setInches(e.target.value),
              placeholder: "Inches",
              className: "flex-1"
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-primary/5 border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-2", children: "Your BMI" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-5xl font-bold text-primary", children: result.bmi })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-2xl font-semibold ${result.color}`, children: result.category }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 border-t", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Healthy Weight Range" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: result.healthyRange })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-muted/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-3 text-sm", children: "BMI Categories" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between p-2 bg-blue-50 dark:bg-blue-950/20 rounded", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Underweight" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "< 18.5" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between p-2 bg-green-50 dark:bg-green-950/20 rounded", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Normal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "18.5 - 24.9" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between p-2 bg-yellow-50 dark:bg-yellow-950/20 rounded", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Overweight" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "25 - 29.9" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between p-2 bg-red-50 dark:bg-red-950/20 rounded", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Obese" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "≥ 30" })
        ] })
      ] })
    ] }) })
  ] });
}
function BMICalculatorPage({ onBack }) {
  reactExports.useEffect(() => {
    document.title = "BMI Calculator | Calculator Hub";
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold mb-3", children: "BMI Calculator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground", children: "Calculate Body Mass Index (BMI) with weight and height." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(BMICalculator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8 prose prose-sm max-w-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold mb-3", children: "About BMI Calculator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "Calculate your Body Mass Index (BMI) to assess if you are at a healthy weight. Supports both metric (kg/cm) and imperial (lbs/feet-inches) units. Get your BMI category and healthy weight range." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "BMI categories: Underweight (less than 18.5), Normal (18.5-24.9), Overweight (25-29.9), Obese (30 or more). Formula: BMI = weight(kg) / height(m) squared." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "ad-container my-8 p-4 bg-muted/30 rounded-lg text-center text-sm text-muted-foreground", children: "Advertisement Space" })
    ] })
  ] }) });
}
export {
  BMICalculatorPage as default
};
