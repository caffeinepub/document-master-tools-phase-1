import { r as reactExports, j as jsxRuntimeExports } from "./index-YN_OslaE.js";
import { L as Label, I as Input } from "./input-BldACiYg.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-Bm5_92VY.js";
import { S as Slider } from "./slider-DkvtRS-k.js";
import { A as AdvancedToolShell } from "./AdvancedToolShell-DnnYRrLm.js";
import { B as BreadcrumbNavigation } from "./BreadcrumbNavigation-DM_u2Ewn.js";
import { S as SEO } from "./SEO-DRKgHPjT.js";
import "./utils-Bmita3Ip.js";
import "./index-IXOTxK3N.js";
import "./index-B7n2t64q.js";
import "./index-DyakJ80C.js";
import "./upload-DORtw0Gt.js";
import "./circle-check-big-D5mWTfL5.js";
import "./circle-alert-D_hdXq39.js";
import "./eye--NTW7qb9.js";
import "./download-CGoTQdDD.js";
import "./zap-BXuwvbGj.js";
import "./arrow-up-BvhRKI9_.js";
import "./house-CI4Q4zpu.js";
import "./chevron-right-BPoM3n0-.js";
const BackgroundRemoverPage = ({ onNavigate }) => {
  const [bgFill, setBgFill] = reactExports.useState("transparent");
  const [customColor, setCustomColor] = reactExports.useState("#ffffff");
  const [format, setFormat] = reactExports.useState("png");
  const [quality, setQuality] = reactExports.useState(90);
  const effectiveFormat = bgFill === "transparent" ? "png" : format;
  const processingFunction = reactExports.useCallback(
    async (file) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(file);
        img.onload = () => {
          URL.revokeObjectURL(url);
          const canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("Canvas not supported"));
            return;
          }
          if (bgFill === "white") {
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          } else if (bgFill === "custom") {
            ctx.fillStyle = customColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          } else if (bgFill === "blur") {
            ctx.filter = "blur(20px)";
            ctx.drawImage(img, -20, -20, canvas.width + 40, canvas.height + 40);
            ctx.filter = "none";
          }
          ctx.drawImage(img, 0, 0);
          if (bgFill === "transparent") {
            const imageData = ctx.getImageData(
              0,
              0,
              canvas.width,
              canvas.height
            );
            const data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
              const r = data[i];
              const g = data[i + 1];
              const b = data[i + 2];
              if (r > 220 && g > 220 && b > 220) {
                data[i + 3] = 0;
              }
            }
            ctx.putImageData(imageData, 0, 0);
          }
          const mimeType = `image/${effectiveFormat}`;
          const q = effectiveFormat !== "png" ? quality / 100 : void 0;
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error("Processing failed"));
                return;
              }
              const ext = effectiveFormat === "jpeg" ? "jpg" : effectiveFormat;
              const baseName = file.name.replace(/\.[^.]+$/, "");
              const outputFileName = `${baseName}_bg_removed.${ext}`;
              const previewUrl = URL.createObjectURL(blob);
              resolve({
                blob,
                previewUrl,
                outputFileName,
                metadata: {
                  Background: bgFill === "transparent" ? "Transparent" : bgFill === "white" ? "White" : bgFill === "custom" ? `Custom (${customColor})` : "Blur",
                  Format: effectiveFormat.toUpperCase(),
                  Dimensions: `${img.naturalWidth}×${img.naturalHeight}px`
                }
              });
            },
            mimeType,
            q
          );
        };
        img.onerror = () => {
          URL.revokeObjectURL(url);
          reject(new Error("Failed to load image"));
        };
        img.src = url;
      });
    },
    [bgFill, customColor, effectiveFormat, quality]
  );
  const settingsSlot = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-gray-200 text-sm font-medium", children: "Background Fill" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: bgFill, onValueChange: (v) => setBgFill(v), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-full bg-gray-700 border-gray-600 text-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "bg-gray-800 border-gray-600", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "transparent", children: "Transparent (PNG only)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "white", children: "White Background" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "custom", children: "Custom Color" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "blur", children: "Blur Background" })
        ] })
      ] })
    ] }),
    bgFill === "custom" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-gray-200 text-sm font-medium", children: "Background Color" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "color",
            value: customColor,
            onChange: (e) => setCustomColor(e.target.value),
            className: "w-12 h-10 rounded cursor-pointer border border-gray-600 bg-gray-700"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "text",
            value: customColor,
            onChange: (e) => setCustomColor(e.target.value),
            className: "flex-1 bg-gray-700 border-gray-600 text-gray-100",
            placeholder: "#ffffff"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-gray-200 text-sm font-medium", children: "Output Format" }),
      bgFill === "transparent" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-gray-300 text-sm", children: "PNG (required for transparency)" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: format,
          onValueChange: (v) => setFormat(v),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-full bg-gray-700 border-gray-600 text-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "bg-gray-800 border-gray-600", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "png", children: "PNG" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "jpeg", children: "JPEG" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "webp", children: "WebP" })
            ] })
          ]
        }
      )
    ] }),
    bgFill !== "transparent" && effectiveFormat !== "png" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-gray-200 text-sm font-medium", children: "Quality" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-blue-400 font-semibold text-sm", children: [
          quality,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Slider,
        {
          min: 1,
          max: 100,
          step: 1,
          value: [quality],
          onValueChange: ([v]) => setQuality(v),
          className: "w-full"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-900/20 border border-amber-700/40 rounded-lg p-3 text-xs text-amber-300", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Note:" }),
      " This tool uses a simple threshold-based background removal (removes near-white pixels). For complex backgrounds, results may vary."
    ] })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gray-900 text-gray-100", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SEO,
      {
        title: "Background Remover - Remove Image Background Online Free",
        description: "Remove image background online for free. Choose transparent, white, custom color, or blur background with before/after preview.",
        canonicalUrl: "https://docmastertools.com/background-remover"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "max-w-4xl mx-auto px-4 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => onNavigate == null ? void 0 : onNavigate("image-tools"),
          className: "flex items-center gap-2 text-slate-200 hover:text-white mb-6 transition-colors",
          children: "← Back to Image Tools"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        BreadcrumbNavigation,
        {
          items: [
            { label: "Home", onClick: () => onNavigate == null ? void 0 : onNavigate("home") },
            {
              label: "Image Tools",
              onClick: () => onNavigate == null ? void 0 : onNavigate("image-tools")
            },
            { label: "Background Remover" }
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-gray-100 mb-2", children: "Background Remover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400", children: "Remove or replace image backgrounds with transparent, white, custom color, or blur options." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-800 rounded-2xl border border-gray-700 p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        AdvancedToolShell,
        {
          toolTitle: "Background Remover",
          acceptedFileTypes: "image/jpeg,image/png,image/webp,image/bmp",
          acceptedFileTypesLabel: "Supports JPEG, PNG, WebP, BMP",
          settingsSlot,
          processingFunction,
          outputFileName: "background-removed.png"
        }
      ) })
    ] })
  ] });
};
export {
  BackgroundRemoverPage as default
};
