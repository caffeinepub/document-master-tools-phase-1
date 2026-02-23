import { useState } from 'react';
import { ChevronLeft, ChevronRight, Save, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ResumeData, ColorTheme } from '@/types/resume';
import PersonalInfoForm from './forms/PersonalInfoForm';
import EducationForm from './forms/EducationForm';
import ExperienceForm from './forms/ExperienceForm';
import SkillsForm from './forms/SkillsForm';
import ProjectsForm from './forms/ProjectsForm';
import CertificationsForm from './forms/CertificationsForm';
import LanguagesForm from './forms/LanguagesForm';
import AchievementsForm from './forms/AchievementsForm';
import ReferencesForm from './forms/ReferencesForm';
import ColorThemeSelector from './ColorThemeSelector';
import { toast } from 'sonner';

interface ResumeFormWizardProps {
  resumeData: ResumeData;
  onChange: (data: ResumeData) => void;
  templateSlug: string;
  selectedTheme: ColorTheme;
  onThemeChange: (theme: ColorTheme) => void;
}

const STEPS = [
  { id: 'personal', label: 'Personal Info', component: PersonalInfoForm },
  { id: 'education', label: 'Education', component: EducationForm },
  { id: 'experience', label: 'Experience', component: ExperienceForm },
  { id: 'skills', label: 'Skills', component: SkillsForm },
  { id: 'projects', label: 'Projects', component: ProjectsForm },
  { id: 'certifications', label: 'Certifications', component: CertificationsForm },
  { id: 'languages', label: 'Languages', component: LanguagesForm },
  { id: 'achievements', label: 'Achievements', component: AchievementsForm },
  { id: 'references', label: 'References', component: ReferencesForm },
];

export default function ResumeFormWizard({
  resumeData,
  onChange,
  templateSlug,
  selectedTheme,
  onThemeChange
}: ResumeFormWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const calculateProgress = (): number => {
    let filledFields = 0;
    let totalFields = 0;

    // Personal info (required fields)
    totalFields += 4; // name, email, phone, address
    if (resumeData.personalInfo.name) filledFields++;
    if (resumeData.personalInfo.email) filledFields++;
    if (resumeData.personalInfo.phone) filledFields++;
    if (resumeData.personalInfo.address) filledFields++;

    // Other sections (count if at least one entry)
    totalFields += 8;
    if (resumeData.education.length > 0) filledFields++;
    if (resumeData.experience.length > 0) filledFields++;
    if (resumeData.skills.length > 0) filledFields++;
    if (resumeData.projects.length > 0) filledFields++;
    if (resumeData.certifications.length > 0) filledFields++;
    if (resumeData.languages.length > 0) filledFields++;
    if (resumeData.achievements.length > 0) filledFields++;
    if (resumeData.references.length > 0) filledFields++;

    return Math.round((filledFields / totalFields) * 100);
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveDraft = () => {
    toast.success('Draft saved successfully!');
  };

  const CurrentFormComponent = STEPS[currentStep].component;
  const progress = calculateProgress();

  // Mobile view with accordion
  if (isMobile) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Build Your Resume</CardTitle>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <ColorThemeSelector selected={selectedTheme} onSelect={onThemeChange} />
          
          <Accordion type="single" collapsible value={STEPS[currentStep].id}>
            {STEPS.map((step, index) => (
              <AccordionItem key={step.id} value={step.id}>
                <AccordionTrigger onClick={() => setCurrentStep(index)}>
                  {step.label}
                </AccordionTrigger>
                <AccordionContent>
                  <CurrentFormComponent
                    data={resumeData}
                    onChange={onChange}
                    templateSlug={templateSlug}
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="flex gap-2">
            <Button onClick={handleSaveDraft} variant="outline" className="flex-1">
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Desktop view with stepper
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Build Your Resume</CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Step {currentStep + 1} of {STEPS.length}</span>
            <span>{progress}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-6">
          {STEPS.map((step, index) => (
            <div
              key={step.id}
              className={`flex-1 text-center ${
                index === currentStep
                  ? 'text-primary font-semibold'
                  : index < currentStep
                  ? 'text-muted-foreground'
                  : 'text-muted-foreground/50'
              }`}
            >
              <div className="text-xs hidden md:block">{step.label}</div>
            </div>
          ))}
        </div>

        {/* Color Theme Selector */}
        {currentStep === 0 && (
          <div className="mb-6">
            <ColorThemeSelector selected={selectedTheme} onSelect={onThemeChange} />
          </div>
        )}

        {/* Current Form */}
        <div className="min-h-[400px]">
          <h3 className="text-xl font-semibold mb-4">{STEPS[currentStep].label}</h3>
          <CurrentFormComponent
            data={resumeData}
            onChange={onChange}
            templateSlug={templateSlug}
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4 pt-6 border-t">
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            variant="outline"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          <Button onClick={handleSaveDraft} variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>

          <Button
            onClick={handleNext}
            disabled={currentStep === STEPS.length - 1}
          >
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
