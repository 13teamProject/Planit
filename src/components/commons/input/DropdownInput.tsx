'use client';

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
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

type DropdownInputWrapperProps<T extends FieldValues> = {
  children: ReactNode;
  control: Control<T>;
  defaultValue: ReactNode;
  name: Path<T>;
};

/**
 * DropdownInputWrapper 컴포넌트는 react-hook-form의 Controller를 통해\
 * DropdownInput 컴포넌트를 렌더링합니다.
 */
export default function DropdownInputWrapper<T extends FieldValues>({
  children,
  name,
  control,
  defaultValue,
}: DropdownInputWrapperProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <DropdownInput onChange={onChange} defaultValue={defaultValue}>
          {children}
        </DropdownInput>
      )}
    />
  );
}

type DropdownInputContextType = {
  isOpen: boolean;
  toggle: () => void;
  selected: ReactNode;
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
  onChange: (value: number) => void;
  defaultValue: ReactNode;
};

/**
 * DropdownInput 컴포넌트는 Context를 이용하여 상태를 공유하며,\
 * 내부의 컴포넌트가 하나의 Dropdown 입력을 구현합니다.
 */
function DropdownInput({
  children,
  onChange,
  defaultValue,
}: DropdownInputProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);

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
      <div
        ref={dropdownRef}
        className="relative h-42 w-287 text-14 md:h-48 md:w-217 md:text-16"
      >
        <ToggleButton />
        {isOpen && (
          <div className="absolute top-48 z-50 w-full rounded-md border border-gray-200 bg-white md:top-56">
            {children}
          </div>
        )}
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
      className="flex size-full select-none items-center justify-between rounded-md border border-gray-200 py-11 pl-16 pr-12 focus:border-[1.5px] focus:border-toss-blue"
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
