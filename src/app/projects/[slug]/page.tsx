import { notFound } from 'next/navigation';
import { projectGroups, getGroupProjects } from '@/lib/projects';
import ProjectGroupPage from '@/components/project-group-page';

export function generateStaticParams() {
  return projectGroups.map((group) => ({
    slug: group.slug,
  }));
}

export default async function ProjectGroupRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const group = projectGroups.find((g) => g.slug === slug);

  if (!group) {
    notFound();
  }

  const projects = getGroupProjects(group);

  return <ProjectGroupPage group={group} projects={projects} />;
}
