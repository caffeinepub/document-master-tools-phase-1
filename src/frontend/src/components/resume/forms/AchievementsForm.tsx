import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ResumeData, Achievement } from '@/types/resume';

interface AchievementsFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  templateSlug: string;
}

export default function AchievementsForm({ data, onChange }: AchievementsFormProps) {
  const handleAdd = () => {
    const newAchievement: Achievement = {
      id: Date.now().toString(),
      title: '',
      description: ''
    };

    onChange({
      ...data,
      achievements: [...data.achievements, newAchievement]
    });
  };

  const handleRemove = (id: string) => {
    onChange({
      ...data,
      achievements: data.achievements.filter(ach => ach.id !== id)
    });
  };

  const handleChange = (id: string, field: keyof Achievement, value: string) => {
    onChange({
      ...data,
      achievements: data.achievements.map(ach =>
        ach.id === id ? { ...ach, [field]: value } : ach
      )
    });
  };

  return (
    <div className="space-y-4">
      {data.achievements.map((ach, index) => (
        <div key={ach.id} className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold">Achievement {index + 1}</h4>
            <Button size="sm" variant="ghost" onClick={() => handleRemove(ach.id)}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Title *</Label>
              <Input
                value={ach.title}
                onChange={(e) => handleChange(ach.id, 'title', e.target.value)}
                placeholder="Award or Achievement Title"
                className="mt-1"
              />
            </div>

            <div>
              <Label>Description *</Label>
              <Textarea
                value={ach.description}
                onChange={(e) => handleChange(ach.id, 'description', e.target.value)}
                placeholder="Describe the achievement..."
                rows={2}
                className="mt-1"
              />
            </div>
          </div>
        </div>
      ))}

      <Button onClick={handleAdd} variant="outline" className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        Add Achievement
      </Button>
    </div>
  );
}
