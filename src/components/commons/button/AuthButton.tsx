'use client';

import classNames from 'classnames';

type AuthButtonProps = {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
};

export default function AuthButton({
  text,
  disabled = false,
  onClick,
}: AuthButtonProps) {
  const className = classNames('w-full h-50 text-18 text-white rounded-8', {
    'bg-gray-300 cursor-default': disabled,
    'bg-toss-blue hover:bg-blue-400 ': !disabled,
  });
  return (
    <button
      type="submit"
      className={`${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
