import { r as reactExports, j as jsxRuntimeExports } from "./index-YN_OslaE.js";
import { A as Alert, a as AlertDescription } from "./alert-CB69UQX_.js";
import { C as Card, d as CardContent } from "./card-njDO0RzR.js";
import { L as Label, I as Input } from "./input-BldACiYg.js";
import { B as Button } from "./button-N_0YpN9P.js";
import { A as ArrowLeft } from "./arrow-left-C6-8XIiy.js";
import "./utils-Bmita3Ip.js";
function LoanCalculator() {
  const [loanAmount, setLoanAmount] = reactExports.useState("");
  const [interestRate, setInterestRate] = reactExports.useState("");
  const [monthlyPayment, setMonthlyPayment] = reactExports.useState("");
  const calculate = () => {
    const P = Number.parseFloat(loanAmount) || 0;
    const annualRate = Number.parseFloat(interestRate) || 0;
    const R = annualRate / 12 / 100;
    const M = Number.parseFloat(monthlyPayment) || 0;
    if (P === 0 || R === 0 || M === 0) {
      return {
        months: 0,
        years: "0.0",
        totalInterest: "0.00",
        totalAmount: "0.00",
        error: false
      };
    }
    const minPayment = P * R;
    if (M <= minPayment) {
      return {
        months: 0,
        years: "0.0",
        totalInterest: "0.00",
        totalAmount: "0.00",
        error: true
      };
    }
    const N = -Math.log(1 - P * R / M) / Math.log(1 + R);
    const totalAmount = M * N;
    const totalInterest = totalAmount - P;
    return {
      months: Math.ceil(N),
      years: (N / 12).toFixed(1),
      totalInterest: totalInterest.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
      error: false
    };
  };
  const result = calculate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "loan", className: "text-sm font-medium", children: "Loan Amount (₹)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "loan",
            type: "number",
            min: "0",
            value: loanAmount,
            onChange: (e) => setLoanAmount(e.target.value),
            placeholder: "e.g., 500000",
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
            value: interestRate,
            onChange: (e) => setInterestRate(e.target.value),
            placeholder: "e.g., 10.5",
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "payment", className: "text-sm font-medium", children: "Monthly Payment (₹)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "payment",
            type: "number",
            min: "0",
            value: monthlyPayment,
            onChange: (e) => setMonthlyPayment(e.target.value),
            placeholder: "e.g., 10000",
            className: "mt-2"
          }
        )
      ] })
    ] }) }),
    result.error && /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { variant: "destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: "Monthly payment is too low to cover interest. Increase the payment amount." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-primary/5 border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center pb-4 border-b", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-2", children: "Loan Tenure" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-4xl font-bold text-primary", children: [
          result.months,
          " months"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
          "(",
          result.years,
          " years)"
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Total Repayment" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xl font-bold", children: [
          "₹",
          result.totalAmount
        ] })
      ] })
    ] }) })
  ] });
}
function LoanCalculatorPage({
  onBack
}) {
  reactExports.useEffect(() => {
    document.title = "Loan Calculator | Calculator Hub";
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold mb-3", children: "Loan Calculator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground", children: "Calculate loan tenure and total interest from monthly payment amount." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoanCalculator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8 prose prose-sm max-w-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold mb-3", children: "About Loan Calculator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "Calculate how long it will take to repay a loan based on your monthly payment capacity. Enter loan amount, interest rate, and monthly payment to find out the tenure and total interest payable." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "The calculator validates that your monthly payment is sufficient to cover the interest, ensuring realistic repayment scenarios." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "ad-container my-8 p-4 bg-muted/30 rounded-lg text-center text-sm text-muted-foreground", children: "Advertisement Space" })
    ] })
  ] }) });
}
export {
  LoanCalculatorPage as default
};
