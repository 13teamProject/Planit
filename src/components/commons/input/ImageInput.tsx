import classNames from 'classnames';
import Image from 'next/image';
import { InputHTMLAttributes, useRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  register: UseFormRegisterReturn;
  size?: 'sm' | 'lg';
};

export default function ImageInput({ register, size = 'sm', ...args }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { ref: registerRef, ...registerRest } = register;

  const classnames = classNames(
    'flex aspect-square items-center justify-center rounded-md bg-[#f5f5f5] outline-none',
    {
      'size-58 md:size-76': size === 'sm',
      'size-182': size === 'lg',
    },
  );

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <button type="button" onClick={handleClick} className={classnames}>
      <input
        type="file"
        accept="image/png, image/jpeg"
        className="hidden"
        ref={(e) => {
          registerRef(e);
          inputRef.current = e;
        }}
        {...args}
        {...registerRest}
      />
      <Image src="/icon/plus.svg" alt="plus" width={30} height={30} />
    </button>
  );
}
