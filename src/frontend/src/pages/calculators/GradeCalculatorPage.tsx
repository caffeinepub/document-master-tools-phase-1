import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GradeCalculator from '@/components/calculators/GradeCalculator';

interface GradeCalculatorPageProps {
  onBack: () => void;
}

export default function GradeCalculatorPage({ onBack }: GradeCalculatorPageProps) {
  useEffect(() => {
    document.title = 'Grade Calculator | Calculator Hub';
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Grade Calculator</h1>
            <p className="text-lg text-muted-foreground">
              Convert letter grades (A+, A, B, C, etc.) to grade points and calculate GPA.
            </p>
          </header>

          <GradeCalculator />

          <section className="mt-8 prose prose-sm max-w-none">
            <h2 className="text-xl font-semibold mb-3">About Grade Calculator</h2>
            <p className="text-muted-foreground mb-4">
              The Grade Calculator converts letter grades to numerical grade points and calculates your overall GPA. The standard scale assigns A+ = 10, A = 9, B+ = 8, and so on.
            </p>
            <p className="text-muted-foreground">
              Enter your letter grades and credit hours for each course to get your weighted GPA instantly.
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
