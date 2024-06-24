'use client';

import Button from '@/components/commons/button';
import Input from '@/components/commons/input';
import DateInput from '@/components/commons/input/DateInput';
import DropdownInput from '@/components/commons/input/DropdownInput';
import ImageInput from '@/components/commons/input/ImageInput';
import TagInput from '@/components/commons/input/TagInput';
import Textarea from '@/components/commons/input/Textarea';
import { useForm } from 'react-hook-form';

// TODO: 반응형
export default function CreateCard() {
  const { register, handleSubmit, watch, control } = useForm();

  return (
    <form className="fixed left-1/2 top-1/2 min-w-327 -translate-x-1/2 -translate-y-1/2 transform rounded-xl border border-gray-200 bg-white p-28 md:min-w-[506px]">
      <h1 className="mb-24 text-24 font-bold md:mb-32">할 일 생성</h1>

      <label
        htmlFor="dropdown"
        className="mb-10 block text-black-800 md:text-18"
      >
        담당자
      </label>
      <DropdownInput
        name="dropdown"
        control={control}
        size="lg"
        placeholder="이름을 입력해 주세요"
      >
        <DropdownInput.Option id={1}>Option 1</DropdownInput.Option>
      </DropdownInput>

      <label
        htmlFor="title"
        className="mb-10 mt-24 block text-black-800 md:mt-32 md:text-18"
      >
        제목 <span className="text-violet-dashboard">*</span>
      </label>
      <Input
        id="title"
        type="text"
        size="md"
        placeholder="제목을 입력해 주세요"
        register={{ ...register('title', { required: true }) }}
      />

      <label
        htmlFor="description"
        className="mb-10 mt-24 block text-black-800 md:mt-32 md:text-18"
      >
        설명 <span className="text-violet-dashboard">*</span>
      </label>
      <Textarea
        id="description"
        size="sm"
        placeholder="설명을 입력해 주세요"
        register={{ ...register('description', { required: true }) }}
      />

      <label
        htmlFor="date"
        className="mb-10 mt-24 block text-black-800 md:mt-32 md:text-18"
      >
        마감일
      </label>
      <DateInput
        size="md"
        control={control}
        placeholder="날짜를 입력해 주세요"
        name="date"
      />

      <label
        htmlFor="tag"
        className="mb-10 mt-24 block text-black-800 md:mt-32 md:text-18"
      >
        태그
      </label>
      <TagInput
        id="tag"
        size="md"
        placeholder="입력 후 Enter"
        name="tag"
        control={control}
      />

      <label
        htmlFor="image"
        className="mb-10 mt-24 block text-black-800 md:mt-32 md:text-18"
      >
        이미지
      </label>
      <ImageInput id="image" size="md" register={{ ...register('image') }} />

      <div className="mt-24 flex justify-between md:mt-28 md:justify-end md:gap-12">
        <Button size="sm" text="취소" cancel />
        <Button size="sm" text="생성" />
      </div>
    </form>
  );
}
