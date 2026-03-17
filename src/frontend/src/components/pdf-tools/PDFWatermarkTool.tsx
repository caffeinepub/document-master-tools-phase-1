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
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Droplets } from "lucide-react";
import { PDFDocument, StandardFonts, degrees, rgb } from "pdf-lib";
import { useState } from "react";
import { toast } from "sonner";
import DownloadSection from "../DownloadSection";
import FileUploadZone from "../FileUploadZone";
import ProcessingState from "../ProcessingState";

interface PDFWatermarkToolProps {
  onBack: () => void;
}

type WatermarkPosition = "center" | "top" | "bottom";

export default function PDFWatermarkTool({ onBack }: PDFWatermarkToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [watermarkText, setWatermarkText] = useState("CONFIDENTIAL");
  const [position, setPosition] = useState<WatermarkPosition>("center");
  const [opacity, setOpacity] = useState([40]);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<{ blob: Blob; name: string } | null>(
    null,
  );
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

  const addWatermark = async () => {
    if (!file) {
      toast.error("Please upload a PDF file first");
      return;
    }
    if (!watermarkText.trim()) {
      toast.error("Please enter watermark text");
      return;
    }

    setProcessing(true);
    setError(null);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, {
        ignoreEncryption: true,
      });
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const pages = pdfDoc.getPages();
      const opacityVal = opacity[0] / 100;

      for (const page of pages) {
        const { width, height } = page.getSize();
        const fontSize = Math.min(width, height) * 0.08;
        const textWidth = font.widthOfTextAtSize(watermarkText, fontSize);

        let x: number;
        let y: number;
        let rotate: number;

        if (position === "center") {
          // Diagonal watermark across the page
          x = (width - textWidth) / 2;
          y = height / 2 - fontSize / 2;
          rotate = 45;
        } else if (position === "top") {
          x = (width - textWidth) / 2;
          y = height - fontSize * 2;
          rotate = 0;
        } else {
          // bottom
          x = (width - textWidth) / 2;
          y = fontSize;
          rotate = 0;
        }

        page.drawText(watermarkText, {
          x,
          y,
          size: fontSize,
          font,
          color: rgb(0.5, 0.5, 0.5),
          opacity: opacityVal,
          rotate: degrees(rotate),
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], {
        type: "application/pdf",
      });
      setResult({ blob, name: `watermarked-${file.name}` });
      toast.success(`Watermark added to ${pages.length} page(s)`);
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Failed to add watermark. Please try again.";
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
    setWatermarkText("CONFIDENTIAL");
    setPosition("center");
    setOpacity([40]);
    setResult(null);
    setError(null);
  };

  const positionOptions: { value: WatermarkPosition; label: string }[] = [
    { value: "center", label: "Center (diagonal)" },
    { value: "top", label: "Top" },
    { value: "bottom", label: "Bottom" },
  ];

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6"
          data-ocid="watermark_pdf.cancel_button"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to PDF Tools
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Add Watermark</CardTitle>
            <CardDescription>
              Apply a text watermark to every page of your PDF. Control position
              and opacity.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!result && !processing && (
              // biome-ignore lint/complexity/noUselessFragments: conditional ternary needs wrapper
              <>
                {!file ? (
                  <div data-ocid="watermark_pdf.dropzone">
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

                    {/* Watermark text */}
                    <div className="space-y-2">
                      <Label htmlFor="watermark-text">Watermark text</Label>
                      <Input
                        id="watermark-text"
                        placeholder="e.g. CONFIDENTIAL, DRAFT, COPY"
                        value={watermarkText}
                        onChange={(e) => setWatermarkText(e.target.value)}
                        maxLength={50}
                        data-ocid="watermark_pdf.input"
                      />
                    </div>

                    {/* Position */}
                    <div className="space-y-2">
                      <Label>Position</Label>
                      <div
                        className="flex gap-3"
                        data-ocid="watermark_pdf.select"
                      >
                        {positionOptions.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setPosition(opt.value)}
                            className={`flex-1 py-2 px-1 rounded-lg border text-xs font-medium transition-colors ${
                              position === opt.value
                                ? "bg-primary text-primary-foreground border-primary"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Opacity */}
                    <div className="space-y-3">
                      <Label>Opacity: {opacity[0]}%</Label>
                      <Slider
                        value={opacity}
                        onValueChange={setOpacity}
                        min={10}
                        max={100}
                        step={5}
                        className="w-full"
                        data-ocid="watermark_pdf.select"
                      />
                      <p className="text-xs text-muted-foreground">
                        Lower opacity makes the watermark more subtle.
                      </p>
                    </div>

                    {error && (
                      <div
                        className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
                        data-ocid="watermark_pdf.error_state"
                      >
                        {error}
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={reset}
                        className="flex-1"
                        data-ocid="watermark_pdf.secondary_button"
                      >
                        Change File
                      </Button>
                      <Button
                        onClick={addWatermark}
                        className="flex-1"
                        size="lg"
                        disabled={!watermarkText.trim()}
                        data-ocid="watermark_pdf.primary_button"
                      >
                        <Droplets className="mr-2 h-4 w-4" />
                        Add Watermark
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}

            {processing && (
              <div data-ocid="watermark_pdf.loading_state">
                <ProcessingState message="Adding watermark to all pages... Please wait." />
              </div>
            )}

            {result && (
              <div
                className="space-y-4"
                data-ocid="watermark_pdf.success_state"
              >
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="font-medium text-green-400">
                    Watermark added successfully!
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Text: "{watermarkText}" · Position: {position} · Opacity:{" "}
                    {opacity[0]}%
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
