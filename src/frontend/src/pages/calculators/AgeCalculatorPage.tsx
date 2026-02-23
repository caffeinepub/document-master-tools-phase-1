import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AgeCalculator from '@/components/calculators/AgeCalculator';

interface AgeCalculatorPageProps {
  onBack: () => void;
}

export default function AgeCalculatorPage({ onBack }: AgeCalculatorPageProps) {
  useEffect(() => {
    document.title = 'Age Calculator with Birthday Countdown | Calculator Hub';
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Age Calculator with Birthday Countdown</h1>
            <p className="text-lg text-muted-foreground">
              Calculate exact age in years, months, days from date of birth.
            </p>
          </header>

          <AgeCalculator />

          <section className="mt-8 prose prose-sm max-w-none">
            <h2 className="text-xl font-semibold mb-3">About Age Calculator</h2>
            <p className="text-muted-foreground mb-4">
              Calculate your exact age in years, months, and days from your date of birth. Also see your age in total months, weeks, days, and hours. Get a countdown to your next birthday.
            </p>
            <p className="text-muted-foreground">
              Perfect for filling forms, tracking milestones, or just satisfying your curiosity about your exact age.
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
