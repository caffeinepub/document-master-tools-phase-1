import { r as reactExports, j as jsxRuntimeExports } from "./index-YN_OslaE.js";
import { B as BreadcrumbNavigation } from "./BreadcrumbNavigation-DM_u2Ewn.js";
import { S as SEO } from "./SEO-DRKgHPjT.js";
import { C as CircleAlert } from "./circle-alert-D_hdXq39.js";
import { U as Upload } from "./upload-DORtw0Gt.js";
import { R as RefreshCw } from "./refresh-cw-DqTS2Z3F.js";
import { A as ArrowDown, a as ArrowUp } from "./arrow-up-BvhRKI9_.js";
import { D as Download } from "./download-CGoTQdDD.js";
import "./house-CI4Q4zpu.js";
import "./chevron-right-BPoM3n0-.js";
function ImageCompressorPage({
  onNavigate
}) {
  const [originalFile, setOriginalFile] = reactExports.useState(null);
  const [originalPreview, setOriginalPreview] = reactExports.useState(null);
  const [compressedUrl, setCompressedUrl] = reactExports.useState(null);
  const [quality, setQuality] = reactExports.useState(80);
  const [outputFormat, setOutputFormat] = reactExports.useState(
    "jpeg"
  );
  const [originalSize, setOriginalSize] = reactExports.useState(0);
  const [compressedSize, setCompressedSize] = reactExports.useState(0);
  const [originalDimensions, setOriginalDimensions] = reactExports.useState(null);
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
      setErrorMessage("Please select a valid image file (JPEG, PNG, or WebP).");
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      setErrorMessage(
        "File size exceeds 50 MB. Please choose a smaller image."
      );
      return;
    }
    setOriginalFile(file);
    setOriginalSize(file.size);
    setCompressedUrl(null);
    setCompressedSize(0);
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
    reader.onerror = () => {
      setErrorMessage("Failed to read the selected file. Please try again.");
    };
    reader.readAsDataURL(file);
  }, []);
  const handleInputChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
    e.target.value = "";
  };
  const handleDrop = reactExports.useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFileSelect(files[0]);
      }
    },
    [handleFileSelect]
  );
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleCompress = () => {
    if (!originalFile || !originalPreview || !canvasRef.current) {
      setErrorMessage("Please upload an image first.");
      return;
    }
    setIsProcessing(true);
    setErrorMessage(null);
    setCompressedUrl(null);
    setCompressedSize(0);
    const img = new window.Image();
    img.onload = () => {
      try {
        const canvas = canvasRef.current;
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          setErrorMessage("Canvas context unavailable. Please try again.");
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
        const qualityValue = outputFormat === "png" ? void 0 : quality / 100;
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              setErrorMessage(
                "Compression failed: could not generate output. Try a different format."
              );
              setIsProcessing(false);
              return;
            }
            setCompressedSize(blob.size);
            setCompressedUrl((prev) => {
              if (prev) URL.revokeObjectURL(prev);
              return URL.createObjectURL(blob);
            });
            setIsProcessing(false);
          },
          mimeType,
          qualityValue
        );
      } catch (err) {
        console.error("Compression error:", err);
        setErrorMessage(
          "An unexpected error occurred during compression. Please try again."
        );
        setIsProcessing(false);
      }
    };
    img.onerror = () => {
      setErrorMessage(
        "Failed to load the image for processing. The file may be corrupted."
      );
      setIsProcessing(false);
    };
    img.src = originalPreview;
  };
  const handleDownload = () => {
    if (!compressedUrl) return;
    const a = document.createElement("a");
    a.href = compressedUrl;
    const baseName = (originalFile == null ? void 0 : originalFile.name.replace(/\.[^.]+$/, "")) ?? "image";
    a.download = `${baseName}-compressed.${outputFormat}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  const handleReset = () => {
    if (compressedUrl) URL.revokeObjectURL(compressedUrl);
    setOriginalFile(null);
    setOriginalPreview(null);
    setCompressedUrl(null);
    setOriginalSize(0);
    setCompressedSize(0);
    setOriginalDimensions(null);
    setErrorMessage(null);
    setQuality(80);
    setOutputFormat("jpeg");
  };
  const sizeDiff = originalSize - compressedSize;
  const sizePct = compressedSize > 0 ? Math.round(Math.abs(sizeDiff / originalSize) * 100) : 0;
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
            title: "Image Compressor Online Free | DocMasterTools",
            description: "Compress images online for free without losing quality. Supports JPEG, PNG, and WebP formats.",
            canonicalUrl: "https://docmastertools.com/image-tools/image-compressor"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef, style: { display: "none" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            BreadcrumbNavigation,
            {
              items: [
                {
                  label: "Image Tools",
                  onClick: () => onNavigate == null ? void 0 : onNavigate("image-tools")
                },
                { label: "Image Compressor" }
              ],
              onNavigate
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-bold text-white mb-3", children: "Image Compressor" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 max-w-2xl mx-auto", children: "Compress images without visible quality loss. Supports JPEG, PNG, and WebP formats. All processing is done in your browser." })
          ] }),
          errorMessage && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "compressor.error_state",
              className: "bg-red-900/50 border border-red-600 rounded-xl p-4 mb-6 flex items-start gap-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-5 h-5 text-red-400 shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-300 text-sm", children: errorMessage })
              ]
            }
          ),
          !originalFile && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": "compressor.dropzone",
                onDrop: handleDrop,
                onDragOver: handleDragOver,
                onDragLeave: handleDragLeave,
                onClick: () => {
                  var _a;
                  return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                },
                className: `w-full border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors duration-200 flex flex-col items-center justify-center min-h-[200px] bg-transparent ${isDragging ? "border-blue-400 bg-blue-900/20" : "border-gray-600 hover:border-blue-500 hover:bg-gray-800/50"}`,
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
                onChange: handleInputChange,
                "data-ocid": "compressor.upload_button"
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
                    "Original: ",
                    formatSize(originalSize),
                    originalDimensions && ` · ${originalDimensions.w} × ${originalDimensions.h} px`
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white font-semibold mb-4", children: "Compression Settings" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "compress-format-select",
                      className: "block text-slate-300 text-sm mb-2",
                      children: "Output Format"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "select",
                    {
                      id: "compress-format-select",
                      "data-ocid": "compressor.select",
                      value: outputFormat,
                      onChange: (e) => {
                        setOutputFormat(
                          e.target.value
                        );
                        setCompressedUrl(null);
                        setCompressedSize(0);
                        setErrorMessage(null);
                      },
                      className: "w-full bg-gray-800 border border-gray-600 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "jpeg", children: "JPEG (best for photos)" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "png", children: "PNG (lossless)" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "webp", children: "WebP (modern, smallest)" })
                      ]
                    }
                  ),
                  outputFormat === "png" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 text-xs mt-1", children: "PNG is lossless — quality slider has no effect" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "label",
                    {
                      htmlFor: "compress-quality-range",
                      className: "block text-slate-300 text-sm mb-2",
                      children: [
                        "Quality:",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-blue-400 font-semibold", children: [
                          quality,
                          "%"
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "compress-quality-range",
                      "data-ocid": "compressor.input",
                      type: "range",
                      min: 10,
                      max: 100,
                      step: 5,
                      value: quality,
                      disabled: outputFormat === "png",
                      onChange: (e) => {
                        setQuality(Number(e.target.value));
                        setCompressedUrl(null);
                        setCompressedSize(0);
                        setErrorMessage(null);
                      },
                      className: "w-full accent-blue-500 disabled:opacity-40"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-slate-500 text-xs mt-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "10% (smallest)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "100% (best quality)" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "compressor.primary_button",
                    onClick: handleCompress,
                    disabled: isProcessing,
                    className: "flex-1 min-h-[48px] px-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2",
                    children: isProcessing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 animate-spin" }),
                      "Compressing..."
                    ] }) : "Compress Image"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "compressor.secondary_button",
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
            isProcessing && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": "compressor.loading_state",
                className: "bg-gray-900 rounded-xl p-6 border border-gray-700 mb-6 flex items-center justify-center gap-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-6 h-6 text-blue-400 animate-spin" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 text-sm", children: "Compressing image, please wait..." })
                ]
              }
            ),
            compressedUrl && !isProcessing && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-white font-semibold mb-4 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400", children: "⚡" }),
                  " Compression Results"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3 mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-800 rounded-lg p-3 text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-xs mb-1", children: "Original Size" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-sm font-semibold", children: formatSize(originalSize) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-800 rounded-lg p-3 text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-xs mb-1", children: "New Size" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-green-400 text-sm font-semibold", children: formatSize(compressedSize) })
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
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400", children: "Original:" }),
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-white", children: [
                      originalDimensions.w,
                      " × ",
                      originalDimensions.h,
                      " px"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-600 mx-2", children: "·" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400", children: "Compressed:" }),
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-blue-400", children: [
                      originalDimensions.w,
                      " × ",
                      originalDimensions.h,
                      " px"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-600 text-xs ml-2", children: "(same dimensions, reduced file size)" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white font-semibold mb-4", children: "Side-by-Side Preview" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-xs font-medium uppercase tracking-wide mb-2", children: "Original" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center min-h-[160px] p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
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
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-xs font-medium uppercase tracking-wide mb-2", children: "Compressed" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center min-h-[160px] p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: compressedUrl,
                        alt: "Compressed",
                        className: "max-w-full rounded object-contain max-h-48"
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-green-400 text-xs mt-2", children: [
                      formatSize(compressedSize),
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          className: isReduction ? "text-green-400" : "text-yellow-400",
                          children: [
                            "(",
                            sizePct,
                            "% ",
                            isReduction ? "smaller" : "larger",
                            ")"
                          ]
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "compressor.primary_button",
                    onClick: handleDownload,
                    className: "w-full min-h-[48px] px-6 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
                      " Download Compressed Image"
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
  ImageCompressorPage as default
};
