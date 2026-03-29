import { j as jsxRuntimeExports, r as reactExports } from "./index-BK1nStnW.js";
import { A as ArrowLeft } from "./arrow-left-B6GHQD8m.js";
import { B as BreadcrumbNavigation } from "./BreadcrumbNavigation-B800FblV.js";
import { F as FileUploadZone } from "./FileUploadZone-D8MzBiSI.js";
import { S as SEO } from "./SEO-C_L06y5W.js";
import { u as useProAccess, C as Crown, P as ProPricingModal } from "./ProPricingModal-B0H8pSDF.js";
import { W as WandSparkles } from "./wand-sparkles-BuK0h51Y.js";
import { R as RefreshCw } from "./refresh-cw-BYdg0gQl.js";
import { L as LoaderCircle } from "./loader-circle-CF1dta8-.js";
import { Z as Zap } from "./zap-CT6qXcwZ.js";
import { D as Download } from "./download-DrnSnE1m.js";
import { C as CircleAlert } from "./circle-alert-xgi4hUd9.js";
import { C as CircleCheckBig } from "./circle-check-big-C6nUF8Wo.js";
import "./house-DWCPoK9q.js";
import "./chevron-right-CZ2YD_lG.js";
import "./upload-BCLg8s-Z.js";
import "./star-DTqEVlH6.js";
function BackToHomeButton({
  onNavigate,
  onClick,
  label = "Back to Home"
}) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (onNavigate) {
      onNavigate("home");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: handleClick,
      className: "flex items-center gap-2 text-slate-300 hover:text-white transition-colors duration-200 group mb-6",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 shrink-0 group-hover:-translate-x-1 transition-transform duration-200" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label })
      ]
    }
  );
}
const FREE_DAILY_LIMIT = 2;
const STORAGE_KEY = "sdf_daily_count";
const DATE_KEY = "sdf_daily_date";
function getDailyCount() {
  const today = (/* @__PURE__ */ new Date()).toDateString();
  const storedDate = localStorage.getItem(DATE_KEY);
  if (storedDate !== today) {
    localStorage.setItem(DATE_KEY, today);
    localStorage.setItem(STORAGE_KEY, "0");
    return 0;
  }
  return Number.parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
}
function incrementDailyCount() {
  const count = getDailyCount();
  localStorage.setItem(STORAGE_KEY, String(count + 1));
}
const SmartDocumentFixerPage = ({
  onNavigate,
  onBack
}) => {
  const { isPro, devToggle } = useProAccess();
  const [file, setFile] = reactExports.useState(null);
  const [originalPreview, setOriginalPreview] = reactExports.useState(null);
  const [processedPreview, setProcessedPreview] = reactExports.useState(null);
  const [processedBlob, setProcessedBlob] = reactExports.useState(null);
  const [isProcessing, setIsProcessing] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [showProModal, setShowProModal] = reactExports.useState(false);
  const [dailyCount, setDailyCount] = reactExports.useState(getDailyCount);
  const [brightness, setBrightness] = reactExports.useState(10);
  const [contrast, setContrast] = reactExports.useState(15);
  const [sharpen, setSharpen] = reactExports.useState(true);
  const canvasRef = reactExports.useRef(null);
  const handleBack = () => {
    if (onBack) onBack();
    else onNavigate("image-tools");
  };
  const handleFileSelect = reactExports.useCallback((selectedFile) => {
    setFile(selectedFile);
    setProcessedPreview(null);
    setProcessedBlob(null);
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      var _a;
      return setOriginalPreview((_a = e.target) == null ? void 0 : _a.result);
    };
    reader.readAsDataURL(selectedFile);
  }, []);
  const canProcess = isPro || dailyCount < FREE_DAILY_LIMIT;
  const handleProcess = reactExports.useCallback(async () => {
    if (!file || !canProcess) {
      if (!canProcess) setShowProModal(true);
      return;
    }
    setIsProcessing(true);
    setError(null);
    try {
      const img = new Image();
      const url = URL.createObjectURL(file);
      await new Promise((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = url;
      });
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas not supported");
      ctx.filter = `brightness(${1 + brightness / 100}) contrast(${1 + contrast / 100})${sharpen ? " saturate(1.1)" : ""}`;
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      const blob = await new Promise((resolve, reject) => {
        canvas.toBlob(
          (b) => b ? resolve(b) : reject(new Error("Failed to process")),
          "image/jpeg",
          0.92
        );
      });
      const processedUrl = URL.createObjectURL(blob);
      setProcessedPreview(processedUrl);
      setProcessedBlob(blob);
      if (!isPro) {
        incrementDailyCount();
        setDailyCount(getDailyCount());
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Processing failed");
    } finally {
      setIsProcessing(false);
    }
  }, [file, canProcess, isPro, brightness, contrast, sharpen]);
  const handleDownload = reactExports.useCallback(() => {
    if (!processedBlob || !file) return;
    const url = URL.createObjectURL(processedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${file.name.replace(/\.[^.]+$/, "")}_fixed.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [processedBlob, file]);
  const handleReset = reactExports.useCallback(() => {
    setFile(null);
    setOriginalPreview(null);
    setProcessedPreview(null);
    setProcessedBlob(null);
    setError(null);
  }, []);
  const remainingFixes = Math.max(0, FREE_DAILY_LIMIT - dailyCount);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SEO,
      {
        title: "Smart Document Fixer - Auto-Fix Document Photos Free | Document Master Tools",
        description: "Automatically fix document photos with brightness, contrast, and sharpness enhancement. Free online document photo fixer.",
        canonicalUrl: "https://documentmastertools.com/image-tools/smart-document-fixer"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dark-page-bg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex flex-col gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          BackToHomeButton,
          {
            onClick: handleBack,
            label: "Back to Image Tools"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          BreadcrumbNavigation,
          {
            items: [
              {
                label: "Image Tools",
                onClick: () => onNavigate("image-tools")
              },
              { label: "Smart Document Fixer" }
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-bold text-white", children: "Smart Document Fixer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2 py-1 rounded-full bg-green-600 text-white font-bold", children: "FREE" }),
          isPro && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2 py-1 rounded-full bg-violet-600 text-white font-bold", children: "PRO" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 text-sm md:text-base", children: "Auto-fix document photos: brightness, contrast, crop & enhance" }),
        !isPro && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-2 text-sm flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "Free fixes today:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: `font-semibold ${remainingFixes > 0 ? "text-green-400" : "text-red-400"}`,
              children: [
                remainingFixes,
                "/",
                FREE_DAILY_LIMIT,
                " remaining"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setShowProModal(true),
              className: "ml-2 flex items-center gap-1 text-violet-400 hover:text-violet-300 transition-colors text-xs",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-3.5 h-3.5" }),
                "Go Pro for unlimited"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: devToggle,
          className: "text-xs px-3 py-1.5 rounded bg-gray-700 text-slate-300 hover:bg-gray-600 transition-colors",
          children: [
            "[DEV] Toggle Pro: ",
            isPro ? "ON" : "OFF"
          ]
        }
      ) }),
      !file && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        FileUploadZone,
        {
          onFileSelect: handleFileSelect,
          accept: "image/jpeg,image/png,image/webp",
          description: "Upload document photo (JPG, PNG, WebP)"
        }
      ) }),
      file && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tool-card rounded-xl p-4 md:p-6 border border-gray-700/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-blue-900/30 p-2 rounded-lg shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WandSparkles, { className: "w-4 h-4 text-blue-400" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-medium text-sm truncate", children: file.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-slate-400 text-xs", children: [
                (file.size / 1024).toFixed(1),
                " KB"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: handleReset,
              className: "flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-sm min-h-[36px] px-3 py-1.5 rounded-lg hover:bg-white/5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5" }),
                "Change"
              ]
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tool-card rounded-xl p-4 md:p-6 border border-gray-700/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-semibold mb-4 text-sm uppercase tracking-wide", children: "Enhancement Settings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "label",
                {
                  htmlFor: "brightness-range",
                  className: "block text-slate-300 text-sm mb-2",
                  children: [
                    "Brightness: +",
                    brightness,
                    "%"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "brightness-range",
                  type: "range",
                  min: 0,
                  max: 50,
                  value: brightness,
                  onChange: (e) => setBrightness(Number(e.target.value)),
                  className: "w-full accent-blue-500"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "label",
                {
                  htmlFor: "contrast-range",
                  className: "block text-slate-300 text-sm mb-2",
                  children: [
                    "Contrast: +",
                    contrast,
                    "%"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "contrast-range",
                  type: "range",
                  min: 0,
                  max: 50,
                  value: contrast,
                  onChange: (e) => setContrast(Number(e.target.value)),
                  className: "w-full accent-blue-500"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "checkbox",
                  checked: sharpen,
                  onChange: (e) => setSharpen(e.target.checked),
                  className: "accent-blue-500"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-300 text-sm", children: "Auto-sharpen" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handleProcess,
              disabled: isProcessing || !isPro && remainingFixes === 0,
              className: "flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition-all duration-200 hover:shadow-lg text-sm flex-1 sm:flex-none",
              children: isProcessing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                "Processing..."
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4" }),
                "Fix Document"
              ] })
            }
          ),
          processedBlob && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: handleDownload,
              className: "flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition-all duration-200 hover:shadow-lg text-sm flex-1 sm:flex-none",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
                "Download"
              ]
            }
          ),
          !isPro && remainingFixes === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setShowProModal(true),
              className: "flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-semibold transition-all duration-200 hover:shadow-lg text-sm flex-1 sm:flex-none",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-4 h-4" }),
                "Go Pro"
              ]
            }
          )
        ] })
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-start gap-3 p-4 rounded-xl bg-red-900/20 border border-red-700/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-5 h-5 text-red-400 shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-300 text-sm", children: error })
      ] }),
      (originalPreview || processedPreview) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tool-card rounded-xl p-4 md:p-6 border border-gray-700/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-semibold mb-4 text-sm uppercase tracking-wide", children: "Preview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6", children: [
          originalPreview && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-xs mb-2 uppercase tracking-wide", children: "Original" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: originalPreview,
                alt: "Original",
                className: "w-full rounded-lg object-contain max-h-64 bg-gray-800"
              }
            )
          ] }),
          processedPreview && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-xs mb-2 uppercase tracking-wide", children: "Fixed" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: processedPreview,
                alt: "Fixed",
                className: "w-full rounded-lg object-contain max-h-64 bg-gray-800"
              }
            ),
            !isPro && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/20 text-2xl font-bold rotate-[-30deg] select-none", children: "PREVIEW" }) })
          ] })
        ] }),
        processedPreview && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-2 text-green-400 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4" }),
          "Document fixed! Click Download to save."
        ] })
      ] })
    ] }) }),
    showProModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ProPricingModal,
      {
        isOpen: showProModal,
        onClose: () => setShowProModal(false)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef, className: "hidden" })
  ] });
};
export {
  SmartDocumentFixerPage as default
};
