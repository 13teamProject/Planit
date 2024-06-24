'use client';

import classNames from 'classnames';
import { ReactNode } from 'react';

type Props = {
  color: string;
  size: 'sm' | 'md' | 'lg';
  children: ReactNode;
};

export default function ProfileCircle({ color, size, children }: Props) {
  const classnames = classNames(
    'rounded-full ring-2 ring-white flex justify-center items-center ',
    color,
    {
      'size-26': size === 'sm',
      'size-34': size === 'md',
      'size-38': size === 'lg',
    },
  );

  return <div className={classnames}>{children}</div>;
}
