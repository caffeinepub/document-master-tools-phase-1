import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { ResumeData, Experience } from '@/types/resume';

interface ExperienceFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  templateSlug: string;
}

export default function ExperienceForm({ data, onChange }: ExperienceFormProps) {
  const handleAdd = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };

    onChange({
      ...data,
      experience: [...data.experience, newExperience]
    });
  };

  const handleRemove = (id: string) => {
    onChange({
      ...data,
      experience: data.experience.filter(exp => exp.id !== id)
    });
  };

  const handleChange = (id: string, field: keyof Experience, value: string | boolean) => {
    onChange({
      ...data,
      experience: data.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };

  return (
    <div className="space-y-4">
      {data.experience.map((exp, index) => (
        <Card key={exp.id} className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold">Experience {index + 1}</h4>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleRemove(exp.id)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Company *</Label>
              <Input
                value={exp.company}
                onChange={(e) => handleChange(exp.id, 'company', e.target.value)}
                placeholder="Company Name"
                className="mt-1"
              />
            </div>

            <div>
              <Label>Position *</Label>
              <Input
                value={exp.position}
                onChange={(e) => handleChange(exp.id, 'position', e.target.value)}
                placeholder="Job Title"
                className="mt-1"
              />
            </div>

            <div>
              <Label>Start Date *</Label>
              <Input
                type="month"
                value={exp.startDate}
                onChange={(e) => handleChange(exp.id, 'startDate', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label>End Date</Label>
              <Input
                type="month"
                value={exp.endDate}
                onChange={(e) => handleChange(exp.id, 'endDate', e.target.value)}
                disabled={exp.current}
                className="mt-1"
              />
              <div className="flex items-center mt-2">
                <Checkbox
                  id={`current-${exp.id}`}
                  checked={exp.current}
                  onCheckedChange={(checked) => handleChange(exp.id, 'current', checked as boolean)}
                />
                <label htmlFor={`current-${exp.id}`} className="ml-2 text-sm">
                  Currently working here
                </label>
              </div>
            </div>

            <div className="md:col-span-2">
              <Label>Description *</Label>
              <Textarea
                value={exp.description}
                onChange={(e) => handleChange(exp.id, 'description', e.target.value)}
                placeholder="Describe your responsibilities and achievements..."
                rows={4}
                className="mt-1"
              />
            </div>
          </div>
        </Card>
      ))}

      <Button onClick={handleAdd} variant="outline" className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        Add Experience
      </Button>
    </div>
  );
}
