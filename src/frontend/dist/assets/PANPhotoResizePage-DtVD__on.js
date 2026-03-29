import { j as jsxRuntimeExports } from "./index-YN_OslaE.js";
import { B as BreadcrumbNavigation } from "./BreadcrumbNavigation-DM_u2Ewn.js";
import { S as SEO } from "./SEO-DRKgHPjT.js";
import { P as PhotoResizeTool } from "./PhotoResizeTool-WgWeo9ik.js";
import "./house-CI4Q4zpu.js";
import "./chevron-right-BPoM3n0-.js";
import "./input-BldACiYg.js";
import "./utils-Bmita3Ip.js";
import "./select-Bm5_92VY.js";
import "./index-IXOTxK3N.js";
import "./index-B7n2t64q.js";
import "./index-DyakJ80C.js";
import "./slider-DkvtRS-k.js";
import "./AdvancedToolShell-DnnYRrLm.js";
import "./upload-DORtw0Gt.js";
import "./circle-check-big-D5mWTfL5.js";
import "./circle-alert-D_hdXq39.js";
import "./eye--NTW7qb9.js";
import "./download-CGoTQdDD.js";
import "./zap-BXuwvbGj.js";
import "./arrow-up-BvhRKI9_.js";
const panPresets = [
  {
    label: "NSDL PAN (213×213)",
    width: 213,
    height: 213,
    unit: "px",
    maxSizeKB: 50
  },
  {
    label: "UTIITSL PAN (200×200)",
    width: 200,
    height: 200,
    unit: "px",
    maxSizeKB: 50
  },
  {
    label: "PAN Signature (213×67)",
    width: 213,
    height: 67,
    unit: "px",
    maxSizeKB: 30
  }
];
function PANPhotoResizePage({
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
            title: "PAN Card Photo Resize Online Free | DocMasterTools",
            description: "Resize your photo for PAN card application online for free. Supports NSDL and UTIITSL specifications.",
            canonicalUrl: "https://docmastertools.com/image-tools/pan-photo"
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
                { label: "PAN Photo Resize" }
              ],
              onNavigate
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-bold text-white mb-3", children: "PAN Card Photo Resize" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 max-w-2xl mx-auto", children: "Resize your photo to exact PAN card specifications for NSDL and UTIITSL applications." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            PhotoResizeTool,
            {
              presets: panPresets,
              toolTitle: "PAN Card Photo Resize",
              defaultPresetIndex: 0
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-white mb-3", children: "PAN Card Photo Requirements" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 text-sm mb-3", children: "The Income Tax Department requires specific photo dimensions for PAN card applications through NSDL and UTIITSL portals." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-slate-300 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400 mt-0.5", children: "•" }),
                "NSDL: 213×213 pixels, max 50KB"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400 mt-0.5", children: "•" }),
                "UTIITSL: 200×200 pixels, max 50KB"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400 mt-0.5", children: "•" }),
                "Signature: 213×67 pixels, max 30KB"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400 mt-0.5", children: "•" }),
                "Format: JPEG/JPG"
              ] })
            ] })
          ] })
        ] })
      ]
    }
  );
}
export {
  PANPhotoResizePage as default
};
