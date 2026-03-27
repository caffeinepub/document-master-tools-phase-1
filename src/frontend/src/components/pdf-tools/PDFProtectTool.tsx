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
import { AlertTriangle, ArrowLeft, Eye, EyeOff, Lock } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { useState } from "react";
import { toast } from "sonner";
import DownloadSection from "../DownloadSection";
import FileUploadZone from "../FileUploadZone";
import ProcessingState from "../ProcessingState";

interface PDFProtectToolProps {
  onBack: () => void;
}

/**
 * Applies AES-256-CBC encryption to raw PDF bytes using the Web Crypto API,
 * then wraps the result in a custom binary format that PDFUnlockTool can reverse.
 *
 * Format: [ magic(8) | iv(16) | encryptedData ]
 * Magic: "DMTPROT1" (DocMasterTools Protected v1)
 *
 * NOTE: This is not standard PDF encryption. The output .pdf file will need
 * to be unlocked with our Unlock PDF tool before being opened in a PDF reader.
 */
async function encryptPDFBytes(
  pdfBytes: Uint8Array<ArrayBuffer>,
  password: string,
): Promise<Uint8Array> {
  const enc = new TextEncoder();
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
    ["encrypt"],
  );

  const iv = crypto.getRandomValues(new Uint8Array(16));
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-CBC", iv },
    aesKey,
    pdfBytes,
  );

  const magic = enc.encode("DMTPROT1");
  const result = new Uint8Array(
    magic.length + iv.length + encrypted.byteLength,
  );
  result.set(magic, 0);
  result.set(iv, magic.length);
  result.set(new Uint8Array(encrypted), magic.length + iv.length);
  return result;
}

export default function PDFProtectTool({ onBack }: PDFProtectToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<{ blob: Blob; name: string } | null>(
    null,
  );
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

  const protectPDF = async () => {
    if (!file) {
      toast.error("Please upload a PDF file first");
      return;
    }
    if (!password.trim()) {
      setError("Please enter a password");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }

    setProcessing(true);
    setError(null);
    try {
      const arrayBuffer = await file.arrayBuffer();
      // Verify it's a valid PDF first
      await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

      // Encrypt the raw PDF bytes with AES-256-CBC
      const pdfBytes = new Uint8Array(arrayBuffer as ArrayBuffer);
      const encryptedBytes = await encryptPDFBytes(pdfBytes, password);
      const blob = new Blob([encryptedBytes.buffer as ArrayBuffer], {
        type: "application/pdf",
      });
      setResult({ blob, name: `protected-${file.name}` });
      toast.success("PDF encrypted successfully!");
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Failed to protect PDF. Please try again.";
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
    setConfirmPassword("");
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
          data-ocid="protect_pdf.cancel_button"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to PDF Tools
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Protect PDF</CardTitle>
            <CardDescription>
              Encrypt your PDF with a password using AES-256 encryption. Use the
              Unlock PDF tool to decrypt it.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!result && !processing && (
              // biome-ignore lint/complexity/noUselessFragments: conditional ternary needs wrapper
              <>
                {!file ? (
                  <div data-ocid="protect_pdf.dropzone">
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
                      <Label htmlFor="protect-password">Password</Label>
                      <div className="relative">
                        <Input
                          id="protect-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter password (min. 4 characters)"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pr-10"
                          data-ocid="protect_pdf.input"
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

                    {/* Confirm password */}
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm password</Label>
                      <Input
                        id="confirm-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Re-enter password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        data-ocid="protect_pdf.input"
                      />
                    </div>

                    <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-300 text-xs flex gap-2">
                      <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>
                        The protected file uses AES-256 encryption and must be
                        unlocked with our Unlock PDF tool. Keep your password
                        safe — it cannot be recovered.
                      </span>
                    </div>

                    {error && (
                      <div
                        className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
                        data-ocid="protect_pdf.error_state"
                      >
                        {error}
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={reset}
                        className="flex-1"
                        data-ocid="protect_pdf.secondary_button"
                      >
                        Change File
                      </Button>
                      <Button
                        onClick={protectPDF}
                        className="flex-1"
                        size="lg"
                        disabled={!password || !confirmPassword}
                        data-ocid="protect_pdf.primary_button"
                      >
                        <Lock className="mr-2 h-4 w-4" />
                        Protect PDF
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}

            {processing && (
              <div data-ocid="protect_pdf.loading_state">
                <ProcessingState message="Encrypting PDF... Please wait." />
              </div>
            )}

            {result && (
              <div className="space-y-4" data-ocid="protect_pdf.success_state">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="font-medium text-green-400">
                    PDF encrypted successfully!
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your PDF is protected with AES-256 encryption. Use the
                    Unlock PDF tool to remove protection.
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
