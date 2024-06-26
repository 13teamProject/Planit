'use client';

import { editUserInfo, getUserInfo, uploadProfileImage } from '@/app/api/users';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import type { UpdateUser, UserInfoResponse } from '../../../types';
import Button from '../commons/button';
import Input from '../commons/input';
import Preview from './Preview';

export default function Profile() {
  const { register, handleSubmit } = useForm<UpdateUser>();
  const [userData, setUserData] = useState<UserInfoResponse>();
  const [image, setImage] = useState<File | null>(null);

  const onSubmit: SubmitHandler<UpdateUser> = async (data) => {
    const info = data;
    if (image) {
      const imageData = await uploadProfileImage(image);
      info.profileImageUrl = imageData;
    }
    const successEditUserInfo = await editUserInfo(info);

    if (successEditUserInfo.success) {
      alert(successEditUserInfo.message);
    }
  };

  const handleImageChange = (file: File | null) => {
    setImage(file);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const fetchedUserInfo = await getUserInfo();
      setUserData(fetchedUserInfo);
    };
    fetchUserInfo();
  }, []);
  return (
    <div className="w-full max-w-[620px] rounded-md bg-white px-28 pb-28 pt-32">
      <h3 className="mb-32 text-24 font-bold">프로필</h3>
      {userData && (
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-18">
          <Preview
            image={userData.profileImageUrl}
            onChange={handleImageChange}
          />
          <div className="w-full">
            <p className="mb-10 text-18">이메일</p>
            <input
              type="text"
              className="mb-20 block h-42 w-full rounded-md border pl-16 pr-40 text-16 text-gray-300 outline-none"
              defaultValue={userData.email}
              readOnly
            />
            <label htmlFor="name" className="mb-10 inline-block text-18">
              닉네임
            </label>
            <Input
              id="nickname"
              type="text"
              placeholder="닉네임"
              size="md"
              defaultValue={userData.nickname}
              register={{ ...register('nickname', { required: true }) }}
            />
            <button type="submit">저장</button>
            <Button size="sm" text="저장" />
          </div>
        </form>
      )}
    </div>
  );
}
