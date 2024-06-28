import { getDashboards } from '@/app/api/dashboards';
import ColorCircle from '@/components/commons/circle/ColorCircle';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import Modal from '../modal';

type Dashboard = {
  id: number;
  title: string;
  color: string;
};

type ColorMapping = {
  [key: string]: string;
};

const colorMapping: ColorMapping = {
  '#5534DA': 'bg-violet-dashboard',
  '#F1EFFD': 'bg-violet-light-dashboard',
  '#D6173A': 'bg-red-dashboard',
  '#7AC555': 'bg-green-dashboard',
  '#FFA500': 'bg-orange-dashboard',
  '#76A5EA': 'bg-blue-dashboard',
  '#E876EA': 'bg-pink-dashboard',
};

export default function Sidemenu() {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);

  const createDashboard = () => {
    <Modal isOpen />;
  };

  useEffect(() => {
    async function fetchDashboard() {
      const response = await getDashboards('infiniteScroll', 1, 9); // 데이터 size 수정 필요
      setDashboards(
        response.dashboards.map((data) => ({
          id: data.id,
          title: data.title,
          color: data.color,
        })),
      );
    }
    fetchDashboard();
  }, []);

  return (
    <nav className="left-0 top-0 z-[999] h-screen w-67 border-1 border-r-gray-200 bg-white pl-20 pt-20 md:w-160 md:pl-18 lg:w-300 lg:pl-24">
      <Link href="/" className="cursor-pointer">
        <Image
          className="md:hidden"
          src="/image/logo_icon_blue.png"
          width={25}
          height={25}
          alt="사이드메뉴 모바일 로고"
        />
      </Link>
      <Link href="/" className="cursor-pointer sm:hidden md:block lg:block">
        <Image
          src="/image/logo_text_blue.png"
          className="mt-3"
          width={85}
          height={30}
          alt="사이드메뉴 로고"
        />
      </Link>
      <div className="mt-50 flex items-center justify-between lg:pr-24">
        <p className="text-12 font-bold text-gray-400 sm:hidden md:block lg:block">
          Dash Boards
        </p>
        <button type="button" onClick={createDashboard} className="md:pr-10">
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
            <ColorCircle
              color={colorMapping[dashboard.color] || 'bg-gray-400'}
              size="sm"
            />
            <Link
              href={`/dashboard/${dashboard.id}`}
              className="text-18 font-medium text-gray-400 hover:text-black sm:hidden md:block md:pl-16 md:text-16 lg:block lg:pl-16"
            >
              {dashboard.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
