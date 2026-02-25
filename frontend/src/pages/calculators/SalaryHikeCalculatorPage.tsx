import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SalaryHikeCalculator from '@/components/calculators/SalaryHikeCalculator';

interface SalaryHikeCalculatorPageProps {
  onBack: () => void;
}

export default function SalaryHikeCalculatorPage({ onBack }: SalaryHikeCalculatorPageProps) {
  useEffect(() => {
    document.title = 'Salary Hike Calculator | Calculator Hub';
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Salary Hike Calculator</h1>
            <p className="text-lg text-muted-foreground">
              Calculate new salary after hike and increment amount.
            </p>
          </header>

          <SalaryHikeCalculator />

          <section className="mt-8 prose prose-sm max-w-none">
            <h2 className="text-xl font-semibold mb-3">About Salary Hike Calculator</h2>
            <p className="text-muted-foreground mb-4">
              Calculate your new salary after a percentage hike or find out what percentage hike you need to reach a desired salary. See monthly and annual increment breakdowns.
            </p>
            <p className="text-muted-foreground">
              Perfect for salary negotiations, appraisal planning, and understanding your compensation growth.
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
