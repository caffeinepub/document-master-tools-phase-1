import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CGPACalculator from '@/components/calculators/CGPACalculator';

interface CGPACalculatorPageProps {
  onBack: () => void;
}

export default function CGPACalculatorPage({ onBack }: CGPACalculatorPageProps) {
  useEffect(() => {
    document.title = 'CGPA Calculator | Calculator Hub';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Calculate your Cumulative Grade Point Average (CGPA) with semester-wise grade input and credit hours. Free online CGPA calculator with instant results.');
    }
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
            <h1 className="text-3xl md:text-4xl font-bold mb-3">CGPA Calculator</h1>
            <p className="text-lg text-muted-foreground">
              Calculate your Cumulative Grade Point Average across multiple semesters with ease.
            </p>
          </header>

          <CGPACalculator />

          <section className="mt-8 prose prose-sm max-w-none">
            <h2 className="text-xl font-semibold mb-3">About CGPA Calculator</h2>
            <p className="text-muted-foreground mb-4">
              The CGPA (Cumulative Grade Point Average) Calculator helps students calculate their overall academic performance across multiple semesters. Simply add your semesters, enter the grade points and credits for each course, and get instant results.
            </p>
            <p className="text-muted-foreground mb-4">
              CGPA is calculated using the formula: CGPA = Σ(grade points × credits) / Σ(credits). This weighted average gives you an accurate representation of your academic standing on a 10.0 scale.
            </p>
            <p className="text-muted-foreground">
              This calculator is perfect for engineering students, university students, and anyone tracking their academic progress across multiple terms.
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
