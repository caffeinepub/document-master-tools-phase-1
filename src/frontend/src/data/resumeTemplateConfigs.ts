import { TemplateType } from '@/types/resume';

export interface TemplateConfig {
  slug: TemplateType;
  name: string;
  category: 'Indian' | 'International';
  description: string;
  seoTitle: string;
  metaDescription: string;
  targetAudience: string;
  keyFeatures: string[];
  faqs: Array<{ question: string; answer: string }>;
}

export const RESUME_TEMPLATE_CONFIGS: TemplateConfig[] = [
  {
    slug: 'fresher-resume',
    name: 'Fresher Resume',
    category: 'Indian',
    description: 'Perfect for entry-level job seekers and recent graduates entering the Indian job market',
    seoTitle: 'Fresher Resume Builder - Free Template for Entry-Level Jobs | Document Master Tools',
    metaDescription: 'Create a professional fresher resume for entry-level positions. Includes education, skills, projects, and internships. Perfect for recent graduates seeking their first job.',
    targetAudience: 'Recent graduates, entry-level job seekers, students',
    keyFeatures: ['Education-focused layout', 'Skills and projects section', 'Internship experience', 'Photo optional'],
    faqs: [
      {
        question: 'What should I include in a fresher resume?',
        answer: 'Focus on your education, academic projects, internships, skills, certifications, and any volunteer work. Highlight relevant coursework and achievements.'
      },
      {
        question: 'How long should a fresher resume be?',
        answer: 'Keep it to one page. As a fresher, you should focus on quality over quantity and include only relevant information.'
      },
      {
        question: 'Should I add a photo to my fresher resume?',
        answer: 'In India, adding a professional photo is common and often expected. Use a formal passport-style photo.'
      }
    ]
  },
  {
    slug: 'government-job-resume',
    name: 'Government Job Resume',
    category: 'Indian',
    description: 'Formal format designed for Indian government job applications and public sector positions',
    seoTitle: 'Government Job Resume Builder - Official Format | Document Master Tools',
    metaDescription: 'Create a formal government job resume following official guidelines. Includes personal details, education, experience, and references. Ideal for SSC, UPSC, and state government applications.',
    targetAudience: 'Government job applicants, public sector candidates',
    keyFeatures: ['Formal structured layout', 'Detailed personal information', 'References section', 'Photo mandatory'],
    faqs: [
      {
        question: 'What format is required for government job resumes?',
        answer: 'Government resumes require a formal, structured format with complete personal details, education with marks, experience in chronological order, and references.'
      },
      {
        question: 'Is a photo mandatory for government job applications?',
        answer: 'Yes, most government job applications in India require a recent passport-size photograph.'
      },
      {
        question: 'Should I include my caste certificate details?',
        answer: 'You can mention your category (General/OBC/SC/ST) if applying under reservation, but detailed certificate information is usually submitted separately.'
      }
    ]
  },
  {
    slug: 'private-job-resume',
    name: 'Private Job Resume',
    category: 'Indian',
    description: 'Modern format optimized for private sector positions in India',
    seoTitle: 'Private Job Resume Builder - Modern Format for Corporate Jobs | Document Master Tools',
    metaDescription: 'Build a modern resume for private sector jobs in India. Highlights achievements, skills, and experience. Perfect for IT, finance, marketing, and corporate positions.',
    targetAudience: 'Private sector job seekers, corporate professionals',
    keyFeatures: ['Achievement-focused', 'Modern design', 'Skills highlighted', 'Photo optional'],
    faqs: [
      {
        question: 'How is a private job resume different from a government resume?',
        answer: 'Private sector resumes focus more on achievements, skills, and impact rather than just duties. They use a more modern, visually appealing format.'
      },
      {
        question: 'Should I include salary expectations?',
        answer: 'Generally, avoid mentioning salary expectations in your resume. Discuss this during the interview or when specifically asked.'
      },
      {
        question: 'How important are keywords in private job resumes?',
        answer: 'Very important. Many companies use ATS systems. Include relevant keywords from the job description naturally throughout your resume.'
      }
    ]
  },
  {
    slug: 'hindi-resume',
    name: 'Hindi Resume',
    category: 'Indian',
    description: 'Bilingual resume template with Hindi language support for regional job markets',
    seoTitle: 'Hindi Resume Builder - Bilingual Template | Document Master Tools',
    metaDescription: 'Create a professional Hindi resume or bilingual Hindi-English resume. Perfect for regional jobs, government positions, and Hindi-speaking markets.',
    targetAudience: 'Hindi-speaking job seekers, regional market applicants',
    keyFeatures: ['Hindi language support', 'Bilingual option', 'Cultural appropriateness', 'Photo included'],
    faqs: [
      {
        question: 'When should I use a Hindi resume?',
        answer: 'Use a Hindi resume when applying for positions in Hindi-speaking regions, government jobs requiring Hindi, or when the job posting is in Hindi.'
      },
      {
        question: 'Can I create a bilingual Hindi-English resume?',
        answer: 'Yes, our template supports both pure Hindi and bilingual formats. You can mix Hindi and English based on your needs.'
      },
      {
        question: 'What font should I use for Hindi text?',
        answer: 'Use Unicode Hindi fonts like Mangal, Nirmala UI, or Kokila for best compatibility and readability.'
      }
    ]
  },
  {
    slug: 'biodata-for-marriage',
    name: 'Biodata for Marriage',
    category: 'Indian',
    description: 'Traditional matrimonial biodata format following Indian cultural conventions',
    seoTitle: 'Marriage Biodata Maker - Free Matrimonial Format | Document Master Tools',
    metaDescription: 'Create a traditional marriage biodata with personal details, family information, education, and profession. Includes photo, horoscope details, and contact information.',
    targetAudience: 'Marriage prospects, families seeking alliances',
    keyFeatures: ['Traditional format', 'Family details', 'Horoscope information', 'Centered photo'],
    faqs: [
      {
        question: 'What information should be included in a marriage biodata?',
        answer: 'Include personal details (name, DOB, height, complexion), family information, education, profession, horoscope details, and contact information.'
      },
      {
        question: 'Should I include salary details?',
        answer: 'It\'s common to include profession and general income range, but specific salary details are optional and can be discussed later.'
      },
      {
        question: 'Is horoscope information mandatory?',
        answer: 'Horoscope details are important in many Indian communities but not mandatory. Include them if relevant to your family traditions.'
      }
    ]
  },
  {
    slug: 'teacher-resume',
    name: 'Teacher Resume',
    category: 'Indian',
    description: 'Specialized format for education professionals and teaching positions',
    seoTitle: 'Teacher Resume Builder - Education Professional Format | Document Master Tools',
    metaDescription: 'Create a professional teacher resume highlighting teaching experience, certifications, subjects taught, and educational philosophy. Perfect for school and college teaching positions.',
    targetAudience: 'Teachers, education professionals, academic staff',
    keyFeatures: ['Teaching philosophy section', 'Subjects taught', 'Certifications highlighted', 'Photo included'],
    faqs: [
      {
        question: 'What should I highlight in a teacher resume?',
        answer: 'Emphasize your teaching certifications, subjects taught, teaching methodology, student achievements, and any innovative teaching practices you\'ve implemented.'
      },
      {
        question: 'Should I include my teaching philosophy?',
        answer: 'Yes, a brief teaching philosophy or summary helps schools understand your approach to education and classroom management.'
      },
      {
        question: 'How important are certifications for teaching positions?',
        answer: 'Very important. Include all relevant teaching certifications, B.Ed, M.Ed, subject-specific certifications, and any professional development courses.'
      }
    ]
  },
  {
    slug: 'police-army-resume',
    name: 'Police / Army Resume',
    category: 'Indian',
    description: 'Structured format for defense services and paramilitary force applications',
    seoTitle: 'Police Army Resume Builder - Defense Services Format | Document Master Tools',
    metaDescription: 'Create a formal resume for police, army, and defense services. Includes physical attributes, training, experience, and references. Perfect for CAPF, Army, Navy, Air Force applications.',
    targetAudience: 'Defense service aspirants, police candidates, paramilitary applicants',
    keyFeatures: ['Physical attributes section', 'Training details', 'Formal structure', 'Photo mandatory'],
    faqs: [
      {
        question: 'What physical details should I include?',
        answer: 'Include height, weight, chest measurement, and any distinguishing marks. Ensure these meet the requirements of the specific force you\'re applying to.'
      },
      {
        question: 'Should I mention my NCC or sports background?',
        answer: 'Absolutely. NCC certificates, sports achievements, and physical fitness activities are highly valued in defense service applications.'
      },
      {
        question: 'How should I list my training and certifications?',
        answer: 'List all relevant training chronologically, including duration, institution, and any specializations. Include first aid, weapons training, or other relevant certifications.'
      }
    ]
  },
  {
    slug: 'ats-friendly-resume',
    name: 'ATS Friendly Resume',
    category: 'International',
    description: 'Optimized format for applicant tracking systems used by global companies',
    seoTitle: 'ATS Friendly Resume Builder - Beat Applicant Tracking Systems | Document Master Tools',
    metaDescription: 'Create an ATS-optimized resume that passes applicant tracking systems. Simple format, keyword-rich, no graphics. Perfect for online job applications and corporate positions.',
    targetAudience: 'Job seekers applying through online portals, corporate applicants',
    keyFeatures: ['ATS-optimized format', 'No graphics or tables', 'Keyword-rich', 'No photo'],
    faqs: [
      {
        question: 'What is an ATS-friendly resume?',
        answer: 'An ATS-friendly resume is formatted to be easily read by Applicant Tracking Systems. It uses simple formatting, standard fonts, and avoids graphics, tables, and complex layouts.'
      },
      {
        question: 'Should I include a photo in an ATS resume?',
        answer: 'No. Photos can confuse ATS systems and are generally not recommended for international applications, especially in the US and UK.'
      },
      {
        question: 'How do I make my resume ATS-friendly?',
        answer: 'Use standard section headings, simple bullet points, common fonts, and include relevant keywords from the job description. Avoid headers, footers, tables, and graphics.'
      }
    ]
  },
  {
    slug: 'us-resume',
    name: 'US Resume',
    category: 'International',
    description: 'American format emphasizing quantified achievements and impact',
    seoTitle: 'US Resume Builder - American Format with Achievements | Document Master Tools',
    metaDescription: 'Create a professional US resume following American standards. Focuses on quantified achievements, action verbs, and impact. No photo, one-page format for most positions.',
    targetAudience: 'US job seekers, international applicants to US companies',
    keyFeatures: ['Achievement-focused', 'Quantified results', 'Action verbs', 'No photo'],
    faqs: [
      {
        question: 'How long should a US resume be?',
        answer: 'Generally one page for early to mid-career professionals. Senior executives may use two pages. Focus on recent and relevant experience.'
      },
      {
        question: 'Should I include a photo on my US resume?',
        answer: 'No. Including a photo on a US resume is not standard practice and may even be discouraged due to anti-discrimination laws.'
      },
      {
        question: 'What\'s the difference between a US resume and CV?',
        answer: 'In the US, a resume is a brief summary (1-2 pages) for most jobs, while a CV is a comprehensive document used mainly in academia and research.'
      }
    ]
  },
  {
    slug: 'uk-cv-format',
    name: 'UK CV Format',
    category: 'International',
    description: 'British curriculum vitae format with detailed work history',
    seoTitle: 'UK CV Builder - British Format Curriculum Vitae | Document Master Tools',
    metaDescription: 'Create a professional UK CV following British standards. Includes detailed work history, personal profile, and interests. Optional photo, typically 2 pages.',
    targetAudience: 'UK job seekers, international applicants to UK companies',
    keyFeatures: ['Detailed work history', 'Personal profile', 'Interests section', 'Optional small photo'],
    faqs: [
      {
        question: 'How long should a UK CV be?',
        answer: 'Typically 2 pages for most professionals. Unlike US resumes, UK CVs can be more detailed and comprehensive.'
      },
      {
        question: 'Should I include a photo on my UK CV?',
        answer: 'It\'s optional. A small professional photo is acceptable but not required. Many UK employers don\'t expect photos.'
      },
      {
        question: 'What should I include in the personal profile?',
        answer: 'Write a brief 3-4 sentence summary highlighting your key skills, experience, and career objectives. Make it specific to the role you\'re applying for.'
      }
    ]
  },
  {
    slug: 'canada-resume',
    name: 'Canada Resume',
    category: 'International',
    description: 'Canadian format highlighting core competencies and volunteer work',
    seoTitle: 'Canada Resume Builder - Canadian Professional Format | Document Master Tools',
    metaDescription: 'Create a Canadian resume with professional summary, core competencies, and volunteer experience. No photo, clean format, typically 1-2 pages.',
    targetAudience: 'Canadian job seekers, international applicants to Canada',
    keyFeatures: ['Core competencies section', 'Volunteer work', 'Professional summary', 'No photo'],
    faqs: [
      {
        question: 'What makes a Canadian resume different?',
        answer: 'Canadian resumes often include a core competencies section, emphasize volunteer work, and follow a clean, professional format without photos.'
      },
      {
        question: 'Should I include references on my Canadian resume?',
        answer: 'No, simply state "References available upon request" at the end. Provide references when specifically asked.'
      },
      {
        question: 'Is volunteer experience important in Canada?',
        answer: 'Yes, Canadian employers value community involvement. Include relevant volunteer work, especially if it demonstrates transferable skills.'
      }
    ]
  },
  {
    slug: 'europass-cv',
    name: 'Europass CV',
    category: 'International',
    description: 'European Union standard CV format for cross-border applications',
    seoTitle: 'Europass CV Builder - EU Standard Format | Document Master Tools',
    metaDescription: 'Create a Europass CV following EU standards. Includes language skills with CEFR levels, digital competencies, and standardized sections. Recognized across Europe.',
    targetAudience: 'EU job seekers, international applicants to European companies',
    keyFeatures: ['EU standard format', 'CEFR language levels', 'Digital skills section', 'Optional photo'],
    faqs: [
      {
        question: 'What is a Europass CV?',
        answer: 'Europass CV is a standardized CV format recognized across the European Union. It uses specific section headings and formats to make qualifications easily comparable.'
      },
      {
        question: 'How do I indicate language proficiency?',
        answer: 'Use the Common European Framework of Reference (CEFR) levels: A1-A2 (Basic), B1-B2 (Independent), C1-C2 (Proficient).'
      },
      {
        question: 'Is Europass CV mandatory in Europe?',
        answer: 'Not mandatory, but highly recommended for EU institutions and cross-border applications. Many European employers are familiar with this format.'
      }
    ]
  },
  {
    slug: 'creative-resume',
    name: 'Creative Resume',
    category: 'International',
    description: 'Bold, visually striking format for creative industries and design roles',
    seoTitle: 'Creative Resume Builder - Designer Portfolio Format | Document Master Tools',
    metaDescription: 'Create a creative resume with bold design, visual elements, and portfolio links. Perfect for designers, artists, marketers, and creative professionals.',
    targetAudience: 'Designers, artists, creative professionals, marketers',
    keyFeatures: ['Bold visual design', 'Portfolio links', 'Skills visualization', 'Optional photo'],
    faqs: [
      {
        question: 'When should I use a creative resume?',
        answer: 'Use creative resumes for design, advertising, marketing, arts, and other creative industries where visual presentation demonstrates your skills.'
      },
      {
        question: 'Can I use colors and graphics?',
        answer: 'Yes! Creative resumes encourage visual elements, but ensure they enhance rather than distract from your content. Keep it professional.'
      },
      {
        question: 'Should I include my portfolio?',
        answer: 'Absolutely. Include links to your online portfolio, Behance, Dribbble, or personal website. Visual work samples are crucial for creative roles.'
      }
    ]
  },
  {
    slug: 'corporate-resume',
    name: 'Corporate Resume',
    category: 'International',
    description: 'Executive format for senior management and corporate leadership positions',
    seoTitle: 'Corporate Resume Builder - Executive Leadership Format | Document Master Tools',
    metaDescription: 'Create an executive corporate resume for senior positions. Includes executive summary, leadership achievements, board memberships, and strategic impact. Sophisticated design.',
    targetAudience: 'Executives, senior managers, corporate leaders',
    keyFeatures: ['Executive summary', 'Leadership focus', 'Strategic achievements', 'No photo'],
    faqs: [
      {
        question: 'How is an executive resume different?',
        answer: 'Executive resumes focus on strategic leadership, business impact, and high-level achievements. They emphasize results, revenue growth, and organizational transformation.'
      },
      {
        question: 'Should I include all my work history?',
        answer: 'Focus on the last 15-20 years and senior-level positions. Earlier roles can be summarized briefly or omitted if not relevant.'
      },
      {
        question: 'What should I include in the executive summary?',
        answer: 'Highlight your leadership brand, key achievements, areas of expertise, and the unique value you bring to organizations. Keep it concise and impactful.'
      }
    ]
  }
];

export function getTemplateBySlug(slug: string): TemplateConfig | undefined {
  return RESUME_TEMPLATE_CONFIGS.find(config => config.slug === slug);
}
