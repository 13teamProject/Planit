import Image from 'next/image';
import Link from 'next/link';

import ColorCircle from '../commons/circle/ColorCircle';

type Dashboard = {
  id: number;
  title: string;
};

type SidemenuProps = {
  dashboards: Dashboard[];
};

export default function Sidemenu({ dashboards }: SidemenuProps) {
  return (
    <>
      <nav className="z-999 left-0 top-0 h-screen w-67 border-1 border-r-gray-200 bg-white pl-20 pt-20 md:w-160 md:pl-18 lg:w-300 lg:pl-24">
        <Link href="/" className="cursor-pointer md:hidden lg:hidden">
          <Image
            src="/image/logo_icon_blue.png"
            width={25}
            height={25}
            alt="사이드메뉴 로고"
          />
        </Link>
        <Link href="/" className="cursor-pointer sm:hidden">
          <Image
            src="/image/logo_text_blue.png"
            className="mt-3"
            width={85}
            height={30}
            alt="사이드메뉴 로고"
          />
        </Link>
        <div className="mt-50 flex items-center justify-between lg:pr-24">
          <p className="text-12 font-bold text-gray-400 sm:hidden">
            Dash Boards
          </p>
          <button className="md:pr-10">
            <Image
              src="/icon/add_box.svg"
              width={20}
              height={20}
              alt="대쉬보드 추가 버튼"
            />
          </button>
        </div>
        <ul className="mt-20 pr-10 lg:pr-12">
          {dashboards.map((dashboard) => (
            <li
              key={dashboard.id}
              className="flex h-45 items-center rounded-4 pl-8 hover:bg-violet-light-dashboard md:pl-10 lg:pl-12"
            >
              <ColorCircle color={`bg-green-dashboard`} size="sm" />
              <Link
                href={`/dashboard/${dashboard.id}`}
                className="text-18 font-medium text-gray-400 hover:text-black sm:hidden md:pl-16 md:text-16 lg:pl-16"
              >
                {dashboard.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
