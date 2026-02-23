import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [frequency, setFrequency] = useState('12');

  const calculate = () => {
    const P = parseFloat(principal) || 0;
    const r = (parseFloat(rate) || 0) / 100;
    const t = parseFloat(time) || 0;
    const n = parseFloat(frequency);

    if (P === 0 || r === 0 || t === 0) {
      return { amount: '0.00', interest: '0.00' };
    }

    const A = P * Math.pow(1 + r / n, n * t);
    const interest = A - P;

    return { amount: A.toFixed(2), interest: interest.toFixed(2) };
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
            <Label htmlFor="rate" className="text-sm font-medium">Annual Interest Rate (%)</Label>
            <Input id="rate" type="number" min="0" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="e.g., 8.5" className="mt-2" />
          </div>
          <div>
            <Label htmlFor="time" className="text-sm font-medium">Time Period (Years)</Label>
            <Input id="time" type="number" min="0" step="0.1" value={time} onChange={(e) => setTime(e.target.value)} placeholder="e.g., 5" className="mt-2" />
          </div>
          <div>
            <Label htmlFor="frequency" className="text-sm font-medium">Compounding Frequency</Label>
            <Select value={frequency} onValueChange={setFrequency}>
              <SelectTrigger id="frequency" className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Yearly</SelectItem>
                <SelectItem value="2">Half-yearly</SelectItem>
                <SelectItem value="4">Quarterly</SelectItem>
                <SelectItem value="12">Monthly</SelectItem>
                <SelectItem value="365">Daily</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b">
            <span className="text-sm text-muted-foreground">Principal</span>
            <span className="text-lg font-semibold">₹{principal || '0.00'}</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b">
            <span className="text-sm text-muted-foreground">Interest Earned</span>
            <span className="text-lg font-semibold text-green-600">₹{result.interest}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Final Amount</span>
            <span className="text-2xl font-bold text-primary">₹{result.amount}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
