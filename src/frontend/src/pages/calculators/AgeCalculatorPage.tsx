import { ArrowLeft, Calendar, Clock, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AgeCalculator from '@/components/calculators/AgeCalculator';
import SEO from '@/components/SEO';
import BreadcrumbNavigation from '@/components/BreadcrumbNavigation';
import AdPlaceholder from '@/components/AdPlaceholder';
import RelatedTools from '@/components/RelatedTools';
import ToolCategories from '@/components/ToolCategories';

interface AgeCalculatorPageProps {
  onBack: () => void;
}

export default function AgeCalculatorPage({ onBack }: AgeCalculatorPageProps) {
  const breadcrumbItems = [
    { label: 'Home', onClick: () => window.history.back() },
    { label: 'Calculators', onClick: onBack },
    { label: 'Age Calculator' }
  ];

  const relatedTools = [
    {
      name: 'Date Difference Calculator',
      description: 'Calculate duration between two dates',
      icon: Calendar,
      onClick: () => window.history.back()
    },
    {
      name: 'BMI Calculator',
      description: 'Calculate Body Mass Index',
      icon: Heart,
      onClick: () => window.history.back()
    },
    {
      name: 'Time Duration Calculator',
      description: 'Calculate time differences',
      icon: Clock,
      onClick: () => window.history.back()
    }
  ];

  return (
    <>
      <SEO
        title="Age Calculator - Free Online Age Calculator | Document Master Tools"
        description="Calculate your exact age in years, months, days, weeks, and hours from your date of birth. Get a countdown to your next birthday with our free online age calculator. Perfect for filling forms, tracking milestones, and age verification. Fast, accurate, and works directly in your browser with complete privacy."
        canonicalUrl={`${window.location.origin}/age-calculator`}
      />

      <main className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button variant="ghost" onClick={onBack} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Calculators
          </Button>

          <BreadcrumbNavigation items={breadcrumbItems} />

          <article>
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">Age Calculator with Birthday Countdown</h1>
              <p className="text-lg text-muted-foreground">
                Calculate exact age in years, months, days from date of birth.
              </p>
            </header>

            <AdPlaceholder adType="banner" />

            <AgeCalculator />

            <AdPlaceholder adType="in-content" />

            <section className="mt-8 prose prose-sm max-w-none">
              <h2 className="text-xl font-semibold mb-3">About Age Calculator</h2>
              <p className="text-muted-foreground mb-4">
                Calculate your exact age in years, months, and days from your date of birth. Also see your age in total months, weeks, days, and hours. Get a countdown to your next birthday.
              </p>
              <p className="text-muted-foreground">
                Perfect for filling forms, tracking milestones, or just satisfying your curiosity about your exact age.
              </p>
            </section>

            <RelatedTools tools={relatedTools} />
            <ToolCategories onNavigate={(page) => window.history.back()} />
          </article>
        </div>
      </main>
    </>
  );
}
