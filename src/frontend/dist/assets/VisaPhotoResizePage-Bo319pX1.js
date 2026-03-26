import { j as jsxRuntimeExports } from "./index-BFVPq1mW.js";
import { B as BreadcrumbNavigation } from "./BreadcrumbNavigation--lqDW6Jm.js";
import { S as SEO } from "./SEO-B1UZw1Ql.js";
import { P as PhotoResizeTool } from "./PhotoResizeTool-BUvnPC5m.js";
import "./house-77t33SZD.js";
import "./chevron-right-DG8wqv7r.js";
import "./input-Djza26gp.js";
import "./utils-BpWBj8TO.js";
import "./select-BshjgHB9.js";
import "./index-IXOTxK3N.js";
import "./index-NoZ9Ynb9.js";
import "./index-Bz7eJ3CA.js";
import "./slider-zTP7hDLk.js";
import "./AdvancedToolShell-DdiXJmHk.js";
import "./upload-B2bz0haG.js";
import "./circle-check-big-ChSD8Z6F.js";
import "./circle-alert-utpcndfh.js";
import "./eye-yE3rb4-E.js";
import "./download-BN8DLBPc.js";
import "./zap-DQK-4J8m.js";
import "./arrow-up-DKAXTu6o.js";
const visaPresets = [
  {
    label: "US Visa (2×2 inch)",
    width: 600,
    height: 600,
    unit: "px",
    maxSizeKB: 240
  },
  {
    label: "UK Visa (35×45mm)",
    width: 413,
    height: 531,
    unit: "px",
    maxSizeKB: 100
  },
  {
    label: "Schengen Visa (35×45mm)",
    width: 413,
    height: 531,
    unit: "px",
    maxSizeKB: 100
  },
  {
    label: "Canada Visa (50×70mm)",
    width: 591,
    height: 827,
    unit: "px",
    maxSizeKB: 240
  },
  {
    label: "Australia Visa (35×45mm)",
    width: 413,
    height: 531,
    unit: "px",
    maxSizeKB: 100
  }
];
function VisaPhotoResizePage({
  onNavigate
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen py-8 px-4",
      style: { background: "linear-gradient(135deg, #0f172a, #1e293b)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SEO,
          {
            title: "Visa Photo Resize Online Free | DocMasterTools",
            description: "Resize photos for US, UK, Schengen, Canada, and Australia visa applications online for free.",
            canonicalUrl: "https://docmastertools.com/image-tools/visa-photo"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            BreadcrumbNavigation,
            {
              items: [
                {
                  label: "Image Tools",
                  onClick: () => onNavigate == null ? void 0 : onNavigate("image-tools")
                },
                { label: "Visa Photo Resize" }
              ],
              onNavigate
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-bold text-white mb-3", children: "Visa Photo Resize" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 max-w-2xl mx-auto", children: "Resize your photo to exact visa specifications for US, UK, Schengen, Canada, and Australia applications." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            PhotoResizeTool,
            {
              presets: visaPresets,
              toolTitle: "Visa Photo Resize",
              defaultPresetIndex: 0
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-white mb-3", children: "Visa Photo Requirements" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 text-sm mb-3", children: "Different countries have specific visa photo requirements. Our tool supports all major visa formats." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-slate-300 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400 mt-0.5", children: "•" }),
                "US Visa: 2×2 inch (51×51mm), white background"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400 mt-0.5", children: "•" }),
                "UK/Schengen: 35×45mm"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400 mt-0.5", children: "•" }),
                "Canada: 50×70mm"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400 mt-0.5", children: "•" }),
                "Australia: 35×45mm"
              ] })
            ] })
          ] })
        ] })
      ]
    }
  );
}
export {
  VisaPhotoResizePage as default
};
