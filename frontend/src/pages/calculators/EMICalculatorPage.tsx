import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EMICalculator from '@/components/calculators/EMICalculator';

interface EMICalculatorPageProps {
  onBack: () => void;
}

export default function EMICalculatorPage({ onBack }: EMICalculatorPageProps) {
  useEffect(() => {
    document.title = 'EMI Calculator | Calculator Hub';
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">EMI Calculator</h1>
            <p className="text-lg text-muted-foreground">
              Calculate monthly EMI for loans with interest rate and tenure.
            </p>
          </header>

          <EMICalculator />

          <section className="mt-8 prose prose-sm max-w-none">
            <h2 className="text-xl font-semibold mb-3">About EMI Calculator</h2>
            <p className="text-muted-foreground mb-4">
              Calculate your Equated Monthly Installment (EMI) for home loans, car loans, or personal loans. Enter loan amount, interest rate, and tenure to get monthly payment amount, total interest, and payment breakdown.
            </p>
            <p className="text-muted-foreground">
              Formula: EMI = [P × R × (1+R)^N] / [(1+R)^N-1] where P is principal, R is monthly interest rate, and N is number of months.
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
