'use client';

import {
  ChangeEvent,
  InputHTMLAttributes,
  KeyboardEvent,
  useState,
} from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import Tag from '../tag';

type TagInputWrapperProps<T extends FieldValues> = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  name: Path<T>;
  control: Control<T>;
};

/**
 * TagInputWrapper 컴포넌트는 react-hook-form의 Controller를 통해\
 * TagInput 컴포넌트를 렌더링합니다.
 */
export default function TagInputWrapper<T extends FieldValues>({
  name,
  control,
  ...args
}: TagInputWrapperProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <TagInput onChange={onChange} {...args} />
      )}
    />
  );
}

type TagInputProps = InputHTMLAttributes<HTMLInputElement> & {
  onChange: (value: string[]) => void;
};

function TagInput({ onChange, ...args }: TagInputProps) {
  const [currentTag, setCurrentTag] = useState('');
  const [tagList, setTagList] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentTag(e.target.value);
  };

  const addTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || e.currentTarget.value.trim() === '') return;
    if (tagList.includes(currentTag)) {
      // eslint-disable-next-line no-alert
      alert('같은 태그가 있습니다');
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
              size="lg"
              color="toss"
              deleteTag={() => {
                filterTagList(tag);
              }}
            >
              {tag}
            </Tag>
          ))}
        </div>
      )}
    </>
  );
}
