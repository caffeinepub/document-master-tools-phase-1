import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TimeDurationCalculator from '@/components/calculators/TimeDurationCalculator';

interface TimeDurationCalculatorPageProps {
  onBack: () => void;
}

export default function TimeDurationCalculatorPage({ onBack }: TimeDurationCalculatorPageProps) {
  useEffect(() => {
    document.title = 'Time Duration Calculator | Calculator Hub';
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Time Duration Calculator</h1>
            <p className="text-lg text-muted-foreground">
              Calculate time duration between start and end time.
            </p>
          </header>

          <TimeDurationCalculator />

          <section className="mt-8 prose prose-sm max-w-none">
            <h2 className="text-xl font-semibold mb-3">About Time Duration Calculator</h2>
            <p className="text-muted-foreground mb-4">
              Calculate the duration between two times in hours, minutes, and seconds. Handles time spanning across midnight. Also supports adding or subtracting time periods.
            </p>
            <p className="text-muted-foreground">
              Perfect for tracking work hours, calculating meeting durations, or planning schedules.
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
