import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('');

  const calculate = () => {
    const P = parseFloat(loanAmount) || 0;
    const annualRate = parseFloat(interestRate) || 0;
    const R = annualRate / 12 / 100;
    const M = parseFloat(monthlyPayment) || 0;

    if (P === 0 || R === 0 || M === 0) {
      return { months: 0, years: '0.0', totalInterest: '0.00', totalAmount: '0.00', error: false };
    }

    const minPayment = P * R;
    if (M <= minPayment) {
      return { months: 0, years: '0.0', totalInterest: '0.00', totalAmount: '0.00', error: true };
    }

    const N = -Math.log(1 - (P * R) / M) / Math.log(1 + R);
    const totalAmount = M * N;
    const totalInterest = totalAmount - P;

    return {
      months: Math.ceil(N),
      years: (N / 12).toFixed(1),
      totalInterest: totalInterest.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
      error: false
    };
  };

  const result = calculate();

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardContent className="pt-6 space-y-6">
          <div>
            <Label htmlFor="loan" className="text-sm font-medium">Loan Amount (₹)</Label>
            <Input id="loan" type="number" min="0" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} placeholder="e.g., 500000" className="mt-2" />
          </div>
          <div>
            <Label htmlFor="rate" className="text-sm font-medium">Annual Interest Rate (%)</Label>
            <Input id="rate" type="number" min="0" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} placeholder="e.g., 10.5" className="mt-2" />
          </div>
          <div>
            <Label htmlFor="payment" className="text-sm font-medium">Monthly Payment (₹)</Label>
            <Input id="payment" type="number" min="0" value={monthlyPayment} onChange={(e) => setMonthlyPayment(e.target.value)} placeholder="e.g., 10000" className="mt-2" />
          </div>
        </CardContent>
      </Card>

      {result.error && (
        <Alert variant="destructive">
          <AlertDescription>Monthly payment is too low to cover interest. Increase the payment amount.</AlertDescription>
        </Alert>
      )}

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6 space-y-4">
          <div className="text-center pb-4 border-b">
            <p className="text-sm text-muted-foreground mb-2">Loan Tenure</p>
            <p className="text-4xl font-bold text-primary">{result.months} months</p>
            <p className="text-sm text-muted-foreground mt-1">({result.years} years)</p>
          </div>
          <div className="flex justify-between items-center pb-2 border-b">
            <span className="text-sm text-muted-foreground">Total Interest</span>
            <span className="text-lg font-semibold text-orange-600">₹{result.totalInterest}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Total Repayment</span>
            <span className="text-xl font-bold">₹{result.totalAmount}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
