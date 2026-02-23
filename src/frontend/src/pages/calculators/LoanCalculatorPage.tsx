import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LoanCalculator from '@/components/calculators/LoanCalculator';

interface LoanCalculatorPageProps {
  onBack: () => void;
}

export default function LoanCalculatorPage({ onBack }: LoanCalculatorPageProps) {
  useEffect(() => {
    document.title = 'Loan Calculator | Calculator Hub';
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Loan Calculator</h1>
            <p className="text-lg text-muted-foreground">
              Calculate loan tenure and total interest from monthly payment amount.
            </p>
          </header>

          <LoanCalculator />

          <section className="mt-8 prose prose-sm max-w-none">
            <h2 className="text-xl font-semibold mb-3">About Loan Calculator</h2>
            <p className="text-muted-foreground mb-4">
              Calculate how long it will take to repay a loan based on your monthly payment capacity. Enter loan amount, interest rate, and monthly payment to find out the tenure and total interest payable.
            </p>
            <p className="text-muted-foreground">
              The calculator validates that your monthly payment is sufficient to cover the interest, ensuring realistic repayment scenarios.
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
