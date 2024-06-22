'use client';

import classNames from 'classnames';
import { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegisterReturn;
  error?: boolean;
}

export default function TextInput({ register, error, ...args }: Props) {
  const classnames = classNames(
    'block h-12 w-full rounded-md border px-4 outline-none placeholder:text-gray-300',
    {
      'border-red-dashboard': error,
      'border-gray-200': !error,
    },
  );

  return <input type="text" className={classnames} {...args} {...register} />;
}
