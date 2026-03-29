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
const WEBPConverterPage = ({
  onNavigate
}) => {
  const [format, setFormat] = reactExports.useState("webp");
  const [quality, setQuality] = reactExports.useState(85);
  const [targetSizeEnabled, setTargetSizeEnabled] = reactExports.useState(false);
  const [targetSize, setTargetSize] = reactExports.useState(500);
  const [targetSizeUnit, setTargetSizeUnit] = reactExports.useState("KB");
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
          if (format === "jpeg") {
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }
          ctx.drawImage(img, 0, 0);
          const mimeType = `image/${format}`;
          const q = format !== "png" ? quality / 100 : void 0;
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error("Conversion failed"));
                return;
              }
              const baseName = file.name.replace(/\.[^.]+$/, "");
              const ext = format === "jpeg" ? "jpg" : format;
              const outputFileName = `${baseName}.${ext}`;
              const previewUrl = URL.createObjectURL(blob);
              resolve({
                blob,
                previewUrl,
                outputFileName,
                metadata: {
                  Format: format.toUpperCase(),
                  Dimensions: `${img.naturalWidth}×${img.naturalHeight}px`,
                  Quality: format !== "png" ? `${quality}%` : "Lossless"
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
    [format, quality]
  );
  const settingsSlot = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-gray-200 text-sm font-medium", children: "Output Format" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: format,
          onValueChange: (v) => setFormat(v),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-full bg-gray-700 border-gray-600 text-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "bg-gray-800 border-gray-600", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "webp", children: "WebP (modern, small)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "jpeg", children: "JPEG (universal)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "png", children: "PNG (lossless)" })
            ] })
          ]
        }
      )
    ] }),
    format !== "png" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "checkbox",
            id: "ts-webp",
            checked: targetSizeEnabled,
            onChange: (e) => setTargetSizeEnabled(e.target.checked),
            className: "w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            htmlFor: "ts-webp",
            className: "text-gray-200 text-sm font-medium cursor-pointer",
            children: "Target File Size (optional)"
          }
        )
      ] }),
      targetSizeEnabled && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            min: 1,
            value: targetSize,
            onChange: (e) => setTargetSize(Number(e.target.value)),
            className: "flex-1 bg-gray-700 border-gray-600 text-gray-100"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: targetSizeUnit,
            onValueChange: (v) => setTargetSizeUnit(v),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-24 bg-gray-700 border-gray-600 text-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "bg-gray-800 border-gray-600", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "KB", children: "KB" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "MB", children: "MB" })
              ] })
            ]
          }
        )
      ] })
    ] })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gray-900 text-gray-100", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SEO,
      {
        title: "WebP Converter - Convert WebP to JPG/PNG Online Free",
        description: "Convert WebP images to JPEG, PNG, or other WebP online for free. Advanced settings with before/after preview and instant download.",
        canonicalUrl: "https://docmastertools.com/webp-converter"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "max-w-4xl mx-auto px-4 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        BreadcrumbNavigation,
        {
          items: [
            { label: "Home", onClick: () => onNavigate == null ? void 0 : onNavigate("home") },
            {
              label: "Image Tools",
              onClick: () => onNavigate == null ? void 0 : onNavigate("image-tools")
            },
            { label: "WebP Converter" }
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-gray-100 mb-2", children: "WebP Converter" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400", children: "Convert images to/from WebP format with quality control and before/after preview." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-800 rounded-2xl border border-gray-700 p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        AdvancedToolShell,
        {
          toolTitle: "WebP Converter",
          acceptedFileTypes: "image/webp,image/jpeg,image/png,image/gif,image/bmp",
          acceptedFileTypesLabel: "Accepts WebP, JPEG, PNG, GIF, BMP",
          settingsSlot,
          processingFunction,
          outputFileName: "converted.webp"
        }
      ) })
    ] })
  ] });
};
export {
  WEBPConverterPage as default
};
