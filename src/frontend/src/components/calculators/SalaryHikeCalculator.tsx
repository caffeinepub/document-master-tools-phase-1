import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function SalaryHikeCalculator() {
  const [mode, setMode] = useState<'percentage' | 'amount'>('percentage');
  const [currentSalary, setCurrentSalary] = useState('');
  const [hikePercentage, setHikePercentage] = useState('');
  const [desiredSalary, setDesiredSalary] = useState('');

  const calculate = () => {
    const current = parseFloat(currentSalary) || 0;

    if (mode === 'percentage') {
      const hike = parseFloat(hikePercentage) || 0;
      const increment = (current * hike) / 100;
      const newSalary = current + increment;
      return {
        newSalary: newSalary.toFixed(2),
        monthlyIncrement: increment.toFixed(2),
        annualIncrement: (increment * 12).toFixed(2),
        percentage: hike.toFixed(2)
      };
    } else {
      const desired = parseFloat(desiredSalary) || 0;
      const increment = desired - current;
      const hike = current > 0 ? (increment / current) * 100 : 0;
      return {
        requiredHike: hike.toFixed(2),
        monthlyIncrement: increment.toFixed(2),
        annualIncrement: (increment * 12).toFixed(2)
      };
    }
  };

  const result = calculate();

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardContent className="pt-6 space-y-6">
          <div>
            <Label className="text-sm font-medium mb-3 block">Calculation Mode</Label>
            <RadioGroup value={mode} onValueChange={(value) => setMode(value as 'percentage' | 'amount')}>
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="percentage" id="percentage" />
                  <Label htmlFor="percentage" className="cursor-pointer">From Hike %</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="amount" id="amount" />
                  <Label htmlFor="amount" className="cursor-pointer">From Desired Salary</Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="current" className="text-sm font-medium">Current Salary (₹/month)</Label>
            <Input id="current" type="number" min="0" value={currentSalary} onChange={(e) => setCurrentSalary(e.target.value)} placeholder="e.g., 50000" className="mt-2" />
          </div>

          {mode === 'percentage' ? (
            <div>
              <Label htmlFor="hike" className="text-sm font-medium">Hike Percentage (%)</Label>
              <Input id="hike" type="number" min="0" step="0.1" value={hikePercentage} onChange={(e) => setHikePercentage(e.target.value)} placeholder="e.g., 15" className="mt-2" />
            </div>
          ) : (
            <div>
              <Label htmlFor="desired" className="text-sm font-medium">Desired Salary (₹/month)</Label>
              <Input id="desired" type="number" min="0" value={desiredSalary} onChange={(e) => setDesiredSalary(e.target.value)} placeholder="e.g., 60000" className="mt-2" />
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6 space-y-4">
          {mode === 'percentage' ? (
            <>
              <div className="text-center pb-4 border-b">
                <p className="text-sm text-muted-foreground mb-2">New Salary</p>
                <p className="text-4xl font-bold text-primary">₹{result.newSalary}</p>
                <p className="text-xs text-muted-foreground mt-1">per month</p>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-sm text-muted-foreground">Monthly Increment</span>
                <span className="text-lg font-semibold text-green-600">₹{result.monthlyIncrement}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Annual Increment</span>
                <span className="text-xl font-bold text-green-600">₹{result.annualIncrement}</span>
              </div>
            </>
          ) : (
            <>
              <div className="text-center pb-4 border-b">
                <p className="text-sm text-muted-foreground mb-2">Required Hike</p>
                <p className="text-4xl font-bold text-primary">{result.requiredHike}%</p>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-sm text-muted-foreground">Monthly Increment</span>
                <span className="text-lg font-semibold text-green-600">₹{result.monthlyIncrement}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Annual Increment</span>
                <span className="text-xl font-bold text-green-600">₹{result.annualIncrement}</span>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
