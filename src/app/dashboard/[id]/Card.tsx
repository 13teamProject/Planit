'use client';

import ProfileCircle from '@/components/commons/circle/ProfileCircle';
import Tag from '@/components/commons/tag';
import Image from 'next/image';

export default function Card() {
  return (
    <div className="mt-20 cursor-pointer rounded-8 border border-gray-200 bg-white p-10 hover:border-gray-400 sm:block md:flex md:gap-20 md:p-20 lg:block">
      <div className="h-100 w-full bg-green-light-chip md:w-100">Image</div>
      <div className="flex flex-grow flex-col justify-between">
        <h1 className="py-4 sm:text-14 md:text-16">새로운 일정 관리 Taskify</h1>
        <div className="md:flex md:w-full md:gap-16 lg:block">
          <div>
            <Tag color="green" size="sm">
              일반
            </Tag>
          </div>
          <div className="flex flex-grow items-baseline justify-between pt-8">
            <div className="flex items-baseline gap-4">
              <div className="relative h-14 w-14">
                <Image
                  src="/icon/calendar_gray.svg"
                  alt="setting"
                  fill
                  className="absolute"
                />
              </div>
              <p className="flex-grow text-gray-300 sm:text-10 md:text-12">
                2022.12.31
              </p>
            </div>

            <ProfileCircle size="sm" color="bg-green-200">
              B
            </ProfileCircle>
          </div>
        </div>
      </div>
    </div>
  );
}
