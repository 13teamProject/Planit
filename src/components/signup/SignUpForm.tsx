'use client';

import { handleSignUpAndLogin } from '@/service/authService';
import { authValidationSchema } from '@/utils/validation/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { AuthInputs, ModalState } from '../../../types';
import Button from '../commons/button';
import AuthButton from '../commons/button/AuthButton';
import Input from '../commons/input';
import Modal from '../commons/modal';
import Terms from './Terms';

export default function SignUpForm() {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    message: '',
  });
  const [termsModalState, setTermsModalState] = useState(false);
  const resolver = yupResolver(authValidationSchema);
  const router = useRouter();

  const handleClose = () => {
    setModalState({ ...modalState, isOpen: false });
    if (modalState.message === '회원가입을 축하합니다🎉') {
      router.push('/');
    }
  };

  const handleTermsOpenClose = () => {
    setTermsModalState((prev) => !prev);
  };

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
      setModalState({ isOpen: true, message: response.message });
    } else {
      setModalState({ isOpen: true, message: '회원가입을 축하합니다🎉' });
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

        <label htmlFor="password" className="mb-8 mt-8">
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
          <span className="pt-2">이용약관에 동의합니다.</span>
          <button
            className="pt-2 text-blue-chip underline"
            type="button"
            onClick={handleTermsOpenClose}
          >
            (자세히 보기)
          </button>
        </div>

        <AuthButton text="가입하기" disabled={!isValid} />
      </form>
      {modalState.isOpen && (
        <Modal isOpen={modalState.isOpen} onClose={handleClose}>
          <div className="m-auto px-54 pb-29 pt-26 text-right text-18 md:w-540 md:px-33">
            <p className="pb-47 pt-50 text-center">{modalState.message}</p>
            <span className="flex justify-center md:justify-end">
              <Button
                styles="w-138 h-42 md:w-120 md:h-48"
                text="확인"
                onClick={handleClose}
              />
            </span>
          </div>
        </Modal>
      )}
      {termsModalState && (
        <Modal isOpen={termsModalState} onClose={handleTermsOpenClose}>
          <div className="h-400 w-340 px-28 py-28 text-center text-18 md:h-600 md:w-600">
            <div className="pb-10 md:pb-30">
              <h2 className="mb-10 text-20 font-bold md:text-25">
                플랜잇 서비스 이용약관
              </h2>
              <Terms />
            </div>
            <Button
              styles="w-138 h-42 md:w-120 md:h-48"
              text="확인"
              onClick={handleTermsOpenClose}
            />
          </div>
        </Modal>
      )}
    </>
  );
}
