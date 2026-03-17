import { jsPDF } from "jspdf";
import { AlertTriangle, ArrowLeft, Download, FileText, X } from "lucide-react";
import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { trackPdfToolUsed } from "../../utils/analytics";

interface ExcelToPDFToolProps {
  onBack: () => void;
}

interface SheetData {
  name: string;
  rows: string[][];
}

function buildPDFFromSheets(sheets: SheetData[]): Blob {
  const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "landscape" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;
  const rowHeight = 8;
  const headerRowHeight = 10;

  sheets.forEach((sheet, sheetIdx) => {
    if (sheetIdx > 0) pdf.addPage();

    // Sheet title
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    pdf.setTextColor(20, 20, 20);
    pdf.text(sheet.name, margin, margin);

    if (sheet.rows.length === 0) {
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.text("(Empty sheet)", margin, margin + 12);
      return;
    }

    // Calculate column widths (evenly distribute available width)
    const maxCols = Math.max(...sheet.rows.map((r) => r.length), 1);
    const availWidth = pageWidth - margin * 2;
    const colWidth = Math.min(availWidth / maxCols, 50);

    let y = margin + 12;
    const isHeader = true;

    sheet.rows.forEach((row, rowIdx) => {
      if (y + rowHeight > pageHeight - margin) {
        pdf.addPage();
        y = margin;
      }

      const currentRowHeight = rowIdx === 0 ? headerRowHeight : rowHeight;

      // Row background for header
      if (rowIdx === 0) {
        pdf.setFillColor(30, 64, 130);
        pdf.rect(margin, y - 6, availWidth, currentRowHeight, "F");
        pdf.setTextColor(255, 255, 255);
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(9);
      } else {
        if (rowIdx % 2 === 0) {
          pdf.setFillColor(245, 247, 252);
          pdf.rect(margin, y - 6, availWidth, currentRowHeight, "F");
        }
        pdf.setTextColor(40, 40, 40);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8);
      }

      row.slice(0, maxCols).forEach((cell, colIdx) => {
        const x = margin + colIdx * colWidth;
        const cellText = String(cell ?? "").slice(0, 30);
        pdf.text(cellText, x + 1, y);
      });

      y += currentRowHeight;
    });

    // Suppress unused warning
    void isHeader;
  });

  return pdf.output("blob");
}

