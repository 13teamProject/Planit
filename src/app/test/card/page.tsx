'use client';

import BarButton from '@/components/commons/button/BarButton';
import CreateCardModal from '@/components/dashboard/cards/CreateCardModal';
import EditCardModal from '@/components/dashboard/cards/EditCardModal';
import { useState } from 'react';

const CURRENT_CARD_DATA = {
  id: 8704,
  title: 'dfdfdfd',
  description: 'dfdfdf',
  tags: [],
  dueDate: null,
  assignee: null,
  imageUrl: null,
  teamId: '6-13',
  dashboardId: 9768,
  columnId: 32949,
  createdAt: '2024-06-27T21:32:27.033Z',
  updatedAt: '2024-06-27T21:32:27.033Z',
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
