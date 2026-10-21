'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { navLinks, resolveNavLink } from '@/lib/config';
import { LangToggle } from '@/components/lang-toggle';
import { useLanguage } from '@/components/lang-provider';

export default function Navbar() {
  const [navbar, setNavbar] = useState(false);

  const { lang } = useLanguage();

  const handleClick = () => {
    setNavbar(false);
  };

  // Lock page scroll while the mobile menu is open and let Escape close it.
  useEffect(() => {
    if (!navbar) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setNavbar(false);
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [navbar]);

  return (
    <header className="select-none">
      <nav className="mx-auto justify-between px-4 md:flex md:items-center md:px-8 lg:max-w-7xl">
        <div>
          <div className="flex items-center justify-between py-3 md:block md:py-5">
            <Link href="/" onClick={handleClick}>
              <span className="block text-2xl font-bold duration-200 lg:hover:scale-[1.10]">
                Artur Rios
              </span>
            </Link>
            <div className="flex gap-1 md:hidden">
              <button
                className="rounded-md p-2 text-primary outline-none focus:border focus:border-primary"
                aria-label={lang === 'pt' ? 'Abrir menu' : 'Toggle menu'}
                aria-expanded={navbar}
                aria-controls="mobile-menu"
                onClick={() => setNavbar((open) => !open)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
              <ThemeToggle />
              <LangToggle />
            </div>
          </div>
        </div>
        <div>
          <div
            id="mobile-menu"
            className={`absolute left-0 right-0 z-10 m-auto w-full max-w-xs justify-self-center rounded-md border bg-background p-4 md:static md:mt-0 md:block md:w-auto md:max-w-none md:border-none md:p-0 ${
              navbar ? 'block' : 'hidden'
            }`}
          >
            <ul className="flex flex-col items-center space-y-4 text-primary opacity-60 md:flex-row md:space-x-6 md:space-y-0">
              {navLinks.map((link) => {
                const { title, href, linkProps } = resolveNavLink(link, lang);
                return (
                  <li key={link.title}>
                    <Link
                      className="hover:underline"
                      href={href}
                      onClick={handleClick}
                      {...linkProps}
                    >
                      {title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="hidden md:flex md:items-center md:gap-1">
          <ThemeToggle />
          <LangToggle />
        </div>
      </nav>
    </header>
  );
}
