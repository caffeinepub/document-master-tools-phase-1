import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GPACalculator from '@/components/calculators/GPACalculator';

interface GPACalculatorPageProps {
  onBack: () => void;
}

export default function GPACalculatorPage({ onBack }: GPACalculatorPageProps) {
  useEffect(() => {
    document.title = 'GPA Calculator (4.0 & 10.0 Scale) | Calculator Hub';
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">GPA Calculator (4.0 & 10.0 Scale)</h1>
            <p className="text-lg text-muted-foreground">
              Calculate your GPA on 4.0 or 10.0 scale with course-wise grade input.
            </p>
          </header>

          <GPACalculator />

          <section className="mt-8 prose prose-sm max-w-none">
            <h2 className="text-xl font-semibold mb-3">About GPA Calculator</h2>
            <p className="text-muted-foreground mb-4">
              Calculate your Grade Point Average on either 4.0 scale (common in US universities) or 10.0 scale (common in Indian institutions). The calculator supports both scales with instant switching.
            </p>
            <p className="text-muted-foreground">
              Enter your course grades and credit hours to calculate your weighted GPA and total credits attempted.
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
