'use client';

import { getDashboards, postDashboards } from '@/api/dashboards';
import DashBoardHeader from '@/components/mydashboard/DashboardHeader';
import Sidemenu from '@/components/mydashboard/Sidemenu';
import { useEffect, useState } from 'react';

type Dashboard = {
  id: number;
  title: string;
  color: string;
};

export default function MyDashBoardPage() {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);

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

    //fetchDashboard();
    async function addDashboard() {
      try {
        const formData = { title: '비브리지', color: 'green-dashboard' }; // api로 데이터 받아올 예정
        const response = await postDashboards(formData);
        setDashboards([
          ...dashboards,
          ...response.dashboards.map((data) => ({
            id: data.id,
            title: data.title,
            color: data.color,
          })),
        ]);
      } catch (error) {
        console.error('Failed to create dashboard:', error);
      }
    }
    //addDashboard();
  }, []);

  return (
    <div className="flex">
      <Sidemenu dashboards={dashboards} />
      <DashBoardHeader isDashboard={true} />
    </div>
  );
}
