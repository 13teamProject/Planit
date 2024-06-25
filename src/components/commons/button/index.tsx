'use client';

import classNames from 'classnames';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  text: string;
  cancel?: boolean;
  style?: string;
  onClick?: () => void;
};

export default function Button({
  type = 'button',
  text,
  cancel = false,
  style,
  onClick,
}: ButtonProps) {
  const className = classNames('rounded-8 md:w-120 md:h-48 sm:w-138 sm:h-42', {
    'bg-white border border-gray-200 text-gray-400 hover:bg-gray-200 hover:text-white':
      cancel,
    'bg-toss-blue text-white hover:bg-toss-blue/95': !cancel,
  });

  return (
    <button type={type} className={`${className} ${style}`} onClick={onClick}>
      {text}
    </button>
  );
}
