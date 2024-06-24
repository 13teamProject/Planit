'use client';

import { handleSignUpAndLogin } from '@/service/auth-service';
import { authValidationSchema } from '@/utils/validation/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import { AuthInputs } from '../../../types';
import AuthButton from '../commons/button/AuthButton';
import Input from '../commons/input';

export default function SignUpForm() {
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
      <label htmlFor="email" className="mb-8">
        이메일
      </label>
      <Input
        id="email"
        type="text"
        placeholder="이메일을 입력해 주세요"
        size="lg"
        register={{ ...register('email', { required: true }) }}
        error={'email' in errors}
      />
      <span className="block pt-8 text-14 text-red-500">
        {errors.email?.message}
      </span>

      <label htmlFor="nickname" className="mb-8 mt-8">
        닉네임
      </label>
      <Input
        id="nickname"
        type="text"
        placeholder="닉네임을 입력해 주세요"
        size="lg"
        register={{ ...register('nickname', { required: true }) }}
        error={'nickname' in errors}
      />
      <span className="block pt-8 text-14 text-red-500">
        {errors.nickname?.message}
      </span>

      <label htmlFor="nickname" className="mb-8 mt-8">
        비밀번호
      </label>
      <Input
        id="password"
        type="password"
        placeholder="8자 이상 입력해 주세요"
        size="lg"
        register={{ ...register('password', { required: true }) }}
        error={'password' in errors}
      />
      <span className="block pt-8 text-14 text-red-500">
        {errors.password?.message}
      </span>

      <label htmlFor="passwordConfirmation" className="mb-8 mt-8">
        비밀번호 확인
      </label>
      <Input
        id="passwordConfirmation"
        type="password"
        placeholder="비밀번호를 한번 더 입력해 주세요"
        size="lg"
        register={{ ...register('passwordConfirmation', { required: true }) }}
        error={'passwordConfirmation' in errors}
      />
      <span className="block pt-8 text-14 text-red-500">
        {errors.passwordConfirmation?.message}
      </span>

      <div className="mt-8 flex items-center gap-8">
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
