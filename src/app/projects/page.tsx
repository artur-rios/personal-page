import type { Metadata } from 'next';
import HeadingText from '@/components/heading-text';
import { projectGroups } from '@/lib/projects';
import ProjectGroupCard from '@/components/project-group-card';
import Localized from '@/components/localized';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'A selection of projects Artur Rios has worked on.',
};

export default function ProjectsPage() {
  return (
    <main className="container py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-6xl space-y-10 sm:space-y-12 lg:space-y-16">
        <HeadingText
          subtext={
            <Localized
              en="A selection of projects I have worked on"
              pt="Uma seleção de projetos em que trabalhei"
            />
          }
        >
          <Localized en="Projects" pt="Projetos" />
        </HeadingText>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {projectGroups.map((group) => (
            <ProjectGroupCard key={group.slug} group={group} />
          ))}
        </div>
      </div>
    </main>
  );
}
