'use client';

import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  cancel?: boolean;
  style?: string;
  onClick?: () => void;
};

export default function Button({
  text,
  cancel = false,
  style,
  onClick,
}: ButtonProps) {
  const className = classNames('rounded-8', {
    'bg-white border border-gray-200 text-gray-400 hover:bg-gray-200 hover:text-white':
      cancel,
    'bg-toss-blue text-white hover:bg-toss-blue/95': !cancel,
  });

  return (
    <button className={`${className} ${style}`} onClick={onClick}>
      {text}
    </button>
  );
}
