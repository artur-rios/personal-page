import Image from 'next/image';
import React from 'react';

export interface CustomIconProps {
  icon?: string;
}

export default function CustomIcon(props: CustomIconProps) {
  const className = 'dark:brightness-0 dark:invert-[1] h-[6rem] w-[6rem]';

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
