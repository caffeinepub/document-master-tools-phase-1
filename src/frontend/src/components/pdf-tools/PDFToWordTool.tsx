import { BasePDFTool } from './BasePDFTool';

export default function PDFToWordTool({ onBack }: { onBack: () => void }) {
  return (
    <BasePDFTool
      onBack={onBack}
      title="PDF to Word"
      description="Convert PDF documents to editable Word format (.docx)"
      accept="application/pdf"
      buttonLabel="Convert to Word"
      processingMessage="Converting PDF to Word..."
      outputName="converted-document.docx"
      outputType="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    />
  );
}
