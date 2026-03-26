import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, X, C as Check } from "./index-BFVPq1mW.js";
import { Z as Zap } from "./zap-DQK-4J8m.js";
import { S as Star } from "./star-DHqiEO_I.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",
      key: "1vdc57"
    }
  ],
  ["path", { d: "M5 21h14", key: "11awu3" }]
];
const Crown = createLucideIcon("crown", __iconNode);
const STORAGE_KEY = "sdf_pro_status";
function useProAccess() {
  const [isPro, setIsPro] = reactExports.useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "pro";
    } catch {
      return false;
    }
  });
  reactExports.useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      setIsPro(stored === "pro");
    } catch {
      setIsPro(false);
    }
  }, []);
  const activatePro = reactExports.useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "pro");
    } catch {
    }
    setIsPro(true);
  }, []);
  const deactivatePro = reactExports.useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "free");
    } catch {
    }
    setIsPro(false);
  }, []);
  const devToggle = reactExports.useCallback(() => {
    setIsPro((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, next ? "pro" : "free");
      } catch {
      }
      return next;
    });
  }, []);
  return { isPro, activatePro, deactivatePro, devToggle };
}
function ProPricingModal({
  isOpen = true,
  onClose
}) {
  const { activatePro } = useProAccess();
  const handleActivate = () => {
    activatePro();
    onClose();
  };
  if (!isOpen) return null;
  const features = [
    { label: "AI Document Enhancement", free: false, pro: true },
    { label: "Unlimited Daily Fixes", free: "2/day", pro: "Unlimited" },
    { label: "Multi-Copy Layout", free: false, pro: true },
    { label: "A4 PDF Printable Export", free: false, pro: true },
    { label: "Multi-Photo Sheet", free: false, pro: true },
    { label: "Watermark-Free Output", free: false, pro: true },
    { label: "Priority Processing", free: false, pro: true },
    { label: "Pro Active Badge", free: false, pro: true }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-900 rounded-2xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-200", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-6 border-b border-gray-800", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-6 h-6 text-amber-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-white", children: "AI Document Enhancer Pro" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: onClose,
          className: "p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-800 rounded-xl p-5 border border-gray-700", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5 text-blue-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-white", children: "Monthly" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold text-white mb-1", children: "₹399" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-400 text-sm mb-4", children: "per month" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleActivate,
            className: "w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors text-sm",
            children: "Activate Monthly"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-900/20 rounded-xl p-5 border border-amber-500/50 relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-500 text-black text-xs font-bold rounded-full", children: "BEST VALUE" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-5 h-5 text-amber-400 fill-amber-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-white", children: "Yearly" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold text-white mb-1", children: "₹3,000" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-amber-400 text-sm mb-4", children: "per year — Save 37%" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleActivate,
            className: "w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-medium transition-colors text-sm",
            children: "Activate Yearly"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3", children: "Feature Comparison" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-gray-800 overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 bg-gray-800/50 px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Feature" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-center", children: "Free" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-center text-amber-400", children: "Pro" })
        ] }),
        features.map((feature, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `grid grid-cols-3 px-4 py-3 text-sm border-t border-gray-800 ${i % 2 === 0 ? "bg-gray-900" : "bg-gray-900/50"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-300", children: feature.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-center", children: feature.free === false ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-600", children: "—" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400", children: feature.free }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-center", children: feature.pro === true ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-green-400 mx-auto" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-400", children: feature.pro }) })
            ]
          },
          feature.label
        ))
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 pb-6 text-center text-xs text-gray-600", children: "Demo activation only. No real payment is processed." })
  ] }) });
}
export {
  Crown as C,
  ProPricingModal as P,
  useProAccess as u
};
