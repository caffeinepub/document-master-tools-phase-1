import { jsPDF } from "jspdf";
import { AlertTriangle, ArrowLeft, Download, FileText, X } from "lucide-react";
import { useRef, useState } from "react";
import { trackPdfToolUsed } from "../../utils/analytics";

interface WordToPDFToolProps {
  onBack: () => void;
}

interface PreviewContent {
  html: string;
  paragraphs: string[];
}

async function extractDocxText(
  arrayBuffer: ArrayBuffer,
): Promise<PreviewContent> {
  // Dynamically import mammoth to avoid bundle issues
  const mammoth = await import("mammoth");
  const result = await mammoth.convertToHtml({ arrayBuffer });
  const html = result.value;

  // Parse paragraphs for jsPDF rendering
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const paragraphs: string[] = [];
  for (const el of Array.from(
    doc.body.querySelectorAll("p, h1, h2, h3, h4, li"),
  )) {
    const text = (el as HTMLElement).innerText || el.textContent || "";
    if (text.trim()) paragraphs.push(text.trim());
  }

  return { html, paragraphs };
}

function buildPDFFromParagraphs(paragraphs: string[]): Blob {
  const pdf = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const maxWidth = pageWidth - margin * 2;
  let y = margin;
  const lineHeight = 7;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(12);
  pdf.setTextColor(20, 20, 20);

  for (const para of paragraphs) {
    if (!para.trim()) continue;

    // Wrap text
    const lines = pdf.splitTextToSize(para, maxWidth);
    for (const line of lines) {
      if (y + lineHeight > pageHeight - margin) {
        pdf.addPage();
        y = margin;
      }
      pdf.text(line, margin, y);
      y += lineHeight;
    }
    y += 3; // paragraph spacing
  }

  return pdf.output("blob");
}

