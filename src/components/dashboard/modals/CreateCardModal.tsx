'use client';

import Button from '@/components/commons/button';
import Input from '@/components/commons/input';
import DateInput from '@/components/commons/input/DateInput';
import DropdownInput from '@/components/commons/input/DropdownInput';
import ImageInput from '@/components/commons/input/ImageInput';
import TagInput from '@/components/commons/input/TagInput';
import Textarea from '@/components/commons/input/Textarea';
import Modal from '@/components/commons/modal';
import { Device } from '@/constants/device';
import useDeviceState from '@/hooks/useDeviceState';
import { useForm } from 'react-hook-form';

type Props = {
  isOpen: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClose: () => void;
};

export default function CreateCardModal(props: Props) {
  const { register, handleSubmit, watch, control } = useForm();
  const deviceState = useDeviceState();

  return (
    <Modal {...props}>
      <form className="min-w-327 p-20 md:min-w-[506px] md:p-24">
        <h1 className="mb-18 text-20 font-bold md:mb-22">할 일 생성</h1>

        <label
          htmlFor="dropdown"
          className="mb-8 block text-14 text-black-800 md:text-16"
        >
          담당자
        </label>
        <DropdownInput
          name="dropdown"
          control={control}
          size={deviceState === Device.MOBILE ? 'lg' : 'md'}
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
          size={deviceState === Device.MOBILE ? 'sm' : 'md'}
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
          size={deviceState === Device.MOBILE ? 'sm' : 'lg'}
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
          size={deviceState === Device.MOBILE ? 'md' : 'lg'}
          control={control}
          placeholder="날짜를 입력해 주세요"
          name="date"
        />

        <label
          htmlFor="tag"
          className="mb-8 mt-18 block text-14 text-black-800 md:mt-20 md:text-16"
        >
          태그
        </label>
        <TagInput
          id="tag"
          size={deviceState === Device.MOBILE ? 'md' : 'lg'}
          placeholder="입력 후 Enter"
          name="tag"
          control={control}
        />

        <label
          htmlFor="image"
          className="mb-8 mt-18 block text-14 text-black-800 md:mt-20 md:text-16"
        >
          이미지
        </label>
        <ImageInput
          id="image"
          size={deviceState === Device.MOBILE ? 'sm' : 'md'}
          register={{ ...register('image') }}
        />

        <div className="mt-18 flex justify-between md:mt-28 md:justify-end md:gap-12">
          <Button
            size={deviceState === Device.MOBILE ? 'sm' : 'lg'}
            text="취소"
            cancel
          />
          <Button
            size={deviceState === Device.MOBILE ? 'sm' : 'lg'}
            text="생성"
          />
        </div>
      </form>
    </Modal>
  );
}
