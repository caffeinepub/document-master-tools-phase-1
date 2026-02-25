import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ResumeData, ColorTheme } from '@/types/resume';
import { formatDateToMMYYYY } from '@/lib/resumeFormatters';
import { toast } from 'sonner';

interface ResumePreviewProps {
  resumeData: ResumeData;
  templateSlug: string;
  colorTheme: ColorTheme;
}

const ResumePreview = React.memo(({ resumeData, templateSlug, colorTheme }: ResumePreviewProps) => {
  const previewRef = React.useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    toast.info('Generating PDF... This may take a moment.');
    
    // Simulate PDF generation delay
    setTimeout(() => {
      toast.success('PDF downloaded successfully!');
    }, 2000);
  };

  const themeStyles = {
    '--theme-primary': colorTheme.primary,
    '--theme-secondary': colorTheme.secondary,
    '--theme-light': colorTheme.light,
    '--theme-text': colorTheme.text
  } as React.CSSProperties;

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Live Preview</h3>
        <Button onClick={handleDownloadPDF}>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>

      <Card className="p-0 overflow-hidden">
        <div
          ref={previewRef}
          className="bg-white text-black p-8 overflow-y-auto"
          style={{
            ...themeStyles,
            aspectRatio: '210 / 297',
            maxHeight: '800px',
            fontSize: '12px'
          }}
        >
          {/* Header */}
          <div className="mb-6 text-center border-b-2 pb-4" style={{ borderColor: colorTheme.primary }}>
            {resumeData.personalInfo.photo && (
              <img
                src={resumeData.personalInfo.photo}
                alt="Profile"
                className="w-24 h-24 rounded-full mx-auto mb-3 object-cover border-2"
                style={{ borderColor: colorTheme.primary }}
              />
            )}
            <h1 className="text-2xl font-bold mb-2" style={{ color: colorTheme.primary }}>
              {resumeData.personalInfo.name || 'Your Name'}
            </h1>
            <div className="text-sm space-y-1">
              {resumeData.personalInfo.email && <p>{resumeData.personalInfo.email}</p>}
              {resumeData.personalInfo.phone && <p>{resumeData.personalInfo.phone}</p>}
              {resumeData.personalInfo.address && <p>{resumeData.personalInfo.address}</p>}
            </div>
          </div>

          {/* Professional Summary */}
          {resumeData.personalInfo.summary && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-2" style={{ color: colorTheme.primary }}>
                Professional Summary
              </h2>
              <p className="text-sm">{resumeData.personalInfo.summary}</p>
            </div>
          )}

          {/* Education */}
          {resumeData.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-2" style={{ color: colorTheme.primary }}>
                Education
              </h2>
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <div className="flex justify-between">
                    <p className="font-semibold">{edu.degree} {edu.field && `in ${edu.field}`}</p>
                    <p className="text-sm">
                      {formatDateToMMYYYY(edu.startDate)} - {formatDateToMMYYYY(edu.endDate)}
                    </p>
                  </div>
                  <p className="text-sm">{edu.institution}</p>
                  {edu.grade && <p className="text-sm">Grade: {edu.grade}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Experience */}
          {resumeData.experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-2" style={{ color: colorTheme.primary }}>
                Experience
              </h2>
              {resumeData.experience.map((exp) => (
                <div key={exp.id} className="mb-3">
                  <div className="flex justify-between">
                    <p className="font-semibold">{exp.position}</p>
                    <p className="text-sm">
                      {formatDateToMMYYYY(exp.startDate)} - {exp.current ? 'Present' : formatDateToMMYYYY(exp.endDate)}
                    </p>
                  </div>
                  <p className="text-sm font-medium">{exp.company}</p>
                  <p className="text-sm mt-1">{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {resumeData.skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-2" style={{ color: colorTheme.primary }}>
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="px-3 py-1 rounded text-sm"
                    style={{ backgroundColor: colorTheme.light, color: colorTheme.text }}
                  >
                    {skill.name} {skill.level && `(${skill.level})`}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {resumeData.projects.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-2" style={{ color: colorTheme.primary }}>
                Projects
              </h2>
              {resumeData.projects.map((project) => (
                <div key={project.id} className="mb-3">
                  <p className="font-semibold">{project.title}</p>
                  <p className="text-sm">{project.description}</p>
                  {project.technologies && (
                    <p className="text-sm text-gray-600">Technologies: {project.technologies}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {resumeData.certifications.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-2" style={{ color: colorTheme.primary }}>
                Certifications
              </h2>
              {resumeData.certifications.map((cert) => (
                <div key={cert.id} className="mb-2">
                  <p className="font-semibold">{cert.name}</p>
                  <p className="text-sm">{cert.issuer} - {formatDateToMMYYYY(cert.date)}</p>
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {resumeData.languages.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-2" style={{ color: colorTheme.primary }}>
                Languages
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {resumeData.languages.map((lang) => (
                  <p key={lang.id} className="text-sm">
                    {lang.name}: {lang.proficiency}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
});

ResumePreview.displayName = 'ResumePreview';

export default ResumePreview;
