import { BasePDFTool } from './BasePDFTool';

export default function PDFAddPageNumbersTool({ onBack }: { onBack: () => void }) {
  return (
    <BasePDFTool
      onBack={onBack}
      title="Add Page Numbers"
      description="Insert customizable page numbers to your PDF document"
      accept="application/pdf"
      buttonLabel="Add Page Numbers"
      processingMessage="Adding page numbers..."
      outputName="numbered-document.pdf"
      outputType="application/pdf"
    />
  );
}
