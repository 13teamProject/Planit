'use client';

import DashBoardHeader from '@/components/commons/layout/DashboardHeader';
import Sidemenu from '@/components/commons/layout/Sidemenu';
import { Suspense } from 'react';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <Sidemenu />
      <div className="flex flex-1 flex-col">
        <Suspense>
          <DashBoardHeader isDashboard={false} />
        </Suspense>
        <div className="flex-1 bg-gray-50 p-20 pt-90">{children}</div>
      </div>
    </div>
  );
}
