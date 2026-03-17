import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, BookOpen } from "lucide-react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { useState } from "react";
import { toast } from "sonner";
import DownloadSection from "../DownloadSection";
import FileUploadZone from "../FileUploadZone";
import ProcessingState from "../ProcessingState";

interface PDFPageNumbersToolProps {
  onBack: () => void;
}

type NumberPosition = "header" | "footer" | "center";

export default function PDFPageNumbersTool({
  onBack,
}: PDFPageNumbersToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [position, setPosition] = useState<NumberPosition>("footer");
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<{
    blob: Blob;
    name: string;
    totalPages: number;
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
    try {
      const buf = await selectedFile.arrayBuffer();
      const doc = await PDFDocument.load(buf, { ignoreEncryption: true });
      setPageCount(doc.getPageCount());
    } catch {
      setPageCount(0);
    }
  };

  const addPageNumbers = async () => {
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
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const pages = pdfDoc.getPages();
      const totalPages = pages.length;
      const fontSize = 11;
      const margin = 28;

      pages.forEach((page, index) => {
        const { width, height } = page.getSize();
        const pageNum = `${index + 1} / ${totalPages}`;
        const textWidth = font.widthOfTextAtSize(pageNum, fontSize);

        let x = (width - textWidth) / 2;
        let y: number;

        if (position === "header") {
          y = height - margin;
        } else if (position === "footer") {
          y = margin - fontSize / 2;
        } else {
          // center (vertically centered, horizontally centered)
          y = height / 2;
          x = (width - textWidth) / 2;
        }

        page.drawText(pageNum, {
          x,
          y,
          size: fontSize,
          font,
          color: rgb(0.2, 0.2, 0.2),
          opacity: 0.85,
        });
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], {
        type: "application/pdf",
      });
      setResult({ blob, name: `numbered-${file.name}`, totalPages });
      toast.success(`Page numbers added to ${totalPages} page(s)`);
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Failed to add page numbers. Please try again.";
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
    setPosition("footer");
    setResult(null);
    setError(null);
  };

  const positionOptions: {
    value: NumberPosition;
    label: string;
    desc: string;
  }[] = [
    { value: "header", label: "Header", desc: "Top center of each page" },
    { value: "footer", label: "Footer", desc: "Bottom center of each page" },
    { value: "center", label: "Center", desc: "Middle of each page" },
  ];

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6"
          data-ocid="page_numbers_pdf.cancel_button"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to PDF Tools
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Add Page Numbers</CardTitle>
            <CardDescription>
              Automatically add page numbers to every page in your PDF. Choose
              the position.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!result && !processing && (
              // biome-ignore lint/complexity/noUselessFragments: conditional ternary needs wrapper
              <>
                {!file ? (
                  <div data-ocid="page_numbers_pdf.dropzone">
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

                    {/* Position */}
                    <div className="space-y-3">
                      <Label>Number position</Label>
                      <div
                        className="grid grid-cols-3 gap-3"
                        data-ocid="page_numbers_pdf.select"
                      >
                        {positionOptions.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setPosition(opt.value)}
                            className={`p-3 rounded-lg border text-left transition-colors ${
                              position === opt.value
                                ? "bg-primary/10 border-primary text-primary"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <p className="font-medium text-sm">{opt.label}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {opt.desc}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-300 text-xs">
                      Numbers will be formatted as "1 / {pageCount}" on each
                      page.
                    </div>

                    {error && (
                      <div
                        className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
                        data-ocid="page_numbers_pdf.error_state"
                      >
                        {error}
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={reset}
                        className="flex-1"
                        data-ocid="page_numbers_pdf.secondary_button"
                      >
                        Change File
                      </Button>
                      <Button
                        onClick={addPageNumbers}
                        className="flex-1"
                        size="lg"
                        data-ocid="page_numbers_pdf.primary_button"
                      >
                        <BookOpen className="mr-2 h-4 w-4" />
                        Add Page Numbers
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}

            {processing && (
              <div data-ocid="page_numbers_pdf.loading_state">
                <ProcessingState message="Adding page numbers... Please wait." />
              </div>
            )}

            {result && (
              <div
                className="space-y-4"
                data-ocid="page_numbers_pdf.success_state"
              >
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="font-medium text-green-400">
                    Page numbers added successfully!
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {result.totalPages} page{result.totalPages !== 1 ? "s" : ""}{" "}
                    numbered · Position: {position}
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
