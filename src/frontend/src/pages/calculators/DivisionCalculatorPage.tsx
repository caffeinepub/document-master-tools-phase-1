import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DivisionCalculator from '@/components/calculators/DivisionCalculator';

interface DivisionCalculatorPageProps {
  onBack: () => void;
}

export default function DivisionCalculatorPage({ onBack }: DivisionCalculatorPageProps) {
  useEffect(() => {
    document.title = 'Division Calculator (1st/2nd/3rd Division) | Calculator Hub';
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Division Calculator (1st/2nd/3rd Division)</h1>
            <p className="text-lg text-muted-foreground">
              Calculate academic division based on percentage.
            </p>
          </header>

          <DivisionCalculator />

          <section className="mt-8 prose prose-sm max-w-none">
            <h2 className="text-xl font-semibold mb-3">About Division Calculator</h2>
            <p className="text-muted-foreground mb-4">
              Determine your academic division classification based on percentage marks. First Division (60% or more), Second Division (50-59%), Third Division (40-49%), or Fail (less than 40%).
            </p>
            <p className="text-muted-foreground">
              This classification system is commonly used in Indian educational institutions for exam results and academic records.
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
