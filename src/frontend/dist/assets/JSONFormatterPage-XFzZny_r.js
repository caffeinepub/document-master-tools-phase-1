import { r as reactExports, j as jsxRuntimeExports, v as trackEvent } from "./index-BFVPq1mW.js";
import { S as SEO } from "./SEO-B1UZw1Ql.js";
function formatJSON(input) {
  if (!input.trim())
    return { output: "", status: { type: "idle", message: "" } };
  try {
    const parsed = JSON.parse(input);
    return {
      output: JSON.stringify(parsed, null, 2),
      status: { type: "valid", message: "Valid JSON" }
    };
  } catch (err) {
    return {
      output: "",
      status: {
        type: "invalid",
        message: `Invalid JSON: ${err.message}`
      }
    };
  }
}
function minifyJSON(input) {
  if (!input.trim())
    return { output: "", status: { type: "idle", message: "" } };
  try {
    const parsed = JSON.parse(input);
    return {
      output: JSON.stringify(parsed),
      status: { type: "valid", message: "Valid JSON" }
    };
  } catch (err) {
    return {
      output: "",
      status: {
        type: "invalid",
        message: `Invalid JSON: ${err.message}`
      }
    };
  }
}
function validateJSON(input) {
  if (!input.trim()) return { type: "idle", message: "" };
  try {
    JSON.parse(input);
    return { type: "valid", message: "✓ Valid JSON" };
  } catch (err) {
    return {
      type: "invalid",
      message: `✗ Invalid JSON: ${err.message}`
    };
  }
}
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is JSON and why do I need to format it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "JSON (JavaScript Object Notation) is a lightweight data interchange format. APIs return minified JSON to save bandwidth, but minified JSON is nearly impossible to read. Formatting (prettifying) adds indentation and line breaks to make the structure visible and easy to navigate."
      }
    },
    {
      "@type": "Question",
      name: "What is the difference between formatting and minifying JSON?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Formatting (prettifying) adds spaces and newlines to make JSON human-readable. Minifying does the opposite — it removes all whitespace to produce the most compact representation for transmission or storage."
      }
    },
    {
      "@type": "Question",
      name: "Can I validate JSON with this tool?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Click the Validate button and the tool will tell you whether your JSON is syntactically valid. If it is invalid, an error message will explain exactly what is wrong and roughly where the problem is located."
      }
    },
    {
      "@type": "Question",
      name: "Does the tool handle large JSON files?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, for most practical use cases. The tool runs in your browser without server round-trips, so performance depends on your device. JSON files up to a few megabytes will process instantly."
      }
    },
    {
      "@type": "Question",
      name: "Is my JSON data kept private?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Completely. All processing happens in your browser. Your JSON is never sent to any server. Close the browser tab and the data is gone. This is especially important for JSON containing API keys, credentials, or personal data."
      }
    },
    {
      "@type": "Question",
      name: "What is the indentation used when formatting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The formatter uses 2-space indentation, which is the most common standard for JSON in JavaScript projects, Node.js, and most APIs. This matches the JSON.stringify(data, null, 2) output."
      }
    }
  ]
};
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://docmastertools.com/"
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Utility Tools",
      item: "https://docmastertools.com/json-formatter-online"
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "JSON Formatter Online",
      item: "https://docmastertools.com/json-formatter-online"
    }
  ]
};
const ACCENT = "#2563eb";
const ACCENT_LIGHT = "#38bdf8";
const cardStyle = {
  background: "#111827",
  borderRadius: "1rem",
  padding: "1.75rem",
  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
  marginBottom: "1.5rem",
  border: "1px solid #1e293b"
};
const h2Style = {
  color: "#ffffff",
  fontSize: "1.4rem",
  fontWeight: 700,
  marginBottom: "1rem",
  marginTop: 0
};
const h3Style = {
  color: "#e2e8f0",
  fontSize: "1.05rem",
  fontWeight: 600,
  marginBottom: "0.4rem",
  marginTop: 0
};
const bodyText = {
  color: "#94a3b8",
  fontSize: "0.95rem",
  lineHeight: 1.7,
  margin: 0
};
const monoTextarea = {
  width: "100%",
  background: "#0f172a",
  color: "#e2e8f0",
  border: "1px solid #334155",
  borderRadius: "0.625rem",
  padding: "1rem",
  fontSize: "0.875rem",
  lineHeight: 1.6,
  resize: "vertical",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "monospace"
};
function JSONFormatterPage({ onNavigate, onBack }) {
  const [input, setInput] = reactExports.useState("");
  const [output, setOutput] = reactExports.useState("");
  const [status, setStatus] = reactExports.useState({ type: "idle", message: "" });
  const [outputCopied, setOutputCopied] = reactExports.useState(false);
  const handleFormat = () => {
    const result = formatJSON(input);
    setOutput(result.output);
    setStatus(result.status);
    trackEvent("tool_used", {
      tool_name: "json_formatter",
      tool_category: "utility_tools"
    });
  };
  const handleMinify = () => {
    const result = minifyJSON(input);
    setOutput(result.output);
    setStatus(result.status);
    trackEvent("tool_used", {
      tool_name: "json_formatter",
      tool_category: "utility_tools"
    });
  };
  const handleValidate = () => {
    const s = validateJSON(input);
    setStatus(s);
    trackEvent("tool_used", {
      tool_name: "json_formatter",
      tool_category: "utility_tools"
    });
  };
  const handleClear = () => {
    setInput("");
    setOutput("");
    setStatus({ type: "idle", message: "" });
    setOutputCopied(false);
  };
  const handleCopyOutput = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setOutputCopied(true);
    setTimeout(() => setOutputCopied(false), 2e3);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        padding: "2rem 1rem"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SEO,
          {
            title: "JSON Formatter Online – Free JSON Beautifier & Validator | DocMasterTools",
            description: "Format, prettify, minify, and validate JSON instantly. Free online JSON formatter with error detection. Browser-based, no signup, completely private.",
            canonicalUrl: "https://docmastertools.com/json-formatter-online"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "script",
          {
            type: "application/ld+json",
            dangerouslySetInnerHTML: { __html: JSON.stringify(faqSchema) }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "script",
          {
            type: "application/ld+json",
            dangerouslySetInnerHTML: { __html: JSON.stringify(breadcrumbSchema) }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { maxWidth: "1000px", margin: "0 auto" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "jsonformat.secondary_button",
              onClick: onBack,
              style: {
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "#1e293b",
                color: "#94a3b8",
                border: "1px solid #334155",
                borderRadius: "0.5rem",
                padding: "0.5rem 1rem",
                fontSize: "0.875rem",
                cursor: "pointer",
                marginBottom: "1.5rem",
                transition: "color 0.15s, border-color 0.15s"
              },
              onMouseEnter: (e) => {
                e.currentTarget.style.color = "#38bdf8";
                e.currentTarget.style.borderColor = "#38bdf8";
              },
              onMouseLeave: (e) => {
                e.currentTarget.style.color = "#94a3b8";
                e.currentTarget.style.borderColor = "#334155";
              },
              children: "← Back to Home"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "nav",
            {
              style: {
                marginBottom: "1rem",
                fontSize: "0.8125rem",
                color: "#64748b"
              },
              "aria-label": "breadcrumb",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => onNavigate("home"),
                    style: {
                      background: "none",
                      border: "none",
                      color: "#64748b",
                      cursor: "pointer",
                      padding: 0
                    },
                    children: "Home"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { margin: "0 0.4rem" }, children: "›" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#94a3b8" }, children: "Utility Tools" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { margin: "0 0.4rem" }, children: "›" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: ACCENT_LIGHT }, children: "JSON Formatter Online" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h1",
            {
              style: {
                color: "#ffffff",
                fontSize: "clamp(1.6rem, 4vw, 2.25rem)",
                fontWeight: 800,
                marginBottom: "0.75rem",
                letterSpacing: "-0.02em"
              },
              children: "JSON Formatter Online – Free JSON Beautifier & Validator"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              style: {
                ...bodyText,
                fontSize: "1rem",
                marginBottom: "2rem",
                maxWidth: "700px"
              },
              children: "Paste your JSON to instantly format it into a readable structure, minify it for production, or validate its syntax. All processing is done in your browser — your data never leaves your device."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                style: { ...h2Style, color: ACCENT_LIGHT, marginBottom: "1.25rem" },
                children: "🔧 JSON Formatter & Validator"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "1rem",
                  marginBottom: "1rem"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "json-input",
                        style: {
                          color: "#94a3b8",
                          fontSize: "0.8125rem",
                          display: "block",
                          marginBottom: "0.5rem"
                        },
                        children: "Input JSON"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "textarea",
                      {
                        id: "json-input",
                        "data-ocid": "jsonformat.input",
                        value: input,
                        onChange: (e) => setInput(e.target.value),
                        placeholder: 'Paste your JSON here…\n{\n  "name": "example",\n  "value": 42\n}',
                        rows: 14,
                        style: monoTextarea
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "json-output",
                        style: {
                          color: "#94a3b8",
                          fontSize: "0.8125rem",
                          display: "block",
                          marginBottom: "0.5rem"
                        },
                        children: "Output"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "textarea",
                      {
                        id: "json-output",
                        "data-ocid": "jsonformat.editor",
                        value: output,
                        readOnly: true,
                        placeholder: "Formatted / minified JSON appears here…",
                        rows: 14,
                        style: {
                          ...monoTextarea,
                          color: status.type === "invalid" ? "#f87171" : "#e2e8f0",
                          cursor: "default"
                        }
                      }
                    )
                  ] })
                ]
              }
            ),
            status.message && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                "data-ocid": status.type === "valid" ? "jsonformat.success_state" : "jsonformat.error_state",
                style: {
                  padding: "0.625rem 1rem",
                  borderRadius: "0.5rem",
                  marginBottom: "1rem",
                  background: status.type === "valid" ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
                  border: `1px solid ${status.type === "valid" ? "#16a34a" : "#ef4444"}`,
                  color: status.type === "valid" ? "#4ade80" : "#f87171",
                  fontSize: "0.875rem",
                  fontFamily: "monospace"
                },
                children: status.message
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "0.75rem", flexWrap: "wrap" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "jsonformat.primary_button",
                  onClick: handleFormat,
                  style: {
                    background: ACCENT,
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "0.5rem",
                    padding: "0.625rem 1.25rem",
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "background 0.15s"
                  },
                  onMouseEnter: (e) => {
                    e.currentTarget.style.background = "#1d4ed8";
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.background = ACCENT;
                  },
                  children: "Format / Prettify"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "jsonformat.secondary_button",
                  onClick: handleMinify,
                  style: {
                    background: "#1e293b",
                    color: "#e2e8f0",
                    border: "1px solid #334155",
                    borderRadius: "0.5rem",
                    padding: "0.625rem 1.25rem",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.15s"
                  },
                  onMouseEnter: (e) => {
                    e.currentTarget.style.borderColor = ACCENT_LIGHT;
                    e.currentTarget.style.color = ACCENT_LIGHT;
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.borderColor = "#334155";
                    e.currentTarget.style.color = "#e2e8f0";
                  },
                  children: "Minify"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "jsonformat.secondary_button",
                  onClick: handleValidate,
                  style: {
                    background: "#1e293b",
                    color: "#e2e8f0",
                    border: "1px solid #334155",
                    borderRadius: "0.5rem",
                    padding: "0.625rem 1.25rem",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.15s"
                  },
                  onMouseEnter: (e) => {
                    e.currentTarget.style.borderColor = "#a78bfa";
                    e.currentTarget.style.color = "#a78bfa";
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.borderColor = "#334155";
                    e.currentTarget.style.color = "#e2e8f0";
                  },
                  children: "Validate"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "jsonformat.delete_button",
                  onClick: handleClear,
                  style: {
                    background: "#1e293b",
                    color: "#94a3b8",
                    border: "1px solid #334155",
                    borderRadius: "0.5rem",
                    padding: "0.625rem 1.25rem",
                    fontSize: "0.875rem",
                    cursor: "pointer",
                    transition: "all 0.15s"
                  },
                  onMouseEnter: (e) => {
                    e.currentTarget.style.borderColor = "#ef4444";
                    e.currentTarget.style.color = "#f87171";
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.borderColor = "#334155";
                    e.currentTarget.style.color = "#94a3b8";
                  },
                  children: "Clear"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "jsonformat.secondary_button",
                  onClick: handleCopyOutput,
                  disabled: !output,
                  style: {
                    background: outputCopied ? "#16a34a" : "#1e293b",
                    color: outputCopied ? "#ffffff" : "#94a3b8",
                    border: `1px solid ${outputCopied ? "#16a34a" : "#334155"}`,
                    borderRadius: "0.5rem",
                    padding: "0.625rem 1.25rem",
                    fontSize: "0.875rem",
                    cursor: output ? "pointer" : "not-allowed",
                    transition: "all 0.15s",
                    opacity: output ? 1 : 0.5
                  },
                  children: outputCopied ? "✓ Copied!" : "Copy Output"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: h2Style, children: "What Is JSON and Why Format It?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: bodyText, children: [
              "JSON (JavaScript Object Notation) is the universal language of web APIs. When an application fetches data from a REST API, the response almost always arrives as JSON. However, the JSON returned by most APIs is minified — all the whitespace has been stripped out to reduce file size. Minified JSON looks like this:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "code",
                {
                  style: {
                    background: "#0f172a",
                    padding: "0.1rem 0.3rem",
                    borderRadius: "0.25rem",
                    fontSize: "0.8125rem",
                    color: "#a78bfa"
                  },
                  children: "{'name':'Alice','age':30,'active':true}"
                }
              ),
              ", which is nearly impossible to read or debug."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { ...bodyText, marginTop: "0.75rem" }, children: "Formatting (or prettifying) JSON adds proper indentation and line breaks to reveal the data structure. A formatted version of the same data is immediately scannable: you can see object keys, nested arrays, value types, and data hierarchy at a glance. This is essential when debugging API responses, reviewing configuration files, analyzing webhook payloads, or working with any data stored in JSON format." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { ...bodyText, marginTop: "0.75rem" }, children: "JSON validation is equally important. A single missing comma, an unmatched bracket, or an extra trailing comma will make the entire JSON document invalid. Our validator parses the JSON using the browser's native engine and returns the exact error description, helping you fix syntax issues in seconds rather than hunting through thousands of characters manually." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { ...bodyText, marginTop: "0.75rem" }, children: "Common JSON use cases include: REST API response analysis, configuration files (package.json, .eslintrc.json), data exports from databases, webhook payload debugging, Postman/Insomnia response inspection, and migration data review. Our tool handles all of these use cases with zero setup." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: h2Style, children: "How to Format JSON Online" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: { display: "flex", flexDirection: "column", gap: "1rem" },
                children: [
                  {
                    step: 1,
                    title: "Paste Your JSON",
                    body: "Click inside the left text area and paste your JSON using Ctrl+V (Windows) or Cmd+V (Mac). The input accepts any valid or invalid JSON — the tool will tell you if there are errors."
                  },
                  {
                    step: 2,
                    title: "Click Format / Prettify",
                    body: "Click the 'Format / Prettify' button. If your JSON is valid, the output area on the right will show the formatted version with 2-space indentation and clear line breaks."
                  },
                  {
                    step: 3,
                    title: "Use Minify for Compact Output",
                    body: "If you want to remove whitespace for production use, click 'Minify'. The output will be the smallest possible representation of the same JSON data."
                  },
                  {
                    step: 4,
                    title: "Validate for Syntax Errors",
                    body: "Click 'Validate' to check if your JSON is syntactically correct without formatting it. The status bar will show 'Valid JSON' or an error message explaining the issue."
                  },
                  {
                    step: 5,
                    title: "Copy the Output",
                    body: "Click 'Copy Output' to copy the formatted or minified JSON to your clipboard. Paste it directly into your editor, terminal, API client, or configuration file."
                  }
                ].map(({ step, title, body }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      gap: "1rem",
                      alignItems: "flex-start"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            width: "2rem",
                            height: "2rem",
                            borderRadius: "50%",
                            background: ACCENT,
                            color: "#ffffff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.875rem",
                            fontWeight: 700,
                            flexShrink: 0
                          },
                          children: step
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: h3Style, children: title }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: bodyText, children: body })
                      ] })
                    ]
                  },
                  step
                ))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: h2Style, children: "Tips for Working with JSON" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "ul",
              {
                style: {
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.875rem"
                },
                children: [
                  {
                    tip: "Watch out for trailing commas",
                    body: "Standard JSON does not allow trailing commas after the last property or element. This is a very common mistake when editing JSON by hand. Our validator will flag this immediately."
                  },
                  {
                    tip: "Keys must be quoted strings",
                    body: `Unlike JavaScript objects, JSON requires all keys to be enclosed in double quotes. {name: 'Alice'} is invalid JSON; {"name": "Alice"} is correct.`
                  },
                  {
                    tip: "Use format before committing to version control",
                    body: "Formatted, consistently indented JSON is much easier to diff in Git. Format your JSON files before committing to keep diffs clean and readable."
                  },
                  {
                    tip: "JSON does not support comments",
                    body: "You cannot add // or /* */ comments to JSON. If you need comments in configuration files, consider JSON5 or JSONC formats. Standard JSON parsers will reject any commented JSON."
                  },
                  {
                    tip: "Use null, not undefined",
                    body: "JSON supports null as a value but does not support undefined (a JavaScript concept). If your API is returning undefined, it will be stripped from the JSON output."
                  },
                  {
                    tip: "Escape special characters in strings",
                    body: "Newlines, quotes, and backslashes inside string values must be escaped. A newline in a JSON string must be written as \\n. The formatter handles this correctly in its output."
                  }
                ].map(({ tip, body }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "li",
                  {
                    style: {
                      display: "flex",
                      gap: "0.75rem",
                      alignItems: "flex-start"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: {
                            color: ACCENT_LIGHT,
                            marginTop: "0.15rem",
                            flexShrink: 0
                          },
                          children: "✓"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { style: { color: "#e2e8f0", fontSize: "0.9375rem" }, children: [
                          tip,
                          ":"
                        ] }),
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#94a3b8", fontSize: "0.9375rem" }, children: body })
                      ] })
                    ]
                  },
                  tip
                ))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: h2Style, children: "Frequently Asked Questions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: { display: "flex", flexDirection: "column", gap: "1.25rem" },
                children: faqSchema.mainEntity.map((faq, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    "data-ocid": `jsonformat.item.${i + 1}`,
                    style: {
                      borderBottom: i < faqSchema.mainEntity.length - 1 ? "1px solid #1e293b" : "none",
                      paddingBottom: i < faqSchema.mainEntity.length - 1 ? "1.25rem" : 0
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "h3",
                        {
                          style: {
                            ...h3Style,
                            color: ACCENT_LIGHT,
                            marginBottom: "0.375rem"
                          },
                          children: [
                            "Q: ",
                            faq.name
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: bodyText, children: faq.acceptedAnswer.text })
                    ]
                  },
                  i
                ))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: cardStyle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: h2Style, children: "Related Free Tools" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                  gap: "0.75rem",
                  marginBottom: "1.5rem"
                },
                children: [
                  {
                    label: "PDF Tools",
                    page: "pdf-tools",
                    emoji: "📄",
                    desc: "Merge, compress, convert PDFs"
                  },
                  {
                    label: "Image Tools",
                    page: "image-tools",
                    emoji: "🖼️",
                    desc: "Resize, compress, convert images"
                  },
                  {
                    label: "Resume Builder",
                    page: "resume-builder",
                    emoji: "📋",
                    desc: "Create professional resumes"
                  },
                  {
                    label: "Calculator Hub",
                    page: "calculators",
                    emoji: "🧮",
                    desc: "Academic & financial calculators"
                  }
                ].map((tool) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "jsonformat.link",
                    onClick: () => onNavigate(tool.page),
                    style: {
                      background: "#0f172a",
                      border: "1px solid #1e293b",
                      borderRadius: "0.75rem",
                      padding: "1rem",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.15s"
                    },
                    onMouseEnter: (e) => {
                      e.currentTarget.style.borderColor = ACCENT;
                      e.currentTarget.style.background = "#1e293b";
                    },
                    onMouseLeave: (e) => {
                      e.currentTarget.style.borderColor = "#1e293b";
                      e.currentTarget.style.background = "#0f172a";
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "1.5rem", marginBottom: "0.375rem" }, children: tool.emoji }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            color: "#ffffff",
                            fontSize: "0.875rem",
                            fontWeight: 600
                          },
                          children: tool.label
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            color: "#64748b",
                            fontSize: "0.75rem",
                            marginTop: "0.25rem"
                          },
                          children: tool.desc
                        }
                      )
                    ]
                  },
                  tool.page
                ))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                marginBottom: "2rem"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "jsonformat.primary_button",
                    onClick: () => onNavigate("pdf-tools"),
                    style: {
                      background: ACCENT,
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "0.625rem",
                      padding: "0.875rem 1.75rem",
                      fontSize: "1rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "background 0.15s"
                    },
                    onMouseEnter: (e) => {
                      e.currentTarget.style.background = "#1d4ed8";
                    },
                    onMouseLeave: (e) => {
                      e.currentTarget.style.background = ACCENT;
                    },
                    children: "Open PDF Tools →"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "jsonformat.secondary_button",
                    onClick: () => onNavigate("image-tools"),
                    style: {
                      background: "transparent",
                      color: ACCENT_LIGHT,
                      border: `1px solid ${ACCENT_LIGHT}`,
                      borderRadius: "0.625rem",
                      padding: "0.875rem 1.75rem",
                      fontSize: "1rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.15s"
                    },
                    onMouseEnter: (e) => {
                      e.currentTarget.style.background = "rgba(56,189,248,0.08)";
                    },
                    onMouseLeave: (e) => {
                      e.currentTarget.style.background = "transparent";
                    },
                    children: "Try Image Tools →"
                  }
                )
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  JSONFormatterPage as default
};
