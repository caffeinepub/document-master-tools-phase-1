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
const policeArmyPresets = [
  {
    label: "Police Recruitment (200×230px)",
    width: 200,
    height: 230,
    unit: "px",
    maxSizeKB: 50
  },
  {
    label: "Army Recruitment (200×230px)",
    width: 200,
    height: 230,
    unit: "px",
    maxSizeKB: 50
  },
  {
    label: "CAPF (200×230px)",
    width: 200,
    height: 230,
    unit: "px",
    maxSizeKB: 50
  },
  {
    label: "BSF/CRPF (200×230px)",
    width: 200,
    height: 230,
    unit: "px",
    maxSizeKB: 50
  }
];
function PoliceArmyPhotoPage({
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
            title: "Police Army CAPF Photo Resize Online Free | DocMasterTools",
            description: "Resize photos for Police, Army, CAPF, BSF, and CRPF recruitment forms online for free.",
            canonicalUrl: "https://docmastertools.com/image-tools/police-army-photo"
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
                { label: "Police/Army Photo" }
              ],
              onNavigate
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-bold text-white mb-3", children: "Police & Army Photo Resize" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 max-w-2xl mx-auto", children: "Resize your photo to exact specifications for Police, Army, CAPF, BSF, and CRPF recruitment forms." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            PhotoResizeTool,
            {
              presets: policeArmyPresets,
              toolTitle: "Police/Army Photo Resize",
              defaultPresetIndex: 0
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-white mb-3", children: "Police & Army Photo Requirements" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 text-sm mb-3", children: "All central police and paramilitary forces require standardized photo dimensions for recruitment applications." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-slate-300 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400 mt-0.5", children: "•" }),
                "Standard size: 200×230 pixels"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400 mt-0.5", children: "•" }),
                "File size: max 50KB"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400 mt-0.5", children: "•" }),
                "Format: JPEG/JPG"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400 mt-0.5", children: "•" }),
                "White or light background"
              ] })
            ] })
          ] })
        ] })
      ]
    }
  );
}
export {
  PoliceArmyPhotoPage as default
};
