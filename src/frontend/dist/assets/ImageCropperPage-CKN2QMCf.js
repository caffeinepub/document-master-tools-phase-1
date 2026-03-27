import { r as reactExports, j as jsxRuntimeExports } from "./index-5lKdoCW0.js";
import { B as BreadcrumbNavigation } from "./BreadcrumbNavigation-BPIV8DKu.js";
import { F as FileUploadZone } from "./FileUploadZone-DdQn2Tyi.js";
import { S as SEO } from "./SEO-CrxvtZlJ.js";
import { C as CircleAlert } from "./circle-alert-DGFzi1qZ.js";
import { R as RefreshCw } from "./refresh-cw-F-vYDdHB.js";
import { A as ArrowDown, a as ArrowUp } from "./arrow-up-BZovap1O.js";
import { D as Download } from "./download-DzKqyFkq.js";
import "./house-Cr78nhlO.js";
import "./chevron-right-Ci-Y7VDX.js";
import "./upload-DcBxV182.js";
const HANDLE_RADIUS = 12;
const HANDLE_SIZE = 10;
function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
function getHandlePositions(cx, cy, cw, ch) {
  return [
    { type: "resize-tl", hx: cx, hy: cy },
    { type: "resize-t", hx: cx + cw / 2, hy: cy },
    { type: "resize-tr", hx: cx + cw, hy: cy },
    { type: "resize-l", hx: cx, hy: cy + ch / 2 },
    { type: "resize-r", hx: cx + cw, hy: cy + ch / 2 },
    { type: "resize-bl", hx: cx, hy: cy + ch },
    { type: "resize-b", hx: cx + cw / 2, hy: cy + ch },
    { type: "resize-br", hx: cx + cw, hy: cy + ch }
  ];
}
function getCanvasCoords(canvas, e) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  return {
    x: (e.clientX - rect.left) * scaleX,
    y: (e.clientY - rect.top) * scaleY
  };
}
function ImageCropperPage({
  onNavigate
}) {
  const [phase, setPhase] = reactExports.useState("upload");
  const [originalFile, setOriginalFile] = reactExports.useState(null);
  const [originalSize, setOriginalSize] = reactExports.useState(0);
  const [originalDimensions, setOriginalDimensions] = reactExports.useState(null);
  const [cropRect, setCropRect] = reactExports.useState({
    x: 0,
    y: 0,
    w: 100,
    h: 100
  });
  const [aspectRatio, setAspectRatio] = reactExports.useState(null);
  const [outputFormat, setOutputFormat] = reactExports.useState(
    "jpeg"
  );
  const [quality, setQuality] = reactExports.useState(90);
  const [isProcessing, setIsProcessing] = reactExports.useState(false);
  const [errorMsg, setErrorMsg] = reactExports.useState(null);
  const [resultUrl, setResultUrl] = reactExports.useState(null);
  const [resultSize, setResultSize] = reactExports.useState(0);
  const [resultDimensions, setResultDimensions] = reactExports.useState(null);
  const imgRef = reactExports.useRef(null);
  const mainCanvasRef = reactExports.useRef(null);
  const previewCanvasRef = reactExports.useRef(null);
  const canvasContainerRef = reactExports.useRef(null);
  const canvasScaleRef = reactExports.useRef(1);
  const canvasOffsetXRef = reactExports.useRef(0);
  const canvasOffsetYRef = reactExports.useRef(0);
  const dragStateRef = reactExports.useRef(null);
  const cropRectRef = reactExports.useRef(cropRect);
  reactExports.useEffect(() => {
    cropRectRef.current = cropRect;
  }, [cropRect]);
  const imageToCanvas = reactExports.useCallback(
    (ix, iy) => ({
      cx: ix * canvasScaleRef.current + canvasOffsetXRef.current,
      cy: iy * canvasScaleRef.current + canvasOffsetYRef.current
    }),
    []
  );
  const canvasToImage = reactExports.useCallback(
    (cx, cy) => ({
      ix: (cx - canvasOffsetXRef.current) / canvasScaleRef.current,
      iy: (cy - canvasOffsetYRef.current) / canvasScaleRef.current
    }),
    []
  );
  const drawCanvas = reactExports.useCallback(() => {
    const canvas = mainCanvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const cr = cropRectRef.current;
    const scale = canvasScaleRef.current;
    const ox = canvasOffsetXRef.current;
    const oy = canvasOffsetYRef.current;
    const iw = img.naturalWidth * scale;
    const ih = img.naturalHeight * scale;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, ox, oy, iw, ih);
    ctx.fillStyle = "rgba(0,0,0,0.55)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const { cx: cropCanvasX, cy: cropCanvasY } = imageToCanvas(cr.x, cr.y);
    const cropCanvasW = cr.w * scale;
    const cropCanvasH = cr.h * scale;
    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fillRect(cropCanvasX, cropCanvasY, cropCanvasW, cropCanvasH);
    ctx.restore();
    ctx.save();
    ctx.beginPath();
    ctx.rect(cropCanvasX, cropCanvasY, cropCanvasW, cropCanvasH);
    ctx.clip();
    ctx.drawImage(img, ox, oy, iw, ih);
    ctx.restore();
    ctx.strokeStyle = "rgba(255,255,255,0.95)";
    ctx.lineWidth = 2;
    ctx.strokeRect(cropCanvasX, cropCanvasY, cropCanvasW, cropCanvasH);
    ctx.strokeStyle = "rgba(255,255,255,0.25)";
    ctx.lineWidth = 1;
    for (let i = 1; i <= 2; i++) {
      const gx = cropCanvasX + cropCanvasW * i / 3;
      const gy = cropCanvasY + cropCanvasH * i / 3;
      ctx.beginPath();
      ctx.moveTo(gx, cropCanvasY);
      ctx.lineTo(gx, cropCanvasY + cropCanvasH);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cropCanvasX, gy);
      ctx.lineTo(cropCanvasX + cropCanvasW, gy);
      ctx.stroke();
    }
    const handles = getHandlePositions(
      cropCanvasX,
      cropCanvasY,
      cropCanvasW,
      cropCanvasH
    );
    ctx.fillStyle = "white";
    ctx.strokeStyle = "rgba(0,0,0,0.5)";
    ctx.lineWidth = 1;
    for (const h of handles) {
      ctx.fillRect(
        h.hx - HANDLE_SIZE / 2,
        h.hy - HANDLE_SIZE / 2,
        HANDLE_SIZE,
        HANDLE_SIZE
      );
      ctx.strokeRect(
        h.hx - HANDLE_SIZE / 2,
        h.hy - HANDLE_SIZE / 2,
        HANDLE_SIZE,
        HANDLE_SIZE
      );
    }
  }, [imageToCanvas]);
  const updatePreview = reactExports.useCallback(() => {
    const previewCanvas = previewCanvasRef.current;
    const img = imgRef.current;
    if (!previewCanvas || !img) return;
    const ctx = previewCanvas.getContext("2d");
    if (!ctx) return;
    const cr = cropRectRef.current;
    ctx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
    if (cr.w > 0 && cr.h > 0) {
      ctx.drawImage(
        img,
        cr.x,
        cr.y,
        cr.w,
        cr.h,
        0,
        0,
        previewCanvas.width,
        previewCanvas.height
      );
    }
  }, []);
  reactExports.useEffect(() => {
    if (phase === "crop") {
      drawCanvas();
      updatePreview();
    }
  }, [phase, drawCanvas, updatePreview]);
  reactExports.useEffect(() => {
    if (phase === "crop") {
      drawCanvas();
      updatePreview();
    }
  }, [cropRect, phase, drawCanvas, updatePreview]);
  const handleFileSelect = reactExports.useCallback((file) => {
    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please upload a valid image file (JPEG, PNG, or WebP).");
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      setErrorMsg("File size exceeds 50 MB. Please choose a smaller image.");
      return;
    }
    setErrorMsg(null);
    setOriginalFile(file);
    setOriginalSize(file.size);
    setResultUrl(null);
    setResultSize(0);
    setResultDimensions(null);
    const img = new window.Image();
    img.onload = () => {
      imgRef.current = img;
      setOriginalDimensions({ w: img.naturalWidth, h: img.naturalHeight });
      const container = canvasContainerRef.current;
      const maxW = container ? container.clientWidth - 8 : 520;
      const maxH = 420;
      const scale = Math.min(
        maxW / img.naturalWidth,
        maxH / img.naturalHeight,
        1
      );
      canvasScaleRef.current = scale;
      canvasOffsetXRef.current = 0;
      canvasOffsetYRef.current = 0;
      const displayW = Math.round(img.naturalWidth * scale);
      const displayH = Math.round(img.naturalHeight * scale);
      if (mainCanvasRef.current) {
        mainCanvasRef.current.width = displayW;
        mainCanvasRef.current.height = displayH;
      }
      const initialCrop = {
        x: 0,
        y: 0,
        w: img.naturalWidth,
        h: img.naturalHeight
      };
      cropRectRef.current = initialCrop;
      setCropRect(initialCrop);
      setPhase("crop");
    };
    img.onerror = () => {
      setErrorMsg("Failed to load the image. Please try a different file.");
    };
    img.src = URL.createObjectURL(file);
  }, []);
  const clampCrop = reactExports.useCallback(
    (rect, ar) => {
      const img = imgRef.current;
      if (!img) return rect;
      let { x, y, w, h } = rect;
      const minSize = 10;
      w = Math.max(minSize, w);
      h = Math.max(minSize, h);
      if (ar !== null) {
        h = w / ar;
        if (h < minSize) {
          h = minSize;
          w = h * ar;
        }
      }
      x = Math.max(0, Math.min(x, img.naturalWidth - w));
      y = Math.max(0, Math.min(y, img.naturalHeight - h));
      w = Math.min(w, img.naturalWidth - x);
      h = Math.min(h, img.naturalHeight - y);
      if (ar !== null) {
        const clampedAr = w / h;
        if (Math.abs(clampedAr - ar) > 0.01) {
          if (w / ar <= img.naturalHeight - y) {
            h = w / ar;
          } else {
            h = img.naturalHeight - y;
            w = h * ar;
          }
        }
      }
      return {
        x: Math.round(x),
        y: Math.round(y),
        w: Math.round(w),
        h: Math.round(h)
      };
    },
    []
  );
  const hitTestHandle = reactExports.useCallback(
    (mouseX, mouseY) => {
      const cr = cropRectRef.current;
      const { cx, cy } = imageToCanvas(cr.x, cr.y);
      const cw = cr.w * canvasScaleRef.current;
      const ch = cr.h * canvasScaleRef.current;
      const handles = getHandlePositions(cx, cy, cw, ch);
      for (const h of handles) {
        const dx = mouseX - h.hx;
        const dy = mouseY - h.hy;
        if (Math.sqrt(dx * dx + dy * dy) <= HANDLE_RADIUS) {
          return h.type;
        }
      }
      if (mouseX >= cx && mouseX <= cx + cw && mouseY >= cy && mouseY <= cy + ch) {
        return "move";
      }
      return "new";
    },
    [imageToCanvas]
  );
  const applyDrag = reactExports.useCallback(
    (canvasX, canvasY) => {
      const ds = dragStateRef.current;
      if (!ds) return;
      const img = imgRef.current;
      if (!img) return;
      const scale = canvasScaleRef.current;
      const dx = (canvasX - ds.startMouseX) / scale;
      const dy = (canvasY - ds.startMouseY) / scale;
      const sc = ds.startCrop;
      const ar = aspectRatio;
      let newCrop = { ...sc };
      switch (ds.type) {
        case "move":
          newCrop = { ...sc, x: sc.x + dx, y: sc.y + dy };
          break;
        case "new": {
          const { ix: startIX, iy: startIY } = canvasToImage(
            ds.startMouseX,
            ds.startMouseY
          );
          const { ix: curIX, iy: curIY } = canvasToImage(canvasX, canvasY);
          const nx = Math.min(startIX, curIX);
          const ny = Math.min(startIY, curIY);
          const nw = Math.abs(curIX - startIX);
          const nh = Math.abs(curIY - startIY);
          newCrop = { x: nx, y: ny, w: Math.max(10, nw), h: Math.max(10, nh) };
          break;
        }
        case "resize-tl":
          newCrop = { x: sc.x + dx, y: sc.y + dy, w: sc.w - dx, h: sc.h - dy };
          break;
        case "resize-tr":
          newCrop = { x: sc.x, y: sc.y + dy, w: sc.w + dx, h: sc.h - dy };
          break;
        case "resize-bl":
          newCrop = { x: sc.x + dx, y: sc.y, w: sc.w - dx, h: sc.h + dy };
          break;
        case "resize-br":
          newCrop = { x: sc.x, y: sc.y, w: sc.w + dx, h: sc.h + dy };
          break;
        case "resize-t":
          newCrop = { ...sc, y: sc.y + dy, h: sc.h - dy };
          break;
        case "resize-b":
          newCrop = { ...sc, h: sc.h + dy };
          break;
        case "resize-l":
          newCrop = { ...sc, x: sc.x + dx, w: sc.w - dx };
          break;
        case "resize-r":
          newCrop = { ...sc, w: sc.w + dx };
          break;
      }
      const clamped = clampCrop(newCrop, ar);
      cropRectRef.current = clamped;
      setCropRect(clamped);
    },
    [aspectRatio, canvasToImage, clampCrop]
  );
  const handleMouseDown = reactExports.useCallback(
    (e) => {
      e.preventDefault();
      const canvas = mainCanvasRef.current;
      if (!canvas) return;
      const { x, y } = getCanvasCoords(canvas, e.nativeEvent);
      const dragType = hitTestHandle(x, y);
      dragStateRef.current = {
        type: dragType,
        startMouseX: x,
        startMouseY: y,
        startCrop: { ...cropRectRef.current }
      };
    },
    [hitTestHandle]
  );
  const handleMouseMove = reactExports.useCallback(
    (e) => {
      e.preventDefault();
      if (!dragStateRef.current) return;
      const canvas = mainCanvasRef.current;
      if (!canvas) return;
      const { x, y } = getCanvasCoords(canvas, e.nativeEvent);
      applyDrag(x, y);
    },
    [applyDrag]
  );
  const handleMouseUp = reactExports.useCallback(
    (e) => {
      e.preventDefault();
      dragStateRef.current = null;
    },
    []
  );
  const handleTouchStart = reactExports.useCallback(
    (e) => {
      e.preventDefault();
      const canvas = mainCanvasRef.current;
      if (!canvas || e.touches.length === 0) return;
      const touch = e.touches[0];
      const { x, y } = getCanvasCoords(canvas, {
        clientX: touch.clientX,
        clientY: touch.clientY
      });
      const dragType = hitTestHandle(x, y);
      dragStateRef.current = {
        type: dragType,
        startMouseX: x,
        startMouseY: y,
        startCrop: { ...cropRectRef.current }
      };
    },
    [hitTestHandle]
  );
  const handleTouchMove = reactExports.useCallback(
    (e) => {
      e.preventDefault();
      if (!dragStateRef.current) return;
      const canvas = mainCanvasRef.current;
      if (!canvas || e.touches.length === 0) return;
      const touch = e.touches[0];
      const { x, y } = getCanvasCoords(canvas, {
        clientX: touch.clientX,
        clientY: touch.clientY
      });
      applyDrag(x, y);
    },
    [applyDrag]
  );
  const handleTouchEnd = reactExports.useCallback(
    (e) => {
      e.preventDefault();
      dragStateRef.current = null;
    },
    []
  );
  const handleAspectRatioChange = reactExports.useCallback(
    (ar) => {
      setAspectRatio(ar);
      if (ar !== null && imgRef.current) {
        const cr = cropRectRef.current;
        const img = imgRef.current;
        const centerX = cr.x + cr.w / 2;
        const centerY = cr.y + cr.h / 2;
        let newW = cr.w;
        let newH = newW / ar;
        if (newH > img.naturalHeight) {
          newH = img.naturalHeight;
          newW = newH * ar;
        }
        const newX = centerX - newW / 2;
        const newY = centerY - newH / 2;
        const snapped = clampCrop({ x: newX, y: newY, w: newW, h: newH }, ar);
        cropRectRef.current = snapped;
        setCropRect(snapped);
      }
    },
    [clampCrop]
  );
  const handleCrop = reactExports.useCallback(async () => {
    const img = imgRef.current;
    if (!img) return;
    setIsProcessing(true);
    setErrorMsg(null);
    try {
      const cr = cropRectRef.current;
      const outputCanvas = document.createElement("canvas");
      outputCanvas.width = Math.round(cr.w);
      outputCanvas.height = Math.round(cr.h);
      const ctx = outputCanvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context unavailable.");
      ctx.drawImage(
        img,
        cr.x,
        cr.y,
        cr.w,
        cr.h,
        0,
        0,
        outputCanvas.width,
        outputCanvas.height
      );
      await new Promise((resolve, reject) => {
        const mimeType = outputFormat === "jpeg" ? "image/jpeg" : outputFormat === "png" ? "image/png" : "image/webp";
        outputCanvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(
                new Error(
                  "Canvas export failed. Try a different output format."
                )
              );
              return;
            }
            setResultUrl((prev) => {
              if (prev) URL.revokeObjectURL(prev);
              return URL.createObjectURL(blob);
            });
            setResultSize(blob.size);
            setResultDimensions({
              w: outputCanvas.width,
              h: outputCanvas.height
            });
            resolve();
          },
          mimeType,
          quality / 100
        );
      });
      setPhase("result");
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "Cropping failed. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  }, [outputFormat, quality]);
  const handleDownload = reactExports.useCallback(() => {
    if (!resultUrl) return;
    const baseName = (originalFile == null ? void 0 : originalFile.name.replace(/\.[^.]+$/, "")) ?? "image";
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `${baseName}_cropped.${outputFormat}`;
    a.click();
  }, [resultUrl, originalFile, outputFormat]);
  const handleReset = reactExports.useCallback(() => {
    setResultUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setPhase("upload");
    setOriginalFile(null);
    setOriginalSize(0);
    setOriginalDimensions(null);
    setCropRect({ x: 0, y: 0, w: 100, h: 100 });
    setAspectRatio(null);
    setOutputFormat("jpeg");
    setQuality(90);
    setResultSize(0);
    setResultDimensions(null);
    setErrorMsg(null);
    imgRef.current = null;
    dragStateRef.current = null;
  }, []);
  const handleCropAgain = reactExports.useCallback(() => {
    setResultUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setResultSize(0);
    setResultDimensions(null);
    setErrorMsg(null);
    setPhase("crop");
  }, []);
  reactExports.useEffect(() => {
    if (phase === "crop") {
      const t = setTimeout(() => {
        drawCanvas();
        updatePreview();
      }, 50);
      return () => clearTimeout(t);
    }
  }, [phase, drawCanvas, updatePreview]);
  const sizeDiff = originalSize - resultSize;
  const sizePct = resultSize > 0 && originalSize > 0 ? Math.round(Math.abs(sizeDiff) / originalSize * 100) : 0;
  const isReduction = sizeDiff >= 0;
  const aspectRatioOptions = [
    { label: "Free", value: null },
    { label: "1:1", value: 1 },
    { label: "4:3", value: 4 / 3 },
    { label: "16:9", value: 16 / 9 }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen py-8 px-4",
      style: { background: "linear-gradient(135deg, #0f172a, #1e293b)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SEO,
          {
            title: "Image Cropper Online Free | DocMasterTools",
            description: "Crop images online for free with interactive drag-and-resize crop box. Supports JPEG, PNG, and WebP formats with aspect ratio presets.",
            canonicalUrl: "https://docmastertools.com/image-tools/image-cropper"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            BreadcrumbNavigation,
            {
              items: [
                {
                  label: "Image Tools",
                  onClick: () => onNavigate == null ? void 0 : onNavigate("image-tools")
                },
                { label: "Image Cropper" }
              ],
              onNavigate
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-bold text-white mb-3", children: "Image Cropper" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 max-w-2xl mx-auto", children: "Crop images with an interactive drag-and-resize crop box. Choose aspect ratio presets and get a real-time live preview before downloading." })
          ] }),
          phase === "upload" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "cropper.dropzone", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              FileUploadZone,
              {
                accept: "image/*",
                description: "Upload an image to crop (JPEG, PNG, WebP)",
                onFileSelect: handleFileSelect
              }
            ) }),
            errorMsg && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": "cropper.error_state",
                className: "mt-4 bg-red-900/40 border border-red-500 rounded-lg p-3 flex items-start gap-2 text-red-300 text-sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 mt-0.5 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: errorMsg })
                ]
              }
            )
          ] }),
          phase === "crop" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white font-semibold mb-4", children: "Crop Editor" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row gap-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    ref: canvasContainerRef,
                    className: "bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center",
                    style: { minHeight: 200 },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "canvas",
                      {
                        ref: mainCanvasRef,
                        "data-ocid": "cropper.canvas_target",
                        className: "block max-w-full cursor-crosshair touch-none select-none",
                        onMouseDown: handleMouseDown,
                        onMouseMove: handleMouseMove,
                        onMouseUp: handleMouseUp,
                        onMouseLeave: handleMouseUp,
                        onTouchStart: handleTouchStart,
                        onTouchMove: handleTouchMove,
                        onTouchEnd: handleTouchEnd
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-xs mt-2 text-center", children: "Drag inside crop area to move · Drag handles to resize · Click outside to draw new crop" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:w-64 flex flex-col gap-4 shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 text-sm mb-2 font-medium", children: "Aspect Ratio" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: aspectRatioOptions.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "data-ocid": opt.label === "Free" ? "cropper.free_ratio.button" : opt.label === "1:1" ? "cropper.square_ratio.button" : opt.label === "4:3" ? "cropper.four_three_ratio.button" : "cropper.sixteen_nine_ratio.button",
                      onClick: () => handleAspectRatioChange(opt.value),
                      className: `py-2 px-3 rounded-lg text-sm font-medium transition-all ${aspectRatio === opt.value ? "bg-blue-600 text-white" : "bg-gray-700 text-slate-300 hover:bg-gray-600"}`,
                      children: opt.label
                    },
                    opt.label
                  )) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "crop-format-select",
                      className: "block text-slate-300 text-sm mb-2 font-medium",
                      children: "Output Format"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "select",
                    {
                      id: "crop-format-select",
                      "data-ocid": "cropper.format.select",
                      value: outputFormat,
                      onChange: (e) => {
                        setOutputFormat(
                          e.target.value
                        );
                      },
                      className: "w-full bg-gray-800 border border-gray-600 text-white rounded-lg px-3 py-2 text-sm",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "jpeg", children: "JPEG" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "png", children: "PNG" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "webp", children: "WebP" })
                      ]
                    }
                  )
                ] }),
                outputFormat !== "png" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "label",
                    {
                      htmlFor: "crop-quality-range",
                      className: "block text-slate-300 text-sm mb-2 font-medium",
                      children: [
                        "Quality: ",
                        quality,
                        "%"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "crop-quality-range",
                      "data-ocid": "cropper.quality.input",
                      type: "range",
                      min: 10,
                      max: 100,
                      value: quality,
                      onChange: (e) => setQuality(Number(e.target.value)),
                      className: "w-full accent-blue-500"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-800 rounded-lg p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-xs mb-1", children: "Crop Size" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-blue-400 text-sm font-semibold", children: [
                    cropRect.w,
                    " × ",
                    cropRect.h,
                    " px"
                  ] }),
                  originalDimensions && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-500 text-xs mt-1", children: [
                    "Original: ",
                    originalDimensions.w,
                    " × ",
                    originalDimensions.h,
                    " ",
                    "px"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 text-xs mb-2 font-medium uppercase tracking-wide", children: "Live Preview" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center",
                      style: { height: 120 },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "canvas",
                        {
                          ref: previewCanvasRef,
                          width: 200,
                          height: 120,
                          className: "max-w-full max-h-full"
                        }
                      )
                    }
                  )
                ] }),
                errorMsg && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    "data-ocid": "cropper.error_state",
                    className: "bg-red-900/40 border border-red-500 rounded-lg p-3 flex items-start gap-2 text-red-300 text-sm",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 mt-0.5 shrink-0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: errorMsg })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "cropper.crop.primary_button",
                    onClick: handleCrop,
                    disabled: isProcessing,
                    className: "w-full min-h-[44px] px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm",
                    children: isProcessing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        RefreshCw,
                        {
                          "data-ocid": "cropper.loading_state",
                          className: "w-4 h-4 animate-spin"
                        }
                      ),
                      "Processing..."
                    ] }) : "Crop Image"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "cropper.reset.button",
                    onClick: handleReset,
                    className: "w-full min-h-[44px] px-4 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
                      " Reset"
                    ]
                  }
                )
              ] })
            ] })
          ] }),
          phase === "result" && resultUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-white font-semibold mb-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400", children: "⚡" }),
                " Size Comparison"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-800 rounded-lg p-3 text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-xs mb-1", children: "Original Size" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-sm font-semibold", children: formatSize(originalSize) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-800 rounded-lg p-3 text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-xs mb-1", children: "New Size" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-green-400 text-sm font-semibold", children: formatSize(resultSize) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-800 rounded-lg p-3 text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-xs mb-1", children: "Change" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      className: `text-sm font-semibold flex items-center justify-center gap-1 ${isReduction ? "text-green-400" : "text-red-400"}`,
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
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                originalDimensions && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-800 rounded-lg p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-xs mb-1", children: "Original Dimensions" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white text-sm font-medium", children: [
                    originalDimensions.w,
                    " × ",
                    originalDimensions.h,
                    " px"
                  ] })
                ] }),
                resultDimensions && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-800 rounded-lg p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-xs mb-1", children: "Cropped Dimensions" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-blue-400 text-sm font-medium", children: [
                    resultDimensions.w,
                    " × ",
                    resultDimensions.h,
                    " px"
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white font-semibold mb-4", children: "Side-by-Side Preview" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-xs font-medium uppercase tracking-wide mb-2", children: "Original" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center min-h-[160px] p-2", children: imgRef.current && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: imgRef.current.src,
                      alt: "Original",
                      className: "max-w-full rounded object-contain max-h-48"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-400 text-xs mt-2", children: [
                    formatSize(originalSize),
                    originalDimensions ? ` · ${originalDimensions.w}×${originalDimensions.h}px` : ""
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-xs font-medium uppercase tracking-wide mb-2", children: "Cropped" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center min-h-[160px] p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: resultUrl,
                      alt: "Cropped",
                      className: "max-w-full rounded object-contain max-h-48"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-green-400 text-xs mt-2", children: [
                    formatSize(resultSize),
                    resultDimensions ? ` · ${resultDimensions.w}×${resultDimensions.h}px` : ""
                  ] })
                ] })
              ] }),
              errorMsg && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": "cropper.error_state",
                  className: "mb-4 bg-red-900/40 border border-red-500 rounded-lg p-3 flex items-start gap-2 text-red-300 text-sm",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 mt-0.5 shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: errorMsg })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "cropper.download.primary_button",
                    onClick: handleDownload,
                    className: "flex-1 min-h-[48px] px-6 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
                      " Download Cropped Image"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "cropper.reset.button",
                    onClick: handleCropAgain,
                    className: "min-h-[48px] px-6 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
                      " Crop Again"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handleReset,
                    className: "min-h-[48px] px-6 bg-gray-600 hover:bg-gray-500 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2",
                    children: "New Image"
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
  ImageCropperPage as default
};
