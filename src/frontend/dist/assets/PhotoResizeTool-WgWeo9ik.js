import { r as reactExports, j as jsxRuntimeExports } from "./index-YN_OslaE.js";
import { u as useComposedRefs, P as Primitive, L as Label, I as Input } from "./input-BldACiYg.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-Bm5_92VY.js";
import { S as Slider } from "./slider-DkvtRS-k.js";
import { u as useControllableState, c as createContextScope, a as composeEventHandlers, d as usePrevious, b as useSize } from "./index-B7n2t64q.js";
import { c as cn } from "./utils-Bmita3Ip.js";
import { A as AdvancedToolShell } from "./AdvancedToolShell-DnnYRrLm.js";
var SWITCH_NAME = "Switch";
var [createSwitchContext] = createContextScope(SWITCH_NAME);
var [SwitchProvider, useSwitchContext] = createSwitchContext(SWITCH_NAME);
var Switch$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeSwitch,
      name,
      checked: checkedProp,
      defaultChecked,
      required,
      disabled,
      value = "on",
      onCheckedChange,
      form,
      ...switchProps
    } = props;
    const [button, setButton] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
    const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
    const isFormControl = button ? form || !!button.closest("form") : true;
    const [checked, setChecked] = useControllableState({
      prop: checkedProp,
      defaultProp: defaultChecked ?? false,
      onChange: onCheckedChange,
      caller: SWITCH_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(SwitchProvider, { scope: __scopeSwitch, checked, disabled, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": checked,
          "aria-required": required,
          "data-state": getState(checked),
          "data-disabled": disabled ? "" : void 0,
          disabled,
          value,
          ...switchProps,
          ref: composedRefs,
          onClick: composeEventHandlers(props.onClick, (event) => {
            setChecked((prevChecked) => !prevChecked);
            if (isFormControl) {
              hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
              if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
          })
        }
      ),
      isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwitchBubbleInput,
        {
          control: button,
          bubbles: !hasConsumerStoppedPropagationRef.current,
          name,
          value,
          checked,
          required,
          disabled,
          form,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Switch$1.displayName = SWITCH_NAME;
var THUMB_NAME = "SwitchThumb";
var SwitchThumb = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSwitch, ...thumbProps } = props;
    const context = useSwitchContext(THUMB_NAME, __scopeSwitch);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        "data-state": getState(context.checked),
        "data-disabled": context.disabled ? "" : void 0,
        ...thumbProps,
        ref: forwardedRef
      }
    );
  }
);
SwitchThumb.displayName = THUMB_NAME;
var BUBBLE_INPUT_NAME = "SwitchBubbleInput";
var SwitchBubbleInput = reactExports.forwardRef(
  ({
    __scopeSwitch,
    control,
    checked,
    bubbles = true,
    ...props
  }, forwardedRef) => {
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(ref, forwardedRef);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = ref.current;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        setChecked.call(input, checked);
        input.dispatchEvent(event);
      }
    }, [prevChecked, checked, bubbles]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: checked,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
SwitchBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
  return checked ? "checked" : "unchecked";
}
var Root = Switch$1;
var Thumb = SwitchThumb;
function Switch({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "switch",
      className: cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Thumb,
        {
          "data-slot": "switch-thumb",
          className: cn(
            "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
          )
        }
      )
    }
  );
}
const toPx = (value, unit, dpi = 96) => {
  switch (unit) {
    case "px":
      return Math.max(1, Math.round(value));
    case "cm":
      return Math.max(1, Math.round(value * dpi / 2.54));
    case "mm":
      return Math.max(1, Math.round(value * dpi / 25.4));
    case "inches":
      return Math.max(1, Math.round(value * dpi));
    default:
      return Math.max(1, Math.round(value));
  }
};
const fromPx = (px, unit, dpi = 96) => {
  switch (unit) {
    case "px":
      return px;
    case "cm":
      return Number.parseFloat((px * 2.54 / dpi).toFixed(2));
    case "mm":
      return Number.parseFloat((px * 25.4 / dpi).toFixed(1));
    case "inches":
      return Number.parseFloat((px / dpi).toFixed(2));
    default:
      return px;
  }
};
const compressToTargetSize = (canvas, mimeType, maxSizeBytes, startQuality) => {
  return new Promise((resolve, reject) => {
    let q = Math.min(startQuality / 100, 0.92);
    const minQ = 0.05;
    const tryCompress = () => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Canvas toBlob returned null"));
            return;
          }
          if (blob.size <= maxSizeBytes || q <= minQ) {
            resolve(blob);
          } else {
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
const drawCoverFit = (ctx, img, targetW, targetH) => {
  const imgAspect = img.naturalWidth / img.naturalHeight;
  const canvasAspect = targetW / targetH;
  let sx = 0;
  let sy = 0;
  let sWidth = img.naturalWidth;
  let sHeight = img.naturalHeight;
  if (imgAspect > canvasAspect) {
    sWidth = Math.round(img.naturalHeight * canvasAspect);
    sx = Math.round((img.naturalWidth - sWidth) / 2);
  } else {
    sHeight = Math.round(img.naturalWidth / canvasAspect);
    sy = Math.round((img.naturalHeight - sHeight) / 2);
  }
  ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, targetW, targetH);
};
const PhotoResizeTool = ({
  toolTitle,
  presets,
  defaultPresetIndex = 0
}) => {
  var _a, _b, _c;
  const [selectedPreset, setSelectedPreset] = reactExports.useState(
    ((_a = presets[defaultPresetIndex]) == null ? void 0 : _a.label) || "custom"
  );
  const [unit, setUnit] = reactExports.useState("px");
  const [width, setWidth] = reactExports.useState(
    ((_b = presets[defaultPresetIndex]) == null ? void 0 : _b.width) || 200
  );
  const [height, setHeight] = reactExports.useState(
    ((_c = presets[defaultPresetIndex]) == null ? void 0 : _c.height) || 200
  );
  const [maintainAspect, setMaintainAspect] = reactExports.useState(false);
  const [quality, setQuality] = reactExports.useState(90);
  const [format, setFormat] = reactExports.useState("jpeg");
  const [targetSizeEnabled, setTargetSizeEnabled] = reactExports.useState(false);
  const [targetSize, setTargetSize] = reactExports.useState(100);
  const [targetSizeUnit, setTargetSizeUnit] = reactExports.useState("KB");
  const aspectRatioRef = reactExports.useRef(null);
  const [aspectRatioDisplay, setAspectRatioDisplay] = reactExports.useState(
    null
  );
  const handlePresetChange = (label) => {
    setSelectedPreset(label);
    if (label === "custom") return;
    const preset = presets.find((p) => p.label === label);
    if (!preset) return;
    const dpi = preset.dpi || 96;
    if (unit === "px") {
      setWidth(preset.width);
      setHeight(preset.height);
    } else {
      setWidth(fromPx(preset.width, unit, dpi));
      setHeight(fromPx(preset.height, unit, dpi));
    }
    if (preset.maxSizeKB) {
      setTargetSizeEnabled(true);
      setTargetSize(preset.maxSizeKB);
      setTargetSizeUnit("KB");
    }
  };
  const handleWidthChange = (val) => {
    setWidth(val);
    if (maintainAspect && aspectRatioRef.current) {
      setHeight(Number.parseFloat((val / aspectRatioRef.current).toFixed(2)));
    }
  };
  const handleHeightChange = (val) => {
    setHeight(val);
    if (maintainAspect && aspectRatioRef.current) {
      setWidth(Number.parseFloat((val * aspectRatioRef.current).toFixed(2)));
    }
  };
  const processingFunction = reactExports.useCallback(
    async (file) => {
      return new Promise((resolve, reject) => {
        if (!file.type.startsWith("image/")) {
          reject(
            new Error(
              "Unsupported file type. Please upload a JPEG, PNG, or WebP image."
            )
          );
          return;
        }
        const img = new Image();
        const url = URL.createObjectURL(file);
        img.onerror = () => {
          URL.revokeObjectURL(url);
          reject(
            new Error(
              "Failed to load image. The file may be corrupted or in an unsupported format."
            )
          );
        };
        img.onload = async () => {
          URL.revokeObjectURL(url);
          const aspect = img.naturalWidth / img.naturalHeight;
          aspectRatioRef.current = aspect;
          setAspectRatioDisplay(aspect);
          const dpi = 96;
          const targetW = toPx(width, unit, dpi);
          const targetH = toPx(height, unit, dpi);
          if (targetW < 1 || targetH < 1) {
            reject(
              new Error(
                "Invalid dimensions. Width and height must be at least 1px."
              )
            );
            return;
          }
          const canvas = document.createElement("canvas");
          canvas.width = targetW;
          canvas.height = targetH;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("Canvas is not supported in this browser."));
            return;
          }
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, targetW, targetH);
          drawCoverFit(ctx, img, targetW, targetH);
          const mimeType = `image/${format}`;
          const ext = format === "jpeg" ? "jpg" : "png";
          const baseName = file.name.replace(/\.[^.]+$/, "");
          const outputFileName = `${baseName}_${targetW}x${targetH}.${ext}`;
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
                  (b) => {
                    if (b) res(b);
                    else
                      rej(
                        new Error(
                          "Failed to create image blob. Please try a different format."
                        )
                      );
                  },
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
                Dimensions: `${targetW}×${targetH}px`,
                Format: format.toUpperCase(),
                Quality: targetSizeEnabled ? `Target ≤${targetSize}${targetSizeUnit}` : `${quality}%`
              }
            });
          } catch (err) {
            reject(
              err instanceof Error ? err : new Error("Image processing failed. Please try again.")
            );
          }
        };
        img.src = url;
      });
    },
    [
      width,
      height,
      unit,
      format,
      quality,
      targetSizeEnabled,
      targetSize,
      targetSizeUnit
    ]
  );
  const settingsSlot = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-gray-200 text-sm font-medium", children: "Preset" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedPreset, onValueChange: handlePresetChange, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            className: "w-full bg-gray-700 border-gray-600 text-gray-100",
            "data-ocid": "photo_resize.preset.select",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "bg-gray-800 border-gray-600", children: [
          presets.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: p.label, children: [
            p.label,
            " (",
            p.width,
            "×",
            p.height,
            p.unit,
            p.maxSizeKB ? `, max ${p.maxSizeKB}KB` : "",
            ")"
          ] }, p.label)),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "custom", children: "Custom" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-gray-200 text-sm font-medium", children: "Unit" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: unit, onValueChange: (v) => setUnit(v), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-full bg-gray-700 border-gray-600 text-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "bg-gray-800 border-gray-600", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "px", children: "Pixels (px)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "cm", children: "Centimeters (cm)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "mm", children: "Millimeters (mm)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "inches", children: "Inches" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-gray-200 text-sm font-medium", children: [
          "Width (",
          unit,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            min: 1,
            value: width,
            onChange: (e) => handleWidthChange(Number(e.target.value)),
            className: "bg-gray-700 border-gray-600 text-gray-100",
            "data-ocid": "photo_resize.width.input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-gray-200 text-sm font-medium", children: [
          "Height (",
          unit,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            min: 1,
            value: height,
            onChange: (e) => handleHeightChange(Number(e.target.value)),
            className: "bg-gray-700 border-gray-600 text-gray-100",
            "data-ocid": "photo_resize.height.input"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Switch,
        {
          id: "aspect-ratio",
          checked: maintainAspect,
          onCheckedChange: (checked) => {
            setMaintainAspect(checked);
            if (checked && aspectRatioRef.current) {
              setHeight(
                Number.parseFloat((width / aspectRatioRef.current).toFixed(2))
              );
            }
          },
          "data-ocid": "photo_resize.aspect_ratio.switch"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Label,
        {
          htmlFor: "aspect-ratio",
          className: "text-gray-200 text-sm cursor-pointer",
          children: [
            "Maintain Aspect Ratio",
            maintainAspect && aspectRatioRef.current && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gray-500 text-xs ml-2", children: [
              "(",
              aspectRatioRef.current.toFixed(2),
              ":1)"
            ] })
          ]
        }
      )
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
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "jpeg", children: "JPEG (recommended for photos)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "png", children: "PNG" })
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
          className: "w-full",
          "data-ocid": "photo_resize.quality.toggle"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "checkbox",
            id: "target-size-photo",
            checked: targetSizeEnabled,
            onChange: (e) => setTargetSizeEnabled(e.target.checked),
            className: "w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500",
            "data-ocid": "photo_resize.target_size.checkbox"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            htmlFor: "target-size-photo",
            className: "text-gray-200 text-sm font-medium cursor-pointer",
            children: "Target File Size"
          }
        ),
        targetSizeEnabled && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400 text-xs", children: "(will auto-adjust quality)" })
      ] }),
      targetSizeEnabled && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            min: 1,
            value: targetSize,
            onChange: (e) => setTargetSize(Number(e.target.value)),
            className: "flex-1 bg-gray-700 border-gray-600 text-gray-100",
            "data-ocid": "photo_resize.target_size.input"
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AdvancedToolShell,
    {
      toolTitle,
      acceptedFileTypes: "image/jpeg,image/png,image/webp,image/gif,image/bmp",
      acceptedFileTypesLabel: "Supports JPEG, PNG, WebP, GIF, BMP",
      settingsSlot,
      processingFunction
    }
  );
};
export {
  PhotoResizeTool as P
};
