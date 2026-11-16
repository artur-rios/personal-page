import { describe, expect, it } from 'vitest';
import { navLinks, resolveNavLink } from './config';

describe('resolveNavLink', () => {
  const external = {
    title: 'Blog',
    href: 'https://blog.example.com/',
    ptHref: 'https://blog.example.com/pt',
  };
  const internal = { title: 'Projects', ptTitle: 'Projetos', href: '/projects' };

  it('given English, when a link is resolved, then its English title and href are used', () => {
    expect(resolveNavLink(internal, 'en')).toEqual({
      title: 'Projects',
      href: '/projects',
      linkProps: {},
    });
  });

  it('given Portuguese, when a link has Portuguese texts, then they are used', () => {
    expect(resolveNavLink(internal, 'pt').title).toBe('Projetos');
    expect(resolveNavLink(external, 'pt').href).toBe('https://blog.example.com/pt');
  });

  it('given Portuguese, when a link has no Portuguese texts, then the English ones stand in', () => {
    const link = { title: 'Lab', href: 'https://lab.example.com/' };
    expect(resolveNavLink(link, 'pt')).toMatchObject({
      title: 'Lab',
      href: 'https://lab.example.com/',
    });
  });

  it.each(['en', 'pt'] as const)(
    'given an external link in %s, when resolved, then it opens in a new tab without an opener',
    (lang) => {
      expect(resolveNavLink(external, lang).linkProps).toEqual({
        target: '_blank',
        rel: 'noopener noreferrer',
      });
    },
  );

  it('given an http link, when resolved, then it also counts as external', () => {
    expect(
      resolveNavLink({ title: 'Old', href: 'http://old.example.com' }, 'en').linkProps
        .target,
    ).toBe('_blank');
  });
});

describe('navLinks', () => {
  it('given every menu entry, when resolved in either language, then it points at a site path or an https URL', () => {
    for (const link of navLinks) {
      for (const lang of ['en', 'pt'] as const) {
        expect(resolveNavLink(link, lang).href, `${link.title} (${lang})`).toMatch(
          /^(\/[a-z-]*|https:\/\/.+)$/,
        );
      }
    }
  });

  it('given every menu entry, when compared, then no title appears twice', () => {
    const titles = navLinks.map((l) => l.title);
    expect(new Set(titles).size).toBe(titles.length);
  });
});
