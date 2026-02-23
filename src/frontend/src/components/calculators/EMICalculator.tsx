import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [tenureType, setTenureType] = useState<'months' | 'years'>('years');

  const calculateEMI = () => {
    const P = parseFloat(loanAmount) || 0;
    const annualRate = parseFloat(interestRate) || 0;
    const R = annualRate / 12 / 100;
    const N = tenureType === 'years' ? (parseFloat(tenure) || 0) * 12 : parseFloat(tenure) || 0;

    if (P === 0 || R === 0 || N === 0) {
      return { emi: '0.00', totalInterest: '0.00', totalAmount: '0.00' };
    }

    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalAmount = emi * N;
    const totalInterest = totalAmount - P;

    return {
      emi: emi.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalAmount: totalAmount.toFixed(2)
    };
  };

  const result = calculateEMI();
  const principal = parseFloat(loanAmount) || 0;
  const interest = parseFloat(result.totalInterest);
  const interestPercentage = principal > 0 ? (interest / (principal + interest)) * 100 : 0;

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardContent className="pt-6 space-y-6">
          <div>
            <Label htmlFor="loan-amount" className="text-sm font-medium">
              Loan Amount (₹)
            </Label>
            <Input
              id="loan-amount"
              type="number"
              min="0"
              step="1000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="e.g., 500000"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="interest-rate" className="text-sm font-medium">
              Annual Interest Rate (%)
            </Label>
            <Input
              id="interest-rate"
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="e.g., 10.5"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="tenure" className="text-sm font-medium">
              Loan Tenure
            </Label>
            <div className="flex gap-3 mt-2">
              <Input
                id="tenure"
                type="number"
                min="0"
                step="1"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                placeholder="e.g., 5"
                className="flex-1"
              />
              <RadioGroup value={tenureType} onValueChange={(value) => setTenureType(value as 'months' | 'years')} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="years" id="years" />
                  <Label htmlFor="years" className="cursor-pointer">Years</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="months" id="months" />
                  <Label htmlFor="months" className="cursor-pointer">Months</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="text-center pb-4 border-b">
              <p className="text-sm text-muted-foreground mb-2">Monthly EMI</p>
              <p className="text-4xl font-bold text-primary">₹{result.emi}</p>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-sm text-muted-foreground">Principal Amount</span>
              <span className="text-lg font-semibold">₹{principal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-sm text-muted-foreground">Total Interest</span>
              <span className="text-lg font-semibold text-orange-600">₹{result.totalInterest}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Total Amount</span>
              <span className="text-xl font-bold">₹{result.totalAmount}</span>
            </div>
            {principal > 0 && (
              <div className="mt-4">
                <div className="flex gap-2 h-8 rounded overflow-hidden">
                  <div 
                    className="bg-primary flex items-center justify-center text-xs text-white font-medium"
                    style={{ width: `${100 - interestPercentage}%` }}
                  >
                    Principal
                  </div>
                  <div 
                    className="bg-orange-500 flex items-center justify-center text-xs text-white font-medium"
                    style={{ width: `${interestPercentage}%` }}
                  >
                    Interest
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
