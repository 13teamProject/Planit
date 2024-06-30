'use client';

import BarButton from '@/components/commons/button/BarButton';
import CreateCardModal from '@/components/dashboard/cards/CreateCardModal';
import EditCardModal from '@/components/dashboard/cards/EditCardModal';
import { useState } from 'react';

const CURRENT_CARD_DATA = {
  id: 8679,
  title: 'cardTest',
  description: 'hello',
  tags: ['hello', 'world'],
  dueDate: '2024-06-25 17:12',
  assignee: {
    id: 4008,
    nickname: '천권희',
    profileImageUrl: null,
  },
  imageUrl:
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/task_image/6-13_32949_1719303538107.png',
  teamId: '6-13',
  dashboardId: 9768,
  columnId: 32949,
  createdAt: '2024-06-25T17:19:20.232Z',
  updatedAt: '2024-06-25T17:19:20.232Z',
};

export default function CreateCard() {
  const [isCreateCardModalOpen, setIsCreateCardModalOpen] = useState(false);
  const [isEditCardModalOpen, setIsEditCardModalOpen] = useState(false);

  const openCreateCardModal = () => {
    setIsCreateCardModalOpen(true);
  };

  const closeCreateCardModal = () => {
    setIsCreateCardModalOpen(false);
  };

  const openEditCardModal = () => {
    setIsEditCardModalOpen(true);
  };

  const closeEditCardModal = () => {
    setIsEditCardModalOpen(false);
  };

  return (
    <div className="m-auto mt-[40vh] w-1/5">
      <BarButton onClick={openCreateCardModal} />
      <CreateCardModal
        isOpen={isCreateCardModalOpen}
        onClose={closeCreateCardModal}
        dashboardId={9768}
        columnId={32949}
      />

      <BarButton onClick={openEditCardModal} />
      <EditCardModal
        currentCardData={CURRENT_CARD_DATA}
        isOpen={isEditCardModalOpen}
        onClose={closeEditCardModal}
        dashboardId={9768}
        columnId={32949}
      />
    </div>
  );
}
