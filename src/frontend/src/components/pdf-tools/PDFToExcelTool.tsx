import {
  AlertTriangle,
  ArrowLeft,
  Download,
  FileText,
  Table,
  X,
} from "lucide-react";
import * as pdfjs from "pdfjs-dist";
import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { trackPdfToolUsed } from "../../utils/analytics";

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

interface ExtractedRow {
  cells: string[];
}

interface ExtractedSheet {
  pageNum: number;
  rows: ExtractedRow[];
  rawText: string;
}

function parseTextToRows(text: string): ExtractedRow[] {
  // Try to detect table-like structure from text
  const lines = text
    .split(/\n+/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  return lines.map((line) => {
    // Split by 2+ spaces or tab-like gaps
    const cells = line
      .split(/\s{2,}|\t/)
      .map((c) => c.trim())
      .filter((c) => c.length > 0);
    return { cells: cells.length > 0 ? cells : [line] };
  });
}

export default function PDFToExcelTool({ onBack }: { onBack: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sheets, setSheets] = useState<ExtractedSheet[]>([]);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    if (
      !f.name.toLowerCase().endsWith(".pdf") &&
      f.type !== "application/pdf"
    ) {
      setError("Please upload a valid PDF file.");
      return;
    }
    setFile(f);
    setSheets([]);
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
    setProgress(0);
    setError(null);
    setSheets([]);
    setResultBlob(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      const totalPages = pdf.numPages;
      const extractedSheets: ExtractedSheet[] = [];

      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();

        // Reconstruct lines using y-coordinates for better table detection
        const itemsByY: Map<number, string[]> = new Map();
        for (const item of textContent.items) {
          if (!("str" in item)) continue;
          if (!item.str.trim()) continue;
          const transform = item.transform;
          const y = Math.round(transform[5]); // y coordinate
          if (!itemsByY.has(y)) itemsByY.set(y, []);
          itemsByY.get(y)!.push(item.str);
        }

        // Sort by y descending (top of page first)
        const sortedYs = Array.from(itemsByY.keys()).sort((a, b) => b - a);
        const rawLines = sortedYs.map((y) => itemsByY.get(y)!.join(" "));
        const rawText = rawLines.join("\n");
        const rows = parseTextToRows(rawText);

        extractedSheets.push({ pageNum: i, rows, rawText });
        setProgress(Math.round((i / totalPages) * 70));
      }

      setSheets(extractedSheets);
      setProgress(80);

      // Build workbook
      const workbook = XLSX.utils.book_new();

      for (const sheet of extractedSheets) {
        const wsData = sheet.rows.map((row) => row.cells);
        const ws = XLSX.utils.aoa_to_sheet(wsData);

        // Auto column widths
        const colWidths = wsData.reduce((acc: number[], row) => {
          row.forEach((cell, i) => {
            acc[i] = Math.max(acc[i] || 0, String(cell).length + 2);
          });
          return acc;
        }, []);
        ws["!cols"] = colWidths.map((w) => ({ wch: Math.min(w, 50) }));

        const sheetName =
          extractedSheets.length > 1 ? `Page ${sheet.pageNum}` : "Sheet1";
        XLSX.utils.book_append_sheet(workbook, ws, sheetName);
      }

      setProgress(95);
      const xlsxData = XLSX.write(workbook, {
        type: "array",
        bookType: "xlsx",
      });
      const blob = new Blob([xlsxData], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      setResultBlob(blob);
      setProgress(100);

      trackPdfToolUsed({
        toolName: "PDF to Excel",
        fileType: "application/pdf",
        fileSize: file.size,
      });
    } catch (err) {
      console.error(err);
      setError(
        "Failed to process PDF. The file may be password-protected, corrupted, or contain only scanned images.",
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
    a.download = `${file.name.replace(/\.pdf$/i, "")}.xlsx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setFile(null);
    setSheets([]);
    setResultBlob(null);
    setError(null);
    setProgress(0);
  };

  const previewSheet = sheets[0];
  const previewRows = previewSheet?.rows.slice(0, 8) ?? [];

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
          data-ocid="pdf-to-excel.link"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to PDF Tools
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            PDF to Excel
          </h1>
          <p className="text-slate-300">
            Extract tables and text from PDF into Excel (.xlsx). Processing
            happens entirely in your browser.
          </p>
        </div>

        {/* Limitation notice */}
        <div className="flex items-start gap-3 bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-4 mb-6">
          <AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
          <div className="text-sm text-yellow-200">
            <strong>Conversion limitations:</strong> Text and table-like content
            is extracted from digital PDFs. Scanned documents, complex merged
            cells, charts, and embedded images cannot be extracted. Best results
            are from PDFs with clear tabular data.
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
          {/* Upload zone */}
          {!file && !processing && (
            <div
              className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors duration-200 ${dragging ? "border-green-400 bg-green-900/20" : "border-gray-600 hover:border-gray-400"}`}
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
              data-ocid="pdf-to-excel.dropzone"
            >
              <Table className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <p className="text-white font-semibold mb-2">
                Drop your PDF here or click to upload
              </p>
              <p className="text-slate-400 text-sm">
                Best results with PDFs containing tables or structured data
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFile(f);
                }}
                data-ocid="pdf-to-excel.upload_button"
              />
            </div>
          )}

          {/* File selected */}
          {file && !processing && !resultBlob && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-green-400 shrink-0" />
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
                  data-ocid="pdf-to-excel.delete_button"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {error && (
                <div
                  className="bg-red-900/30 border border-red-700/50 rounded-lg p-3 text-red-300 text-sm"
                  data-ocid="pdf-to-excel.error_state"
                >
                  {error}
                </div>
              )}
              <button
                type="button"
                onClick={handleConvert}
                className="w-full py-3 bg-green-700 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors duration-200"
                data-ocid="pdf-to-excel.primary_button"
              >
                Convert to Excel (.xlsx)
              </button>
            </div>
          )}

          {/* Processing */}
          {processing && (
            <div
              className="space-y-4 text-center py-6"
              data-ocid="pdf-to-excel.loading_state"
            >
              <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-white font-medium">
                Extracting data from PDF...
              </p>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className="bg-green-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-slate-400 text-sm">{progress}% complete</p>
            </div>
          )}

          {/* Preview + download */}
          {resultBlob && sheets.length > 0 && (
            <div className="space-y-4" data-ocid="pdf-to-excel.success_state">
              <div className="flex items-center gap-3 bg-green-900/30 border border-green-700/50 rounded-lg p-4">
                <div className="w-3 h-3 bg-green-400 rounded-full shrink-0" />
                <p className="text-green-300 font-medium">
                  Extraction complete — {sheets.length} sheet
                  {sheets.length !== 1 ? "s" : ""} created
                </p>
              </div>

              {/* Table preview */}
              {previewRows.length > 0 && (
                <div>
                  <p className="text-slate-300 text-sm font-medium mb-2">
                    Data preview (Page 1
                    {sheets.length > 1
                      ? `, +${sheets.length - 1} more sheet(s)`
                      : ""}
                    ):
                  </p>
                  <div className="overflow-x-auto border border-gray-600 rounded-lg">
                    <table className="w-full text-sm text-left">
                      <tbody>
                        {previewRows.map((row, ri) => {
                          const rowKey = `row-${ri}`;
                          return (
                            <tr
                              key={rowKey}
                              className={
                                ri % 2 === 0 ? "bg-gray-800" : "bg-gray-750"
                              }
                            >
                              {row.cells.map((cell, ci) => {
                                const cellKey = `cell-${ri}-${ci}`;
                                return (
                                  <td
                                    key={cellKey}
                                    className="px-3 py-2 text-slate-300 border-r border-gray-600 last:border-r-0 max-w-[200px] truncate"
                                  >
                                    {cell}
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}
                        {previewSheet.rows.length > 8 && (
                          <tr className="bg-gray-800">
                            <td
                              colSpan={10}
                              className="px-3 py-2 text-slate-500 text-xs italic"
                            >
                              ...{previewSheet.rows.length - 8} more rows in
                              download
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-700 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors duration-200"
                  data-ocid="pdf-to-excel.secondary_button"
                >
                  <Download className="w-5 h-5" />
                  Download .xlsx ({(resultBlob.size / 1024).toFixed(0)} KB)
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="px-5 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
                  data-ocid="pdf-to-excel.cancel_button"
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
                data-ocid="pdf-to-excel.error_state"
              >
                <strong>Error:</strong> {error}
              </div>
              <button
                type="button"
                onClick={reset}
                className="py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors"
                data-ocid="pdf-to-excel.cancel_button"
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
