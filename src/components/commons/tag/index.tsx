'use client';

import classNames from 'classnames';
import { KeyboardEvent, ReactNode } from 'react';

type TagProps = {
  color: string;
  size: 'lg' | 'sm';
  round?: boolean;
  children: ReactNode;
  deleteTag?: () => void;
};

export default function Tag({
  color,
  round,
  size,
  deleteTag,
  children,
}: TagProps) {
  const roundClass = round ? 'rounded-full' : 'rounded';
  const colorVariants: { [key: string]: string } = {
    toss: 'bg-toss-blue-light text-toss-blue',
    blue: 'bg-blue-light-chip text-blue-chip',
    green: 'bg-green-light-chip text-green-chip',
    orange: 'bg-orange-light-chip text-orange-chip',
    pink: 'bg-pink-light-chip text-pink-chip',
    red: 'bg-red-light-chip text-red-chip',
    purple: 'bg-purple-light-chip text-purple-chip',
  };
  const sizeClass = classNames(
    'text-12 inline-flex items-center rounded px-8 py-4 max-w-full',
    {
      'text-12': size === 'lg',
      'text-10': size === 'sm',
    },
  );

  if (deleteTag) {
    const handleKeyboard = (e: KeyboardEvent<HTMLSpanElement>) => {
      if (e.key === 'Backspace' || e.key === 'Delete') {
        // eslint-disable-next-line no-alert
        alert('해당 태그를 삭제하시겠습니까?');
        deleteTag();
      }
    };

    return (
      <span
        role="button"
        onKeyUp={handleKeyboard}
        tabIndex={0}
        className={`${colorVariants[color]} ${roundClass} ${sizeClass} focus:outline focus:outline-[1.5px]`}
      >
        {children}
      </span>
    );
  }

  return (
    <span className={`${colorVariants[color]} ${roundClass} ${sizeClass}`}>
      {children}
    </span>
  );
}
