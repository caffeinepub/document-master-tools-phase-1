import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface Course {
  id: string;
  grade: string;
  credits: string;
}

export default function GPACalculator() {
  const [scale, setScale] = useState<'4.0' | '10.0'>('10.0');
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', grade: '', credits: '' }
  ]);

  const maxGrade = scale === '4.0' ? 4 : 10;

  const addCourse = () => {
    setCourses([...courses, { id: Date.now().toString(), grade: '', credits: '' }]);
  };

  const removeCourse = (id: string) => {
    if (courses.length > 1) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  const updateCourse = (id: string, field: 'grade' | 'credits', value: string) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
      const grade = parseFloat(course.grade) || 0;
      const cr = parseFloat(course.credits) || 0;
      totalPoints += grade * cr;
      totalCredits += cr;
    });

    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  };

  const getTotalCredits = () => {
    return courses.reduce((sum, c) => sum + (parseFloat(c.credits) || 0), 0).toFixed(1);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardContent className="pt-6 space-y-6">
          <div>
            <Label className="text-sm font-medium mb-3 block">GPA Scale</Label>
            <RadioGroup value={scale} onValueChange={(value) => setScale(value as '4.0' | '10.0')}>
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="4.0" id="scale-4" />
                  <Label htmlFor="scale-4" className="cursor-pointer">4.0 Scale</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="10.0" id="scale-10" />
                  <Label htmlFor="scale-10" className="cursor-pointer">10.0 Scale</Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            {courses.map((course) => (
              <div key={course.id} className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
                <div className="flex-1 w-full sm:w-auto">
                  <Label htmlFor={`grade-${course.id}`} className="text-sm">
                    Grade (0-{maxGrade})
                  </Label>
                  <Input
                    id={`grade-${course.id}`}
                    type="number"
                    min="0"
                    max={maxGrade}
                    step="0.1"
                    value={course.grade}
                    onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                    placeholder={`e.g., ${maxGrade === 4 ? '3.5' : '8.5'}`}
                    className="mt-1"
                  />
                </div>
                <div className="flex-1 w-full sm:w-auto">
                  <Label htmlFor={`cr-${course.id}`} className="text-sm">
                    Credits
                  </Label>
                  <Input
                    id={`cr-${course.id}`}
                    type="number"
                    min="0"
                    step="0.5"
                    value={course.credits}
                    onChange={(e) => updateCourse(course.id, 'credits', e.target.value)}
                    placeholder="e.g., 4"
                    className="mt-1"
                  />
                </div>
                {courses.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeCourse(course.id)}
                    className="text-destructive hover:text-destructive min-h-[44px] min-w-[44px]"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button onClick={addCourse} variant="outline" className="w-full sm:w-auto min-h-[44px]">
              <Plus className="mr-2 h-4 w-4" />
              Add Course
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Your GPA</p>
              <p className="text-4xl font-bold text-primary">{calculateGPA()}</p>
              <p className="text-xs text-muted-foreground mt-2">on {scale} scale</p>
            </div>
            <div className="text-sm text-muted-foreground">
              Total Credits: {getTotalCredits()}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
