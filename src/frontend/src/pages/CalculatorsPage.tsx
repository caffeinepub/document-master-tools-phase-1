import { ArrowLeft, GraduationCap, DollarSign, Heart, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface CalculatorsPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

export default function CalculatorsPage({ onBack, onNavigate }: CalculatorsPageProps) {
  const academicCalculators = [
    { id: 'cgpa-calculator', name: 'CGPA Calculator', description: 'Calculate cumulative grade point average' },
    { id: 'sgpa-calculator', name: 'SGPA Calculator', description: 'Calculate semester grade point average' },
    { id: 'cgpa-to-percentage-converter', name: 'CGPA to Percentage', description: 'Convert CGPA to percentage' },
    { id: 'percentage-to-cgpa-converter', name: 'Percentage to CGPA', description: 'Convert percentage to CGPA' },
    { id: 'grade-calculator', name: 'Grade Calculator', description: 'Convert letter grades to points' },
    { id: 'gpa-calculator', name: 'GPA Calculator', description: 'Calculate GPA on 4.0 or 10.0 scale' },
    { id: 'marks-percentage-calculator', name: 'Marks Percentage', description: 'Calculate percentage from marks' },
    { id: 'division-calculator', name: 'Division Calculator', description: 'Determine academic division' },
  ];

  const financialCalculators = [
    { id: 'gst-calculator', name: 'GST Calculator', description: 'Add or remove GST from amount' },
    { id: 'emi-calculator', name: 'EMI Calculator', description: 'Calculate monthly loan EMI' },
    { id: 'loan-calculator', name: 'Loan Calculator', description: 'Calculate loan tenure and interest' },
    { id: 'compound-interest-calculator', name: 'Compound Interest', description: 'Calculate compound interest' },
    { id: 'simple-interest-calculator', name: 'Simple Interest', description: 'Calculate simple interest' },
    { id: 'discount-calculator', name: 'Discount Calculator', description: 'Calculate discounts and savings' },
    { id: 'profit-loss-calculator', name: 'Profit/Loss Calculator', description: 'Calculate profit or loss percentage' },
    { id: 'salary-hike-calculator', name: 'Salary Hike', description: 'Calculate salary increment' },
  ];

  const healthGeneralCalculators = [
    { id: 'bmi-calculator', name: 'BMI Calculator', description: 'Calculate body mass index' },
    { id: 'age-calculator', name: 'Age Calculator', description: 'Calculate age with birthday countdown' },
    { id: 'date-difference-calculator', name: 'Date Difference', description: 'Calculate difference between dates' },
    { id: 'time-duration-calculator', name: 'Time Duration', description: 'Calculate time duration' },
  ];

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Calculator Hub</h1>
          <p className="text-lg text-muted-foreground">
            Professional calculators for academic, financial, and health needs. All calculations are instant and performed in your browser.
          </p>
        </div>

        {/* Academic Calculators */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Academic Calculators</h2>
              <p className="text-sm text-muted-foreground">8 calculators for students and educators</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {academicCalculators.map((calc) => (
              <Card
                key={calc.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                onClick={() => onNavigate(calc.id)}
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-3 group-hover:bg-blue-500/20 transition-colors">
                    <Calculator className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-lg">{calc.name}</CardTitle>
                  <CardDescription>{calc.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Financial Calculators */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Financial Calculators</h2>
              <p className="text-sm text-muted-foreground">8 calculators for financial planning</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {financialCalculators.map((calc) => (
              <Card
                key={calc.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                onClick={() => onNavigate(calc.id)}
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-3 group-hover:bg-green-500/20 transition-colors">
                    <Calculator className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-lg">{calc.name}</CardTitle>
                  <CardDescription>{calc.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Health & General Calculators */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center">
              <Heart className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Health & General Calculators</h2>
              <p className="text-sm text-muted-foreground">4 calculators for health and time</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {healthGeneralCalculators.map((calc) => (
              <Card
                key={calc.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                onClick={() => onNavigate(calc.id)}
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center mb-3 group-hover:bg-red-500/20 transition-colors">
                    <Calculator className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <CardTitle className="text-lg">{calc.name}</CardTitle>
                  <CardDescription>{calc.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
