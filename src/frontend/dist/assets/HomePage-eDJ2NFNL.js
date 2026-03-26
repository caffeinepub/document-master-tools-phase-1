import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports } from "./index-BFVPq1mW.js";
import { S as SEO } from "./SEO-B1UZw1Ql.js";
import { C as Calculator } from "./calculator-BCU0tUOV.js";
import { F as FileText } from "./file-text-1QFRj3ik.js";
import { I as Image } from "./image-Durwvjm5.js";
import { C as ChevronRight } from "./chevron-right-DG8wqv7r.js";
import { S as Star } from "./star-DHqiEO_I.js";
import { F as Flame } from "./flame-DlBUKuHI.js";
import { S as Shield, L as Layers, a as Scissors, F as FileImage, C as Camera } from "./shield-DtFhtjLe.js";
import { Z as Zap } from "./zap-DQK-4J8m.js";
import { A as Award } from "./award-CXhz2WwS.js";
import { C as Clock } from "./clock-8sw_aLdk.js";
import { B as BookOpen, F as FileOutput, P as Palette } from "./palette-DNDZ7r0Q.js";
import { D as DollarSign, H as Heart } from "./heart-Diz8J789.js";
import { M as Minimize2 } from "./minimize-2-JyIDY_z9.js";
import { R as RotateCcw } from "./rotate-ccw-CIFpfncy.js";
import { U as UserCheck, B as Briefcase, M as Maximize2, S as ScanLine } from "./user-check-CCiKhy54.js";
import { G as GraduationCap } from "./graduation-cap-BffQ--o3.js";
import { W as WandSparkles } from "./wand-sparkles-DgWV_qDJ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["line", { x1: "6", x2: "10", y1: "11", y2: "11", key: "1gktln" }],
  ["line", { x1: "8", x2: "8", y1: "9", y2: "13", key: "qnk9ow" }],
  ["line", { x1: "15", x2: "15.01", y1: "12", y2: "12", key: "krot7o" }],
  ["line", { x1: "18", x2: "18.01", y1: "10", y2: "10", key: "1lcuu1" }],
  [
    "path",
    {
      d: "M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z",
      key: "mfqc10"
    }
  ]
];
const Gamepad2 = createLucideIcon("gamepad-2", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M10 8h.01", key: "1r9ogq" }],
  ["path", { d: "M12 12h.01", key: "1mp3jc" }],
  ["path", { d: "M14 8h.01", key: "1primd" }],
  ["path", { d: "M16 12h.01", key: "1l6xoz" }],
  ["path", { d: "M18 8h.01", key: "emo2bl" }],
  ["path", { d: "M6 8h.01", key: "x9i8wu" }],
  ["path", { d: "M7 16h10", key: "wp8him" }],
  ["path", { d: "M8 12h.01", key: "czm47f" }],
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }]
];
const Keyboard = createLucideIcon("keyboard", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode);
function HomePage({ onNavigate }) {
  const [_hoveredCard, setHoveredCard] = reactExports.useState(null);
  const calculatorCategories = [
    {
      id: "academic",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-8 h-8" }),
      title: "Academic Calculators",
      description: "CGPA, SGPA, GPA, Grade Calculator and more",
      tools: [
        "CGPA Calculator",
        "SGPA Calculator",
        "GPA Calculator",
        "Grade Calculator",
        "Marks % Calculator"
      ],
      color: "from-blue-500 to-blue-700",
      page: "calculators"
    },
    {
      id: "financial",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "w-8 h-8" }),
      title: "Financial Calculators",
      description: "EMI, GST, Loan, Interest calculators",
      tools: [
        "EMI Calculator",
        "GST Calculator",
        "Loan Calculator",
        "Compound Interest",
        "Simple Interest"
      ],
      color: "from-green-500 to-green-700",
      page: "calculators"
    },
    {
      id: "health",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-8 h-8" }),
      title: "Health & Utility",
      description: "BMI, Age, Date, Time calculators",
      tools: [
        "BMI Calculator",
        "Age Calculator",
        "Date Difference",
        "Time Duration",
        "Discount Calculator"
      ],
      color: "from-red-500 to-red-700",
      page: "calculators"
    }
  ];
  const pdfTools = [
    {
      id: "merge",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-6 h-6" }),
      title: "Merge PDF",
      description: "Combine multiple PDFs into one"
    },
    {
      id: "split",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "w-6 h-6" }),
      title: "Split PDF",
      description: "Split PDF into multiple files"
    },
    {
      id: "compress",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Minimize2, { className: "w-6 h-6" }),
      title: "Compress PDF",
      description: "Reduce PDF file size"
    },
    {
      id: "pdf-to-word",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-6 h-6" }),
      title: "PDF to Word",
      description: "Convert PDF to editable Word"
    },
    {
      id: "word-to-pdf",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileOutput, { className: "w-6 h-6" }),
      title: "Word to PDF",
      description: "Convert Word docs to PDF"
    },
    {
      id: "pdf-to-jpg",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileImage, { className: "w-6 h-6" }),
      title: "PDF to JPG",
      description: "Extract images from PDF"
    },
    {
      id: "jpg-to-pdf",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-6 h-6" }),
      title: "JPG to PDF",
      description: "Convert images to PDF"
    },
    {
      id: "rotate",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-6 h-6" }),
      title: "Rotate PDF",
      description: "Rotate PDF pages"
    },
    {
      id: "watermark",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Palette, { className: "w-6 h-6" }),
      title: "Add Watermark",
      description: "Add watermark to PDF"
    },
    {
      id: "protect",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-6 h-6" }),
      title: "Protect PDF",
      description: "Password protect your PDF"
    },
    {
      id: "unlock",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-6 h-6" }),
      title: "Unlock PDF",
      description: "Remove PDF password"
    },
    {
      id: "page-numbers",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-6 h-6" }),
      title: "Page Numbers",
      description: "Add page numbers to PDF"
    },
    {
      id: "pdf-to-png",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-6 h-6" }),
      title: "PDF to PNG",
      description: "Convert PDF pages to PNG"
    },
    {
      id: "png-to-pdf",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileOutput, { className: "w-6 h-6" }),
      title: "PNG to PDF",
      description: "Convert PNG images to PDF"
    },
    {
      id: "excel-to-pdf",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-6 h-6" }),
      title: "Excel to PDF",
      description: "Convert Excel to PDF"
    },
    {
      id: "pdf-to-excel",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-6 h-6" }),
      title: "PDF to Excel",
      description: "Convert PDF to Excel"
    }
  ];
  const imageTools = [
    {
      id: "passport-photo",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-6 h-6" }),
      title: "Passport Photo Maker",
      description: "Create standard passport photos"
    },
    {
      id: "aadhaar-photo",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-6 h-6" }),
      title: "Aadhaar Photo Resize",
      description: "Resize photos for Aadhaar card"
    },
    {
      id: "pan-photo",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-6 h-6" }),
      title: "PAN Photo Resize",
      description: "Resize photos for PAN card"
    },
    {
      id: "ssc-photo",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "w-6 h-6" }),
      title: "SSC Photo Resize",
      description: "Resize for SSC exam forms"
    },
    {
      id: "railway-photo",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-6 h-6" }),
      title: "Railway Photo Resize",
      description: "Resize for Railway recruitment"
    },
    {
      id: "police-army-photo",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-6 h-6" }),
      title: "Police/Army Photo",
      description: "Resize for Police/Army forms"
    },
    {
      id: "visa-photo",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-6 h-6" }),
      title: "Visa Photo Resize",
      description: "Resize for visa applications"
    },
    {
      id: "signature-resize",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Palette, { className: "w-6 h-6" }),
      title: "Signature Resize",
      description: "Resize signature images"
    },
    {
      id: "image-compressor",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Minimize2, { className: "w-6 h-6" }),
      title: "Image Compressor",
      description: "Compress images without quality loss"
    },
    {
      id: "image-cropper",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "w-6 h-6" }),
      title: "Image Cropper",
      description: "Crop images to any size"
    },
    {
      id: "dpi-changer",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize2, { className: "w-6 h-6" }),
      title: "DPI Changer",
      description: "Change image DPI/resolution"
    },
    {
      id: "custom-resize",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize2, { className: "w-6 h-6" }),
      title: "Custom Image Resize",
      description: "Resize to any custom dimensions"
    },
    {
      id: "jpg-to-png",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileImage, { className: "w-6 h-6" }),
      title: "JPG to PNG",
      description: "Convert JPG images to PNG"
    },
    {
      id: "png-to-jpg",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileImage, { className: "w-6 h-6" }),
      title: "PNG to JPG",
      description: "Convert PNG images to JPG"
    },
    {
      id: "webp-converter",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileImage, { className: "w-6 h-6" }),
      title: "WebP Converter",
      description: "Convert images to/from WebP"
    },
    {
      id: "background-remover",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-6 h-6" }),
      title: "Background Remover",
      description: "Remove image backgrounds"
    }
  ];
  const proTools = [
    {
      id: "ai-document-enhancer",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(WandSparkles, { className: "w-6 h-6" }),
      title: "AI Document Enhancer",
      description: "AI-powered document enhancement",
      badge: "PRO"
    },
    {
      id: "smart-document-fixer",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ScanLine, { className: "w-6 h-6" }),
      title: "Smart Document Fixer",
      description: "Fix scanned document quality",
      badge: "PRO"
    }
  ];
  const resumeTemplates = [
    {
      id: "indian-fresher",
      title: "Indian Fresher",
      description: "Perfect for fresh graduates"
    },
    {
      id: "experienced-professional",
      title: "Experienced Professional",
      description: "For 2+ years experience"
    },
    {
      id: "it-software",
      title: "IT & Software",
      description: "Tech industry focused"
    },
    {
      id: "simple-clean",
      title: "Simple & Clean",
      description: "Minimalist design"
    }
  ];
  const trustBadges = [
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-6 h-6" }),
      title: "10 Lakh+ Users",
      description: "Trusted by millions"
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-6 h-6" }),
      title: "100% Private",
      description: "Files never stored"
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-6 h-6" }),
      title: "Instant Processing",
      description: "Results in seconds"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SEO,
      {
        title: "DocMasterTools.com – Free Online Document, PDF, Image & Typing Tools",
        description: "Free online tools for PDF, image editing, resume builder, calculators, and typing tests. All processing done locally in your browser – no uploads, no data stored.",
        canonicalUrl: "https://docmastertools.com/"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 md:py-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-blue-900/20 to-orange-900/20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-6xl mx-auto px-4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: "/assets/generated/docmastertools-logo.dim_540x270.png",
            alt: "DocMasterTools",
            className: "w-[120px] sm:w-[180px] max-w-[180px] h-auto block mx-auto"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl md:text-5xl font-bold mb-4 text-white", children: [
          "Welcome to",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-orange-400", children: "DocMasterTools.com" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg md:text-xl text-slate-300 mb-8 max-w-3xl mx-auto", children: "Your all-in-one platform for document processing, image tools, calculators, and resume building. Fast, free, and 100% private — all processing happens in your browser." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-center gap-4 mb-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => onNavigate("calculators"),
              className: "bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calculator, { className: "w-5 h-5" }),
                "Try Calculators"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => onNavigate("pdf-tools"),
              className: "bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5" }),
                "PDF Tools"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => onNavigate("image-tools"),
              className: "bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-5 h-5" }),
                "Image Tools"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto", children: trustBadges.map((badge) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-orange-400 shrink-0", children: badge.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-white text-sm", children: badge.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-slate-300 text-xs", children: badge.description })
              ] })
            ]
          },
          badge.title
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12 md:py-16 bg-slate-800", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-white mb-3", children: "Calculator Hub" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 max-w-2xl mx-auto", children: "Powerful calculators for academic, financial, and health needs" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8", children: calculatorCategories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-slate-700 hover:bg-slate-600 rounded-xl p-6 cursor-pointer transition-all duration-200 hover:shadow-xl hover:scale-105 border border-slate-600 hover:border-slate-500",
          onClick: () => onNavigate("calculators"),
          onKeyDown: (e) => {
            if (e.key === "Enter" || e.key === " ")
              onNavigate("calculators");
          },
          onMouseEnter: () => setHoveredCard(cat.id),
          onMouseLeave: () => setHoveredCard(null),
          role: "button",
          tabIndex: 0,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `inline-flex p-3 rounded-lg bg-gradient-to-br ${cat.color} text-white mb-4`,
                children: cat.icon
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-white mb-2", children: cat.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 text-sm mb-4", children: cat.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: cat.tools.slice(0, 3).map((tool) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "li",
              {
                className: "text-slate-400 text-xs flex items-center gap-1",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3 text-blue-400" }),
                  tool
                ]
              },
              tool
            )) })
          ]
        },
        cat.id
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => onNavigate("calculators"),
          className: "bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg inline-flex items-center gap-2",
          children: [
            "View All Calculators ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
          ]
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12 md:py-16 bg-slate-900", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-white mb-3", children: "PDF Tools" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 max-w-2xl mx-auto", children: "Complete PDF toolkit — merge, split, compress, convert and more" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8", children: pdfTools.map((tool) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-slate-800 hover:bg-slate-700 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:shadow-lg border border-slate-700 hover:border-slate-500 group",
          onClick: () => onNavigate(`pdf-tools/${tool.id}`),
          onKeyDown: (e) => {
            if (e.key === "Enter" || e.key === " ")
              onNavigate(`pdf-tools/${tool.id}`);
          },
          role: "button",
          tabIndex: 0,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-orange-400 mb-3 group-hover:scale-110 transition-transform duration-200", children: tool.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-semibold text-sm mb-1", children: tool.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-xs", children: tool.description })
          ]
        },
        tool.id
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => onNavigate("pdf-tools"),
          className: "bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg inline-flex items-center gap-2",
          children: [
            "View All PDF Tools ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
          ]
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12 md:py-16 bg-slate-800", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-white mb-3", children: "Image Tools" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 max-w-2xl mx-auto", children: "Resize, compress, convert and enhance images — all free, all private" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8", children: imageTools.map((tool) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-slate-700 hover:bg-slate-600 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:shadow-lg border border-slate-600 hover:border-slate-400 group",
          onClick: () => onNavigate(`image-tools/${tool.id}`),
          onKeyDown: (e) => {
            if (e.key === "Enter" || e.key === " ")
              onNavigate(`image-tools/${tool.id}`);
          },
          role: "button",
          tabIndex: 0,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-green-400 mb-3 group-hover:scale-110 transition-transform duration-200", children: tool.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-semibold text-sm mb-1", children: tool.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-xs", children: tool.description })
          ]
        },
        tool.id
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-bold text-white mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-5 h-5 text-yellow-400" }),
          "Pro Tools"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: proTools.map((tool) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:shadow-lg border border-yellow-500/30 hover:border-yellow-500/60 group",
            onClick: () => onNavigate(`image-tools/${tool.id}`),
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === " ")
                onNavigate(`image-tools/${tool.id}`);
            },
            role: "button",
            tabIndex: 0,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-yellow-400 shrink-0 group-hover:scale-110 transition-transform duration-200", children: tool.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-white font-semibold text-sm", children: tool.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded-full shrink-0", children: tool.badge })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 text-xs", children: tool.description })
              ] })
            ] })
          },
          tool.id
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => onNavigate("image-tools"),
          className: "bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg inline-flex items-center gap-2",
          children: [
            "View All Image Tools ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
          ]
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12 md:py-16 bg-slate-900", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-white mb-3", children: "Resume Builder" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 max-w-2xl mx-auto", children: "Create professional resumes with our easy-to-use templates" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8", children: resumeTemplates.map((template) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-slate-800 hover:bg-slate-700 rounded-xl p-5 cursor-pointer transition-all duration-200 hover:shadow-lg border border-slate-700 hover:border-slate-500 group text-center",
          onClick: () => onNavigate(`resume-builder/${template.id}`),
          onKeyDown: (e) => {
            if (e.key === "Enter" || e.key === " ")
              onNavigate(`resume-builder/${template.id}`);
          },
          role: "button",
          tabIndex: 0,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-6 h-6 text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-semibold text-sm mb-1", children: template.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-xs", children: template.description })
          ]
        },
        template.id
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => onNavigate("resume-builder"),
          className: "bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg inline-flex items-center gap-2",
          children: [
            "View All Templates ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
          ]
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12 md:py-16 bg-slate-800", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-white mb-3", children: "Typing Tools" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 max-w-2xl mx-auto", children: "Test and improve your typing speed and accuracy" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-slate-700 hover:bg-slate-600 rounded-xl p-5 cursor-pointer transition-all duration-200 hover:shadow-lg border border-slate-600 hover:border-slate-400 group",
            onClick: () => onNavigate("typing-test"),
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === " ")
                onNavigate("typing-test");
            },
            role: "button",
            tabIndex: 0,
            "data-ocid": "typing_test.card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-blue-400 mb-3 group-hover:scale-110 transition-transform duration-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Keyboard, { className: "w-6 h-6" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-semibold text-sm mb-1", children: "Typing Test" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-xs", children: "Test WPM, accuracy & mistakes — 1, 3 or 5 minute tests" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-slate-700 hover:bg-slate-600 rounded-xl p-5 cursor-pointer transition-all duration-200 hover:shadow-lg border border-slate-600 hover:border-slate-400 group",
            onClick: () => onNavigate("typing-games"),
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === " ")
                onNavigate("typing-games");
            },
            role: "button",
            tabIndex: 0,
            "data-ocid": "typing_games.card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-purple-400 mb-3 group-hover:scale-110 transition-transform duration-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Gamepad2, { className: "w-6 h-6" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-semibold text-sm mb-1", children: "Typing Games" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-xs", children: "Speed Race, Falling Words & Word Shooter — learn by playing" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-slate-700 hover:bg-slate-600 rounded-xl p-5 cursor-pointer transition-all duration-200 hover:shadow-lg border border-slate-600 hover:border-slate-400 group",
            onClick: () => onNavigate("daily-typing-challenge"),
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === " ")
                onNavigate("daily-typing-challenge");
            },
            role: "button",
            tabIndex: 0,
            "data-ocid": "daily_typing_challenge.card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-orange-400 mb-3 group-hover:scale-110 transition-transform duration-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-6 h-6" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-semibold text-sm mb-1", children: "Daily Typing Challenge" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-xs", children: "New challenge every day — compete on today's leaderboard" })
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12 md:py-16 bg-slate-900", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-white mb-3", children: "Why Choose DocMasterTools?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300", children: "Built for speed, privacy, and ease of use" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6", children: [
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-8 h-8" }),
          title: "100% Private",
          description: "All processing happens in your browser. Your files never leave your device.",
          color: "text-blue-400"
        },
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-8 h-8" }),
          title: "Lightning Fast",
          description: "Instant results with client-side processing. No waiting for server uploads.",
          color: "text-yellow-400"
        },
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-8 h-8" }),
          title: "Completely Free",
          description: "All basic tools are free forever. No hidden charges or subscriptions.",
          color: "text-green-400"
        },
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-8 h-8" }),
          title: "High Quality",
          description: "Professional-grade output quality for all your document needs.",
          color: "text-orange-400"
        },
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-8 h-8" }),
          title: "Trusted by Millions",
          description: "Over 10 lakh users trust DocMasterTools for their daily document needs.",
          color: "text-purple-400"
        },
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-8 h-8" }),
          title: "Always Available",
          description: "Available 24/7 with no downtime. Process documents anytime, anywhere.",
          color: "text-red-400"
        }
      ].map((feature) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-slate-700 rounded-xl p-6 border border-slate-600",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${feature.color} mb-4`, children: feature.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-bold text-lg mb-2", children: feature.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 text-sm", children: feature.description })
          ]
        },
        feature.title
      )) })
    ] }) })
  ] });
}
export {
  HomePage as default
};
