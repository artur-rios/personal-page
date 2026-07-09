'use client';

import Image from 'next/image';
import { Project } from '@/types/project';
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useLanguage } from '@/components/lang-provider';
import { Button } from '@/components/ui/button';

export default function ProjectCard({ project }: { project: Project }) {
  const { lang } = useLanguage();

  const title = lang === 'pt' && project.ptTitle ? project.ptTitle : project.title;
  const description =
    lang === 'pt' && project.ptDescription ? project.ptDescription : project.description;

  const previewUrl = `https://opengraph.githubassets.com/1/${project.repoOwner}/${project.repoName}`;

  return (
    <Card className="group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="relative aspect-video w-full overflow-hidden border-b bg-muted/30 dark:bg-muted/20">
        <Image
          src={previewUrl}
          alt={`${title} preview`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105 dark:brightness-90"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <CardContent className="flex flex-1 flex-col p-5 sm:p-6">
        <CardTitle className="text-lg sm:text-xl">{title}</CardTitle>
        <CardDescription className="mt-2 line-clamp-3 text-sm leading-relaxed">
          {description}
        </CardDescription>
        {project.tech.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
            {project.tech.map((t) => (
              <span
                key={t}
                className="inline-block rounded-full border border-border/60 bg-muted/60 px-2.5 py-0.5 text-xs font-medium text-muted-foreground dark:bg-muted/40 dark:border-border/50"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex gap-3 p-5 pt-0 sm:p-6 sm:pt-0">
        {project.websiteUrl && (
          <Button variant="outline" size="sm" asChild className="gap-1.5">
            <a
              href={project.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4" />
              Website
            </a>
          </Button>
        )}
        <Button variant="outline" size="sm" asChild className="gap-1.5">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="h-4 w-4" />
            GitHub
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
