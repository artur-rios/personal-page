import Image from 'next/image';
import React from 'react';
import { cn } from '@/lib/utils';

export interface CustomIconProps {
  icon?: string;
  className?: string;
}

export default function CustomIcon(props: CustomIconProps) {
  const base = 'dark:brightness-0 dark:invert-[1]';
  const defaultSize = 'h-[6rem] w-[6rem]';
  const className = cn(base, props.className ?? defaultSize);

  if (!props.icon) {
    return <></>;
  }

  return (
    <Image
      src={`${props.icon}.svg`}
      className={className}
      width={50}
      height={50}
      alt="Card image"
    />
  );
}
