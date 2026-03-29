import { j as jsxRuntimeExports } from "./index-BK1nStnW.js";
import { B as BreadcrumbNavigation } from "./BreadcrumbNavigation-B800FblV.js";
import { S as SEO } from "./SEO-C_L06y5W.js";
import { P as PhotoResizeTool } from "./PhotoResizeTool-6T4qwn4N.js";
import "./house-DWCPoK9q.js";
import "./chevron-right-CZ2YD_lG.js";
import "./input-D5fftGWB.js";
import "./utils-Bmita3Ip.js";
import "./select-DtX__EcZ.js";
import "./index-IXOTxK3N.js";
import "./index-C7kgm_TX.js";
import "./index-DgHemueb.js";
import "./slider-DBtJzor5.js";
import "./AdvancedToolShell-CouWcy3g.js";
import "./upload-BCLg8s-Z.js";
import "./circle-check-big-C6nUF8Wo.js";
import "./circle-alert-xgi4hUd9.js";
import "./eye-D53a726R.js";
import "./download-DrnSnE1m.js";
import "./zap-CT6qXcwZ.js";
import "./arrow-up-Udz1gbiu.js";
const signaturePresets = [
  {
    label: "Aadhaar Signature (400×100px)",
    width: 400,
    height: 100,
    unit: "px",
    maxSizeKB: 30
  },
  {
    label: "PAN Signature (213×67px)",
    width: 213,
    height: 67,
    unit: "px",
    maxSizeKB: 30
  },
  {
    label: "Exam Signature (140×60px)",
    width: 140,
    height: 60,
    unit: "px",
    maxSizeKB: 20
  },
  {
    label: "Standard Signature (300×80px)",
    width: 300,
    height: 80,
    unit: "px",
    maxSizeKB: 30
  }
];
function SignatureResizePage({
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
            title: "Signature Resize Online Free | DocMasterTools",
            description: "Resize signature images for Aadhaar, PAN, and exam forms online for free.",
            canonicalUrl: "https://docmastertools.com/image-tools/signature-resize"
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
                { label: "Signature Resize" }
              ],
              onNavigate
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-bold text-white mb-3", children: "Signature Resize" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 max-w-2xl mx-auto", children: "Resize your signature image to exact specifications for Aadhaar, PAN, and exam form submissions." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            PhotoResizeTool,
            {
              presets: signaturePresets,
              toolTitle: "Signature Resize",
              defaultPresetIndex: 0
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-white mb-3", children: "Signature Size Requirements" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 text-sm mb-3", children: "Different government forms and exams require specific signature image dimensions." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-slate-300 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400 mt-0.5", children: "•" }),
                "Aadhaar: 400×100 pixels, max 30KB"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400 mt-0.5", children: "•" }),
                "PAN: 213×67 pixels, max 30KB"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400 mt-0.5", children: "•" }),
                "Exam forms: 140×60 pixels, max 20KB"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400 mt-0.5", children: "•" }),
                "Format: JPEG/JPG, white background"
              ] })
            ] })
          ] })
        ] })
      ]
    }
  );
}
export {
  SignatureResizePage as default
};
