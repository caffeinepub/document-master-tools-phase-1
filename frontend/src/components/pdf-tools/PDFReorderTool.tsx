import { BasePDFTool } from './BasePDFTool';

export default function PDFReorderTool({ onBack }: { onBack: () => void }) {
  return (
    <BasePDFTool
      onBack={onBack}
      title="Reorder PDF Pages"
      description="Drag and drop to rearrange pages in your PDF document"
      accept="application/pdf"
      buttonLabel="Reorder Pages"
      processingMessage="Reordering pages..."
      outputName="reordered-document.pdf"
      outputType="application/pdf"
    />
  );
}
