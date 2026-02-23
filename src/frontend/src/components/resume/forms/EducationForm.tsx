import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { ResumeData, Education } from '@/types/resume';

interface EducationFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  templateSlug: string;
}

export default function EducationForm({ data, onChange }: EducationFormProps) {
  const handleAdd = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      grade: ''
    };

    onChange({
      ...data,
      education: [...data.education, newEducation]
    });
  };

  const handleRemove = (id: string) => {
    onChange({
      ...data,
      education: data.education.filter(edu => edu.id !== id)
    });
  };

  const handleChange = (id: string, field: keyof Education, value: string) => {
    onChange({
      ...data,
      education: data.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };

  return (
    <div className="space-y-4">
      {data.education.map((edu, index) => (
        <Card key={edu.id} className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold">Education {index + 1}</h4>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleRemove(edu.id)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label>Institution *</Label>
              <Input
                value={edu.institution}
                onChange={(e) => handleChange(edu.id, 'institution', e.target.value)}
                placeholder="University/College Name"
                className="mt-1"
              />
            </div>

            <div>
              <Label>Degree *</Label>
              <Input
                value={edu.degree}
                onChange={(e) => handleChange(edu.id, 'degree', e.target.value)}
                placeholder="B.Tech, MBA, etc."
                className="mt-1"
              />
            </div>

            <div>
              <Label>Field of Study</Label>
              <Input
                value={edu.field || ''}
                onChange={(e) => handleChange(edu.id, 'field', e.target.value)}
                placeholder="Computer Science, Business, etc."
                className="mt-1"
              />
            </div>

            <div>
              <Label>Start Date *</Label>
              <Input
                type="month"
                value={edu.startDate}
                onChange={(e) => handleChange(edu.id, 'startDate', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label>End Date *</Label>
              <Input
                type="month"
                value={edu.endDate}
                onChange={(e) => handleChange(edu.id, 'endDate', e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="md:col-span-2">
              <Label>Grade/CGPA</Label>
              <Input
                value={edu.grade || ''}
                onChange={(e) => handleChange(edu.id, 'grade', e.target.value)}
                placeholder="8.5 CGPA, 85%, First Class, etc."
                className="mt-1"
              />
            </div>
          </div>
        </Card>
      ))}

      <Button onClick={handleAdd} variant="outline" className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        Add Education
      </Button>
    </div>
  );
}
