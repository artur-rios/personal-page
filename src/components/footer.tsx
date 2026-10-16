'use client';

import Link from 'next/link';
import { navLinks, resolveNavLink } from '@/lib/config';
import { useLanguage } from '@/components/lang-provider';
import { buildVersion } from '@/lib/version';

export default function Footer() {
  const { lang } = useLanguage();
  const versionTitle = lang === 'pt' ? 'Versão em execução' : 'Running version';

  return (
    <footer className="mt-auto">
      <div className="mx-auto w-full max-w-screen-xl p-6 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link href="/" className="mb-2 block text-2xl font-bold sm:mb-0">
            Artur Rios
          </Link>
          <ul className="mb-6 flex flex-wrap items-center text-primary opacity-60 sm:mb-0">
            {navLinks.map((link) => {
              const { title, href, linkProps } = resolveNavLink(link, lang);
              return (
                <li key={link.title}>
                  <Link
                    href={href}
                    className="mr-4 hover:underline md:mr-6"
                    {...linkProps}
                  >
                    {title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <hr className="my-6 text-muted-foreground sm:mx-auto lg:my-8" />
        <p className="text-sm text-muted-foreground sm:text-center">
          {buildVersion.href ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={buildVersion.href}
              className="hover:underline"
              title={versionTitle}
            >
              {buildVersion.label}
            </a>
          ) : (
            <span title={versionTitle}>{buildVersion.label}</span>
          )}
        </p>
      </div>
    </footer>
  );
}
