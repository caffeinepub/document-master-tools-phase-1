import { r as reactExports, j as jsxRuntimeExports } from "./index-BK1nStnW.js";
import { U as Upload } from "./upload-BCLg8s-Z.js";
function FileUploadZone({
  onFileSelect,
  accept = "*",
  multiple = false,
  maxSize = 50 * 1024 * 1024,
  description = "Click to upload or drag and drop"
}) {
  const handleDrop = reactExports.useCallback(
    (e) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        if (files[0].size > maxSize) {
          alert(
            `File size exceeds ${Math.round(maxSize / 1024 / 1024)}MB limit`
          );
          return;
        }
        onFileSelect(files[0]);
      }
    },
    [onFileSelect, maxSize]
  );
  const handleDragOver = reactExports.useCallback((e) => {
    e.preventDefault();
  }, []);
  const handleFileInput = reactExports.useCallback(
    (e) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        if (files[0].size > maxSize) {
          alert(
            `File size exceeds ${Math.round(maxSize / 1024 / 1024)}MB limit`
          );
          return;
        }
        onFileSelect(files[0]);
      }
    },
    [onFileSelect, maxSize]
  );
  const handleTouch = reactExports.useCallback((e) => {
    var _a;
    e.preventDefault();
    (_a = document.getElementById("file-input")) == null ? void 0 : _a.click();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      onDrop: handleDrop,
      onDragOver: handleDragOver,
      onTouchStart: handleTouch,
      className: "border-2 border-dashed border-border rounded-lg p-8 md:p-12 text-center hover:border-primary/50 transition-colors cursor-pointer bg-muted/30 min-h-[200px] flex flex-col items-center justify-center touch-manipulation",
      onClick: () => {
        var _a;
        return (_a = document.getElementById("file-input")) == null ? void 0 : _a.click();
      },
      onKeyDown: (e) => {
        var _a;
        if (e.key === "Enter" || e.key === " ")
          (_a = document.getElementById("file-input")) == null ? void 0 : _a.click();
      },
      role: "button",
      tabIndex: 0,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: "/assets/generated/upload-illustration.dim_300x200.png",
            alt: "Upload",
            className: "w-24 md:w-32 h-auto mx-auto mb-4 opacity-60"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-10 md:h-12 w-10 md:w-12 mx-auto mb-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base md:text-lg font-medium mb-2", children: description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs md:text-sm text-muted-foreground", children: [
          "Maximum file size: ",
          Math.round(maxSize / 1024 / 1024),
          "MB"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "file-input",
            type: "file",
            accept,
            multiple,
            onChange: handleFileInput,
            className: "hidden"
          }
        )
      ]
    }
  );
}
export {
  FileUploadZone as F
};
