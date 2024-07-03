import useOutsideClick from '@/hooks/useOutsideClick';
import { Dispatch, SetStateAction, useRef } from 'react';

type DropDownSelectBoxProps = {
  items: {
    label: string;
    onClick: () => void;
  }[];
  setSelectBoxIsOpen: Dispatch<SetStateAction<boolean>>;
  exceptions?: React.RefObject<HTMLElement>[];
};

export default function DropDownSelectBox({
  items,
  setSelectBoxIsOpen,
  exceptions = [],
}: DropDownSelectBoxProps) {
  const dropdownRef = useRef<HTMLUListElement>(null);
  useOutsideClick(dropdownRef, () => setSelectBoxIsOpen(false), exceptions);

  return (
    <ul
      ref={dropdownRef}
      className="mt-1 flex h-74 w-86 flex-col gap-1 rounded-b-xl rounded-t-xl border bg-white p-6 text-center sm:right-0 md:h-82 md:w-93 md:gap-6"
    >
      {items.map((item) => (
        <li key={item.label}>
          <button
            className="h-30 w-74 rounded-4 pt-3 text-12 hover:bg-toss-blue-light/40 hover:text-toss-blue md:h-32 md:w-81 md:text-14"
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
