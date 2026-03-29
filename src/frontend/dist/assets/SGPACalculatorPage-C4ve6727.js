import { r as reactExports, j as jsxRuntimeExports } from "./index-YN_OslaE.js";
import { B as Button } from "./button-N_0YpN9P.js";
import { C as Card, d as CardContent } from "./card-njDO0RzR.js";
import { L as Label, I as Input } from "./input-BldACiYg.js";
import { T as Trash2 } from "./trash-2-CWVq57o4.js";
import { P as Plus } from "./plus-DE6Vx8Vi.js";
import { A as ArrowLeft } from "./arrow-left-C6-8XIiy.js";
import "./utils-Bmita3Ip.js";
function SGPACalculator() {
  const [courses, setCourses] = reactExports.useState([
    { id: "1", gradePoints: "", credits: "" }
  ]);
  const addCourse = () => {
    setCourses([
      ...courses,
      { id: Date.now().toString(), gradePoints: "", credits: "" }
    ]);
  };
  const removeCourse = (id) => {
    if (courses.length > 1) {
      setCourses(courses.filter((c) => c.id !== id));
    }
  };
  const updateCourse = (id, field, value) => {
    setCourses(
      courses.map((c) => c.id === id ? { ...c, [field]: value } : c)
    );
  };
  const calculateSGPA = () => {
    let totalGradePoints = 0;
    let totalCredits = 0;
    for (const course of courses) {
      const gp = Number.parseFloat(course.gradePoints) || 0;
      const cr = Number.parseFloat(course.credits) || 0;
      totalGradePoints += gp * cr;
      totalCredits += cr;
    }
    return totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : "0.00";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 space-y-4", children: [
      courses.map((course, _index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col sm:flex-row gap-3 items-start sm:items-end",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 w-full sm:w-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: `gp-${course.id}`, className: "text-sm", children: "Grade Points (0-10)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: `gp-${course.id}`,
                  type: "number",
                  min: "0",
                  max: "10",
                  step: "0.1",
                  value: course.gradePoints,
                  onChange: (e) => updateCourse(course.id, "gradePoints", e.target.value),
                  placeholder: "e.g., 8.5",
                  className: "mt-1"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 w-full sm:w-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: `cr-${course.id}`, className: "text-sm", children: "Credits" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: `cr-${course.id}`,
                  type: "number",
                  min: "0",
                  step: "0.5",
                  value: course.credits,
                  onChange: (e) => updateCourse(course.id, "credits", e.target.value),
                  placeholder: "e.g., 4",
                  className: "mt-1"
                }
              )
            ] }),
            courses.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                onClick: () => removeCourse(course.id),
                className: "text-destructive hover:text-destructive min-h-[44px] min-w-[44px]",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
              }
            )
          ]
        },
        course.id
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: addCourse,
          variant: "outline",
          className: "w-full sm:w-auto min-h-[44px]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
            "Add Course"
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-primary/5 border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-2", children: "Your SGPA" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl font-bold text-primary", children: calculateSGPA() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2", children: "on 10.0 scale" })
    ] }) }) })
  ] });
}
function SGPACalculatorPage({
  onBack
}) {
  reactExports.useEffect(() => {
    document.title = "SGPA Calculator | Calculator Hub";
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold mb-3", children: "SGPA Calculator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground", children: "Calculate your Semester Grade Point Average with course-wise grade input." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SGPACalculator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8 prose prose-sm max-w-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold mb-3", children: "About SGPA Calculator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "SGPA (Semester Grade Point Average) represents your academic performance for a single semester. Enter your course grade points (0-10 scale) and credit hours to calculate your SGPA instantly." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "The calculation uses the weighted average formula: SGPA = Σ(grade points × credits) / Σ(credits), giving you accurate results based on your course credits." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "ad-container my-8 p-4 bg-muted/30 rounded-lg text-center text-sm text-muted-foreground", children: "Advertisement Space" })
    ] })
  ] }) });
}
export {
  SGPACalculatorPage as default
};
