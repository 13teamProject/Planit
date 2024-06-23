'use client';

import classNames from 'classnames';

type TagProps = {
  text: string;
  color: string;
  size: 'lg' | 'sm';
  round?: boolean;
};

export default function Tag({ text, color, round, size }: TagProps) {
  const roundClass = round ? 'rounded-full' : 'rounded';
  const colorVariants: { [key: string]: string } = {
    toss: 'bg-toss-blue-light text-toss-blue',
    blue: 'bg-blue-light-chip text-blue-chip',
    green: 'bg-green-light-chip text-green-chip',
    orange: 'bg-orange-light-chip text-purple-chip',
    pink: 'bg-pink-light-chip text-pink-chip',
    red: 'bg-red-light-chip text-red-chip',
    purple: 'bg-purple-light-chip text-purple-chip',
  };
  const sizeClass = classNames({
    'text-12': size === 'lg',
    'text-10': size === 'sm',
  });

  return (
    <span
      className={`text-12 inline-flex items-center rounded px-8 py-4 ${colorVariants[color]} ${roundClass} ${sizeClass}`}
    >
      {round && (
        <span
          className={`mr-6 inline-block h-6 w-6 rounded-full bg-toss-blue`}
        ></span>
      )}
      <span>{text}</span>
    </span>
  );
}
