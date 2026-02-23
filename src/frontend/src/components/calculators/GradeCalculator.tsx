import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Course {
  id: string;
  grade: string;
  credits: string;
}

const gradeScale: Record<string, number> = {
  'A+': 10, 'A': 9, 'B+': 8, 'B': 7, 'C+': 6, 'C': 5, 'D': 4, 'E': 3, 'F': 0
};

export default function GradeCalculator() {
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', grade: '', credits: '' }
  ]);

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
      const points = gradeScale[course.grade] || 0;
      const cr = parseFloat(course.credits) || 0;
      totalPoints += points * cr;
      totalCredits += cr;
    });

    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardContent className="pt-6 space-y-4">
          {courses.map((course) => (
            <div key={course.id} className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
              <div className="flex-1 w-full sm:w-auto">
                <Label htmlFor={`grade-${course.id}`} className="text-sm">
                  Letter Grade
                </Label>
                <Select value={course.grade} onValueChange={(value) => updateCourse(course.id, 'grade', value)}>
                  <SelectTrigger id={`grade-${course.id}`} className="mt-1">
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(gradeScale).map(grade => (
                      <SelectItem key={grade} value={grade}>
                        {grade} ({gradeScale[grade]} points)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
        </CardContent>
      </Card>

      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-3 text-sm">Grade Scale Reference</h3>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 text-xs">
            {Object.entries(gradeScale).map(([grade, points]) => (
              <div key={grade} className="p-2 bg-background rounded border text-center">
                <div className="font-semibold">{grade}</div>
                <div className="text-muted-foreground">{points}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Your GPA</p>
            <p className="text-4xl font-bold text-primary">{calculateGPA()}</p>
            <p className="text-xs text-muted-foreground mt-2">on 10.0 scale</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
