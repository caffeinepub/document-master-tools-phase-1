import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function MarksPercentageCalculator() {
  const [obtained, setObtained] = useState('');
  const [total, setTotal] = useState('');

  const calculate = () => {
    const obt = parseFloat(obtained) || 0;
    const tot = parseFloat(total) || 0;
    if (tot === 0) return { percentage: '0.00', pass: false, error: false };
    if (obt > tot) return { percentage: '0.00', pass: false, error: true };
    const percentage = (obt / tot) * 100;
    return { percentage: percentage.toFixed(2), pass: percentage >= 40, error: false };
  };

  const result = calculate();

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardContent className="pt-6 space-y-6">
          <div>
            <Label htmlFor="obtained" className="text-sm font-medium">Obtained Marks</Label>
            <Input
              id="obtained"
              type="number"
              min="0"
              value={obtained}
              onChange={(e) => setObtained(e.target.value)}
              placeholder="e.g., 450"
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="total" className="text-sm font-medium">Total Marks</Label>
            <Input
              id="total"
              type="number"
              min="0"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              placeholder="e.g., 500"
              className="mt-2"
            />
          </div>
        </CardContent>
      </Card>

      {result.error && (
        <Alert variant="destructive">
          <AlertDescription>Obtained marks cannot exceed total marks</AlertDescription>
        </Alert>
      )}

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Percentage</p>
              <p className="text-5xl font-bold text-primary">{result.percentage}%</p>
            </div>
            {!result.error && parseFloat(total) > 0 && (
              <div className={`flex items-center justify-center gap-2 ${result.pass ? 'text-green-600' : 'text-red-600'}`}>
                {result.pass ? <CheckCircle2 className="h-6 w-6" /> : <XCircle className="h-6 w-6" />}
                <span className="text-lg font-semibold">{result.pass ? 'Pass' : 'Fail'}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
