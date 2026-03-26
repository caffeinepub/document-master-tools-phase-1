import { r as reactExports, j as jsxRuntimeExports } from "./index-BFVPq1mW.js";
import { B as BreadcrumbNavigation } from "./BreadcrumbNavigation--lqDW6Jm.js";
import { S as SEO } from "./SEO-B1UZw1Ql.js";
import { C as CircleAlert } from "./circle-alert-utpcndfh.js";
import { U as Upload } from "./upload-B2bz0haG.js";
import { R as RefreshCw } from "./refresh-cw-YScQuHMy.js";
import { A as ArrowDown, a as ArrowUp } from "./arrow-up-DKAXTu6o.js";
import { D as Download } from "./download-BN8DLBPc.js";
import "./house-77t33SZD.js";
import "./chevron-right-DG8wqv7r.js";
const dpiPresets = [72, 96, 150, 200, 300, 600];
function injectJPEGDPI(buffer, dpi) {
  const src = new Uint8Array(buffer);
  if (src[0] !== 255 || src[1] !== 216 || // SOI
  src[2] !== 255 || src[3] !== 224 || // APP0
  src[6] !== 74 || src[7] !== 70 || src[8] !== 73 || src[9] !== 70 || src[10] !== 0) {
    return buffer;
  }
  const out = new Uint8Array(buffer.slice(0));
  const view = new DataView(out.buffer);
  out[13] = 1;
  view.setUint16(14, dpi, false);
  view.setUint16(16, dpi, false);
  return out.buffer;
}
const CRC_TABLE = (() => {
  const t = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
    t[n] = c;
  }
  return t;
})();
function crc32(data) {
  let crc = 4294967295;
  for (const byte of data) crc = crc >>> 8 ^ CRC_TABLE[(crc ^ byte) & 255];
  return (crc ^ 4294967295) >>> 0;
}
function injectPNGDPI(buffer, dpi) {
  const src = new Uint8Array(buffer);
  const sig = [137, 80, 78, 71, 13, 10, 26, 10];
  if (sig.some((b, i) => src[i] !== b)) return buffer;
  const pixelsPerMeter = Math.round(dpi * 39.3701);
  const phys = new Uint8Array(21);
  const dv = new DataView(phys.buffer);
  dv.setUint32(0, 9, false);
  phys[4] = 112;
  phys[5] = 72;
  phys[6] = 89;
  phys[7] = 115;
  dv.setUint32(8, pixelsPerMeter, false);
  dv.setUint32(12, pixelsPerMeter, false);
  phys[16] = 1;
  dv.setUint32(17, crc32(phys.slice(4, 17)), false);
  const insertAt = 33;
  const result = new Uint8Array(src.length + 21);
  result.set(src.slice(0, insertAt), 0);
  result.set(phys, insertAt);
  result.set(src.slice(insertAt), insertAt + 21);
  return result.buffer;
}
function DPIChangerPage({ onNavigate }) {
  const [originalFile, setOriginalFile] = reactExports.useState(null);
  const [originalPreview, setOriginalPreview] = reactExports.useState(null);
  const [originalSize, setOriginalSize] = reactExports.useState(0);
  const [originalDimensions, setOriginalDimensions] = reactExports.useState(null);
  const [processedUrl, setProcessedUrl] = reactExports.useState(null);
  const [processedSize, setProcessedSize] = reactExports.useState(0);
  const [targetDPI, setTargetDPI] = reactExports.useState(300);
  const [customDPI, setCustomDPI] = reactExports.useState("");
  const [outputFormat, setOutputFormat] = reactExports.useState(
    "jpeg"
  );
  const [isProcessing, setIsProcessing] = reactExports.useState(false);
  const [errorMessage, setErrorMessage] = reactExports.useState(null);
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const canvasRef = reactExports.useRef(null);
  const fileInputRef = reactExports.useRef(null);
  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };
  const handleFileSelect = reactExports.useCallback((file) => {
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please upload a valid image file (JPEG, PNG, or WebP).");
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      setErrorMessage("File too large. Maximum size is 50 MB.");
      return;
    }
    setOriginalFile(file);
    setOriginalSize(file.size);
    setProcessedUrl(null);
    setProcessedSize(0);
    setErrorMessage(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      var _a;
      const dataUrl = (_a = e.target) == null ? void 0 : _a.result;
      setOriginalPreview(dataUrl);
      const img = new window.Image();
      img.onload = () => setOriginalDimensions({ w: img.width, h: img.height });
      img.src = dataUrl;
    };
    reader.onerror = () => setErrorMessage("Failed to read the file. Please try again.");
    reader.readAsDataURL(file);
  }, []);
  const handleDrop = reactExports.useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFileSelect(file);
    },
    [handleFileSelect]
  );
  const handleProcess = async () => {
    if (!originalPreview || !canvasRef.current) return;
    setIsProcessing(true);
    setErrorMessage(null);
    setProcessedUrl(null);
    setProcessedSize(0);
    const img = new window.Image();
    img.onerror = () => {
      setErrorMessage(
        "Failed to load the image for processing. The file may be corrupted."
      );
      setIsProcessing(false);
    };
    img.onload = () => {
      try {
        const canvas = canvasRef.current;
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          setErrorMessage(
            "Canvas is not available. Please try a different browser."
          );
          setIsProcessing(false);
          return;
        }
        if (outputFormat === "jpeg") {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawImage(img, 0, 0);
        const mimeType = outputFormat === "jpeg" ? "image/jpeg" : outputFormat === "png" ? "image/png" : "image/webp";
        const effectiveDPI2 = customDPI ? Number(customDPI) : targetDPI;
        canvas.toBlob(
          async (blob) => {
            if (!blob) {
              setErrorMessage(
                "Failed to process image. Try a different output format."
              );
              setIsProcessing(false);
              return;
            }
            try {
              const rawBuffer = await blob.arrayBuffer();
              let finalBuffer;
              if (outputFormat === "jpeg") {
                finalBuffer = injectJPEGDPI(rawBuffer, effectiveDPI2);
              } else if (outputFormat === "png") {
                finalBuffer = injectPNGDPI(rawBuffer, effectiveDPI2);
              } else {
                finalBuffer = rawBuffer;
              }
              const finalBlob = new Blob([finalBuffer], { type: mimeType });
              const url = URL.createObjectURL(finalBlob);
              setProcessedUrl(url);
              setProcessedSize(finalBlob.size);
            } catch {
              const url = URL.createObjectURL(blob);
              setProcessedUrl(url);
              setProcessedSize(blob.size);
            }
            setIsProcessing(false);
          },
          mimeType,
          0.92
        );
      } catch (err) {
        setErrorMessage(
          err instanceof Error ? err.message : "An unexpected error occurred. Please try again."
        );
        setIsProcessing(false);
      }
    };
    img.src = originalPreview;
  };
  const handleDownload = () => {
    if (!processedUrl) return;
    const dpi = customDPI ? Number(customDPI) : targetDPI;
    const a = document.createElement("a");
    a.href = processedUrl;
    a.download = `image_${dpi}dpi.${outputFormat === "jpeg" ? "jpg" : outputFormat}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  const handleReset = () => {
    setOriginalFile(null);
    setOriginalPreview(null);
    setOriginalSize(0);
    setOriginalDimensions(null);
    setProcessedUrl(null);
    setProcessedSize(0);
    setCustomDPI("");
    setErrorMessage(null);
  };
  const effectiveDPI = customDPI ? Number(customDPI) : targetDPI;
  const sizeDiff = originalSize - processedSize;
  const sizePct = processedSize > 0 ? Math.round(Math.abs(sizeDiff / originalSize) * 100) : 0;
  const isReduction = sizeDiff >= 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen py-8 px-4",
      style: { background: "linear-gradient(135deg, #0f172a, #1e293b)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SEO,
          {
            title: "DPI Changer Online Free | DocMasterTools",
            description: "Change image DPI/resolution online for free. Supports 72, 96, 150, 200, 300, and 600 DPI presets.",
            canonicalUrl: "https://docmastertools.com/image-tools/dpi-changer"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef, className: "hidden" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            BreadcrumbNavigation,
            {
              items: [
                {
                  label: "Image Tools",
                  onClick: () => onNavigate == null ? void 0 : onNavigate("image-tools")
                },
                { label: "DPI Changer" }
              ],
              onNavigate
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-bold text-white mb-3", children: "DPI Changer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 max-w-2xl mx-auto", children: "Change image DPI/resolution for print and digital use. DPI metadata is embedded directly into the output file." })
          ] }),
          errorMessage && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-red-900/50 border border-red-600 rounded-xl p-4 mb-6 flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-5 h-5 text-red-400 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-300 text-sm", children: errorMessage })
          ] }),
          !originalFile && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                role: "button",
                tabIndex: 0,
                onDrop: handleDrop,
                onDragOver: (e) => {
                  e.preventDefault();
                  setIsDragging(true);
                },
                onDragLeave: () => setIsDragging(false),
                onClick: () => {
                  var _a;
                  return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                },
                onKeyDown: (e) => {
                  var _a;
                  if (e.key === "Enter" || e.key === " ")
                    (_a = fileInputRef.current) == null ? void 0 : _a.click();
                },
                className: `w-full border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors duration-200 flex flex-col items-center justify-center min-h-[200px] ${isDragging ? "border-blue-400 bg-blue-900/20" : "border-gray-600 hover:border-blue-500 hover:bg-gray-800/50"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-12 h-12 text-gray-400 mb-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-medium mb-1", children: "Click to upload or drag and drop" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-sm", children: "JPEG, PNG, or WebP — max 50 MB" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref: fileInputRef,
                type: "file",
                accept: "image/jpeg,image/png,image/webp,image/*",
                className: "hidden",
                onChange: (e) => {
                  var _a;
                  const f = (_a = e.target.files) == null ? void 0 : _a[0];
                  if (f) handleFileSelect(f);
                  e.target.value = "";
                }
              }
            )
          ] }),
          originalFile && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5 p-3 bg-gray-800 rounded-lg", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-5 h-5 text-blue-400" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-sm font-medium truncate", children: originalFile.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-slate-400 text-xs", children: [
                    formatSize(originalSize),
                    originalDimensions && ` · ${originalDimensions.w} × ${originalDimensions.h} px`
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white font-semibold mb-4", children: "DPI Settings" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "block text-slate-300 text-sm mb-3", children: "Select DPI Preset" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: dpiPresets.map((dpi) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      setTargetDPI(dpi);
                      setCustomDPI("");
                    },
                    className: `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${targetDPI === dpi && !customDPI ? "bg-blue-600 text-white" : "bg-gray-700 text-slate-300 hover:bg-gray-600"}`,
                    children: [
                      dpi,
                      " DPI"
                    ]
                  },
                  dpi
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "dpi-custom-input",
                    className: "block text-slate-300 text-sm mb-2",
                    children: "Custom DPI (optional)"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "dpi-custom-input",
                    type: "number",
                    min: 1,
                    max: 1200,
                    value: customDPI,
                    onChange: (e) => setCustomDPI(e.target.value),
                    placeholder: "Enter custom DPI...",
                    className: "w-full bg-gray-800 border border-gray-600 text-white rounded-lg px-3 py-2 text-sm"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "dpi-format-select",
                    className: "block text-slate-300 text-sm mb-2",
                    children: "Output Format"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    id: "dpi-format-select",
                    value: outputFormat,
                    onChange: (e) => {
                      setOutputFormat(e.target.value);
                      setProcessedUrl(null);
                      setProcessedSize(0);
                    },
                    className: "w-full bg-gray-800 border border-gray-600 text-white rounded-lg px-3 py-2 text-sm",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "jpeg", children: "JPEG (DPI metadata embedded)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "png", children: "PNG (DPI metadata embedded)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "webp", children: "WebP" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-slate-400 text-xs mb-4", children: [
                "Target DPI:",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-blue-400 font-semibold", children: [
                  effectiveDPI,
                  " DPI"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handleProcess,
                    disabled: isProcessing,
                    className: "flex-1 min-h-[48px] px-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2",
                    children: isProcessing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 animate-spin" }),
                      " ",
                      "Processing..."
                    ] }) : "Change DPI"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: handleReset,
                    disabled: isProcessing,
                    className: "min-h-[48px] px-6 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
                      " Reset"
                    ]
                  }
                )
              ] })
            ] }),
            isProcessing && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6 flex items-center justify-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-6 h-6 text-blue-400 animate-spin" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 text-sm", children: "Processing image, please wait..." })
            ] }),
            processedUrl && !isProcessing && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-white font-semibold mb-4 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400", children: "⚡" }),
                  " Processing Results"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3 mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-800 rounded-lg p-3 text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-xs mb-1", children: "Original Size" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-sm font-semibold", children: formatSize(originalSize) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-800 rounded-lg p-3 text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-xs mb-1", children: "New Size" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-green-400 text-sm font-semibold", children: formatSize(processedSize) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-800 rounded-lg p-3 text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-xs mb-1", children: "Change" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "p",
                      {
                        className: `text-sm font-semibold flex items-center justify-center gap-1 ${isReduction ? "text-green-400" : "text-yellow-400"}`,
                        children: [
                          isReduction ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { className: "w-3 h-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { className: "w-3 h-3" }),
                          sizePct,
                          "% ",
                          isReduction ? "smaller" : "larger"
                        ]
                      }
                    )
                  ] })
                ] }),
                originalDimensions && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-800 rounded-lg p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-xs mb-1", children: "Image Dimensions" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-300 text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400", children: "Size:" }),
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-white", children: [
                      originalDimensions.w,
                      " × ",
                      originalDimensions.h,
                      " px"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-600 mx-2", children: "·" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-blue-400 font-medium", children: [
                      effectiveDPI,
                      " DPI"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500 text-xs ml-2", children: "(embedded in file metadata)" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white font-semibold mb-4", children: "Preview" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-xs font-medium uppercase tracking-wide mb-2", children: "Original" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center min-h-[160px] p-2", children: originalPreview && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: originalPreview,
                        alt: "Original",
                        className: "max-w-full rounded object-contain max-h-48"
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-xs mt-2", children: formatSize(originalSize) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-slate-400 text-xs font-medium uppercase tracking-wide mb-2", children: [
                      "Processed (",
                      effectiveDPI,
                      " DPI)"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center min-h-[160px] p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: processedUrl,
                        alt: "Processed",
                        className: "max-w-full rounded object-contain max-h-48"
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-green-400 text-xs mt-2", children: formatSize(processedSize) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: handleDownload,
                    className: "w-full min-h-[48px] px-6 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
                      " Download Image (",
                      effectiveDPI,
                      " DPI)"
                    ]
                  }
                )
              ] })
            ] })
          ] })
        ] })
      ]
    }
  );
}
export {
  DPIChangerPage as default
};
