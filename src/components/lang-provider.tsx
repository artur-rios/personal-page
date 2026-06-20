'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export interface LangProviderProps {
  children?: React.ReactNode;
}

type Language = 'en' | 'pt';

const VALID_LANGS: Language[] = ['en', 'pt'];

export interface LangProviderState {
  lang?: Language;
  setLang?: React.Dispatch<React.SetStateAction<Language>>;
}

const LanguageContext = createContext<LangProviderState>({
  lang: undefined,
  setLang: undefined,
});

export const LangProvider = (props: LangProviderProps) => {
  const searchParams = useSearchParams();

  const raw = searchParams.get('lang');
  const language: Language = VALID_LANGS.includes(raw as Language) ? (raw as Language) : 'en';

  const [lang, setLang] = useState<Language>(language);

  useEffect(() => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.set('lang', lang);

    window.history.pushState(null, '', `?${updatedSearchParams.toString()}`);
  }, [searchParams, lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {' '}
      {props.children}{' '}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
