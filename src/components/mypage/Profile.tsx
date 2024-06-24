'use client';

import { editUserInfo, getUserInfo } from '@/app/api/users';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import type { UpdateUserFile, UserInfoResponse } from '../../../types';
import Button from '../commons/button';
import Input from '../commons/input';
import ImageInput from '../commons/input/ImageInput';

export default function Profile() {
  const { register, handleSubmit } = useForm<UpdateUserFile>();
  const [userData, setUserData] = useState<UserInfoResponse>();

  const onSubmit: SubmitHandler<UpdateUserFile> = async (data) => {
    // const getImageUrl = await uploadProfileImage(data.profileImageUrl);
    // data.append('profileImageUrl', getImageUrl);
    const successEditUserInfo = await editUserInfo(data);
    if (successEditUserInfo.success) {
      alert(successEditUserInfo.message);
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const fetchedUserInfo = await getUserInfo();
      setUserData(fetchedUserInfo);
    };
    fetchUserInfo();
  }, []);
  return (
    <div>
      <h3>프로필</h3>
      {userData && (
        <form onSubmit={handleSubmit(onSubmit)} className="flex">
          <div>
            <ImageInput
              id="image"
              size="lg"
              register={{ ...register('profileImageUrl') }}
            />
          </div>
          <div>
            <p>닉네임</p>
            <p>{userData.email}</p>
            <label htmlFor="name">닉네임</label>
            <Input
              id="nickname"
              type="text"
              placeholder="닉네임"
              size="md"
              defaultValue={userData.nickname}
              register={{ ...register('nickname', { required: true }) }}
            />
          </div>
          <button type="submit">저장</button>
          <Button size="sm" text="저장" />
        </form>
      )}
    </div>
  );
}
