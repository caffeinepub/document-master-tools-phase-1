import BreadcrumbNavigation from "@/components/BreadcrumbNavigation";
import FileUploadZone from "@/components/FileUploadZone";
import SEO from "@/components/SEO";
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  Download,
  RefreshCw,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface ImageCropperPageProps {
  onNavigate?: (page: string) => void;
}

type DragType =
  | "move"
  | "resize-tl"
  | "resize-tr"
  | "resize-bl"
  | "resize-br"
  | "resize-t"
  | "resize-b"
  | "resize-l"
  | "resize-r"
  | "new";

interface DragState {
  type: DragType;
  startMouseX: number;
  startMouseY: number;
  startCrop: { x: number; y: number; w: number; h: number };
}

interface CropRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

type Phase = "upload" | "crop" | "result";

const HANDLE_RADIUS = 12;
const HANDLE_SIZE = 10;

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

// Pure helper functions (outside component to avoid lint exhaustive-deps issues)
function getHandlePositions(
  cx: number,
  cy: number,
  cw: number,
  ch: number,
): { type: DragType; hx: number; hy: number }[] {
  return [
    { type: "resize-tl", hx: cx, hy: cy },
    { type: "resize-t", hx: cx + cw / 2, hy: cy },
    { type: "resize-tr", hx: cx + cw, hy: cy },
    { type: "resize-l", hx: cx, hy: cy + ch / 2 },
    { type: "resize-r", hx: cx + cw, hy: cy + ch / 2 },
    { type: "resize-bl", hx: cx, hy: cy + ch },
    { type: "resize-b", hx: cx + cw / 2, hy: cy + ch },
    { type: "resize-br", hx: cx + cw, hy: cy + ch },
  ];
}

function getCanvasCoords(
  canvas: HTMLCanvasElement,
  e: { clientX: number; clientY: number },
): { x: number; y: number } {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  return {
    x: (e.clientX - rect.left) * scaleX,
    y: (e.clientY - rect.top) * scaleY,
  };
}

