'useClient';

import classNames from 'classnames';

type ButtonProps = {
  size: 'sm' | 'lg';
  text: string;
  cancled?: boolean;
  onClick?: () => void;
};

export default function Button({ size, text, cancled, onClick }: ButtonProps) {
  const className = classNames('rounded-8', {
    'text-16 px-46 py-14': size === 'lg',
    'text-14 px-56 py-12': size === 'sm',
    'bg-white border border-gray-200 text-gray-400 hover:bg-gray-100': cancled,
    'bg-toss-blue text-white hover:bg-blue-400': !cancled,
  });

  return (
    <button type="button" className={`${className}`} onClick={onClick}>
      {text}
    </button>
  );
}
