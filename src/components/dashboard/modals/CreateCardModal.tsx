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
import Image from 'next/image';
import { KeyboardEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CreateCardModal(props: Props) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { register, handleSubmit, watch, control, reset } = useForm();
  const deviceState = useDeviceState();
  const imageValue = watch('image');

  const handleImageDelete = () => {
    setPreviewImage('');
    reset({ image: null });
  };

  useEffect(() => {
    if (imageValue && imageValue.length > 0) {
      const newPreview = URL.createObjectURL(imageValue[0]);
      setPreviewImage(newPreview);

      return () => {
        setPreviewImage('');
        URL.revokeObjectURL(newPreview);
      };
    }

    return () => {};
  }, [imageValue]);

  return (
    <Modal {...props}>
      <form className="max-h-[734px] w-327 overflow-y-auto p-20 md:max-h-[845px] md:min-w-[506px] md:p-24">
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
        <div className="flex gap-10">
          <ImageInput
            id="image"
            size={deviceState === Device.MOBILE ? 'sm' : 'md'}
            register={{ ...register('image') }}
          />
          {previewImage && (
            <PreviewImage
              previewImage={previewImage}
              deviceState={deviceState}
              handleImageDelete={handleImageDelete}
            />
          )}
        </div>

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

type PreviewProps = {
  previewImage: string;
  deviceState: Device;
  handleImageDelete: () => void;
};

function PreviewImage({
  previewImage,
  deviceState,
  handleImageDelete,
}: PreviewProps) {
  const handleKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Backspace' || event.key === 'Delete') {
      // eslint-disable-next-line no-alert
      alert('이미지를 삭제하시겠습니까?');
      handleImageDelete();
    }
  };

  return (
    <div
      className={`relative aspect-square rounded-md focus:outline focus:outline-[1.5px] ${deviceState === Device.MOBILE ? 'size-58' : 'size-76'}`}
      onKeyUp={handleKeyboard}
      role="button"
      tabIndex={0}
    >
      <Image
        src={previewImage}
        fill
        className="absolute rounded-md object-cover"
        alt="preview"
      />
    </div>
  );
}
