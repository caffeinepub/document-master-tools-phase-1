import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BMICalculator from '@/components/calculators/BMICalculator';

interface BMICalculatorPageProps {
  onBack: () => void;
}

export default function BMICalculatorPage({ onBack }: BMICalculatorPageProps) {
  useEffect(() => {
    document.title = 'BMI Calculator | Calculator Hub';
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">BMI Calculator</h1>
            <p className="text-lg text-muted-foreground">
              Calculate Body Mass Index (BMI) with weight and height.
            </p>
          </header>

          <BMICalculator />

          <section className="mt-8 prose prose-sm max-w-none">
            <h2 className="text-xl font-semibold mb-3">About BMI Calculator</h2>
            <p className="text-muted-foreground mb-4">
              Calculate your Body Mass Index (BMI) to assess if you are at a healthy weight. Supports both metric (kg/cm) and imperial (lbs/feet-inches) units. Get your BMI category and healthy weight range.
            </p>
            <p className="text-muted-foreground">
              BMI categories: Underweight (less than 18.5), Normal (18.5-24.9), Overweight (25-29.9), Obese (30 or more). Formula: BMI = weight(kg) / height(m) squared.
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
