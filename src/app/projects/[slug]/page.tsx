import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getGroupProjects, getProjectGroup, projectGroups } from '@/lib/projects';
import ProjectGroupPage from '@/components/project-group-page';

interface ProjectGroupRouteProps {
  params: Promise<{ slug: string }>;
}

// Only the groups known at build time exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projectGroups.map((group) => ({
    slug: group.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectGroupRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const group = getProjectGroup(slug);

  if (!group) {
    return {};
  }

  return {
    title: group.title,
    description: group.overview,
  };
}

export default async function ProjectGroupRoute({ params }: ProjectGroupRouteProps) {
  const { slug } = await params;
  const group = getProjectGroup(slug);

  if (!group) {
    notFound();
  }

  const projects = getGroupProjects(group);

  return <ProjectGroupPage group={group} projects={projects} />;
}
