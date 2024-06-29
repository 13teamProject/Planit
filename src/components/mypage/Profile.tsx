'use client';

import { editUserInfo, getUserInfo, uploadProfileImage } from '@/app/api/users';
import type { ModalState, UpdateUser, UserInfoResponse } from '@planit-api';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button from '../commons/button';
import Input from '../commons/input';
import ImageInput from '../commons/input/ImageInput';
import Modal from '../commons/modal';

export default function Profile() {
  const { register, handleSubmit, control } = useForm<UpdateUser>();
  const [userData, setUserData] = useState<UserInfoResponse>();
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    message: '',
  });

  // 모달 닫긴
  const handleClose = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  // 프로필 수정
  const onSubmit: SubmitHandler<UpdateUser> = async (data) => {
    const successEditUserInfo = await editUserInfo(data);

    // 유저 수정시 에러 처리
    if ('message' in successEditUserInfo) {
      setModalState({ isOpen: true, message: successEditUserInfo.message });
    } else {
      setModalState({ isOpen: true, message: '프로필을 수정했습니다.' });
    }
  };

  useEffect(() => {
    // 프로필 유저 조회
    const fetchUserInfo = async () => {
      const fetchedUserInfo = await getUserInfo();

      // 유저 조회시 에러 처리
      if ('message' in fetchedUserInfo) {
        setModalState({ isOpen: true, message: fetchedUserInfo.message });
      } else {
        setUserData(fetchedUserInfo);
      }
    };

    fetchUserInfo();
  }, []);
  return (
    <div className="w-full max-w-620 rounded-md bg-white px-28 pb-28 pt-32">
      <h3 className="mb-32 text-24 font-bold">프로필</h3>
      {userData && (
        <form className="flex gap-18" onSubmit={handleSubmit(onSubmit)}>
          <ImageInput
            control={control}
            name="profileImageUrl"
            type="default"
            fetchFn={uploadProfileImage}
            defaultValue={userData.profileImageUrl}
          />
          <div className="w-full">
            <p className="mb-10 text-18">이메일</p>
            <input
              type="text"
              className="mb-20 block h-42 w-full rounded-md border pl-16 pr-40 text-16 text-gray-300 outline-none"
              defaultValue={userData.email}
              readOnly
            />
            <label htmlFor="nickname" className="mb-10 inline-block text-18">
              닉네임
            </label>
            <Input
              id="nickname"
              type="text"
              placeholder="닉네임"
              size="sm"
              defaultValue={userData.nickname}
              register={{ ...register('nickname', { required: true }) }}
            />
            <Button
              type="submit"
              text="저장"
              styles="px-30 py-8 mt-24 float-right text-14"
            />
          </div>
        </form>
      )}
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
