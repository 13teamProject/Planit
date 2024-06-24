import classNames from 'classnames';
import { TextareaHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  size: 'sm' | 'lg';
  register: UseFormRegisterReturn;
};

export default function Textarea({ size, register, ...args }: Props) {
  const classnames = classNames(
    'border-gray-200 placeholder:text-gray-300 focus:border-toss-blue w-full resize-none rounded-md border px-16 py-12 outline-none',
    { 'h-84': size === 'sm', 'h-96': size === 'lg' },
  );

  return <textarea className={classnames} {...args} {...register} />;
}
