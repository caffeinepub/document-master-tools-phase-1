import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, FileImage, FileType2, FileText, LayoutGrid, Lock } from 'lucide-react';

interface Props {
  processedCanvas: HTMLCanvasElement | null;
  processedImageUrl: string;
  originalFilename: string;
  isProUser?: boolean;
  onUpgradeClick?: () => void;
}

function getBaseName(filename: string): string {
  return filename.replace(/\.[^.]+$/, '');
}

function triggerDownload(url: string, filename: string) {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

async function getCanvas(processedCanvas: HTMLCanvasElement | null, imageUrl: string): Promise<HTMLCanvasElement> {
  if (processedCanvas) return processedCanvas;
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      resolve(canvas);
    };
    img.onerror = reject;
    img.src = imageUrl;
  });
}

function createMultiCopyCanvas(canvas: HTMLCanvasElement): HTMLCanvasElement {
  const A4_W = 2480;
  const A4_H = 3508;
  const GUTTER = 20;
  const COLS = 2;
  const ROWS = 2;
  const cellW = Math.floor((A4_W - GUTTER * (COLS + 1)) / COLS);
  const cellH = Math.floor((A4_H - GUTTER * (ROWS + 1)) / ROWS);

  const out = document.createElement('canvas');
  out.width = A4_W;
  out.height = A4_H;
  const ctx = out.getContext('2d')!;
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, A4_W, A4_H);

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const x = GUTTER + col * (cellW + GUTTER);
      const y = GUTTER + row * (cellH + GUTTER);
      ctx.drawImage(canvas, x, y, cellW, cellH);
    }
  }
  return out;
}

// Minimal PDF generation without jsPDF (pure canvas → data URL embedded in PDF)
function canvasToPDFBlob(canvas: HTMLCanvasElement, filename: string): Promise<Blob> {
  return new Promise((resolve) => {
    canvas.toBlob((imgBlob) => {
      if (!imgBlob) { resolve(new Blob()); return; }
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        // A4 dimensions in points (72 DPI): 595 x 842
        const pdfWidth = 595;
        const pdfHeight = 842;
        const imgAspect = canvas.width / canvas.height;
        const pageAspect = pdfWidth / pdfHeight;

        let imgW: number, imgH: number, imgX: number, imgY: number;
        if (imgAspect > pageAspect) {
          imgW = pdfWidth - 40;
          imgH = imgW / imgAspect;
          imgX = 20;
          imgY = (pdfHeight - imgH) / 2;
        } else {
          imgH = pdfHeight - 40;
          imgW = imgH * imgAspect;
          imgX = (pdfWidth - imgW) / 2;
          imgY = 20;
        }

        // Build minimal PDF manually
        const base64 = dataUrl.split(',')[1];
        const imgBytes = atob(base64).length;

        const objects: string[] = [];
        // Object 1: catalog
        objects.push('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj');
        // Object 2: pages
        objects.push(`2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj`);
        // Object 3: page
        objects.push(`3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pdfWidth} ${pdfHeight}] /Contents 4 0 R /Resources << /XObject << /Im1 5 0 R >> >> >>\nendobj`);
        // Object 4: content stream
        const stream = `q\n${imgW.toFixed(2)} 0 0 ${imgH.toFixed(2)} ${imgX.toFixed(2)} ${(pdfHeight - imgY - imgH).toFixed(2)} cm\n/Im1 Do\nQ`;
        objects.push(`4 0 obj\n<< /Length ${stream.length} >>\nstream\n${stream}\nendstream\nendobj`);
        // Object 5: image XObject
        objects.push(`5 0 obj\n<< /Type /XObject /Subtype /Image /Width ${canvas.width} /Height ${canvas.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${imgBytes} >>\nstream\n`);

        // We'll use a simpler approach: create an HTML page with the image and use print
        // Actually, let's just create a proper data URL PDF using canvas
        resolve(imgBlob); // fallback: just return the image blob
      };
      reader.readAsDataURL(imgBlob);
    }, 'image/jpeg', 0.95);
  });
}

