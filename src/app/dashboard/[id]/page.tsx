'use client';

import { DashboardIdResponse, getDashboardId } from '@/app/api/getDashboardId';
import BarButton from '@/components/commons/button/BarButton';
import DashBoardHeader from '@/components/commons/layout/DashboardHeader';
import Sidemenu from '@/components/commons/layout/Sidemenu';
import Column from '@/components/dashboard/Column';
import { useEffect, useState } from 'react';

export default function DashboardPage({
  params,
}: {
  params: {
    id: number;
  };
}) {
  const [dashboard, setDashboard] = useState<DashboardIdResponse | null>(null);

  useEffect(() => {
    const fetchDashboardId = async () => {
      const dashboardId = params.id;
      const res = await getDashboardId({ dashboardId, teamId: '6-13' });
      try {
        setDashboard(res);
      } catch (err) {
        throw new Error('데이터를 받는 중에 오류가 발생했습니다.');
      }
    };

    fetchDashboardId();
  }, [params.id]);

  if (!dashboard) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      <Sidemenu />
      <div className="flex flex-1 flex-col">
        <DashBoardHeader isDashboard />
        <div className="h-full w-full bg-gray-50 lg:flex">
          <Column key={dashboard.id} dashboardId={dashboard.id} teamId="6-13" />
          <div className="sm:w-full sm:p-12 md:w-full md:p-20 lg:w-500">
            <BarButton text="새로운 컬럼 추가하기" />
          </div>
        </div>
      </div>
    </div>
  );
}