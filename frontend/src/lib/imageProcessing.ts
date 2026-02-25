export interface ImageDimensions {
  width: number;
  height: number;
}

export interface ProcessedImage {
  blob: Blob;
  url: string;
  size: number;
  dimensions: ImageDimensions;
}

export async function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };
    img.src = url;
  });
}

export async function resizeImage(
  file: File,
  targetWidth: number,
  targetHeight: number,
  quality: number = 0.9,
  format: string = 'image/jpeg'
): Promise<ProcessedImage> {
  const img = await loadImage(file);
  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get canvas context');
  
  ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
  
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Failed to create blob'));
          return;
        }
        resolve({
          blob,
          url: URL.createObjectURL(blob),
          size: blob.size,
          dimensions: { width: targetWidth, height: targetHeight }
        });
      },
      format,
      quality
    );
  });
}

export async function compressToTargetSize(
  file: File,
  targetSizeKB: number,
  width?: number,
  height?: number
): Promise<ProcessedImage> {
  const img = await loadImage(file);
  const canvas = document.createElement('canvas');
  
  const finalWidth = width || img.width;
  const finalHeight = height || img.height;
  
  canvas.width = finalWidth;
  canvas.height = finalHeight;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get canvas context');
  
  ctx.drawImage(img, 0, 0, finalWidth, finalHeight);
  
  let quality = 0.9;
  let blob: Blob | null = null;
  
  // Binary search for optimal quality
  for (let i = 0; i < 10; i++) {
    blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, 'image/jpeg', quality);
    });
    
    if (!blob) break;
    
    const sizeKB = blob.size / 1024;
    if (Math.abs(sizeKB - targetSizeKB) < 5) break;
    
    if (sizeKB > targetSizeKB) {
      quality -= 0.1;
    } else {
      quality += 0.05;
    }
    
    quality = Math.max(0.1, Math.min(1, quality));
  }
  
  if (!blob) throw new Error('Failed to compress image');
  
  return {
    blob,
    url: URL.createObjectURL(blob),
    size: blob.size,
    dimensions: { width: finalWidth, height: finalHeight }
  };
}

export async function convertFormat(
  file: File,
  targetFormat: 'image/jpeg' | 'image/png' | 'image/webp',
  quality: number = 0.9
): Promise<ProcessedImage> {
  const img = await loadImage(file);
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get canvas context');
  
  // For PNG with transparency, fill with white background for JPEG
  if (targetFormat === 'image/jpeg') {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  
  ctx.drawImage(img, 0, 0);
  
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Failed to convert image'));
          return;
        }
        resolve({
          blob,
          url: URL.createObjectURL(blob),
          size: blob.size,
          dimensions: { width: img.width, height: img.height }
        });
      },
      targetFormat,
      quality
    );
  });
}

export function calculateAspectRatio(width: number, height: number, targetWidth: number): number {
  return (targetWidth / width) * height;
}

export function calculateAspectRatioWidth(width: number, height: number, targetHeight: number): number {
  return (targetHeight / height) * width;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}