export default function ImageCropperPage({
  onNavigate,
}: ImageCropperPageProps) {
  const [phase, setPhase] = useState<Phase>("upload");
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [originalDimensions, setOriginalDimensions] = useState<{
    w: number;
    h: number;
  } | null>(null);

  // cropRect is stored in IMAGE pixel coordinates
  const [cropRect, setCropRect] = useState<CropRect>({
    x: 0,
    y: 0,
    w: 100,
    h: 100,
  });
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const [outputFormat, setOutputFormat] = useState<"jpeg" | "png" | "webp">(
    "jpeg",
  );
  const [quality, setQuality] = useState(90);

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState(0);
  const [resultDimensions, setResultDimensions] = useState<{
    w: number;
    h: number;
  } | null>(null);

  // Refs
  const imgRef = useRef<HTMLImageElement | null>(null);
  const mainCanvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  // Canvas layout (display pixels)
  const canvasScaleRef = useRef(1);
  const canvasOffsetXRef = useRef(0);
  const canvasOffsetYRef = useRef(0);

  // Drag state
  const dragStateRef = useRef<DragState | null>(null);
  const cropRectRef = useRef<CropRect>(cropRect);

  // Keep cropRectRef in sync with state
  useEffect(() => {
    cropRectRef.current = cropRect;
  }, [cropRect]);

  // ─── Coordinate helpers ────────────────────────────────────────────────────
  const imageToCanvas = useCallback(
    (ix: number, iy: number) => ({
      cx: ix * canvasScaleRef.current + canvasOffsetXRef.current,
      cy: iy * canvasScaleRef.current + canvasOffsetYRef.current,
    }),
    [],
  );

  const canvasToImage = useCallback(
    (cx: number, cy: number) => ({
      ix: (cx - canvasOffsetXRef.current) / canvasScaleRef.current,
      iy: (cy - canvasOffsetYRef.current) / canvasScaleRef.current,
    }),
    [],
  );

  // ─── Draw canvas ───────────────────────────────────────────────────────────
  const drawCanvas = useCallback(() => {
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

    // Draw image
    ctx.drawImage(img, ox, oy, iw, ih);

    // Dark overlay
    ctx.fillStyle = "rgba(0,0,0,0.55)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Reveal crop area
    const { cx: cropCanvasX, cy: cropCanvasY } = imageToCanvas(cr.x, cr.y);
    const cropCanvasW = cr.w * scale;
    const cropCanvasH = cr.h * scale;

    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fillRect(cropCanvasX, cropCanvasY, cropCanvasW, cropCanvasH);
    ctx.restore();

    // Re-draw image in crop area
    ctx.save();
    ctx.beginPath();
    ctx.rect(cropCanvasX, cropCanvasY, cropCanvasW, cropCanvasH);
    ctx.clip();
    ctx.drawImage(img, ox, oy, iw, ih);
    ctx.restore();

    // Crop border
    ctx.strokeStyle = "rgba(255,255,255,0.95)";
    ctx.lineWidth = 2;
    ctx.strokeRect(cropCanvasX, cropCanvasY, cropCanvasW, cropCanvasH);

    // Rule-of-thirds grid
    ctx.strokeStyle = "rgba(255,255,255,0.25)";
    ctx.lineWidth = 1;
    for (let i = 1; i <= 2; i++) {
      const gx = cropCanvasX + (cropCanvasW * i) / 3;
      const gy = cropCanvasY + (cropCanvasH * i) / 3;
      ctx.beginPath();
      ctx.moveTo(gx, cropCanvasY);
      ctx.lineTo(gx, cropCanvasY + cropCanvasH);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cropCanvasX, gy);
      ctx.lineTo(cropCanvasX + cropCanvasW, gy);
      ctx.stroke();
    }

    // Resize handles
    const handles = getHandlePositions(
      cropCanvasX,
      cropCanvasY,
      cropCanvasW,
      cropCanvasH,
    );
    ctx.fillStyle = "white";
    ctx.strokeStyle = "rgba(0,0,0,0.5)";
    ctx.lineWidth = 1;
    for (const h of handles) {
      ctx.fillRect(
        h.hx - HANDLE_SIZE / 2,
        h.hy - HANDLE_SIZE / 2,
        HANDLE_SIZE,
        HANDLE_SIZE,
      );
      ctx.strokeRect(
        h.hx - HANDLE_SIZE / 2,
        h.hy - HANDLE_SIZE / 2,
        HANDLE_SIZE,
        HANDLE_SIZE,
      );
    }
  }, [imageToCanvas]);

  // ─── Update live preview canvas ────────────────────────────────────────────
  const updatePreview = useCallback(() => {
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
        previewCanvas.height,
      );
    }
  }, []);

  // ─── Redraw when cropRect changes (phase=crop only) ───────────────────────
  useEffect(() => {
    if (phase === "crop") {
      drawCanvas();
      updatePreview();
    }
    // cropRect is intentionally omitted here — we read it via cropRectRef.current
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, drawCanvas, updatePreview]);

  // Also redraw when cropRect changes via ref sync
  // biome-ignore lint/correctness/useExhaustiveDependencies: we intentionally use cropRect to trigger redraws via the ref
  useEffect(() => {
    if (phase === "crop") {
      drawCanvas();
      updatePreview();
    }
  }, [cropRect, phase, drawCanvas, updatePreview]);

  // ─── File select handler ───────────────────────────────────────────────────
  const handleFileSelect = useCallback((file: File) => {
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
        1,
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
        h: img.naturalHeight,
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

  // ─── Clamp crop rect to image bounds ──────────────────────────────────────
  const clampCrop = useCallback(
    (rect: CropRect, ar: number | null): CropRect => {
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
        h: Math.round(h),
      };
    },
    [],
  );

  // ─── Hit-test handles ──────────────────────────────────────────────────────
  const hitTestHandle = useCallback(
    (mouseX: number, mouseY: number): DragType => {
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

      if (
        mouseX >= cx &&
        mouseX <= cx + cw &&
        mouseY >= cy &&
        mouseY <= cy + ch
      ) {
        return "move";
      }

      return "new";
    },
    [imageToCanvas],
  );

  // ─── Apply drag delta ──────────────────────────────────────────────────────
  const applyDrag = useCallback(
    (canvasX: number, canvasY: number) => {
      const ds = dragStateRef.current;
      if (!ds) return;
      const img = imgRef.current;
      if (!img) return;

      const scale = canvasScaleRef.current;
      const dx = (canvasX - ds.startMouseX) / scale;
      const dy = (canvasY - ds.startMouseY) / scale;
      const sc = ds.startCrop;
      const ar = aspectRatio;

      let newCrop: CropRect = { ...sc };

      switch (ds.type) {
        case "move":
          newCrop = { ...sc, x: sc.x + dx, y: sc.y + dy };
          break;
        case "new": {
          const { ix: startIX, iy: startIY } = canvasToImage(
            ds.startMouseX,
            ds.startMouseY,
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
    [aspectRatio, canvasToImage, clampCrop],
  );

  // ─── Mouse handlers ────────────────────────────────────────────────────────
  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      const canvas = mainCanvasRef.current;
      if (!canvas) return;
      const { x, y } = getCanvasCoords(canvas, e.nativeEvent);
      const dragType = hitTestHandle(x, y);
      dragStateRef.current = {
        type: dragType,
        startMouseX: x,
        startMouseY: y,
        startCrop: { ...cropRectRef.current },
      };
    },
    [hitTestHandle],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      if (!dragStateRef.current) return;
      const canvas = mainCanvasRef.current;
      if (!canvas) return;
      const { x, y } = getCanvasCoords(canvas, e.nativeEvent);
      applyDrag(x, y);
    },
    [applyDrag],
  );

  const handleMouseUp = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      dragStateRef.current = null;
    },
    [],
  );

  // ─── Touch handlers ────────────────────────────────────────────────────────
  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      const canvas = mainCanvasRef.current;
      if (!canvas || e.touches.length === 0) return;
      const touch = e.touches[0];
      const { x, y } = getCanvasCoords(canvas, {
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
      const dragType = hitTestHandle(x, y);
      dragStateRef.current = {
        type: dragType,
        startMouseX: x,
        startMouseY: y,
        startCrop: { ...cropRectRef.current },
      };
    },
    [hitTestHandle],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      if (!dragStateRef.current) return;
      const canvas = mainCanvasRef.current;
      if (!canvas || e.touches.length === 0) return;
      const touch = e.touches[0];
      const { x, y } = getCanvasCoords(canvas, {
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
      applyDrag(x, y);
    },
    [applyDrag],
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      dragStateRef.current = null;
    },
    [],
  );

  // ─── Aspect ratio change ───────────────────────────────────────────────────
  const handleAspectRatioChange = useCallback(
    (ar: number | null) => {
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
    [clampCrop],
  );

  // ─── Crop execution ────────────────────────────────────────────────────────
  const handleCrop = useCallback(async () => {
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
        outputCanvas.height,
      );

      await new Promise<void>((resolve, reject) => {
        const mimeType =
          outputFormat === "jpeg"
            ? "image/jpeg"
            : outputFormat === "png"
              ? "image/png"
              : "image/webp";
        outputCanvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(
                new Error(
                  "Canvas export failed. Try a different output format.",
                ),
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
              h: outputCanvas.height,
            });
            resolve();
          },
          mimeType,
          quality / 100,
        );
      });

      setPhase("result");
    } catch (err) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Cropping failed. Please try again.",
      );
    } finally {
      setIsProcessing(false);
    }
  }, [outputFormat, quality]);

  // ─── Download ──────────────────────────────────────────────────────────────
  const handleDownload = useCallback(() => {
    if (!resultUrl) return;
    const baseName = originalFile?.name.replace(/\.[^.]+$/, "") ?? "image";
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `${baseName}_cropped.${outputFormat}`;
    a.click();
  }, [resultUrl, originalFile, outputFormat]);

  // ─── Reset all ─────────────────────────────────────────────────────────────
  const handleReset = useCallback(() => {
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

  const handleCropAgain = useCallback(() => {
    setResultUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setResultSize(0);
    setResultDimensions(null);
    setErrorMsg(null);
    setPhase("crop");
  }, []);

  // ─── Draw on phase change to "crop" ───────────────────────────────────────
  useEffect(() => {
    if (phase === "crop") {
      const t = setTimeout(() => {
        drawCanvas();
        updatePreview();
      }, 50);
      return () => clearTimeout(t);
    }
  }, [phase, drawCanvas, updatePreview]);

  // ─── Computed display values ───────────────────────────────────────────────
  const sizeDiff = originalSize - resultSize;
  const sizePct =
    resultSize > 0 && originalSize > 0
      ? Math.round((Math.abs(sizeDiff) / originalSize) * 100)
      : 0;
  const isReduction = sizeDiff >= 0;

  const aspectRatioOptions = [
    { label: "Free", value: null as number | null },
    { label: "1:1", value: 1 as number | null },
    { label: "4:3", value: (4 / 3) as number | null },
    { label: "16:9", value: (16 / 9) as number | null },
  ];

  return (
    <div
      className="min-h-screen py-8 px-4"
      style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)" }}
    >
      <SEO
        title="Image Cropper Online Free | DocMasterTools"
        description="Crop images online for free with interactive drag-and-resize crop box. Supports JPEG, PNG, and WebP formats with aspect ratio presets."
        canonicalUrl="https://docmastertools.com/image-tools/image-cropper"
      />
      <div className="max-w-5xl mx-auto">
        <BreadcrumbNavigation
          items={[
            {
              label: "Image Tools",
              onClick: () => onNavigate?.("image-tools"),
            },
            { label: "Image Cropper" },
          ]}
          onNavigate={onNavigate}
        />
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Image Cropper
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Crop images with an interactive drag-and-resize crop box. Choose
            aspect ratio presets and get a real-time live preview before
            downloading.
          </p>
        </div>

        {/* ── Phase 1: Upload ────────────────────────────────────────────── */}
        {phase === "upload" && (
          <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-8">
            <div data-ocid="cropper.dropzone">
              <FileUploadZone
                accept="image/*"
                description="Upload an image to crop (JPEG, PNG, WebP)"
                onFileSelect={handleFileSelect}
              />
            </div>
            {errorMsg && (
              <div
                data-ocid="cropper.error_state"
                className="mt-4 bg-red-900/40 border border-red-500 rounded-lg p-3 flex items-start gap-2 text-red-300 text-sm"
              >
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>
        )}

        {/* ── Phase 2: Crop Editor ──────────────────────────────────────── */}
        {phase === "crop" && (
          <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-6">
            <h2 className="text-white font-semibold mb-4">Crop Editor</h2>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Main Crop Canvas */}
              <div className="flex-1 min-w-0">
                <div
                  ref={canvasContainerRef}
                  className="bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center"
                  style={{ minHeight: 200 }}
                >
                  <canvas
                    ref={mainCanvasRef}
                    data-ocid="cropper.canvas_target"
                    className="block max-w-full cursor-crosshair touch-none select-none"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  />
                </div>
                <p className="text-gray-500 text-xs mt-2 text-center">
                  Drag inside crop area to move · Drag handles to resize · Click
                  outside to draw new crop
                </p>
              </div>

              {/* Controls Panel */}
              <div className="lg:w-64 flex flex-col gap-4 shrink-0">
                {/* Aspect Ratio */}
                <div>
                  <p className="text-slate-300 text-sm mb-2 font-medium">
                    Aspect Ratio
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {aspectRatioOptions.map((opt) => (
                      <button
                        key={opt.label}
                        type="button"
                        data-ocid={
                          opt.label === "Free"
                            ? "cropper.free_ratio.button"
                            : opt.label === "1:1"
                              ? "cropper.square_ratio.button"
                              : opt.label === "4:3"
                                ? "cropper.four_three_ratio.button"
                                : "cropper.sixteen_nine_ratio.button"
                        }
                        onClick={() => handleAspectRatioChange(opt.value)}
                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                          aspectRatio === opt.value
                            ? "bg-blue-600 text-white"
                            : "bg-gray-700 text-slate-300 hover:bg-gray-600"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Output Format */}
                <div>
                  <label
                    htmlFor="crop-format-select"
                    className="block text-slate-300 text-sm mb-2 font-medium"
                  >
                    Output Format
                  </label>
                  <select
                    id="crop-format-select"
                    data-ocid="cropper.format.select"
                    value={outputFormat}
                    onChange={(e) => {
                      setOutputFormat(
                        e.target.value as "jpeg" | "png" | "webp",
                      );
                    }}
                    className="w-full bg-gray-800 border border-gray-600 text-white rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="jpeg">JPEG</option>
                    <option value="png">PNG</option>
                    <option value="webp">WebP</option>
                  </select>
                </div>

                {/* Quality (JPEG/WebP only) */}
                {outputFormat !== "png" && (
                  <div>
                    <label
                      htmlFor="crop-quality-range"
                      className="block text-slate-300 text-sm mb-2 font-medium"
                    >
                      Quality: {quality}%
                    </label>
                    <input
                      id="crop-quality-range"
                      data-ocid="cropper.quality.input"
                      type="range"
                      min={10}
                      max={100}
                      value={quality}
                      onChange={(e) => setQuality(Number(e.target.value))}
                      className="w-full accent-blue-500"
                    />
                  </div>
                )}

                {/* Live crop dimensions */}
                <div className="bg-gray-800 rounded-lg p-3">
                  <p className="text-gray-500 text-xs mb-1">Crop Size</p>
                  <p className="text-blue-400 text-sm font-semibold">
                    {cropRect.w} × {cropRect.h} px
                  </p>
                  {originalDimensions && (
                    <p className="text-gray-500 text-xs mt-1">
                      Original: {originalDimensions.w} × {originalDimensions.h}{" "}
                      px
                    </p>
                  )}
                </div>

                {/* Live Preview */}
                <div>
                  <p className="text-slate-300 text-xs mb-2 font-medium uppercase tracking-wide">
                    Live Preview
                  </p>
                  <div
                    className="bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center"
                    style={{ height: 120 }}
                  >
                    <canvas
                      ref={previewCanvasRef}
                      width={200}
                      height={120}
                      className="max-w-full max-h-full"
                    />
                  </div>
                </div>

                {/* Error */}
                {errorMsg && (
                  <div
                    data-ocid="cropper.error_state"
                    className="bg-red-900/40 border border-red-500 rounded-lg p-3 flex items-start gap-2 text-red-300 text-sm"
                  >
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Crop Button */}
                <button
                  type="button"
                  data-ocid="cropper.crop.primary_button"
                  onClick={handleCrop}
                  disabled={isProcessing}
                  className="w-full min-h-[44px] px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw
                        data-ocid="cropper.loading_state"
                        className="w-4 h-4 animate-spin"
                      />
                      Processing...
                    </>
                  ) : (
                    "Crop Image"
                  )}
                </button>

                {/* Reset Button */}
                <button
                  type="button"
                  data-ocid="cropper.reset.button"
                  onClick={handleReset}
                  className="w-full min-h-[44px] px-4 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                >
                  <RefreshCw className="w-4 h-4" /> Reset
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Phase 3: Result ───────────────────────────────────────────── */}
        {phase === "result" && resultUrl && (
          <>
            {/* Size Comparison */}
            <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-6">
              <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-blue-400">⚡</span> Size Comparison
              </h2>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-gray-800 rounded-lg p-3 text-center">
                  <p className="text-gray-500 text-xs mb-1">Original Size</p>
                  <p className="text-white text-sm font-semibold">
                    {formatSize(originalSize)}
                  </p>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 text-center">
                  <p className="text-gray-500 text-xs mb-1">New Size</p>
                  <p className="text-green-400 text-sm font-semibold">
                    {formatSize(resultSize)}
                  </p>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 text-center">
                  <p className="text-gray-500 text-xs mb-1">Change</p>
                  <p
                    className={`text-sm font-semibold flex items-center justify-center gap-1 ${
                      isReduction ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {isReduction ? (
                      <ArrowDown className="w-3 h-3" />
                    ) : (
                      <ArrowUp className="w-3 h-3" />
                    )}
                    {sizePct}% {isReduction ? "smaller" : "larger"}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {originalDimensions && (
                  <div className="bg-gray-800 rounded-lg p-3">
                    <p className="text-gray-500 text-xs mb-1">
                      Original Dimensions
                    </p>
                    <p className="text-white text-sm font-medium">
                      {originalDimensions.w} × {originalDimensions.h} px
                    </p>
                  </div>
                )}
                {resultDimensions && (
                  <div className="bg-gray-800 rounded-lg p-3">
                    <p className="text-gray-500 text-xs mb-1">
                      Cropped Dimensions
                    </p>
                    <p className="text-blue-400 text-sm font-medium">
                      {resultDimensions.w} × {resultDimensions.h} px
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Side-by-Side Preview + Download */}
            <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700 mb-6">
              <h2 className="text-white font-semibold mb-4">
                Side-by-Side Preview
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <div className="text-center">
                  <p className="text-slate-400 text-xs font-medium uppercase tracking-wide mb-2">
                    Original
                  </p>
                  <div className="bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center min-h-[160px] p-2">
                    {imgRef.current && (
                      <img
                        src={imgRef.current.src}
                        alt="Original"
                        className="max-w-full rounded object-contain max-h-48"
                      />
                    )}
                  </div>
                  <p className="text-gray-400 text-xs mt-2">
                    {formatSize(originalSize)}
                    {originalDimensions
                      ? ` · ${originalDimensions.w}×${originalDimensions.h}px`
                      : ""}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-slate-400 text-xs font-medium uppercase tracking-wide mb-2">
                    Cropped
                  </p>
                  <div className="bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center min-h-[160px] p-2">
                    <img
                      src={resultUrl}
                      alt="Cropped"
                      className="max-w-full rounded object-contain max-h-48"
                    />
                  </div>
                  <p className="text-green-400 text-xs mt-2">
                    {formatSize(resultSize)}
                    {resultDimensions
                      ? ` · ${resultDimensions.w}×${resultDimensions.h}px`
                      : ""}
                  </p>
                </div>
              </div>

              {errorMsg && (
                <div
                  data-ocid="cropper.error_state"
                  className="mb-4 bg-red-900/40 border border-red-500 rounded-lg p-3 flex items-start gap-2 text-red-300 text-sm"
                >
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  data-ocid="cropper.download.primary_button"
                  onClick={handleDownload}
                  className="flex-1 min-h-[48px] px-6 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" /> Download Cropped Image
                </button>
                <button
                  type="button"
                  data-ocid="cropper.reset.button"
                  onClick={handleCropAgain}
                  className="min-h-[48px] px-6 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" /> Crop Again
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="min-h-[48px] px-6 bg-gray-600 hover:bg-gray-500 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2"
                >
                  New Image
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
