'use client';

import React, { useEffect, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';

export type Language = 'en' | 'pt';

const VALID_LANGS: readonly Language[] = ['en', 'pt'];
const DEFAULT_LANG: Language = 'en';
const HTML_LANG: Record<Language, string> = { en: 'en', pt: 'pt-BR' };

function isLanguage(value: string | null): value is Language {
  return VALID_LANGS.includes(value as Language);
}

// The language lives in a tiny module-level store instead of being read with
// useSearchParams: that hook forces everything below it to bail out of static
// rendering, which left the prerendered HTML empty. The server always renders
// the default language and the client switches after hydration if the URL
// asks for another one.
let currentLang: Language | undefined;
const listeners = new Set<() => void>();

function readLangFromUrl(): Language {
  const raw = new URLSearchParams(window.location.search).get('lang');
  return isLanguage(raw) ? raw : DEFAULT_LANG;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): Language {
  currentLang ??= readLangFromUrl();
  return currentLang;
}

function getServerSnapshot(): Language {
  return DEFAULT_LANG;
}

function setLang(lang: Language) {
  if (lang === currentLang) return;
  currentLang = lang;
  listeners.forEach((listener) => listener());
}

export function useLanguage() {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return { lang, setLang };
}

export interface LangProviderProps {
  children?: React.ReactNode;
}

/**
 * Keeps the `?lang=` query parameter and the document language in sync with the
 * selected language, including after client-side navigations drop the query.
 */
export function LangProvider({ children }: LangProviderProps) {
  const { lang } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang];

    const url = new URL(window.location.href);
    const desired = lang === DEFAULT_LANG ? null : lang;
    if (url.searchParams.get('lang') === desired) return;

    if (desired) {
      url.searchParams.set('lang', desired);
    } else {
      url.searchParams.delete('lang');
    }
    window.history.replaceState(null, '', url);
  }, [lang, pathname]);

  return children;
}
