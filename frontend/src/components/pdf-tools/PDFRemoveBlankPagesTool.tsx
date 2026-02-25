import { BasePDFTool } from './BasePDFTool';

export default function PDFRemoveBlankPagesTool({ onBack }: { onBack: () => void }) {
  return (
    <BasePDFTool
      onBack={onBack}
      title="Remove Blank Pages"
      description="Automatically detect and remove empty pages from your PDF"
      accept="application/pdf"
      buttonLabel="Remove Blank Pages"
      processingMessage="Removing blank pages..."
      outputName="cleaned-document.pdf"
      outputType="application/pdf"
    />
  );
}