export default function ExcelToPDFTool({ onBack }: ExcelToPDFToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sheets, setSheets] = useState<SheetData[]>([]);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    const name = f.name.toLowerCase();
    if (
      !name.endsWith(".xls") &&
      !name.endsWith(".xlsx") &&
      !name.endsWith(".csv")
    ) {
      setError("Please upload a valid Excel file (.xls, .xlsx) or CSV.");
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
    setProgress(10);
    setError(null);
    setSheets([]);
    setResultBlob(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      setProgress(30);

      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      setProgress(60);

      const parsedSheets: SheetData[] = workbook.SheetNames.map((sheetName) => {
        const ws = workbook.Sheets[sheetName];
        const rows: string[][] = XLSX.utils.sheet_to_json(ws, {
          header: 1,
          raw: false,
          defval: "",
        }) as string[][];
        return { name: sheetName, rows };
      });

      setSheets(parsedSheets);
      setProgress(80);

      const blob = buildPDFFromSheets(parsedSheets);
      setProgress(100);
      setResultBlob(blob);

      trackPdfToolUsed({
        toolName: "Excel to PDF",
        fileType: file.type || "application/vnd.ms-excel",
        fileSize: file.size,
      });
    } catch (err) {
      console.error(err);
      setError(
        "Failed to process the Excel file. The file may be corrupted or in an unsupported format.",
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
    a.download = `${file.name.replace(/\.(xlsx?|csv)$/i, "")}.pdf`;
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
  const previewRows = previewSheet?.rows.slice(0, 6) ?? [];

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
          data-ocid="excel-to-pdf.link"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to PDF Tools
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Excel to PDF
          </h1>
          <p className="text-slate-300">
            Convert Excel spreadsheets (.xls, .xlsx) to PDF format. All
            processing in your browser.
          </p>
        </div>

        {/* Limitation notice */}
        <div className="flex items-start gap-3 bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-4 mb-6">
          <AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
          <div className="text-sm text-yellow-200">
            <strong>Conversion note:</strong> Cell data and text are preserved.
            Charts, images, conditional formatting, formulas (values only), and
            complex styling may not appear in the PDF output. Output is in
            landscape A4 format.
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
              data-ocid="excel-to-pdf.dropzone"
            >
              <FileText className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <p className="text-white font-semibold mb-2">
                Drop your Excel file here or click to upload
              </p>
              <p className="text-slate-400 text-sm">
                Supports .xls, .xlsx, and .csv files
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".xls,.xlsx,.csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFile(f);
                }}
                data-ocid="excel-to-pdf.upload_button"
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
                  data-ocid="excel-to-pdf.delete_button"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {error && (
                <div
                  className="bg-red-900/30 border border-red-700/50 rounded-lg p-3 text-red-300 text-sm"
                  data-ocid="excel-to-pdf.error_state"
                >
                  {error}
                </div>
              )}
              <button
                type="button"
                onClick={handleConvert}
                className="w-full py-3 bg-green-700 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors duration-200"
                data-ocid="excel-to-pdf.primary_button"
              >
                Convert to PDF
              </button>
            </div>
          )}

          {/* Processing */}
          {processing && (
            <div
              className="space-y-4 text-center py-6"
              data-ocid="excel-to-pdf.loading_state"
            >
              <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-white font-medium">
                Converting Excel to PDF...
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
            <div className="space-y-4" data-ocid="excel-to-pdf.success_state">
              <div className="flex items-center gap-3 bg-green-900/30 border border-green-700/50 rounded-lg p-4">
                <div className="w-3 h-3 bg-green-400 rounded-full shrink-0" />
                <p className="text-green-300 font-medium">
                  Conversion complete — {sheets.length} sheet
                  {sheets.length !== 1 ? "s" : ""} converted
                </p>
              </div>

              {/* Table preview */}
              {previewRows.length > 0 && (
                <div>
                  <p className="text-slate-300 text-sm font-medium mb-2">
                    Preview:{" "}
                    <span className="text-slate-400">{previewSheet.name}</span>
                    {sheets.length > 1 && (
                      <span className="text-slate-500">
                        {" "}
                        (+{sheets.length - 1} more sheet(s))
                      </span>
                    )}
                  </p>
                  <div className="overflow-x-auto border border-gray-600 rounded-lg">
                    <table className="w-full text-sm text-left">
                      <tbody>
                        {previewRows.map((row, ri) => {
                          const rowKey = `row-${ri}`;
                          const rowClass =
                            ri === 0
                              ? "bg-blue-900/40"
                              : ri % 2 === 0
                                ? "bg-gray-800"
                                : "bg-gray-850";
                          return (
                            <tr key={rowKey} className={rowClass}>
                              {row.slice(0, 8).map((cell, ci) => {
                                const cellKey = `cell-${ri}-${ci}`;
                                const cellClass = `px-3 py-2 border-r border-gray-600 last:border-r-0 max-w-[150px] truncate ${ri === 0 ? "text-blue-200 font-semibold" : "text-slate-300"}`;
                                return (
                                  <td key={cellKey} className={cellClass}>
                                    {cell}
                                  </td>
                                );
                              })}
                              {row.length > 8 && (
                                <td className="px-2 py-2 text-slate-500 text-xs">
                                  +{row.length - 8} more
                                </td>
                              )}
                            </tr>
                          );
                        })}
                        {previewSheet.rows.length > 6 && (
                          <tr className="bg-gray-800">
                            <td
                              colSpan={9}
                              className="px-3 py-2 text-slate-500 text-xs italic"
                            >
                              ...{previewSheet.rows.length - 6} more rows in the
                              PDF
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
                  data-ocid="excel-to-pdf.secondary_button"
                >
                  <Download className="w-5 h-5" />
                  Download PDF ({(resultBlob.size / 1024).toFixed(0)} KB)
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="px-5 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
                  data-ocid="excel-to-pdf.cancel_button"
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
                data-ocid="excel-to-pdf.error_state"
              >
                <strong>Error:</strong> {error}
              </div>
              <button
                type="button"
                onClick={reset}
                className="py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors"
                data-ocid="excel-to-pdf.cancel_button"
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
