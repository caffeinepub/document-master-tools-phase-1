import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ResumeTemplateSelector from '../components/resume/ResumeTemplateSelector';
import ResumeEditor from '../components/resume/ResumeEditor';

interface ResumeBuilderPageProps {
  onBack: () => void;
}

export type ResumeTemplate = 'fresher' | 'experienced' | 'professional' | 'simple' | 'creative';

export default function ResumeBuilderPage({ onBack }: ResumeBuilderPageProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplate | null>(null);

  if (selectedTemplate) {
    return <ResumeEditor template={selectedTemplate} onBack={() => setSelectedTemplate(null)} />;
  }

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Resume Builder</h1>
          <p className="text-lg text-muted-foreground">
            Create professional resumes with our beautiful templates. Choose a template that matches your experience level and style.
          </p>
        </div>

        <ResumeTemplateSelector onSelectTemplate={setSelectedTemplate} />
      </div>
    </div>
  );
}
