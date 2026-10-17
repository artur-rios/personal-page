export type ResumeEntry = {
  /** Left out for work without an employer, such as freelancing */
  company?: string;
  role: string;
  period: string;
  /** `**text**` marks the names the printed resume sets in bold */
  description: string;
  highlights?: string[];
  tech?: string[];
};

export type ResumeEducation = {
  school: string;
  degree: string;
  period: string;
};

export type ResumeSkill = {
  label: string;
  items: string;
};

export type Resume = {
  role: string;
  location: string;
  /** The PDF version of this resume, served from /public */
  pdfUrl: string;
  /** Name the browser saves the PDF under */
  pdfFileName: string;
  headings: {
    summary: string;
    experience: string;
    education: string;
    skills: string;
    languages: string;
    technologies: string;
    download: string;
  };
  summary: string;
  experience: ResumeEntry[];
  education: ResumeEducation[];
  skills: ResumeSkill[];
  languages: string;
};
