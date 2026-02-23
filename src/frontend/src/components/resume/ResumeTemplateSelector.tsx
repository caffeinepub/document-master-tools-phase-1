import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ResumeTemplate } from '../../pages/ResumeBuilderPage';

interface ResumeTemplateSelectorProps {
  onSelectTemplate: (template: ResumeTemplate) => void;
}

export default function ResumeTemplateSelector({ onSelectTemplate }: ResumeTemplateSelectorProps) {
  const templates = [
    {
      id: 'fresher' as ResumeTemplate,
      name: 'Fresher Resume',
      description: 'Perfect for recent graduates and entry-level positions',
      color: 'from-blue-500/10 to-blue-600/10',
    },
    {
      id: 'experienced' as ResumeTemplate,
      name: 'Experienced Professional',
      description: 'Showcase your work history and achievements',
      color: 'from-green-500/10 to-green-600/10',
    },
    {
      id: 'professional' as ResumeTemplate,
      name: 'Corporate/Professional',
      description: 'Clean and formal design for corporate roles',
      color: 'from-purple-500/10 to-purple-600/10',
    },
    {
      id: 'simple' as ResumeTemplate,
      name: 'Simple Resume',
      description: 'Minimalist design that focuses on content',
      color: 'from-gray-500/10 to-gray-600/10',
    },
    {
      id: 'creative' as ResumeTemplate,
      name: 'Creative Resume',
      description: 'Stand out with a modern, creative layout',
      color: 'from-pink-500/10 to-pink-600/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <Card
          key={template.id}
          className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
          onClick={() => onSelectTemplate(template.id)}
        >
          <CardHeader>
            <div className={`w-full h-32 rounded-lg bg-gradient-to-br ${template.color} mb-4 flex items-center justify-center`}>
              <div className="text-4xl font-bold text-muted-foreground/20">CV</div>
            </div>
            <CardTitle className="text-lg group-hover:text-primary transition-colors">
              {template.name}
            </CardTitle>
            <CardDescription>{template.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <span className="text-sm font-medium text-primary group-hover:translate-x-1 transition-transform inline-block">
              Use Template →
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
