import type { Language } from '@/components/lang-provider';
import { MenuLink } from '@/types/menu-link';

export const navLinks: MenuLink[] = [
  {
    title: 'Blog',
    href: 'https://blog.artur-rios.tech/',
    ptHref: 'https://blog.artur-rios.tech/pt',
  },
  {
    title: 'Manifesto',
    href: 'https://blog.artur-rios.tech/manifesto/',
    ptHref: 'https://blog.artur-rios.tech/pt/manifesto/',
  },
  {
    title: 'Resume',
    ptTitle: 'Currículo',
    href: '/resume',
  },
  {
    title: 'GitHub',
    href: 'https://www.github.com/artur-rios',
  },
  {
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/in/artur-rios',
  },
  {
    title: 'Projects',
    ptTitle: 'Projetos',
    href: '/projects',
  },
  {
    title: 'Lab',
    href: 'https://lab.artur-rios.tech/',
  },
  {
    title: 'Contact',
    ptTitle: 'Contato',
    href: '/contact',
  },
];

export interface ResolvedNavLink {
  title: string;
  href: string;
  /** Props that open external links in a new tab */
  linkProps: { target?: string; rel?: string };
}

/** Picks the title and href for the active language and flags external links. */
export function resolveNavLink(link: MenuLink, lang: Language): ResolvedNavLink {
  const isPt = lang === 'pt';
  const href = (isPt && link.ptHref) || link.href;
  const external = /^https?:\/\//.test(href);

  return {
    title: (isPt && link.ptTitle) || link.title,
    href,
    linkProps: external ? { target: '_blank', rel: 'noopener noreferrer' } : {},
  };
}
