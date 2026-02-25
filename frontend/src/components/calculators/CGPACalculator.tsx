import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Course {
  id: string;
  gradePoints: string;
  credits: string;
}

interface Semester {
  id: string;
  courses: Course[];
}

export default function CGPACalculator() {
  const [semesters, setSemesters] = useState<Semester[]>([
    { id: '1', courses: [{ id: '1', gradePoints: '', credits: '' }] }
  ]);

  const addSemester = () => {
    setSemesters([...semesters, { 
      id: Date.now().toString(), 
      courses: [{ id: Date.now().toString(), gradePoints: '', credits: '' }] 
    }]);
  };

  const removeSemester = (semesterId: string) => {
    if (semesters.length > 1) {
      setSemesters(semesters.filter(s => s.id !== semesterId));
    }
  };

  const addCourse = (semesterId: string) => {
    setSemesters(semesters.map(sem => 
      sem.id === semesterId 
        ? { ...sem, courses: [...sem.courses, { id: Date.now().toString(), gradePoints: '', credits: '' }] }
        : sem
    ));
  };

  const removeCourse = (semesterId: string, courseId: string) => {
    setSemesters(semesters.map(sem => 
      sem.id === semesterId && sem.courses.length > 1
        ? { ...sem, courses: sem.courses.filter(c => c.id !== courseId) }
        : sem
    ));
  };

  const updateCourse = (semesterId: string, courseId: string, field: 'gradePoints' | 'credits', value: string) => {
    setSemesters(semesters.map(sem => 
      sem.id === semesterId
        ? { ...sem, courses: sem.courses.map(c => c.id === courseId ? { ...c, [field]: value } : c) }
        : sem
    ));
  };

  const calculateCGPA = () => {
    let totalGradePoints = 0;
    let totalCredits = 0;

    semesters.forEach(sem => {
      sem.courses.forEach(course => {
        const gp = parseFloat(course.gradePoints) || 0;
        const cr = parseFloat(course.credits) || 0;
        totalGradePoints += gp * cr;
        totalCredits += cr;
      });
    });

    return totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : '0.00';
  };

  return (
    <div className="space-y-6">
      {semesters.map((semester, semIndex) => (
        <Card key={semester.id} className="bg-card border-border">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Semester {semIndex + 1}</CardTitle>
              {semesters.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSemester(semester.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {semester.courses.map((course, courseIndex) => (
              <div key={course.id} className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
                <div className="flex-1 w-full sm:w-auto">
                  <Label htmlFor={`gp-${semester.id}-${course.id}`} className="text-sm">
                    Grade Points (0-10)
                  </Label>
                  <Input
                    id={`gp-${semester.id}-${course.id}`}
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={course.gradePoints}
                    onChange={(e) => updateCourse(semester.id, course.id, 'gradePoints', e.target.value)}
                    placeholder="e.g., 8.5"
                    className="mt-1"
                  />
                </div>
                <div className="flex-1 w-full sm:w-auto">
                  <Label htmlFor={`cr-${semester.id}-${course.id}`} className="text-sm">
                    Credits
                  </Label>
                  <Input
                    id={`cr-${semester.id}-${course.id}`}
                    type="number"
                    min="0"
                    step="0.5"
                    value={course.credits}
                    onChange={(e) => updateCourse(semester.id, course.id, 'credits', e.target.value)}
                    placeholder="e.g., 4"
                    className="mt-1"
                  />
                </div>
                {semester.courses.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeCourse(semester.id, course.id)}
                    className="text-destructive hover:text-destructive min-h-[44px] min-w-[44px]"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => addCourse(semester.id)}
              className="w-full sm:w-auto min-h-[44px]"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Course
            </Button>
          </CardContent>
        </Card>
      ))}

      <Button onClick={addSemester} variant="outline" className="w-full min-h-[44px]">
        <Plus className="mr-2 h-4 w-4" />
        Add Semester
      </Button>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Your CGPA</p>
            <p className="text-4xl font-bold text-primary">{calculateCGPA()}</p>
            <p className="text-xs text-muted-foreground mt-2">on 10.0 scale</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
