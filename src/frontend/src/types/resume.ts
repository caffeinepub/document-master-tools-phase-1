export type TemplateType = 
  | 'fresher-resume'
  | 'government-job-resume'
  | 'private-job-resume'
  | 'hindi-resume'
  | 'biodata-for-marriage'
  | 'teacher-resume'
  | 'police-army-resume'
  | 'ats-friendly-resume'
  | 'us-resume'
  | 'uk-cv-format'
  | 'canada-resume'
  | 'europass-cv'
  | 'creative-resume'
  | 'corporate-resume';

export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  linkedin?: string;
  portfolio?: string;
  photo?: string;
  summary?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  startDate: string;
  endDate: string;
  grade?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies?: string;
  link?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
}

export interface Reference {
  id: string;
  name: string;
  position: string;
  company: string;
  phone: string;
  email: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  achievements: Achievement[];
  references: Reference[];
}

export interface ColorTheme {
  name: string;
  primary: string;
  secondary: string;
  light: string;
  text: string;
}
