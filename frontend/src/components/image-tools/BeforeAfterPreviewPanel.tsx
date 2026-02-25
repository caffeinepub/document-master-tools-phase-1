import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCw, Crop, Columns2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface BeforeAfterPreviewPanelProps {
  originalImageUrl: string;
  processedImageUrl: string;
  watermarkText?: string;
}

type ViewMode = 'side-by-side' | 'original' | 'enhanced';

const ROTATIONS = [0, 90, 180, 270] as const;

export default function BeforeAfterPreviewPanel({
  originalImageUrl,
  processedImageUrl,
  watermarkText,
}: BeforeAfterPreviewPanelProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('side-by-side');
  const [zoom, setZoom] = useState(1);
  const [rotationIndex, setRotationIndex] = useState(0);
  const [showCropGuide, setShowCropGuide] = useState(false);

  const rotation = ROTATIONS[rotationIndex];

  const handleRotate = () => {
    setRotationIndex((prev) => (prev + 1) % ROTATIONS.length);
  };

  const imageStyle: React.CSSProperties = {
    transform: `scale(${zoom}) rotate(${rotation}deg)`,
    transition: 'transform 0.3s ease-in-out',
    maxWidth: '100%',
    maxHeight: '320px',
    objectFit: 'contain',
  };

  const CropGuideOverlay = () => (
    <div className="absolute inset-0 pointer-events-none">
      {/* Vertical lines */}
      <div className="absolute top-0 bottom-0 border-l border-white/60" style={{ left: '33.33%' }} />
      <div className="absolute top-0 bottom-0 border-l border-white/60" style={{ left: '66.66%' }} />
      {/* Horizontal lines */}
      <div className="absolute left-0 right-0 border-t border-white/60" style={{ top: '33.33%' }} />
      <div className="absolute left-0 right-0 border-t border-white/60" style={{ top: '66.66%' }} />
      {/* Center crosshair */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-yellow-400 rounded-full opacity-80" />
      </div>
    </div>
  );

  const WatermarkOverlay = () => (
    <div className="absolute inset-0 pointer-events-none flex items-end justify-center pb-3">
      <span
        className="text-white text-xs font-semibold px-2 py-1 rounded select-none"
        style={{
          background: 'rgba(0,0,0,0.45)',
          textShadow: '0 1px 2px rgba(0,0,0,0.8)',
          letterSpacing: '0.03em',
        }}
      >
        {watermarkText}
      </span>
    </div>
  );

  const ImagePanel = ({
    url,
    label,
    showGuide = false,
    showWatermark = false,
  }: {
    url: string;
    label: string;
    showGuide?: boolean;
    showWatermark?: boolean;
  }) => (
    <div className="flex flex-col items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-muted px-3 py-1 rounded-full">
        {label}
      </span>
      <div className="relative w-full flex items-center justify-center bg-muted/30 rounded-lg overflow-hidden min-h-[200px] border border-border">
        <img
          src={url}
          alt={label}
          style={imageStyle}
          className="rounded"
          draggable={false}
        />
        {showGuide && <CropGuideOverlay />}
        {showWatermark && watermarkText && <WatermarkOverlay />}
      </div>
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-lg font-semibold text-foreground">Preview</h2>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* View mode toggle */}
          <div className="flex rounded-lg border border-border overflow-hidden">
            <button
              onClick={() => setViewMode('side-by-side')}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                viewMode === 'side-by-side'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-muted-foreground hover:bg-muted'
              }`}
              title="Side by side"
            >
              <Columns2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('original')}
              className={`px-3 py-1.5 text-xs font-medium transition-colors border-l border-border ${
                viewMode === 'original'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-muted-foreground hover:bg-muted'
              }`}
              title="Original only"
            >
              Before
            </button>
            <button
              onClick={() => setViewMode('enhanced')}
              className={`px-3 py-1.5 text-xs font-medium transition-colors border-l border-border ${
                viewMode === 'enhanced'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-muted-foreground hover:bg-muted'
              }`}
              title="Enhanced only"
            >
              After
            </button>
          </div>

          {/* Rotate */}
          <Button variant="outline" size="icon" onClick={handleRotate} title="Rotate 90°" className="h-8 w-8">
            <RotateCw className="w-4 h-4" />
          </Button>

          {/* Crop guide */}
          <Button
            variant={showCropGuide ? 'default' : 'outline'}
            size="icon"
            onClick={() => setShowCropGuide((v) => !v)}
            title="Toggle crop guide"
            className="h-8 w-8"
          >
            <Crop className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Zoom slider */}
      <div className="flex items-center gap-3 mb-4">
        <ZoomOut className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        <Slider
          min={50}
          max={300}
          step={10}
          value={[zoom * 100]}
          onValueChange={([v]) => setZoom(v / 100)}
          className="flex-1"
        />
        <ZoomIn className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        <span className="text-xs text-muted-foreground w-10 text-right">{Math.round(zoom * 100)}%</span>
      </div>

      {/* Image panels */}
      {viewMode === 'side-by-side' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ImagePanel url={originalImageUrl} label="Before" />
          <ImagePanel url={processedImageUrl} label="After" showGuide={showCropGuide} showWatermark={true} />
        </div>
      ) : viewMode === 'original' ? (
        <ImagePanel url={originalImageUrl} label="Before" />
      ) : (
        <ImagePanel url={processedImageUrl} label="After" showGuide={showCropGuide} showWatermark={true} />
      )}

      {rotation !== 0 && (
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Preview rotated {rotation}° (rotation is visual only, not applied to export)
        </p>
      )}
    </div>
  );
}
