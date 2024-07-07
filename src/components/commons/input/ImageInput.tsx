import { CardImageResponse, ErrorMessage } from '@planit-types';
import classNames from 'classnames';
import Image from 'next/image';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { toast } from 'react-toastify';

type ProfileImageResponse = {
  profileImageUrl: string;
};

type ImageFetchFunction = (
  image: File,
) => Promise<ProfileImageResponse | ErrorMessage>;

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
  defaultValue?: T[Path<T>];
};

type CardImageWrapperProps<T extends FieldValues> = {
  type: 'card';
  control: Control<T>;
  name: Path<T>;
  fetchFn: CardImageFetchFunction;
  columnId: number;
  defaultValue?: T[Path<T>];
};

export default function ImageInputWrapper<T extends FieldValues>(
  props: ImageInputWrapperProps<T> | CardImageWrapperProps<T>,
) {
  const { name, control, fetchFn, type, defaultValue } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => {
        if (type === 'default') {
          return (
            <ImageInput
              type={type}
              fetchFn={fetchFn}
              onChange={onChange}
              defaultValue={defaultValue}
            />
          );
        }
        const { columnId } = props;
        return (
          <ImageInput
            type={type}
            fetchFn={fetchFn}
            onChange={onChange}
            columnId={columnId}
            defaultValue={defaultValue}
          />
        );
      }}
    />
  );
}

type ImageInputProps = {
  type: 'default';
  onChange: (value: string | null) => void;
  fetchFn: ImageFetchFunction;
  defaultValue?: string;
};

type CardImageInputProps = {
  type: 'card';
  onChange: (value: string | null) => void;
  fetchFn: CardImageFetchFunction;
  columnId: number;
  defaultValue?: string;
};

function ImageInput(props: ImageInputProps | CardImageInputProps) {
  const { type, onChange, fetchFn, defaultValue } = props;
  const [previewImage, setPreviewImage] = useState<string | null>(
    defaultValue ?? null,
  );
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

      if ('message' in res) {
        toast.error(res.message);
        return;
      }
      onChange(res.profileImageUrl);
    } else if (type === 'card') {
      const { columnId } = props;
      res = await fetchFn({ columnId, image: file });

      if ('message' in res) {
        toast.error(res.message);
        return;
      }
      onChange(res.imageUrl);
    }

    const nextPreview = URL.createObjectURL(file);
    setPreviewImage(nextPreview);
  };

  const handleImageDelete = () => {
    onChange(null);
    setPreviewImage('');
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
      {previewImage && (
        <PreviewImage
          type={type}
          src={previewImage}
          handleImageDelete={handleImageDelete}
        />
      )}
    </div>
  );
}

type PreviewImageProps = {
  src: string;
  type: 'default' | 'card';
  handleImageDelete: () => void;
};

function PreviewImage({ src, type, handleImageDelete }: PreviewImageProps) {
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
      <Image
        src="/icon/close.svg"
        alt="x"
        width={16}
        height={16}
        onClick={handleImageDelete}
        className="absolute right-12 top-10 cursor-pointer rounded-full bg-white p-3"
      />
    </div>
  );
}
