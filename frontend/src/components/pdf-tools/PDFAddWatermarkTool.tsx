import { BasePDFTool } from './BasePDFTool';

export default function PDFAddWatermarkTool({ onBack }: { onBack: () => void }) {
  return (
    <BasePDFTool
      onBack={onBack}
      title="Add Watermark"
      description="Apply text or image watermarks to your PDF pages"
      accept="application/pdf"
      buttonLabel="Add Watermark"
      processingMessage="Adding watermark..."
      outputName="watermarked-document.pdf"
      outputType="application/pdf"
    />
  );
}
