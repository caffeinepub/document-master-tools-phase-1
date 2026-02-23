import { BasePDFTool } from './BasePDFTool';

export default function WordToPDFTool({ onBack }: { onBack: () => void }) {
  return (
    <BasePDFTool
      onBack={onBack}
      title="Word to PDF"
      description="Convert Word documents (.doc, .docx) to PDF format"
      accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      buttonLabel="Convert to PDF"
      processingMessage="Converting Word to PDF..."
      outputName="converted-document.pdf"
      outputType="application/pdf"
    />
  );
}
