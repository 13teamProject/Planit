'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import ImageInput from '../commons/input/ImageInput';

type FormInput = {
  onChange: (file: File | null) => void;
  image: string | null;
};
export default function Preview({ onChange, image }: FormInput) {
  const [preview, setPreview] = useState('');
  const { register, watch } = useForm();
  const watchedImageUrl = watch('profileImageUrl');

  const handleChange = () => {
    if (!watchedImageUrl || watchedImageUrl.length === 0) return;

    const file = watchedImageUrl[0];
    onChange(file);

    const nextPreview = URL.createObjectURL(file);
    setPreview(nextPreview);
  };

  const handleClearClick = () => {
    onChange(null);
    setPreview('');
  };

  useEffect(() => {
    if (image !== null) {
      setPreview(image);
    }
  }, [image]);

  useEffect(() => {
    if (watchedImageUrl && watchedImageUrl.length > 0) {
      handleChange();
    }
  }, [watchedImageUrl]);

  useEffect(() => {
    const revokePreview = () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };

    return revokePreview;
  }, [preview]);
  return (
    <div className="relative">
      <ImageInput
        id="image"
        size="lg"
        register={{ ...register('profileImageUrl') }}
      />
      {preview && (
        <div className="absolute left-0 top-0 h-182 w-182 overflow-hidden rounded-md">
          <Image
            src={preview}
            layout="fill"
            objectFit="cover"
            alt="이미지 미리보기"
            className=""
          />
          <Image
            src="/icon/close.svg"
            alt="상품 이미지 미리보기 삭제"
            width={22}
            height={24}
            onClick={handleClearClick}
            className="absolute right-12 top-10 cursor-pointer rounded-full bg-white p-3"
          />
        </div>
      )}
    </div>
  );
}
