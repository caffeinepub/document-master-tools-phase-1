import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Scissors } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { useState } from "react";
import { toast } from "sonner";
import DownloadSection from "../DownloadSection";
import FileUploadZone from "../FileUploadZone";
import ProcessingState from "../ProcessingState";

interface PDFSplitToolProps {
  onBack: () => void;
}

interface SplitFile {
  blob: Blob;
  name: string;
}

/**
 * Parse a page range string like "1-3, 5, 7-9" into zero-based page indices.
 * Returns null if totalPages is not yet known (used for validation message only).
 */
function parsePageRanges(
  rangeStr: string,
  totalPages: number,
): number[] | null {
  const result: number[] = [];
  const parts = rangeStr
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);
  for (const part of parts) {
    if (part.includes("-")) {
      const [startStr, endStr] = part.split("-").map((s) => s.trim());
      const start = Number.parseInt(startStr, 10);
      const end = Number.parseInt(endStr, 10);
      if (
        Number.isNaN(start) ||
        Number.isNaN(end) ||
        start < 1 ||
        end > totalPages ||
        start > end
      ) {
        return null;
      }
      for (let i = start; i <= end; i++) {
        result.push(i - 1); // convert to 0-based
      }
    } else {
      const page = Number.parseInt(part, 10);
      if (Number.isNaN(page) || page < 1 || page > totalPages) {
        return null;
      }
      result.push(page - 1);
    }
  }
  // Deduplicate while preserving order
  return [...new Set(result)];
}

export default function PDFSplitTool({ onBack }: PDFSplitToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [pageRange, setPageRange] = useState("");
  const [totalPages, setTotalPages] = useState<number>(0);
  const [processing, setProcessing] = useState(false);
  const [splitResults, setSplitResults] = useState<SplitFile[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (selectedFile: File) => {
    if (selectedFile.type !== "application/pdf") {
      toast.error("Please select a PDF file");
      return;
    }
    setError(null);
    setSplitResults([]);
    setPageRange("");
    // Load to detect total pages
    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const doc = await PDFDocument.load(arrayBuffer, {
        ignoreEncryption: true,
      });
      setTotalPages(doc.getPageCount());
    } catch {
      setTotalPages(0);
    }
    setFile(selectedFile);
  };

  const handleSplitPDF = async () => {
    if (!file) {
      toast.error("Please select a PDF file");
      return;
    }

    setProcessing(true);
    setError(null);
    try {
      const arrayBuffer = await file.arrayBuffer();
      let srcDoc: PDFDocument;
      try {
        srcDoc = await PDFDocument.load(arrayBuffer, {
          ignoreEncryption: true,
        });
      } catch {
        throw new Error(
          "Could not read the PDF. It may be corrupted or password-protected.",
        );
      }

      const numPages = srcDoc.getPageCount();
      const results: SplitFile[] = [];

      if (pageRange.trim()) {
        // Extract specific pages as a single output PDF
        const indices = parsePageRanges(pageRange, numPages);
        if (!indices || indices.length === 0) {
          throw new Error(
            `Invalid page range. Enter numbers between 1 and ${numPages}, e.g. "1-3, 5, 7-9".`,
          );
        }
        const newDoc = await PDFDocument.create();
        const pages = await newDoc.copyPages(srcDoc, indices);
        for (const page of pages) newDoc.addPage(page);
        const pdfBytes = await newDoc.save();
        results.push({
          blob: new Blob([new Uint8Array(pdfBytes).buffer], {
            type: "application/pdf",
          }),
          name: `split-pages-${pageRange.replace(/\s/g, "")}.pdf`,
        });
        toast.success(`Extracted ${indices.length} page(s) successfully!`);
      } else {
        // Split every page into its own file
        for (let i = 0; i < numPages; i++) {
          const newDoc = await PDFDocument.create();
          const [page] = await newDoc.copyPages(srcDoc, [i]);
          newDoc.addPage(page);
          const pdfBytes = await newDoc.save();
          results.push({
            blob: new Blob([new Uint8Array(pdfBytes).buffer], {
              type: "application/pdf",
            }),
            name: `${file.name.replace(/\.pdf$/i, "")}-page-${i + 1}.pdf`,
          });
        }
        toast.success(`PDF split into ${numPages} individual page files!`);
      }

      setSplitResults(results);
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Failed to split PDF. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setProcessing(false);
    }
  };

  const reset = () => {
    setFile(null);
    setPageRange("");
    setTotalPages(0);
    setSplitResults([]);
    setError(null);
  };

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to PDF Tools
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Split PDF</CardTitle>
            <CardDescription>
              Extract specific pages from your PDF. Enter page ranges like "1-3,
              5, 7-9" or leave empty to split all pages into individual files.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {splitResults.length === 0 &&
              !processing &&
              (!file ? (
                <div data-ocid="split_pdf.dropzone">
                  <FileUploadZone
                    onFileSelect={handleFileSelect}
                    accept="application/pdf"
                    description="Click to upload PDF file or drag and drop"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                      {totalPages > 0 &&
                        ` · ${totalPages} page${totalPages !== 1 ? "s" : ""}`}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pageRange">
                      Page Range (optional)
                      {totalPages > 0 && (
                        <span className="text-muted-foreground font-normal ml-2">
                          — this PDF has {totalPages} page
                          {totalPages !== 1 ? "s" : ""}
                        </span>
                      )}
                    </Label>
                    <Input
                      id="pageRange"
                      placeholder={`e.g., 1-3, 5, 7-9${totalPages > 0 ? ` (max ${totalPages})` : ""}`}
                      value={pageRange}
                      onChange={(e) => {
                        setPageRange(e.target.value);
                        setError(null);
                      }}
                      data-ocid="split_pdf.input"
                    />
                    <p className="text-xs text-muted-foreground">
                      Leave empty to split every page into a separate file
                    </p>
                  </div>

                  {error && (
                    <div
                      className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
                      data-ocid="split_pdf.error_state"
                    >
                      {error}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={reset}
                      className="flex-1"
                      data-ocid="split_pdf.cancel_button"
                    >
                      Change File
                    </Button>
                    <Button
                      onClick={handleSplitPDF}
                      className="flex-1"
                      size="lg"
                      data-ocid="split_pdf.primary_button"
                    >
                      <Scissors className="mr-2 h-4 w-4" />
                      Split PDF
                    </Button>
                  </div>
                </div>
              ))}

            {processing && (
              <div data-ocid="split_pdf.loading_state">
                <ProcessingState message="Splitting PDF into individual files..." />
              </div>
            )}

            {splitResults.length > 0 && (
              <div data-ocid="split_pdf.success_state">
                <DownloadSection
                  files={splitResults}
                  onProcessAnother={reset}
                  onClear={reset}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
