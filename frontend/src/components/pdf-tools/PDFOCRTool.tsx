import { BasePDFTool } from './BasePDFTool';

export default function PDFOCRTool({ onBack }: { onBack: () => void }) {
  return (
    <BasePDFTool
      onBack={onBack}
      title="OCR to Searchable PDF"
      description="Convert scanned PDFs to searchable text documents using OCR"
      accept="application/pdf"
      buttonLabel="Apply OCR"
      processingMessage="Performing OCR..."
      outputName="searchable-document.pdf"
      outputType="application/pdf"
    />
  );
}
