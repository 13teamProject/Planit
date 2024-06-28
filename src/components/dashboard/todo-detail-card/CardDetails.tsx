import ProfileCircle from '@/components/commons/circle/ProfileCircle';
import { TodoDetailsCardResponse } from '@planit-types';
import Image from 'next/image';

type Props = {
  data: TodoDetailsCardResponse;
};

export default function CardDetails({ data }: Props) {
  const { description, tags, dueDate, assignee, imageUrl } = data;
  return (
    <div className="flex flex-col gap-16 md:grid md:auto-cols-auto md:grid-cols-[repeat(1,minmax(0,1fr))_180px]">
      <div className="flex rounded-8 border border-gray-200 px-16 py-12 md:order-2 md:h-155 md:w-180 md:flex-col md:gap-20">
        <div className="w-1/2 md:w-full">
          <h2 className="pb-4 text-10 font-bold md:pb-6 md:text-12">담당자</h2>
          <div className="flex items-center gap-8">
            <div className="relative h-26 w-26 md:h-34 md:w-34">
              <ProfileCircle color="bg-red-500" size="sm">
                {assignee.nickname[0]}
              </ProfileCircle>
            </div>
            <span className="text-12 md:text-14">{assignee.nickname}</span>
          </div>
        </div>
        <div className="w-1/2 md:w-full">
          <h2 className="pb-4 text-10 font-bold md:pb-6 md:text-12">마감일</h2>
          <time className="text-12 md:text-14">{dueDate}</time>
        </div>
      </div>

      <div className="flex w-full flex-col gap-16 md:order-1 md:max-w-420 lg:max-w-450">
        <div className="flex gap-12">
          <div className="rounded-11 bg-toss-blue-light/40 px-8 pb-4 pt-6 text-10 text-toss-blue first-line:bg-toss-blue-light/40">
            To Do
          </div>
          <span className="h-20 w-1 bg-gray-700" />
          <div className="flex gap-10 text-10">
            {tags.map((tag) => (
              <div className="rounded-4 bg-gray-200 px-6 pb-4 pt-6" key={tag}>
                {tag}
              </div>
            ))}
          </div>
        </div>
        <div className="text-12 leading-22">{description}</div>{' '}
        <div className="relative h-167 md:h-245 lg:h-262">
          <Image
            src={imageUrl}
            fill
            objectFit="contain"
            alt="해야할 일 관련 이미지"
          />
        </div>
      </div>
    </div>
  );
}
