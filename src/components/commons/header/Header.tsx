'use client';

import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  color: string;
};

export default function Header({ color }: Props) {
  const cn = classNames(
    'z-[999] fixed top-0 flex h-70 w-full items-center justify-between border-1 border-b-gray-200 px-20 lg:px-80 py-25 md:px-40 ',
    {
      'bg-black text-white': color === 'black',
      'bg-white': color === 'white',
    },
  );
  return (
    <nav className={cn}>
      <Link href="/" className="cursor-pointer sm:hidden md:block lg:block">
        <Image
          src="/image/logo_text_blue.png"
          width={80}
          height={25}
          alt="헤더 로고"
        />
      </Link>
      <Link href="/" className="cursor-pointer md:hidden">
        <Image
          src="/image/logo_icon_blue.png"
          width={25}
          height={25}
          alt="헤더 로고 모바일"
        />
      </Link>
      <ul className="flex">
        <li className="px-20 md:px-36 lg:px-36">
          <Link
            href="/login"
            className="cursor-pointer text-16 hover:text-toss-blue"
          >
            로그인
          </Link>
        </li>
        <li>
          <Link
            href="/signup"
            className="cursor-pointer text-16 hover:text-toss-blue"
          >
            회원가입
          </Link>
        </li>
      </ul>
    </nav>
  );
}
