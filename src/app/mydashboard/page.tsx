'use client';

import DashBoardHeader from '@/components/commons/layout/DashboardHeader';
import Sidemenu from '@/components/commons/layout/Sidemenu';
import InviteDashboard from '@/components/mydashboard/InviteDashboard';
import NewDashboard from '@/components/mydashboard/NewDashboard';
import { Suspense } from 'react';

export default function MyDashBoardPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidemenu />
      <div className="flex flex-1 flex-col">
        <Suspense>
          <DashBoardHeader isDashboard={false} />
        </Suspense>
        <div className="flex-1 overflow-auto">
          {' '}
          <NewDashboard />
          <InviteDashboard />
        </div>
      </div>
    </div>
  );
}
