import { r as reactExports, j as jsxRuntimeExports } from "./index-BFVPq1mW.js";
import { C as Card, d as CardContent, B as Button } from "./card-BJcsF60x.js";
import { L as Label, I as Input } from "./input-Djza26gp.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BshjgHB9.js";
import { T as Trash2 } from "./trash-2-DoNBwk_V.js";
import { P as Plus } from "./plus-BdT6dVkJ.js";
import { A as ArrowLeft } from "./arrow-left-ByehoCcW.js";
import "./utils-BpWBj8TO.js";
import "./index-IXOTxK3N.js";
import "./index-NoZ9Ynb9.js";
import "./index-Bz7eJ3CA.js";
const gradeScale = {
  "A+": 10,
  A: 9,
  "B+": 8,
  B: 7,
  "C+": 6,
  C: 5,
  D: 4,
  E: 3,
  F: 0
};
function GradeCalculator() {
  const [courses, setCourses] = reactExports.useState([
    { id: "1", grade: "", credits: "" }
  ]);
  const addCourse = () => {
    setCourses([
      ...courses,
      { id: Date.now().toString(), grade: "", credits: "" }
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
  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;
    for (const course of courses) {
      const points = gradeScale[course.grade] || 0;
      const cr = Number.parseFloat(course.credits) || 0;
      totalPoints += points * cr;
      totalCredits += cr;
    }
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 space-y-4", children: [
      courses.map((course) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col sm:flex-row gap-3 items-start sm:items-end",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 w-full sm:w-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: `grade-${course.id}`, className: "text-sm", children: "Letter Grade" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: course.grade,
                  onValueChange: (value) => updateCourse(course.id, "grade", value),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: `grade-${course.id}`, className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select grade" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.keys(gradeScale).map((grade) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: grade, children: [
                      grade,
                      " (",
                      gradeScale[grade],
                      " points)"
                    ] }, grade)) })
                  ]
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
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-muted/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-3 text-sm", children: "Grade Scale Reference" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-5 gap-2 text-xs", children: Object.entries(gradeScale).map(([grade, points]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "p-2 bg-background rounded border text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: grade }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: points })
          ]
        },
        grade
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-primary/5 border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-2", children: "Your GPA" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl font-bold text-primary", children: calculateGPA() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2", children: "on 10.0 scale" })
    ] }) }) })
  ] });
}
function GradeCalculatorPage({
  onBack
}) {
  reactExports.useEffect(() => {
    document.title = "Grade Calculator | Calculator Hub";
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "py-8 md:py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", onClick: onBack, className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
      "Back to Calculators"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold mb-3", children: "Grade Calculator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground", children: "Convert letter grades (A+, A, B, C, etc.) to grade points and calculate GPA." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(GradeCalculator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8 prose prose-sm max-w-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold mb-3", children: "About Grade Calculator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "The Grade Calculator converts letter grades to numerical grade points and calculates your overall GPA. The standard scale assigns A+ = 10, A = 9, B+ = 8, and so on." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Enter your letter grades and credit hours for each course to get your weighted GPA instantly." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "ad-container my-8 p-4 bg-muted/30 rounded-lg text-center text-sm text-muted-foreground", children: "Advertisement Space" })
    ] })
  ] }) });
}
export {
  GradeCalculatorPage as default
};
