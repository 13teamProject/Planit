'use client';

import { postCardImage, postCreateCard } from '@/app/api/cards';
import { getMembers } from '@/app/api/members';
import Button from '@/components/commons/button';
import ProfileCircle from '@/components/commons/circle/ProfileCircle';
import Input from '@/components/commons/input';
import DateInput from '@/components/commons/input/DateInput';
import DropdownInput from '@/components/commons/input/DropdownInput';
import ImageInput from '@/components/commons/input/ImageInput';
import TagInput from '@/components/commons/input/TagInput';
import Textarea from '@/components/commons/input/Textarea';
import Modal from '@/components/commons/modal';
import { formatDate } from '@/utils/date';
import { CreateCardRequest, Member } from '@planit-api';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

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
  dueDate?: Date;
  tags?: string[];
  image?: string | null;
};

export default function CreateCardModal({
  isOpen,
  onClose,
  dashboardId,
  columnId,
}: Props) {
  const [members, setMembers] = useState<Member[]>([]);
  const { register, handleSubmit, control, reset, watch } =
    useForm<CreateCardInputs>();

  const onSubmit: SubmitHandler<CreateCardInputs> = async ({
    assignee,
    title,
    description,
    tags,
    dueDate,
    image,
  }) => {
    const reqBody: CreateCardRequest = {
      assigneeUserId: assignee,
      dashboardId,
      columnId,
      title,
      description,
      tags,
      dueDate: dueDate && formatDate(dueDate),
      imageUrl: image,
    };

    const res = await postCreateCard(reqBody);

    if ('message' in res) alert(res.message);
    console.log(res);
    onClose();
    reset();
  };

  useEffect(() => {
    if (!isOpen) return;

    (async () => {
      const memberRes = await getMembers({ dashboardId });

      if ('message' in memberRes) {
        alert(memberRes.message);
        return;
      }

      setMembers(memberRes.members);
    })();
  }, [isOpen]);

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
          htmlFor="assignee"
          className="mb-8 block text-14 text-black-800 md:text-16"
        >
          담당자
        </label>
        <DropdownInput
          name="assignee"
          control={control}
          defaultValue={
            <span className="text-gray-300">이름을 입력해 주세요</span>
          }
        >
          {members.map((member) => (
            <DropdownInput.Option key={member.userId} id={member.userId}>
              <div className="flex items-center gap-6">
                <ProfileCircle
                  data={member}
                  styles="size-26 text-14 bg-toss-blue-light"
                />
                {member.nickname}
              </div>
            </DropdownInput.Option>
          ))}
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
          htmlFor="dueDate"
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
          htmlFor="tags"
          className="mb-8 mt-18 block text-14 text-black-800 md:mt-20 md:text-16"
        >
          태그
        </label>
        <TagInput
          id="tags"
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
            styles="py-12 px-54 text-16 md:py-14 md:text-18 md:px-46 md:py-14"
            text="취소"
            cancel
          />
          <Button
            onClick={handleSubmit(onSubmit)}
            styles="py-12 px-54 text-16 md:py-14 md:text-18 md:px-46 md:py-14"
            text="생성"
          />
        </div>
      </form>
    </Modal>
  );
}
