'use client';

import BarButton from '@/components/commons/button/BarButton';
import ColorCircle from '@/components/commons/circle/ColorCircle';
import Image from 'next/image';

import Card from './Card';

export default function Column() {
  return (
    <div className="w-full sm:border-b sm:p-12 md:border-b md:p-20 lg:h-screen lg:border-r">
      <div className="my-20 flex w-full items-center justify-between">
        <div className="flex items-center justify-center gap-4">
          <ColorCircle size="sm" color="bg-toss-blue" />
          <h1 className="text-16 font-bold md:text-18">To do</h1>
          <span className="inline-flex h-20 w-20 items-center justify-center rounded-4 bg-gray-200 text-12 text-gray-400">
            2
          </span>
        </div>
        <Image
          src="/icon/settings.svg"
          alt="setting"
          width={22}
          height={22}
          className="cursor-pointer transition duration-500 ease-in-out hover:rotate-45"
        />
      </div>
      <BarButton />
      <Card />
      <Card />
    </div>
  );
}
