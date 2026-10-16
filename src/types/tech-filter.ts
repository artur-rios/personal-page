export type TechFilter = {
  /** Value of the `?tech=` query parameter on the projects page */
  slug: string;
  label: string;
  /** A project group matches when any of its projects lists one of these technologies */
  tech: string[];
};
