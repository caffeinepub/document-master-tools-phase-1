import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { ResumeData, Project } from '@/types/resume';

interface ProjectsFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  templateSlug: string;
}

export default function ProjectsForm({ data, onChange }: ProjectsFormProps) {
  const handleAdd = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: '',
      description: '',
      technologies: '',
      link: ''
    };

    onChange({
      ...data,
      projects: [...data.projects, newProject]
    });
  };

  const handleRemove = (id: string) => {
    onChange({
      ...data,
      projects: data.projects.filter(proj => proj.id !== id)
    });
  };

  const handleChange = (id: string, field: keyof Project, value: string) => {
    onChange({
      ...data,
      projects: data.projects.map(proj =>
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    });
  };

  return (
    <div className="space-y-4">
      {data.projects.map((project, index) => (
        <Card key={project.id} className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold">Project {index + 1}</h4>
            <Button size="sm" variant="ghost" onClick={() => handleRemove(project.id)}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Project Title *</Label>
              <Input
                value={project.title}
                onChange={(e) => handleChange(project.id, 'title', e.target.value)}
                placeholder="Project Name"
                className="mt-1"
              />
            </div>

            <div>
              <Label>Description *</Label>
              <Textarea
                value={project.description}
                onChange={(e) => handleChange(project.id, 'description', e.target.value)}
                placeholder="Describe the project..."
                rows={3}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Technologies Used</Label>
              <Input
                value={project.technologies || ''}
                onChange={(e) => handleChange(project.id, 'technologies', e.target.value)}
                placeholder="React, Node.js, MongoDB"
                className="mt-1"
              />
            </div>

            <div>
              <Label>Project Link</Label>
              <Input
                value={project.link || ''}
                onChange={(e) => handleChange(project.id, 'link', e.target.value)}
                placeholder="https://github.com/username/project"
                className="mt-1"
              />
            </div>
          </div>
        </Card>
      ))}

      <Button onClick={handleAdd} variant="outline" className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        Add Project
      </Button>
    </div>
  );
}
