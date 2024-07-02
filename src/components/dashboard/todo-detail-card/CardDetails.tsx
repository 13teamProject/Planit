import ProfileCircle from '@/components/commons/circle/ProfileCircle';
import { TodoDetailsCardResponse } from '@planit-types';
import Image from 'next/image';

type Props = {
  data: TodoDetailsCardResponse;
  progressTitle: string;
};

export default function CardDetails({ data, progressTitle }: Props) {
  const { description, tags, dueDate, assignee, imageUrl } = data;
  return (
    <div className="flex flex-col gap-16 md:grid md:auto-cols-auto md:grid-cols-[repeat(1,minmax(0,1fr))_180px]">
      <div className="flex rounded-8 border border-gray-200 px-16 py-12 md:order-2 md:h-155 md:w-180 md:flex-col md:gap-20">
        <div className="w-1/2 md:w-full">
          <h2 className="pb-4 text-10 font-bold md:pb-6 md:text-12">담당자</h2>
          <div className="flex items-center gap-8">
            <ProfileCircle data={assignee} styles="size-26 md:size-34" />
            <span className="text-12 text-black-800 md:text-14">
              {assignee.nickname}
            </span>
          </div>
        </div>
        <div className="w-1/2 md:w-full">
          <h2 className="pb-4 text-10 font-bold text-black-800 md:pb-6 md:text-12">
            마감일
          </h2>
          <time className="text-12 md:text-14">{dueDate}</time>
        </div>
      </div>

      <div className="flex w-full flex-col gap-16 md:order-1 md:max-w-420 lg:max-w-450">
        <div className="flex gap-12">
          <div className="flex max-h-22 min-w-60 items-center justify-center rounded-11 bg-toss-blue-light/40 text-10 text-toss-blue first-line:bg-toss-blue-light/40">
            <span className="mr-6 inline-block h-6 w-6 rounded-full bg-toss-blue" />
            {progressTitle}
          </div>
          <span className="h-20 w-1 bg-gray-700" />
          <div className="flex flex-wrap gap-10 text-10">
            {tags.map((tag) => (
              <span className="rounded-4 bg-gray-200 px-6 pb-4 pt-6" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="custom-scrollbar max-h-205 overflow-scroll md:max-h-283">
          <section className="text-12 leading-22">{description}</section>
          <div className="relative h-167 md:h-245 lg:h-262">
            {imageUrl && (
              <Image
                src={imageUrl}
                fill
                objectFit="contain"
                alt="해야할 일 관련 이미지"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
