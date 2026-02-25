import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');

  const calculateAge = () => {
    if (!birthDate) return null;

    const birth = new Date(birthDate);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalMonths = years * 12 + months;
    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = totalDays * 24;

    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    const daysToNext = Math.floor((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const monthsToNext = Math.floor(daysToNext / 30);
    const remainingDays = daysToNext % 30;

    return {
      years,
      months,
      days,
      totalMonths,
      totalWeeks,
      totalDays,
      totalHours,
      nextBirthday: nextBirthday.toLocaleDateString(),
      daysToNext,
      monthsToNext,
      remainingDays
    };
  };

  const result = calculateAge();

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardContent className="pt-6">
          <Label htmlFor="birthdate" className="text-sm font-medium">Date of Birth</Label>
          <Input
            id="birthdate"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="mt-2"
          />
        </CardContent>
      </Card>

      {result && (
        <>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Your Age</p>
                  <p className="text-4xl font-bold text-primary">
                    {result.years} years, {result.months} months, {result.days} days
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/50">
            <CardContent className="pt-6 space-y-3">
              <h3 className="font-semibold mb-3 text-sm">Age Breakdown</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="p-3 bg-background rounded border">
                  <div className="text-muted-foreground text-xs">Total Months</div>
                  <div className="font-semibold text-lg">{result.totalMonths}</div>
                </div>
                <div className="p-3 bg-background rounded border">
                  <div className="text-muted-foreground text-xs">Total Weeks</div>
                  <div className="font-semibold text-lg">{result.totalWeeks}</div>
                </div>
                <div className="p-3 bg-background rounded border">
                  <div className="text-muted-foreground text-xs">Total Days</div>
                  <div className="font-semibold text-lg">{result.totalDays}</div>
                </div>
                <div className="p-3 bg-background rounded border">
                  <div className="text-muted-foreground text-xs">Total Hours</div>
                  <div className="font-semibold text-lg">{result.totalHours.toLocaleString()}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 dark:bg-green-950/20 border-green-200">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">Next Birthday</p>
                <p className="text-xl font-bold text-green-600">{result.nextBirthday}</p>
                <p className="text-sm text-muted-foreground">
                  {result.monthsToNext} months and {result.remainingDays} days to go
                </p>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
