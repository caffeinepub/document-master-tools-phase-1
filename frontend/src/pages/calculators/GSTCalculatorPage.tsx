import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GSTCalculator from '@/components/calculators/GSTCalculator';

interface GSTCalculatorPageProps {
  onBack: () => void;
}

export default function GSTCalculatorPage({ onBack }: GSTCalculatorPageProps) {
  useEffect(() => {
    document.title = 'GST Calculator (Add/Remove GST) | Calculator Hub';
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">GST Calculator (Add/Remove GST)</h1>
            <p className="text-lg text-muted-foreground">
              Add or remove GST from amount. Calculate GST with multiple tax rates.
            </p>
          </header>

          <GSTCalculator />

          <section className="mt-8 prose prose-sm max-w-none">
            <h2 className="text-xl font-semibold mb-3">About GST Calculator</h2>
            <p className="text-muted-foreground mb-4">
              Calculate GST (Goods and Services Tax) by adding or removing it from amounts. Supports standard GST rates of 5%, 12%, 18%, 28%, and custom rates.
            </p>
            <p className="text-muted-foreground">
              Add GST mode calculates total amount from base price. Remove GST mode extracts base amount from GST-inclusive price. Perfect for businesses and shoppers.
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
