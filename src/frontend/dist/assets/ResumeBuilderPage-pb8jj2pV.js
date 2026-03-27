import { j as jsxRuntimeExports } from "./index-5lKdoCW0.js";
import { A as ArrowLeft } from "./arrow-left-CfDrezEV.js";
import { S as Star } from "./star-MoINLzQ9.js";
import { A as Award } from "./award-DphGkIWk.js";
import { C as Clock } from "./clock-C-NgO43w.js";
import { F as FileText } from "./file-text-BpiK45Ms.js";
import { C as ChevronRight } from "./chevron-right-Ci-Y7VDX.js";
const indianTemplates = [
  {
    id: "resume-fresher-india",
    title: "Indian Fresher",
    description: "Perfect for fresh graduates entering the Indian job market",
    tags: ["Fresher", "Entry Level", "Indian Format"],
    color: "from-blue-600 to-blue-800"
  },
  {
    id: "resume-experienced-india",
    title: "Experienced Professional",
    description: "For professionals with 2+ years of work experience",
    tags: ["Experienced", "Professional", "Corporate"],
    color: "from-green-600 to-green-800"
  },
  {
    id: "resume-professional-india",
    title: "IT & Software Engineer",
    description: "Tailored for IT and software development roles",
    tags: ["IT", "Software", "Tech"],
    color: "from-purple-600 to-purple-800"
  },
  {
    id: "resume-simple-india",
    title: "Simple & Clean",
    description: "Minimalist design that works for any industry",
    tags: ["Simple", "Clean", "Universal"],
    color: "from-slate-600 to-slate-800"
  },
  {
    id: "resume-government-india",
    title: "Government Job Resume",
    description: "Formatted for Indian government job applications",
    tags: ["Government", "PSU"],
    color: "from-red-600 to-red-800"
  },
  {
    id: "resume-academic-india",
    title: "Academic / Teacher",
    description: "For teaching professionals and academic positions",
    tags: ["Academic", "Teaching"],
    color: "from-cyan-600 to-cyan-800"
  },
  {
    id: "resume-creative-india",
    title: "Creative Portfolio",
    description: "For designers and creative professionals",
    tags: ["Creative", "Design"],
    color: "from-pink-600 to-pink-800"
  }
];
const internationalTemplates = [
  {
    id: "resume-fresher-intl",
    title: "International Modern",
    description: "Modern design for international job applications",
    tags: ["International", "Modern", "Global"],
    color: "from-orange-600 to-orange-800"
  },
  {
    id: "resume-experienced-intl",
    title: "US Format Resume",
    description: "Standard US resume format for American job market",
    tags: ["US Format", "American", "Standard"],
    color: "from-red-600 to-red-800"
  },
  {
    id: "resume-professional-intl",
    title: "UK CV Format",
    description: "British CV format for UK job applications",
    tags: ["UK CV", "British", "European"],
    color: "from-indigo-600 to-indigo-800"
  },
  {
    id: "resume-executive-intl",
    title: "Executive Resume",
    description: "For senior executives and C-level professionals",
    tags: ["Executive", "Senior"],
    color: "from-yellow-600 to-yellow-800"
  },
  {
    id: "resume-simple-intl",
    title: "ATS-Friendly Resume",
    description: "Optimized for Applicant Tracking Systems",
    tags: ["ATS", "Tech Companies"],
    color: "from-green-600 to-green-800"
  },
  {
    id: "resume-creative-intl",
    title: "Creative Portfolio",
    description: "Creative design for designers and artists",
    tags: ["Creative", "Design", "Portfolio"],
    color: "from-pink-600 to-pink-800"
  },
  {
    id: "resume-academic-intl",
    title: "Academic CV",
    description: "For researchers, professors, and academic positions",
    tags: ["Academic", "Research"],
    color: "from-teal-600 to-teal-800"
  }
];
function ResumeBuilderPage({
  onNavigate
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-screen py-8 px-4",
      style: { background: "linear-gradient(135deg, #0f172a, #1e293b)" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => onNavigate("home"),
            className: "flex items-center gap-2 text-slate-300 hover:text-white mb-8 transition-colors duration-200 group",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" }),
              "Back to Home"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold text-white mb-4", children: "Resume Builder" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 max-w-2xl mx-auto text-lg", children: "Create professional resumes with our easy-to-use templates. Download as PDF instantly." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12", children: [
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-5 h-5" }),
            title: "Professional Templates",
            description: "ATS-friendly designs"
          },
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-5 h-5" }),
            title: "Instant PDF Download",
            description: "Download in seconds"
          },
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5" }),
            title: "Easy to Customize",
            description: "Fill and download"
          }
        ].map((feature) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 flex items-center gap-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-blue-400 shrink-0", children: feature.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-semibold text-sm", children: feature.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 text-xs", children: feature.description })
              ] })
            ]
          },
          feature.title
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl md:text-2xl font-bold text-white mb-6", children: "Indian Resume Templates" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6", children: indianTemplates.map((template) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-gray-900 hover:bg-gray-800 rounded-xl overflow-hidden cursor-pointer transition-colors duration-200 ease-in-out border border-gray-700 hover:border-gray-500 group flex flex-col",
              onClick: () => onNavigate(template.id),
              onKeyDown: (e) => {
                if (e.key === "Enter" || e.key === " ")
                  onNavigate(template.id);
              },
              role: "button",
              tabIndex: 0,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `bg-gradient-to-br ${template.color} p-6 flex items-center justify-center`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-12 h-12 text-white opacity-80" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 sm:p-6 flex flex-col flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-semibold text-sm mb-2", children: template.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 text-xs mb-4 flex-1", children: template.description }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 mb-4", children: template.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "bg-gray-700 text-slate-300 text-xs px-2 py-0.5 rounded-full",
                      children: tag
                    },
                    tag
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      className: "w-full min-h-[48px] px-6 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-md flex items-center justify-center gap-1",
                      onClick: (e) => {
                        e.stopPropagation();
                        onNavigate(template.id);
                      },
                      children: [
                        "Use Template ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                      ]
                    }
                  )
                ] })
              ]
            },
            template.id
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl md:text-2xl font-bold text-white mb-6", children: "International Resume Templates" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6", children: internationalTemplates.map((template) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-gray-900 hover:bg-gray-800 rounded-xl overflow-hidden cursor-pointer transition-colors duration-200 ease-in-out border border-gray-700 hover:border-gray-500 group flex flex-col",
              onClick: () => onNavigate(template.id),
              onKeyDown: (e) => {
                if (e.key === "Enter" || e.key === " ")
                  onNavigate(template.id);
              },
              role: "button",
              tabIndex: 0,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `bg-gradient-to-br ${template.color} p-6 flex items-center justify-center`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-12 h-12 text-white opacity-80" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 sm:p-6 flex flex-col flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-semibold text-sm mb-2", children: template.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 text-xs mb-4 flex-1", children: template.description }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 mb-4", children: template.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "bg-gray-700 text-slate-300 text-xs px-2 py-0.5 rounded-full",
                      children: tag
                    },
                    tag
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      className: "w-full min-h-[48px] px-6 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-md flex items-center justify-center gap-1",
                      onClick: (e) => {
                        e.stopPropagation();
                        onNavigate(template.id);
                      },
                      children: [
                        "Use Template ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                      ]
                    }
                  )
                ] })
              ]
            },
            template.id
          )) })
        ] })
      ] })
    }
  );
}
export {
  ResumeBuilderPage as default
};
