import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Plus, X } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { useState } from "react";
import { toast } from "sonner";
import DownloadSection from "../DownloadSection";
import ProcessingState from "../ProcessingState";

interface PDFMergeToolProps {
  onBack: () => void;
}

export default function PDFMergeTool({ onBack }: PDFMergeToolProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [mergedPDF, setMergedPDF] = useState<{
    blob: Blob;
    name: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const addFiles = (newFiles: File[]) => {
    const pdfs = newFiles.filter((f) => f.type === "application/pdf");
    const rejected = newFiles.length - pdfs.length;
    if (rejected > 0) {
      toast.error(`${rejected} file(s) skipped — only PDF files are allowed`);
    }
    if (pdfs.length > 0) {
      setFiles((prev) => [...prev, ...pdfs]);
      setError(null);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(Array.from(e.target.files));
      // Reset input so the same file can be re-added after removal
      e.target.value = "";
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    addFiles(Array.from(e.dataTransfer.files));
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const mergePDFs = async () => {
    if (files.length < 2) {
      toast.error("Please select at least 2 PDF files to merge");
      return;
    }

    setProcessing(true);
    setError(null);
    try {
      const mergedDoc = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        let srcDoc: PDFDocument;
        try {
          srcDoc = await PDFDocument.load(arrayBuffer, {
            ignoreEncryption: true,
          });
        } catch {
          throw new Error(
            `Could not read "${file.name}". The file may be corrupted or password-protected.`,
          );
        }
        const copiedPages = await mergedDoc.copyPages(
          srcDoc,
          srcDoc.getPageIndices(),
        );
        for (const page of copiedPages) {
          mergedDoc.addPage(page);
        }
      }

      const pdfBytes = await mergedDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes).buffer], {
        type: "application/pdf",
      });
      setMergedPDF({ blob, name: "merged-document.pdf" });
      toast.success(
        `PDFs merged successfully! (${mergedDoc.getPageCount()} pages)`,
      );
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Failed to merge PDFs. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setProcessing(false);
    }
  };

  const downloadFile = () => {
    if (!mergedPDF) return;
    const url = URL.createObjectURL(mergedPDF.blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = mergedPDF.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setFiles([]);
    setMergedPDF(null);
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
            <CardTitle className="text-2xl">Merge PDF Files</CardTitle>
            <CardDescription>
              Combine multiple PDF files into a single document. Upload at least
              2 PDF files to get started.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!mergedPDF && !processing && (
              <>
                {/* Drop Zone */}
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onClick={() =>
                    document.getElementById("merge-file-input")?.click()
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
                      document.getElementById("merge-file-input")?.click();
                  }}
                  // biome-ignore lint/a11y/useSemanticElements: drag-and-drop zone requires div
                  role="button"
                  tabIndex={0}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    dragOver
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50 bg-muted/30"
                  }`}
                  data-ocid="merge_pdf.dropzone"
                >
                  <Plus className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-base font-medium mb-1">
                    Click to add PDF files or drag and drop
                  </p>
                  <p className="text-sm text-muted-foreground">
                    You can add multiple files — all will be merged in order
                  </p>
                  <input
                    id="merge-file-input"
                    type="file"
                    accept="application/pdf"
                    multiple
                    onChange={handleFileInput}
                    className="hidden"
                    data-ocid="merge_pdf.upload_button"
                  />
                </div>

                {files.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-medium">
                      Selected Files ({files.length}) — merge order top to
                      bottom
                    </h3>
                    {files.map((file, index) => (
                      <div
                        key={`${file.name}-${index}`}
                        className="flex items-center justify-between p-3 bg-muted rounded-lg"
                        data-ocid={`merge_pdf.item.${index + 1}`}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <span className="text-sm font-bold text-muted-foreground w-6 shrink-0">
                            {index + 1}.
                          </span>
                          <div className="min-w-0">
                            <p className="font-medium text-sm truncate">
                              {file.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                          data-ocid={`merge_pdf.delete_button.${index + 1}`}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}

                    {error && (
                      <div
                        className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
                        data-ocid="merge_pdf.error_state"
                      >
                        {error}
                      </div>
                    )}

                    <Button
                      onClick={mergePDFs}
                      className="w-full"
                      size="lg"
                      disabled={files.length < 2}
                      data-ocid="merge_pdf.primary_button"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Merge {files.length} PDFs
                    </Button>
                  </div>
                )}
              </>
            )}

            {processing && (
              <div data-ocid="merge_pdf.loading_state">
                <ProcessingState message="Merging PDF files... Please wait." />
              </div>
            )}

            {mergedPDF && (
              <div data-ocid="merge_pdf.success_state">
                <DownloadSection
                  fileName={mergedPDF.name}
                  fileSize={mergedPDF.blob.size}
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
