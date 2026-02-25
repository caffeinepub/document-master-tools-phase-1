import { ArrowLeft, FileText, Globe, Briefcase, GraduationCap, Heart, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SEO from '@/components/SEO';
import BreadcrumbNavigation from '@/components/BreadcrumbNavigation';
import AdPlaceholder from '@/components/AdPlaceholder';

interface ResumeBuilderPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

export default function ResumeBuilderPage({ onBack, onNavigate }: ResumeBuilderPageProps) {
  const indianTemplates = [
    { 
      slug: 'fresher-resume', 
      name: 'Fresher Resume', 
      description: 'Perfect for entry-level job seekers and recent graduates',
      icon: GraduationCap
    },
    { 
      slug: 'government-job-resume', 
      name: 'Government Job Resume', 
      description: 'Formal format for government job applications',
      icon: Shield
    },
    { 
      slug: 'private-job-resume', 
      name: 'Private Job Resume', 
      description: 'Modern format for private sector positions',
      icon: Briefcase
    },
    { 
      slug: 'hindi-resume', 
      name: 'Hindi Resume', 
      description: 'Bilingual resume with Hindi language support',
      icon: FileText
    },
    { 
      slug: 'biodata-for-marriage', 
      name: 'Biodata for Marriage', 
      description: 'Traditional matrimonial biodata format',
      icon: Heart
    },
    { 
      slug: 'teacher-resume', 
      name: 'Teacher Resume', 
      description: 'Specialized format for education professionals',
      icon: Users
    },
    { 
      slug: 'police-army-resume', 
      name: 'Police / Army Resume', 
      description: 'Structured format for defense services',
      icon: Shield
    },
  ];

  const internationalTemplates = [
    { 
      slug: 'ats-friendly-resume', 
      name: 'ATS Friendly Resume', 
      description: 'Optimized for applicant tracking systems',
      icon: FileText
    },
    { 
      slug: 'us-resume', 
      name: 'US Resume', 
      description: 'American format with quantified achievements',
      icon: Globe
    },
    { 
      slug: 'uk-cv-format', 
      name: 'UK CV Format', 
      description: 'British curriculum vitae standard',
      icon: Globe
    },
    { 
      slug: 'canada-resume', 
      name: 'Canada Resume', 
      description: 'Canadian professional resume format',
      icon: Globe
    },
    { 
      slug: 'europass-cv', 
      name: 'Europass CV', 
      description: 'European Union standard CV format',
      icon: Globe
    },
    { 
      slug: 'creative-resume', 
      name: 'Creative Resume', 
      description: 'Bold design for creative industries',
      icon: Briefcase
    },
    { 
      slug: 'corporate-resume', 
      name: 'Corporate Resume', 
      description: 'Executive format for senior positions',
      icon: Briefcase
    },
  ];

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Resume Builder' }
  ];

  return (
    <>
      <SEO
        title="Resume Builder - 14 Professional Templates | Document Master Tools"
        description="Create professional resumes with 14 specialized templates. Choose from Indian formats (Fresher, Government, Private, Hindi, Biodata, Teacher, Police/Army) and International formats (ATS, US, UK, Canada, Europass, Creative, Corporate). Free online resume builder with live preview and PDF download."
        canonicalUrl={`${window.location.origin}/resume-builder`}
      />

      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <Button variant="ghost" onClick={onBack} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>

          <BreadcrumbNavigation items={breadcrumbs} />

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Resume Builder</h1>
            <p className="text-lg text-muted-foreground">
              Create professional resumes with our 14 specialized templates. Choose the format that best matches your needs.
            </p>
          </div>

          <AdPlaceholder adType="banner" />

          {/* Indian Format Section */}
          <section className="mb-12">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Indian Format</h2>
              <p className="text-muted-foreground">
                Tailored for Indian job market and cultural requirements (7 templates)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {indianTemplates.map((template) => {
                const Icon = template.icon;
                return (
                  <Card 
                    key={template.slug} 
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => onNavigate(template.slug)}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl">{template.name}</CardTitle>
                      </div>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full">
                        Create Resume
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* International Format Section */}
          <section>
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">International Format</h2>
              <p className="text-muted-foreground">
                Optimized for global standards and ATS systems (7 templates)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {internationalTemplates.map((template) => {
                const Icon = template.icon;
                return (
                  <Card 
                    key={template.slug} 
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => onNavigate(template.slug)}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl">{template.name}</CardTitle>
                      </div>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full">
                        Create Resume
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
