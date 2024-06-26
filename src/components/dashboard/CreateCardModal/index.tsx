'use client';

import postCardImage from '@/app/api/cards/postCardImage';
import postCreateCard from '@/app/api/cards/postCreateCard';
import Button from '@/components/commons/button';
import Input from '@/components/commons/input';
import DateInput from '@/components/commons/input/DateInput';
import DropdownInput from '@/components/commons/input/DropdownInput';
import ImageInput from '@/components/commons/input/ImageInput';
import TagInput from '@/components/commons/input/TagInput';
import Textarea from '@/components/commons/input/Textarea';
import Modal from '@/components/commons/modal';
import { useAuthStore } from '@/store/authStore';
import { formatDate } from '@/utils/date';
import { CreateCardRequest } from '@planit-api';
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';

/* eslint-disable react/style-prop-object */

type Props = {
  isOpen: boolean;
  onClose: () => void;
  dashboardId: number;
  columnId: number;
};

export type CreateCardInputs = {
  assignee: number;
  title: string;
  description: string;
  dueDate: Date;
  tags?: string[];
  image?: string;
};

export default function CreateCardModal({
  isOpen,
  onClose,
  dashboardId,
  columnId,
}: Props) {
  const { register, handleSubmit, control, reset } =
    useForm<CreateCardInputs>();
  const userInfo = useAuthStore((state) => state.userInfo);

  const onSubmit: SubmitHandler<CreateCardInputs> = async ({
    title,
    description,
    tags,
    dueDate,
    image,
  }) => {
    const reqBody: CreateCardRequest = {
      assigneeUserId: userInfo!.id,
      dashboardId,
      columnId,
      title,
      description,
      tags,
      dueDate: formatDate(dueDate),
      imageUrl: image,
    };

    const res = await postCreateCard(reqBody);

    if ('message' in res) alert(res.message);
    console.log(res);
    onClose();
    reset();
  };

  return (
    <Modal isOpen={isOpen} onClose={() => {}}>
      <form className="max-h-[734px] w-327 overflow-y-auto p-20 md:max-h-[845px] md:min-w-[506px] md:p-24">
        <div className="mb-18 flex items-center justify-between md:mb-22">
          <h1 className="text-20 font-bold">할 일 생성</h1>
          <Image
            src="/icon/close.svg"
            alt="close"
            width={32}
            height={32}
            className="cursor-pointer"
            onClick={onClose}
          />
        </div>

        <label
          htmlFor="dropdown"
          className="mb-8 block text-14 text-black-800 md:text-16"
        >
          담당자
        </label>
        <DropdownInput
          name="assignee"
          control={control}
          placeholder="이름을 입력해 주세요"
        >
          <DropdownInput.Option id={1}>Option 1</DropdownInput.Option>
        </DropdownInput>

        <label
          htmlFor="title"
          className="mb-8 mt-18 block text-14 text-black-800 md:mt-20 md:text-16"
        >
          제목 <span className="text-violet-dashboard">*</span>
        </label>
        <Input
          id="title"
          type="text"
          placeholder="제목을 입력해 주세요"
          register={{ ...register('title', { required: true }) }}
        />

        <label
          htmlFor="description"
          className="mb-8 mt-18 block text-14 text-black-800 md:mt-20 md:text-16"
        >
          설명 <span className="text-violet-dashboard">*</span>
        </label>
        <Textarea
          id="description"
          placeholder="설명을 입력해 주세요"
          register={{ ...register('description', { required: true }) }}
        />

        <label
          htmlFor="date"
          className="mb-8 mt-18 block text-14 text-black-800 md:mt-20 md:text-16"
        >
          마감일
        </label>
        <DateInput
          control={control}
          placeholder="날짜를 입력해 주세요"
          name="dueDate"
        />

        <label
          htmlFor="tag"
          className="mb-8 mt-18 block text-14 text-black-800 md:mt-20 md:text-16"
        >
          태그
        </label>
        <TagInput
          id="tag"
          placeholder="입력 후 Enter"
          name="tags"
          control={control}
        />

        <label
          htmlFor="image"
          className="mb-8 mt-18 block text-14 text-black-800 md:mt-20 md:text-16"
        >
          이미지
        </label>
        <ImageInput
          control={control}
          name="image"
          type="card"
          columnId={columnId}
          fetchFn={postCardImage}
        />

        <div className="mt-18 flex gap-12 md:mt-28 md:justify-end">
          <Button
            onClick={() => {
              onClose();
            }}
            style="py-12 px-54 text-16 md:py-14 md:text-18 md:px-46 md:py-14"
            text="취소"
            cancel
          />
          <Button
            onClick={handleSubmit(onSubmit)}
            style="py-12 px-54 text-16 md:py-14 md:text-18 md:px-46 md:py-14"
            text="생성"
          />
        </div>
      </form>
    </Modal>
  );
}
