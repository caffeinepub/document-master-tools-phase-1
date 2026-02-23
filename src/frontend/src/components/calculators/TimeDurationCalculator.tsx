import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function TimeDurationCalculator() {
  const [mode, setMode] = useState<'duration' | 'add' | 'subtract'>('duration');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [baseTime, setBaseTime] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const calculateDuration = () => {
    if (mode === 'duration') {
      if (!startTime || !endTime) return null;

      const start = new Date(`2000-01-01T${startTime}:00`);
      let end = new Date(`2000-01-01T${endTime}:00`);

      if (end < start) {
        end = new Date(`2000-01-02T${endTime}:00`);
      }

      const diff = end.getTime() - start.getTime();
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      const totalMinutes = Math.floor(diff / (1000 * 60));
      const totalSeconds = Math.floor(diff / 1000);

      return { hours: h, minutes: m, seconds: s, totalMinutes, totalSeconds };
    } else {
      if (!baseTime) return null;

      const base = new Date(`2000-01-01T${baseTime}:00`);
      const h = parseInt(hours) || 0;
      const m = parseInt(minutes) || 0;
      const s = parseInt(seconds) || 0;

      const totalMs = (h * 60 * 60 + m * 60 + s) * 1000;
      const result = new Date(base.getTime() + (mode === 'add' ? totalMs : -totalMs));

      const resultTime = result.toTimeString().slice(0, 8);
      return { resultTime };
    }
  };

  const result = calculateDuration();

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardContent className="pt-6 space-y-6">
          <div>
            <Label className="text-sm font-medium mb-3 block">Mode</Label>
            <RadioGroup value={mode} onValueChange={(value) => setMode(value as 'duration' | 'add' | 'subtract')}>
              <div className="flex flex-col gap-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="duration" id="duration" />
                  <Label htmlFor="duration" className="cursor-pointer">Calculate Duration</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="add" id="add" />
                  <Label htmlFor="add" className="cursor-pointer">Add Time</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="subtract" id="subtract" />
                  <Label htmlFor="subtract" className="cursor-pointer">Subtract Time</Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {mode === 'duration' ? (
            <>
              <div>
                <Label htmlFor="start" className="text-sm font-medium">Start Time</Label>
                <Input
                  id="start"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="end" className="text-sm font-medium">End Time</Label>
                <Input
                  id="end"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="mt-2"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <Label htmlFor="base" className="text-sm font-medium">Base Time</Label>
                <Input
                  id="base"
                  type="time"
                  value={baseTime}
                  onChange={(e) => setBaseTime(e.target.value)}
                  className="mt-2"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label htmlFor="hours" className="text-sm font-medium">Hours</Label>
                  <Input
                    id="hours"
                    type="number"
                    min="0"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    placeholder="0"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="minutes" className="text-sm font-medium">Minutes</Label>
                  <Input
                    id="minutes"
                    type="number"
                    min="0"
                    max="59"
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                    placeholder="0"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="seconds" className="text-sm font-medium">Seconds</Label>
                  <Input
                    id="seconds"
                    type="number"
                    min="0"
                    max="59"
                    value={seconds}
                    onChange={(e) => setSeconds(e.target.value)}
                    placeholder="0"
                    className="mt-2"
                  />
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {result && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              {mode === 'duration' && 'hours' in result ? (
                <>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Duration</p>
                    <p className="text-4xl font-bold text-primary">
                      {result.hours}h {result.minutes}m {result.seconds}s
                    </p>
                  </div>
                  <div className="pt-4 border-t grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Total Minutes</div>
                      <div className="font-semibold text-lg">{result.totalMinutes}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Total Seconds</div>
                      <div className="font-semibold text-lg">{result.totalSeconds}</div>
                    </div>
                  </div>
                </>
              ) : 'resultTime' in result ? (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Result Time</p>
                  <p className="text-4xl font-bold text-primary">{result.resultTime}</p>
                </div>
              ) : null}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
