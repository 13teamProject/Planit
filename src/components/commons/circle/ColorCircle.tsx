'use client';

import classNames from 'classnames';

type Props = {
  color: string;
  size: 'sm' | 'lg';
};

export default function ColorCircle({ color, size }: Props) {
  const classnames = classNames('rounded-full', color, {
    'size-2': size === 'sm',
    'size-[30px]': size === 'lg',
  });

  return <div className={classnames} />;
}
