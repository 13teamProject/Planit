'use client';

import DashBoardHeader from '@/components/commons/layout/DashboardHeader';
import Sidemenu from '@/components/commons/layout/Sidemenu';
import NewDashboard from '@/components/mydashboard/NewDashboard';

export default function MyDashBoardPage() {
  return (
    <div className="flex h-screen">
      <Sidemenu />
      <div className="flex flex-1 flex-col">
        <DashBoardHeader isDashboard />
        <div className="flex-1">
          <NewDashboard />
        </div>
      </div>
    </div>
  );
}
