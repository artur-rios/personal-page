'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/lang-provider';
import { ArrowRight } from 'lucide-react';
import { ProjectGroup } from '@/types/project-group';
import { getGroupProjects } from '@/lib/projects';

export default function ProjectGroupCard({ group }: { group: ProjectGroup }) {
  const { lang } = useLanguage();

  const title = lang === 'pt' && group.ptTitle ? group.ptTitle : group.title;
  const overview =
    lang === 'pt' && group.ptOverview ? group.ptOverview : group.overview;

  const tagProjects = getGroupProjects(group);
  const tags = [...new Set(tagProjects.flatMap((p) => p.tech))];

  const repoCount = group.projectRepoNames.length;

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <CardContent className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-lg font-semibold text-primary sm:text-xl">
          {title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {overview}
        </p>
        {tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
            {tags.map((t) => (
              <span
                key={t}
                className="inline-block rounded-full border border-border/60 bg-muted/60 px-2.5 py-0.5 text-xs font-medium text-muted-foreground dark:bg-muted/40 dark:border-border/50"
              >
                {t}
              </span>
            ))}
          </div>
        )}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {repoCount}{' '}
            {lang === 'pt'
              ? repoCount === 1
                ? 'repositório'
                : 'repositórios'
              : repoCount === 1
                ? 'repository'
                : 'repositories'}
          </span>
          <Button variant="outline" size="sm" asChild className="gap-1.5">
            <Link href={`/projects/${group.slug}`}>
              {lang === 'pt' ? 'Ver detalhes' : 'View details'}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
