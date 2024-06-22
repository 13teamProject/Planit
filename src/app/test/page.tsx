'use client';

import Input from '@/components/commons/input';
import { useForm } from 'react-hook-form';

export default function ComponentTest() {
  const { register, handleSubmit, watch } = useForm();

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

      <label htmlFor="email">비밀번호</label>
      <Input
        id="password"
        type="password"
        placeholder="비밀번호"
        register={{ ...register('password', { required: true }) }}
      />

      <label htmlFor="email">비밀번호 확인</label>
      <Input
        id="password-confirm"
        type="password"
        placeholder="비밀번호 확인"
        register={{ ...register('password-confirm', { required: true }) }}
      />
    </form>
  );
}
