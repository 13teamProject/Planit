'use client';

import BarButton from '@/components/commons/button/BarButton';
import ProfileCircle from '@/components/commons/circle/ProfileCircle';
import CreateCardModal from '@/components/dashboard/CreateCardModal';
import { useState } from 'react';

export default function CreateCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const DATA = {
    nickname: 'Goni',
    profileImageUrl: '/image/logo_blue.png',
  };

  return (
    <div className="m-auto mt-[40vh] w-1/5">
      <ProfileCircle styles="size-28 bg-slate-400" data={DATA} />
      <BarButton onClick={openModal} />
      <CreateCardModal
        isOpen={isModalOpen}
        onClose={closeModal}
        dashboardId={9768}
        columnId={32949}
      />
    </div>
  );
}
