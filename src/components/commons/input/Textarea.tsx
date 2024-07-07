import { TextareaHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  register: UseFormRegisterReturn;
};

export default function Textarea({ register, ...args }: Props) {
  return (
    <textarea
      className="custom-scrollbar h-84 w-full resize-none rounded-md border border-gray-200 px-16 py-12 text-14 outline-none placeholder:text-gray-300 focus:border-[1.5px] focus:border-toss-blue dark:bg-gray-700 dark:text-white dark:placeholder:text-white md:h-96 md:text-16"
      {...args}
      {...register}
    />
  );
}
