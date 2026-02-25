import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ResumeData, Skill } from '@/types/resume';

interface SkillsFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  templateSlug: string;
}

export default function SkillsForm({ data, onChange }: SkillsFormProps) {
  const handleAdd = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      level: ''
    };

    onChange({
      ...data,
      skills: [...data.skills, newSkill]
    });
  };

  const handleRemove = (id: string) => {
    onChange({
      ...data,
      skills: data.skills.filter(skill => skill.id !== id)
    });
  };

  const handleChange = (id: string, field: keyof Skill, value: string) => {
    onChange({
      ...data,
      skills: data.skills.map(skill =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    });
  };

  return (
    <div className="space-y-4">
      {data.skills.map((skill, index) => (
        <div key={skill.id} className="flex gap-4 items-end">
          <div className="flex-1">
            <Label>Skill {index + 1} *</Label>
            <Input
              value={skill.name}
              onChange={(e) => handleChange(skill.id, 'name', e.target.value)}
              placeholder="e.g., JavaScript, Project Management"
              className="mt-1"
            />
          </div>
          <div className="w-32">
            <Label>Level</Label>
            <Input
              value={skill.level || ''}
              onChange={(e) => handleChange(skill.id, 'level', e.target.value)}
              placeholder="Expert"
              className="mt-1"
            />
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => handleRemove(skill.id)}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ))}

      <Button onClick={handleAdd} variant="outline" className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        Add Skill
      </Button>
    </div>
  );
}
