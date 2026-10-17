'use client';

import type { ReactNode } from 'react';
import { Download, Mail, MapPin } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/lang-provider';
import { resumeContact, resumes } from '@/lib/resume';
import { ResumeEducation, ResumeEntry } from '@/types/resume';

/** Sets the `**text**` spans of a resume description in bold, as the PDF does. */
function RichText({ text }: { text: string }) {
  return text.split(/\*\*(.+?)\*\*/).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-foreground">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-6">
      <h2 className="border-b pb-2 text-xl font-bold text-primary sm:text-2xl">
        {title}
      </h2>
      {children}
    </section>
  );
}

function EntryHeader({ title, period }: { title: string; period: string }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
      <h3 className="font-semibold text-foreground">{title}</h3>
      <span className="shrink-0 text-sm font-medium tabular-nums text-muted-foreground">
        {period}
      </span>
    </div>
  );
}

function ExperienceEntry({
  entry,
  techLabel,
}: {
  entry: ResumeEntry;
  techLabel: string;
}) {
  const title = entry.company ? `${entry.company} | ${entry.role}` : entry.role;

  return (
    <article className="space-y-3">
      <EntryHeader title={title} period={entry.period} />
      <p className="leading-relaxed text-muted-foreground">
        <RichText text={entry.description} />
      </p>
      {entry.highlights && (
        <ul className="list-disc space-y-1.5 pl-5 leading-relaxed text-muted-foreground marker:text-muted-foreground/60">
          {entry.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      )}
      {entry.tech && (
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="sr-only">{techLabel}:</span>
          {entry.tech.map((t) => (
            <span
              key={t}
              className="inline-block rounded-full border border-border/60 bg-muted/60 px-2.5 py-0.5 text-xs font-medium text-muted-foreground dark:border-border/50 dark:bg-muted/40"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}

function EducationEntry({ entry }: { entry: ResumeEducation }) {
  return (
    <article className="space-y-1">
      <EntryHeader title={entry.school} period={entry.period} />
      <p className="text-muted-foreground">{entry.degree}</p>
    </article>
  );
}

export default function ResumePage() {
  const { lang } = useLanguage();
  const resume = resumes[lang];

  return (
    <main className="container py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-4xl space-y-12">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-primary lg:text-5xl">
              {resumeContact.name}
            </h1>
            <p className="text-lg uppercase tracking-widest text-muted-foreground">
              {resume.role}
            </p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <li className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {resume.location}
              </li>
              <li>
                <a
                  href={`mailto:${resumeContact.email}`}
                  className="inline-flex items-center gap-1.5 hover:text-primary hover:underline"
                >
                  <Mail className="h-4 w-4" />
                  {resumeContact.email}
                </a>
              </li>
              <li>
                <a
                  href={resumeContact.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-primary hover:underline"
                >
                  <FaLinkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
          <Button asChild className="shrink-0 gap-1.5 self-start">
            <a href={resume.pdfUrl} download={resume.pdfFileName}>
              <Download className="h-4 w-4" />
              {resume.headings.download}
            </a>
          </Button>
        </header>

        <Section title={resume.headings.summary}>
          <p className="leading-relaxed text-muted-foreground">{resume.summary}</p>
        </Section>

        <Section title={resume.headings.experience}>
          <div className="space-y-10">
            {resume.experience.map((entry) => (
              <ExperienceEntry
                key={`${entry.company ?? entry.role}-${entry.period}`}
                entry={entry}
                techLabel={resume.headings.technologies}
              />
            ))}
          </div>
        </Section>

        <Section title={resume.headings.education}>
          <div className="space-y-6">
            {resume.education.map((entry) => (
              <EducationEntry key={entry.school} entry={entry} />
            ))}
          </div>
        </Section>

        <Section title={resume.headings.skills}>
          <dl className="space-y-3">
            {resume.skills.map((skill) => (
              <div
                key={skill.label}
                className="sm:grid sm:grid-cols-[12rem_1fr] sm:gap-4"
              >
                <dt className="font-semibold text-foreground">{skill.label}</dt>
                <dd className="leading-relaxed text-muted-foreground">{skill.items}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section title={resume.headings.languages}>
          <p className="text-muted-foreground">{resume.languages}</p>
        </Section>
      </div>
    </main>
  );
}
