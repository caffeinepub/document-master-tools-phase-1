import { p as useInternetIdentity, r as reactExports, j as jsxRuntimeExports } from "./index-YN_OslaE.js";
import { B as BreadcrumbNavigation } from "./BreadcrumbNavigation-DM_u2Ewn.js";
import { S as SEO } from "./SEO-DRKgHPjT.js";
import { u as useProAccess, C as Crown, P as ProPricingModal } from "./ProPricingModal-B4sRUznN.js";
import { A as ArrowLeft } from "./arrow-left-C6-8XIiy.js";
import { S as Star } from "./star-CEdPt7GF.js";
import { S as Sparkles } from "./sparkles-Dyd1eZSt.js";
import { F as FileText } from "./file-text-7eOuz9ac.js";
import { I as Image } from "./image-CdfpD8_U.js";
import { Z as Zap } from "./zap-BXuwvbGj.js";
import { L as Lock } from "./lock-BaR5yfJh.js";
import "./house-CI4Q4zpu.js";
import "./chevron-right-BPoM3n0-.js";
function AIDocumentEnhancerPage({
  onBack,
  onNavigate
}) {
  const { isPro } = useProAccess();
  const { login, loginStatus, identity } = useInternetIdentity();
  const [showPricingModal, setShowPricingModal] = reactExports.useState(false);
  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === "logging-in";
  const handleBack = () => {
    if (onBack) onBack();
    else if (onNavigate) onNavigate("image-tools");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gray-900 text-gray-100", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SEO,
      {
        title: "AI Document Enhancer - Pro Tool | Document Master Tools",
        description: "Enhance your documents with AI-powered tools. Automatically improve image quality, fix lighting, remove noise, sharpen text, and produce office-ready documents. Pro subscription required.",
        canonicalUrl: "https://docmastertools.com/ai-document-enhancer"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "max-w-4xl mx-auto px-4 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: handleBack,
          className: "flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors text-sm font-medium mb-4 min-h-[44px]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 16 }),
            "Back to Image Tools"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        BreadcrumbNavigation,
        {
          items: [
            {
              label: "Home",
              onClick: () => onNavigate ? onNavigate("home") : handleBack()
            },
            {
              label: "Image Tools",
              onClick: () => onNavigate ? onNavigate("image-tools") : handleBack()
            },
            { label: "AI Document Enhancer" }
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl sm:text-3xl font-bold text-white", children: "AI Document Enhancer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 px-3 py-1 bg-amber-500/20 border border-amber-500/50 text-amber-400 rounded-full text-sm font-bold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-3.5 h-3.5" }),
          "PRO"
        ] })
      ] }),
      isPro && isAuthenticated ? (
        // Pro user view
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-4 py-2 bg-green-900/30 border border-green-700/50 rounded-lg w-fit", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 text-green-400 fill-green-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-400 font-semibold text-sm", children: "Pro Active" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-800 rounded-xl p-5 border border-gray-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-8 h-8 text-blue-400 mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-white mb-1", children: "AI Enhancement" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400", children: "Auto-fix lighting, contrast, and sharpness" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-800 rounded-xl p-5 border border-gray-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-8 h-8 text-purple-400 mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-white mb-1", children: "Text Clarity" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400", children: "Sharpen text for office-ready documents" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-800 rounded-xl p-5 border border-gray-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-8 h-8 text-green-400 mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-white mb-1", children: "Noise Removal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400", children: "Remove scan artifacts and noise" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-800 rounded-xl p-6 border border-gray-700 border-dashed text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-12 h-12 text-amber-400 mx-auto mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-300 font-medium", children: "Upload a document to enhance with AI" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-sm mt-1", children: "Supports JPG, PNG, PDF formats" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors",
                children: "Upload Document"
              }
            )
          ] })
        ] })
      ) : (
        // Gate view
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-800 rounded-2xl border border-amber-500/30 overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-amber-900/30 to-orange-900/20 px-6 py-8 text-center border-b border-amber-500/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-12 h-12 text-amber-400 mx-auto mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-white mb-2", children: "Pro Feature" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm max-w-md mx-auto", children: "AI Document Enhancer is a premium tool. Login and subscribe to unlock AI-powered document enhancement." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-900/50 rounded-xl p-4 border border-gray-700", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-white", children: "₹399" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-400 text-sm", children: "per month" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-3 space-y-1.5 text-sm text-gray-300", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5 text-amber-400" }),
                    " AI Enhancement"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3.5 h-3.5 text-amber-400" }),
                    " ",
                    "Unlimited Documents"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5 text-amber-400" }),
                    " Priority Processing"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-900/20 rounded-xl p-4 border border-amber-500/40", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-white", children: "₹3,000" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-amber-400 text-sm font-medium", children: "per year — Save 37%" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-3 space-y-1.5 text-sm text-gray-300", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5 text-amber-400" }),
                    " All Monthly Features"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-3.5 h-3.5 text-amber-400" }),
                    " Pro Badge"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3.5 h-3.5 text-amber-400" }),
                    " Best Value"
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
              !isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => login(),
                  disabled: isLoggingIn,
                  className: "flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white rounded-lg font-medium transition-colors min-h-[48px]",
                  children: isLoggingIn ? "Logging in..." : "Login to Continue"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setShowPricingModal(true),
                  className: "flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-medium transition-colors min-h-[48px]",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-4 h-4" }),
                    "Subscribe to Pro"
                  ]
                }
              ),
              isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setShowPricingModal(true),
                  className: "flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg font-medium transition-colors min-h-[48px]",
                  children: "View Plans"
                }
              )
            ] })
          ] })
        ] })
      )
    ] }),
    showPricingModal && /* @__PURE__ */ jsxRuntimeExports.jsx(ProPricingModal, { onClose: () => setShowPricingModal(false) })
  ] });
}
export {
  AIDocumentEnhancerPage as default
};
