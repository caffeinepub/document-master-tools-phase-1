import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function CGPAToPercentageConverter() {
  const [cgpa, setCgpa] = useState('');
  const [formula, setFormula] = useState<'cbse' | 'engineering'>('cbse');

  const calculatePercentage = () => {
    const cgpaValue = parseFloat(cgpa) || 0;
    if (formula === 'cbse') {
      return (cgpaValue * 9.5).toFixed(2);
    } else {
      return (cgpaValue * 10).toFixed(2);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardContent className="pt-6 space-y-6">
          <div>
            <Label htmlFor="cgpa" className="text-sm font-medium">
              Enter CGPA (0-10)
            </Label>
            <Input
              id="cgpa"
              type="number"
              min="0"
              max="10"
              step="0.01"
              value={cgpa}
              onChange={(e) => setCgpa(e.target.value)}
              placeholder="e.g., 8.5"
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
                  <div className="text-xs text-muted-foreground">Percentage = CGPA × 9.5</div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg border bg-background hover:bg-accent transition-colors">
                <RadioGroupItem value="engineering" id="engineering" />
                <Label htmlFor="engineering" className="flex-1 cursor-pointer">
                  <div className="font-medium">Engineering Formula</div>
                  <div className="text-xs text-muted-foreground">Percentage = CGPA × 10</div>
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
              <p className="text-sm text-muted-foreground mb-2">Percentage</p>
              <p className="text-4xl font-bold text-primary">{calculatePercentage()}%</p>
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
