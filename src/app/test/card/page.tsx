'use client';

import BarButton from '@/components/commons/button/BarButton';
import CreateCardModal from '@/components/dashboard/modals/CreateCardModal';
import { useState } from 'react';

export default function CreateCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="m-auto mt-[40vh] w-1/5">
      <BarButton onClick={openModal} />
      <CreateCardModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
