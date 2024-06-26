'use client';

import { handleLogin } from '@/service/authService';
import { authValidationSchema } from '@/utils/validation/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  AuthInputs,
  BadRequest,
  ModalState,
  UserInfoResponse,
} from '../../../types';
import Button from '../commons/button';
import AuthButton from '../commons/button/AuthButton';
import Input from '../commons/input';
import Modal from '../commons/modal';

export default function LoginForm() {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    message: '',
  });
  const resolver = yupResolver(authValidationSchema);
  const router = useRouter();

  const handleClose = () => {
    setModalState({ ...modalState, isOpen: false });
  };

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
      setModalState({ isOpen: true, message: response.message });
    } else {
      router.push('/');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <label htmlFor="password" className="mb-8 mt-8">
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
      {modalState.isOpen && (
        <Modal isOpen={modalState.isOpen} onClose={handleClose}>
          <div className="m-auto px-54 pb-29 pt-26 text-right text-18 md:w-540 md:px-33">
            <p className="pb-47 pt-50 text-center">{modalState.message}</p>
            <span className="flex justify-center md:justify-end">
              <Button size="sm" text="확인" onClick={handleClose} />
            </span>
          </div>
        </Modal>
      )}
    </>
  );
}
