'use client';

import { getDashboards } from '@/app/api/dashboards';
import ColorCircle from '@/components/commons/circle/ColorCircle';
import useDeviceState from '@/hooks/useDeviceState';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import BarButton from '../commons/button/BarButton';

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

export default function NewDashboard() {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const deviceState = useDeviceState();

  useEffect(() => {
    async function fetchDashboard() {
      const response = await getDashboards();
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
    <div className="mb-96 ml-40 mt-40 grid w-260 grid-cols-1 grid-rows-6 gap-y-8 md:w-504 md:grid-cols-2 md:grid-rows-3 md:gap-x-10 md:gap-y-10 lg:w-1022 lg:grid-cols-3 lg:grid-rows-2 lg:gap-x-13 lg:gap-y-12">
      <div className="col-span-1 col-start-1 row-span-1 row-start-1">
        <BarButton
          text="새로운 대시보드"
          size={deviceState === 'mobile' ? 'sm' : 'lg'}
        />
      </div>
      {dashboards &&
        dashboards.map((dashboard) => (
          <div
            key={dashboard.id}
            className="col-span-1 col-start-auto row-span-1 row-start-auto"
          >
            <Link href={`/dashboard/${dashboard.id}`}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-8 rounded-8 border border-gray-200 px-20 py-20 font-bold text-black-800 hover:border-gray-400 md:py-24 md:text-18"
              >
                <div className="flex items-center">
                  <ColorCircle
                    color={colorMapping[dashboard.color] || 'bg-gray-400'}
                    size="sm"
                  />
                  <p className="ml-10">{dashboard.title}</p>
                </div>
                <Image
                  src="/icon/arrow_forward.svg"
                  width={20}
                  height={20}
                  alt="대쉬보드 바로가기 버튼"
                />
              </button>
            </Link>
          </div>
        ))}
    </div>
  );
}
