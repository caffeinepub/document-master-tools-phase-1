import { j as jsxRuntimeExports } from "./index-5lKdoCW0.js";
import { A as ArrowLeft } from "./arrow-left-CfDrezEV.js";
import { S as Shield, F as FileImage, C as Camera, a as Scissors, L as Layers } from "./shield-Cu7lNzWS.js";
import { M as Maximize2, U as UserCheck, B as Briefcase, S as ScanLine } from "./user-check-r95os50e.js";
import { W as WandSparkles } from "./wand-sparkles-DMUUKLs2.js";
import { G as GraduationCap } from "./graduation-cap-Bg0v-GII.js";
import { M as Minimize2 } from "./minimize-2-DvBRVGZz.js";
import { C as ChevronRight } from "./chevron-right-Ci-Y7VDX.js";
function ImageToolsPage({ onNavigate }) {
  const governmentPhotoTools = [
    {
      id: "image-passport-photo",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-6 h-6" }),
      title: "Passport Photo Maker",
      description: "Create standard passport photos for India, US, UK, Schengen & more",
      badge: null
    },
    {
      id: "image-aadhaar-photo",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-6 h-6" }),
      title: "Aadhaar Photo Resize",
      description: "Resize photos to exact Aadhaar card specifications (200×200, 480×640)",
      badge: null
    },
    {
      id: "image-pan-photo",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-6 h-6" }),
      title: "PAN Card Photo Resize",
      description: "Resize photos for NSDL and UTIITSL PAN card applications",
      badge: null
    },
    {
      id: "image-ssc-photo",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "w-6 h-6" }),
      title: "SSC Photo Resize",
      description: "Resize photos for SSC CGL, CHSL, MTS, and GD exam forms",
      badge: null
    },
    {
      id: "image-railway-photo",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-6 h-6" }),
      title: "Railway Photo Resize",
      description: "Resize photos for RRB NTPC, Group D, and ALP recruitment",
      badge: null
    },
    {
      id: "image-police-army-photo",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-6 h-6" }),
      title: "Police/Army Photo",
      description: "Resize photos for Police, Army, and CAPF recruitment forms",
      badge: null
    },
    {
      id: "image-visa-photo",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-6 h-6" }),
      title: "Visa Photo Resize",
      description: "Resize photos for US, UK, Schengen, Canada & Australia visas",
      badge: null
    },
    {
      id: "image-signature-resize",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-6 h-6" }),
      title: "Signature Resize",
      description: "Resize signature images for Aadhaar, PAN, and exam forms",
      badge: null
    }
  ];
  const imageProcessingTools = [
    {
      id: "image-compressor",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Minimize2, { className: "w-6 h-6" }),
      title: "Image Compressor",
      description: "Compress images without visible quality loss",
      badge: null
    },
    {
      id: "image-cropper",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "w-6 h-6" }),
      title: "Image Cropper",
      description: "Crop images to any size with aspect ratio presets",
      badge: null
    },
    {
      id: "image-dpi-changer",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize2, { className: "w-6 h-6" }),
      title: "DPI Changer",
      description: "Change image DPI/resolution for print and digital use",
      badge: null
    },
    {
      id: "image-custom-resize",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize2, { className: "w-6 h-6" }),
      title: "Custom Image Resize",
      description: "Resize images to any custom dimensions or file size",
      badge: null
    }
  ];
  const formatConversionTools = [
    {
      id: "image-jpg-to-png",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileImage, { className: "w-6 h-6" }),
      title: "JPG to PNG",
      description: "Convert JPG images to PNG format",
      badge: null
    },
    {
      id: "image-png-to-jpg",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileImage, { className: "w-6 h-6" }),
      title: "PNG to JPG",
      description: "Convert PNG images to JPG format",
      badge: null
    },
    {
      id: "image-webp-converter",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileImage, { className: "w-6 h-6" }),
      title: "WebP Converter",
      description: "Convert images to/from WebP format",
      badge: null
    },
    {
      id: "image-background-remover",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-6 h-6" }),
      title: "Background Remover",
      description: "Remove image backgrounds with multiple fill options",
      badge: null
    }
  ];
  const documentEnhancementTools = [
    {
      id: "smart-document-fixer",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ScanLine, { className: "w-6 h-6" }),
      title: "Smart Document Fixer",
      description: "Fix scanned document quality with brightness/contrast controls",
      badge: "PRO"
    },
    {
      id: "ai-document-enhancer",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(WandSparkles, { className: "w-6 h-6" }),
      title: "AI Document Enhancer",
      description: "AI-powered document enhancement for professional results",
      badge: "PRO"
    }
  ];
  const renderToolCard = (tool, colorClass) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-gray-900 hover:bg-gray-800 rounded-xl p-4 sm:p-6 cursor-pointer transition-colors duration-200 ease-in-out border border-gray-700 hover:border-gray-500 group flex flex-col",
      onClick: () => onNavigate(tool.id),
      onKeyDown: (e) => {
        if (e.key === "Enter" || e.key === " ") onNavigate(tool.id);
      },
      role: "button",
      tabIndex: 0,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `${colorClass} mb-3 group-hover:scale-110 transition-transform duration-200 shrink-0`,
            children: tool.icon
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-semibold text-sm leading-tight", children: tool.title }),
          tool.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded-full shrink-0", children: tool.badge })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 text-xs flex-1", children: tool.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "mt-4 w-full min-h-[48px] px-6 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-md flex items-center justify-center gap-1",
            onClick: (e) => {
              e.stopPropagation();
              onNavigate(tool.id);
            },
            children: [
              "Use Tool ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
            ]
          }
        )
      ]
    },
    tool.id
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-screen py-8 px-4",
      style: { background: "linear-gradient(135deg, #0f172a, #1e293b)" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => onNavigate("home"),
            className: "flex items-center gap-2 text-slate-300 hover:text-white mb-8 transition-colors duration-200 group",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" }),
              "Back to Home"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold text-white mb-4", children: "Image Tools" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 max-w-2xl mx-auto text-lg", children: "Free online image tools — resize, compress, convert, and enhance images. All processing happens in your browser." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-6 h-6 text-blue-400" }),
            "Government & ID Photo Tools"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6", children: governmentPhotoTools.map(
            (tool) => renderToolCard(tool, "text-blue-400")
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize2, { className: "w-6 h-6 text-green-400" }),
            "Image Processing Tools"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6", children: imageProcessingTools.map(
            (tool) => renderToolCard(tool, "text-green-400")
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileImage, { className: "w-6 h-6 text-orange-400" }),
            "Format Conversion Tools"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6", children: formatConversionTools.map(
            (tool) => renderToolCard(tool, "text-orange-400")
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(WandSparkles, { className: "w-6 h-6 text-yellow-400" }),
            "Document Enhancement Tools"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6", children: documentEnhancementTools.map(
            (tool) => renderToolCard(tool, "text-yellow-400")
          ) })
        ] })
      ] })
    }
  );
}
export {
  ImageToolsPage as default
};
