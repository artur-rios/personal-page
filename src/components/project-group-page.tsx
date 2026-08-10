'use client';

import Link from 'next/link';
import HeadingText from '@/components/heading-text';
import ProjectCard from '@/components/project-card';
import { useLanguage } from '@/components/lang-provider';
import { ArrowLeft } from 'lucide-react';
import { ProjectGroup } from '@/types/project-group';
import { Project } from '@/types/project';

interface ProjectGroupPageProps {
  group: ProjectGroup;
  projects: Project[];
}

export default function ProjectGroupPage({
  group,
  projects,
}: ProjectGroupPageProps) {
  const { lang } = useLanguage();

  const title = lang === 'pt' && group.ptTitle ? group.ptTitle : group.title;
  const overview =
    lang === 'pt' && group.ptOverview ? group.ptOverview : group.overview;

  return (
    <main className="container py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-6xl space-y-10 sm:space-y-12 lg:space-y-16">
        <div className="space-y-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            {lang === 'pt' ? 'Voltar para projetos' : 'Back to projects'}
          </Link>
          <HeadingText subtext={overview}>{title}</HeadingText>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.repoName} project={project} />
          ))}
        </div>
      </div>
    </main>
  );
}
