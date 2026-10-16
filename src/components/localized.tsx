'use client';

import { useLanguage } from '@/components/lang-provider';

export interface LocalizedProps {
  en: string;
  pt: string;
}

/** Renders the string for the active language; lets server components show localized text. */
export default function Localized({ en, pt }: LocalizedProps) {
  const { lang } = useLanguage();
  return lang === 'pt' ? pt : en;
}
