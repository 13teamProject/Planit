'use client';

import classNames from 'classnames';
import {
  ChangeEvent,
  InputHTMLAttributes,
  KeyboardEvent,
  useState,
} from 'react';
import { Control, Controller } from 'react-hook-form';

import Tag from '../tag';

type TagInputWrapperProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'onChange'
> & {
  name: string;
  control: Control;
  size: 'md' | 'lg';
};

/**
 * TagInputWrapper 컴포넌트는 react-hook-form의 Controller를 통해\
 * TagInput 컴포넌트를 렌더링합니다.
 */
export default function TagInputWrapper({
  name,
  size,
  control,
  ...args
}: TagInputWrapperProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <TagInput size={size} onChange={onChange} {...args} />
      )}
    />
  );
}

type TagInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  size: 'md' | 'lg';
  onChange: (value: string[]) => void;
};

function TagInput({ size, onChange, ...args }: TagInputProps) {
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

  const classnames = classNames(
    'block w-full rounded-md border border-gray-200 px-16 outline-none placeholder:text-gray-300',
    {
      'h-42': size === 'md',
      'h-48': size === 'lg',
    },
  );

  return (
    <>
      <input
        type="text"
        value={currentTag}
        onKeyUp={addTag}
        onChange={handleChange}
        className={classnames}
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
