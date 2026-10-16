import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface HeadingProps {
  children: ReactNode;
  subtext?: ReactNode;
  className?: string;
  /** Heading level; use h2 for section headings below the page's main heading */
  as?: 'h1' | 'h2';
}

export default function HeadingText({
  children,
  subtext,
  className,
  as: Heading = 'h1',
}: HeadingProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <Heading className="text-3xl font-bold text-primary lg:text-4xl">
        {children}
      </Heading>
      {subtext && (
        <p className="font-light text-muted-foreground lg:text-lg">{subtext}</p>
      )}
    </div>
  );
}
