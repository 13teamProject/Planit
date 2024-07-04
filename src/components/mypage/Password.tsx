'use client';

import { editUserPassword } from '@/app/api/users';
import { passwordValidationSchema } from '@/utils/validation/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { UpdateUserPassword } from '@planit-types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '../commons/button';
import Input from '../commons/input';

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
    formState: { errors, isValid },
    reset,
  } = useForm<PasswordChangeForm>({
    resolver,
    mode: 'onChange',
  });

  // 유저 비밀번호 수정
  const onSubmit: SubmitHandler<PasswordChangeForm> = async (data) => {
    // password-confirm을 제외한 타입으로 변경
    const { password, newPassword } = data;
    const apiData: UpdateUserPassword = { password, newPassword };

    const successEditUserPassword = await editUserPassword(apiData);

    if ('message' in successEditUserPassword) {
      toast.error(successEditUserPassword.message);
    }
    if ('success' in successEditUserPassword) {
      toast.success('비밀번호를 성공적으로 변경했습니다');
      reset();
    }
  };
  return (
    <div className="mt-12 w-full max-w-620 rounded-md bg-white p-20 md:px-28 md:pb-28 md:pt-32">
      <h3 className="mb-24 text-20 font-bold md:mb-32 md:text-24">
        비밀번호 변경
      </h3>
      <form className="overflow-hidden" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="password" className="mb-10 text-16 md:text-18">
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
        <span className="block pt-5 text-12 text-red-500 md:pt-8 md:text-14">
          {errors.password?.message}
        </span>

        <label
          htmlFor="newPassword"
          className="mb-10 mt-16 text-16 md:mt-20 md:text-18"
        >
          새 비밀번호
        </label>
        <Input
          id="newPassword"
          type="password"
          placeholder="새 비밀번호 입력"
          size="sm"
          register={{ ...register('newPassword', { required: true }) }}
        />
        <span className="block pt-5 text-12 text-red-500 md:pt-8 md:text-14">
          {errors.newPassword?.message}
        </span>

        <label
          htmlFor="passwordConfirmation"
          className="mb-10 mt-16 text-16 md:mt-20 md:text-18"
        >
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
        <span className="block pt-5 text-12 text-red-500 md:pt-8 md:text-14">
          {errors.passwordConfirmation?.message}
        </span>
        <Button
          type="submit"
          disabled={!isValid}
          text="변경"
          styles="px-30 py-8 mt-24 float-right text-12 md:text-14"
        />
      </form>
    </div>
  );
}
