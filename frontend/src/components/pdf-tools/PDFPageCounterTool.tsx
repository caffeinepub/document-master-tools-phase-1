import { BasePDFTool } from './BasePDFTool';

export default function PDFPageCounterTool({ onBack }: { onBack: () => void }) {
  return (
    <BasePDFTool
      onBack={onBack}
      title="PDF Page Counter"
      description="Count the total number of pages in your PDF document"
      accept="application/pdf"
      buttonLabel="Count Pages"
      processingMessage="Counting pages..."
      outputName="page-count-report.txt"
      outputType="text/plain"
    />
  );
}
