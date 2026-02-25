import { useState, useEffect } from 'react';
import { ArrowLeft, Calculator, FileText, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';
import BreadcrumbNavigation from '@/components/BreadcrumbNavigation';
import AdPlaceholder from '@/components/AdPlaceholder';
import FAQSchema from '@/components/FAQSchema';
import RelatedTools from '@/components/RelatedTools';
import ResumeFormWizard from '@/components/resume/ResumeFormWizard';
import ResumePreview from '@/components/resume/ResumePreview';
import { getTemplateBySlug } from '@/data/resumeTemplateConfigs';
import { ResumeData } from '@/types/resume';
import { COLOR_THEMES } from '@/lib/colorThemes';

interface ResumeTemplateBuilderPageProps {
  templateSlug: string;
  onBack: () => void;
}

const initialResumeData: ResumeData = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    portfolio: '',
    photo: '',
    summary: ''
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  achievements: [],
  references: []
};

export default function ResumeTemplateBuilderPage({ templateSlug, onBack }: ResumeTemplateBuilderPageProps) {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [selectedTheme, setSelectedTheme] = useState(COLOR_THEMES[0]);
  
  const templateConfig = getTemplateBySlug(templateSlug);

  useEffect(() => {
    // Load draft from localStorage if exists
    const draftKey = `resume_draft_${templateSlug}`;
    const savedDraft = localStorage.getItem(draftKey);
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        setResumeData(parsed.data);
        const savedTheme = COLOR_THEMES.find(t => t.name === parsed.theme);
        if (savedTheme) setSelectedTheme(savedTheme);
      } catch (e) {
        console.error('Failed to load draft:', e);
      }
    }
  }, [templateSlug]);

  if (!templateConfig) {
    return (
      <div className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <Button variant="ghost" onClick={onBack} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Resume Builder
          </Button>
          <h1 className="text-3xl font-bold">Template not found</h1>
        </div>
      </div>
    );
  }

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Resume Builder', href: '/resume-builder' },
    { label: templateConfig.name }
  ];

  const relatedTools = [
    {
      name: 'Calculator Hub',
      description: '21 calculators for academic and financial needs',
      icon: Calculator,
      onClick: () => window.scrollTo(0, 0)
    },
    {
      name: 'PDF Tools',
      description: '16 tools for PDF manipulation',
      icon: FileText,
      onClick: () => window.scrollTo(0, 0)
    },
    {
      name: 'Image Tools',
      description: '16 tools for image processing',
      icon: Image,
      onClick: () => window.scrollTo(0, 0)
    }
  ];

  const handleResumeDataChange = (data: ResumeData) => {
    setResumeData(data);
    
    // Auto-save to localStorage
    const draftKey = `resume_draft_${templateSlug}`;
    localStorage.setItem(draftKey, JSON.stringify({
      data,
      theme: selectedTheme.name,
      timestamp: Date.now()
    }));
  };

  return (
    <>
      <SEO
        title={templateConfig.seoTitle}
        description={templateConfig.metaDescription}
        canonicalUrl={`${window.location.origin}/resume-builder/${templateSlug}`}
        ogImage="/assets/generated/resume-builder-icon-transparent.dim_64x64.png"
      />

      <FAQSchema faqs={templateConfig.faqs} />

      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <Button variant="ghost" onClick={onBack} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Resume Builder
          </Button>

          <BreadcrumbNavigation items={breadcrumbs} />

          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{templateConfig.name}</h1>
            <p className="text-lg text-muted-foreground">{templateConfig.description}</p>
          </div>

          <AdPlaceholder adType="banner" />

          {/* Main Content: Form and Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Form Wizard */}
            <div className="order-2 lg:order-1">
              <ResumeFormWizard
                resumeData={resumeData}
                onChange={handleResumeDataChange}
                templateSlug={templateSlug}
                selectedTheme={selectedTheme}
                onThemeChange={setSelectedTheme}
              />
            </div>

            {/* Preview */}
            <div className="order-1 lg:order-2">
              <div className="sticky top-20">
                <ResumePreview
                  resumeData={resumeData}
                  templateSlug={templateSlug}
                  colorTheme={selectedTheme}
                />
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {templateConfig.faqs.map((faq, index) => (
                <div key={index} className="border rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related Tools */}
          <RelatedTools tools={relatedTools} />
        </div>
      </main>
    </>
  );
}
