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
function TimeDurationCalculator() {
  const [mode, setMode] = reactExports.useState("duration");
  const [startTime, setStartTime] = reactExports.useState("");
  const [endTime, setEndTime] = reactExports.useState("");
  const [baseTime, setBaseTime] = reactExports.useState("");
  const [hours, setHours] = reactExports.useState("");
  const [minutes, setMinutes] = reactExports.useState("");
  const [seconds, setSeconds] = reactExports.useState("");
  const calculateDuration = () => {
    if (mode === "duration") {
      if (!startTime || !endTime) return null;
      const start = /* @__PURE__ */ new Date(`2000-01-01T${startTime}:00`);
      let end = /* @__PURE__ */ new Date(`2000-01-01T${endTime}:00`);
      if (end < start) {
        end = /* @__PURE__ */ new Date(`2000-01-02T${endTime}:00`);
      }
      const diff = end.getTime() - start.getTime();
      const h2 = Math.floor(diff / (1e3 * 60 * 60));
      const m2 = Math.floor(diff % (1e3 * 60 * 60) / (1e3 * 60));
      const s2 = Math.floor(diff % (1e3 * 60) / 1e3);
      const totalMinutes = Math.floor(diff / (1e3 * 60));
      const totalSeconds = Math.floor(diff / 1e3);
      return { hours: h2, minutes: m2, seconds: s2, totalMinutes, totalSeconds };
    }
    if (!baseTime) return null;
    const base = /* @__PURE__ */ new Date(`2000-01-01T${baseTime}:00`);
    const h = Number.parseInt(hours) || 0;
    const m = Number.parseInt(minutes) || 0;
    const s = Number.parseInt(seconds) || 0;
    const totalMs = (h * 60 * 60 + m * 60 + s) * 1e3;
    const result2 = new Date(
      base.getTime() + (mode === "add" ? totalMs : -totalMs)
    );
    const resultTime = result2.toTimeString().slice(0, 8);
    return { resultTime };
  };
  const result = calculateDuration();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium mb-3 block", children: "Mode" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          RadioGroup,
          {
            value: mode,
            onValueChange: (value) => setMode(value),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "duration", id: "duration" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "duration", className: "cursor-pointer", children: "Calculate Duration" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "add", id: "add" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "add", className: "cursor-pointer", children: "Add Time" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "subtract", id: "subtract" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "subtract", className: "cursor-pointer", children: "Subtract Time" })
              ] })
            ] })
          }
        )
      ] }),
      mode === "duration" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "start", className: "text-sm font-medium", children: "Start Time" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "start",
              type: "time",
              value: startTime,
              onChange: (e) => setStartTime(e.target.value),
              className: "mt-2"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "end", className: "text-sm font-medium", children: "End Time" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "end",
              type: "time",
              value: endTime,
              onChange: (e) => setEndTime(e.target.value),
              className: "mt-2"
            }
          )
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "base", className: "text-sm font-medium", children: "Base Time" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "base",
              type: "time",
              value: baseTime,
              onChange: (e) => setBaseTime(e.target.value),
              className: "mt-2"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "hours", className: "text-sm font-medium", children: "Hours" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "hours",
                type: "number",
                min: "0",
                value: hours,
                onChange: (e) => setHours(e.target.value),
                placeholder: "0",
                className: "mt-2"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "minutes", className: "text-sm font-medium", children: "Minutes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "minutes",
                type: "number",
                min: "0",
                max: "59",
                value: minutes,
                onChange: (e) => setMinutes(e.target.value),
                placeholder: "0",
                className: "mt-2"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "seconds", className: "text-sm font-medium", children: "Seconds" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "seconds",
                type: "number",
                min: "0",
                max: "59",
                value: seconds,
                onChange: (e) => setSeconds(e.target.value),
                placeholder: "0",
                className: "mt-2"
              }
            )
          ] })
        ] })
      ] })
    ] }) }),
    result && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-primary/5 border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center space-y-4", children: mode === "duration" && "hours" in result ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-2", children: "Duration" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-4xl font-bold text-primary", children: [
          result.hours,
          "h ",
          result.minutes,
          "m ",
          result.seconds,
          "s"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 border-t grid grid-cols-2 gap-4 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "Total Minutes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-lg", children: result.totalMinutes })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "Total Seconds" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-lg", children: result.totalSeconds })
        ] })
      ] })
    ] }) : "resultTime" in result ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-2", children: "Result Time" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl font-bold text-primary", children: result.resultTime })
    ] }) : null }) }) })
  ] });
}
function TimeDurationCalculatorPage({
  onBack
}) {
  reactExports.useEffect(() => {
    document.title = "Time Duration Calculator | Calculator Hub";
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold mb-3", children: "Time Duration Calculator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground", children: "Calculate time duration between start and end time." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TimeDurationCalculator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8 prose prose-sm max-w-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold mb-3", children: "About Time Duration Calculator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "Calculate the duration between two times in hours, minutes, and seconds. Handles time spanning across midnight. Also supports adding or subtracting time periods." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Perfect for tracking work hours, calculating meeting durations, or planning schedules." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "ad-container my-8 p-4 bg-muted/30 rounded-lg text-center text-sm text-muted-foreground", children: "Advertisement Space" })
    ] })
  ] }) });
}
export {
  TimeDurationCalculatorPage as default
};
