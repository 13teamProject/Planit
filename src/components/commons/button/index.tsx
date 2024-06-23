'useClient';

import classNames from 'classnames';

type ButtonProps = {
  size: 'sm' | 'lg';
  text: string;
  cancel?: boolean;
  onClick?: () => void;
  color?: string;
};

export default function Button({
  size = 'lg',
  text,
  cancel,
  color,
  onClick,
}: ButtonProps) {
  const className = classNames('rounded-8', {
    'text-16 px-46 py-14': size === 'lg',
    'text-14 px-56 py-12': size === 'sm',
    'bg-white border border-gray-200 text-gray-400 hover:bg-gray-200 hover:text-white':
      cancel,
    'bg-toss-blue text-white hover:bg-blue-400': !cancel,
  });

  return (
    <button type="button" className={`${className} ${color}`} onClick={onClick}>
      {text}
    </button>
  );
}
