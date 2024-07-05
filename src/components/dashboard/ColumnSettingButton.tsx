// ColumnSettingButton.tsx
import { Column } from '@planit-types';
import Image from 'next/image';

import EditColumnModal from './modals/EditColumnModal';

type Props = {
  isOpen: boolean;
  handleOpen: (open: boolean) => void;
  dashboardId: number;
  columnData: Column;
  onColumnDelete: () => void;
};

export default function ColumnSettingButton({
  isOpen,
  handleOpen,
  dashboardId,
  columnData,
  onColumnDelete,
}: Props) {
  return (
    <>
      <button
        type="button"
        className="relative size-22 md:size-24"
        onClick={() => handleOpen(true)}
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
        onClose={() => handleOpen(false)}
        onColumnDelete={onColumnDelete}
      />
    </>
  );
}
