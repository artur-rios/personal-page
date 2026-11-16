import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { resumeContact, resumes } from './resume';

const { en, pt } = resumes;

describe('the resume in two languages', () => {
  it('given both languages, when compared, then they list the same jobs in the same order', () => {
    expect(pt.experience.length).toBe(en.experience.length);
    pt.experience.forEach((job, index) => {
      const english = en.experience[index];
      expect(job.company, `job ${index}`).toBe(english.company);
      expect(job.tech, `job ${index}`).toEqual(english.tech);
      expect(Boolean(job.highlights), `job ${index}`).toBe(Boolean(english.highlights));
      expect(job.highlights?.length, `job ${index}`).toBe(english.highlights?.length);
    });
  });

  it('given both languages, when compared, then they list the same schooling and skill groups', () => {
    expect(pt.education.length).toBe(en.education.length);
    expect(pt.skills.length).toBe(en.skills.length);
  });

  it.each(['en', 'pt'] as const)(
    'given the %s resume, when its PDF is linked, then the file is in public/',
    (lang) => {
      const pdf = resumes[lang].pdfUrl;
      expect(pdf).toMatch(/^\/[\w-]+\.pdf$/);
      expect(existsSync(join(process.cwd(), 'public', pdf))).toBe(true);
      expect(resumes[lang].pdfFileName).toMatch(/\.pdf$/);
    },
  );

  it('given both languages, when their PDFs are compared, then each language has its own file', () => {
    expect(pt.pdfUrl).not.toBe(en.pdfUrl);
  });

  it.each(['en', 'pt'] as const)(
    'given the %s resume, when its bold markers are counted, then every one is closed',
    (lang) => {
      for (const job of resumes[lang].experience) {
        const markers = job.description.match(/\*\*/g) ?? [];
        expect(markers.length % 2, job.description.slice(0, 40)).toBe(0);
      }
    },
  );

  it.each(['en', 'pt'] as const)(
    'given the %s resume, when its texts are read, then no heading or entry is blank',
    (lang) => {
      const resume = resumes[lang];
      for (const heading of Object.values(resume.headings)) {
        expect(heading.trim()).not.toBe('');
      }
      for (const job of resume.experience) {
        expect(job.role.trim()).not.toBe('');
        expect(job.period.trim()).not.toBe('');
        expect(job.description.trim()).not.toBe('');
      }
    },
  );

  it('given the contact details, when read, then the address and the LinkedIn link are well formed', () => {
    expect(resumeContact.email).toMatch(/^[^@\s]+@[^@\s]+\.[a-z]+$/);
    expect(resumeContact.linkedInUrl).toMatch(/^https:\/\/www\.linkedin\.com\/in\//);
  });
});
