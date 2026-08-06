'use client';

import Link from 'next/link';
import HeadingText from '@/components/heading-text';
import { dotnetLibraries, projects } from '@/lib/projects';
import ProjectCard from '@/components/project-card';
import { useLanguage } from '@/components/lang-provider';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

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

        <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
          <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-primary sm:text-2xl">
                {lang === 'pt' ? 'Bibliotecas .NET' : '.NET libraries'}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {lang === 'pt'
                  ? `Uma família de ${dotnetLibraries.length} bibliotecas open source para acelerar o desenvolvimento em .NET.`
                  : `A family of ${dotnetLibraries.length} open source libraries to speed up .NET development.`}
              </p>
            </div>
            <Button asChild className="gap-1.5 sm:shrink-0">
              <Link href="/projects/dotnet-libraries">
                {lang === 'pt' ? 'Ver bibliotecas' : 'View libraries'}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6 sm:space-y-8">
          <h2 className="text-2xl font-bold text-primary lg:text-3xl">
            {lang === 'pt' ? 'Outros projetos' : 'Other projects'}
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.repoName} project={project} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
