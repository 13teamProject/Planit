'use client';

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
  const [isCreateColumnModalOpen, setIsCreateColumnModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const dashboardId = params.id;
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

  const fetchDashboardData = useCallback(async () => {
    try {
      const dashboardRes = await getDashboardId({ dashboardId });
      setDashboard(dashboardRes);
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
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidemenu />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Suspense>
            <DashBoardHeader isDashboard params={params} />
          </Suspense>

          <div className="custom-scrollbar relative flex-1 overflow-y-auto bg-gray-50 pt-70 dark:bg-gray-800 lg:overflow-y-hidden">
            <div className="min-h-full w-full lg:flex lg:h-full lg:overflow-x-auto lg:whitespace-nowrap">
              <Column dashboardId={dashboard.id} onColumnUpdate={refreshData} />
              <div className="hidden lg:mt-50 lg:block lg:w-400 lg:shrink-0 lg:px-50">
                <BarButton
                  onClick={openCreateColumnModal}
                  text="새로운 컬럼 추가하기"
                />
              </div>
            </div>

            {/* 스티키 버튼 */}
            <div className="sticky bottom-0 left-0 right-0 border-t border-gray-200 bg-gray-50 p-10 dark:bg-gray-900 lg:hidden">
              <BarButton
                onClick={openCreateColumnModal}
                text="새로운 컬럼 추가하기"
              />
            </div>
          </div>
        </div>
      </div>
      <CreateColumnModal
        dashboardId={dashboard.id}
        isOpen={isCreateColumnModalOpen}
        onClose={closeCreateColumnModal}
      />
    </>
  );
}
