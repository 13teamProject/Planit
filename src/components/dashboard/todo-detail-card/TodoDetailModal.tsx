'use client';

import { getTodoCardDetails } from '@/app/api/cards';
import Modal from '@/components/commons/modal';
import EditCardModal from '@/components/dashboard/cards/EditCardModal';
import CardDetails from '@/components/dashboard/todo-detail-card/CardDetails';
import CommentSection from '@/components/dashboard/todo-detail-card/CommentSection';
import DropDownSelectBox from '@/components/dashboard/todo-detail-card/DropDownSelectBox';
import { ErrorMessage, TodoDetailsCardResponse } from '@planit-types';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const cardId = '8706';

// 추후 설정 예정
// params: { cardId: string }
// const { cardId } = params;

const progressTitle = 'To do';

type Props = {
  todoModalOnClose: () => void;
  todoModalIsOpen: boolean;
};
export default function TodoDetailModal({
  todoModalOnClose,
  todoModalIsOpen,
}: Props) {
  const [cardDetails, setCardDetails] =
    useState<TodoDetailsCardResponse | null>();
  const [selectBoxIsOpen, setSelectBoxIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  const openEditModal = () => {
    setEditModalIsOpen(true);
    setSelectBoxIsOpen(false);
    todoModalOnClose();
  };

  const handleEditModalClose = () => {
    setEditModalIsOpen(false);
  };

  useEffect(() => {
    const fetchTodoCard = async () => {
      const data: TodoDetailsCardResponse | ErrorMessage =
        await getTodoCardDetails(cardId);
      if ('message' in data) {
        toast.error(data.message);
      } else {
        setCardDetails(data);
      }
    };
    if (!editModalIsOpen) fetchTodoCard();
  }, [cardId, editModalIsOpen]);

  if (!cardDetails) {
    return <div />;
  }

  const { title, id, columnId, dashboardId } = cardDetails;
  return (
    <>
      <Modal isOpen={todoModalIsOpen} onClose={() => {}}>
        <div className="mb-28 flex max-h-730 w-327 flex-col overflow-hidden px-28 pt-30 md:w-680 md:gap-16 lg:w-730">
          <div className="grid md:flex md:justify-between md:pb-8 selection:md:flex-col">
            <h1 className="order-2 py-10 text-20 font-bold md:order-1 md:text-24">
              {title}
            </h1>
            <div className="order-1 flex justify-end gap-24 md:order-2">
              <Image
                className="cursor-pointer"
                src="/icon/kebab.svg"
                width={28}
                height={28}
                alt="드롭다운 케밥"
                onClick={() => setSelectBoxIsOpen((prev) => !prev)}
              />
              {selectBoxIsOpen && (
                <span className="absolute top-70">
                  <DropDownSelectBox
                    openEditModal={openEditModal}
                    id={id}
                    setSelectBoxIsOpen={setSelectBoxIsOpen}
                    todoModalOnClose={todoModalOnClose}
                  />
                </span>
              )}
              <Image
                className="cursor-pointer"
                src="/icon/close.svg"
                width={32}
                height={32}
                alt="창끄기"
                onClick={todoModalOnClose}
              />
            </div>
          </div>
          <CardDetails data={cardDetails} progressTitle={progressTitle} />
          <div className="flex-1">
            <CommentSection
              cardId={id}
              columnId={columnId}
              dashboardId={dashboardId}
            />
          </div>
        </div>
      </Modal>
      <EditCardModal
        isOpen={editModalIsOpen}
        onClose={handleEditModalClose}
        dashboardId={dashboardId}
        columnId={columnId}
        currentCardData={cardDetails}
      />
    </>
  );
}
