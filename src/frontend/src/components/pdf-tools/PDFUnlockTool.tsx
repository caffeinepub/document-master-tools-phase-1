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
import { ArrowLeft, Eye, EyeOff, Unlock } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { useState } from "react";
import { toast } from "sonner";
import DownloadSection from "../DownloadSection";
import FileUploadZone from "../FileUploadZone";
import ProcessingState from "../ProcessingState";

interface PDFUnlockToolProps {
  onBack: () => void;
}

const DMT_MAGIC = "DMTPROT1";

/**
 * Decrypts a PDF protected by our PDFProtectTool (AES-256-CBC).
 * Returns null if this is not our custom format.
 */
async function tryDecryptCustomFormat(
  bytes: Uint8Array,
  password: string,
): Promise<Uint8Array | null> {
  const enc = new TextEncoder();
  const magic = enc.encode(DMT_MAGIC);

  // Check magic header
  if (bytes.length < magic.length + 16) return null;
  for (let i = 0; i < magic.length; i++) {
    if (bytes[i] !== magic[i]) return null;
  }

  const iv = bytes.slice(magic.length, magic.length + 16);
  const encryptedData = bytes.slice(magic.length + 16);

  try {
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      enc.encode(password),
      { name: "PBKDF2" },
      false,
      ["deriveBits", "deriveKey"],
    );
    const salt = enc.encode("DocMasterToolsSalt2024");
    const aesKey = await crypto.subtle.deriveKey(
      { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
      keyMaterial,
      { name: "AES-CBC", length: 256 },
      false,
      ["decrypt"],
    );

    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-CBC", iv },
      aesKey,
      encryptedData,
    );
    return new Uint8Array(decrypted);
  } catch {
    return null;
  }
}

export default function PDFUnlockTool({ onBack }: PDFUnlockToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<{
    blob: Blob;
    name: string;
    pageCount: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.type !== "application/pdf") {
      toast.error("Please select a PDF file");
      return;
    }
    setFile(selectedFile);
    setResult(null);
    setError(null);
  };

  const unlockPDF = async () => {
    if (!file) {
      toast.error("Please upload a PDF file first");
      return;
    }

    setProcessing(true);
    setError(null);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const rawBytes = new Uint8Array(arrayBuffer);

      // Step 1: Try to decrypt our custom AES-256 format
      if (password) {
        const decrypted = await tryDecryptCustomFormat(rawBytes, password);
        if (decrypted) {
          // Validate it's a real PDF after decryption
          try {
            const pdfDoc = await PDFDocument.load(
              decrypted.buffer as ArrayBuffer,
              { ignoreEncryption: true },
            );
            const blob = new Blob([decrypted.buffer as ArrayBuffer], {
              type: "application/pdf",
            });
            setResult({
              blob,
              name: `unlocked-${file.name}`,
              pageCount: pdfDoc.getPageCount(),
            });
            toast.success("PDF unlocked successfully!");
            return;
          } catch {
            throw new Error(
              "Incorrect password or corrupted file. Please check the password and try again.",
            );
          }
        }
      }

      // Step 2: Try to load as standard PDF (may be unencrypted or already accessible)
      let pdfDoc: PDFDocument;
      try {
        pdfDoc = await PDFDocument.load(arrayBuffer, {
          ignoreEncryption: true,
        });
      } catch (loadErr) {
        const msg =
          loadErr instanceof Error ? loadErr.message.toLowerCase() : "";
        if (msg.includes("encrypt") || msg.includes("password")) {
          throw new Error(
            "This PDF appears to be encrypted with standard PDF password protection. " +
              "Our tool can unlock PDFs that were protected using our Protect PDF tool.",
          );
        }
        throw loadErr;
      }

      // Re-save without any encryption (pdf-lib saves clean by default)
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], {
        type: "application/pdf",
      });
      setResult({
        blob,
        name: `unlocked-${file.name}`,
        pageCount: pdfDoc.getPageCount(),
      });
      toast.success("PDF unlocked and saved successfully!");
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Failed to unlock PDF. Please check the password and try again.";
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
    setPassword("");
    setResult(null);
    setError(null);
  };

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6"
          data-ocid="unlock_pdf.cancel_button"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to PDF Tools
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Unlock PDF</CardTitle>
            <CardDescription>
              Remove password protection from PDFs protected with our Protect
              PDF tool. Enter the password to decrypt and download.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!result && !processing && (
              // biome-ignore lint/complexity/noUselessFragments: conditional ternary needs wrapper
              <>
                {!file ? (
                  <div data-ocid="unlock_pdf.dropzone">
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
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <Label htmlFor="unlock-password">Password</Label>
                      <div className="relative">
                        <Input
                          id="unlock-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter the PDF password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pr-10"
                          data-ocid="unlock_pdf.input"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          onClick={() => setShowPassword((v) => !v)}
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-300 text-xs">
                      Only unlock PDFs you are legally permitted to access. This
                      tool works with PDFs protected using our Protect PDF tool.
                    </div>

                    {error && (
                      <div
                        className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
                        data-ocid="unlock_pdf.error_state"
                      >
                        {error}
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={reset}
                        className="flex-1"
                        data-ocid="unlock_pdf.secondary_button"
                      >
                        Change File
                      </Button>
                      <Button
                        onClick={unlockPDF}
                        className="flex-1"
                        size="lg"
                        disabled={!password}
                        data-ocid="unlock_pdf.primary_button"
                      >
                        <Unlock className="mr-2 h-4 w-4" />
                        Unlock PDF
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}

            {processing && (
              <div data-ocid="unlock_pdf.loading_state">
                <ProcessingState message="Removing password protection... Please wait." />
              </div>
            )}

            {result && (
              <div className="space-y-4" data-ocid="unlock_pdf.success_state">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="font-medium text-green-400">
                    PDF unlocked successfully!
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {result.pageCount} page{result.pageCount !== 1 ? "s" : ""} —
                    password protection removed.
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
