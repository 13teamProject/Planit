'use client';

import Input from '@/components/commons/input';
import DateInput from '@/components/commons/input/DateInput';
import DropdownInput from '@/components/commons/input/DropdownInput';
import ImageInput from '@/components/commons/input/ImageInput';
import TagInput from '@/components/commons/input/TagInput';
import Textarea from '@/components/commons/input/Textarea';
import { useForm } from 'react-hook-form';

export default function ComponentTest() {
  const { register, handleSubmit, watch, control } = useForm();

  console.log(watch());

  return (
    <form className="w-500">
      <label htmlFor="name">닉네임</label>
      <Input
        id="name"
        type="text"
        placeholder="닉네임"
        register={{ ...register('name', { required: true }) }}
      />

      <label htmlFor="email">이메일</label>
      <Input
        id="email"
        type="email"
        placeholder="이메일"
        register={{ ...register('email', { required: true }) }}
      />

      <label htmlFor="password">비밀번호</label>
      <Input
        id="password"
        type="password"
        placeholder="비밀번호"
        register={{ ...register('password', { required: true }) }}
      />

      <label htmlFor="password-confirm">비밀번호 확인</label>
      <Input
        id="password-confirm"
        type="password"
        placeholder="비밀번호 확인"
        register={{ ...register('password-confirm', { required: true }) }}
      />

      <label htmlFor="textarea">내용</label>
      <Textarea
        id="textarea"
        placeholder="내용"
        register={{ ...register('textarea', { required: true }) }}
      />

      <label htmlFor="image">이미지</label>
      <ImageInput id="image" register={{ ...register('image') }} />

      <label htmlFor="dropdown">담당자</label>
      <DropdownInput
        name="dropdown"
        control={control}
        placeholder="Select an option"
      >
        <DropdownInput.Option id={1}>Option 1</DropdownInput.Option>
        <DropdownInput.Option id={2}>Option 2</DropdownInput.Option>
        <DropdownInput.Option id={3}>Option 3</DropdownInput.Option>
      </DropdownInput>

      <label htmlFor="date">담당자</label>
      <DateInput
        control={control}
        placeholder="날짜를 입력해 주세요"
        name="date"
      />

      <label htmlFor="tag">태그</label>
      <TagInput
        placeholder="입력 후 Enter"
        name="tag"
        id="tag"
        control={control}
      />
    </form>
  );
}
