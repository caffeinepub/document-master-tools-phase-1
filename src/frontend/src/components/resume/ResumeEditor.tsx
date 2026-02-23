import { useState } from 'react';
import { ArrowLeft, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { ResumeTemplate } from '../../pages/ResumeBuilderPage';

interface ResumeEditorProps {
  template: ResumeTemplate;
  onBack: () => void;
}

interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  education: Array<{ institution: string; degree: string; year: string }>;
  experience: Array<{ company: string; position: string; duration: string; description: string }>;
  skills: string[];
  projects: Array<{ title: string; description: string }>;
}

export default function ResumeEditor({ template, onBack }: ResumeEditorProps) {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: { name: '', email: '', phone: '', address: '' },
    education: [{ institution: '', degree: '', year: '' }],
    experience: [{ company: '', position: '', duration: '', description: '' }],
    skills: [],
    projects: [{ title: '', description: '' }],
  });

  const [skillInput, setSkillInput] = useState('');

  const updatePersonalInfo = (field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const addSkill = () => {
    if (skillInput.trim()) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const downloadResume = () => {
    // Simulate PDF generation
    toast.success('Resume downloaded successfully!');
  };

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Templates
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor Panel */}
          <Card>
            <CardHeader>
              <CardTitle>Edit Resume - {template.charAt(0).toUpperCase() + template.slice(1)} Template</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={resumeData.personalInfo.name}
                      onChange={(e) => updatePersonalInfo('name', e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={resumeData.personalInfo.email}
                      onChange={(e) => updatePersonalInfo('email', e.target.value)}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={resumeData.personalInfo.phone}
                      onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={resumeData.personalInfo.address}
                      onChange={(e) => updatePersonalInfo('address', e.target.value)}
                      placeholder="City, Country"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="education" className="space-y-4">
                  <p className="text-sm text-muted-foreground">Add your educational background</p>
                  <div className="space-y-2">
                    <Label>Institution</Label>
                    <Input placeholder="University Name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Degree</Label>
                    <Input placeholder="Bachelor of Science" />
                  </div>
                  <div className="space-y-2">
                    <Label>Year</Label>
                    <Input placeholder="2020 - 2024" />
                  </div>
                </TabsContent>

                <TabsContent value="experience" className="space-y-4">
                  <p className="text-sm text-muted-foreground">Add your work experience</p>
                  <div className="space-y-2">
                    <Label>Company</Label>
                    <Input placeholder="Company Name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Position</Label>
                    <Input placeholder="Job Title" />
                  </div>
                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Input placeholder="Jan 2020 - Present" />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea placeholder="Describe your responsibilities and achievements" />
                  </div>
                </TabsContent>

                <TabsContent value="skills" className="space-y-4">
                  <p className="text-sm text-muted-foreground">Add your skills</p>
                  <div className="flex gap-2">
                    <Input
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      placeholder="Enter a skill"
                      onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    />
                    <Button onClick={addSkill}>Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="px-3 py-1 bg-primary/10 rounded-full text-sm flex items-center gap-2"
                      >
                        {skill}
                        <button onClick={() => removeSkill(index)} className="text-destructive">×</button>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Preview Panel */}
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-inner min-h-[600px] border">
                <div className="space-y-6">
                  <div className="text-center border-b pb-4">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {resumeData.personalInfo.name || 'Your Name'}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      {resumeData.personalInfo.email} | {resumeData.personalInfo.phone}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {resumeData.personalInfo.address}
                    </p>
                  </div>

                  {resumeData.skills.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {resumeData.skills.map((skill, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Education</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Add your education details...</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Experience</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Add your work experience...</p>
                  </div>
                </div>
              </div>

              <Button onClick={downloadResume} className="w-full mt-4" size="lg">
                <Download className="mr-2 h-4 w-4" />
                Download Resume PDF
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
