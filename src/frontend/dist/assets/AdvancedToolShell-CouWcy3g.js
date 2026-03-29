import { r as reactExports, j as jsxRuntimeExports, X, q as trackFileProcessed } from "./index-BK1nStnW.js";
import { U as Upload } from "./upload-BCLg8s-Z.js";
import { C as CircleCheckBig } from "./circle-check-big-C6nUF8Wo.js";
import { C as CircleAlert } from "./circle-alert-xgi4hUd9.js";
import { E as Eye } from "./eye-D53a726R.js";
import { D as Download } from "./download-DrnSnE1m.js";
import { Z as Zap } from "./zap-CT6qXcwZ.js";
import { A as ArrowDown, a as ArrowUp } from "./arrow-up-Udz1gbiu.js";
const AdvancedToolShell = ({
  toolTitle: _toolTitle,
  acceptedFileTypes = "image/*",
  acceptedFileTypesLabel,
  settingsSlot,
  processingFunction,
  outputFileName,
  maxFileSizeMB = 20,
  analyticsToolCategory = "image_tools"
}) => {
  const [file, setFile] = reactExports.useState(null);
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const [isProcessing, setIsProcessing] = reactExports.useState(false);
  const [result, setResult] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const [downloadTriggered, setDownloadTriggered] = reactExports.useState(false);
  const [originalDimensions, setOriginalDimensions] = reactExports.useState(null);
  const [originalPreviewUrl, setOriginalPreviewUrl] = reactExports.useState(
    null
  );
  const fileInputRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    return () => {
      if (originalPreviewUrl) URL.revokeObjectURL(originalPreviewUrl);
    };
  }, [originalPreviewUrl]);
  const handleFile = reactExports.useCallback(
    (f) => {
      if (maxFileSizeMB && f.size > maxFileSizeMB * 1024 * 1024) {
        setError(`File too large. Maximum size is ${maxFileSizeMB}MB.`);
        return;
      }
      setFile(f);
      setResult(null);
      setError(null);
      setDownloadTriggered(false);
      setOriginalDimensions(null);
      if (f.type.startsWith("image/")) {
        const url = URL.createObjectURL(f);
        setOriginalPreviewUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return url;
        });
        const img = new Image();
        img.onload = () => {
          setOriginalDimensions({ w: img.naturalWidth, h: img.naturalHeight });
        };
        img.onerror = () => {
        };
        img.src = url;
      } else {
        setOriginalPreviewUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return null;
        });
      }
    },
    [maxFileSizeMB]
  );
  const handleDrop = reactExports.useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      const dropped = e.dataTransfer.files[0];
      if (dropped) handleFile(dropped);
    },
    [handleFile]
  );
  const handleInputChange = reactExports.useCallback(
    (e) => {
      var _a;
      const selected = (_a = e.target.files) == null ? void 0 : _a[0];
      if (selected) handleFile(selected);
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    [handleFile]
  );
  const handleProcess = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);
    try {
      const res = await processingFunction(file);
      setResult(res);
      trackFileProcessed({
        toolName: (outputFileName == null ? void 0 : outputFileName.split("-")[0]) ?? "image_tool",
        toolCategory: analyticsToolCategory,
        fileType: file.type,
        fileSize: file.size
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Processing failed. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };
  const handleDownload = () => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result.previewUrl;
    a.download = outputFileName || result.outputFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setDownloadTriggered(true);
  };
  const handleReset = () => {
    setFile(null);
    setResult(null);
    setError(null);
    setDownloadTriggered(false);
    setOriginalDimensions(null);
    setOriginalPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };
  const parseDimensions = (dimStr) => {
    if (!dimStr) return null;
    const match = dimStr.match(/(\d+)[×x](\d+)/);
    if (!match) return null;
    return { w: Number(match[1]), h: Number(match[2]) };
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    !file && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
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
        role: "button",
        tabIndex: 0,
        className: `border-2 border-dashed rounded-xl p-8 md:p-12 text-center transition-colors cursor-pointer ${isDragging ? "border-blue-500 bg-blue-500/10" : "border-gray-600 hover:border-blue-400 bg-gray-700/30 hover:bg-gray-700/50"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 40, className: "mx-auto mb-3 text-gray-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-300 font-medium mb-1", children: [
            "Drop your file here or",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400", children: "click to upload" })
          ] }),
          acceptedFileTypesLabel && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-sm", children: acceptedFileTypesLabel }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-600 text-xs mt-1", children: [
            "Max ",
            maxFileSizeMB,
            "MB"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: fileInputRef,
              type: "file",
              accept: acceptedFileTypes,
              className: "hidden",
              onChange: handleInputChange
            }
          )
        ]
      }
    ),
    file && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between bg-gray-700/50 rounded-xl px-4 py-3 border border-gray-600", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 18, className: "text-green-400 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-200 text-sm font-medium truncate", children: file.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-xs", children: formatSize(file.size) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: handleReset,
          className: "ml-3 p-1.5 text-gray-400 hover:text-red-400 hover:bg-gray-600 rounded-lg transition-colors shrink-0",
          title: "Remove file",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 })
        }
      )
    ] }),
    file && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-700/30 rounded-xl p-4 md:p-5 border border-gray-600", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-gray-200 font-semibold text-sm mb-4", children: "Settings" }),
      settingsSlot
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 bg-red-900/30 border border-red-700/50 rounded-xl p-4 text-red-300 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 16, className: "shrink-0 mt-0.5" }),
      error
    ] }),
    file && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: handleProcess,
          disabled: isProcessing,
          className: "flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-lg w-full md:w-auto min-h-[48px]",
          children: isProcessing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white" }),
            "Processing..."
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 18 }),
            "Apply & Preview"
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: handleDownload,
          disabled: !result,
          className: "flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-lg w-full md:w-auto min-h-[48px]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 18 }),
            "Download"
          ]
        }
      )
    ] }),
    result && file && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-700/30 rounded-xl p-4 border border-gray-600", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-gray-200 font-semibold text-sm mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 16, className: "text-blue-400" }),
          "Size Comparison"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-800 rounded-lg p-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-xs mb-1", children: "Original Size" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-200 text-sm font-semibold", children: formatSize(file.size) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-800 rounded-lg p-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-xs mb-1", children: "New Size" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-green-400 text-sm font-semibold", children: formatSize(result.blob.size) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-800 rounded-lg p-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-xs mb-1", children: "Change" }),
            (() => {
              const diff = file.size - result.blob.size;
              const pct = Math.round(Math.abs(diff / file.size) * 100);
              const isReduction = diff >= 0;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  className: `text-sm font-semibold flex items-center justify-center gap-1 ${isReduction ? "text-green-400" : "text-red-400"}`,
                  children: [
                    isReduction ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { size: 12 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { size: 12 }),
                    pct,
                    "% ",
                    isReduction ? "smaller" : "larger"
                  ]
                }
              );
            })()
          ] })
        ] }),
        (() => {
          var _a;
          const processedDim = parseDimensions((_a = result.metadata) == null ? void 0 : _a.Dimensions);
          if (!originalDimensions && !processedDim) return null;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            originalDimensions && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-800 rounded-lg p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-xs mb-1", children: "Original Dimensions" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-200 text-sm font-medium", children: [
                originalDimensions.w,
                " × ",
                originalDimensions.h,
                " px"
              ] })
            ] }),
            processedDim && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-800 rounded-lg p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-xs mb-1", children: "Processed Dimensions" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-blue-400 text-sm font-medium", children: [
                processedDim.w,
                " × ",
                processedDim.h,
                " px"
              ] })
            ] })
          ] });
        })()
      ] }),
      result.metadata && Object.keys(result.metadata).filter((k) => k !== "Dimensions").length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-700/30 rounded-xl p-4 border border-gray-600", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-gray-200 font-semibold text-sm mb-3", children: "Output Details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: Object.entries(result.metadata).filter(([k]) => k !== "Dimensions").map(([key, value]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-800 rounded-lg p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-xs mb-1", children: key }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-200 text-sm font-medium", children: value })
        ] }, key)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-700/30 rounded-xl p-4 border border-gray-600", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-gray-200 font-semibold text-sm mb-3", children: "Side-by-Side Preview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-xs mb-2 text-center font-medium uppercase tracking-wide", children: "Original" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center min-h-[180px] p-2", children: originalPreviewUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: originalPreviewUrl,
                alt: "Original",
                className: "max-w-full rounded object-contain max-h-64"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-500 text-xs text-center mt-1", children: [
              formatSize(file.size),
              originalDimensions ? ` · ${originalDimensions.w}×${originalDimensions.h}px` : ""
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-xs mb-2 text-center font-medium uppercase tracking-wide", children: "Processed" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center min-h-[180px] p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: result.previewUrl,
                alt: "Processed",
                className: "max-w-full rounded object-contain max-h-64"
              }
            ) }),
            (() => {
              var _a;
              const processedDim = parseDimensions(
                (_a = result.metadata) == null ? void 0 : _a.Dimensions
              );
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-green-400 text-xs text-center mt-1", children: [
                formatSize(result.blob.size),
                processedDim ? ` · ${processedDim.w}×${processedDim.h}px` : ""
              ] });
            })()
          ] })
        ] })
      ] }),
      downloadTriggered && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-green-900/30 border border-green-700/50 rounded-xl p-4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-green-400 font-semibold text-sm", children: "✓ Download started!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-400 text-xs mt-1", children: [
          "Your file",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-200", children: outputFileName || result.outputFileName }),
          " ",
          "is downloading."
        ] })
      ] })
    ] })
  ] });
};
export {
  AdvancedToolShell as A
};
