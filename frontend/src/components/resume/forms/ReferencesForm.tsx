import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { ResumeData, Reference } from '@/types/resume';

interface ReferencesFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  templateSlug: string;
}

export default function ReferencesForm({ data, onChange }: ReferencesFormProps) {
  const handleAdd = () => {
    const newRef: Reference = {
      id: Date.now().toString(),
      name: '',
      position: '',
      company: '',
      phone: '',
      email: ''
    };

    onChange({
      ...data,
      references: [...data.references, newRef]
    });
  };

  const handleRemove = (id: string) => {
    onChange({
      ...data,
      references: data.references.filter(ref => ref.id !== id)
    });
  };

  const handleChange = (id: string, field: keyof Reference, value: string) => {
    onChange({
      ...data,
      references: data.references.map(ref =>
        ref.id === id ? { ...ref, [field]: value } : ref
      )
    });
  };

  return (
    <div className="space-y-4">
      {data.references.map((ref, index) => (
        <Card key={ref.id} className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold">Reference {index + 1}</h4>
            <Button size="sm" variant="ghost" onClick={() => handleRemove(ref.id)}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Name *</Label>
              <Input
                value={ref.name}
                onChange={(e) => handleChange(ref.id, 'name', e.target.value)}
                placeholder="Reference Name"
                className="mt-1"
              />
            </div>

            <div>
              <Label>Position *</Label>
              <Input
                value={ref.position}
                onChange={(e) => handleChange(ref.id, 'position', e.target.value)}
                placeholder="Job Title"
                className="mt-1"
              />
            </div>

            <div>
              <Label>Company *</Label>
              <Input
                value={ref.company}
                onChange={(e) => handleChange(ref.id, 'company', e.target.value)}
                placeholder="Company Name"
                className="mt-1"
              />
            </div>

            <div>
              <Label>Phone *</Label>
              <Input
                value={ref.phone}
                onChange={(e) => handleChange(ref.id, 'phone', e.target.value)}
                placeholder="+91-XXXXX-XXXXX"
                className="mt-1"
              />
            </div>

            <div className="md:col-span-2">
              <Label>Email *</Label>
              <Input
                type="email"
                value={ref.email}
                onChange={(e) => handleChange(ref.id, 'email', e.target.value)}
                placeholder="reference@company.com"
                className="mt-1"
              />
            </div>
          </div>
        </Card>
      ))}

      <Button onClick={handleAdd} variant="outline" className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        Add Reference
      </Button>
    </div>
  );
}
