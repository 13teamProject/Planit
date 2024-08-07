'use client';

import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  cancel?: boolean;
  styles?: string;
};

export default function Button({
  text,
  cancel = false,
  styles,
  type = 'button',
  ...args
}: ButtonProps) {
  const className = classNames('rounded-8', {
    'bg-white border border-gray-200 text-gray-400 hover:bg-gray-200 hover:text-white':
      cancel,
    'bg-toss-blue text-white hover:bg-toss-blue/95 disabled:bg-gray-200':
      !cancel,
  });

  return (
    // eslint-disable-next-line react/button-has-type
    <button type={type} className={`${className} ${styles}`} {...args}>
      {text}
    </button>
  );
}
