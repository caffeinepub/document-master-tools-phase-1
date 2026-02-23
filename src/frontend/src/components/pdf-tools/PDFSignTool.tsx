import { BasePDFTool } from './BasePDFTool';

export default function PDFSignTool({ onBack }: { onBack: () => void }) {
  return (
    <BasePDFTool
      onBack={onBack}
      title="Sign PDF"
      description="Add your digital signature by drawing or uploading an image"
      accept="application/pdf"
      buttonLabel="Sign PDF"
      processingMessage="Adding signature..."
      outputName="signed-document.pdf"
      outputType="application/pdf"
    />
  );
}
