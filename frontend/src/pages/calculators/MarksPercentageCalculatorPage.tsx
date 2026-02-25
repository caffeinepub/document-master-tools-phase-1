import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MarksPercentageCalculator from '@/components/calculators/MarksPercentageCalculator';

interface MarksPercentageCalculatorPageProps {
  onBack: () => void;
}

export default function MarksPercentageCalculatorPage({ onBack }: MarksPercentageCalculatorPageProps) {
  useEffect(() => {
    document.title = 'Marks Percentage Calculator | Calculator Hub';
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Marks Percentage Calculator</h1>
            <p className="text-lg text-muted-foreground">
              Calculate percentage from obtained marks and total marks.
            </p>
          </header>

          <MarksPercentageCalculator />

          <section className="mt-8 prose prose-sm max-w-none">
            <h2 className="text-xl font-semibold mb-3">About Marks Percentage Calculator</h2>
            <p className="text-muted-foreground mb-4">
              Calculate your exam percentage by entering obtained marks and total marks. The calculator shows your percentage with pass/fail indication based on 40% threshold.
            </p>
            <p className="text-muted-foreground">
              Formula: Percentage = (Obtained Marks / Total Marks) × 100. Results are displayed with two decimal places for accuracy.
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
