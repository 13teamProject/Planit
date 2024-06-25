'use client';

import classNames from 'classnames';
import Link from 'next/link';

type Props = {
  color: string;
};

export default function Header({ color }: Props) {
  const cn = classNames(
    'z-999 fixed top-0 flex h-70 w-full items-center justify-between border-1 border-b-gray-200 px-20 lg:px-80 py-25 md:px-40 ',
    {
      'bg-black text-white': color === 'black',
      'bg-white': color === 'white',
    },
  );
  return (
    <nav className={cn}>
      <Link
        href="/"
        className="cursor-pointer text-25 font-bold text-toss-blue"
      >
        Planit:
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
