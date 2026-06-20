'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/lang-provider';

export function LangToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <span className="text-sm font-bold tracking-wide">
            {lang === 'en' ? 'EN' : 'PT'}
          </span>
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLang?.('en')}>
          {lang === 'pt' ? 'Inglês' : 'English'}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLang?.('pt')}>
          {lang === 'pt' ? 'Português' : 'Portuguese'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
