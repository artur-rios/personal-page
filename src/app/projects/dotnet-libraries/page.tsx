'use client';

import Link from 'next/link';
import HeadingText from '@/components/heading-text';
import { dotnetLibraries } from '@/lib/projects';
import ProjectCard from '@/components/project-card';
import { useLanguage } from '@/components/lang-provider';
import { ArrowLeft } from 'lucide-react';

export default function DotnetLibrariesPage() {
  const { lang } = useLanguage();

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
          <HeadingText
            subtext={
              lang === 'pt'
                ? 'Bibliotecas open source que uso no dia a dia para construir aplicações .NET'
                : 'Open source libraries I use every day to build .NET applications'
            }
          >
            {lang === 'pt' ? 'Bibliotecas .NET' : '.NET libraries'}
          </HeadingText>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {dotnetLibraries.map((library) => (
            <ProjectCard key={library.repoName} project={library} />
          ))}
        </div>
      </div>
    </main>
  );
}
