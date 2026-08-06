export type Project = {
  title: string;
  ptTitle?: string;
  description: string;
  ptDescription?: string;
  websiteUrl?: string;
  websiteLabel?: 'website' | 'docs';
  githubUrl: string;
  repoOwner: string;
  repoName: string;
  tech: string[];
};
