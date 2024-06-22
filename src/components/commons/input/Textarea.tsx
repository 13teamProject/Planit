import classNames from 'classnames';
import { TextareaHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  size: 'sm' | 'lg';
  register: UseFormRegisterReturn;
}

export default function Textarea({ size, register, ...args }: Props) {
  const classnames = classNames(
    'border-gray-200 placeholder:text-gray-300 focus:border-toss-blue w-full resize-none rounded-md border px-4 py-3 outline-none',
    { 'h-[84px]': size === 'sm', 'h-[96px]': size === 'lg' },
  );

  return <textarea className={classnames} {...args} {...register} />;
}
