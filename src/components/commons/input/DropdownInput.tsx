'use client';

import classNames from 'classnames';
import Image from 'next/image';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Control, Controller } from 'react-hook-form';

type DropdownInputWrapperProps = {
  children: ReactNode;
  size: 'md' | 'lg';
  control: Control;
  placeholder: string;
  name: string;
};

/**
 * DropdownInputWrapper 컴포넌트는 react-hook-form의 Controller를 통해\
 * DropdownInput 컴포넌트를 렌더링합니다.
 */
export default function DropdownInputWrapper({
  children,
  name,
  control,
  size,
  placeholder,
}: DropdownInputWrapperProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <DropdownInput
          size={size}
          placeholder={placeholder}
          onChange={onChange}
        >
          {children}
        </DropdownInput>
      )}
    />
  );
}

type DropdownInputContextType = {
  isOpen: boolean;
  toggle: () => void;
  selected: JSX.Element;
  handleSelect: (id: number, element: JSX.Element) => void;
};

const DropdownInputContext = createContext<DropdownInputContextType>({
  isOpen: false,
  toggle: () => {},
  selected: <></>,
  handleSelect: () => {},
});

type DropdownInputProps = {
  children: ReactNode;
  size: 'md' | 'lg';
  placeholder: string;
  onChange: (value: number) => void;
};

/**
 * DropdownInput 컴포넌트는 Context를 이용하여 상태를 공유하며,\
 * 내부의 컴포넌트가 하나의 Dropdown 입력을 구현합니다.
 */
function DropdownInput({
  children,
  size,
  placeholder,
  onChange,
}: DropdownInputProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(
    <span className="text-gray-300">{placeholder}</span>,
  );

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (id: number, element: JSX.Element) => {
    onChange(id);
    setSelected(element);
    setIsOpen(false);
  };

  const contextValue = useMemo(
    () => ({
      isOpen,
      toggle,
      selected,
      handleSelect,
    }),
    [isOpen, selected],
  );

  const wrapperClassnames = classNames('relative', {
    'w-217 h-48': size === 'md',
    'w-287 h-42': size === 'lg',
  });

  const listClassnames = classNames(
    'absolute z-50 w-full bg-white top-20 border border-gray-200 rounded-md',
    {
      'top-56': size === 'md',
      'top-48': size === 'lg',
    },
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node | null)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <DropdownInputContext.Provider value={contextValue}>
      <div ref={dropdownRef} className={wrapperClassnames}>
        <ToggleButton />
        {isOpen && <div className={listClassnames}>{children}</div>}
      </div>
    </DropdownInputContext.Provider>
  );
}

function ToggleButton() {
  const { toggle, selected } = useContext(DropdownInputContext);

  return (
    <button
      type="button"
      onClick={toggle}
      className="flex size-full select-none items-center justify-between rounded-md border border-gray-200 px-16 py-11"
    >
      {selected}
      <Image
        src="/icon/arrow_drop_down.svg"
        alt="dropdown"
        width={26}
        height={26}
      />
    </button>
  );
}

/**
 * Option 컴포넌트는 DropdownInput에서 사용할 수 있는 선택 옵션을 렌더링합니다.
 */
function Option({ id, children }: { id: number; children: ReactNode }) {
  const { handleSelect } = useContext(DropdownInputContext);

  return (
    <button
      type="button"
      onClick={() => {
        handleSelect(id, <>{children}</>);
      }}
      className="gray-200 flex h-42 w-full items-center border-b border-gray-200 px-16 last:border-none hover:bg-toss-blue-light"
    >
      {children}
    </button>
  );
}

DropdownInputWrapper.Option = Option;
