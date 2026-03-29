import { r as reactExports, j as jsxRuntimeExports } from "./index-YN_OslaE.js";
import { B as Button } from "./button-N_0YpN9P.js";
import { C as Card, d as CardContent } from "./card-njDO0RzR.js";
import { L as Label, I as Input } from "./input-BldACiYg.js";
import { R as RadioGroup, a as RadioGroupItem } from "./radio-group-D4a-zRwH.js";
import { T as Trash2 } from "./trash-2-CWVq57o4.js";
import { P as Plus } from "./plus-DE6Vx8Vi.js";
import { A as ArrowLeft } from "./arrow-left-C6-8XIiy.js";
import "./utils-Bmita3Ip.js";
import "./index-B7n2t64q.js";
import "./index-DW4dOcDs.js";
import "./index-DyakJ80C.js";
import "./index-Xl3kZHcB.js";
function GPACalculator() {
  const [scale, setScale] = reactExports.useState("10.0");
  const [courses, setCourses] = reactExports.useState([
    { id: "1", grade: "", credits: "" }
  ]);
  const maxGrade = scale === "4.0" ? 4 : 10;
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
      const grade = Number.parseFloat(course.grade) || 0;
      const cr = Number.parseFloat(course.credits) || 0;
      totalPoints += grade * cr;
      totalCredits += cr;
    }
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  };
  const getTotalCredits = () => {
    return courses.reduce((sum, c) => sum + (Number.parseFloat(c.credits) || 0), 0).toFixed(1);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium mb-3 block", children: "GPA Scale" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          RadioGroup,
          {
            value: scale,
            onValueChange: (value) => setScale(value),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "4.0", id: "scale-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "scale-4", className: "cursor-pointer", children: "4.0 Scale" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "10.0", id: "scale-10" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "scale-10", className: "cursor-pointer", children: "10.0 Scale" })
              ] })
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        courses.map((course) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col sm:flex-row gap-3 items-start sm:items-end",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 w-full sm:w-auto", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: `grade-${course.id}`, className: "text-sm", children: [
                  "Grade (0-",
                  maxGrade,
                  ")"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: `grade-${course.id}`,
                    type: "number",
                    min: "0",
                    max: maxGrade,
                    step: "0.1",
                    value: course.grade,
                    onChange: (e) => updateCourse(course.id, "grade", e.target.value),
                    placeholder: `e.g., ${maxGrade === 4 ? "3.5" : "8.5"}`,
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
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-primary/5 border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-2", children: "Your GPA" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl font-bold text-primary", children: calculateGPA() }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-2", children: [
          "on ",
          scale,
          " scale"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
        "Total Credits: ",
        getTotalCredits()
      ] })
    ] }) }) })
  ] });
}
function GPACalculatorPage({ onBack }) {
  reactExports.useEffect(() => {
    document.title = "GPA Calculator (4.0 & 10.0 Scale) | Calculator Hub";
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold mb-3", children: "GPA Calculator (4.0 & 10.0 Scale)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground", children: "Calculate your GPA on 4.0 or 10.0 scale with course-wise grade input." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(GPACalculator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8 prose prose-sm max-w-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold mb-3", children: "About GPA Calculator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "Calculate your Grade Point Average on either 4.0 scale (common in US universities) or 10.0 scale (common in Indian institutions). The calculator supports both scales with instant switching." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Enter your course grades and credit hours to calculate your weighted GPA and total credits attempted." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "ad-container my-8 p-4 bg-muted/30 rounded-lg text-center text-sm text-muted-foreground", children: "Advertisement Space" })
    ] })
  ] }) });
}
export {
  GPACalculatorPage as default
};
