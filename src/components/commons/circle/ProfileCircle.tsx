'use client';

import classNames from 'classnames';
import { ReactNode } from 'react';

type Props = {
  color: string;
  size: 'md' | 'lg';
  children: ReactNode;
};

export default function ProfileCircle({ color, size, children }: Props) {
  const classnames = classNames(
    'rounded-full ring-2 ring-white flex justify-center items-center ',
    color,
    {
      'size-[34px]': size === 'md',
      'size-[38px]': size === 'lg',
    },
  );

  return <div className={classnames}>{children}</div>;
}
