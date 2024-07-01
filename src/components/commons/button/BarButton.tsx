'use client';

import classNames from 'classnames';
import Image from 'next/image';

type BarButtonProps = {
  text?: string;
  size?: 'sm' | 'lg';
  onClick?: () => void;
};

export default function BarButton({
  text,
  size = 'lg',
  onClick,
}: BarButtonProps) {
  const className = classNames(
    'w-full flex justify-center items-center text-black-800 border border-gray-200 gap-8 font-bold  hover:border-gray-400 bg-white',
    {
      'py-24 rounded-8 text-18': size === 'lg' && text,
      'py-9 rounded-6': size === 'lg' && !text,
      'py-20 text-16 rounded-8': size === 'sm' && text,
      'py-6 rounded-6': size === 'sm' && !text,
    },
  );
  return (
    <button type="button" className={className} onClick={onClick}>
      {text}
      <Image
        width={22}
        height={22}
        src="/icon/add_box_color.svg"
        alt="Bar Button"
      />
    </button>
  );
}
