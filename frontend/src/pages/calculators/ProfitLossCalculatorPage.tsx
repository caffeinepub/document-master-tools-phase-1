import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProfitLossCalculator from '@/components/calculators/ProfitLossCalculator';

interface ProfitLossCalculatorPageProps {
  onBack: () => void;
}

export default function ProfitLossCalculatorPage({ onBack }: ProfitLossCalculatorPageProps) {
  useEffect(() => {
    document.title = 'Profit Loss Percentage Calculator | Calculator Hub';
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Profit Loss Percentage Calculator</h1>
            <p className="text-lg text-muted-foreground">
              Calculate profit or loss percentage from cost price and selling price.
            </p>
          </header>

          <ProfitLossCalculator />

          <section className="mt-8 prose prose-sm max-w-none">
            <h2 className="text-xl font-semibold mb-3">About Profit/Loss Calculator</h2>
            <p className="text-muted-foreground mb-4">
              Calculate profit or loss percentage by entering cost price and selling price. The calculator automatically determines whether you made a profit or loss and shows the percentage.
            </p>
            <p className="text-muted-foreground">
              Formula: Profit/Loss % = ((Selling Price - Cost Price) / Cost Price) × 100. Visual indicators help you quickly identify profitable transactions.
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
