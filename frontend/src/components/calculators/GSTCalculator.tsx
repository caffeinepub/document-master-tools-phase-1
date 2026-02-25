import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function GSTCalculator() {
  const [mode, setMode] = useState<'add' | 'remove'>('add');
  const [amount, setAmount] = useState('');
  const [gstRate, setGstRate] = useState('18');
  const [customRate, setCustomRate] = useState('');

  const rate = gstRate === 'custom' ? parseFloat(customRate) || 0 : parseFloat(gstRate);

  const calculate = () => {
    const amt = parseFloat(amount) || 0;
    if (mode === 'add') {
      const gstAmount = (amt * rate) / 100;
      const total = amt + gstAmount;
      return { base: amt.toFixed(2), gst: gstAmount.toFixed(2), total: total.toFixed(2) };
    } else {
      const base = amt / (1 + rate / 100);
      const gstAmount = amt - base;
      return { base: base.toFixed(2), gst: gstAmount.toFixed(2), total: amt.toFixed(2) };
    }
  };

  const result = calculate();

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardContent className="pt-6 space-y-6">
          <div>
            <Label className="text-sm font-medium mb-3 block">Mode</Label>
            <RadioGroup value={mode} onValueChange={(value) => setMode(value as 'add' | 'remove')}>
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="add" id="add" />
                  <Label htmlFor="add" className="cursor-pointer">Add GST</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="remove" id="remove" />
                  <Label htmlFor="remove" className="cursor-pointer">Remove GST</Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="amount" className="text-sm font-medium">
              {mode === 'add' ? 'Base Amount' : 'Total Amount (with GST)'}
            </Label>
            <Input
              id="amount"
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="gst-rate" className="text-sm font-medium">
              GST Rate
            </Label>
            <Select value={gstRate} onValueChange={setGstRate}>
              <SelectTrigger id="gst-rate" className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5%</SelectItem>
                <SelectItem value="12">12%</SelectItem>
                <SelectItem value="18">18%</SelectItem>
                <SelectItem value="28">28%</SelectItem>
                <SelectItem value="custom">Custom Rate</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {gstRate === 'custom' && (
            <div>
              <Label htmlFor="custom-rate" className="text-sm font-medium">
                Custom GST Rate (%)
              </Label>
              <Input
                id="custom-rate"
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={customRate}
                onChange={(e) => setCustomRate(e.target.value)}
                placeholder="Enter custom rate"
                className="mt-2"
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-sm text-muted-foreground">Base Amount</span>
              <span className="text-lg font-semibold">₹{result.base}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-sm text-muted-foreground">GST Amount ({rate}%)</span>
              <span className="text-lg font-semibold text-orange-600">₹{result.gst}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Total Amount</span>
              <span className="text-2xl font-bold text-primary">₹{result.total}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
