'use client';

import { getTagColor } from '@/utils/color';
import Image from 'next/image';

import ColorCircle from '../circle/ColorCircle';

type RoundTagProps = {
  type: 'round';
  text: string;
};

type DefalutTagProps = {
  type?: 'default';
  text: string;
  deleteTag?: () => void;
};

export default function Tag(props: RoundTagProps | DefalutTagProps) {
  const { type = 'default', text } = props;

  if (type === 'round') return <RoundTag text={text} />;

  const { deleteTag } = props as DefalutTagProps;
  return <DefaultTag text={text} deleteTag={deleteTag} />;
}

function RoundTag({ text }: { text: string }) {
  return (
    <span className="inline-flex max-w-full items-center rounded-full bg-toss-blue-light px-8 py-4 text-10 text-toss-blue md:text-12">
      <div className="md:gap-4-4 flex items-center gap-3">
        <ColorCircle size="xs" color="bg-toss-blue" />
        {text}
      </div>
    </span>
  );
}

function DefaultTag({ text, deleteTag }: Omit<DefalutTagProps, 'type'>) {
  const tagColor = getTagColor(text);

  if (deleteTag) {
    return (
      <button
        type="button"
        onClick={deleteTag}
        tabIndex={0}
        className={`group/tag relative inline-flex max-w-full items-center rounded px-8 py-4 text-12 md:text-12 ${tagColor}`}
      >
        {text}
        <div className="invisible absolute inset-0 flex items-center justify-center rounded bg-[#f5f5f5] bg-opacity-80 outline-none group-hover/tag:visible">
          <Image
            src="/icon/close_red.svg"
            alt="x"
            width={12}
            height={12}
            className="rounded-full bg-white"
          />
        </div>
      </button>
    );
  }

  return (
    <span
      className={`inline-flex max-w-full items-center rounded px-8 py-4 text-12 md:text-12 ${tagColor}`}
    >
      {text}
    </span>
  );
}
