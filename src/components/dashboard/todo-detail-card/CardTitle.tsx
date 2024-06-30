'use client';

import Image from 'next/image';
import { useState } from 'react';

import DropDownSelectBox from './DropDownSelectBox';

export default function CardTitle({ title }: { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="grid md:flex md:justify-between selection:md:flex-col">
      <h1 className="order-2 pt-3 text-20 font-bold md:order-1 md:text-24">
        {title}
      </h1>
      <div className="order-1 flex justify-end gap-24 md:order-2">
        <Image
          className="cursor-pointer"
          src="/icon/kebab.svg"
          width={28}
          height={28}
          alt="드롭다운 케밥"
          onClick={() => setIsOpen((prev) => !prev)}
        />
        {isOpen && (
          <span className="absolute top-70">
            <DropDownSelectBox />
          </span>
        )}
        <Image
          className="cursor-pointer"
          src="/icon/close.svg"
          width={32}
          height={32}
          alt="창끄기 엑스"
        />
      </div>
    </div>
  );
}
