import { j as jsxRuntimeExports } from "./index-BFVPq1mW.js";
function AdPlaceholder({
  adType,
  className = ""
}) {
  const dimensions = {
    banner: {
      width: 728,
      height: 90,
      className: "w-full max-w-[728px] mx-auto",
      aspectRatio: "728/90"
    },
    "in-content": {
      width: 300,
      height: 250,
      className: "w-full max-w-[300px] mx-auto",
      aspectRatio: "300/250"
    },
    sidebar: {
      width: 160,
      height: 600,
      className: "w-[160px] sticky top-20 hidden lg:block",
      aspectRatio: "160/600"
    }
  };
  const {
    width,
    height,
    className: typeClassName,
    aspectRatio
  } = dimensions[adType];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `${typeClassName} ${className} my-6`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground text-center mb-1", children: "Advertisement" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "bg-muted/30 border border-border rounded-lg flex items-center justify-center overflow-hidden",
        style: {
          aspectRatio,
          minHeight: adType === "sidebar" ? "600px" : void 0
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
          "Ad Space ",
          width,
          "×",
          height
        ] }) })
      }
    )
  ] });
}
export {
  AdPlaceholder as A
};
