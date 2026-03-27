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
import { ArrowLeft, RotateCcw } from "lucide-react";
import { PDFDocument, degrees } from "pdf-lib";
import { useState } from "react";
import { toast } from "sonner";
import DownloadSection from "../DownloadSection";
import FileUploadZone from "../FileUploadZone";
import ProcessingState from "../ProcessingState";

interface PDFRotateToolProps {
  onBack: () => void;
}

type RotationDeg = 90 | 180 | 270;

export default function PDFRotateTool({ onBack }: PDFRotateToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [rotation, setRotation] = useState<RotationDeg>(90);
  const [applyTo, setApplyTo] = useState<"all" | "selected">("all");
  const [selectedPages, setSelectedPages] = useState("");
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<{
    blob: Blob;
    name: string;
    pagesRotated: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (selectedFile: File) => {
    if (selectedFile.type !== "application/pdf") {
      toast.error("Please select a PDF file");
      return;
    }
    setFile(selectedFile);
    setResult(null);
    setError(null);
    // Read page count
    try {
      const buf = await selectedFile.arrayBuffer();
      const doc = await PDFDocument.load(buf, { ignoreEncryption: true });
      setPageCount(doc.getPageCount());
    } catch {
      setPageCount(0);
    }
  };

  const parsePageSelection = (
    input: string,
    total: number,
  ): number[] | null => {
    const indices: number[] = [];
    const parts = input
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    for (const part of parts) {
      if (part.includes("-")) {
        const [startStr, endStr] = part.split("-");
        const start = Number.parseInt(startStr, 10);
        const end = Number.parseInt(endStr, 10);
        if (
          Number.isNaN(start) ||
          Number.isNaN(end) ||
          start < 1 ||
          end > total ||
          start > end
        ) {
          return null;
        }
        for (let i = start; i <= end; i++) indices.push(i - 1);
      } else {
        const n = Number.parseInt(part, 10);
        if (Number.isNaN(n) || n < 1 || n > total) return null;
        indices.push(n - 1);
      }
    }
    return [...new Set(indices)];
  };

  const rotatePDF = async () => {
    if (!file) {
      toast.error("Please upload a PDF file first");
      return;
    }
    setProcessing(true);
    setError(null);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, {
        ignoreEncryption: true,
      });
      const pages = pdfDoc.getPages();

      let targetIndices: number[];
      if (applyTo === "all") {
        targetIndices = pages.map((_, i) => i);
      } else {
        const parsed = parsePageSelection(selectedPages, pages.length);
        if (!parsed || parsed.length === 0) {
          throw new Error(
            `Invalid page selection. Enter numbers between 1 and ${pages.length} (e.g. "1,3,5-7")`,
          );
        }
        targetIndices = parsed;
      }

      for (const idx of targetIndices) {
        const page = pages[idx];
        const currentRotation = page.getRotation().angle;
        page.setRotation(degrees((currentRotation + rotation) % 360));
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], {
        type: "application/pdf",
      });
      setResult({
        blob,
        name: `rotated-${file.name}`,
        pagesRotated: targetIndices.length,
      });
      toast.success(`Rotated ${targetIndices.length} page(s) by ${rotation}°`);
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Failed to rotate PDF. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setProcessing(false);
    }
  };

  const downloadFile = () => {
    if (!result) return;
    const url = URL.createObjectURL(result.blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = result.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setFile(null);
    setPageCount(0);
    setRotation(90);
    setApplyTo("all");
    setSelectedPages("");
    setResult(null);
    setError(null);
  };

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 text-slate-200 hover:text-white"
          data-ocid="rotate_pdf.cancel_button"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to PDF Tools
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Rotate PDF</CardTitle>
            <CardDescription>
              Rotate all pages or selected pages of a PDF by 90°, 180°, or 270°.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!result && !processing && (
              // biome-ignore lint/complexity/noUselessFragments: conditional ternary needs wrapper
              <>
                {!file ? (
                  <div data-ocid="rotate_pdf.dropzone">
                    <FileUploadZone
                      onFileSelect={handleFileSelect}
                      accept="application/pdf"
                      description="Click to upload PDF or drag and drop"
                    />
                  </div>
                ) : (
                  <div className="space-y-5">
                    {/* File info */}
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB &nbsp;·&nbsp;{" "}
                        {pageCount} page{pageCount !== 1 ? "s" : ""}
                      </p>
                    </div>

                    {/* Rotation angle */}
                    <div className="space-y-2">
                      <Label>Rotation angle</Label>
                      <div className="flex gap-3" data-ocid="rotate_pdf.select">
                        {([90, 180, 270] as RotationDeg[]).map((deg) => (
                          <button
                            key={deg}
                            type="button"
                            onClick={() => setRotation(deg)}
                            className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-colors ${
                              rotation === deg
                                ? "bg-primary text-primary-foreground border-primary"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            {deg}°
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Apply to */}
                    <div className="space-y-2">
                      <Label>Apply to</Label>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setApplyTo("all")}
                          className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-colors ${
                            applyTo === "all"
                              ? "bg-primary text-primary-foreground border-primary"
                              : "border-border hover:border-primary/50"
                          }`}
                          data-ocid="rotate_pdf.toggle"
                        >
                          All pages
                        </button>
                        <button
                          type="button"
                          onClick={() => setApplyTo("selected")}
                          className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-colors ${
                            applyTo === "selected"
                              ? "bg-primary text-primary-foreground border-primary"
                              : "border-border hover:border-primary/50"
                          }`}
                          data-ocid="rotate_pdf.toggle"
                        >
                          Selected pages
                        </button>
                      </div>
                    </div>

                    {applyTo === "selected" && (
                      <div className="space-y-2">
                        <Label htmlFor="page-select">
                          Page numbers (e.g. 1, 3, 5-7)
                        </Label>
                        <Input
                          id="page-select"
                          placeholder={`1 - ${pageCount}`}
                          value={selectedPages}
                          onChange={(e) => setSelectedPages(e.target.value)}
                          data-ocid="rotate_pdf.input"
                        />
                        <p className="text-xs text-muted-foreground">
                          Separate pages with commas. Use dashes for ranges.
                        </p>
                      </div>
                    )}

                    {error && (
                      <div
                        className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
                        data-ocid="rotate_pdf.error_state"
                      >
                        {error}
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={reset}
                        className="flex-1"
                        data-ocid="rotate_pdf.secondary_button"
                      >
                        Change File
                      </Button>
                      <Button
                        onClick={rotatePDF}
                        className="flex-1"
                        size="lg"
                        data-ocid="rotate_pdf.primary_button"
                      >
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Rotate PDF
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}

            {processing && (
              <div data-ocid="rotate_pdf.loading_state">
                <ProcessingState message="Rotating PDF pages... Please wait." />
              </div>
            )}

            {result && (
              <div className="space-y-4" data-ocid="rotate_pdf.success_state">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="font-medium text-green-400">
                    Rotation applied successfully!
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {result.pagesRotated} page
                    {result.pagesRotated !== 1 ? "s" : ""} rotated by {rotation}
                    °
                  </p>
                </div>
                <DownloadSection
                  fileName={result.name}
                  fileSize={result.blob.size}
                  onDownload={downloadFile}
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