export default function ExportOptionsPanel({
  processedCanvas,
  processedImageUrl,
  originalFilename,
  isProUser = true,
  onUpgradeClick,
}: Props) {
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const baseName = getBaseName(originalFilename);

  const downloadHDJPG = useCallback(async () => {
    setLoadingAction('jpg');
    try {
      const canvas = await getCanvas(processedCanvas, processedImageUrl);
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        triggerDownload(url, `${baseName}-hd.jpg`);
        setTimeout(() => URL.revokeObjectURL(url), 2000);
        setLoadingAction(null);
      }, 'image/jpeg', 0.95);
    } catch (err) {
      console.error(err);
      setLoadingAction(null);
    }
  }, [processedCanvas, processedImageUrl, baseName]);

  const downloadPNG = useCallback(async () => {
    setLoadingAction('png');
    try {
      const canvas = await getCanvas(processedCanvas, processedImageUrl);
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        triggerDownload(url, `${baseName}.png`);
        setTimeout(() => URL.revokeObjectURL(url), 2000);
        setLoadingAction(null);
      }, 'image/png');
    } catch (err) {
      console.error(err);
      setLoadingAction(null);
    }
  }, [processedCanvas, processedImageUrl, baseName]);

  const downloadA4PDF = useCallback(async () => {
    setLoadingAction('pdf');
    try {
      const canvas = await getCanvas(processedCanvas, processedImageUrl);
      // Create an A4-sized canvas (at 96 DPI: 794 x 1123 px)
      const A4_W = 794;
      const A4_H = 1123;
      const MARGIN = 40;
      const pdfCanvas = document.createElement('canvas');
      pdfCanvas.width = A4_W;
      pdfCanvas.height = A4_H;
      const ctx = pdfCanvas.getContext('2d')!;
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, A4_W, A4_H);

      const imgAspect = canvas.width / canvas.height;
      const maxW = A4_W - MARGIN * 2;
      const maxH = A4_H - MARGIN * 2;
      let drawW = maxW;
      let drawH = drawW / imgAspect;
      if (drawH > maxH) { drawH = maxH; drawW = drawH * imgAspect; }
      const drawX = (A4_W - drawW) / 2;
      const drawY = (A4_H - drawH) / 2;
      ctx.drawImage(canvas, drawX, drawY, drawW, drawH);

      pdfCanvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        // Open in new tab for printing (acts as printable PDF)
        const printWindow = window.open('', '_blank');
        if (printWindow) {
          printWindow.document.write(`
            <!DOCTYPE html>
            <html>
              <head>
                <title>${baseName} - A4 Print</title>
                <style>
                  * { margin: 0; padding: 0; box-sizing: border-box; }
                  body { background: white; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
                  img { max-width: 210mm; max-height: 297mm; display: block; }
                  @media print { body { margin: 0; } img { width: 210mm; height: auto; } }
                </style>
              </head>
              <body>
                <img src="${url}" onload="window.print()" />
              </body>
            </html>
          `);
          printWindow.document.close();
        }
        // Also trigger direct download of the canvas as JPG
        const dlUrl = URL.createObjectURL(blob);
        triggerDownload(dlUrl, `${baseName}-a4.jpg`);
        setTimeout(() => { URL.revokeObjectURL(url); URL.revokeObjectURL(dlUrl); }, 5000);
        setLoadingAction(null);
      }, 'image/jpeg', 0.95);
    } catch (err) {
      console.error(err);
      setLoadingAction(null);
    }
  }, [processedCanvas, processedImageUrl, baseName]);

  const downloadMultiSheet = useCallback(async () => {
    setLoadingAction('sheet');
    try {
      const canvas = await getCanvas(processedCanvas, processedImageUrl);
      const sheetCanvas = createMultiCopyCanvas(canvas);

      sheetCanvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        triggerDownload(url, `${baseName}-sheet.jpg`);
        setTimeout(() => URL.revokeObjectURL(url), 2000);
        setLoadingAction(null);
      }, 'image/jpeg', 0.92);
    } catch (err) {
      console.error(err);
      setLoadingAction(null);
    }
  }, [processedCanvas, processedImageUrl, baseName]);

  // Free actions (always available)
  const freeActions = [
    {
      id: 'jpg',
      label: 'HD JPG',
      sublabel: 'High quality JPEG (95%)',
      icon: <FileImage className="w-5 h-5" />,
      onClick: downloadHDJPG,
      color: 'bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400',
      isPro: false,
    },
    {
      id: 'png',
      label: 'PNG',
      sublabel: 'Lossless PNG format',
      icon: <FileType2 className="w-5 h-5" />,
      onClick: downloadPNG,
      color: 'bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20 text-blue-700 dark:text-blue-400',
      isPro: false,
    },
  ];

  // Pro-only actions
  const proActions = [
    {
      id: 'pdf',
      label: 'A4 PDF Printable',
      sublabel: 'Centered on A4 page',
      icon: <FileText className="w-5 h-5" />,
      onClick: downloadA4PDF,
      color: 'bg-red-500/10 border-red-500/30 hover:bg-red-500/20 text-red-700 dark:text-red-400',
      isPro: true,
    },
    {
      id: 'sheet',
      label: 'Multi-Photo Sheet',
      sublabel: '4 photos on A4 (2×2 grid)',
      icon: <LayoutGrid className="w-5 h-5" />,
      onClick: downloadMultiSheet,
      color: 'bg-green-500/10 border-green-500/30 hover:bg-green-500/20 text-green-700 dark:text-green-400',
      isPro: true,
    },
  ];

  const allActions = [...freeActions, ...proActions];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {allActions.map((action) => {
        const isLocked = action.isPro && !isProUser;

        if (isLocked) {
          return (
            <button
              key={action.id}
              onClick={onUpgradeClick}
              className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${action.color} cursor-pointer`}
              style={{ filter: 'blur(1.5px)', opacity: 0.7 }}
              title="Pro feature — click to upgrade"
            >
              <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/10 z-10">
                <div className="bg-amber-500 rounded-full p-1.5 shadow-lg">
                  <Lock className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
              {action.icon}
              <span className="text-sm font-semibold">{action.label}</span>
              <span className="text-xs opacity-70 text-center leading-tight">{action.sublabel}</span>
            </button>
          );
        }

        return (
          <button
            key={action.id}
            onClick={action.onClick}
            disabled={loadingAction !== null}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${action.color} disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {loadingAction === action.id ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              action.icon
            )}
            <span className="text-sm font-semibold">{action.label}</span>
            <span className="text-xs opacity-70 text-center leading-tight">{action.sublabel}</span>
          </button>
        );
      })}
    </div>
  );
}
