import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, FileText, Image, Scissors, Minimize2, DollarSign, Heart, Hash, FileType } from 'lucide-react';

interface CrossCategorySuggestionsProps {
  currentCategory: 'calculator' | 'pdf' | 'image';
  onNavigate: (page: string) => void;
}

export default function CrossCategorySuggestions({ currentCategory, onNavigate }: CrossCategorySuggestionsProps) {
  const allSuggestions = {
    calculator: [
      { page: 'pdf-tools', name: 'PDF Merge', description: 'Combine multiple PDFs', icon: FileText, category: 'PDF Tools' },
      { page: 'pdf-tools', name: 'PDF Compress', description: 'Reduce PDF file size', icon: Minimize2, category: 'PDF Tools' },
      { page: 'image-compressor', name: 'Image Compressor', description: 'Compress images', icon: Image, category: 'Image Tools' },
      { page: 'passport-photo-maker', name: 'Passport Photo', description: 'Create passport photos', icon: Image, category: 'Image Tools' },
    ],
    pdf: [
      { page: 'gst-calculator', name: 'GST Calculator', description: 'Calculate GST amounts', icon: Calculator, category: 'Calculators' },
      { page: 'emi-calculator', name: 'EMI Calculator', description: 'Calculate loan EMI', icon: DollarSign, category: 'Calculators' },
      { page: 'image-compressor', name: 'Image Compressor', description: 'Compress images', icon: Image, category: 'Image Tools' },
      { page: 'jpg-to-png', name: 'JPG to PNG', description: 'Convert image formats', icon: FileType, category: 'Image Tools' },
    ],
    image: [
      { page: 'cgpa-calculator', name: 'CGPA Calculator', description: 'Calculate CGPA', icon: Calculator, category: 'Calculators' },
      { page: 'bmi-calculator', name: 'BMI Calculator', description: 'Calculate BMI', icon: Heart, category: 'Calculators' },
      { page: 'pdf-tools', name: 'PDF Merge', description: 'Combine PDFs', icon: FileText, category: 'PDF Tools' },
      { page: 'pdf-tools', name: 'PDF Compress', description: 'Reduce PDF size', icon: Minimize2, category: 'PDF Tools' },
    ]
  };

  const suggestions = allSuggestions[currentCategory];

  return (
    <section className="mt-12 pt-8 border-t">
      <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {suggestions.map((suggestion, index) => {
          const Icon = suggestion.icon;
          return (
            <Card 
              key={index} 
              className="hover:shadow-lg hover:scale-105 hover:border-primary/50 transition-all duration-200 cursor-pointer"
              onClick={() => onNavigate(suggestion.page)}
            >
              <CardHeader className="card-padding">
                <div className="text-xs font-medium text-primary mb-2">{suggestion.category}</div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-base">{suggestion.name}</CardTitle>
                </div>
                <CardDescription className="text-sm">{suggestion.description}</CardDescription>
              </CardHeader>
              <CardContent className="card-padding pt-0">
                <Button variant="ghost" className="w-full min-h-[44px]" onClick={() => onNavigate(suggestion.page)}>
                  Try Now →
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
