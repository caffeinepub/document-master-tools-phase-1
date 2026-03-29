import { r as reactExports, j as jsxRuntimeExports } from "./index-YN_OslaE.js";
import { C as Card, d as CardContent } from "./card-njDO0RzR.js";
import { L as Label, I as Input } from "./input-BldACiYg.js";
import { R as RadioGroup, a as RadioGroupItem } from "./radio-group-D4a-zRwH.js";
import { B as Button } from "./button-N_0YpN9P.js";
import { A as ArrowLeft } from "./arrow-left-C6-8XIiy.js";
import "./utils-Bmita3Ip.js";
import "./index-B7n2t64q.js";
import "./index-DW4dOcDs.js";
import "./index-DyakJ80C.js";
import "./index-Xl3kZHcB.js";
function EMICalculator() {
  const [loanAmount, setLoanAmount] = reactExports.useState("");
  const [interestRate, setInterestRate] = reactExports.useState("");
  const [tenure, setTenure] = reactExports.useState("");
  const [tenureType, setTenureType] = reactExports.useState("years");
  const calculateEMI = () => {
    const P = Number.parseFloat(loanAmount) || 0;
    const annualRate = Number.parseFloat(interestRate) || 0;
    const R = annualRate / 12 / 100;
    const N = tenureType === "years" ? (Number.parseFloat(tenure) || 0) * 12 : Number.parseFloat(tenure) || 0;
    if (P === 0 || R === 0 || N === 0) {
      return { emi: "0.00", totalInterest: "0.00", totalAmount: "0.00" };
    }
    const emi = P * R * (1 + R) ** N / ((1 + R) ** N - 1);
    const totalAmount = emi * N;
    const totalInterest = totalAmount - P;
    return {
      emi: emi.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalAmount: totalAmount.toFixed(2)
    };
  };
  const result = calculateEMI();
  const principal = Number.parseFloat(loanAmount) || 0;
  const interest = Number.parseFloat(result.totalInterest);
  const interestPercentage = principal > 0 ? interest / (principal + interest) * 100 : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "loan-amount", className: "text-sm font-medium", children: "Loan Amount (₹)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "loan-amount",
            type: "number",
            min: "0",
            step: "1000",
            value: loanAmount,
            onChange: (e) => setLoanAmount(e.target.value),
            placeholder: "e.g., 500000",
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "interest-rate", className: "text-sm font-medium", children: "Annual Interest Rate (%)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "interest-rate",
            type: "number",
            min: "0",
            max: "100",
            step: "0.1",
            value: interestRate,
            onChange: (e) => setInterestRate(e.target.value),
            placeholder: "e.g., 10.5",
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "tenure", className: "text-sm font-medium", children: "Loan Tenure" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "tenure",
              type: "number",
              min: "0",
              step: "1",
              value: tenure,
              onChange: (e) => setTenure(e.target.value),
              placeholder: "e.g., 5",
              className: "flex-1"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            RadioGroup,
            {
              value: tenureType,
              onValueChange: (value) => setTenureType(value),
              className: "flex gap-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "years", id: "years" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "years", className: "cursor-pointer", children: "Years" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "months", id: "months" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "months", className: "cursor-pointer", children: "Months" })
                ] })
              ]
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-primary/5 border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center pb-4 border-b", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-2", children: "Monthly EMI" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-4xl font-bold text-primary", children: [
          "₹",
          result.emi
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center pb-2 border-b", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Principal Amount" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg font-semibold", children: [
          "₹",
          principal.toFixed(2)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center pb-2 border-b", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Total Interest" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg font-semibold text-orange-600", children: [
          "₹",
          result.totalInterest
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Total Amount" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xl font-bold", children: [
          "₹",
          result.totalAmount
        ] })
      ] }),
      principal > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 h-8 rounded overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "bg-primary flex items-center justify-center text-xs text-white font-medium",
            style: { width: `${100 - interestPercentage}%` },
            children: "Principal"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "bg-orange-500 flex items-center justify-center text-xs text-white font-medium",
            style: { width: `${interestPercentage}%` },
            children: "Interest"
          }
        )
      ] }) })
    ] }) }) })
  ] });
}
function EMICalculatorPage({ onBack }) {
  reactExports.useEffect(() => {
    document.title = "EMI Calculator | Calculator Hub";
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold mb-3", children: "EMI Calculator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground", children: "Calculate monthly EMI for loans with interest rate and tenure." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(EMICalculator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8 prose prose-sm max-w-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold mb-3", children: "About EMI Calculator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "Calculate your Equated Monthly Installment (EMI) for home loans, car loans, or personal loans. Enter loan amount, interest rate, and tenure to get monthly payment amount, total interest, and payment breakdown." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Formula: EMI = [P × R × (1+R)^N] / [(1+R)^N-1] where P is principal, R is monthly interest rate, and N is number of months." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "ad-container my-8 p-4 bg-muted/30 rounded-lg text-center text-sm text-muted-foreground", children: "Advertisement Space" })
    ] })
  ] }) });
}
export {
  EMICalculatorPage as default
};
