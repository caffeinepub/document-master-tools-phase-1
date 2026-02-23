import { BasePDFTool } from './BasePDFTool';

export default function PDFPasswordUnlockTool({ onBack }: { onBack: () => void }) {
  return (
    <BasePDFTool
      onBack={onBack}
      title="Unlock PDF"
      description="Remove password protection from PDF documents"
      accept="application/pdf"
      buttonLabel="Unlock PDF"
      processingMessage="Removing password..."
      outputName="unlocked-document.pdf"
      outputType="application/pdf"
    />
  );
}
