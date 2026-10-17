import type { Metadata } from 'next';
import HeadingText from '@/components/heading-text';
import ProjectGroupList from '@/components/project-group-list';
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

        <ProjectGroupList />
      </div>
    </main>
  );
}
