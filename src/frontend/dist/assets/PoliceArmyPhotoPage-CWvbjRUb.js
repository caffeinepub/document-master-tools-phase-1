import { j as jsxRuntimeExports } from "./index-5lKdoCW0.js";
import { B as BreadcrumbNavigation } from "./BreadcrumbNavigation-BPIV8DKu.js";
import { S as SEO } from "./SEO-CrxvtZlJ.js";
import { P as PhotoResizeTool } from "./PhotoResizeTool-C31pHogT.js";
import "./house-Cr78nhlO.js";
import "./chevron-right-Ci-Y7VDX.js";
import "./input-BTbdFU5B.js";
import "./utils-DTOQoE02.js";
import "./select-CYvTDaKA.js";
import "./index-IXOTxK3N.js";
import "./index-CCo3A7qs.js";
import "./index-BNibAAFA.js";
import "./slider-g-Yz6Mod.js";
import "./AdvancedToolShell-CACApwcI.js";
import "./upload-DcBxV182.js";
import "./circle-check-big-CqhdnBA7.js";
import "./circle-alert-DGFzi1qZ.js";
import "./eye-B0h2v4Fz.js";
import "./download-DzKqyFkq.js";
import "./zap-C2vJssOF.js";
import "./arrow-up-BZovap1O.js";
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
