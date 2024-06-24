'use client';

import { handleSignUpAndLogin } from '@/service/auth-service';
import { authValidationSchema } from '@/utils/validation/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { AuthInputs } from '../../../types';
import AuthButton from '../commons/button/AuthButton';

export default function SignUpForm() {
  const resolver = yupResolver(authValidationSchema);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AuthInputs>({
    resolver,
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<AuthInputs> = async ({
    email,
    password,
    nickname,
  }) => {
    const response = await handleSignUpAndLogin({ email, password, nickname });
    if ('message' in response) {
      alert(response.message);
    } else {
      router.push('login');
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

      <label htmlFor="nickname" className="mb-16">
        닉네임
        <input
          className={`mt-8 ${errors.nickname ? 'border-red-500' : ''}`}
          placeholder="닉네임을 입력해주세요"
          {...register('nickname', { required: true })}
        />
        <span className="block pt-8 text-14 text-red-500">
          {errors.nickname?.message}
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

      <label htmlFor="passwordConfirmation" className="mb-16">
        비밀번호 확인
        <div className="relative">
          <Image
            className="absolute right-18 top-26"
            onClick={() => setShowPasswordConfirmation((prev) => !prev)}
            width={24}
            height={24}
            src={
              showPasswordConfirmation
                ? '/icon/visibility_on.svg'
                : '/icon/visibility_off.svg'
            }
            alt="비밀번호 상태변경 눈 아이콘"
          />
        </div>
        <input
          className={`mt-8 ${errors.passwordConfirmation ? 'border-red-500' : ''}`}
          type={showPasswordConfirmation ? 'text' : 'password'}
          autoComplete="false"
          placeholder="비밀번호를 다시 한 번 입력해주세요"
          {...register('passwordConfirmation', { required: true })}
        />
        <span className="block pt-8 text-14 text-red-500">
          {errors.passwordConfirmation?.message}
        </span>
      </label>

      <div className="flex items-center gap-8">
        <input
          className="h-20 w-20 border border-solid border-gray-200"
          id="terms"
          type="checkbox"
          {...register('terms', { required: true })}
        />
        <p className="pt-1">이용약관에 동의합니다.</p>
      </div>

      <AuthButton text="가입하기" disabled={!isValid} />
    </form>
  );
}
