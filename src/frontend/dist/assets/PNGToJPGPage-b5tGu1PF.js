import { r as reactExports, j as jsxRuntimeExports } from "./index-BK1nStnW.js";
import { L as Label, I as Input } from "./input-D5fftGWB.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DtX__EcZ.js";
import { S as Slider } from "./slider-DBtJzor5.js";
import { A as AdvancedToolShell } from "./AdvancedToolShell-CouWcy3g.js";
import { B as BreadcrumbNavigation } from "./BreadcrumbNavigation-B800FblV.js";
import { S as SEO } from "./SEO-C_L06y5W.js";
import "./utils-Bmita3Ip.js";
import "./index-IXOTxK3N.js";
import "./index-C7kgm_TX.js";
import "./index-DgHemueb.js";
import "./upload-BCLg8s-Z.js";
import "./circle-check-big-C6nUF8Wo.js";
import "./circle-alert-xgi4hUd9.js";
import "./eye-D53a726R.js";
import "./download-DrnSnE1m.js";
import "./zap-CT6qXcwZ.js";
import "./arrow-up-Udz1gbiu.js";
import "./house-DWCPoK9q.js";
import "./chevron-right-CZ2YD_lG.js";
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
const PNGToJPGPage = ({
  onNavigate
}) => {
  const [format, setFormat] = reactExports.useState("jpeg");
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
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          const mimeType = `image/${format}`;
          const ext = format === "jpeg" ? "jpg" : "webp";
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
              blob = await new Promise((res, rej) => {
                canvas.toBlob(
                  (b) => b ? res(b) : rej(new Error("Conversion failed")),
                  mimeType,
                  quality / 100
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
                Quality: targetSizeEnabled ? `Target ≤${targetSize}${targetSizeUnit}` : `${quality}%`
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
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "jpeg", children: "JPEG (smaller file size)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "webp", children: "WebP (modern, smallest)" })
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
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
            id: "ts-png-jpg",
            checked: targetSizeEnabled,
            onChange: (e) => setTargetSizeEnabled(e.target.checked),
            className: "w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            htmlFor: "ts-png-jpg",
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
        title: "PNG to JPG Converter - Convert PNG to JPEG Online Free",
        description: "Convert PNG images to JPEG or WebP online for free. Quality control, before/after preview, and instant download.",
        canonicalUrl: "https://docmastertools.com/png-to-jpg"
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
            { label: "PNG to JPG" }
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-gray-100 mb-2", children: "PNG to JPG Converter" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400", children: "Convert PNG images to JPEG or WebP format with quality control and before/after preview." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-800 rounded-2xl border border-gray-700 p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        AdvancedToolShell,
        {
          toolTitle: "PNG to JPG",
          acceptedFileTypes: "image/png,image/webp,image/*",
          acceptedFileTypesLabel: "Accepts PNG, WebP, and other image files",
          settingsSlot,
          processingFunction
        }
      ) })
    ] })
  ] });
};
export {
  PNGToJPGPage as default
};
