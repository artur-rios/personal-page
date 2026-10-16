import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface CustomIconProps {
  /** Name of an SVG file in /public, without the extension */
  icon?: string;
  className?: string;
  /** Leave empty when the icon sits next to a visible label (decorative) */
  alt?: string;
}

export default function CustomIcon({ icon, className, alt = '' }: CustomIconProps) {
  if (!icon) {
    return null;
  }

  return (
    <Image
      src={`/${icon}.svg`}
      className={cn('dark:brightness-0 dark:invert', className ?? 'h-[6rem] w-[6rem]')}
      width={50}
      height={50}
      alt={alt}
    />
  );
}
