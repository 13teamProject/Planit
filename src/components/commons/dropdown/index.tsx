import useOutsideClick from '@/hooks/useOutsideClick';
import classNames from 'classnames';
import { Dispatch, SetStateAction, useRef } from 'react';

type DropDownSelectBoxProps = {
  items: {
    label: string;
    onClick: () => void;
  }[];
  setSelectBoxIsOpen: Dispatch<SetStateAction<boolean>>;
  exceptions?: React.RefObject<HTMLElement>[];
  size?: 'sm' | 'lg';
};

export default function DropDownSelectBox({
  items,
  setSelectBoxIsOpen,
  exceptions = [],
  size = 'sm',
}: DropDownSelectBoxProps) {
  const dropdownRef = useRef<HTMLUListElement>(null);
  useOutsideClick(dropdownRef, () => setSelectBoxIsOpen(false), exceptions);

  const dropdownClasses = classNames(
    'mt-1 flex flex-col gap-1 rounded-b-xl rounded-t-xl border bg-white p-6 text-center sm:right-0',
    {
      'w-86 md:w-93 lg:w-93': size === 'sm',
      'w-90 md:w-98 lg:w-108': size === 'lg',
    },
  );

  const buttonClasses = classNames(
    'rounded-4 pt-3 hover:bg-toss-blue-light/40 hover:text-toss-blue',
    {
      'text-12 md:text-14 lg:text-14 h-30 w-74 md:h-32 md:w-81 lg:h-32 lg:w-81':
        size === 'sm',
      'text-14 md:text-16 lg:text-16 h-34 w-78 md:h-37 md:w-86 lg:h-37 lg:w-91':
        size === 'lg',
    },
  );

  return (
    <ul ref={dropdownRef} className={dropdownClasses}>
      {items.map((item) => (
        <li key={item.label}>
          <button
            className={buttonClasses}
            type="button"
            onClick={item.onClick}
          >
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );
}
