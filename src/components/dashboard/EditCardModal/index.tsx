'use client';

import { postCardImage } from '@/app/api/cards';
import { getColumns } from '@/app/api/columns';
import { getMembers } from '@/app/api/members';
import Button from '@/components/commons/button';
import Input from '@/components/commons/input';
import DateInput from '@/components/commons/input/DateInput';
import DropdownInput from '@/components/commons/input/DropdownInput';
import ImageInput from '@/components/commons/input/ImageInput';
import TagInput from '@/components/commons/input/TagInput';
import Textarea from '@/components/commons/input/Textarea';
import Modal from '@/components/commons/modal';
import { useAuthStore } from '@/store/authStore';
import { Column, Member, ToDoDetailCardResponse } from '@planit-api';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  dashboardId: number;
  columnId: number;
  currentCardData: ToDoDetailCardResponse;
};

export type EditCardInputs = {
  columnId: number;
  assignee: number;
  title: string;
  description: string;
  dueDate: Date;
  tags?: string[];
  image?: string;
};

export default function EditCardModal({
  isOpen,
  onClose,
  dashboardId,
  columnId,
  currentCardData,
}: Props) {
  const [statusList, setStatusList] = useState<Column[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const { register, handleSubmit, control, reset, watch } =
    useForm<EditCardInputs>();
  const userInfo = useAuthStore((state) => state.userInfo);

  useEffect(() => {
    if (!isOpen) return;

    (async () => {
      const [columnRes, memberRes] = await Promise.all([
        getColumns(dashboardId),
        getMembers({ dashboardId }),
      ]);

      if ('message' in columnRes) {
        alert(columnRes.message);
        return;
      }

      if ('message' in memberRes) {
        alert(memberRes.message);
        return;
      }

      setStatusList(columnRes.data);
      setMembers(memberRes.members);
    })();
  }, [isOpen]);

  useEffect(() => {
    console.log({ statusList, members });
  }, [statusList, members]);

  return (
    <Modal isOpen={isOpen} onClose={() => {}}>
      <form className="max-h-830 w-327 overflow-y-auto p-20 md:max-h-870 md:min-w-[506px] md:p-24">
        <div className="mb-18 flex items-center justify-between md:mb-22">
          <h1 className="text-20 font-bold">할 일 수정</h1>
          <Image
            src="/icon/close.svg"
            alt="close"
            width={32}
            height={32}
            className="cursor-pointer"
            onClick={onClose}
          />
        </div>

        <div className="flex flex-col justify-between md:flex-row">
          <div>
            <label
              htmlFor="columnId"
              className="mb-8 block text-14 text-black-800 md:mt-0 md:text-16"
            >
              상태
            </label>
            <DropdownInput
              name="columnId"
              control={control}
              placeholder="이름을 입력해 주세요"
            >
              {statusList.map((status) => (
                <DropdownInput.Option key={status.id} id={status.id}>
                  {status.title}
                </DropdownInput.Option>
              ))}
            </DropdownInput>
          </div>

          <div>
            <label
              htmlFor="assignee"
              className="mb-8 mt-18 block text-14 text-black-800 md:mt-0 md:text-16"
            >
              담당자
            </label>
            <DropdownInput
              name="assignee"
              control={control}
              placeholder="이름을 입력해 주세요"
            >
              {members.map((member) => (
                <DropdownInput.Option key={member.id} id={member.id}>
                  {member.nickname}
                </DropdownInput.Option>
              ))}
            </DropdownInput>
          </div>
        </div>

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
          defaultValue={currentCardData.title}
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
          defaultValue={currentCardData.description}
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
          defaultValue={new Date(currentCardData.dueDate)}
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
          defaultValue={currentCardData.tags}
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
          defaultValue={currentCardData.imageUrl}
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
            // onClick={handleSubmit(onSubmit)}
            styles="py-12 px-54 text-16 md:py-14 md:text-18 md:px-46 md:py-14"
            text="수정"
          />
        </div>
      </form>
    </Modal>
  );
}
