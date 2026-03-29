import { c as createLucideIcon, j as jsxRuntimeExports, r as reactExports, R as React, v as ChevronDown, C as Check, X, y as trackResumeCreated } from "./index-YN_OslaE.js";
import { A as AdPlaceholder } from "./AdPlaceholder-Cx1-iM2q.js";
import { B as BreadcrumbNavigation } from "./BreadcrumbNavigation-DM_u2Ewn.js";
import { R as RelatedTools } from "./RelatedTools-iMN6Yaot.js";
import { S as SEO } from "./SEO-DRKgHPjT.js";
import { c as createContextScope, u as useControllableState, a as composeEventHandlers, e as useLayoutEffect2 } from "./index-B7n2t64q.js";
import { a as useId, c as createCollection, u as useDirection } from "./index-DyakJ80C.js";
import { P as Primitive, u as useComposedRefs, L as Label, I as Input } from "./input-BldACiYg.js";
import { P as Presence } from "./index-Xl3kZHcB.js";
import { c as cn } from "./utils-Bmita3Ip.js";
import { B as Button } from "./button-N_0YpN9P.js";
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from "./card-njDO0RzR.js";
import { u as ue, P as Progress } from "./progress-CBku63p5.js";
import { T as Trash2 } from "./trash-2-CWVq57o4.js";
import { P as Plus } from "./plus-DE6Vx8Vi.js";
import { C as Checkbox } from "./checkbox-F3sAUWdy.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-Bm5_92VY.js";
import { U as Upload } from "./upload-DORtw0Gt.js";
import { S as Sparkles } from "./sparkles-Dyd1eZSt.js";
import { C as ChevronRight } from "./chevron-right-BPoM3n0-.js";
import { D as Download } from "./download-CGoTQdDD.js";
import { A as ArrowLeft } from "./arrow-left-C6-8XIiy.js";
import { C as Calculator } from "./calculator-DpqpPrZx.js";
import { F as FileText } from "./file-text-7eOuz9ac.js";
import { I as Image } from "./image-CdfpD8_U.js";
import "./house-CI4Q4zpu.js";
import "./index-IXOTxK3N.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode);
function FAQSchema({ faqs }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "script",
    {
      type: "application/ld+json",
      dangerouslySetInnerHTML: { __html: JSON.stringify(structuredData) }
    }
  );
}
var COLLAPSIBLE_NAME = "Collapsible";
var [createCollapsibleContext, createCollapsibleScope] = createContextScope(COLLAPSIBLE_NAME);
var [CollapsibleProvider, useCollapsibleContext] = createCollapsibleContext(COLLAPSIBLE_NAME);
var Collapsible = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeCollapsible,
      open: openProp,
      defaultOpen,
      disabled,
      onOpenChange,
      ...collapsibleProps
    } = props;
    const [open, setOpen] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen ?? false,
      onChange: onOpenChange,
      caller: COLLAPSIBLE_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      CollapsibleProvider,
      {
        scope: __scopeCollapsible,
        disabled,
        contentId: useId(),
        open,
        onOpenToggle: reactExports.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            "data-state": getState$1(open),
            "data-disabled": disabled ? "" : void 0,
            ...collapsibleProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Collapsible.displayName = COLLAPSIBLE_NAME;
var TRIGGER_NAME$1 = "CollapsibleTrigger";
var CollapsibleTrigger = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeCollapsible, ...triggerProps } = props;
    const context = useCollapsibleContext(TRIGGER_NAME$1, __scopeCollapsible);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        "aria-controls": context.contentId,
        "aria-expanded": context.open || false,
        "data-state": getState$1(context.open),
        "data-disabled": context.disabled ? "" : void 0,
        disabled: context.disabled,
        ...triggerProps,
        ref: forwardedRef,
        onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
      }
    );
  }
);
CollapsibleTrigger.displayName = TRIGGER_NAME$1;
var CONTENT_NAME$1 = "CollapsibleContent";
var CollapsibleContent = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { forceMount, ...contentProps } = props;
    const context = useCollapsibleContext(CONTENT_NAME$1, props.__scopeCollapsible);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleContentImpl, { ...contentProps, ref: forwardedRef, present }) });
  }
);
CollapsibleContent.displayName = CONTENT_NAME$1;
var CollapsibleContentImpl = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeCollapsible, present, children, ...contentProps } = props;
  const context = useCollapsibleContext(CONTENT_NAME$1, __scopeCollapsible);
  const [isPresent, setIsPresent] = reactExports.useState(present);
  const ref = reactExports.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const heightRef = reactExports.useRef(0);
  const height = heightRef.current;
  const widthRef = reactExports.useRef(0);
  const width = widthRef.current;
  const isOpen = context.open || isPresent;
  const isMountAnimationPreventedRef = reactExports.useRef(isOpen);
  const originalStylesRef = reactExports.useRef(void 0);
  reactExports.useEffect(() => {
    const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
    return () => cancelAnimationFrame(rAF);
  }, []);
  useLayoutEffect2(() => {
    const node = ref.current;
    if (node) {
      originalStylesRef.current = originalStylesRef.current || {
        transitionDuration: node.style.transitionDuration,
        animationName: node.style.animationName
      };
      node.style.transitionDuration = "0s";
      node.style.animationName = "none";
      const rect = node.getBoundingClientRect();
      heightRef.current = rect.height;
      widthRef.current = rect.width;
      if (!isMountAnimationPreventedRef.current) {
        node.style.transitionDuration = originalStylesRef.current.transitionDuration;
        node.style.animationName = originalStylesRef.current.animationName;
      }
      setIsPresent(present);
    }
  }, [context.open, present]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-state": getState$1(context.open),
      "data-disabled": context.disabled ? "" : void 0,
      id: context.contentId,
      hidden: !isOpen,
      ...contentProps,
      ref: composedRefs,
      style: {
        [`--radix-collapsible-content-height`]: height ? `${height}px` : void 0,
        [`--radix-collapsible-content-width`]: width ? `${width}px` : void 0,
        ...props.style
      },
      children: isOpen && children
    }
  );
});
function getState$1(open) {
  return open ? "open" : "closed";
}
var Root = Collapsible;
var Trigger = CollapsibleTrigger;
var Content = CollapsibleContent;
var ACCORDION_NAME = "Accordion";
var ACCORDION_KEYS = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"];
var [Collection, useCollection, createCollectionScope] = createCollection(ACCORDION_NAME);
var [createAccordionContext] = createContextScope(ACCORDION_NAME, [
  createCollectionScope,
  createCollapsibleScope
]);
var useCollapsibleScope = createCollapsibleScope();
var Accordion$1 = React.forwardRef(
  (props, forwardedRef) => {
    const { type, ...accordionProps } = props;
    const singleProps = accordionProps;
    const multipleProps = accordionProps;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Provider, { scope: props.__scopeAccordion, children: type === "multiple" ? /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionImplMultiple, { ...multipleProps, ref: forwardedRef }) : /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionImplSingle, { ...singleProps, ref: forwardedRef }) });
  }
);
Accordion$1.displayName = ACCORDION_NAME;
var [AccordionValueProvider, useAccordionValueContext] = createAccordionContext(ACCORDION_NAME);
var [AccordionCollapsibleProvider, useAccordionCollapsibleContext] = createAccordionContext(
  ACCORDION_NAME,
  { collapsible: false }
);
var AccordionImplSingle = React.forwardRef(
  (props, forwardedRef) => {
    const {
      value: valueProp,
      defaultValue,
      onValueChange = () => {
      },
      collapsible = false,
      ...accordionSingleProps
    } = props;
    const [value, setValue] = useControllableState({
      prop: valueProp,
      defaultProp: defaultValue ?? "",
      onChange: onValueChange,
      caller: ACCORDION_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      AccordionValueProvider,
      {
        scope: props.__scopeAccordion,
        value: React.useMemo(() => value ? [value] : [], [value]),
        onItemOpen: setValue,
        onItemClose: React.useCallback(() => collapsible && setValue(""), [collapsible, setValue]),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionCollapsibleProvider, { scope: props.__scopeAccordion, collapsible, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionImpl, { ...accordionSingleProps, ref: forwardedRef }) })
      }
    );
  }
);
var AccordionImplMultiple = React.forwardRef((props, forwardedRef) => {
  const {
    value: valueProp,
    defaultValue,
    onValueChange = () => {
    },
    ...accordionMultipleProps
  } = props;
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue ?? [],
    onChange: onValueChange,
    caller: ACCORDION_NAME
  });
  const handleItemOpen = React.useCallback(
    (itemValue) => setValue((prevValue = []) => [...prevValue, itemValue]),
    [setValue]
  );
  const handleItemClose = React.useCallback(
    (itemValue) => setValue((prevValue = []) => prevValue.filter((value2) => value2 !== itemValue)),
    [setValue]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AccordionValueProvider,
    {
      scope: props.__scopeAccordion,
      value,
      onItemOpen: handleItemOpen,
      onItemClose: handleItemClose,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionCollapsibleProvider, { scope: props.__scopeAccordion, collapsible: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionImpl, { ...accordionMultipleProps, ref: forwardedRef }) })
    }
  );
});
var [AccordionImplProvider, useAccordionContext] = createAccordionContext(ACCORDION_NAME);
var AccordionImpl = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAccordion, disabled, dir, orientation = "vertical", ...accordionProps } = props;
    const accordionRef = React.useRef(null);
    const composedRefs = useComposedRefs(accordionRef, forwardedRef);
    const getItems = useCollection(__scopeAccordion);
    const direction = useDirection(dir);
    const isDirectionLTR = direction === "ltr";
    const handleKeyDown = composeEventHandlers(props.onKeyDown, (event) => {
      var _a;
      if (!ACCORDION_KEYS.includes(event.key)) return;
      const target = event.target;
      const triggerCollection = getItems().filter((item) => {
        var _a2;
        return !((_a2 = item.ref.current) == null ? void 0 : _a2.disabled);
      });
      const triggerIndex = triggerCollection.findIndex((item) => item.ref.current === target);
      const triggerCount = triggerCollection.length;
      if (triggerIndex === -1) return;
      event.preventDefault();
      let nextIndex = triggerIndex;
      const homeIndex = 0;
      const endIndex = triggerCount - 1;
      const moveNext = () => {
        nextIndex = triggerIndex + 1;
        if (nextIndex > endIndex) {
          nextIndex = homeIndex;
        }
      };
      const movePrev = () => {
        nextIndex = triggerIndex - 1;
        if (nextIndex < homeIndex) {
          nextIndex = endIndex;
        }
      };
      switch (event.key) {
        case "Home":
          nextIndex = homeIndex;
          break;
        case "End":
          nextIndex = endIndex;
          break;
        case "ArrowRight":
          if (orientation === "horizontal") {
            if (isDirectionLTR) {
              moveNext();
            } else {
              movePrev();
            }
          }
          break;
        case "ArrowDown":
          if (orientation === "vertical") {
            moveNext();
          }
          break;
        case "ArrowLeft":
          if (orientation === "horizontal") {
            if (isDirectionLTR) {
              movePrev();
            } else {
              moveNext();
            }
          }
          break;
        case "ArrowUp":
          if (orientation === "vertical") {
            movePrev();
          }
          break;
      }
      const clampedIndex = nextIndex % triggerCount;
      (_a = triggerCollection[clampedIndex].ref.current) == null ? void 0 : _a.focus();
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      AccordionImplProvider,
      {
        scope: __scopeAccordion,
        disabled,
        direction: dir,
        orientation,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Slot, { scope: __scopeAccordion, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            ...accordionProps,
            "data-orientation": orientation,
            ref: composedRefs,
            onKeyDown: disabled ? void 0 : handleKeyDown
          }
        ) })
      }
    );
  }
);
var ITEM_NAME = "AccordionItem";
var [AccordionItemProvider, useAccordionItemContext] = createAccordionContext(ITEM_NAME);
var AccordionItem$1 = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAccordion, value, ...accordionItemProps } = props;
    const accordionContext = useAccordionContext(ITEM_NAME, __scopeAccordion);
    const valueContext = useAccordionValueContext(ITEM_NAME, __scopeAccordion);
    const collapsibleScope = useCollapsibleScope(__scopeAccordion);
    const triggerId = useId();
    const open = value && valueContext.value.includes(value) || false;
    const disabled = accordionContext.disabled || props.disabled;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      AccordionItemProvider,
      {
        scope: __scopeAccordion,
        open,
        disabled,
        triggerId,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Root,
          {
            "data-orientation": accordionContext.orientation,
            "data-state": getState(open),
            ...collapsibleScope,
            ...accordionItemProps,
            ref: forwardedRef,
            disabled,
            open,
            onOpenChange: (open2) => {
              if (open2) {
                valueContext.onItemOpen(value);
              } else {
                valueContext.onItemClose(value);
              }
            }
          }
        )
      }
    );
  }
);
AccordionItem$1.displayName = ITEM_NAME;
var HEADER_NAME = "AccordionHeader";
var AccordionHeader = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAccordion, ...headerProps } = props;
    const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
    const itemContext = useAccordionItemContext(HEADER_NAME, __scopeAccordion);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.h3,
      {
        "data-orientation": accordionContext.orientation,
        "data-state": getState(itemContext.open),
        "data-disabled": itemContext.disabled ? "" : void 0,
        ...headerProps,
        ref: forwardedRef
      }
    );
  }
);
AccordionHeader.displayName = HEADER_NAME;
var TRIGGER_NAME = "AccordionTrigger";
var AccordionTrigger$1 = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAccordion, ...triggerProps } = props;
    const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
    const itemContext = useAccordionItemContext(TRIGGER_NAME, __scopeAccordion);
    const collapsibleContext = useAccordionCollapsibleContext(TRIGGER_NAME, __scopeAccordion);
    const collapsibleScope = useCollapsibleScope(__scopeAccordion);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.ItemSlot, { scope: __scopeAccordion, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Trigger,
      {
        "aria-disabled": itemContext.open && !collapsibleContext.collapsible || void 0,
        "data-orientation": accordionContext.orientation,
        id: itemContext.triggerId,
        ...collapsibleScope,
        ...triggerProps,
        ref: forwardedRef
      }
    ) });
  }
);
AccordionTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "AccordionContent";
var AccordionContent$1 = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAccordion, ...contentProps } = props;
    const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
    const itemContext = useAccordionItemContext(CONTENT_NAME, __scopeAccordion);
    const collapsibleScope = useCollapsibleScope(__scopeAccordion);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Content,
      {
        role: "region",
        "aria-labelledby": itemContext.triggerId,
        "data-orientation": accordionContext.orientation,
        ...collapsibleScope,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ["--radix-accordion-content-height"]: "var(--radix-collapsible-content-height)",
          ["--radix-accordion-content-width"]: "var(--radix-collapsible-content-width)",
          ...props.style
        }
      }
    );
  }
);
AccordionContent$1.displayName = CONTENT_NAME;
function getState(open) {
  return open ? "open" : "closed";
}
var Root2 = Accordion$1;
var Item = AccordionItem$1;
var Header = AccordionHeader;
var Trigger2 = AccordionTrigger$1;
var Content2 = AccordionContent$1;
function Accordion({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2, { "data-slot": "accordion", ...props });
}
function AccordionItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Item,
    {
      "data-slot": "accordion-item",
      className: cn("border-b last:border-b-0", className),
      ...props
    }
  );
}
function AccordionTrigger({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { className: "flex", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Trigger2,
    {
      "data-slot": "accordion-trigger",
      className: cn(
        "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" })
      ]
    }
  ) });
}
function AccordionContent({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content2,
    {
      "data-slot": "accordion-content",
      className: "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm",
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("pt-0 pb-4", className), children })
    }
  );
}
const COLOR_THEMES = [
  {
    name: "Professional Blue",
    primary: "#1e40af",
    secondary: "#3b82f6",
    light: "#dbeafe",
    text: "#1f2937"
  },
  {
    name: "Corporate Black",
    primary: "#1f2937",
    secondary: "#4b5563",
    light: "#e5e7eb",
    text: "#111827"
  },
  {
    name: "Creative Purple",
    primary: "#7c3aed",
    secondary: "#a78bfa",
    light: "#ede9fe",
    text: "#1f2937"
  },
  {
    name: "Modern Teal",
    primary: "#0d9488",
    secondary: "#14b8a6",
    light: "#ccfbf1",
    text: "#1f2937"
  },
  {
    name: "Classic Gray",
    primary: "#374151",
    secondary: "#6b7280",
    light: "#f3f4f6",
    text: "#111827"
  },
  {
    name: "Elegant Maroon",
    primary: "#991b1b",
    secondary: "#dc2626",
    light: "#fee2e2",
    text: "#1f2937"
  }
];
function ColorThemeSelector({
  selected,
  onSelect
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "mb-3 block", children: "Color Theme" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-3", children: COLOR_THEMES.map((theme) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => onSelect(theme),
        className: `relative border-2 rounded-lg p-3 transition-all hover:shadow-md ${selected.name === theme.name ? "border-primary" : "border-border"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-6 h-6 rounded",
                style: { backgroundColor: theme.primary }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-6 h-6 rounded",
                style: { backgroundColor: theme.secondary }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-6 h-6 rounded border",
                style: { backgroundColor: theme.light }
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-left", children: theme.name }),
          selected.name === theme.name && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3 text-primary-foreground" }) })
        ]
      },
      theme.name
    )) })
  ] });
}
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
function AchievementsForm({
  data,
  onChange
}) {
  const handleAdd = () => {
    const newAchievement = {
      id: Date.now().toString(),
      title: "",
      description: ""
    };
    onChange({
      ...data,
      achievements: [...data.achievements, newAchievement]
    });
  };
  const handleRemove = (id) => {
    onChange({
      ...data,
      achievements: data.achievements.filter((ach) => ach.id !== id)
    });
  };
  const handleChange = (id, field, value) => {
    onChange({
      ...data,
      achievements: data.achievements.map(
        (ach) => ach.id === id ? { ...ach, [field]: value } : ach
      )
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    data.achievements.map((ach, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border rounded-lg p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-semibold", children: [
          "Achievement ",
          index + 1
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: "ghost",
            onClick: () => handleRemove(ach.id),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Title *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: ach.title,
              onChange: (e) => handleChange(ach.id, "title", e.target.value),
              placeholder: "Award or Achievement Title",
              className: "mt-1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Description *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: ach.description,
              onChange: (e) => handleChange(ach.id, "description", e.target.value),
              placeholder: "Describe the achievement...",
              rows: 2,
              className: "mt-1"
            }
          )
        ] })
      ] })
    ] }, ach.id)),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleAdd, variant: "outline", className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
      "Add Achievement"
    ] })
  ] });
}
function CertificationsForm({
  data,
  onChange
}) {
  const handleAdd = () => {
    const newCert = {
      id: Date.now().toString(),
      name: "",
      issuer: "",
      date: ""
    };
    onChange({
      ...data,
      certifications: [...data.certifications, newCert]
    });
  };
  const handleRemove = (id) => {
    onChange({
      ...data,
      certifications: data.certifications.filter((cert) => cert.id !== id)
    });
  };
  const handleChange = (id, field, value) => {
    onChange({
      ...data,
      certifications: data.certifications.map(
        (cert) => cert.id === id ? { ...cert, [field]: value } : cert
      )
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    data.certifications.map((cert, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border rounded-lg p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-semibold", children: [
          "Certification ",
          index + 1
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: "ghost",
            onClick: () => handleRemove(cert.id),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Certification Name *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: cert.name,
              onChange: (e) => handleChange(cert.id, "name", e.target.value),
              placeholder: "AWS Certified Solutions Architect",
              className: "mt-1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Issuing Organization *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: cert.issuer,
              onChange: (e) => handleChange(cert.id, "issuer", e.target.value),
              placeholder: "Amazon Web Services",
              className: "mt-1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Date Obtained *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "month",
              value: cert.date,
              onChange: (e) => handleChange(cert.id, "date", e.target.value),
              className: "mt-1"
            }
          )
        ] })
      ] })
    ] }, cert.id)),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleAdd, variant: "outline", className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
      "Add Certification"
    ] })
  ] });
}
function EducationForm({ data, onChange }) {
  const handleAdd = () => {
    const newEducation = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      grade: ""
    };
    onChange({
      ...data,
      education: [...data.education, newEducation]
    });
  };
  const handleRemove = (id) => {
    onChange({
      ...data,
      education: data.education.filter((edu) => edu.id !== id)
    });
  };
  const handleChange = (id, field, value) => {
    onChange({
      ...data,
      education: data.education.map(
        (edu) => edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    data.education.map((edu, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-semibold", children: [
          "Education ",
          index + 1
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: "ghost",
            onClick: () => handleRemove(edu.id),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Institution *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: edu.institution,
              onChange: (e) => handleChange(edu.id, "institution", e.target.value),
              placeholder: "University/College Name",
              className: "mt-1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Degree *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: edu.degree,
              onChange: (e) => handleChange(edu.id, "degree", e.target.value),
              placeholder: "B.Tech, MBA, etc.",
              className: "mt-1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Field of Study" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: edu.field || "",
              onChange: (e) => handleChange(edu.id, "field", e.target.value),
              placeholder: "Computer Science, Business, etc.",
              className: "mt-1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Start Date *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "month",
              value: edu.startDate,
              onChange: (e) => handleChange(edu.id, "startDate", e.target.value),
              className: "mt-1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "End Date *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "month",
              value: edu.endDate,
              onChange: (e) => handleChange(edu.id, "endDate", e.target.value),
              className: "mt-1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Grade/CGPA" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: edu.grade || "",
              onChange: (e) => handleChange(edu.id, "grade", e.target.value),
              placeholder: "8.5 CGPA, 85%, First Class, etc.",
              className: "mt-1"
            }
          )
        ] })
      ] })
    ] }, edu.id)),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleAdd, variant: "outline", className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
      "Add Education"
    ] })
  ] });
}
function ExperienceForm({
  data,
  onChange
}) {
  const handleAdd = () => {
    const newExperience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: ""
    };
    onChange({
      ...data,
      experience: [...data.experience, newExperience]
    });
  };
  const handleRemove = (id) => {
    onChange({
      ...data,
      experience: data.experience.filter((exp) => exp.id !== id)
    });
  };
  const handleChange = (id, field, value) => {
    onChange({
      ...data,
      experience: data.experience.map(
        (exp) => exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    data.experience.map((exp, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-semibold", children: [
          "Experience ",
          index + 1
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: "ghost",
            onClick: () => handleRemove(exp.id),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Company *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: exp.company,
              onChange: (e) => handleChange(exp.id, "company", e.target.value),
              placeholder: "Company Name",
              className: "mt-1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Position *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: exp.position,
              onChange: (e) => handleChange(exp.id, "position", e.target.value),
              placeholder: "Job Title",
              className: "mt-1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Start Date *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "month",
              value: exp.startDate,
              onChange: (e) => handleChange(exp.id, "startDate", e.target.value),
              className: "mt-1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "End Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "month",
              value: exp.endDate,
              onChange: (e) => handleChange(exp.id, "endDate", e.target.value),
              disabled: exp.current,
              className: "mt-1"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Checkbox,
              {
                id: `current-${exp.id}`,
                checked: exp.current,
                onCheckedChange: (checked) => handleChange(exp.id, "current", checked)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: `current-${exp.id}`, className: "ml-2 text-sm", children: "Currently working here" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Description *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: exp.description,
              onChange: (e) => handleChange(exp.id, "description", e.target.value),
              placeholder: "Describe your responsibilities and achievements...",
              rows: 4,
              className: "mt-1"
            }
          )
        ] })
      ] })
    ] }, exp.id)),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleAdd, variant: "outline", className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
      "Add Experience"
    ] })
  ] });
}
function LanguagesForm({ data, onChange }) {
  const handleAdd = () => {
    const newLang = {
      id: Date.now().toString(),
      name: "",
      proficiency: "Intermediate"
    };
    onChange({
      ...data,
      languages: [...data.languages, newLang]
    });
  };
  const handleRemove = (id) => {
    onChange({
      ...data,
      languages: data.languages.filter((lang) => lang.id !== id)
    });
  };
  const handleChange = (id, field, value) => {
    onChange({
      ...data,
      languages: data.languages.map(
        (lang) => lang.id === id ? { ...lang, [field]: value } : lang
      )
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    data.languages.map((lang, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 items-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
          "Language ",
          index + 1,
          " *"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: lang.name,
            onChange: (e) => handleChange(lang.id, "name", e.target.value),
            placeholder: "English, Hindi, Spanish",
            className: "mt-1"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Proficiency *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: lang.proficiency,
            onValueChange: (value) => handleChange(lang.id, "proficiency", value),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Native", children: "Native" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Fluent", children: "Fluent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Advanced", children: "Advanced" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Intermediate", children: "Intermediate" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Basic", children: "Basic" })
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "icon",
          variant: "ghost",
          onClick: () => handleRemove(lang.id),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" })
        }
      )
    ] }, lang.id)),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleAdd, variant: "outline", className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
      "Add Language"
    ] })
  ] });
}
function formatDateToMMYYYY(date) {
  if (!date) return "";
  const dateObj = typeof date === "string" ? new Date(date) : date;
  if (Number.isNaN(dateObj.getTime())) return "";
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();
  return `${month}/${year}`;
}
function formatPhoneNumber(phone, isIndian = true) {
  if (!phone) return "";
  const digits = phone.replace(/\D/g, "");
  if (isIndian) {
    if (digits.length === 10) {
      return `+91-${digits.slice(0, 5)}-${digits.slice(5)}`;
    }
    if (digits.length === 12 && digits.startsWith("91")) {
      return `+91-${digits.slice(2, 7)}-${digits.slice(7)}`;
    }
  } else if (digits.length >= 10) {
    return `+${digits}`;
  }
  return phone;
}
function capitalizeProperNouns(text) {
  if (!text) return "";
  return text.split(" ").map((word) => {
    if (word.length === 0) return word;
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(" ");
}
const ACTION_VERBS = [
  "Developed",
  "Managed",
  "Led",
  "Implemented",
  "Optimized",
  "Designed",
  "Created",
  "Established",
  "Coordinated",
  "Executed",
  "Achieved",
  "Delivered",
  "Improved",
  "Streamlined",
  "Spearheaded",
  "Orchestrated"
];
function generateProfessionalSummary(resumeData) {
  const { experience, skills, achievements } = resumeData;
  let totalMonths = 0;
  for (const exp of experience) {
    const start = new Date(exp.startDate);
    const end = exp.current ? /* @__PURE__ */ new Date() : new Date(exp.endDate);
    if (!Number.isNaN(start.getTime()) && !Number.isNaN(end.getTime())) {
      totalMonths += (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    }
  }
  const years = Math.max(1, Math.floor(totalMonths / 12));
  const topSkills = skills.slice(0, 5).map((s) => s.name);
  const domain = experience.length > 0 ? experience[0].position : "professional";
  const actionVerb = ACTION_VERBS[Math.floor(Math.random() * ACTION_VERBS.length)];
  const parts = [];
  if (years >= 1) {
    parts.push(
      `${years}+ year${years > 1 ? "s" : ""} of experience in ${domain.toLowerCase()}`
    );
  } else {
    parts.push(
      `Motivated professional with expertise in ${domain.toLowerCase()}`
    );
  }
  if (topSkills.length > 0) {
    const skillsList = topSkills.slice(0, 3).join(", ");
    parts.push(`with strong proficiency in ${skillsList}`);
  }
  if (achievements.length > 0) {
    parts.push("Proven track record of delivering results and driving success");
  } else {
    parts.push(
      `${actionVerb} to leverage skills and contribute to organizational growth`
    );
  }
  return `${parts.join(". ")}.`;
}
function PersonalInfoForm({
  data,
  onChange,
  templateSlug
}) {
  const isIndianTemplate = [
    "fresher-resume",
    "government-job-resume",
    "private-job-resume",
    "hindi-resume",
    "biodata-for-marriage",
    "teacher-resume",
    "police-army-resume"
  ].includes(templateSlug);
  const handleChange = (field, value) => {
    let processedValue = value;
    if (field === "name") {
      processedValue = capitalizeProperNouns(value);
    } else if (field === "phone") {
      processedValue = formatPhoneNumber(value, isIndianTemplate);
    }
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: processedValue
      }
    });
  };
  const handlePhotoUpload = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      ue.error("Photo size must be less than 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      var _a2;
      const dataUrl = (_a2 = event.target) == null ? void 0 : _a2.result;
      onChange({
        ...data,
        personalInfo: {
          ...data.personalInfo,
          photo: dataUrl
        }
      });
      ue.success("Photo uploaded successfully");
    };
    reader.readAsDataURL(file);
  };
  const handleRemovePhoto = () => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        photo: ""
      }
    });
  };
  const handleGenerateSummary = () => {
    const summary = generateProfessionalSummary(data);
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        summary
      }
    });
    ue.success("Professional summary generated!");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
        "Photo ",
        !isIndianTemplate && "(Optional)"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2", children: data.personalInfo.photo ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative inline-block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: data.personalInfo.photo,
            alt: "Profile",
            className: "w-32 h-32 object-cover rounded-lg border-2"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: "destructive",
            className: "absolute -top-2 -right-2",
            onClick: handleRemovePhoto,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center justify-center w-32 h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-8 w-8 mx-auto mb-2 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Upload Photo" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "file",
            accept: "image/*",
            className: "hidden",
            onChange: handlePhotoUpload
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Max 5MB, JPG or PNG" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", children: "Full Name *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "name",
            value: data.personalInfo.name,
            onChange: (e) => handleChange("name", e.target.value),
            placeholder: "John Doe",
            className: "mt-1"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "email",
            type: "email",
            value: data.personalInfo.email,
            onChange: (e) => handleChange("email", e.target.value),
            placeholder: "john@example.com",
            className: "mt-1"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "phone", children: "Phone *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "phone",
            type: "tel",
            value: data.personalInfo.phone,
            onChange: (e) => handleChange("phone", e.target.value),
            placeholder: isIndianTemplate ? "+91-XXXXX-XXXXX" : "+1234567890",
            className: "mt-1"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "address", children: "Address *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "address",
            value: data.personalInfo.address,
            onChange: (e) => handleChange("address", e.target.value),
            placeholder: "City, State, Country",
            className: "mt-1"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "linkedin", children: "LinkedIn (Optional)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "linkedin",
            value: data.personalInfo.linkedin || "",
            onChange: (e) => handleChange("linkedin", e.target.value),
            placeholder: "linkedin.com/in/username",
            className: "mt-1"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "portfolio", children: "Portfolio/Website (Optional)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "portfolio",
            value: data.personalInfo.portfolio || "",
            onChange: (e) => handleChange("portfolio", e.target.value),
            placeholder: "www.yourportfolio.com",
            className: "mt-1"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "summary", children: "Professional Summary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            onClick: handleGenerateSummary,
            disabled: data.experience.length === 0 && data.skills.length === 0,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "mr-2 h-4 w-4" }),
              "Generate with AI"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          id: "summary",
          value: data.personalInfo.summary || "",
          onChange: (e) => handleChange("summary", e.target.value),
          placeholder: "Brief professional summary highlighting your key strengths and career objectives...",
          rows: 4,
          className: "mt-1"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "2-3 sentences summarizing your experience and goals" })
    ] })
  ] });
}
function ProjectsForm({ data, onChange }) {
  const handleAdd = () => {
    const newProject = {
      id: Date.now().toString(),
      title: "",
      description: "",
      technologies: "",
      link: ""
    };
    onChange({
      ...data,
      projects: [...data.projects, newProject]
    });
  };
  const handleRemove = (id) => {
    onChange({
      ...data,
      projects: data.projects.filter((proj) => proj.id !== id)
    });
  };
  const handleChange = (id, field, value) => {
    onChange({
      ...data,
      projects: data.projects.map(
        (proj) => proj.id === id ? { ...proj, [field]: value } : proj
      )
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    data.projects.map((project, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-semibold", children: [
          "Project ",
          index + 1
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: "ghost",
            onClick: () => handleRemove(project.id),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Project Title *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: project.title,
              onChange: (e) => handleChange(project.id, "title", e.target.value),
              placeholder: "Project Name",
              className: "mt-1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Description *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: project.description,
              onChange: (e) => handleChange(project.id, "description", e.target.value),
              placeholder: "Describe the project...",
              rows: 3,
              className: "mt-1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Technologies Used" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: project.technologies || "",
              onChange: (e) => handleChange(project.id, "technologies", e.target.value),
              placeholder: "React, Node.js, MongoDB",
              className: "mt-1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Project Link" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: project.link || "",
              onChange: (e) => handleChange(project.id, "link", e.target.value),
              placeholder: "https://github.com/username/project",
              className: "mt-1"
            }
          )
        ] })
      ] })
    ] }, project.id)),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleAdd, variant: "outline", className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
      "Add Project"
    ] })
  ] });
}
function ReferencesForm({
  data,
  onChange
}) {
  const handleAdd = () => {
    const newRef = {
      id: Date.now().toString(),
      name: "",
      position: "",
      company: "",
      phone: "",
      email: ""
    };
    onChange({
      ...data,
      references: [...data.references, newRef]
    });
  };
  const handleRemove = (id) => {
    onChange({
      ...data,
      references: data.references.filter((ref) => ref.id !== id)
    });
  };
  const handleChange = (id, field, value) => {
    onChange({
      ...data,
      references: data.references.map(
        (ref) => ref.id === id ? { ...ref, [field]: value } : ref
      )
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    data.references.map((ref, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-semibold", children: [
          "Reference ",
          index + 1
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: "ghost",
            onClick: () => handleRemove(ref.id),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Name *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: ref.name,
              onChange: (e) => handleChange(ref.id, "name", e.target.value),
              placeholder: "Reference Name",
              className: "mt-1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Position *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: ref.position,
              onChange: (e) => handleChange(ref.id, "position", e.target.value),
              placeholder: "Job Title",
              className: "mt-1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Company *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: ref.company,
              onChange: (e) => handleChange(ref.id, "company", e.target.value),
              placeholder: "Company Name",
              className: "mt-1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Phone *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: ref.phone,
              onChange: (e) => handleChange(ref.id, "phone", e.target.value),
              placeholder: "+91-XXXXX-XXXXX",
              className: "mt-1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Email *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "email",
              value: ref.email,
              onChange: (e) => handleChange(ref.id, "email", e.target.value),
              placeholder: "reference@company.com",
              className: "mt-1"
            }
          )
        ] })
      ] })
    ] }, ref.id)),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleAdd, variant: "outline", className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
      "Add Reference"
    ] })
  ] });
}
function SkillsForm({ data, onChange }) {
  const handleAdd = () => {
    const newSkill = {
      id: Date.now().toString(),
      name: "",
      level: ""
    };
    onChange({
      ...data,
      skills: [...data.skills, newSkill]
    });
  };
  const handleRemove = (id) => {
    onChange({
      ...data,
      skills: data.skills.filter((skill) => skill.id !== id)
    });
  };
  const handleChange = (id, field, value) => {
    onChange({
      ...data,
      skills: data.skills.map(
        (skill) => skill.id === id ? { ...skill, [field]: value } : skill
      )
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    data.skills.map((skill, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 items-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
          "Skill ",
          index + 1,
          " *"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: skill.name,
            onChange: (e) => handleChange(skill.id, "name", e.target.value),
            placeholder: "e.g., JavaScript, Project Management",
            className: "mt-1"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-32", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Level" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: skill.level || "",
            onChange: (e) => handleChange(skill.id, "level", e.target.value),
            placeholder: "Expert",
            className: "mt-1"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "icon",
          variant: "ghost",
          onClick: () => handleRemove(skill.id),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" })
        }
      )
    ] }, skill.id)),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleAdd, variant: "outline", className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
      "Add Skill"
    ] })
  ] });
}
const STEPS = [
  { id: "personal", label: "Personal Info", component: PersonalInfoForm },
  { id: "education", label: "Education", component: EducationForm },
  { id: "experience", label: "Experience", component: ExperienceForm },
  { id: "skills", label: "Skills", component: SkillsForm },
  { id: "projects", label: "Projects", component: ProjectsForm },
  {
    id: "certifications",
    label: "Certifications",
    component: CertificationsForm
  },
  { id: "languages", label: "Languages", component: LanguagesForm },
  { id: "achievements", label: "Achievements", component: AchievementsForm },
  { id: "references", label: "References", component: ReferencesForm }
];
function ResumeFormWizard({
  resumeData,
  onChange,
  templateSlug,
  selectedTheme,
  onThemeChange
}) {
  const [currentStep, setCurrentStep] = reactExports.useState(0);
  const [isMobile, _setIsMobile] = reactExports.useState(window.innerWidth < 768);
  const calculateProgress = () => {
    let filledFields = 0;
    let totalFields = 0;
    totalFields += 4;
    if (resumeData.personalInfo.name) filledFields++;
    if (resumeData.personalInfo.email) filledFields++;
    if (resumeData.personalInfo.phone) filledFields++;
    if (resumeData.personalInfo.address) filledFields++;
    totalFields += 8;
    if (resumeData.education.length > 0) filledFields++;
    if (resumeData.experience.length > 0) filledFields++;
    if (resumeData.skills.length > 0) filledFields++;
    if (resumeData.projects.length > 0) filledFields++;
    if (resumeData.certifications.length > 0) filledFields++;
    if (resumeData.languages.length > 0) filledFields++;
    if (resumeData.achievements.length > 0) filledFields++;
    if (resumeData.references.length > 0) filledFields++;
    return Math.round(filledFields / totalFields * 100);
  };
  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  const handleSaveDraft = () => {
    ue.success("Draft saved successfully!");
  };
  const CurrentFormComponent = STEPS[currentStep].component;
  const progress = calculateProgress();
  if (isMobile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Build Your Resume" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Progress" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              progress,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: progress, className: "h-2" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ColorThemeSelector,
          {
            selected: selectedTheme,
            onSelect: onThemeChange
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Accordion, { type: "single", collapsible: true, value: STEPS[currentStep].id, children: STEPS.map((step, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: step.id, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { onClick: () => setCurrentStep(index), children: step.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            CurrentFormComponent,
            {
              data: resumeData,
              onChange,
              templateSlug
            }
          ) })
        ] }, step.id)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: handleSaveDraft,
            variant: "outline",
            className: "flex-1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "mr-2 h-4 w-4" }),
              "Save Draft"
            ]
          }
        ) })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Build Your Resume" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Step ",
            currentStep + 1,
            " of ",
            STEPS.length
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            progress,
            "% Complete"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: progress, className: "h-2" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-6", children: STEPS.map((step, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `flex-1 text-center ${index === currentStep ? "text-primary font-semibold" : index < currentStep ? "text-muted-foreground" : "text-muted-foreground/50"}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs hidden md:block", children: step.label })
        },
        step.id
      )) }),
      currentStep === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ColorThemeSelector,
        {
          selected: selectedTheme,
          onSelect: onThemeChange
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-[400px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold mb-4", children: STEPS[currentStep].label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CurrentFormComponent,
          {
            data: resumeData,
            onChange,
            templateSlug
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-4 pt-6 border-t", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: handlePrevious,
            disabled: currentStep === 0,
            variant: "outline",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "mr-2 h-4 w-4" }),
              "Previous"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleSaveDraft, variant: "outline", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "mr-2 h-4 w-4" }),
          "Save Draft"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: handleNext,
            disabled: currentStep === STEPS.length - 1,
            children: [
              "Next",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "ml-2 h-4 w-4" })
            ]
          }
        )
      ] })
    ] })
  ] });
}
const ResumePreview = React.memo(
  ({
    resumeData,
    templateSlug: _templateSlug,
    colorTheme
  }) => {
    const previewRef = React.useRef(null);
    const handleDownloadPDF = async () => {
      ue.info("Generating PDF... This may take a moment.");
      setTimeout(() => {
        ue.success("PDF downloaded successfully!");
      }, 2e3);
      trackResumeCreated(_templateSlug || "unknown");
    };
    const themeStyles = {
      "--theme-primary": colorTheme.primary,
      "--theme-secondary": colorTheme.secondary,
      "--theme-light": colorTheme.light,
      "--theme-text": colorTheme.text
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex justify-between items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold", children: "Live Preview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleDownloadPDF, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "mr-2 h-4 w-4" }),
          "Download PDF"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-0 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          ref: previewRef,
          className: "bg-white text-black p-8 overflow-y-auto",
          style: {
            ...themeStyles,
            aspectRatio: "210 / 297",
            maxHeight: "800px",
            fontSize: "12px"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "mb-6 text-center border-b-2 pb-4",
                style: { borderColor: colorTheme.primary },
                children: [
                  resumeData.personalInfo.photo && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: resumeData.personalInfo.photo,
                      alt: "Profile",
                      className: "w-24 h-24 rounded-full mx-auto mb-3 object-cover border-2",
                      style: { borderColor: colorTheme.primary }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h1",
                    {
                      className: "text-2xl font-bold mb-2",
                      style: { color: colorTheme.primary },
                      children: resumeData.personalInfo.name || "Your Name"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm space-y-1", children: [
                    resumeData.personalInfo.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: resumeData.personalInfo.email }),
                    resumeData.personalInfo.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: resumeData.personalInfo.phone }),
                    resumeData.personalInfo.address && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: resumeData.personalInfo.address })
                  ] })
                ]
              }
            ),
            resumeData.personalInfo.summary && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  className: "text-lg font-bold mb-2",
                  style: { color: colorTheme.primary },
                  children: "Professional Summary"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: resumeData.personalInfo.summary })
            ] }),
            resumeData.education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  className: "text-lg font-bold mb-2",
                  style: { color: colorTheme.primary },
                  children: "Education"
                }
              ),
              resumeData.education.map((edu) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold", children: [
                    edu.degree,
                    " ",
                    edu.field && `in ${edu.field}`
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", children: [
                    formatDateToMMYYYY(edu.startDate),
                    " -",
                    " ",
                    formatDateToMMYYYY(edu.endDate)
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: edu.institution }),
                edu.grade && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", children: [
                  "Grade: ",
                  edu.grade
                ] })
              ] }, edu.id))
            ] }),
            resumeData.experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  className: "text-lg font-bold mb-2",
                  style: { color: colorTheme.primary },
                  children: "Experience"
                }
              ),
              resumeData.experience.map((exp) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: exp.position }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", children: [
                    formatDateToMMYYYY(exp.startDate),
                    " -",
                    " ",
                    exp.current ? "Present" : formatDateToMMYYYY(exp.endDate)
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: exp.company }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: exp.description })
              ] }, exp.id))
            ] }),
            resumeData.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  className: "text-lg font-bold mb-2",
                  style: { color: colorTheme.primary },
                  children: "Skills"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: resumeData.skills.map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "px-3 py-1 rounded text-sm",
                  style: {
                    backgroundColor: colorTheme.light,
                    color: colorTheme.text
                  },
                  children: [
                    skill.name,
                    " ",
                    skill.level && `(${skill.level})`
                  ]
                },
                skill.id
              )) })
            ] }),
            resumeData.projects.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  className: "text-lg font-bold mb-2",
                  style: { color: colorTheme.primary },
                  children: "Projects"
                }
              ),
              resumeData.projects.map((project) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: project.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: project.description }),
                project.technologies && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-600", children: [
                  "Technologies: ",
                  project.technologies
                ] })
              ] }, project.id))
            ] }),
            resumeData.certifications.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  className: "text-lg font-bold mb-2",
                  style: { color: colorTheme.primary },
                  children: "Certifications"
                }
              ),
              resumeData.certifications.map((cert) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: cert.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", children: [
                  cert.issuer,
                  " - ",
                  formatDateToMMYYYY(cert.date)
                ] })
              ] }, cert.id))
            ] }),
            resumeData.languages.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  className: "text-lg font-bold mb-2",
                  style: { color: colorTheme.primary },
                  children: "Languages"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: resumeData.languages.map((lang) => /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", children: [
                lang.name,
                ": ",
                lang.proficiency
              ] }, lang.id)) })
            ] })
          ]
        }
      ) })
    ] });
  }
);
ResumePreview.displayName = "ResumePreview";
const RESUME_TEMPLATE_CONFIGS = [
  {
    slug: "fresher-resume",
    name: "Fresher Resume",
    category: "Indian",
    description: "Perfect for entry-level job seekers and recent graduates entering the Indian job market",
    seoTitle: "Fresher Resume Builder - Free Template for Entry-Level Jobs | Document Master Tools",
    metaDescription: "Create a professional fresher resume for entry-level positions. Includes education, skills, projects, and internships. Perfect for recent graduates seeking their first job.",
    targetAudience: "Recent graduates, entry-level job seekers, students",
    keyFeatures: [
      "Education-focused layout",
      "Skills and projects section",
      "Internship experience",
      "Photo optional"
    ],
    faqs: [
      {
        question: "What should I include in a fresher resume?",
        answer: "Focus on your education, academic projects, internships, skills, certifications, and any volunteer work. Highlight relevant coursework and achievements."
      },
      {
        question: "How long should a fresher resume be?",
        answer: "Keep it to one page. As a fresher, you should focus on quality over quantity and include only relevant information."
      },
      {
        question: "Should I add a photo to my fresher resume?",
        answer: "In India, adding a professional photo is common and often expected. Use a formal passport-style photo."
      }
    ]
  },
  {
    slug: "government-job-resume",
    name: "Government Job Resume",
    category: "Indian",
    description: "Formal format designed for Indian government job applications and public sector positions",
    seoTitle: "Government Job Resume Builder - Official Format | Document Master Tools",
    metaDescription: "Create a formal government job resume following official guidelines. Includes personal details, education, experience, and references. Ideal for SSC, UPSC, and state government applications.",
    targetAudience: "Government job applicants, public sector candidates",
    keyFeatures: [
      "Formal structured layout",
      "Detailed personal information",
      "References section",
      "Photo mandatory"
    ],
    faqs: [
      {
        question: "What format is required for government job resumes?",
        answer: "Government resumes require a formal, structured format with complete personal details, education with marks, experience in chronological order, and references."
      },
      {
        question: "Is a photo mandatory for government job applications?",
        answer: "Yes, most government job applications in India require a recent passport-size photograph."
      },
      {
        question: "Should I include my caste certificate details?",
        answer: "You can mention your category (General/OBC/SC/ST) if applying under reservation, but detailed certificate information is usually submitted separately."
      }
    ]
  },
  {
    slug: "private-job-resume",
    name: "Private Job Resume",
    category: "Indian",
    description: "Modern format optimized for private sector positions in India",
    seoTitle: "Private Job Resume Builder - Modern Format for Corporate Jobs | Document Master Tools",
    metaDescription: "Build a modern resume for private sector jobs in India. Highlights achievements, skills, and experience. Perfect for IT, finance, marketing, and corporate positions.",
    targetAudience: "Private sector job seekers, corporate professionals",
    keyFeatures: [
      "Achievement-focused",
      "Modern design",
      "Skills highlighted",
      "Photo optional"
    ],
    faqs: [
      {
        question: "How is a private job resume different from a government resume?",
        answer: "Private sector resumes focus more on achievements, skills, and impact rather than just duties. They use a more modern, visually appealing format."
      },
      {
        question: "Should I include salary expectations?",
        answer: "Generally, avoid mentioning salary expectations in your resume. Discuss this during the interview or when specifically asked."
      },
      {
        question: "How important are keywords in private job resumes?",
        answer: "Very important. Many companies use ATS systems. Include relevant keywords from the job description naturally throughout your resume."
      }
    ]
  },
  {
    slug: "hindi-resume",
    name: "Hindi Resume",
    category: "Indian",
    description: "Bilingual resume template with Hindi language support for regional job markets",
    seoTitle: "Hindi Resume Builder - Bilingual Template | Document Master Tools",
    metaDescription: "Create a professional Hindi resume or bilingual Hindi-English resume. Perfect for regional jobs, government positions, and Hindi-speaking markets.",
    targetAudience: "Hindi-speaking job seekers, regional market applicants",
    keyFeatures: [
      "Hindi language support",
      "Bilingual option",
      "Cultural appropriateness",
      "Photo included"
    ],
    faqs: [
      {
        question: "When should I use a Hindi resume?",
        answer: "Use a Hindi resume when applying for positions in Hindi-speaking regions, government jobs requiring Hindi, or when the job posting is in Hindi."
      },
      {
        question: "Can I create a bilingual Hindi-English resume?",
        answer: "Yes, our template supports both pure Hindi and bilingual formats. You can mix Hindi and English based on your needs."
      },
      {
        question: "What font should I use for Hindi text?",
        answer: "Use Unicode Hindi fonts like Mangal, Nirmala UI, or Kokila for best compatibility and readability."
      }
    ]
  },
  {
    slug: "biodata-for-marriage",
    name: "Biodata for Marriage",
    category: "Indian",
    description: "Traditional matrimonial biodata format following Indian cultural conventions",
    seoTitle: "Marriage Biodata Maker - Free Matrimonial Format | Document Master Tools",
    metaDescription: "Create a traditional marriage biodata with personal details, family information, education, and profession. Includes photo, horoscope details, and contact information.",
    targetAudience: "Marriage prospects, families seeking alliances",
    keyFeatures: [
      "Traditional format",
      "Family details",
      "Horoscope information",
      "Centered photo"
    ],
    faqs: [
      {
        question: "What information should be included in a marriage biodata?",
        answer: "Include personal details (name, DOB, height, complexion), family information, education, profession, horoscope details, and contact information."
      },
      {
        question: "Should I include salary details?",
        answer: "It's common to include profession and general income range, but specific salary details are optional and can be discussed later."
      },
      {
        question: "Is horoscope information mandatory?",
        answer: "Horoscope details are important in many Indian communities but not mandatory. Include them if relevant to your family traditions."
      }
    ]
  },
  {
    slug: "teacher-resume",
    name: "Teacher Resume",
    category: "Indian",
    description: "Specialized format for education professionals and teaching positions",
    seoTitle: "Teacher Resume Builder - Education Professional Format | Document Master Tools",
    metaDescription: "Create a professional teacher resume highlighting teaching experience, certifications, subjects taught, and educational philosophy. Perfect for school and college teaching positions.",
    targetAudience: "Teachers, education professionals, academic staff",
    keyFeatures: [
      "Teaching philosophy section",
      "Subjects taught",
      "Certifications highlighted",
      "Photo included"
    ],
    faqs: [
      {
        question: "What should I highlight in a teacher resume?",
        answer: "Emphasize your teaching certifications, subjects taught, teaching methodology, student achievements, and any innovative teaching practices you've implemented."
      },
      {
        question: "Should I include my teaching philosophy?",
        answer: "Yes, a brief teaching philosophy or summary helps schools understand your approach to education and classroom management."
      },
      {
        question: "How important are certifications for teaching positions?",
        answer: "Very important. Include all relevant teaching certifications, B.Ed, M.Ed, subject-specific certifications, and any professional development courses."
      }
    ]
  },
  {
    slug: "police-army-resume",
    name: "Police / Army Resume",
    category: "Indian",
    description: "Structured format for defense services and paramilitary force applications",
    seoTitle: "Police Army Resume Builder - Defense Services Format | Document Master Tools",
    metaDescription: "Create a formal resume for police, army, and defense services. Includes physical attributes, training, experience, and references. Perfect for CAPF, Army, Navy, Air Force applications.",
    targetAudience: "Defense service aspirants, police candidates, paramilitary applicants",
    keyFeatures: [
      "Physical attributes section",
      "Training details",
      "Formal structure",
      "Photo mandatory"
    ],
    faqs: [
      {
        question: "What physical details should I include?",
        answer: "Include height, weight, chest measurement, and any distinguishing marks. Ensure these meet the requirements of the specific force you're applying to."
      },
      {
        question: "Should I mention my NCC or sports background?",
        answer: "Absolutely. NCC certificates, sports achievements, and physical fitness activities are highly valued in defense service applications."
      },
      {
        question: "How should I list my training and certifications?",
        answer: "List all relevant training chronologically, including duration, institution, and any specializations. Include first aid, weapons training, or other relevant certifications."
      }
    ]
  },
  {
    slug: "ats-friendly-resume",
    name: "ATS Friendly Resume",
    category: "International",
    description: "Optimized format for applicant tracking systems used by global companies",
    seoTitle: "ATS Friendly Resume Builder - Beat Applicant Tracking Systems | Document Master Tools",
    metaDescription: "Create an ATS-optimized resume that passes applicant tracking systems. Simple format, keyword-rich, no graphics. Perfect for online job applications and corporate positions.",
    targetAudience: "Job seekers applying through online portals, corporate applicants",
    keyFeatures: [
      "ATS-optimized format",
      "No graphics or tables",
      "Keyword-rich",
      "No photo"
    ],
    faqs: [
      {
        question: "What is an ATS-friendly resume?",
        answer: "An ATS-friendly resume is formatted to be easily read by Applicant Tracking Systems. It uses simple formatting, standard fonts, and avoids graphics, tables, and complex layouts."
      },
      {
        question: "Should I include a photo in an ATS resume?",
        answer: "No. Photos can confuse ATS systems and are generally not recommended for international applications, especially in the US and UK."
      },
      {
        question: "How do I make my resume ATS-friendly?",
        answer: "Use standard section headings, simple bullet points, common fonts, and include relevant keywords from the job description. Avoid headers, footers, tables, and graphics."
      }
    ]
  },
  {
    slug: "us-resume",
    name: "US Resume",
    category: "International",
    description: "American format emphasizing quantified achievements and impact",
    seoTitle: "US Resume Builder - American Format with Achievements | Document Master Tools",
    metaDescription: "Create a professional US resume following American standards. Focuses on quantified achievements, action verbs, and impact. No photo, one-page format for most positions.",
    targetAudience: "US job seekers, international applicants to US companies",
    keyFeatures: [
      "Achievement-focused",
      "Quantified results",
      "Action verbs",
      "No photo"
    ],
    faqs: [
      {
        question: "How long should a US resume be?",
        answer: "Generally one page for early to mid-career professionals. Senior executives may use two pages. Focus on recent and relevant experience."
      },
      {
        question: "Should I include a photo on my US resume?",
        answer: "No. Including a photo on a US resume is not standard practice and may even be discouraged due to anti-discrimination laws."
      },
      {
        question: "What's the difference between a US resume and CV?",
        answer: "In the US, a resume is a brief summary (1-2 pages) for most jobs, while a CV is a comprehensive document used mainly in academia and research."
      }
    ]
  },
  {
    slug: "uk-cv-format",
    name: "UK CV Format",
    category: "International",
    description: "British curriculum vitae format with detailed work history",
    seoTitle: "UK CV Builder - British Format Curriculum Vitae | Document Master Tools",
    metaDescription: "Create a professional UK CV following British standards. Includes detailed work history, personal profile, and interests. Optional photo, typically 2 pages.",
    targetAudience: "UK job seekers, international applicants to UK companies",
    keyFeatures: [
      "Detailed work history",
      "Personal profile",
      "Interests section",
      "Optional small photo"
    ],
    faqs: [
      {
        question: "How long should a UK CV be?",
        answer: "Typically 2 pages for most professionals. Unlike US resumes, UK CVs can be more detailed and comprehensive."
      },
      {
        question: "Should I include a photo on my UK CV?",
        answer: "It's optional. A small professional photo is acceptable but not required. Many UK employers don't expect photos."
      },
      {
        question: "What should I include in the personal profile?",
        answer: "Write a brief 3-4 sentence summary highlighting your key skills, experience, and career objectives. Make it specific to the role you're applying for."
      }
    ]
  },
  {
    slug: "canada-resume",
    name: "Canada Resume",
    category: "International",
    description: "Canadian format highlighting core competencies and volunteer work",
    seoTitle: "Canada Resume Builder - Canadian Professional Format | Document Master Tools",
    metaDescription: "Create a Canadian resume with professional summary, core competencies, and volunteer experience. No photo, clean format, typically 1-2 pages.",
    targetAudience: "Canadian job seekers, international applicants to Canada",
    keyFeatures: [
      "Core competencies section",
      "Volunteer work",
      "Professional summary",
      "No photo"
    ],
    faqs: [
      {
        question: "What makes a Canadian resume different?",
        answer: "Canadian resumes often include a core competencies section, emphasize volunteer work, and follow a clean, professional format without photos."
      },
      {
        question: "Should I include references on my Canadian resume?",
        answer: 'No, simply state "References available upon request" at the end. Provide references when specifically asked.'
      },
      {
        question: "Is volunteer experience important in Canada?",
        answer: "Yes, Canadian employers value community involvement. Include relevant volunteer work, especially if it demonstrates transferable skills."
      }
    ]
  },
  {
    slug: "europass-cv",
    name: "Europass CV",
    category: "International",
    description: "European Union standard CV format for cross-border applications",
    seoTitle: "Europass CV Builder - EU Standard Format | Document Master Tools",
    metaDescription: "Create a Europass CV following EU standards. Includes language skills with CEFR levels, digital competencies, and standardized sections. Recognized across Europe.",
    targetAudience: "EU job seekers, international applicants to European companies",
    keyFeatures: [
      "EU standard format",
      "CEFR language levels",
      "Digital skills section",
      "Optional photo"
    ],
    faqs: [
      {
        question: "What is a Europass CV?",
        answer: "Europass CV is a standardized CV format recognized across the European Union. It uses specific section headings and formats to make qualifications easily comparable."
      },
      {
        question: "How do I indicate language proficiency?",
        answer: "Use the Common European Framework of Reference (CEFR) levels: A1-A2 (Basic), B1-B2 (Independent), C1-C2 (Proficient)."
      },
      {
        question: "Is Europass CV mandatory in Europe?",
        answer: "Not mandatory, but highly recommended for EU institutions and cross-border applications. Many European employers are familiar with this format."
      }
    ]
  },
  {
    slug: "creative-resume",
    name: "Creative Resume",
    category: "International",
    description: "Bold, visually striking format for creative industries and design roles",
    seoTitle: "Creative Resume Builder - Designer Portfolio Format | Document Master Tools",
    metaDescription: "Create a creative resume with bold design, visual elements, and portfolio links. Perfect for designers, artists, marketers, and creative professionals.",
    targetAudience: "Designers, artists, creative professionals, marketers",
    keyFeatures: [
      "Bold visual design",
      "Portfolio links",
      "Skills visualization",
      "Optional photo"
    ],
    faqs: [
      {
        question: "When should I use a creative resume?",
        answer: "Use creative resumes for design, advertising, marketing, arts, and other creative industries where visual presentation demonstrates your skills."
      },
      {
        question: "Can I use colors and graphics?",
        answer: "Yes! Creative resumes encourage visual elements, but ensure they enhance rather than distract from your content. Keep it professional."
      },
      {
        question: "Should I include my portfolio?",
        answer: "Absolutely. Include links to your online portfolio, Behance, Dribbble, or personal website. Visual work samples are crucial for creative roles."
      }
    ]
  },
  {
    slug: "corporate-resume",
    name: "Corporate Resume",
    category: "International",
    description: "Executive format for senior management and corporate leadership positions",
    seoTitle: "Corporate Resume Builder - Executive Leadership Format | Document Master Tools",
    metaDescription: "Create an executive corporate resume for senior positions. Includes executive summary, leadership achievements, board memberships, and strategic impact. Sophisticated design.",
    targetAudience: "Executives, senior managers, corporate leaders",
    keyFeatures: [
      "Executive summary",
      "Leadership focus",
      "Strategic achievements",
      "No photo"
    ],
    faqs: [
      {
        question: "How is an executive resume different?",
        answer: "Executive resumes focus on strategic leadership, business impact, and high-level achievements. They emphasize results, revenue growth, and organizational transformation."
      },
      {
        question: "Should I include all my work history?",
        answer: "Focus on the last 15-20 years and senior-level positions. Earlier roles can be summarized briefly or omitted if not relevant."
      },
      {
        question: "What should I include in the executive summary?",
        answer: "Highlight your leadership brand, key achievements, areas of expertise, and the unique value you bring to organizations. Keep it concise and impactful."
      }
    ]
  }
];
function getTemplateBySlug(slug) {
  return RESUME_TEMPLATE_CONFIGS.find((config) => config.slug === slug);
}
const initialResumeData = {
  personalInfo: {
    name: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    portfolio: "",
    photo: "",
    summary: ""
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  achievements: [],
  references: []
};
function ResumeTemplateBuilderPage({
  templateSlug,
  onBack
}) {
  const [resumeData, setResumeData] = reactExports.useState(initialResumeData);
  const [selectedTheme, setSelectedTheme] = reactExports.useState(COLOR_THEMES[0]);
  const templateConfig = getTemplateBySlug(templateSlug);
  reactExports.useEffect(() => {
    const draftKey = `resume_draft_${templateSlug}`;
    const savedDraft = localStorage.getItem(draftKey);
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        setResumeData(parsed.data);
        const savedTheme = COLOR_THEMES.find((t) => t.name === parsed.theme);
        if (savedTheme) setSelectedTheme(savedTheme);
      } catch (e) {
        console.error("Failed to load draft:", e);
      }
    }
  }, [templateSlug]);
  if (!templateConfig) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 py-8 md:py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", onClick: onBack, className: "mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
        "Back to Resume Builder"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Template not found" })
    ] }) });
  }
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Resume Builder", href: "/resume-builder" },
    { label: templateConfig.name }
  ];
  const relatedTools = [
    {
      name: "Calculator Hub",
      description: "21 calculators for academic and financial needs",
      icon: Calculator,
      onClick: () => window.scrollTo(0, 0)
    },
    {
      name: "PDF Tools",
      description: "16 tools for PDF manipulation",
      icon: FileText,
      onClick: () => window.scrollTo(0, 0)
    },
    {
      name: "Image Tools",
      description: "16 tools for image processing",
      icon: Image,
      onClick: () => window.scrollTo(0, 0)
    }
  ];
  const handleResumeDataChange = (data) => {
    setResumeData(data);
    const draftKey = `resume_draft_${templateSlug}`;
    localStorage.setItem(
      draftKey,
      JSON.stringify({
        data,
        theme: selectedTheme.name,
        timestamp: Date.now()
      })
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SEO,
      {
        title: templateConfig.seoTitle,
        description: templateConfig.metaDescription,
        canonicalUrl: `${window.location.origin}/resume-builder/${templateSlug}`,
        ogImage: "/assets/generated/resume-builder-icon-transparent.dim_64x64.png"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FAQSchema, { faqs: templateConfig.faqs }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 py-8 md:py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-7xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", onClick: onBack, className: "mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
        "Back to Resume Builder"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbNavigation, { items: breadcrumbs }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold mb-3", children: templateConfig.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground", children: templateConfig.description })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AdPlaceholder, { adType: "banner" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "order-2 lg:order-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          ResumeFormWizard,
          {
            resumeData,
            onChange: handleResumeDataChange,
            templateSlug,
            selectedTheme,
            onThemeChange: setSelectedTheme
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "order-1 lg:order-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          ResumePreview,
          {
            resumeData,
            templateSlug,
            colorTheme: selectedTheme
          }
        ) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-6", children: "Frequently Asked Questions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: templateConfig.faqs.map((faq) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border rounded-lg p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-lg mb-2", children: faq.question }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: faq.answer })
        ] }, faq.question)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(RelatedTools, { tools: relatedTools })
    ] }) })
  ] });
}
export {
  ResumeTemplateBuilderPage as default
};
