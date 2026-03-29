import { r as reactExports, j as jsxRuntimeExports } from "./index-YN_OslaE.js";
import { C as Card, d as CardContent } from "./card-njDO0RzR.js";
import { C as Checkbox } from "./checkbox-F3sAUWdy.js";
import { L as Label, I as Input } from "./input-BldACiYg.js";
import { B as Button } from "./button-N_0YpN9P.js";
import { A as ArrowLeft } from "./arrow-left-C6-8XIiy.js";
import "./utils-Bmita3Ip.js";
import "./index-B7n2t64q.js";
import "./index-Xl3kZHcB.js";
function DateDifferenceCalculator() {
  const [startDate, setStartDate] = reactExports.useState("");
  const [endDate, setEndDate] = reactExports.useState("");
  const [excludeWeekends, setExcludeWeekends] = reactExports.useState(false);
  const calculateDifference = () => {
    if (!startDate || !endDate) return null;
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end < start) return null;
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();
    if (days < 0) {
      months--;
      const lastMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      days += lastMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    const totalDays = Math.floor(
      (end.getTime() - start.getTime()) / (1e3 * 60 * 60 * 24)
    );
    const totalWeeks = Math.floor(totalDays / 7);
    let weekdays = totalDays;
    if (excludeWeekends) {
      weekdays = 0;
      const current = new Date(start);
      while (current <= end) {
        const day = current.getDay();
        if (day !== 0 && day !== 6) {
          weekdays++;
        }
        current.setDate(current.getDate() + 1);
      }
    }
    return { years, months, days, totalWeeks, totalDays, weekdays };
  };
  const result = calculateDifference();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "start", className: "text-sm font-medium", children: "Start Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "start",
            type: "date",
            value: startDate,
            onChange: (e) => setStartDate(e.target.value),
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "end", className: "text-sm font-medium", children: "End Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "end",
            type: "date",
            value: endDate,
            onChange: (e) => setEndDate(e.target.value),
            className: "mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Checkbox,
          {
            id: "weekends",
            checked: excludeWeekends,
            onCheckedChange: (checked) => setExcludeWeekends(checked)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "weekends", className: "text-sm cursor-pointer", children: "Exclude weekends (count only weekdays)" })
      ] })
    ] }) }),
    result && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-primary/5 border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-2", children: "Difference" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-4xl font-bold text-primary", children: [
          result.years,
          " years, ",
          result.months,
          " months, ",
          result.days,
          " ",
          "days"
        ] })
      ] }) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-muted/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-3 text-sm", children: "Total Duration" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-background rounded border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-xs", children: "Total Weeks" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-lg", children: result.totalWeeks })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-background rounded border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-xs", children: "Total Days" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-lg", children: result.totalDays })
          ] }),
          excludeWeekends && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-background rounded border col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-xs", children: "Weekdays Only" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold text-lg", children: [
              result.weekdays,
              " days"
            ] })
          ] })
        ] })
      ] }) })
    ] })
  ] });
}
function DateDifferenceCalculatorPage({
  onBack
}) {
  reactExports.useEffect(() => {
    document.title = "Date Difference Calculator | Calculator Hub";
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold mb-3", children: "Date Difference Calculator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground", children: "Calculate difference between two dates in years, months, days." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DateDifferenceCalculator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8 prose prose-sm max-w-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold mb-3", children: "About Date Difference Calculator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "Calculate the exact difference between two dates in years, months, and days. Also see total difference in weeks and days. Option to exclude weekends for business day calculations." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Useful for project planning, calculating employment duration, tracking relationships, or any time-based calculations." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "ad-container my-8 p-4 bg-muted/30 rounded-lg text-center text-sm text-muted-foreground", children: "Advertisement Space" })
    ] })
  ] }) });
}
export {
  DateDifferenceCalculatorPage as default
};
