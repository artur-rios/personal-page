'use client';

import Link from 'next/link';
import { navLinks, resolveNavLink } from '@/lib/config';
import { useLanguage } from '@/components/lang-provider';

export default function Footer() {
  const { lang } = useLanguage();

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
        <span className="block text-sm text-muted-foreground sm:text-center">
          © {new Date().getFullYear()}{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/artur-rios/"
            className="hover:underline"
          >
            Artur Rios
          </a>
          .{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/artur-rios/personal-page/blob/main/LICENSE"
            className="hover:underline"
          >
            Artur Rios Attribution License
          </a>
          .
        </span>
      </div>
    </footer>
  );
}
