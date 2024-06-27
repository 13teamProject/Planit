/* eslint-disable @typescript-eslint/no-explicit-any */
import { CardImageResponse, ErrorMessage } from '@planit-api';
import classNames from 'classnames';
import Image from 'next/image';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

// TODO: any 수정
type ImageFetchFunction = (image: File) => Promise<any>;

type CardImageFetchFunction = ({
  columnId,
  image,
}: {
  columnId: number;
  image: File;
}) => Promise<CardImageResponse | ErrorMessage>;

type ImageInputWrapperProps<T extends FieldValues> = {
  type: 'default';
  control: Control<T>;
  name: Path<T>;
  fetchFn: ImageFetchFunction;
};

type CardImageWrapperProps<T extends FieldValues> = {
  type: 'card';
  control: Control<T>;
  name: Path<T>;
  fetchFn: CardImageFetchFunction;
  columnId: number;
};

export default function ImageInputWrapper<T extends FieldValues>(
  props: ImageInputWrapperProps<T> | CardImageWrapperProps<T>,
) {
  const { name, control, fetchFn, type } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => {
        if (type === 'default') {
          return (
            <ImageInput type={type} fetchFn={fetchFn} onChange={onChange} />
          );
        }
        const { columnId } = props;
        return (
          <ImageInput
            type={type}
            fetchFn={fetchFn}
            onChange={onChange}
            columnId={columnId}
          />
        );
      }}
    />
  );
}

type ImageInputProps = {
  type: 'default';
  onChange: (value: string) => void;
  fetchFn: ImageFetchFunction;
};

type CardImageInputProps = {
  type: 'card';
  onChange: (value: string) => void;
  fetchFn: CardImageFetchFunction;
  columnId: number;
};

function ImageInput(props: ImageInputProps | CardImageInputProps) {
  const { type, onChange, fetchFn } = props;
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const classnames = classNames(
    'flex aspect-square items-center justify-center rounded-md bg-[#f5f5f5] outline-none',
    {
      'size-58 md:size-76': type === 'card',
      'size-182': type === 'default',
    },
  );

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files || files.length === 0) return;
    const file = files[0];

    let res;

    if (type === 'default') {
      res = await fetchFn(file);
    } else if (type === 'card') {
      const { columnId } = props;
      res = await fetchFn({ columnId, image: file });
    }

    if ('message' in res) return;

    const nextPreview = URL.createObjectURL(file);
    setPreviewImage(nextPreview);
    onChange(res.imageUrl);
  };

  useEffect(() => {
    const revokePreview = () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };

    return revokePreview;
  }, [previewImage]);

  return (
    <div className="relative">
      <button type="button" onClick={handleClick} className={classnames}>
        <input
          type="file"
          accept="image/png, image/jpeg"
          className="hidden"
          ref={inputRef}
          onChange={handleChange}
        />
        <Image src="/icon/plus.svg" alt="plus" width={30} height={30} />
      </button>
      {previewImage && <PreviewImage type={type} src={previewImage} />}
    </div>
  );
}

type PreviewImageProps = {
  src: string;
  type: 'default' | 'card';
};

function PreviewImage({ src, type }: PreviewImageProps) {
  const classnames = classNames('absolute aspect-square rounded-md', {
    'size-58 md:size-76 top-0 left-68 md:left-86': type === 'card',
    'size-182 top-0': type === 'default',
  });

  return (
    <div className={classnames}>
      <Image
        src={src}
        fill
        className="absolute rounded-md object-cover"
        alt="preview"
      />
    </div>
  );
}
