import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ResumeData, Certification } from '@/types/resume';

interface CertificationsFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  templateSlug: string;
}

export default function CertificationsForm({ data, onChange }: CertificationsFormProps) {
  const handleAdd = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: ''
    };

    onChange({
      ...data,
      certifications: [...data.certifications, newCert]
    });
  };

  const handleRemove = (id: string) => {
    onChange({
      ...data,
      certifications: data.certifications.filter(cert => cert.id !== id)
    });
  };

  const handleChange = (id: string, field: keyof Certification, value: string) => {
    onChange({
      ...data,
      certifications: data.certifications.map(cert =>
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    });
  };

  return (
    <div className="space-y-4">
      {data.certifications.map((cert, index) => (
        <div key={cert.id} className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold">Certification {index + 1}</h4>
            <Button size="sm" variant="ghost" onClick={() => handleRemove(cert.id)}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label>Certification Name *</Label>
              <Input
                value={cert.name}
                onChange={(e) => handleChange(cert.id, 'name', e.target.value)}
                placeholder="AWS Certified Solutions Architect"
                className="mt-1"
              />
            </div>

            <div>
              <Label>Issuing Organization *</Label>
              <Input
                value={cert.issuer}
                onChange={(e) => handleChange(cert.id, 'issuer', e.target.value)}
                placeholder="Amazon Web Services"
                className="mt-1"
              />
            </div>

            <div>
              <Label>Date Obtained *</Label>
              <Input
                type="month"
                value={cert.date}
                onChange={(e) => handleChange(cert.id, 'date', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </div>
      ))}

      <Button onClick={handleAdd} variant="outline" className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        Add Certification
      </Button>
    </div>
  );
}
