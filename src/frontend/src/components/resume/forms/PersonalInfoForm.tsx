import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Sparkles, Upload, X } from 'lucide-react';
import { ResumeData } from '@/types/resume';
import { capitalizeProperNouns, formatPhoneNumber } from '@/lib/resumeFormatters';
import { generateProfessionalSummary } from '@/lib/summaryGenerator';
import { toast } from 'sonner';

interface PersonalInfoFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  templateSlug: string;
}

export default function PersonalInfoForm({ data, onChange, templateSlug }: PersonalInfoFormProps) {
  const isIndianTemplate = ['fresher-resume', 'government-job-resume', 'private-job-resume', 'hindi-resume', 'biodata-for-marriage', 'teacher-resume', 'police-army-resume'].includes(templateSlug);

  const handleChange = (field: keyof ResumeData['personalInfo'], value: string) => {
    let processedValue = value;

    if (field === 'name') {
      processedValue = capitalizeProperNouns(value);
    } else if (field === 'phone') {
      processedValue = formatPhoneNumber(value, isIndianTemplate);
    }

    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: processedValue
      }
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Photo size must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      onChange({
        ...data,
        personalInfo: {
          ...data.personalInfo,
          photo: dataUrl
        }
      });
      toast.success('Photo uploaded successfully');
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        photo: ''
      }
    });
  };

  const handleGenerateSummary = () => {
    const summary = generateProfessionalSummary(data);
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        summary
      }
    });
    toast.success('Professional summary generated!');
  };

  return (
    <div className="space-y-6">
      {/* Photo Upload */}
      <div>
        <Label>Photo {!isIndianTemplate && '(Optional)'}</Label>
        <div className="mt-2">
          {data.personalInfo.photo ? (
            <div className="relative inline-block">
              <img
                src={data.personalInfo.photo}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-lg border-2"
              />
              <Button
                size="sm"
                variant="destructive"
                className="absolute -top-2 -right-2"
                onClick={handleRemovePhoto}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <label className="flex items-center justify-center w-32 h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors">
              <div className="text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Upload Photo</span>
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
            </label>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-1">Max 5MB, JPG or PNG</p>
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            value={data.personalInfo.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="John Doe"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={data.personalInfo.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="john@example.com"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone *</Label>
          <Input
            id="phone"
            type="tel"
            value={data.personalInfo.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder={isIndianTemplate ? '+91-XXXXX-XXXXX' : '+1234567890'}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="address">Address *</Label>
          <Input
            id="address"
            value={data.personalInfo.address}
            onChange={(e) => handleChange('address', e.target.value)}
            placeholder="City, State, Country"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="linkedin">LinkedIn (Optional)</Label>
          <Input
            id="linkedin"
            value={data.personalInfo.linkedin || ''}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder="linkedin.com/in/username"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="portfolio">Portfolio/Website (Optional)</Label>
          <Input
            id="portfolio"
            value={data.personalInfo.portfolio || ''}
            onChange={(e) => handleChange('portfolio', e.target.value)}
            placeholder="www.yourportfolio.com"
            className="mt-1"
          />
        </div>
      </div>

      {/* Professional Summary */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label htmlFor="summary">Professional Summary</Label>
          <Button
            size="sm"
            variant="outline"
            onClick={handleGenerateSummary}
            disabled={data.experience.length === 0 && data.skills.length === 0}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Generate with AI
          </Button>
        </div>
        <Textarea
          id="summary"
          value={data.personalInfo.summary || ''}
          onChange={(e) => handleChange('summary', e.target.value)}
          placeholder="Brief professional summary highlighting your key strengths and career objectives..."
          rows={4}
          className="mt-1"
        />
        <p className="text-xs text-muted-foreground mt-1">
          2-3 sentences summarizing your experience and goals
        </p>
      </div>
    </div>
  );
}
