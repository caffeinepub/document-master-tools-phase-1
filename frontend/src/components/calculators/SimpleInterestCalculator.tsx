import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SimpleInterestCalculator() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');

  const calculate = () => {
    const P = parseFloat(principal) || 0;
    const R = parseFloat(rate) || 0;
    const T = parseFloat(time) || 0;

    const SI = (P * R * T) / 100;
    const total = P + SI;

    return { interest: SI.toFixed(2), total: total.toFixed(2) };
  };

  const result = calculate();

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardContent className="pt-6 space-y-6">
          <div>
            <Label htmlFor="principal" className="text-sm font-medium">Principal Amount (₹)</Label>
            <Input id="principal" type="number" min="0" value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder="e.g., 100000" className="mt-2" />
          </div>
          <div>
            <Label htmlFor="rate" className="text-sm font-medium">Rate of Interest (% per annum)</Label>
            <Input id="rate" type="number" min="0" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="e.g., 8.5" className="mt-2" />
          </div>
          <div>
            <Label htmlFor="time" className="text-sm font-medium">Time Period (Years)</Label>
            <Input id="time" type="number" min="0" step="0.1" value={time} onChange={(e) => setTime(e.target.value)} placeholder="e.g., 5" className="mt-2" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="text-sm space-y-2">
            <p className="font-semibold">Formula:</p>
            <p className="font-mono text-xs bg-background p-2 rounded">SI = (P × R × T) / 100</p>
            <p className="text-xs text-muted-foreground">
              P = {principal || '0'}, R = {rate || '0'}%, T = {time || '0'} years
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b">
            <span className="text-sm text-muted-foreground">Simple Interest</span>
            <span className="text-2xl font-bold text-primary">₹{result.interest}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Total Amount</span>
            <span className="text-xl font-bold">₹{result.total}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
