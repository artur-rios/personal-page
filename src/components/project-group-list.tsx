'use client';

import { useSyncExternalStore } from 'react';
import ProjectGroupCard from '@/components/project-group-card';
import { useLanguage } from '@/components/lang-provider';
import {
  getTechFilter,
  matchesTechFilter,
  projectGroups,
  techFilters,
} from '@/lib/projects';
import { cn } from '@/lib/utils';

// The `?tech=` filter is read from the URL the same way the language is (see lang-provider):
// useSearchParams would keep the projects page from being prerendered. The server renders every
// project and the client narrows the list after hydration.
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener('popstate', listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('popstate', listener);
  };
}

function getSnapshot(): string | null {
  return new URLSearchParams(window.location.search).get('tech');
}

function getServerSnapshot(): string | null {
  return null;
}

function setTechParam(slug: string | null) {
  const url = new URL(window.location.href);
  if (slug) {
    url.searchParams.set('tech', slug);
  } else {
    url.searchParams.delete('tech');
  }
  window.history.replaceState(null, '', url);
  listeners.forEach((listener) => listener());
}

const chipClass =
  'inline-block cursor-pointer rounded-full border px-3 py-1 text-sm font-medium';
const idleChipClass =
  'border-border/60 bg-muted/60 text-muted-foreground hover:border-border hover:bg-muted dark:border-border/50 dark:bg-muted/40';
const activeChipClass = 'border-primary bg-primary text-primary-foreground';

export default function ProjectGroupList() {
  const { lang } = useLanguage();
  const activeFilter = getTechFilter(
    useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot),
  );

  const groups = activeFilter
    ? projectGroups.filter((group) => matchesTechFilter(group, activeFilter))
    : projectGroups;

  const chips = [
    { slug: null, label: lang === 'pt' ? 'Todos' : 'All' },
    ...techFilters.map(({ slug, label }) => ({ slug, label })),
  ];

  return (
    <div className="space-y-8">
      <ul
        className="flex flex-wrap gap-2"
        aria-label={lang === 'pt' ? 'Filtrar por tecnologia' : 'Filter by technology'}
      >
        {chips.map(({ slug, label }) => {
          const active = (activeFilter?.slug ?? null) === slug;
          return (
            <li key={slug ?? 'all'}>
              <button
                type="button"
                aria-pressed={active}
                onClick={() => setTechParam(slug)}
                className={cn(chipClass, active ? activeChipClass : idleChipClass)}
              >
                {label}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
        {groups.map((group) => (
          <ProjectGroupCard key={group.slug} group={group} />
        ))}
      </div>
    </div>
  );
}
