import { useState, useCallback } from 'react';
import { ArrowLeft, Loader2, Camera, Minimize2, Maximize2, Crown, Zap, ToggleLeft, ToggleRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';
import BreadcrumbNavigation from '@/components/BreadcrumbNavigation';
import AdPlaceholder from '@/components/AdPlaceholder';
import RelatedTools from '@/components/RelatedTools';
import FileUploadZone from '@/components/FileUploadZone';
import BeforeAfterPreviewPanel from '@/components/image-tools/BeforeAfterPreviewPanel';
import AutoPhotoSizeGenerator from '@/components/image-tools/AutoPhotoSizeGenerator';
import AutoFeaturesPanel from '@/components/image-tools/AutoFeaturesPanel';
import ExportOptionsPanel from '@/components/image-tools/ExportOptionsPanel';
import ProPricingModal from '@/components/image-tools/ProPricingModal';
import { useProAccess } from '@/hooks/useProAccess';

const MAX_FREE_FIXES = 2;

function getTodayKey(): string {
  const d = new Date();
  return `sdf_fix_count_${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function getFixesUsedToday(): number {
  try {
    const val = localStorage.getItem(getTodayKey());
    return val ? parseInt(val, 10) : 0;
  } catch {
    return 0;
  }
}

function incrementFixesUsedToday(): number {
  try {
    const key = getTodayKey();
    const current = getFixesUsedToday();
    const next = current + 1;
    localStorage.setItem(key, String(next));
    return next;
  } catch {
    return 1;
  }
}

interface SmartDocumentFixerPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

export default function SmartDocumentFixerPage({ onBack, onNavigate }: SmartDocumentFixerPageProps) {
  const { isPro, devToggle } = useProAccess();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string>('');
  const [processedImageUrl, setProcessedImageUrl] = useState<string>('');
  const [processedCanvas, setProcessedCanvas] = useState<HTMLCanvasElement | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProModalOpen, setIsProModalOpen] = useState(false);
  const [fixesUsed, setFixesUsed] = useState<number>(() => getFixesUsedToday());

  const fixesRemaining = isPro ? Infinity : Math.max(0, MAX_FREE_FIXES - fixesUsed);
  const isFixLimitReached = !isPro && fixesUsed >= MAX_FREE_FIXES;

  const handleFileSelect = useCallback((file: File) => {
    if (originalImageUrl) URL.revokeObjectURL(originalImageUrl);
    if (processedImageUrl && processedImageUrl !== originalImageUrl) URL.revokeObjectURL(processedImageUrl);

    setUploadedFile(file);
    const url = URL.createObjectURL(file);
    setOriginalImageUrl(url);
    setProcessedImageUrl(url);
    setProcessedCanvas(null);
  }, [originalImageUrl, processedImageUrl]);

  const handleProcessed = useCallback((canvas: HTMLCanvasElement) => {
    setProcessedCanvas(canvas);
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        setProcessedImageUrl((prev) => {
          if (prev && prev !== originalImageUrl) URL.revokeObjectURL(prev);
          return url;
        });
      }
    }, 'image/jpeg', 0.95);
    setIsProcessing(false);
    // Increment fix counter for free users
    if (!isPro) {
      const newCount = incrementFixesUsedToday();
      setFixesUsed(newCount);
    }
  }, [originalImageUrl, isPro]);

  const handleProcessingStart = useCallback(() => {
    setIsProcessing(true);
  }, []);

  const handleFixAction = useCallback((originalAction: () => void) => {
    if (isFixLimitReached) {
      setIsProModalOpen(true);
      return;
    }
    originalAction();
  }, [isFixLimitReached]);

  const relatedTools = [
    {
      name: 'Passport Photo Maker',
      description: 'Create passport-size photos for India, US, UK, and Schengen visas.',
      icon: Camera,
      onClick: () => onNavigate('passport-photo-maker'),
    },
    {
      name: 'Image Compressor',
      description: 'Compress images to reduce file size without losing quality.',
      icon: Minimize2,
      onClick: () => onNavigate('image-compressor'),
    },
    {
      name: 'Custom Image Resize',
      description: 'Resize images to custom dimensions for social media and more.',
      icon: Maximize2,
      onClick: () => onNavigate('custom-image-resize'),
    },
  ];

  const breadcrumbItems = [
    { label: 'Home', onClick: () => onNavigate('home') },
    { label: 'Image Tools', onClick: () => onBack() },
    { label: 'Smart Document Fixer' },
  ];

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <SEO
          title="Smart Document Fixer - Free Online Photo Fix & Resize Tool | Document Master Tools"
          description="All-in-one smart document photo fixer. Resize for passport, Aadhaar, PAN, SSC, Railway, visa photos. Auto white background, compress, multi-copy layout, and export as HD JPG, PNG, or A4 PDF."
          canonicalUrl={`${window.location.origin}/smart-document-fixer`}
        />

        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Image Tools
        </Button>

        <BreadcrumbNavigation items={breadcrumbItems} />

        <AdPlaceholder adType="banner" className="mb-6" />

        {/* Header with Go Pro button */}
        <header className="mb-6">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Smart Document Fixer</h1>
              {isPro ? (
                <span className="inline-flex items-center gap-1 bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  <Crown className="w-3 h-3" />
                  PRO
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 bg-muted text-muted-foreground text-xs font-medium px-2.5 py-1 rounded-full border border-border">
                  FREE
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {/* Dev toggle */}
              <button
                onClick={devToggle}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded border border-border/50 hover:border-border"
                title="Dev: Toggle Pro status"
              >
                {isPro ? (
                  <ToggleRight className="w-4 h-4 text-amber-500" />
                ) : (
                  <ToggleLeft className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">Dev: {isPro ? 'Pro' : 'Free'}</span>
              </button>
              {!isPro && (
                <Button
                  onClick={() => setIsProModalOpen(true)}
                  size="sm"
                  className="bg-amber-500 hover:bg-amber-600 text-white border-0 gap-1.5"
                >
                  <Crown className="w-3.5 h-3.5" />
                  Go Pro
                </Button>
              )}
            </div>
          </div>

          {/* Fix counter for free users */}
          {!isPro && (
            <div className={`inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg border mb-3 ${
              isFixLimitReached
                ? 'bg-destructive/10 border-destructive/30 text-destructive'
                : fixesRemaining <= 1
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-400'
                : 'bg-muted border-border text-muted-foreground'
            }`}>
              <Zap className="w-3.5 h-3.5 flex-shrink-0" />
              {isFixLimitReached ? (
                <span>
                  Daily limit reached.{' '}
                  <button
                    onClick={() => setIsProModalOpen(true)}
                    className="underline font-semibold hover:no-underline"
                  >
                    Go Pro
                  </button>{' '}
                  for unlimited fixes or wait until tomorrow.
                </span>
              ) : (
                <span>
                  <strong>{fixesRemaining}</strong> of {MAX_FREE_FIXES} free fixes remaining today
                </span>
              )}
            </div>
          )}

          <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
            The all-in-one tool for fixing, resizing, and enhancing document photos. Instantly resize photos for
            government IDs — Passport, Aadhaar, PAN, SSC, Railway, Police/Army, and international visas. Apply
            auto white background, compress to target file size, generate multi-copy layouts, and export as HD JPG,
            PNG, or printable A4 PDF — all processed locally in your browser with zero uploads to any server.
          </p>
        </header>

        {/* Upload Section */}
        <section className="mb-8">
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Upload Your Photo</h2>
            <FileUploadZone
              onFileSelect={handleFileSelect}
              accept="image/*"
              description="Click to upload image or drag and drop (JPG, PNG, WEBP, BMP)"
            />
            {uploadedFile && (
              <p className="mt-3 text-sm text-muted-foreground">
                ✓ Loaded:{' '}
                <span className="font-medium text-foreground">{uploadedFile.name}</span>
                {' '}({(uploadedFile.size / 1024).toFixed(1)} KB)
              </p>
            )}
          </div>
        </section>

        {/* Fix limit reached banner */}
        {isFixLimitReached && uploadedFile && (
          <div className="mb-6 p-4 rounded-xl border border-destructive/30 bg-destructive/5 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex-1">
              <p className="font-semibold text-destructive text-sm">Daily fix limit reached</p>
              <p className="text-sm text-muted-foreground mt-0.5">
                Free users get {MAX_FREE_FIXES} fixes per day. Upgrade to Pro for unlimited fixes.
              </p>
            </div>
            <Button
              onClick={() => setIsProModalOpen(true)}
              size="sm"
              className="bg-amber-500 hover:bg-amber-600 text-white border-0 gap-1.5 flex-shrink-0"
            >
              <Crown className="w-3.5 h-3.5" />
              Upgrade to Pro
            </Button>
          </div>
        )}

        {/* Processing Indicator */}
        {isProcessing && (
          <div className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-card border border-border rounded-xl p-6 flex items-center gap-3 shadow-xl">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <span className="text-foreground font-medium">Processing image…</span>
            </div>
          </div>
        )}

        {/* Before/After Preview */}
        {originalImageUrl && (
          <section className="mb-8">
            <BeforeAfterPreviewPanel
              originalImageUrl={originalImageUrl}
              processedImageUrl={processedImageUrl}
              watermarkText={!isPro ? 'Document Master Tools – Free' : undefined}
            />
          </section>
        )}

        <AdPlaceholder adType="in-content" className="my-8" />

        {/* Main Controls — two-column on md+ */}
        {uploadedFile && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Auto Photo Size Generator */}
            <section>
              <div className="bg-card border border-border rounded-xl p-6 h-full">
                <h2 className="text-xl font-semibold text-foreground mb-4">Auto Photo Size Generator</h2>
                {isFixLimitReached ? (
                  <div className="flex flex-col items-center justify-center py-8 gap-3 text-center">
                    <p className="text-sm text-muted-foreground">Daily fix limit reached. Upgrade to Pro for unlimited fixes.</p>
                    <Button
                      onClick={() => setIsProModalOpen(true)}
                      size="sm"
                      className="bg-amber-500 hover:bg-amber-600 text-white border-0 gap-1.5"
                    >
                      <Crown className="w-3.5 h-3.5" />
                      Go Pro
                    </Button>
                  </div>
                ) : (
                  <AutoPhotoSizeGenerator
                    uploadedFile={uploadedFile}
                    onProcessed={(canvas) => handleFixAction(() => handleProcessed(canvas))}
                    onProcessingStart={handleProcessingStart}
                  />
                )}
              </div>
            </section>

            {/* Auto Enhancements */}
            <section>
              <div className="bg-card border border-border rounded-xl p-6 h-full">
                <h2 className="text-xl font-semibold text-foreground mb-4">Auto Enhancements</h2>
                <AutoFeaturesPanel
                  uploadedFile={uploadedFile}
                  processedCanvas={processedCanvas}
                  onProcessed={(canvas) => handleFixAction(() => handleProcessed(canvas))}
                  onProcessingStart={handleProcessingStart}
                  isProUser={isPro}
                  onUpgradeClick={() => setIsProModalOpen(true)}
                />
              </div>
            </section>
          </div>
        )}

        {/* Export Options */}
        {uploadedFile && (
          <section className="mb-8">
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Export & Download</h2>
              <ExportOptionsPanel
                processedCanvas={processedCanvas}
                processedImageUrl={processedImageUrl}
                originalFilename={uploadedFile.name}
                isProUser={isPro}
                onUpgradeClick={() => setIsProModalOpen(true)}
              />
            </div>
          </section>
        )}

        {/* Related Tools */}
        <RelatedTools tools={relatedTools} category="image" />
      </div>

      {/* Pro Pricing Modal */}
      <ProPricingModal
        isOpen={isProModalOpen}
        onClose={() => setIsProModalOpen(false)}
      />
    </div>
  );
}
