import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function PercentageToCGPAConverter() {
  const [percentage, setPercentage] = useState('');
  const [formula, setFormula] = useState<'cbse' | 'engineering'>('cbse');

  const calculateCGPA = () => {
    const percentageValue = parseFloat(percentage) || 0;
    if (formula === 'cbse') {
      return (percentageValue / 9.5).toFixed(2);
    } else {
      return (percentageValue / 10).toFixed(2);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardContent className="pt-6 space-y-6">
          <div>
            <Label htmlFor="percentage" className="text-sm font-medium">
              Enter Percentage (0-100)
            </Label>
            <Input
              id="percentage"
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              placeholder="e.g., 85.5"
              className="mt-2"
            />
          </div>

          <div>
            <Label className="text-sm font-medium mb-3 block">Select Formula</Label>
            <RadioGroup value={formula} onValueChange={(value) => setFormula(value as 'cbse' | 'engineering')}>
              <div className="flex items-center space-x-2 p-3 rounded-lg border bg-background hover:bg-accent transition-colors">
                <RadioGroupItem value="cbse" id="cbse" />
                <Label htmlFor="cbse" className="flex-1 cursor-pointer">
                  <div className="font-medium">CBSE Formula</div>
                  <div className="text-xs text-muted-foreground">CGPA = Percentage ÷ 9.5</div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg border bg-background hover:bg-accent transition-colors">
                <RadioGroupItem value="engineering" id="engineering" />
                <Label htmlFor="engineering" className="flex-1 cursor-pointer">
                  <div className="font-medium">Engineering Formula</div>
                  <div className="text-xs text-muted-foreground">CGPA = Percentage ÷ 10</div>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">CGPA</p>
              <p className="text-4xl font-bold text-primary">{calculateCGPA()}</p>
              <p className="text-xs text-muted-foreground mt-2">on 10.0 scale</p>
            </div>
            <div className="text-xs text-muted-foreground">
              Using {formula === 'cbse' ? 'CBSE' : 'Engineering'} formula
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
