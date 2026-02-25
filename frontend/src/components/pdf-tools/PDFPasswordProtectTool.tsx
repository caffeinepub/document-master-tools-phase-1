import { BasePDFTool } from './BasePDFTool';

export default function PDFPasswordProtectTool({ onBack }: { onBack: () => void }) {
  return (
    <BasePDFTool
      onBack={onBack}
      title="Password Protect PDF"
      description="Add password security to your PDF documents"
      accept="application/pdf"
      buttonLabel="Protect PDF"
      processingMessage="Adding password protection..."
      outputName="protected-document.pdf"
      outputType="application/pdf"
    />
  );
}
