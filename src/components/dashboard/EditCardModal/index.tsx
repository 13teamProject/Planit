'use client';

import { postCardImage } from '@/app/api/cards';
import Button from '@/components/commons/button';
import Input from '@/components/commons/input';
import DateInput from '@/components/commons/input/DateInput';
import DropdownInput from '@/components/commons/input/DropdownInput';
import ImageInput from '@/components/commons/input/ImageInput';
import TagInput from '@/components/commons/input/TagInput';
import Textarea from '@/components/commons/input/Textarea';
import Modal from '@/components/commons/modal';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  dashboardId: number;
  columnId: number;
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
}: Props) {
  const { register, handleSubmit, control, reset } = useForm<EditCardInputs>();

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
              <DropdownInput.Option id={1}>Option 1</DropdownInput.Option>
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
              <DropdownInput.Option id={1}>Option 1</DropdownInput.Option>
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
            // onClick={handleSubmit(onSubmit)}
            styles="py-12 px-54 text-16 md:py-14 md:text-18 md:px-46 md:py-14"
            text="생성"
          />
        </div>
      </form>
    </Modal>
  );
}
