import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Course {
  id: string;
  gradePoints: string;
  credits: string;
}

export default function SGPACalculator() {
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', gradePoints: '', credits: '' }
  ]);

  const addCourse = () => {
    setCourses([...courses, { id: Date.now().toString(), gradePoints: '', credits: '' }]);
  };

  const removeCourse = (id: string) => {
    if (courses.length > 1) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  const updateCourse = (id: string, field: 'gradePoints' | 'credits', value: string) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const calculateSGPA = () => {
    let totalGradePoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
      const gp = parseFloat(course.gradePoints) || 0;
      const cr = parseFloat(course.credits) || 0;
      totalGradePoints += gp * cr;
      totalCredits += cr;
    });

    return totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : '0.00';
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardContent className="pt-6 space-y-4">
          {courses.map((course, index) => (
            <div key={course.id} className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
              <div className="flex-1 w-full sm:w-auto">
                <Label htmlFor={`gp-${course.id}`} className="text-sm">
                  Grade Points (0-10)
                </Label>
                <Input
                  id={`gp-${course.id}`}
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={course.gradePoints}
                  onChange={(e) => updateCourse(course.id, 'gradePoints', e.target.value)}
                  placeholder="e.g., 8.5"
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
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Your SGPA</p>
            <p className="text-4xl font-bold text-primary">{calculateSGPA()}</p>
            <p className="text-xs text-muted-foreground mt-2">on 10.0 scale</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
