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
const passportPresets = [
  {
    label: "India Passport (35×45mm)",
    width: 413,
    height: 531,
    unit: "px",
    maxSizeKB: 100
  },
  {
    label: "US Passport (2×2 inch)",
    width: 600,
    height: 600,
    unit: "px",
    maxSizeKB: 240
  },
  {
    label: "UK Passport (35×45mm)",
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
    label: "Canada Passport (50×70mm)",
    width: 591,
    height: 827,
    unit: "px",
    maxSizeKB: 240
  }
];
function PassportPhotoMakerPage({
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
            title: "Passport Photo Maker Online Free | DocMasterTools",
            description: "Create standard passport photos for India, US, UK, Schengen, and Canada online for free. Download instantly.",
            canonicalUrl: "https://docmastertools.com/image-tools/passport-photo"
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
                { label: "Passport Photo Maker" }
              ],
              onNavigate
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-bold text-white mb-3", children: "Passport Photo Maker" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 max-w-2xl mx-auto", children: "Create standard passport photos for India, US, UK, Schengen, and Canada. Download instantly for free." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            PhotoResizeTool,
            {
              presets: passportPresets,
              toolTitle: "Passport Photo Maker",
              defaultPresetIndex: 0
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-white mb-3", children: "Passport Photo Requirements" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 text-sm mb-3", children: "Different countries have specific passport photo requirements. Our tool supports all major formats." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-slate-300 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400 mt-0.5", children: "•" }),
                "India: 35×45mm, white background"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400 mt-0.5", children: "•" }),
                "US: 2×2 inch (51×51mm), white background"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400 mt-0.5", children: "•" }),
                "UK/Schengen: 35×45mm"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400 mt-0.5", children: "•" }),
                "Canada: 50×70mm"
              ] })
            ] })
          ] })
        ] })
      ]
    }
  );
}
export {
  PassportPhotoMakerPage as default
};
