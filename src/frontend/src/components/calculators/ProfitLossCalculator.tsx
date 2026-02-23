import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function ProfitLossCalculator() {
  const [costPrice, setCostPrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');

  const calculate = () => {
    const CP = parseFloat(costPrice) || 0;
    const SP = parseFloat(sellingPrice) || 0;

    if (CP === 0) return { amount: '0.00', percentage: '0.00', type: 'none' };

    const diff = SP - CP;
    const percentage = (diff / CP) * 100;

    return {
      amount: Math.abs(diff).toFixed(2),
      percentage: Math.abs(percentage).toFixed(2),
      type: diff > 0 ? 'profit' : diff < 0 ? 'loss' : 'none'
    };
  };

  const result = calculate();

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardContent className="pt-6 space-y-6">
          <div>
            <Label htmlFor="cp" className="text-sm font-medium">Cost Price (₹)</Label>
            <Input id="cp" type="number" min="0" value={costPrice} onChange={(e) => setCostPrice(e.target.value)} placeholder="e.g., 500" className="mt-2" />
          </div>
          <div>
            <Label htmlFor="sp" className="text-sm font-medium">Selling Price (₹)</Label>
            <Input id="sp" type="number" min="0" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} placeholder="e.g., 600" className="mt-2" />
          </div>
        </CardContent>
      </Card>

      <Card className={`${result.type === 'profit' ? 'bg-green-50 dark:bg-green-950/20 border-green-200' : result.type === 'loss' ? 'bg-red-50 dark:bg-red-950/20 border-red-200' : 'bg-muted/50'}`}>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            {result.type !== 'none' && (
              <div className={`flex items-center justify-center gap-2 ${result.type === 'profit' ? 'text-green-600' : 'text-red-600'}`}>
                {result.type === 'profit' ? <TrendingUp className="h-8 w-8" /> : <TrendingDown className="h-8 w-8" />}
                <span className="text-2xl font-bold">{result.type === 'profit' ? 'Profit' : 'Loss'}</span>
              </div>
            )}
            <div>
              <p className="text-sm text-muted-foreground mb-2">Amount</p>
              <p className={`text-4xl font-bold ${result.type === 'profit' ? 'text-green-600' : result.type === 'loss' ? 'text-red-600' : 'text-muted-foreground'}`}>
                ₹{result.amount}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Percentage</p>
              <p className={`text-3xl font-bold ${result.type === 'profit' ? 'text-green-600' : result.type === 'loss' ? 'text-red-600' : 'text-muted-foreground'}`}>
                {result.percentage}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="text-sm space-y-2">
            <p className="font-semibold">Formula:</p>
            <p className="font-mono text-xs bg-background p-2 rounded">
              Profit/Loss % = ((Selling Price - Cost Price) / Cost Price) × 100
            </p>
            <p className="text-xs text-muted-foreground">
              CP = ₹{costPrice || '0'}, SP = ₹{sellingPrice || '0'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
