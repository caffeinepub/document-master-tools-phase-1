import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface RelatedTool {
  name: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
}

interface RelatedToolsProps {
  tools: RelatedTool[];
  category?: 'calculator' | 'pdf' | 'image';
}

export default function RelatedTools({ tools, category }: RelatedToolsProps) {
  if (tools.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t">
      <h2 className="text-2xl font-bold mb-6">Related Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => {
          const Icon = tool.icon;
          return (
            <Card 
              key={index} 
              className="hover:shadow-lg hover:scale-105 hover:border-primary/50 transition-all duration-200 cursor-pointer"
              onClick={tool.onClick}
            >
              <CardHeader className="card-padding">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                </div>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardContent className="card-padding pt-0">
                <Button onClick={tool.onClick} variant="outline" className="w-full min-h-[44px]">
                  Try Tool
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
