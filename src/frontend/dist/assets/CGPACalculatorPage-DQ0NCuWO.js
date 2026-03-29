import { r as reactExports, j as jsxRuntimeExports } from "./index-YN_OslaE.js";
import { B as Button } from "./button-N_0YpN9P.js";
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from "./card-njDO0RzR.js";
import { L as Label, I as Input } from "./input-BldACiYg.js";
import { T as Trash2 } from "./trash-2-CWVq57o4.js";
import { P as Plus } from "./plus-DE6Vx8Vi.js";
import { A as ArrowLeft } from "./arrow-left-C6-8XIiy.js";
import "./utils-Bmita3Ip.js";
function CGPACalculator() {
  const [semesters, setSemesters] = reactExports.useState([
    { id: "1", courses: [{ id: "1", gradePoints: "", credits: "" }] }
  ]);
  const addSemester = () => {
    setSemesters([
      ...semesters,
      {
        id: Date.now().toString(),
        courses: [{ id: Date.now().toString(), gradePoints: "", credits: "" }]
      }
    ]);
  };
  const removeSemester = (semesterId) => {
    if (semesters.length > 1) {
      setSemesters(semesters.filter((s) => s.id !== semesterId));
    }
  };
  const addCourse = (semesterId) => {
    setSemesters(
      semesters.map(
        (sem) => sem.id === semesterId ? {
          ...sem,
          courses: [
            ...sem.courses,
            { id: Date.now().toString(), gradePoints: "", credits: "" }
          ]
        } : sem
      )
    );
  };
  const removeCourse = (semesterId, courseId) => {
    setSemesters(
      semesters.map(
        (sem) => sem.id === semesterId && sem.courses.length > 1 ? { ...sem, courses: sem.courses.filter((c) => c.id !== courseId) } : sem
      )
    );
  };
  const updateCourse = (semesterId, courseId, field, value) => {
    setSemesters(
      semesters.map(
        (sem) => sem.id === semesterId ? {
          ...sem,
          courses: sem.courses.map(
            (c) => c.id === courseId ? { ...c, [field]: value } : c
          )
        } : sem
      )
    );
  };
  const calculateCGPA = () => {
    let totalGradePoints = 0;
    let totalCredits = 0;
    for (const sem of semesters) {
      for (const course of sem.courses) {
        const gp = Number.parseFloat(course.gradePoints) || 0;
        const cr = Number.parseFloat(course.credits) || 0;
        totalGradePoints += gp * cr;
        totalCredits += cr;
      }
    }
    return totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : "0.00";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    semesters.map((semester, semIndex) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-lg", children: [
          "Semester ",
          semIndex + 1
        ] }),
        semesters.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => removeSemester(semester.id),
            className: "text-destructive hover:text-destructive",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        semester.courses.map((course, _courseIndex) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col sm:flex-row gap-3 items-start sm:items-end",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 w-full sm:w-auto", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: `gp-${semester.id}-${course.id}`,
                    className: "text-sm",
                    children: "Grade Points (0-10)"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: `gp-${semester.id}-${course.id}`,
                    type: "number",
                    min: "0",
                    max: "10",
                    step: "0.1",
                    value: course.gradePoints,
                    onChange: (e) => updateCourse(
                      semester.id,
                      course.id,
                      "gradePoints",
                      e.target.value
                    ),
                    placeholder: "e.g., 8.5",
                    className: "mt-1"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 w-full sm:w-auto", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: `cr-${semester.id}-${course.id}`,
                    className: "text-sm",
                    children: "Credits"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: `cr-${semester.id}-${course.id}`,
                    type: "number",
                    min: "0",
                    step: "0.5",
                    value: course.credits,
                    onChange: (e) => updateCourse(
                      semester.id,
                      course.id,
                      "credits",
                      e.target.value
                    ),
                    placeholder: "e.g., 4",
                    className: "mt-1"
                  }
                )
              ] }),
              semester.courses.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  onClick: () => removeCourse(semester.id, course.id),
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
            variant: "outline",
            size: "sm",
            onClick: () => addCourse(semester.id),
            className: "w-full sm:w-auto min-h-[44px]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
              "Add Course"
            ]
          }
        )
      ] })
    ] }, semester.id)),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        onClick: addSemester,
        variant: "outline",
        className: "w-full min-h-[44px]",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
          "Add Semester"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-primary/5 border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-2", children: "Your CGPA" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl font-bold text-primary", children: calculateCGPA() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2", children: "on 10.0 scale" })
    ] }) }) })
  ] });
}
function CGPACalculatorPage({
  onBack
}) {
  reactExports.useEffect(() => {
    document.title = "CGPA Calculator | Calculator Hub";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Calculate your Cumulative Grade Point Average (CGPA) with semester-wise grade input and credit hours. Free online CGPA calculator with instant results."
      );
    }
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold mb-3", children: "CGPA Calculator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground", children: "Calculate your Cumulative Grade Point Average across multiple semesters with ease." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CGPACalculator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8 prose prose-sm max-w-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold mb-3", children: "About CGPA Calculator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "The CGPA (Cumulative Grade Point Average) Calculator helps students calculate their overall academic performance across multiple semesters. Simply add your semesters, enter the grade points and credits for each course, and get instant results." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "CGPA is calculated using the formula: CGPA = Σ(grade points × credits) / Σ(credits). This weighted average gives you an accurate representation of your academic standing on a 10.0 scale." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "This calculator is perfect for engineering students, university students, and anyone tracking their academic progress across multiple terms." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "ad-container my-8 p-4 bg-muted/30 rounded-lg text-center text-sm text-muted-foreground", children: "Advertisement Space" })
    ] })
  ] }) });
}
export {
  CGPACalculatorPage as default
};
