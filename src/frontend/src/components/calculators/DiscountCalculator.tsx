import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function DiscountCalculator() {
  const [mode, setMode] = useState<'percentage' | 'amount'>('percentage');
  const [originalPrice, setOriginalPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [salePrice, setSalePrice] = useState('');

  const calculate = () => {
    const original = parseFloat(originalPrice) || 0;

    if (mode === 'percentage') {
      const discountPercent = parseFloat(discount) || 0;
      const discountAmount = (original * discountPercent) / 100;
      const final = original - discountAmount;
      return { discountAmount: discountAmount.toFixed(2), finalPrice: final.toFixed(2), savings: discountAmount.toFixed(2) };
    } else {
      const sale = parseFloat(salePrice) || 0;
      const discountAmount = original - sale;
      const discountPercent = original > 0 ? (discountAmount / original) * 100 : 0;
      return { discountPercent: discountPercent.toFixed(2), discountAmount: discountAmount.toFixed(2), savings: discountAmount.toFixed(2) };
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
                  <Label htmlFor="percentage" className="cursor-pointer">From Discount %</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="amount" id="amount" />
                  <Label htmlFor="amount" className="cursor-pointer">From Sale Price</Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="original" className="text-sm font-medium">Original Price (₹)</Label>
            <Input id="original" type="number" min="0" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} placeholder="e.g., 1000" className="mt-2" />
          </div>

          {mode === 'percentage' ? (
            <div>
              <Label htmlFor="discount" className="text-sm font-medium">Discount Percentage (%)</Label>
              <Input id="discount" type="number" min="0" max="100" value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder="e.g., 20" className="mt-2" />
            </div>
          ) : (
            <div>
              <Label htmlFor="sale" className="text-sm font-medium">Sale Price (₹)</Label>
              <Input id="sale" type="number" min="0" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} placeholder="e.g., 800" className="mt-2" />
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6 space-y-4">
          {mode === 'percentage' ? (
            <>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-sm text-muted-foreground">Discount Amount</span>
                <span className="text-lg font-semibold text-red-600">₹{result.discountAmount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Final Price</span>
                <span className="text-2xl font-bold text-primary">₹{result.finalPrice}</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-sm text-muted-foreground">Discount Percentage</span>
                <span className="text-lg font-semibold text-red-600">{result.discountPercent}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">You Save</span>
                <span className="text-2xl font-bold text-green-600">₹{result.discountAmount}</span>
              </div>
            </>
          )}
          <div className="pt-4 border-t text-center">
            <p className="text-sm text-muted-foreground">You Save</p>
            <p className="text-3xl font-bold text-green-600">₹{result.savings}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
