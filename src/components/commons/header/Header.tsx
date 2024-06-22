'use client';

import classNames from 'classnames';
import Link from 'next/link';
import { ReactNode } from 'react';

type Props = {
  color: string;
  children: ReactNode;
};

export default function Header({ color, children }: Props) {
  const classnames = classNames('global-header');
  return (
    <nav className="z-999 fixed top-0 flex h-70 w-full items-center justify-between border-1 border-b-gray-200 bg-white px-80 py-25">
      <Link
        href="/"
        className="cursor-pointer text-25 font-bold text-toss-blue"
      >
        Planit:
      </Link>
      <ul className="flex">
        <li className="px-36">
          <Link
            href="/login"
            className="cursor-pointer text-16 hover:text-gray-400"
          >
            로그인
          </Link>
        </li>
        <li>
          <Link
            href="/signup"
            className="cursor-pointer text-16 hover:text-gray-400"
          >
            회원가입
          </Link>
        </li>
      </ul>
    </nav>
  );
}
