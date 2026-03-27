import { r as reactExports, j as jsxRuntimeExports } from "./index-5lKdoCW0.js";
import { L as Label, I as Input } from "./input-BTbdFU5B.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CYvTDaKA.js";
import { S as Slider } from "./slider-g-Yz6Mod.js";
import { A as AdvancedToolShell } from "./AdvancedToolShell-CACApwcI.js";
import { B as BreadcrumbNavigation } from "./BreadcrumbNavigation-BPIV8DKu.js";
import { S as SEO } from "./SEO-CrxvtZlJ.js";
import "./utils-DTOQoE02.js";
import "./index-IXOTxK3N.js";
import "./index-CCo3A7qs.js";
import "./index-BNibAAFA.js";
import "./upload-DcBxV182.js";
import "./circle-check-big-CqhdnBA7.js";
import "./circle-alert-DGFzi1qZ.js";
import "./eye-B0h2v4Fz.js";
import "./download-DzKqyFkq.js";
import "./zap-C2vJssOF.js";
import "./arrow-up-BZovap1O.js";
import "./house-Cr78nhlO.js";
import "./chevron-right-Ci-Y7VDX.js";
const compressToTargetSize = (canvas, mimeType, maxBytes, startQuality) => {
  return new Promise((resolve, reject) => {
    let q = Math.min(startQuality / 100, 0.92);
    const minQ = 0.05;
    const tryCompress = () => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Conversion failed"));
            return;
          }
          if (blob.size <= maxBytes || q <= minQ) resolve(blob);
          else {
            q = Math.max(minQ, q - 0.08);
            tryCompress();
          }
        },
        mimeType,
        q
      );
    };
    tryCompress();
  });
};
const JPGToPNGPage = ({
  onNavigate
}) => {
  const [format, setFormat] = reactExports.useState("png");
  const [quality, setQuality] = reactExports.useState(90);
  const [targetSizeEnabled, setTargetSizeEnabled] = reactExports.useState(false);
  const [targetSize, setTargetSize] = reactExports.useState(500);
  const [targetSizeUnit, setTargetSizeUnit] = reactExports.useState("KB");
  const processingFunction = reactExports.useCallback(
    async (file) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(file);
        img.onload = async () => {
          URL.revokeObjectURL(url);
          const canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("Canvas not supported"));
            return;
          }
          ctx.drawImage(img, 0, 0);
          const mimeType = `image/${format}`;
          const ext = format === "webp" ? "webp" : "png";
          const baseName = file.name.replace(/\.[^.]+$/, "");
          const outputFileName = `${baseName}.${ext}`;
          try {
            let blob;
            if (targetSizeEnabled) {
              const maxBytes = targetSizeUnit === "MB" ? targetSize * 1024 * 1024 : targetSize * 1024;
              blob = await compressToTargetSize(
                canvas,
                mimeType,
                maxBytes,
                quality
              );
            } else {
              const q = format === "webp" ? quality / 100 : void 0;
              blob = await new Promise((res, rej) => {
                canvas.toBlob(
                  (b) => b ? res(b) : rej(new Error("Conversion failed")),
                  mimeType,
                  q
                );
              });
            }
            const previewUrl = URL.createObjectURL(blob);
            resolve({
              blob,
              previewUrl,
              outputFileName,
              metadata: {
                Format: format.toUpperCase(),
                Dimensions: `${img.naturalWidth}×${img.naturalHeight}px`,
                Quality: targetSizeEnabled ? `Target ≤${targetSize}${targetSizeUnit}` : format === "webp" ? `${quality}%` : "Lossless"
              }
            });
          } catch (err) {
            reject(err instanceof Error ? err : new Error("Conversion failed"));
          }
        };
        img.onerror = () => {
          URL.revokeObjectURL(url);
          reject(
            new Error(
              "Failed to load image. File may be corrupted or unsupported."
            )
          );
        };
        img.src = url;
      });
    },
    [format, quality, targetSizeEnabled, targetSize, targetSizeUnit]
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
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "png", children: "PNG (lossless, transparent support)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "webp", children: "WebP (modern, smaller)" })
            ] })
          ]
        }
      )
    ] }),
    format === "webp" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
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
            id: "ts-jpg-png",
            checked: targetSizeEnabled,
            onChange: (e) => setTargetSizeEnabled(e.target.checked),
            className: "w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            htmlFor: "ts-jpg-png",
            className: "text-gray-200 text-sm font-medium cursor-pointer",
            children: "Target File Size (optional)"
          }
        ),
        targetSizeEnabled && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400 text-xs", children: "(auto-adjusts quality)" })
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
        title: "JPG to PNG Converter - Convert JPEG to PNG Online Free",
        description: "Convert JPG/JPEG images to PNG or WebP online for free. Advanced settings with before/after preview and instant download.",
        canonicalUrl: "https://docmastertools.com/jpg-to-png"
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
            { label: "JPG to PNG" }
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-gray-100 mb-2", children: "JPG to PNG Converter" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400", children: "Convert JPEG images to PNG or WebP format with quality control and before/after preview." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-800 rounded-2xl border border-gray-700 p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        AdvancedToolShell,
        {
          toolTitle: "JPG to PNG",
          acceptedFileTypes: "image/jpeg,image/jpg,image/*",
          acceptedFileTypesLabel: "Accepts JPEG/JPG files",
          settingsSlot,
          processingFunction
        }
      ) })
    ] })
  ] });
};
export {
  JPGToPNGPage as default
};
