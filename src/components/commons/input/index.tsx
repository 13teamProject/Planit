'use client';

import classNames from 'classnames';
import Image from 'next/image';
import { InputHTMLAttributes, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  type?: string;
  error?: boolean;
  size?: 'sm' | 'lg';
  register: UseFormRegisterReturn;
};

export default function Input({
  type = 'text',
  size = 'sm',
  error,
  register,
  ...args
}: InputProps) {
  const classnames = classNames(
    'block w-full rounded-md border pl-16 pr-40 outline-none placeholder:text-gray-300 text-14 md:text-16',
    {
      'border-red-dashboard border-[1.5px] focus:border-red-dashboard': error,
      'border-gray-200 focus:border-toss-blue focus:border-[1.5px]': !error,
      'h-42 md:h-48': size === 'sm',
      'h-55': size === 'lg',
    },
  );

  if (type === 'password') {
    return (
      <PasswordInput className={classnames} register={register} {...args} />
    );
  }

  return <input type={type} className={classnames} {...args} {...register} />;
}

type PasswordInputProps = InputHTMLAttributes<HTMLInputElement> & {
  className: string;
  register: UseFormRegisterReturn;
};

function PasswordInput({ className, register, ...args }: PasswordInputProps) {
  const [pwClose, setPwClose] = useState(true);

  const togglePWEye = () => {
    setPwClose((prev) => !prev);
  };

  return (
    <div className="relative">
      <input
        type={pwClose ? 'password' : 'text'}
        className={className}
        {...args}
        {...register}
      />
      <Image
        src={pwClose ? '/icon/visibility_off.svg' : '/icon/visibility_on.svg'}
        alt="pw-eye"
        width={24}
        height={24}
        onClick={togglePWEye}
        className="absolute right-18 top-1/2 -translate-y-1/2 cursor-pointer"
      />
    </div>
  );
}
