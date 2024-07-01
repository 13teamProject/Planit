'use client';

import classNames from 'classnames';
import Image from 'next/image';
import { ReactNode } from 'react';

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
    return (
      <button
        type="button"
        onClick={deleteTag}
        tabIndex={0}
        className={`${colorVariants[color]} ${roundClass} ${sizeClass} group/tag relative`}
      >
        {children}
        <div className="invisible absolute inset-0 flex items-center justify-center rounded bg-gray-300 opacity-90 outline-none group-hover/tag:visible">
          <Image
            src="/icon/close.svg"
            alt="x"
            width={12}
            height={12}
            className="rounded-full bg-white"
          />
        </div>
      </button>
    );
  }

  return (
    <span className={`${colorVariants[color]} ${roundClass} ${sizeClass}`}>
      {children}
    </span>
  );
}
