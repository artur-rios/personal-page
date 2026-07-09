'use client';

import HeadingText from '@/components/heading-text';
import { projects } from '@/lib/projects';
import ProjectCard from '@/components/project-card';
import { useLanguage } from '@/components/lang-provider';

export default function ProjectsPage() {
  const { lang } = useLanguage();

  return (
    <main className="container py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-6xl space-y-10 sm:space-y-12 lg:space-y-16">
        <HeadingText
          subtext={
            lang === 'pt'
              ? 'Uma seleção de projetos em que trabalhei'
              : 'A selection of projects I have worked on'
          }
        >
          {lang === 'pt' ? 'Projetos' : 'Projects'}
        </HeadingText>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </main>
  );
}
