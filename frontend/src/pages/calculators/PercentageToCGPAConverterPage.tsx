import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PercentageToCGPAConverter from '@/components/calculators/PercentageToCGPAConverter';

interface PercentageToCGPAConverterPageProps {
  onBack: () => void;
}

export default function PercentageToCGPAConverterPage({ onBack }: PercentageToCGPAConverterPageProps) {
  useEffect(() => {
    document.title = 'Percentage to CGPA Converter | Calculator Hub';
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Percentage to CGPA Converter</h1>
            <p className="text-lg text-muted-foreground">
              Convert percentage to CGPA using CBSE or Engineering formula.
            </p>
          </header>

          <PercentageToCGPAConverter />

          <section className="mt-8 prose prose-sm max-w-none">
            <h2 className="text-xl font-semibold mb-3">About Percentage to CGPA Conversion</h2>
            <p className="text-muted-foreground mb-4">
              Convert your percentage marks to CGPA using reverse formulas. CBSE formula (Percentage ÷ 9.5) and Engineering formula (Percentage ÷ 10) help you understand your grade point equivalent.
            </p>
            <p className="text-muted-foreground">
              This is useful when applying to institutions that require CGPA instead of percentage marks.
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
