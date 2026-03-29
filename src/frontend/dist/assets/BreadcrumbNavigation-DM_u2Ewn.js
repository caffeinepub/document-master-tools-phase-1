import { j as jsxRuntimeExports } from "./index-YN_OslaE.js";
import { H as House } from "./house-CI4Q4zpu.js";
import { C as ChevronRight } from "./chevron-right-BPoM3n0-.js";
function BreadcrumbNavigation({
  items,
  onNavigate
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "nav",
    {
      "aria-label": "Breadcrumb",
      className: "flex items-center gap-1 text-sm text-slate-400 mb-6 flex-wrap",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => onNavigate == null ? void 0 : onNavigate("home"),
            className: "flex items-center gap-1 hover:text-white transition-colors duration-200",
            "aria-label": "Home",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "w-4 h-4 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Home" })
            ]
          }
        ),
        items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 shrink-0 text-slate-600" }),
          item.onClick || item.href ? item.href ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: item.href,
              className: "hover:text-white transition-colors duration-200",
              children: item.label
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: item.onClick,
              className: "hover:text-white transition-colors duration-200",
              children: item.label
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-200", children: item.label })
        ] }, item.label))
      ]
    }
  );
}
export {
  BreadcrumbNavigation as B
};
