'use client';

import Input from '@/components/commons/input';
import ImageInput from '@/components/commons/input/ImageInput';
import Textarea from '@/components/commons/input/Textarea';
import { useForm } from 'react-hook-form';

export default function ComponentTest() {
  const { register, handleSubmit, watch } = useForm();

  console.log(watch());

  return (
    <form>
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
        size="lg"
        placeholder="내용"
        register={{ ...register('textarea', { required: true }) }}
      />

      <label htmlFor="image">이미지</label>
      <ImageInput id="image" size="lg" register={{ ...register('image') }} />
    </form>
  );
}
