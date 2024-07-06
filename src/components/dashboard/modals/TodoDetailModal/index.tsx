'use client';

import { deleteTodoCardDetails, getTodoCardDetails } from '@/app/api/cards';
import Button from '@/components/commons/button';
import DropDownSelectBox from '@/components/commons/dropdown';
import Modal from '@/components/commons/modal';
import EditCardModal from '@/components/dashboard/modals/EditCardModal';
import CardDetails from '@/components/dashboard/modals/TodoDetailModal/CardDetails';
import CommentSection from '@/components/dashboard/modals/TodoDetailModal/CommentSection';
import { useAuthStore } from '@/store/authStore';
import { useSocketStore } from '@/store/socketStore';
import { CardResponse, ErrorMessage } from '@planit-types';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

type Props = {
  todoModalOnClose: () => void;
  todoModalIsOpen: boolean;
  cardId: number;
  columnTitle: string;
  onCardDelete: () => void;
  onColumnUpdate: () => void;
};

export default function TodoDetailModal({
  todoModalOnClose,
  todoModalIsOpen,
  cardId,
  columnTitle,
  onCardDelete,
  onColumnUpdate,
}: Props) {
  const [cardDetails, setCardDetails] = useState<CardResponse | null>(null);
  const [selectBoxIsOpen, setSelectBoxIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const kebabRef = useRef<HTMLImageElement>(null);
  const { socket } = useSocketStore();
  const { userInfo } = useAuthStore();

  const fetchTodoCard = async () => {
    const data: CardResponse | ErrorMessage = await getTodoCardDetails(cardId);
    if ('message' in data) {
      toast.error(data.message);
    } else {
      setCardDetails(data);
    }
  };

  const handleModalClose = (setter: (value: boolean) => void) => () => {
    setter(false);
  };

  const handleDelete = async () => {
    const res = await deleteTodoCardDetails(cardId);
    onCardDelete();
    if ('message' in res) {
      toast.error(res.message);
      return;
    }
    toast.success('성공적으로 삭제되었습니다.');
    setDeleteModalIsOpen(false);
    todoModalOnClose();
    socket?.emit('card', {
      member: userInfo?.nickname,
      action: 'delete',
      card: cardDetails?.title,
      room: String(dashboardId),
    });
  };

  useEffect(() => {
    if (!editModalIsOpen) fetchTodoCard();
  }, [editModalIsOpen]);

  const openEditModal = () => {
    setEditModalIsOpen(true);
    setSelectBoxIsOpen(false);
  };

  const handleKebabClick = () => {
    setSelectBoxIsOpen((prev) => !prev);
  };

  if (!cardDetails) {
    return null;
  }

  const { title, id, columnId, dashboardId } = cardDetails;
  const dropdownList = [
    { label: '수정하기', onClick: openEditModal },
    { label: '삭제하기', onClick: () => setDeleteModalIsOpen(true) },
  ];

  return (
    <>
      {!editModalIsOpen ? (
        <Modal isOpen={todoModalIsOpen} onClose={() => {}}>
          <div className="mb-28 flex max-h-730 w-327 flex-col overflow-hidden px-28 pt-30 md:w-680 md:gap-16 lg:w-730">
            <div className="grid md:flex md:justify-between md:pb-8 selection:md:flex-col">
              <h1 className="order-2 py-10 text-20 font-bold md:order-1 md:text-24">
                {title}
              </h1>
              <div className="order-1 flex justify-end gap-24 md:order-2">
                <Image
                  ref={kebabRef}
                  className="cursor-pointer"
                  src="/icon/kebab.svg"
                  width={28}
                  height={28}
                  alt="드롭다운 케밥"
                  onClick={handleKebabClick}
                />
                {selectBoxIsOpen && (
                  <span className="absolute top-70">
                    <DropDownSelectBox
                      items={dropdownList}
                      setSelectBoxIsOpen={setSelectBoxIsOpen}
                      exceptions={[kebabRef]}
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
            <CardDetails data={cardDetails} columnTitle={columnTitle} />
            <div className="flex-1">
              <CommentSection
                cardId={id}
                columnId={columnId}
                dashboardId={dashboardId}
              />
            </div>
          </div>
        </Modal>
      ) : (
        <EditCardModal
          isOpen={editModalIsOpen}
          onClose={handleModalClose(setEditModalIsOpen)}
          dashboardId={dashboardId}
          columnId={columnId}
          currentCardData={cardDetails}
          onColumnUpdate={onColumnUpdate}
        />
      )}
      <Modal
        isOpen={deleteModalIsOpen}
        onClose={handleModalClose(setDeleteModalIsOpen)}
      >
        <div className="modal-content m-auto px-54 pb-29 pt-26 text-right text-18 md:w-540 md:px-33">
          <p className="pb-47 pt-50 text-center">삭제하시겠습니까?</p>
          <span className="flex justify-center gap-5 md:justify-end">
            <Button
              styles="w-138 h-42 md:w-120 md:h-48"
              text="취소"
              onClick={handleModalClose(setDeleteModalIsOpen)}
              cancel
            />
            <Button
              styles="w-138 h-42 md:w-120 md:h-48"
              text="확인"
              onClick={handleDelete}
            />
          </span>
        </div>
      </Modal>
    </>
  );
}
