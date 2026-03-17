import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, FileOutput, Plus, X } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface PNGToPDFToolProps {
  onBack: () => void;
}

interface SelectedImage {
  file: File;
  previewUrl: string;
}

export default function PNGToPDFTool({ onBack }: PNGToPDFToolProps) {
  const [images, setImages] = useState<SelectedImage[]>([]);
  const [processing, setProcessing] = useState(false);
  const [pdfResult, setPdfResult] = useState<{
    blob: Blob;
    name: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addImages = (files: File[]) => {
    const pngFiles = files.filter(
      (f) =>
        f.type === "image/png" ||
        f.type === "image/jpeg" ||
        f.type === "image/jpg" ||
        f.name.match(/\.(png|jpg|jpeg)$/i),
    );
    const rejected = files.length - pngFiles.length;
    if (rejected > 0) {
      toast.error(
        `${rejected} file(s) skipped — only PNG/JPG images are allowed`,
      );
    }
    if (pngFiles.length > 0) {
      const newImages = pngFiles.map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      }));
      setImages((prev) => [...prev, ...newImages]);
      setError(null);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addImages(Array.from(e.target.files));
      e.target.value = "";
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    addImages(Array.from(e.dataTransfer.files));
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[index].previewUrl);
      return prev.filter((_, i) => i !== index);
    });
  };

  const convertToPDF = async () => {
    if (images.length === 0) return;
    setProcessing(true);
    setError(null);

    try {
      const pdfDoc = await PDFDocument.create();

      for (const { file } of images) {
        const arrayBuffer = await file.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);

        let embeddedImage: Awaited<ReturnType<typeof pdfDoc.embedPng>>;
        const isPng = file.type === "image/png" || file.name.match(/\.png$/i);

        try {
          if (isPng) {
            embeddedImage = await pdfDoc.embedPng(bytes);
          } else {
            embeddedImage = await pdfDoc.embedJpg(bytes);
          }
        } catch {
          throw new Error(
            `Could not embed "${file.name}". The image may be corrupted or in an unsupported format.`,
          );
        }

        const { width, height } = embeddedImage.scale(1);

        // A4 size in points: 595 x 842
        // Scale image to fit within A4, preserving aspect ratio
        const maxWidth = 595;
        const maxHeight = 842;
        const scaleX = maxWidth / width;
        const scaleY = maxHeight / height;
        const scale = Math.min(scaleX, scaleY, 1);

        const imgWidth = width * scale;
        const imgHeight = height * scale;

        const page = pdfDoc.addPage([maxWidth, maxHeight]);
        page.drawImage(embeddedImage, {
          x: (maxWidth - imgWidth) / 2,
          y: (maxHeight - imgHeight) / 2,
          width: imgWidth,
          height: imgHeight,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], {
        type: "application/pdf",
      });
      setPdfResult({ blob, name: "images-to-pdf.pdf" });
      toast.success(
        `Combined ${images.length} image${images.length > 1 ? "s" : ""} into a PDF!`,
      );
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Failed to convert images to PDF. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setProcessing(false);
    }
  };

  const downloadPDF = () => {
    if (!pdfResult) return;
    const url = URL.createObjectURL(pdfResult.blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = pdfResult.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    for (const img of images) {
      URL.revokeObjectURL(img.previewUrl);
    }
    setImages([]);
    setPdfResult(null);
    setError(null);
  };

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6"
          data-ocid="png_to_pdf.back_button"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to PDF Tools
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">PNG to PDF</CardTitle>
            <CardDescription>
              Combine multiple PNG or JPG images into a single PDF document.
              Images are added in the order shown.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!pdfResult && !processing && (
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
                  data-ocid="png_to_pdf.dropzone"
                >
                  <Plus className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-base font-medium mb-1">
                    Click to add PNG/JPG images or drag and drop
                  </p>
                  <p className="text-sm text-muted-foreground">
                    You can add multiple images — all will be combined in order
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,.png,.jpg,.jpeg"
                    multiple
                    onChange={handleFileInput}
                    className="hidden"
                    data-ocid="png_to_pdf.upload_button"
                  />
                </div>

                {/* Image list */}
                {images.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-medium">
                      Selected Images ({images.length}) — PDF page order top to
                      bottom
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {images.map((img, index) => (
                        <div
                          key={`${img.file.name}-${index}`}
                          className="flex items-center gap-3 p-3 bg-muted rounded-lg"
                          data-ocid={`png_to_pdf.item.${index + 1}`}
                        >
                          <span className="text-sm font-bold text-muted-foreground w-5 shrink-0">
                            {index + 1}.
                          </span>
                          <img
                            src={img.previewUrl}
                            alt={img.file.name}
                            className="w-12 h-12 object-cover rounded border border-border shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {img.file.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {(img.file.size / 1024).toFixed(0)} KB
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeImage(index)}
                            data-ocid={`png_to_pdf.delete_button.${index + 1}`}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    {error && (
                      <div
                        className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
                        data-ocid="png_to_pdf.error_state"
                      >
                        {error}
                      </div>
                    )}

                    <Button
                      onClick={convertToPDF}
                      className="w-full"
                      size="lg"
                      data-ocid="png_to_pdf.primary_button"
                    >
                      <FileOutput className="mr-2 h-4 w-4" />
                      Convert {images.length} Image
                      {images.length > 1 ? "s" : ""} to PDF
                    </Button>
                  </div>
                )}
              </>
            )}

            {/* Loading state */}
            {processing && (
              <div
                className="space-y-4 text-center"
                data-ocid="png_to_pdf.loading_state"
              >
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
                <p className="text-muted-foreground font-medium">
                  Combining images into PDF...
                </p>
              </div>
            )}

            {/* Download result */}
            {pdfResult && (
              <div className="space-y-4" data-ocid="png_to_pdf.success_state">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-green-400 font-medium">
                    PDF created successfully!
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {(pdfResult.blob.size / 1024).toFixed(0)} KB
                  </p>
                </div>
                <Button
                  onClick={downloadPDF}
                  className="w-full"
                  size="lg"
                  data-ocid="png_to_pdf.primary_button"
                >
                  <FileOutput className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
                <Button
                  variant="outline"
                  onClick={reset}
                  className="w-full"
                  data-ocid="png_to_pdf.cancel_button"
                >
                  Convert More Images
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
