import { ResumeData } from '@/types/resume';

const ACTION_VERBS = [
  'Developed', 'Managed', 'Led', 'Implemented', 'Optimized', 'Designed',
  'Created', 'Established', 'Coordinated', 'Executed', 'Achieved', 'Delivered',
  'Improved', 'Streamlined', 'Spearheaded', 'Orchestrated'
];

export function generateProfessionalSummary(resumeData: ResumeData): string {
  const { experience, skills, achievements } = resumeData;
  
  // Calculate total years of experience
  let totalMonths = 0;
  experience.forEach(exp => {
    const start = new Date(exp.startDate);
    const end = exp.current ? new Date() : new Date(exp.endDate);
    if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
      totalMonths += (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    }
  });
  const years = Math.max(1, Math.floor(totalMonths / 12));
  
  // Extract top skills (max 5)
  const topSkills = skills.slice(0, 5).map(s => s.name);
  
  // Get domain from most recent experience
  const domain = experience.length > 0 ? experience[0].position : 'professional';
  
  // Random action verb
  const actionVerb = ACTION_VERBS[Math.floor(Math.random() * ACTION_VERBS.length)];
  
  // Build summary
  const parts: string[] = [];
  
  // Part 1: Experience and domain
  if (years >= 1) {
    parts.push(`${years}+ year${years > 1 ? 's' : ''} of experience in ${domain.toLowerCase()}`);
  } else {
    parts.push(`Motivated professional with expertise in ${domain.toLowerCase()}`);
  }
  
  // Part 2: Skills
  if (topSkills.length > 0) {
    const skillsList = topSkills.slice(0, 3).join(', ');
    parts.push(`with strong proficiency in ${skillsList}`);
  }
  
  // Part 3: Achievement or objective
  if (achievements.length > 0) {
    parts.push(`Proven track record of delivering results and driving success`);
  } else {
    parts.push(`${actionVerb} to leverage skills and contribute to organizational growth`);
  }
  
  return parts.join('. ') + '.';
}
