import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Download, Image, X } from "lucide-react";
import * as pdfjs from "pdfjs-dist";
import { useRef, useState } from "react";
import { toast } from "sonner";

// Set up the PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

interface PDFToPNGToolProps {
  onBack: () => void;
}

interface ConvertedPage {
  dataUrl: string;
  pageNumber: number;
  blob: Blob;
}

export default function PDFToPNGTool({ onBack }: PDFToPNGToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [pages, setPages] = useState<ConvertedPage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.type !== "application/pdf") {
      toast.error("Please select a PDF file");
      return;
    }
    setFile(selectedFile);
    setPages([]);
    setError(null);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const convertToPNG = async () => {
    if (!file) return;
    setProcessing(true);
    setError(null);
    setProgress(0);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      const totalPages = pdf.numPages;
      const convertedPages: ConvertedPage[] = [];

      for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 2.0 });

        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d");

        if (!ctx) throw new Error("Could not get canvas context");

        // Transparent background for PNG
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        await page.render({ canvasContext: ctx, viewport, canvas }).promise;

        const dataUrl = canvas.toDataURL("image/png");
        const blob = await (await fetch(dataUrl)).blob();

        convertedPages.push({ dataUrl, pageNumber: pageNum, blob });
        setProgress(Math.round((pageNum / totalPages) * 100));
      }

      setPages(convertedPages);
      toast.success(
        `Converted ${totalPages} page${totalPages > 1 ? "s" : ""} to PNG!`,
      );
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Failed to convert PDF. The file may be corrupted or password-protected.";
      setError(msg);
      toast.error(msg);
    } finally {
      setProcessing(false);
      setProgress(0);
    }
  };

  const downloadPage = (page: ConvertedPage) => {
    const a = document.createElement("a");
    a.href = page.dataUrl;
    a.download = `${file?.name?.replace(".pdf", "") || "page"}-page-${page.pageNumber}.png`;
    a.click();
  };

  const downloadAll = () => {
    for (const page of pages) {
      setTimeout(() => downloadPage(page), (page.pageNumber - 1) * 300);
    }
  };

  const reset = () => {
    setFile(null);
    setPages([]);
    setError(null);
  };

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6"
          data-ocid="pdf_to_png.back_button"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to PDF Tools
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">PDF to PNG</CardTitle>
            <CardDescription>
              Convert each PDF page to a high-quality PNG image. Download pages
              individually.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {pages.length === 0 && !processing && (
              <>
                {/* Drop Zone */}
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onClick={() => fileInputRef.current?.click()}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
                      fileInputRef.current?.click();
                  }}
                  // biome-ignore lint/a11y/useSemanticElements: drag-and-drop zone requires div
                  role="button"
                  tabIndex={0}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    dragOver
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50 bg-muted/30"
                  }`}
                  data-ocid="pdf_to_png.dropzone"
                >
                  <Image className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-base font-medium mb-1">
                    {file ? file.name : "Click to upload PDF or drag and drop"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {file
                      ? `${(file.size / 1024 / 1024).toFixed(2)} MB — ready to convert`
                      : "PDF files only"}
                  </p>
                  {file && (
                    <button
                      type="button"
                      className="mt-2 text-xs text-muted-foreground hover:text-foreground"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                      }}
                    >
                      <X className="inline h-3 w-3 mr-1" />
                      Remove
                    </button>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileInput}
                    className="hidden"
                    data-ocid="pdf_to_png.upload_button"
                  />
                </div>

                {error && (
                  <div
                    className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
                    data-ocid="pdf_to_png.error_state"
                  >
                    {error}
                  </div>
                )}

                {file && (
                  <Button
                    onClick={convertToPNG}
                    className="w-full"
                    size="lg"
                    data-ocid="pdf_to_png.primary_button"
                  >
                    <Image className="mr-2 h-4 w-4" />
                    Convert to PNG
                  </Button>
                )}
              </>
            )}

            {/* Loading state */}
            {processing && (
              <div
                className="space-y-4 text-center"
                data-ocid="pdf_to_png.loading_state"
              >
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
                <p className="text-muted-foreground font-medium">
                  Converting PDF pages to PNG...
                </p>
                {progress > 0 && (
                  <div className="space-y-1">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {progress}% complete
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Results */}
            {pages.length > 0 && (
              <div className="space-y-4" data-ocid="pdf_to_png.success_state">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">
                    {pages.length} page{pages.length > 1 ? "s" : ""} converted
                  </h3>
                  <div className="flex gap-2">
                    {pages.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={downloadAll}
                        data-ocid="pdf_to_png.secondary_button"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download All
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={reset}
                      data-ocid="pdf_to_png.cancel_button"
                    >
                      <X className="mr-2 h-4 w-4" />
                      Convert Another
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pages.map((page) => (
                    <div
                      key={page.pageNumber}
                      className="border border-border rounded-lg overflow-hidden"
                      data-ocid={`pdf_to_png.item.${page.pageNumber}`}
                    >
                      <img
                        src={page.dataUrl}
                        alt={`Page ${page.pageNumber}`}
                        className="w-full object-contain bg-white"
                        style={{ maxHeight: "300px" }}
                      />
                      <div className="p-3 flex items-center justify-between bg-muted/30">
                        <span className="text-sm font-medium">
                          Page {page.pageNumber}
                        </span>
                        <Button
                          size="sm"
                          onClick={() => downloadPage(page)}
                          data-ocid={`pdf_to_png.download_button.${page.pageNumber}`}
                        >
                          <Download className="mr-1 h-3 w-3" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
