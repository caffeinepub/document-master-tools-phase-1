import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function DivisionCalculator() {
  const [percentage, setPercentage] = useState('');

  const getDivision = () => {
    const perc = parseFloat(percentage) || 0;
    if (perc >= 60) return { division: 'First Division', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-950/20' };
    if (perc >= 50) return { division: 'Second Division', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/20' };
    if (perc >= 40) return { division: 'Third Division', color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-50 dark:bg-yellow-950/20' };
    return { division: 'Fail', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-950/20' };
  };

  const result = getDivision();

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardContent className="pt-6">
          <Label htmlFor="percentage" className="text-sm font-medium">Percentage (0-100)</Label>
          <Input
            id="percentage"
            type="number"
            min="0"
            max="100"
            step="0.01"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
            placeholder="e.g., 75"
            className="mt-2"
          />
        </CardContent>
      </Card>

      <Card className={`${result.bg} border-2`}>
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Division</p>
            <p className={`text-4xl font-bold ${result.color}`}>{result.division}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-3 text-sm">Division Criteria</h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between p-2 bg-green-50 dark:bg-green-950/20 rounded">
              <span>First Division</span>
              <span className="font-medium">≥ 60%</span>
            </div>
            <div className="flex justify-between p-2 bg-blue-50 dark:bg-blue-950/20 rounded">
              <span>Second Division</span>
              <span className="font-medium">50% - 59%</span>
            </div>
            <div className="flex justify-between p-2 bg-yellow-50 dark:bg-yellow-950/20 rounded">
              <span>Third Division</span>
              <span className="font-medium">40% - 49%</span>
            </div>
            <div className="flex justify-between p-2 bg-red-50 dark:bg-red-950/20 rounded">
              <span>Fail</span>
              <span className="font-medium">&lt; 40%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
