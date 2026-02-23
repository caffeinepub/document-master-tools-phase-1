import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CompoundInterestCalculator from '@/components/calculators/CompoundInterestCalculator';

interface CompoundInterestCalculatorPageProps {
  onBack: () => void;
}

export default function CompoundInterestCalculatorPage({ onBack }: CompoundInterestCalculatorPageProps) {
  useEffect(() => {
    document.title = 'Compound Interest Calculator | Calculator Hub';
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Compound Interest Calculator</h1>
            <p className="text-lg text-muted-foreground">
              Calculate compound interest with multiple compounding frequencies.
            </p>
          </header>

          <CompoundInterestCalculator />

          <section className="mt-8 prose prose-sm max-w-none">
            <h2 className="text-xl font-semibold mb-3">About Compound Interest Calculator</h2>
            <p className="text-muted-foreground mb-4">
              Calculate compound interest with various compounding frequencies: yearly, half-yearly, quarterly, monthly, or daily. See how your investment grows over time with compound interest.
            </p>
            <p className="text-muted-foreground">
              Formula: A = P(1 + r/n)^(nt) where A is final amount, P is principal, r is annual rate, n is compounding frequency, and t is time in years.
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
