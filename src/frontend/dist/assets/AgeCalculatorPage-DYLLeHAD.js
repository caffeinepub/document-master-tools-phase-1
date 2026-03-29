import { c as createLucideIcon, j as jsxRuntimeExports, r as reactExports } from "./index-BK1nStnW.js";
import { A as AdPlaceholder } from "./AdPlaceholder-Hdfo7QJU.js";
import { B as BreadcrumbNavigation } from "./BreadcrumbNavigation-B800FblV.js";
import { B as Button } from "./button-CEbbI1IU.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from "./card-CY1lF6Ly.js";
import { C as Calculator } from "./calculator-LD0A6QP0.js";
import { H as Heart, D as DollarSign } from "./heart-C-qhNSNp.js";
import { F as FileText } from "./file-text-YB9xWdmA.js";
import { M as Minimize2 } from "./minimize-2-Dhw3ZIzi.js";
import { I as Image } from "./image-BxQbSDxC.js";
import { R as RelatedTools } from "./RelatedTools-2QMKGfoB.js";
import { S as SEO } from "./SEO-C_L06y5W.js";
import { L as Label, I as Input } from "./input-D5fftGWB.js";
import { A as ArrowLeft } from "./arrow-left-B6GHQD8m.js";
import { C as Clock } from "./clock-P7FjPfsa.js";
import "./house-DWCPoK9q.js";
import "./chevron-right-CZ2YD_lG.js";
import "./utils-Bmita3Ip.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M9 13v-1h6v1", key: "1bb014" }],
  ["path", { d: "M12 12v6", key: "3ahymv" }],
  ["path", { d: "M11 18h2", key: "12mj7e" }]
];
const FileType = createLucideIcon("file-type", __iconNode);
function CrossCategorySuggestions({
  currentCategory,
  onNavigate
}) {
  const allSuggestions = {
    calculator: [
      {
        page: "pdf-tools",
        name: "PDF Merge",
        description: "Combine multiple PDFs",
        icon: FileText,
        category: "PDF Tools"
      },
      {
        page: "pdf-tools",
        name: "PDF Compress",
        description: "Reduce PDF file size",
        icon: Minimize2,
        category: "PDF Tools"
      },
      {
        page: "image-compressor",
        name: "Image Compressor",
        description: "Compress images",
        icon: Image,
        category: "Image Tools"
      },
      {
        page: "passport-photo-maker",
        name: "Passport Photo",
        description: "Create passport photos",
        icon: Image,
        category: "Image Tools"
      }
    ],
    pdf: [
      {
        page: "gst-calculator",
        name: "GST Calculator",
        description: "Calculate GST amounts",
        icon: Calculator,
        category: "Calculators"
      },
      {
        page: "emi-calculator",
        name: "EMI Calculator",
        description: "Calculate loan EMI",
        icon: DollarSign,
        category: "Calculators"
      },
      {
        page: "image-compressor",
        name: "Image Compressor",
        description: "Compress images",
        icon: Image,
        category: "Image Tools"
      },
      {
        page: "jpg-to-png",
        name: "JPG to PNG",
        description: "Convert image formats",
        icon: FileType,
        category: "Image Tools"
      }
    ],
    image: [
      {
        page: "cgpa-calculator",
        name: "CGPA Calculator",
        description: "Calculate CGPA",
        icon: Calculator,
        category: "Calculators"
      },
      {
        page: "bmi-calculator",
        name: "BMI Calculator",
        description: "Calculate BMI",
        icon: Heart,
        category: "Calculators"
      },
      {
        page: "pdf-tools",
        name: "PDF Merge",
        description: "Combine PDFs",
        icon: FileText,
        category: "PDF Tools"
      },
      {
        page: "pdf-tools",
        name: "PDF Compress",
        description: "Reduce PDF size",
        icon: Minimize2,
        category: "PDF Tools"
      }
    ]
  };
  const suggestions = allSuggestions[currentCategory];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-12 pt-8 border-t", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-6", children: "You May Also Like" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: suggestions.map((suggestion) => {
      const Icon = suggestion.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "hover:shadow-lg hover:scale-105 hover:border-primary/50 transition-all duration-200 cursor-pointer",
          onClick: () => onNavigate(suggestion.page),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "card-padding", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium text-primary mb-2", children: suggestion.category }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: suggestion.name })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-sm", children: suggestion.description })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "card-padding pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                className: "w-full min-h-[44px]",
                onClick: () => onNavigate(suggestion.page),
                children: "Try Now →"
              }
            ) })
          ]
        },
        suggestion.page
      );
    }) })
  ] });
}
function SoftwareApplicationSchema({
  name,
  description,
  applicationCategory,
  applicationSubCategory,
  featureList,
  url
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    applicationCategory,
    applicationSubCategory,
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    },
    featureList,
    url,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.7",
      bestRating: "5",
      reviewCount: "1247"
    },
    review: [
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Rajesh Kumar"
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5"
        },
        reviewBody: "Excellent tool! Very accurate and easy to use. Saved me a lot of time."
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Priya Sharma"
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5"
        },
        reviewBody: "Perfect for my needs. Works great and completely free. Highly recommended!"
      }
    ]
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "script",
    {
      type: "application/ld+json",
      dangerouslySetInnerHTML: { __html: JSON.stringify(schema) }
    }
  );
}
function ToolCategories({
  onNavigate,
  activeCategory
}) {
  const categories = [
    {
      id: "calculators",
      name: "Calculator Hub",
      description: "20 calculators for academic, financial, and health calculations",
      icon: Calculator,
      count: 20,
      page: "calculators",
      category: "calculator"
    },
    {
      id: "pdf-tools",
      name: "PDF Tools",
      description: "16 tools for PDF processing, conversion, and security",
      icon: FileText,
      count: 16,
      page: "pdf-tools",
      category: "pdf"
    },
    {
      id: "image-tools",
      name: "Image Tools",
      description: "16 tools for image processing, resizing, and conversion",
      icon: Image,
      count: 16,
      page: "image-tools",
      category: "image"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-12 pt-8 border-t", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-6", children: "Explore More Tools" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: categories.map((category) => {
      const Icon = category.icon;
      const isActive = activeCategory === category.category;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: `hover:shadow-lg hover:scale-105 transition-all duration-200 ${isActive ? "border-primary bg-primary/5 dark:bg-primary/10" : ""}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "card-padding", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-12 h-12 rounded-lg flex items-center justify-center ${isActive ? "bg-primary/20" : "bg-primary/10"}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Icon,
                      {
                        className: `w-6 h-6 ${isActive ? "text-primary" : "text-primary"}`
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: category.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
                    category.count,
                    " tools"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: category.description })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "card-padding pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: () => onNavigate(category.page),
                variant: isActive ? "default" : "outline",
                className: "w-full min-h-[44px]",
                children: isActive ? "Current Category" : `Explore ${category.name}`
              }
            ) })
          ]
        },
        category.id
      );
    }) })
  ] });
}
function AgeCalculator() {
  const [birthDate, setBirthDate] = reactExports.useState("");
  const calculateAge = () => {
    if (!birthDate) return null;
    const birth = new Date(birthDate);
    const today = /* @__PURE__ */ new Date();
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();
    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    const totalMonths = years * 12 + months;
    const totalDays = Math.floor(
      (today.getTime() - birth.getTime()) / (1e3 * 60 * 60 * 24)
    );
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = totalDays * 24;
    const nextBirthday = new Date(
      today.getFullYear(),
      birth.getMonth(),
      birth.getDate()
    );
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const daysToNext = Math.floor(
      (nextBirthday.getTime() - today.getTime()) / (1e3 * 60 * 60 * 24)
    );
    const monthsToNext = Math.floor(daysToNext / 30);
    const remainingDays = daysToNext % 30;
    return {
      years,
      months,
      days,
      totalMonths,
      totalWeeks,
      totalDays,
      totalHours,
      nextBirthday: nextBirthday.toLocaleDateString(),
      daysToNext,
      monthsToNext,
      remainingDays
    };
  };
  const result = calculateAge();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "birthdate", className: "text-sm font-medium", children: "Date of Birth" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "birthdate",
          type: "date",
          value: birthDate,
          onChange: (e) => setBirthDate(e.target.value),
          max: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
          className: "mt-2"
        }
      )
    ] }) }),
    result && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-primary/5 border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-2", children: "Your Age" }),
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-3 text-sm", children: "Age Breakdown" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-background rounded border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-xs", children: "Total Months" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-lg", children: result.totalMonths })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-background rounded border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-xs", children: "Total Weeks" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-lg", children: result.totalWeeks })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-background rounded border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-xs", children: "Total Days" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-lg", children: result.totalDays })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-background rounded border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-xs", children: "Total Hours" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-lg", children: result.totalHours.toLocaleString() })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-green-50 dark:bg-green-950/20 border-green-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Next Birthday" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-green-600", children: result.nextBirthday }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          result.monthsToNext,
          " months and ",
          result.remainingDays,
          " days to go"
        ] })
      ] }) }) })
    ] })
  ] });
}
function AgeCalculatorPage({ onBack }) {
  const breadcrumbItems = [
    { label: "Home", onClick: () => window.history.back() },
    { label: "Calculators", onClick: onBack },
    { label: "Age Calculator" }
  ];
  const relatedTools = [
    {
      name: "Date Difference Calculator",
      description: "Calculate duration between two dates",
      icon: Calendar,
      onClick: () => window.history.back()
    },
    {
      name: "BMI Calculator",
      description: "Calculate Body Mass Index",
      icon: Heart,
      onClick: () => window.history.back()
    },
    {
      name: "Time Duration Calculator",
      description: "Calculate time differences",
      icon: Clock,
      onClick: () => window.history.back()
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SEO,
      {
        title: "Age Calculator - Calculate Exact Age | DocMaster",
        description: "Calculate your exact age in years, months, days, weeks, and hours from your date of birth. Get a countdown to your next birthday with our free online age calculator. Perfect for filling forms, tracking milestones, and age verification. Fast, accurate, and works directly in your browser with complete privacy.",
        canonicalUrl: `${window.location.origin}/age-calculator`
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SoftwareApplicationSchema,
      {
        name: "Age Calculator",
        description: "Calculate exact age from date of birth with birthday countdown",
        applicationCategory: "Calculator",
        applicationSubCategory: "Age Calculator",
        featureList: [
          "Calculate exact age in years, months, and days",
          "Show age in multiple units (weeks, hours, minutes)",
          "Display countdown to next birthday",
          "Instant calculation in browser",
          "Complete privacy - no data stored"
        ],
        url: `${window.location.origin}/age-calculator`
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "py-8 md:py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:grid lg:grid-cols-[1fr_200px] lg:gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              onClick: onBack,
              className: "mb-6 min-h-[44px] text-slate-200 hover:text-white hover:bg-gray-700",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
                "Back to Calculators"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbNavigation, { items: breadcrumbItems }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AdPlaceholder, { adType: "banner" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold mb-3", children: "Age Calculator with Birthday Countdown" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground", children: "Calculate exact age in years, months, days from date of birth." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AgeCalculator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AdPlaceholder, { adType: "in-content" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8 prose prose-sm max-w-none", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold mb-3", children: "About Age Calculator" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "Calculate your exact age in years, months, and days from your date of birth. Also see your age in total months, weeks, days, and hours. Get a countdown to your next birthday." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Perfect for filling forms, tracking milestones, or just satisfying your curiosity about your exact age." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(RelatedTools, { tools: relatedTools, category: "calculator" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CrossCategorySuggestions,
              {
                currentCategory: "calculator",
                onNavigate: (_page) => window.history.back()
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "hidden lg:block", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdPlaceholder, { adType: "sidebar" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ToolCategories,
        {
          onNavigate: (_page) => window.history.back(),
          activeCategory: "calculator"
        }
      )
    ] }) })
  ] });
}
export {
  AgeCalculatorPage as default
};
