'useClient';

import classNames from 'classnames';

type ButtonProps = {
  size: 'sm' | 'lg';
  text: string;
  cancled?: boolean;
};

export default function Button({ size, text, cancled }: ButtonProps) {
  const sizeClasses = classNames({
    'text-16 px-46 py-14': size === 'lg',
    'text-14 px-56 py-12 ': size === 'sm',
  });
  const cancle = cancled
    ? 'bg-white border border-gray-200 text-gray-400 hover:bg-gray-100'
    : 'bg-toss-blue text-white hover:bg-blue-400';

  return (
    <button className={`round rounded-8 ${sizeClasses} ${cancle}`}>
      {text}
    </button>
  );
}
