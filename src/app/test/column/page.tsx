'use client';

import BarButton from '@/components/commons/button/BarButton';
import ColumnSettingButton from '@/components/dashboard/columns/ColumnSettingButton';
import CreateColumnModal from '@/components/dashboard/columns/CreateColumnModal';
import { useState } from 'react';

const COLUMN_DATA = {
  id: 33544,
  title: 'To do',
  teamId: '6-13',
  dashboardId: 9768,
  createdAt: '2024-06-25T08:12:28.685Z',
  updatedAt: '2024-06-25T08:12:28.685Z',
};

export default function ColumnTestPage() {
  const [isCreateColumnModalOpen, setIsCreateColumnModalOpen] = useState(false);

  const openCreateColumnModal = () => {
    setIsCreateColumnModalOpen(true);
  };

  const closeCreateColumnModal = () => {
    setIsCreateColumnModalOpen(false);
  };

  return (
    <div className="m-auto mt-[40vh] w-1/5">
      <BarButton onClick={openCreateColumnModal} />
      <CreateColumnModal
        dashboardId={9768}
        isOpen={isCreateColumnModalOpen}
        onClose={closeCreateColumnModal}
      />

      <ColumnSettingButton dashboardId={9768} columnData={COLUMN_DATA} />
    </div>
  );
}
