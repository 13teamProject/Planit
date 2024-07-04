'use client';

import { getColumns } from '@/app/api/columns';
import { getDashboardId } from '@/app/api/dashboards';
import BarButton from '@/components/commons/button/BarButton';
import DashBoardHeader from '@/components/commons/layout/DashboardHeader';
import Sidemenu from '@/components/commons/layout/Sidemenu';
import Spinner from '@/components/commons/spinner';
import Column from '@/components/dashboard/Column';
import CreateColumnModal from '@/components/dashboard/modals/CreateColumnModal';
import { GetDashboardIdResponse } from '@planit-types';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function DashboardPage({
  params,
}: {
  params: {
    id: number;
  };
}) {
  const [dashboard, setDashboard] = useState<GetDashboardIdResponse | null>(
    null,
  );
  const [columnLength, setColumnLength] = useState<number>();
  const [isCreateColumnModalOpen, setIsCreateColumnModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const dashboardId = params.id;

  const fetchDashboardData = useCallback(async () => {
    try {
      const dashboardRes = await getDashboardId({ dashboardId });
      setDashboard(dashboardRes);
      const columnsRes = await getColumns({ dashboardId });
      setColumnLength(columnsRes.length);
    } catch (err) {
      toast.error('데이터를 받는 중에 오류가 발생했습니다:');
    }
  }, [dashboardId]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const refreshData = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  const openCreateColumnModal = () => {
    setIsCreateColumnModalOpen(true);
  };

  const closeCreateColumnModal = async () => {
    setIsCreateColumnModalOpen(false);
    await fetchDashboardData(); // 모달을 닫을 때 데이터를 다시 가져옵니다.
  };

  if (!dashboard) {
    return <Spinner size={24} />;
  }

  return (
    <div className="flex h-screen lg:overflow-hidden">
      <Sidemenu />
      <div className="flex flex-1 flex-col">
        <DashBoardHeader isDashboard />
        <div className="w-full bg-gray-50 lg:flex lg:h-full lg:overflow-hidden">
          <Column
            key={columnLength} // columns 길이를 key로 사용하여 변화를 감지합니다.
            dashboardId={dashboard.id}
            onColumnUpdate={refreshData}
          />
          <div className="sm:w-full sm:p-12 md:w-full md:p-20 lg:w-500">
            <BarButton
              onClick={openCreateColumnModal}
              text="새로운 컬럼 추가하기"
            />
          </div>
        </div>
      </div>
      <CreateColumnModal
        dashboardId={dashboard.id}
        isOpen={isCreateColumnModalOpen}
        onClose={closeCreateColumnModal}
      />
    </div>
  );
}
