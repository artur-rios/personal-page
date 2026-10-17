export type ProjectGroup = {
  slug: string;
  title: string;
  ptTitle?: string;
  overview: string;
  ptOverview?: string;
  /** Documentation site for the project as a whole, across all of its repositories */
  docsUrl?: string;
  projectRepoNames: string[];
};