export default function WordToPDFTool({ onBack }: WordToPDFToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState<PreviewContent | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isDocx = (f: File) =>
    f.name.toLowerCase().endsWith(".docx") ||
    f.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  const isDoc = (f: File) =>
    f.name.toLowerCase().endsWith(".doc") || f.type === "application/msword";

  const handleFile = (f: File) => {
    if (!isDocx(f) && !isDoc(f)) {
      setError("Please upload a .doc or .docx file.");
      return;
    }
    setFile(f);
    setPreview(null);
    setResultBlob(null);
    setError(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const handleConvert = async () => {
    if (!file) return;
    setProcessing(true);
    setProgress(10);
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      setProgress(30);

      if (isDocx(file)) {
        // .docx: use mammoth to extract structured text
        const content = await extractDocxText(arrayBuffer);
        setProgress(70);
        setPreview(content);

        const blob = buildPDFFromParagraphs(content.paragraphs);
        setProgress(100);
        setResultBlob(blob);
      } else {
        // .doc (legacy binary): best-effort text extraction
        const uint8 = new Uint8Array(arrayBuffer);
        // Extract readable ASCII text from binary .doc
        const decoder = new TextDecoder("utf-8", { fatal: false });
        const raw = decoder.decode(uint8);
        const visibleText = raw
          .replace(/[^\x20-\x7E\n\r\t]/g, " ")
          .replace(/\s{3,}/g, "\n")
          .split("\n")
          .map((l) => l.trim())
          .filter((l) => l.length > 4);

        setProgress(70);
        const content: PreviewContent = {
          html: visibleText.map((l) => `<p>${l}</p>`).join(""),
          paragraphs: visibleText,
        };
        setPreview(content);
        const blob = buildPDFFromParagraphs(content.paragraphs);
        setProgress(100);
        setResultBlob(blob);
      }

      trackPdfToolUsed({
        toolName: "Word to PDF",
        fileType: file.type || "application/msword",
        fileSize: file.size,
      });
    } catch (err) {
      console.error(err);
      setError(
        "Failed to process the Word document. The file may be corrupted or in an unsupported format.",
      );
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resultBlob || !file) return;
    const url = URL.createObjectURL(resultBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${file.name.replace(/\.(docx?|doc)$/i, "")}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setResultBlob(null);
    setError(null);
    setProgress(0);
  };

  return (
    <div
      className="min-h-screen py-8 px-4"
      style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Back */}
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-slate-300 hover:text-white mb-8 transition-colors duration-200 group"
          data-ocid="word-to-pdf.link"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to PDF Tools
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Word to PDF
          </h1>
          <p className="text-slate-300">
            Convert Word documents (.doc, .docx) to PDF format. All processing
            in your browser.
          </p>
        </div>

        {/* Limitation notice */}
        <div className="flex items-start gap-3 bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-4 mb-6">
          <AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
          <div className="text-sm text-yellow-200">
            <strong>Conversion note:</strong> Text content is preserved. Complex
            formatting like custom fonts, tables, images, headers/footers, and
            tracked changes may not render in the PDF output. For pixel-perfect
            results, use Microsoft Word or LibreOffice.
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
          {/* Upload zone */}
          {!file && !processing && (
            <div
              className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors duration-200 ${dragging ? "border-orange-400 bg-orange-900/20" : "border-gray-600 hover:border-gray-400"}`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  fileInputRef.current?.click();
              }}
              // biome-ignore lint/a11y/useSemanticElements: drop zone requires div
              role="button"
              tabIndex={0}
              data-ocid="word-to-pdf.dropzone"
            >
              <FileText className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <p className="text-white font-semibold mb-2">
                Drop your Word file here or click to upload
              </p>
              <p className="text-slate-400 text-sm">
                Supports .doc and .docx files
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFile(f);
                }}
                data-ocid="word-to-pdf.upload_button"
              />
            </div>
          )}

          {/* File selected */}
          {file && !processing && !resultBlob && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-orange-400 shrink-0" />
                  <div>
                    <p className="text-white font-medium">{file.name}</p>
                    <p className="text-slate-400 text-sm">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={reset}
                  className="text-slate-400 hover:text-white transition-colors"
                  data-ocid="word-to-pdf.delete_button"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {error && (
                <div
                  className="bg-red-900/30 border border-red-700/50 rounded-lg p-3 text-red-300 text-sm"
                  data-ocid="word-to-pdf.error_state"
                >
                  {error}
                </div>
              )}
              <button
                type="button"
                onClick={handleConvert}
                className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors duration-200"
                data-ocid="word-to-pdf.primary_button"
              >
                Convert to PDF
              </button>
            </div>
          )}

          {/* Processing */}
          {processing && (
            <div
              className="space-y-4 text-center py-6"
              data-ocid="word-to-pdf.loading_state"
            >
              <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-white font-medium">
                Converting Word document to PDF...
              </p>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className="bg-orange-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-slate-400 text-sm">{progress}% complete</p>
            </div>
          )}

          {/* Preview + download */}
          {resultBlob && preview && (
            <div className="space-y-4" data-ocid="word-to-pdf.success_state">
              <div className="flex items-center gap-3 bg-green-900/30 border border-green-700/50 rounded-lg p-4">
                <div className="w-3 h-3 bg-green-400 rounded-full shrink-0" />
                <p className="text-green-300 font-medium">
                  Conversion complete — {preview.paragraphs.length} paragraph
                  {preview.paragraphs.length !== 1 ? "s" : ""} converted
                </p>
              </div>

              {/* Text preview */}
              <div>
                <p className="text-slate-300 text-sm font-medium mb-2">
                  Content preview:
                </p>
                <div className="bg-gray-800 rounded-lg p-4 max-h-56 overflow-y-auto border border-gray-600">
                  {preview.paragraphs.slice(0, 10).map((para, i) => {
                    const paraKey = `para-${i}`;
                    return (
                      <p
                        key={paraKey}
                        className="text-slate-300 text-sm mb-2 leading-relaxed"
                      >
                        {para.slice(0, 200)}
                        {para.length > 200 ? "…" : ""}
                      </p>
                    );
                  })}
                  {preview.paragraphs.length > 10 && (
                    <p className="text-slate-500 text-xs italic mt-1">
                      ...{preview.paragraphs.length - 10} more paragraph(s) in
                      the PDF
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors duration-200"
                  data-ocid="word-to-pdf.secondary_button"
                >
                  <Download className="w-5 h-5" />
                  Download PDF ({(resultBlob.size / 1024).toFixed(0)} KB)
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="px-5 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
                  data-ocid="word-to-pdf.cancel_button"
                >
                  Convert Another
                </button>
              </div>
            </div>
          )}

          {/* Error after processing */}
          {!processing && error && file && !resultBlob && (
            <div className="space-y-3 mt-4">
              <div
                className="bg-red-900/30 border border-red-700/50 rounded-lg p-4 text-red-300 text-sm"
                data-ocid="word-to-pdf.error_state"
              >
                <strong>Error:</strong> {error}
              </div>
              <button
                type="button"
                onClick={reset}
                className="py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors"
                data-ocid="word-to-pdf.cancel_button"
              >
                Try Another File
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
