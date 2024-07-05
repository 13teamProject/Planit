'use client';

import { getColumns } from '@/app/api/columns';
import { getDashboardId } from '@/app/api/dashboards';
import { getUsers } from '@/app/api/users';
import BarButton from '@/components/commons/button/BarButton';
import DashBoardHeader from '@/components/commons/layout/DashboardHeader';
import Sidemenu from '@/components/commons/layout/Sidemenu';
import Spinner from '@/components/commons/spinner';
import Column from '@/components/dashboard/Column';
import CreateColumnModal from '@/components/dashboard/modals/CreateColumnModal';
import { useSocketStore } from '@/store/socketStore';
import { GetDashboardIdResponse } from '@planit-types';
import { useRouter } from 'next/navigation';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function DashboardPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const router = useRouter();
  const [dashboard, setDashboard] = useState<GetDashboardIdResponse | null>(
    null,
  );
  const { socket, initializeSocket } = useSocketStore();

  const fetchUser = async () => {
    try {
      const userData = await getUsers();
      return userData;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      return null;
    }
  };

  const socketListener = () => {
    if (!socket) return;

    socket.on('enter', (message) => {
      toast.success(message, { containerId: 'socket' });
    });

    socket.on('dashboard', (message) => {
      if (message.includes('삭제')) {
        toast.error(message, { containerId: 'socket' });
        router.push('/mydashboard');
      } else {
        toast.success(message, { containerId: 'socket' });
      }
    });
  };

  useEffect(() => {
    let cleanup: () => void | undefined;

    initializeSocket(params.id)
      .then((cleanUpFn) => {
        cleanup = cleanUpFn;
      })
      .catch((error) => {
        console.error('Failed to initialize socket:', error);
      });

    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, [params.id]);

  useEffect(() => {
    socketListener();
  }, [socket, params.id]);

  useEffect(() => {
    if (!socket) return;

    (async () => {
      const userData = await fetchUser();
      socket.emit('enter', {
        member: userData?.nickname,
        room: params.id,
      });
    })();
  }, [socket]);
  const [columnLength, setColumnLength] = useState<number>();
  const [isCreateColumnModalOpen, setIsCreateColumnModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const dashboardId = params.id;

  const fetchDashboardData = useCallback(async () => {
    try {
      const dashboardRes = await getDashboardId({ dashboardId });
      setDashboard(dashboardRes);
      const columnsRes = await getColumns({ dashboardId: Number(dashboardId) });
      setColumnLength(columnsRes.length);
    } catch (err) {
      toast.error('데이터를 받는 중에 오류가 발생했습니다:');
    }
  }, [dashboardId]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const refreshData = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const openCreateColumnModal = () => {
    setIsCreateColumnModalOpen(true);
  };

  const closeCreateColumnModal = () => {
    setIsCreateColumnModalOpen(false);
    refreshData(); // 데이터 새로고침 트리거
  };

  if (!dashboard) {
    return <Spinner size={24} />;
  }

  return (
    <div className="flex h-screen lg:overflow-hidden">
      <Sidemenu />
      <div className="flex flex-1 flex-col">
        <Suspense>
          <DashBoardHeader isDashboard params={{ id: Number(params) }} />
        </Suspense>
        <div className="w-full bg-gray-50 lg:flex lg:h-full lg:overflow-hidden">
          <Column
            key={columnLength} // columns 길이를 key로 사용하여 변화를 감지합니다.
            dashboardId={dashboard.id}
            onColumnUpdate={refreshData}
          />
          <div className="sm:w-full sm:p-12 md:w-full md:p-20 lg:w-350">
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
