'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export interface LangProviderProps {
  children?: React.ReactNode;
}

export interface LangProviderState {
  lang?: string;
  setLang?: React.Dispatch<React.SetStateAction<string>>;
}

const LanguageContext = createContext<LangProviderState>({
  lang: undefined,
  setLang: undefined,
});

export const LangProvider = (props: LangProviderProps) => {
  const searchParams = useSearchParams();

  const language = searchParams.get('lang') || 'en';

  const [lang, setLang] = useState(language);

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
