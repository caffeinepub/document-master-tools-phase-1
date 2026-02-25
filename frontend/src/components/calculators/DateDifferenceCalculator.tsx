import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export default function DateDifferenceCalculator() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [excludeWeekends, setExcludeWeekends] = useState(false);

  const calculateDifference = () => {
    if (!startDate || !endDate) return null;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) return null;

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);

    let weekdays = totalDays;
    if (excludeWeekends) {
      weekdays = 0;
      const current = new Date(start);
      while (current <= end) {
        const day = current.getDay();
        if (day !== 0 && day !== 6) {
          weekdays++;
        }
        current.setDate(current.getDate() + 1);
      }
    }

    return { years, months, days, totalWeeks, totalDays, weekdays };
  };

  const result = calculateDifference();

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardContent className="pt-6 space-y-6">
          <div>
            <Label htmlFor="start" className="text-sm font-medium">Start Date</Label>
            <Input
              id="start"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="end" className="text-sm font-medium">End Date</Label>
            <Input
              id="end"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-2"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="weekends"
              checked={excludeWeekends}
              onCheckedChange={(checked) => setExcludeWeekends(checked as boolean)}
            />
            <Label htmlFor="weekends" className="text-sm cursor-pointer">
              Exclude weekends (count only weekdays)
            </Label>
          </div>
        </CardContent>
      </Card>

      {result && (
        <>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Difference</p>
                  <p className="text-4xl font-bold text-primary">
                    {result.years} years, {result.months} months, {result.days} days
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/50">
            <CardContent className="pt-6 space-y-3">
              <h3 className="font-semibold mb-3 text-sm">Total Duration</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="p-3 bg-background rounded border">
                  <div className="text-muted-foreground text-xs">Total Weeks</div>
                  <div className="font-semibold text-lg">{result.totalWeeks}</div>
                </div>
                <div className="p-3 bg-background rounded border">
                  <div className="text-muted-foreground text-xs">Total Days</div>
                  <div className="font-semibold text-lg">{result.totalDays}</div>
                </div>
                {excludeWeekends && (
                  <div className="p-3 bg-background rounded border col-span-2">
                    <div className="text-muted-foreground text-xs">Weekdays Only</div>
                    <div className="font-semibold text-lg">{result.weekdays} days</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
