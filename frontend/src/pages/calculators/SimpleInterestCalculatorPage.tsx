import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SimpleInterestCalculator from '@/components/calculators/SimpleInterestCalculator';

interface SimpleInterestCalculatorPageProps {
  onBack: () => void;
}

export default function SimpleInterestCalculatorPage({ onBack }: SimpleInterestCalculatorPageProps) {
  useEffect(() => {
    document.title = 'Simple Interest Calculator | Calculator Hub';
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Simple Interest Calculator</h1>
            <p className="text-lg text-muted-foreground">
              Calculate simple interest from principal, rate, and time.
            </p>
          </header>

          <SimpleInterestCalculator />

          <section className="mt-8 prose prose-sm max-w-none">
            <h2 className="text-xl font-semibold mb-3">About Simple Interest Calculator</h2>
            <p className="text-muted-foreground mb-4">
              Calculate simple interest on loans or investments using the straightforward formula: SI = (P × R × T) / 100. Enter principal amount, annual interest rate, and time period to get instant results.
            </p>
            <p className="text-muted-foreground">
              Simple interest is calculated only on the principal amount, making it easy to understand and calculate for short-term loans and deposits.
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
