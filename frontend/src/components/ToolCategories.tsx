import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, FileText, Image } from 'lucide-react';

interface ToolCategoriesProps {
  onNavigate: (page: string) => void;
  activeCategory?: 'calculator' | 'pdf' | 'image';
}

export default function ToolCategories({ onNavigate, activeCategory }: ToolCategoriesProps) {
  const categories = [
    {
      id: 'calculators',
      name: 'Calculator Hub',
      description: '20 calculators for academic, financial, and health calculations',
      icon: Calculator,
      count: 20,
      page: 'calculators',
      category: 'calculator' as const
    },
    {
      id: 'pdf-tools',
      name: 'PDF Tools',
      description: '16 tools for PDF processing, conversion, and security',
      icon: FileText,
      count: 16,
      page: 'pdf-tools',
      category: 'pdf' as const
    },
    {
      id: 'image-tools',
      name: 'Image Tools',
      description: '16 tools for image processing, resizing, and conversion',
      icon: Image,
      count: 16,
      page: 'image-tools',
      category: 'image' as const
    }
  ];

  return (
    <section className="mt-12 pt-8 border-t">
      <h2 className="text-2xl font-bold mb-6">Explore More Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.category;
          return (
            <Card 
              key={category.id} 
              className={`hover:shadow-lg hover:scale-105 transition-all duration-200 ${
                isActive ? 'border-primary bg-primary/5 dark:bg-primary/10' : ''
              }`}
            >
              <CardHeader className="card-padding">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    isActive ? 'bg-primary/20' : 'bg-primary/10'
                  }`}>
                    <Icon className={`w-6 h-6 ${isActive ? 'text-primary' : 'text-primary'}`} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <div className="text-sm text-muted-foreground">{category.count} tools</div>
                  </div>
                </div>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent className="card-padding pt-0">
                <Button 
                  onClick={() => onNavigate(category.page)} 
                  variant={isActive ? "default" : "outline"}
                  className="w-full min-h-[44px]"
                >
                  {isActive ? 'Current Category' : `Explore ${category.name}`}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
