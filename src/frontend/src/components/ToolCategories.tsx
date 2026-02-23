import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, FileText, Image } from 'lucide-react';

interface ToolCategoriesProps {
  onNavigate: (page: string) => void;
}

export default function ToolCategories({ onNavigate }: ToolCategoriesProps) {
  const categories = [
    {
      id: 'calculators',
      name: 'Calculator Hub',
      description: '20 calculators for academic, financial, and health calculations',
      icon: Calculator,
      count: 20,
      page: 'calculators'
    },
    {
      id: 'pdf-tools',
      name: 'PDF Tools',
      description: '16 tools for PDF processing, conversion, and security',
      icon: FileText,
      count: 16,
      page: 'pdf-tools'
    },
    {
      id: 'image-tools',
      name: 'Image Tools',
      description: '16 tools for image processing, resizing, and conversion',
      icon: Image,
      count: 16,
      page: 'image-tools'
    }
  ];

  return (
    <section className="mt-12 pt-8 border-t">
      <h2 className="text-2xl font-bold mb-6">Explore More Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Card key={category.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <div className="text-sm text-muted-foreground">{category.count} tools</div>
                  </div>
                </div>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => onNavigate(category.page)} 
                  variant="outline" 
                  className="w-full"
                >
                  Explore {category.name}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
