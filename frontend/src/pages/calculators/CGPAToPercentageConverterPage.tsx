import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CGPAToPercentageConverter from '@/components/calculators/CGPAToPercentageConverter';

interface CGPAToPercentageConverterPageProps {
  onBack: () => void;
}

export default function CGPAToPercentageConverterPage({ onBack }: CGPAToPercentageConverterPageProps) {
  useEffect(() => {
    document.title = 'CGPA to Percentage Converter | Calculator Hub';
  }, []);

  return (
    <main className="py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Calculators
        </Button>

        <article>
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">CGPA to Percentage Converter</h1>
            <p className="text-lg text-muted-foreground">
              Convert CGPA to percentage using CBSE or Engineering formula.
            </p>
          </header>

          <CGPAToPercentageConverter />

          <section className="mt-8 prose prose-sm max-w-none">
            <h2 className="text-xl font-semibold mb-3">About CGPA to Percentage Conversion</h2>
            <p className="text-muted-foreground mb-4">
              Convert your CGPA to percentage using standard formulas. CBSE formula (CGPA × 9.5) is commonly used for school education, while Engineering formula (CGPA × 10) is used in many technical institutions.
            </p>
            <p className="text-muted-foreground">
              Select the appropriate formula based on your institution's guidelines to get accurate percentage conversion.
            </p>
          </section>

          <aside className="ad-container my-8 p-4 bg-muted/30 rounded-lg text-center text-sm text-muted-foreground">
            Advertisement Space
          </aside>
        </article>
      </div>
    </main>
  );
}
