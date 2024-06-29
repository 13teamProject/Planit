'use client';

import BarButton from '@/components/commons/button/BarButton';
import CreateColumnModal from '@/components/dashboard/columns/CreateColumnModal';
import { useState } from 'react';

export default function ColumnTestPage() {
  const [isCreateColumnModalOpen, setIsCreateColumnModalOpen] = useState(false);

  const openModal = () => {
    setIsCreateColumnModalOpen(true);
  };

  const closeModal = () => {
    setIsCreateColumnModalOpen(false);
  };

  return (
    <div className="m-auto mt-[40vh] w-1/5">
      <BarButton onClick={openModal} />
      <CreateColumnModal
        dashboardId={9768}
        isOpen={isCreateColumnModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}
