export type Content = {
  text: string;
  subtext: string;
  icon?: string;
  /** Official documentation URL; when set, the technology name is rendered as a link */
  docUrl?: string;
  /** Slug of a tech filter on the projects page; when set, the card links to those projects */
  projectsFilter?: string;
};
