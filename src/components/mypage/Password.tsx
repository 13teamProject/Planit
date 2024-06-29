'use client';

import { editUserPassword } from '@/app/api/users';
import { passwordValidationSchema } from '@/utils/validation/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { ModalState, UpdateUserPassword } from '@planit-api';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button from '../commons/button';
import Input from '../commons/input';
import Modal from '../commons/modal';

type PasswordChangeForm = {
  password: string;
  newPassword: string;
  passwordConfirmation: string;
};
export default function Password() {
  const resolver = yupResolver(passwordValidationSchema);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordChangeForm>({
    resolver,
    mode: 'onChange',
  });
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    message: '',
  });

  // 모달 닫긴
  const handleClose = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  // 유저 비밀번호 수정
  const onSubmit: SubmitHandler<PasswordChangeForm> = async (data) => {
    // password-confirm을 제외한 타입으로 변경
    const { password, newPassword } = data;
    const apiData: UpdateUserPassword = { password, newPassword };

    const successEditUserPassword = await editUserPassword(apiData);

    if ('message' in successEditUserPassword) {
      setModalState({ isOpen: true, message: successEditUserPassword.message });
    }
    reset();
  };
  return (
    <div className="mt-12 w-full max-w-620 rounded-md bg-white px-28 pb-28 pt-32">
      <h3 className="mb-32 text-24 font-bold">비밀번호 변경</h3>
      <form className="overflow-hidden" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="password" className="mb-10 text-18">
          현재 비밀번호
        </label>
        <Input
          id="password"
          type="password"
          placeholder="현재 비밀번호 입력"
          size="sm"
          register={{ ...register('password', { required: true }) }}
          error={'password' in errors}
        />
        <span className="block pt-8 text-14 text-red-500">
          {errors.password?.message}
        </span>

        <label htmlFor="newPassword" className="mb-10 mt-20 text-18">
          새 비밀번호
        </label>
        <Input
          id="newPassword"
          type="password"
          placeholder="새 비밀번호 입력"
          size="sm"
          register={{ ...register('newPassword', { required: true }) }}
        />
        <span className="block pt-8 text-14 text-red-500">
          {errors.newPassword?.message}
        </span>

        <label htmlFor="passwordConfirmation" className="mb-10 mt-20 text-18">
          새 비밀번호 확인
        </label>
        <Input
          id="passwordConfirmation"
          type="password"
          placeholder="새 비밀번호 입력"
          size="sm"
          register={{ ...register('passwordConfirmation', { required: true }) }}
          error={'passwordConfirmation' in errors}
        />
        <span className="block pt-8 text-14 text-red-500">
          {errors.passwordConfirmation?.message}
        </span>
        <Button
          type="submit"
          text="변경"
          styles="px-30 py-8 mt-24 float-right text-14"
        />
      </form>

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
    </div>
  );
}
