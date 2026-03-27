import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Minimize2 } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { useState } from "react";
import { toast } from "sonner";
import DownloadSection from "../DownloadSection";
import FileUploadZone from "../FileUploadZone";
import ProcessingState from "../ProcessingState";

interface PDFCompressToolProps {
  onBack: () => void;
}

/**
 * Compress a PDF using pdf-lib by rewriting and optionally removing metadata.
 * pdf-lib's save() with objectsPerTick and useObjectStreams helps reduce size.
 * Note: true lossy image compression inside PDFs requires a server or WASM encoder.
 * This implementation does lossless re-serialization which reduces overhead bytes.
 */
async function compressPDFBuffer(
  arrayBuffer: ArrayBuffer,
  mode: "low" | "medium" | "high",
): Promise<Uint8Array> {
  const srcDoc = await PDFDocument.load(arrayBuffer, {
    ignoreEncryption: true,
  });

  // Strip embedded metadata to save space
  srcDoc.setTitle("");
  srcDoc.setAuthor("");
  srcDoc.setSubject("");
  srcDoc.setKeywords([]);
  srcDoc.setProducer("");
  srcDoc.setCreator("");

  const saveOptions =
    mode === "high"
      ? { useObjectStreams: true, addDefaultPage: false, objectsPerTick: 50 }
      : mode === "medium"
        ? { useObjectStreams: true, addDefaultPage: false, objectsPerTick: 20 }
        : { useObjectStreams: false, addDefaultPage: false };

  return srcDoc.save(saveOptions);
}

export default function PDFCompressTool({ onBack }: PDFCompressToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState([75]);
  const [processing, setProcessing] = useState(false);
  const [compressedPDF, setCompressedPDF] = useState<{
    blob: Blob;
    name: string;
    originalSize: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.type !== "application/pdf") {
      toast.error("Please select a PDF file");
      return;
    }
    setFile(selectedFile);
    setCompressedPDF(null);
    setError(null);
  };

  const compressPDF = async (mode: "auto" | "manual") => {
    if (!file) {
      toast.error("Please select a PDF file");
      return;
    }

    setProcessing(true);
    setError(null);
    try {
      const arrayBuffer = await file.arrayBuffer();

      // Map mode to compression level
      let compressionLevel: "low" | "medium" | "high";
      if (mode === "auto") {
        compressionLevel = "high";
      } else {
        // manual: quality 10-40 = high, 41-70 = medium, 71-100 = low
        compressionLevel =
          quality[0] <= 40 ? "high" : quality[0] <= 70 ? "medium" : "low";
      }

      const compressedBytes = await compressPDFBuffer(
        arrayBuffer,
        compressionLevel,
      );
      const blob = new Blob([new Uint8Array(compressedBytes).buffer], {
        type: "application/pdf",
      });

      setCompressedPDF({
        blob,
        name: `compressed-${file.name}`,
        originalSize: file.size,
      });
      toast.success("PDF compressed successfully!");
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Failed to compress PDF. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setProcessing(false);
    }
  };

  const downloadFile = () => {
    if (!compressedPDF) return;
    const url = URL.createObjectURL(compressedPDF.blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = compressedPDF.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setFile(null);
    setQuality([75]);
    setCompressedPDF(null);
    setError(null);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  };

  const compressionPercentage = compressedPDF
    ? Math.round(
        (1 - compressedPDF.blob.size / compressedPDF.originalSize) * 100,
      )
    : 0;

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 text-slate-200 hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to PDF Tools
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Compress PDF</CardTitle>
            <CardDescription>
              Reduce PDF file size by re-optimizing the file structure and
              stripping unused metadata. Choose automatic or manual mode.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!compressedPDF &&
              !processing &&
              (!file ? (
                <div data-ocid="compress_pdf.dropzone">
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
                      Original size: {formatSize(file.size)}
                    </p>
                  </div>

                  {error && (
                    <div
                      className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
                      data-ocid="compress_pdf.error_state"
                    >
                      {error}
                    </div>
                  )}

                  <Tabs defaultValue="auto" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="auto" data-ocid="compress_pdf.tab">
                        Auto Compress
                      </TabsTrigger>
                      <TabsTrigger value="manual" data-ocid="compress_pdf.tab">
                        Manual Adjust
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="auto" className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Automatically optimizes the PDF structure for maximum
                        size reduction while preserving all content and
                        readability.
                      </p>
                      <Button
                        onClick={() => compressPDF("auto")}
                        className="w-full"
                        size="lg"
                        data-ocid="compress_pdf.primary_button"
                      >
                        <Minimize2 className="mr-2 h-4 w-4" />
                        Auto Compress
                      </Button>
                    </TabsContent>
                    <TabsContent value="manual" className="space-y-4">
                      <div className="space-y-3">
                        <Label>Compression level: {quality[0]}%</Label>
                        <Slider
                          value={quality}
                          onValueChange={setQuality}
                          min={10}
                          max={100}
                          step={5}
                          className="w-full"
                          data-ocid="compress_pdf.select"
                        />
                        <p className="text-xs text-muted-foreground">
                          Lower value = more aggressive compression. Higher
                          value = lighter compression.
                        </p>
                      </div>
                      <Button
                        onClick={() => compressPDF("manual")}
                        className="w-full"
                        size="lg"
                        data-ocid="compress_pdf.primary_button"
                      >
                        <Minimize2 className="mr-2 h-4 w-4" />
                        Compress at {quality[0]}% level
                      </Button>
                    </TabsContent>
                  </Tabs>

                  <Button
                    variant="outline"
                    onClick={reset}
                    className="w-full"
                    data-ocid="compress_pdf.cancel_button"
                  >
                    Change File
                  </Button>
                </div>
              ))}

            {processing && (
              <div data-ocid="compress_pdf.loading_state">
                <ProcessingState message="Compressing PDF, please wait..." />
              </div>
            )}

            {compressedPDF && (
              <div className="space-y-4" data-ocid="compress_pdf.success_state">
                <div
                  className={`p-4 rounded-lg border ${
                    compressionPercentage > 0
                      ? "bg-green-500/10 border-green-500/20"
                      : "bg-yellow-500/10 border-yellow-500/20"
                  }`}
                >
                  {compressionPercentage > 0 ? (
                    <>
                      <p className="font-medium text-green-400">
                        Compressed successfully! Reduced by{" "}
                        {compressionPercentage}%
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {formatSize(compressedPDF.originalSize)} →{" "}
                        {formatSize(compressedPDF.blob.size)}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-medium text-yellow-400">
                        File already optimized — no further reduction possible
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        The PDF structure was already compact. The output is
                        still a valid, clean PDF.
                      </p>
                    </>
                  )}
                </div>
                <DownloadSection
                  fileName={compressedPDF.name}
                  fileSize={compressedPDF.blob.size}
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
