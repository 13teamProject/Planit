'use client';

import {
  ChangeEvent,
  InputHTMLAttributes,
  KeyboardEvent,
  useState,
} from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { toast } from 'react-toastify';

import Tag from '../tag';

type TagInputWrapperProps<T extends FieldValues> = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'defaultValue'
> & {
  name: Path<T>;
  control: Control<T>;
  defaultValue?: string[];
};

/**
 * TagInputWrapper 컴포넌트는 react-hook-form의 Controller를 통해\
 * TagInput 컴포넌트를 렌더링합니다.
 */
export default function TagInputWrapper<T extends FieldValues>({
  name,
  control,
  defaultValue,
  ...args
}: TagInputWrapperProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <TagInput defaultValue={defaultValue} onChange={onChange} {...args} />
      )}
    />
  );
}

type TagInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'defaultValue'
> & {
  onChange: (value: string[]) => void;
  defaultValue?: string[];
};

const MAX_TAGS = 10;

function TagInput({ onChange, defaultValue, ...args }: TagInputProps) {
  const [currentTag, setCurrentTag] = useState('');
  const [tagList, setTagList] = useState<string[]>(defaultValue || []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentTag(e.target.value);
  };

  const addTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || e.currentTarget.value.trim() === '') return;

    if (tagList.length >= MAX_TAGS) {
      toast.error('태그 개수는 최대 10개입니다.');
      return;
    }

    if (tagList.includes(currentTag)) {
      toast.error('같은 태그가 있습니다');
      return;
    }

    const newTagList = [...tagList, currentTag];
    setTagList(newTagList);
    onChange(newTagList);
    setCurrentTag('');
  };

  const filterTagList = (tagToFilter: string) => {
    const newTagList = [...tagList].filter((tag) => tag !== tagToFilter);
    setTagList(newTagList);
    onChange(newTagList);
  };

  return (
    <>
      <input
        type="text"
        value={currentTag}
        onKeyUp={addTag}
        onChange={handleChange}
        className="block h-42 w-full rounded-md border px-16 text-14 outline-none placeholder:text-gray-300 focus:border-[1.5px] focus:border-toss-blue md:h-48 md:text-16"
        {...args}
      />
      {tagList.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-4">
          {[...tagList].reverse().map((tag: string) => (
            <Tag
              key={tag}
              text={tag}
              deleteTag={() => {
                filterTagList(tag);
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}
