import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [height, setHeight] = useState('');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'ft'>('cm');
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');

  const calculateBMI = () => {
    let weightKg = parseFloat(weight) || 0;
    if (weightUnit === 'lbs') {
      weightKg = weightKg * 0.453592;
    }

    let heightM = 0;
    if (heightUnit === 'cm') {
      heightM = (parseFloat(height) || 0) / 100;
    } else {
      const ft = parseFloat(feet) || 0;
      const inch = parseFloat(inches) || 0;
      heightM = (ft * 30.48 + inch * 2.54) / 100;
    }

    if (weightKg === 0 || heightM === 0) {
      return { bmi: '0.0', category: 'N/A', color: 'text-muted-foreground', healthyRange: 'N/A' };
    }

    const bmi = weightKg / (heightM * heightM);
    let category = '';
    let color = '';

    if (bmi < 18.5) {
      category = 'Underweight';
      color = 'text-blue-600 dark:text-blue-400';
    } else if (bmi < 25) {
      category = 'Normal';
      color = 'text-green-600 dark:text-green-400';
    } else if (bmi < 30) {
      category = 'Overweight';
      color = 'text-yellow-600 dark:text-yellow-400';
    } else {
      category = 'Obese';
      color = 'text-red-600 dark:text-red-400';
    }

    const minHealthy = (18.5 * heightM * heightM).toFixed(1);
    const maxHealthy = (24.9 * heightM * heightM).toFixed(1);
    const healthyRange = `${minHealthy} - ${maxHealthy} ${weightUnit}`;

    return { bmi: bmi.toFixed(1), category, color, healthyRange };
  };

  const result = calculateBMI();

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardContent className="pt-6 space-y-6">
          <div>
            <Label htmlFor="weight" className="text-sm font-medium">
              Weight
            </Label>
            <div className="flex gap-3 mt-2">
              <Input
                id="weight"
                type="number"
                min="0"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g., 70"
                className="flex-1"
              />
              <RadioGroup value={weightUnit} onValueChange={(value) => setWeightUnit(value as 'kg' | 'lbs')} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="kg" id="kg" />
                  <Label htmlFor="kg" className="cursor-pointer">kg</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="lbs" id="lbs" />
                  <Label htmlFor="lbs" className="cursor-pointer">lbs</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium">Height</Label>
            <RadioGroup value={heightUnit} onValueChange={(value) => setHeightUnit(value as 'cm' | 'ft')} className="flex gap-4 mt-2 mb-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cm" id="cm" />
                <Label htmlFor="cm" className="cursor-pointer">cm</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ft" id="ft" />
                <Label htmlFor="ft" className="cursor-pointer">feet/inches</Label>
              </div>
            </RadioGroup>
            {heightUnit === 'cm' ? (
              <Input
                type="number"
                min="0"
                step="0.1"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="e.g., 170"
              />
            ) : (
              <div className="flex gap-3">
                <Input
                  type="number"
                  min="0"
                  step="1"
                  value={feet}
                  onChange={(e) => setFeet(e.target.value)}
                  placeholder="Feet"
                  className="flex-1"
                />
                <Input
                  type="number"
                  min="0"
                  max="11"
                  step="1"
                  value={inches}
                  onChange={(e) => setInches(e.target.value)}
                  placeholder="Inches"
                  className="flex-1"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Your BMI</p>
              <p className="text-5xl font-bold text-primary">{result.bmi}</p>
            </div>
            <div>
              <p className={`text-2xl font-semibold ${result.color}`}>{result.category}</p>
            </div>
            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground mb-1">Healthy Weight Range</p>
              <p className="text-sm font-medium">{result.healthyRange}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-3 text-sm">BMI Categories</h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between p-2 bg-blue-50 dark:bg-blue-950/20 rounded">
              <span>Underweight</span>
              <span className="font-medium">&lt; 18.5</span>
            </div>
            <div className="flex justify-between p-2 bg-green-50 dark:bg-green-950/20 rounded">
              <span>Normal</span>
              <span className="font-medium">18.5 - 24.9</span>
            </div>
            <div className="flex justify-between p-2 bg-yellow-50 dark:bg-yellow-950/20 rounded">
              <span>Overweight</span>
              <span className="font-medium">25 - 29.9</span>
            </div>
            <div className="flex justify-between p-2 bg-red-50 dark:bg-red-950/20 rounded">
              <span>Obese</span>
              <span className="font-medium">≥ 30</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
