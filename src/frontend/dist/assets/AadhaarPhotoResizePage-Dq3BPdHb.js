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
const aadhaarPresets = [
  {
    label: "Aadhaar Standard (200×200)",
    width: 200,
    height: 200,
    unit: "px",
    maxSizeKB: 50
  },
  {
    label: "Aadhaar Portrait (480×640)",
    width: 480,
    height: 640,
    unit: "px",
    maxSizeKB: 100
  }
];
function AadhaarPhotoResizePage({
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
            title: "Aadhaar Card Photo Resize Online Free | DocMasterTools",
            description: "Resize your photo for Aadhaar card application online for free. Supports 200×200 and 480×640 pixel formats with file size optimization.",
            canonicalUrl: "https://docmastertools.com/image-tools/aadhaar-photo"
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
                { label: "Aadhaar Photo Resize" }
              ],
              onNavigate
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-bold text-white mb-3", children: "Aadhaar Card Photo Resize" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 max-w-2xl mx-auto", children: "Resize your photo to exact Aadhaar card specifications. Supports 200×200 and 480×640 pixel formats." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            PhotoResizeTool,
            {
              presets: aadhaarPresets,
              toolTitle: "Aadhaar Photo Resize",
              defaultPresetIndex: 0
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-white mb-3", children: "About Aadhaar Photo Requirements" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 text-sm mb-3", children: "The Unique Identification Authority of India (UIDAI) requires specific photo dimensions for Aadhaar card applications." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-slate-300 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400 mt-0.5", children: "•" }),
                "Standard size: 200×200 pixels, max 50KB"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400 mt-0.5", children: "•" }),
                "Portrait size: 480×640 pixels, max 100KB"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400 mt-0.5", children: "•" }),
                "Format: JPEG/JPG preferred"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400 mt-0.5", children: "•" }),
                "White or light background recommended"
              ] })
            ] })
          ] })
        ] })
      ]
    }
  );
}
export {
  AadhaarPhotoResizePage as default
};
