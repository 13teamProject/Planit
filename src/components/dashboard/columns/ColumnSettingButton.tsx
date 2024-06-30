import { Column } from '@planit-types';
import Image from 'next/image';
import { useState } from 'react';

import EditColumnModal from './EditColumnModal';

type Props = {
  dashboardId: number;
  columnData: Column;
};

export default function ColumnSettingButton({
  dashboardId,
  columnData,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className="relative size-22 md:size-24"
        onClick={openModal}
      >
        <Image
          src="/icon/settings.svg"
          alt="setting"
          fill
          className="absolute object-cover"
        />
      </button>
      <EditColumnModal
        dashboardId={dashboardId}
        columnData={columnData}
        isOpen={isOpen}
        onClose={closeModal}
      />
    </>
  );
}
