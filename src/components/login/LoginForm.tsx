'use client';

import { handleLogin } from '@/service/auth-service';
import { authValidationSchema } from '@/utils/validation/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import { AuthInputs, BadRequest, UserInfoResponse } from '../../../types';
import AuthButton from '../commons/button/AuthButton';
import Input from '../commons/input';

export default function LoginForm() {
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
        비밀번호
      </label>
      <Input
        id="password"
        type="password"
        placeholder="비밀번호를 입력해 주세요"
        size="lg"
        register={{ ...register('password', { required: true }) }}
        error={'password' in errors}
      />
      <span className="block pt-8 text-14 text-red-500">
        {errors.password?.message}
      </span>

      <AuthButton text="로그인" disabled={!isValid} />
    </form>
  );
}
