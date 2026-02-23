import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SGPACalculator from '@/components/calculators/SGPACalculator';

interface SGPACalculatorPageProps {
  onBack: () => void;
}

export default function SGPACalculatorPage({ onBack }: SGPACalculatorPageProps) {
  useEffect(() => {
    document.title = 'SGPA Calculator | Calculator Hub';
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">SGPA Calculator</h1>
            <p className="text-lg text-muted-foreground">
              Calculate your Semester Grade Point Average with course-wise grade input.
            </p>
          </header>

          <SGPACalculator />

          <section className="mt-8 prose prose-sm max-w-none">
            <h2 className="text-xl font-semibold mb-3">About SGPA Calculator</h2>
            <p className="text-muted-foreground mb-4">
              SGPA (Semester Grade Point Average) represents your academic performance for a single semester. Enter your course grade points (0-10 scale) and credit hours to calculate your SGPA instantly.
            </p>
            <p className="text-muted-foreground">
              The calculation uses the weighted average formula: SGPA = Σ(grade points × credits) / Σ(credits), giving you accurate results based on your course credits.
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
