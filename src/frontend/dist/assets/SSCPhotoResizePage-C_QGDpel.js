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
const sscPresets = [
  {
    label: "SSC CGL (100×120px)",
    width: 100,
    height: 120,
    unit: "px",
    maxSizeKB: 20
  },
  {
    label: "SSC CHSL (100×120px)",
    width: 100,
    height: 120,
    unit: "px",
    maxSizeKB: 20
  },
  {
    label: "SSC MTS (100×120px)",
    width: 100,
    height: 120,
    unit: "px",
    maxSizeKB: 20
  },
  {
    label: "SSC GD (200×230px)",
    width: 200,
    height: 230,
    unit: "px",
    maxSizeKB: 50
  }
];
function SSCPhotoResizePage({
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
            title: "SSC Exam Photo Resize Online Free | DocMasterTools",
            description: "Resize photos for SSC CGL, CHSL, MTS, and GD exam forms online for free. Exact specifications guaranteed.",
            canonicalUrl: "https://docmastertools.com/image-tools/ssc-photo"
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
                { label: "SSC Photo Resize" }
              ],
              onNavigate
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-bold text-white mb-3", children: "SSC Exam Photo Resize" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 max-w-2xl mx-auto", children: "Resize your photo to exact SSC exam specifications for CGL, CHSL, MTS, and GD forms." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            PhotoResizeTool,
            {
              presets: sscPresets,
              toolTitle: "SSC Photo Resize",
              defaultPresetIndex: 0
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-white mb-3", children: "SSC Photo Requirements" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 text-sm mb-3", children: "Staff Selection Commission (SSC) requires specific photo dimensions for different exam applications." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-slate-300 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400 mt-0.5", children: "•" }),
                "SSC CGL/CHSL/MTS: 100×120 pixels, max 20KB"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400 mt-0.5", children: "•" }),
                "SSC GD: 200×230 pixels, max 50KB"
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
  SSCPhotoResizePage as default
};
