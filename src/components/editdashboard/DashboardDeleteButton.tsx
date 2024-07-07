'use client';

import { deleteDashboard } from '@/app/api/dashboards';
import emitDashboards from '@/app/api/pusher/dashboards/emit';
import Button from '@/components/commons/button';
import Modal from '@/components/commons/modal';
import { useAuthStore } from '@/store/authStore';
import { usePusherStore } from '@/store/pusherStore';
import { ContentModalState } from '@planit-types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DashboardDeleteButton({
  params,
}: {
  params: { id: number };
}) {
  const router = useRouter();
  const [modalState, setModalState] = useState<ContentModalState>({
    isOpen: false,
    message: '',
  });
  const { socketId } = usePusherStore();
  const { userInfo } = useAuthStore();

  // 대시보드 삭제 모달 열기
  const handleOpenDashboardDeleteModal = () => {
    setModalState({ ...modalState, isOpen: true, isContent: true });
  };

  // 모달 닫기
  const handleClose = () => {
    setModalState({ ...modalState, isOpen: false });
    if (!modalState.isContent) {
      router.push('/mydashboard');
    }
  };

  // 대시보드 삭제
  const handleDashboardDelete = async () => {
    // deleteDashboard API 호출
    await deleteDashboard(params.id.toString());
    setModalState({ isOpen: true, message: '대시보드가 삭제되었습니다.' });

    await emitDashboards({
      member: userInfo?.nickname,
      action: 'delete',
      roomId: String(params.id),
      socketId: socketId as string,
    });
  };
  return (
    <>
      <div className="mt-40 w-full max-w-320">
        <button
          type="button"
          onClick={handleOpenDashboardDeleteModal}
          className="w-full rounded-8 border border-gray-200 bg-white py-20 text-black-800 dark:bg-gray-700 dark:text-white"
        >
          대시보드 삭제하기
        </button>
      </div>
      <Modal isOpen={modalState.isOpen} onClose={handleClose}>
        <div className="m-auto px-54 pb-29 pt-26 text-center text-18 md:w-540 md:px-33">
          {modalState.isContent ? (
            <div>
              <p className="pb-47 pt-50 dark:text-white">
                대시보드를 삭제하실건가요?
              </p>
              <div className="flex justify-end gap-12">
                <Button
                  text="취소"
                  onClick={handleClose}
                  styles="border !border-gray-200 !bg-white px-30 py-8 text-14 !text-toss-blue"
                />
                <Button
                  onClick={handleDashboardDelete}
                  text="삭제"
                  styles="px-30 py-8 text-14"
                />
              </div>
            </div>
          ) : (
            <>
              <p className="pb-47 pt-50 text-center">{modalState.message}</p>
              <span className="flex justify-center md:justify-end">
                <Button
                  styles="w-138 h-42 md:w-120 md:h-48"
                  text="확인"
                  onClick={handleClose}
                />
              </span>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}
