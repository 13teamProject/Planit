'use client';

import { handleLogin } from '@/service/auth-service';
import { authValidationSchema } from '@/utils/validation/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { AuthInputs, BadRequest, UserInfoResponse } from '../../../types';
import AuthButton from '../commons/button/AuthButton';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const resolver = yupResolver(authValidationSchema);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AuthInputs>({
    resolver,
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<AuthInputs> = async ({ email, password }) => {
    const response: UserInfoResponse | BadRequest = await handleLogin({
      email,
      password,
    });

    if ('message' in response) {
      alert(response.message);
    } else {
      router.push('/');
    }
  };

  return (
    <form className="m-auto w-351 md:w-520" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email" className="mb-16">
        이메일
        <input
          id="email"
          className={`mt-8 ${errors.email ? 'border-red-500' : ''}`}
          placeholder="이메일을 입력해주세요"
          autoComplete="true"
          {...register('email', { required: true })}
        />
        <span className="block pt-8 text-14 text-red-500">
          {errors.email?.message}
        </span>
      </label>

      <label htmlFor="password" className="mb-16">
        비밀번호
        <div className="relative">
          <Image
            className="absolute right-18 top-26"
            onClick={() => setShowPassword((prev) => !prev)}
            width={24}
            height={24}
            src={
              showPassword
                ? '/icon/visibility_on.svg'
                : '/icon/visibility_off.svg'
            }
            alt="비밀번호 상태변경 눈 아이콘"
          />
        </div>
        <input
          className={`mt-8 ${errors.password ? 'border-red-500' : ''}`}
          type={showPassword ? 'text' : 'password'}
          placeholder="비밀번호를 입력해주세요"
          autoComplete="false"
          {...register('password', { required: true })}
        />
        <span className="block pt-8 text-14 text-red-500">
          {errors.password?.message}
        </span>
      </label>

      <AuthButton text="로그인" disabled={!isValid} />
    </form>
  );
}
