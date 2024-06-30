'use client';

import classNames from 'classnames';

type Props = {
  color: string;
  size: 'xs' | 'sm' | 'lg';
};

export default function ColorCircle({ color, size }: Props) {
  const classnames = classNames('rounded-full', color, {
    'size-6': size === 'xs',
    'size-8': size === 'sm',
    'size-30': size === 'lg',
  });

  return <div className={classnames} />;
}
