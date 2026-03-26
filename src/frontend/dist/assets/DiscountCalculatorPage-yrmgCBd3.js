import { r as reactExports, j as jsxRuntimeExports } from "./index-BFVPq1mW.js";
import { C as Card, d as CardContent, B as Button } from "./card-BJcsF60x.js";
import { L as Label, I as Input } from "./input-Djza26gp.js";
import { R as RadioGroup, a as RadioGroupItem } from "./radio-group-B8IVGXOj.js";
import { A as ArrowLeft } from "./arrow-left-ByehoCcW.js";
import "./utils-BpWBj8TO.js";
import "./index-NoZ9Ynb9.js";
import "./index-BGrVG_Et.js";
import "./index-Bz7eJ3CA.js";
import "./index-BpF8UX0f.js";
function DiscountCalculator() {
  const [mode, setMode] = reactExports.useState("percentage");
  const [originalPrice, setOriginalPrice] = reactExports.useState("");
  const [discount, setDiscount] = reactExports.useState("");
  const [salePrice, setSalePrice] = reactExports.useState("");
  const calculate = () => {
    const original = Number.parseFloat(originalPrice) || 0;
    if (mode === "percentage") {
      const discountPercent2 = Number.parseFloat(discount) || 0;
      const discountAmount2 = original * discountPercent2 / 100;
      const final = original - discountAmount2;
      return {
        discountAmount: discountAmount2.toFixed(2),
        finalPrice: final.toFixed(2),
        savings: discountAmount2.toFixed(2)
      };
    }
    const sale = Number.parseFloat(salePrice) || 0;
    const discountAmount = original - sale;
    const discountPercent = original > 0 ? discountAmount / original * 100 : 0;
    return {
      discountPercent: discountPercent.toFixed(2),
      discountAmount: discountAmount.toFixed(2),
      savings: discountAmount.toFixed(2)
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
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "percentage", className: "cursor-pointer", children: "From Discount %" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "amount", id: "amount" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "amount", className: "cursor-pointer", children: "From Sale Price" })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "original", className: "text-sm font-medium", children: "Original Price (₹)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "original",
            type: "number",
            min: "0",
            value: originalPrice,
            onChange: (e) => setOriginalPrice(e.target.value),
            placeholder: "e.g., 1000",
            className: "mt-2"
          }
        )
      ] }),
      mode === "percentage" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "discount", className: "text-sm font-medium", children: "Discount Percentage (%)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "discount",
            type: "number",
            min: "0",
            max: "100",
            value: discount,
            onChange: (e) => setDiscount(e.target.value),
            placeholder: "e.g., 20",
            className: "mt-2"
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "sale", className: "text-sm font-medium", children: "Sale Price (₹)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "sale",
            type: "number",
            min: "0",
            value: salePrice,
            onChange: (e) => setSalePrice(e.target.value),
            placeholder: "e.g., 800",
            className: "mt-2"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-primary/5 border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 space-y-4", children: [
      mode === "percentage" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center pb-2 border-b", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Discount Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg font-semibold text-red-600", children: [
            "₹",
            result.discountAmount
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Final Price" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-bold text-primary", children: [
            "₹",
            result.finalPrice
          ] })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center pb-2 border-b", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Discount Percentage" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg font-semibold text-red-600", children: [
            result.discountPercent,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "You Save" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-bold text-green-600", children: [
            "₹",
            result.discountAmount
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 border-t text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "You Save" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-bold text-green-600", children: [
          "₹",
          result.savings
        ] })
      ] })
    ] }) })
  ] });
}
function DiscountCalculatorPage({
  onBack
}) {
  reactExports.useEffect(() => {
    document.title = "Discount Calculator | Calculator Hub";
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "py-8 md:py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", onClick: onBack, className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
      "Back to Calculators"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold mb-3", children: "Discount Calculator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground", children: "Calculate discount amount and final price from original price." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DiscountCalculator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8 prose prose-sm max-w-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold mb-3", children: "About Discount Calculator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "Calculate discounts in two ways: enter discount percentage to find final price, or enter sale price to find discount percentage. Perfect for shopping, sales planning, and price comparisons." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "See exactly how much you save with clear breakdown of original price, discount amount, and final price." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "ad-container my-8 p-4 bg-muted/30 rounded-lg text-center text-sm text-muted-foreground", children: "Advertisement Space" })
    ] })
  ] }) });
}
export {
  DiscountCalculatorPage as default
};
