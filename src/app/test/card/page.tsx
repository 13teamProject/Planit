'use client';

import BarButton from '@/components/commons/button/BarButton';
import CreateCardModal from '@/components/dashboard/CreateCardModal';
import EditCardModal from '@/components/dashboard/EditCardModal';
import { useState } from 'react';

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
        isOpen={isEditCardModalOpen}
        onClose={closeEditCardModal}
        dashboardId={9768}
        columnId={32949}
      />
    </div>
  );
}
