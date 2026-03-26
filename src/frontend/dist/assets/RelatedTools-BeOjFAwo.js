import { j as jsxRuntimeExports } from "./index-BFVPq1mW.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent, B as Button } from "./card-BJcsF60x.js";
function RelatedTools({
  tools,
  category: _category
}) {
  if (tools.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-12 pt-8 border-t", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-6", children: "Related Tools" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: tools.map((tool) => {
      const Icon = tool.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "hover:shadow-lg hover:scale-105 hover:border-primary/50 transition-all duration-200 cursor-pointer",
          onClick: tool.onClick,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "card-padding", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: tool.name })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: tool.description })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "card-padding pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: tool.onClick,
                variant: "outline",
                className: "w-full min-h-[44px]",
                children: "Try Tool"
              }
            ) })
          ]
        },
        tool.name
      );
    }) })
  ] });
}
export {
  RelatedTools as R
};
