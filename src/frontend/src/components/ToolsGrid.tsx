import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Image, FileEdit } from 'lucide-react';

interface ToolsGridProps {
  onNavigate: (page: string) => void;
}

export default function ToolsGrid({ onNavigate }: ToolsGridProps) {
  const toolCategories = [
    {
      id: 'pdf-tools',
      title: 'PDF Tools',
      description: 'Merge, split, compress, convert, and edit PDF files with professional-grade tools.',
      icon: '/assets/generated/pdf-tools-icon-transparent.dim_64x64.png',
      IconComponent: FileText,
      toolCount: '13 Tools',
      color: 'from-blue-500/10 to-blue-600/10',
    },
    {
      id: 'image-tools',
      title: 'Image Tools',
      description: 'Compress, resize, remove backgrounds, and edit images with powerful browser-based tools.',
      icon: '/assets/generated/image-tools-icon-transparent.dim_64x64.png',
      IconComponent: Image,
      toolCount: '4 Tools',
      color: 'from-green-500/10 to-green-600/10',
    },
    {
      id: 'resume-builder',
      title: 'Resume Builder',
      description: 'Create professional resumes with multiple templates for freshers and experienced professionals.',
      icon: '/assets/generated/resume-builder-icon-transparent.dim_64x64.png',
      IconComponent: FileEdit,
      toolCount: '5 Templates',
      color: 'from-purple-500/10 to-purple-600/10',
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Tool Category</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select from our comprehensive suite of document processing tools. All tools work directly in your browser for maximum privacy and speed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {toolCategories.map((category) => (
            <Card
              key={category.id}
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              onClick={() => onNavigate(category.id)}
            >
              <CardHeader>
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mb-4`}>
                  <img src={category.icon} alt={category.title} className="w-10 h-10" />
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {category.title}
                </CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">{category.toolCount}</span>
                  <span className="text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
                    Explore →
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
