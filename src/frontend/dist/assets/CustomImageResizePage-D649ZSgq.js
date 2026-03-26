import { r as reactExports, j as jsxRuntimeExports } from "./index-BFVPq1mW.js";
import { L as Label, I as Input } from "./input-Djza26gp.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BshjgHB9.js";
import { A as AdvancedToolShell } from "./AdvancedToolShell-DdiXJmHk.js";
import { B as BreadcrumbNavigation } from "./BreadcrumbNavigation--lqDW6Jm.js";
import { S as SEO } from "./SEO-B1UZw1Ql.js";
import "./utils-BpWBj8TO.js";
import "./index-IXOTxK3N.js";
import "./index-NoZ9Ynb9.js";
import "./index-Bz7eJ3CA.js";
import "./upload-B2bz0haG.js";
import "./circle-check-big-ChSD8Z6F.js";
import "./circle-alert-utpcndfh.js";
import "./eye-yE3rb4-E.js";
import "./download-BN8DLBPc.js";
import "./zap-DQK-4J8m.js";
import "./arrow-up-DKAXTu6o.js";
import "./house-77t33SZD.js";
import "./chevron-right-DG8wqv7r.js";
function convertPhysicalToPixels(width, height, unit, dpi) {
  let widthInches;
  let heightInches;
  switch (unit) {
    case "mm":
      widthInches = width / 25.4;
      heightInches = height / 25.4;
      break;
    case "cm":
      widthInches = width / 2.54;
      heightInches = height / 2.54;
      break;
    default:
      widthInches = width;
      heightInches = height;
      break;
  }
  return {
    width: Math.round(widthInches * dpi),
    height: Math.round(heightInches * dpi)
  };
}
async function resizeToTargetFileSize(canvas, targetSizeKB, mimeType = "image/jpeg") {
  const targetBytes = targetSizeKB * 1024;
  if (mimeType === "image/png") {
    return new Promise((resolve) => {
      canvas.toBlob(resolve, "image/png");
    });
  }
  let lo = 0.01;
  let hi = 1;
  let bestBlob = null;
  for (let i = 0; i < 12; i++) {
    const mid = (lo + hi) / 2;
    const blob = await new Promise((resolve) => {
      canvas.toBlob(resolve, mimeType, mid);
    });
    if (!blob) break;
    if (blob.size <= targetBytes) {
      bestBlob = blob;
      lo = mid;
    } else {
      hi = mid;
    }
    if (Math.abs(blob.size - targetBytes) / targetBytes < 0.02) {
      bestBlob = blob;
      break;
    }
  }
  if (!bestBlob) {
    bestBlob = await new Promise((resolve) => {
      canvas.toBlob(resolve, mimeType, 0.01);
    });
  }
  return bestBlob;
}
const SOCIAL_PRESETS = [
  { label: "Instagram Post", platform: "Instagram", width: 1080, height: 1080 },
  {
    label: "Instagram Story",
    platform: "Instagram",
    width: 1080,
    height: 1920
  },
  { label: "Facebook Post", platform: "Facebook", width: 1200, height: 630 },
  { label: "Facebook Cover", platform: "Facebook", width: 820, height: 312 },
  { label: "YouTube Thumbnail", platform: "YouTube", width: 1280, height: 720 },
  {
    label: "YouTube Channel Art",
    platform: "YouTube",
    width: 2560,
    height: 1440
  },
  {
    label: "X (Twitter) Post",
    platform: "X (Twitter)",
    width: 1200,
    height: 675
  },
  {
    label: "X (Twitter) Header",
    platform: "X (Twitter)",
    width: 1500,
    height: 500
  },
  {
    label: "TikTok Video Cover",
    platform: "TikTok",
    width: 1080,
    height: 1920
  },
  {
    label: "LinkedIn Personal Banner",
    platform: "LinkedIn",
    width: 1584,
    height: 396
  },
  {
    label: "LinkedIn Company Banner",
    platform: "LinkedIn",
    width: 1128,
    height: 191
  },
  { label: "Pinterest Pin", platform: "Pinterest", width: 1e3, height: 1500 },
  { label: "Snap Story", platform: "Snap", width: 1080, height: 1920 },
  { label: "Tumblr Post", platform: "Tumblr", width: 500, height: 750 }
];
const EASY_PRESETS = [
  { label: "Small (640×480)", width: 640, height: 480 },
  { label: "Medium (1280×960)", width: 1280, height: 960 },
  { label: "Large (1920×1440)", width: 1920, height: 1440 }
];
const DIMENSION_PRESETS = [
  { label: "800 × 600", width: 800, height: 600 },
  { label: "1280 × 720 (HD)", width: 1280, height: 720 },
  { label: "1920 × 1080 (Full HD)", width: 1920, height: 1080 },
  { label: "2560 × 1440 (2K)", width: 2560, height: 1440 },
  { label: "3840 × 2160 (4K)", width: 3840, height: 2160 }
];
const CustomImageResizePage = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = reactExports.useState("easy");
  const [easyPreset, setEasyPreset] = reactExports.useState("Medium (1280×960)");
  const [percentValue, setPercentValue] = reactExports.useState(50);
  const [dimPreset, setDimPreset] = reactExports.useState("1920 × 1080 (Full HD)");
  const [isCustomDim, setIsCustomDim] = reactExports.useState(false);
  const [customWidth, setCustomWidth] = reactExports.useState(1920);
  const [customHeight, setCustomHeight] = reactExports.useState(1080);
  const [maintainAspect, setMaintainAspect] = reactExports.useState(true);
  const [lockedAspectRatio, setLockedAspectRatio] = reactExports.useState(
    null
  );
  const [fileSizePreset, setFileSizePreset] = reactExports.useState(500);
  const [isCustomFileSize, setIsCustomFileSize] = reactExports.useState(false);
  const [customFileSizeValue, setCustomFileSizeValue] = reactExports.useState(500);
  const [customFileSizeUnit, setCustomFileSizeUnit] = reactExports.useState(
    "KB"
  );
  const [printWidth, setPrintWidth] = reactExports.useState(210);
  const [printHeight, setPrintHeight] = reactExports.useState(297);
  const [printUnit, setPrintUnit] = reactExports.useState("mm");
  const [printDpi, setPrintDpi] = reactExports.useState(300);
  const [socialPreset, setSocialPreset] = reactExports.useState("Instagram Post");
  const [format, setFormat] = reactExports.useState("jpeg");
  const [quality, setQuality] = reactExports.useState(90);
  const processingFunction = reactExports.useCallback(
    async (file) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(file);
        img.onload = async () => {
          URL.revokeObjectURL(url);
          const origW = img.naturalWidth;
          const origH = img.naturalHeight;
          try {
            let targetW = origW;
            let targetH = origH;
            let targetFileSizeKB = null;
            if (activeTab === "easy") {
              const preset = EASY_PRESETS.find((p) => p.label === easyPreset);
              if (preset) {
                targetW = preset.width;
                targetH = preset.height;
              }
            } else if (activeTab === "percentage") {
              targetW = Math.round(origW * percentValue / 100);
              targetH = Math.round(origH * percentValue / 100);
            } else if (activeTab === "dimensions") {
              if (isCustomDim) {
                targetW = customWidth;
                targetH = customHeight;
              } else {
                const preset = DIMENSION_PRESETS.find(
                  (p) => p.label === dimPreset
                );
                if (preset) {
                  targetW = preset.width;
                  targetH = preset.height;
                }
              }
            } else if (activeTab === "filesize") {
              targetW = origW;
              targetH = origH;
              if (isCustomFileSize) {
                const multiplier = customFileSizeUnit === "MB" ? 1024 : 1;
                targetFileSizeKB = customFileSizeValue * multiplier;
              } else {
                targetFileSizeKB = fileSizePreset;
              }
            } else if (activeTab === "print") {
              const dims = convertPhysicalToPixels(
                printWidth,
                printHeight,
                printUnit,
                printDpi
              );
              targetW = dims.width;
              targetH = dims.height;
            } else if (activeTab === "social") {
              const preset = SOCIAL_PRESETS.find(
                (p) => p.label === socialPreset
              );
              if (preset) {
                targetW = preset.width;
                targetH = preset.height;
              }
            }
            const canvas = document.createElement("canvas");
            canvas.width = targetW;
            canvas.height = targetH;
            const ctx = canvas.getContext("2d");
            if (!ctx) {
              reject(new Error("Canvas not supported"));
              return;
            }
            if (format === "jpeg") {
              ctx.fillStyle = "#ffffff";
              ctx.fillRect(0, 0, targetW, targetH);
            }
            ctx.drawImage(img, 0, 0, targetW, targetH);
            if (targetFileSizeKB !== null) {
              const mimeType2 = format === "png" ? "image/png" : format === "webp" ? "image/webp" : "image/jpeg";
              const blob = await resizeToTargetFileSize(
                canvas,
                targetFileSizeKB,
                mimeType2
              );
              if (!blob) {
                reject(new Error("Could not compress to target size"));
                return;
              }
              const ext = format === "jpeg" ? "jpg" : format;
              const baseName = file.name.replace(/\.[^.]+$/, "");
              const outputFileName = `${baseName}_${targetFileSizeKB}kb.${ext}`;
              const previewUrl = URL.createObjectURL(blob);
              resolve({
                blob,
                previewUrl,
                outputFileName,
                metadata: {
                  Dimensions: `${targetW}×${targetH}px`,
                  "Target Size": `${targetFileSizeKB}KB`,
                  "Actual Size": `${(blob.size / 1024).toFixed(1)}KB`,
                  Format: format.toUpperCase()
                }
              });
              return;
            }
            const mimeType = format === "png" ? "image/png" : format === "webp" ? "image/webp" : "image/jpeg";
            canvas.toBlob(
              (blob) => {
                if (!blob) {
                  reject(new Error("Processing failed"));
                  return;
                }
                const ext = format === "jpeg" ? "jpg" : format;
                const baseName = file.name.replace(/\.[^.]+$/, "");
                const outputFileName = `${baseName}_resized.${ext}`;
                const previewUrl = URL.createObjectURL(blob);
                resolve({
                  blob,
                  previewUrl,
                  outputFileName,
                  metadata: {
                    Dimensions: `${targetW}×${targetH}px`,
                    Format: format.toUpperCase(),
                    Quality: `${quality}%`
                  }
                });
              },
              mimeType,
              quality / 100
            );
          } catch (err) {
            reject(err);
          }
        };
        img.onerror = () => {
          URL.revokeObjectURL(url);
          reject(new Error("Failed to load image"));
        };
        img.src = url;
      });
    },
    [
      activeTab,
      easyPreset,
      percentValue,
      isCustomDim,
      customWidth,
      customHeight,
      dimPreset,
      fileSizePreset,
      isCustomFileSize,
      customFileSizeValue,
      customFileSizeUnit,
      printWidth,
      printHeight,
      printUnit,
      printDpi,
      socialPreset,
      format,
      quality
    ]
  );
  const tabs = [
    { id: "easy", label: "Easy" },
    { id: "percentage", label: "Percentage" },
    { id: "dimensions", label: "Dimensions" },
    { id: "filesize", label: "File Size" },
    { id: "print", label: "Print Size" },
    { id: "social", label: "Social Media" }
  ];
  const settingsSlot = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-gray-200 text-sm font-medium", children: "Resize Mode" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: tabs.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setActiveTab(tab.id),
          className: `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors min-h-[36px] ${activeTab === tab.id ? "bg-blue-600 text-white" : "bg-gray-700/60 text-slate-300 hover:bg-gray-600/60"}`,
          children: tab.label
        },
        tab.id
      )) })
    ] }),
    activeTab === "easy" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-gray-200 text-sm font-medium", children: "Size Preset" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: easyPreset, onValueChange: setEasyPreset, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-full bg-gray-700 border-gray-600 text-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "bg-gray-800 border-gray-600", children: EASY_PRESETS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: p.label, children: p.label }, p.label)) })
      ] })
    ] }),
    activeTab === "percentage" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-gray-200 text-sm font-medium", children: [
        "Percentage: ",
        percentValue,
        "%"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: [25, 40, 50, 75].map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setPercentValue(p),
          className: `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors min-h-[36px] ${percentValue === p ? "bg-blue-600 text-white" : "bg-gray-700/60 text-slate-300 hover:bg-gray-600/60"}`,
          children: [
            p,
            "%"
          ]
        },
        p
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          type: "number",
          min: 1,
          max: 500,
          value: percentValue,
          onChange: (e) => setPercentValue(Number(e.target.value)),
          className: "bg-gray-700 border-gray-600 text-gray-100",
          placeholder: "Custom %"
        }
      )
    ] }),
    activeTab === "dimensions" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-gray-200 text-sm font-medium", children: "Preset" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: isCustomDim ? "custom" : dimPreset,
            onValueChange: (v) => {
              if (v === "custom") {
                setIsCustomDim(true);
              } else {
                setIsCustomDim(false);
                setDimPreset(v);
                const found = DIMENSION_PRESETS.find((p) => p.label === v);
                if (found) {
                  setCustomWidth(found.width);
                  setCustomHeight(found.height);
                }
              }
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-full bg-gray-700 border-gray-600 text-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "bg-gray-800 border-gray-600", children: [
                DIMENSION_PRESETS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: p.label, children: p.label }, p.label)),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "custom", children: "Custom" })
              ] })
            ]
          }
        )
      ] }),
      isCustomDim && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-gray-200 text-xs", children: "Width (px)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: 1,
              value: customWidth,
              onChange: (e) => {
                const w = Math.max(1, Number(e.target.value));
                setCustomWidth(w);
                if (maintainAspect && lockedAspectRatio !== null) {
                  setCustomHeight(
                    Math.max(1, Math.round(w * lockedAspectRatio))
                  );
                }
              },
              className: "bg-gray-700 border-gray-600 text-gray-100"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-gray-200 text-xs", children: "Height (px)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: 1,
              value: customHeight,
              onChange: (e) => {
                const h = Math.max(1, Number(e.target.value));
                setCustomHeight(h);
                if (!maintainAspect) {
                  setLockedAspectRatio(
                    customWidth > 0 ? h / customWidth : null
                  );
                }
              },
              disabled: maintainAspect,
              className: "bg-gray-700 border-gray-600 text-gray-100 disabled:opacity-50"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "checkbox",
            checked: maintainAspect,
            onChange: (e) => {
              const checked = e.target.checked;
              setMaintainAspect(checked);
              if (checked && customWidth > 0 && customHeight > 0) {
                setLockedAspectRatio(customHeight / customWidth);
              }
            },
            className: "accent-blue-500"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-200 text-sm", children: "Maintain aspect ratio" })
      ] })
    ] }),
    activeTab === "filesize" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-gray-200 text-sm font-medium", children: "Target File Size" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: [100, 500, 1024, 2048].map((kb) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => {
            setFileSizePreset(kb);
            setIsCustomFileSize(false);
          },
          className: `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors min-h-[36px] ${!isCustomFileSize && fileSizePreset === kb ? "bg-blue-600 text-white" : "bg-gray-700/60 text-slate-300 hover:bg-gray-600/60"}`,
          children: kb >= 1024 ? `${kb / 1024}MB` : `${kb}KB`
        },
        kb
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            min: 1,
            value: customFileSizeValue,
            onChange: (e) => {
              setCustomFileSizeValue(Number(e.target.value));
              setIsCustomFileSize(true);
            },
            className: "flex-1 bg-gray-700 border-gray-600 text-gray-100",
            placeholder: "Custom size"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: customFileSizeUnit,
            onValueChange: (v) => setCustomFileSizeUnit(v),
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
    ] }),
    activeTab === "print" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-gray-200 text-sm font-medium", children: "Unit" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: printUnit,
            onValueChange: (v) => setPrintUnit(v),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-full bg-gray-700 border-gray-600 text-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "bg-gray-800 border-gray-600", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "mm", children: "Millimeters (mm)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "cm", children: "Centimeters (cm)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "inch", children: "Inches" })
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-gray-200 text-xs", children: [
            "Width (",
            printUnit,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: 1,
              value: printWidth,
              onChange: (e) => setPrintWidth(Number(e.target.value)),
              className: "bg-gray-700 border-gray-600 text-gray-100"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-gray-200 text-xs", children: [
            "Height (",
            printUnit,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: 1,
              value: printHeight,
              onChange: (e) => setPrintHeight(Number(e.target.value)),
              className: "bg-gray-700 border-gray-600 text-gray-100"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-gray-200 text-sm font-medium", children: "DPI" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: String(printDpi),
            onValueChange: (v) => setPrintDpi(Number(v)),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-full bg-gray-700 border-gray-600 text-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "bg-gray-800 border-gray-600", children: [72, 96, 150, 200, 300, 600].map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: String(d), children: [
                d,
                " DPI"
              ] }, d)) })
            ]
          }
        )
      ] })
    ] }),
    activeTab === "social" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-gray-200 text-sm font-medium", children: "Platform Preset" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: socialPreset, onValueChange: setSocialPreset, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-full bg-gray-700 border-gray-600 text-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "bg-gray-800 border-gray-600", children: SOCIAL_PRESETS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: p.label, children: [
          p.label,
          " (",
          p.width,
          "×",
          p.height,
          ")"
        ] }, p.label)) })
      ] })
    ] }),
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
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "jpeg", children: "JPEG" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "png", children: "PNG" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "webp", children: "WebP" })
            ] })
          ]
        }
      )
    ] }),
    format !== "png" && activeTab !== "filesize" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-gray-200 text-sm font-medium", children: [
        "Quality: ",
        quality,
        "%"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "range",
          min: 1,
          max: 100,
          value: quality,
          onChange: (e) => setQuality(Number(e.target.value)),
          className: "w-full accent-blue-500"
        }
      )
    ] })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gray-900 text-gray-100", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SEO,
      {
        title: "Custom Image Resize - Resize Images Online Free",
        description: "Resize images by percentage, dimensions, file size, print size, or social media presets. Free online image resizer with before/after preview.",
        canonicalUrl: "https://docmastertools.com/custom-image-resize"
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
            { label: "Custom Image Resize" }
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-gray-100 mb-2", children: "Custom Image Resize" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400", children: "Resize images by dimensions, percentage, file size, print size, or social media presets." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-800 rounded-2xl border border-gray-700 p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        AdvancedToolShell,
        {
          toolTitle: "Custom Image Resize",
          acceptedFileTypes: "image/jpeg,image/png,image/webp,image/gif,image/bmp",
          acceptedFileTypesLabel: "Supports JPEG, PNG, WebP, GIF, BMP",
          settingsSlot,
          processingFunction
        }
      ) })
    ] })
  ] });
};
export {
  CustomImageResizePage as default
};
