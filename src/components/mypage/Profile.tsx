'use client';

import { editUserInfo, uploadProfileImage } from '@/app/api/users';
import { useAuthStore } from '@/store/authStore';
import type { ModalState, UpdateUser } from '@planit-types';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button from '../commons/button';
import Input from '../commons/input';
import ImageInput from '../commons/input/ImageInput';
import Modal from '../commons/modal';

export default function Profile() {
  const { register, handleSubmit, control } = useForm<UpdateUser>();
  const { userInfo, changeUserInfo } = useAuthStore();

  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    message: '',
  });

  const handleClose = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  const onSubmit: SubmitHandler<UpdateUser> = async (data) => {
    const result = await editUserInfo(data);

    if ('message' in result) {
      setModalState({ isOpen: true, message: result.message });
    } else {
      setModalState({ isOpen: true, message: '프로필을 수정했습니다.' });
      changeUserInfo(result);
    }
  };

  if (!userInfo) {
    return <div>로딩 중...</div>; // 또는 적절한 로딩 상태 표시
  }

  return (
    <div className="w-full max-w-620 rounded-md bg-white p-20 md:px-28 md:pb-28 md:pt-32">
      <h3 className="mb-24 text-20 font-bold md:mb-32 md:text-24">프로필</h3>
      <form
        className="gap-18 overflow-hidden md:flex"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ImageInput
          control={control}
          name="profileImageUrl"
          type="default"
          fetchFn={uploadProfileImage}
          defaultValue={userInfo.profileImageUrl}
        />
        <div className="mt-24 w-full md:mt-0">
          <p className="mb-10 text-18">이메일</p>
          <input
            type="text"
            className="mb-16 block h-42 w-full rounded-md border pl-16 pr-40 text-16 text-gray-300 outline-none md:mb-20"
            defaultValue={userInfo.email}
            readOnly
          />
          <label
            htmlFor="nickname"
            className="mb-10 inline-block text-16 md:text-18"
          >
            닉네임
          </label>
          <Input
            id="nickname"
            type="text"
            placeholder="닉네임"
            size="sm"
            defaultValue={userInfo.nickname}
            register={{ ...register('nickname', { required: true }) }}
          />
          <Button
            type="submit"
            text="저장"
            styles="px-30 py-8 mt-24 float-right text-12 md:text-14"
          />
        </div>
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
