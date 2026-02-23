import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ResumeData, Language } from '@/types/resume';

interface LanguagesFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  templateSlug: string;
}

export default function LanguagesForm({ data, onChange }: LanguagesFormProps) {
  const handleAdd = () => {
    const newLang: Language = {
      id: Date.now().toString(),
      name: '',
      proficiency: 'Intermediate'
    };

    onChange({
      ...data,
      languages: [...data.languages, newLang]
    });
  };

  const handleRemove = (id: string) => {
    onChange({
      ...data,
      languages: data.languages.filter(lang => lang.id !== id)
    });
  };

  const handleChange = (id: string, field: keyof Language, value: string) => {
    onChange({
      ...data,
      languages: data.languages.map(lang =>
        lang.id === id ? { ...lang, [field]: value } : lang
      )
    });
  };

  return (
    <div className="space-y-4">
      {data.languages.map((lang, index) => (
        <div key={lang.id} className="flex gap-4 items-end">
          <div className="flex-1">
            <Label>Language {index + 1} *</Label>
            <Input
              value={lang.name}
              onChange={(e) => handleChange(lang.id, 'name', e.target.value)}
              placeholder="English, Hindi, Spanish"
              className="mt-1"
            />
          </div>
          <div className="w-40">
            <Label>Proficiency *</Label>
            <Select
              value={lang.proficiency}
              onValueChange={(value) => handleChange(lang.id, 'proficiency', value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Native">Native</SelectItem>
                <SelectItem value="Fluent">Fluent</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Basic">Basic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button size="icon" variant="ghost" onClick={() => handleRemove(lang.id)}>
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ))}

      <Button onClick={handleAdd} variant="outline" className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        Add Language
      </Button>
    </div>
  );
}
